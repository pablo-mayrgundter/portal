import{V as h,M as pe,Q as ue,E as z,W as ge,S as fe,N as he,P as we,a as me,C as F,H as ye,D as be,b as Q,c as xe,d as Z,B as ve,m as ke,e as Ee,w as Ae,f as Le,g as Me,h as _e}from"./index-C07WEOM6.js";const T=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],Re=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],P=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],I=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],G=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],v=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},B=e=>{const t=v(e.normal),n=v(e.up),r=v(G(n,t)),i=v(G(t,r));return{right:r,up:i,normal:t}},J=(e,t)=>[I(e,t.right),I(e,t.up),I(e,t.normal)],ee=(e,t)=>T(T(P(t.right,e[0]),P(t.up,e[1])),P(t.normal,e[2])),te=e=>[-e[0],e[1],-e[2]],W=(e,t,n)=>v(ee(te(J(e,t)),n)),Se=(e,t)=>{const n=B(t.source),r=B(t.target),i=Re(e.position,t.source.position),o=J(i,n),a=te(o),s={position:T(t.target.position,ee(a,r))};return e.forward&&(s.forward=W(e.forward,n,r)),e.up&&(s.up=W(e.up,n,r)),s},Pe=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."}],Ie=`
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
`,Oe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',U='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ce=(e,t)=>{const n=e==="three";return t==="three"?n?".":"..":n?`${t}/`:`../${t}/`},K=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Ne=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Ie,document.head.appendChild(t);const n=document.createElement("aside");n.id="portal-nav-drawer",n.setAttribute("aria-hidden","false"),n.setAttribute("aria-label","Portal demos"),n.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Pe.map(o=>`
        <li${o.key===e?' class="portal-nav-current"':""}>
          <a href="${Ce(e,o.key)}"${o.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${K(o.label)}</span>
            <span class="portal-nav-desc">${K(o.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=U,document.body.appendChild(n),document.body.appendChild(r);const i=o=>{n.setAttribute("aria-hidden",o?"false":"true"),r.setAttribute("aria-expanded",o?"true":"false"),r.setAttribute("aria-label",o?"Close demos menu":"Toggle demos menu"),r.innerHTML=o?U:Oe};r.addEventListener("click",o=>{o.stopPropagation(),i(n.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",o=>{n.getAttribute("aria-hidden")==="true"||o.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||i(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&n.getAttribute("aria-hidden")==="false"&&i(!1)})},Te=(e,t,n={})=>{const r=n.moveSpeed??4,i=n.lookSensitivity??.0025;let o=0,a=0;const s=new Set;Fe(t,(u,S)=>{o-=u*i,a-=S*i,a=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a))}),window.addEventListener("keydown",u=>s.add(u.code)),window.addEventListener("keyup",u=>s.delete(u.code)),De(s);const l=new h,p=new h,w=new h,c=u=>{e.quaternion.setFromEuler(new z(a,o,0,"YXZ")),p.set(0,0,-1).applyQuaternion(e.quaternion),w.set(1,0,0).applyQuaternion(e.quaternion),l.set(0,0,0),s.has("KeyW")&&l.add(p),s.has("KeyS")&&l.sub(p),s.has("KeyD")&&l.add(w),s.has("KeyA")&&l.sub(w),l.y=0,l.lengthSq()>0&&(l.normalize().multiplyScalar(r*u),e.position.add(l))},m=new pe,x=new ue,R=new z(0,0,0,"YXZ"),de=new h(0,0,0),D=new h,ce=new h(0,1,0);return{update:c,setOrientationFromForward:u=>{D.copy(u).normalize(),m.lookAt(de,D,ce),x.setFromRotationMatrix(m),R.setFromQuaternion(x,"YXZ"),a=R.x,o=R.y},clearKeys:()=>{s.clear()},getKeys:()=>Array.from(s),setKeys:u=>{s.clear();for(const S of u)s.add(S)}}},Fe=(e,t)=>{let n=null,r=0,i=0;e.addEventListener("pointerdown",a=>{if(n===null&&(n=a.pointerId,r=a.clientX,i=a.clientY,a.pointerType!=="mouse"))try{e.setPointerCapture(a.pointerId)}catch{}});const o=a=>{a.pointerId===n&&(n=null)};window.addEventListener("pointerup",o),window.addEventListener("pointercancel",o),window.addEventListener("pointermove",a=>{if(a.pointerId!==n)return;const s=a.clientX-r,l=a.clientY-i;r=a.clientX,i=a.clientY,t(s,l)})},De=e=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement controls"),n.innerHTML=`
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
  `,document.head.appendChild(r),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const o=i.dataset.key,a=l=>{l.preventDefault(),l.stopPropagation(),e.add(o),i.classList.add("is-active");try{i.setPointerCapture(l.pointerId)}catch{}},s=l=>{l.stopPropagation(),e.delete(o),i.classList.remove("is-active")};i.addEventListener("pointerdown",a),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s),i.addEventListener("pointerleave",s),i.addEventListener("contextmenu",l=>l.preventDefault())}},ze={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Ge=e=>{const t=new Map,n=r=>{if(r==null)return null;const i=typeof r;if(i==="number"||i==="string"||i==="boolean")return r;if(Array.isArray(r))return r.map(n);if(typeof r!="object")return r;const o=r;if("__netgl_handle"in o){const a=o.__netgl_handle,s=t.get(a);if(s===void 0)throw new Error(`NetGL replay: unknown handle id ${a}`);return s}if("__netgl_typedarray"in o){const a=o.__netgl_typedarray,s=ze[a];if(!s)throw new Error(`NetGL replay: unknown typed-array ${a}`);return new s(o.buffer,o.offset,o.length)}if("__netgl_arraybuffer"in o)return o.__netgl_arraybuffer;throw new Error("NetGL replay: unknown encoded value shape")};return r=>{const i=r.args.map(n),o=e[r.name];if(typeof o!="function")throw new Error(`NetGL replay: receiver has no method '${r.name}'`);const a=o.apply(e,i);r.returnId!==void 0&&a!=null&&typeof a=="object"&&t.set(r.returnId,a)}};Ne("netgl");const ne=document.querySelector("#app");if(!ne)throw new Error("Missing #app");const M=document.querySelector("#target-iframe");if(!M)throw new Error("Missing #target-iframe");const Be=new URLSearchParams(location.search),V=Be.get("log")==="1";location.search&&(M.src=`target.html${location.search}`);const d=new ge({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});d.outputColorSpace=fe;d.toneMapping=he;d.setPixelRatio(Math.min(window.devicePixelRatio,2));d.setSize(window.innerWidth,window.innerHeight);d.autoClear=!1;ne.appendChild(d.domElement);const f=new we(70,window.innerWidth/window.innerHeight,.02,200);f.position.set(0,1.6,5.5);const b=new me;b.background=new F("#101826");b.add(new ye(12176639,2241348,1));const re=new be(16777215,.65);re.position.set(3,6,2);b.add(re);const oe=new Q(new xe(18,18),new Z({color:"#1b2a3f",roughness:.95,metalness:.03}));oe.rotation.x=-Math.PI/2;b.add(oe);const We=new ve(.9,.9,.9),Ue=new Z({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new Q(We,Ue);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),b.add(t)}const Ke=new Le(2.6,3.2),_=ke(Ke);_.position.set(0,1.6,-3.5);b.add(_);const H=_e({scene:b,anchor:_}),O=Ee(),g=d.getContext(),$=Ge(g);let ae=!1,A=null;const se=new F("#220d17"),ie=Ae({output:M.contentWindow,inputFilter:M.contentWindow});let C=[],L=null;ie.onMessage(e=>{if(!e||typeof e!="object")return;const t=e;if("type"in t){if(t.type==="netgl:ready"){const n=t;A=n.anchor,se.setRGB(n.background.r,n.background.g,n.background.b),ae=!0;return}if(t.type==="netgl:frame-end"){L=C,C=[];return}}"name"in t&&typeof t.name=="string"&&C.push(t)});const Ve=Te(f,d.domElement),He=()=>{const e=window.innerWidth,t=window.innerHeight;d.setSize(e,t),f.aspect=e/t,f.updateProjectionMatrix()};window.addEventListener("resize",He);const j=new Me,Y=new F,y=new h,k=new h,E=new h;let N=0,q=0,X=0;const le=()=>{const e=j.getDelta(),t=j.elapsedTime;if(Ve.update(e),d.resetState(),d.setRenderTarget(null),d.clear(!0,!0,!0),H.renderAsSource(d,f),ae&&A){if(Y.copy(se),O.update(_,f,Y),d.render(O.scene,O.camera),d.clearDepth(),L){const s=L;if(L=null,X=s.length,V){const l=c=>c===g.NO_ERROR?"NO_ERROR":c===g.INVALID_ENUM?"INVALID_ENUM":c===g.INVALID_VALUE?"INVALID_VALUE":c===g.INVALID_OPERATION?"INVALID_OPERATION":c===g.INVALID_FRAMEBUFFER_OPERATION?"INVALID_FRAMEBUFFER_OPERATION":c===g.OUT_OF_MEMORY?"OUT_OF_MEMORY":c===g.CONTEXT_LOST_WEBGL?"CONTEXT_LOST_WEBGL":"UNKNOWN("+c+")";let p=null;const w={};for(let c=0;c<s.length;c+=1){const m=s[c];if(w[m.name]=(w[m.name]??0)+1,$(m),!p){const x=g.getError();x!==g.NO_ERROR&&(p={call:m,code:x})}}p&&console.warn("[host] replay GL error:",l(p.code),"on call:",p.call.name,"args:",p.call.args),t-N>.99&&console.log("[host] drain calls:",w)}else for(let l=0;l<s.length;l+=1)$(s[l]);d.resetState()}f.getWorldPosition(y),k.set(0,0,-1).applyQuaternion(f.quaternion),E.set(0,1,0).applyQuaternion(f.quaternion);const n=Se({position:[y.x,y.y,y.z],forward:[k.x,k.y,k.z],up:[E.x,E.y,E.z]},{source:H.getAnchor(),target:A}),r=Array.from(f.projectionMatrix.elements),i=d.getPixelRatio(),o=Math.max(1,Math.floor(window.innerWidth*i)),a=Math.max(1,Math.floor(window.innerHeight*i));if(ie.post({type:"netgl:setPose",pose:n,projection:r,viewport:{width:o,height:a},time:t}),q+=1,V&&t-N>1){N=t;const s=l=>`[${l.map(p=>p.toFixed(2)).join(", ")}]`;console.log("[host] setPose#"+q,"host pos:",s([y.x,y.y,y.z]),"coupled pos:",s(n.position),"coupled fwd:",s(n.forward??[0,0,-1]),"viewport:",o+"x"+a,"lastDrain:",X+" calls","iframeAnchor:",A)}}requestAnimationFrame(le)};le();
