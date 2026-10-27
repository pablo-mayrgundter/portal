import{W as be,S as ve,N as xe,P as ye,d as ke,a as Se,C as ce,H as Ae,D as Pe,M as de,b as Me,c as pe,B as Ee,m as Le,e as ze,f as Ce,g as Re,h as Te,V as y,i as Fe,j as $e,k as Ge,l as We,n as De,o as He,p as ee}from"./index-r9B_6VzV.js";const Be=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],qe=`
#portal-nav-toggle {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1001;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 9, 18, 0.65);
  border: 1px solid rgba(216, 231, 255, 0.20);
  border-radius: 8px;
  color: #d8e7ff;
  cursor: pointer;
  padding: 0;
  font: inherit;
}
#portal-nav-toggle:hover { background: rgba(93, 169, 255, 0.15); border-color: rgba(93, 169, 255, 0.45); }
#portal-nav-toggle:focus-visible { outline: 2px solid rgba(93, 169, 255, 0.8); outline-offset: 2px; }
#portal-nav-toggle svg { display: block; }

#portal-nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  z-index: 1000;
  background: rgba(8, 11, 19, 0.94);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-left: 1px solid rgba(216, 231, 255, 0.15);
  color: #d8e7ff;
  font-family: Inter, system-ui, sans-serif;
  padding: 60px 22px 24px;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 200ms ease;
}
#portal-nav-drawer[aria-hidden="false"] { transform: translateX(0); }

#portal-nav-drawer h2 { font-size: 18px; margin: 0 0 4px; letter-spacing: -0.02em; }
#portal-nav-drawer .portal-nav-subtitle { color: #8fa7c4; font-size: 12px; margin: 0 0 18px; }
#portal-nav-drawer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
#portal-nav-drawer li { margin: 0; padding: 0; }
#portal-nav-drawer a {
  display: block;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(216, 231, 255, 0.10);
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
  transition: background 120ms ease, border-color 120ms ease;
}
#portal-nav-drawer a:hover { background: rgba(93, 169, 255, 0.10); border-color: rgba(93, 169, 255, 0.45); }
#portal-nav-drawer .portal-nav-current a { background: rgba(93, 169, 255, 0.14); border-color: rgba(93, 169, 255, 0.50); }
#portal-nav-drawer .portal-nav-label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 3px; }
#portal-nav-drawer .portal-nav-desc { display: block; font-size: 12px; color: #8fa7c4; line-height: 1.45; }
#portal-nav-drawer .portal-nav-intro { font-size: 13px; line-height: 1.5; color: #c9c3ea; margin: 0 0 16px; padding: 10px 12px; background: rgba(154, 140, 255, 0.08); border-left: 2px solid rgba(154, 140, 255, 0.55); border-radius: 0 8px 8px 0; }
#portal-nav-drawer .portal-nav-intro a { display: inline; padding: 0; background: transparent; border: none; color: #b7a9ff; text-decoration: underline; text-underline-offset: 2px; white-space: nowrap; }
#portal-nav-drawer .portal-nav-intro a:hover { background: transparent; color: #d6ccff; }
#portal-nav-drawer .portal-nav-intro svg { display: inline-block; vertical-align: -1px; margin-left: 2px; }
#portal-nav-drawer .portal-nav-version { margin: 0 0 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: #8fa7c4; }
#portal-nav-drawer .portal-nav-version select {
  font: 600 12px Inter, system-ui, sans-serif;
  color: #d8e7ff;
  background: rgba(93, 169, 255, 0.14);
  border: 1px solid rgba(93, 169, 255, 0.5);
  border-radius: 8px;
  padding: 5px 8px;
  cursor: pointer;
}
#portal-nav-drawer .portal-nav-repo { margin-top: 22px; font-size: 11px; color: #6d829f; }
#portal-nav-drawer .portal-nav-repo a { background: transparent; border: none; padding: 0; }
#portal-nav-drawer .portal-nav-repo a:hover { background: transparent; }
`,Ue='<svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',je='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',te='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ne=(t,o)=>{const e=t==="three";return o==="three"?e?".":"..":e?`${o}/`:`../${o}/`},Oe=t=>{const e=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),r=e.match(/^(.*\/)v\/([^/]+)\/$/);return r?{root:e,siteRoot:r[1],snapshot:r[2]}:{root:e,siteRoot:e,snapshot:null}},Ie=(t,o)=>{const{siteRoot:e,snapshot:r}=Oe(),c=`${o}/`,i=(n,S)=>{t.innerHTML="";const A=[["latest",`latest · ${S}`],...n.map(f=>[f,`v${f} snapshot`])];r&&!n.includes(r)&&A.push([r,`v${r} snapshot`]);for(const[f,d]of A){const w=document.createElement("option");w.value=f,w.textContent=d,w.selected=f===(r??"latest"),t.appendChild(w)}};fetch(`${e}v/versions.json`,{cache:"no-cache"}).then(n=>n.ok?n.json():null).then(n=>{n?.versions&&i(n.versions,n.latest??"main")}).catch(()=>{}),t.addEventListener("change",()=>{const n=t.value,S=n==="latest"?e:`${e}v/${n}/`;location.href=`${S}${c}${location.search}${location.hash}`})},oe=t=>t.replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]),Ke=t=>{if(document.getElementById("portal-nav-toggle"))return;const o=document.createElement("style");o.id="portal-nav-styles",o.textContent=qe,document.head.appendChild(o);const e=document.createElement("aside");e.id="portal-nav-drawer",e.setAttribute("aria-hidden","false"),e.setAttribute("aria-label","Portal demos"),e.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <p class="portal-nav-intro">Portal links independent 3D web renderers at the GL layer: a guest's WebGL2 calls replay into the host's context, so engines compose without rewriting either. What it is, and where it's going: <a href="../rfcs/" target="_blank" rel="noopener">the RFC responses${Ue}</a></p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${Be.map(n=>`
        <li${n.key===t?' class="portal-nav-current"':""}>
          <a href="${Ne(t,n.key)}"${n.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${oe(n.label)}</span>
            <span class="portal-nav-desc">${oe(n.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=te,document.body.appendChild(e),document.body.appendChild(r);const c=e.querySelector("#portal-nav-version");c&&Ie(c,t);const i=n=>{e.setAttribute("aria-hidden",n?"false":"true"),r.setAttribute("aria-expanded",n?"true":"false"),r.setAttribute("aria-label",n?"Close demos menu":"Toggle demos menu"),r.innerHTML=n?te:je};r.addEventListener("click",n=>{n.stopPropagation(),i(e.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",n=>{e.getAttribute("aria-hidden")==="true"||n.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||i(!1)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.getAttribute("aria-hidden")==="false"&&i(!1)})};Ke("iframe");const M=new URLSearchParams(location.search),V=M.get("debug")??"off",J=M.get("compose")==="raw",R=M.get("freeze")==="1",F=M.get("log")==="1",E=(()=>{const t=M.get("predict");if(t===null)return 0;const o=Number(t);return Number.isFinite(o)?o:0})(),Ve=M.get("fxaa")!=="off",re=document.querySelector("#target-iframe");re&&location.search&&(re.src=`target.html${location.search}`);const ue=document.querySelector("#app");if(!ue)throw new Error("Missing #app");const g=document.querySelector("#target-iframe");if(!g)throw new Error("Missing #target-iframe");const s=new be({antialias:!0,stencil:!0});s.outputColorSpace=ve;s.toneMapping=xe;s.setPixelRatio(Math.min(window.devicePixelRatio,2));s.setSize(window.innerWidth,window.innerHeight);s.autoClear=!1;ue.appendChild(s.domElement);const a=new ye(70,window.innerWidth/window.innerHeight,.02,200);a.position.set(0,1.6,5.5);const m=ke(M.get("pose"));m&&a.position.set(m.position[0],m.position[1],m.position[2]);const k=new Se;k.background=new ce("#101826");k.add(new Ae(12176639,2241348,1));const he=new Pe(16777215,.65);he.position.set(3,6,2);k.add(he);const ge=new de(new Me(18,18),new pe({color:"#1b2a3f",roughness:.95,metalness:.03}));ge.rotation.x=-Math.PI/2;k.add(ge);const _e=new Ee(.9,.9,.9),Qe=new pe({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const o=new de(_e,Qe);o.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),k.add(o)}const Xe=new $e(2.6,3.2),C=Le(Xe);C.position.set(0,1.6,-3.5);k.add(C);const T=Ge({scene:k,anchor:C}),l=ze({iframe:g,debugMode:V,composeRaw:J});l.prewarm(s);const j=g.contentWindow;if(j){const t=Ce({scene:k,anchor:T.getAnchor(),outputTarget:j,inputFilter:j,log:F,fxaa:Ve});g.contentDocument?.readyState==="complete"?t.start():g.addEventListener("load",()=>t.start(),{once:!0})}V!=="off"&&console.log("[host] compositor debug mode:",V);J&&console.log("[host] compose=raw: bypassing stencil + depth-clip");R&&console.log("[host] freeze=1: pose will be captured once and held");E!==1&&console.log("[host] predict =",E,"(frames ahead)");const L=Re(),P=Te(a,s.domElement);m&&P.setOrientationFromForward(new y(m.forward[0],m.forward[1],m.forward[2]));const Ye=document.querySelector('meta[name="portal:snapshot-proxy"]')?.content??"http://localhost:3030",Ze=document.querySelector('meta[name="portal:snapshot-scene"]')?.content??"pair",fe=t=>{const o=We({baseUrl:Ye,scene:Ze,pose:t,width:1200,height:630});document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(e=>{e.content=o})};fe(m);const Je=t=>{const o=new URL(location.href);return o.searchParams.set("pose",t),o.toString()},$=new y;window.addEventListener("keydown",t=>{if(t.code!=="KeyP"||t.metaKey||t.ctrlKey||t.altKey)return;$.set(0,0,-1).applyQuaternion(a.quaternion);const o={position:[a.position.x,a.position.y,a.position.z],forward:[$.x,$.y,$.z]},e=Fe(o),r=new URL(location.href);r.searchParams.set("pose",e),history.replaceState(null,"",r.toString());const c=Je(e);navigator.clipboard?.writeText(c).catch(()=>{}),fe(o),console.log("[host] permalink:",c)});const et=()=>{const t=window.innerWidth,o=window.innerHeight;s.setSize(t,o),a.aspect=t/o,a.updateProjectionMatrix()};window.addEventListener("resize",et);const ne=new De,q=new ce,p=new y,u=new y,h=new y;let ae=0,G=null,N=null,O=null;const b=[0,0,0],v=[0,0,-1],x=[0,1,0],W=[0,0,0],D=[0,0,-1],H=[0,1,0],me=[0,0,0],_=[0,0,-1],Q=[0,1,0],tt={position:me,forward:_,up:Q},ot={position:b,forward:v,up:x};let se=!1;const I=new y;let X=!1,B=!1;const rt=t=>{if(!g.contentWindow)return;const o={type:"portal:traverse",pose:t,pressedKeys:P.getKeys(),viewport:{width:window.innerWidth,height:window.innerHeight}};g.contentWindow.postMessage(o,"*")};let z=null,Y=!1;const we=()=>{Y||(Y=!0,z!==null&&(window.clearTimeout(z),z=null),document.body.classList.add("handed-off"),g.classList.add("fullscreen"),g.contentWindow?.focus(),P.clearKeys(),F&&console.log("[host] traversal: applied CSS swap"))},ie=new y;window.addEventListener("message",t=>{if(t.source!==g.contentWindow)return;const o=t.data;if(!o||typeof o!="object")return;if(o.type==="portal:traverse-ack"){we();return}if(o.type!=="portal:traverse")return;const e=o.pose;if(a.position.set(e.position[0],e.position[1],e.position[2]),e.up&&a.up.set(e.up[0],e.up[1],e.up[2]),e.forward&&(ie.set(e.position[0]+e.forward[0],e.position[1]+e.forward[1],e.position[2]+e.forward[2]),a.lookAt(ie)),e.forward){const r=new y(e.forward[0],e.forward[1],e.forward[2]);P.setOrientationFromForward?.(r)}if(a.updateMatrixWorld(!0),s.setRenderTarget(null),s.clear(!0,!0,!0),T.renderAsSource(s,a),l.isReady()&&l.hasFrame()){const r=l.getBackground();q.setRGB(r.r,r.g,r.b),L.update(C,a,q),s.render(L.scene,L.camera),s.clearDepth(),l.renderAsDestination(s)}document.body.classList.remove("handed-off"),g.classList.remove("fullscreen"),window.focus(),P.clearKeys(),Array.isArray(o.pressedKeys)&&P.setKeys(o.pressedKeys),B=!1,X=!1,Y=!1,F&&console.log("[host] reverse traversal: resumed source role at",e)});const K=(t,o,e,r)=>{t[0]=e[0]+(e[0]-o[0])*r,t[1]=e[1]+(e[1]-o[1])*r,t[2]=e[2]+(e[2]-o[2])*r},le=t=>{const o=Math.hypot(t[0],t[1],t[2]);if(o<1e-9){t[0]=0,t[1]=0,t[2]=-1;return}const e=1/o;t[0]*=e,t[1]*=e,t[2]*=e},Z=()=>{const t=ne.getDelta(),o=ne.elapsedTime;if(P.update(t),!B&&l.isReady()){if(!X)I.copy(a.position),X=!0;else{const e=l.getAnchor(),r=T.getAnchor();if(He(I,a.position,C).crossed){a.getWorldPosition(p),u.set(0,0,-1).applyQuaternion(a.quaternion),h.set(0,1,0).applyQuaternion(a.quaternion);const i=ee({position:[p.x,p.y,p.z],forward:[u.x,u.y,u.z],up:[h.x,h.y,h.z]},{source:r,target:e});rt(i),B=!0,F&&console.log("[host] traversal: awaiting iframe ack",i),z!==null&&window.clearTimeout(z),z=window.setTimeout(we,250)}}I.copy(a.position)}if(B){requestAnimationFrame(Z);return}if(l.isReady()){a.getWorldPosition(p),u.set(0,0,-1).applyQuaternion(a.quaternion),h.set(0,1,0).applyQuaternion(a.quaternion),b[0]=p.x,b[1]=p.y,b[2]=p.z,v[0]=u.x,v[1]=u.y,v[2]=u.z,x[0]=h.x,x[1]=h.y,x[2]=h.z;let e;E>0&&se?(K(me,W,b,E),K(_,D,v,E),K(Q,H,x,E),le(_),le(Q),e=tt):e=ot,W[0]=b[0],W[1]=b[1],W[2]=b[2],D[0]=v[0],D[1]=v[1],D[2]=v[2],H[0]=x[0],H[1]=x[1],H[2]=x[2],se=!0;const r=T.getAnchor(),c=l.getAnchor(),i=ee(e,{source:r,target:c}),n=Array.from(a.projectionMatrix.elements),S=s.getPixelRatio(),A=Math.max(1,Math.floor(window.innerWidth*S)),f=Math.max(1,Math.floor(window.innerHeight*S));if(R&&!G){G=i,N=n,O={width:A,height:f};const d=w=>`[${w.map(U=>U.toFixed(3)).join(", ")}]`;console.log("[host] freeze captured pose pos:",d(i.position)),console.log("[host] freeze captured pose fwd:",d(i.forward??[0,0,-1])),console.log("[host] freeze captured viewport:",A,"x",f)}if(l.requestFrame({pose:R&&G?G:i,projection:R&&N?N:n,viewport:R&&O?O:{width:A,height:f},time:o}),F&&o-ae>1){ae=o;const d=w=>`[${w.map(U=>U.toFixed(3)).join(", ")}]`;console.log("[host] sourceAnchor:",r),console.log("[host] targetAnchor:",c),console.log("[host] hostPos:",d([p.x,p.y,p.z])),console.log("[host] hostFwd:",d([u.x,u.y,u.z])),console.log("[host] hostUp: ",d([h.x,h.y,h.z])),console.log("[host] coupled pos:",d(i.position)),console.log("[host] coupled fwd:",d(i.forward??[0,0,-1])),console.log("[host] coupled up: ",d(i.up??[0,1,0])),console.log("[host] viewport:",A,"x",f)}}if(s.setRenderTarget(null),s.clear(!0,!0,!0),J)l.hasFrame()&&l.renderAsDestination(s);else{T.renderAsSource(s,a);const e=l.isReady()?l.getBackground():{r:0,g:0,b:0};q.setRGB(e.r,e.g,e.b),L.update(C,a,q),s.render(L.scene,L.camera),s.clearDepth(),l.hasFrame()&&l.renderAsDestination(s)}requestAnimationFrame(Z)};Z();
