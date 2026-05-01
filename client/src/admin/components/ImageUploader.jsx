/**
 * ImageUploader
 *
 * Preview-only component — no upload logic here.
 * Validates file type and size, shows a local blob preview,
 * then calls onChange(file) so the parent page owns the upload.
 *
 * Props:
 * - onChange(file)  — called with the File object on valid selection
 * - preview         — existing image URL for edit forms (Cloudinary URL)
 * - label           — field label text
 */

import { useState, useRef, useEffect } from 'react'

const ImageUploader = ({ onChange, preview: initialPreview = null, label = 'Image' }) => {
  const [preview, setPreview]   = useState(initialPreview)
  const [dragging, setDragging] = useState(false)
  const [error, setError]       = useState(null)
  const inputRef                = useRef(null)

  // Revoke blob URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  // Sync if parent passes a new initialPreview (e.g. after successful upload)
  useEffect(() => {
    if (initialPreview && !initialPreview.startsWith('blob:')) {
      setPreview(initialPreview)
    }
  }, [initialPreview])

  const handleFile = (file) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('File must be an image (JPG, PNG, WEBP).')
      return
    }

    // Image size validation
    if (file.size > 9 * 1024 * 1024) {
      setError('Max file size is 9 MB.')
      return
    }

    setError(null)
    setPreview(URL.createObjectURL(file))
    onChange(file)  // send file to parent — parent handles upload
  }

  return (
    <div style={{ marginBottom: '22px' }}>
      <p style={{
        fontSize: '9px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.38)',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        marginBottom: '10px',
      }}>
        {label}
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault()
          setDragging(false)
          handleFile(e.dataTransfer.files[0])
        }}
        style={{
          border: `1px dashed ${error ? '#c0392b' : dragging ? '#1a1a1a' : 'rgba(0,0,0,0.14)'}`,
          background: dragging ? 'rgba(0,0,0,0.018)' : '#fafaf8',
          cursor: 'pointer',
          transition: 'border-color 0.2s, background 0.2s',
          position: 'relative',
          overflow: 'hidden',
          minHeight: preview ? 'auto' : '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt='Preview'
              style={{
                width: '100%',
                maxHeight: '200px',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Hover — replace hint */}
            <div
              className='uploader-hover'
              style={{
                position: 'absolute',
                inset: 0,
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <p
                className='uploader-hover-label'
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  fontFamily: 'Montserrat, sans-serif',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '5px 12px',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                }}
              >
                Replace
              </p>
            </div>
          </>
        ) : (
          <div style={{ padding: '28px 20px', textAlign: 'center' }}>
            <p style={{
              fontSize: '22px',
              opacity: 0.18,
              marginBottom: '10px',
              lineHeight: 1,
            }}>
              ↑
            </p>
            <p style={{
              fontSize: '11px',
              color: 'rgba(0,0,0,0.32)',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.06em',
              marginBottom: '4px',
            }}>
              Click or drag & drop
            </p>
            <p style={{
              fontSize: '9px',
              color: 'rgba(0,0,0,0.18)',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.05em',
            }}>
              JPG · PNG · WEBP · Max 9 MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <p style={{
          fontSize: '10px',
          color: '#c0392b',
          marginTop: '6px',
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: '0.04em',
        }}>
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='image/jpeg,image/png,image/webp'
        onChange={e => handleFile(e.target.files[0])}
        hidden
      />

      <style>{`
        .uploader-hover:hover { background: rgba(0,0,0,0.32) !important; }
        .uploader-hover:hover .uploader-hover-label { opacity: 1 !important; }
      `}</style>
    </div>
  )
}

export default ImageUploader