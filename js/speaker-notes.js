// speaker-notes.js - Handles speaker notes functionality

// Speaker notes content for each slide
const speakerNotes = {
    1: "You know, sometimes I feel like my brain looks like this. (gesture) I'm a software engineer, with my head often in code—but I keep wondering: what *is* intelligence, really? Turns out, it's less about facts and more about how things connect. Today we'll explore this idea of intelligence as threadwork—a woven fabric of connections.",
    
    2: "A single thread isn't much on its own. But when woven with others, it creates something meaningful. Intelligence works just like that—not in isolated pieces of knowledge, but in intricate patterns of connection. From individual threads, let's see how they begin to connect...",
    
    3: "Your brain has about 86 billion neurons, but the magic isn't in the number—it's in the *connections*. Memories and thoughts aren't filed away like data in a computer; they exist in the web of connections between neurons. These neural connections aren't random—they form patterns, much like how modern AI weaves meaning through attention...",
    
    4: "AI models like GPT use what's called *self-attention*. Each word looks around, asking: 'Who do I matter to? Who matters to me?' That's how meaning forms. In this complex sentence, 'was' connects to 'cat', not 'dog', because the fabric of attention reveals which threads belong together. The weights of these connections matter as much as the connections themselves...",
    
    5: "Modern AI doesn't just memorize—it connects. Meaning emerges from weighted relationships in a dynamic fabric of attention. The strength of connections varies, just like in our minds, where some associations are stronger than others. These aren't just abstract connections—they form geometric relationships in a space of meaning...",
    
    6: "AI builds what we call *embedding spaces*. Words become vectors—threads positioned in mathematical space. The model learns that 'King - Man + Woman = Queen.' That's geometry, not logic or memorization. It's understanding through spatial relationships. Like a master weaver adding layers of complexity, AI builds understanding in stages...",
    
    7: "Transformers stack layers, each refining meaning like an artisan's attention to detail. Lower layers might capture simple patterns—grammar, word relationships. Higher layers weave more abstract concepts—tone, intent, cultural context. It's deep, recursive, like a fractal of thought. This layered pattern-making resembles another phenomenon in nature...",
    
    8: "Fractals repeat at every scale. Our thoughts do too—stories within memories, patterns within patterns. AI models echo this structure, with simple rules creating complex emergent behaviors. When enough of these threadworks are connected, something remarkable happens...",
    
    9: "Scale enough connections and new abilities *emerge*. Without new instructions, just with denser threadwork, GPT models started translating languages, solving math problems, writing code—abilities not explicitly programmed. This phenomenon, supported by research from Wei and colleagues on emergent abilities in large language models, suggests that intelligence may be an emergent property of connection density. Yet unlike human memory, this intelligence unravels and reweaves itself with each interaction...",
    
    10: "Let's look at how this threadwork concept applies in the real world. Early machine translation was word-by-word substitution—individual threads with no weave. Modern neural translation weaves context, grammar, cultural nuance, and idiomatic expressions. Compare these translations: the first is literal and awkward; the second captures meaning by understanding relationships between words across languages. The threads aren't just connecting words to words, but concepts to concepts.",
    
    11: "Medical AI doesn't just match symptoms to diseases in a lookup table. Modern diagnostic systems weave together patient history, subtle presentation differences, population data, recent research, and even factors the human doctor might not think to connect. The pattern that emerges from this rich tapestry often reveals insights that discrete data points alone couldn't provide. It's like how an experienced physician develops intuition—they're not just processing more data; they're seeing the connections others miss.",
    
    12: "When Netflix recommends a documentary you never knew you wanted to watch, it's not just because others who liked your favorite show also liked this documentary. The recommendation fabric is woven from thousands of subtle features—viewing patterns, time spent on genres, abandonment rates, and visual preferences you might not even be conscious of. It's finding patterns in the weave of your preferences that even you might not see. So what happens when these two styles of weaving—human and machine—come together?",
    
    13: "Let me show you how this works in real-time. I've built a simple demo that visualizes the attention patterns in a transformer model. As I type a sentence, watch how each word attends to others. Now if I change this one word... see how the entire fabric reconfigures? Every thread shifts because meaning is relational. This is why context matters so much in both human and machine understanding.",
    
    14: "Let's try another interactive demonstration. I'll need a few word suggestions from the audience... [collects words]. Now watch as I plot these in embedding space. See how words with similar meanings cluster together? And look at these analogical relationships—they form similar geometric patterns! This isn't just a quirk of the algorithm; it's a reflection of how meaning itself is structured through relationships.",
    
    15: "For those curious about the technical implementation, this is a simplified version of what's happening under the hood. Don't worry about understanding every line—the key insight is that even with this basic matrix of attention values, we can see how words relate to each other in meaningful ways. The numbers represent the strength of connections—the thread tension, if you will—between different words in our sentence.",
    
    16: "Humans connect deeply—we form rich emotional associations, cultural contexts, lived experiences. Machines connect widely—across vast datasets, without forgetting, without bias (or at least different biases). Together, we can weave new kinds of intelligence that neither could create alone. Research in cognitive science by James McClelland on parallel distributed processing shows remarkable similarities between neural networks and human cognition, suggesting we're working with compatible threads.",
    
    17: "Intelligence isn't linear. It's a fabric. Baby thoughts or billion-parameter models—it's all about the weave. The question becomes: what unique threads do you bring that AI cannot? How might we weave them together to create something neither could alone? I invite you to start seeing your own thinking as threadwork—notice the connections you make, the patterns you weave, and consider how they might intertwine with machine intelligence to create new tapestries of understanding.",
    
    18: "Thank you for joining me on this journey through the fabric of intelligence. I hope you'll take this metaphor with you and explore how it might apply in your own work and thinking. And now, I'll go back to debugging whatever I broke this morning. (pause, smile) I'm happy to take any questions."
};

// Initialize speaker notes
function initializeSpeakerNotes() {
    // Load speaker notes into the DOM
    for (let i = 1; i <= Object.keys(speakerNotes).length; i++) {
        const noteElement = document.getElementById(`speaker-note-${i}`);
        if (noteElement) {
            noteElement.textContent = speakerNotes[i];
        }
    }
    
    // Initialize Reveal.js speaker notes plugin
    // This is handled by RevealJS's plugins system
}

// Toggle speaker notes visibility
function toggleSpeakerNotes() {
    const notes = document.querySelectorAll('.speaker-notes');
    notes.forEach(note => {
        note.classList.toggle('visible');
    });
    
    // Update button text
    const toggleButton = document.getElementById('toggle-notes');
    if (toggleButton) {
        toggleButton.textContent = document.querySelector('.speaker-notes.visible') ? 
            'Hide Speaker Notes' : 'Show Speaker Notes';
    }
}

// Update currently visible speaker notes (when slide changes)
function updateVisibleSpeakerNotes(slideIndex) {
    // Only relevant if notes are toggled to be visible
    if (!document.querySelector('.speaker-notes.visible')) {
        return;
    }
    
    // Highlight current slide's notes
    const notes = document.querySelectorAll('.speaker-notes.visible');
    notes.forEach(note => {
        note.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });
    
    const currentNote = document.getElementById(`speaker-note-${slideIndex + 1}`);
    if (currentNote && currentNote.classList.contains('visible')) {
        currentNote.style.backgroundColor = 'rgba(var(--accent-rgb), 0.1)';
    }
}