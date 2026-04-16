import ContactCard from './ContactCard.jsx'

function ContactList({ contacts, searchTerm, onDeleteContact }) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state card">
        <h3>No contacts found</h3>
        <p>
          No card matches <strong>{searchTerm}</strong>. Try another name or
          company, or add a new contact.
        </p>
      </div>
    )
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </div>
  )
}

export default ContactList
