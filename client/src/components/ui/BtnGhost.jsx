import { Link } from 'react-router-dom'

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '10px',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  textDecoration: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--sans)',
  fontWeight: 300,
  transition: 'color var(--transition)',
}

const Arrow = () => (
  <span style={{ fontSize: '14px', transition: 'transform var(--transition)' }}>
    →
  </span>
)

const BtnGhost = ({ label, to, href, onClick }) => {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = 'var(--text)'
    const arrow = e.currentTarget.querySelector('span')
    if (arrow) arrow.style.transform = 'translateX(4px)'
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = 'var(--muted)'
    const arrow = e.currentTarget.querySelector('span')
    if (arrow) arrow.style.transform = 'translateX(0)'
  }

  // internal navigation
  if (to) {
    return (
      <Link
        to={to}
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {label} <Arrow />
      </Link>
    )
  }

  // external URL
  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {label} <Arrow />
      </a>
    )
  }

  // click handler only
  return (
    <button
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label} <Arrow />
    </button>
  )
}

export default BtnGhost