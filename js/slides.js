// slides.js - Contains all slide content and initialization

// Initialize all slides and add them to the presentation
function initializeSlides() {
    const slidesContainer = document.getElementById('presentation-slides');
    
    // Add all slides to the container
    slidesContainer.innerHTML = createSlideContent();
    
    // After slides are added to the DOM, check for background images
    checkForBackgroundImages();
}

// Check for background images for each slide
function checkForBackgroundImages() {
    const slides = document.querySelectorAll('.reveal .slides section');
    
    slides.forEach((slide, index) => {
        // Slide index is 1-based in the UI but 0-based in the DOM
        const slideNumber = index + 1;
        
        // Create an image element to test if the background image exists
        const img = new Image();
        
        // Try different image formats
        const formats = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
        let formatIndex = 0;
        
        function tryNextFormat() {
            if (formatIndex < formats.length) {
                const format = formats[formatIndex];
                img.src = `assets/back_${slideNumber}.${format}`;
                formatIndex++;
            }
        }
        
        // If image loads successfully, set it as background
        img.onload = function() {
            // Add a data attribute with the background image path
            slide.setAttribute('data-background-image', img.src);
            
            // Set the CSS variable for the background image
            slide.style.setProperty('--bg-image', `url('${img.src}')`);
            
            // Add a class for additional styling
            slide.classList.add('has-background-image');
            
            console.log(`Background image found for slide ${slideNumber}: ${img.src}`);
        };
        
        // If image fails to load, try the next format
        img.onerror = function() {
            tryNextFormat();
        };
        
        // Start trying formats
        tryNextFormat();
    });
}

// Create all slide content as HTML
function createSlideContent() {
    return `
        <!-- Slide 1: Title -->
        <section class="slide-with-threads">
            <h1>Threadwork: Intelligence as a Fabric of Connections</h1>
            <h3>How Human Thought and Artificial Intelligence Are Woven from the Same Threads</h3>
            <div class="graphic-container">
                <svg id="title-graphic" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <div class="speaker-notes" id="speaker-note-1"></div>
        </section>

        <!-- Slide 2: From Threads to Fabric -->
        <section>
            <h2>From Threads to Fabric</h2>
            <div class="graphic-container">
                <svg id="threads-to-fabric" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>A single thread isn't much. But when woven, it creates meaning.</p>
            <div class="speaker-notes" id="speaker-note-2"></div>
        </section>

        <!-- Slide 3: Neural Connections -->
        <section>
            <h2>Neural Connections</h2>
            <div class="graphic-container">
                <svg id="neural-connections" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Your brain has 86 billion neurons, but the magic? The <em>connections</em>.</p>
            <div class="speaker-notes" id="speaker-note-3"></div>
        </section>

        <!-- Slide 4: Self-Attention in AI -->
        <section>
            <h2>Self-Attention in AI</h2>
            <div class="graphic-container">
                <svg id="self-attention" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Each word looks around, asking: "Who do I matter to?" That's how meaning forms.</p>
            <div class="speaker-notes" id="speaker-note-4"></div>
        </section>

        <!-- Slide 5: Attention Weights -->
        <section>
            <h2>Attention Weights</h2>
            <div class="graphic-container">
                <svg id="attention-weights" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Meaning emerges from weighted relationships in a dynamic fabric of attention.</p>
            <div class="speaker-notes" id="speaker-note-5"></div>
        </section>

        <!-- Slide 6: Embedding Space Geometry -->
        <section>
            <h2>Embedding Space Geometry</h2>
            <div class="graphic-container">
                <svg id="embedding-space" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>King - Man + Woman = Queen. That's geometry, not logic.</p>
            <div class="speaker-notes" id="speaker-note-6"></div>
        </section>

        <!-- Slide 7: Transformer Layers -->
        <section>
            <h2>Transformer Layers</h2>
            <div class="graphic-container">
                <svg id="transformer-layers" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Transformers stack layers, each refining meaning. Deep, recursive, like a fractal of thought.</p>
            <div class="speaker-notes" id="speaker-note-7"></div>
        </section>

        <!-- Slide 8: Fractal Patterns of Thought -->
        <section>
            <h2>Fractal Patterns of Thought</h2>
            <div class="graphic-container">
                <svg id="fractal-patterns" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Fractals repeat at every scale. Our thoughts do too—patterns within patterns.</p>
            <div class="speaker-notes" id="speaker-note-8"></div>
        </section>

        <!-- Slide 9: Emergence from Scale -->
        <section>
            <h2>Emergence from Scale</h2>
            <div class="graphic-container">
                <svg id="emergence-scale" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Scale enough connections and new abilities <em>emerge</em>—without new instructions, just denser threadwork.</p>
            <div class="speaker-notes" id="speaker-note-9"></div>
        </section>

        <!-- Slide 10: Practical Example: Language Translation -->
        <section>
            <h2>Practical Example: Language Translation</h2>
            <div class="graphic-container">
                <svg id="language-translation" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Modern translation weaves together context, grammar, cultural nuance, and idiomatic expressions.</p>
            <div class="speaker-notes" id="speaker-note-10"></div>
        </section>

        <!-- Slide 11: Practical Example: Medical Diagnosis -->
        <section>
            <h2>Practical Example: Medical Diagnosis</h2>
            <div class="graphic-container">
                <svg id="medical-diagnosis" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Medical AI weaves together patient history, symptoms, test results, and population data to find patterns humans might miss.</p>
            <div class="speaker-notes" id="speaker-note-11"></div>
        </section>

        <!-- Slide 12: Practical Example: Recommendation Systems -->
        <section>
            <h2>Practical Example: Recommendation Systems</h2>
            <div class="graphic-container">
                <svg id="recommendation-systems" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Recommendations emerge from invisible patterns in your preferences that even you might not see.</p>
            <div class="speaker-notes" id="speaker-note-12"></div>
        </section>

        <!-- Slide 13: Interactive: Attention Visualization -->
        <section>
            <h2>Interactive: Attention Visualization</h2>
            <div class="graphic-container interactive" id="attention-viz-container">
                <div id="attention-visualization">
                    <!-- D3 visualization will be inserted here -->
                </div>
                <div class="interactive-controls">
                    <input type="text" id="attention-input" placeholder="Enter a sentence..." 
                           value="The cat the dog chased was fast.">
                    <button id="visualize-btn">Visualize Attention</button>
                </div>
            </div>
            <p>Watch how changing one word causes the entire attention fabric to reconfigure.</p>
            <div class="speaker-notes" id="speaker-note-13"></div>
        </section>

        <!-- Slide 14: Interactive: Word Association in Embedding Space -->
        <section>
            <h2>Interactive: Word Association in Embedding Space</h2>
            <div class="graphic-container interactive" id="embedding-viz-container">
                <div id="embedding-visualization">
                    <!-- D3 visualization will be inserted here -->
                </div>
                <div class="interactive-controls">
                    <input type="text" id="word-input" placeholder="Enter a word...">
                    <button id="add-word-btn">Add Word</button>
                    <button id="clear-words-btn">Clear All</button>
                </div>
            </div>
            <p>Words with similar meanings cluster together, forming geometric patterns that reflect meaning.</p>
            <div class="speaker-notes" id="speaker-note-14"></div>
        </section>

        <!-- Slide 15: Code Example: Simple Attention -->
        <section>
            <h2>Code Example: Simple Attention</h2>
            <pre><code class="language-python">
# A simplified self-attention visualization
import numpy as np
import matplotlib.pyplot as plt

# Simple sentence representation
words = ["The", "cat", "the", "dog", "chased", "was", "fast"]

# Create a simple attention matrix
# Higher values mean stronger connections between words
attention = np.array([
    [0.7, 0.1, 0.0, 0.0, 0.1, 0.1, 0.0],  # "The" attends to "cat"
    [0.2, 0.5, 0.0, 0.0, 0.3, 0.0, 0.0],  # "cat" attends to itself and "chased"
    [0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],  # "the" attends to "dog"
    [0.0, 0.0, 0.1, 0.6, 0.3, 0.0, 0.0],  # "dog" attends to itself and "chased"
    [0.0, 0.3, 0.0, 0.3, 0.4, 0.0, 0.0],  # "chased" connects to "cat" and "dog"
    [0.0, 0.6, 0.0, 0.0, 0.0, 0.3, 0.1],  # "was" strongly attends to "cat"
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.8],  # "fast" mostly attends to itself and "was"
])

# Visualization code would go here
            </code></pre>
            <p>Even this simple matrix shows how words relate through connection strengths—the thread tension of meaning.</p>
            <div class="speaker-notes" id="speaker-note-15"></div>
        </section>

        <!-- Slide 16: Human + AI Weaving Together -->
        <section>
            <h2>Human + AI Weaving Together</h2>
            <div class="graphic-container">
                <svg id="human-ai-weaving" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>Humans connect deeply. Machines connect widely. Together, we weave new kinds of intelligence.</p>
            <div class="speaker-notes" id="speaker-note-16"></div>
        </section>

        <!-- Slide 17: Intelligence as a Fabric -->
        <section>
            <h2>Intelligence as a Fabric</h2>
            <div class="graphic-container">
                <svg id="intelligence-fabric" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <p>What unique threads do you bring that AI cannot? How might we weave them together to create something new?</p>
            <div class="speaker-notes" id="speaker-note-17"></div>
        </section>

        <!-- Slide 18: OpenAI - GPT-4 -->
        <section>
            <h2>OpenAI – GPT-4</h2>
            <div class="graphic-container">
                <svg id="openai-gpt4" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <ul>
                <li><strong>Strength:</strong> Versatile generalist with human-level reasoning.</li>
                <li><strong>Specs:</strong> ~1.5T parameters (Mixture of Experts), 128K context window.</li>
                <li><strong>Edge:</strong> Dominates in creative writing, coding, and multilingual tasks.</li>
            </ul>
            <div class="speaker-notes" id="speaker-note-18"></div>
        </section>

        <!-- Slide 19: Anthropic - Claude 3 Sonnet -->
        <section>
            <h2>Anthropic – Claude 3 Sonnet</h2>
            <div class="graphic-container">
                <svg id="anthropic-claude" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <ul>
                <li><strong>Strength:</strong> Leading in code generation and safety alignment.</li>
                <li><strong>Specs:</strong> ~70B parameters, 200K context window.</li>
                <li><strong>Edge:</strong> Excels in coding benchmarks and long-context reasoning.</li>
            </ul>
            <div class="speaker-notes" id="speaker-note-19"></div>
        </section>

        <!-- Slide 20: DeepSeek - R1 -->
        <section>
            <h2>DeepSeek – R1</h2>
            <div class="graphic-container">
                <svg id="deepseek-r1" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <ul>
                <li><strong>Strength:</strong> Efficient open-source model with high performance.</li>
                <li><strong>Specs:</strong> 671B parameters (Mixture of Experts), 128K context window.</li>
                <li><strong>Edge:</strong> Matches top-tier models in math and coding tasks with lower computational requirements.</li>
            </ul>
            <div class="speaker-notes" id="speaker-note-20"></div>
        </section>

        <!-- Slide 21: xAI - Grok 3 -->
        <section>
            <h2>xAI – Grok 3</h2>
            <div class="graphic-container">
                <svg id="xai-grok" width="80%" height="80%" viewBox="0 0 400 300">
                    <!-- SVG content will be created by graphics.js -->
                </svg>
            </div>
            <ul>
                <li><strong>Strength:</strong> Massive context handling and rapid response.</li>
                <li><strong>Specs:</strong> 2.7T parameters, 1M context window.</li>
                <li><strong>Edge:</strong> Processes extensive documents swiftly, ideal for complex problem-solving.</li>
            </ul>
            <div class="speaker-notes" id="speaker-note-21"></div>
        </section>

        <!-- Slide 22: Final Quote -->
        <section class="slide-with-threads">
            <h1>"We are not what we know.<br>We are what we connect."</h1>
            <div class="speaker-notes" id="speaker-note-22"></div>
        </section>
    `;
}
