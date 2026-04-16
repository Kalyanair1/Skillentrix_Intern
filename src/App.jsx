import { useEffect, useMemo, useState } from 'react'
import ContactForm from './components/ContactForm.jsx'
import ContactList from './components/ContactList.jsx'

const STORAGE_KEY = 'reactContactCardsManager.contacts'
const STORAGE_VERSION_KEY = 'reactContactCardsManager.sampleVersion'
const SAMPLE_DATA_VERSION = '2026-04-16-v3'

const initialContacts = [
  {
    id: crypto.randomUUID(),
    fullName: 'Tejas KM',
    jobTitle: 'Full Stack Developer',
    company: 'Microsoft',
    phone: '+91 98765 11223',
    email: 'tejas.km@gmail.com',
    bio: 'Passionate developer who builds clean, user-friendly web applications',
    avatarUrl: '',
  },
  {
    id: crypto.randomUUID(),
    fullName: 'Sriram Puranik',
    jobTitle: 'Frontend Developer',
    company: 'Pixel Forge',
    phone: '+91 99887 44556',
    email: 'sriram.puranik@gmail.com',
    bio: 'Builds responsive web apps with a strong focus on accessibility and performance.',
    avatarUrl: '',
  },
  {
    id: crypto.randomUUID(),
    fullName: 'Udayan Gogoi',
    jobTitle: 'Marketing Lead',
    company: 'Orbit Labs',
    phone: '+91 90123 77889',
    email: 'udayan.gogoi@gmail.com',
    bio: 'Connects brands with people through campaigns, strategy, and memorable storytelling.',
    avatarUrl: '',
  },
]

function getStoredContacts() {
  const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY)
  const savedContacts = localStorage.getItem(STORAGE_KEY)

  if (savedVersion !== SAMPLE_DATA_VERSION) {
    return initialContacts
  }

  if (!savedContacts) {
    return initialContacts
  }

  try {
    const parsedContacts = JSON.parse(savedContacts)
    return Array.isArray(parsedContacts) && parsedContacts.length > 0
      ? parsedContacts
      : initialContacts
  } catch {
    return initialContacts
  }
}

function App() {
  const [contacts, setContacts] = useState(() => getStoredContacts())
  const [searchTerm, setSearchTerm] = useState('')
  const [saveMessage, setSaveMessage] = useState('Contacts are saved in this browser automatically.')

  useEffect(() => {
    const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY)

    if (savedVersion === SAMPLE_DATA_VERSION) {
      return
    }

    localStorage.removeItem(STORAGE_KEY)
    localStorage.setItem(STORAGE_VERSION_KEY, SAMPLE_DATA_VERSION)
    setContacts(initialContacts)
    setSaveMessage('Sample contacts updated from the latest code.')
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
    localStorage.setItem(STORAGE_VERSION_KEY, SAMPLE_DATA_VERSION)
    setSaveMessage('All changes saved in this browser.')
  }, [contacts])

  const filteredContacts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()

    if (!normalizedTerm) {
      return contacts
    }

    return contacts.filter((contact) => {
      return [contact.fullName, contact.company].some((value) =>
        value.toLowerCase().includes(normalizedTerm),
      )
    })
  }, [contacts, searchTerm])

  function handleAddContact(contactDetails) {
    setContacts((currentContacts) => [
      {
        id: crypto.randomUUID(),
        ...contactDetails,
      },
      ...currentContacts,
    ])
    setSaveMessage('New contact added and saved locally.')
  }

  function handleDeleteContact(contactId) {
    setContacts((currentContacts) =>
      currentContacts.filter((contact) => contact.id !== contactId),
    )
    setSaveMessage('Contact deleted and local data updated.')
  }

  function handleResetContacts() {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.setItem(STORAGE_VERSION_KEY, SAMPLE_DATA_VERSION)
    setContacts(initialContacts)
    setSearchTerm('')
    setSaveMessage('Sample contacts restored.')
  }

  function handleClearContacts() {
    localStorage.removeItem(STORAGE_KEY)
    setContacts([])
    setSearchTerm('')
    setSaveMessage('All saved contacts cleared from this browser.')
  }

  function handleExportContacts() {
    const contactBlob = new Blob([JSON.stringify(contacts, null, 2)], {
      type: 'application/json',
    })
    const exportUrl = URL.createObjectURL(contactBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = exportUrl
    downloadLink.download = 'skillentrix-contacts.json'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    URL.revokeObjectURL(exportUrl)
    setSaveMessage('Contacts exported as JSON.')
  }

  return (
    <div className="app-shell">
      <div className="project-bar">
        <div>
          <p className="project-bar__label">Contact Management Project</p>
          <h2>Smart Contact Dashboard</h2>
        </div>
        <div className="project-bar__meta">
          <span>React SPA</span>
          <span>Responsive UI</span>
          <span>localStorage Enabled</span>
        </div>
      </div>

      <header className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Modern Contact Management</p>
          <h1>React Contact Cards Manager</h1>
          <p className="hero__text">
            A single-page React application for adding, organizing, and filtering
            digital business cards with reusable components and responsive design.
          </p>
          <div className="hero__chips">
            <span>Add contacts instantly</span>
            <span>Search in real time</span>
            <span>Persist after refresh</span>
          </div>
          <div className="hero__stats" aria-label="Project summary">
            <div>
              <strong>{contacts.length}</strong>
              <span>Total contacts</span>
            </div>
            <div>
              <strong>{filteredContacts.length}</strong>
              <span>Visible results</span>
            </div>
            <div>
              <strong>React</strong>
              <span>Hooks + components</span>
            </div>
          </div>
        </div>
        <aside className="hero__panel">
          <h2>Included Features</h2>
          <ul className="feature-list">
            <li>Controlled form inputs for contact details</li>
            <li>Dynamic card creation without page refresh</li>
            <li>Reusable `ContactCard` and `ContactList` components</li>
            <li>Real-time search by name or company</li>
            <li>Responsive card grid with hover effects</li>
            <li>Browser-side persistence using localStorage</li>
          </ul>
          <div className="storage-note">
            <strong>Save behavior</strong>
            <p>
              The PDF mainly asks for React state and live filtering. Saving data is an
              extra improvement, and this version stores contacts in your browser so they
              remain after refresh.
            </p>
          </div>
        </aside>
      </header>

      <section className="overview-grid" aria-label="Project overview">
        <article className="overview-card card">
          <p className="eyebrow">Objective</p>
          <h3>Build a modular contact management SPA</h3>
          <p>
            This project demonstrates React component composition, controlled form
            handling, derived filtering logic, and browser-side persistence.
          </p>
        </article>
        <article className="overview-card card">
          <p className="eyebrow">Tech Stack</p>
          <h3>React, JavaScript, CSS, Vite</h3>
          <p>
            The application uses functional components, hooks, reusable styling,
            and a responsive layout suitable for desktop and mobile screens.
          </p>
        </article>
        <article className="overview-card card">
          <p className="eyebrow">Outcome</p>
          <h3>Fast, clean, and ready to use</h3>
          <p>
            Contacts can be created without refresh, searched instantly, and kept
            available with localStorage after the page reloads.
          </p>
        </article>
      </section>

      <main className="workspace">
        <section className="workspace__left" aria-labelledby="add-contact-heading">
          <div className="section-heading">
            <p className="eyebrow">ContactForm</p>
            <h2 id="add-contact-heading">Add a new contact card</h2>
          </div>
          <ContactForm onAddContact={handleAddContact} />
        </section>

        <section className="workspace__right" aria-labelledby="contact-list-heading">
          <div className="toolbar">
            <div>
              <div className="section-heading section-heading--compact">
                <p className="eyebrow">ContactList</p>
                <h2 id="contact-list-heading">Saved contacts</h2>
              </div>
              <p className="save-banner" aria-live="polite">
                {saveMessage}
              </p>
            </div>
            <div className="toolbar__actions">
              <label className="search-field" htmlFor="search">
                <span>Search by name or company</span>
                <input
                  id="search"
                  type="search"
                  placeholder="Try 'Pixel' or 'Nisha'"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </label>
              <button
                className="secondary-button"
                type="button"
                onClick={handleExportContacts}
              >
                Export JSON
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={handleResetContacts}
              >
                Reset Sample Data
              </button>
              <button
                className="secondary-button secondary-button--danger"
                type="button"
                onClick={handleClearContacts}
              >
                Clear All
              </button>
            </div>
          </div>

          <ContactList
            contacts={filteredContacts}
            searchTerm={searchTerm}
            onDeleteContact={handleDeleteContact}
          />
        </section>
      </main>

      <footer className="site-footer">
        <p>Project 2: React Contact Cards Manager</p>
        <p>Includes reusable components, live filtering, and localStorage persistence.</p>
      </footer>
    </div>
  )
}

export default App
