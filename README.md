# Threadwork: Intelligence as a Fabric of Connections

A presentation exploring the metaphor of threadwork to understand how human intelligence and artificial intelligence are woven from the same patterns of connection.

## Project Description

This presentation uses rich visualizations and interactive elements to explore how intelligence emerges from connections rather than isolated facts. Using the metaphor of threads and weaving, it draws parallels between neural connections in the human brain and attention mechanisms in AI models.

## Features

- **Visual Metaphors**: SVG graphics that represent complex concepts through accessible visual metaphors
- **Interactive Demonstrations**: Live attention visualization and word embedding space exploration
- **Practical Examples**: Real-world applications of the "threadwork" concept in language translation, medical diagnosis, and recommendation systems
- **Speaker Notes**: Built-in notes for the presenter
- **Theme Options**: Multiple color themes to choose from

## Live Demo

The presentation is deployed at: [Your Netlify URL after deployment]

## Local Development

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/threadwork-presentation.git
   ```

2. Open the project folder:
   ```
   cd threadwork-presentation
   ```

3. Open `index.html` in your browser:
   - You can use a local server like `python -m http.server` or the Live Server extension for VS Code
   - Or simply open the HTML file directly in your browser

4. Edit the files:
   - `js/slides.js` to modify slide content
   - `js/graphics.js` to change visualizations
   - `css/style.css` and `css/themes.css` to adjust styling

## Deployment on Netlify

### Option 1: Deploy directly from GitHub

1. Push your code to a GitHub repository
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select GitHub and authorize Netlify
5. Select your repository
6. Configure build settings:
   - Build command: (leave blank for this static site)
   - Publish directory: `/` (root)
7. Click "Deploy site"

### Option 2: Manual drag-and-drop deployment

1. Log in to [Netlify](https://app.netlify.com/)
2. Go to the "Sites" section
3. Drag and drop the entire project folder onto the designated area
4. Your site will be deployed in seconds!

## Customization

### Adding New Slides

1. Edit `js/slides.js` to add new slide HTML
2. Create corresponding visualizations in `js/graphics.js`
3. Add speaker notes in `js/speaker-notes.js`

### Modifying Visuals

- Most visualizations are created with D3.js and SVG
- Interactive elements use D3.js for data binding and visualization
- Animation is handled with anime.js

### Changing Themes

- Edit `css/themes.css` to modify existing themes or add new ones
- Themes automatically update all visualization colors

## Technologies Used

- [RevealJS](https://revealjs.com/) - Presentation framework
- [D3.js](https://d3js.org/) - Data visualization library
- [anime.js](https://animejs.com/) - Animation library

## License

[Add your chosen license here]

## Credits

Created by [Your Name]