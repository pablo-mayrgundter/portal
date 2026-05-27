import{W as be,S as ye,N as xe,P as ve,d as ke,a as Ae,C as ce,H as Pe,D as Se,M as de,b as Me,c as pe,B as Ee,m as ze,e as Le,f as Ce,g as Re,h as Fe,V as b,i as Te,j as De,k as We,l as Ge,n as He,o as Be,p as ee}from"./index-bfdWt6rj.js";const Ue=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."}],qe=`
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
`,Oe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',te='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',je=(t,o)=>{const e=t==="three";return o==="three"?e?".":"..":e?`${o}/`:`../${o}/`},oe=t=>t.replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]),Ke=t=>{if(document.getElementById("portal-nav-toggle"))return;const o=document.createElement("style");o.id="portal-nav-styles",o.textContent=qe,document.head.appendChild(o);const e=document.createElement("aside");e.id="portal-nav-drawer",e.setAttribute("aria-hidden","false"),e.setAttribute("aria-label","Portal demos"),e.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Ue.map(n=>`
        <li${n.key===t?' class="portal-nav-current"':""}>
          <a href="${je(t,n.key)}"${n.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${oe(n.label)}</span>
            <span class="portal-nav-desc">${oe(n.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=te,document.body.appendChild(e),document.body.appendChild(r);const u=n=>{e.setAttribute("aria-hidden",n?"false":"true"),r.setAttribute("aria-expanded",n?"true":"false"),r.setAttribute("aria-label",n?"Close demos menu":"Toggle demos menu"),r.innerHTML=n?te:Oe};r.addEventListener("click",n=>{n.stopPropagation(),u(e.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",n=>{e.getAttribute("aria-hidden")==="true"||n.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||u(!1)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.getAttribute("aria-hidden")==="false"&&u(!1)})};Ke("iframe");const v=new URLSearchParams(location.search),I=v.get("debug")??"off",Z=v.get("compose")==="raw",M=v.get("freeze")==="1",z=v.get("log")==="1",k=(()=>{const t=v.get("predict");if(t===null)return 0;const o=Number(t);return Number.isFinite(o)?o:0})(),Ne=v.get("fxaa")!=="off",re=document.querySelector("#target-iframe");re&&location.search&&(re.src=`target.html${location.search}`);const ue=document.querySelector("#app");if(!ue)throw new Error("Missing #app");const p=document.querySelector("#target-iframe");if(!p)throw new Error("Missing #target-iframe");const s=new be({antialias:!0,stencil:!0});s.outputColorSpace=ye;s.toneMapping=xe;s.setPixelRatio(Math.min(window.devicePixelRatio,2));s.setSize(window.innerWidth,window.innerHeight);s.autoClear=!1;ue.appendChild(s.domElement);const a=new ve(70,window.innerWidth/window.innerHeight,.02,200);a.position.set(0,1.6,5.5);const f=ke(v.get("pose"));f&&a.position.set(f.position[0],f.position[1],f.position[2]);const y=new Ae;y.background=new ce("#101826");y.add(new Pe(12176639,2241348,1));const ge=new Se(16777215,.65);ge.position.set(3,6,2);y.add(ge);const fe=new de(new Me(18,18),new pe({color:"#1b2a3f",roughness:.95,metalness:.03}));fe.rotation.x=-Math.PI/2;y.add(fe);const $e=new Ee(.9,.9,.9),Ie=new pe({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const o=new de($e,Ie);o.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),y.add(o)}const _e=new De(2.6,3.2),S=ze(_e);S.position.set(0,1.6,-3.5);y.add(S);const E=We({scene:y,anchor:S}),i=Le({iframe:p,debugMode:I,composeRaw:Z});i.prewarm(s);const O=p.contentWindow;if(O){const t=Ce({scene:y,anchor:E.getAnchor(),outputTarget:O,inputFilter:O,log:z,fxaa:Ne});p.contentDocument?.readyState==="complete"?t.start():p.addEventListener("load",()=>t.start(),{once:!0})}I!=="off"&&console.log("[host] compositor debug mode:",I);Z&&console.log("[host] compose=raw: bypassing stencil + depth-clip");M&&console.log("[host] freeze=1: pose will be captured once and held");k!==1&&console.log("[host] predict =",k,"(frames ahead)");const A=Re(),x=Fe(a,s.domElement);f&&x.setOrientationFromForward(new b(f.forward[0],f.forward[1],f.forward[2]));const Ve=document.querySelector('meta[name="portal:snapshot-proxy"]')?.content??"http://localhost:3030",Qe=document.querySelector('meta[name="portal:snapshot-scene"]')?.content??"pair",he=t=>{const o=Ge({baseUrl:Ve,scene:Qe,pose:t,width:1200,height:630});document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(e=>{e.content=o})};he(f);const Xe=t=>{const o=new URL(location.href);return o.searchParams.set("pose",t),o.toString()},R=new b;window.addEventListener("keydown",t=>{if(t.code!=="KeyP"||t.metaKey||t.ctrlKey||t.altKey)return;R.set(0,0,-1).applyQuaternion(a.quaternion);const o={position:[a.position.x,a.position.y,a.position.z],forward:[R.x,R.y,R.z]},e=Te(o),r=new URL(location.href);r.searchParams.set("pose",e),history.replaceState(null,"",r.toString());const u=Xe(e);navigator.clipboard?.writeText(u).catch(()=>{}),he(o),console.log("[host] permalink:",u)});const Ye=()=>{const t=window.innerWidth,o=window.innerHeight;s.setSize(t,o),a.aspect=t/o,a.updateProjectionMatrix()};window.addEventListener("resize",Ye);const ne=new He,H=new ce,l=new b,c=new b,d=new b;let ae=0,F=null,j=null,K=null;const h=[0,0,0],m=[0,0,-1],w=[0,1,0],T=[0,0,0],D=[0,0,-1],W=[0,1,0],me=[0,0,0],_=[0,0,-1],V=[0,1,0],Ze={position:me,forward:_,up:V},Je={position:h,forward:m,up:w};let se=!1;const N=new b;let Q=!1,G=!1;const et=t=>{if(!p.contentWindow)return;const o={type:"portal:traverse",pose:t,pressedKeys:x.getKeys(),viewport:{width:window.innerWidth,height:window.innerHeight}};p.contentWindow.postMessage(o,"*")};let P=null,X=!1;const we=()=>{X||(X=!0,P!==null&&(window.clearTimeout(P),P=null),document.body.classList.add("handed-off"),p.classList.add("fullscreen"),p.contentWindow?.focus(),x.clearKeys(),z&&console.log("[host] traversal: applied CSS swap"))},ie=new b;window.addEventListener("message",t=>{if(t.source!==p.contentWindow)return;const o=t.data;if(!o||typeof o!="object")return;if(o.type==="portal:traverse-ack"){we();return}if(o.type!=="portal:traverse")return;const e=o.pose;if(a.position.set(e.position[0],e.position[1],e.position[2]),e.up&&a.up.set(e.up[0],e.up[1],e.up[2]),e.forward&&(ie.set(e.position[0]+e.forward[0],e.position[1]+e.forward[1],e.position[2]+e.forward[2]),a.lookAt(ie)),e.forward){const r=new b(e.forward[0],e.forward[1],e.forward[2]);x.setOrientationFromForward?.(r)}if(a.updateMatrixWorld(!0),s.setRenderTarget(null),s.clear(!0,!0,!0),E.renderAsSource(s,a),i.isReady()&&i.hasFrame()){const r=i.getBackground();H.setRGB(r.r,r.g,r.b),A.update(S,a,H),s.render(A.scene,A.camera),s.clearDepth(),i.renderAsDestination(s)}document.body.classList.remove("handed-off"),p.classList.remove("fullscreen"),window.focus(),x.clearKeys(),Array.isArray(o.pressedKeys)&&x.setKeys(o.pressedKeys),G=!1,Q=!1,X=!1,z&&console.log("[host] reverse traversal: resumed source role at",e)});const $=(t,o,e,r)=>{t[0]=e[0]+(e[0]-o[0])*r,t[1]=e[1]+(e[1]-o[1])*r,t[2]=e[2]+(e[2]-o[2])*r},le=t=>{const o=Math.hypot(t[0],t[1],t[2]);if(o<1e-9){t[0]=0,t[1]=0,t[2]=-1;return}const e=1/o;t[0]*=e,t[1]*=e,t[2]*=e},Y=()=>{const t=ne.getDelta(),o=ne.elapsedTime;if(x.update(t),!G&&i.isReady()){if(!Q)N.copy(a.position),Q=!0;else{const e=i.getAnchor(),r=E.getAnchor();if(Be(N,a.position,S).crossed){a.getWorldPosition(l),c.set(0,0,-1).applyQuaternion(a.quaternion),d.set(0,1,0).applyQuaternion(a.quaternion);const n=ee({position:[l.x,l.y,l.z],forward:[c.x,c.y,c.z],up:[d.x,d.y,d.z]},{source:r,target:e});et(n),G=!0,z&&console.log("[host] traversal: awaiting iframe ack",n),P!==null&&window.clearTimeout(P),P=window.setTimeout(we,250)}}N.copy(a.position)}if(G){requestAnimationFrame(Y);return}if(i.isReady()){a.getWorldPosition(l),c.set(0,0,-1).applyQuaternion(a.quaternion),d.set(0,1,0).applyQuaternion(a.quaternion),h[0]=l.x,h[1]=l.y,h[2]=l.z,m[0]=c.x,m[1]=c.y,m[2]=c.z,w[0]=d.x,w[1]=d.y,w[2]=d.z;let e;k>0&&se?($(me,T,h,k),$(_,D,m,k),$(V,W,w,k),le(_),le(V),e=Ze):e=Je,T[0]=h[0],T[1]=h[1],T[2]=h[2],D[0]=m[0],D[1]=m[1],D[2]=m[2],W[0]=w[0],W[1]=w[1],W[2]=w[2],se=!0;const r=E.getAnchor(),u=i.getAnchor(),n=ee(e,{source:r,target:u}),B=Array.from(a.projectionMatrix.elements),J=s.getPixelRatio(),L=Math.max(1,Math.floor(window.innerWidth*J)),C=Math.max(1,Math.floor(window.innerHeight*J));if(M&&!F){F=n,j=B,K={width:L,height:C};const g=U=>`[${U.map(q=>q.toFixed(3)).join(", ")}]`;console.log("[host] freeze captured pose pos:",g(n.position)),console.log("[host] freeze captured pose fwd:",g(n.forward??[0,0,-1])),console.log("[host] freeze captured viewport:",L,"x",C)}if(i.requestFrame({pose:M&&F?F:n,projection:M&&j?j:B,viewport:M&&K?K:{width:L,height:C},time:o}),z&&o-ae>1){ae=o;const g=U=>`[${U.map(q=>q.toFixed(3)).join(", ")}]`;console.log("[host] sourceAnchor:",r),console.log("[host] targetAnchor:",u),console.log("[host] hostPos:",g([l.x,l.y,l.z])),console.log("[host] hostFwd:",g([c.x,c.y,c.z])),console.log("[host] hostUp: ",g([d.x,d.y,d.z])),console.log("[host] coupled pos:",g(n.position)),console.log("[host] coupled fwd:",g(n.forward??[0,0,-1])),console.log("[host] coupled up: ",g(n.up??[0,1,0])),console.log("[host] viewport:",L,"x",C)}}if(s.setRenderTarget(null),s.clear(!0,!0,!0),Z)i.hasFrame()&&i.renderAsDestination(s);else{E.renderAsSource(s,a);const e=i.isReady()?i.getBackground():{r:0,g:0,b:0};H.setRGB(e.r,e.g,e.b),A.update(S,a,H),s.render(A.scene,A.camera),s.clearDepth(),i.hasFrame()&&i.renderAsDestination(s)}requestAnimationFrame(Y)};Y();
