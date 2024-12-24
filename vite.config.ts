import { defineConfig } from 'vite'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/CoolBI/',
  plugins: [react(),
    codeInspectorPlugin({
      bundler: 'vite',
      editor: 'code',
    }),
  ],
  resolve:{
    alias:{
      "@":'/src'
    }
  }
})
