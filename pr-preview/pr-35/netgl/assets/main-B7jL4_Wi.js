import{V as ae,P as I,M as xe,a as z,b as c,c as v,S as ke,R as Pe,K as k,A as Me,D as Se,d as re,O as Ee,Q,C as P,e as Le,f as ie,E as Ce,g as O,W as Re,h as Ae,N as We,i as ze,H as Fe,j as Te,k as se,B as He,m as Ke,l as Be}from"./three-helpers-CkbvigCr.js";const j=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],De=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],W=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],H=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],U=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],x=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},Y=e=>{const t=x(e.normal),o=x(e.up),n=x(U(o,t)),s=x(U(t,n));return{right:n,up:s,normal:t}},le=(e,t)=>[H(e,t.right),H(e,t.up),H(e,t.normal)],ce=(e,t)=>j(j(W(t.right,e[0]),W(t.up,e[1])),W(t.normal,e[2])),de=e=>[-e[0],e[1],-e[2]],X=(e,t,o)=>x(ce(de(le(e,t)),o)),je=(e,t)=>{const o=Y(t.source),n=Y(t.target),s=De(e.position,t.source.position),a=le(s,o),i=W(de(a),t.scale??1),r={position:j(t.target.position,ce(i,n))};return e.forward&&(r.forward=X(e.forward,o,n)),e.up&&(r.up=X(e.up,o,n)),r};new Le;new c;new ie;new ie;const _e=(e=new ae(2,3))=>{const t=new I(e.x,e.y),o=new xe({visible:!1}),n=new z(t,o);return n.name="portal-plane",n.userData.portalSize=e.clone(),n},Ne=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Ge=`
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
`,V=1,Ie=(e=V)=>{const t={portalPos:{value:new c},portalNormal:{value:new c},portalRight:{value:new c},portalUp:{value:new c},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new c},hostInverseViewProjection:{value:new v},hostViewMatrix:{value:new v},hostProjectionMatrix:{value:new v},destinationBackground:{value:new c(0,0,0)}},o=new ke({uniforms:t,vertexShader:Ne,fragmentShader:Ge,depthTest:!0,depthWrite:!1,side:Se,stencilWrite:!0,stencilFunc:Me,stencilRef:e,stencilFail:k,stencilZFail:k,stencilZPass:Pe,stencilWriteMask:255}),n=new z(new I(2,2),o);n.frustumCulled=!1;const s=new re;s.add(n);const a=new Ee(-1,1,1,-1,0,1),i=new v,r=new c(0,0,1),l=new c(1,0,0),u=new c(0,1,0),h=new Q;return{scene:s,camera:a,update:(y,g,b)=>{const m=y.userData.portalSize;t.portalHalfW.value=m?m.x/2:1,t.portalHalfH.value=m?m.y/2:1.5,y.getWorldPosition(t.portalPos.value),y.getWorldQuaternion(h),t.portalNormal.value.copy(r).applyQuaternion(h),t.portalRight.value.copy(l).applyQuaternion(h),t.portalUp.value.copy(u).applyQuaternion(h),g.getWorldPosition(t.hostCameraPos.value),i.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse),t.hostInverseViewProjection.value.copy(i).invert(),t.hostViewMatrix.value.copy(g.matrixWorldInverse),t.hostProjectionMatrix.value.copy(g.projectionMatrix),t.destinationBackground.value.set(b.r,b.g,b.b)}}},pe=(e,t)=>{e.traverse(o=>{const n=o;if(!n.isMesh||!n.material)return;const s=Array.isArray(n.material)?n.material:[n.material];for(const a of s)t(a)})},Qe=(e,t=V)=>{pe(e,o=>{o.stencilWrite=!0,o.stencilFunc=Ce,o.stencilRef=t,o.stencilFail=k,o.stencilZFail=k,o.stencilZPass=k,o.stencilWriteMask=0})},Ve=e=>{pe(e,t=>{t.stencilWrite=!1})};new c;const K=new Q,S=new c,E=new c,L=new c,qe=(e,t)=>t||(e.background instanceof P?e.background:new P(0,0,0)),Oe=e=>{const{scene:t,anchor:o}=e,n=e.portalNormal??new c(0,0,1),s=e.stencilRef??V;return{scene:t,anchor:o,getAnchor:()=>{o.getWorldPosition(S),o.getWorldQuaternion(K),E.copy(n).applyQuaternion(K).normalize(),L.set(0,1,0).applyQuaternion(K).normalize();const r=o.userData.portalSize;return{position:[S.x,S.y,S.z],normal:[E.x,E.y,E.z],up:[L.x,L.y,L.z],halfWidth:r?r.x/2:void 0,halfHeight:r?r.y/2:void 0}},getBackground:()=>{const r=qe(t,e.background);return{r:r.r,g:r.g,b:r.b}},tick:e.tick,renderAsSource(r,l){r.render(t,l)},renderAsDestination(r,l){const u=t.background;t.background=null,Qe(t,s),r.render(t,l),Ve(t),t.background=u}}},Ue=e=>{const t=e.outputOrigin??"*",o=e.inputFilter??null;return{post(n,s){e.output.postMessage(n,t,s??[])},onMessage(n){const s=a=>{if(o!==null&&a.source!==o)return;const i=a.data;!i||typeof i!="object"||n(i)};return window.addEventListener("message",s),()=>window.removeEventListener("message",s)}}},Ye=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."}],Xe=`
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
`,$e='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',$='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ze=(e,t)=>{const o=e==="three";return t==="three"?o?".":"..":o?`${t}/`:`../${t}/`},Z=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Je=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Xe,document.head.appendChild(t);const o=document.createElement("aside");o.id="portal-nav-drawer",o.setAttribute("aria-hidden","false"),o.setAttribute("aria-label","Portal demos"),o.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Ye.map(a=>`
        <li${a.key===e?' class="portal-nav-current"':""}>
          <a href="${Ze(e,a.key)}"${a.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${Z(a.label)}</span>
            <span class="portal-nav-desc">${Z(a.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const n=document.createElement("button");n.id="portal-nav-toggle",n.type="button",n.setAttribute("aria-label","Close demos menu"),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-controls","portal-nav-drawer"),n.innerHTML=$,document.body.appendChild(o),document.body.appendChild(n);const s=a=>{o.setAttribute("aria-hidden",a?"false":"true"),n.setAttribute("aria-expanded",a?"true":"false"),n.setAttribute("aria-label",a?"Close demos menu":"Toggle demos menu"),n.innerHTML=a?$:$e};n.addEventListener("click",a=>{a.stopPropagation(),s(o.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",a=>{o.getAttribute("aria-hidden")==="true"||a.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||s(!1)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&o.getAttribute("aria-hidden")==="false"&&s(!1)})},et=(e,t,o={})=>{const n=o.moveSpeed??4,s=o.lookSensitivity??.0025,a=o.lookKeySpeed??1.5;let i=0,r=0;const l=new Set;tt(t,(p,T)=>{i-=p*s,r-=T*s}),window.addEventListener("keydown",p=>l.add(p.code)),window.addEventListener("keyup",p=>l.delete(p.code)),nt(l);const u=new c,h=new c,M=new c,y=p=>{l.has("KeyQ")&&(i+=a*p),l.has("KeyE")&&(i-=a*p),l.has("KeyR")&&(r-=a*p),l.has("KeyF")&&(r+=a*p),r=ot(r),e.quaternion.setFromEuler(new O(r,i,0,"YXZ")),h.set(0,0,-1).applyQuaternion(e.quaternion),M.set(1,0,0).applyQuaternion(e.quaternion),u.set(0,0,0),l.has("KeyW")&&u.add(h),l.has("KeyS")&&u.sub(h),l.has("KeyD")&&u.add(M),l.has("KeyA")&&u.sub(M),u.y=0,u.lengthSq()>0&&(u.normalize().multiplyScalar(n*p),e.position.add(u))},g=new v,b=new Q,m=new O(0,0,0,"YXZ"),ye=new c(0,0,0),q=new c,ve=new c(0,1,0);return{update:y,setOrientationFromForward:p=>{q.copy(p).normalize(),g.lookAt(ye,q,ve),b.setFromRotationMatrix(g),m.setFromQuaternion(b,"YXZ"),r=m.x,i=m.y},clearKeys:()=>{l.clear()},getKeys:()=>Array.from(l),setKeys:p=>{l.clear();for(const T of p)l.add(T)}}},tt=(e,t)=>{let o=null,n=0,s=0;e.addEventListener("pointerdown",i=>{if(o===null&&(o=i.pointerId,n=i.clientX,s=i.clientY,i.pointerType!=="mouse"))try{e.setPointerCapture(i.pointerId)}catch{}});const a=i=>{i.pointerId===o&&(o=null)};window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a),window.addEventListener("pointermove",i=>{if(i.pointerId!==o)return;const r=i.clientX-n,l=i.clientY-s;n=i.clientX,s=i.clientY,t(r,l)})},ot=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),nt=e=>{if(typeof window>"u")return;const t="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,o=()=>t||window.innerWidth<500;if(o()){J(e);return}const n=()=>{o()&&(window.removeEventListener("resize",n),J(e))};window.addEventListener("resize",n)},J=e=>{const t=document.createElement("div");t.className="wasd-pad",t.setAttribute("aria-label","Movement and look controls"),t.innerHTML=`
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
  `,document.head.appendChild(o),document.body.appendChild(t);for(const n of t.querySelectorAll(".wasd-btn")){const s=n.dataset.key,a=r=>{r.preventDefault(),r.stopPropagation(),e.add(s),n.classList.add("is-active");try{n.setPointerCapture(r.pointerId)}catch{}},i=r=>{r.stopPropagation(),e.delete(s),n.classList.remove("is-active")};n.addEventListener("pointerdown",a),n.addEventListener("pointerup",i),n.addEventListener("pointercancel",i),n.addEventListener("pointerleave",i),n.addEventListener("contextmenu",r=>r.preventDefault())}},at=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",rt=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end";Je("netgl");const ue=document.querySelector("#app");if(!ue)throw new Error("Missing #app");const _=document.querySelector("#target-iframe");if(!_)throw new Error("Missing #target-iframe");const d=new Re({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});d.outputColorSpace=Ae;d.toneMapping=We;d.setPixelRatio(Math.min(window.devicePixelRatio,2));d.setSize(window.innerWidth,window.innerHeight);d.autoClear=!1;ue.appendChild(d.domElement);const w=new ze(70,window.innerWidth/window.innerHeight,.02,200);w.position.set(0,1.6,5.5);const f=new re;f.background=new P("#101826");f.add(new Fe(12176639,2241348,1));const we=new Te(16777215,.65);we.position.set(3,6,2);f.add(we);const he=new z(new I(18,18),new se({color:"#1b2a3f",roughness:.95,metalness:.03}));he.rotation.x=-Math.PI/2;f.add(he);const it=new He(.9,.9,.9),st=new se({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new z(it,st);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),f.add(t)}const lt=new ae(2.6,3.2),F=_e(lt);F.position.set(0,1.6,-3.5);f.add(F);const ee=Oe({scene:f,anchor:F}),B=Ie(),ct=d.getContext(),dt=Ke(ct);let ge=!1,N=null;const me=new P("#220d17"),fe=Ue({output:_.contentWindow,inputFilter:_.contentWindow});let D=[],G=null,te=null;fe.onMessage(e=>{if(rt(e)){G=D,D=[];return}if(at(e)){D.push(e);return}const t=e;t&&t.type==="netgl:ready"&&(N=t.anchor,me.setRGB(t.background.r,t.background.g,t.background.b),ge=!0)});const pt=et(w,d.domElement),ut=()=>{const e=window.innerWidth,t=window.innerHeight;d.setSize(e,t),w.aspect=e/t,w.updateProjectionMatrix()};window.addEventListener("resize",ut);const oe=new Be,ne=new P,C=new c,R=new c,A=new c,be=()=>{const e=oe.getDelta(),t=oe.elapsedTime;if(pt.update(e),d.resetState(),d.setRenderTarget(null),d.clear(!0,!0,!0),ee.renderAsSource(d,w),ge&&N){ne.copy(me),B.update(F,w,ne),d.render(B.scene,B.camera),d.clearDepth();let o=G;if(o?(G=null,te=o):o=te,o){for(let l=0;l<o.length;l+=1)dt(o[l]);d.resetState()}w.getWorldPosition(C),R.set(0,0,-1).applyQuaternion(w.quaternion),A.set(0,1,0).applyQuaternion(w.quaternion);const n=je({position:[C.x,C.y,C.z],forward:[R.x,R.y,R.z],up:[A.x,A.y,A.z]},{source:ee.getAnchor(),target:N}),s=Array.from(w.projectionMatrix.elements),a=d.getPixelRatio(),i=Math.max(1,Math.floor(window.innerWidth*a)),r=Math.max(1,Math.floor(window.innerHeight*a));fe.post({type:"netgl:setPose",pose:n,projection:s,viewport:{width:i,height:r},time:t})}requestAnimationFrame(be)};be();
