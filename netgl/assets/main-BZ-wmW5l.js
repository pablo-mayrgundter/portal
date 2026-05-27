import{V as y,M as Z,Q as J,E as I,W as ee,S as te,N as ne,P as re,a as oe,C as G,H as ae,D as ie,b as K,c as se,d as H,B as de,m as le,e as ce,w as pe,f as ue,g as we,h as he,i as ge}from"./index-De4s-7aV.js";const be=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],fe=`
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
`,me='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',z='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',ye=(t,r)=>{const o=t==="three";return r==="three"?o?".":"..":o?`${r}/`:`../${r}/`},D=t=>t.replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r]),ve=t=>{if(document.getElementById("portal-nav-toggle"))return;const r=document.createElement("style");r.id="portal-nav-styles",r.textContent=fe,document.head.appendChild(r);const o=document.createElement("aside");o.id="portal-nav-drawer",o.setAttribute("aria-hidden","false"),o.setAttribute("aria-label","Portal demos"),o.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${be.map(a=>`
        <li${a.key===t?' class="portal-nav-current"':""}>
          <a href="${ye(t,a.key)}"${a.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${D(a.label)}</span>
            <span class="portal-nav-desc">${D(a.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const s=document.createElement("button");s.id="portal-nav-toggle",s.type="button",s.setAttribute("aria-label","Close demos menu"),s.setAttribute("aria-expanded","true"),s.setAttribute("aria-controls","portal-nav-drawer"),s.innerHTML=z,document.body.appendChild(o),document.body.appendChild(s);const d=a=>{o.setAttribute("aria-hidden",a?"false":"true"),s.setAttribute("aria-expanded",a?"true":"false"),s.setAttribute("aria-label",a?"Close demos menu":"Toggle demos menu"),s.innerHTML=a?z:me};s.addEventListener("click",a=>{a.stopPropagation(),d(o.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",a=>{o.getAttribute("aria-hidden")==="true"||a.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||d(!1)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&o.getAttribute("aria-hidden")==="false"&&d(!1)})},xe=(t,r,o={})=>{const s=o.moveSpeed??4,d=o.lookSensitivity??.0025;let a=0,e=0;const i=new Set;ke(r,(b,C)=>{a-=b*d,e-=C*d,e=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e))}),window.addEventListener("keydown",b=>i.add(b.code)),window.addEventListener("keyup",b=>i.delete(b.code)),Ee(i);const n=new y,h=new y,w=new y,l=b=>{t.quaternion.setFromEuler(new I(e,a,0,"YXZ")),h.set(0,0,-1).applyQuaternion(t.quaternion),w.set(1,0,0).applyQuaternion(t.quaternion),n.set(0,0,0),i.has("KeyW")&&n.add(h),i.has("KeyS")&&n.sub(h),i.has("KeyD")&&n.add(w),i.has("KeyA")&&n.sub(w),n.y=0,n.lengthSq()>0&&(n.normalize().multiplyScalar(s*b),t.position.add(n))},c=new Z,f=new J,g=new I(0,0,0,"YXZ"),u=new y(0,0,0),x=new y,k=new y(0,1,0);return{update:l,setOrientationFromForward:b=>{x.copy(b).normalize(),c.lookAt(u,x,k),f.setFromRotationMatrix(c),g.setFromQuaternion(f,"YXZ"),e=g.x,a=g.y},clearKeys:()=>{i.clear()},getKeys:()=>Array.from(i),setKeys:b=>{i.clear();for(const C of b)i.add(C)}}},ke=(t,r)=>{let o=null,s=0,d=0;t.addEventListener("pointerdown",e=>{if(o===null&&(o=e.pointerId,s=e.clientX,d=e.clientY,e.pointerType!=="mouse"))try{t.setPointerCapture(e.pointerId)}catch{}});const a=e=>{e.pointerId===o&&(o=null)};window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a),window.addEventListener("pointermove",e=>{if(e.pointerId!==o)return;const i=e.clientX-s,n=e.clientY-d;s=e.clientX,d=e.clientY,r(i,n)})},Ee=t=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const o=document.createElement("div");o.className="wasd-pad",o.setAttribute("aria-label","Movement controls"),o.innerHTML=`
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
  `,document.head.appendChild(s),document.body.appendChild(o);for(const d of o.querySelectorAll(".wasd-btn")){const a=d.dataset.key,e=n=>{n.preventDefault(),n.stopPropagation(),t.add(a),d.classList.add("is-active");try{d.setPointerCapture(n.pointerId)}catch{}},i=n=>{n.stopPropagation(),t.delete(a),d.classList.remove("is-active")};d.addEventListener("pointerdown",e),d.addEventListener("pointerup",i),d.addEventListener("pointercancel",i),d.addEventListener("pointerleave",i),d.addEventListener("contextmenu",n=>n.preventDefault())}},Le={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Me=36160,_e=36009,Ae=(t,r={})=>{const o=new Map;let s=null,d=null;const a=e=>{if(e==null)return null;const i=typeof e;if(i==="number"||i==="string"||i==="boolean")return e;if(Array.isArray(e))return e.map(a);if(typeof e!="object")return e;const n=e;if("__netgl_handle"in n){const h=n.__netgl_handle,w=o.get(h);if(w===void 0)throw new Error(`NetGL replay: unknown handle id ${h}`);return w}if("__netgl_typedarray"in n){const h=n.__netgl_typedarray,w=Le[h];if(!w)throw new Error(`NetGL replay: unknown typed-array ${h}`);return new w(n.buffer,n.offset,n.length)}if("__netgl_arraybuffer"in n)return n.__netgl_arraybuffer;if("__netgl_imagedata"in n){const h=n.width,w=n.height,l=n.buffer,c=new Uint8ClampedArray(l);return new ImageData(c,h,w)}throw new Error("NetGL replay: unknown encoded value shape")};return e=>{let i;try{i=e.args.map(a)}catch(l){const c=l instanceof Error?l.message:String(l);throw new Error(`NetGL replay (decoding ${e.name}): ${c}`)}let n=!1;if(e.name==="bindFramebuffer"){const l=i[0];if(l===Me||l===_e){const c=i[1];c!==s&&(n=!0),s=c}}if(e.name==="viewport"){const[l,c,f,g]=i;if(d=[l,c,f,g],s===null&&r.remapScreenViewport){const u=r.remapScreenViewport(l,c,f,g);u!==null&&(i=[u[0],u[1],u[2],u[3]])}}if(r.__debugTraceViewport&&(e.name==="viewport"||e.name==="scissor"||e.name==="enable"||e.name==="disable"))if(e.name==="enable"||e.name==="disable")i[0]===3089&&r.__debugTraceViewport(`${e.name}(SCISSOR_TEST) drawFb=${s?"RT":"null"}`);else{const[l,c,f,g]=i;r.__debugTraceViewport(`${e.name}(${l},${c},${f}x${g}) drawFb=${s?"RT":"null"}`)}const h=t[e.name];if(typeof h!="function")throw new Error(`NetGL replay: receiver has no method '${e.name}'`);const w=h.apply(t,i);if(n&&d){const[l,c,f,g]=d,u=s===null&&r.remapScreenViewport?r.remapScreenViewport(l,c,f,g):null,x=u?u[0]:l,k=u?u[1]:c,A=u?u[2]:f,S=u?u[3]:g;t.viewport(x,k,A,S),r.__debugTraceViewport&&r.__debugTraceViewport(`post-bind re-issue viewport(${x},${k},${A}x${S}) drawFb=${s?"RT":"null"}`)}e.returnId!==void 0&&w!=null&&typeof w=="object"&&o.set(e.returnId,w)}},Se=t=>typeof t=="object"&&t!==null&&typeof t.name=="string",Ce=t=>typeof t=="object"&&t!==null&&t.type==="netgl:frame-end";ve("netgl");const q=document.querySelector("#app");if(!q)throw new Error("Missing #app");const P=document.querySelector("#target-iframe");if(!P)throw new Error("Missing #target-iframe");const p=new ee({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});p.outputColorSpace=te;p.toneMapping=ne;p.setPixelRatio(Math.min(window.devicePixelRatio,2));p.setSize(window.innerWidth,window.innerHeight);p.autoClear=!1;q.appendChild(p.domElement);const m=new re(70,window.innerWidth/window.innerHeight,.02,200);m.position.set(0,1.6,5.5);const v=new oe;v.background=new G("#101826");v.add(new ae(12176639,2241348,1));const j=new ie(16777215,.65);j.position.set(3,6,2);v.add(j);const U=new K(new se(18,18),new H({color:"#1b2a3f",roughness:.95,metalness:.03}));U.rotation.x=-Math.PI/2;v.add(U);const Fe=new de(.9,.9,.9),Re=new H({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const r=new K(Fe,Re);r.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),v.add(r)}const Pe=new ue(2.6,3.2),_=le(Pe);_.position.set(0,1.6,-3.5);v.add(_);const B=ge({scene:v,anchor:_}),F=ce(),Te=p.getContext(),$e=Ae(Te);let Y=!1,T=null;const O=new G("#220d17"),X=pe({output:P.contentWindow,inputFilter:P.contentWindow});let R=[],$=null,W=null;X.onMessage(t=>{if(Ce(t)){$=R,R=[];return}if(Se(t)){R.push(t);return}const r=t;r&&r.type==="netgl:ready"&&(T=r.anchor,O.setRGB(r.background.r,r.background.g,r.background.b),Y=!0)});const Ge=xe(m,p.domElement),Ie=()=>{const t=window.innerWidth,r=window.innerHeight;p.setSize(t,r),m.aspect=t/r,m.updateProjectionMatrix()};window.addEventListener("resize",Ie);const N=new we,V=new G,E=new y,L=new y,M=new y,Q=()=>{const t=N.getDelta(),r=N.elapsedTime;if(Ge.update(t),p.resetState(),p.setRenderTarget(null),p.clear(!0,!0,!0),B.renderAsSource(p,m),Y&&T){V.copy(O),F.update(_,m,V),p.render(F.scene,F.camera),p.clearDepth();let o=$;if(o?($=null,W=o):o=W,o){for(let n=0;n<o.length;n+=1)$e(o[n]);p.resetState()}m.getWorldPosition(E),L.set(0,0,-1).applyQuaternion(m.quaternion),M.set(0,1,0).applyQuaternion(m.quaternion);const s=he({position:[E.x,E.y,E.z],forward:[L.x,L.y,L.z],up:[M.x,M.y,M.z]},{source:B.getAnchor(),target:T}),d=Array.from(m.projectionMatrix.elements),a=p.getPixelRatio(),e=Math.max(1,Math.floor(window.innerWidth*a)),i=Math.max(1,Math.floor(window.innerHeight*a));X.post({type:"netgl:setPose",pose:s,projection:d,viewport:{width:e,height:i},time:r})}requestAnimationFrame(Q)};Q();
