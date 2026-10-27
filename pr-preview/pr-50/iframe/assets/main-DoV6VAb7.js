import{W as be,S as ve,N as ye,P as xe,d as ke,a as Se,C as ce,H as Ae,D as Pe,M as de,b as Ee,c as pe,B as Le,m as Me,e as ze,f as Ce,g as Re,h as Fe,V as x,i as Te,j as $e,k as De,l as Ge,n as We,o as He,p as ee}from"./index-r9B_6VzV.js";const qe=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],Be=`
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
#portal-nav-drawer .portal-nav-docs { margin-top: 18px; }
#portal-nav-drawer .portal-nav-docs a { border-color: rgba(154, 140, 255, 0.35); }
#portal-nav-drawer .portal-nav-docs a:hover { background: rgba(154, 140, 255, 0.12); border-color: rgba(154, 140, 255, 0.6); }
#portal-nav-drawer .portal-nav-version { margin-top: 14px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: #8fa7c4; }
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
`,Ue='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',te='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ne=(t,o)=>{const e=t==="three";return o==="three"?e?".":"..":e?`${o}/`:`../${o}/`},Oe=t=>{const e=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),r=e.match(/^(.*\/)v\/([^/]+)\/$/);return r?{root:e,siteRoot:r[1],snapshot:r[2]}:{root:e,siteRoot:e,snapshot:null}},je=(t,o)=>{const{siteRoot:e,snapshot:r}=Oe(),c=`${o}/`,i=(a,S)=>{t.innerHTML="";const A=[["latest",`latest · ${S}`],...a.map(f=>[f,`v${f} snapshot`])];r&&!a.includes(r)&&A.push([r,`v${r} snapshot`]);for(const[f,d]of A){const w=document.createElement("option");w.value=f,w.textContent=d,w.selected=f===(r??"latest"),t.appendChild(w)}};fetch(`${e}v/versions.json`,{cache:"no-cache"}).then(a=>a.ok?a.json():null).then(a=>{a?.versions&&i(a.versions,a.latest??"main")}).catch(()=>{}),t.addEventListener("change",()=>{const a=t.value,S=a==="latest"?e:`${e}v/${a}/`;location.href=`${S}${c}${location.search}${location.hash}`})},oe=t=>t.replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]),Ie=t=>{if(document.getElementById("portal-nav-toggle"))return;const o=document.createElement("style");o.id="portal-nav-styles",o.textContent=Be,document.head.appendChild(o);const e=document.createElement("aside");e.id="portal-nav-drawer",e.setAttribute("aria-hidden","false"),e.setAttribute("aria-label","Portal demos"),e.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${qe.map(a=>`
        <li${a.key===t?' class="portal-nav-current"':""}>
          <a href="${Ne(t,a.key)}"${a.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${oe(a.label)}</span>
            <span class="portal-nav-desc">${oe(a.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <div class="portal-nav-docs">
      <a href="../rfcs/">
        <span class="portal-nav-label">Docs: what Portal is, and where it's going</span>
        <span class="portal-nav-desc">The RFC responses: an overview of NetGL, one page per RFC, the tracks of work and the versions they claim.</span>
      </a>
    </div>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=te,document.body.appendChild(e),document.body.appendChild(r);const c=e.querySelector("#portal-nav-version");c&&je(c,t);const i=a=>{e.setAttribute("aria-hidden",a?"false":"true"),r.setAttribute("aria-expanded",a?"true":"false"),r.setAttribute("aria-label",a?"Close demos menu":"Toggle demos menu"),r.innerHTML=a?te:Ue};r.addEventListener("click",a=>{a.stopPropagation(),i(e.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",a=>{e.getAttribute("aria-hidden")==="true"||a.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||i(!1)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e.getAttribute("aria-hidden")==="false"&&i(!1)})};Ie("iframe");const E=new URLSearchParams(location.search),V=E.get("debug")??"off",J=E.get("compose")==="raw",R=E.get("freeze")==="1",T=E.get("log")==="1",L=(()=>{const t=E.get("predict");if(t===null)return 0;const o=Number(t);return Number.isFinite(o)?o:0})(),Ke=E.get("fxaa")!=="off",re=document.querySelector("#target-iframe");re&&location.search&&(re.src=`target.html${location.search}`);const ue=document.querySelector("#app");if(!ue)throw new Error("Missing #app");const g=document.querySelector("#target-iframe");if(!g)throw new Error("Missing #target-iframe");const s=new be({antialias:!0,stencil:!0});s.outputColorSpace=ve;s.toneMapping=ye;s.setPixelRatio(Math.min(window.devicePixelRatio,2));s.setSize(window.innerWidth,window.innerHeight);s.autoClear=!1;ue.appendChild(s.domElement);const n=new xe(70,window.innerWidth/window.innerHeight,.02,200);n.position.set(0,1.6,5.5);const m=ke(E.get("pose"));m&&n.position.set(m.position[0],m.position[1],m.position[2]);const k=new Se;k.background=new ce("#101826");k.add(new Ae(12176639,2241348,1));const he=new Pe(16777215,.65);he.position.set(3,6,2);k.add(he);const ge=new de(new Ee(18,18),new pe({color:"#1b2a3f",roughness:.95,metalness:.03}));ge.rotation.x=-Math.PI/2;k.add(ge);const Ve=new Le(.9,.9,.9),_e=new pe({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const o=new de(Ve,_e);o.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),k.add(o)}const Qe=new $e(2.6,3.2),C=Me(Qe);C.position.set(0,1.6,-3.5);k.add(C);const F=De({scene:k,anchor:C}),l=ze({iframe:g,debugMode:V,composeRaw:J});l.prewarm(s);const N=g.contentWindow;if(N){const t=Ce({scene:k,anchor:F.getAnchor(),outputTarget:N,inputFilter:N,log:T,fxaa:Ke});g.contentDocument?.readyState==="complete"?t.start():g.addEventListener("load",()=>t.start(),{once:!0})}V!=="off"&&console.log("[host] compositor debug mode:",V);J&&console.log("[host] compose=raw: bypassing stencil + depth-clip");R&&console.log("[host] freeze=1: pose will be captured once and held");L!==1&&console.log("[host] predict =",L,"(frames ahead)");const M=Re(),P=Fe(n,s.domElement);m&&P.setOrientationFromForward(new x(m.forward[0],m.forward[1],m.forward[2]));const Xe=document.querySelector('meta[name="portal:snapshot-proxy"]')?.content??"http://localhost:3030",Ye=document.querySelector('meta[name="portal:snapshot-scene"]')?.content??"pair",fe=t=>{const o=Ge({baseUrl:Xe,scene:Ye,pose:t,width:1200,height:630});document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(e=>{e.content=o})};fe(m);const Ze=t=>{const o=new URL(location.href);return o.searchParams.set("pose",t),o.toString()},$=new x;window.addEventListener("keydown",t=>{if(t.code!=="KeyP"||t.metaKey||t.ctrlKey||t.altKey)return;$.set(0,0,-1).applyQuaternion(n.quaternion);const o={position:[n.position.x,n.position.y,n.position.z],forward:[$.x,$.y,$.z]},e=Te(o),r=new URL(location.href);r.searchParams.set("pose",e),history.replaceState(null,"",r.toString());const c=Ze(e);navigator.clipboard?.writeText(c).catch(()=>{}),fe(o),console.log("[host] permalink:",c)});const Je=()=>{const t=window.innerWidth,o=window.innerHeight;s.setSize(t,o),n.aspect=t/o,n.updateProjectionMatrix()};window.addEventListener("resize",Je);const ae=new We,B=new ce,p=new x,u=new x,h=new x;let ne=0,D=null,O=null,j=null;const b=[0,0,0],v=[0,0,-1],y=[0,1,0],G=[0,0,0],W=[0,0,-1],H=[0,1,0],me=[0,0,0],_=[0,0,-1],Q=[0,1,0],et={position:me,forward:_,up:Q},tt={position:b,forward:v,up:y};let se=!1;const I=new x;let X=!1,q=!1;const ot=t=>{if(!g.contentWindow)return;const o={type:"portal:traverse",pose:t,pressedKeys:P.getKeys(),viewport:{width:window.innerWidth,height:window.innerHeight}};g.contentWindow.postMessage(o,"*")};let z=null,Y=!1;const we=()=>{Y||(Y=!0,z!==null&&(window.clearTimeout(z),z=null),document.body.classList.add("handed-off"),g.classList.add("fullscreen"),g.contentWindow?.focus(),P.clearKeys(),T&&console.log("[host] traversal: applied CSS swap"))},ie=new x;window.addEventListener("message",t=>{if(t.source!==g.contentWindow)return;const o=t.data;if(!o||typeof o!="object")return;if(o.type==="portal:traverse-ack"){we();return}if(o.type!=="portal:traverse")return;const e=o.pose;if(n.position.set(e.position[0],e.position[1],e.position[2]),e.up&&n.up.set(e.up[0],e.up[1],e.up[2]),e.forward&&(ie.set(e.position[0]+e.forward[0],e.position[1]+e.forward[1],e.position[2]+e.forward[2]),n.lookAt(ie)),e.forward){const r=new x(e.forward[0],e.forward[1],e.forward[2]);P.setOrientationFromForward?.(r)}if(n.updateMatrixWorld(!0),s.setRenderTarget(null),s.clear(!0,!0,!0),F.renderAsSource(s,n),l.isReady()&&l.hasFrame()){const r=l.getBackground();B.setRGB(r.r,r.g,r.b),M.update(C,n,B),s.render(M.scene,M.camera),s.clearDepth(),l.renderAsDestination(s)}document.body.classList.remove("handed-off"),g.classList.remove("fullscreen"),window.focus(),P.clearKeys(),Array.isArray(o.pressedKeys)&&P.setKeys(o.pressedKeys),q=!1,X=!1,Y=!1,T&&console.log("[host] reverse traversal: resumed source role at",e)});const K=(t,o,e,r)=>{t[0]=e[0]+(e[0]-o[0])*r,t[1]=e[1]+(e[1]-o[1])*r,t[2]=e[2]+(e[2]-o[2])*r},le=t=>{const o=Math.hypot(t[0],t[1],t[2]);if(o<1e-9){t[0]=0,t[1]=0,t[2]=-1;return}const e=1/o;t[0]*=e,t[1]*=e,t[2]*=e},Z=()=>{const t=ae.getDelta(),o=ae.elapsedTime;if(P.update(t),!q&&l.isReady()){if(!X)I.copy(n.position),X=!0;else{const e=l.getAnchor(),r=F.getAnchor();if(He(I,n.position,C).crossed){n.getWorldPosition(p),u.set(0,0,-1).applyQuaternion(n.quaternion),h.set(0,1,0).applyQuaternion(n.quaternion);const i=ee({position:[p.x,p.y,p.z],forward:[u.x,u.y,u.z],up:[h.x,h.y,h.z]},{source:r,target:e});ot(i),q=!0,T&&console.log("[host] traversal: awaiting iframe ack",i),z!==null&&window.clearTimeout(z),z=window.setTimeout(we,250)}}I.copy(n.position)}if(q){requestAnimationFrame(Z);return}if(l.isReady()){n.getWorldPosition(p),u.set(0,0,-1).applyQuaternion(n.quaternion),h.set(0,1,0).applyQuaternion(n.quaternion),b[0]=p.x,b[1]=p.y,b[2]=p.z,v[0]=u.x,v[1]=u.y,v[2]=u.z,y[0]=h.x,y[1]=h.y,y[2]=h.z;let e;L>0&&se?(K(me,G,b,L),K(_,W,v,L),K(Q,H,y,L),le(_),le(Q),e=et):e=tt,G[0]=b[0],G[1]=b[1],G[2]=b[2],W[0]=v[0],W[1]=v[1],W[2]=v[2],H[0]=y[0],H[1]=y[1],H[2]=y[2],se=!0;const r=F.getAnchor(),c=l.getAnchor(),i=ee(e,{source:r,target:c}),a=Array.from(n.projectionMatrix.elements),S=s.getPixelRatio(),A=Math.max(1,Math.floor(window.innerWidth*S)),f=Math.max(1,Math.floor(window.innerHeight*S));if(R&&!D){D=i,O=a,j={width:A,height:f};const d=w=>`[${w.map(U=>U.toFixed(3)).join(", ")}]`;console.log("[host] freeze captured pose pos:",d(i.position)),console.log("[host] freeze captured pose fwd:",d(i.forward??[0,0,-1])),console.log("[host] freeze captured viewport:",A,"x",f)}if(l.requestFrame({pose:R&&D?D:i,projection:R&&O?O:a,viewport:R&&j?j:{width:A,height:f},time:o}),T&&o-ne>1){ne=o;const d=w=>`[${w.map(U=>U.toFixed(3)).join(", ")}]`;console.log("[host] sourceAnchor:",r),console.log("[host] targetAnchor:",c),console.log("[host] hostPos:",d([p.x,p.y,p.z])),console.log("[host] hostFwd:",d([u.x,u.y,u.z])),console.log("[host] hostUp: ",d([h.x,h.y,h.z])),console.log("[host] coupled pos:",d(i.position)),console.log("[host] coupled fwd:",d(i.forward??[0,0,-1])),console.log("[host] coupled up: ",d(i.up??[0,1,0])),console.log("[host] viewport:",A,"x",f)}}if(s.setRenderTarget(null),s.clear(!0,!0,!0),J)l.hasFrame()&&l.renderAsDestination(s);else{F.renderAsSource(s,n);const e=l.isReady()?l.getBackground():{r:0,g:0,b:0};B.setRGB(e.r,e.g,e.b),M.update(C,n,B),s.render(M.scene,M.camera),s.clearDepth(),l.hasFrame()&&l.renderAsDestination(s)}requestAnimationFrame(Z)};Z();
