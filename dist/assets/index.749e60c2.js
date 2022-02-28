var Z=Object.defineProperty,ee=Object.defineProperties;var te=Object.getOwnPropertyDescriptors;var J=Object.getOwnPropertySymbols;var re=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable;var B=(e,t,o)=>t in e?Z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,p=(e,t)=>{for(var o in t||(t={}))re.call(t,o)&&B(e,o,t[o]);if(J)for(var o of J(t))ne.call(t,o)&&B(e,o,t[o]);return e},S=(e,t)=>ee(e,te(t));import{j as O,u as se,R as i,a as oe,N as V,L as j,b as ae,c as D,d as ce,B as le}from"./vendor.db0fcdb5.js";const ie=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}};ie();const R="p-4 m-3 rounded-sm font-bold text-base font-mono",W="underline hovered:no-underline",F="items-center justify-center text-lg w-full max-w-5xl resize-none my-4 p-4",q="text-base font-mono cursor-pointer children:py-2 children:px-4 lg:children:py-0 lg:children:px-1 text-right",N={"black on white":{default:"text-gray-900 bg-gray-50 text-2xl",btn:`text-gray-50 bg-gray-900 hover:bg-gray-400 ${R}`,anchor:`text-gray-600 visited:text-amber-800 ${W}`,userText:`bg-gray-100 border-gray-600 ${F}`,system:"text-gray-400 text-base font-mono",dropdown:`text-gray-400 children:bg-gray-50 hover:children:bg-gray-200 ${q}`},"white on gray":{default:"text-gray-50 bg-gray-500 text-2xl",btn:`text-gray-500 bg-gray-50 hover:bg-gray-200 ${R}`,anchor:`text-gray-400 visited:text-amber-600 ${W}`,userText:`placeholder:text-gray-300 bg-gray-400 border-gray-600 ${F}`,system:"text-gray-300 text-base font-mono",dropdown:`text-gray-300 children:bg-gray-500 hover:children:bg-gray-50 ${q}`},"amber on blue":{default:"text-amber-300 bg-blue-900 text-2xl",btn:`text-blue-800 bg-amber-300 hover:bg-amber-500 ${R}`,anchor:`text-amber-600 visited:text-amber-800 ${W}`,userText:`bg-blue-300/10 border-amber-800 ${F}`,system:"text-gray-400 text-base font-mono",dropdown:`text-gray-400 children:bg-blue-900 hover:children:bg-amber-300 ${q}`}},H=e=>{document.documentElement.setAttribute("data-theme",e),localStorage.setItem("theme",e);const t=N[e].default.split(" "),o=document.querySelector("body");if(o){const a=o.classList;if(a.length>0)for(let r=0;r<t.length;r++)a.replace(a[r],t[r]);else for(const r of t)a.add(r)}};var de=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",themes:N,defineTheme:H});(()=>{const e=localStorage.getItem("theme");H(e!==null?e:"black on white")})();const ue="modulepreload",M={},he="/",L=function(t,o){return!o||o.length===0?t():Promise.all(o.map(a=>{if(a=`${he}${a}`,a in M)return;M[a]=!0;const r=a.endsWith(".css"),n=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${n}`))return;const c=document.createElement("link");if(c.rel=r?"stylesheet":ue,r||(c.as="script",c.crossOrigin=""),c.href=a,document.head.appendChild(c),r)return new Promise((h,f)=>{c.addEventListener("load",h),c.addEventListener("error",f)})})).then(()=>t())},s=O.exports.jsx,d=O.exports.jsxs,v=O.exports.Fragment;function fe(){const e=se({from:{opacity:0},to:{opacity:1},config:{duration:250}});return i.useEffect(()=>{const t=setTimeout(()=>sessionStorage.setItem("descIsFaded","true"),250);return()=>clearTimeout(t)},[e]),d(oe.div,{className:"flex flex-col items-center w-full max-w-lg p-4",style:sessionStorage.getItem("descIsFaded")!=="true"?e:void 0,children:[s("p",{className:"curs indent-2",children:'This app allows to exchange fragments of text. Press "Generate" to generate a link that could be then sent to another person. Paste the text you wanted to share and press send. The other person will have an option to share their piece of text as well. On press you will be redirected, link will be copied to clipboard.'}),s("p",{className:"curs",children:"Have fun!"})]})}function me(e){const[t,o]=i.useState();return i.useEffect(()=>{const a=localStorage.getItem("theme");a&&o(N[a])},[]),s(ge,{value:{theme:t,setTheme:o},children:e.children})}const U=i.createContext({theme:N["black on white"],setTheme:()=>{}}),{Provider:ge,Consumer:$e}=U,w=()=>i.useContext(U);function xe(){const{theme:e}=w();return d("div",{className:`${e&&e.system}  absolute bottom-0 left-1/2 -translate-x-1/2 p-3 text-xs`,children:["Reach me\xA0",s("a",{className:"foot-link",href:"https://altsep.vercel.app/#contacts",target:"_blank",rel:"noreferrer",children:"here"})]})}function pe(e){const{setExchangeArr:t}=e,{theme:o}=w(),[a,r]=i.useState(!1),[n,c]=i.useState(""),h=f=>{f.preventDefault();const T=document.cookie.split("=")[1];L(()=>import("./gen-str.3e3fc5d6.js"),[]).then(({genAlphanumStr:m})=>{const b=m();c(b),t(y=>[...y,{type:"exchange",path:b,date:Date.now(),creator:T}]),r(!0);const u=location.href+b;navigator.clipboard.writeText(u)}).catch(m=>{console.log(m)})};return d(v,{children:[s("button",{className:o&&o.btn,onClick:h,children:"Generate"}),a&&s(V,{to:`/${n}`,replace:!0})]})}function ye(e){const{setExchangeArr:t,currentPath:o,setPageWasDeleted:a}=e,{theme:r}=w(),n=()=>{a(!0),t(c=>c.filter(h=>h.path!==o))};return s("button",{className:r&&r.btn,onClick:n,children:"Remove this page"})}function be(e){const{pageWasDeleted:t,isAppLoaded:o}=e,{theme:a}=w(),[r,n]=i.useState(3);return i.useEffect(()=>{const c=setInterval(()=>t&&n(h=>h-1),1e3);return()=>clearInterval(c)},[]),d("div",{className:`${a&&a.system} m-2`,children:[s("div",{className:"mb-4",children:s(j,{to:"/",children:"Return to home page"})}),o&&(t?d(v,{children:[d("p",{children:["Page was deleted. You will be redirected in ",r," seconds."]}),r===0&&s(V,{to:"/",replace:!0})]}):s("p",{children:"Page not found."}))]})}function ve(e){const{userId:t,exchangeArr:o}=e,{theme:a}=w();return s(v,{children:(()=>{const r=o.filter(n=>n.creator===t);return r.length>0&&d("div",{className:`${a&&a.system} flex flex-row flex-wrap max-w-3xl p-4`,children:["your pages:\xA0",r.map(n=>d("div",{children:[s(j,{to:`/${n.path}`,children:n.path}),r.length>1&&r.indexOf(n)!==r.length-1&&s(v,{children:",\xA0"})]},`link to ${n.path}`))]})})()})}const I=async()=>{try{return await(await fetch("/api")).json()}catch(e){console.log(e)}},K=async e=>{try{return await(await fetch("/api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}catch(t){console.log(t)}};function we(e){const{isCreator:t,creatorText:o,guestText:a,handleChange:r,theme:n}=e;return d("div",{className:"flex flex-col items-center justify-center w-full",children:[s("h1",{className:"curs",children:"Edit your text"}),s("textarea",{className:`${n&&n.userText} shadow-inner shadow-black/25 placeholder:text-base placeholder:font-mono overflow-y-hidden resize-none focus:outline-none`,placeholder:"Enter text here...",value:t?o:a,onChange:r,autoFocus:!0})]})}function Te(e){const{isCreator:t,textElementType:o,creatorText:a,guestText:r,theme:n}=e;return d("div",{className:"flex flex-col items-center justify-center w-ful",children:[s("h1",{className:"curs",children:t?"Guest's text":"Creator's text"}),s("div",{className:`${n&&n.userText} ${o} font-sans whitespace-pre-line break-words`,children:t?r||s("p",{className:n&&n.system,children:"Waiting for guest to send data..."}):a||s("p",{className:n&&n.system,children:"Waiting for creator to send data..."})})]})}function Se(e){const{currentPath:t,userId:o,setExchangeArr:a,setPageWasDeleted:r}=e,{theme:n}=w(),[c,h]=i.useState(),[f,T]=i.useState(!0),[m,b]=i.useState("default"),[u,y]=i.useState(""),[A,E]=i.useState(""),[_,z]=i.useState(!1);i.useEffect(()=>{z(!0),r(!1),I().then(({data:l})=>{h(S(p({},JSON.parse(l).filter(g=>g.path===t)[0]),{date:Date.now()})),z(!1)})},[]);const k=()=>{const l=document.querySelector("textarea");l&&(l.style.setProperty("height","auto"),l.style.setProperty("height",l.scrollHeight+"px"))};i.useEffect(()=>{const l=document.querySelector("textarea");if(!_&&l){k(),l.value.length===0&&l.style.setProperty("height","60px");const g=l.value.length*2;l.selectionStart=g}},[_,m]);const Y=l=>f?y(l.target.value):E(l.target.value),Q=()=>{I().then(({data:l})=>{const g=JSON.parse(l).filter(x=>x.path===t)[0];if(c&&f){const x=g.guestText;h(S(p({},c),{creatorText:u,guestText:x}))}else if(c){const x=g.creatorText;h(S(p({},c),{guestText:A,creatorText:x}))}})};i.useEffect(()=>{let l,g;return c&&(o===c.creator?T(!0):T(!1),l=setInterval(()=>o===c.creator&&I().then(({data:x})=>{const $=JSON.parse(x).filter(C=>C.path===t)[0].guestText;E($)}),5e3),g=setInterval(()=>o!==c.creator&&I().then(({data:x})=>{const $=JSON.parse(x).filter(C=>C.path===t)[0].creatorText;y($)}),5e3)),()=>{clearInterval(l),clearInterval(g)}},[c]),i.useEffect(()=>{if(c){const{creatorText:l,guestText:g}=c;l&&y(l),g&&E(g),a(x=>{const P=x.slice(),$=P.findIndex(C=>C.path===c.path);return P[$]=c,P})}},[c]),i.useEffect(()=>{const l=document.querySelector("textarea");return l&&(l.addEventListener("input",k),window.addEventListener("resize",k)),()=>{l&&(l.removeEventListener("input",k),window.removeEventListener("resize",k))}},[_]);const X=()=>b(m==="default"?"other":"default"),G={isCreator:f,textElementType:m,creatorText:u,guestText:A,handleChange:Y,theme:n};return d(v,{children:[d("div",{className:`${n&&n.system} flex flex-row justify-between m-2 mb-12`,children:[s(j,{to:"/",children:"Return to home page"}),s("p",{children:t})]}),s("div",{className:"flex flex-col items-center justify-center",children:_?s("p",{className:n&&n.system,children:"Getting data..."}):document.cookie?d(v,{children:[m==="default"?s(we,p({},G)):s(Te,p({},G)),d("div",{className:"flex flex-row flex-wrap justify-center",children:[m==="default"&&d("button",{className:`${n&&n.btn} flex flex-row items-center`,onClick:Q,children:[s("p",{children:"Send"}),"\xA0",s("p",{className:"text-xs",children:"(128kb max)"})]}),f&&s(ye,S(p({},e),{setPageWasDeleted:r})),s("button",{className:n&&n.btn,onClick:X,children:m==="default"?f?"Show guest's text":"Show creator's text":"Show your text"})]})]}):s("p",{children:"Can't identify user! Please enable cookies for this site."})})]})}function Ne(){const[e,t]=i.useState(!1),{theme:o,setTheme:a}=w(),r=Object.keys(N);return s("div",{className:`${o&&o.dropdown} absolute top-0 right-0 z-10`,children:e?r.map(n=>s("p",{onClick:()=>{L(()=>Promise.resolve().then(function(){return de}),void 0).then(({defineTheme:c})=>c(n)),a(N[n]),t(!1)},children:n},n)):s("p",{onClick:()=>{t(!0)},children:"theme"})})}function Ie(){const[e,t]=i.useState([]),[o,a]=i.useState(!1),[r,n]=i.useState("");i.useEffect(()=>{I().then(({data:u})=>{u&&t(JSON.parse(u)),a(!0)})},[]),i.useEffect(()=>{const u=document.cookie.split("=")[1];u?n(u):L(()=>import("./gen-str.3e3fc5d6.js"),[]).then(({genAlphanumStr:y})=>{const A="user-id="+y(32),E=";max-age=2592000;secure;samesite=strict";document.cookie=A+E}).catch(y=>console.log(y)),o&&K(e)},[e]);const c={setExchangeArr:t,getData:I,setData:K},[h,f]=i.useState(!1),T={userId:r,exchangeArr:e,setExchangeArr:t,setPageWasDeleted:f},m={isAppLoaded:o,pageWasDeleted:h,setPageWasDeleted:f},b={userId:r,exchangeArr:e};return s("div",{children:d(ae,{children:[s(D,{path:"/",element:d(v,{children:[s(Ne,{}),d("div",{className:"flex flex-col items-center w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",children:[s(fe,{}),s(pe,p({},c)),s(ve,p({},b))]}),s(xe,{})]})}),e!==void 0&&e.map(u=>s(D,{path:`/${u.path}`,element:s(Se,S(p({},T),{currentPath:u.path}))},u.path)),s(D,{path:"*",element:s(be,p({},m))})]})})}const Ee=e=>{e&&e instanceof Function&&L(()=>import("./web-vitals.8ad394cc.js"),[]).then(({getCLS:t,getFID:o,getFCP:a,getLCP:r,getTTFB:n})=>{t(e),o(e),a(e),r(e),n(e)})};ce.render(s(i.StrictMode,{children:s(le,{children:s(me,{children:s(Ie,{})})})}),document.getElementById("root"));Ee();
