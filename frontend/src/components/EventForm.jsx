import { useState, useEffect } from 'react'
import { FormField, Input, Textarea, Select, Button } from './ui'
import api from '../services/api'

export default function EventForm({ initial, onSubmit, onCancel, userRole, userDeptId, userClassId }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    event_date: initial?.event_date || '',
    start_time: initial?.start_time || '',
    end_time: initial?.end_time || '',
    venue: initial?.venue || '',
    target_type: initial?.targets?.[0]?.target_type || (userRole === 'admin' ? 'COLLEGE' : userRole === 'hod' ? 'DEPARTMENT' : 'CLASS'),
    target_id: initial?.targets?.[0]?.target_id || null,
  })
  const [departments, setDepartments] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (userRole === 'admin') {
      api.get('/departments/').then(r => setDepartments(r.data)).catch(() => {})
      api.get('/classes/').then(r => setClasses(r.data)).catch(() => {})
    } else if (userRole === 'hod') {
      api.get('/classes/').then(r => setClasses(r.data)).catch(() => {})
    }
  }, [userRole])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const targets = [{
        target_type: form.target_type,
        target_id: form.target_type === 'COLLEGE' ? null : form.target_id ? Number(form.target_id) : null,
      }]
      const payload = {
        title: form.title,
        description: form.description || null,
        event_date: form.event_date,
        start_time: form.start_time || null,
        end_time: form.end_time || null,
        venue: form.venue || null,
        targets,
      }
      await onSubmit(payload)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save event')
    } finally {
      setLoading(false)
    }
  }

  const targetOptions = () => {
    if (userRole === 'admin') return ['COLLEGE', 'DEPARTMENT', 'CLASS']
    if (userRole === 'hod') return ['DEPARTMENT', 'CLASS']
    return ['CLASS']
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Title" required>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Event title" required />
      </FormField>

      <FormField label="Description">
        <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional description" />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Date" required>
          <Input type="date" value={form.event_date} onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))} required />
        </FormField>
        <FormField label="Venue">
          <Input value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} placeholder="Location" />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Start Time">
          <Input type="time" value={form.start_time} onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))} />
        </FormField>
        <FormField label="End Time">
          <Input type="time" value={form.end_time} onChange={e => setForm(f => ({ ...f, end_time: e.target.value }))} />
        </FormField>
      </div>

      <FormField label="Visibility" required>
        <Select value={form.target_type} onChange={e => setForm(f => ({ ...f, target_type: e.target.value, target_id: null }))}>
          {targetOptions().map(t => <option key={t} value={t}>{t}</option>)}
        </Select>
      </FormField>

      {form.target_type === 'DEPARTMENT' && userRole === 'admin' && (
        <FormField label="Department" required>
          <Select value={form.target_id || ''} onChange={e => setForm(f => ({ ...f, target_id: e.target.value }))}>
            <option value="">Select department</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.department_name}</option>)}
          </Select>
        </FormField>
      )}

      {form.target_type === 'CLASS' && (
        <FormField label="Class" required>
          <Select value={form.target_id || ''} onChange={e => setForm(f => ({ ...f, target_id: e.target.value }))}>
            <option value="">Select class</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.department?.department_code} Year {c.year} - {c.section}
              </option>
            ))}
          </Select>
        </FormField>
      )}

      {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Event'}</Button>
      </div>
    </form>
  )
}
