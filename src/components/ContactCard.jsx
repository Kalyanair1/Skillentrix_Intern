function ContactCard({ contact, onDeleteContact }) {
  const initials = contact.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0]?.toUpperCase())
    .join('')

  return (
    <article className="contact-card card">
      <div className="contact-card__header">
        <div className="contact-card__identity">
          {contact.avatarUrl ? (
            <img
              className="contact-card__avatar"
              src={contact.avatarUrl}
              alt={`${contact.fullName} avatar`}
            />
          ) : (
            <div className="contact-card__avatar contact-card__avatar--placeholder" aria-hidden="true">
              {initials || 'NA'}
            </div>
          )}

          <div>
            <h3>{contact.fullName}</h3>
            <p className="contact-card__role">
              {contact.jobTitle} at {contact.company}
            </p>
          </div>
        </div>
        <button
          className="card-action"
          type="button"
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </div>

      <p className="contact-card__bio">{contact.bio}</p>

      <dl className="contact-card__details">
        <div>
          <dt>Phone</dt>
          <dd>{contact.phone}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </dd>
        </div>
      </dl>
    </article>
  )
}

export default ContactCard
