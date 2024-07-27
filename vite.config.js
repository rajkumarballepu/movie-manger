import { defineConfig } from 'vite'
import {viteCommonjs} from "@originjs/vite-plugin-commonjs"
import react from '@vitejs/plugin-react'
import axios from 'axios'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs()],
  build : {
    rollupOptions: {
      external: ["axios"]
    }
  }
})
