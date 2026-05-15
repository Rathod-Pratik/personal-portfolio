import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@apiClient', replacement: path.resolve(__dirname, 'src/lib/api-Client') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/API/index.ts') },
      { find: '@component', replacement: path.resolve(__dirname, 'src/Component/index.ts') },
      {
        find: /^@component\/(.*)$/,
        replacement: path.resolve(__dirname, 'src/Component/$1'),
      },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store/index.ts') },
      {
        find: /^@store\/(.*)$/,
        replacement: path.resolve(__dirname, 'src/store/$1'),
      },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/Pages') },
      {
        find: /^@pages\/(.*)$/,
        replacement: path.resolve(__dirname, 'src/Pages/$1'),
      },
      { find: '@Type', replacement: path.resolve(__dirname, 'src/Type/index.ts') },
      {
        find: /^@Type\/(.*)$/,
        replacement: path.resolve(__dirname, 'src/Type/$1'),
      },
      {
        find: /^@types\/(.*)$/,
        replacement: path.resolve(__dirname, 'src/Type/$1'),
      },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/Utils') },
      {
        find: /^@utils\/(.*)$/,
        replacement: path.resolve(__dirname, 'src/Utils/$1'),
      },
      { find: /^@routes\/(.*)$/, replacement: path.resolve(__dirname, 'src/Routes/$1') },
    ],
  },
})
