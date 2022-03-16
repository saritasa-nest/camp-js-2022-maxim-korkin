import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root,
  plugins: [],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(root, 'index.html'),
        resolve(root, 'films', 'film', 'index.html'),
        resolve(root, 'films', 'create', 'index.html'),
        resolve(root, 'films', 'edit', 'index.html'),
      ]
    }
  }
});
