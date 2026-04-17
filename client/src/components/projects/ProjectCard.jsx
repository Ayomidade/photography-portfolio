/**
 * ProjectCard
 *
 * A single project card in the projects grid.
 * Renders the project cover image with a hover overlay
 * showing the project number, name and photo count.
 * Navigates to /projects/:slug on click.
 *
 * Props:
 * - `project` (object) — { name, slug, coverImage, photoCount }
 * - `index` (number) — used to render the formatted project number
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ project, index }) => {
  const { name, slug, coverImage, photoCount } = project
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/projects/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='project-card'
      style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '380px',
        background: 'var(--surface)',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Cover image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: coverImage ? `url(${coverImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform var(--transition-slow)',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Gradient overlay — always visible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.88) 100%)'
            : 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)',
          transition: 'background var(--transition)',
        }}
      />

      {/* Card content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '32px 28px',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '10px',
            display: 'block',
          }}
        >
          {String(index + 1).padStart(2, '0')} · Project
        </span>
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(22px, 2.5vw, 30px)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.1,
            color: 'var(--text)',
            marginBottom: '10px',
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          {photoCount ?? 0} {photoCount === 1 ? 'Photograph' : 'Photographs'}
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-card { min-height: 280px !important; }
        }
      `}</style>
    </Link>
  )
}

export default ProjectCard