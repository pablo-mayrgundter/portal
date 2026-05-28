import{V as ie,P as O,M as xe,a as T,b as c,c as k,S as ke,R as Me,K as P,A as Pe,D as Se,d as se,O as _e,Q,C as S,e as Ee,f as le,E as Ae,g as Y,W as Le,h as Re,N as Ce,i as Fe,H as Te,j as We,k as ce,B as ze,l as De}from"./three-helpers-WAzysoi4.js";const j=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],Be=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],I=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],G=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],X=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],M=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},Z=e=>{const t=M(e.normal),n=M(e.up),o=M(X(n,t)),s=M(X(t,o));return{right:o,up:s,normal:t}},de=(e,t)=>[G(e,t.right),G(e,t.up),G(e,t.normal)],pe=(e,t)=>j(j(I(t.right,e[0]),I(t.up,e[1])),I(t.normal,e[2])),ue=e=>[-e[0],e[1],-e[2]],J=(e,t,n)=>M(pe(ue(de(e,t)),n)),Ie=(e,t)=>{const n=Z(t.source),o=Z(t.target),s=Be(e.position,t.source.position),l=de(s,n),r=ue(l),a={position:j(t.target.position,pe(r,o))};return e.forward&&(a.forward=J(e.forward,n,o)),e.up&&(a.up=J(e.up,n,o)),a};new Ee;new c;new le;new le;const Ge=(e=new ie(2,3))=>{const t=new O(e.x,e.y),n=new xe({visible:!1}),o=new T(t,n);return o.name="portal-plane",o.userData.portalSize=e.clone(),o},He=`
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
`,q=1,$e=(e=q)=>{const t={portalPos:{value:new c},portalNormal:{value:new c},portalRight:{value:new c},portalUp:{value:new c},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new c},hostInverseViewProjection:{value:new k},hostViewMatrix:{value:new k},hostProjectionMatrix:{value:new k},destinationBackground:{value:new c(0,0,0)}},n=new ke({uniforms:t,vertexShader:He,fragmentShader:Ne,depthTest:!0,depthWrite:!1,side:Se,stencilWrite:!0,stencilFunc:Pe,stencilRef:e,stencilFail:P,stencilZFail:P,stencilZPass:Me,stencilWriteMask:255}),o=new T(new O(2,2),n);o.frustumCulled=!1;const s=new se;s.add(o);const l=new _e(-1,1,1,-1,0,1),r=new k,a=new c(0,0,1),i=new c(1,0,0),h=new c(0,1,0),u=new Q;return{scene:s,camera:l,update:(d,m,g)=>{const p=d.userData.portalSize;t.portalHalfW.value=p?p.x/2:1,t.portalHalfH.value=p?p.y/2:1.5,d.getWorldPosition(t.portalPos.value),d.getWorldQuaternion(u),t.portalNormal.value.copy(a).applyQuaternion(u),t.portalRight.value.copy(i).applyQuaternion(u),t.portalUp.value.copy(h).applyQuaternion(u),m.getWorldPosition(t.hostCameraPos.value),r.multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse),t.hostInverseViewProjection.value.copy(r).invert(),t.hostViewMatrix.value.copy(m.matrixWorldInverse),t.hostProjectionMatrix.value.copy(m.projectionMatrix),t.destinationBackground.value.set(g.r,g.g,g.b)}}},we=(e,t)=>{e.traverse(n=>{const o=n;if(!o.isMesh||!o.material)return;const s=Array.isArray(o.material)?o.material:[o.material];for(const l of s)t(l)})},je=(e,t=q)=>{we(e,n=>{n.stencilWrite=!0,n.stencilFunc=Ae,n.stencilRef=t,n.stencilFail=P,n.stencilZFail=P,n.stencilZPass=P,n.stencilWriteMask=0})},Ve=e=>{we(e,t=>{t.stencilWrite=!1})};new c;const H=new Q,E=new c,A=new c,L=new c,Ue=(e,t)=>t||(e.background instanceof S?e.background:new S(0,0,0)),Ke=e=>{const{scene:t,anchor:n}=e,o=e.portalNormal??new c(0,0,1),s=e.stencilRef??q;return{scene:t,anchor:n,getAnchor:()=>{n.getWorldPosition(E),n.getWorldQuaternion(H),A.copy(o).applyQuaternion(H).normalize(),L.set(0,1,0).applyQuaternion(H).normalize();const a=n.userData.portalSize;return{position:[E.x,E.y,E.z],normal:[A.x,A.y,A.z],up:[L.x,L.y,L.z],halfWidth:a?a.x/2:void 0,halfHeight:a?a.y/2:void 0}},getBackground:()=>{const a=Ue(t,e.background);return{r:a.r,g:a.g,b:a.b}},tick:e.tick,renderAsSource(a,i){a.render(t,i)},renderAsDestination(a,i){const h=t.background;t.background=null,je(t,s),a.render(t,i),Ve(t),t.background=h}}},Oe=e=>{const t=e.outputOrigin??"*",n=e.inputFilter??null;return{post(o,s){e.output.postMessage(o,t,s??[])},onMessage(o){const s=l=>{if(n!==null&&l.source!==n)return;const r=l.data;!r||typeof r!="object"||o(r)};return window.addEventListener("message",s),()=>window.removeEventListener("message",s)}}},Qe=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],qe=`
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
`,Ye='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',ee='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Xe=(e,t)=>{const n=e==="three";return t==="three"?n?".":"..":n?`${t}/`:`../${t}/`},te=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Ze=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=qe,document.head.appendChild(t);const n=document.createElement("aside");n.id="portal-nav-drawer",n.setAttribute("aria-hidden","false"),n.setAttribute("aria-label","Portal demos"),n.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Qe.map(l=>`
        <li${l.key===e?' class="portal-nav-current"':""}>
          <a href="${Xe(e,l.key)}"${l.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${te(l.label)}</span>
            <span class="portal-nav-desc">${te(l.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const o=document.createElement("button");o.id="portal-nav-toggle",o.type="button",o.setAttribute("aria-label","Close demos menu"),o.setAttribute("aria-expanded","true"),o.setAttribute("aria-controls","portal-nav-drawer"),o.innerHTML=ee,document.body.appendChild(n),document.body.appendChild(o);const s=l=>{n.setAttribute("aria-hidden",l?"false":"true"),o.setAttribute("aria-expanded",l?"true":"false"),o.setAttribute("aria-label",l?"Close demos menu":"Toggle demos menu"),o.innerHTML=l?ee:Ye};o.addEventListener("click",l=>{l.stopPropagation(),s(n.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",l=>{n.getAttribute("aria-hidden")==="true"||l.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||s(!1)}),document.addEventListener("keydown",l=>{l.key==="Escape"&&n.getAttribute("aria-hidden")==="false"&&s(!1)})},Je=(e,t,n={})=>{const o=n.moveSpeed??4,s=n.lookSensitivity??.0025;let l=0,r=0;const a=new Set;et(t,(y,B)=>{l-=y*s,r-=B*s,r=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,r))}),window.addEventListener("keydown",y=>a.add(y.code)),window.addEventListener("keyup",y=>a.delete(y.code)),tt(a);const i=new c,h=new c,u=new c,w=y=>{e.quaternion.setFromEuler(new Y(r,l,0,"YXZ")),h.set(0,0,-1).applyQuaternion(e.quaternion),u.set(1,0,0).applyQuaternion(e.quaternion),i.set(0,0,0),a.has("KeyW")&&i.add(h),a.has("KeyS")&&i.sub(h),a.has("KeyD")&&i.add(u),a.has("KeyA")&&i.sub(u),i.y=0,i.lengthSq()>0&&(i.normalize().multiplyScalar(o*y),e.position.add(i))},d=new k,m=new Q,g=new Y(0,0,0,"YXZ"),p=new c(0,0,0),x=new c,_=new c(0,1,0);return{update:w,setOrientationFromForward:y=>{x.copy(y).normalize(),d.lookAt(p,x,_),m.setFromRotationMatrix(d),g.setFromQuaternion(m,"YXZ"),r=g.x,l=g.y},clearKeys:()=>{a.clear()},getKeys:()=>Array.from(a),setKeys:y=>{a.clear();for(const B of y)a.add(B)}}},et=(e,t)=>{let n=null,o=0,s=0;e.addEventListener("pointerdown",r=>{if(n===null&&(n=r.pointerId,o=r.clientX,s=r.clientY,r.pointerType!=="mouse"))try{e.setPointerCapture(r.pointerId)}catch{}});const l=r=>{r.pointerId===n&&(n=null)};window.addEventListener("pointerup",l),window.addEventListener("pointercancel",l),window.addEventListener("pointermove",r=>{if(r.pointerId!==n)return;const a=r.clientX-o,i=r.clientY-s;o=r.clientX,s=r.clientY,t(a,i)})},tt=e=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement controls"),n.innerHTML=`
    <button type="button" data-key="KeyW" class="wasd-btn wasd-up" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-down" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
  `;const o=document.createElement("style");o.textContent=`
    .wasd-pad {
      position: fixed;
      left: 16px;
      bottom: 16px;
      width: 168px;
      height: 168px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
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
    .wasd-up    { grid-column: 2; grid-row: 1; }
    .wasd-left  { grid-column: 1; grid-row: 2; }
    .wasd-down  { grid-column: 2; grid-row: 2; }
    .wasd-right { grid-column: 3; grid-row: 2; }
  `,document.head.appendChild(o),document.body.appendChild(n);for(const s of n.querySelectorAll(".wasd-btn")){const l=s.dataset.key,r=i=>{i.preventDefault(),i.stopPropagation(),e.add(l),s.classList.add("is-active");try{s.setPointerCapture(i.pointerId)}catch{}},a=i=>{i.stopPropagation(),e.delete(l),s.classList.remove("is-active")};s.addEventListener("pointerdown",r),s.addEventListener("pointerup",a),s.addEventListener("pointercancel",a),s.addEventListener("pointerleave",a),s.addEventListener("contextmenu",i=>i.preventDefault())}},nt={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},rt=36160,ot=36009,at=(e,t={})=>{const n=new Map;let o=null,s=null;const l=r=>{if(r==null)return null;const a=typeof r;if(a==="number"||a==="string"||a==="boolean")return r;if(Array.isArray(r))return r.map(l);if(typeof r!="object")return r;const i=r;if("__netgl_handle"in i){const h=i.__netgl_handle,u=n.get(h);if(u===void 0)throw new Error(`NetGL replay: unknown handle id ${h}`);return u}if("__netgl_typedarray"in i){const h=i.__netgl_typedarray,u=nt[h];if(!u)throw new Error(`NetGL replay: unknown typed-array ${h}`);return new u(i.buffer,i.offset,i.length)}if("__netgl_arraybuffer"in i)return i.__netgl_arraybuffer;if("__netgl_imagedata"in i){const h=i.width,u=i.height,w=i.buffer,d=new Uint8ClampedArray(w);return new ImageData(d,h,u)}throw new Error("NetGL replay: unknown encoded value shape")};return r=>{let a;try{a=r.args.map(l)}catch(w){const d=w instanceof Error?w.message:String(w);throw new Error(`NetGL replay (decoding ${r.name}): ${d}`)}let i=!1;if(r.name==="bindFramebuffer"){const w=a[0];if(w===rt||w===ot){const d=a[1];d!==o&&(i=!0),o=d}}if(r.name==="viewport"){const[w,d,m,g]=a;if(s=[w,d,m,g],o===null&&t.remapScreenViewport){const p=t.remapScreenViewport(w,d,m,g);p!==null&&(a=[p[0],p[1],p[2],p[3]])}}if(t.__debugTraceViewport&&(r.name==="viewport"||r.name==="scissor"||r.name==="enable"||r.name==="disable"))if(r.name==="enable"||r.name==="disable")a[0]===3089&&t.__debugTraceViewport(`${r.name}(SCISSOR_TEST) drawFb=${o?"RT":"null"}`);else{const[w,d,m,g]=a;t.__debugTraceViewport(`${r.name}(${w},${d},${m}x${g}) drawFb=${o?"RT":"null"}`)}const h=e[r.name];if(typeof h!="function")throw new Error(`NetGL replay: receiver has no method '${r.name}'`);const u=h.apply(e,a);if(i&&s){const[w,d,m,g]=s,p=o===null&&t.remapScreenViewport?t.remapScreenViewport(w,d,m,g):null,x=p?p[0]:w,_=p?p[1]:d,z=p?p[2]:m,D=p?p[3]:g;e.viewport(x,_,z,D),t.__debugTraceViewport&&t.__debugTraceViewport(`post-bind re-issue viewport(${x},${_},${z}x${D}) drawFb=${o?"RT":"null"}`)}r.returnId!==void 0&&u!=null&&typeof u=="object"&&n.set(r.returnId,u)}},it=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",st=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end";Ze("netgl");const he=document.querySelector("#app");if(!he)throw new Error("Missing #app");const V=document.querySelector("#target-iframe");if(!V)throw new Error("Missing #target-iframe");const f=new Le({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});f.outputColorSpace=Re;f.toneMapping=Ce;f.setPixelRatio(Math.min(window.devicePixelRatio,2));f.setSize(window.innerWidth,window.innerHeight);f.autoClear=!1;he.appendChild(f.domElement);const b=new Fe(70,window.innerWidth/window.innerHeight,.02,200);b.position.set(0,1.6,5.5);const v=new se;v.background=new S("#101826");v.add(new Te(12176639,2241348,1));const fe=new We(16777215,.65);fe.position.set(3,6,2);v.add(fe);const me=new T(new O(18,18),new ce({color:"#1b2a3f",roughness:.95,metalness:.03}));me.rotation.x=-Math.PI/2;v.add(me);const lt=new ze(.9,.9,.9),ct=new ce({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new T(lt,ct);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),v.add(t)}const dt=new ie(2.6,3.2),W=Ge(dt);W.position.set(0,1.6,-3.5);v.add(W);const ne=Ke({scene:v,anchor:W}),N=$e(),pt=f.getContext(),ut=at(pt);let ge=!1,U=null;const ye=new S("#220d17"),be=Oe({output:V.contentWindow,inputFilter:V.contentWindow});let $=[],K=null,re=null;be.onMessage(e=>{if(st(e)){K=$,$=[];return}if(it(e)){$.push(e);return}const t=e;t&&t.type==="netgl:ready"&&(U=t.anchor,ye.setRGB(t.background.r,t.background.g,t.background.b),ge=!0)});const wt=Je(b,f.domElement),ht=()=>{const e=window.innerWidth,t=window.innerHeight;f.setSize(e,t),b.aspect=e/t,b.updateProjectionMatrix()};window.addEventListener("resize",ht);const oe=new De,ae=new S,R=new c,C=new c,F=new c,ve=()=>{const e=oe.getDelta(),t=oe.elapsedTime;if(wt.update(e),f.resetState(),f.setRenderTarget(null),f.clear(!0,!0,!0),ne.renderAsSource(f,b),ge&&U){ae.copy(ye),N.update(W,b,ae),f.render(N.scene,N.camera),f.clearDepth();let n=K;if(n?(K=null,re=n):n=re,n){for(let i=0;i<n.length;i+=1)ut(n[i]);f.resetState()}b.getWorldPosition(R),C.set(0,0,-1).applyQuaternion(b.quaternion),F.set(0,1,0).applyQuaternion(b.quaternion);const o=Ie({position:[R.x,R.y,R.z],forward:[C.x,C.y,C.z],up:[F.x,F.y,F.z]},{source:ne.getAnchor(),target:U}),s=Array.from(b.projectionMatrix.elements),l=f.getPixelRatio(),r=Math.max(1,Math.floor(window.innerWidth*l)),a=Math.max(1,Math.floor(window.innerHeight*l));be.post({type:"netgl:setPose",pose:o,projection:s,viewport:{width:r,height:a},time:t})}requestAnimationFrame(ve)};ve();
