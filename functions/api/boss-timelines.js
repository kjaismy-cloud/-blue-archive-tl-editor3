const json=(data,status=200)=>Response.json(data,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
const clean=(value,max=50)=>String(value||'').replace(/[^A-Za-z0-9_-]/g,'').slice(0,max);
const params=request=>{const u=new URL(request.url);return {bossId:clean(u.searchParams.get('boss')),armorType:clean(u.searchParams.get('armor')),slot:u.searchParams.has('slot')?Number(u.searchParams.get('slot')):null}};
const validSlot=slot=>Number.isInteger(slot)&&slot>=0&&slot<10;
const indexKey=(bossId,armorType)=>'boss-tl:index:'+bossId+':'+armorType;
const itemKey=(bossId,armorType,slot)=>'boss-tl:item:'+bossId+':'+armorType+':'+slot;
export async function onRequestGet({request,env}){
  if(!env.TL_STORE)return json({error:'尚未設定 TL_STORE KV 綁定'},503);
  const {bossId,armorType,slot}=params(request);if(!bossId||!armorType)return json({error:'缺少 Boss 或護甲類型'},400);
  if(slot!==null){if(!validSlot(slot))return json({error:'欄位必須是 1～10'},400);const record=await env.TL_STORE.get(itemKey(bossId,armorType,slot),{type:'json'});return record?json({record}):json({error:'這個欄位尚未保存 TL'},404)}
  const slots=await env.TL_STORE.get(indexKey(bossId,armorType),{type:'json'});return json({bossId,armorType,slots:Array.isArray(slots)?slots:[]});
}
export async function onRequestPost({request,env}){
  if(!env.TL_STORE)return json({error:'尚未設定 TL_STORE KV 綁定'},503);
  const length=Number(request.headers.get('content-length')||0);if(length>150000)return json({error:'TL 資料太大'},413);
  let body;try{body=await request.json()}catch{return json({error:'JSON 格式錯誤'},400)}
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
export function onRequest(){return json({error:'不支援的請求方法'},405)}
