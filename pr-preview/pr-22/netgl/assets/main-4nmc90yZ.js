import{V as m,M as se,Q as ie,E as z,W as le,S as de,N as ce,P as pe,a as ue,C as O,H as ge,D as fe,b as j,c as he,d as Q,B as we,m as me,e as be,w as ye,f as ve,g as xe,h as Ee,i as ke}from"./index-C-RzI6Ke.js";const Le=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."}],Ae=`
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
`,_e='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',B='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Me=(o,r)=>{const t=o==="three";return r==="three"?t?".":"..":t?`${r}/`:`../${r}/`},V=o=>o.replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r]),Se=o=>{if(document.getElementById("portal-nav-toggle"))return;const r=document.createElement("style");r.id="portal-nav-styles",r.textContent=Ae,document.head.appendChild(r);const t=document.createElement("aside");t.id="portal-nav-drawer",t.setAttribute("aria-hidden","false"),t.setAttribute("aria-label","Portal demos"),t.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Le.map(e=>`
        <li${e.key===o?' class="portal-nav-current"':""}>
          <a href="${Me(o,e.key)}"${e.key===o?' aria-current="page"':""}>
            <span class="portal-nav-label">${V(e.label)}</span>
            <span class="portal-nav-desc">${V(e.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const n=document.createElement("button");n.id="portal-nav-toggle",n.type="button",n.setAttribute("aria-label","Close demos menu"),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-controls","portal-nav-drawer"),n.innerHTML=B,document.body.appendChild(t),document.body.appendChild(n);const l=e=>{t.setAttribute("aria-hidden",e?"false":"true"),n.setAttribute("aria-expanded",e?"true":"false"),n.setAttribute("aria-label",e?"Close demos menu":"Toggle demos menu"),n.innerHTML=e?B:_e};n.addEventListener("click",e=>{e.stopPropagation(),l(t.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",e=>{t.getAttribute("aria-hidden")==="true"||e.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",e=>{e.key==="Escape"&&t.getAttribute("aria-hidden")==="false"&&l(!1)})},Pe=(o,r,t={})=>{const n=t.moveSpeed??4,l=t.lookSensitivity??.0025;let e=0,a=0;const i=new Set;Re(r,(g,k)=>{e-=g*l,a-=k*l,a=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a))}),window.addEventListener("keydown",g=>i.add(g.code)),window.addEventListener("keyup",g=>i.delete(g.code)),Te(i);const d=new m,f=new m,b=new m,T=g=>{o.quaternion.setFromEuler(new z(a,e,0,"YXZ")),f.set(0,0,-1).applyQuaternion(o.quaternion),b.set(1,0,0).applyQuaternion(o.quaternion),d.set(0,0,0),i.has("KeyW")&&d.add(f),i.has("KeyS")&&d.sub(f),i.has("KeyD")&&d.add(b),i.has("KeyA")&&d.sub(b),d.y=0,d.lengthSq()>0&&(d.normalize().multiplyScalar(n*g),o.position.add(d))},E=new se,c=new ie,p=new z(0,0,0,"YXZ"),h=new m(0,0,0),L=new m,y=new m(0,1,0);return{update:T,setOrientationFromForward:g=>{L.copy(g).normalize(),E.lookAt(h,L,y),c.setFromRotationMatrix(E),p.setFromQuaternion(c,"YXZ"),a=p.x,e=p.y},clearKeys:()=>{i.clear()},getKeys:()=>Array.from(i),setKeys:g=>{i.clear();for(const k of g)i.add(k)}}},Re=(o,r)=>{let t=null,n=0,l=0;o.addEventListener("pointerdown",a=>{if(t===null&&(t=a.pointerId,n=a.clientX,l=a.clientY,a.pointerType!=="mouse"))try{o.setPointerCapture(a.pointerId)}catch{}});const e=a=>{a.pointerId===t&&(t=null)};window.addEventListener("pointerup",e),window.addEventListener("pointercancel",e),window.addEventListener("pointermove",a=>{if(a.pointerId!==t)return;const i=a.clientX-n,d=a.clientY-l;n=a.clientX,l=a.clientY,r(i,d)})},Te=o=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const t=document.createElement("div");t.className="wasd-pad",t.setAttribute("aria-label","Movement controls"),t.innerHTML=`
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
  `,document.head.appendChild(n),document.body.appendChild(t);for(const l of t.querySelectorAll(".wasd-btn")){const e=l.dataset.key,a=d=>{d.preventDefault(),d.stopPropagation(),o.add(e),l.classList.add("is-active");try{l.setPointerCapture(d.pointerId)}catch{}},i=d=>{d.stopPropagation(),o.delete(e),l.classList.remove("is-active")};l.addEventListener("pointerdown",a),l.addEventListener("pointerup",i),l.addEventListener("pointercancel",i),l.addEventListener("pointerleave",i),l.addEventListener("contextmenu",d=>d.preventDefault())}},Ie={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Ne=o=>{const r=new Map,t=n=>{if(n==null)return null;const l=typeof n;if(l==="number"||l==="string"||l==="boolean")return n;if(Array.isArray(n))return n.map(t);if(typeof n!="object")return n;const e=n;if("__netgl_handle"in e){const a=e.__netgl_handle,i=r.get(a);if(i===void 0)throw new Error(`NetGL replay: unknown handle id ${a}`);return i}if("__netgl_typedarray"in e){const a=e.__netgl_typedarray,i=Ie[a];if(!i)throw new Error(`NetGL replay: unknown typed-array ${a}`);return new i(e.buffer,e.offset,e.length)}if("__netgl_arraybuffer"in e)return e.__netgl_arraybuffer;throw new Error("NetGL replay: unknown encoded value shape")};return n=>{const l=n.args.map(t),e=o[n.name];if(typeof e!="function")throw new Error(`NetGL replay: receiver has no method '${n.name}'`);const a=e.apply(o,l);n.returnId!==void 0&&a!=null&&typeof a=="object"&&r.set(n.returnId,a)}};Se("netgl");const Z=document.querySelector("#app");if(!Z)throw new Error("Missing #app");const P=document.querySelector("#target-iframe");if(!P)throw new Error("Missing #target-iframe");const Ce=new URLSearchParams(location.search),W=Ce.get("log")==="1";location.search&&(P.src=`target.html${location.search}`);const u=new le({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});u.outputColorSpace=de;u.toneMapping=ce;u.setPixelRatio(Math.min(window.devicePixelRatio,2));u.setSize(window.innerWidth,window.innerHeight);u.autoClear=!1;Z.appendChild(u.domElement);const w=new pe(70,window.innerWidth/window.innerHeight,.02,200);w.position.set(0,1.6,5.5);const x=new ue;x.background=new O("#101826");x.add(new ge(12176639,2241348,1));const J=new fe(16777215,.65);J.position.set(3,6,2);x.add(J);const ee=new j(new he(18,18),new Q({color:"#1b2a3f",roughness:.95,metalness:.03}));ee.rotation.x=-Math.PI/2;x.add(ee);const Oe=new we(.9,.9,.9),Fe=new Q({color:"#5da9ff",roughness:.35});for(let o=0;o<14;o+=1){const r=new j(Oe,Fe);r.position.set(Math.sin(o*.5)*4,.45,-3-o*.65),x.add(r)}const De=new ve(2.6,3.2),R=me(De);R.position.set(0,1.6,-3.5);x.add(R);const K=ke({scene:x,anchor:R}),I=be(),s=u.getContext(),H=Ne(s);let te=!1,M=null;const ne=new O("#220d17"),re=ye({output:P.contentWindow,inputFilter:P.contentWindow});let N=[],S=null;re.onMessage(o=>{if(!o||typeof o!="object")return;const r=o;if("type"in r){if(r.type==="netgl:ready"){const t=r;M=t.anchor,ne.setRGB(t.background.r,t.background.g,t.background.b),te=!0;return}if(r.type==="netgl:frame-end"){S=N,N=[];return}}"name"in r&&typeof r.name=="string"&&N.push(r)});const Ge=Pe(w,u.domElement),Ue=()=>{const o=window.innerWidth,r=window.innerHeight;u.setSize(o,r),w.aspect=o/r,w.updateProjectionMatrix()};window.addEventListener("resize",Ue);const $=new xe,X=new O,v=new m,A=new m,_=new m;let C=0,Y=0,q=0;const oe=()=>{const o=$.getDelta(),r=$.elapsedTime;if(Ge.update(o),u.resetState(),u.setRenderTarget(null),u.clear(!0,!0,!0),K.renderAsSource(u,w),te&&M){if(X.copy(ne),I.update(R,w,X),u.render(I.scene,I.camera),u.clearDepth(),S){const i=S;if(S=null,q=i.length,W){const d=c=>c===s.NO_ERROR?"NO_ERROR":c===s.INVALID_ENUM?"INVALID_ENUM":c===s.INVALID_VALUE?"INVALID_VALUE":c===s.INVALID_OPERATION?"INVALID_OPERATION":c===s.INVALID_FRAMEBUFFER_OPERATION?"INVALID_FRAMEBUFFER_OPERATION":c===s.OUT_OF_MEMORY?"OUT_OF_MEMORY":c===s.CONTEXT_LOST_WEBGL?"CONTEXT_LOST_WEBGL":"UNKNOWN("+c+")";let f=null;const b={},T=new Set(["viewport","scissor","bindFramebuffer","useProgram","bindVertexArray"]),E={};for(let c=0;c<i.length;c+=1){const p=i[c];if(b[p.name]=(b[p.name]??0)+1,T.has(p.name)&&(E[p.name]??=[]).push(p.args),H(p),!f){const h=s.getError();h!==s.NO_ERROR&&(f={call:p,code:h})}}if(f&&console.warn("[host] replay GL error:",d(f.code),"on call:",f.call.name,"args:",f.call.args),r-C>.99){console.log("[host] drain calls:",b),console.log("[host] all interesting args:",E);const c=s.getParameter(s.FRAMEBUFFER_BINDING),p=s.getParameter(s.VIEWPORT),h=s.getParameter(s.SCISSOR_BOX),L=s.getParameter(s.CURRENT_PROGRAM),y=s.getParameter(s.COLOR_WRITEMASK),F=s.getParameter(s.STENCIL_TEST),D=s.getParameter(s.STENCIL_FUNC),G=s.getParameter(s.STENCIL_REF),U=s.getParameter(s.STENCIL_VALUE_MASK),g=s.getParameter(s.SCISSOR_TEST),k=s.getParameter(s.DEPTH_TEST),ae=s.getParameter(s.DEPTH_FUNC);console.log("[host] post-drain GL state:",{framebuffer:c?"non-null":"null",viewport:p?[p[0],p[1],p[2],p[3]]:null,scissor:h?[h[0],h[1],h[2],h[3]]:null,scissorTest:g,currentProgram:L?"non-null":"null",colorMask:y?[y[0],y[1],y[2],y[3]]:null,stencilTest:F,stencilFunc:"0x"+D?.toString(16),stencilRef:G,stencilValueMask:"0x"+U?.toString(16),depthTest:k,depthFunc:"0x"+ae?.toString(16)})}}else for(let d=0;d<i.length;d+=1)H(i[d]);u.resetState()}w.getWorldPosition(v),A.set(0,0,-1).applyQuaternion(w.quaternion),_.set(0,1,0).applyQuaternion(w.quaternion);const t=Ee({position:[v.x,v.y,v.z],forward:[A.x,A.y,A.z],up:[_.x,_.y,_.z]},{source:K.getAnchor(),target:M}),n=Array.from(w.projectionMatrix.elements),l=u.getPixelRatio(),e=Math.max(1,Math.floor(window.innerWidth*l)),a=Math.max(1,Math.floor(window.innerHeight*l));if(re.post({type:"netgl:setPose",pose:t,projection:n,viewport:{width:e,height:a},time:r}),Y+=1,W&&r-C>1){C=r;const i=d=>`[${d.map(f=>f.toFixed(2)).join(", ")}]`;console.log("[host] setPose#"+Y,"host pos:",i([v.x,v.y,v.z]),"coupled pos:",i(t.position),"coupled fwd:",i(t.forward??[0,0,-1]),"viewport:",e+"x"+a,"lastDrain:",q+" calls","iframeAnchor:",M)}}requestAnimationFrame(oe)};oe();
