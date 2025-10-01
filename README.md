# Bord Bia Training Portal - Angular Version

This is an Angular conversion of a React-based training site application. The project provides a comprehensive training portal with help & support functionality, article management, and user navigation.

## Features

- **Landing Page**: Welcome page with quick access to training resources
- **Help & Support**: Comprehensive help desk with categorized support topics
- **Article System**: Detailed articles including bulk assignment procedures
- **Navigation**: Breadcrumb navigation and intuitive page routing
- **Responsive Design**: Modern UI components with professional styling

## Project Structure

```
src/
├── app/
│   ├── components/          # Angular components converted from React
│   │   ├── breadcrumb.component.ts
│   │   ├── footer.component.ts
│   │   ├── help-support-page.component.ts
│   │   ├── landing-page.component.ts
│   │   └── bulk-assignment-article.component.ts
│   ├── services/
│   │   └── navigation.service.ts  # Page navigation management
│   ├── app.ts               # Main app component
│   ├── app.html             # App template
│   └── app.routes.ts        # Application routing
└── styles.scss              # Global styles with CSS custom properties
```

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

To start the development server:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change any source files.

### Building for Production

To build the project:

```bash
npm run build
# or
ng build
```

Build artifacts will be stored in the `dist/` directory.

## Conversion Notes

This Angular version maintains the original React functionality while leveraging Angular's:
- Component-based architecture with standalone components
- Reactive programming patterns using RxJS
- TypeScript for enhanced type safety
- Built-in dependency injection
- Angular CLI for development workflow

### Key Differences from React Version
- Uses Angular services instead of React Context for state management
- Component communication through @Input/@Output decorators
- Observable patterns for reactive data flow
- Angular-specific template syntax and directives

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests

## Technology Stack

- **Angular 20** - Frontend framework
- **TypeScript** - Programming language
- **SCSS** - Styling with CSS custom properties
- **RxJS** - Reactive programming
- **Angular CLI** - Development tooling

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.