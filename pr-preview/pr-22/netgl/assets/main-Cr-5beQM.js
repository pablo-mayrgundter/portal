import{V as h,M as pe,Q as ue,E as D,W as ge,S as fe,N as he,P as we,a as me,C,H as ye,D as be,b as Q,c as xe,d as Z,B as ve,m as ke,e as Ee,w as Ae,f as Le,g as Me,h as _e}from"./index-C07WEOM6.js";const O=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],Re=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],R=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],S=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],z=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],y=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},G=e=>{const t=y(e.normal),n=y(e.up),r=y(z(n,t)),s=y(z(t,r));return{right:r,up:s,normal:t}},J=(e,t)=>[S(e,t.right),S(e,t.up),S(e,t.normal)],ee=(e,t)=>O(O(R(t.right,e[0]),R(t.up,e[1])),R(t.normal,e[2])),te=e=>[-e[0],e[1],-e[2]],B=(e,t,n)=>y(ee(te(J(e,t)),n)),Se=(e,t)=>{const n=G(t.source),r=G(t.target),s=Re(e.position,t.source.position),o=J(s,n),i=te(o),a={position:O(t.target.position,ee(i,r))};return e.forward&&(a.forward=B(e.forward,n,r)),e.up&&(a.up=B(e.up,n,r)),a},Pe=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."}],Ie=`
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
`,Oe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',W='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ce=(e,t)=>{const n=e==="three";return t==="three"?n?".":"..":n?`${t}/`:`../${t}/`},U=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Ne=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Ie,document.head.appendChild(t);const n=document.createElement("aside");n.id="portal-nav-drawer",n.setAttribute("aria-hidden","false"),n.setAttribute("aria-label","Portal demos"),n.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Pe.map(o=>`
        <li${o.key===e?' class="portal-nav-current"':""}>
          <a href="${Ce(e,o.key)}"${o.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${U(o.label)}</span>
            <span class="portal-nav-desc">${U(o.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=W,document.body.appendChild(n),document.body.appendChild(r);const s=o=>{n.setAttribute("aria-hidden",o?"false":"true"),r.setAttribute("aria-expanded",o?"true":"false"),r.setAttribute("aria-label",o?"Close demos menu":"Toggle demos menu"),r.innerHTML=o?W:Oe};r.addEventListener("click",o=>{o.stopPropagation(),s(n.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",o=>{n.getAttribute("aria-hidden")==="true"||o.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||s(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&n.getAttribute("aria-hidden")==="false"&&s(!1)})},Te=(e,t,n={})=>{const r=n.moveSpeed??4,s=n.lookSensitivity??.0025;let o=0,i=0;const a=new Set;Fe(t,(u,_)=>{o-=u*s,i-=_*s,i=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,i))}),window.addEventListener("keydown",u=>a.add(u.code)),window.addEventListener("keyup",u=>a.delete(u.code)),De(a);const l=new h,p=new h,d=new h,b=u=>{e.quaternion.setFromEuler(new D(i,o,0,"YXZ")),p.set(0,0,-1).applyQuaternion(e.quaternion),d.set(1,0,0).applyQuaternion(e.quaternion),l.set(0,0,0),a.has("KeyW")&&l.add(p),a.has("KeyS")&&l.sub(p),a.has("KeyD")&&l.add(d),a.has("KeyA")&&l.sub(d),l.y=0,l.lengthSq()>0&&(l.normalize().multiplyScalar(r*u),e.position.add(l))},N=new pe,T=new ue,M=new D(0,0,0,"YXZ"),de=new h(0,0,0),F=new h,ce=new h(0,1,0);return{update:b,setOrientationFromForward:u=>{F.copy(u).normalize(),N.lookAt(de,F,ce),T.setFromRotationMatrix(N),M.setFromQuaternion(T,"YXZ"),i=M.x,o=M.y},clearKeys:()=>{a.clear()},getKeys:()=>Array.from(a),setKeys:u=>{a.clear();for(const _ of u)a.add(_)}}},Fe=(e,t)=>{let n=null,r=0,s=0;e.addEventListener("pointerdown",i=>{if(n===null&&(n=i.pointerId,r=i.clientX,s=i.clientY,i.pointerType!=="mouse"))try{e.setPointerCapture(i.pointerId)}catch{}});const o=i=>{i.pointerId===n&&(n=null)};window.addEventListener("pointerup",o),window.addEventListener("pointercancel",o),window.addEventListener("pointermove",i=>{if(i.pointerId!==n)return;const a=i.clientX-r,l=i.clientY-s;r=i.clientX,s=i.clientY,t(a,l)})},De=e=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement controls"),n.innerHTML=`
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
  `,document.head.appendChild(r),document.body.appendChild(n);for(const s of n.querySelectorAll(".wasd-btn")){const o=s.dataset.key,i=l=>{l.preventDefault(),l.stopPropagation(),e.add(o),s.classList.add("is-active");try{s.setPointerCapture(l.pointerId)}catch{}},a=l=>{l.stopPropagation(),e.delete(o),s.classList.remove("is-active")};s.addEventListener("pointerdown",i),s.addEventListener("pointerup",a),s.addEventListener("pointercancel",a),s.addEventListener("pointerleave",a),s.addEventListener("contextmenu",l=>l.preventDefault())}},ze={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Ge=e=>{const t=new Map,n=r=>{if(r==null)return null;const s=typeof r;if(s==="number"||s==="string"||s==="boolean")return r;if(Array.isArray(r))return r.map(n);if(typeof r!="object")return r;const o=r;if("__netgl_handle"in o){const i=o.__netgl_handle,a=t.get(i);if(a===void 0)throw new Error(`NetGL replay: unknown handle id ${i}`);return a}if("__netgl_typedarray"in o){const i=o.__netgl_typedarray,a=ze[i];if(!a)throw new Error(`NetGL replay: unknown typed-array ${i}`);return new a(o.buffer,o.offset,o.length)}if("__netgl_arraybuffer"in o)return o.__netgl_arraybuffer;throw new Error("NetGL replay: unknown encoded value shape")};return r=>{const s=r.args.map(n),o=e[r.name];if(typeof o!="function")throw new Error(`NetGL replay: receiver has no method '${r.name}'`);const i=o.apply(e,s);r.returnId!==void 0&&i!=null&&typeof i=="object"&&t.set(r.returnId,i)}};Ne("netgl");const ne=document.querySelector("#app");if(!ne)throw new Error("Missing #app");const A=document.querySelector("#target-iframe");if(!A)throw new Error("Missing #target-iframe");const Be=new URLSearchParams(location.search),K=Be.get("log")==="1";location.search&&(A.src=`target.html${location.search}`);const c=new ge({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});c.outputColorSpace=fe;c.toneMapping=he;c.setPixelRatio(Math.min(window.devicePixelRatio,2));c.setSize(window.innerWidth,window.innerHeight);c.autoClear=!1;ne.appendChild(c.domElement);const f=new we(70,window.innerWidth/window.innerHeight,.02,200);f.position.set(0,1.6,5.5);const m=new me;m.background=new C("#101826");m.add(new ye(12176639,2241348,1));const re=new be(16777215,.65);re.position.set(3,6,2);m.add(re);const oe=new Q(new xe(18,18),new Z({color:"#1b2a3f",roughness:.95,metalness:.03}));oe.rotation.x=-Math.PI/2;m.add(oe);const We=new ve(.9,.9,.9),Ue=new Z({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new Q(We,Ue);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),m.add(t)}const Ke=new Le(2.6,3.2),L=ke(Ke);L.position.set(0,1.6,-3.5);m.add(L);const V=_e({scene:m,anchor:L}),P=Ee(),g=c.getContext(),H=Ge(g);let ae=!1,k=null;const ie=new C("#220d17"),se=Ae({output:A.contentWindow,inputFilter:A.contentWindow});let I=[],E=null;se.onMessage(e=>{if(!e||typeof e!="object")return;const t=e;if("type"in t){if(t.type==="netgl:ready"){const n=t;k=n.anchor,ie.setRGB(n.background.r,n.background.g,n.background.b),ae=!0;return}if(t.type==="netgl:frame-end"){E=I,I=[];return}}"name"in t&&typeof t.name=="string"&&I.push(t)});const Ve=Te(f,c.domElement),He=()=>{const e=window.innerWidth,t=window.innerHeight;c.setSize(e,t),f.aspect=e/t,f.updateProjectionMatrix()};window.addEventListener("resize",He);const $=new Me,j=new C,w=new h,x=new h,v=new h;let Y=0,q=0,X=0;const le=()=>{const e=$.getDelta(),t=$.elapsedTime;if(Ve.update(e),c.resetState(),c.setRenderTarget(null),c.clear(!0,!0,!0),V.renderAsSource(c,f),ae&&k){if(j.copy(ie),P.update(L,f,j),c.render(P.scene,P.camera),c.clearDepth(),E){const a=E;if(E=null,X=a.length,K){const l=d=>d===g.NO_ERROR?"NO_ERROR":d===g.INVALID_ENUM?"INVALID_ENUM":d===g.INVALID_VALUE?"INVALID_VALUE":d===g.INVALID_OPERATION?"INVALID_OPERATION":d===g.INVALID_FRAMEBUFFER_OPERATION?"INVALID_FRAMEBUFFER_OPERATION":d===g.OUT_OF_MEMORY?"OUT_OF_MEMORY":d===g.CONTEXT_LOST_WEBGL?"CONTEXT_LOST_WEBGL":"UNKNOWN("+d+")";let p=null;for(let d=0;d<a.length;d+=1)if(H(a[d]),!p){const b=g.getError();b!==g.NO_ERROR&&(p={call:a[d],code:b})}p&&console.warn("[host] replay GL error:",l(p.code),"on call:",p.call.name,"args:",p.call.args)}else for(let l=0;l<a.length;l+=1)H(a[l]);c.resetState()}f.getWorldPosition(w),x.set(0,0,-1).applyQuaternion(f.quaternion),v.set(0,1,0).applyQuaternion(f.quaternion);const n=Se({position:[w.x,w.y,w.z],forward:[x.x,x.y,x.z],up:[v.x,v.y,v.z]},{source:V.getAnchor(),target:k}),r=Array.from(f.projectionMatrix.elements),s=c.getPixelRatio(),o=Math.max(1,Math.floor(window.innerWidth*s)),i=Math.max(1,Math.floor(window.innerHeight*s));if(se.post({type:"netgl:setPose",pose:n,projection:r,viewport:{width:o,height:i},time:t}),q+=1,K&&t-Y>1){Y=t;const a=l=>`[${l.map(p=>p.toFixed(2)).join(", ")}]`;console.log("[host] setPose#"+q,"host pos:",a([w.x,w.y,w.z]),"coupled pos:",a(n.position),"coupled fwd:",a(n.forward??[0,0,-1]),"viewport:",o+"x"+i,"lastDrain:",X+" calls","iframeAnchor:",k)}}requestAnimationFrame(le)};le();
