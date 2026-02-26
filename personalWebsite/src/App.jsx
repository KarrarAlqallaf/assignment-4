import { useState, useEffect } from 'react'
import Circle from './Circle'
import Row from './Row'
import Column from './Column'
import './App.css'
import ProjectContainer from './projContainer'
import GitHubRepos from './GitHubRepos'
import Countdown from './Countdown'

const App = () => {
  const [activeTab, setActiveTab] = useState('projects')

  // Initialize language from localStorage, default to 'Eng' if not found
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage')
    return savedLanguage || 'Eng'
  })

  // Initialize theme from localStorage, default to Molokai dark
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('preferredTheme')
    return savedTheme || 'molokai-dark'
  })

  // State for copy button glow and success message
  const [isCopied, setIsCopied] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'Eng' ? 'Arb' : 'Eng'));
  };

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language)
  }, [language])

  // Apply and persist theme preference
  useEffect(() => {
    const root = document.documentElement

    if (theme === 'molokai-dark') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }

    localStorage.setItem('preferredTheme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'molokai-dark' ? 'molokai-white-mod' : 'molokai-dark'
    )
  }

  // Handle email copy
  const handleCopyEmail = async () => {
    const email = 'contact.karrar@gmail.com'
    try {
      await navigator.clipboard.writeText(email)
      setIsCopied(true)
      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  // Helper object for simple content translation
  const text = {
    headerTitle: language === 'Eng' ? 'Karrar Alqallaf' : 'كرار القلاف',
    headerDescription: language === 'Eng'
      ? 'King Fahd University of Petroleum and Minerals computer science student. Saudi born at 2004 in Qatif.'
      : 'طالب علوم حاسب بجامعة الملك فهد للبترول والمعادن. سعودي مواليد 2004 في القطيف.',
    projectsTab: language === 'Eng' ? 'Projects' : 'المشاريع',
    repositoriesTab: language === 'Eng' ? 'Repositories' : 'المستودعات',
    skillsTab: language === 'Eng' ? 'Skills' : 'المهارات',
    hobbiesTab: language === 'Eng' ? 'Hobbies' : 'الهوايات',
    skillsContent: language === 'Eng' ? '---------Languages---------\n Python, Java, JavaScript, HTML, CSS\n\n---------Frameworks---------\n React, MongoDB, Full-Stack Web Development\n\n---------Tools---------\n VS Code, Cursor, Antigravity, JetBrains IDEs, Figma, Git' : '---------اللغات---------\n Python, Java, JavaScript, HTML, CSS\n\n---------البيئات---------\n React, MongoDB, Full-Stack Web Development\n\n---------الأدوات---------\n VS Code, Cursor, Antigravity, JetBrains IDEs, Figma',
    hobbiesContent: language === 'Eng' ? 'Motor Sport, Gaming & Fitness' : 'سباق السيارات، الألعاب واللياقة البدنية',
    contactTitle: language === 'Eng' ? 'Contact me in:' : 'تواصل معي في:',
    copyButton: language === 'Eng' ? 'Copy' : 'نسخ',
    emailCopiedMessage: language === 'Eng' ? 'Email copied successfully!' : 'تم نسخ البريد الإلكتروني بنجاح!',
    themeBTN_TextDark: language === 'Eng' ? 'Dark' : 'داكن',
    themeBTN_TextWhite: language === 'Eng' ? 'White' : 'مضيء',
    or: language === 'Eng' ? 'or' : 'أو'

  }

  return (
    // Set text direction based on language
    <div className="appContainer" dir={language === 'Arb' ? 'rtl' : 'ltr'}>

      {/* header section */}
      <Row justify="flex-start" padding="50px 0 0 0" dir="ltr" gap='10px'>
        <button
          className={`languageBTN ${language === 'Eng' ? 'EngActive' : 'ArbActive'}`}
          onClick={toggleLanguage}
        >
          {/* Button displays the language it switches *to* */}
          {language === 'Eng' ? 'عربي' : 'Engl'}
        </button>
        <button
          className="themeBTN"
          onClick={toggleTheme}
        >
          {theme === 'molokai-dark' ? text.themeBTN_TextWhite : text.themeBTN_TextDark}
        </button>
      </Row>




      {/* --- Header Content Translation --- */}
      <Row>
        <Column>
          <h1 className='header-title'>
            {text.headerTitle}
          </h1>
          <p className='header-description'>

            {text.headerDescription}
          </p>
        </Column>
        <Circle
          imageSrc="/My circle image.png"
          alt="Karrar Alqallaf profile picture"
        />
      </Row>

      <Row>
        <Countdown language={language} />
      </Row>


      {/* info section (Tabs) */}
      <Row>
        {/* --- Tabs Translation --- */}
        <button
          className={`infoBTNs ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => handleTabClick('projects')}
        >
          {text.projectsTab}
        </button>
        <button
          className={`infoBTNs ${activeTab === 'repositories' ? 'active' : ''}`}
          onClick={() => handleTabClick('repositories')}
        >
          {text.repositoriesTab}
        </button>
        <button
          className={`infoBTNs ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => handleTabClick('skills')}
        >
          {text.skillsTab}
        </button>
        <button
          className={`infoBTNs ${activeTab === 'hobbies' ? 'active' : ''}`}
          onClick={() => handleTabClick('hobbies')}
        >
          {text.hobbiesTab}
        </button>
      </Row>

      {/* Content sections - only show active tab */}
      <div style={{
        height: '775px',      // Keep your fixed height
        overflowY: 'auto',    // ONLY allow vertical scrolling
        overflowX: 'hidden',  // Disable horizontal scrolling
        width: '100%',
      
      }}>
        {activeTab === 'projects' && (
          <Row wrap={true} gap="20px" padding="20px 0">
            <ProjectContainer
              title="JadwalGYM"
              images={[
                { dark: '/jd1dark.png', light: '/jd1light.png' },
                { dark: '/jd2dark.png', light: '/jd2light.png' }
              ]}
              imageAlt="JadwalGYM project"
              url="https://jadwal-gym-git-main-karraralqallafs-projects.vercel.app/"
            />
          </Row>
        )}

        {activeTab === 'repositories' && (
          <GitHubRepos language={language} />
        )}

        {activeTab === 'skills' && (
          <Row>
            {/* --- Skills Content Translation --- */}
            <p className='shP'
            style={{ 
              whiteSpace: 'pre-wrap',   // Respects line breaks and wraps text
              wordBreak: 'break-word',  // Forces long strings to break
              width: '100%',            // Ensures text stays within the parent width
              margin: 0                 // Prevents unexpected scroll jumps
          }}>{text.skillsContent}</p>
          </Row>
        )}

        {activeTab === 'hobbies' && (
          <Row>
            {/* --- Hobbies Content Translation --- */}
            <p className='shP'>{text.hobbiesContent}</p>
          </Row>
        )}
      </div>


      {/* contact section - email with copy button */}
      <Row padding="15px 0" align="center" gap='25px'>
        <h2 className='contact'>{text.contactTitle}</h2>
        <p className='email'>contact.karrar@gmail.com</p>
   
        <button 
          className={`copy-email-btn ${isCopied ? 'glow' : ''}`}
          onClick={handleCopyEmail}
        >
          {text.copyButton}
        </button>
        <p className='email'>{text.or}</p>
        <a 
          href="https://www.linkedin.com/in/karrar-ahmed-318936353/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="linkedin-icon-link"
          aria-label="LinkedIn Profile"
        >
          <svg 
            className="linkedin-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </Row>

      {/* Success Message - always reserve space */}
      <Row padding="15px 0">
        {isCopied ? (
          <p className='email-copied-message'>{text.emailCopiedMessage}</p>
        ) : (
          <p className='email-copied-message' style={{ visibility: 'hidden', height: 'auto' }} aria-hidden="true">{text.emailCopiedMessage}</p>
        )}
      </Row>

    </div>
  )
}

export default App