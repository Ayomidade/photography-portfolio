/**
 * NewPhoto
 *
 * Owns the full upload + save flow:
 *
 * 1. ImageUploader previews the file and calls setImageFile(file)
 * 2. On form submit:
 *    a. POST /api/upload/single   — uploads file to Cloudinary
 *    b. POST /api/photos          — saves photo doc to MongoDB with
 *                                   imageUrl + imagePublicId from step a
 * 3. Navigates to /admin/photos on success
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import AdminLayout from '@/admin/components/AdminLayout'
import ImageUploader from '@/admin/components/ImageUploader'
import BtnGhost from '@/components/ui/BtnGhost'
import useFetch from '@/hooks/useFetch'

const NewPhoto = () => {
  const navigate = useNavigate()
  const { data: cd } = useFetch('/api/collections')
  const collections = cd?.data || []

  const [imageFile, setImageFile] = useState(null)   // File object from ImageUploader
  const [form, setForm] = useState({
    title:        '',
    description:  '',
    category:     '',
    collectionId: '',
    featured:     false,
  })
  const [uploading, setUploading] = useState(false)
  const [error, setError]         = useState(null)

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!imageFile) {
      toast.error('Please select an image.')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // ── Step 1: upload image to Cloudinary ──
      const fd = new FormData()
      fd.append('image', imageFile)

      const uploadRes = await fetch('/api/upload/single', {
        method:      'POST',
        credentials: 'include',
        body:        fd,
      })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) throw new Error(uploadData.message || 'Image upload failed.')

      const imageUrl = uploadData.data.imageUrl;
      const imagePublicId = uploadData.data.imagePublicId;

      // ── Step 2: save photo document to MongoDB ──
      const saveRes = await fetch('/api/photos', {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...form,
          imageUrl,
          imagePublicId,
          collectionId: form.collectionId || null,
        }),
      })
      const saveData = await saveRes.json()
      if (!saveRes.ok) throw new Error(saveData.message || 'Failed to save photo.')

      toast.success('Photo uploaded successfully.')
      navigate('/admin/photos')
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setUploading(false)
    }
  }

  const LabelEl = ({ children }) => (
    <label style={{
      display: 'block',
      fontSize: '9px',
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: 'rgba(0,0,0,0.38)',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 400,
      marginBottom: '9px',
    }}>
      {children}
    </label>
  )

  return (
    <AdminLayout title='Upload Photo'>
      <div style={{ maxWidth: '560px' }}>

        <div style={{ marginBottom: '24px' }}>
          <BtnGhost label='← Photos' to='/admin/photos' />
        </div>

        <form onSubmit={handleSubmit}>

          {/* Uploader — preview only, sets imageFile */}
          <ImageUploader
            label='Photo'
            onChange={file => setImageFile(file)}
          />

          {/* Title */}
          <div style={{ marginBottom: '18px' }}>
            <LabelEl>Title</LabelEl>
            <input
              className='admin-input'
              type='text'
              name='title'
              value={form.title}
              onChange={handleChange}
              placeholder='Into the Quiet Forest'
              required
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: '18px' }}>
            <LabelEl>Category</LabelEl>
            <input
              className='admin-input'
              type='text'
              name='category'
              value={form.category}
              onChange={handleChange}
              placeholder='Landscape · Portrait · Documentary'
              required
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '18px' }}>
            <LabelEl>Description (optional)</LabelEl>
            <textarea
              className='admin-input admin-textarea'
              name='description'
              value={form.description}
              onChange={handleChange}
              placeholder='Optional description...'
            />
          </div>

          {/* Project */}
          <div style={{ marginBottom: '18px' }}>
            <LabelEl>Project (leave empty → Commissions gallery)</LabelEl>
            <select
              className='admin-input admin-select'
              name='collectionId'
              value={form.collectionId}
              onChange={handleChange}
            >
              <option value=''>No project — Commissions</option>
              {collections.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Featured */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type='checkbox'
              id='featured'
              name='featured'
              checked={form.featured}
              onChange={handleChange}
              style={{ width: '14px', height: '14px', accentColor: '#1a1a1a', cursor: 'pointer' }}
            />
            <label htmlFor='featured' style={{
              fontSize: '11px',
              color: 'rgba(0,0,0,0.45)',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              cursor: 'pointer',
              letterSpacing: '0.04em',
            }}>
              Feature on homepage
            </label>
          </div>

          {error && (
            <div className='admin-error' style={{ marginBottom: '14px' }}>
              {error}
            </div>
          )}

          <button
            type='submit'
            disabled={uploading}
            className='admin-btn-primary'
          >
            {uploading ? 'Uploading...' : 'Upload Photo →'}
          </button>

        </form>
      </div>
    </AdminLayout>
  )
}

export default NewPhoto