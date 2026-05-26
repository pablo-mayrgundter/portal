import{V as u,M as ot,Q as rt,E as T,W as at,S as st,N as it,P as ct,a as dt,C as F,H as lt,D as pt,b as j,c as ut,d as H,B as wt,m as ht,e as yt,w as ft,f as mt,g as gt,h as bt}from"./index-BXhZkw9i.js";const _=(t,e)=>[t[0]+e[0],t[1]+e[1],t[2]+e[2]],Mt=(t,e)=>[t[0]-e[0],t[1]-e[1],t[2]-e[2]],A=(t,e)=>[t[0]*e,t[1]*e,t[2]*e],L=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],z=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],h=t=>{const e=Math.hypot(t[0],t[1],t[2]);return e>0?[t[0]/e,t[1]/e,t[2]/e]:[0,0,1]},B=t=>{const e=h(t.normal),o=h(t.up),r=h(z(o,e)),s=h(z(e,r));return{right:r,up:s,normal:e}},Y=(t,e)=>[L(t,e.right),L(t,e.up),L(t,e.normal)],N=(t,e)=>_(_(A(e.right,t[0]),A(e.up,t[1])),A(e.normal,t[2])),Q=t=>[-t[0],t[1],-t[2]],W=(t,e,o)=>h(N(Q(Y(t,e)),o)),xt=(t,e)=>{const o=B(e.source),r=B(e.target),s=Mt(t.position,e.source.position),i=Y(s,o),n=Q(i),a={position:_(e.target.position,N(n,r))};return t.forward&&(a.forward=W(t.forward,o,r)),t.up&&(a.up=W(t.up,o,r)),a},kt=(t,e,o={})=>{const r=o.moveSpeed??4,s=o.lookSensitivity??.0025;let i=0,n=0;const a=new Set;Et(e,(l,E)=>{i-=l*s,n-=E*s,n=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,n))}),window.addEventListener("keydown",l=>a.add(l.code)),window.addEventListener("keyup",l=>a.delete(l.code)),At(a);const c=new u,M=new u,x=new u,tt=l=>{t.quaternion.setFromEuler(new T(n,i,0,"YXZ")),M.set(0,0,-1).applyQuaternion(t.quaternion),x.set(1,0,0).applyQuaternion(t.quaternion),c.set(0,0,0),a.has("KeyW")&&c.add(M),a.has("KeyS")&&c.sub(M),a.has("KeyD")&&c.add(x),a.has("KeyA")&&c.sub(x),c.y=0,c.lengthSq()>0&&(c.normalize().multiplyScalar(r*l),t.position.add(c))},R=new ot,I=new rt,k=new T(0,0,0,"YXZ"),et=new u(0,0,0),K=new u,nt=new u(0,1,0);return{update:tt,setOrientationFromForward:l=>{K.copy(l).normalize(),R.lookAt(et,K,nt),I.setFromRotationMatrix(R),k.setFromQuaternion(I,"YXZ"),n=k.x,i=k.y},clearKeys:()=>{a.clear()},getKeys:()=>Array.from(a),setKeys:l=>{a.clear();for(const E of l)a.add(E)}}},Et=(t,e)=>{let o=null,r=0,s=0;t.addEventListener("pointerdown",n=>{if(o===null&&(o=n.pointerId,r=n.clientX,s=n.clientY,n.pointerType!=="mouse"))try{t.setPointerCapture(n.pointerId)}catch{}});const i=n=>{n.pointerId===o&&(o=null)};window.addEventListener("pointerup",i),window.addEventListener("pointercancel",i),window.addEventListener("pointermove",n=>{if(n.pointerId!==o)return;const a=n.clientX-r,c=n.clientY-s;r=n.clientX,s=n.clientY,e(a,c)})},At=t=>{if(!(typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints??0)>0)))return;const o=document.createElement("div");o.className="wasd-pad",o.setAttribute("aria-label","Movement controls"),o.innerHTML=`
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
  `,document.head.appendChild(r),document.body.appendChild(o);for(const s of o.querySelectorAll(".wasd-btn")){const i=s.dataset.key,n=c=>{c.preventDefault(),c.stopPropagation(),t.add(i),s.classList.add("is-active");try{s.setPointerCapture(c.pointerId)}catch{}},a=c=>{c.stopPropagation(),t.delete(i),s.classList.remove("is-active")};s.addEventListener("pointerdown",n),s.addEventListener("pointerup",a),s.addEventListener("pointercancel",a),s.addEventListener("pointerleave",a),s.addEventListener("contextmenu",c=>c.preventDefault())}},Lt={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},St=t=>{const e=new Map,o=r=>{if(r==null)return null;const s=typeof r;if(s==="number"||s==="string"||s==="boolean")return r;if(Array.isArray(r))return r.map(o);if(typeof r!="object")return r;const i=r;if("__netgl_handle"in i){const n=i.__netgl_handle,a=e.get(n);if(a===void 0)throw new Error(`NetGL replay: unknown handle id ${n}`);return a}if("__netgl_typedarray"in i){const n=i.__netgl_typedarray,a=Lt[n];if(!a)throw new Error(`NetGL replay: unknown typed-array ${n}`);return new a(i.buffer,i.offset,i.length)}if("__netgl_arraybuffer"in i)return i.__netgl_arraybuffer;throw new Error("NetGL replay: unknown encoded value shape")};return r=>{const s=r.args.map(o),i=t[r.name];if(typeof i!="function")throw new Error(`NetGL replay: receiver has no method '${r.name}'`);const n=i.apply(t,s);r.returnId!==void 0&&n!=null&&typeof n=="object"&&e.set(r.returnId,n)}},X=document.querySelector("#app");if(!X)throw new Error("Missing #app");const v=document.querySelector("#target-iframe");if(!v)throw new Error("Missing #target-iframe");const d=new at({antialias:!1,stencil:!0,depth:!0,preserveDrawingBuffer:!1});d.outputColorSpace=st;d.toneMapping=it;d.setPixelRatio(Math.min(window.devicePixelRatio,2));d.setSize(window.innerWidth,window.innerHeight);d.autoClear=!1;X.appendChild(d.domElement);const p=new ct(70,window.innerWidth/window.innerHeight,.02,200);p.position.set(0,1.6,5.5);const w=new dt;w.background=new F("#101826");w.add(new lt(12176639,2241348,1));const U=new pt(16777215,.65);U.position.set(3,6,2);w.add(U);const O=new j(new ut(18,18),new H({color:"#1b2a3f",roughness:.95,metalness:.03}));O.rotation.x=-Math.PI/2;w.add(O);const Pt=new wt(.9,.9,.9),_t=new H({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const e=new j(Pt,_t);e.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),w.add(e)}const vt=new mt(2.6,3.2),b=ht(vt);b.position.set(0,1.6,-3.5);w.add(b);const D=bt({scene:w,anchor:b}),S=yt(),Ct=d.getContext(),Ft=St(Ct);let V=!1,C=null;const Z=new F("#220d17"),$=ft({output:v.contentWindow,inputFilter:v.contentWindow});let P=[],g=null;$.onMessage(t=>{if(!t||typeof t!="object")return;const e=t;if("type"in e){if(e.type==="netgl:ready"){const o=e;C=o.anchor,Z.setRGB(o.background.r,o.background.g,o.background.b),V=!0;return}if(e.type==="netgl:frame-end"){g=P,P=[];return}}"name"in e&&typeof e.name=="string"&&P.push(e)});const Rt=kt(p,d.domElement),It=()=>{const t=window.innerWidth,e=window.innerHeight;d.setSize(t,e),p.aspect=t/e,p.updateProjectionMatrix()};window.addEventListener("resize",It);const G=new gt,q=new F,y=new u,f=new u,m=new u,J=()=>{const t=G.getDelta(),e=G.elapsedTime;if(Rt.update(t),d.resetState(),d.setRenderTarget(null),d.clear(!0,!0,!0),D.renderAsSource(d,p),V&&C){if(q.copy(Z),S.update(b,p,q),d.render(S.scene,S.camera),d.clearDepth(),g){const a=g;g=null;for(let c=0;c<a.length;c+=1)Ft(a[c]);d.resetState()}p.getWorldPosition(y),f.set(0,0,-1).applyQuaternion(p.quaternion),m.set(0,1,0).applyQuaternion(p.quaternion);const o=xt({position:[y.x,y.y,y.z],forward:[f.x,f.y,f.z],up:[m.x,m.y,m.z]},{source:D.getAnchor(),target:C}),r=Array.from(p.projectionMatrix.elements),s=d.getPixelRatio(),i=Math.max(1,Math.floor(window.innerWidth*s)),n=Math.max(1,Math.floor(window.innerHeight*s));$.post({type:"netgl:setPose",pose:o,projection:r,viewport:{width:i,height:n},time:e})}requestAnimationFrame(J)};J();
