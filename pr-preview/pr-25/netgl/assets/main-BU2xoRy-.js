import{V as se,P as Q,M as ke,a as W,b as p,c as k,S as Me,R as Pe,K as P,A as Se,D as _e,d as le,O as Ee,Q as O,C as S,e as Ae,f as ce,E as Le,g as Y,W as Re,h as Ce,N as Fe,i as Te,H as We,j as ze,k as de,B as De,l as Be}from"./three-helpers-WAzysoi4.js";const V=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],Ie=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],I=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],G=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],X=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],M=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},Z=e=>{const t=M(e.normal),r=M(e.up),o=M(X(r,t)),l=M(X(t,o));return{right:o,up:l,normal:t}},pe=(e,t)=>[G(e,t.right),G(e,t.up),G(e,t.normal)],ue=(e,t)=>V(V(I(t.right,e[0]),I(t.up,e[1])),I(t.normal,e[2])),we=e=>[-e[0],e[1],-e[2]],J=(e,t,r)=>M(ue(we(pe(e,t)),r)),Ge=(e,t)=>{const r=Z(t.source),o=Z(t.target),l=Ie(e.position,t.source.position),s=pe(l,r),n=we(s),a={position:V(t.target.position,ue(n,o))};return e.forward&&(a.forward=J(e.forward,r,o)),e.up&&(a.up=J(e.up,r,o)),a};new Ae;new p;new ce;new ce;const He=(e=new se(2,3))=>{const t=new Q(e.x,e.y),r=new ke({visible:!1}),o=new W(t,r);return o.name="portal-plane",o.userData.portalSize=e.clone(),o},Ne=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Ke=`
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
`,q=1,Ve=(e=q)=>{const t={portalPos:{value:new p},portalNormal:{value:new p},portalRight:{value:new p},portalUp:{value:new p},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new p},hostInverseViewProjection:{value:new k},hostViewMatrix:{value:new k},hostProjectionMatrix:{value:new k},destinationBackground:{value:new p(0,0,0)}},r=new Me({uniforms:t,vertexShader:Ne,fragmentShader:Ke,depthTest:!0,depthWrite:!1,side:_e,stencilWrite:!0,stencilFunc:Se,stencilRef:e,stencilFail:P,stencilZFail:P,stencilZPass:Pe,stencilWriteMask:255}),o=new W(new Q(2,2),r);o.frustumCulled=!1;const l=new le;l.add(o);const s=new Ee(-1,1,1,-1,0,1),n=new k,a=new p(0,0,1),i=new p(1,0,0),c=new p(0,1,0),d=new O;return{scene:l,camera:s,update:(h,m,y)=>{const u=h.userData.portalSize;t.portalHalfW.value=u?u.x/2:1,t.portalHalfH.value=u?u.y/2:1.5,h.getWorldPosition(t.portalPos.value),h.getWorldQuaternion(d),t.portalNormal.value.copy(a).applyQuaternion(d),t.portalRight.value.copy(i).applyQuaternion(d),t.portalUp.value.copy(c).applyQuaternion(d),m.getWorldPosition(t.hostCameraPos.value),n.multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse),t.hostInverseViewProjection.value.copy(n).invert(),t.hostViewMatrix.value.copy(m.matrixWorldInverse),t.hostProjectionMatrix.value.copy(m.projectionMatrix),t.destinationBackground.value.set(y.r,y.g,y.b)}}},he=(e,t)=>{e.traverse(r=>{const o=r;if(!o.isMesh||!o.material)return;const l=Array.isArray(o.material)?o.material:[o.material];for(const s of l)t(s)})},$e=(e,t=q)=>{he(e,r=>{r.stencilWrite=!0,r.stencilFunc=Le,r.stencilRef=t,r.stencilFail=P,r.stencilZFail=P,r.stencilZPass=P,r.stencilWriteMask=0})},je=e=>{he(e,t=>{t.stencilWrite=!1})};new p;const H=new O,A=new p,L=new p,R=new p,Ue=(e,t)=>t||(e.background instanceof S?e.background:new S(0,0,0)),Qe=e=>{const{scene:t,anchor:r}=e,o=e.portalNormal??new p(0,0,1),l=e.stencilRef??q;return{scene:t,anchor:r,getAnchor:()=>{r.getWorldPosition(A),r.getWorldQuaternion(H),L.copy(o).applyQuaternion(H).normalize(),R.set(0,1,0).applyQuaternion(H).normalize();const a=r.userData.portalSize;return{position:[A.x,A.y,A.z],normal:[L.x,L.y,L.z],up:[R.x,R.y,R.z],halfWidth:a?a.x/2:void 0,halfHeight:a?a.y/2:void 0}},getBackground:()=>{const a=Ue(t,e.background);return{r:a.r,g:a.g,b:a.b}},tick:e.tick,renderAsSource(a,i){a.render(t,i)},renderAsDestination(a,i){const c=t.background;t.background=null,$e(t,l),a.render(t,i),je(t),t.background=c}}},Oe=e=>{const t=e.outputOrigin??"*",r=e.inputFilter??null;return{post(o,l){e.output.postMessage(o,t,l??[])},onMessage(o){const l=s=>{if(r!==null&&s.source!==r)return;const n=s.data;!n||typeof n!="object"||o(n)};return window.addEventListener("message",l),()=>window.removeEventListener("message",l)}}},qe=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],Ye=`
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
`,Xe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',ee='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ze=(e,t)=>{const r=e==="three";return t==="three"?r?".":"..":r?`${t}/`:`../${t}/`},te=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Je=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Ye,document.head.appendChild(t);const r=document.createElement("aside");r.id="portal-nav-drawer",r.setAttribute("aria-hidden","false"),r.setAttribute("aria-label","Portal demos"),r.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${qe.map(s=>`
        <li${s.key===e?' class="portal-nav-current"':""}>
          <a href="${Ze(e,s.key)}"${s.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${te(s.label)}</span>
            <span class="portal-nav-desc">${te(s.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const o=document.createElement("button");o.id="portal-nav-toggle",o.type="button",o.setAttribute("aria-label","Close demos menu"),o.setAttribute("aria-expanded","true"),o.setAttribute("aria-controls","portal-nav-drawer"),o.innerHTML=ee,document.body.appendChild(r),document.body.appendChild(o);const l=s=>{r.setAttribute("aria-hidden",s?"false":"true"),o.setAttribute("aria-expanded",s?"true":"false"),o.setAttribute("aria-label",s?"Close demos menu":"Toggle demos menu"),o.innerHTML=s?ee:Xe};o.addEventListener("click",s=>{s.stopPropagation(),l(r.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",s=>{r.getAttribute("aria-hidden")==="true"||s.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&r.getAttribute("aria-hidden")==="false"&&l(!1)})},et=(e,t,r={})=>{const o=r.moveSpeed??4,l=r.lookSensitivity??.0025,s=r.lookKeySpeed??1.5;let n=0,a=0;const i=new Set;tt(t,(g,B)=>{n-=g*l,a=ne(a-B*l)}),window.addEventListener("keydown",g=>i.add(g.code)),window.addEventListener("keyup",g=>i.delete(g.code)),nt(i);const c=new p,d=new p,w=new p,h=g=>{i.has("KeyQ")&&(n+=s*g),i.has("KeyE")&&(n-=s*g),i.has("KeyR")&&(a-=s*g),i.has("KeyF")&&(a+=s*g),a=ne(a),e.quaternion.setFromEuler(new Y(a,n,0,"YXZ")),d.set(0,0,-1).applyQuaternion(e.quaternion),w.set(1,0,0).applyQuaternion(e.quaternion),c.set(0,0,0),i.has("KeyW")&&c.add(d),i.has("KeyS")&&c.sub(d),i.has("KeyD")&&c.add(w),i.has("KeyA")&&c.sub(w),c.y=0,c.lengthSq()>0&&(c.normalize().multiplyScalar(o*g),e.position.add(c))},m=new k,y=new O,u=new Y(0,0,0,"YXZ"),_=new p(0,0,0),x=new p,E=new p(0,1,0);return{update:h,setOrientationFromForward:g=>{x.copy(g).normalize(),m.lookAt(_,x,E),y.setFromRotationMatrix(m),u.setFromQuaternion(y,"YXZ"),a=u.x,n=u.y},clearKeys:()=>{i.clear()},getKeys:()=>Array.from(i),setKeys:g=>{i.clear();for(const B of g)i.add(B)}}},tt=(e,t)=>{let r=null,o=0,l=0;e.addEventListener("pointerdown",n=>{if(r===null&&(r=n.pointerId,o=n.clientX,l=n.clientY,n.pointerType!=="mouse"))try{e.setPointerCapture(n.pointerId)}catch{}});const s=n=>{n.pointerId===r&&(r=null)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s),window.addEventListener("pointermove",n=>{if(n.pointerId!==r)return;const a=n.clientX-o,i=n.clientY-l;o=n.clientX,l=n.clientY,t(a,i)})},ne=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),nt=e=>{const t=typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0),r=typeof window<"u"&&window.innerWidth<500;if(!(t||r))return;const l=document.createElement("div");l.className="wasd-pad",l.setAttribute("aria-label","Movement controls"),l.innerHTML=`
    <button type="button" data-key="KeyQ" class="wasd-btn wasd-yaw-left" aria-label="Yaw left">↶</button>
    <button type="button" data-key="KeyW" class="wasd-btn wasd-forward" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyE" class="wasd-btn wasd-yaw-right" aria-label="Yaw right">↷</button>
    <button type="button" data-key="KeyR" class="wasd-btn wasd-pitch-down" aria-label="Pitch down">⇣</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-back" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
    <button type="button" data-key="KeyF" class="wasd-btn wasd-pitch-up" aria-label="Pitch up">⇡</button>
  `;const s=document.createElement("style");s.textContent=`
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
  `,document.head.appendChild(s),document.body.appendChild(l);for(const n of l.querySelectorAll(".wasd-btn")){const a=n.dataset.key,i=d=>{d.preventDefault(),d.stopPropagation(),e.add(a),n.classList.add("is-active");try{n.setPointerCapture(d.pointerId)}catch{}},c=d=>{d.stopPropagation(),e.delete(a),n.classList.remove("is-active")};n.addEventListener("pointerdown",i),n.addEventListener("pointerup",c),n.addEventListener("pointercancel",c),n.addEventListener("pointerleave",c),n.addEventListener("contextmenu",d=>d.preventDefault())}},rt={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},ot=36160,at=36009,it=(e,t={})=>{const r=new Map;let o=null,l=null;const s=n=>{if(n==null)return null;const a=typeof n;if(a==="number"||a==="string"||a==="boolean")return n;if(Array.isArray(n))return n.map(s);if(typeof n!="object")return n;const i=n;if("__netgl_handle"in i){const c=i.__netgl_handle,d=r.get(c);if(d===void 0)throw new Error(`NetGL replay: unknown handle id ${c}`);return d}if("__netgl_typedarray"in i){const c=i.__netgl_typedarray,d=rt[c];if(!d)throw new Error(`NetGL replay: unknown typed-array ${c}`);return new d(i.buffer,i.offset,i.length)}if("__netgl_arraybuffer"in i)return i.__netgl_arraybuffer;if("__netgl_imagedata"in i){const c=i.width,d=i.height,w=i.buffer,h=new Uint8ClampedArray(w);return new ImageData(h,c,d)}throw new Error("NetGL replay: unknown encoded value shape")};return n=>{let a;try{a=n.args.map(s)}catch(w){const h=w instanceof Error?w.message:String(w);throw new Error(`NetGL replay (decoding ${n.name}): ${h}`)}let i=!1;if(n.name==="bindFramebuffer"){const w=a[0];if(w===ot||w===at){const h=a[1];h!==o&&(i=!0),o=h}}if(n.name==="viewport"){const[w,h,m,y]=a;if(l=[w,h,m,y],o===null&&t.remapScreenViewport){const u=t.remapScreenViewport(w,h,m,y);u!==null&&(a=[u[0],u[1],u[2],u[3]])}}if(t.__debugTraceViewport&&(n.name==="viewport"||n.name==="scissor"||n.name==="enable"||n.name==="disable"))if(n.name==="enable"||n.name==="disable")a[0]===3089&&t.__debugTraceViewport(`${n.name}(SCISSOR_TEST) drawFb=${o?"RT":"null"}`);else{const[w,h,m,y]=a;t.__debugTraceViewport(`${n.name}(${w},${h},${m}x${y}) drawFb=${o?"RT":"null"}`)}const c=e[n.name];if(typeof c!="function")throw new Error(`NetGL replay: receiver has no method '${n.name}'`);const d=c.apply(e,a);if(i&&l){const[w,h,m,y]=l,u=o===null&&t.remapScreenViewport?t.remapScreenViewport(w,h,m,y):null,_=u?u[0]:w,x=u?u[1]:h,E=u?u[2]:m,D=u?u[3]:y;e.viewport(_,x,E,D),t.__debugTraceViewport&&t.__debugTraceViewport(`post-bind re-issue viewport(${_},${x},${E}x${D}) drawFb=${o?"RT":"null"}`)}n.returnId!==void 0&&d!=null&&typeof d=="object"&&r.set(n.returnId,d)}},st=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",lt=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end";Je("netgl");const fe=document.querySelector("#app");if(!fe)throw new Error("Missing #app");const $=document.querySelector("#target-iframe");if(!$)throw new Error("Missing #target-iframe");const f=new Re({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});f.outputColorSpace=Ce;f.toneMapping=Fe;f.setPixelRatio(Math.min(window.devicePixelRatio,2));f.setSize(window.innerWidth,window.innerHeight);f.autoClear=!1;fe.appendChild(f.domElement);const b=new Te(70,window.innerWidth/window.innerHeight,.02,200);b.position.set(0,1.6,5.5);const v=new le;v.background=new S("#101826");v.add(new We(12176639,2241348,1));const me=new ze(16777215,.65);me.position.set(3,6,2);v.add(me);const ge=new W(new Q(18,18),new de({color:"#1b2a3f",roughness:.95,metalness:.03}));ge.rotation.x=-Math.PI/2;v.add(ge);const ct=new De(.9,.9,.9),dt=new de({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new W(ct,dt);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),v.add(t)}const pt=new se(2.6,3.2),z=He(pt);z.position.set(0,1.6,-3.5);v.add(z);const re=Qe({scene:v,anchor:z}),N=Ve(),ut=f.getContext(),wt=it(ut);let ye=!1,j=null;const be=new S("#220d17"),ve=Oe({output:$.contentWindow,inputFilter:$.contentWindow});let K=[],U=null,oe=null;ve.onMessage(e=>{if(lt(e)){U=K,K=[];return}if(st(e)){K.push(e);return}const t=e;t&&t.type==="netgl:ready"&&(j=t.anchor,be.setRGB(t.background.r,t.background.g,t.background.b),ye=!0)});const ht=et(b,f.domElement),ft=()=>{const e=window.innerWidth,t=window.innerHeight;f.setSize(e,t),b.aspect=e/t,b.updateProjectionMatrix()};window.addEventListener("resize",ft);const ae=new Be,ie=new S,C=new p,F=new p,T=new p,xe=()=>{const e=ae.getDelta(),t=ae.elapsedTime;if(ht.update(e),f.resetState(),f.setRenderTarget(null),f.clear(!0,!0,!0),re.renderAsSource(f,b),ye&&j){ie.copy(be),N.update(z,b,ie),f.render(N.scene,N.camera),f.clearDepth();let r=U;if(r?(U=null,oe=r):r=oe,r){for(let i=0;i<r.length;i+=1)wt(r[i]);f.resetState()}b.getWorldPosition(C),F.set(0,0,-1).applyQuaternion(b.quaternion),T.set(0,1,0).applyQuaternion(b.quaternion);const o=Ge({position:[C.x,C.y,C.z],forward:[F.x,F.y,F.z],up:[T.x,T.y,T.z]},{source:re.getAnchor(),target:j}),l=Array.from(b.projectionMatrix.elements),s=f.getPixelRatio(),n=Math.max(1,Math.floor(window.innerWidth*s)),a=Math.max(1,Math.floor(window.innerHeight*s));ve.post({type:"netgl:setPose",pose:o,projection:l,viewport:{width:n,height:a},time:t})}requestAnimationFrame(xe)};xe();
