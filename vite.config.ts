import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    visualizer({
      open: true, // Automatically opens the analyzer in your default browser
      filename: "stats.html", // Output file
      brotliSize: true, // Show Brotli compressed size
      gzipSize: true // Show Gzip compressed size
    })
  ],
})
