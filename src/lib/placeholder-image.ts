/**
 * TODO: replace with real royalty-free Caribbean/Jamaican stock photography.
 *
 * The original site's images lived on B12's internal CDN (cdn.b12.io/client_media/...),
 * which is tied to that platform account and shouldn't be relied on long-term (see
 * migration prompt section 3). Rather than hotlink random web images into a client
 * codebase, every image here is a clearly-labeled placeholder so the site always
 * renders correctly — swap the `src` values below for real photos of:
 *   - a catamaran on turquoise water (hero + tour cards)
 *   - Dunn's River Falls
 *   - a blue hole / lagoon
 *   - a private yacht
 *   - a beach scene
 *   - an eco-adventure park scene
 * and any tour-specific shots you'd like on the /tours grid.
 */

const PALETTE: Record<string, string> = {
  green: '007A33',
  gold: 'FFC72C',
}

/** Builds a placeholder image URL with the brand palette and a readable label. */
export function placeholderImage(label: string, opts?: { w?: number; h?: number; tone?: 'green' | 'gold' }) {
  const w = opts?.w ?? 800
  const h = opts?.h ?? 600
  const bg = PALETTE[opts?.tone ?? 'green']
  const fg = opts?.tone === 'gold' ? '000000' : 'FFFFFF'
  return `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(label)}&font=roboto`
}
