import{V as ae,P as N,M as xe,a as z,b as c,c as x,S as ke,R as Pe,K as P,A as Me,D as Se,d as re,O as Ee,Q as I,C as M,e as Le,f as ie,E as Ce,g as q,W as Re,h as Ae,N as We,i as ze,H as Fe,j as Te,k as se,B as He,m as $e,l as Be}from"./three-helpers-CgLjXy76.js";const K=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],De=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],W=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],H=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],O=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],k=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},U=e=>{const t=k(e.normal),o=k(e.up),n=k(O(o,t)),i=k(O(t,n));return{right:n,up:i,normal:t}},le=(e,t)=>[H(e,t.right),H(e,t.up),H(e,t.normal)],ce=(e,t)=>K(K(W(t.right,e[0]),W(t.up,e[1])),W(t.normal,e[2])),de=e=>[-e[0],e[1],-e[2]],X=(e,t,o)=>k(ce(de(le(e,t)),o)),Ke=(e,t)=>{const o=U(t.source),n=U(t.target),i=De(e.position,t.source.position),l=le(i,o),r=W(de(l),t.scale??1),a={position:K(t.target.position,ce(r,n))};return e.forward&&(a.forward=X(e.forward,o,n)),e.up&&(a.up=X(e.up,o,n)),a};new Le;new c;new ie;new ie;const Ge=(e=new ae(2,3))=>{const t=new N(e.x,e.y),o=new xe({visible:!1}),n=new z(t,o);return n.name="portal-plane",n.userData.portalSize=e.clone(),n},_e=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,je=`
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
`,V=1,Ne=(e=V)=>{const t={portalPos:{value:new c},portalNormal:{value:new c},portalRight:{value:new c},portalUp:{value:new c},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new c},hostInverseViewProjection:{value:new x},hostViewMatrix:{value:new x},hostProjectionMatrix:{value:new x},destinationBackground:{value:new c(0,0,0)}},o=new ke({uniforms:t,vertexShader:_e,fragmentShader:je,depthTest:!0,depthWrite:!1,side:Se,stencilWrite:!0,stencilFunc:Me,stencilRef:e,stencilFail:P,stencilZFail:P,stencilZPass:Pe,stencilWriteMask:255}),n=new z(new N(2,2),o);n.frustumCulled=!1;const i=new re;i.add(n);const l=new Ee(-1,1,1,-1,0,1),r=new x,a=new c(0,0,1),s=new c(1,0,0),d=new c(0,1,0),u=new I;return{scene:i,camera:l,update:(w,m,y)=>{const v=w.userData.portalSize;t.portalHalfW.value=v?v.x/2:1,t.portalHalfH.value=v?v.y/2:1.5,w.getWorldPosition(t.portalPos.value),w.getWorldQuaternion(u),t.portalNormal.value.copy(a).applyQuaternion(u),t.portalRight.value.copy(s).applyQuaternion(u),t.portalUp.value.copy(d).applyQuaternion(u),m.getWorldPosition(t.hostCameraPos.value),r.multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse),t.hostInverseViewProjection.value.copy(r).invert(),t.hostViewMatrix.value.copy(m.matrixWorldInverse),t.hostProjectionMatrix.value.copy(m.projectionMatrix),t.destinationBackground.value.set(y.r,y.g,y.b)}}},pe=(e,t)=>{e.traverse(o=>{const n=o;if(!n.isMesh||!n.material)return;const i=Array.isArray(n.material)?n.material:[n.material];for(const l of i)t(l)})},Ie=(e,t=V)=>{pe(e,o=>{o.stencilWrite=!0,o.stencilFunc=Ce,o.stencilRef=t,o.stencilFail=P,o.stencilZFail=P,o.stencilZPass=P,o.stencilWriteMask=0})},Ve=e=>{pe(e,t=>{t.stencilWrite=!1})};new c;const $=new I,S=new c,E=new c,L=new c,Qe=(e,t)=>t||(e.background instanceof M?e.background:new M(0,0,0)),qe=e=>{const{scene:t,anchor:o}=e,n=e.portalNormal??new c(0,0,1),i=e.stencilRef??V;return{scene:t,anchor:o,getAnchor:()=>{o.getWorldPosition(S),o.getWorldQuaternion($),E.copy(n).applyQuaternion($).normalize(),L.set(0,1,0).applyQuaternion($).normalize();const a=o.userData.portalSize;return{position:[S.x,S.y,S.z],normal:[E.x,E.y,E.z],up:[L.x,L.y,L.z],halfWidth:a?a.x/2:void 0,halfHeight:a?a.y/2:void 0}},getBackground:()=>{const a=Qe(t,e.background);return{r:a.r,g:a.g,b:a.b}},tick:e.tick,renderAsSource(a,s){a.render(t,s)},renderAsDestination(a,s){const d=t.background;t.background=null,Ie(t,i),a.render(t,s),Ve(t),t.background=d}}},Oe=e=>{const t=e.outputOrigin??"*",o=e.inputFilter??null;return{post(n,i){e.output.postMessage(n,t,i??[])},onMessage(n){const i=l=>{if(o!==null&&l.source!==o)return;const r=l.data;!r||typeof r!="object"||n(r)};return window.addEventListener("message",i),()=>window.removeEventListener("message",i)}}},Ue=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],Xe=`
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
`,Ye='<svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',Ze='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Y='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Je=(e,t)=>{const o=e==="three";return t==="three"?o?".":"..":o?`${t}/`:`../${t}/`},et=e=>{const o=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),n=o.match(/^(.*\/)v\/([^/]+)\/$/);return n?{root:o,siteRoot:n[1],snapshot:n[2]}:{root:o,siteRoot:o,snapshot:null}},tt=(e,t)=>{const{siteRoot:o,snapshot:n}=et(),i=`${t}/`;let l={};const r=(a,s)=>{e.innerHTML="";const d=[["latest",`latest · ${s}`],...a.map(u=>{const g=l[u]??{};return[u,`v${u}${g.date?` · ${g.date}`:""}${g.label?` · ${g.label}`:""}`]})];n&&!a.includes(n)&&d.push([n,`v${n} snapshot`]);for(const[u,g]of d){const w=document.createElement("option");w.value=u,w.textContent=g,w.selected=u===(n??"latest"),e.appendChild(w)}};fetch(`${o}v/versions.json`,{cache:"no-cache"}).then(a=>a.ok?a.json():null).then(a=>{a?.versions&&(l=a.meta??{},r(a.versions,a.latest??"main"))}).catch(()=>{}),e.addEventListener("change",()=>{const a=e.value,s=a==="latest"?o:`${o}v/${a}/`,d=a==="latest"||!l[a]?.demos||l[a].demos.includes(t);location.href=d?`${s}${i}${location.search}${location.hash}`:s})},Z=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ot=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Xe,document.head.appendChild(t);const o=document.createElement("aside");o.id="portal-nav-drawer",o.setAttribute("aria-hidden","false"),o.setAttribute("aria-label","Portal demos"),o.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <p class="portal-nav-intro">Portal links independent 3D web renderers at the GL layer: a guest's WebGL2 calls replay into the host's context, so engines compose without rewriting either. What it is, and where it's going: <a href="../rfcs/" target="_blank" rel="noopener">the RFC responses${Ye}</a></p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${Ue.map(r=>`
        <li${r.key===e?' class="portal-nav-current"':""}>
          <a href="${Je(e,r.key)}"${r.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${Z(r.label)}</span>
            <span class="portal-nav-desc">${Z(r.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const n=document.createElement("button");n.id="portal-nav-toggle",n.type="button",n.setAttribute("aria-label","Close demos menu"),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-controls","portal-nav-drawer"),n.innerHTML=Y,document.body.appendChild(o),document.body.appendChild(n);const i=o.querySelector("#portal-nav-version");i&&tt(i,e);const l=r=>{o.setAttribute("aria-hidden",r?"false":"true"),n.setAttribute("aria-expanded",r?"true":"false"),n.setAttribute("aria-label",r?"Close demos menu":"Toggle demos menu"),n.innerHTML=r?Y:Ze};n.addEventListener("click",r=>{r.stopPropagation(),l(o.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",r=>{o.getAttribute("aria-hidden")==="true"||r.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&o.getAttribute("aria-hidden")==="false"&&l(!1)})},nt=(e,t,o={})=>{const n=o.moveSpeed??4,i=o.lookSensitivity??.0025,l=o.lookKeySpeed??1.5;let r=0,a=0;const s=new Set;at(t,(h,T)=>{r-=h*i,a-=T*i}),window.addEventListener("keydown",h=>s.add(h.code)),window.addEventListener("keyup",h=>s.delete(h.code)),it(s);const d=new c,u=new c,g=new c,w=h=>{s.has("KeyQ")&&(r+=l*h),s.has("KeyE")&&(r-=l*h),s.has("KeyR")&&(a-=l*h),s.has("KeyF")&&(a+=l*h),a=rt(a),e.quaternion.setFromEuler(new q(a,r,0,"YXZ")),u.set(0,0,-1).applyQuaternion(e.quaternion),g.set(1,0,0).applyQuaternion(e.quaternion),d.set(0,0,0),s.has("KeyW")&&d.add(u),s.has("KeyS")&&d.sub(u),s.has("KeyD")&&d.add(g),s.has("KeyA")&&d.sub(g),d.y=0,d.lengthSq()>0&&(d.normalize().multiplyScalar(n*h),e.position.add(d))},m=new x,y=new I,v=new q(0,0,0,"YXZ"),be=new c(0,0,0),Q=new c,ye=new c(0,1,0);return{update:w,setOrientationFromForward:h=>{Q.copy(h).normalize(),m.lookAt(be,Q,ye),y.setFromRotationMatrix(m),v.setFromQuaternion(y,"YXZ"),a=v.x,r=v.y},clearKeys:()=>{s.clear()},getKeys:()=>Array.from(s),setKeys:h=>{s.clear();for(const T of h)s.add(T)}}},at=(e,t)=>{let o=null,n=0,i=0;e.addEventListener("pointerdown",r=>{if(o===null&&(o=r.pointerId,n=r.clientX,i=r.clientY,r.pointerType!=="mouse"))try{e.setPointerCapture(r.pointerId)}catch{}});const l=r=>{r.pointerId===o&&(o=null)};window.addEventListener("pointerup",l),window.addEventListener("pointercancel",l),window.addEventListener("pointermove",r=>{if(r.pointerId!==o)return;const a=r.clientX-n,s=r.clientY-i;n=r.clientX,i=r.clientY,t(a,s)})},rt=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),it=e=>{if(typeof window>"u")return;const t="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,o=()=>t||window.innerWidth<500;if(o()){J(e);return}const n=()=>{o()&&(window.removeEventListener("resize",n),J(e))};window.addEventListener("resize",n)},J=e=>{const t=document.createElement("div");t.className="wasd-pad",t.setAttribute("aria-label","Movement and look controls"),t.innerHTML=`
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
  `,document.head.appendChild(o),document.body.appendChild(t);for(const n of t.querySelectorAll(".wasd-btn")){const i=n.dataset.key,l=a=>{a.preventDefault(),a.stopPropagation(),e.add(i),n.classList.add("is-active");try{n.setPointerCapture(a.pointerId)}catch{}},r=a=>{a.stopPropagation(),e.delete(i),n.classList.remove("is-active")};n.addEventListener("pointerdown",l),n.addEventListener("pointerup",r),n.addEventListener("pointercancel",r),n.addEventListener("pointerleave",r),n.addEventListener("contextmenu",a=>a.preventDefault())}},st=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",lt=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end";ot("netgl");const ue=document.querySelector("#app");if(!ue)throw new Error("Missing #app");const G=document.querySelector("#target-iframe");if(!G)throw new Error("Missing #target-iframe");const p=new Re({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});p.outputColorSpace=Ae;p.toneMapping=We;p.setPixelRatio(Math.min(window.devicePixelRatio,2));p.setSize(window.innerWidth,window.innerHeight);p.autoClear=!1;ue.appendChild(p.domElement);const f=new ze(70,window.innerWidth/window.innerHeight,.02,200);f.position.set(0,1.6,5.5);const b=new re;b.background=new M("#101826");b.add(new Fe(12176639,2241348,1));const he=new Te(16777215,.65);he.position.set(3,6,2);b.add(he);const ge=new z(new N(18,18),new se({color:"#1b2a3f",roughness:.95,metalness:.03}));ge.rotation.x=-Math.PI/2;b.add(ge);const ct=new He(.9,.9,.9),dt=new se({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new z(ct,dt);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),b.add(t)}const pt=new ae(2.6,3.2),F=Ge(pt);F.position.set(0,1.6,-3.5);b.add(F);const ee=qe({scene:b,anchor:F}),B=Ne(),ut=p.getContext(),ht=$e(ut);let we=!1,_=null;const fe=new M("#220d17"),me=Oe({output:G.contentWindow,inputFilter:G.contentWindow});let D=[],j=null,te=null;me.onMessage(e=>{if(lt(e)){j=D,D=[];return}if(st(e)){D.push(e);return}const t=e;t&&t.type==="netgl:ready"&&(_=t.anchor,fe.setRGB(t.background.r,t.background.g,t.background.b),we=!0)});const gt=nt(f,p.domElement),wt=()=>{const e=window.innerWidth,t=window.innerHeight;p.setSize(e,t),f.aspect=e/t,f.updateProjectionMatrix()};window.addEventListener("resize",wt);const oe=new Be,ne=new M,C=new c,R=new c,A=new c,ve=()=>{const e=oe.getDelta(),t=oe.elapsedTime;if(gt.update(e),p.resetState(),p.setRenderTarget(null),p.clear(!0,!0,!0),ee.renderAsSource(p,f),we&&_){ne.copy(fe),B.update(F,f,ne),p.render(B.scene,B.camera),p.clearDepth();let o=j;if(o?(j=null,te=o):o=te,o){for(let s=0;s<o.length;s+=1)ht(o[s]);p.resetState()}f.getWorldPosition(C),R.set(0,0,-1).applyQuaternion(f.quaternion),A.set(0,1,0).applyQuaternion(f.quaternion);const n=Ke({position:[C.x,C.y,C.z],forward:[R.x,R.y,R.z],up:[A.x,A.y,A.z]},{source:ee.getAnchor(),target:_}),i=Array.from(f.projectionMatrix.elements),l=p.getPixelRatio(),r=Math.max(1,Math.floor(window.innerWidth*l)),a=Math.max(1,Math.floor(window.innerHeight*l));me.post({type:"netgl:setPose",pose:n,projection:i,viewport:{width:r,height:a},time:t})}requestAnimationFrame(ve)};ve();
