// Local QA server for the actual prerendered production output. No backend.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.txt': 'text/plain' };
createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const root = resolve(process.env.GLOZ_QA_PUBLIC_DIR ?? 'dist/gloz/browser');
  const path = resolve(root, '.' + pathname);
  if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  const target = extname(path) ? path : resolve(path, 'index.html');
  if (req.url === '/favicon.ico') { res.writeHead(204).end(); return; }
  try { const content = await readFile(target); res.writeHead(200, { 'Content-Type': types[extname(target)] ?? 'application/octet-stream' }); res.end(content); }
  catch { res.writeHead(404).end(); }
}).listen(4300, '127.0.0.1', () => console.log('Gloz QA: http://127.0.0.1:4300'));
