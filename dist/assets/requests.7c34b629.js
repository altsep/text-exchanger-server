const o=async e=>{try{const a=await(await fetch("/api/list-created",{method:"POST",headers:{"Content-Type":"text/plain"},body:e})).json();if(!a)throw"Response empty";return a}catch(t){console.error(t)}},n=async e=>{try{return await(await fetch("/api/new-page",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).text()}catch(t){console.log(t)}},r=async e=>{try{await fetch("/api/remove-page",{method:"POST",headers:{"Content-Type":"text/plain"},body:e})}catch(t){console.log(t)}},s=async e=>{try{return await(await fetch("/api/get-info",{method:"POST",headers:{"Content-Type":"text/plain"},body:e})).text()}catch(t){console.log(t)}},c=async e=>{try{return await(await fetch("/api/update-info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).text()}catch(t){console.log(t)}},i=async e=>{try{return await(await fetch("/api/save-text",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).text()}catch(t){console.log(t)}},y=async e=>{try{return await(await fetch("/api/get-text",{method:"POST",headers:{"Content-Type":"text/plain"},body:e})).text()}catch(t){console.log(t)}},p=async e=>{try{return await(await fetch("/api/get-text-other",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).text()}catch(t){console.log(t)}};export{n as addPage,o as getCreatorPages,s as getInfo,y as getText,p as getTextOther,r as removePage,i as sendText,c as updateInfo};
