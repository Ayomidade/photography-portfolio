/**
 * ContactInfo
 *
 * Left panel of contact section.
 * Matches Andrew Esiebo contact page — name, email, phone.
 * Simple, direct, no decoration.
 */

const ContactInfo = () => {
  return (
    <div>
      <h2 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(24px, 3vw, 36px)',
        fontWeight: 300,
        color: 'var(--text)',
        marginBottom: '28px',
        letterSpacing: '0.02em',
      }}>
        Anthony Monday
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { label: 'Email', value: 'hello@anthonymonday.com', href: 'mailto:hello@anthonymonday.com' },
          { label: 'Tel', value: '+234 802 000 0000', href: 'tel:+2348020000000' },
          { label: 'Instagram', value: '@anthonymonday', href: '#' },
          { label: 'Location', value: 'Lagos, Nigeria' },
        ].map(({ label, value, href }) => (
          <p key={label} style={{
            fontSize: '12px',
            color: 'var(--muted)',
            lineHeight: 2,
            letterSpacing: '0.04em',
          }}>
            <span style={{ color: 'var(--text)', fontWeight: 400 }}>{label}:</span>{' '}
            {href
              ? <a href={href} style={{ color: 'var(--muted)', transition: 'color var(--transition)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                >{value}</a>
              : value
            }
          </p>
        ))}
      </div>
    </div>
  )
}

export default ContactInfo