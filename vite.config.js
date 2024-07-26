import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ascolta su tutte le interfacce
    port: 5173,      // Puoi specificare la porta che preferisci
  }
})
