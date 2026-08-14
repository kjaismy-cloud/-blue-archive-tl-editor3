const ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const json=(data,status=200)=>Response.json(data,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
const codeFromUrl=request=>new URL(request.url).searchParams.get('code')?.toUpperCase().replace(/[^A-Z0-9]/g,'')||'';
const makeCode=()=>{const bytes=new Uint8Array(8);crypto.getRandomValues(bytes);return Array.from(bytes,b=>ALPHABET[b%ALPHABET.length]).join('')};
export async function onRequestGet({request,env}){
  if(!env.TL_STORE)return json({error:'尚未設定 TL_STORE KV 綁定'},503);
  const code=codeFromUrl(request);if(code.length!==8)return json({error:'短代碼格式錯誤'},400);
  const data=await env.TL_STORE.get('tl:'+code,{type:'json'});if(!data)return json({error:'找不到這個時間軸'},404);
  return json({code,data});
}
export async function onRequestPost({request,env}){
  if(!env.TL_STORE)return json({error:'尚未設定 TL_STORE KV 綁定'},503);
  const length=Number(request.headers.get('content-length')||0);if(length>100000)return json({error:'時間軸資料過大'},413);
  let data;try{data=await request.json()}catch{return json({error:'JSON 格式錯誤'},400)}
  if(!data||typeof data!=='object'||!Array.isArray(data.tl)||data.tl.length>500)return json({error:'時間軸資料格式錯誤'},400);
  const value=JSON.stringify(data);if(value.length>100000)return json({error:'時間軸資料過大'},413);
  for(let attempt=0;attempt<8;attempt++){const code=makeCode();if(await env.TL_STORE.get('tl:'+code)===null){await env.TL_STORE.put('tl:'+code,value,{metadata:{createdAt:new Date().toISOString()}});return json({code},201)}}
  return json({error:'無法產生短代碼，請重試'},503);
}
export function onRequest(){return json({error:'不支援的請求方法'},405)}
