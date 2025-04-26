// Main.js - Core presentation initialization and configuration

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slide content
    initializeSlides();
    
    // Initialize RevealJS
    const deck = new Reveal({
        // Presentation settings
        width: 1200,
        height: 700,
        margin: 0.04,
        minScale: 0.2,
        maxScale: 2.0,
        
        // Display settings
        controls: true,
        progress: true,
        center: true,
        hash: true,
        
        // Transition settings
        transition: 'slide',
        transitionSpeed: 'default',
        
        // Plugin settings
        plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
        
        // Custom settings
        autoAnimateDuration: 1.0,
        autoAnimateEasing: 'ease-out',
        
        // Enable slide control via keyboard, touch, and gamepads
        keyboard: true,
        touch: true,
        
        // Configure markdown processing
        markdown: {
            smartypants: true,
            smartLists: true,
            breaks: false,
            linkify: true
        },
        
        // Custom callbacks
        dependencies: []
    });
    
    // Initialize the presentation
    deck.initialize().then(() => {
        console.log('Presentation initialized');
        
        // Initialize and draw SVG graphics after reveal is ready
        initializeGraphics();
        
        // Initialize speaker notes
        initializeSpeakerNotes();
        
        // Set up theme switcher
        setupThemeSwitcher();
        
        // Add event listeners for slide transitions
        deck.addEventListener('slidechanged', function(event) {
            // Get current slide
            const currentSlide = event.currentSlide;
            const slideIndex = deck.getIndices().h;
            
            // Update graphics on slide change
            updateGraphicsForSlide(slideIndex, currentSlide);
            
            // Update speaker notes display if visible
            updateVisibleSpeakerNotes(slideIndex);
            
            // Log for debugging
            console.log('Slide changed to:', slideIndex);
        });
        
        // Add event listener for fragment changes
        deck.addEventListener('fragmentshown', function(event) {
            const fragment = event.fragment;
            handleFragmentAnimation(fragment);
        });
    });
    
    // Initialize event listeners
    document.getElementById('toggle-notes').addEventListener('click', function() {
        toggleSpeakerNotes();
    });
    
    // Keyboard shortcut for speaker notes (redundant with RevealJS 'S' key but added for consistency)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'n' && (event.ctrlKey || event.metaKey)) {
            toggleSpeakerNotes();
        }
    });
});

// Set up theme switcher
function setupThemeSwitcher() {
    // Create theme switcher container if it doesn't exist
    if (!document.querySelector('.theme-switcher')) {
        const themeSwitcher = document.createElement('div');
        themeSwitcher.className = 'theme-switcher';
        
        // Add theme options
        const themes = ['default', 'neural', 'fractal', 'minimal', 'tapestry'];
        themes.forEach(theme => {
            const themeOption = document.createElement('div');
            themeOption.className = `theme-option theme-${theme}`;
            themeOption.setAttribute('data-theme', theme);
            themeOption.title = `${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`;
            
            // Set active class on current theme
            if (theme === 'default') {
                themeOption.classList.add('active');
            }
            
            // Add click handler
            themeOption.addEventListener('click', function() {
                switchTheme(theme);
                
                // Update active class
                document.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
            });
            
            themeSwitcher.appendChild(themeOption);
        });
        
        document.body.appendChild(themeSwitcher);
    }
}

// Switch between themes
function switchTheme(theme) {
    // Remove existing theme classes
    document.body.classList.remove('theme-neural', 'theme-fractal', 'theme-minimal', 'theme-tapestry');
    
    // Add new theme class if not default
    if (theme !== 'default') {
        document.body.classList.add(`theme-${theme}`);
    }
    
    // Update any graphics that depend on theme colors
    updateGraphicsColors();
    
    console.log(`Switched to ${theme} theme`);
}

// Handle fragment animations
function handleFragmentAnimation(fragment) {
    // Get the fragment's data attributes
    const animationType = fragment.getAttribute('data-animation-type');
    const targetId = fragment.getAttribute('data-target');
    
    if (animationType && targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            switch (animationType) {
                case 'fade-in':
                    anime({
                        targets: target,
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeInOutQuad'
                    });
                    break;
                    
                case 'draw-line':
                    anime({
                        targets: target,
                        strokeDashoffset: [anime.setDashoffset, 0],
                        easing: 'easeInOutSine',
                        duration: 1500,
                        delay: function(el, i) { return i * 250 },
                        direction: 'alternate',
                        loop: false
                    });
                    break;
                    
                case 'connect':
                    // For attention visualization
                    const connections = document.querySelectorAll(`[data-connection="${targetId}"]`);
                    anime({
                        targets: connections,
                        opacity: [0, 1],
                        strokeWidth: [1, function(el) { 
                            return el.getAttribute('data-weight') || 2;
                        }],
                        duration: 1000,
                        easing: 'easeInOutQuad'
                    });
                    break;
                    
                default:
                    console.log(`Unknown animation type: ${animationType}`);
            }
        }
    }
}

// Update graphics when theme changes
function updateGraphicsColors() {
    // Get current CSS variables
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim();
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    
    // Update SVG elements with theme-dependent colors
    document.querySelectorAll('[data-color="primary"]').forEach(el => {
        if (el.tagName === 'path' || el.tagName === 'line' || el.tagName === 'circle' || el.tagName === 'rect') {
            el.setAttribute('stroke', primary);
        } else {
            el.setAttribute('fill', primary);
        }
    });
    
    document.querySelectorAll('[data-color="secondary"]').forEach(el => {
        if (el.tagName === 'path' || el.tagName === 'line' || el.tagName === 'circle' || el.tagName === 'rect') {
            el.setAttribute('stroke', secondary);
        } else {
            el.setAttribute('fill', secondary);
        }
    });
    
    document.querySelectorAll('[data-color="accent"]').forEach(el => {
        if (el.tagName === 'path' || el.tagName === 'line' || el.tagName === 'circle' || el.tagName === 'rect') {
            el.setAttribute('stroke', accent);
        } else {
            el.setAttribute('fill', accent);
        }
    });
    
    // If we have any D3 visualizations active, update them
    if (typeof updateD3Visualizations === 'function') {
        updateD3Visualizations();
    }
}