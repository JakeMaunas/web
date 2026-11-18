// Local-only static preview. Run: node preview.cjs
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.avif':'image/avif','.json':'application/json'};
const server = http.createServer((req,res)=>{
  let name;
  try { name = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch {res.writeHead(400);res.end('Bad request');return;}
  const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);});
});
const port = Number(process.env.PORT) || 4174;
server.listen(port,'127.0.0.1',()=>console.log(`Yolly Beach preview: http://127.0.0.1:${port}`));
