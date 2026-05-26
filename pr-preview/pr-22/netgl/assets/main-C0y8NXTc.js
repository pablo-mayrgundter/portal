import{V as u,M as le,Q as de,E as D,W as ce,S as pe,N as ue,P as ge,a as we,C as R,H as he,D as fe,b as O,c as me,d as X,B as be,m as ye,e as xe,w as ve,f as ke,g as Me,h as Le}from"./index-BXhZkw9i.js";const _=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],Ae=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],E=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],S=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],G=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],f=e=>{const t=Math.hypot(e[0],e[1],e[2]);return t>0?[e[0]/t,e[1]/t,e[2]/t]:[0,0,1]},I=e=>{const t=f(e.normal),n=f(e.up),o=f(G(n,t)),i=f(G(t,o));return{right:o,up:i,normal:t}},Q=(e,t)=>[S(e,t.right),S(e,t.up),S(e,t.normal)],U=(e,t)=>_(_(E(t.right,e[0]),E(t.up,e[1])),E(t.normal,e[2])),V=e=>[-e[0],e[1],-e[2]],B=(e,t,n)=>f(U(V(Q(e,t)),n)),Ee=(e,t)=>{const n=I(t.source),o=I(t.target),i=Ae(e.position,t.source.position),r=Q(i,n),a=V(r),s={position:_(t.target.position,U(a,o))};return e.forward&&(s.forward=B(e.forward,n,o)),e.up&&(s.up=B(e.up,n,o)),s},Se=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."}],Pe=`
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
`,Ce='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',W='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',_e=(e,t)=>{const n=e==="three";return t==="three"?n?".":"..":n?`${t}/`:`../${t}/`},H=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Re=e=>{if(document.getElementById("portal-nav-toggle"))return;const t=document.createElement("style");t.id="portal-nav-styles",t.textContent=Pe,document.head.appendChild(t);const n=document.createElement("aside");n.id="portal-nav-drawer",n.setAttribute("aria-hidden","false"),n.setAttribute("aria-label","Portal demos"),n.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Se.map(r=>`
        <li${r.key===e?' class="portal-nav-current"':""}>
          <a href="${_e(e,r.key)}"${r.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${H(r.label)}</span>
            <span class="portal-nav-desc">${H(r.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const o=document.createElement("button");o.id="portal-nav-toggle",o.type="button",o.setAttribute("aria-label","Close demos menu"),o.setAttribute("aria-expanded","true"),o.setAttribute("aria-controls","portal-nav-drawer"),o.innerHTML=W,document.body.appendChild(n),document.body.appendChild(o);const i=r=>{n.setAttribute("aria-hidden",r?"false":"true"),o.setAttribute("aria-expanded",r?"true":"false"),o.setAttribute("aria-label",r?"Close demos menu":"Toggle demos menu"),o.innerHTML=r?W:Ce};o.addEventListener("click",r=>{r.stopPropagation(),i(n.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",r=>{n.getAttribute("aria-hidden")==="true"||r.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||i(!1)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&n.getAttribute("aria-hidden")==="false"&&i(!1)})},ze=(e,t,n={})=>{const o=n.moveSpeed??4,i=n.lookSensitivity??.0025;let r=0,a=0;const s=new Set;Fe(t,(c,A)=>{r-=c*i,a-=A*i,a=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a))}),window.addEventListener("keydown",c=>s.add(c.code)),window.addEventListener("keyup",c=>s.delete(c.code)),Te(s);const l=new u,h=new u,M=new u,ae=c=>{e.quaternion.setFromEuler(new D(a,r,0,"YXZ")),h.set(0,0,-1).applyQuaternion(e.quaternion),M.set(1,0,0).applyQuaternion(e.quaternion),l.set(0,0,0),s.has("KeyW")&&l.add(h),s.has("KeyS")&&l.sub(h),s.has("KeyD")&&l.add(M),s.has("KeyA")&&l.sub(M),l.y=0,l.lengthSq()>0&&(l.normalize().multiplyScalar(o*c),e.position.add(l))},z=new le,F=new de,L=new D(0,0,0,"YXZ"),se=new u(0,0,0),T=new u,ie=new u(0,1,0);return{update:ae,setOrientationFromForward:c=>{T.copy(c).normalize(),z.lookAt(se,T,ie),F.setFromRotationMatrix(z),L.setFromQuaternion(F,"YXZ"),a=L.x,r=L.y},clearKeys:()=>{s.clear()},getKeys:()=>Array.from(s),setKeys:c=>{s.clear();for(const A of c)s.add(A)}}},Fe=(e,t)=>{let n=null,o=0,i=0;e.addEventListener("pointerdown",a=>{if(n===null&&(n=a.pointerId,o=a.clientX,i=a.clientY,a.pointerType!=="mouse"))try{e.setPointerCapture(a.pointerId)}catch{}});const r=a=>{a.pointerId===n&&(n=null)};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),window.addEventListener("pointermove",a=>{if(a.pointerId!==n)return;const s=a.clientX-o,l=a.clientY-i;o=a.clientX,i=a.clientY,t(s,l)})},Te=e=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement controls"),n.innerHTML=`
    <button type="button" data-key="KeyW" class="wasd-btn wasd-up" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-down" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
  `;const o=document.createElement("style");o.textContent=`
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
  `,document.head.appendChild(o),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const r=i.dataset.key,a=l=>{l.preventDefault(),l.stopPropagation(),e.add(r),i.classList.add("is-active");try{i.setPointerCapture(l.pointerId)}catch{}},s=l=>{l.stopPropagation(),e.delete(r),i.classList.remove("is-active")};i.addEventListener("pointerdown",a),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s),i.addEventListener("pointerleave",s),i.addEventListener("contextmenu",l=>l.preventDefault())}},De={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Ge=e=>{const t=new Map,n=o=>{if(o==null)return null;const i=typeof o;if(i==="number"||i==="string"||i==="boolean")return o;if(Array.isArray(o))return o.map(n);if(typeof o!="object")return o;const r=o;if("__netgl_handle"in r){const a=r.__netgl_handle,s=t.get(a);if(s===void 0)throw new Error(`NetGL replay: unknown handle id ${a}`);return s}if("__netgl_typedarray"in r){const a=r.__netgl_typedarray,s=De[a];if(!s)throw new Error(`NetGL replay: unknown typed-array ${a}`);return new s(r.buffer,r.offset,r.length)}if("__netgl_arraybuffer"in r)return r.__netgl_arraybuffer;throw new Error("NetGL replay: unknown encoded value shape")};return o=>{const i=o.args.map(n),r=e[o.name];if(typeof r!="function")throw new Error(`NetGL replay: receiver has no method '${o.name}'`);const a=r.apply(e,i);o.returnId!==void 0&&a!=null&&typeof a=="object"&&t.set(o.returnId,a)}};Re("netgl");const Z=document.querySelector("#app");if(!Z)throw new Error("Missing #app");const v=document.querySelector("#target-iframe");if(!v)throw new Error("Missing #target-iframe");const Ie=new URLSearchParams(location.search),Be=Ie.get("log")==="1";location.search&&(v.src=`target.html${location.search}`);const d=new ce({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});d.outputColorSpace=pe;d.toneMapping=ue;d.setPixelRatio(Math.min(window.devicePixelRatio,2));d.setSize(window.innerWidth,window.innerHeight);d.autoClear=!1;Z.appendChild(d.domElement);const p=new ge(70,window.innerWidth/window.innerHeight,.02,200);p.position.set(0,1.6,5.5);const w=new we;w.background=new R("#101826");w.add(new he(12176639,2241348,1));const J=new fe(16777215,.65);J.position.set(3,6,2);w.add(J);const ee=new O(new me(18,18),new X({color:"#1b2a3f",roughness:.95,metalness:.03}));ee.rotation.x=-Math.PI/2;w.add(ee);const We=new be(.9,.9,.9),He=new X({color:"#5da9ff",roughness:.35});for(let e=0;e<14;e+=1){const t=new O(We,He);t.position.set(Math.sin(e*.5)*4,.45,-3-e*.65),w.add(t)}const Ke=new ke(2.6,3.2),k=ye(Ke);k.position.set(0,1.6,-3.5);w.add(k);const K=Le({scene:w,anchor:k}),P=xe(),$e=d.getContext(),je=Ge($e);let te=!1,y=null;const ne=new R("#220d17"),oe=ve({output:v.contentWindow,inputFilter:v.contentWindow});let C=[],x=null;oe.onMessage(e=>{if(!e||typeof e!="object")return;const t=e;if("type"in t){if(t.type==="netgl:ready"){const n=t;y=n.anchor,ne.setRGB(n.background.r,n.background.g,n.background.b),te=!0;return}if(t.type==="netgl:frame-end"){x=C,C=[];return}}"name"in t&&typeof t.name=="string"&&C.push(t)});const qe=ze(p,d.domElement),Ne=()=>{const e=window.innerWidth,t=window.innerHeight;d.setSize(e,t),p.aspect=e/t,p.updateProjectionMatrix()};window.addEventListener("resize",Ne);const $=new Me,j=new R,g=new u,m=new u,b=new u;let q=0,N=0,Y=0;const re=()=>{const e=$.getDelta(),t=$.elapsedTime;if(qe.update(e),d.resetState(),d.setRenderTarget(null),d.clear(!0,!0,!0),K.renderAsSource(d,p),te&&y){if(j.copy(ne),P.update(k,p,j),d.render(P.scene,P.camera),d.clearDepth(),x){const s=x;x=null,Y=s.length;for(let l=0;l<s.length;l+=1)je(s[l]);d.resetState()}p.getWorldPosition(g),m.set(0,0,-1).applyQuaternion(p.quaternion),b.set(0,1,0).applyQuaternion(p.quaternion);const n=Ee({position:[g.x,g.y,g.z],forward:[m.x,m.y,m.z],up:[b.x,b.y,b.z]},{source:K.getAnchor(),target:y}),o=Array.from(p.projectionMatrix.elements),i=d.getPixelRatio(),r=Math.max(1,Math.floor(window.innerWidth*i)),a=Math.max(1,Math.floor(window.innerHeight*i));if(oe.post({type:"netgl:setPose",pose:n,projection:o,viewport:{width:r,height:a},time:t}),N+=1,Be&&t-q>1){q=t;const s=l=>`[${l.map(h=>h.toFixed(2)).join(", ")}]`;console.log("[host] setPose#"+N,"host pos:",s([g.x,g.y,g.z]),"coupled pos:",s(n.position),"coupled fwd:",s(n.forward??[0,0,-1]),"viewport:",r+"x"+a,"lastDrain:",Y+" calls","iframeAnchor:",y)}}requestAnimationFrame(re)};re();
