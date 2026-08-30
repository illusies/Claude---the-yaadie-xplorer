#!/usr/bin/env node
// Generates supabase/migrations/2026072000002_seed_tours.sql from src/data/tours.ts
// so the frontend catalog and the DB seed never drift apart. Run with:
//   node scripts/generate-seed-sql.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toursTsPath = path.join(__dirname, '..', 'src', 'data', 'tours.ts')
const outPath = path.join(__dirname, '..', 'supabase', 'migrations', '2026072000002_seed_tours.sql')

const src = readFileSync(toursTsPath, 'utf-8')

// Extract the `tours: TourCatalogItem[] = [ ... ]` array body via a small manual parse
// (avoids pulling in a TS parser dependency just for a codegen script).
const marker = 'export const tours: TourCatalogItem[] = '
const start = src.indexOf(marker)
const arrayStart = start + marker.length // points at the literal '[' that opens the array
let depth = 0
let end = -1
for (let i = arrayStart; i < src.length; i++) {
  if (src[i] === '[') depth++
  if (src[i] === ']') {
    depth--
    if (depth === 0) {
      end = i
      break
    }
  }
}
const arrayBody = src.slice(arrayStart, end + 1)

// Each tour is one object literal per line: { slug: '...', name: '...', ... }
const objLines = arrayBody
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.startsWith('{ slug:'))

function extractField(line, field) {
  // string fields may be single- or double-quoted (double-quoted when the value itself
  // contains an apostrophe, e.g. name: "Dunn's River & Blue Hole")
  const singleMatch = line.match(new RegExp(`${field}: '((?:[^'\\\\]|\\\\.)*)'`))
  if (singleMatch) return singleMatch[1].replace(/\\'/g, "'")
  const doubleMatch = line.match(new RegExp(`${field}: "((?:[^"\\\\]|\\\\.)*)"`))
  if (doubleMatch) return doubleMatch[1].replace(/\\"/g, '"')
  const numMatch = line.match(new RegExp(`${field}: (-?[0-9.]+)`))
  if (numMatch) return parseFloat(numMatch[1])
  const boolMatch = line.match(new RegExp(`${field}: (true|false)`))
  if (boolMatch) return boolMatch[1] === 'true'
  const nullMatch = line.match(new RegExp(`${field}: null`))
  if (nullMatch) return null
  return undefined
}

function sqlStr(v) {
  if (v === null || v === undefined) return 'null'
  return `'${String(v).replace(/'/g, "''")}'`
}
function sqlNum(v) {
  return v === null || v === undefined ? 'null' : String(v)
}
function sqlBool(v) {
  return v ? 'true' : 'false'
}

const rows = objLines.map((line) => {
  const name = extractField(line, 'name')
  const description = extractField(line, 'description')
  const category = extractField(line, 'category')
  const price = extractField(line, 'price')
  const flatRate = extractField(line, 'flatRate')
  const tourType = extractField(line, 'tourType')
  const minGuests = extractField(line, 'minGuests')
  const maxCapacity = extractField(line, 'maxCapacity')
  const perks = extractField(line, 'perks')
  const perVehicle = extractField(line, 'perVehicle')

  // price_per_person: for flat-rate/charter tours this column isn't the driver of price
  // (flat_rate_amount is), but it's `not null` in the schema, so store the base price here too.
  const pricePerPerson = price
  const flatRateAmount = flatRate ? price : null
  const groupMinimumSize = minGuests ?? 1
  const includesMeals = perks
  void perVehicle // Jet Car's per-vehicle pricing is already spelled out in its description text.

  return `  (${sqlStr(name)}, ${sqlStr(description)}, ${sqlStr(category)}, ${sqlNum(pricePerPerson)}, ${sqlBool(flatRate)}, ${sqlNum(flatRateAmount)}, ${sqlStr(tourType)}, ${sqlNum(groupMinimumSize)}, ${sqlNum(maxCapacity)}, ${sqlBool(includesMeals)})`
})

const sql = `-- Migration: Seed the 43-tour catalog
-- Auto-generated from src/data/tours.ts by scripts/generate-seed-sql.mjs — do not hand-edit.
-- Re-run \`node scripts/generate-seed-sql.mjs\` after changing the catalog in code.

insert into tours (name, description, category, price_per_person, flat_rate, flat_rate_amount, tour_type, group_minimum_size, max_capacity, includes_meals)
values
${rows.join(',\n')}
on conflict do nothing;
`

writeFileSync(outPath, sql)
console.log(`Wrote ${rows.length} tours to ${outPath}`)
