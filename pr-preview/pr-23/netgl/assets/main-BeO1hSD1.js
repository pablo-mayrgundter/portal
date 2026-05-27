import{V as g,M as X,Q,E as R,W as Z,S as J,N as ee,P as te,a as ne,C as F,H as re,D as oe,b as B,c as ae,d as W,B as ie,m as se,e as de,w as le,f as ce,g as pe,h as ue,i as we}from"./index-De4s-7aV.js";const ge=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],he=`
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
`,fe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',T='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',be=(t,a)=>{const n=t==="three";return a==="three"?n?".":"..":n?`${a}/`:`../${a}/`},G=t=>t.replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),me=t=>{if(document.getElementById("portal-nav-toggle"))return;const a=document.createElement("style");a.id="portal-nav-styles",a.textContent=he,document.head.appendChild(a);const n=document.createElement("aside");n.id="portal-nav-drawer",n.setAttribute("aria-hidden","false"),n.setAttribute("aria-label","Portal demos"),n.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${ge.map(e=>`
        <li${e.key===t?' class="portal-nav-current"':""}>
          <a href="${be(t,e.key)}"${e.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${G(e.label)}</span>
            <span class="portal-nav-desc">${G(e.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const s=document.createElement("button");s.id="portal-nav-toggle",s.type="button",s.setAttribute("aria-label","Close demos menu"),s.setAttribute("aria-expanded","true"),s.setAttribute("aria-controls","portal-nav-drawer"),s.innerHTML=T,document.body.appendChild(n),document.body.appendChild(s);const d=e=>{n.setAttribute("aria-hidden",e?"false":"true"),s.setAttribute("aria-expanded",e?"true":"false"),s.setAttribute("aria-label",e?"Close demos menu":"Toggle demos menu"),s.innerHTML=e?T:fe};s.addEventListener("click",e=>{e.stopPropagation(),d(n.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",e=>{n.getAttribute("aria-hidden")==="true"||e.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||d(!1)}),document.addEventListener("keydown",e=>{e.key==="Escape"&&n.getAttribute("aria-hidden")==="false"&&d(!1)})},ye=(t,a,n={})=>{const s=n.moveSpeed??4,d=n.lookSensitivity??.0025;let e=0,r=0;const o=new Set;ve(a,(u,L)=>{e-=u*d,r-=L*d,r=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,r))}),window.addEventListener("keydown",u=>o.add(u.code)),window.addEventListener("keyup",u=>o.delete(u.code)),xe(o);const i=new g,l=new g,p=new g,f=u=>{t.quaternion.setFromEuler(new R(r,e,0,"YXZ")),l.set(0,0,-1).applyQuaternion(t.quaternion),p.set(1,0,0).applyQuaternion(t.quaternion),i.set(0,0,0),o.has("KeyW")&&i.add(l),o.has("KeyS")&&i.sub(l),o.has("KeyD")&&i.add(p),o.has("KeyA")&&i.sub(p),i.y=0,i.lengthSq()>0&&(i.normalize().multiplyScalar(s*u),t.position.add(i))},m=new X,h=new Q,E=new R(0,0,0,"YXZ"),Y=new g(0,0,0),P=new g,O=new g(0,1,0);return{update:f,setOrientationFromForward:u=>{P.copy(u).normalize(),m.lookAt(Y,P,O),h.setFromRotationMatrix(m),E.setFromQuaternion(h,"YXZ"),r=E.x,e=E.y},clearKeys:()=>{o.clear()},getKeys:()=>Array.from(o),setKeys:u=>{o.clear();for(const L of u)o.add(L)}}},ve=(t,a)=>{let n=null,s=0,d=0;t.addEventListener("pointerdown",r=>{if(n===null&&(n=r.pointerId,s=r.clientX,d=r.clientY,r.pointerType!=="mouse"))try{t.setPointerCapture(r.pointerId)}catch{}});const e=r=>{r.pointerId===n&&(n=null)};window.addEventListener("pointerup",e),window.addEventListener("pointercancel",e),window.addEventListener("pointermove",r=>{if(r.pointerId!==n)return;const o=r.clientX-s,i=r.clientY-d;s=r.clientX,d=r.clientY,a(o,i)})},xe=t=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement controls"),n.innerHTML=`
    <button type="button" data-key="KeyW" class="wasd-btn wasd-up" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-down" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
  `;const s=document.createElement("style");s.textContent=`
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
  `,document.head.appendChild(s),document.body.appendChild(n);for(const d of n.querySelectorAll(".wasd-btn")){const e=d.dataset.key,r=i=>{i.preventDefault(),i.stopPropagation(),t.add(e),d.classList.add("is-active");try{d.setPointerCapture(i.pointerId)}catch{}},o=i=>{i.stopPropagation(),t.delete(e),d.classList.remove("is-active")};d.addEventListener("pointerdown",r),d.addEventListener("pointerup",o),d.addEventListener("pointercancel",o),d.addEventListener("pointerleave",o),d.addEventListener("contextmenu",i=>i.preventDefault())}},ke={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Ee=36160,Le=36009,Me=(t,a={})=>{const n=new Map;let s=null;const d=e=>{if(e==null)return null;const r=typeof e;if(r==="number"||r==="string"||r==="boolean")return e;if(Array.isArray(e))return e.map(d);if(typeof e!="object")return e;const o=e;if("__netgl_handle"in o){const i=o.__netgl_handle,l=n.get(i);if(l===void 0)throw new Error(`NetGL replay: unknown handle id ${i}`);return l}if("__netgl_typedarray"in o){const i=o.__netgl_typedarray,l=ke[i];if(!l)throw new Error(`NetGL replay: unknown typed-array ${i}`);return new l(o.buffer,o.offset,o.length)}if("__netgl_arraybuffer"in o)return o.__netgl_arraybuffer;if("__netgl_imagedata"in o){const i=o.width,l=o.height,p=o.buffer,f=new Uint8ClampedArray(p);return new ImageData(f,i,l)}throw new Error("NetGL replay: unknown encoded value shape")};return e=>{let r;try{r=e.args.map(d)}catch(l){const p=l instanceof Error?l.message:String(l);throw new Error(`NetGL replay (decoding ${e.name}): ${p}`)}if(e.name==="bindFramebuffer"){const l=r[0];(l===Ee||l===Le)&&(s=r[1])}if(e.name==="viewport"&&s===null&&a.remapScreenViewport){const[l,p,f,m]=r,h=a.remapScreenViewport(l,p,f,m);h!==null&&(r=[h[0],h[1],h[2],h[3]])}if(a.__debugTraceViewport&&(e.name==="viewport"||e.name==="scissor"||e.name==="enable"||e.name==="disable"))if(e.name==="enable"||e.name==="disable")r[0]===3089&&a.__debugTraceViewport(`${e.name}(SCISSOR_TEST) drawFb=${s?"RT":"null"}`);else{const[l,p,f,m]=r;a.__debugTraceViewport(`${e.name}(${l},${p},${f}x${m}) drawFb=${s?"RT":"null"}`)}const o=t[e.name];if(typeof o!="function")throw new Error(`NetGL replay: receiver has no method '${e.name}'`);const i=o.apply(t,r);e.returnId!==void 0&&i!=null&&typeof i=="object"&&n.set(e.returnId,i)}},Ae=t=>typeof t=="object"&&t!==null&&typeof t.name=="string",_e=t=>typeof t=="object"&&t!==null&&t.type==="netgl:frame-end";me("netgl");const N=document.querySelector("#app");if(!N)throw new Error("Missing #app");const _=document.querySelector("#target-iframe");if(!_)throw new Error("Missing #target-iframe");const c=new Z({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});c.outputColorSpace=J;c.toneMapping=ee;c.setPixelRatio(Math.min(window.devicePixelRatio,2));c.setSize(window.innerWidth,window.innerHeight);c.autoClear=!1;N.appendChild(c.domElement);const w=new te(70,window.innerWidth/window.innerHeight,.02,200);w.position.set(0,1.6,5.5);const b=new ne;b.background=new F("#101826");b.add(new re(12176639,2241348,1));const K=new oe(16777215,.65);K.position.set(3,6,2);b.add(K);const H=new B(new ae(18,18),new W({color:"#1b2a3f",roughness:.95,metalness:.03}));H.rotation.x=-Math.PI/2;b.add(H);const Se=new ie(.9,.9,.9),Ce=new W({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const a=new B(Se,Ce);a.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),b.add(a)}const Fe=new ce(2.6,3.2),k=se(Fe);k.position.set(0,1.6,-3.5);b.add(k);const $=we({scene:b,anchor:k}),M=de(),Pe=c.getContext(),Re=Me(Pe);let q=!1,S=null;const j=new F("#220d17"),U=le({output:_.contentWindow,inputFilter:_.contentWindow});let A=[],C=null,z=null;U.onMessage(t=>{if(_e(t)){C=A,A=[];return}if(Ae(t)){A.push(t);return}const a=t;a&&a.type==="netgl:ready"&&(S=a.anchor,j.setRGB(a.background.r,a.background.g,a.background.b),q=!0)});const Te=ye(w,c.domElement),Ge=()=>{const t=window.innerWidth,a=window.innerHeight;c.setSize(t,a),w.aspect=t/a,w.updateProjectionMatrix()};window.addEventListener("resize",Ge);const D=new pe,I=new F,y=new g,v=new g,x=new g,V=()=>{const t=D.getDelta(),a=D.elapsedTime;if(Te.update(t),c.resetState(),c.setRenderTarget(null),c.clear(!0,!0,!0),$.renderAsSource(c,w),q&&S){I.copy(j),M.update(k,w,I),c.render(M.scene,M.camera),c.clearDepth();let n=C;if(n?(C=null,z=n):n=z,n){for(let i=0;i<n.length;i+=1)Re(n[i]);c.resetState()}w.getWorldPosition(y),v.set(0,0,-1).applyQuaternion(w.quaternion),x.set(0,1,0).applyQuaternion(w.quaternion);const s=ue({position:[y.x,y.y,y.z],forward:[v.x,v.y,v.z],up:[x.x,x.y,x.z]},{source:$.getAnchor(),target:S}),d=Array.from(w.projectionMatrix.elements),e=c.getPixelRatio(),r=Math.max(1,Math.floor(window.innerWidth*e)),o=Math.max(1,Math.floor(window.innerHeight*e));U.post({type:"netgl:setPose",pose:s,projection:d,viewport:{width:r,height:o},time:a})}requestAnimationFrame(V)};V();
