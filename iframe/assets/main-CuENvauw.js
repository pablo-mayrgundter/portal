import{W as be,S as ve,N as xe,P as ye,d as ke,a as Se,C as ce,H as Ae,D as Pe,M as de,b as Me,c as pe,B as Ee,m as Le,e as ze,f as Ce,g as Re,h as $e,V as A,i as Te,j as Fe,k as Ge,l as We,n as De,o as He,p as ee}from"./index-r9B_6VzV.js";const Be=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],qe=`
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
#portal-nav-drawer .portal-nav-version { margin: 0 0 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: #8fa7c4; }
#portal-nav-drawer .portal-nav-version select {
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
`,Ue='<svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',Ne='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',te='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Oe=(t,o)=>{const e=t==="three";return o==="three"?e?".":"..":e?`${o}/`:`../${o}/`},je=t=>{const e=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),r=e.match(/^(.*\/)v\/([^/]+)\/$/);return r?{root:e,siteRoot:r[1],snapshot:r[2]}:{root:e,siteRoot:e,snapshot:null}},Ie=(t,o)=>{const{siteRoot:e,snapshot:r}=je(),p=`${o}/`;let l={};const s=(i,w)=>{t.innerHTML="";const b=[["latest",`latest · ${w}`],...i.map(c=>{const m=l[c]??{};return[c,`v${c}${m.date?` · ${m.date}`:""}${m.label?` · ${m.label}`:""}`]})];r&&!i.includes(r)&&b.push([r,`v${r} snapshot`]);for(const[c,m]of b){const x=document.createElement("option");x.value=c,x.textContent=m,x.selected=c===(r??"latest"),t.appendChild(x)}};fetch(`${e}v/versions.json`,{cache:"no-cache"}).then(i=>i.ok?i.json():null).then(i=>{i?.versions&&(l=i.meta??{},s(i.versions,i.latest??"main"))}).catch(()=>{}),t.addEventListener("change",()=>{const i=t.value,w=i==="latest"?e:`${e}v/${i}/`,b=i==="latest"||!l[i]?.demos||l[i].demos.includes(o);location.href=b?`${w}${p}${location.search}${location.hash}`:w})},oe=t=>t.replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]),Ke=t=>{if(document.getElementById("portal-nav-toggle"))return;const o=document.createElement("style");o.id="portal-nav-styles",o.textContent=qe,document.head.appendChild(o);const e=document.createElement("aside");e.id="portal-nav-drawer",e.setAttribute("aria-hidden","false"),e.setAttribute("aria-label","Portal demos"),e.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <p class="portal-nav-intro">Portal links independent 3D web renderers at the GL layer: a guest's WebGL2 calls replay into the host's context, so engines compose without rewriting either. What it is, and where it's going: <a href="../rfcs/" target="_blank" rel="noopener">the RFC responses${Ue}</a></p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${Be.map(s=>`
        <li${s.key===t?' class="portal-nav-current"':""}>
          <a href="${Oe(t,s.key)}"${s.key===t?' aria-current="page"':""}>
            <span class="portal-nav-label">${oe(s.label)}</span>
            <span class="portal-nav-desc">${oe(s.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const r=document.createElement("button");r.id="portal-nav-toggle",r.type="button",r.setAttribute("aria-label","Close demos menu"),r.setAttribute("aria-expanded","true"),r.setAttribute("aria-controls","portal-nav-drawer"),r.innerHTML=te,document.body.appendChild(e),document.body.appendChild(r);const p=e.querySelector("#portal-nav-version");p&&Ie(p,t);const l=s=>{e.setAttribute("aria-hidden",s?"false":"true"),r.setAttribute("aria-expanded",s?"true":"false"),r.setAttribute("aria-label",s?"Close demos menu":"Toggle demos menu"),r.innerHTML=s?te:Ne};r.addEventListener("click",s=>{s.stopPropagation(),l(e.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",s=>{e.getAttribute("aria-hidden")==="true"||s.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||l(!1)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&e.getAttribute("aria-hidden")==="false"&&l(!1)})};Ke("iframe");const E=new URLSearchParams(location.search),V=E.get("debug")??"off",J=E.get("compose")==="raw",$=E.get("freeze")==="1",F=E.get("log")==="1",L=(()=>{const t=E.get("predict");if(t===null)return 0;const o=Number(t);return Number.isFinite(o)?o:0})(),Ve=E.get("fxaa")!=="off",re=document.querySelector("#target-iframe");re&&location.search&&(re.src=`target.html${location.search}`);const ue=document.querySelector("#app");if(!ue)throw new Error("Missing #app");const f=document.querySelector("#target-iframe");if(!f)throw new Error("Missing #target-iframe");const a=new be({antialias:!0,stencil:!0});a.outputColorSpace=ve;a.toneMapping=xe;a.setPixelRatio(Math.min(window.devicePixelRatio,2));a.setSize(window.innerWidth,window.innerHeight);a.autoClear=!1;ue.appendChild(a.domElement);const n=new ye(70,window.innerWidth/window.innerHeight,.02,200);n.position.set(0,1.6,5.5);const v=ke(E.get("pose"));v&&n.position.set(v.position[0],v.position[1],v.position[2]);const P=new Se;P.background=new ce("#101826");P.add(new Ae(12176639,2241348,1));const he=new Pe(16777215,.65);he.position.set(3,6,2);P.add(he);const ge=new de(new Me(18,18),new pe({color:"#1b2a3f",roughness:.95,metalness:.03}));ge.rotation.x=-Math.PI/2;P.add(ge);const _e=new Ee(.9,.9,.9),Qe=new pe({color:"#5da9ff",roughness:.35});for(let t=0;t<14;t+=1){const o=new de(_e,Qe);o.position.set(Math.sin(t*.5)*4,.45,-3-t*.65),P.add(o)}const Xe=new Fe(2.6,3.2),R=Le(Xe);R.position.set(0,1.6,-3.5);P.add(R);const T=Ge({scene:P,anchor:R}),d=ze({iframe:f,debugMode:V,composeRaw:J});d.prewarm(a);const N=f.contentWindow;if(N){const t=Ce({scene:P,anchor:T.getAnchor(),outputTarget:N,inputFilter:N,log:F,fxaa:Ve});f.contentDocument?.readyState==="complete"?t.start():f.addEventListener("load",()=>t.start(),{once:!0})}V!=="off"&&console.log("[host] compositor debug mode:",V);J&&console.log("[host] compose=raw: bypassing stencil + depth-clip");$&&console.log("[host] freeze=1: pose will be captured once and held");L!==1&&console.log("[host] predict =",L,"(frames ahead)");const z=Re(),M=$e(n,a.domElement);v&&M.setOrientationFromForward(new A(v.forward[0],v.forward[1],v.forward[2]));const Ye=document.querySelector('meta[name="portal:snapshot-proxy"]')?.content??"http://localhost:3030",Ze=document.querySelector('meta[name="portal:snapshot-scene"]')?.content??"pair",fe=t=>{const o=We({baseUrl:Ye,scene:Ze,pose:t,width:1200,height:630});document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(e=>{e.content=o})};fe(v);const Je=t=>{const o=new URL(location.href);return o.searchParams.set("pose",t),o.toString()},G=new A;window.addEventListener("keydown",t=>{if(t.code!=="KeyP"||t.metaKey||t.ctrlKey||t.altKey)return;G.set(0,0,-1).applyQuaternion(n.quaternion);const o={position:[n.position.x,n.position.y,n.position.z],forward:[G.x,G.y,G.z]},e=Te(o),r=new URL(location.href);r.searchParams.set("pose",e),history.replaceState(null,"",r.toString());const p=Je(e);navigator.clipboard?.writeText(p).catch(()=>{}),fe(o),console.log("[host] permalink:",p)});const et=()=>{const t=window.innerWidth,o=window.innerHeight;a.setSize(t,o),n.aspect=t/o,n.updateProjectionMatrix()};window.addEventListener("resize",et);const ne=new De,U=new ce,u=new A,h=new A,g=new A;let ae=0,W=null,O=null,j=null;const y=[0,0,0],k=[0,0,-1],S=[0,1,0],D=[0,0,0],H=[0,0,-1],B=[0,1,0],me=[0,0,0],_=[0,0,-1],Q=[0,1,0],tt={position:me,forward:_,up:Q},ot={position:y,forward:k,up:S};let se=!1;const I=new A;let X=!1,q=!1;const rt=t=>{if(!f.contentWindow)return;const o={type:"portal:traverse",pose:t,pressedKeys:M.getKeys(),viewport:{width:window.innerWidth,height:window.innerHeight}};f.contentWindow.postMessage(o,"*")};let C=null,Y=!1;const we=()=>{Y||(Y=!0,C!==null&&(window.clearTimeout(C),C=null),document.body.classList.add("handed-off"),f.classList.add("fullscreen"),f.contentWindow?.focus(),M.clearKeys(),F&&console.log("[host] traversal: applied CSS swap"))},ie=new A;window.addEventListener("message",t=>{if(t.source!==f.contentWindow)return;const o=t.data;if(!o||typeof o!="object")return;if(o.type==="portal:traverse-ack"){we();return}if(o.type!=="portal:traverse")return;const e=o.pose;if(n.position.set(e.position[0],e.position[1],e.position[2]),e.up&&n.up.set(e.up[0],e.up[1],e.up[2]),e.forward&&(ie.set(e.position[0]+e.forward[0],e.position[1]+e.forward[1],e.position[2]+e.forward[2]),n.lookAt(ie)),e.forward){const r=new A(e.forward[0],e.forward[1],e.forward[2]);M.setOrientationFromForward?.(r)}if(n.updateMatrixWorld(!0),a.setRenderTarget(null),a.clear(!0,!0,!0),T.renderAsSource(a,n),d.isReady()&&d.hasFrame()){const r=d.getBackground();U.setRGB(r.r,r.g,r.b),z.update(R,n,U),a.render(z.scene,z.camera),a.clearDepth(),d.renderAsDestination(a)}document.body.classList.remove("handed-off"),f.classList.remove("fullscreen"),window.focus(),M.clearKeys(),Array.isArray(o.pressedKeys)&&M.setKeys(o.pressedKeys),q=!1,X=!1,Y=!1,F&&console.log("[host] reverse traversal: resumed source role at",e)});const K=(t,o,e,r)=>{t[0]=e[0]+(e[0]-o[0])*r,t[1]=e[1]+(e[1]-o[1])*r,t[2]=e[2]+(e[2]-o[2])*r},le=t=>{const o=Math.hypot(t[0],t[1],t[2]);if(o<1e-9){t[0]=0,t[1]=0,t[2]=-1;return}const e=1/o;t[0]*=e,t[1]*=e,t[2]*=e},Z=()=>{const t=ne.getDelta(),o=ne.elapsedTime;if(M.update(t),!q&&d.isReady()){if(!X)I.copy(n.position),X=!0;else{const e=d.getAnchor(),r=T.getAnchor();if(He(I,n.position,R).crossed){n.getWorldPosition(u),h.set(0,0,-1).applyQuaternion(n.quaternion),g.set(0,1,0).applyQuaternion(n.quaternion);const l=ee({position:[u.x,u.y,u.z],forward:[h.x,h.y,h.z],up:[g.x,g.y,g.z]},{source:r,target:e});rt(l),q=!0,F&&console.log("[host] traversal: awaiting iframe ack",l),C!==null&&window.clearTimeout(C),C=window.setTimeout(we,250)}}I.copy(n.position)}if(q){requestAnimationFrame(Z);return}if(d.isReady()){n.getWorldPosition(u),h.set(0,0,-1).applyQuaternion(n.quaternion),g.set(0,1,0).applyQuaternion(n.quaternion),y[0]=u.x,y[1]=u.y,y[2]=u.z,k[0]=h.x,k[1]=h.y,k[2]=h.z,S[0]=g.x,S[1]=g.y,S[2]=g.z;let e;L>0&&se?(K(me,D,y,L),K(_,H,k,L),K(Q,B,S,L),le(_),le(Q),e=tt):e=ot,D[0]=y[0],D[1]=y[1],D[2]=y[2],H[0]=k[0],H[1]=k[1],H[2]=k[2],B[0]=S[0],B[1]=S[1],B[2]=S[2],se=!0;const r=T.getAnchor(),p=d.getAnchor(),l=ee(e,{source:r,target:p}),s=Array.from(n.projectionMatrix.elements),i=a.getPixelRatio(),w=Math.max(1,Math.floor(window.innerWidth*i)),b=Math.max(1,Math.floor(window.innerHeight*i));if($&&!W){W=l,O=s,j={width:w,height:b};const c=m=>`[${m.map(x=>x.toFixed(3)).join(", ")}]`;console.log("[host] freeze captured pose pos:",c(l.position)),console.log("[host] freeze captured pose fwd:",c(l.forward??[0,0,-1])),console.log("[host] freeze captured viewport:",w,"x",b)}if(d.requestFrame({pose:$&&W?W:l,projection:$&&O?O:s,viewport:$&&j?j:{width:w,height:b},time:o}),F&&o-ae>1){ae=o;const c=m=>`[${m.map(x=>x.toFixed(3)).join(", ")}]`;console.log("[host] sourceAnchor:",r),console.log("[host] targetAnchor:",p),console.log("[host] hostPos:",c([u.x,u.y,u.z])),console.log("[host] hostFwd:",c([h.x,h.y,h.z])),console.log("[host] hostUp: ",c([g.x,g.y,g.z])),console.log("[host] coupled pos:",c(l.position)),console.log("[host] coupled fwd:",c(l.forward??[0,0,-1])),console.log("[host] coupled up: ",c(l.up??[0,1,0])),console.log("[host] viewport:",w,"x",b)}}if(a.setRenderTarget(null),a.clear(!0,!0,!0),J)d.hasFrame()&&d.renderAsDestination(a);else{T.renderAsSource(a,n);const e=d.isReady()?d.getBackground():{r:0,g:0,b:0};U.setRGB(e.r,e.g,e.b),z.update(R,n,U),a.render(z.scene,z.camera),a.clearDepth(),d.hasFrame()&&d.renderAsDestination(a)}requestAnimationFrame(Z)};Z();
