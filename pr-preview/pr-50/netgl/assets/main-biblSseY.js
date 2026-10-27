import{V as ne,P as $,M as xe,a as z,b as c,c as x,S as ke,R as Pe,K as P,A as Me,D as Se,d as re,O as Ee,Q as I,C as M,e as Le,f as se,E as Ce,g as q,W as Re,h as Ae,N as Fe,i as ze,H as We,j as Te,k as ie,B as He,m as De,l as Ke}from"./three-helpers-CgLjXy76.js";const j=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],Be=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],F=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],H=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],O=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],k=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},U=e=>{const t=k(e.normal),o=k(e.up),a=k(O(o,t)),s=k(O(t,a));return{right:a,up:s,normal:t}},le=(e,t)=>[H(e,t.right),H(e,t.up),H(e,t.normal)],ce=(e,t)=>j(j(F(t.right,e[0]),F(t.up,e[1])),F(t.normal,e[2])),de=e=>[-e[0],e[1],-e[2]],Y=(e,t,o)=>k(ce(de(le(e,t)),o)),je=(e,t)=>{const o=U(t.source),a=U(t.target),s=Be(e.position,t.source.position),l=le(s,o),n=F(de(l),t.scale??1),r={position:j(t.target.position,ce(n,a))};return e.forward&&(r.forward=Y(e.forward,o,a)),e.up&&(r.up=Y(e.up,o,a)),r};new Le;new c;new se;new se;const Ne=(e=new ne(2,3))=>{const t=new $(e.x,e.y),o=new xe({visible:!1}),a=new z(t,o);return a.name="portal-plane",a.userData.portalSize=e.clone(),a},Ge=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,_e=`
uniform vec3 portalPos;
uniform vec3 portalNormal;
uniform vec3 portalRight;
uniform vec3 portalUp;
uniform float portalHalfW;
uniform float portalHalfH;
uniform vec3 hostCameraPos;
uniform mat4 hostInverseViewProjection;
uniform mat4 hostViewMatrix;
uniform mat4 hostProjectionMatrix;
uniform vec3 destinationBackground;

varying vec2 vUv;

vec3 linearToSRGB(vec3 v) {
  return mix(
    pow(v, vec3(0.41666)) * 1.055 - vec3(0.055),
    v * 12.92,
    vec3(lessThanEqual(v, vec3(0.0031308)))
  );
}

void main() {
  if (dot(hostCameraPos - portalPos, portalNormal) < 0.0) discard;

  vec4 farClipPos = hostInverseViewProjection * vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
  vec3 rayDir = normalize(farClipPos.xyz / farClipPos.w - hostCameraPos);

  float denom = dot(rayDir, portalNormal);
  if (denom > -1e-6) discard;
  float t = dot(portalPos - hostCameraPos, portalNormal) / denom;
  if (t < 0.0) discard;

  vec3 hitPos = hostCameraPos + t * rayDir;
  vec3 hitRel = hitPos - portalPos;
  float lx = dot(hitRel, portalRight);
  float ly = dot(hitRel, portalUp);
  if (abs(lx) > portalHalfW || abs(ly) > portalHalfH) discard;

  vec4 hitClip = hostProjectionMatrix * hostViewMatrix * vec4(hitPos, 1.0);
  gl_FragDepth = (hitClip.z / hitClip.w) * 0.5 + 0.5;

  gl_FragColor = vec4(linearToSRGB(destinationBackground), 1.0);
}
`,Q=1,$e=(e=Q)=>{const t={portalPos:{value:new c},portalNormal:{value:new c},portalRight:{value:new c},portalUp:{value:new c},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new c},hostInverseViewProjection:{value:new x},hostViewMatrix:{value:new x},hostProjectionMatrix:{value:new x},destinationBackground:{value:new c(0,0,0)}},o=new ke({uniforms:t,vertexShader:Ge,fragmentShader:_e,depthTest:!0,depthWrite:!1,side:Se,stencilWrite:!0,stencilFunc:Me,stencilRef:e,stencilFail:P,stencilZFail:P,stencilZPass:Pe,stencilWriteMask:255}),a=new z(new $(2,2),o);a.frustumCulled=!1;const s=new re;s.add(a);const l=new Ee(-1,1,1,-1,0,1),n=new x,r=new c(0,0,1),i=new c(1,0,0),d=new c(0,1,0),h=new I;return{scene:s,camera:l,update:(y,m,b)=>{const f=y.userData.portalSize;t.portalHalfW.value=f?f.x/2:1,t.portalHalfH.value=f?f.y/2:1.5,y.getWorldPosition(t.portalPos.value),y.getWorldQuaternion(h),t.portalNormal.value.copy(r).applyQuaternion(h),t.portalRight.value.copy(i).applyQuaternion(h),t.portalUp.value.copy(d).applyQuaternion(h),m.getWorldPosition(t.hostCameraPos.value),n.multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse),t.hostInverseViewProjection.value.copy(n).invert(),t.hostViewMatrix.value.copy(m.matrixWorldInverse),t.hostProjectionMatrix.value.copy(m.projectionMatrix),t.destinationBackground.value.set(b.r,b.g,b.b)}}},pe=(e,t)=>{e.traverse(o=>{const a=o;if(!a.isMesh||!a.material)return;const s=Array.isArray(a.material)?a.material:[a.material];for(const l of s)t(l)})},Ie=(e,t=Q)=>{pe(e,o=>{o.stencilWrite=!0,o.stencilFunc=Ce,o.stencilRef=t,o.stencilFail=P,o.stencilZFail=P,o.stencilZPass=P,o.stencilWriteMask=0})},Qe=e=>{pe(e,t=>{t.stencilWrite=!1})};new c;const D=new I,S=new c,E=new c,L=new c,Ve=(e,t)=>t||(e.background instanceof M?e.background:new M(0,0,0)),qe=e=>{const{scene:t,anchor:o}=e,a=e.portalNormal??new c(0,0,1),s=e.stencilRef??Q;return{scene:t,anchor:o,getAnchor:()=>{o.getWorldPosition(S),o.getWorldQuaternion(D),E.copy(a).applyQuaternion(D).normalize(),L.set(0,1,0).applyQuaternion(D).normalize();const r=o.userData.portalSize;return{position:[S.x,S.y,S.z],normal:[E.x,E.y,E.z],up:[L.x,L.y,L.z],halfWidth:r?r.x/2:void 0,halfHeight:r?r.y/2:void 0}},getBackground:()=>{const r=Ve(t,e.background);return{r:r.r,g:r.g,b:r.b}},tick:e.tick,renderAsSource(r,i){r.render(t,i)},renderAsDestination(r,i){const d=t.background;t.background=null,Ie(t,s),r.render(t,i),Qe(t),t.background=d}}},Oe=e=>{const t=e.outputOrigin??"*",o=e.inputFilter??null;return{post(a,s){e.output.postMessage(a,t,s??[])},onMessage(a){const s=l=>{if(o!==null&&l.source!==o)return;const n=l.data;!n||typeof n!="object"||a(n)};return window.addEventListener("message",s),()=>window.removeEventListener("message",s)}}},Ue=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],Ye=`
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
`,Xe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',X='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ze=(e,t)=>{const o=e==="three";return t==="three"?o?".":"..":o?`${t}/`:`../${t}/`},Je=e=>{const o=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),a=o.match(/^(.*\/)v\/([^/]+)\/$/);return a?{root:o,siteRoot:a[1],snapshot:a[2]}:{root:o,siteRoot:o,snapshot:null}},et=(e,t)=>{const{siteRoot:o,snapshot:a}=Je(),s=`${t}/`,l=(n,r)=>{e.innerHTML="";const i=[["latest",`latest · ${r}`],...n.map(d=>[d,`v${d} snapshot`])];a&&!n.includes(a)&&i.push([a,`v${a} snapshot`]);for(const[d,h]of i){const g=document.createElement("option");g.value=d,g.textContent=h,g.selected=d===(a??"latest"),e.appendChild(g)}};fetch(`${o}v/versions.json`,{cache:"no-cache"}).then(n=>n.ok?n.json():null).then(n=>{n?.versions&&l(n.versions,n.latest??"main")}).catch(()=>{}),e.addEventListener("change",()=>{const n=e.value,r=n==="latest"?o:`${o}v/${n}/`;location.href=`${r}${s}${location.search}${location.hash}`})},Z=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),tt=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Ye,document.head.appendChild(t);const o=document.createElement("aside");o.id="portal-nav-drawer",o.setAttribute("aria-hidden","false"),o.setAttribute("aria-label","Portal demos"),o.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${Ue.map(n=>`
        <li${n.key===e?' class="portal-nav-current"':""}>
          <a href="${Ze(e,n.key)}"${n.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${Z(n.label)}</span>
            <span class="portal-nav-desc">${Z(n.description)}</span>
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
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const a=document.createElement("button");a.id="portal-nav-toggle",a.type="button",a.setAttribute("aria-label","Close demos menu"),a.setAttribute("aria-expanded","true"),a.setAttribute("aria-controls","portal-nav-drawer"),a.innerHTML=X,document.body.appendChild(o),document.body.appendChild(a);const s=o.querySelector("#portal-nav-version");s&&et(s,e);const l=n=>{o.setAttribute("aria-hidden",n?"false":"true"),a.setAttribute("aria-expanded",n?"true":"false"),a.setAttribute("aria-label",n?"Close demos menu":"Toggle demos menu"),a.innerHTML=n?X:Xe};a.addEventListener("click",n=>{n.stopPropagation(),l(o.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",n=>{o.getAttribute("aria-hidden")==="true"||n.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&o.getAttribute("aria-hidden")==="false"&&l(!1)})},ot=(e,t,o={})=>{const a=o.moveSpeed??4,s=o.lookSensitivity??.0025,l=o.lookKeySpeed??1.5;let n=0,r=0;const i=new Set;at(t,(u,T)=>{n-=u*s,r-=T*s}),window.addEventListener("keydown",u=>i.add(u.code)),window.addEventListener("keyup",u=>i.delete(u.code)),rt(i);const d=new c,h=new c,g=new c,y=u=>{i.has("KeyQ")&&(n+=l*u),i.has("KeyE")&&(n-=l*u),i.has("KeyR")&&(r-=l*u),i.has("KeyF")&&(r+=l*u),r=nt(r),e.quaternion.setFromEuler(new q(r,n,0,"YXZ")),h.set(0,0,-1).applyQuaternion(e.quaternion),g.set(1,0,0).applyQuaternion(e.quaternion),d.set(0,0,0),i.has("KeyW")&&d.add(h),i.has("KeyS")&&d.sub(h),i.has("KeyD")&&d.add(g),i.has("KeyA")&&d.sub(g),d.y=0,d.lengthSq()>0&&(d.normalize().multiplyScalar(a*u),e.position.add(d))},m=new x,b=new I,f=new q(0,0,0,"YXZ"),be=new c(0,0,0),V=new c,ye=new c(0,1,0);return{update:y,setOrientationFromForward:u=>{V.copy(u).normalize(),m.lookAt(be,V,ye),b.setFromRotationMatrix(m),f.setFromQuaternion(b,"YXZ"),r=f.x,n=f.y},clearKeys:()=>{i.clear()},getKeys:()=>Array.from(i),setKeys:u=>{i.clear();for(const T of u)i.add(T)}}},at=(e,t)=>{let o=null,a=0,s=0;e.addEventListener("pointerdown",n=>{if(o===null&&(o=n.pointerId,a=n.clientX,s=n.clientY,n.pointerType!=="mouse"))try{e.setPointerCapture(n.pointerId)}catch{}});const l=n=>{n.pointerId===o&&(o=null)};window.addEventListener("pointerup",l),window.addEventListener("pointercancel",l),window.addEventListener("pointermove",n=>{if(n.pointerId!==o)return;const r=n.clientX-a,i=n.clientY-s;a=n.clientX,s=n.clientY,t(r,i)})},nt=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),rt=e=>{if(typeof window>"u")return;const t="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,o=()=>t||window.innerWidth<500;if(o()){J(e);return}const a=()=>{o()&&(window.removeEventListener("resize",a),J(e))};window.addEventListener("resize",a)},J=e=>{const t=document.createElement("div");t.className="wasd-pad",t.setAttribute("aria-label","Movement and look controls"),t.innerHTML=`
    <button type="button" data-key="KeyQ" class="wasd-btn wasd-yaw-left" aria-label="Yaw left">↶</button>
    <button type="button" data-key="KeyW" class="wasd-btn wasd-forward" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyE" class="wasd-btn wasd-yaw-right" aria-label="Yaw right">↷</button>
    <button type="button" data-key="KeyR" class="wasd-btn wasd-pitch-down" aria-label="Pitch down">⇣</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-back" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
    <button type="button" data-key="KeyF" class="wasd-btn wasd-pitch-up" aria-label="Pitch up">⇡</button>
  `;const o=document.createElement("style");o.textContent=`
    .wasd-pad {
      position: fixed;
      left: 16px;
      bottom: 16px;
      width: min(360px, calc(100vw - 32px));
      height: 168px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 6px;
      z-index: 10;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    .wasd-btn {
      font: 600 22px Inter, system-ui, sans-serif;
      line-height: 1;
      color: #d8e7ff;
      background: rgba(4, 9, 18, 0.55);
      border: 1px solid rgba(216, 231, 255, 0.25);
      border-radius: 12px;
      padding: 0;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }
    .wasd-btn.is-active {
      background: rgba(93, 169, 255, 0.45);
      border-color: rgba(216, 231, 255, 0.6);
    }
    .wasd-yaw-left   { grid-column: 1; grid-row: 1; }
    .wasd-forward    { grid-column: 2; grid-row: 1; }
    .wasd-yaw-right  { grid-column: 3; grid-row: 1; }
    .wasd-pitch-down { grid-column: 4; grid-row: 1; }
    .wasd-left       { grid-column: 1; grid-row: 2; }
    .wasd-back       { grid-column: 2; grid-row: 2; }
    .wasd-right      { grid-column: 3; grid-row: 2; }
    .wasd-pitch-up   { grid-column: 4; grid-row: 2; }
  `,document.head.appendChild(o),document.body.appendChild(t);for(const a of t.querySelectorAll(".wasd-btn")){const s=a.dataset.key,l=r=>{r.preventDefault(),r.stopPropagation(),e.add(s),a.classList.add("is-active");try{a.setPointerCapture(r.pointerId)}catch{}},n=r=>{r.stopPropagation(),e.delete(s),a.classList.remove("is-active")};a.addEventListener("pointerdown",l),a.addEventListener("pointerup",n),a.addEventListener("pointercancel",n),a.addEventListener("pointerleave",n),a.addEventListener("contextmenu",r=>r.preventDefault())}},st=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",it=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end";tt("netgl");const ue=document.querySelector("#app");if(!ue)throw new Error("Missing #app");const N=document.querySelector("#target-iframe");if(!N)throw new Error("Missing #target-iframe");const p=new Re({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});p.outputColorSpace=Ae;p.toneMapping=Fe;p.setPixelRatio(Math.min(window.devicePixelRatio,2));p.setSize(window.innerWidth,window.innerHeight);p.autoClear=!1;ue.appendChild(p.domElement);const w=new ze(70,window.innerWidth/window.innerHeight,.02,200);w.position.set(0,1.6,5.5);const v=new re;v.background=new M("#101826");v.add(new We(12176639,2241348,1));const he=new Te(16777215,.65);he.position.set(3,6,2);v.add(he);const we=new z(new $(18,18),new ie({color:"#1b2a3f",roughness:.95,metalness:.03}));we.rotation.x=-Math.PI/2;v.add(we);const lt=new He(.9,.9,.9),ct=new ie({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new z(lt,ct);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),v.add(t)}const dt=new ne(2.6,3.2),W=Ne(dt);W.position.set(0,1.6,-3.5);v.add(W);const ee=qe({scene:v,anchor:W}),K=$e(),pt=p.getContext(),ut=De(pt);let ge=!1,G=null;const me=new M("#220d17"),fe=Oe({output:N.contentWindow,inputFilter:N.contentWindow});let B=[],_=null,te=null;fe.onMessage(e=>{if(it(e)){_=B,B=[];return}if(st(e)){B.push(e);return}const t=e;t&&t.type==="netgl:ready"&&(G=t.anchor,me.setRGB(t.background.r,t.background.g,t.background.b),ge=!0)});const ht=ot(w,p.domElement),wt=()=>{const e=window.innerWidth,t=window.innerHeight;p.setSize(e,t),w.aspect=e/t,w.updateProjectionMatrix()};window.addEventListener("resize",wt);const oe=new Ke,ae=new M,C=new c,R=new c,A=new c,ve=()=>{const e=oe.getDelta(),t=oe.elapsedTime;if(ht.update(e),p.resetState(),p.setRenderTarget(null),p.clear(!0,!0,!0),ee.renderAsSource(p,w),ge&&G){ae.copy(me),K.update(W,w,ae),p.render(K.scene,K.camera),p.clearDepth();let o=_;if(o?(_=null,te=o):o=te,o){for(let i=0;i<o.length;i+=1)ut(o[i]);p.resetState()}w.getWorldPosition(C),R.set(0,0,-1).applyQuaternion(w.quaternion),A.set(0,1,0).applyQuaternion(w.quaternion);const a=je({position:[C.x,C.y,C.z],forward:[R.x,R.y,R.z],up:[A.x,A.y,A.z]},{source:ee.getAnchor(),target:G}),s=Array.from(w.projectionMatrix.elements),l=p.getPixelRatio(),n=Math.max(1,Math.floor(window.innerWidth*l)),r=Math.max(1,Math.floor(window.innerHeight*l));fe.post({type:"netgl:setPose",pose:a,projection:s,viewport:{width:n,height:r},time:t})}requestAnimationFrame(ve)};ve();
