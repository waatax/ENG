import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep} from 'node:path';
const root=fileURLToPath(new URL('./dist/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.mp3':'audio/mpeg'};
http.createServer(async(req,res)=>{
 try{
  const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const path=resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!path.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403).end();return;}
  const data=await readFile(path);
  const headers={'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-store','Accept-Ranges':'bytes'};
  if(req.headers.range){
   const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   let start=match?.[1]?Number(match[1]):0,end=match?.[2]?Number(match[2]):data.length-1;
   if(match&&!match[1]&&match[2]){start=Math.max(0,data.length-Number(match[2]));end=data.length-1;}
   if(!match||(!match[1]&&!match[2])||start>=data.length||start>end){res.writeHead(416,{'Content-Range':`bytes */${data.length}`}).end();return;}
   end=Math.min(end,data.length-1);res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});res.end(req.method==='HEAD'?undefined:data.subarray(start,end+1));
  }else{res.writeHead(200,{...headers,'Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);}
 }catch{res.writeHead(404).end('Not found');}
}).listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log('Local preview ready'));
