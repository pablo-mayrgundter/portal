import{V as u,M as U,Q as V,E as R,W as Z,S as J,N as ee,P as te,a as ne,C as S,H as re,D as oe,b as W,c as ae,d as B,B as ie,m as se,e as le,w as de,f as ce,g as pe,h as ue,i as we}from"./index-DoF7y9Y5.js";const ge=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],he=`
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
`,fe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',G='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',be=(t,a)=>{const n=t==="three";return a==="three"?n?".":"..":n?`${a}/`:`../${a}/`},F=t=>t.replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),me=t=>{if(document.getElementById("portal-nav-toggle"))return;const a=document.createElement("style");a.id="portal-nav-styles",a.textContent=he,document.head.appendChild(a);const n=document.createElement("aside");n.id="portal-nav-drawer",n.setAttribute("aria-hidden","false"),n.setAttribute("aria-label","Portal demos"),n.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${ge.map(e=>`
        <li${e.key===t?' class="portal-nav-current"':""}>
          <a href="${be(t,e.key)}"${e.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${F(e.label)}</span>
            <span class="portal-nav-desc">${F(e.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=G,document.body.appendChild(n),document.body.appendChild(r);const i=e=>{n.setAttribute("aria-hidden",e?"false":"true"),r.setAttribute("aria-expanded",e?"true":"false"),r.setAttribute("aria-label",e?"Close demos menu":"Toggle demos menu"),r.innerHTML=e?G:fe};r.addEventListener("click",e=>{e.stopPropagation(),i(n.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",e=>{n.getAttribute("aria-hidden")==="true"||e.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||i(!1)}),document.addEventListener("keydown",e=>{e.key==="Escape"&&n.getAttribute("aria-hidden")==="false"&&i(!1)})},ye=(t,a,n={})=>{const r=n.moveSpeed??4,i=n.lookSensitivity??.0025;let e=0,o=0;const s=new Set;ve(a,(c,x)=>{e-=c*i,o-=x*i,o=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,o))}),window.addEventListener("keydown",c=>s.add(c.code)),window.addEventListener("keyup",c=>s.delete(c.code)),xe(s);const l=new u,g=new u,y=new u,X=c=>{t.quaternion.setFromEuler(new R(o,e,0,"YXZ")),g.set(0,0,-1).applyQuaternion(t.quaternion),y.set(1,0,0).applyQuaternion(t.quaternion),l.set(0,0,0),s.has("KeyW")&&l.add(g),s.has("KeyS")&&l.sub(g),s.has("KeyD")&&l.add(y),s.has("KeyA")&&l.sub(y),l.y=0,l.lengthSq()>0&&(l.normalize().multiplyScalar(r*c),t.position.add(l))},C=new U,_=new V,v=new R(0,0,0,"YXZ"),O=new u(0,0,0),P=new u,Q=new u(0,1,0);return{update:X,setOrientationFromForward:c=>{P.copy(c).normalize(),C.lookAt(O,P,Q),_.setFromRotationMatrix(C),v.setFromQuaternion(_,"YXZ"),o=v.x,e=v.y},clearKeys:()=>{s.clear()},getKeys:()=>Array.from(s),setKeys:c=>{s.clear();for(const x of c)s.add(x)}}},ve=(t,a)=>{let n=null,r=0,i=0;t.addEventListener("pointerdown",o=>{if(n===null&&(n=o.pointerId,r=o.clientX,i=o.clientY,o.pointerType!=="mouse"))try{t.setPointerCapture(o.pointerId)}catch{}});const e=o=>{o.pointerId===n&&(n=null)};window.addEventListener("pointerup",e),window.addEventListener("pointercancel",e),window.addEventListener("pointermove",o=>{if(o.pointerId!==n)return;const s=o.clientX-r,l=o.clientY-i;r=o.clientX,i=o.clientY,a(s,l)})},xe=t=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement controls"),n.innerHTML=`
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
  `,document.head.appendChild(r),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const e=i.dataset.key,o=l=>{l.preventDefault(),l.stopPropagation(),t.add(e),i.classList.add("is-active");try{i.setPointerCapture(l.pointerId)}catch{}},s=l=>{l.stopPropagation(),t.delete(e),i.classList.remove("is-active")};i.addEventListener("pointerdown",o),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s),i.addEventListener("pointerleave",s),i.addEventListener("contextmenu",l=>l.preventDefault())}},ke={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Le=t=>{const a=new Map,n=r=>{if(r==null)return null;const i=typeof r;if(i==="number"||i==="string"||i==="boolean")return r;if(Array.isArray(r))return r.map(n);if(typeof r!="object")return r;const e=r;if("__netgl_handle"in e){const o=e.__netgl_handle,s=a.get(o);if(s===void 0)throw new Error(`NetGL replay: unknown handle id ${o}`);return s}if("__netgl_typedarray"in e){const o=e.__netgl_typedarray,s=ke[o];if(!s)throw new Error(`NetGL replay: unknown typed-array ${o}`);return new s(e.buffer,e.offset,e.length)}if("__netgl_arraybuffer"in e)return e.__netgl_arraybuffer;if("__netgl_imagedata"in e){const o=e.width,s=e.height,l=e.buffer,g=new Uint8ClampedArray(l);return new ImageData(g,o,s)}throw new Error("NetGL replay: unknown encoded value shape")};return r=>{const i=r.args.map(n),e=t[r.name];if(typeof e!="function")throw new Error(`NetGL replay: receiver has no method '${r.name}'`);const o=e.apply(t,i);r.returnId!==void 0&&o!=null&&typeof o=="object"&&a.set(r.returnId,o)}},Me=t=>typeof t=="object"&&t!==null&&typeof t.name=="string",Ee=t=>typeof t=="object"&&t!==null&&t.type==="netgl:frame-end";me("netgl");const K=document.querySelector("#app");if(!K)throw new Error("Missing #app");const M=document.querySelector("#target-iframe");if(!M)throw new Error("Missing #target-iframe");const d=new Z({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});d.outputColorSpace=J;d.toneMapping=ee;d.setPixelRatio(Math.min(window.devicePixelRatio,2));d.setSize(window.innerWidth,window.innerHeight);d.autoClear=!1;K.appendChild(d.domElement);const p=new te(70,window.innerWidth/window.innerHeight,.02,200);p.position.set(0,1.6,5.5);const w=new ne;w.background=new S("#101826");w.add(new re(12176639,2241348,1));const N=new oe(16777215,.65);N.position.set(3,6,2);w.add(N);const H=new W(new ae(18,18),new B({color:"#1b2a3f",roughness:.95,metalness:.03}));H.rotation.x=-Math.PI/2;w.add(H);const Ae=new ie(.9,.9,.9),Se=new B({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const a=new W(Ae,Se);a.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),w.add(a)}const Ce=new ce(2.6,3.2),m=se(Ce);m.position.set(0,1.6,-3.5);w.add(m);const T=we({scene:w,anchor:m}),k=le(),_e=d.getContext(),Pe=Le(_e);let q=!1,E=null;const $=new S("#220d17"),j=de({output:M.contentWindow,inputFilter:M.contentWindow});let L=[],A=null,z=null;j.onMessage(t=>{if(Ee(t)){A=L,L=[];return}if(Me(t)){L.push(t);return}const a=t;a&&a.type==="netgl:ready"&&(E=a.anchor,$.setRGB(a.background.r,a.background.g,a.background.b),q=!0)});const Re=ye(p,d.domElement),Ge=()=>{const t=window.innerWidth,a=window.innerHeight;d.setSize(t,a),p.aspect=t/a,p.updateProjectionMatrix()};window.addEventListener("resize",Ge);const I=new pe,D=new S,h=new u,f=new u,b=new u,Y=()=>{const t=I.getDelta(),a=I.elapsedTime;if(Re.update(t),d.resetState(),d.setRenderTarget(null),d.clear(!0,!0,!0),T.renderAsSource(d,p),q&&E){D.copy($),k.update(m,p,D),d.render(k.scene,k.camera),d.clearDepth();let n=A;if(n?(A=null,z=n):n=z,n){for(let l=0;l<n.length;l+=1)Pe(n[l]);d.resetState()}p.getWorldPosition(h),f.set(0,0,-1).applyQuaternion(p.quaternion),b.set(0,1,0).applyQuaternion(p.quaternion);const r=ue({position:[h.x,h.y,h.z],forward:[f.x,f.y,f.z],up:[b.x,b.y,b.z]},{source:T.getAnchor(),target:E}),i=Array.from(p.projectionMatrix.elements),e=d.getPixelRatio(),o=Math.max(1,Math.floor(window.innerWidth*e)),s=Math.max(1,Math.floor(window.innerHeight*e));j.post({type:"netgl:setPose",pose:r,projection:i,viewport:{width:o,height:s},time:a})}requestAnimationFrame(Y)};Y();
