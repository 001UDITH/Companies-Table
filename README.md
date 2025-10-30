# Companies Portfolio (React)

This is a small React (Vite) portfolio sample built from components.

## About
- Demonstrates component-driven UI with reusable components.
- Includes: Header, Banner, About, Companies directory (filters + table).
- Candidate note: I have 2 years of professional experience in React.js.

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

This project uses a minimal setup (Vite). Replace mock data with your real API as needed.

## Mock API
This project uses a static JSON file `public/companies.json` as the mock API. Vite serves files in `public/` at the root, so the frontend fetches `/companies.json`.

To change data, edit `public/companies.json` and reload the dev server.
