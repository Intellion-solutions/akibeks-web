
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { AdminProvider } from './contexts/AdminContext'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <AdminProvider>
      <App />
    </AdminProvider>
  </HelmetProvider>
);
