import{V as y,M as X,Q,E as T,W as Z,S as J,N as ee,P as te,a as ne,C as R,H as re,D as oe,b as V,c as ae,d as W,B as ie,m as se,e as de,w as le,f as ce,g as pe,h as ue,i as we}from"./index-De4s-7aV.js";const he=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],ge=`
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
`,be='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',$='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',fe=(t,n)=>{const o=t==="three";return n==="three"?o?".":"..":o?`${n}/`:`../${n}/`},G=t=>t.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),me=t=>{if(document.getElementById("portal-nav-toggle"))return;const n=document.createElement("style");n.id="portal-nav-styles",n.textContent=ge,document.head.appendChild(n);const o=document.createElement("aside");o.id="portal-nav-drawer",o.setAttribute("aria-hidden","false"),o.setAttribute("aria-label","Portal demos"),o.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${he.map(a=>`
        <li${a.key===t?' class="portal-nav-current"':""}>
          <a href="${fe(t,a.key)}"${a.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${G(a.label)}</span>
            <span class="portal-nav-desc">${G(a.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const s=document.createElement("button");s.id="portal-nav-toggle",s.type="button",s.setAttribute("aria-label","Close demos menu"),s.setAttribute("aria-expanded","true"),s.setAttribute("aria-controls","portal-nav-drawer"),s.innerHTML=$,document.body.appendChild(o),document.body.appendChild(s);const d=a=>{o.setAttribute("aria-hidden",a?"false":"true"),s.setAttribute("aria-expanded",a?"true":"false"),s.setAttribute("aria-label",a?"Close demos menu":"Toggle demos menu"),s.innerHTML=a?$:be};s.addEventListener("click",a=>{a.stopPropagation(),d(o.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",a=>{o.getAttribute("aria-hidden")==="true"||a.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||d(!1)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&o.getAttribute("aria-hidden")==="false"&&d(!1)})},ye=(t,n,o={})=>{const s=o.moveSpeed??4,d=o.lookSensitivity??.0025;let a=0,e=0;const i=new Set;ve(n,(f,M)=>{a-=f*d,e-=M*d,e=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e))}),window.addEventListener("keydown",f=>i.add(f.code)),window.addEventListener("keyup",f=>i.delete(f.code)),xe(i);const r=new y,g=new y,w=new y,l=f=>{t.quaternion.setFromEuler(new T(e,a,0,"YXZ")),g.set(0,0,-1).applyQuaternion(t.quaternion),w.set(1,0,0).applyQuaternion(t.quaternion),r.set(0,0,0),i.has("KeyW")&&r.add(g),i.has("KeyS")&&r.sub(g),i.has("KeyD")&&r.add(w),i.has("KeyA")&&r.sub(w),r.y=0,r.lengthSq()>0&&(r.normalize().multiplyScalar(s*f),t.position.add(r))},c=new X,b=new Q,h=new T(0,0,0,"YXZ"),p=new y(0,0,0),P=new y,O=new y(0,1,0);return{update:l,setOrientationFromForward:f=>{P.copy(f).normalize(),c.lookAt(p,P,O),b.setFromRotationMatrix(c),h.setFromQuaternion(b,"YXZ"),e=h.x,a=h.y},clearKeys:()=>{i.clear()},getKeys:()=>Array.from(i),setKeys:f=>{i.clear();for(const M of f)i.add(M)}}},ve=(t,n)=>{let o=null,s=0,d=0;t.addEventListener("pointerdown",e=>{if(o===null&&(o=e.pointerId,s=e.clientX,d=e.clientY,e.pointerType!=="mouse"))try{t.setPointerCapture(e.pointerId)}catch{}});const a=e=>{e.pointerId===o&&(o=null)};window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a),window.addEventListener("pointermove",e=>{if(e.pointerId!==o)return;const i=e.clientX-s,r=e.clientY-d;s=e.clientX,d=e.clientY,n(i,r)})},xe=t=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const o=document.createElement("div");o.className="wasd-pad",o.setAttribute("aria-label","Movement controls"),o.innerHTML=`
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
  `,document.head.appendChild(s),document.body.appendChild(o);for(const d of o.querySelectorAll(".wasd-btn")){const a=d.dataset.key,e=r=>{r.preventDefault(),r.stopPropagation(),t.add(a),d.classList.add("is-active");try{d.setPointerCapture(r.pointerId)}catch{}},i=r=>{r.stopPropagation(),t.delete(a),d.classList.remove("is-active")};d.addEventListener("pointerdown",e),d.addEventListener("pointerup",i),d.addEventListener("pointercancel",i),d.addEventListener("pointerleave",i),d.addEventListener("contextmenu",r=>r.preventDefault())}},ke={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Ee=36160,Le=36009,Me=(t,n={})=>{const o=new Map;let s=null,d=null;const a=e=>{if(e==null)return null;const i=typeof e;if(i==="number"||i==="string"||i==="boolean")return e;if(Array.isArray(e))return e.map(a);if(typeof e!="object")return e;const r=e;if("__netgl_handle"in r){const g=r.__netgl_handle,w=o.get(g);if(w===void 0)throw new Error(`NetGL replay: unknown handle id ${g}`);return w}if("__netgl_typedarray"in r){const g=r.__netgl_typedarray,w=ke[g];if(!w)throw new Error(`NetGL replay: unknown typed-array ${g}`);return new w(r.buffer,r.offset,r.length)}if("__netgl_arraybuffer"in r)return r.__netgl_arraybuffer;if("__netgl_imagedata"in r){const g=r.width,w=r.height,l=r.buffer,c=new Uint8ClampedArray(l);return new ImageData(c,g,w)}throw new Error("NetGL replay: unknown encoded value shape")};return e=>{let i;try{i=e.args.map(a)}catch(l){const c=l instanceof Error?l.message:String(l);throw new Error(`NetGL replay (decoding ${e.name}): ${c}`)}let r=!1;if(e.name==="bindFramebuffer"){const l=i[0];if(l===Ee||l===Le){const c=i[1];c!==s&&(r=!0),s=c}}if(e.name==="viewport"){const[l,c,b,h]=i;if(d=[l,c,b,h],s===null&&n.remapScreenViewport){const p=n.remapScreenViewport(l,c,b,h);p!==null&&(i=[p[0],p[1],p[2],p[3]])}}if(n.__debugTraceViewport&&(e.name==="viewport"||e.name==="scissor"||e.name==="enable"||e.name==="disable"))if(e.name==="enable"||e.name==="disable")i[0]===3089&&n.__debugTraceViewport(`${e.name}(SCISSOR_TEST) drawFb=${s?"RT":"null"}`);else{const[l,c,b,h]=i;n.__debugTraceViewport(`${e.name}(${l},${c},${b}x${h}) drawFb=${s?"RT":"null"}`)}const g=t[e.name];if(typeof g!="function")throw new Error(`NetGL replay: receiver has no method '${e.name}'`);const w=g.apply(t,i);if(r&&d){const[l,c,b,h]=d;if(s===null&&n.remapScreenViewport){const p=n.remapScreenViewport(l,c,b,h);p!==null?t.viewport(p[0],p[1],p[2],p[3]):t.viewport(l,c,b,h)}else t.viewport(l,c,b,h);if(n.__debugTraceViewport){const p=s===null&&n.remapScreenViewport?n.remapScreenViewport(l,c,b,h)??[l,c,b,h]:[l,c,b,h];n.__debugTraceViewport(`post-bind re-issue viewport(${p[0]},${p[1]},${p[2]}x${p[3]}) drawFb=${s?"RT":"null"}`)}}e.returnId!==void 0&&w!=null&&typeof w=="object"&&o.set(e.returnId,w)}},_e=t=>typeof t=="object"&&t!==null&&typeof t.name=="string",Ae=t=>typeof t=="object"&&t!==null&&t.type==="netgl:frame-end";me("netgl");const N=document.querySelector("#app");if(!N)throw new Error("Missing #app");const S=document.querySelector("#target-iframe");if(!S)throw new Error("Missing #target-iframe");const u=new Z({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});u.outputColorSpace=J;u.toneMapping=ee;u.setPixelRatio(Math.min(window.devicePixelRatio,2));u.setSize(window.innerWidth,window.innerHeight);u.autoClear=!1;N.appendChild(u.domElement);const m=new te(70,window.innerWidth/window.innerHeight,.02,200);m.position.set(0,1.6,5.5);const v=new ne;v.background=new R("#101826");v.add(new re(12176639,2241348,1));const K=new oe(16777215,.65);K.position.set(3,6,2);v.add(K);const H=new V(new ae(18,18),new W({color:"#1b2a3f",roughness:.95,metalness:.03}));H.rotation.x=-Math.PI/2;v.add(H);const Se=new ie(.9,.9,.9),Ce=new W({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const n=new V(Se,Ce);n.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),v.add(n)}const Fe=new ce(2.6,3.2),L=se(Fe);L.position.set(0,1.6,-3.5);v.add(L);const I=we({scene:v,anchor:L}),_=de(),Re=u.getContext(),Pe=Me(Re);let q=!1,C=null;const j=new R("#220d17"),U=le({output:S.contentWindow,inputFilter:S.contentWindow});let A=[],F=null,z=null;U.onMessage(t=>{if(Ae(t)){F=A,A=[];return}if(_e(t)){A.push(t);return}const n=t;n&&n.type==="netgl:ready"&&(C=n.anchor,j.setRGB(n.background.r,n.background.g,n.background.b),q=!0)});const Te=ye(m,u.domElement),$e=()=>{const t=window.innerWidth,n=window.innerHeight;u.setSize(t,n),m.aspect=t/n,m.updateProjectionMatrix()};window.addEventListener("resize",$e);const D=new pe,B=new R,x=new y,k=new y,E=new y,Y=()=>{const t=D.getDelta(),n=D.elapsedTime;if(Te.update(t),u.resetState(),u.setRenderTarget(null),u.clear(!0,!0,!0),I.renderAsSource(u,m),q&&C){B.copy(j),_.update(L,m,B),u.render(_.scene,_.camera),u.clearDepth();let o=F;if(o?(F=null,z=o):o=z,o){for(let r=0;r<o.length;r+=1)Pe(o[r]);u.resetState()}m.getWorldPosition(x),k.set(0,0,-1).applyQuaternion(m.quaternion),E.set(0,1,0).applyQuaternion(m.quaternion);const s=ue({position:[x.x,x.y,x.z],forward:[k.x,k.y,k.z],up:[E.x,E.y,E.z]},{source:I.getAnchor(),target:C}),d=Array.from(m.projectionMatrix.elements),a=u.getPixelRatio(),e=Math.max(1,Math.floor(window.innerWidth*a)),i=Math.max(1,Math.floor(window.innerHeight*a));U.post({type:"netgl:setPose",pose:s,projection:d,viewport:{width:e,height:i},time:n})}requestAnimationFrame(Y)};Y();
