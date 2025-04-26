// graphics-core.js - Core initialization and utility functions for visualizations

// Initialize all graphics
function initializeGraphics() {
    // Create static SVGs from graphics-static.js
    createTitleGraphic();
    createThreadsToFabric();
    createNeuralConnections();
    createSelfAttention();
    createAttentionWeights();
    createEmbeddingSpace();
    createTransformerLayers();
    createFractalPatterns();
    createEmergenceScale();
    
    // Create static SVGs from graphics-interactive.js
    createLanguageTranslation();
    createMedicalDiagnosis();
    createHumanAIWeaving();
    createIntelligenceFabric();
    
    // Initialize interactive visualizations
    initializeAttentionVisualization();
    initializeEmbeddingVisualization();
    
    // Update colors based on current theme
    updateGraphicsColors();
}

// Update graphics for specific slide
function updateGraphicsForSlide(slideIndex, slideElement) {
    // Handle any slide-specific animations or updates
    switch(slideIndex) {
        case 0: // Title slide
            animateTitleGraphic();
            break;
        case 2: // Neural connections
            animateNeuralConnections();
            break;
        case 3: // Self-attention
            animateSelfAttention();
            break;
        // Add more cases as needed
    }
}

// Update D3 visualizations when theme changes
function updateGraphicsColors() {
    // This updates any dynamic D3 visualizations if the theme changes
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

// ----- Helper Functions -----

// Helper function to create a curved path for attention lines
function createAttentionPath(source, target, curvature = 1) {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dr = Math.sqrt(dx * dx + dy * dy) * curvature;
    
    return `M${source.x},${source.y} A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
}