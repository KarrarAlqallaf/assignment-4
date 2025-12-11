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
    skillsTab: language === 'Eng' ? 'Skills' : 'المهارات',
    hobbiesTab: language === 'Eng' ? 'Hobbies' : 'الهوايات',
    skillsContent: language === 'Eng' ? 'Figma, Python, Java, React & more' : 'فيجما، بايثون، جافا، رياكت والمزيد',
    hobbiesContent: language === 'Eng' ? 'Motor Sport, Gaming & Fitness' : ' السيارات، الألعاب الرقمية و كمال الأجسام',
    contactTitle: language === 'Eng' ? 'Contact me in:' : 'تواصل معي في:',
    copyButton: language === 'Eng' ? 'Copy' : 'نسخ',
    emailCopiedMessage: language === 'Eng' ? 'Email copied successfully!' : 'تم نسخ البريد الإلكتروني بنجاح!',
    themeBTN_TextDark: language === 'Eng' ? 'Dark' : 'داكن',
    themeBTN_TextWhite: language === 'Eng' ? 'White' : 'مضيء'

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
          imageSrc="/src/assets/Images/My circle image.png"
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
      {/* (ProjectContainer titles should be updated inside ProjectContainer component 
          if it needs to be multilingual) */}
      <div style={{
        height: '400px',
        overflow: 'auto'
      }}>
        {activeTab === 'projects' && (
          <>
            <GitHubRepos language={language} />
          </>
        )}

        {activeTab === 'skills' && (
          <Row>
            {/* --- Skills Content Translation --- */}
            <p className='shP'>{text.skillsContent}</p>
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
      <Row padding="15px 0" align="flex-end" gap='25px'>
        <h2 className='contact'>{text.contactTitle}</h2>
        <p className='email'>contact.karrar@gmail.com</p>
        <button 
          className={`copy-email-btn ${isCopied ? 'glow' : ''}`}
          onClick={handleCopyEmail}
        >
          {text.copyButton}
        </button>
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