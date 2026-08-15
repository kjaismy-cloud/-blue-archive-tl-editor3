const ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const json=(data,status=200)=>Response.json(data,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
const clean=(value,max=50)=>String(value||'').replace(/[^A-Za-z0-9_-]/g,'').slice(0,max);
const validSlot=slot=>Number.isInteger(slot)&&slot>=0&&slot<10;
const indexKey=(bossId,armorType)=>'boss-tl:index:'+bossId+':'+armorType;
const itemKey=(bossId,armorType,slot)=>'boss-tl:item:'+bossId+':'+armorType+':'+slot;
const isAdmin=(request,env)=>Boolean(env.TL_ADMIN_KEY)&&request.headers.get('x-tl-admin-key')===String(env.TL_ADMIN_KEY);
const makeCode=()=>{const bytes=new Uint8Array(8);crypto.getRandomValues(bytes);return Array.from(bytes,b=>ALPHABET[b%ALPHABET.length]).join('')};

async function getBossLibrary(request,env){
  const url=new URL(request.url),bossId=clean(url.searchParams.get('boss')),armorType=clean(url.searchParams.get('armor')),slot=url.searchParams.has('slot')?Number(url.searchParams.get('slot')):null;
  if(!bossId||!armorType)return json({error:'缺少 Boss 或護甲類型'},400);
  if(slot!==null){if(!validSlot(slot))return json({error:'欄位必須是 1～10'},400);const record=await env.TL_STORE.get(itemKey(bossId,armorType,slot),{type:'json'});return record?json({record}):json({error:'這個欄位尚未保存 TL'},404)}
  const slots=await env.TL_STORE.get(indexKey(bossId,armorType),{type:'json'});return json({bossId,armorType,slots:Array.isArray(slots)?slots:[]});
}
async function updateBossLibrary(body,env){
  const bossId=clean(body?.bossId),armorType=clean(body?.armorType),slot=Number(body?.slot);if(!bossId||!armorType||!validSlot(slot))return json({error:'Boss、護甲或欄位不正確'},400);
  const key=indexKey(bossId,armorType),current=await env.TL_STORE.get(key,{type:'json'}),slots=Array.isArray(current)?current.filter(x=>validSlot(x?.slot)):[];
  if(body.action==='delete'){
    await env.TL_STORE.delete(itemKey(bossId,armorType,slot));await env.TL_STORE.put(key,JSON.stringify(slots.filter(x=>x.slot!==slot)));return json({ok:true});
  }
  if(body.action!=='save'||!body.data||!Array.isArray(body.data.tl)||body.data.tl.length>500)return json({error:'TL 資料格式不正確'},400);
  const name=String(body.name||('TL '+(slot+1))).trim().slice(0,30),savedAt=new Date().toISOString(),record={slot,name,savedAt,data:body.data},value=JSON.stringify(record);if(value.length>150000)return json({error:'TL 資料太大'},413);
  await env.TL_STORE.put(itemKey(bossId,armorType,slot),value);
  const next=slots.filter(x=>x.slot!==slot);next.push({slot,name,savedAt});next.sort((a,b)=>a.slot-b.slot);await env.TL_STORE.put(key,JSON.stringify(next));return json({ok:true,slot,name,savedAt},201);
}
export async function onRequestGet({request,env}){
  if(!env.TL_STORE)return json({error:'尚未設定 TL_STORE KV 綁定'},503);
  const url=new URL(request.url);if(url.searchParams.get('mode')==='admin-check')return isAdmin(request,env)?json({admin:true}):json({error:env.TL_ADMIN_KEY?'管理密碼錯誤':'尚未設定 TL_ADMIN_KEY Secret'},env.TL_ADMIN_KEY?403:503);if(url.searchParams.get('mode')==='boss')return getBossLibrary(request,env);
  const code=clean(url.searchParams.get('code'),8).toUpperCase();if(code.length!==8)return json({error:'短代碼格式不正確'},400);
  const data=await env.TL_STORE.get('tl:'+code,{type:'json'});return data?json({code,data}):json({error:'找不到這個時間軸'},404);
}
export async function onRequestPost({request,env}){
  if(!env.TL_STORE)return json({error:'尚未設定 TL_STORE KV 綁定'},503);
  if(!env.TL_ADMIN_KEY)return json({error:'尚未設定 TL_ADMIN_KEY Secret'},503);
  if(!isAdmin(request,env))return json({error:'只有管理員可以保存、覆蓋或刪除 TL'},403);
  const length=Number(request.headers.get('content-length')||0);if(length>150000)return json({error:'TL 資料太大'},413);
  let body;try{body=await request.json()}catch{return json({error:'JSON 格式錯誤'},400)}
  if(body?.action==='save'||body?.action==='delete')return updateBossLibrary(body,env);
  if(!body||typeof body!=='object'||!Array.isArray(body.tl)||body.tl.length>500)return json({error:'TL 資料格式不正確'},400);
  const value=JSON.stringify(body);if(value.length>100000)return json({error:'TL 資料太大'},413);
  for(let attempt=0;attempt<8;attempt++){const code=makeCode();if(await env.TL_STORE.get('tl:'+code)===null){await env.TL_STORE.put('tl:'+code,value,{metadata:{createdAt:new Date().toISOString()}});return json({code},201)}}
  return json({error:'無法產生短代碼，請重試'},503);
}
export function onRequest(){return json({error:'不支援的請求方法'},405)}
