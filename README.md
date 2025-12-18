# Steelhead Digital Project

## Architecture

This application acts as a Single Page Application (SPA).

### Database Note
Direct connections from a Web Browser to a MySQL database (Port 3306) are technically impossible due to browser security protocols (Same-Origin Policy and lack of TCP socket support).

To ensure the application works immediately without requiring you to run a local Node.js server, the authentication system uses a **LocalStorage simulation**.

- **Persistence:** Data persists in your specific browser.
- **Functionality:** Register, Login, and Logout work exactly as they would with a real database.

### Deployment
If you wish to use the real SQL database in the future, you must deploy a backend API (like the code previously in server.js) to a cloud provider like Heroku, Render, or DigitalOcean, and update `services/authService.ts` to point to that URL.
