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
        
        // Background settings
        backgroundTransition: 'fade', // Background transition effect
        
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
    
    // Info button event listener
    document.getElementById('show-info').addEventListener('click', function() {
        showInfoModal();
    });
    
    // Close modal button event listener
    document.getElementById('close-modal').addEventListener('click', function() {
        hideInfoModal();
    });
    
    // Close modal when clicking on overlay
    document.getElementById('modal-overlay').addEventListener('click', function() {
        hideInfoModal();
    });
    
    // View full notes button event listener
    document.getElementById('view-full-notes').addEventListener('click', function() {
        showFullNotesModal();
    });
    
    // Close full notes modal button event listener
    document.getElementById('close-full-notes').addEventListener('click', function() {
        hideFullNotesModal();
    });
    
    // Keyboard shortcut for speaker notes (redundant with RevealJS 'S' key but added for consistency)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'n' && (event.ctrlKey || event.metaKey)) {
            toggleSpeakerNotes();
        }
        // Escape key to close modals
        if (event.key === 'Escape') {
            hideInfoModal();
            hideFullNotesModal();
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

// Show the info modal with presentation details
function showInfoModal() {
    // Populate slide list
    populateSlideList();
    
    // Calculate and display total word count
    calculateTotalWordCount();
    
    // Show modal and overlay
    document.getElementById('info-modal').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
}

// Hide the info modal
function hideInfoModal() {
    document.getElementById('info-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}

// Populate the slide list in the modal
function populateSlideList() {
    const slideList = document.getElementById('slide-list');
    slideList.innerHTML = ''; // Clear existing content
    
    // Get all slides - use RevealJS sections instead of .slide class
    const slides = document.querySelectorAll('.reveal .slides section');
    
    // Loop through slides and add to list
    slides.forEach((slide, index) => {
        const li = document.createElement('li');
        
        // Get slide title (h1, h2, or first text content)
        let title = '';
        const h1 = slide.querySelector('h1');
        const h2 = slide.querySelector('h2');
        
        if (h1) {
            title = h1.textContent;
        } else if (h2) {
            title = h2.textContent;
        } else {
            // Get first paragraph or any text content
            const p = slide.querySelector('p');
            if (p) {
                title = p.textContent.substring(0, 50) + (p.textContent.length > 50 ? '...' : '');
            } else {
                title = `Slide ${index + 1}`;
            }
        }
        
        li.textContent = `${index + 1}. ${title}`;
        slideList.appendChild(li);
    });
}

// Calculate total word count of speaker notes
function calculateTotalWordCount() {
    let totalWords = 0;
    
    // Loop through all speaker notes
    for (const slideIndex in speakerNotes) {
        if (speakerNotes.hasOwnProperty(slideIndex)) {
            const noteText = speakerNotes[slideIndex];
            // Count words (split by whitespace)
            const words = noteText.trim().split(/\s+/);
            totalWords += words.length;
        }
    }
    
    // Update the word count display
    document.getElementById('total-word-count').textContent = totalWords;
}

// Show the full notes modal
function showFullNotesModal() {
    // Populate full notes content
    populateFullNotes();
    
    // Show the full notes modal
    document.getElementById('full-notes-modal').style.display = 'block';
    
    // Hide the info modal
    hideInfoModal();
}

// Hide the full notes modal
function hideFullNotesModal() {
    document.getElementById('full-notes-modal').style.display = 'none';
}

// Populate the full notes modal with all speaker notes
function populateFullNotes() {
    const fullNotesContent = document.getElementById('full-notes-content');
    fullNotesContent.innerHTML = ''; // Clear existing content
    
    // Get all slides
    const slides = document.querySelectorAll('.reveal .slides section');
    
    // Loop through slides and add notes for each
    slides.forEach((slide, index) => {
        // Skip if no notes for this slide
        if (!speakerNotes[index + 1]) {
            return;
        }
        
        // Create note item container
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        
        // Get slide title
        let title = '';
        const h1 = slide.querySelector('h1');
        const h2 = slide.querySelector('h2');
        
        if (h1) {
            title = h1.textContent;
        } else if (h2) {
            title = h2.textContent;
        } else {
            title = `Slide ${index + 1}`;
        }
        
        // Create title element
        const titleElement = document.createElement('h3');
        titleElement.className = 'note-title';
        titleElement.textContent = `${index + 1}. ${title}`;
        
        // Create text element
        const textElement = document.createElement('div');
        textElement.className = 'note-text';
        textElement.textContent = speakerNotes[index + 1];
        
        // Add elements to note item
        noteItem.appendChild(titleElement);
        noteItem.appendChild(textElement);
        
        // Add note item to content
        fullNotesContent.appendChild(noteItem);
    });
}
