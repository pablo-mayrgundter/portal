import{V as u,M as oe,Q as re,E as T,W as ae,S as ie,N as se,P as de,a as le,C,H as ce,D as pe,b as j,c as ue,d as q,B as we,m as ge,e as he,w as fe,f as me,g as be,h as ye}from"./index-BXhZkw9i.js";const L=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],ve=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],M=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],A=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],G=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],g=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},I=e=>{const t=g(e.normal),r=g(e.up),n=g(G(r,t)),i=g(G(t,n));return{right:n,up:i,normal:t}},$=(e,t)=>[A(e,t.right),A(e,t.up),A(e,t.normal)],N=(e,t)=>L(L(M(t.right,e[0]),M(t.up,e[1])),M(t.normal,e[2])),Y=e=>[-e[0],e[1],-e[2]],B=(e,t,r)=>g(N(Y($(e,t)),r)),xe=(e,t)=>{const r=I(t.source),n=I(t.target),i=ve(e.position,t.source.position),o=$(i,r),a=Y(o),s={position:L(t.target.position,N(a,n))};return e.forward&&(s.forward=B(e.forward,r,n)),e.up&&(s.up=B(e.up,r,n)),s},ke=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."}],Me=`
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
`,Ae='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',D='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ee=(e,t)=>{const r=e==="three";return t==="three"?r?".":"..":r?`${t}/`:`../${t}/`},F=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Le=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Me,document.head.appendChild(t);const r=document.createElement("aside");r.id="portal-nav-drawer",r.setAttribute("aria-hidden","false"),r.setAttribute("aria-label","Portal demos"),r.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${ke.map(o=>`
        <li${o.key===e?' class="portal-nav-current"':""}>
          <a href="${Ee(e,o.key)}"${o.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${F(o.label)}</span>
            <span class="portal-nav-desc">${F(o.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const n=document.createElement("button");n.id="portal-nav-toggle",n.type="button",n.setAttribute("aria-label","Close demos menu"),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-controls","portal-nav-drawer"),n.innerHTML=D,document.body.appendChild(r),document.body.appendChild(n);const i=o=>{r.setAttribute("aria-hidden",o?"false":"true"),n.setAttribute("aria-expanded",o?"true":"false"),n.setAttribute("aria-label",o?"Close demos menu":"Toggle demos menu"),n.innerHTML=o?D:Ae};n.addEventListener("click",o=>{o.stopPropagation(),i(r.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",o=>{r.getAttribute("aria-hidden")==="true"||o.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||i(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&r.getAttribute("aria-hidden")==="false"&&i(!1)})},Se=(e,t,r={})=>{const n=r.moveSpeed??4,i=r.lookSensitivity??.0025;let o=0,a=0;const s=new Set;Pe(t,(c,k)=>{o-=c*i,a-=k*i,a=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a))}),window.addEventListener("keydown",c=>s.add(c.code)),window.addEventListener("keyup",c=>s.delete(c.code)),Ce(s);const d=new u,y=new u,v=new u,ee=c=>{e.quaternion.setFromEuler(new T(a,o,0,"YXZ")),y.set(0,0,-1).applyQuaternion(e.quaternion),v.set(1,0,0).applyQuaternion(e.quaternion),d.set(0,0,0),s.has("KeyW")&&d.add(y),s.has("KeyS")&&d.sub(y),s.has("KeyD")&&d.add(v),s.has("KeyA")&&d.sub(v),d.y=0,d.lengthSq()>0&&(d.normalize().multiplyScalar(n*c),e.position.add(d))},_=new oe,R=new re,x=new T(0,0,0,"YXZ"),te=new u(0,0,0),z=new u,ne=new u(0,1,0);return{update:ee,setOrientationFromForward:c=>{z.copy(c).normalize(),_.lookAt(te,z,ne),R.setFromRotationMatrix(_),x.setFromQuaternion(R,"YXZ"),a=x.x,o=x.y},clearKeys:()=>{s.clear()},getKeys:()=>Array.from(s),setKeys:c=>{s.clear();for(const k of c)s.add(k)}}},Pe=(e,t)=>{let r=null,n=0,i=0;e.addEventListener("pointerdown",a=>{if(r===null&&(r=a.pointerId,n=a.clientX,i=a.clientY,a.pointerType!=="mouse"))try{e.setPointerCapture(a.pointerId)}catch{}});const o=a=>{a.pointerId===r&&(r=null)};window.addEventListener("pointerup",o),window.addEventListener("pointercancel",o),window.addEventListener("pointermove",a=>{if(a.pointerId!==r)return;const s=a.clientX-n,d=a.clientY-i;n=a.clientX,i=a.clientY,t(s,d)})},Ce=e=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const r=document.createElement("div");r.className="wasd-pad",r.setAttribute("aria-label","Movement controls"),r.innerHTML=`
    <button type="button" data-key="KeyW" class="wasd-btn wasd-up" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-down" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
  `;const n=document.createElement("style");n.textContent=`
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
  `,document.head.appendChild(n),document.body.appendChild(r);for(const i of r.querySelectorAll(".wasd-btn")){const o=i.dataset.key,a=d=>{d.preventDefault(),d.stopPropagation(),e.add(o),i.classList.add("is-active");try{i.setPointerCapture(d.pointerId)}catch{}},s=d=>{d.stopPropagation(),e.delete(o),i.classList.remove("is-active")};i.addEventListener("pointerdown",a),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s),i.addEventListener("pointerleave",s),i.addEventListener("contextmenu",d=>d.preventDefault())}},_e={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Re=e=>{const t=new Map,r=n=>{if(n==null)return null;const i=typeof n;if(i==="number"||i==="string"||i==="boolean")return n;if(Array.isArray(n))return n.map(r);if(typeof n!="object")return n;const o=n;if("__netgl_handle"in o){const a=o.__netgl_handle,s=t.get(a);if(s===void 0)throw new Error(`NetGL replay: unknown handle id ${a}`);return s}if("__netgl_typedarray"in o){const a=o.__netgl_typedarray,s=_e[a];if(!s)throw new Error(`NetGL replay: unknown typed-array ${a}`);return new s(o.buffer,o.offset,o.length)}if("__netgl_arraybuffer"in o)return o.__netgl_arraybuffer;throw new Error("NetGL replay: unknown encoded value shape")};return n=>{const i=n.args.map(r),o=e[n.name];if(typeof o!="function")throw new Error(`NetGL replay: receiver has no method '${n.name}'`);const a=o.apply(e,i);n.returnId!==void 0&&a!=null&&typeof a=="object"&&t.set(n.returnId,a)}};Le("netgl");const X=document.querySelector("#app");if(!X)throw new Error("Missing #app");const S=document.querySelector("#target-iframe");if(!S)throw new Error("Missing #target-iframe");const l=new ae({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});l.outputColorSpace=ie;l.toneMapping=se;l.setPixelRatio(Math.min(window.devicePixelRatio,2));l.setSize(window.innerWidth,window.innerHeight);l.autoClear=!1;X.appendChild(l.domElement);const p=new de(70,window.innerWidth/window.innerHeight,.02,200);p.position.set(0,1.6,5.5);const w=new le;w.background=new C("#101826");w.add(new ce(12176639,2241348,1));const O=new pe(16777215,.65);O.position.set(3,6,2);w.add(O);const Q=new j(new ue(18,18),new q({color:"#1b2a3f",roughness:.95,metalness:.03}));Q.rotation.x=-Math.PI/2;w.add(Q);const ze=new we(.9,.9,.9),Te=new q({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new j(ze,Te);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),w.add(t)}const Ge=new me(2.6,3.2),b=ge(Ge);b.position.set(0,1.6,-3.5);w.add(b);const W=ye({scene:w,anchor:b}),E=he(),Ie=l.getContext(),Be=Re(Ie);let U=!1,P=null;const V=new C("#220d17"),Z=fe({output:S.contentWindow,inputFilter:S.contentWindow});Z.onMessage(e=>{if(!e||typeof e!="object")return;const t=e;if("type"in t&&t.type==="netgl:ready"){P=t.anchor,V.setRGB(t.background.r,t.background.g,t.background.b),U=!0;return}"name"in t&&typeof t.name=="string"&&Be(t)});const De=Se(p,l.domElement),Fe=()=>{const e=window.innerWidth,t=window.innerHeight;l.setSize(e,t),p.aspect=e/t,p.updateProjectionMatrix()};window.addEventListener("resize",Fe);const H=new be,K=new C,h=new u,f=new u,m=new u,J=()=>{const e=H.getDelta(),t=H.elapsedTime;if(De.update(e),l.resetState(),l.setRenderTarget(null),l.clear(!0,!0,!0),W.renderAsSource(l,p),U&&P){K.copy(V),E.update(b,p,K),l.render(E.scene,E.camera),l.clearDepth(),p.getWorldPosition(h),f.set(0,0,-1).applyQuaternion(p.quaternion),m.set(0,1,0).applyQuaternion(p.quaternion);const r=xe({position:[h.x,h.y,h.z],forward:[f.x,f.y,f.z],up:[m.x,m.y,m.z]},{source:W.getAnchor(),target:P}),n=Array.from(p.projectionMatrix.elements),i=l.getPixelRatio(),o=Math.max(1,Math.floor(window.innerWidth*i)),a=Math.max(1,Math.floor(window.innerHeight*i));Z.post({type:"netgl:setPose",pose:r,projection:n,viewport:{width:o,height:a},time:t})}requestAnimationFrame(J)};J();
