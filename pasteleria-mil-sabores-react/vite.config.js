import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
<<<<<<< HEAD
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()]
=======

export default defineConfig({
  plugins: [react()]
>>>>>>> master
});
