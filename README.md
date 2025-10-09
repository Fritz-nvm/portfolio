# Portfolio Terminal

A personal portfolio website with a command-line interface theme, built with React and Vite.

## 🖥️ Theme & Concept

This portfolio mimics a terminal/command-line interface, creating an interactive and developer-friendly experience. Visitors can navigate through my projects and information using command-like interactions.

## 🚀 Features

- **Terminal-style Interface** - Command-line themed UI with typewriter effects
- **Interactive Commands** - Navigate portfolio using Unix-like commands
- **Responsive Design** - Works seamlessly across all devices
- **Dark Theme** - Developer-friendly color scheme
- **Project Showcase** - Interactive project displays with live demos and code
- **Contact Integration** - Direct contact methods from the terminal

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool & dev server
- **CSS3** - Custom terminal styling with animations
- **React Router** - Navigation (if multi-page)
- **Framer Motion** - Animations (optional)

## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/portfolio-terminal.git
cd portfolio-terminal
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 🎮 Available Commands

In the terminal interface, try these commands:

```bash
help                    # Show available commands
about                   # Learn about me
projects                # List my projects
skills                  # View my technical skills
experience              # My work experience
education               # Educational background
contact                 # Contact information
clear                   # Clear terminal history
theme [light/dark]      # Switch themes
```

## 🗂️ Project Structure

```
portfolio-terminal/
├── public/
│   ├── favicon.ico
│   └── terminal-icon.png
├── src/
│   ├── components/
│   │   ├── Terminal/
│   │   │   ├── Terminal.jsx
│   │   │   ├── CommandLine.jsx
│   │   │   └── OutputDisplay.jsx
│   │   ├── UI/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── Common/
│   │       ├── Typewriter.jsx
│   │       └── Cursor.jsx
│   ├── data/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── experience.js
│   ├── styles/
│   │   ├── terminal.css
│   │   ├── animations.css
│   │   └── global.css
│   ├── hooks/
│   │   ├── useTerminal.js
│   │   └── useTypewriter.js
│   └── utils/
│       ├── commands.js
│       └── helpers.js
├── package.json
└── vite.config.js
```

## 🎨 Customization

### Adding New Commands
Edit `src/utils/commands.js`:

```javascript
export const customCommands = {
  'mycommand': {
    description: 'Description of my command',
    execute: (args) => {
      return `Output for my command with args: ${args}`;
    }
  }
};
```

### Adding Projects
Update `src/data/projects.js`:

```javascript
export const projects = [
  {
    id: 1,
    name: "Project Name",
    description: "Project description",
    technologies: ["React", "Node.js"],
    github: "https://github.com/...",
    live: "https://demo.com",
    category: "web"
  }
];
```

## 📱 Responsive Design

- **Desktop**: Full terminal experience with keyboard shortcuts
- **Tablet**: Optimized touch interactions
- **Mobile**: Mobile-friendly command input

## 🚀 Deployment

### Deploy to Vercel
```bash
npm run build
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Drag dist folder to Netlify
```

## 🎯 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

While this is my personal portfolio, I'm open to suggestions and improvements! Feel free to fork and adapt for your own use.

