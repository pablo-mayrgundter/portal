import{V as g,M as Q,Q as V,E as R,W as Z,S as J,N as ee,P as te,a as ne,C as P,H as re,D as oe,b as W,c as ae,d as N,B as ie,m as se,e as le,w as de,f as ce,g as pe,h as ue,i as we}from"./index-De4s-7aV.js";const ge=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],he=`
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
`,fe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',G='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',be=(t,i)=>{const n=t==="three";return i==="three"?n?".":"..":n?`${i}/`:`../${i}/`},T=t=>t.replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i]),me=t=>{if(document.getElementById("portal-nav-toggle"))return;const i=document.createElement("style");i.id="portal-nav-styles",i.textContent=he,document.head.appendChild(i);const n=document.createElement("aside");n.id="portal-nav-drawer",n.setAttribute("aria-hidden","false"),n.setAttribute("aria-label","Portal demos"),n.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${ge.map(e=>`
        <li${e.key===t?' class="portal-nav-current"':""}>
          <a href="${be(t,e.key)}"${e.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${T(e.label)}</span>
            <span class="portal-nav-desc">${T(e.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const s=document.createElement("button");s.id="portal-nav-toggle",s.type="button",s.setAttribute("aria-label","Close demos menu"),s.setAttribute("aria-expanded","true"),s.setAttribute("aria-controls","portal-nav-drawer"),s.innerHTML=G,document.body.appendChild(n),document.body.appendChild(s);const l=e=>{n.setAttribute("aria-hidden",e?"false":"true"),s.setAttribute("aria-expanded",e?"true":"false"),s.setAttribute("aria-label",e?"Close demos menu":"Toggle demos menu"),s.innerHTML=e?G:fe};s.addEventListener("click",e=>{e.stopPropagation(),l(n.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",e=>{n.getAttribute("aria-hidden")==="true"||e.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",e=>{e.key==="Escape"&&n.getAttribute("aria-hidden")==="false"&&l(!1)})},ye=(t,i,n={})=>{const s=n.moveSpeed??4,l=n.lookSensitivity??.0025;let e=0,o=0;const r=new Set;ve(i,(p,L)=>{e-=p*l,o-=L*l,o=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,o))}),window.addEventListener("keydown",p=>r.add(p.code)),window.addEventListener("keyup",p=>r.delete(p.code)),xe(r);const a=new g,d=new g,w=new g,b=p=>{t.quaternion.setFromEuler(new R(o,e,0,"YXZ")),d.set(0,0,-1).applyQuaternion(t.quaternion),w.set(1,0,0).applyQuaternion(t.quaternion),a.set(0,0,0),r.has("KeyW")&&a.add(d),r.has("KeyS")&&a.sub(d),r.has("KeyD")&&a.add(w),r.has("KeyA")&&a.sub(w),a.y=0,a.lengthSq()>0&&(a.normalize().multiplyScalar(s*p),t.position.add(a))},m=new Q,h=new V,E=new R(0,0,0,"YXZ"),X=new g(0,0,0),F=new g,O=new g(0,1,0);return{update:b,setOrientationFromForward:p=>{F.copy(p).normalize(),m.lookAt(X,F,O),h.setFromRotationMatrix(m),E.setFromQuaternion(h,"YXZ"),o=E.x,e=E.y},clearKeys:()=>{r.clear()},getKeys:()=>Array.from(r),setKeys:p=>{r.clear();for(const L of p)r.add(L)}}},ve=(t,i)=>{let n=null,s=0,l=0;t.addEventListener("pointerdown",o=>{if(n===null&&(n=o.pointerId,s=o.clientX,l=o.clientY,o.pointerType!=="mouse"))try{t.setPointerCapture(o.pointerId)}catch{}});const e=o=>{o.pointerId===n&&(n=null)};window.addEventListener("pointerup",e),window.addEventListener("pointercancel",e),window.addEventListener("pointermove",o=>{if(o.pointerId!==n)return;const r=o.clientX-s,a=o.clientY-l;s=o.clientX,l=o.clientY,i(r,a)})},xe=t=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement controls"),n.innerHTML=`
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
  `,document.head.appendChild(s),document.body.appendChild(n);for(const l of n.querySelectorAll(".wasd-btn")){const e=l.dataset.key,o=a=>{a.preventDefault(),a.stopPropagation(),t.add(e),l.classList.add("is-active");try{l.setPointerCapture(a.pointerId)}catch{}},r=a=>{a.stopPropagation(),t.delete(e),l.classList.remove("is-active")};l.addEventListener("pointerdown",o),l.addEventListener("pointerup",r),l.addEventListener("pointercancel",r),l.addEventListener("pointerleave",r),l.addEventListener("contextmenu",a=>a.preventDefault())}},ke={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Ee=36160,Le=36009,Me=(t,i={})=>{const n=new Map;let s=null;const l=e=>{if(e==null)return null;const o=typeof e;if(o==="number"||o==="string"||o==="boolean")return e;if(Array.isArray(e))return e.map(l);if(typeof e!="object")return e;const r=e;if("__netgl_handle"in r){const a=r.__netgl_handle,d=n.get(a);if(d===void 0)throw new Error(`NetGL replay: unknown handle id ${a}`);return d}if("__netgl_typedarray"in r){const a=r.__netgl_typedarray,d=ke[a];if(!d)throw new Error(`NetGL replay: unknown typed-array ${a}`);return new d(r.buffer,r.offset,r.length)}if("__netgl_arraybuffer"in r)return r.__netgl_arraybuffer;if("__netgl_imagedata"in r){const a=r.width,d=r.height,w=r.buffer,b=new Uint8ClampedArray(w);return new ImageData(b,a,d)}throw new Error("NetGL replay: unknown encoded value shape")};return e=>{let o;try{o=e.args.map(l)}catch(d){const w=d instanceof Error?d.message:String(d);throw new Error(`NetGL replay (decoding ${e.name}): ${w}`)}if(e.name==="bindFramebuffer"){const d=o[0];(d===Ee||d===Le)&&(s=o[1])}if(e.name==="viewport"&&s===null&&i.remapScreenViewport){const[d,w,b,m]=o,h=i.remapScreenViewport(d,w,b,m);h!==null&&(o=[h[0],h[1],h[2],h[3]])}const r=t[e.name];if(typeof r!="function")throw new Error(`NetGL replay: receiver has no method '${e.name}'`);const a=r.apply(t,o);e.returnId!==void 0&&a!=null&&typeof a=="object"&&n.set(e.returnId,a)}},Ae=t=>typeof t=="object"&&t!==null&&typeof t.name=="string",Se=t=>typeof t=="object"&&t!==null&&t.type==="netgl:frame-end";me("netgl");const K=document.querySelector("#app");if(!K)throw new Error("Missing #app");const S=document.querySelector("#target-iframe");if(!S)throw new Error("Missing #target-iframe");const c=new Z({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});c.outputColorSpace=J;c.toneMapping=ee;c.setPixelRatio(Math.min(window.devicePixelRatio,2));c.setSize(window.innerWidth,window.innerHeight);c.autoClear=!1;K.appendChild(c.domElement);const u=new te(70,window.innerWidth/window.innerHeight,.02,200);u.position.set(0,1.6,5.5);const f=new ne;f.background=new P("#101826");f.add(new re(12176639,2241348,1));const H=new oe(16777215,.65);H.position.set(3,6,2);f.add(H);const $=new W(new ae(18,18),new N({color:"#1b2a3f",roughness:.95,metalness:.03}));$.rotation.x=-Math.PI/2;f.add($);const _e=new ie(.9,.9,.9),Ce=new N({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const i=new W(_e,Ce);i.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),f.add(i)}const Pe=new ce(2.6,3.2),k=se(Pe);k.position.set(0,1.6,-3.5);f.add(k);const z=we({scene:f,anchor:k}),M=le(),Fe=c.getContext(),Re=Me(Fe);let q=!1,_=null;const j=new P("#220d17"),U=de({output:S.contentWindow,inputFilter:S.contentWindow});let A=[],C=null,D=null;U.onMessage(t=>{if(Se(t)){C=A,A=[];return}if(Ae(t)){A.push(t);return}const i=t;i&&i.type==="netgl:ready"&&(_=i.anchor,j.setRGB(i.background.r,i.background.g,i.background.b),q=!0)});const Ge=ye(u,c.domElement),Te=()=>{const t=window.innerWidth,i=window.innerHeight;c.setSize(t,i),u.aspect=t/i,u.updateProjectionMatrix()};window.addEventListener("resize",Te);const I=new pe,B=new P,y=new g,v=new g,x=new g,Y=()=>{const t=I.getDelta(),i=I.elapsedTime;if(Ge.update(t),c.resetState(),c.setRenderTarget(null),c.clear(!0,!0,!0),z.renderAsSource(c,u),q&&_){B.copy(j),M.update(k,u,B),c.render(M.scene,M.camera),c.clearDepth();let n=C;if(n?(C=null,D=n):n=D,n){for(let a=0;a<n.length;a+=1)Re(n[a]);c.resetState()}u.getWorldPosition(y),v.set(0,0,-1).applyQuaternion(u.quaternion),x.set(0,1,0).applyQuaternion(u.quaternion);const s=ue({position:[y.x,y.y,y.z],forward:[v.x,v.y,v.z],up:[x.x,x.y,x.z]},{source:z.getAnchor(),target:_}),l=Array.from(u.projectionMatrix.elements),e=c.getPixelRatio(),o=Math.max(1,Math.floor(window.innerWidth*e)),r=Math.max(1,Math.floor(window.innerHeight*e));U.post({type:"netgl:setPose",pose:s,projection:l,viewport:{width:o,height:r},time:i})}requestAnimationFrame(Y)};Y();
