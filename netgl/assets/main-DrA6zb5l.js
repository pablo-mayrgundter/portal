import{V as u,M as et,Q as nt,E as I,W as ot,S as rt,N as at,P as st,a as it,C as v,H as ct,D as dt,b as G,c as lt,d as q,B as pt,m as ut,e as wt,w as yt,f as ht,g as ft,h as mt}from"./index-BXhZkw9i.js";const P=(t,e)=>[t[0]+e[0],t[1]+e[1],t[2]+e[2]],gt=(t,e)=>[t[0]-e[0],t[1]-e[1],t[2]-e[2]],E=(t,e)=>[t[0]*e,t[1]*e,t[2]*e],A=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],K=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],y=t=>{const e=Math.hypot(t[0],t[1],t[2]);return e>0?[t[0]/e,t[1]/e,t[2]/e]:[0,0,1]},T=t=>{const e=y(t.normal),a=y(t.up),o=y(K(a,e)),r=y(K(e,o));return{right:o,up:r,normal:e}},j=(t,e)=>[A(t,e.right),A(t,e.up),A(t,e.normal)],H=(t,e)=>P(P(E(e.right,t[0]),E(e.up,t[1])),E(e.normal,t[2])),Y=t=>[-t[0],t[1],-t[2]],z=(t,e,a)=>y(H(Y(j(t,e)),a)),bt=(t,e)=>{const a=T(e.source),o=T(e.target),r=gt(t.position,e.source.position),i=j(r,a),n=Y(i),s={position:P(e.target.position,H(n,o))};return t.forward&&(s.forward=z(t.forward,a,o)),t.up&&(s.up=z(t.up,a,o)),s},Mt=(t,e,a={})=>{const o=a.moveSpeed??4,r=a.lookSensitivity??.0025;let i=0,n=0;const s=new Set;xt(e,(l,k)=>{i-=l*r,n-=k*r,n=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,n))}),window.addEventListener("keydown",l=>s.add(l.code)),window.addEventListener("keyup",l=>s.delete(l.code)),kt(s);const c=new u,b=new u,M=new u,$=l=>{t.quaternion.setFromEuler(new I(n,i,0,"YXZ")),b.set(0,0,-1).applyQuaternion(t.quaternion),M.set(1,0,0).applyQuaternion(t.quaternion),c.set(0,0,0),s.has("KeyW")&&c.add(b),s.has("KeyS")&&c.sub(b),s.has("KeyD")&&c.add(M),s.has("KeyA")&&c.sub(M),c.y=0,c.lengthSq()>0&&(c.normalize().multiplyScalar(o*l),t.position.add(c))},C=new et,R=new nt,x=new I(0,0,0,"YXZ"),J=new u(0,0,0),F=new u,tt=new u(0,1,0);return{update:$,setOrientationFromForward:l=>{F.copy(l).normalize(),C.lookAt(J,F,tt),R.setFromRotationMatrix(C),x.setFromQuaternion(R,"YXZ"),n=x.x,i=x.y},clearKeys:()=>{s.clear()},getKeys:()=>Array.from(s),setKeys:l=>{s.clear();for(const k of l)s.add(k)}}},xt=(t,e)=>{let a=null,o=0,r=0;t.addEventListener("pointerdown",n=>{if(a===null&&(a=n.pointerId,o=n.clientX,r=n.clientY,n.pointerType!=="mouse"))try{t.setPointerCapture(n.pointerId)}catch{}});const i=n=>{n.pointerId===a&&(a=null)};window.addEventListener("pointerup",i),window.addEventListener("pointercancel",i),window.addEventListener("pointermove",n=>{if(n.pointerId!==a)return;const s=n.clientX-o,c=n.clientY-r;o=n.clientX,r=n.clientY,e(s,c)})},kt=t=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const a=document.createElement("div");a.className="wasd-pad",a.setAttribute("aria-label","Movement controls"),a.innerHTML=`
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
  `,document.head.appendChild(o),document.body.appendChild(a);for(const r of a.querySelectorAll(".wasd-btn")){const i=r.dataset.key,n=c=>{c.preventDefault(),c.stopPropagation(),t.add(i),r.classList.add("is-active");try{r.setPointerCapture(c.pointerId)}catch{}},s=c=>{c.stopPropagation(),t.delete(i),r.classList.remove("is-active")};r.addEventListener("pointerdown",n),r.addEventListener("pointerup",s),r.addEventListener("pointercancel",s),r.addEventListener("pointerleave",s),r.addEventListener("contextmenu",c=>c.preventDefault())}},Et={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},At=t=>{const e=new Map,a=o=>{if(o==null)return null;const r=typeof o;if(r==="number"||r==="string"||r==="boolean")return o;if(Array.isArray(o))return o.map(a);if(typeof o!="object")return o;const i=o;if("__netgl_handle"in i){const n=i.__netgl_handle,s=e.get(n);if(s===void 0)throw new Error(`NetGL replay: unknown handle id ${n}`);return s}if("__netgl_typedarray"in i){const n=i.__netgl_typedarray,s=Et[n];if(!s)throw new Error(`NetGL replay: unknown typed-array ${n}`);return new s(i.buffer,i.offset,i.length)}if("__netgl_arraybuffer"in i)return i.__netgl_arraybuffer;throw new Error("NetGL replay: unknown encoded value shape")};return o=>{const r=o.args.map(a),i=t[o.name];if(typeof i!="function")throw new Error(`NetGL replay: receiver has no method '${o.name}'`);const n=i.apply(t,r);o.returnId!==void 0&&n!=null&&typeof n=="object"&&e.set(o.returnId,n)}},N=document.querySelector("#app");if(!N)throw new Error("Missing #app");const S=document.querySelector("#target-iframe");if(!S)throw new Error("Missing #target-iframe");const d=new ot({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});d.outputColorSpace=rt;d.toneMapping=at;d.setPixelRatio(Math.min(window.devicePixelRatio,2));d.setSize(window.innerWidth,window.innerHeight);d.autoClear=!1;N.appendChild(d.domElement);const p=new st(70,window.innerWidth/window.innerHeight,.02,200);p.position.set(0,1.6,5.5);const w=new it;w.background=new v("#101826");w.add(new ct(12176639,2241348,1));const Q=new dt(16777215,.65);Q.position.set(3,6,2);w.add(Q);const X=new G(new lt(18,18),new q({color:"#1b2a3f",roughness:.95,metalness:.03}));X.rotation.x=-Math.PI/2;w.add(X);const Lt=new pt(.9,.9,.9),Pt=new q({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const e=new G(Lt,Pt);e.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),w.add(e)}const St=new ht(2.6,3.2),g=ut(St);g.position.set(0,1.6,-3.5);w.add(g);const B=mt({scene:w,anchor:g}),L=wt(),_t=d.getContext(),vt=At(_t);let U=!1,_=null;const O=new v("#220d17"),V=yt({output:S.contentWindow,inputFilter:S.contentWindow});V.onMessage(t=>{if(!t||typeof t!="object")return;const e=t;if("type"in e&&e.type==="netgl:ready"){_=e.anchor,O.setRGB(e.background.r,e.background.g,e.background.b),U=!0;return}"name"in e&&typeof e.name=="string"&&vt(e)});const Ct=Mt(p,d.domElement),Rt=()=>{const t=window.innerWidth,e=window.innerHeight;d.setSize(t,e),p.aspect=t/e,p.updateProjectionMatrix()};window.addEventListener("resize",Rt);const W=new ft,D=new v,h=new u,f=new u,m=new u,Z=()=>{const t=W.getDelta(),e=W.elapsedTime;if(Ct.update(t),d.resetState(),d.setRenderTarget(null),d.clear(!0,!0,!0),B.renderAsSource(d,p),U&&_){D.copy(O),L.update(g,p,D),d.render(L.scene,L.camera),d.clearDepth(),p.getWorldPosition(h),f.set(0,0,-1).applyQuaternion(p.quaternion),m.set(0,1,0).applyQuaternion(p.quaternion);const a=bt({position:[h.x,h.y,h.z],forward:[f.x,f.y,f.z],up:[m.x,m.y,m.z]},{source:B.getAnchor(),target:_}),o=Array.from(p.projectionMatrix.elements),r=d.getPixelRatio(),i=Math.max(1,Math.floor(window.innerWidth*r)),n=Math.max(1,Math.floor(window.innerHeight*r));V.post({type:"netgl:setPose",pose:a,projection:o,viewport:{width:i,height:n},time:e})}requestAnimationFrame(Z)};Z();
