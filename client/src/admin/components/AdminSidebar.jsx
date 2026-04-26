/**
 * AdminSidebar
 *
 * Fixed left navigation — logo, nav links, admin info, sign out.
 * Light background, subtle borders.
 * Active route highlighted with a left border accent.
 */

import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'

const NAV = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: '▦' },
  { label: 'Projects',  to: '/admin/projects',  icon: '◫' },
  { label: 'Photos',    to: '/admin/photos',     icon: '◧' },
]

/* ── Hamburger icon ── */
const Burger = ({ open, onClick }) => (
  <button
    onClick={onClick}
    aria-label={open ? 'Close menu' : 'Open menu'}
    aria-expanded={open}
    style={{
      background: 'none', border: 'none',
      cursor: 'pointer', padding: '8px',
      display: 'flex', flexDirection: 'column',
      gap: '5px', width: '36px',
    }}
  >
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        display: 'block',
        height: '1px',
        background: '#1a1a1a',
        width: i === 1 && open ? '0' : '100%',
        transformOrigin: 'center',
        transition: 'transform 0.28s ease, opacity 0.22s ease, width 0.28s ease',
        transform:
          open && i === 0 ? 'translateY(6px) rotate(45deg)'
          : open && i === 2 ? 'translateY(-6px) rotate(-45deg)'
          : 'none',
        opacity: open && i === 1 ? 0 : 1,
      }} />
    ))}
  </button>
)

const AdminSidebar = () => {
  const { admin, logout } = useAdminAuth()
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // close drawer on route change
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const navLink = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    fontSize: '10px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: isActive ? '#1a1a1a' : 'rgba(0,0,0,0.38)',
    textDecoration: 'none',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: isActive ? 500 : 300,
    borderLeft: isActive ? '2px solid #1a1a1a' : '2px solid transparent',
    background: isActive ? 'rgba(0,0,0,0.03)' : 'transparent',
    transition: 'color 0.2s, background 0.2s, border-color 0.2s',
  })

  const SidebarInner = ({ isMobile }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Brand */}
      {!isMobile && (
        <div style={{
          padding: '28px 24px 24px',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}>
          <Link to='/admin/dashboard' style={{ textDecoration: 'none' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              marginBottom: '3px',
            }}>
              Anthony Monday
            </p>
            <p style={{
              fontSize: '8px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.3)',
              fontFamily: 'Montserrat, sans-serif',
            }}>
              Admin
            </p>
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {NAV.map(({ label, to, icon }) => (
          <NavLink key={to} to={to} style={navLink}>
            <span style={{ fontSize: '12px', opacity: 0.55, width: '16px', textAlign: 'center' }}>
              {icon}
            </span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '18px 24px',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}>
        <p style={{
          fontSize: '10px',
          color: 'rgba(0,0,0,0.3)',
          marginBottom: '10px',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 300,
          letterSpacing: '0.04em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {admin?.username}
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={logout} className='admin-btn-ghost' style={{
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.38)',
            background: 'none',
            border: '1px solid rgba(0,0,0,0.1)',
            padding: '7px 14px',
            cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif',
            transition: 'color 0.2s, border-color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(0,0,0,0.38)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)' }}
          >
            Sign out
          </button>
          <a
            href='/'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.28)',
              fontFamily: 'Montserrat, sans-serif',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.2s',
              padding: '7px 0',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.28)'}
          >
            Site ↗
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* ━━━━ DESKTOP SIDEBAR ━━━━ */}
      <aside
        style={{
          width: "var(--admin-sidebar-w, 220px)",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          background: "#fff",
          borderRight: "1px solid rgba(0,0,0,0.07)",
          zIndex: 60,
          display: "flex",
          flexDirection: "column",
        }}
        className="admin-sidebar-desktop"
      >
        <SidebarInner />
      </aside>

      {/* ━━━━ MOBILE TOP BAR ━━━━ */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "52px",
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 60,
        }}
        className="admin-mobile-topbar"
      >
        <Link
          to="/admin/dashboard"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            textDecoration: "none",
          }}
        >
          Anthony Monday
        </Link>
        <Burger open={drawerOpen} onClick={() => setDrawerOpen((o) => !o)} />
      </div>

      {/* ━━━━ MOBILE DRAWER OVERLAY ━━━━ */}
      <div
        onClick={() => setDrawerOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          zIndex: 58,
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        className="admin-mobile-overlay"
      />

      {/* ━━━━ MOBILE DRAWER ━━━━ */}
      <div
        onClick={(e) => e.stopPropagation()} // 👈 VERY IMPORTANT
        style={{
          position: "fixed",
          top: "52px",
          left: 0,
          bottom: 0,
          width: "260px",
          background: "#fff",
          borderRight: "1px solid rgba(0,0,0,0.07)",
          zIndex: 59,
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          display: "none",
          flexDirection: "column",
          overflowY: "auto",
        }}
        className="admin-mobile-drawer"
      >
        <SidebarInner isMobile />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-mobile-topbar { display: flex !important; }
          .admin-mobile-drawer { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default AdminSidebar