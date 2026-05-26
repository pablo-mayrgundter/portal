import{V as w,M as he,Q as we,E as K,W as me,S as be,N as ye,P as xe,a as ve,C as B,H as Ee,D as ke,b as re,c as Ae,d as oe,B as Le,m as Me,e as _e,w as Pe,f as Re,g as Se,h as Te}from"./index-C07WEOM6.js";const G=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],Ie=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],N=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],F=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],H=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],k=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},$=e=>{const t=k(e.normal),n=k(e.up),r=k(H(n,t)),i=k(H(t,r));return{right:r,up:i,normal:t}},ae=(e,t)=>[F(e,t.right),F(e,t.up),F(e,t.normal)],se=(e,t)=>G(G(N(t.right,e[0]),N(t.up,e[1])),N(t.normal,e[2])),ie=e=>[-e[0],e[1],-e[2]],j=(e,t,n)=>k(se(ie(ae(e,t)),n)),Ne=(e,t)=>{const n=$(t.source),r=$(t.target),i=Ie(e.position,t.source.position),o=ae(i,n),a=ie(o),s={position:G(t.target.position,se(a,r))};return e.forward&&(s.forward=j(e.forward,n,r)),e.up&&(s.up=j(e.up,n,r)),s},Fe=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."}],Ce=`
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
`,Oe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Y='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',De=(e,t)=>{const n=e==="three";return t==="three"?n?".":"..":n?`${t}/`:`../${t}/`},q=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Ge=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Ce,document.head.appendChild(t);const n=document.createElement("aside");n.id="portal-nav-drawer",n.setAttribute("aria-hidden","false"),n.setAttribute("aria-label","Portal demos"),n.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Fe.map(o=>`
        <li${o.key===e?' class="portal-nav-current"':""}>
          <a href="${De(e,o.key)}"${o.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${q(o.label)}</span>
            <span class="portal-nav-desc">${q(o.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=Y,document.body.appendChild(n),document.body.appendChild(r);const i=o=>{n.setAttribute("aria-hidden",o?"false":"true"),r.setAttribute("aria-expanded",o?"true":"false"),r.setAttribute("aria-label",o?"Close demos menu":"Toggle demos menu"),r.innerHTML=o?Y:Oe};r.addEventListener("click",o=>{o.stopPropagation(),i(n.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",o=>{n.getAttribute("aria-hidden")==="true"||o.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||i(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&n.getAttribute("aria-hidden")==="false"&&i(!1)})},Be=(e,t,n={})=>{const r=n.moveSpeed??4,i=n.lookSensitivity??.0025;let o=0,a=0;const s=new Set;ze(t,(g,I)=>{o-=g*i,a-=I*i,a=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a))}),window.addEventListener("keydown",g=>s.add(g.code)),window.addEventListener("keyup",g=>s.delete(g.code)),Ue(s);const c=new w,f=new w,b=new w,S=g=>{e.quaternion.setFromEuler(new K(a,o,0,"YXZ")),f.set(0,0,-1).applyQuaternion(e.quaternion),b.set(1,0,0).applyQuaternion(e.quaternion),c.set(0,0,0),s.has("KeyW")&&c.add(f),s.has("KeyS")&&c.sub(f),s.has("KeyD")&&c.add(b),s.has("KeyA")&&c.sub(b),c.y=0,c.lengthSq()>0&&(c.normalize().multiplyScalar(r*g),e.position.add(c))},v=new he,p=new we,d=new K(0,0,0,"YXZ"),E=new w(0,0,0),m=new w,T=new w(0,1,0);return{update:S,setOrientationFromForward:g=>{m.copy(g).normalize(),v.lookAt(E,m,T),p.setFromRotationMatrix(v),d.setFromQuaternion(p,"YXZ"),a=d.x,o=d.y},clearKeys:()=>{s.clear()},getKeys:()=>Array.from(s),setKeys:g=>{s.clear();for(const I of g)s.add(I)}}},ze=(e,t)=>{let n=null,r=0,i=0;e.addEventListener("pointerdown",a=>{if(n===null&&(n=a.pointerId,r=a.clientX,i=a.clientY,a.pointerType!=="mouse"))try{e.setPointerCapture(a.pointerId)}catch{}});const o=a=>{a.pointerId===n&&(n=null)};window.addEventListener("pointerup",o),window.addEventListener("pointercancel",o),window.addEventListener("pointermove",a=>{if(a.pointerId!==n)return;const s=a.clientX-r,c=a.clientY-i;r=a.clientX,i=a.clientY,t(s,c)})},Ue=e=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement controls"),n.innerHTML=`
    <button type="button" data-key="KeyW" class="wasd-btn wasd-up" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-down" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
  `;const r=document.createElement("style");r.textContent=`
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
  `,document.head.appendChild(r),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const o=i.dataset.key,a=c=>{c.preventDefault(),c.stopPropagation(),e.add(o),i.classList.add("is-active");try{i.setPointerCapture(c.pointerId)}catch{}},s=c=>{c.stopPropagation(),e.delete(o),i.classList.remove("is-active")};i.addEventListener("pointerdown",a),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s),i.addEventListener("pointerleave",s),i.addEventListener("contextmenu",c=>c.preventDefault())}},Ve={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},We=e=>{const t=new Map,n=r=>{if(r==null)return null;const i=typeof r;if(i==="number"||i==="string"||i==="boolean")return r;if(Array.isArray(r))return r.map(n);if(typeof r!="object")return r;const o=r;if("__netgl_handle"in o){const a=o.__netgl_handle,s=t.get(a);if(s===void 0)throw new Error(`NetGL replay: unknown handle id ${a}`);return s}if("__netgl_typedarray"in o){const a=o.__netgl_typedarray,s=Ve[a];if(!s)throw new Error(`NetGL replay: unknown typed-array ${a}`);return new s(o.buffer,o.offset,o.length)}if("__netgl_arraybuffer"in o)return o.__netgl_arraybuffer;throw new Error("NetGL replay: unknown encoded value shape")};return r=>{const i=r.args.map(n),o=e[r.name];if(typeof o!="function")throw new Error(`NetGL replay: receiver has no method '${r.name}'`);const a=o.apply(e,i);r.returnId!==void 0&&a!=null&&typeof a=="object"&&t.set(r.returnId,a)}};Ge("netgl");const le=document.querySelector("#app");if(!le)throw new Error("Missing #app");const P=document.querySelector("#target-iframe");if(!P)throw new Error("Missing #target-iframe");const Ke=new URLSearchParams(location.search),X=Ke.get("log")==="1";location.search&&(P.src=`target.html${location.search}`);const u=new me({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});u.outputColorSpace=be;u.toneMapping=ye;u.setPixelRatio(Math.min(window.devicePixelRatio,2));u.setSize(window.innerWidth,window.innerHeight);u.autoClear=!1;le.appendChild(u.domElement);const h=new xe(70,window.innerWidth/window.innerHeight,.02,200);h.position.set(0,1.6,5.5);const x=new ve;x.background=new B("#101826");x.add(new Ee(12176639,2241348,1));const ce=new ke(16777215,.65);ce.position.set(3,6,2);x.add(ce);const de=new re(new Ae(18,18),new oe({color:"#1b2a3f",roughness:.95,metalness:.03}));de.rotation.x=-Math.PI/2;x.add(de);const He=new Le(.9,.9,.9),$e=new oe({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new re(He,$e);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),x.add(t)}const je=new Re(2.6,3.2),R=Me(je);R.position.set(0,1.6,-3.5);x.add(R);const Q=Te({scene:x,anchor:R}),C=_e(),l=u.getContext(),Z=We(l);let pe=!1,M=null;const ue=new B("#220d17"),ge=Pe({output:P.contentWindow,inputFilter:P.contentWindow});let O=[],_=null;ge.onMessage(e=>{if(!e||typeof e!="object")return;const t=e;if("type"in t){if(t.type==="netgl:ready"){const n=t;M=n.anchor,ue.setRGB(n.background.r,n.background.g,n.background.b),pe=!0;return}if(t.type==="netgl:frame-end"){_=O,O=[];return}}"name"in t&&typeof t.name=="string"&&O.push(t)});const Ye=Be(h,u.domElement),qe=()=>{const e=window.innerWidth,t=window.innerHeight;u.setSize(e,t),h.aspect=e/t,h.updateProjectionMatrix()};window.addEventListener("resize",qe);const J=new Se,ee=new B,y=new w,A=new w,L=new w;let D=0,te=0,ne=0;const fe=()=>{const e=J.getDelta(),t=J.elapsedTime;if(Ye.update(e),u.resetState(),u.setRenderTarget(null),u.clear(!0,!0,!0),Q.renderAsSource(u,h),pe&&M){if(ee.copy(ue),C.update(R,h,ee),u.render(C.scene,C.camera),u.clearDepth(),_){const s=_;if(_=null,ne=s.length,X){const c=p=>p===l.NO_ERROR?"NO_ERROR":p===l.INVALID_ENUM?"INVALID_ENUM":p===l.INVALID_VALUE?"INVALID_VALUE":p===l.INVALID_OPERATION?"INVALID_OPERATION":p===l.INVALID_FRAMEBUFFER_OPERATION?"INVALID_FRAMEBUFFER_OPERATION":p===l.OUT_OF_MEMORY?"OUT_OF_MEMORY":p===l.CONTEXT_LOST_WEBGL?"CONTEXT_LOST_WEBGL":"UNKNOWN("+p+")";let f=null;const b={},S=new Set(["viewport","scissor","bindFramebuffer","useProgram","bindVertexArray","drawArrays","drawElements","colorMask","depthMask","depthFunc","stencilMask","stencilFunc","enable","disable"]),v={};for(let p=0;p<s.length;p+=1){const d=s[p];if(b[d.name]=(b[d.name]??0)+1,S.has(d.name)&&!(d.name in v)&&(v[d.name]=d.args),Z(d),!f){const E=l.getError();E!==l.NO_ERROR&&(f={call:d,code:E})}}if(f&&console.warn("[host] replay GL error:",c(f.code),"on call:",f.call.name,"args:",f.call.args),t-D>.99){console.log("[host] drain calls:",b),console.log("[host] first args:",v);const p=l.getParameter(l.FRAMEBUFFER_BINDING),d=l.getParameter(l.VIEWPORT),E=l.getParameter(l.CURRENT_PROGRAM),m=l.getParameter(l.COLOR_WRITEMASK),T=l.getParameter(l.STENCIL_TEST),z=l.getParameter(l.STENCIL_FUNC),U=l.getParameter(l.STENCIL_REF),V=l.getParameter(l.STENCIL_VALUE_MASK),W=l.getParameter(l.DEPTH_TEST),g=l.getParameter(l.DEPTH_FUNC);console.log("[host] post-drain GL state:",{framebuffer:p?"non-null":"null",viewport:d?[d[0],d[1],d[2],d[3]]:null,currentProgram:E?"non-null":"null",colorMask:m?[m[0],m[1],m[2],m[3]]:null,stencilTest:T,stencilFunc:"0x"+z?.toString(16),stencilRef:U,stencilValueMask:"0x"+V?.toString(16),depthTest:W,depthFunc:"0x"+g?.toString(16)})}}else for(let c=0;c<s.length;c+=1)Z(s[c]);u.resetState()}h.getWorldPosition(y),A.set(0,0,-1).applyQuaternion(h.quaternion),L.set(0,1,0).applyQuaternion(h.quaternion);const n=Ne({position:[y.x,y.y,y.z],forward:[A.x,A.y,A.z],up:[L.x,L.y,L.z]},{source:Q.getAnchor(),target:M}),r=Array.from(h.projectionMatrix.elements),i=u.getPixelRatio(),o=Math.max(1,Math.floor(window.innerWidth*i)),a=Math.max(1,Math.floor(window.innerHeight*i));if(ge.post({type:"netgl:setPose",pose:n,projection:r,viewport:{width:o,height:a},time:t}),te+=1,X&&t-D>1){D=t;const s=c=>`[${c.map(f=>f.toFixed(2)).join(", ")}]`;console.log("[host] setPose#"+te,"host pos:",s([y.x,y.y,y.z]),"coupled pos:",s(n.position),"coupled fwd:",s(n.forward??[0,0,-1]),"viewport:",o+"x"+a,"lastDrain:",ne+" calls","iframeAnchor:",M)}}requestAnimationFrame(fe)};fe();
