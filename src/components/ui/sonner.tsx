import { Toaster as Sonner, ToasterProps } from "sonner"

// This project has no dark-mode toggle, so we drop the next-themes dependency
// the shadcn template ships with by default and just use the light theme.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
