(() => {
"use strict";
const project=window.KLING_PROJECT;
if(!project || !Array.isArray(project.results))return;
const byId=id=>document.getElementById(id);
const resultGrid=byId("videoResults");
const promptGrid=byId("promptPanels");
const modal=byId("videoModal");
const modalPlayer=byId("modalPlayer");
const modalSource=byId("modalSource");
const modalTitle=byId("modalTitle");
const modalError=byId("modalError");
let language="en";
const copyButtons=[];
const names={
 "arrival":{en:"The Arrival & The Hand",fa:"ورود به کازینو و دست برنده"},
 "second-pass":{en:"The Second Pass",fa:"تولید دوباره و بررسی ثبات"},
 "terrace":{en:"The Conversation",fa:"گفت‌وگو در تراس"},
 "departure":{en:"The Departure",fa:"خروج از کازینو"}
};
const descriptions={
 "arrival":{en:"A complete casino sequence: arrival, the card table, the winning hand and the terrace.",fa:"سکانس ورود به کازینو، میز بازی، دست برنده و تراس."},
 "second-pass":{en:"The same story and a second prompt version with an explicit consistency block.",fa:"نسخه دوم همان داستان، با دستور مشخص برای حفظ ثبات چهره و لباس."},
 "terrace":{en:"Two characters, restrained dialogue, planned camera movement and lip sync.",fa:"گفت‌وگوی 2 شخصیت با حرکت دوربین و هماهنگی لب‌ها."},
 "departure":{en:"Leaving the casino in the dark green car: four planned cinematic shots.",fa:"خروج از کازینو با خودروی سبز تیره در 4 نمای سینمایی."}
};
const translations={
 nav:["Prompts & results","پرامپت‌ها و نتیجه‌ها"],
 eyebrow:["ONE AGENT. FOUR AI GENERATIONS.","یک مأمور، 4 خروجی هوش مصنوعی"],
 headline1:["Can AI direct a","آیا هوش مصنوعی می‌تونه"],
 headline2:["movie?","فیلم بسازه؟"],
 lead:["A cinematic Kling 4.0 experiment on Higgsfield. One agent, a high-stakes casino and four original outputs. Watch every clip and copy the exact prompts behind them.","یک آزمایش سینمایی با مدل کلینگ 4.0؛ یک مأمور، کازینوی مرموز و 4 خروجی واقعی. همه ویدیوها رو همین‌جا ببین و پرامپت کاملشون رو کپی کن."],
 metricVideos:["Video outputs","خروجی ویدیویی"],
 metricFilm:["Final film","فیلم نهایی"],
 metricPrompts:["Full prompts","پرامپت کامل"],
 watchEyebrow:["Watch the tutorial","تماشای آموزش"],
 watchTitle:["Watch on YouTube","تماشا در یوتیوب"],
 watchDesc:["TunnelLab · Full Kling 4.0 tutorial","تانل‌لب · آموزش کامل کلینگ 4.0"],
 repoEyebrow:["Create your own AI videos","ساخت ویدیو با هوش مصنوعی"],
 repoTitle:["Try Higgsfield","با هیگزفیلد ویدیو بساز"],
 repoDesc:["Sign up with TunnelLab's referral link","ثبت‌نام با لینک اختصاصی تانل‌لب"],
 finalHeading:["Watch the finished film","تماشای فیلم نهایی"],
 finalDesc:["The complete story, edited in Adobe Premiere Pro and playable here.","نسخه نهایی داستان که با پریمیر تدوین شده و همین‌جا پخش می‌شه."],
 finalTag:["FINAL CUT","تدوین نهایی"],
 filmTitle:["The Final Hand","دست آخر"],
 filmDesc:["A night at the casino, a high-stakes hand, a quiet conversation and one final getaway. The scenes below are the individual Higgsfield generations used to develop the film.","یک شب در کازینو، بازی پرریسک، گفت‌وگویی مرموز و خروج شبانه. پایین صفحه خروجی‌های اصلی هیگزفیلد رو می‌بینی."],
 watchYoutube:["Watch the film on YouTube ↗","تماشای فیلم در یوتیوب ↗"],
 generationsHeading:["Explore the generations","خروجی‌های ساخته‌شده"],
 generationsDesc:["All 4 original Kling 4.0 outputs. Play each one here, or open the source on Higgsfield.","هر 4 خروجی اصلی کلینگ 4.0 رو همین‌جا پخش کن، یا نسخه اصلی رو در هیگزفیلد ببین."],
 generationsTag:["04 VIDEOS","4 ویدیو"],
 allVideosTitle:["Original video outputs","ویدیوهای اصلی"],
 resultsTitle:["Model outputs","نتیجه‌های تولید"],
 resultsDesc:["Original MP4 files · play on this site","فایل‌های اصلی ویدیو · پخش مستقیم در سایت"],
 promptsHeading:["All production prompts","تمام پرامپت‌های تولید"],
 promptsDesc:["The complete submitted prompts, including shot direction, reference rules, dialogue and sound. Copy them as written.","متن کامل پرامپت‌های اجراشده، با دستور دوربین، رفرنس‌ها، دیالوگ و صدا؛ آماده کپی."],
 promptsTag:["04 PROMPTS","4 پرامپت"],
 footer1:["© 2026 TunnelLab · Original AI filmmaking experiment.","© 2026 تانل‌لب · آزمایش مستقل فیلم‌سازی با هوش مصنوعی."],
 footer2:["Created with Kling 4.0 on Higgsfield · Edited in Adobe Premiere Pro.","تولید با کلینگ 4.0 در هیگزفیلد · تدوین با ادوبی پریمیر."]
};
function tr(key){return translations[key]?.[language==="fa"?1:0]||key}
function txt(content,tag="span",cls=""){const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=content;return e}
function safeLink(url,text,cls){const a=txt(text,"a",cls);a.href=url;a.target="_blank";a.rel="noopener noreferrer";return a}
function openVideo(v){
 if(!v.directVideoUrl){window.open(v.link,"_blank","noopener,noreferrer");return}
 modalTitle.textContent=names[v.id]?.[language]||v.title;
 modalError.hidden=true;
 modalSource.href=v.link;
 modalSource.textContent=language==="fa"?"نسخه اصلی در هیگزفیلد ↗":"Original on Higgsfield ↗";
 modalPlayer.src=v.directVideoUrl;
 if(typeof modal.showModal==="function")modal.showModal();else modal.setAttribute("open","");
 modalPlayer.play().catch(()=>{}); // user may need to press the native play button
}
function closeVideo(){
 modalPlayer.pause();
 modalPlayer.removeAttribute("src");
 modalPlayer.load();
 if(modal.open&&typeof modal.close==="function")modal.close();
 else modal.removeAttribute("open");
}
byId("modalClose").addEventListener("click",closeVideo);
modal.addEventListener("cancel",event=>{event.preventDefault();closeVideo()});
modal.addEventListener("click",event=>{if(event.target===modal)closeVideo()});
modalPlayer.addEventListener("error",()=>{modalError.hidden=false;modalError.textContent=language==="fa"?"پخش فایل ممکن نبود؛ لینک نسخه اصلی در دسترسه.":"This file couldn't be streamed; the original link is available."});
for(const v of project.results){
 const card=txt("","article","result");card.dataset.id=v.id;
 const poster=txt("","button","poster has-video");poster.type="button";
 poster.setAttribute("aria-label","Play "+(names[v.id]?.en||v.title)+" on this page");
 const image=txt("","img");image.src=v.thumb;image.alt="Video still from "+v.title;image.loading="lazy";image.decoding="async";
 poster.append(image,txt("▶","span","play"),txt("MP4","span","video-indicator"));
 poster.addEventListener("click",()=>openVideo(v));
 card.append(poster);
 const content=txt("","div","card-body");
 const title=txt(names[v.id]?.en||v.title,"div","model");title.dataset.title=v.id;
 content.append(title);
 const status=txt("","div","row");
 status.append(txt(v.duration||"Kling 4.0"),txt("● Published","span","status"));content.append(status);
 const description=txt(descriptions[v.id]?.en||v.note,"div","site-result-details");description.dataset.description=v.id;
 content.append(description);
 const actions=txt("","div","media-actions");
 const play=txt("Play here ▶","button","view");play.type="button";play.dataset.action="play";play.addEventListener("click",()=>openVideo(v));actions.append(play);
 const original=safeLink(v.link,"Higgsfield ↗","view secondary");actions.append(original);
 content.append(actions);
 card.append(content);resultGrid.append(card);
 const panel=txt("","article","panel prompt-block");panel.id="prompt-"+v.id;
 const heading=txt("","div","panel-title");heading.append(txt(v.number+" — "+(names[v.id]?.en||v.title),"h3"));
 heading.append(txt("KLING 4.0","span","tag"));panel.append(heading);
 const body=txt("","div","panel-body");
 const caption=txt("","div","prompt-caption");const label=txt("ORIGINAL GENERATION PROMPT","strong");label.dataset.promptLabel=v.id;caption.append(label);
 const copy=txt("Copy prompt ↗","button","copy");copy.type="button";copy.dataset.action="copy";copy.addEventListener("click",async()=>{
 try{
  if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(v.prompt);
  else {const temp=txt("","textarea");temp.value=v.prompt;temp.style.cssText="position:fixed;left:-9999px";document.body.append(temp);temp.select();if(!document.execCommand("copy"))throw Error("Clipboard not available");temp.remove()}
  copy.textContent=language==="fa"?"کپی شد ✓":"Copied ✓";
 }catch{
  const selection=window.getSelection(),range=document.createRange();range.selectNodeContents(pre);selection.removeAllRanges();selection.addRange(range);
  copy.textContent=language==="fa"?"متن انتخاب شد":"Text selected";
 }
 setTimeout(()=>{copy.textContent=language==="fa"?"کپی پرامپت ↗":"Copy prompt ↗"},1800);
 });caption.append(copy);body.append(caption);copyButtons.push(copy);
 const pre=txt(v.prompt,"pre");pre.dir="ltr";pre.lang="en";body.append(pre);
 const meta=txt("","div","prompt-meta");
 const note=txt(v.duration+" · Full original prompt","span");note.dataset.note=v.id;meta.append(note);
 const go=safeLink(v.link,"View on Higgsfield ↗","view");go.dataset.action="source";meta.append(go);
 body.append(meta);panel.append(body);promptGrid.append(panel);
}
const toggle=byId("langToggle");
function applyLanguage(){
 const persian=language==="fa";document.documentElement.lang=persian?"fa":"en";
 document.documentElement.dir=persian?"rtl":"ltr";
 document.title=persian?"ساخت فیلم با کلینگ 4.0 — تانل‌لب":"The Final Hand — Kling 4.0 | TunnelLab";
 toggle.textContent=persian?"English / EN":"فارسی / FA";
 document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=tr(el.dataset.i18n));
 document.querySelectorAll("[data-title]").forEach(el=>el.textContent=names[el.dataset.title]?.[language]||el.textContent);
 document.querySelectorAll("[data-description]").forEach(el=>el.textContent=descriptions[el.dataset.description]?.[language]||el.textContent);
 document.querySelectorAll(".prompt-block").forEach(panel=>{
  const id=panel.id.slice(7),v=project.results.find(x=>x.id===id);if(!v)return;
  panel.querySelector(".panel-title h3").textContent=v.number+" — "+(names[id]?.[language]||v.title);
  panel.querySelector(".prompt-caption strong").textContent=persian?"پرامپت اصلی تولید":"ORIGINAL GENERATION PROMPT";
  panel.querySelector(".prompt-meta [data-note]").textContent=persian?"پرامپت اصلی · "+v.duration:v.duration+" · Full original prompt";
  panel.querySelector(".prompt-meta a").textContent=persian?"مشاهده در هیگزفیلد ↗":"View on Higgsfield ↗";
 });
 resultGrid.querySelectorAll(".result").forEach(card=>{
  const original=card.querySelector(".media-actions a"),play=card.querySelector(".media-actions button");
  original.textContent=persian?"هیگزفیلد ↗":"Higgsfield ↗";play.textContent=persian?"پخش در سایت ▶":"Play here ▶";
  card.querySelector(".row span:last-child").textContent=persian?"● منتشرشده":"● Published";
 });
 copyButtons.forEach(b=>b.textContent=persian?"کپی پرامپت ↗":"Copy prompt ↗");
 modalSource.textContent=persian?"نسخه اصلی در هیگزفیلد ↗":"Original on Higgsfield ↗";
 byId("modalClose").textContent=persian?"بستن ×":"Close ×";
}
toggle.addEventListener("click",()=>{language=language==="en"?"fa":"en";applyLanguage()});
applyLanguage();
})();