import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fetchAndParseEbible } from './api/scripture.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-api-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith('/api/scripture')) {
            try {
              const url = new URL(req.url, 'http://localhost');
              const ref = url.searchParams.get('reference') || '';
              const result = await fetchAndParseEbible(ref);
              res.statusCode = result.status;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(result.body));
            } catch {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ error: 'Failed to load Scripture passage.' }));
            }
            return;
          }
          next();
        });
      }
    }
  ]
});
