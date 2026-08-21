
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

async function getRecord(context){
  const store=getStore(context.env);
  const id=String(context.params.id||'').trim();
  if(!id)return {error:json({error:'缺少 TL ID'},400)};
  const record=await store.get(`tl:${id}`,'json');
  if(!record)return {error:json({error:'找不到此 TL'},404)};
  return {store,id,record};
}
async function authorized(request,record){
  const key=request.headers.get('x-tl-manage-key')||'';
  if(!key)return false;
  return (await sha256(key))===record.manageHash;
}

export async function onRequestGet(context){
  try{
    const r=await getRecord(context);
    if(r.error)return r.error;
    return json({
      ok:true,
      id:r.id,
      payload:r.record.payload,
      createdAt:r.record.createdAt,
      updatedAt:r.record.updatedAt
    });
  }catch(e){
    if(e?.message==='TL_STORE_KV_NOT_BOUND')return json({error:'Cloudflare KV 尚未綁定：請建立 TL_STORE namespace binding'},503);
    return json({error:'讀取失敗'},500);
  }
}

export async function onRequestPut(context){
  try{
    const r=await getRecord(context);
    if(r.error)return r.error;
    if(!(await authorized(context.request,r.record)))return json({error:'管理金鑰錯誤'},403);

    const body=await context.request.json();
    if(!body?.payload || typeof body.payload!=='object')return json({error:'缺少 payload'},400);
    r.record.payload=body.payload;
    r.record.updatedAt=new Date().toISOString();
    await r.store.put(`tl:${r.id}`,JSON.stringify(r.record));
    return json({ok:true,id:r.id,updatedAt:r.record.updatedAt});
  }catch(e){
    if(e?.message==='TL_STORE_KV_NOT_BOUND')return json({error:'Cloudflare KV 尚未綁定：請建立 TL_STORE namespace binding'},503);
    return json({error:'更新失敗'},500);
  }
}

export async function onRequestDelete(context){
  try{
    const r=await getRecord(context);
    if(r.error)return r.error;
    if(!(await authorized(context.request,r.record)))return json({error:'管理金鑰錯誤'},403);
    await r.store.delete(`tl:${r.id}`);
    return json({ok:true,id:r.id});
  }catch(e){
    if(e?.message==='TL_STORE_KV_NOT_BOUND')return json({error:'Cloudflare KV 尚未綁定：請建立 TL_STORE namespace binding'},503);
    return json({error:'刪除失敗'},500);
  }
}

export async function onRequest(context){
  if(context.request.method==='GET')return onRequestGet(context);
  if(context.request.method==='PUT')return onRequestPut(context);
  if(context.request.method==='DELETE')return onRequestDelete(context);
  return json({error:'Method Not Allowed'},405);
}
