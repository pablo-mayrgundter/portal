import{V as se,P as Q,M as ke,a as W,b as d,c as k,S as Pe,R as Me,K as M,A as Se,D as Ee,d as le,O as _e,Q as O,C as S,e as Ae,f as ce,E as Le,g as Y,W as Re,h as Ce,N as Fe,i as Te,H as We,j as ze,k as de,B as De,l as Be}from"./three-helpers-WAzysoi4.js";const $=(t,e)=>[t[0]+e[0],t[1]+e[1],t[2]+e[2]],Ie=(t,e)=>[t[0]-e[0],t[1]-e[1],t[2]-e[2]],I=(t,e)=>[t[0]*e,t[1]*e,t[2]*e],G=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],X=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],P=t=>{const e=Math.hypot(t[0],t[1],t[2]);return e>0?[t[0]/e,t[1]/e,t[2]/e]:[0,0,1]},Z=t=>{const e=P(t.normal),n=P(t.up),r=P(X(n,e)),l=P(X(e,r));return{right:r,up:l,normal:e}},pe=(t,e)=>[G(t,e.right),G(t,e.up),G(t,e.normal)],ue=(t,e)=>$($(I(e.right,t[0]),I(e.up,t[1])),I(e.normal,t[2])),we=t=>[-t[0],t[1],-t[2]],J=(t,e,n)=>P(ue(we(pe(t,e)),n)),Ge=(t,e)=>{const n=Z(e.source),r=Z(e.target),l=Ie(t.position,e.source.position),s=pe(l,n),o=we(s),a={position:$(e.target.position,ue(o,r))};return t.forward&&(a.forward=J(t.forward,n,r)),t.up&&(a.up=J(t.up,n,r)),a};new Ae;new d;new ce;new ce;const He=(t=new se(2,3))=>{const e=new Q(t.x,t.y),n=new ke({visible:!1}),r=new W(e,n);return r.name="portal-plane",r.userData.portalSize=t.clone(),r},Ke=`
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
`,q=1,$e=(t=q)=>{const e={portalPos:{value:new d},portalNormal:{value:new d},portalRight:{value:new d},portalUp:{value:new d},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new d},hostInverseViewProjection:{value:new k},hostViewMatrix:{value:new k},hostProjectionMatrix:{value:new k},destinationBackground:{value:new d(0,0,0)}},n=new Pe({uniforms:e,vertexShader:Ke,fragmentShader:Ne,depthTest:!0,depthWrite:!1,side:Ee,stencilWrite:!0,stencilFunc:Se,stencilRef:t,stencilFail:M,stencilZFail:M,stencilZPass:Me,stencilWriteMask:255}),r=new W(new Q(2,2),n);r.frustumCulled=!1;const l=new le;l.add(r);const s=new _e(-1,1,1,-1,0,1),o=new k,a=new d(0,0,1),i=new d(1,0,0),c=new d(0,1,0),w=new O;return{scene:l,camera:s,update:(h,m,y)=>{const p=h.userData.portalSize;e.portalHalfW.value=p?p.x/2:1,e.portalHalfH.value=p?p.y/2:1.5,h.getWorldPosition(e.portalPos.value),h.getWorldQuaternion(w),e.portalNormal.value.copy(a).applyQuaternion(w),e.portalRight.value.copy(i).applyQuaternion(w),e.portalUp.value.copy(c).applyQuaternion(w),m.getWorldPosition(e.hostCameraPos.value),o.multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse),e.hostInverseViewProjection.value.copy(o).invert(),e.hostViewMatrix.value.copy(m.matrixWorldInverse),e.hostProjectionMatrix.value.copy(m.projectionMatrix),e.destinationBackground.value.set(y.r,y.g,y.b)}}},he=(t,e)=>{t.traverse(n=>{const r=n;if(!r.isMesh||!r.material)return;const l=Array.isArray(r.material)?r.material:[r.material];for(const s of l)e(s)})},je=(t,e=q)=>{he(t,n=>{n.stencilWrite=!0,n.stencilFunc=Le,n.stencilRef=e,n.stencilFail=M,n.stencilZFail=M,n.stencilZPass=M,n.stencilWriteMask=0})},Ve=t=>{he(t,e=>{e.stencilWrite=!1})};new d;const H=new O,A=new d,L=new d,R=new d,Ue=(t,e)=>e||(t.background instanceof S?t.background:new S(0,0,0)),Qe=t=>{const{scene:e,anchor:n}=t,r=t.portalNormal??new d(0,0,1),l=t.stencilRef??q;return{scene:e,anchor:n,getAnchor:()=>{n.getWorldPosition(A),n.getWorldQuaternion(H),L.copy(r).applyQuaternion(H).normalize(),R.set(0,1,0).applyQuaternion(H).normalize();const a=n.userData.portalSize;return{position:[A.x,A.y,A.z],normal:[L.x,L.y,L.z],up:[R.x,R.y,R.z],halfWidth:a?a.x/2:void 0,halfHeight:a?a.y/2:void 0}},getBackground:()=>{const a=Ue(e,t.background);return{r:a.r,g:a.g,b:a.b}},tick:t.tick,renderAsSource(a,i){a.render(e,i)},renderAsDestination(a,i){const c=e.background;e.background=null,je(e,l),a.render(e,i),Ve(e),e.background=c}}},Oe=t=>{const e=t.outputOrigin??"*",n=t.inputFilter??null;return{post(r,l){t.output.postMessage(r,e,l??[])},onMessage(r){const l=s=>{if(n!==null&&s.source!==n)return;const o=s.data;!o||typeof o!="object"||r(o)};return window.addEventListener("message",l),()=>window.removeEventListener("message",l)}}},qe=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],Ye=`
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
`,Xe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',ee='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ze=(t,e)=>{const n=t==="three";return e==="three"?n?".":"..":n?`${e}/`:`../${e}/`},te=t=>t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Je=t=>{if(document.getElementById("portal-nav-toggle"))return;const e=document.createElement("style");e.id="portal-nav-styles",e.textContent=Ye,document.head.appendChild(e);const n=document.createElement("aside");n.id="portal-nav-drawer",n.setAttribute("aria-hidden","false"),n.setAttribute("aria-label","Portal demos"),n.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${qe.map(s=>`
        <li${s.key===t?' class="portal-nav-current"':""}>
          <a href="${Ze(t,s.key)}"${s.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${te(s.label)}</span>
            <span class="portal-nav-desc">${te(s.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=ee,document.body.appendChild(n),document.body.appendChild(r);const l=s=>{n.setAttribute("aria-hidden",s?"false":"true"),r.setAttribute("aria-expanded",s?"true":"false"),r.setAttribute("aria-label",s?"Close demos menu":"Toggle demos menu"),r.innerHTML=s?ee:Xe};r.addEventListener("click",s=>{s.stopPropagation(),l(n.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",s=>{n.getAttribute("aria-hidden")==="true"||s.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&n.getAttribute("aria-hidden")==="false"&&l(!1)})},et=(t,e,n={})=>{const r=n.moveSpeed??4,l=n.lookSensitivity??.0025,s=n.lookKeySpeed??1.5;let o=0,a=0;const i=new Set;tt(e,(g,B)=>{o-=g*l,a-=B*l}),window.addEventListener("keydown",g=>i.add(g.code)),window.addEventListener("keyup",g=>i.delete(g.code)),rt(i);const c=new d,w=new d,u=new d,h=g=>{i.has("KeyQ")&&(o+=s*g),i.has("KeyE")&&(o-=s*g),i.has("KeyR")&&(a-=s*g),i.has("KeyF")&&(a+=s*g),a=nt(a),t.quaternion.setFromEuler(new Y(a,o,0,"YXZ")),w.set(0,0,-1).applyQuaternion(t.quaternion),u.set(1,0,0).applyQuaternion(t.quaternion),c.set(0,0,0),i.has("KeyW")&&c.add(w),i.has("KeyS")&&c.sub(w),i.has("KeyD")&&c.add(u),i.has("KeyA")&&c.sub(u),c.y=0,c.lengthSq()>0&&(c.normalize().multiplyScalar(r*g),t.position.add(c))},m=new k,y=new O,p=new Y(0,0,0,"YXZ"),E=new d(0,0,0),x=new d,_=new d(0,1,0);return{update:h,setOrientationFromForward:g=>{x.copy(g).normalize(),m.lookAt(E,x,_),y.setFromRotationMatrix(m),p.setFromQuaternion(y,"YXZ"),a=p.x,o=p.y},clearKeys:()=>{i.clear()},getKeys:()=>Array.from(i),setKeys:g=>{i.clear();for(const B of g)i.add(B)}}},tt=(t,e)=>{let n=null,r=0,l=0;t.addEventListener("pointerdown",o=>{if(n===null&&(n=o.pointerId,r=o.clientX,l=o.clientY,o.pointerType!=="mouse"))try{t.setPointerCapture(o.pointerId)}catch{}});const s=o=>{o.pointerId===n&&(n=null)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s),window.addEventListener("pointermove",o=>{if(o.pointerId!==n)return;const a=o.clientX-r,i=o.clientY-l;r=o.clientX,l=o.clientY,e(a,i)})},nt=t=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,t)),rt=t=>{if(typeof window>"u")return;const e="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,n=()=>e||window.innerWidth<500;if(n()){ne(t);return}const r=()=>{n()&&(window.removeEventListener("resize",r),ne(t))};window.addEventListener("resize",r)},ne=t=>{const e=document.createElement("div");e.className="wasd-pad",e.setAttribute("aria-label","Movement and look controls"),e.innerHTML=`
    <button type="button" data-key="KeyQ" class="wasd-btn wasd-yaw-left" aria-label="Yaw left">↶</button>
    <button type="button" data-key="KeyW" class="wasd-btn wasd-forward" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyE" class="wasd-btn wasd-yaw-right" aria-label="Yaw right">↷</button>
    <button type="button" data-key="KeyR" class="wasd-btn wasd-pitch-down" aria-label="Pitch down">⇣</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-back" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
    <button type="button" data-key="KeyF" class="wasd-btn wasd-pitch-up" aria-label="Pitch up">⇡</button>
  `;const n=document.createElement("style");n.textContent=`
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
  `,document.head.appendChild(n),document.body.appendChild(e);for(const r of e.querySelectorAll(".wasd-btn")){const l=r.dataset.key,s=a=>{a.preventDefault(),a.stopPropagation(),t.add(l),r.classList.add("is-active");try{r.setPointerCapture(a.pointerId)}catch{}},o=a=>{a.stopPropagation(),t.delete(l),r.classList.remove("is-active")};r.addEventListener("pointerdown",s),r.addEventListener("pointerup",o),r.addEventListener("pointercancel",o),r.addEventListener("pointerleave",o),r.addEventListener("contextmenu",a=>a.preventDefault())}},ot={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},at=36160,it=36009,st=(t,e={})=>{const n=new Map;let r=null,l=null;const s=o=>{if(o==null)return null;const a=typeof o;if(a==="number"||a==="string"||a==="boolean")return o;if(Array.isArray(o))return o.map(s);if(typeof o!="object")return o;const i=o;if("__netgl_handle"in i){const c=i.__netgl_handle,w=n.get(c);if(w===void 0)throw new Error(`NetGL replay: unknown handle id ${c}`);return w}if("__netgl_typedarray"in i){const c=i.__netgl_typedarray,w=ot[c];if(!w)throw new Error(`NetGL replay: unknown typed-array ${c}`);return new w(i.buffer,i.offset,i.length)}if("__netgl_arraybuffer"in i)return i.__netgl_arraybuffer;if("__netgl_imagedata"in i){const c=i.width,w=i.height,u=i.buffer,h=new Uint8ClampedArray(u);return new ImageData(h,c,w)}throw new Error("NetGL replay: unknown encoded value shape")};return o=>{let a;try{a=o.args.map(s)}catch(u){const h=u instanceof Error?u.message:String(u);throw new Error(`NetGL replay (decoding ${o.name}): ${h}`)}let i=!1;if(o.name==="bindFramebuffer"){const u=a[0];if(u===at||u===it){const h=a[1];h!==r&&(i=!0),r=h}}if(o.name==="viewport"){const[u,h,m,y]=a;if(l=[u,h,m,y],r===null&&e.remapScreenViewport){const p=e.remapScreenViewport(u,h,m,y);p!==null&&(a=[p[0],p[1],p[2],p[3]])}}if(e.__debugTraceViewport&&(o.name==="viewport"||o.name==="scissor"||o.name==="enable"||o.name==="disable"))if(o.name==="enable"||o.name==="disable")a[0]===3089&&e.__debugTraceViewport(`${o.name}(SCISSOR_TEST) drawFb=${r?"RT":"null"}`);else{const[u,h,m,y]=a;e.__debugTraceViewport(`${o.name}(${u},${h},${m}x${y}) drawFb=${r?"RT":"null"}`)}const c=t[o.name];if(typeof c!="function")throw new Error(`NetGL replay: receiver has no method '${o.name}'`);const w=c.apply(t,a);if(i&&l){const[u,h,m,y]=l,p=r===null&&e.remapScreenViewport?e.remapScreenViewport(u,h,m,y):null,E=p?p[0]:u,x=p?p[1]:h,_=p?p[2]:m,D=p?p[3]:y;t.viewport(E,x,_,D),e.__debugTraceViewport&&e.__debugTraceViewport(`post-bind re-issue viewport(${E},${x},${_}x${D}) drawFb=${r?"RT":"null"}`)}o.returnId!==void 0&&w!=null&&typeof w=="object"&&n.set(o.returnId,w)}},lt=t=>typeof t=="object"&&t!==null&&typeof t.name=="string",ct=t=>typeof t=="object"&&t!==null&&t.type==="netgl:frame-end";Je("netgl");const fe=document.querySelector("#app");if(!fe)throw new Error("Missing #app");const j=document.querySelector("#target-iframe");if(!j)throw new Error("Missing #target-iframe");const f=new Re({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});f.outputColorSpace=Ce;f.toneMapping=Fe;f.setPixelRatio(Math.min(window.devicePixelRatio,2));f.setSize(window.innerWidth,window.innerHeight);f.autoClear=!1;fe.appendChild(f.domElement);const b=new Te(70,window.innerWidth/window.innerHeight,.02,200);b.position.set(0,1.6,5.5);const v=new le;v.background=new S("#101826");v.add(new We(12176639,2241348,1));const me=new ze(16777215,.65);me.position.set(3,6,2);v.add(me);const ge=new W(new Q(18,18),new de({color:"#1b2a3f",roughness:.95,metalness:.03}));ge.rotation.x=-Math.PI/2;v.add(ge);const dt=new De(.9,.9,.9),pt=new de({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const e=new W(dt,pt);e.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),v.add(e)}const ut=new se(2.6,3.2),z=He(ut);z.position.set(0,1.6,-3.5);v.add(z);const re=Qe({scene:v,anchor:z}),K=$e(),wt=f.getContext(),ht=st(wt);let ye=!1,V=null;const be=new S("#220d17"),ve=Oe({output:j.contentWindow,inputFilter:j.contentWindow});let N=[],U=null,oe=null;ve.onMessage(t=>{if(ct(t)){U=N,N=[];return}if(lt(t)){N.push(t);return}const e=t;e&&e.type==="netgl:ready"&&(V=e.anchor,be.setRGB(e.background.r,e.background.g,e.background.b),ye=!0)});const ft=et(b,f.domElement),mt=()=>{const t=window.innerWidth,e=window.innerHeight;f.setSize(t,e),b.aspect=t/e,b.updateProjectionMatrix()};window.addEventListener("resize",mt);const ae=new Be,ie=new S,C=new d,F=new d,T=new d,xe=()=>{const t=ae.getDelta(),e=ae.elapsedTime;if(ft.update(t),f.resetState(),f.setRenderTarget(null),f.clear(!0,!0,!0),re.renderAsSource(f,b),ye&&V){ie.copy(be),K.update(z,b,ie),f.render(K.scene,K.camera),f.clearDepth();let n=U;if(n?(U=null,oe=n):n=oe,n){for(let i=0;i<n.length;i+=1)ht(n[i]);f.resetState()}b.getWorldPosition(C),F.set(0,0,-1).applyQuaternion(b.quaternion),T.set(0,1,0).applyQuaternion(b.quaternion);const r=Ge({position:[C.x,C.y,C.z],forward:[F.x,F.y,F.z],up:[T.x,T.y,T.z]},{source:re.getAnchor(),target:V}),l=Array.from(b.projectionMatrix.elements),s=f.getPixelRatio(),o=Math.max(1,Math.floor(window.innerWidth*s)),a=Math.max(1,Math.floor(window.innerHeight*s));ve.post({type:"netgl:setPose",pose:r,projection:l,viewport:{width:o,height:a},time:e})}requestAnimationFrame(xe)};xe();
