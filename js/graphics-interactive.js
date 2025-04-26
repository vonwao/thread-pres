// graphics-interactive.js - Interactive visualizations for slides 10-18

// Slide 10: Language Translation
function createLanguageTranslation() {
    const svg = d3.select("#language-translation");
    svg.selectAll("*").remove();
    
    // Two translation columns
    const columns = [
        {x: 50, y: 50, width: 130, height: 200, title: "Word-by-word"},
        {x: 220, y: 50, width: 130, height: 200, title: "Neural Translation"}
    ];
    
    // Draw column backgrounds
    svg.selectAll("rect.column")
        .data(columns)
        .enter()
        .append("rect")
        .attr("class", "column")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", d => d.width)
        .attr("height", d => d.height)
        .attr("fill", "rgba(0,0,0,0.2)")
        .attr("rx", 5);
    
    // Add column titles
    svg.selectAll("text.column-title")
        .data(columns)
        .enter()
        .append("text")
        .attr("class", "column-title")
        .attr("x", d => d.x + d.width/2)
        .attr("y", d => d.y - 20)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--light)")
        .attr("font-size", "12px")
        .text(d => d.title);
    
    // Add some text lines
    for (let i = 0; i < 5; i++) {
        columns.forEach(col => {
            svg.append("line")
                .attr("x1", col.x)
                .attr("y1", col.y + 20 + i * 20)
                .attr("x2", col.x + col.width)
                .attr("y2", col.y + 20 + i * 20)
                .attr("stroke", "var(--light)")
                .attr("stroke-width", 0.5);
        });
    }
    
    // Draw connection paths between translations
    const connections = [
        {x1: 180, y1: 60, x2: 220, y2: 60, curve: 30},
        {x1: 180, y1: 80, x2: 220, y2: 80, curve: -30},
        {x1: 180, y1: 100, x2: 220, y2: 120, curve: 40},
        {x1: 180, y1: 120, x2: 220, y2: 100, curve: -40},
        {x1: 180, y1: 140, x2: 220, y2: 140, curve: 0}
    ];
    
    svg.selectAll("path.connection")
        .data(connections)
        .enter()
        .append("path")
        .attr("class", "connection")
        .attr("d", d => {
            return `M ${d.x1},${d.y1} C ${d.x1 + 20},${d.y1 + d.curve} ${d.x2 - 20},${d.y2 - d.curve} ${d.x2},${d.y2}`;
        })
        .attr("stroke", "var(--primary)")
        .attr("data-color", "primary")
        .attr("stroke-width", 1)
        .attr("fill", "none");
}

// Slide 11: Medical Diagnosis
function createMedicalDiagnosis() {
    const svg = d3.select("#medical-diagnosis");
    svg.selectAll("*").remove();
    
    // Central diagnosis node
    svg.append("circle")
        .attr("cx", 200)
        .attr("cy", 150)
        .attr("r", 50)
        .attr("fill", "rgba(230, 57, 70, 0.2)")
        .attr("stroke", "var(--accent)")
        .attr("data-color", "accent")
        .attr("stroke-width", 2);
    
    svg.append("text")
        .attr("x", 200)
        .attr("y", 150)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "var(--light)")
        .text("Diagnosis");
    
    // Data source nodes
    const dataSources = [
        {id: "Symptoms", x: 100, y: 80, r: 25},
        {id: "Test Results", x: 300, y: 80, r: 25},
        {id: "Patient History", x: 100, y: 220, r: 25},
        {id: "Demographics", x: 300, y: 220, r: 25}
    ];
    
    // Draw data source nodes
    svg.selectAll("circle.data-source")
        .data(dataSources)
        .enter()
        .append("circle")
        .attr("class", "data-source")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill", "rgba(58, 124, 165, 0.2)")
        .attr("stroke", "var(--primary)")
        .attr("data-color", "primary")
        .attr("stroke-width", 1.5);
    
    // Add data source labels
    svg.selectAll("text.source-label")
        .data(dataSources)
        .enter()
        .append("text")
        .attr("class", "source-label")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "var(--light)")
        .attr("font-size", "10px")
        .text(d => d.id);
    
    // Draw connections
    const connections = [
        {x1: 120, y1: 90, x2: 180, y2: 130}, 
        {x1: 280, y1: 90, x2: 220, y2: 130}, 
        {x1: 120, y1: 210, x2: 180, y2: 170}, 
        {x1: 280, y1: 210, x2: 220, y2: 170} 
    ];
    
    svg.selectAll("line.connection")
        .data(connections)
        .enter()
        .append("line")
        .attr("class", "connection")
        .attr("x1", d => d.x1)
        .attr("y1", d => d.y1)
        .attr("x2", d => d.x2)
        .attr("y2", d => d.y2)
        .attr("stroke", "var(--secondary)")
        .attr("data-color", "secondary")
        .attr("stroke-width", 2);
}

// Slides 16-17: Human-AI Weaving and Intelligence Fabric
function createHumanAIWeaving() {
    const svg = d3.select("#human-ai-weaving");
    svg.selectAll("*").remove();
    
    // Draw loom structure
    svg.append("rect")
        .attr("x", 50)
        .attr("y", 50)
        .attr("width", 300)
        .attr("height", 200)
        .attr("fill", "rgba(0,0,0,0.1)")
        .attr("stroke", "var(--light)")
        .attr("stroke-width", 1)
        .attr("rx", 5);
    
    // Loom frame
    svg.append("rect")
        .attr("x", 100)
        .attr("y", 70)
        .attr("width", 200)
        .attr("height", 10)
        .attr("fill", "var(--dark)")
        .attr("stroke", "var(--light)")
        .attr("stroke-width", 1);
    
    svg.append("rect")
        .attr("x", 100)
        .attr("y", 220)
        .attr("width", 200)
        .attr("height", 10)
        .attr("fill", "var(--dark)")
        .attr("stroke", "var(--light)")
        .attr("stroke-width", 1);
    
    // Vertical threads (warp)
    for (let i = 0; i < 9; i++) {
        const x = 120 + i * 20;
        svg.append("line")
            .attr("x1", x)
            .attr("y1", 80)
            .attr("x2", x)
            .attr("y2", 220)
            .attr("stroke", "var(--primary)")
            .attr("data-color", "primary")
            .attr("stroke-width", 1.5);
    }
    
    // Horizontal threads (weft) - human threads
    const humanThreadPaths = [
        "M 100,100 C 120,90 140,110 160,100 S 200,120 220,100 S 260,110 280,100 L 300,100",
        "M 100,130 C 120,120 140,140 160,130 S 200,150 220,130 S 260,140 280,130 L 300,130",
        "M 100,160 C 120,150 140,170 160,160 S 200,180 220,160 S 260,170 280,160 L 300,160"
    ];
    
    // Draw human threads
    svg.selectAll("path.human-thread")
        .data(humanThreadPaths)
        .enter()
        .append("path")
        .attr("class", "human-thread")
        .attr("d", d => d)
        .attr("stroke", "var(--secondary)")
        .attr("data-color", "secondary")
        .attr("stroke-width", 2.5)
        .attr("fill", "none");
    
    // Horizontal threads (weft) - AI threads
    const aiThreadPaths = [
        "M 100,115 C 130,125 160,105 190,115 S 220,125 250,115 S 280,125 300,115",
        "M 100,145 C 130,155 160,135 190,145 S 220,155 250,145 S 280,155 300,145",
        "M 100,175 C 130,185 160,165 190,175 S 220,185 250,175 S 280,185 300,175"
    ];
    
    // Draw AI threads
    svg.selectAll("path.ai-thread")
        .data(aiThreadPaths)
        .enter()
        .append("path")
        .attr("class", "ai-thread")
        .attr("d", d => d)
        .attr("stroke", "var(--accent)")
        .attr("data-color", "accent")
        .attr("stroke-width", 1.5)
        .attr("fill", "none");
}

function createIntelligenceFabric() {
    const svg = d3.select("#intelligence-fabric");
    svg.selectAll("*").remove();
    
    // Create tapestry rectangle
    svg.append("rect")
        .attr("x", 75)
        .attr("y", 25)
        .attr("width", 250)
        .attr("height", 250)
        .attr("fill", "none")
        .attr("stroke", "var(--secondary)")
        .attr("data-color", "secondary")
        .attr("stroke-width", 3)
        .attr("rx", 5);
    
    // Horizontal threads
    for (let i = 0; i < 9; i++) {
        const y = 50 + i * 25;
        svg.append("line")
            .attr("x1", 75)
            .attr("y1", y)
            .attr("x2", 325)
            .attr("y2", y)
            .attr("stroke", i % 2 === 0 ? "var(--primary)" : "var(--light)")
            .attr("data-color", i % 2 === 0 ? "primary" : "light")
            .attr("stroke-width", 1.5);
    }
    
    // Vertical threads
    for (let i = 0; i < 9; i++) {
        const x = 100 + i * 25;
        svg.append("line")
            .attr("x1", x)
            .attr("y1", 25)
            .attr("x2", x)
            .attr("y2", 275)
            .attr("stroke", i % 2 === 0 ? "var(--accent)" : "var(--secondary)")
            .attr("data-color", i % 2 === 0 ? "accent" : "secondary")
            .attr("stroke-width", 1.5);
    }
    
    // Pattern elements (intersection highlights)
    const patternPoints = [
        {x: 100, y: 50}, {x: 150, y: 75}, {x: 200, y: 50}, {x: 250, y: 75}, {x: 300, y: 50},
        {x: 125, y: 125}, {x: 175, y: 150}, {x: 225, y: 125}, {x: 275, y: 150},
        {x: 100, y: 200}, {x: 150, y: 225}, {x: 200, y: 200}, {x: 250, y: 225}, {x: 300, y: 200}
    ];
    
    svg.selectAll("circle.pattern-point")
        .data(patternPoints)
        .enter()
        .append("circle")
        .attr("class", "pattern-point")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 4)
        .attr("fill", (d, i) => i % 2 === 0 ? "var(--secondary)" : "var(--primary)")
        .attr("data-color", (d, i) => i % 2 === 0 ? "secondary" : "primary");
}

// Simplified placeholders for the interactive visualizations
function initializeAttentionVisualization() {
    const container = document.getElementById('attention-visualization');
    if (!container) return;
    
    container.innerHTML = `
        <svg width="100%" height="300" viewBox="0 0 800 300" id="attention-vis-svg">
            <text x="400" y="150" text-anchor="middle" fill="var(--light)" font-size="16">
                Live Attention Visualization
            </text>
            <text x="400" y="180" text-anchor="middle" fill="var(--light)" font-size="14">
                Enter a sentence and see how words attend to each other
            </text>
        </svg>
    `;
    
    const visualizeBtn = document.getElementById('visualize-btn');
    const attentionInput = document.getElementById('attention-input');
    
    if (visualizeBtn && attentionInput) {
        visualizeBtn.addEventListener('click', function() {
            alert("This interactive demo would visualize attention between words in: " + attentionInput.value);
            // In a real implementation, this would call visualizeAttention()
        });
    }
}

function initializeEmbeddingVisualization() {
    const container = document.getElementById('embedding-visualization');
    if (!container) return;
    
    container.innerHTML = `
        <svg width="100%" height="300" viewBox="0 0 800 300" id="embedding-vis-svg">
            <text x="400" y="150" text-anchor="middle" fill="var(--light)" font-size="16">
                Word Embedding Space
            </text>
            <text x="400" y="180" text-anchor="middle" fill="var(--light)" font-size="14">
                Enter words to see how they cluster in semantic space
            </text>
        </svg>
    `;
    
    const addWordBtn = document.getElementById('add-word-btn');
    const clearWordsBtn = document.getElementById('clear-words-btn');
    const wordInput = document.getElementById('word-input');
    
    if (addWordBtn && wordInput) {
        addWordBtn.addEventListener('click', function() {
            alert("This would add the word: " + wordInput.value + " to the visualization");
            // In a real implementation, this would call addWordToEmbedding()
        });
    }
    
    if (clearWordsBtn) {
        clearWordsBtn.addEventListener('click', function() {
            alert("This would clear all words from the visualization");
            // In a real implementation, this would reset the visualization
        });
    }
}