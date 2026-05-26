import{V as b,M as ie,Q as le,E as z,W as de,S as ce,N as pe,P as ue,a as ge,C as O,H as fe,D as he,b as Q,c as we,d as Z,B as me,m as be,e as ye,w as ve,f as xe,g as Ee,h as ke,i as Le}from"./index-C-RzI6Ke.js";const Ae=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."}],_e=`
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
`,Me='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',B='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Se=(o,r)=>{const e=o==="three";return r==="three"?e?".":"..":e?`${r}/`:`../${r}/`},V=o=>o.replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r]),Pe=o=>{if(document.getElementById("portal-nav-toggle"))return;const r=document.createElement("style");r.id="portal-nav-styles",r.textContent=_e,document.head.appendChild(r);const e=document.createElement("aside");e.id="portal-nav-drawer",e.setAttribute("aria-hidden","false"),e.setAttribute("aria-label","Portal demos"),e.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Ae.map(t=>`
        <li${t.key===o?' class="portal-nav-current"':""}>
          <a href="${Se(o,t.key)}"${t.key===o?' aria-current="page"':""}>
            <span class="portal-nav-label">${V(t.label)}</span>
            <span class="portal-nav-desc">${V(t.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const n=document.createElement("button");n.id="portal-nav-toggle",n.type="button",n.setAttribute("aria-label","Close demos menu"),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-controls","portal-nav-drawer"),n.innerHTML=B,document.body.appendChild(e),document.body.appendChild(n);const l=t=>{e.setAttribute("aria-hidden",t?"false":"true"),n.setAttribute("aria-expanded",t?"true":"false"),n.setAttribute("aria-label",t?"Close demos menu":"Toggle demos menu"),n.innerHTML=t?B:Me};n.addEventListener("click",t=>{t.stopPropagation(),l(e.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",t=>{e.getAttribute("aria-hidden")==="true"||t.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",t=>{t.key==="Escape"&&e.getAttribute("aria-hidden")==="false"&&l(!1)})},Re=(o,r,e={})=>{const n=e.moveSpeed??4,l=e.lookSensitivity??.0025;let t=0,a=0;const d=new Set;Te(r,(g,k)=>{t-=g*l,a-=k*l,a=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a))}),window.addEventListener("keydown",g=>d.add(g.code)),window.addEventListener("keyup",g=>d.delete(g.code)),Ie(d);const i=new b,f=new b,m=new b,R=g=>{o.quaternion.setFromEuler(new z(a,t,0,"YXZ")),f.set(0,0,-1).applyQuaternion(o.quaternion),m.set(1,0,0).applyQuaternion(o.quaternion),i.set(0,0,0),d.has("KeyW")&&i.add(f),d.has("KeyS")&&i.sub(f),d.has("KeyD")&&i.add(m),d.has("KeyA")&&i.sub(m),i.y=0,i.lengthSq()>0&&(i.normalize().multiplyScalar(n*g),o.position.add(i))},E=new ie,c=new le,p=new z(0,0,0,"YXZ"),h=new b(0,0,0),L=new b,y=new b(0,1,0);return{update:R,setOrientationFromForward:g=>{L.copy(g).normalize(),E.lookAt(h,L,y),c.setFromRotationMatrix(E),p.setFromQuaternion(c,"YXZ"),a=p.x,t=p.y},clearKeys:()=>{d.clear()},getKeys:()=>Array.from(d),setKeys:g=>{d.clear();for(const k of g)d.add(k)}}},Te=(o,r)=>{let e=null,n=0,l=0;o.addEventListener("pointerdown",a=>{if(e===null&&(e=a.pointerId,n=a.clientX,l=a.clientY,a.pointerType!=="mouse"))try{o.setPointerCapture(a.pointerId)}catch{}});const t=a=>{a.pointerId===e&&(e=null)};window.addEventListener("pointerup",t),window.addEventListener("pointercancel",t),window.addEventListener("pointermove",a=>{if(a.pointerId!==e)return;const d=a.clientX-n,i=a.clientY-l;n=a.clientX,l=a.clientY,r(d,i)})},Ie=o=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const e=document.createElement("div");e.className="wasd-pad",e.setAttribute("aria-label","Movement controls"),e.innerHTML=`
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
  `,document.head.appendChild(n),document.body.appendChild(e);for(const l of e.querySelectorAll(".wasd-btn")){const t=l.dataset.key,a=i=>{i.preventDefault(),i.stopPropagation(),o.add(t),l.classList.add("is-active");try{l.setPointerCapture(i.pointerId)}catch{}},d=i=>{i.stopPropagation(),o.delete(t),l.classList.remove("is-active")};l.addEventListener("pointerdown",a),l.addEventListener("pointerup",d),l.addEventListener("pointercancel",d),l.addEventListener("pointerleave",d),l.addEventListener("contextmenu",i=>i.preventDefault())}},Ne={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Ce=o=>{const r=new Map,e=n=>{if(n==null)return null;const l=typeof n;if(l==="number"||l==="string"||l==="boolean")return n;if(Array.isArray(n))return n.map(e);if(typeof n!="object")return n;const t=n;if("__netgl_handle"in t){const a=t.__netgl_handle,d=r.get(a);if(d===void 0)throw new Error(`NetGL replay: unknown handle id ${a}`);return d}if("__netgl_typedarray"in t){const a=t.__netgl_typedarray,d=Ne[a];if(!d)throw new Error(`NetGL replay: unknown typed-array ${a}`);return new d(t.buffer,t.offset,t.length)}if("__netgl_arraybuffer"in t)return t.__netgl_arraybuffer;throw new Error("NetGL replay: unknown encoded value shape")};return n=>{const l=n.args.map(e),t=o[n.name];if(typeof t!="function")throw new Error(`NetGL replay: receiver has no method '${n.name}'`);const a=t.apply(o,l);n.returnId!==void 0&&a!=null&&typeof a=="object"&&r.set(n.returnId,a)}};Pe("netgl");const J=document.querySelector("#app");if(!J)throw new Error("Missing #app");const S=document.querySelector("#target-iframe");if(!S)throw new Error("Missing #target-iframe");const Oe=new URLSearchParams(location.search),W=Oe.get("log")==="1";location.search&&(S.src=`target.html${location.search}`);const u=new de({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});u.outputColorSpace=ce;u.toneMapping=pe;u.setPixelRatio(Math.min(window.devicePixelRatio,2));u.setSize(window.innerWidth,window.innerHeight);u.autoClear=!1;J.appendChild(u.domElement);const w=new ue(70,window.innerWidth/window.innerHeight,.02,200);w.position.set(0,1.6,5.5);const x=new ge;x.background=new O("#101826");x.add(new fe(12176639,2241348,1));const ee=new he(16777215,.65);ee.position.set(3,6,2);x.add(ee);const te=new Q(new we(18,18),new Z({color:"#1b2a3f",roughness:.95,metalness:.03}));te.rotation.x=-Math.PI/2;x.add(te);const Fe=new me(.9,.9,.9),De=new Z({color:"#5da9ff",roughness:.35});for(let o=0;o<14;o+=1){const r=new Q(Fe,De);r.position.set(Math.sin(o*.5)*4,.45,-3-o*.65),x.add(r)}const Ge=new xe(2.6,3.2),P=be(Ge);P.position.set(0,1.6,-3.5);x.add(P);const K=Le({scene:x,anchor:P}),T=ye(),s=u.getContext(),H=Ce(s);let ne=!1,M=null;const re=new O("#220d17"),oe=ve({output:S.contentWindow,inputFilter:S.contentWindow});let I=[],C=null,$=null;oe.onMessage(o=>{if(!o||typeof o!="object")return;const r=o;if("type"in r){if(r.type==="netgl:ready"){const e=r;M=e.anchor,re.setRGB(e.background.r,e.background.g,e.background.b),ne=!0;return}if(r.type==="netgl:frame-end"){C=I,I=[];return}}"name"in r&&typeof r.name=="string"&&I.push(r)});const Ue=Re(w,u.domElement),ze=()=>{const o=window.innerWidth,r=window.innerHeight;u.setSize(o,r),w.aspect=o/r,w.updateProjectionMatrix()};window.addEventListener("resize",ze);const X=new Ee,Y=new O,v=new b,A=new b,_=new b;let N=0,q=0,j=0;const ae=()=>{const o=X.getDelta(),r=X.elapsedTime;if(Ue.update(o),u.resetState(),u.setRenderTarget(null),u.clear(!0,!0,!0),K.renderAsSource(u,w),ne&&M){Y.copy(re),T.update(P,w,Y),u.render(T.scene,T.camera),u.clearDepth();let e=C;if(e?(C=null,$=e):e=$,e){if(j=e.length,W){const i=c=>c===s.NO_ERROR?"NO_ERROR":c===s.INVALID_ENUM?"INVALID_ENUM":c===s.INVALID_VALUE?"INVALID_VALUE":c===s.INVALID_OPERATION?"INVALID_OPERATION":c===s.INVALID_FRAMEBUFFER_OPERATION?"INVALID_FRAMEBUFFER_OPERATION":c===s.OUT_OF_MEMORY?"OUT_OF_MEMORY":c===s.CONTEXT_LOST_WEBGL?"CONTEXT_LOST_WEBGL":"UNKNOWN("+c+")";let f=null;const m={},R=new Set(["viewport","scissor","bindFramebuffer","useProgram","bindVertexArray"]),E={};for(let c=0;c<e.length;c+=1){const p=e[c];if(m[p.name]=(m[p.name]??0)+1,R.has(p.name)&&(E[p.name]??=[]).push(p.args),H(p),!f){const h=s.getError();h!==s.NO_ERROR&&(f={call:p,code:h})}}if(f&&console.warn("[host] replay GL error:",i(f.code),"on call:",f.call.name,"args:",f.call.args),r-N>.99){console.log("[host] drain calls:",m),console.log("[host] all interesting args:",E);const c=s.getParameter(s.FRAMEBUFFER_BINDING),p=s.getParameter(s.VIEWPORT),h=s.getParameter(s.SCISSOR_BOX),L=s.getParameter(s.CURRENT_PROGRAM),y=s.getParameter(s.COLOR_WRITEMASK),F=s.getParameter(s.STENCIL_TEST),D=s.getParameter(s.STENCIL_FUNC),G=s.getParameter(s.STENCIL_REF),U=s.getParameter(s.STENCIL_VALUE_MASK),g=s.getParameter(s.SCISSOR_TEST),k=s.getParameter(s.DEPTH_TEST),se=s.getParameter(s.DEPTH_FUNC);console.log("[host] post-drain GL state:",{framebuffer:c?"non-null":"null",viewport:p?[p[0],p[1],p[2],p[3]]:null,scissor:h?[h[0],h[1],h[2],h[3]]:null,scissorTest:g,currentProgram:L?"non-null":"null",colorMask:y?[y[0],y[1],y[2],y[3]]:null,stencilTest:F,stencilFunc:"0x"+D?.toString(16),stencilRef:G,stencilValueMask:"0x"+U?.toString(16),depthTest:k,depthFunc:"0x"+se?.toString(16)})}}else for(let i=0;i<e.length;i+=1)H(e[i]);u.resetState()}w.getWorldPosition(v),A.set(0,0,-1).applyQuaternion(w.quaternion),_.set(0,1,0).applyQuaternion(w.quaternion);const n=ke({position:[v.x,v.y,v.z],forward:[A.x,A.y,A.z],up:[_.x,_.y,_.z]},{source:K.getAnchor(),target:M}),l=Array.from(w.projectionMatrix.elements),t=u.getPixelRatio(),a=Math.max(1,Math.floor(window.innerWidth*t)),d=Math.max(1,Math.floor(window.innerHeight*t));if(oe.post({type:"netgl:setPose",pose:n,projection:l,viewport:{width:a,height:d},time:r}),q+=1,W&&r-N>1){N=r;const i=f=>`[${f.map(m=>m.toFixed(2)).join(", ")}]`;console.log("[host] setPose#"+q,"host pos:",i([v.x,v.y,v.z]),"coupled pos:",i(n.position),"coupled fwd:",i(n.forward??[0,0,-1]),"viewport:",a+"x"+d,"lastDrain:",j+" calls","iframeAnchor:",M)}}requestAnimationFrame(ae)};ae();
