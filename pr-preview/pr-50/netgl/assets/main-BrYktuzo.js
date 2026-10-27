import{V as ae,P as $,M as xe,a as z,b as c,c as x,S as ke,R as Pe,K as P,A as Me,D as Se,d as re,O as Ee,Q as I,C as M,e as Le,f as ie,E as Ce,g as q,W as Re,h as Ae,N as We,i as ze,H as Fe,j as Te,k as se,B as He,m as Be,l as De}from"./three-helpers-CgLjXy76.js";const j=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],Ke=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],W=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],H=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],O=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],k=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},U=e=>{const t=k(e.normal),o=k(e.up),n=k(O(o,t)),i=k(O(t,n));return{right:n,up:i,normal:t}},le=(e,t)=>[H(e,t.right),H(e,t.up),H(e,t.normal)],ce=(e,t)=>j(j(W(t.right,e[0]),W(t.up,e[1])),W(t.normal,e[2])),de=e=>[-e[0],e[1],-e[2]],X=(e,t,o)=>k(ce(de(le(e,t)),o)),je=(e,t)=>{const o=U(t.source),n=U(t.target),i=Ke(e.position,t.source.position),l=le(i,o),a=W(de(l),t.scale??1),r={position:j(t.target.position,ce(a,n))};return e.forward&&(r.forward=X(e.forward,o,n)),e.up&&(r.up=X(e.up,o,n)),r};new Le;new c;new ie;new ie;const Ge=(e=new ae(2,3))=>{const t=new $(e.x,e.y),o=new xe({visible:!1}),n=new z(t,o);return n.name="portal-plane",n.userData.portalSize=e.clone(),n},_e=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Ne=`
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
`,V=1,$e=(e=V)=>{const t={portalPos:{value:new c},portalNormal:{value:new c},portalRight:{value:new c},portalUp:{value:new c},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new c},hostInverseViewProjection:{value:new x},hostViewMatrix:{value:new x},hostProjectionMatrix:{value:new x},destinationBackground:{value:new c(0,0,0)}},o=new ke({uniforms:t,vertexShader:_e,fragmentShader:Ne,depthTest:!0,depthWrite:!1,side:Se,stencilWrite:!0,stencilFunc:Me,stencilRef:e,stencilFail:P,stencilZFail:P,stencilZPass:Pe,stencilWriteMask:255}),n=new z(new $(2,2),o);n.frustumCulled=!1;const i=new re;i.add(n);const l=new Ee(-1,1,1,-1,0,1),a=new x,r=new c(0,0,1),s=new c(1,0,0),d=new c(0,1,0),h=new I;return{scene:i,camera:l,update:(y,f,b)=>{const m=y.userData.portalSize;t.portalHalfW.value=m?m.x/2:1,t.portalHalfH.value=m?m.y/2:1.5,y.getWorldPosition(t.portalPos.value),y.getWorldQuaternion(h),t.portalNormal.value.copy(r).applyQuaternion(h),t.portalRight.value.copy(s).applyQuaternion(h),t.portalUp.value.copy(d).applyQuaternion(h),f.getWorldPosition(t.hostCameraPos.value),a.multiplyMatrices(f.projectionMatrix,f.matrixWorldInverse),t.hostInverseViewProjection.value.copy(a).invert(),t.hostViewMatrix.value.copy(f.matrixWorldInverse),t.hostProjectionMatrix.value.copy(f.projectionMatrix),t.destinationBackground.value.set(b.r,b.g,b.b)}}},pe=(e,t)=>{e.traverse(o=>{const n=o;if(!n.isMesh||!n.material)return;const i=Array.isArray(n.material)?n.material:[n.material];for(const l of i)t(l)})},Ie=(e,t=V)=>{pe(e,o=>{o.stencilWrite=!0,o.stencilFunc=Ce,o.stencilRef=t,o.stencilFail=P,o.stencilZFail=P,o.stencilZPass=P,o.stencilWriteMask=0})},Ve=e=>{pe(e,t=>{t.stencilWrite=!1})};new c;const B=new I,S=new c,E=new c,L=new c,Qe=(e,t)=>t||(e.background instanceof M?e.background:new M(0,0,0)),qe=e=>{const{scene:t,anchor:o}=e,n=e.portalNormal??new c(0,0,1),i=e.stencilRef??V;return{scene:t,anchor:o,getAnchor:()=>{o.getWorldPosition(S),o.getWorldQuaternion(B),E.copy(n).applyQuaternion(B).normalize(),L.set(0,1,0).applyQuaternion(B).normalize();const r=o.userData.portalSize;return{position:[S.x,S.y,S.z],normal:[E.x,E.y,E.z],up:[L.x,L.y,L.z],halfWidth:r?r.x/2:void 0,halfHeight:r?r.y/2:void 0}},getBackground:()=>{const r=Qe(t,e.background);return{r:r.r,g:r.g,b:r.b}},tick:e.tick,renderAsSource(r,s){r.render(t,s)},renderAsDestination(r,s){const d=t.background;t.background=null,Ie(t,i),r.render(t,s),Ve(t),t.background=d}}},Oe=e=>{const t=e.outputOrigin??"*",o=e.inputFilter??null;return{post(n,i){e.output.postMessage(n,t,i??[])},onMessage(n){const i=l=>{if(o!==null&&l.source!==o)return;const a=l.data;!a||typeof a!="object"||n(a)};return window.addEventListener("message",i),()=>window.removeEventListener("message",i)}}},Ue=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],Xe=`
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
`,Ye='<svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',Ze='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Y='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Je=(e,t)=>{const o=e==="three";return t==="three"?o?".":"..":o?`${t}/`:`../${t}/`},et=e=>{const o=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),n=o.match(/^(.*\/)v\/([^/]+)\/$/);return n?{root:o,siteRoot:n[1],snapshot:n[2]}:{root:o,siteRoot:o,snapshot:null}},tt=(e,t)=>{const{siteRoot:o,snapshot:n}=et(),i=`${t}/`,l=(a,r)=>{e.innerHTML="";const s=[["latest",`latest · ${r}`],...a.map(d=>[d,`v${d} snapshot`])];n&&!a.includes(n)&&s.push([n,`v${n} snapshot`]);for(const[d,h]of s){const w=document.createElement("option");w.value=d,w.textContent=h,w.selected=d===(n??"latest"),e.appendChild(w)}};fetch(`${o}v/versions.json`,{cache:"no-cache"}).then(a=>a.ok?a.json():null).then(a=>{a?.versions&&l(a.versions,a.latest??"main")}).catch(()=>{}),e.addEventListener("change",()=>{const a=e.value,r=a==="latest"?o:`${o}v/${a}/`;location.href=`${r}${i}${location.search}${location.hash}`})},Z=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ot=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Xe,document.head.appendChild(t);const o=document.createElement("aside");o.id="portal-nav-drawer",o.setAttribute("aria-hidden","false"),o.setAttribute("aria-label","Portal demos"),o.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <p class="portal-nav-intro">Portal links independent 3D web renderers at the GL layer: a guest's WebGL2 calls replay into the host's context, so engines compose without rewriting either. What it is, and where it's going: <a href="../rfcs/" target="_blank" rel="noopener">the RFC responses${Ye}</a></p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${Ue.map(a=>`
        <li${a.key===e?' class="portal-nav-current"':""}>
          <a href="${Je(e,a.key)}"${a.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${Z(a.label)}</span>
            <span class="portal-nav-desc">${Z(a.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const n=document.createElement("button");n.id="portal-nav-toggle",n.type="button",n.setAttribute("aria-label","Close demos menu"),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-controls","portal-nav-drawer"),n.innerHTML=Y,document.body.appendChild(o),document.body.appendChild(n);const i=o.querySelector("#portal-nav-version");i&&tt(i,e);const l=a=>{o.setAttribute("aria-hidden",a?"false":"true"),n.setAttribute("aria-expanded",a?"true":"false"),n.setAttribute("aria-label",a?"Close demos menu":"Toggle demos menu"),n.innerHTML=a?Y:Ze};n.addEventListener("click",a=>{a.stopPropagation(),l(o.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",a=>{o.getAttribute("aria-hidden")==="true"||a.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&o.getAttribute("aria-hidden")==="false"&&l(!1)})},nt=(e,t,o={})=>{const n=o.moveSpeed??4,i=o.lookSensitivity??.0025,l=o.lookKeySpeed??1.5;let a=0,r=0;const s=new Set;at(t,(u,T)=>{a-=u*i,r-=T*i}),window.addEventListener("keydown",u=>s.add(u.code)),window.addEventListener("keyup",u=>s.delete(u.code)),it(s);const d=new c,h=new c,w=new c,y=u=>{s.has("KeyQ")&&(a+=l*u),s.has("KeyE")&&(a-=l*u),s.has("KeyR")&&(r-=l*u),s.has("KeyF")&&(r+=l*u),r=rt(r),e.quaternion.setFromEuler(new q(r,a,0,"YXZ")),h.set(0,0,-1).applyQuaternion(e.quaternion),w.set(1,0,0).applyQuaternion(e.quaternion),d.set(0,0,0),s.has("KeyW")&&d.add(h),s.has("KeyS")&&d.sub(h),s.has("KeyD")&&d.add(w),s.has("KeyA")&&d.sub(w),d.y=0,d.lengthSq()>0&&(d.normalize().multiplyScalar(n*u),e.position.add(d))},f=new x,b=new I,m=new q(0,0,0,"YXZ"),be=new c(0,0,0),Q=new c,ye=new c(0,1,0);return{update:y,setOrientationFromForward:u=>{Q.copy(u).normalize(),f.lookAt(be,Q,ye),b.setFromRotationMatrix(f),m.setFromQuaternion(b,"YXZ"),r=m.x,a=m.y},clearKeys:()=>{s.clear()},getKeys:()=>Array.from(s),setKeys:u=>{s.clear();for(const T of u)s.add(T)}}},at=(e,t)=>{let o=null,n=0,i=0;e.addEventListener("pointerdown",a=>{if(o===null&&(o=a.pointerId,n=a.clientX,i=a.clientY,a.pointerType!=="mouse"))try{e.setPointerCapture(a.pointerId)}catch{}});const l=a=>{a.pointerId===o&&(o=null)};window.addEventListener("pointerup",l),window.addEventListener("pointercancel",l),window.addEventListener("pointermove",a=>{if(a.pointerId!==o)return;const r=a.clientX-n,s=a.clientY-i;n=a.clientX,i=a.clientY,t(r,s)})},rt=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),it=e=>{if(typeof window>"u")return;const t="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,o=()=>t||window.innerWidth<500;if(o()){J(e);return}const n=()=>{o()&&(window.removeEventListener("resize",n),J(e))};window.addEventListener("resize",n)},J=e=>{const t=document.createElement("div");t.className="wasd-pad",t.setAttribute("aria-label","Movement and look controls"),t.innerHTML=`
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
  `,document.head.appendChild(o),document.body.appendChild(t);for(const n of t.querySelectorAll(".wasd-btn")){const i=n.dataset.key,l=r=>{r.preventDefault(),r.stopPropagation(),e.add(i),n.classList.add("is-active");try{n.setPointerCapture(r.pointerId)}catch{}},a=r=>{r.stopPropagation(),e.delete(i),n.classList.remove("is-active")};n.addEventListener("pointerdown",l),n.addEventListener("pointerup",a),n.addEventListener("pointercancel",a),n.addEventListener("pointerleave",a),n.addEventListener("contextmenu",r=>r.preventDefault())}},st=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",lt=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end";ot("netgl");const ue=document.querySelector("#app");if(!ue)throw new Error("Missing #app");const G=document.querySelector("#target-iframe");if(!G)throw new Error("Missing #target-iframe");const p=new Re({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});p.outputColorSpace=Ae;p.toneMapping=We;p.setPixelRatio(Math.min(window.devicePixelRatio,2));p.setSize(window.innerWidth,window.innerHeight);p.autoClear=!1;ue.appendChild(p.domElement);const g=new ze(70,window.innerWidth/window.innerHeight,.02,200);g.position.set(0,1.6,5.5);const v=new re;v.background=new M("#101826");v.add(new Fe(12176639,2241348,1));const he=new Te(16777215,.65);he.position.set(3,6,2);v.add(he);const ge=new z(new $(18,18),new se({color:"#1b2a3f",roughness:.95,metalness:.03}));ge.rotation.x=-Math.PI/2;v.add(ge);const ct=new He(.9,.9,.9),dt=new se({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new z(ct,dt);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),v.add(t)}const pt=new ae(2.6,3.2),F=Ge(pt);F.position.set(0,1.6,-3.5);v.add(F);const ee=qe({scene:v,anchor:F}),D=$e(),ut=p.getContext(),ht=Be(ut);let we=!1,_=null;const fe=new M("#220d17"),me=Oe({output:G.contentWindow,inputFilter:G.contentWindow});let K=[],N=null,te=null;me.onMessage(e=>{if(lt(e)){N=K,K=[];return}if(st(e)){K.push(e);return}const t=e;t&&t.type==="netgl:ready"&&(_=t.anchor,fe.setRGB(t.background.r,t.background.g,t.background.b),we=!0)});const gt=nt(g,p.domElement),wt=()=>{const e=window.innerWidth,t=window.innerHeight;p.setSize(e,t),g.aspect=e/t,g.updateProjectionMatrix()};window.addEventListener("resize",wt);const oe=new De,ne=new M,C=new c,R=new c,A=new c,ve=()=>{const e=oe.getDelta(),t=oe.elapsedTime;if(gt.update(e),p.resetState(),p.setRenderTarget(null),p.clear(!0,!0,!0),ee.renderAsSource(p,g),we&&_){ne.copy(fe),D.update(F,g,ne),p.render(D.scene,D.camera),p.clearDepth();let o=N;if(o?(N=null,te=o):o=te,o){for(let s=0;s<o.length;s+=1)ht(o[s]);p.resetState()}g.getWorldPosition(C),R.set(0,0,-1).applyQuaternion(g.quaternion),A.set(0,1,0).applyQuaternion(g.quaternion);const n=je({position:[C.x,C.y,C.z],forward:[R.x,R.y,R.z],up:[A.x,A.y,A.z]},{source:ee.getAnchor(),target:_}),i=Array.from(g.projectionMatrix.elements),l=p.getPixelRatio(),a=Math.max(1,Math.floor(window.innerWidth*l)),r=Math.max(1,Math.floor(window.innerHeight*l));me.post({type:"netgl:setPose",pose:n,projection:i,viewport:{width:a,height:r},time:t})}requestAnimationFrame(ve)};ve();
