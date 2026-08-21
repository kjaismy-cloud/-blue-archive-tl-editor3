
const enc=new TextEncoder();

function json(data,status=200){
  return new Response(JSON.stringify(data),{
    status,
    headers:{
      'content-type':'application/json; charset=utf-8',
      'cache-control':'no-store'
    }
  });
}
function base64url(bytes){
  let s='';
  for(const b of bytes)s+=String.fromCharCode(b);
  return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function randomToken(bytes=24){
  const a=new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return base64url(a);
}
async function sha256(text){
  const hash=await crypto.subtle.digest('SHA-256',enc.encode(text));
  return base64url(new Uint8Array(hash));
}
function getStore(env){
  if(!env.TL_STORE)throw new Error('TL_STORE_KV_NOT_BOUND');
  return env.TL_STORE;
}

export async function onRequestPost(context){
  try{
    const store=getStore(context.env);
    const body=await context.request.json();
    if(!body?.payload || typeof body.payload!=='object')return json({error:'缺少 payload'},400);

    const id=randomToken(9);
    const manageKey=randomToken(24);
    const now=new Date().toISOString();

    const record={
      id,
      payload:body.payload,
      manageHash:await sha256(manageKey),
      createdAt:now,
      updatedAt:now
    };
    await store.put(`tl:${id}`,JSON.stringify(record));
    return json({ok:true,id,manageKey,createdAt:now,updatedAt:now},201);
  }catch(e){
    if(e?.message==='TL_STORE_KV_NOT_BOUND'){
      return json({error:'Cloudflare KV 尚未綁定：請建立 TL_STORE namespace binding'},503);
    }
    return json({error:'建立線上 TL 失敗'},500);
  }
}

export async function onRequest(context){
  if(context.request.method==='POST')return onRequestPost(context);
  return json({error:'Method Not Allowed'},405);
}
