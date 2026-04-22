/**
 * GrainOverlay
 *
 * Very subtle film grain — reduced opacity on light theme.
 * Adds analog texture without obscuring the photography.
 */

import { useTheme } from '@/context/ThemeContext'

const GrainOverlay = () => {
  const { theme } = useTheme()

  return (
    <div
      aria-hidden='true'
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1000,
        opacity: theme === 'light' ? 0.012 : 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
        transition: 'opacity var(--transition)',
      }}
    />
  )
}

export default GrainOverlay