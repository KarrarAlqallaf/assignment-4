import { useEffect, useState } from 'react'
import './projContainer.css'

const ProjectContainer = ({
    title,
    imageSrc,
    imageAlt = "Project image",
    images = null, // Array of { dark: 'path', light: 'path' } for theme-based images
    align = "center", 
    justify = "flex-start", 
    wrap = false,
    className = "",
    url = null,
    onClick = null
}) => {
    const [currentTheme, setCurrentTheme] = useState('molokai-dark')

    useEffect(() => {
        const root = document.documentElement
        const theme = root.getAttribute('data-theme') === 'molokai-white-mod' 
            ? 'molokai-white-mod' 
            : 'molokai-dark'
        setCurrentTheme(theme)

        // Watch for theme changes
        const observer = new MutationObserver(() => {
            const newTheme = root.getAttribute('data-theme') === 'molokai-white-mod' 
                ? 'molokai-white-mod' 
                : 'molokai-dark'
            setCurrentTheme(newTheme)
        })

        observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

        return () => observer.disconnect()
    }, [])

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (url) {
            window.open(url, '_blank');
        }
    }

    // Determine which images to display
    const getImageSources = () => {
        if (images && Array.isArray(images)) {
            return images.map(img => ({
                src: currentTheme === 'molokai-dark' ? img.dark : img.light,
                alt: imageAlt
            }))
        }
        return imageSrc ? [{ src: imageSrc, alt: imageAlt }] : []
    }

    const imageSources = getImageSources()

    return (
        <div 
            className={`project-container ${className} ${url || onClick ? 'clickable' : ''}`}
            style={{
                alignItems: align,
                justifyContent: justify,
                flexWrap: wrap ? "wrap" : "nowrap",
            }}
            onClick={handleClick}
        >
            {title && <h3 className="project-title">{title}</h3>}
            <div className="project-images-container">
                {imageSources.map((img, index) => (
                    <img 
                        key={index}
                        src={img.src} 
                        alt={`${img.alt} ${index + 1}`} 
                        className={`project-image ${imageSources.length > 1 ? 'dual-image' : ''}`} 
                    />
                ))}
            </div>
        </div>
    )
}

export default ProjectContainer