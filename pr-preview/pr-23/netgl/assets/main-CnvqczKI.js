import{V as u,M as U,Q as V,E as G,W as Z,S as J,N as ee,P as te,a as ne,C as S,H as re,D as oe,b as N,c as ae,d as W,B as ie,m as se,e as le,w as de,f as ce,g as pe,h as ue,i as ge}from"./index-DoF7y9Y5.js";const we=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],he=`
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
`,fe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',R='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',be=(t,a)=>{const r=t==="three";return a==="three"?r?".":"..":r?`${a}/`:`../${a}/`},F=t=>t.replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),me=t=>{if(document.getElementById("portal-nav-toggle"))return;const a=document.createElement("style");a.id="portal-nav-styles",a.textContent=he,document.head.appendChild(a);const r=document.createElement("aside");r.id="portal-nav-drawer",r.setAttribute("aria-hidden","false"),r.setAttribute("aria-label","Portal demos"),r.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${we.map(e=>`
        <li${e.key===t?' class="portal-nav-current"':""}>
          <a href="${be(t,e.key)}"${e.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${F(e.label)}</span>
            <span class="portal-nav-desc">${F(e.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const n=document.createElement("button");n.id="portal-nav-toggle",n.type="button",n.setAttribute("aria-label","Close demos menu"),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-controls","portal-nav-drawer"),n.innerHTML=R,document.body.appendChild(r),document.body.appendChild(n);const s=e=>{r.setAttribute("aria-hidden",e?"false":"true"),n.setAttribute("aria-expanded",e?"true":"false"),n.setAttribute("aria-label",e?"Close demos menu":"Toggle demos menu"),n.innerHTML=e?R:fe};n.addEventListener("click",e=>{e.stopPropagation(),s(r.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",e=>{r.getAttribute("aria-hidden")==="true"||e.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||s(!1)}),document.addEventListener("keydown",e=>{e.key==="Escape"&&r.getAttribute("aria-hidden")==="false"&&s(!1)})},ye=(t,a,r={})=>{const n=r.moveSpeed??4,s=r.lookSensitivity??.0025;let e=0,o=0;const i=new Set;ve(a,(c,x)=>{e-=c*s,o-=x*s,o=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,o))}),window.addEventListener("keydown",c=>i.add(c.code)),window.addEventListener("keyup",c=>i.delete(c.code)),xe(i);const l=new u,w=new u,y=new u,X=c=>{t.quaternion.setFromEuler(new G(o,e,0,"YXZ")),w.set(0,0,-1).applyQuaternion(t.quaternion),y.set(1,0,0).applyQuaternion(t.quaternion),l.set(0,0,0),i.has("KeyW")&&l.add(w),i.has("KeyS")&&l.sub(w),i.has("KeyD")&&l.add(y),i.has("KeyA")&&l.sub(y),l.y=0,l.lengthSq()>0&&(l.normalize().multiplyScalar(n*c),t.position.add(l))},C=new U,_=new V,v=new G(0,0,0,"YXZ"),O=new u(0,0,0),P=new u,Q=new u(0,1,0);return{update:X,setOrientationFromForward:c=>{P.copy(c).normalize(),C.lookAt(O,P,Q),_.setFromRotationMatrix(C),v.setFromQuaternion(_,"YXZ"),o=v.x,e=v.y},clearKeys:()=>{i.clear()},getKeys:()=>Array.from(i),setKeys:c=>{i.clear();for(const x of c)i.add(x)}}},ve=(t,a)=>{let r=null,n=0,s=0;t.addEventListener("pointerdown",o=>{if(r===null&&(r=o.pointerId,n=o.clientX,s=o.clientY,o.pointerType!=="mouse"))try{t.setPointerCapture(o.pointerId)}catch{}});const e=o=>{o.pointerId===r&&(r=null)};window.addEventListener("pointerup",e),window.addEventListener("pointercancel",e),window.addEventListener("pointermove",o=>{if(o.pointerId!==r)return;const i=o.clientX-n,l=o.clientY-s;n=o.clientX,s=o.clientY,a(i,l)})},xe=t=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const r=document.createElement("div");r.className="wasd-pad",r.setAttribute("aria-label","Movement controls"),r.innerHTML=`
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
  `,document.head.appendChild(n),document.body.appendChild(r);for(const s of r.querySelectorAll(".wasd-btn")){const e=s.dataset.key,o=l=>{l.preventDefault(),l.stopPropagation(),t.add(e),s.classList.add("is-active");try{s.setPointerCapture(l.pointerId)}catch{}},i=l=>{l.stopPropagation(),t.delete(e),s.classList.remove("is-active")};s.addEventListener("pointerdown",o),s.addEventListener("pointerup",i),s.addEventListener("pointercancel",i),s.addEventListener("pointerleave",i),s.addEventListener("contextmenu",l=>l.preventDefault())}},ke={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Le=t=>{const a=new Map,r=n=>{if(n==null)return null;const s=typeof n;if(s==="number"||s==="string"||s==="boolean")return n;if(Array.isArray(n))return n.map(r);if(typeof n!="object")return n;const e=n;if("__netgl_handle"in e){const o=e.__netgl_handle,i=a.get(o);if(i===void 0)throw new Error(`NetGL replay: unknown handle id ${o}`);return i}if("__netgl_typedarray"in e){const o=e.__netgl_typedarray,i=ke[o];if(!i)throw new Error(`NetGL replay: unknown typed-array ${o}`);return new i(e.buffer,e.offset,e.length)}if("__netgl_arraybuffer"in e)return e.__netgl_arraybuffer;if("__netgl_imagedata"in e){const o=e.width,i=e.height,l=e.buffer,w=new Uint8ClampedArray(l);return new ImageData(w,o,i)}throw new Error("NetGL replay: unknown encoded value shape")};return n=>{let s;try{s=n.args.map(r)}catch(i){const l=i instanceof Error?i.message:String(i);throw new Error(`NetGL replay (decoding ${n.name}): ${l}`)}const e=t[n.name];if(typeof e!="function")throw new Error(`NetGL replay: receiver has no method '${n.name}'`);const o=e.apply(t,s);n.returnId!==void 0&&o!=null&&typeof o=="object"&&a.set(n.returnId,o)}},Ee=t=>typeof t=="object"&&t!==null&&typeof t.name=="string",Me=t=>typeof t=="object"&&t!==null&&t.type==="netgl:frame-end";me("netgl");const B=document.querySelector("#app");if(!B)throw new Error("Missing #app");const E=document.querySelector("#target-iframe");if(!E)throw new Error("Missing #target-iframe");const d=new Z({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});d.outputColorSpace=J;d.toneMapping=ee;d.setPixelRatio(Math.min(window.devicePixelRatio,2));d.setSize(window.innerWidth,window.innerHeight);d.autoClear=!1;B.appendChild(d.domElement);const p=new te(70,window.innerWidth/window.innerHeight,.02,200);p.position.set(0,1.6,5.5);const g=new ne;g.background=new S("#101826");g.add(new re(12176639,2241348,1));const K=new oe(16777215,.65);K.position.set(3,6,2);g.add(K);const H=new N(new ae(18,18),new W({color:"#1b2a3f",roughness:.95,metalness:.03}));H.rotation.x=-Math.PI/2;g.add(H);const Ae=new ie(.9,.9,.9),Se=new W({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const a=new N(Ae,Se);a.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),g.add(a)}const Ce=new ce(2.6,3.2),m=se(Ce);m.position.set(0,1.6,-3.5);g.add(m);const T=ge({scene:g,anchor:m}),k=le(),_e=d.getContext(),Pe=Le(_e);let $=!1,M=null;const q=new S("#220d17"),j=de({output:E.contentWindow,inputFilter:E.contentWindow});let L=[],A=null,z=null;j.onMessage(t=>{if(Me(t)){A=L,L=[];return}if(Ee(t)){L.push(t);return}const a=t;a&&a.type==="netgl:ready"&&(M=a.anchor,q.setRGB(a.background.r,a.background.g,a.background.b),$=!0)});const Ge=ye(p,d.domElement),Re=()=>{const t=window.innerWidth,a=window.innerHeight;d.setSize(t,a),p.aspect=t/a,p.updateProjectionMatrix()};window.addEventListener("resize",Re);const I=new pe,D=new S,h=new u,f=new u,b=new u,Y=()=>{const t=I.getDelta(),a=I.elapsedTime;if(Ge.update(t),d.resetState(),d.setRenderTarget(null),d.clear(!0,!0,!0),T.renderAsSource(d,p),$&&M){D.copy(q),k.update(m,p,D),d.render(k.scene,k.camera),d.clearDepth();let r=A;if(r?(A=null,z=r):r=z,r){for(let l=0;l<r.length;l+=1)Pe(r[l]);d.resetState()}p.getWorldPosition(h),f.set(0,0,-1).applyQuaternion(p.quaternion),b.set(0,1,0).applyQuaternion(p.quaternion);const n=ue({position:[h.x,h.y,h.z],forward:[f.x,f.y,f.z],up:[b.x,b.y,b.z]},{source:T.getAnchor(),target:M}),s=Array.from(p.projectionMatrix.elements),e=d.getPixelRatio(),o=Math.max(1,Math.floor(window.innerWidth*e)),i=Math.max(1,Math.floor(window.innerHeight*e));j.post({type:"netgl:setPose",pose:n,projection:s,viewport:{width:o,height:i},time:a})}requestAnimationFrame(Y)};Y();
