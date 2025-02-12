import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite accesos desde otras máquinas (importante para EC2)
    port: 5173, // Asegura que el puerto sea consistente con tu configuración de despliegue
  },
})
