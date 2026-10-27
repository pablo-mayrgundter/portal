import{W as ve,S as xe,N as ye,P as ke,d as Se,a as Ae,C as de,H as Pe,D as Me,M as pe,b as Ee,c as he,B as Le,m as ze,e as Ce,f as Re,g as $e,h as Te,V as S,i as Fe,j as Ge,k as We,l as De,n as He,o as Be,p as te}from"./index-r9B_6VzV.js";const qe=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],Ue=`
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
#portal-nav-drawer .portal-nav-intro { font-size: 13px; line-height: 1.5; color: #c9c3ea; margin: 0 0 16px; padding: 10px 12px; background: rgba(154, 140, 255, 0.08); border-left: 2px solid rgba(154, 140, 255, 0.55); border-radius: 0 8px 8px 0; }
#portal-nav-drawer .portal-nav-intro a { display: inline; padding: 0; background: transparent; border: none; color: #b7a9ff; text-decoration: underline; text-underline-offset: 2px; white-space: nowrap; }
#portal-nav-drawer .portal-nav-intro a:hover { background: transparent; color: #d6ccff; }
#portal-nav-drawer .portal-nav-intro svg { display: inline-block; vertical-align: -1px; margin-left: 2px; }
#portal-nav-drawer .portal-nav-version { margin: 0 0 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: #8fa7c4; min-width: 0; }
#portal-nav-drawer .portal-nav-version select {
  max-width: 100%;
  min-width: 0;
  text-overflow: ellipsis;
  font: 600 12px Inter, system-ui, sans-serif;
  color: #d8e7ff;
  background: rgba(93, 169, 255, 0.14);
  border: 1px solid rgba(93, 169, 255, 0.5);
  border-radius: 8px;
  padding: 5px 8px;
  cursor: pointer;
}
#portal-nav-drawer .portal-nav-repo { margin-top: 22px; font-size: 11px; color: #6d829f; }
#portal-nav-drawer .portal-nav-repo a { background: transparent; border: none; padding: 0; }
#portal-nav-drawer .portal-nav-repo a:hover { background: transparent; }
`,Ne='<svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',Oe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',oe='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',je=(t,o)=>{const e=t==="three";return o==="three"?e?".":"..":e?`${o}/`:`../${o}/`},Ie=t=>{const e=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),r=e.match(/^(.*\/)v\/([^/]+)\/$/);return r?{root:e,siteRoot:r[1],snapshot:r[2]}:{root:e,siteRoot:e,snapshot:null}},Ke=(t,o)=>{const{siteRoot:e,snapshot:r}=Ie(),p=e.replace(/pr-preview\/pr-\d+\/$/,""),l=`${o}/`;let a={};const R=(i,w)=>{t.innerHTML="";const d=[["latest",`latest · ${w}`],...i.map(m=>{const v=a[m]??{};return[m,`v${m}${v.date?` · ${v.date}`:""}`]})];r&&!i.includes(r)&&d.push([r,`v${r} snapshot`]);for(const[m,v]of d){const G=document.createElement("option");G.value=m,G.textContent=v,G.selected=m===(r??"latest"),t.appendChild(G)}};fetch(`${e}v/versions.json`,{cache:"no-cache"}).then(i=>i.ok?i.json():null).then(i=>{i?.versions&&(a=i.meta??{},R(i.versions,i.latest??"main"))}).catch(()=>{}),t.addEventListener("change",()=>{const i=t.value,w=i==="latest"?e:`${p}v/${i}/`,d=i==="latest"||!a[i]?.demos||a[i].demos.includes(o);location.href=d?`${w}${l}${location.search}${location.hash}`:w})},re=t=>t.replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]),Ve=t=>{if(document.getElementById("portal-nav-toggle"))return;const o=document.createElement("style");o.id="portal-nav-styles",o.textContent=Ue,document.head.appendChild(o);const e=document.createElement("aside");e.id="portal-nav-drawer",e.setAttribute("aria-hidden","false"),e.setAttribute("aria-label","Portal demos"),e.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <p class="portal-nav-intro">Portal links independent 3D web renderers at the GL layer: a guest's WebGL2 calls replay into the host's context, so engines compose without rewriting either. What it is, and where it's going: <a href="../rfcs/" target="_blank" rel="noopener">the RFC responses${Ne}</a></p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${qe.map(a=>`
        <li${a.key===t?' class="portal-nav-current"':""}>
          <a href="${je(t,a.key)}"${a.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${re(a.label)}</span>
            <span class="portal-nav-desc">${re(a.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=oe,document.body.appendChild(e),document.body.appendChild(r);const p=e.querySelector("#portal-nav-version");p&&Ke(p,t);const l=a=>{e.setAttribute("aria-hidden",a?"false":"true"),r.setAttribute("aria-expanded",a?"true":"false"),r.setAttribute("aria-label",a?"Close demos menu":"Toggle demos menu"),r.innerHTML=a?oe:Oe};r.addEventListener("click",a=>{a.stopPropagation(),l(e.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",a=>{e.getAttribute("aria-hidden")==="true"||a.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e.getAttribute("aria-hidden")==="false"&&l(!1)})};Ve("iframe");const M=new URLSearchParams(location.search),_=M.get("debug")??"off",ee=M.get("compose")==="raw",$=M.get("freeze")==="1",F=M.get("log")==="1",E=(()=>{const t=M.get("predict");if(t===null)return 0;const o=Number(t);return Number.isFinite(o)?o:0})(),_e=M.get("fxaa")!=="off",ne=document.querySelector("#target-iframe");ne&&location.search&&(ne.src=`target.html${location.search}`);const ue=document.querySelector("#app");if(!ue)throw new Error("Missing #app");const f=document.querySelector("#target-iframe");if(!f)throw new Error("Missing #target-iframe");const s=new ve({antialias:!0,stencil:!0});s.outputColorSpace=xe;s.toneMapping=ye;s.setPixelRatio(Math.min(window.devicePixelRatio,2));s.setSize(window.innerWidth,window.innerHeight);s.autoClear=!1;ue.appendChild(s.domElement);const n=new ke(70,window.innerWidth/window.innerHeight,.02,200);n.position.set(0,1.6,5.5);const b=Se(M.get("pose"));b&&n.position.set(b.position[0],b.position[1],b.position[2]);const A=new Ae;A.background=new de("#101826");A.add(new Pe(12176639,2241348,1));const ge=new Me(16777215,.65);ge.position.set(3,6,2);A.add(ge);const fe=new pe(new Ee(18,18),new he({color:"#1b2a3f",roughness:.95,metalness:.03}));fe.rotation.x=-Math.PI/2;A.add(fe);const Qe=new Le(.9,.9,.9),Xe=new he({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const o=new pe(Qe,Xe);o.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),A.add(o)}const Ye=new Ge(2.6,3.2),C=ze(Ye);C.position.set(0,1.6,-3.5);A.add(C);const T=We({scene:A,anchor:C}),c=Ce({iframe:f,debugMode:_,composeRaw:ee});c.prewarm(s);const O=f.contentWindow;if(O){const t=Re({scene:A,anchor:T.getAnchor(),outputTarget:O,inputFilter:O,log:F,fxaa:_e});f.contentDocument?.readyState==="complete"?t.start():f.addEventListener("load",()=>t.start(),{once:!0})}_!=="off"&&console.log("[host] compositor debug mode:",_);ee&&console.log("[host] compose=raw: bypassing stencil + depth-clip");$&&console.log("[host] freeze=1: pose will be captured once and held");E!==1&&console.log("[host] predict =",E,"(frames ahead)");const L=$e(),P=Te(n,s.domElement);b&&P.setOrientationFromForward(new S(b.forward[0],b.forward[1],b.forward[2]));const Ze=document.querySelector('meta[name="portal:snapshot-proxy"]')?.content??"http://localhost:3030",Je=document.querySelector('meta[name="portal:snapshot-scene"]')?.content??"pair",me=t=>{const o=De({baseUrl:Ze,scene:Je,pose:t,width:1200,height:630});document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(e=>{e.content=o})};me(b);const et=t=>{const o=new URL(location.href);return o.searchParams.set("pose",t),o.toString()},W=new S;window.addEventListener("keydown",t=>{if(t.code!=="KeyP"||t.metaKey||t.ctrlKey||t.altKey)return;W.set(0,0,-1).applyQuaternion(n.quaternion);const o={position:[n.position.x,n.position.y,n.position.z],forward:[W.x,W.y,W.z]},e=Fe(o),r=new URL(location.href);r.searchParams.set("pose",e),history.replaceState(null,"",r.toString());const p=et(e);navigator.clipboard?.writeText(p).catch(()=>{}),me(o),console.log("[host] permalink:",p)});const tt=()=>{const t=window.innerWidth,o=window.innerHeight;s.setSize(t,o),n.aspect=t/o,n.updateProjectionMatrix()};window.addEventListener("resize",tt);const ae=new He,N=new de,h=new S,u=new S,g=new S;let se=0,D=null,j=null,I=null;const x=[0,0,0],y=[0,0,-1],k=[0,1,0],H=[0,0,0],B=[0,0,-1],q=[0,1,0],we=[0,0,0],Q=[0,0,-1],X=[0,1,0],ot={position:we,forward:Q,up:X},rt={position:x,forward:y,up:k};let ie=!1;const K=new S;let Y=!1,U=!1;const nt=t=>{if(!f.contentWindow)return;const o={type:"portal:traverse",pose:t,pressedKeys:P.getKeys(),viewport:{width:window.innerWidth,height:window.innerHeight}};f.contentWindow.postMessage(o,"*")};let z=null,Z=!1;const be=()=>{Z||(Z=!0,z!==null&&(window.clearTimeout(z),z=null),document.body.classList.add("handed-off"),f.classList.add("fullscreen"),f.contentWindow?.focus(),P.clearKeys(),F&&console.log("[host] traversal: applied CSS swap"))},le=new S;window.addEventListener("message",t=>{if(t.source!==f.contentWindow)return;const o=t.data;if(!o||typeof o!="object")return;if(o.type==="portal:traverse-ack"){be();return}if(o.type!=="portal:traverse")return;const e=o.pose;if(n.position.set(e.position[0],e.position[1],e.position[2]),e.up&&n.up.set(e.up[0],e.up[1],e.up[2]),e.forward&&(le.set(e.position[0]+e.forward[0],e.position[1]+e.forward[1],e.position[2]+e.forward[2]),n.lookAt(le)),e.forward){const r=new S(e.forward[0],e.forward[1],e.forward[2]);P.setOrientationFromForward?.(r)}if(n.updateMatrixWorld(!0),s.setRenderTarget(null),s.clear(!0,!0,!0),T.renderAsSource(s,n),c.isReady()&&c.hasFrame()){const r=c.getBackground();N.setRGB(r.r,r.g,r.b),L.update(C,n,N),s.render(L.scene,L.camera),s.clearDepth(),c.renderAsDestination(s)}document.body.classList.remove("handed-off"),f.classList.remove("fullscreen"),window.focus(),P.clearKeys(),Array.isArray(o.pressedKeys)&&P.setKeys(o.pressedKeys),U=!1,Y=!1,Z=!1,F&&console.log("[host] reverse traversal: resumed source role at",e)});const V=(t,o,e,r)=>{t[0]=e[0]+(e[0]-o[0])*r,t[1]=e[1]+(e[1]-o[1])*r,t[2]=e[2]+(e[2]-o[2])*r},ce=t=>{const o=Math.hypot(t[0],t[1],t[2]);if(o<1e-9){t[0]=0,t[1]=0,t[2]=-1;return}const e=1/o;t[0]*=e,t[1]*=e,t[2]*=e},J=()=>{const t=ae.getDelta(),o=ae.elapsedTime;if(P.update(t),!U&&c.isReady()){if(!Y)K.copy(n.position),Y=!0;else{const e=c.getAnchor(),r=T.getAnchor();if(Be(K,n.position,C).crossed){n.getWorldPosition(h),u.set(0,0,-1).applyQuaternion(n.quaternion),g.set(0,1,0).applyQuaternion(n.quaternion);const l=te({position:[h.x,h.y,h.z],forward:[u.x,u.y,u.z],up:[g.x,g.y,g.z]},{source:r,target:e});nt(l),U=!0,F&&console.log("[host] traversal: awaiting iframe ack",l),z!==null&&window.clearTimeout(z),z=window.setTimeout(be,250)}}K.copy(n.position)}if(U){requestAnimationFrame(J);return}if(c.isReady()){n.getWorldPosition(h),u.set(0,0,-1).applyQuaternion(n.quaternion),g.set(0,1,0).applyQuaternion(n.quaternion),x[0]=h.x,x[1]=h.y,x[2]=h.z,y[0]=u.x,y[1]=u.y,y[2]=u.z,k[0]=g.x,k[1]=g.y,k[2]=g.z;let e;E>0&&ie?(V(we,H,x,E),V(Q,B,y,E),V(X,q,k,E),ce(Q),ce(X),e=ot):e=rt,H[0]=x[0],H[1]=x[1],H[2]=x[2],B[0]=y[0],B[1]=y[1],B[2]=y[2],q[0]=k[0],q[1]=k[1],q[2]=k[2],ie=!0;const r=T.getAnchor(),p=c.getAnchor(),l=te(e,{source:r,target:p}),a=Array.from(n.projectionMatrix.elements),R=s.getPixelRatio(),i=Math.max(1,Math.floor(window.innerWidth*R)),w=Math.max(1,Math.floor(window.innerHeight*R));if($&&!D){D=l,j=a,I={width:i,height:w};const d=m=>`[${m.map(v=>v.toFixed(3)).join(", ")}]`;console.log("[host] freeze captured pose pos:",d(l.position)),console.log("[host] freeze captured pose fwd:",d(l.forward??[0,0,-1])),console.log("[host] freeze captured viewport:",i,"x",w)}if(c.requestFrame({pose:$&&D?D:l,projection:$&&j?j:a,viewport:$&&I?I:{width:i,height:w},time:o}),F&&o-se>1){se=o;const d=m=>`[${m.map(v=>v.toFixed(3)).join(", ")}]`;console.log("[host] sourceAnchor:",r),console.log("[host] targetAnchor:",p),console.log("[host] hostPos:",d([h.x,h.y,h.z])),console.log("[host] hostFwd:",d([u.x,u.y,u.z])),console.log("[host] hostUp: ",d([g.x,g.y,g.z])),console.log("[host] coupled pos:",d(l.position)),console.log("[host] coupled fwd:",d(l.forward??[0,0,-1])),console.log("[host] coupled up: ",d(l.up??[0,1,0])),console.log("[host] viewport:",i,"x",w)}}if(s.setRenderTarget(null),s.clear(!0,!0,!0),ee)c.hasFrame()&&c.renderAsDestination(s);else{T.renderAsSource(s,n);const e=c.isReady()?c.getBackground():{r:0,g:0,b:0};N.setRGB(e.r,e.g,e.b),L.update(C,n,N),s.render(L.scene,L.camera),s.clearDepth(),c.hasFrame()&&c.renderAsDestination(s)}requestAnimationFrame(J)};J();
