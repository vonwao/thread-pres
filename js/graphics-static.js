// graphics-static.js - Static visualizations for slides 1-9

// Slide 1: Title Graphic
function createTitleGraphic() {
    const svg = d3.select("#title-graphic");
    svg.selectAll("*").remove();
    
    // Create random curved lines resembling threads
    for (let i = 0; i < 15; i++) {
        const startX = Math.random() * 50 + 25;
        const startY = Math.random() * 200 + 50;
        const endX = Math.random() * 50 + 325;
        const endY = Math.random() * 200 + 50;
        const controlX1 = Math.random() * 100 + 100;
        const controlY1 = Math.random() * 300;
        const controlX2 = Math.random() * 100 + 200;
        const controlY2 = Math.random() * 300;
        
        svg.append("path")
           .attr("d", `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`)
           .attr("stroke", i % 3 === 0 ? "var(--secondary)" : i % 3 === 1 ? "var(--primary)" : "var(--light)")
           .attr("stroke-width", Math.random() * 2 + 1)
           .attr("fill", "none")
           .attr("opacity", Math.random() * 0.5 + 0.5)
           .attr("data-color", i % 3 === 0 ? "secondary" : i % 3 === 1 ? "primary" : "light")
           .attr("class", "thread-line")
           .attr("stroke-dasharray", "1000")
           .attr("stroke-dashoffset", "1000");
    }
}

// Animate the title graphic
function animateTitleGraphic() {
    d3.selectAll("#title-graphic .thread-line").each(function(d, i) {
        d3.select(this)
          .transition()
          .delay(i * 100)
          .duration(1500)
          .ease(d3.easeQuadOut)
          .attr("stroke-dashoffset", 0);
    });
}

// Slide 2: Threads to Fabric
function createThreadsToFabric() {
    const svg = d3.select("#threads-to-fabric");
    svg.selectAll("*").remove();
    
    // Frayed thread group (left side)
    const frayedGroup = svg.append("g")
        .attr("transform", "translate(50, 50)");
    
    // Create random loose threads
    for (let i = 0; i < 8; i++) {
        const y = 20 + i * 10;
        const length = Math.random() * 50 + 50;
        const wiggle = Math.random() * 20 - 10;
        
        frayedGroup.append("line")
            .attr("x1", 0)
            .attr("y1", y)
            .attr("x2", length)
            .attr("y2", y + wiggle)
            .attr("stroke", "var(--light)")
            .attr("stroke-width", 2)
            .attr("data-color", "light");
    }
    
    // "vs" text in middle
    svg.append("text")
        .attr("x", 200)
        .attr("y", 150)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--light)")
        .attr("font-size", "20px")
        .text("vs");
    
    // Woven fabric group (right side)
    const wovenGroup = svg.append("g")
        .attr("transform", "translate(250, 50)");
    
    // Create woven pattern rectangle
    wovenGroup.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "none")
        .attr("stroke", "var(--secondary)")
        .attr("stroke-width", 1)
        .attr("data-color", "secondary");
    
    // Horizontal threads (weft)
    for (let i = 0; i < 9; i++) {
        const y = 10 + i * 10;
        wovenGroup.append("line")
            .attr("x1", 0)
            .attr("y1", y)
            .attr("x2", 100)
            .attr("y2", y)
            .attr("stroke", "var(--primary)")
            .attr("stroke-width", 2)
            .attr("data-color", "primary");
    }
    
    // Vertical threads (warp)
    for (let i = 0; i < 9; i++) {
        const x = 10 + i * 10;
        wovenGroup.append("line")
            .attr("x1", x)
            .attr("y1", 0)
            .attr("x2", x)
            .attr("y2", 100)
            .attr("stroke", "var(--light)")
            .attr("stroke-width", 2)
            .attr("data-color", "light");
    }
}

// Slide 3: Neural Connections
function createNeuralConnections() {
    const svg = d3.select("#neural-connections");
    svg.selectAll("*").remove();
    
    const neurons = [
        // Input layer
        {x: 50, y: 50, r: 8, layer: 0},
        {x: 50, y: 150, r: 8, layer: 0},
        {x: 50, y: 250, r: 8, layer: 0},
        
        // Hidden layer
        {x: 200, y: 75, r: 8, layer: 1},
        {x: 200, y: 150, r: 8, layer: 1},
        {x: 200, y: 225, r: 8, layer: 1},
        
        // Output layer
        {x: 350, y: 100, r: 8, layer: 2},
        {x: 350, y: 200, r: 8, layer: 2}
    ];
    
    // Create connections first (so they're behind neurons)
    const connections = [];
    
    // Connect input to hidden
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 6; j++) {
            connections.push({
                source: neurons[i],
                target: neurons[j],
                weight: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    // Connect hidden to output
    for (let i = 3; i < 6; i++) {
        for (let j = 6; j < 8; j++) {
            connections.push({
                source: neurons[i],
                target: neurons[j],
                weight: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    // Draw connections
    svg.selectAll("line.connection")
        .data(connections)
        .enter()
        .append("line")
        .attr("class", "connection")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .attr("stroke", d => d.source.layer === 0 ? "var(--primary)" : "var(--secondary)")
        .attr("data-color", d => d.source.layer === 0 ? "primary" : "secondary")
        .attr("stroke-width", d => d.weight * 3)
        .attr("opacity", 0.7)
        .attr("stroke-dasharray", function() { return this.getTotalLength(); })
        .attr("stroke-dashoffset", function() { return this.getTotalLength(); });
    
    // Draw neurons
    svg.selectAll("circle.neuron")
        .data(neurons)
        .enter()
        .append("circle")
        .attr("class", "neuron")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill", "var(--light)")
        .attr("data-color", "light")
        .attr("opacity", 0);
}

function animateNeuralConnections() {
    // Animate connections
    d3.selectAll("#neural-connections .connection")
        .each(function(d, i) {
            d3.select(this)
                .transition()
                .delay(i * 50)
                .duration(1000)
                .attr("stroke-dashoffset", 0);
        });
    
    // Fade in neurons with delay
    d3.selectAll("#neural-connections .neuron")
        .transition()
        .delay((d, i) => i * 100)
        .duration(500)
        .attr("opacity", 1);
}

// Slide 4: Self-Attention
function createSelfAttention() {
    const svg = d3.select("#self-attention");
    svg.selectAll("*").remove();
    
    // Words
    const words = [
        {text: "The", x: 50, y: 50},
        {text: "cat", x: 100, y: 50},
        {text: "the", x: 150, y: 50},
        {text: "dog", x: 200, y: 50},
        {text: "chased", x: 250, y: 50},
        {text: "was", x: 320, y: 50},
        {text: "fast", x: 370, y: 50}
    ];
    
    // Attention lines - key ones that matter semantically
    const attentionLines = [
        {source: words[0], target: words[1], weight: 0.7, color: "primary"}, // "The" to "cat"
        {source: words[5], target: words[1], weight: 0.9, color: "secondary"}, // "was" to "cat" (crucial connection)
        {source: words[6], target: words[5], weight: 0.7, color: "accent"}, // "fast" to "was"
        {source: words[3], target: words[4], weight: 0.8, color: "primary"}, // "dog" to "chased"
        {source: words[2], target: words[3], weight: 0.8, color: "primary"} // "the" to "dog"
    ];
    
    // Draw attention lines (curved paths)
    svg.selectAll("path.attention")
        .data(attentionLines)
        .enter()
        .append("path")
        .attr("class", "attention")
        .attr("d", d => {
            const dx = d.target.x - d.source.x;
            const dy = d.target.y - d.source.y;
            const dr = Math.sqrt(dx * dx + dy * dy) * 2;
            
            // Different curve shapes based on distance
            if (Math.abs(dx) < 70) {
                return `M${d.source.x},${d.source.y + 10} Q${(d.source.x + d.target.x) / 2},${d.source.y + 100} ${d.target.x},${d.target.y + 10}`;
            } else {
                return `M${d.source.x},${d.source.y + 10} Q${(d.source.x + d.target.x) / 2},${150} ${d.target.x},${d.target.y + 10}`;
            }
        })
        .attr("stroke", d => `var(--${d.color})`)
        .attr("data-color", d => d.color)
        .attr("stroke-width", d => d.weight * 3)
        .attr("fill", "none")
        .attr("opacity", 0);
    
    // Draw words
    svg.selectAll("text.word")
        .data(words)
        .enter()
        .append("text")
        .attr("class", "word")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("fill", "var(--light)")
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .text(d => d.text);
}

function animateSelfAttention() {
    // Fade in attention lines with delay
    d3.selectAll("#self-attention .attention")
        .transition()
        .delay((d, i) => i * 300)
        .duration(1000)
        .attr("opacity", 0.8);
}

// Slide 5: Attention Weights
function createAttentionWeights() {
    const svg = d3.select("#attention-weights");
    svg.selectAll("*").remove();
    
    // Word nodes
    const nodes = [
        {id: "A", x: 100, y: 100, r: 30},
        {id: "B", x: 300, y: 100, r: 30},
        {id: "C", x: 100, y: 200, r: 30},
        {id: "D", x: 300, y: 200, r: 30}
    ];
    
    // Weighted connections between nodes
    const connections = [
        {source: nodes[0], target: nodes[1], weight: 0.8}, // A-B (strong)
        {source: nodes[2], target: nodes[3], weight: 0.4}, // C-D (medium)
        {source: nodes[0], target: nodes[2], weight: 0.6}, // A-C (medium-strong)
        {source: nodes[1], target: nodes[3], weight: 0.2}, // B-D (weak)
        {source: nodes[0], target: nodes[3], weight: 0.7}, // A-D (strong)
        {source: nodes[1], target: nodes[2], weight: 0.3}  // B-C (medium-weak)
    ];
    
    // Draw connections with varying thickness based on weight
    svg.selectAll("line.connection")
        .data(connections)
        .enter()
        .append("line")
        .attr("class", "connection")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .attr("stroke", "var(--secondary)")
        .attr("data-color", "secondary")
        .attr("stroke-width", d => d.weight * 5)
        .attr("opacity", d => 0.4 + d.weight * 0.4);
    
    // Draw nodes
    const nodeGroups = svg.selectAll("g.node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x}, ${d.y})`);
    
    // Add circles for nodes
    nodeGroups.append("circle")
        .attr("r", d => d.r)
        .attr("fill", "rgba(58, 124, 165, 0.2)")
        .attr("stroke", "var(--primary)")
        .attr("data-color", "primary")
        .attr("stroke-width", 2);
    
    // Add labels for nodes
    nodeGroups.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "var(--light)")
        .attr("font-size", "14px")
        .text(d => `Word ${d.id}`);
}

// Slide 6: Embedding Space
function createEmbeddingSpace() {
    const svg = d3.select("#embedding-space");
    svg.selectAll("*").remove();
    
    // Create a group for the embedding space centered in the SVG
    const embedGroup = svg.append("g")
        .attr("transform", "translate(200, 150)");
    
    // Draw coordinate axes
    embedGroup.append("line") // x-axis
        .attr("x1", -150)
        .attr("y1", 0)
        .attr("x2", 150)
        .attr("y2", 0)
        .attr("stroke", "var(--light)")
        .attr("stroke-width", 1)
        .attr("opacity", 0.5);
    
    embedGroup.append("line") // y-axis
        .attr("x1", 0)
        .attr("y1", -100)
        .attr("x2", 0)
        .attr("y2", 100)
        .attr("stroke", "var(--light)")
        .attr("stroke-width", 1)
        .attr("opacity", 0.5);
    
    embedGroup.append("line") // z-axis (perspective)
        .attr("x1", -50)
        .attr("y1", -50)
        .attr("x2", 50)
        .attr("y2", 50)
        .attr("stroke", "var(--light)")
        .attr("stroke-width", 1)
        .attr("opacity", 0.5);
    
    // Word vectors in the embedding space
    const words = [
        {word: "King", x: -80, y: -40, group: "royal"},
        {word: "Queen", x: -30, y: -40, group: "royal"},
        {word: "Man", x: -80, y: 20, group: "gender"},
        {word: "Woman", x: -30, y: 20, group: "gender"}
    ];
    
    // Draw word points
    embedGroup.selectAll("circle.word")
        .data(words)
        .enter()
        .append("circle")
        .attr("class", "word")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 6)
        .attr("fill", d => d.group === "royal" ? "var(--primary)" : "var(--secondary)")
        .attr("data-color", d => d.group === "royal" ? "primary" : "secondary");
    
    // Add word labels
    embedGroup.selectAll("text.word-label")
        .data(words)
        .enter()
        .append("text")
        .attr("class", "word-label")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 15)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--light)")
        .attr("font-size", "12px")
        .text(d => d.word);
    
    // Vector arrows showing relationships
    const vectors = [
        {from: words[2], to: words[0], label: "King-Man"}, // Man to King
        {from: words[3], to: words[1], label: "Queen-Woman"}, // Woman to Queen
        {from: words[2], to: words[3], label: "Gender"}, // Man to Woman
        {from: words[0], to: words[1], label: "Royalty"} // King to Queen
    ];
    
    // Draw vector arrows
    embedGroup.selectAll("line.vector")
        .data(vectors)
        .enter()
        .append("line")
        .attr("class", "vector")
        .attr("x1", d => d.from.x)
        .attr("y1", d => d.from.y)
        .attr("x2", d => d.to.x)
        .attr("y2", d => d.to.y)
        .attr("stroke", "var(--accent)")
        .attr("data-color", "accent")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");
    
    // Define arrowhead marker
    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("markerWidth", 10)
        .attr("markerHeight", 7)
        .attr("refX", 9)
        .attr("refY", 3.5)
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 10 3.5, 0 7")
        .attr("fill", "var(--accent)");
}

// Slide 8: Fractal Patterns - Simplified
function createFractalPatterns() {
    const svg = d3.select("#fractal-patterns");
    svg.selectAll("*").remove();
    
    // Create a simpler pattern with nested triangles
    
    // Main triangle
    svg.append("polygon")
        .attr("points", "200,50 100,250 300,250")
        .attr("fill", "none")
        .attr("stroke", "var(--secondary)")
        .attr("data-color", "secondary")
        .attr("stroke-width", 3);
    
    // Inner triangle
    svg.append("polygon")
        .attr("points", "200,100 150,200 250,200")
        .attr("fill", "none")
        .attr("stroke", "var(--primary)")
        .attr("data-color", "primary")
        .attr("stroke-width", 3);
    
    // Smallest triangle
    svg.append("polygon")
        .attr("points", "200,125 175,175 225,175")
        .attr("fill", "none")
        .attr("stroke", "var(--accent)")
        .attr("data-color", "accent")
        .attr("stroke-width", 3);
    
    // Add connecting lines to show the pattern relationship
    svg.append("line")
        .attr("x1", 200)
        .attr("y1", 50)
        .attr("x2", 200)
        .attr("y2", 100)
        .attr("stroke", "var(--light)")
        .attr("data-color", "light")
        .attr("stroke-width", 2);
    
    svg.append("line")
        .attr("x1", 100)
        .attr("y1", 250)
        .attr("x2", 150)
        .attr("y2", 200)
        .attr("stroke", "var(--light)")
        .attr("data-color", "light")
        .attr("stroke-width", 2);
    
    svg.append("line")
        .attr("x1", 300)
        .attr("y1", 250)
        .attr("x2", 250)
        .attr("y2", 200)
        .attr("stroke", "var(--light)")
        .attr("data-color", "light")
        .attr("stroke-width", 2);
}

// Slide 7: Transformer Layers
function createTransformerLayers() {
    const svg = d3.select("#transformer-layers");
    svg.selectAll("*").remove();
    
    // Create transformer layers
    const layers = [
        {y: 220, label: "Layer 1: Syntax & Grammar", opacity: 0.8},
        {y: 170, label: "Layer 2: Word Relationships", opacity: 0.6},
        {y: 120, label: "Layer 3: Semantic Meaning", opacity: 0.4},
        {y: 70, label: "Layer 4: Contextual Understanding", opacity: 0.2}
    ];
    
    // Draw layers
    svg.selectAll("rect.layer")
        .data(layers)
        .enter()
        .append("rect")
        .attr("class", "layer")
        .attr("x", 100)
        .attr("y", d => d.y)
        .attr("width", 200)
        .attr("height", 40)
        .attr("rx", 5)
        .attr("fill", d => `rgba(58, 124, 165, ${d.opacity})`)
        .attr("data-color", "primary");
    
    // Add layer labels
    svg.selectAll("text.layer-label")
        .data(layers)
        .enter()
        .append("text")
        .attr("class", "layer-label")
        .attr("x", 200)
        .attr("y", d => d.y + 25)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--light)")
        .attr("font-size", "12px")
        .text(d => d.label);
    
    // Add connections between layers
    for (let i = 0; i < 3; i++) {
        // Vertical positions for each layer
        const pointsX = [150, 200, 250];
        
        // Draw connections for each point
        for (let j = 0; j < pointsX.length; j++) {
            svg.append("line")
                .attr("x1", pointsX[j])
                .attr("y1", layers[i].y)
                .attr("x2", pointsX[j])
                .attr("y2", layers[i].y - 10)
                .attr("stroke", "var(--light)")
                .attr("stroke-width", 1);
        }
    }
}

// Slide 9: Emergence Scale
function createEmergenceScale() {
    const svg = d3.select("#emergence-scale");
    svg.selectAll("*").remove();
    
    // Timeline baseline
    svg.append("line")
        .attr("x1", 50)
        .attr("y1", 150)
        .attr("x2", 350)
        .attr("y2", 150)
        .attr("stroke", "var(--light)")
        .attr("stroke-width", 2);
    
    // GPT model versions and capabilities
    const models = [
        {name: "GPT-1", x: 80, y: 150, size: 5, params: "117M", capability: "Text Generation"},
        {name: "GPT-2", x: 150, y: 150, size: 8, params: "1.5B", capability: "Coherent Paragraphs"},
        {name: "GPT-3", x: 250, y: 150, size: 12, params: "175B", capability: "In-context Learning"},
        {name: "GPT-4", x: 320, y: 150, size: 15, params: "?T", capability: "Multimodal Reasoning"}
    ];
    
    // Draw model points
    svg.selectAll("circle.model")
        .data(models)
        .enter()
        .append("circle")
        .attr("class", "model")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.size)
        .attr("fill", "var(--primary)")
        .attr("data-color", "primary");
    
    // Add model labels
    svg.selectAll("text.model-label")
        .data(models)
        .enter()
        .append("text")
        .attr("class", "model-label")
        .attr("x", d => d.x)
        .attr("y", d => d.y + 20)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--light)")
        .attr("font-size", "12px")
        .text(d => d.name);
    
    // Add parameter counts
    svg.selectAll("text.params")
        .data(models)
        .enter()
        .append("text")
        .attr("class", "params")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 20)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--light)")
        .attr("font-size", "10px")
        .text(d => d.params);
    
    // Add capability markers and labels
    svg.selectAll("line.capability-line")
        .data(models)
        .enter()
        .append("line")
        .attr("class", "capability-line")
        .attr("x1", d => d.x)
        .attr("y1", d => d.y - 30)
        .attr("x2", d => d.x)
        .attr("y2", d => d.y - 60)
        .attr("stroke", "var(--accent)")
        .attr("data-color", "accent")
        .attr("stroke-width", 1);
    
    svg.selectAll("text.capability")
        .data(models)
        .enter()
        .append("text")
        .attr("class", "capability")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 70)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--accent)")
        .attr("data-color", "accent")
        .attr("font-size", "10px")
        .text(d => d.capability);
}
