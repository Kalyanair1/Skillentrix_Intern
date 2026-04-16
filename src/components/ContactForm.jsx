import { useState } from 'react'

const emptyForm = {
  fullName: '',
  jobTitle: '',
  company: '',
  phone: '',
  email: '',
  bio: '',
  avatarUrl: '',
}

function ContactForm({ onAddContact }) {
  const [formValues, setFormValues] = useState(emptyForm)
  const [statusMessage, setStatusMessage] = useState('')
  const [errors, setErrors] = useState({})

  function validateField(name, value) {
    const trimmedValue = value.trim()

    if (name === 'fullName' && !trimmedValue) {
      return 'Full name is required.'
    }

    if (name === 'email') {
      if (!trimmedValue) {
        return 'Email is required.'
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailPattern.test(trimmedValue)) {
        return 'Invalid email format.'
      }
    }

    if (['jobTitle', 'company', 'phone', 'bio'].includes(name) && !trimmedValue) {
      return `${name === 'jobTitle' ? 'Job title' : name.charAt(0).toUpperCase() + name.slice(1)} is required.`
    }

    return ''
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }))
  }

  function handleBlur(event) {
    const { name, value } = event.target

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = Object.keys(formValues).reduce((collectedErrors, fieldName) => {
      if (fieldName === 'avatarUrl') {
        return collectedErrors
      }

      const validationMessage = validateField(fieldName, formValues[fieldName])

      if (validationMessage) {
        collectedErrors[fieldName] = validationMessage
      }

      return collectedErrors
    }, {})

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatusMessage('Please fix the highlighted fields before submitting.')
      return
    }

    onAddContact({
      fullName: formValues.fullName.trim(),
      jobTitle: formValues.jobTitle.trim(),
      company: formValues.company.trim(),
      phone: formValues.phone.trim(),
      email: formValues.email.trim(),
      bio: formValues.bio.trim(),
      avatarUrl: formValues.avatarUrl.trim(),
    })

    setFormValues(emptyForm)
    setErrors({})
    setStatusMessage('Contact card added successfully.')
  }

  return (
    <form className="contact-form card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className={errors.fullName ? 'field-group field-group--error' : 'field-group'}>
          <span>Full name <em>*</em></span>
          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            value={formValues.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <small className="field-error">{errors.fullName}</small>
        </label>

        <label className={errors.jobTitle ? 'field-group field-group--error' : 'field-group'}>
          <span>Job title <em>*</em></span>
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter job title"
            value={formValues.jobTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <small className="field-error">{errors.jobTitle}</small>
        </label>

        <label className={errors.company ? 'field-group field-group--error' : 'field-group'}>
          <span>Company <em>*</em></span>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={formValues.company}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <small className="field-error">{errors.company}</small>
        </label>

        <label className={errors.phone ? 'field-group field-group--error' : 'field-group'}>
          <span>Phone <em>*</em></span>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formValues.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <small className="field-error">{errors.phone}</small>
        </label>

        <label className={errors.email ? 'field-group field-group--error' : 'field-group'}>
          <span>Email <em>*</em></span>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <small className="field-error">{errors.email}</small>
        </label>

        <label className="field-group">
          <span>Avatar URL</span>
          <input
            type="url"
            name="avatarUrl"
            placeholder="Optional image link"
            value={formValues.avatarUrl}
            onChange={handleChange}
          />
          <small className="field-error"></small>
        </label>
      </div>

      <label className={errors.bio ? 'field-group field-group--error' : 'field-group'}>
        <span>Short bio / description <em>*</em></span>
        <textarea
          name="bio"
          rows="4"
          placeholder="Write a short professional bio"
          value={formValues.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <small className="field-error">{errors.bio}</small>
      </label>

      <div className="form-footer">
        <button className="primary-action" type="submit">Add Contact</button>
        <p className="form-status" aria-live="polite">
          {statusMessage}
        </p>
      </div>
    </form>
  )
}

export default ContactForm
