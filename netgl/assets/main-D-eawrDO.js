import{V as Pe,P as de,M as Ke,a as U,b,c as R,S as je,R as $e,K as B,A as Ue,D as qe,d as Ae,O as Qe,Q as pe,C as G,e as Ye,f as Ce,E as Xe,g as fe,W as Ze,h as Je,N as et,i as tt,H as nt,j as rt,k as Re,B as at,l as ot}from"./three-helpers-WAzysoi4.js";const se=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],st=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],Z=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],J=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],we=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],T=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},he=e=>{const t=T(e.normal),r=T(e.up),n=T(we(r,t)),u=T(we(t,n));return{right:n,up:u,normal:t}},Te=(e,t)=>[J(e,t.right),J(e,t.up),J(e,t.normal)],Be=(e,t)=>se(se(Z(t.right,e[0]),Z(t.up,e[1])),Z(t.normal,e[2])),Ge=e=>[-e[0],e[1],-e[2]],me=(e,t,r)=>T(Be(Ge(Te(e,t)),r)),it=(e,t)=>{const r=he(t.source),n=he(t.target),u=st(e.position,t.source.position),o=Te(u,r),s=Ge(o),c={position:se(t.target.position,Be(s,n))};return e.forward&&(c.forward=me(e.forward,r,n)),e.up&&(c.up=me(e.up,r,n)),c};new Ye;new b;new Ce;new Ce;const lt=(e=new Pe(2,3))=>{const t=new de(e.x,e.y),r=new Ke({visible:!1}),n=new U(t,r);return n.name="portal-plane",n.userData.portalSize=e.clone(),n},ct=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,dt=`
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
`,ue=1,pt=(e=ue)=>{const t={portalPos:{value:new b},portalNormal:{value:new b},portalRight:{value:new b},portalUp:{value:new b},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new b},hostInverseViewProjection:{value:new R},hostViewMatrix:{value:new R},hostProjectionMatrix:{value:new R},destinationBackground:{value:new b(0,0,0)}},r=new je({uniforms:t,vertexShader:ct,fragmentShader:dt,depthTest:!0,depthWrite:!1,side:qe,stencilWrite:!0,stencilFunc:Ue,stencilRef:e,stencilFail:B,stencilZFail:B,stencilZPass:$e,stencilWriteMask:255}),n=new U(new de(2,2),r);n.frustumCulled=!1;const u=new Ae;u.add(n);const o=new Qe(-1,1,1,-1,0,1),s=new R,c=new b(0,0,1),f=new b(1,0,0),x=new b(0,1,0),M=new pe;return{scene:u,camera:o,update:(F,_,E)=>{const L=F.userData.portalSize;t.portalHalfW.value=L?L.x/2:1,t.portalHalfH.value=L?L.y/2:1.5,F.getWorldPosition(t.portalPos.value),F.getWorldQuaternion(M),t.portalNormal.value.copy(c).applyQuaternion(M),t.portalRight.value.copy(f).applyQuaternion(M),t.portalUp.value.copy(x).applyQuaternion(M),_.getWorldPosition(t.hostCameraPos.value),s.multiplyMatrices(_.projectionMatrix,_.matrixWorldInverse),t.hostInverseViewProjection.value.copy(s).invert(),t.hostViewMatrix.value.copy(_.matrixWorldInverse),t.hostProjectionMatrix.value.copy(_.projectionMatrix),t.destinationBackground.value.set(E.r,E.g,E.b)}}},ze=(e,t)=>{e.traverse(r=>{const n=r;if(!n.isMesh||!n.material)return;const u=Array.isArray(n.material)?n.material:[n.material];for(const o of u)t(o)})},ut=(e,t=ue)=>{ze(e,r=>{r.stencilWrite=!0,r.stencilFunc=Xe,r.stencilRef=t,r.stencilFail=B,r.stencilZFail=B,r.stencilZPass=B,r.stencilWriteMask=0})},ft=e=>{ze(e,t=>{t.stencilWrite=!1})};new b;const ee=new pe,z=new b,D=new b,W=new b,wt=(e,t)=>t||(e.background instanceof G?e.background:new G(0,0,0)),ht=e=>{const{scene:t,anchor:r}=e,n=e.portalNormal??new b(0,0,1),u=e.stencilRef??ue;return{scene:t,anchor:r,getAnchor:()=>{r.getWorldPosition(z),r.getWorldQuaternion(ee),D.copy(n).applyQuaternion(ee).normalize(),W.set(0,1,0).applyQuaternion(ee).normalize();const c=r.userData.portalSize;return{position:[z.x,z.y,z.z],normal:[D.x,D.y,D.z],up:[W.x,W.y,W.z],halfWidth:c?c.x/2:void 0,halfHeight:c?c.y/2:void 0}},getBackground:()=>{const c=wt(t,e.background);return{r:c.r,g:c.g,b:c.b}},tick:e.tick,renderAsSource(c,f){c.render(t,f)},renderAsDestination(c,f){const x=t.background;t.background=null,ut(t,u),c.render(t,f),ft(t),t.background=x}}},mt=e=>{const t=e.outputOrigin??"*",r=e.inputFilter??null;return{post(n,u){e.output.postMessage(n,t,u??[])},onMessage(n){const u=o=>{if(r!==null&&o.source!==r)return;const s=o.data;!s||typeof s!="object"||n(s)};return window.addEventListener("message",u),()=>window.removeEventListener("message",u)}}},bt=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."}],yt=`
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
#portal-nav-drawer .portal-nav-repo { margin-top: 22px; font-size: 11px; color: #6d829f; }
#portal-nav-drawer .portal-nav-repo a { background: transparent; border: none; padding: 0; }
#portal-nav-drawer .portal-nav-repo a:hover { background: transparent; }
`,gt='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',be='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',vt=(e,t)=>{const r=e==="three";return t==="three"?r?".":"..":r?`${t}/`:`../${t}/`},ye=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),xt=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=yt,document.head.appendChild(t);const r=document.createElement("aside");r.id="portal-nav-drawer",r.setAttribute("aria-hidden","false"),r.setAttribute("aria-label","Portal demos"),r.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${bt.map(o=>`
        <li${o.key===e?' class="portal-nav-current"':""}>
          <a href="${vt(e,o.key)}"${o.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${ye(o.label)}</span>
            <span class="portal-nav-desc">${ye(o.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const n=document.createElement("button");n.id="portal-nav-toggle",n.type="button",n.setAttribute("aria-label","Close demos menu"),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-controls","portal-nav-drawer"),n.innerHTML=be,document.body.appendChild(r),document.body.appendChild(n);const u=o=>{r.setAttribute("aria-hidden",o?"false":"true"),n.setAttribute("aria-expanded",o?"true":"false"),n.setAttribute("aria-label",o?"Close demos menu":"Toggle demos menu"),n.innerHTML=o?be:gt};n.addEventListener("click",o=>{o.stopPropagation(),u(r.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",o=>{r.getAttribute("aria-hidden")==="true"||o.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||u(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&r.getAttribute("aria-hidden")==="false"&&u(!1)})},kt=(e,t,r={})=>{const n=r.moveSpeed??4,u=r.lookSensitivity??.0025,o=r.lookKeySpeed??1.5;let s=0,c=0;const f=new Set;St(t,(p,h)=>{s-=p*u,c-=h*u}),window.addEventListener("keydown",p=>f.add(p.code)),window.addEventListener("keyup",p=>f.delete(p.code)),_t(f);const x=new b,M=new b,S=new b,F=p=>{f.has("KeyQ")&&(s+=o*p),f.has("KeyE")&&(s-=o*p),f.has("KeyR")&&(c-=o*p),f.has("KeyF")&&(c+=o*p),c=Mt(c),e.quaternion.setFromEuler(new fe(c,s,0,"YXZ")),M.set(0,0,-1).applyQuaternion(e.quaternion),S.set(1,0,0).applyQuaternion(e.quaternion),x.set(0,0,0),f.has("KeyW")&&x.add(M),f.has("KeyS")&&x.sub(M),f.has("KeyD")&&x.add(S),f.has("KeyA")&&x.sub(S),x.y=0,x.lengthSq()>0&&(x.normalize().multiplyScalar(n*p),e.position.add(x))},_=new R,E=new pe,L=new fe(0,0,0,"YXZ"),a=new b(0,0,0),i=new b,d=new b(0,1,0);return{update:F,setOrientationFromForward:p=>{i.copy(p).normalize(),_.lookAt(a,i,d),E.setFromRotationMatrix(_),L.setFromQuaternion(E,"YXZ"),c=L.x,s=L.y},clearKeys:()=>{f.clear()},getKeys:()=>Array.from(f),setKeys:p=>{f.clear();for(const h of p)f.add(h)}}},St=(e,t)=>{let r=null,n=0,u=0;e.addEventListener("pointerdown",s=>{if(r===null&&(r=s.pointerId,n=s.clientX,u=s.clientY,s.pointerType!=="mouse"))try{e.setPointerCapture(s.pointerId)}catch{}});const o=s=>{s.pointerId===r&&(r=null)};window.addEventListener("pointerup",o),window.addEventListener("pointercancel",o),window.addEventListener("pointermove",s=>{if(s.pointerId!==r)return;const c=s.clientX-n,f=s.clientY-u;n=s.clientX,u=s.clientY,t(c,f)})},Mt=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),_t=e=>{if(typeof window>"u")return;const t="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,r=()=>t||window.innerWidth<500;if(r()){ge(e);return}const n=()=>{r()&&(window.removeEventListener("resize",n),ge(e))};window.addEventListener("resize",n)},ge=e=>{const t=document.createElement("div");t.className="wasd-pad",t.setAttribute("aria-label","Movement and look controls"),t.innerHTML=`
    <button type="button" data-key="KeyQ" class="wasd-btn wasd-yaw-left" aria-label="Yaw left">↶</button>
    <button type="button" data-key="KeyW" class="wasd-btn wasd-forward" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyE" class="wasd-btn wasd-yaw-right" aria-label="Yaw right">↷</button>
    <button type="button" data-key="KeyR" class="wasd-btn wasd-pitch-down" aria-label="Pitch down">⇣</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-back" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
    <button type="button" data-key="KeyF" class="wasd-btn wasd-pitch-up" aria-label="Pitch up">⇡</button>
  `;const r=document.createElement("style");r.textContent=`
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
  `,document.head.appendChild(r),document.body.appendChild(t);for(const n of t.querySelectorAll(".wasd-btn")){const u=n.dataset.key,o=c=>{c.preventDefault(),c.stopPropagation(),e.add(u),n.classList.add("is-active");try{n.setPointerCapture(c.pointerId)}catch{}},s=c=>{c.stopPropagation(),e.delete(u),n.classList.remove("is-active")};n.addEventListener("pointerdown",o),n.addEventListener("pointerup",s),n.addEventListener("pointercancel",s),n.addEventListener("pointerleave",s),n.addEventListener("contextmenu",c=>c.preventDefault())}},I=2960,N=3042,O=1028,H=1029,Et=1032,Ft=519,Lt=514,C=7680,V=1,ve=0,xe=771,te=32774,ke=()=>({func:Ft,ref:0,valueMask:4294967295,fail:C,zfail:C,zpass:C,writeMask:4294967295}),Pt=(e,t)=>{const r=t.stencil!==void 0,n=t.blend==="premultiplied-over";let u=!1;const o=ke(),s=ke();let c=0,f="unknown",x=-1,M=!1,S=[V,ve,V,ve],F=[te,te],_=0,E="unknown",L=-1;const a=p=>p===O?[o]:p===H?[s]:p===Et?[o,s]:[],i=(p,h)=>{const l=h;switch(p){case"enable":case"disable":if(l[0]!==I)return!1;u=p==="enable";break;case"stencilFunc":for(const m of[o,s])m.func=l[0],m.ref=l[1],m.valueMask=l[2];break;case"stencilFuncSeparate":for(const m of a(l[0]))m.func=l[1],m.ref=l[2],m.valueMask=l[3];break;case"stencilOp":for(const m of[o,s])m.fail=l[0],m.zfail=l[1],m.zpass=l[2];break;case"stencilOpSeparate":for(const m of a(l[0]))m.fail=l[1],m.zfail=l[2],m.zpass=l[3];break;case"stencilMask":o.writeMask=l[0],s.writeMask=l[0];break;case"stencilMaskSeparate":for(const m of a(l[0]))m.writeMask=l[1];break;default:return!1}return c+=1,!0},d=(p,h)=>{const l=h;switch(p){case"enable":case"disable":if(l[0]!==N)return!1;M=p==="enable";break;case"blendFunc":S=[l[0],l[1],l[0],l[1]];break;case"blendFuncSeparate":S=[l[0],l[1],l[2],l[3]];break;case"blendEquation":F=[l[0],l[0]];break;case"blendEquationSeparate":F=[l[0],l[1]];break;default:return!1}return _+=1,!0},y=()=>{u?e.enable(I):e.disable(I),e.stencilFuncSeparate(O,o.func,o.ref,o.valueMask),e.stencilFuncSeparate(H,s.func,s.ref,s.valueMask),e.stencilOpSeparate(O,o.fail,o.zfail,o.zpass),e.stencilOpSeparate(H,s.fail,s.zfail,s.zpass),e.stencilMaskSeparate(O,o.writeMask),e.stencilMaskSeparate(H,s.writeMask)},g=()=>{const p=t.stencil;e.enable(I),e.stencilFunc(Lt,p.ref,p.valueMask??255),e.stencilOp(C,C,C),e.stencilMask(0)},w=()=>{M?e.enable(N):e.disable(N),e.blendFuncSeparate(S[0],S[1],S[2],S[3]),e.blendEquationSeparate(F[0],F[1])},v=()=>{e.enable(N),e.blendFuncSeparate(V,xe,V,xe),e.blendEquation(te)};return{intercept(p,h){return!!(r&&i(p,h)||n&&d(p,h))},beforeDraw(p){const h=p?"override":"intended";r&&(f!==h||h==="intended"&&x!==c)&&(h==="override"?g():y(),f=h,x=c),n&&(E!==h||h==="intended"&&L!==_)&&(h==="override"?v():w(),E=h,L=_)},invalidate(){f="unknown",E="unknown"}}},At={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Ct=36160,Rt=36009,ne=3089,Tt=256,re=6145,Bt=34041,Se=1029,Me=36064,Gt=new Set(["drawArrays","drawElements","drawArraysInstanced","drawElementsInstanced","drawRangeElements","clear","clearBufferfv","clearBufferiv","clearBufferuiv","clearBufferfi"]),zt=(e,t={})=>{const r=new Map;let n=null,u=null,o=null,s=null,c=!1;const f=t.screen?Pt(e,t.screen):null,x=t.screen?.clear==="depth-only",M=a=>{const i=u,d=o;if(n!==null||!i||!d||i[2]===0||i[3]===0||i[0]===d[0]&&i[1]===d[1]&&i[2]===d[2]&&i[3]===d[3])return a;const y=d[2]/i[2],g=d[3]/i[3],w=d[0]+(a[0]-i[0])*y,v=d[1]+(a[1]-i[1])*g,p=d[0]+(a[0]+a[2]-i[0])*y,h=d[1]+(a[1]+a[3]-i[1])*g,l=Math.floor(w),m=Math.floor(v);return[l,m,Math.ceil(p)-l,Math.ceil(h)-m]},S=()=>{if(!s)return;const[a,i,d,y]=M(s);e.scissor(a,i,d,y)},F=a=>{if(a==null)return null;const i=typeof a;if(i==="number"||i==="string"||i==="boolean")return a;if(Array.isArray(a))return a.map(F);if(typeof a!="object")return a;const d=a;if("__netgl_handle"in d){const y=d.__netgl_handle,g=r.get(y);if(g===void 0)throw new Error(`NetGL replay: unknown handle id ${y}`);return g}if("__netgl_typedarray"in d){const y=d.__netgl_typedarray,g=At[y];if(!g)throw new Error(`NetGL replay: unknown typed-array ${y}`);return new g(d.buffer,d.offset,d.length)}if("__netgl_arraybuffer"in d)return d.__netgl_arraybuffer;if("__netgl_imagebitmap"in d)return d.__netgl_imagebitmap;if("__netgl_imagedata"in d){const y=d.width,g=d.height,w=d.buffer,v=new Uint8ClampedArray(w);return new ImageData(v,y,g)}throw new Error("NetGL replay: unknown encoded value shape")},_=(a,i)=>{if(a==="clear"){const d=i[0]&Tt;return d===0||(f?.beforeDraw(!0),E(()=>e.clear(d))),!0}if(a==="clearBufferfv"&&i[0]===re)return f?.beforeDraw(!0),E(()=>e.clearBufferfv(re,i[1],i[2])),!0;if(a==="clearBufferfi"&&i[0]===Bt){const d=i[2];return f?.beforeDraw(!0),E(()=>e.clearBufferfv(re,0,[d])),!0}return!!a.startsWith("clearBuffer")},E=a=>{if(c||!o){a();return}const[i,d,y,g]=o;e.enable(ne),e.scissor(i,d,y,g),a(),e.disable(ne),S()};return Object.assign(a=>{let i;try{i=a.args.map(F)}catch(w){const v=w instanceof Error?w.message:String(w);throw new Error(`NetGL replay (decoding ${a.name}): ${v}`)}let d=!1;if(a.name==="bindFramebuffer"){const w=i[0];if(w===Ct||w===Rt){const v=i[1];v!==n&&(d=!0),n=v}i[1]===null&&t.screenFramebuffer&&(i=[w,t.screenFramebuffer()])}else t.screenFramebuffer&&(a.name==="drawBuffers"?i=[i[0].map(w=>w===Se?Me:w)]:a.name==="readBuffer"&&i[0]===Se&&(i=[Me]));if(a.name==="viewport"){const[w,v,p,h]=i;if(u=[w,v,p,h],n===null&&t.remapScreenViewport){const l=t.remapScreenViewport(w,v,p,h);l!==null&&(i=[l[0],l[1],l[2],l[3]])}o=i}else if(a.name==="scissor"){const w=i;s=[w[0],w[1],w[2],w[3]],i=[...M(s)]}else(a.name==="enable"||a.name==="disable")&&i[0]===ne&&(c=a.name==="enable");if(f&&f.intercept(a.name,i))return;if(Gt.has(a.name)){const w=n===null;if(w&&x&&_(a.name,i))return;f?.beforeDraw(w)}if(t.__debugTraceViewport&&(a.name==="viewport"||a.name==="scissor"||a.name==="enable"||a.name==="disable"))if(a.name==="enable"||a.name==="disable")i[0]===3089&&t.__debugTraceViewport(`${a.name}(SCISSOR_TEST) drawFb=${n?"RT":"null"}`);else{const[w,v,p,h]=i;t.__debugTraceViewport(`${a.name}(${w},${v},${p}x${h}) drawFb=${n?"RT":"null"}`)}const y=e[a.name];if(typeof y!="function")throw new Error(`NetGL replay: receiver has no method '${a.name}'`);const g=y.apply(e,i);if(a.name==="viewport"&&n===null&&t.remapScreenViewport&&S(),d&&u){const[w,v,p,h]=u,l=n===null&&t.remapScreenViewport?t.remapScreenViewport(w,v,p,h):null,m=l?l[0]:w,Q=l?l[1]:v,Y=l?l[2]:p,X=l?l[3]:h;e.viewport(m,Q,Y,X),o=[m,Q,Y,X],S(),t.__debugTraceViewport&&t.__debugTraceViewport(`post-bind re-issue viewport(${m},${Q},${Y}x${X}) drawFb=${n?"RT":"null"}`)}a.returnId!==void 0&&g!=null&&typeof g=="object"&&r.set(a.returnId,g)},{invalidate(){f?.invalidate()}})},Dt=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",Wt=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end";xt("netgl");const De=document.querySelector("#app");if(!De)throw new Error("Missing #app");const ie=document.querySelector("#target-iframe");if(!ie)throw new Error("Missing #target-iframe");const k=new Ze({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});k.outputColorSpace=Je;k.toneMapping=et;k.setPixelRatio(Math.min(window.devicePixelRatio,2));k.setSize(window.innerWidth,window.innerHeight);k.autoClear=!1;De.appendChild(k.domElement);const P=new tt(70,window.innerWidth/window.innerHeight,.02,200);P.position.set(0,1.6,5.5);const A=new Ae;A.background=new G("#101826");A.add(new nt(12176639,2241348,1));const We=new rt(16777215,.65);We.position.set(3,6,2);A.add(We);const Ie=new U(new de(18,18),new Re({color:"#1b2a3f",roughness:.95,metalness:.03}));Ie.rotation.x=-Math.PI/2;A.add(Ie);const It=new at(.9,.9,.9),Nt=new Re({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new U(It,Nt);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),A.add(t)}const Ot=new Pe(2.6,3.2),q=lt(Ot);q.position.set(0,1.6,-3.5);A.add(q);const _e=ht({scene:A,anchor:q}),ae=pt(),Ht=k.getContext(),Vt=zt(Ht);let Ne=!1,le=null;const Oe=new G("#220d17"),He=mt({output:ie.contentWindow,inputFilter:ie.contentWindow});let oe=[],ce=null,Ee=null;He.onMessage(e=>{if(Wt(e)){ce=oe,oe=[];return}if(Dt(e)){oe.push(e);return}const t=e;t&&t.type==="netgl:ready"&&(le=t.anchor,Oe.setRGB(t.background.r,t.background.g,t.background.b),Ne=!0)});const Kt=kt(P,k.domElement),jt=()=>{const e=window.innerWidth,t=window.innerHeight;k.setSize(e,t),P.aspect=e/t,P.updateProjectionMatrix()};window.addEventListener("resize",jt);const Fe=new ot,Le=new G,K=new b,j=new b,$=new b,Ve=()=>{const e=Fe.getDelta(),t=Fe.elapsedTime;if(Kt.update(e),k.resetState(),k.setRenderTarget(null),k.clear(!0,!0,!0),_e.renderAsSource(k,P),Ne&&le){Le.copy(Oe),ae.update(q,P,Le),k.render(ae.scene,ae.camera),k.clearDepth();let r=ce;if(r?(ce=null,Ee=r):r=Ee,r){for(let f=0;f<r.length;f+=1)Vt(r[f]);k.resetState()}P.getWorldPosition(K),j.set(0,0,-1).applyQuaternion(P.quaternion),$.set(0,1,0).applyQuaternion(P.quaternion);const n=it({position:[K.x,K.y,K.z],forward:[j.x,j.y,j.z],up:[$.x,$.y,$.z]},{source:_e.getAnchor(),target:le}),u=Array.from(P.projectionMatrix.elements),o=k.getPixelRatio(),s=Math.max(1,Math.floor(window.innerWidth*o)),c=Math.max(1,Math.floor(window.innerHeight*o));He.post({type:"netgl:setPose",pose:n,projection:u,viewport:{width:s,height:c},time:t})}requestAnimationFrame(Ve)};Ve();
