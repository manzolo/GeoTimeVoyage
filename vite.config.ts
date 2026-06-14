import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Per GitHub Pages il sito viene servito da https://<user>.github.io/<repo>/
// quindi serve un "base" relativo al nome del repository.
// In sviluppo (docker/locale) usiamo "/" così l'app gira su localhost.
// Override possibile con la variabile d'ambiente VITE_BASE.
const base = process.env.VITE_BASE ?? (process.env.NODE_ENV === 'production' ? '/GeoTimeVoyage/' : '/');

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      // necessario per l'hot-reload dentro Docker su alcune piattaforme
      usePolling: true,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
