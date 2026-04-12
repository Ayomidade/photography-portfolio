import { Link } from 'react-router-dom'

const baseStyle = {
  display: 'inline-block',
  fontSize: '10px',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'var(--black)',
  background: 'var(--accent)',
  padding: '14px 32px',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--sans)',
  fontWeight: 300,
  transition: 'opacity var(--transition)',
}

const BtnPrimary = ({ label, to, href, onClick }) => {
  // internal navigation — use React Router Link
  if (to) {
    return (
      <Link
        to={to}
        style={baseStyle}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        {label}
      </Link>
    )
  }

  // external URL — use anchor tag with target blank
  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        style={baseStyle}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        {label}
      </a>
    )
  }

  // click handler only — use button element
  return (
    <button
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      {label}
    </button>
  )
}

export default BtnPrimary