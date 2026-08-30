import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 right-6 bg-primary hover:bg-green-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-40"
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="w-6 h-6" strokeWidth={2.25} />
    </button>
  )
}
