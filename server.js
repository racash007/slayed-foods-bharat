import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const port = Number(process.env.PORT) || 3000;
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
 if(req.url==='/health'||req.url==='/healthz'){res.writeHead(200,{'content-type':'text/plain; charset=utf-8','cache-control':'no-store'});return res.end('ok');}
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{allow:'GET, HEAD'});return res.end('Method not allowed');}
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end('Bad request');}
 const requested=path.resolve(root,'.'+pathname);if(requested!==root&&!requested.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
 const send=file=>{res.writeHead(200,{'content-type':types[path.extname(file).toLowerCase()]||'application/octet-stream','x-content-type-options':'nosniff'});if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res);};
 fs.stat(requested,(err,stat)=>{if(!err&&stat.isFile())return send(requested);const fallback=path.join(root,'index.html');fs.access(fallback,fs.constants.R_OK,e=>{if(e){res.writeHead(404);return res.end('Not found');}send(fallback);});});
}).listen(port,'0.0.0.0',()=>console.log(`Slayd Foods site listening on ${port}`));
