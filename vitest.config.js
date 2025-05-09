// written by: Iris Perry
// tested by: Iris Perry
// debugged by: Iris Perry

// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Ensure jsdom is used
  },
});