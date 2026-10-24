import{c as Wr,N as wt,S as rr,C as Ve,F as or,M as St,V as se,R as Xr,a as dt,w as si,W as Ni,b as $t,d as at,L as nn,H as Un,U as Gt,D as Tt,B as Mt,e as ln,f as In,p as Yr,E as Kr,g as ze,P as qt,A as qr,h as Gn,i as Ct,j as Cn,k as Mi,l as cn,m as dn,n as sr,o as Zr,q as Wt,r as wn,s as $r,t as jr,u as tn,O as Qr,v as Jr,x as eo,y as to,z as no,G as io,I as ao,J as ro,K as oo,Q as so,T as lo,X as co,Y as fo,Z as uo,_ as po,$ as ho,a0 as mo,a1 as _o,a2 as Vn,a3 as Xt,a4 as _n,a5 as go,a6 as on,a7 as vo,a8 as Eo,a9 as So,aa as Mo,ab as lr,ac as To,ad as xo,ae as Ao,af as Ti,ag as Fe,ah as Ro,ai as bo,aj as Co,ak as Dt,al as xi,am as sn,an as ut,ao as cr,ap as Bt,aq as bt,ar as Pn,as as dr,at as fr,au as ur,av as pn,aw as wo,ax as Po,ay as Do,az as Lo,aA as pr,aB as Ft,aC as yo,aD as Uo,aE as Io,aF as hr,aG as No,aH as mr,aI as _r,aJ as kn,aK as zn,aL as Wn,aM as Xn,aN as Ze,aO as Oi,aP as Fi,aQ as Bi,aR as Hi,aS as Gi,aT as Vi,aU as ki,aV as zi,aW as Wi,aX as Xi,aY as Yi,aZ as Ki,a_ as qi,a$ as Zi,b0 as $i,b1 as ji,b2 as Qi,b3 as Ji,b4 as ea,b5 as ta,b6 as na,b7 as ia,b8 as aa,b9 as ra,ba as oa,bb as sa,bc as la,bd as ca,be as li,bf as ci,bg as di,bh as fi,bi as ui,bj as pi,bk as hi,bl as Oo,bm as da,bn as Fo,bo as An,bp as Bo,bq as fa,br as ua,bs as pa,bt as mi,bu as _i,bv as Ho,bw as gr,bx as Go,by as Nn,bz as Vo,bA as ko,bB as vr,bC as Ai,bD as ha,bE as Dn,bF as ma,bG as Er,bH as fn,bI as jt,bJ as Sr,bK as Ri,bL as zo,bM as Wo,bN as Xo,bO as _a,bP as mt,bQ as Yo,bR as Ko,bS as qo,bT as Zo,bU as $o,bV as jo,bW as Qo,bX as Jo,bY as es,bZ as ts,b_ as ns,b$ as is,c0 as as,c1 as rs,c2 as os,c3 as ss,c4 as ls,c5 as cs,c6 as un,c7 as Mr,c8 as Ht,c9 as Tr,ca as Ln,cb as ds,cc as fs,cd as us,ce as ps,cf as xr,cg as yn,ch as Pt,ci as Ar,cj as hs,ck as Zt,cl as Yt,cm as ga,cn as ms,co as _s,cp as Yn,cq as va,cr as gs,cs as vs,ct as Es}from"./protocol-B_QniMu2.js";function Rr(){let e=null,n=!1,t=null,i=null;function r(a,f){t(a,f),i=e.requestAnimationFrame(r)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(r),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(a){t=a},setContext:function(a){e=a}}}function Ss(e){const n=new WeakMap;function t(l,E){const g=l.array,x=l.usage,S=g.byteLength,m=e.createBuffer();e.bindBuffer(E,m),e.bufferData(E,g,x),l.onUploadCallback();let T;if(g instanceof Float32Array)T=e.FLOAT;else if(typeof Float16Array<"u"&&g instanceof Float16Array)T=e.HALF_FLOAT;else if(g instanceof Uint16Array)l.isFloat16BufferAttribute?T=e.HALF_FLOAT:T=e.UNSIGNED_SHORT;else if(g instanceof Int16Array)T=e.SHORT;else if(g instanceof Uint32Array)T=e.UNSIGNED_INT;else if(g instanceof Int32Array)T=e.INT;else if(g instanceof Int8Array)T=e.BYTE;else if(g instanceof Uint8Array)T=e.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)T=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:m,type:T,bytesPerElement:g.BYTES_PER_ELEMENT,version:l.version,size:S}}function i(l,E,g){const x=E.array,S=E.updateRanges;if(e.bindBuffer(g,l),S.length===0)e.bufferSubData(g,0,x);else{S.sort((T,U)=>T.start-U.start);let m=0;for(let T=1;T<S.length;T++){const U=S[m],P=S[T];P.start<=U.start+U.count+1?U.count=Math.max(U.count,P.start+P.count-U.start):(++m,S[m]=P)}S.length=m+1;for(let T=0,U=S.length;T<U;T++){const P=S[T];e.bufferSubData(g,P.start*x.BYTES_PER_ELEMENT,x,P.start,P.count)}E.clearUpdateRanges()}E.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const E=n.get(l);E&&(e.deleteBuffer(E.buffer),n.delete(l))}function f(l,E){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const x=n.get(l);(!x||x.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const g=n.get(l);if(g===void 0)n.set(l,t(l,E));else if(g.version<l.version){if(g.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(g.buffer,l,E),g.version=l.version}}return{get:r,remove:a,update:f}}var Ms=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ts=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xs=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,As=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rs=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bs=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cs=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ws=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ps=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ds=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ls=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ys=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Us=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Is=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ns=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Os=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fs=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bs=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hs=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gs=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vs=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ks=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zs=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ws=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xs=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ys=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ks=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qs=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zs=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$s=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,js="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qs=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Js=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,el=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tl=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nl=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,il=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,al=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rl=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ol=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sl=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ll=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cl=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dl=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fl=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ul=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,pl=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hl=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ml=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_l=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gl=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vl=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,El=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sl=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ml=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tl=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Al=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cl=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wl=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pl=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dl=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ll=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yl=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ul=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Il=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nl=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ol=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fl=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bl=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hl=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kl=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zl=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wl=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xl=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yl=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kl=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ql=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zl=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,$l=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ql=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jl=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ec=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tc=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nc=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ic=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ac=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rc=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,oc=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sc=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lc=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cc=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fc=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,uc=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pc=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hc=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mc=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_c=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ec=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sc=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mc=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xc=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ac=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rc=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bc=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cc=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wc=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pc=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Dc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lc=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yc=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Uc=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ic=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Nc=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Oc=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fc=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bc=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hc=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gc=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vc=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,kc=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zc=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wc=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xc=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yc=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kc=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qc=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zc=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$c=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jc=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qc=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jc=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ie={alphahash_fragment:Ms,alphahash_pars_fragment:Ts,alphamap_fragment:xs,alphamap_pars_fragment:As,alphatest_fragment:Rs,alphatest_pars_fragment:bs,aomap_fragment:Cs,aomap_pars_fragment:ws,batching_pars_vertex:Ps,batching_vertex:Ds,begin_vertex:Ls,beginnormal_vertex:ys,bsdfs:Us,iridescence_fragment:Is,bumpmap_pars_fragment:Ns,clipping_planes_fragment:Os,clipping_planes_pars_fragment:Fs,clipping_planes_pars_vertex:Bs,clipping_planes_vertex:Hs,color_fragment:Gs,color_pars_fragment:Vs,color_pars_vertex:ks,color_vertex:zs,common:Ws,cube_uv_reflection_fragment:Xs,defaultnormal_vertex:Ys,displacementmap_pars_vertex:Ks,displacementmap_vertex:qs,emissivemap_fragment:Zs,emissivemap_pars_fragment:$s,colorspace_fragment:js,colorspace_pars_fragment:Qs,envmap_fragment:Js,envmap_common_pars_fragment:el,envmap_pars_fragment:tl,envmap_pars_vertex:nl,envmap_physical_pars_fragment:pl,envmap_vertex:il,fog_vertex:al,fog_pars_vertex:rl,fog_fragment:ol,fog_pars_fragment:sl,gradientmap_pars_fragment:ll,lightmap_pars_fragment:cl,lights_lambert_fragment:dl,lights_lambert_pars_fragment:fl,lights_pars_begin:ul,lights_toon_fragment:hl,lights_toon_pars_fragment:ml,lights_phong_fragment:_l,lights_phong_pars_fragment:gl,lights_physical_fragment:vl,lights_physical_pars_fragment:El,lights_fragment_begin:Sl,lights_fragment_maps:Ml,lights_fragment_end:Tl,logdepthbuf_fragment:xl,logdepthbuf_pars_fragment:Al,logdepthbuf_pars_vertex:Rl,logdepthbuf_vertex:bl,map_fragment:Cl,map_pars_fragment:wl,map_particle_fragment:Pl,map_particle_pars_fragment:Dl,metalnessmap_fragment:Ll,metalnessmap_pars_fragment:yl,morphinstance_vertex:Ul,morphcolor_vertex:Il,morphnormal_vertex:Nl,morphtarget_pars_vertex:Ol,morphtarget_vertex:Fl,normal_fragment_begin:Bl,normal_fragment_maps:Hl,normal_pars_fragment:Gl,normal_pars_vertex:Vl,normal_vertex:kl,normalmap_pars_fragment:zl,clearcoat_normal_fragment_begin:Wl,clearcoat_normal_fragment_maps:Xl,clearcoat_pars_fragment:Yl,iridescence_pars_fragment:Kl,opaque_fragment:ql,packing:Zl,premultiplied_alpha_fragment:$l,project_vertex:jl,dithering_fragment:Ql,dithering_pars_fragment:Jl,roughnessmap_fragment:ec,roughnessmap_pars_fragment:tc,shadowmap_pars_fragment:nc,shadowmap_pars_vertex:ic,shadowmap_vertex:ac,shadowmask_pars_fragment:rc,skinbase_vertex:oc,skinning_pars_vertex:sc,skinning_vertex:lc,skinnormal_vertex:cc,specularmap_fragment:dc,specularmap_pars_fragment:fc,tonemapping_fragment:uc,tonemapping_pars_fragment:pc,transmission_fragment:hc,transmission_pars_fragment:mc,uv_pars_fragment:_c,uv_pars_vertex:gc,uv_vertex:vc,worldpos_vertex:Ec,background_vert:Sc,background_frag:Mc,backgroundCube_vert:Tc,backgroundCube_frag:xc,cube_vert:Ac,cube_frag:Rc,depth_vert:bc,depth_frag:Cc,distanceRGBA_vert:wc,distanceRGBA_frag:Pc,equirect_vert:Dc,equirect_frag:Lc,linedashed_vert:yc,linedashed_frag:Uc,meshbasic_vert:Ic,meshbasic_frag:Nc,meshlambert_vert:Oc,meshlambert_frag:Fc,meshmatcap_vert:Bc,meshmatcap_frag:Hc,meshnormal_vert:Gc,meshnormal_frag:Vc,meshphong_vert:kc,meshphong_frag:zc,meshphysical_vert:Wc,meshphysical_frag:Xc,meshtoon_vert:Yc,meshtoon_frag:Kc,points_vert:qc,points_frag:Zc,shadow_vert:$c,shadow_frag:jc,sprite_vert:Qc,sprite_frag:Jc},ie={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},At={basic:{uniforms:mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:mt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:mt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:mt([ie.points,ie.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:mt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:mt([ie.common,ie.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:mt([ie.sprite,ie.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:mt([ie.common,ie.displacementmap,{referencePosition:{value:new se},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:mt([ie.lights,ie.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};At.physical={uniforms:mt([At.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const gn={r:0,b:0,g:0},Ut=new Dn,ed=new St;function td(e,n,t,i,r,a,f){const l=new Ve(0);let E=a===!0?0:1,g,x,S=null,m=0,T=null;function U(R){let v=R.isScene===!0?R.background:null;return v&&v.isTexture&&(v=(R.backgroundBlurriness>0?t:n).get(v)),v}function P(R){let v=!1;const O=U(R);O===null?o(l,E):O&&O.isColor&&(o(O,1),v=!0);const b=e.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,f):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,f),(e.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function d(R,v){const O=U(v);O&&(O.isCubeTexture||O.mapping===Nn)?(x===void 0&&(x=new ut(new Ai(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:ha(At.backgroundCube.uniforms),vertexShader:At.backgroundCube.vertexShader,fragmentShader:At.backgroundCube.fragmentShader,side:Mt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),x.geometry.deleteAttribute("normal"),x.geometry.deleteAttribute("uv"),x.onBeforeRender=function(b,L,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(x.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(x)),Ut.copy(v.backgroundRotation),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),x.material.uniforms.envMap.value=O,x.material.uniforms.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,x.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,x.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,x.material.uniforms.backgroundRotation.value.setFromMatrix4(ed.makeRotationFromEuler(Ut)),x.material.toneMapped=at.getTransfer(O.colorSpace)!==Ze,(S!==O||m!==O.version||T!==e.toneMapping)&&(x.material.needsUpdate=!0,S=O,m=O.version,T=e.toneMapping),x.layers.enableAll(),R.unshift(x,x.geometry,x.material,0,0,null)):O&&O.isTexture&&(g===void 0&&(g=new ut(new pn(2,2),new Dt({name:"BackgroundMaterial",uniforms:ha(At.background.uniforms),vertexShader:At.background.vertexShader,fragmentShader:At.background.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),Object.defineProperty(g.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(g)),g.material.uniforms.t2D.value=O,g.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,g.material.toneMapped=at.getTransfer(O.colorSpace)!==Ze,O.matrixAutoUpdate===!0&&O.updateMatrix(),g.material.uniforms.uvTransform.value.copy(O.matrix),(S!==O||m!==O.version||T!==e.toneMapping)&&(g.material.needsUpdate=!0,S=O,m=O.version,T=e.toneMapping),g.layers.enableAll(),R.unshift(g,g.geometry,g.material,0,0,null))}function o(R,v){R.getRGB(gn,vr(e)),i.buffers.color.setClear(gn.r,gn.g,gn.b,v,f)}function y(){x!==void 0&&(x.geometry.dispose(),x.material.dispose(),x=void 0),g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0)}return{getClearColor:function(){return l},setClearColor:function(R,v=1){l.set(R),E=v,o(l,E)},getClearAlpha:function(){return E},setClearAlpha:function(R){E=R,o(l,E)},render:P,addToRenderList:d,dispose:y}}function nd(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=m(null);let a=r,f=!1;function l(u,w,H,X,Y){let Z=!1;const W=S(X,H,w);a!==W&&(a=W,g(a.object)),Z=T(u,X,H,Y),Z&&U(u,X,H,Y),Y!==null&&n.update(Y,e.ELEMENT_ARRAY_BUFFER),(Z||f)&&(f=!1,v(u,w,H,X),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Y).buffer))}function E(){return e.createVertexArray()}function g(u){return e.bindVertexArray(u)}function x(u){return e.deleteVertexArray(u)}function S(u,w,H){const X=H.wireframe===!0;let Y=i[u.id];Y===void 0&&(Y={},i[u.id]=Y);let Z=Y[w.id];Z===void 0&&(Z={},Y[w.id]=Z);let W=Z[X];return W===void 0&&(W=m(E()),Z[X]=W),W}function m(u){const w=[],H=[],X=[];for(let Y=0;Y<t;Y++)w[Y]=0,H[Y]=0,X[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:H,attributeDivisors:X,object:u,attributes:{},index:null}}function T(u,w,H,X){const Y=a.attributes,Z=w.attributes;let W=0;const ne=H.getAttributes();for(const V in ne)if(ne[V].location>=0){const xe=Y[V];let ye=Z[V];if(ye===void 0&&(V==="instanceMatrix"&&u.instanceMatrix&&(ye=u.instanceMatrix),V==="instanceColor"&&u.instanceColor&&(ye=u.instanceColor)),xe===void 0||xe.attribute!==ye||ye&&xe.data!==ye.data)return!0;W++}return a.attributesNum!==W||a.index!==X}function U(u,w,H,X){const Y={},Z=w.attributes;let W=0;const ne=H.getAttributes();for(const V in ne)if(ne[V].location>=0){let xe=Z[V];xe===void 0&&(V==="instanceMatrix"&&u.instanceMatrix&&(xe=u.instanceMatrix),V==="instanceColor"&&u.instanceColor&&(xe=u.instanceColor));const ye={};ye.attribute=xe,xe&&xe.data&&(ye.data=xe.data),Y[V]=ye,W++}a.attributes=Y,a.attributesNum=W,a.index=X}function P(){const u=a.newAttributes;for(let w=0,H=u.length;w<H;w++)u[w]=0}function d(u){o(u,0)}function o(u,w){const H=a.newAttributes,X=a.enabledAttributes,Y=a.attributeDivisors;H[u]=1,X[u]===0&&(e.enableVertexAttribArray(u),X[u]=1),Y[u]!==w&&(e.vertexAttribDivisor(u,w),Y[u]=w)}function y(){const u=a.newAttributes,w=a.enabledAttributes;for(let H=0,X=w.length;H<X;H++)w[H]!==u[H]&&(e.disableVertexAttribArray(H),w[H]=0)}function R(u,w,H,X,Y,Z,W){W===!0?e.vertexAttribIPointer(u,w,H,Y,Z):e.vertexAttribPointer(u,w,H,X,Y,Z)}function v(u,w,H,X){P();const Y=X.attributes,Z=H.getAttributes(),W=w.defaultAttributeValues;for(const ne in Z){const V=Z[ne];if(V.location>=0){let ve=Y[ne];if(ve===void 0&&(ne==="instanceMatrix"&&u.instanceMatrix&&(ve=u.instanceMatrix),ne==="instanceColor"&&u.instanceColor&&(ve=u.instanceColor)),ve!==void 0){const xe=ve.normalized,ye=ve.itemSize,He=n.get(ve);if(He===void 0)continue;const nt=He.buffer,et=He.type,Xe=He.bytesPerElement,k=et===e.INT||et===e.UNSIGNED_INT||ve.gpuType===pr;if(ve.isInterleavedBufferAttribute){const q=ve.data,de=q.stride,we=ve.offset;if(q.isInstancedInterleavedBuffer){for(let Se=0;Se<V.locationSize;Se++)o(V.location+Se,q.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Se=0;Se<V.locationSize;Se++)d(V.location+Se);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let Se=0;Se<V.locationSize;Se++)R(V.location+Se,ye/V.locationSize,et,xe,de*Xe,(we+ye/V.locationSize*Se)*Xe,k)}else{if(ve.isInstancedBufferAttribute){for(let q=0;q<V.locationSize;q++)o(V.location+q,ve.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let q=0;q<V.locationSize;q++)d(V.location+q);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let q=0;q<V.locationSize;q++)R(V.location+q,ye/V.locationSize,et,xe,ye*Xe,ye/V.locationSize*q*Xe,k)}}else if(W!==void 0){const xe=W[ne];if(xe!==void 0)switch(xe.length){case 2:e.vertexAttrib2fv(V.location,xe);break;case 3:e.vertexAttrib3fv(V.location,xe);break;case 4:e.vertexAttrib4fv(V.location,xe);break;default:e.vertexAttrib1fv(V.location,xe)}}}}y()}function O(){B();for(const u in i){const w=i[u];for(const H in w){const X=w[H];for(const Y in X)x(X[Y].object),delete X[Y];delete w[H]}delete i[u]}}function b(u){if(i[u.id]===void 0)return;const w=i[u.id];for(const H in w){const X=w[H];for(const Y in X)x(X[Y].object),delete X[Y];delete w[H]}delete i[u.id]}function L(u){for(const w in i){const H=i[w];if(H[u.id]===void 0)continue;const X=H[u.id];for(const Y in X)x(X[Y].object),delete X[Y];delete H[u.id]}}function B(){h(),f=!0,a!==r&&(a=r,g(a.object))}function h(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:B,resetDefaultState:h,dispose:O,releaseStatesOfGeometry:b,releaseStatesOfProgram:L,initAttributes:P,enableAttribute:d,disableUnusedAttributes:y}}function id(e,n,t){let i;function r(g){i=g}function a(g,x){e.drawArrays(i,g,x),t.update(x,i,1)}function f(g,x,S){S!==0&&(e.drawArraysInstanced(i,g,x,S),t.update(x,i,S))}function l(g,x,S){if(S===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,g,0,x,0,S);let T=0;for(let U=0;U<S;U++)T+=x[U];t.update(T,i,1)}function E(g,x,S,m){if(S===0)return;const T=n.get("WEBGL_multi_draw");if(T===null)for(let U=0;U<g.length;U++)f(g[U],x[U],m[U]);else{T.multiDrawArraysInstancedWEBGL(i,g,0,x,0,m,0,S);let U=0;for(let P=0;P<S;P++)U+=x[P]*m[P];t.update(U,i,1)}}this.setMode=r,this.render=a,this.renderInstances=f,this.renderMultiDraw=l,this.renderMultiDrawInstances=E}function ad(e,n,t,i){let r;function a(){if(r!==void 0)return r;if(n.has("EXT_texture_filter_anisotropic")===!0){const L=n.get("EXT_texture_filter_anisotropic");r=e.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function f(L){return!(L!==Ct&&i.convert(L)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(L){const B=L===Un&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(L!==Gt&&i.convert(L)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Ft&&!B)}function E(L){if(L==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let g=t.precision!==void 0?t.precision:"highp";const x=E(g);x!==g&&(console.warn("THREE.WebGLRenderer:",g,"not supported, using",x,"instead."),g=x);const S=t.logarithmicDepthBuffer===!0,m=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),T=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),U=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),P=e.getParameter(e.MAX_TEXTURE_SIZE),d=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),o=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),R=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),O=U>0,b=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:E,textureFormatReadable:f,textureTypeReadable:l,precision:g,logarithmicDepthBuffer:S,reversedDepthBuffer:m,maxTextures:T,maxVertexTextures:U,maxTextureSize:P,maxCubemapSize:d,maxAttributes:o,maxVertexUniforms:y,maxVaryings:R,maxFragmentUniforms:v,vertexTextures:O,maxSamples:b}}function rd(e){const n=this;let t=null,i=0,r=!1,a=!1;const f=new Ti,l=new Fe,E={value:null,needsUpdate:!1};this.uniform=E,this.numPlanes=0,this.numIntersection=0,this.init=function(S,m){const T=S.length!==0||m||i!==0||r;return r=m,i=S.length,T},this.beginShadows=function(){a=!0,x(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(S,m){t=x(S,m,0)},this.setState=function(S,m,T){const U=S.clippingPlanes,P=S.clipIntersection,d=S.clipShadows,o=e.get(S);if(!r||U===null||U.length===0||a&&!d)a?x(null):g();else{const y=a?0:i,R=y*4;let v=o.clippingState||null;E.value=v,v=x(U,m,R,T);for(let O=0;O!==R;++O)v[O]=t[O];o.clippingState=v,this.numIntersection=P?this.numPlanes:0,this.numPlanes+=y}};function g(){E.value!==t&&(E.value=t,E.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function x(S,m,T,U){const P=S!==null?S.length:0;let d=null;if(P!==0){if(d=E.value,U!==!0||d===null){const o=T+P*4,y=m.matrixWorldInverse;l.getNormalMatrix(y),(d===null||d.length<o)&&(d=new Float32Array(o));for(let R=0,v=T;R!==P;++R,v+=4)f.copy(S[R]).applyMatrix4(y,l),f.normal.toArray(d,v),d[v+3]=f.constant}E.value=d,E.needsUpdate=!0}return n.numPlanes=P,n.numIntersection=0,d}}function od(e){let n=new WeakMap;function t(f,l){return l===mi?f.mapping=fn:l===_i&&(f.mapping=jt),f}function i(f){if(f&&f.isTexture){const l=f.mapping;if(l===mi||l===_i)if(n.has(f)){const E=n.get(f).texture;return t(E,f.mapping)}else{const E=f.image;if(E&&E.height>0){const g=new Ho(E.height);return g.fromEquirectangularTexture(e,f),n.set(f,g),f.addEventListener("dispose",r),t(g.texture,f.mapping)}else return null}}return f}function r(f){const l=f.target;l.removeEventListener("dispose",r);const E=n.get(l);E!==void 0&&(n.delete(l),E.dispose())}function a(){n=new WeakMap}return{get:i,dispose:a}}const Kt=4,Ea=[.125,.215,.35,.446,.526,.582],Ot=20,Kn=new Sr,Sa=new Ve;let qn=null,Zn=0,$n=0,jn=!1;const Nt=(1+Math.sqrt(5))/2,kt=1/Nt,Ma=[new se(-Nt,kt,0),new se(Nt,kt,0),new se(-kt,0,Nt),new se(kt,0,Nt),new se(0,Nt,-kt),new se(0,Nt,kt),new se(-1,1,-1),new se(1,1,-1),new se(-1,1,1),new se(1,1,1)],sd=new se;class Ta{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,r=100,a={}){const{size:f=256,position:l=sd}=a;qn=this._renderer.getRenderTarget(),Zn=this._renderer.getActiveCubeFace(),$n=this._renderer.getActiveMipmapLevel(),jn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const E=this._allocateTargets();return E.depthBuffer=!0,this._sceneToCubeUV(n,i,r,E,l),t>0&&this._blur(E,0,0,t),this._applyPMREM(E),this._cleanup(E),E}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ra(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Aa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(qn,Zn,$n),this._renderer.xr.enabled=jn,n.scissorTest=!1,vn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===fn||n.mapping===jt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),qn=this._renderer.getRenderTarget(),Zn=this._renderer.getActiveCubeFace(),$n=this._renderer.getActiveMipmapLevel(),jn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:Un,format:Ct,colorSpace:In,depthBuffer:!1},r=xa(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xa(n,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ld(a)),this._blurMaterial=cd(a,n,t)}return r}_compileMaterial(n){const t=new ut(this._lodPlanes[0],n);this._renderer.compile(t,Kn)}_sceneToCubeUV(n,t,i,r,a){const E=new qt(90,1,t,i),g=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],S=this._renderer,m=S.autoClear,T=S.toneMapping;S.getClearColor(Sa),S.toneMapping=wt,S.autoClear=!1,S.state.buffers.depth.getReversed()&&(S.setRenderTarget(r),S.clearDepth(),S.setRenderTarget(null));const P=new Ri({name:"PMREM.Background",side:Mt,depthWrite:!1,depthTest:!1}),d=new ut(new Ai,P);let o=!1;const y=n.background;y?y.isColor&&(P.color.copy(y),n.background=null,o=!0):(P.color.copy(Sa),o=!0);for(let R=0;R<6;R++){const v=R%3;v===0?(E.up.set(0,g[R],0),E.position.set(a.x,a.y,a.z),E.lookAt(a.x+x[R],a.y,a.z)):v===1?(E.up.set(0,0,g[R]),E.position.set(a.x,a.y,a.z),E.lookAt(a.x,a.y+x[R],a.z)):(E.up.set(0,g[R],0),E.position.set(a.x,a.y,a.z),E.lookAt(a.x,a.y,a.z+x[R]));const O=this._cubeSize;vn(r,v*O,R>2?O:0,O,O),S.setRenderTarget(r),o&&S.render(d,E),S.render(n,E)}d.geometry.dispose(),d.material.dispose(),S.toneMapping=T,S.autoClear=m,n.background=y}_textureToCubeUV(n,t){const i=this._renderer,r=n.mapping===fn||n.mapping===jt;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ra()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Aa());const a=r?this._cubemapMaterial:this._equirectMaterial,f=new ut(this._lodPlanes[0],a),l=a.uniforms;l.envMap.value=n;const E=this._cubeSize;vn(t,0,0,3*E,2*E),i.setRenderTarget(t),i.render(f,Kn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const f=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),l=Ma[(r-a-1)%Ma.length];this._blur(n,a-1,a,f,l)}t.autoClear=i}_blur(n,t,i,r,a){const f=this._pingPongRenderTarget;this._halfBlur(n,f,t,i,r,"latitudinal",a),this._halfBlur(f,n,i,i,r,"longitudinal",a)}_halfBlur(n,t,i,r,a,f,l){const E=this._renderer,g=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const x=3,S=new ut(this._lodPlanes[r],g),m=g.uniforms,T=this._sizeLods[i]-1,U=isFinite(a)?Math.PI/(2*T):2*Math.PI/(2*Ot-1),P=a/U,d=isFinite(a)?1+Math.floor(x*P):Ot;d>Ot&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Ot}`);const o=[];let y=0;for(let L=0;L<Ot;++L){const B=L/P,h=Math.exp(-B*B/2);o.push(h),L===0?y+=h:L<d&&(y+=2*h)}for(let L=0;L<o.length;L++)o[L]=o[L]/y;m.envMap.value=n.texture,m.samples.value=d,m.weights.value=o,m.latitudinal.value=f==="latitudinal",l&&(m.poleAxis.value=l);const{_lodMax:R}=this;m.dTheta.value=U,m.mipInt.value=R-i;const v=this._sizeLods[r],O=3*v*(r>R-Kt?r-R+Kt:0),b=4*(this._cubeSize-v);vn(t,O,b,3*v,2*v),E.setRenderTarget(t),E.render(S,Kn)}}function ld(e){const n=[],t=[],i=[];let r=e;const a=e-Kt+1+Ea.length;for(let f=0;f<a;f++){const l=Math.pow(2,r);t.push(l);let E=1/l;f>e-Kt?E=Ea[f-e+Kt-1]:f===0&&(E=0),i.push(E);const g=1/(l-2),x=-g,S=1+g,m=[x,x,S,x,S,S,x,x,S,S,x,S],T=6,U=6,P=3,d=2,o=1,y=new Float32Array(P*U*T),R=new Float32Array(d*U*T),v=new Float32Array(o*U*T);for(let b=0;b<T;b++){const L=b%3*2/3-1,B=b>2?0:-1,h=[L,B,0,L+2/3,B,0,L+2/3,B+1,0,L,B,0,L+2/3,B+1,0,L,B+1,0];y.set(h,P*U*b),R.set(m,d*U*b);const u=[b,b,b,b,b,b];v.set(u,o*U*b)}const O=new xi;O.setAttribute("position",new sn(y,P)),O.setAttribute("uv",new sn(R,d)),O.setAttribute("faceIndex",new sn(v,o)),n.push(O),r>Kt&&r--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function xa(e,n,t){const i=new $t(e,n,t);return i.texture.mapping=Nn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vn(e,n,t,i,r){e.viewport.set(n,t,i,r),e.scissor.set(n,t,i,r)}function cd(e,n,t){const i=new Float32Array(Ot),r=new se(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:Ot,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:bi(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function Aa(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bi(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function Ra(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bi(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function bi(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function dd(e){let n=new WeakMap,t=null;function i(l){if(l&&l.isTexture){const E=l.mapping,g=E===mi||E===_i,x=E===fn||E===jt;if(g||x){let S=n.get(l);const m=S!==void 0?S.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return t===null&&(t=new Ta(e)),S=g?t.fromEquirectangular(l,S):t.fromCubemap(l,S),S.texture.pmremVersion=l.pmremVersion,n.set(l,S),S.texture;if(S!==void 0)return S.texture;{const T=l.image;return g&&T&&T.height>0||x&&T&&r(T)?(t===null&&(t=new Ta(e)),S=g?t.fromEquirectangular(l):t.fromCubemap(l),S.texture.pmremVersion=l.pmremVersion,n.set(l,S),l.addEventListener("dispose",a),S.texture):null}}}return l}function r(l){let E=0;const g=6;for(let x=0;x<g;x++)l[x]!==void 0&&E++;return E===g}function a(l){const E=l.target;E.removeEventListener("dispose",a);const g=n.get(E);g!==void 0&&(n.delete(E),g.dispose())}function f(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:f}}function fd(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let r;switch(i){case"WEBGL_depth_texture":r=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=e.getExtension(i)}return n[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&si("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function ud(e,n,t,i){const r={},a=new WeakMap;function f(S){const m=S.target;m.index!==null&&n.remove(m.index);for(const U in m.attributes)n.remove(m.attributes[U]);m.removeEventListener("dispose",f),delete r[m.id];const T=a.get(m);T&&(n.remove(T),a.delete(m)),i.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function l(S,m){return r[m.id]===!0||(m.addEventListener("dispose",f),r[m.id]=!0,t.memory.geometries++),m}function E(S){const m=S.attributes;for(const T in m)n.update(m[T],e.ARRAY_BUFFER)}function g(S){const m=[],T=S.index,U=S.attributes.position;let P=0;if(T!==null){const y=T.array;P=T.version;for(let R=0,v=y.length;R<v;R+=3){const O=y[R+0],b=y[R+1],L=y[R+2];m.push(O,b,b,L,L,O)}}else if(U!==void 0){const y=U.array;P=U.version;for(let R=0,v=y.length/3-1;R<v;R+=3){const O=R+0,b=R+1,L=R+2;m.push(O,b,b,L,L,O)}}else return;const d=new(Xo(m)?zo:Wo)(m,1);d.version=P;const o=a.get(S);o&&n.remove(o),a.set(S,d)}function x(S){const m=a.get(S);if(m){const T=S.index;T!==null&&m.version<T.version&&g(S)}else g(S);return a.get(S)}return{get:l,update:E,getWireframeAttribute:x}}function pd(e,n,t){let i;function r(m){i=m}let a,f;function l(m){a=m.type,f=m.bytesPerElement}function E(m,T){e.drawElements(i,T,a,m*f),t.update(T,i,1)}function g(m,T,U){U!==0&&(e.drawElementsInstanced(i,T,a,m*f,U),t.update(T,i,U))}function x(m,T,U){if(U===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,T,0,a,m,0,U);let d=0;for(let o=0;o<U;o++)d+=T[o];t.update(d,i,1)}function S(m,T,U,P){if(U===0)return;const d=n.get("WEBGL_multi_draw");if(d===null)for(let o=0;o<m.length;o++)g(m[o]/f,T[o],P[o]);else{d.multiDrawElementsInstancedWEBGL(i,T,0,a,m,0,P,0,U);let o=0;for(let y=0;y<U;y++)o+=T[y]*P[y];t.update(o,i,1)}}this.setMode=r,this.setIndex=l,this.render=E,this.renderInstances=g,this.renderMultiDraw=x,this.renderMultiDrawInstances=S}function hd(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,f,l){switch(t.calls++,f){case e.TRIANGLES:t.triangles+=l*(a/3);break;case e.LINES:t.lines+=l*(a/2);break;case e.LINE_STRIP:t.lines+=l*(a-1);break;case e.LINE_LOOP:t.lines+=l*a;break;case e.POINTS:t.points+=l*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:r,update:i}}function md(e,n,t){const i=new WeakMap,r=new dt;function a(f,l,E){const g=f.morphTargetInfluences,x=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,S=x!==void 0?x.length:0;let m=i.get(l);if(m===void 0||m.count!==S){let h=function(){L.dispose(),i.delete(l),l.removeEventListener("dispose",h)};m!==void 0&&m.texture.dispose();const T=l.morphAttributes.position!==void 0,U=l.morphAttributes.normal!==void 0,P=l.morphAttributes.color!==void 0,d=l.morphAttributes.position||[],o=l.morphAttributes.normal||[],y=l.morphAttributes.color||[];let R=0;T===!0&&(R=1),U===!0&&(R=2),P===!0&&(R=3);let v=l.attributes.position.count*R,O=1;v>n.maxTextureSize&&(O=Math.ceil(v/n.maxTextureSize),v=n.maxTextureSize);const b=new Float32Array(v*O*4*S),L=new gr(b,v,O,S);L.type=Ft,L.needsUpdate=!0;const B=R*4;for(let u=0;u<S;u++){const w=d[u],H=o[u],X=y[u],Y=v*O*4*u;for(let Z=0;Z<w.count;Z++){const W=Z*B;T===!0&&(r.fromBufferAttribute(w,Z),b[Y+W+0]=r.x,b[Y+W+1]=r.y,b[Y+W+2]=r.z,b[Y+W+3]=0),U===!0&&(r.fromBufferAttribute(H,Z),b[Y+W+4]=r.x,b[Y+W+5]=r.y,b[Y+W+6]=r.z,b[Y+W+7]=0),P===!0&&(r.fromBufferAttribute(X,Z),b[Y+W+8]=r.x,b[Y+W+9]=r.y,b[Y+W+10]=r.z,b[Y+W+11]=X.itemSize===4?r.w:1)}}m={count:S,texture:L,size:new ze(v,O)},i.set(l,m),l.addEventListener("dispose",h)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)E.getUniforms().setValue(e,"morphTexture",f.morphTexture,t);else{let T=0;for(let P=0;P<g.length;P++)T+=g[P];const U=l.morphTargetsRelative?1:1-T;E.getUniforms().setValue(e,"morphTargetBaseInfluence",U),E.getUniforms().setValue(e,"morphTargetInfluences",g)}E.getUniforms().setValue(e,"morphTargetsTexture",m.texture,t),E.getUniforms().setValue(e,"morphTargetsTextureSize",m.size)}return{update:a}}function _d(e,n,t,i){let r=new WeakMap;function a(E){const g=i.render.frame,x=E.geometry,S=n.get(E,x);if(r.get(S)!==g&&(n.update(S),r.set(S,g)),E.isInstancedMesh&&(E.hasEventListener("dispose",l)===!1&&E.addEventListener("dispose",l),r.get(E)!==g&&(t.update(E.instanceMatrix,e.ARRAY_BUFFER),E.instanceColor!==null&&t.update(E.instanceColor,e.ARRAY_BUFFER),r.set(E,g))),E.isSkinnedMesh){const m=E.skeleton;r.get(m)!==g&&(m.update(),r.set(m,g))}return S}function f(){r=new WeakMap}function l(E){const g=E.target;g.removeEventListener("dispose",l),t.remove(g.instanceMatrix),g.instanceColor!==null&&t.remove(g.instanceColor)}return{update:a,dispose:f}}const br=new is,ba=new sr(1,1),Cr=new gr,wr=new ns,Pr=new ts,Ca=[],wa=[],Pa=new Float32Array(16),Da=new Float32Array(9),La=new Float32Array(4);function Jt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const r=n*t;let a=Ca[r];if(a===void 0&&(a=new Float32Array(r),Ca[r]=a),n!==0){i.toArray(a,0);for(let f=1,l=0;f!==n;++f)l+=t,e[f].toArray(a,l)}return a}function ot(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function st(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function On(e,n){let t=wa[n];t===void 0&&(t=new Int32Array(n),wa[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function gd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function vd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2fv(this.addr,n),st(t,n)}}function Ed(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(ot(t,n))return;e.uniform3fv(this.addr,n),st(t,n)}}function Sd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4fv(this.addr,n),st(t,n)}}function Md(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;La.set(i),e.uniformMatrix2fv(this.addr,!1,La),st(t,i)}}function Td(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;Da.set(i),e.uniformMatrix3fv(this.addr,!1,Da),st(t,i)}}function xd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;Pa.set(i),e.uniformMatrix4fv(this.addr,!1,Pa),st(t,i)}}function Ad(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Rd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2iv(this.addr,n),st(t,n)}}function bd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ot(t,n))return;e.uniform3iv(this.addr,n),st(t,n)}}function Cd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4iv(this.addr,n),st(t,n)}}function wd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Pd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2uiv(this.addr,n),st(t,n)}}function Dd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ot(t,n))return;e.uniform3uiv(this.addr,n),st(t,n)}}function Ld(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4uiv(this.addr,n),st(t,n)}}function yd(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let a;this.type===e.SAMPLER_2D_SHADOW?(ba.compareFunction=lr,a=ba):a=br,t.setTexture2D(n||a,r)}function Ud(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(n||wr,r)}function Id(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(n||Pr,r)}function Nd(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(n||Cr,r)}function Od(e){switch(e){case 5126:return gd;case 35664:return vd;case 35665:return Ed;case 35666:return Sd;case 35674:return Md;case 35675:return Td;case 35676:return xd;case 5124:case 35670:return Ad;case 35667:case 35671:return Rd;case 35668:case 35672:return bd;case 35669:case 35673:return Cd;case 5125:return wd;case 36294:return Pd;case 36295:return Dd;case 36296:return Ld;case 35678:case 36198:case 36298:case 36306:case 35682:return yd;case 35679:case 36299:case 36307:return Ud;case 35680:case 36300:case 36308:case 36293:return Id;case 36289:case 36303:case 36311:case 36292:return Nd}}function Fd(e,n){e.uniform1fv(this.addr,n)}function Bd(e,n){const t=Jt(n,this.size,2);e.uniform2fv(this.addr,t)}function Hd(e,n){const t=Jt(n,this.size,3);e.uniform3fv(this.addr,t)}function Gd(e,n){const t=Jt(n,this.size,4);e.uniform4fv(this.addr,t)}function Vd(e,n){const t=Jt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function kd(e,n){const t=Jt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function zd(e,n){const t=Jt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Wd(e,n){e.uniform1iv(this.addr,n)}function Xd(e,n){e.uniform2iv(this.addr,n)}function Yd(e,n){e.uniform3iv(this.addr,n)}function Kd(e,n){e.uniform4iv(this.addr,n)}function qd(e,n){e.uniform1uiv(this.addr,n)}function Zd(e,n){e.uniform2uiv(this.addr,n)}function $d(e,n){e.uniform3uiv(this.addr,n)}function jd(e,n){e.uniform4uiv(this.addr,n)}function Qd(e,n,t){const i=this.cache,r=n.length,a=On(t,r);ot(i,a)||(e.uniform1iv(this.addr,a),st(i,a));for(let f=0;f!==r;++f)t.setTexture2D(n[f]||br,a[f])}function Jd(e,n,t){const i=this.cache,r=n.length,a=On(t,r);ot(i,a)||(e.uniform1iv(this.addr,a),st(i,a));for(let f=0;f!==r;++f)t.setTexture3D(n[f]||wr,a[f])}function ef(e,n,t){const i=this.cache,r=n.length,a=On(t,r);ot(i,a)||(e.uniform1iv(this.addr,a),st(i,a));for(let f=0;f!==r;++f)t.setTextureCube(n[f]||Pr,a[f])}function tf(e,n,t){const i=this.cache,r=n.length,a=On(t,r);ot(i,a)||(e.uniform1iv(this.addr,a),st(i,a));for(let f=0;f!==r;++f)t.setTexture2DArray(n[f]||Cr,a[f])}function nf(e){switch(e){case 5126:return Fd;case 35664:return Bd;case 35665:return Hd;case 35666:return Gd;case 35674:return Vd;case 35675:return kd;case 35676:return zd;case 5124:case 35670:return Wd;case 35667:case 35671:return Xd;case 35668:case 35672:return Yd;case 35669:case 35673:return Kd;case 5125:return qd;case 36294:return Zd;case 36295:return $d;case 36296:return jd;case 35678:case 36198:case 36298:case 36306:case 35682:return Qd;case 35679:case 36299:case 36307:return Jd;case 35680:case 36300:case 36308:case 36293:return ef;case 36289:case 36303:case 36311:case 36292:return tf}}class af{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Od(t.type)}}class rf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=nf(t.type)}}class of{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const r=this.seq;for(let a=0,f=r.length;a!==f;++a){const l=r[a];l.setValue(n,t[l.id],i)}}}const Qn=/(\w+)(\])?(\[|\.)?/g;function ya(e,n){e.seq.push(n),e.map[n.id]=n}function sf(e,n,t){const i=e.name,r=i.length;for(Qn.lastIndex=0;;){const a=Qn.exec(i),f=Qn.lastIndex;let l=a[1];const E=a[2]==="]",g=a[3];if(E&&(l=l|0),g===void 0||g==="["&&f+2===r){ya(t,g===void 0?new af(l,e,n):new rf(l,e,n));break}else{let S=t.map[l];S===void 0&&(S=new of(l),ya(t,S)),t=S}}}class Rn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=n.getActiveUniform(t,r),f=n.getUniformLocation(t,a.name);sf(a,f,this)}}setValue(n,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(n,i,r)}setOptional(n,t,i){const r=t[i];r!==void 0&&this.setValue(n,i,r)}static upload(n,t,i,r){for(let a=0,f=t.length;a!==f;++a){const l=t[a],E=i[l.id];E.needsUpdate!==!1&&l.setValue(n,E.value,r)}}static seqWithValue(n,t){const i=[];for(let r=0,a=n.length;r!==a;++r){const f=n[r];f.id in t&&i.push(f)}return i}}function Ua(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const lf=37297;let cf=0;function df(e,n){const t=e.split(`
`),i=[],r=Math.max(n-6,0),a=Math.min(n+6,t.length);for(let f=r;f<a;f++){const l=f+1;i.push(`${l===n?">":" "} ${l}: ${t[f]}`)}return i.join(`
`)}const Ia=new Fe;function ff(e){at._getMatrix(Ia,at.workingColorSpace,e);const n=`mat3( ${Ia.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(e)){case Er:return[n,"LinearTransferOETF"];case Ze:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Na(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),a=(e.getShaderInfoLog(n)||"").trim();if(i&&a==="")return"";const f=/ERROR: 0:(\d+)/.exec(a);if(f){const l=parseInt(f[1]);return t.toUpperCase()+`

`+a+`

`+df(e.getShaderSource(n),l)}else return a}function uf(e,n){const t=ff(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function pf(e,n){let t;switch(n){case es:t="Linear";break;case Jo:t="Reinhard";break;case Qo:t="Cineon";break;case jo:t="ACESFilmic";break;case $o:t="AgX";break;case Zo:t="Neutral";break;case qo:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const En=new se;function hf(){at.getLuminanceCoefficients(En);const e=En.x.toFixed(4),n=En.y.toFixed(4),t=En.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mf(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(an).join(`
`)}function _f(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function gf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=e.getActiveAttrib(n,r),f=a.name;let l=1;a.type===e.FLOAT_MAT2&&(l=2),a.type===e.FLOAT_MAT3&&(l=3),a.type===e.FLOAT_MAT4&&(l=4),t[f]={type:a.type,location:e.getAttribLocation(n,f),locationSize:l}}return t}function an(e){return e!==""}function Oa(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Fa(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const vf=/^[ \t]*#include +<([\w\d./]+)>/gm;function gi(e){return e.replace(vf,Sf)}const Ef=new Map;function Sf(e,n){let t=Ie[n];if(t===void 0){const i=Ef.get(n);if(i!==void 0)t=Ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return gi(t)}const Mf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ba(e){return e.replace(Mf,Tf)}function Tf(e,n,t,i){let r="";for(let a=parseInt(n);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Ha(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}function xf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===cr?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===Ko?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===bt&&(n="SHADOWMAP_TYPE_VSM"),n}function Af(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case fn:case jt:n="ENVMAP_TYPE_CUBE";break;case Nn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Rf(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===jt&&(n="ENVMAP_MODE_REFRACTION"),n}function bf(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case ss:n="ENVMAP_BLENDING_MULTIPLY";break;case os:n="ENVMAP_BLENDING_MIX";break;case rs:n="ENVMAP_BLENDING_ADD";break}return n}function Cf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function wf(e,n,t,i){const r=e.getContext(),a=t.defines;let f=t.vertexShader,l=t.fragmentShader;const E=xf(t),g=Af(t),x=Rf(t),S=bf(t),m=Cf(t),T=mf(t),U=_f(a),P=r.createProgram();let d,o,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,U].filter(an).join(`
`),d.length>0&&(d+=`
`),o=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,U].filter(an).join(`
`),o.length>0&&(o+=`
`)):(d=[Ha(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,U,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+x:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+E:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(an).join(`
`),o=[Ha(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,U,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.envMap?"#define "+x:"",t.envMap?"#define "+S:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+E:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wt?"#define TONE_MAPPING":"",t.toneMapping!==wt?Ie.tonemapping_pars_fragment:"",t.toneMapping!==wt?pf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,uf("linearToOutputTexel",t.outputColorSpace),hf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(an).join(`
`)),f=gi(f),f=Oa(f,t),f=Fa(f,t),l=gi(l),l=Oa(l,t),l=Fa(l,t),f=Ba(f),l=Ba(l),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=[T,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,o=["#define varying in",t.glslVersion===_a?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_a?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+o);const R=y+d+f,v=y+o+l,O=Ua(r,r.VERTEX_SHADER,R),b=Ua(r,r.FRAGMENT_SHADER,v);r.attachShader(P,O),r.attachShader(P,b),t.index0AttributeName!==void 0?r.bindAttribLocation(P,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(P,0,"position"),r.linkProgram(P);function L(w){if(e.debug.checkShaderErrors){const H=r.getProgramInfoLog(P)||"",X=r.getShaderInfoLog(O)||"",Y=r.getShaderInfoLog(b)||"",Z=H.trim(),W=X.trim(),ne=Y.trim();let V=!0,ve=!0;if(r.getProgramParameter(P,r.LINK_STATUS)===!1)if(V=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,P,O,b);else{const xe=Na(r,O,"vertex"),ye=Na(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(P,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+Z+`
`+xe+`
`+ye)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(W===""||ne==="")&&(ve=!1);ve&&(w.diagnostics={runnable:V,programLog:Z,vertexShader:{log:W,prefix:d},fragmentShader:{log:ne,prefix:o}})}r.deleteShader(O),r.deleteShader(b),B=new Rn(r,P),h=gf(r,P)}let B;this.getUniforms=function(){return B===void 0&&L(this),B};let h;this.getAttributes=function(){return h===void 0&&L(this),h};let u=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return u===!1&&(u=r.getProgramParameter(P,lf)),u},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(P),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cf++,this.cacheKey=n,this.usedTimes=1,this.program=P,this.vertexShader=O,this.fragmentShader=b,this}let Pf=0;class Df{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),f=this._getShaderCacheForMaterial(n);return f.has(r)===!1&&(f.add(r),r.usedTimes++),f.has(a)===!1&&(f.add(a),a.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Lf(n),t.set(n,i)),i}}class Lf{constructor(n){this.id=Pf++,this.code=n,this.usedTimes=0}}function yf(e,n,t,i,r,a,f){const l=new Yo,E=new Df,g=new Set,x=[],S=r.logarithmicDepthBuffer,m=r.vertexTextures;let T=r.precision;const U={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function P(h){return g.add(h),h===0?"uv":`uv${h}`}function d(h,u,w,H,X){const Y=H.fog,Z=X.geometry,W=h.isMeshStandardMaterial?H.environment:null,ne=(h.isMeshStandardMaterial?t:n).get(h.envMap||W),V=ne&&ne.mapping===Nn?ne.image.height:null,ve=U[h.type];h.precision!==null&&(T=r.getMaxPrecision(h.precision),T!==h.precision&&console.warn("THREE.WebGLProgram.getParameters:",h.precision,"not supported, using",T,"instead."));const xe=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ye=xe!==void 0?xe.length:0;let He=0;Z.morphAttributes.position!==void 0&&(He=1),Z.morphAttributes.normal!==void 0&&(He=2),Z.morphAttributes.color!==void 0&&(He=3);let nt,et,Xe,k;if(ve){const Ge=At[ve];nt=Ge.vertexShader,et=Ge.fragmentShader}else nt=h.vertexShader,et=h.fragmentShader,E.update(h),Xe=E.getVertexShaderID(h),k=E.getFragmentShaderID(h);const q=e.getRenderTarget(),de=e.state.buffers.depth.getReversed(),we=X.isInstancedMesh===!0,Se=X.isBatchedMesh===!0,Oe=!!h.map,ct=!!h.matcap,_=!!ne,$e=!!h.aoMap,De=!!h.lightMap,be=!!h.bumpMap,pe=!!h.normalMap,je=!!h.displacementMap,he=!!h.emissiveMap,Ue=!!h.metalnessMap,lt=!!h.roughnessMap,it=h.anisotropy>0,p=h.clearcoat>0,s=h.dispersion>0,D=h.iridescence>0,G=h.sheen>0,K=h.transmission>0,F=it&&!!h.anisotropyMap,Ee=p&&!!h.clearcoatMap,ee=p&&!!h.clearcoatNormalMap,me=p&&!!h.clearcoatRoughnessMap,_e=D&&!!h.iridescenceMap,Q=D&&!!h.iridescenceThicknessMap,oe=G&&!!h.sheenColorMap,Re=G&&!!h.sheenRoughnessMap,ge=!!h.specularMap,ae=!!h.specularColorMap,Le=!!h.specularIntensityMap,M=K&&!!h.transmissionMap,J=K&&!!h.thicknessMap,te=!!h.gradientMap,ce=!!h.alphaMap,$=h.alphaTest>0,z=!!h.alphaHash,ue=!!h.extensions;let Pe=wt;h.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Pe=e.toneMapping);const Ke={shaderID:ve,shaderType:h.type,shaderName:h.name,vertexShader:nt,fragmentShader:et,defines:h.defines,customVertexShaderID:Xe,customFragmentShaderID:k,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:T,batching:Se,batchingColor:Se&&X._colorsTexture!==null,instancing:we,instancingColor:we&&X.instanceColor!==null,instancingMorph:we&&X.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:q===null?e.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:In,alphaToCoverage:!!h.alphaToCoverage,map:Oe,matcap:ct,envMap:_,envMapMode:_&&ne.mapping,envMapCubeUVHeight:V,aoMap:$e,lightMap:De,bumpMap:be,normalMap:pe,displacementMap:m&&je,emissiveMap:he,normalMapObjectSpace:pe&&h.normalMapType===ko,normalMapTangentSpace:pe&&h.normalMapType===Vo,metalnessMap:Ue,roughnessMap:lt,anisotropy:it,anisotropyMap:F,clearcoat:p,clearcoatMap:Ee,clearcoatNormalMap:ee,clearcoatRoughnessMap:me,dispersion:s,iridescence:D,iridescenceMap:_e,iridescenceThicknessMap:Q,sheen:G,sheenColorMap:oe,sheenRoughnessMap:Re,specularMap:ge,specularColorMap:ae,specularIntensityMap:Le,transmission:K,transmissionMap:M,thicknessMap:J,gradientMap:te,opaque:h.transparent===!1&&h.blending===An&&h.alphaToCoverage===!1,alphaMap:ce,alphaTest:$,alphaHash:z,combine:h.combine,mapUv:Oe&&P(h.map.channel),aoMapUv:$e&&P(h.aoMap.channel),lightMapUv:De&&P(h.lightMap.channel),bumpMapUv:be&&P(h.bumpMap.channel),normalMapUv:pe&&P(h.normalMap.channel),displacementMapUv:je&&P(h.displacementMap.channel),emissiveMapUv:he&&P(h.emissiveMap.channel),metalnessMapUv:Ue&&P(h.metalnessMap.channel),roughnessMapUv:lt&&P(h.roughnessMap.channel),anisotropyMapUv:F&&P(h.anisotropyMap.channel),clearcoatMapUv:Ee&&P(h.clearcoatMap.channel),clearcoatNormalMapUv:ee&&P(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&P(h.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&P(h.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&P(h.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&P(h.sheenColorMap.channel),sheenRoughnessMapUv:Re&&P(h.sheenRoughnessMap.channel),specularMapUv:ge&&P(h.specularMap.channel),specularColorMapUv:ae&&P(h.specularColorMap.channel),specularIntensityMapUv:Le&&P(h.specularIntensityMap.channel),transmissionMapUv:M&&P(h.transmissionMap.channel),thicknessMapUv:J&&P(h.thicknessMap.channel),alphaMapUv:ce&&P(h.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(pe||it),vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!Z.attributes.uv&&(Oe||ce),fog:!!Y,useFog:h.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:h.flatShading===!0&&h.wireframe===!1,sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:S,reversedDepthBuffer:de,skinning:X.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:He,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numSpotLightMaps:u.spotLightMap.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numSpotLightShadowsWithMaps:u.numSpotLightShadowsWithMaps,numLightProbes:u.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:h.dithering,shadowMapEnabled:e.shadowMap.enabled&&w.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:Oe&&h.map.isVideoTexture===!0&&at.getTransfer(h.map.colorSpace)===Ze,decodeVideoTextureEmissive:he&&h.emissiveMap.isVideoTexture===!0&&at.getTransfer(h.emissiveMap.colorSpace)===Ze,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===Tt,flipSided:h.side===Mt,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:ue&&h.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&h.extensions.multiDraw===!0||Se)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return Ke.vertexUv1s=g.has(1),Ke.vertexUv2s=g.has(2),Ke.vertexUv3s=g.has(3),g.clear(),Ke}function o(h){const u=[];if(h.shaderID?u.push(h.shaderID):(u.push(h.customVertexShaderID),u.push(h.customFragmentShaderID)),h.defines!==void 0)for(const w in h.defines)u.push(w),u.push(h.defines[w]);return h.isRawShaderMaterial===!1&&(y(u,h),R(u,h),u.push(e.outputColorSpace)),u.push(h.customProgramCacheKey),u.join()}function y(h,u){h.push(u.precision),h.push(u.outputColorSpace),h.push(u.envMapMode),h.push(u.envMapCubeUVHeight),h.push(u.mapUv),h.push(u.alphaMapUv),h.push(u.lightMapUv),h.push(u.aoMapUv),h.push(u.bumpMapUv),h.push(u.normalMapUv),h.push(u.displacementMapUv),h.push(u.emissiveMapUv),h.push(u.metalnessMapUv),h.push(u.roughnessMapUv),h.push(u.anisotropyMapUv),h.push(u.clearcoatMapUv),h.push(u.clearcoatNormalMapUv),h.push(u.clearcoatRoughnessMapUv),h.push(u.iridescenceMapUv),h.push(u.iridescenceThicknessMapUv),h.push(u.sheenColorMapUv),h.push(u.sheenRoughnessMapUv),h.push(u.specularMapUv),h.push(u.specularColorMapUv),h.push(u.specularIntensityMapUv),h.push(u.transmissionMapUv),h.push(u.thicknessMapUv),h.push(u.combine),h.push(u.fogExp2),h.push(u.sizeAttenuation),h.push(u.morphTargetsCount),h.push(u.morphAttributeCount),h.push(u.numDirLights),h.push(u.numPointLights),h.push(u.numSpotLights),h.push(u.numSpotLightMaps),h.push(u.numHemiLights),h.push(u.numRectAreaLights),h.push(u.numDirLightShadows),h.push(u.numPointLightShadows),h.push(u.numSpotLightShadows),h.push(u.numSpotLightShadowsWithMaps),h.push(u.numLightProbes),h.push(u.shadowMapType),h.push(u.toneMapping),h.push(u.numClippingPlanes),h.push(u.numClipIntersection),h.push(u.depthPacking)}function R(h,u){l.disableAll(),u.supportsVertexTextures&&l.enable(0),u.instancing&&l.enable(1),u.instancingColor&&l.enable(2),u.instancingMorph&&l.enable(3),u.matcap&&l.enable(4),u.envMap&&l.enable(5),u.normalMapObjectSpace&&l.enable(6),u.normalMapTangentSpace&&l.enable(7),u.clearcoat&&l.enable(8),u.iridescence&&l.enable(9),u.alphaTest&&l.enable(10),u.vertexColors&&l.enable(11),u.vertexAlphas&&l.enable(12),u.vertexUv1s&&l.enable(13),u.vertexUv2s&&l.enable(14),u.vertexUv3s&&l.enable(15),u.vertexTangents&&l.enable(16),u.anisotropy&&l.enable(17),u.alphaHash&&l.enable(18),u.batching&&l.enable(19),u.dispersion&&l.enable(20),u.batchingColor&&l.enable(21),u.gradientMap&&l.enable(22),h.push(l.mask),l.disableAll(),u.fog&&l.enable(0),u.useFog&&l.enable(1),u.flatShading&&l.enable(2),u.logarithmicDepthBuffer&&l.enable(3),u.reversedDepthBuffer&&l.enable(4),u.skinning&&l.enable(5),u.morphTargets&&l.enable(6),u.morphNormals&&l.enable(7),u.morphColors&&l.enable(8),u.premultipliedAlpha&&l.enable(9),u.shadowMapEnabled&&l.enable(10),u.doubleSided&&l.enable(11),u.flipSided&&l.enable(12),u.useDepthPacking&&l.enable(13),u.dithering&&l.enable(14),u.transmission&&l.enable(15),u.sheen&&l.enable(16),u.opaque&&l.enable(17),u.pointsUvs&&l.enable(18),u.decodeVideoTexture&&l.enable(19),u.decodeVideoTextureEmissive&&l.enable(20),u.alphaToCoverage&&l.enable(21),h.push(l.mask)}function v(h){const u=U[h.type];let w;if(u){const H=At[u];w=Go.clone(H.uniforms)}else w=h.uniforms;return w}function O(h,u){let w;for(let H=0,X=x.length;H<X;H++){const Y=x[H];if(Y.cacheKey===u){w=Y,++w.usedTimes;break}}return w===void 0&&(w=new wf(e,u,h,a),x.push(w)),w}function b(h){if(--h.usedTimes===0){const u=x.indexOf(h);x[u]=x[x.length-1],x.pop(),h.destroy()}}function L(h){E.remove(h)}function B(){E.dispose()}return{getParameters:d,getProgramCacheKey:o,getUniforms:v,acquireProgram:O,releaseProgram:b,releaseShaderCache:L,programs:x,dispose:B}}function Uf(){let e=new WeakMap;function n(f){return e.has(f)}function t(f){let l=e.get(f);return l===void 0&&(l={},e.set(f,l)),l}function i(f){e.delete(f)}function r(f,l,E){e.get(f)[l]=E}function a(){e=new WeakMap}return{has:n,get:t,remove:i,update:r,dispose:a}}function If(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function Ga(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function Va(){const e=[];let n=0;const t=[],i=[],r=[];function a(){n=0,t.length=0,i.length=0,r.length=0}function f(S,m,T,U,P,d){let o=e[n];return o===void 0?(o={id:S.id,object:S,geometry:m,material:T,groupOrder:U,renderOrder:S.renderOrder,z:P,group:d},e[n]=o):(o.id=S.id,o.object=S,o.geometry=m,o.material=T,o.groupOrder=U,o.renderOrder=S.renderOrder,o.z=P,o.group=d),n++,o}function l(S,m,T,U,P,d){const o=f(S,m,T,U,P,d);T.transmission>0?i.push(o):T.transparent===!0?r.push(o):t.push(o)}function E(S,m,T,U,P,d){const o=f(S,m,T,U,P,d);T.transmission>0?i.unshift(o):T.transparent===!0?r.unshift(o):t.unshift(o)}function g(S,m){t.length>1&&t.sort(S||If),i.length>1&&i.sort(m||Ga),r.length>1&&r.sort(m||Ga)}function x(){for(let S=n,m=e.length;S<m;S++){const T=e[S];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:l,unshift:E,finish:x,sort:g}}function Nf(){let e=new WeakMap;function n(i,r){const a=e.get(i);let f;return a===void 0?(f=new Va,e.set(i,[f])):r>=a.length?(f=new Va,a.push(f)):f=a[r],f}function t(){e=new WeakMap}return{get:n,dispose:t}}function Of(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new se,color:new Ve};break;case"SpotLight":t={position:new se,direction:new se,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new se,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new se,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new se,halfWidth:new se,halfHeight:new se};break}return e[n.id]=t,t}}}function Ff(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Bf=0;function Hf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Gf(e){const n=new Of,t=Ff(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let g=0;g<9;g++)i.probe.push(new se);const r=new se,a=new St,f=new St;function l(g){let x=0,S=0,m=0;for(let h=0;h<9;h++)i.probe[h].set(0,0,0);let T=0,U=0,P=0,d=0,o=0,y=0,R=0,v=0,O=0,b=0,L=0;g.sort(Hf);for(let h=0,u=g.length;h<u;h++){const w=g[h],H=w.color,X=w.intensity,Y=w.distance,Z=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)x+=H.r*X,S+=H.g*X,m+=H.b*X;else if(w.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(w.sh.coefficients[W],X);L++}else if(w.isDirectionalLight){const W=n.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const ne=w.shadow,V=t.get(w);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,i.directionalShadow[T]=V,i.directionalShadowMap[T]=Z,i.directionalShadowMatrix[T]=w.shadow.matrix,y++}i.directional[T]=W,T++}else if(w.isSpotLight){const W=n.get(w);W.position.setFromMatrixPosition(w.matrixWorld),W.color.copy(H).multiplyScalar(X),W.distance=Y,W.coneCos=Math.cos(w.angle),W.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),W.decay=w.decay,i.spot[P]=W;const ne=w.shadow;if(w.map&&(i.spotLightMap[O]=w.map,O++,ne.updateMatrices(w),w.castShadow&&b++),i.spotLightMatrix[P]=ne.matrix,w.castShadow){const V=t.get(w);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,i.spotShadow[P]=V,i.spotShadowMap[P]=Z,v++}P++}else if(w.isRectAreaLight){const W=n.get(w);W.color.copy(H).multiplyScalar(X),W.halfWidth.set(w.width*.5,0,0),W.halfHeight.set(0,w.height*.5,0),i.rectArea[d]=W,d++}else if(w.isPointLight){const W=n.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),W.distance=w.distance,W.decay=w.decay,w.castShadow){const ne=w.shadow,V=t.get(w);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,V.shadowCameraNear=ne.camera.near,V.shadowCameraFar=ne.camera.far,i.pointShadow[U]=V,i.pointShadowMap[U]=Z,i.pointShadowMatrix[U]=w.shadow.matrix,R++}i.point[U]=W,U++}else if(w.isHemisphereLight){const W=n.get(w);W.skyColor.copy(w.color).multiplyScalar(X),W.groundColor.copy(w.groundColor).multiplyScalar(X),i.hemi[o]=W,o++}}d>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ie.LTC_FLOAT_1,i.rectAreaLTC2=ie.LTC_FLOAT_2):(i.rectAreaLTC1=ie.LTC_HALF_1,i.rectAreaLTC2=ie.LTC_HALF_2)),i.ambient[0]=x,i.ambient[1]=S,i.ambient[2]=m;const B=i.hash;(B.directionalLength!==T||B.pointLength!==U||B.spotLength!==P||B.rectAreaLength!==d||B.hemiLength!==o||B.numDirectionalShadows!==y||B.numPointShadows!==R||B.numSpotShadows!==v||B.numSpotMaps!==O||B.numLightProbes!==L)&&(i.directional.length=T,i.spot.length=P,i.rectArea.length=d,i.point.length=U,i.hemi.length=o,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=v+O-b,i.spotLightMap.length=O,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=L,B.directionalLength=T,B.pointLength=U,B.spotLength=P,B.rectAreaLength=d,B.hemiLength=o,B.numDirectionalShadows=y,B.numPointShadows=R,B.numSpotShadows=v,B.numSpotMaps=O,B.numLightProbes=L,i.version=Bf++)}function E(g,x){let S=0,m=0,T=0,U=0,P=0;const d=x.matrixWorldInverse;for(let o=0,y=g.length;o<y;o++){const R=g[o];if(R.isDirectionalLight){const v=i.directional[S];v.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(d),S++}else if(R.isSpotLight){const v=i.spot[T];v.position.setFromMatrixPosition(R.matrixWorld),v.position.applyMatrix4(d),v.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(d),T++}else if(R.isRectAreaLight){const v=i.rectArea[U];v.position.setFromMatrixPosition(R.matrixWorld),v.position.applyMatrix4(d),f.identity(),a.copy(R.matrixWorld),a.premultiply(d),f.extractRotation(a),v.halfWidth.set(R.width*.5,0,0),v.halfHeight.set(0,R.height*.5,0),v.halfWidth.applyMatrix4(f),v.halfHeight.applyMatrix4(f),U++}else if(R.isPointLight){const v=i.point[m];v.position.setFromMatrixPosition(R.matrixWorld),v.position.applyMatrix4(d),m++}else if(R.isHemisphereLight){const v=i.hemi[P];v.direction.setFromMatrixPosition(R.matrixWorld),v.direction.transformDirection(d),P++}}}return{setup:l,setupView:E,state:i}}function ka(e){const n=new Gf(e),t=[],i=[];function r(x){g.camera=x,t.length=0,i.length=0}function a(x){t.push(x)}function f(x){i.push(x)}function l(){n.setup(t)}function E(x){n.setupView(t,x)}const g={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:r,state:g,setupLights:l,setupLightsView:E,pushLight:a,pushShadow:f}}function Vf(e){let n=new WeakMap;function t(r,a=0){const f=n.get(r);let l;return f===void 0?(l=new ka(e),n.set(r,[l])):a>=f.length?(l=new ka(e),f.push(l)):l=f[a],l}function i(){n=new WeakMap}return{get:t,dispose:i}}const kf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Wf(e,n,t){let i=new or;const r=new ze,a=new ze,f=new dt,l=new Ro({depthPacking:bo}),E=new Co,g={},x=t.maxTextureSize,S={[ln]:Mt,[Mt]:ln,[Tt]:Tt},m=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:kf,fragmentShader:zf}),T=m.clone();T.defines.HORIZONTAL_PASS=1;const U=new xi;U.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const P=new ut(U,m),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cr;let o=this.type;this.render=function(b,L,B){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||b.length===0)return;const h=e.getRenderTarget(),u=e.getActiveCubeFace(),w=e.getActiveMipmapLevel(),H=e.state;H.setBlending(Bt),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const X=o!==bt&&this.type===bt,Y=o===bt&&this.type!==bt;for(let Z=0,W=b.length;Z<W;Z++){const ne=b[Z],V=ne.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const ve=V.getFrameExtents();if(r.multiply(ve),a.copy(V.mapSize),(r.x>x||r.y>x)&&(r.x>x&&(a.x=Math.floor(x/ve.x),r.x=a.x*ve.x,V.mapSize.x=a.x),r.y>x&&(a.y=Math.floor(x/ve.y),r.y=a.y*ve.y,V.mapSize.y=a.y)),V.map===null||X===!0||Y===!0){const ye=this.type!==bt?{minFilter:on,magFilter:on}:{};V.map!==null&&V.map.dispose(),V.map=new $t(r.x,r.y,ye),V.map.texture.name=ne.name+".shadowMap",V.camera.updateProjectionMatrix()}e.setRenderTarget(V.map),e.clear();const xe=V.getViewportCount();for(let ye=0;ye<xe;ye++){const He=V.getViewport(ye);f.set(a.x*He.x,a.y*He.y,a.x*He.z,a.y*He.w),H.viewport(f),V.updateMatrices(ne,ye),i=V.getFrustum(),v(L,B,V.camera,ne,this.type)}V.isPointLightShadow!==!0&&this.type===bt&&y(V,B),V.needsUpdate=!1}o=this.type,d.needsUpdate=!1,e.setRenderTarget(h,u,w)};function y(b,L){const B=n.update(P);m.defines.VSM_SAMPLES!==b.blurSamples&&(m.defines.VSM_SAMPLES=b.blurSamples,T.defines.VSM_SAMPLES=b.blurSamples,m.needsUpdate=!0,T.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new $t(r.x,r.y)),m.uniforms.shadow_pass.value=b.map.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,e.setRenderTarget(b.mapPass),e.clear(),e.renderBufferDirect(L,null,B,m,P,null),T.uniforms.shadow_pass.value=b.mapPass.texture,T.uniforms.resolution.value=b.mapSize,T.uniforms.radius.value=b.radius,e.setRenderTarget(b.map),e.clear(),e.renderBufferDirect(L,null,B,T,P,null)}function R(b,L,B,h){let u=null;const w=B.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(w!==void 0)u=w;else if(u=B.isPointLight===!0?E:l,e.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const H=u.uuid,X=L.uuid;let Y=g[H];Y===void 0&&(Y={},g[H]=Y);let Z=Y[X];Z===void 0&&(Z=u.clone(),Y[X]=Z,L.addEventListener("dispose",O)),u=Z}if(u.visible=L.visible,u.wireframe=L.wireframe,h===bt?u.side=L.shadowSide!==null?L.shadowSide:L.side:u.side=L.shadowSide!==null?L.shadowSide:S[L.side],u.alphaMap=L.alphaMap,u.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,u.map=L.map,u.clipShadows=L.clipShadows,u.clippingPlanes=L.clippingPlanes,u.clipIntersection=L.clipIntersection,u.displacementMap=L.displacementMap,u.displacementScale=L.displacementScale,u.displacementBias=L.displacementBias,u.wireframeLinewidth=L.wireframeLinewidth,u.linewidth=L.linewidth,B.isPointLight===!0&&u.isMeshDistanceMaterial===!0){const H=e.properties.get(u);H.light=B}return u}function v(b,L,B,h,u){if(b.visible===!1)return;if(b.layers.test(L.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&u===bt)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld);const X=n.update(b),Y=b.material;if(Array.isArray(Y)){const Z=X.groups;for(let W=0,ne=Z.length;W<ne;W++){const V=Z[W],ve=Y[V.materialIndex];if(ve&&ve.visible){const xe=R(b,ve,h,u);b.onBeforeShadow(e,b,L,B,X,xe,V),e.renderBufferDirect(B,null,X,xe,b,V),b.onAfterShadow(e,b,L,B,X,xe,V)}}}else if(Y.visible){const Z=R(b,Y,h,u);b.onBeforeShadow(e,b,L,B,X,Z,null),e.renderBufferDirect(B,null,X,Z,b,null),b.onAfterShadow(e,b,L,B,X,Z,null)}}const H=b.children;for(let X=0,Y=H.length;X<Y;X++)v(H[X],L,B,h,u)}function O(b){b.target.removeEventListener("dispose",O);for(const B in g){const h=g[B],u=b.target.uuid;u in h&&(h[u].dispose(),delete h[u])}}}const Xf={[hi]:pi,[ui]:ci,[fi]:li,[wn]:di,[pi]:hi,[ci]:ui,[li]:fi,[di]:wn};function Yf(e,n){function t(){let M=!1;const J=new dt;let te=null;const ce=new dt(0,0,0,0);return{setMask:function($){te!==$&&!M&&(e.colorMask($,$,$,$),te=$)},setLocked:function($){M=$},setClear:function($,z,ue,Pe,Ke){Ke===!0&&($*=Pe,z*=Pe,ue*=Pe),J.set($,z,ue,Pe),ce.equals(J)===!1&&(e.clearColor($,z,ue,Pe),ce.copy(J))},reset:function(){M=!1,te=null,ce.set(-1,0,0,0)}}}function i(){let M=!1,J=!1,te=null,ce=null,$=null;return{setReversed:function(z){if(J!==z){const ue=n.get("EXT_clip_control");z?ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.ZERO_TO_ONE_EXT):ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.NEGATIVE_ONE_TO_ONE_EXT),J=z;const Pe=$;$=null,this.setClear(Pe)}},getReversed:function(){return J},setTest:function(z){z?q(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(z){te!==z&&!M&&(e.depthMask(z),te=z)},setFunc:function(z){if(J&&(z=Xf[z]),ce!==z){switch(z){case hi:e.depthFunc(e.NEVER);break;case pi:e.depthFunc(e.ALWAYS);break;case ui:e.depthFunc(e.LESS);break;case wn:e.depthFunc(e.LEQUAL);break;case fi:e.depthFunc(e.EQUAL);break;case di:e.depthFunc(e.GEQUAL);break;case ci:e.depthFunc(e.GREATER);break;case li:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ce=z}},setLocked:function(z){M=z},setClear:function(z){$!==z&&(J&&(z=1-z),e.clearDepth(z),$=z)},reset:function(){M=!1,te=null,ce=null,$=null,J=!1}}}function r(){let M=!1,J=null,te=null,ce=null,$=null,z=null,ue=null,Pe=null,Ke=null;return{setTest:function(Ge){M||(Ge?q(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(Ge){J!==Ge&&!M&&(e.stencilMask(Ge),J=Ge)},setFunc:function(Ge,Rt,xt){(te!==Ge||ce!==Rt||$!==xt)&&(e.stencilFunc(Ge,Rt,xt),te=Ge,ce=Rt,$=xt)},setOp:function(Ge,Rt,xt){(z!==Ge||ue!==Rt||Pe!==xt)&&(e.stencilOp(Ge,Rt,xt),z=Ge,ue=Rt,Pe=xt)},setLocked:function(Ge){M=Ge},setClear:function(Ge){Ke!==Ge&&(e.clearStencil(Ge),Ke=Ge)},reset:function(){M=!1,J=null,te=null,ce=null,$=null,z=null,ue=null,Pe=null,Ke=null}}}const a=new t,f=new i,l=new r,E=new WeakMap,g=new WeakMap;let x={},S={},m=new WeakMap,T=[],U=null,P=!1,d=null,o=null,y=null,R=null,v=null,O=null,b=null,L=new Ve(0,0,0),B=0,h=!1,u=null,w=null,H=null,X=null,Y=null;const Z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ne=0;const V=e.getParameter(e.VERSION);V.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=ne>=1):V.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=ne>=2);let ve=null,xe={};const ye=e.getParameter(e.SCISSOR_BOX),He=e.getParameter(e.VIEWPORT),nt=new dt().fromArray(ye),et=new dt().fromArray(He);function Xe(M,J,te,ce){const $=new Uint8Array(4),z=e.createTexture();e.bindTexture(M,z),e.texParameteri(M,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(M,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ue=0;ue<te;ue++)M===e.TEXTURE_3D||M===e.TEXTURE_2D_ARRAY?e.texImage3D(J,0,e.RGBA,1,1,ce,0,e.RGBA,e.UNSIGNED_BYTE,$):e.texImage2D(J+ue,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,$);return z}const k={};k[e.TEXTURE_2D]=Xe(e.TEXTURE_2D,e.TEXTURE_2D,1),k[e.TEXTURE_CUBE_MAP]=Xe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[e.TEXTURE_2D_ARRAY]=Xe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),k[e.TEXTURE_3D]=Xe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),f.setClear(1),l.setClear(0),q(e.DEPTH_TEST),f.setFunc(wn),be(!1),pe(da),q(e.CULL_FACE),$e(Bt);function q(M){x[M]!==!0&&(e.enable(M),x[M]=!0)}function de(M){x[M]!==!1&&(e.disable(M),x[M]=!1)}function we(M,J){return S[M]!==J?(e.bindFramebuffer(M,J),S[M]=J,M===e.DRAW_FRAMEBUFFER&&(S[e.FRAMEBUFFER]=J),M===e.FRAMEBUFFER&&(S[e.DRAW_FRAMEBUFFER]=J),!0):!1}function Se(M,J){let te=T,ce=!1;if(M){te=m.get(J),te===void 0&&(te=[],m.set(J,te));const $=M.textures;if(te.length!==$.length||te[0]!==e.COLOR_ATTACHMENT0){for(let z=0,ue=$.length;z<ue;z++)te[z]=e.COLOR_ATTACHMENT0+z;te.length=$.length,ce=!0}}else te[0]!==e.BACK&&(te[0]=e.BACK,ce=!0);ce&&e.drawBuffers(te)}function Oe(M){return U!==M?(e.useProgram(M),U=M,!0):!1}const ct={[tn]:e.FUNC_ADD,[jr]:e.FUNC_SUBTRACT,[$r]:e.FUNC_REVERSE_SUBTRACT};ct[ls]=e.MIN,ct[cs]=e.MAX;const _={[po]:e.ZERO,[uo]:e.ONE,[fo]:e.SRC_COLOR,[co]:e.SRC_ALPHA,[lo]:e.SRC_ALPHA_SATURATE,[so]:e.DST_COLOR,[oo]:e.DST_ALPHA,[ro]:e.ONE_MINUS_SRC_COLOR,[ao]:e.ONE_MINUS_SRC_ALPHA,[io]:e.ONE_MINUS_DST_COLOR,[no]:e.ONE_MINUS_DST_ALPHA,[to]:e.CONSTANT_COLOR,[eo]:e.ONE_MINUS_CONSTANT_COLOR,[Jr]:e.CONSTANT_ALPHA,[Qr]:e.ONE_MINUS_CONSTANT_ALPHA};function $e(M,J,te,ce,$,z,ue,Pe,Ke,Ge){if(M===Bt){P===!0&&(de(e.BLEND),P=!1);return}if(P===!1&&(q(e.BLEND),P=!0),M!==Bo){if(M!==d||Ge!==h){if((o!==tn||v!==tn)&&(e.blendEquation(e.FUNC_ADD),o=tn,v=tn),Ge)switch(M){case An:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case pa:e.blendFunc(e.ONE,e.ONE);break;case ua:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case fa:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}else switch(M){case An:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case pa:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case ua:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}y=null,R=null,O=null,b=null,L.set(0,0,0),B=0,d=M,h=Ge}return}$=$||J,z=z||te,ue=ue||ce,(J!==o||$!==v)&&(e.blendEquationSeparate(ct[J],ct[$]),o=J,v=$),(te!==y||ce!==R||z!==O||ue!==b)&&(e.blendFuncSeparate(_[te],_[ce],_[z],_[ue]),y=te,R=ce,O=z,b=ue),(Pe.equals(L)===!1||Ke!==B)&&(e.blendColor(Pe.r,Pe.g,Pe.b,Ke),L.copy(Pe),B=Ke),d=M,h=!1}function De(M,J){M.side===Tt?de(e.CULL_FACE):q(e.CULL_FACE);let te=M.side===Mt;J&&(te=!te),be(te),M.blending===An&&M.transparent===!1?$e(Bt):$e(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),f.setFunc(M.depthFunc),f.setTest(M.depthTest),f.setMask(M.depthWrite),a.setMask(M.colorWrite);const ce=M.stencilWrite;l.setTest(ce),ce&&(l.setMask(M.stencilWriteMask),l.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),l.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),he(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?q(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(M){u!==M&&(M?e.frontFace(e.CW):e.frontFace(e.CCW),u=M)}function pe(M){M!==Oo?(q(e.CULL_FACE),M!==w&&(M===da?e.cullFace(e.BACK):M===Fo?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):de(e.CULL_FACE),w=M}function je(M){M!==H&&(W&&e.lineWidth(M),H=M)}function he(M,J,te){M?(q(e.POLYGON_OFFSET_FILL),(X!==J||Y!==te)&&(e.polygonOffset(J,te),X=J,Y=te)):de(e.POLYGON_OFFSET_FILL)}function Ue(M){M?q(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function lt(M){M===void 0&&(M=e.TEXTURE0+Z-1),ve!==M&&(e.activeTexture(M),ve=M)}function it(M,J,te){te===void 0&&(ve===null?te=e.TEXTURE0+Z-1:te=ve);let ce=xe[te];ce===void 0&&(ce={type:void 0,texture:void 0},xe[te]=ce),(ce.type!==M||ce.texture!==J)&&(ve!==te&&(e.activeTexture(te),ve=te),e.bindTexture(M,J||k[M]),ce.type=M,ce.texture=J)}function p(){const M=xe[ve];M!==void 0&&M.type!==void 0&&(e.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)}function s(){try{e.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function D(){try{e.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function G(){try{e.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function K(){try{e.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function F(){try{e.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function ee(){try{e.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function me(){try{e.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function _e(){try{e.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Q(){try{e.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function oe(M){nt.equals(M)===!1&&(e.scissor(M.x,M.y,M.z,M.w),nt.copy(M))}function Re(M){et.equals(M)===!1&&(e.viewport(M.x,M.y,M.z,M.w),et.copy(M))}function ge(M,J){let te=g.get(J);te===void 0&&(te=new WeakMap,g.set(J,te));let ce=te.get(M);ce===void 0&&(ce=e.getUniformBlockIndex(J,M.name),te.set(M,ce))}function ae(M,J){const ce=g.get(J).get(M);E.get(J)!==ce&&(e.uniformBlockBinding(J,ce,M.__bindingPointIndex),E.set(J,ce))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),f.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),x={},ve=null,xe={},S={},m=new WeakMap,T=[],U=null,P=!1,d=null,o=null,y=null,R=null,v=null,O=null,b=null,L=new Ve(0,0,0),B=0,h=!1,u=null,w=null,H=null,X=null,Y=null,nt.set(0,0,e.canvas.width,e.canvas.height),et.set(0,0,e.canvas.width,e.canvas.height),a.reset(),f.reset(),l.reset()}return{buffers:{color:a,depth:f,stencil:l},enable:q,disable:de,bindFramebuffer:we,drawBuffers:Se,useProgram:Oe,setBlending:$e,setMaterial:De,setFlipSided:be,setCullFace:pe,setLineWidth:je,setPolygonOffset:he,setScissorTest:Ue,activeTexture:lt,bindTexture:it,unbindTexture:p,compressedTexImage2D:s,compressedTexImage3D:D,texImage2D:_e,texImage3D:Q,updateUBOMapping:ge,uniformBlockBinding:ae,texStorage2D:ee,texStorage3D:me,texSubImage2D:G,texSubImage3D:K,compressedTexSubImage2D:F,compressedTexSubImage3D:Ee,scissor:oe,viewport:Re,reset:Le}}function Kf(e,n,t,i,r,a,f){const l=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,E=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new ze,x=new WeakMap;let S;const m=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function U(p,s){return T?new OffscreenCanvas(p,s):as("canvas")}function P(p,s,D){let G=1;const K=it(p);if((K.width>D||K.height>D)&&(G=D/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){const F=Math.floor(G*K.width),Ee=Math.floor(G*K.height);S===void 0&&(S=U(F,Ee));const ee=s?U(F,Ee):S;return ee.width=F,ee.height=Ee,ee.getContext("2d").drawImage(p,0,0,F,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+F+"x"+Ee+")."),ee}else return"data"in p&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),p;return p}function d(p){return p.generateMipmaps}function o(p){e.generateMipmap(p)}function y(p){return p.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?e.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function R(p,s,D,G,K=!1){if(p!==null){if(e[p]!==void 0)return e[p];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let F=s;if(s===e.RED&&(D===e.FLOAT&&(F=e.R32F),D===e.HALF_FLOAT&&(F=e.R16F),D===e.UNSIGNED_BYTE&&(F=e.R8)),s===e.RED_INTEGER&&(D===e.UNSIGNED_BYTE&&(F=e.R8UI),D===e.UNSIGNED_SHORT&&(F=e.R16UI),D===e.UNSIGNED_INT&&(F=e.R32UI),D===e.BYTE&&(F=e.R8I),D===e.SHORT&&(F=e.R16I),D===e.INT&&(F=e.R32I)),s===e.RG&&(D===e.FLOAT&&(F=e.RG32F),D===e.HALF_FLOAT&&(F=e.RG16F),D===e.UNSIGNED_BYTE&&(F=e.RG8)),s===e.RG_INTEGER&&(D===e.UNSIGNED_BYTE&&(F=e.RG8UI),D===e.UNSIGNED_SHORT&&(F=e.RG16UI),D===e.UNSIGNED_INT&&(F=e.RG32UI),D===e.BYTE&&(F=e.RG8I),D===e.SHORT&&(F=e.RG16I),D===e.INT&&(F=e.RG32I)),s===e.RGB_INTEGER&&(D===e.UNSIGNED_BYTE&&(F=e.RGB8UI),D===e.UNSIGNED_SHORT&&(F=e.RGB16UI),D===e.UNSIGNED_INT&&(F=e.RGB32UI),D===e.BYTE&&(F=e.RGB8I),D===e.SHORT&&(F=e.RGB16I),D===e.INT&&(F=e.RGB32I)),s===e.RGBA_INTEGER&&(D===e.UNSIGNED_BYTE&&(F=e.RGBA8UI),D===e.UNSIGNED_SHORT&&(F=e.RGBA16UI),D===e.UNSIGNED_INT&&(F=e.RGBA32UI),D===e.BYTE&&(F=e.RGBA8I),D===e.SHORT&&(F=e.RGBA16I),D===e.INT&&(F=e.RGBA32I)),s===e.RGB&&(D===e.UNSIGNED_INT_5_9_9_9_REV&&(F=e.RGB9_E5),D===e.UNSIGNED_INT_10F_11F_11F_REV&&(F=e.R11F_G11F_B10F)),s===e.RGBA){const Ee=K?Er:at.getTransfer(G);D===e.FLOAT&&(F=e.RGBA32F),D===e.HALF_FLOAT&&(F=e.RGBA16F),D===e.UNSIGNED_BYTE&&(F=Ee===Ze?e.SRGB8_ALPHA8:e.RGBA8),D===e.UNSIGNED_SHORT_4_4_4_4&&(F=e.RGBA4),D===e.UNSIGNED_SHORT_5_5_5_1&&(F=e.RGB5_A1)}return(F===e.R16F||F===e.R32F||F===e.RG16F||F===e.RG32F||F===e.RGBA16F||F===e.RGBA32F)&&n.get("EXT_color_buffer_float"),F}function v(p,s){let D;return p?s===null||s===dn||s===cn?D=e.DEPTH24_STENCIL8:s===Ft?D=e.DEPTH32F_STENCIL8:s===Pn&&(D=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):s===null||s===dn||s===cn?D=e.DEPTH_COMPONENT24:s===Ft?D=e.DEPTH_COMPONENT32F:s===Pn&&(D=e.DEPTH_COMPONENT16),D}function O(p,s){return d(p)===!0||p.isFramebufferTexture&&p.minFilter!==on&&p.minFilter!==Xt?Math.log2(Math.max(s.width,s.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?s.mipmaps.length:1}function b(p){const s=p.target;s.removeEventListener("dispose",b),B(s),s.isVideoTexture&&x.delete(s)}function L(p){const s=p.target;s.removeEventListener("dispose",L),u(s)}function B(p){const s=i.get(p);if(s.__webglInit===void 0)return;const D=p.source,G=m.get(D);if(G){const K=G[s.__cacheKey];K.usedTimes--,K.usedTimes===0&&h(p),Object.keys(G).length===0&&m.delete(D)}i.remove(p)}function h(p){const s=i.get(p);e.deleteTexture(s.__webglTexture);const D=p.source,G=m.get(D);delete G[s.__cacheKey],f.memory.textures--}function u(p){const s=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(s.__webglFramebuffer[G]))for(let K=0;K<s.__webglFramebuffer[G].length;K++)e.deleteFramebuffer(s.__webglFramebuffer[G][K]);else e.deleteFramebuffer(s.__webglFramebuffer[G]);s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer[G])}else{if(Array.isArray(s.__webglFramebuffer))for(let G=0;G<s.__webglFramebuffer.length;G++)e.deleteFramebuffer(s.__webglFramebuffer[G]);else e.deleteFramebuffer(s.__webglFramebuffer);if(s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer),s.__webglMultisampledFramebuffer&&e.deleteFramebuffer(s.__webglMultisampledFramebuffer),s.__webglColorRenderbuffer)for(let G=0;G<s.__webglColorRenderbuffer.length;G++)s.__webglColorRenderbuffer[G]&&e.deleteRenderbuffer(s.__webglColorRenderbuffer[G]);s.__webglDepthRenderbuffer&&e.deleteRenderbuffer(s.__webglDepthRenderbuffer)}const D=p.textures;for(let G=0,K=D.length;G<K;G++){const F=i.get(D[G]);F.__webglTexture&&(e.deleteTexture(F.__webglTexture),f.memory.textures--),i.remove(D[G])}i.remove(p)}let w=0;function H(){w=0}function X(){const p=w;return p>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+p+" texture units while this GPU supports only "+r.maxTextures),w+=1,p}function Y(p){const s=[];return s.push(p.wrapS),s.push(p.wrapT),s.push(p.wrapR||0),s.push(p.magFilter),s.push(p.minFilter),s.push(p.anisotropy),s.push(p.internalFormat),s.push(p.format),s.push(p.type),s.push(p.generateMipmaps),s.push(p.premultiplyAlpha),s.push(p.flipY),s.push(p.unpackAlignment),s.push(p.colorSpace),s.join()}function Z(p,s){const D=i.get(p);if(p.isVideoTexture&&Ue(p),p.isRenderTargetTexture===!1&&p.isExternalTexture!==!0&&p.version>0&&D.__version!==p.version){const G=p.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(D,p,s);return}}else p.isExternalTexture&&(D.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,D.__webglTexture,e.TEXTURE0+s)}function W(p,s){const D=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&D.__version!==p.version){k(D,p,s);return}t.bindTexture(e.TEXTURE_2D_ARRAY,D.__webglTexture,e.TEXTURE0+s)}function ne(p,s){const D=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&D.__version!==p.version){k(D,p,s);return}t.bindTexture(e.TEXTURE_3D,D.__webglTexture,e.TEXTURE0+s)}function V(p,s){const D=i.get(p);if(p.version>0&&D.__version!==p.version){q(D,p,s);return}t.bindTexture(e.TEXTURE_CUBE_MAP,D.__webglTexture,e.TEXTURE0+s)}const ve={[_o]:e.REPEAT,[mo]:e.CLAMP_TO_EDGE,[ho]:e.MIRRORED_REPEAT},xe={[on]:e.NEAREST,[go]:e.NEAREST_MIPMAP_NEAREST,[_n]:e.NEAREST_MIPMAP_LINEAR,[Xt]:e.LINEAR,[Vn]:e.LINEAR_MIPMAP_NEAREST,[nn]:e.LINEAR_MIPMAP_LINEAR},ye={[Ao]:e.NEVER,[xo]:e.ALWAYS,[To]:e.LESS,[lr]:e.LEQUAL,[Mo]:e.EQUAL,[So]:e.GEQUAL,[Eo]:e.GREATER,[vo]:e.NOTEQUAL};function He(p,s){if(s.type===Ft&&n.has("OES_texture_float_linear")===!1&&(s.magFilter===Xt||s.magFilter===Vn||s.magFilter===_n||s.magFilter===nn||s.minFilter===Xt||s.minFilter===Vn||s.minFilter===_n||s.minFilter===nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(p,e.TEXTURE_WRAP_S,ve[s.wrapS]),e.texParameteri(p,e.TEXTURE_WRAP_T,ve[s.wrapT]),(p===e.TEXTURE_3D||p===e.TEXTURE_2D_ARRAY)&&e.texParameteri(p,e.TEXTURE_WRAP_R,ve[s.wrapR]),e.texParameteri(p,e.TEXTURE_MAG_FILTER,xe[s.magFilter]),e.texParameteri(p,e.TEXTURE_MIN_FILTER,xe[s.minFilter]),s.compareFunction&&(e.texParameteri(p,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(p,e.TEXTURE_COMPARE_FUNC,ye[s.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(s.magFilter===on||s.minFilter!==_n&&s.minFilter!==nn||s.type===Ft&&n.has("OES_texture_float_linear")===!1)return;if(s.anisotropy>1||i.get(s).__currentAnisotropy){const D=n.get("EXT_texture_filter_anisotropic");e.texParameterf(p,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(s.anisotropy,r.getMaxAnisotropy())),i.get(s).__currentAnisotropy=s.anisotropy}}}function nt(p,s){let D=!1;p.__webglInit===void 0&&(p.__webglInit=!0,s.addEventListener("dispose",b));const G=s.source;let K=m.get(G);K===void 0&&(K={},m.set(G,K));const F=Y(s);if(F!==p.__cacheKey){K[F]===void 0&&(K[F]={texture:e.createTexture(),usedTimes:0},f.memory.textures++,D=!0),K[F].usedTimes++;const Ee=K[p.__cacheKey];Ee!==void 0&&(K[p.__cacheKey].usedTimes--,Ee.usedTimes===0&&h(s)),p.__cacheKey=F,p.__webglTexture=K[F].texture}return D}function et(p,s,D){return Math.floor(Math.floor(p/D)/s)}function Xe(p,s,D,G){const F=p.updateRanges;if(F.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,s.width,s.height,D,G,s.data);else{F.sort((Q,oe)=>Q.start-oe.start);let Ee=0;for(let Q=1;Q<F.length;Q++){const oe=F[Ee],Re=F[Q],ge=oe.start+oe.count,ae=et(Re.start,s.width,4),Le=et(oe.start,s.width,4);Re.start<=ge+1&&ae===Le&&et(Re.start+Re.count-1,s.width,4)===ae?oe.count=Math.max(oe.count,Re.start+Re.count-oe.start):(++Ee,F[Ee]=Re)}F.length=Ee+1;const ee=e.getParameter(e.UNPACK_ROW_LENGTH),me=e.getParameter(e.UNPACK_SKIP_PIXELS),_e=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,s.width);for(let Q=0,oe=F.length;Q<oe;Q++){const Re=F[Q],ge=Math.floor(Re.start/4),ae=Math.ceil(Re.count/4),Le=ge%s.width,M=Math.floor(ge/s.width),J=ae,te=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Le),e.pixelStorei(e.UNPACK_SKIP_ROWS,M),t.texSubImage2D(e.TEXTURE_2D,0,Le,M,J,te,D,G,s.data)}p.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,ee),e.pixelStorei(e.UNPACK_SKIP_PIXELS,me),e.pixelStorei(e.UNPACK_SKIP_ROWS,_e)}}function k(p,s,D){let G=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(G=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(G=e.TEXTURE_3D);const K=nt(p,s),F=s.source;t.bindTexture(G,p.__webglTexture,e.TEXTURE0+D);const Ee=i.get(F);if(F.version!==Ee.__version||K===!0){t.activeTexture(e.TEXTURE0+D);const ee=at.getPrimaries(at.workingColorSpace),me=s.colorSpace===Wt?null:at.getPrimaries(s.colorSpace),_e=s.colorSpace===Wt||ee===me?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let Q=P(s.image,!1,r.maxTextureSize);Q=lt(s,Q);const oe=a.convert(s.format,s.colorSpace),Re=a.convert(s.type);let ge=R(s.internalFormat,oe,Re,s.colorSpace,s.isVideoTexture);He(G,s);let ae;const Le=s.mipmaps,M=s.isVideoTexture!==!0,J=Ee.__version===void 0||K===!0,te=F.dataReady,ce=O(s,Q);if(s.isDepthTexture)ge=v(s.format===Cn,s.type),J&&(M?t.texStorage2D(e.TEXTURE_2D,1,ge,Q.width,Q.height):t.texImage2D(e.TEXTURE_2D,0,ge,Q.width,Q.height,0,oe,Re,null));else if(s.isDataTexture)if(Le.length>0){M&&J&&t.texStorage2D(e.TEXTURE_2D,ce,ge,Le[0].width,Le[0].height);for(let $=0,z=Le.length;$<z;$++)ae=Le[$],M?te&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,ae.width,ae.height,oe,Re,ae.data):t.texImage2D(e.TEXTURE_2D,$,ge,ae.width,ae.height,0,oe,Re,ae.data);s.generateMipmaps=!1}else M?(J&&t.texStorage2D(e.TEXTURE_2D,ce,ge,Q.width,Q.height),te&&Xe(s,Q,oe,Re)):t.texImage2D(e.TEXTURE_2D,0,ge,Q.width,Q.height,0,oe,Re,Q.data);else if(s.isCompressedTexture)if(s.isCompressedArrayTexture){M&&J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,ge,Le[0].width,Le[0].height,Q.depth);for(let $=0,z=Le.length;$<z;$++)if(ae=Le[$],s.format!==Ct)if(oe!==null)if(M){if(te)if(s.layerUpdates.size>0){const ue=ma(ae.width,ae.height,s.format,s.type);for(const Pe of s.layerUpdates){const Ke=ae.data.subarray(Pe*ue/ae.data.BYTES_PER_ELEMENT,(Pe+1)*ue/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,Pe,ae.width,ae.height,1,oe,Ke)}s.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,ae.width,ae.height,Q.depth,oe,ae.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,ge,ae.width,ae.height,Q.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else M?te&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,ae.width,ae.height,Q.depth,oe,Re,ae.data):t.texImage3D(e.TEXTURE_2D_ARRAY,$,ge,ae.width,ae.height,Q.depth,0,oe,Re,ae.data)}else{M&&J&&t.texStorage2D(e.TEXTURE_2D,ce,ge,Le[0].width,Le[0].height);for(let $=0,z=Le.length;$<z;$++)ae=Le[$],s.format!==Ct?oe!==null?M?te&&t.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,ae.width,ae.height,oe,ae.data):t.compressedTexImage2D(e.TEXTURE_2D,$,ge,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):M?te&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,ae.width,ae.height,oe,Re,ae.data):t.texImage2D(e.TEXTURE_2D,$,ge,ae.width,ae.height,0,oe,Re,ae.data)}else if(s.isDataArrayTexture)if(M){if(J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,ge,Q.width,Q.height,Q.depth),te)if(s.layerUpdates.size>0){const $=ma(Q.width,Q.height,s.format,s.type);for(const z of s.layerUpdates){const ue=Q.data.subarray(z*$/Q.data.BYTES_PER_ELEMENT,(z+1)*$/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,z,Q.width,Q.height,1,oe,Re,ue)}s.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,oe,Re,Q.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,ge,Q.width,Q.height,Q.depth,0,oe,Re,Q.data);else if(s.isData3DTexture)M?(J&&t.texStorage3D(e.TEXTURE_3D,ce,ge,Q.width,Q.height,Q.depth),te&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,oe,Re,Q.data)):t.texImage3D(e.TEXTURE_3D,0,ge,Q.width,Q.height,Q.depth,0,oe,Re,Q.data);else if(s.isFramebufferTexture){if(J)if(M)t.texStorage2D(e.TEXTURE_2D,ce,ge,Q.width,Q.height);else{let $=Q.width,z=Q.height;for(let ue=0;ue<ce;ue++)t.texImage2D(e.TEXTURE_2D,ue,ge,$,z,0,oe,Re,null),$>>=1,z>>=1}}else if(Le.length>0){if(M&&J){const $=it(Le[0]);t.texStorage2D(e.TEXTURE_2D,ce,ge,$.width,$.height)}for(let $=0,z=Le.length;$<z;$++)ae=Le[$],M?te&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,oe,Re,ae):t.texImage2D(e.TEXTURE_2D,$,ge,oe,Re,ae);s.generateMipmaps=!1}else if(M){if(J){const $=it(Q);t.texStorage2D(e.TEXTURE_2D,ce,ge,$.width,$.height)}te&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,oe,Re,Q)}else t.texImage2D(e.TEXTURE_2D,0,ge,oe,Re,Q);d(s)&&o(G),Ee.__version=F.version,s.onUpdate&&s.onUpdate(s)}p.__version=s.version}function q(p,s,D){if(s.image.length!==6)return;const G=nt(p,s),K=s.source;t.bindTexture(e.TEXTURE_CUBE_MAP,p.__webglTexture,e.TEXTURE0+D);const F=i.get(K);if(K.version!==F.__version||G===!0){t.activeTexture(e.TEXTURE0+D);const Ee=at.getPrimaries(at.workingColorSpace),ee=s.colorSpace===Wt?null:at.getPrimaries(s.colorSpace),me=s.colorSpace===Wt||Ee===ee?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const _e=s.isCompressedTexture||s.image[0].isCompressedTexture,Q=s.image[0]&&s.image[0].isDataTexture,oe=[];for(let z=0;z<6;z++)!_e&&!Q?oe[z]=P(s.image[z],!0,r.maxCubemapSize):oe[z]=Q?s.image[z].image:s.image[z],oe[z]=lt(s,oe[z]);const Re=oe[0],ge=a.convert(s.format,s.colorSpace),ae=a.convert(s.type),Le=R(s.internalFormat,ge,ae,s.colorSpace),M=s.isVideoTexture!==!0,J=F.__version===void 0||G===!0,te=K.dataReady;let ce=O(s,Re);He(e.TEXTURE_CUBE_MAP,s);let $;if(_e){M&&J&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Le,Re.width,Re.height);for(let z=0;z<6;z++){$=oe[z].mipmaps;for(let ue=0;ue<$.length;ue++){const Pe=$[ue];s.format!==Ct?ge!==null?M?te&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue,0,0,Pe.width,Pe.height,ge,Pe.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue,Le,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):M?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue,0,0,Pe.width,Pe.height,ge,ae,Pe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue,Le,Pe.width,Pe.height,0,ge,ae,Pe.data)}}}else{if($=s.mipmaps,M&&J){$.length>0&&ce++;const z=it(oe[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Le,z.width,z.height)}for(let z=0;z<6;z++)if(Q){M?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,oe[z].width,oe[z].height,ge,ae,oe[z].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Le,oe[z].width,oe[z].height,0,ge,ae,oe[z].data);for(let ue=0;ue<$.length;ue++){const Ke=$[ue].image[z].image;M?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue+1,0,0,Ke.width,Ke.height,ge,ae,Ke.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue+1,Le,Ke.width,Ke.height,0,ge,ae,Ke.data)}}else{M?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,ge,ae,oe[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Le,ge,ae,oe[z]);for(let ue=0;ue<$.length;ue++){const Pe=$[ue];M?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue+1,0,0,ge,ae,Pe.image[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue+1,Le,ge,ae,Pe.image[z])}}}d(s)&&o(e.TEXTURE_CUBE_MAP),F.__version=K.version,s.onUpdate&&s.onUpdate(s)}p.__version=s.version}function de(p,s,D,G,K,F){const Ee=a.convert(D.format,D.colorSpace),ee=a.convert(D.type),me=R(D.internalFormat,Ee,ee,D.colorSpace),_e=i.get(s),Q=i.get(D);if(Q.__renderTarget=s,!_e.__hasExternalTextures){const oe=Math.max(1,s.width>>F),Re=Math.max(1,s.height>>F);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?t.texImage3D(K,F,me,oe,Re,s.depth,0,Ee,ee,null):t.texImage2D(K,F,me,oe,Re,0,Ee,ee,null)}t.bindFramebuffer(e.FRAMEBUFFER,p),he(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,G,K,Q.__webglTexture,0,je(s)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,G,K,Q.__webglTexture,F),t.bindFramebuffer(e.FRAMEBUFFER,null)}function we(p,s,D){if(e.bindRenderbuffer(e.RENDERBUFFER,p),s.depthBuffer){const G=s.depthTexture,K=G&&G.isDepthTexture?G.type:null,F=v(s.stencilBuffer,K),Ee=s.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ee=je(s);he(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ee,F,s.width,s.height):D?e.renderbufferStorageMultisample(e.RENDERBUFFER,ee,F,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,F,s.width,s.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Ee,e.RENDERBUFFER,p)}else{const G=s.textures;for(let K=0;K<G.length;K++){const F=G[K],Ee=a.convert(F.format,F.colorSpace),ee=a.convert(F.type),me=R(F.internalFormat,Ee,ee,F.colorSpace),_e=je(s);D&&he(s)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,_e,me,s.width,s.height):he(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_e,me,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,me,s.width,s.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Se(p,s){if(s&&s.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,p),!(s.depthTexture&&s.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=i.get(s.depthTexture);G.__renderTarget=s,(!G.__webglTexture||s.depthTexture.image.width!==s.width||s.depthTexture.image.height!==s.height)&&(s.depthTexture.image.width=s.width,s.depthTexture.image.height=s.height,s.depthTexture.needsUpdate=!0),Z(s.depthTexture,0);const K=G.__webglTexture,F=je(s);if(s.depthTexture.format===Mi)he(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,F):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(s.depthTexture.format===Cn)he(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,F):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Oe(p){const s=i.get(p),D=p.isWebGLCubeRenderTarget===!0;if(s.__boundDepthTexture!==p.depthTexture){const G=p.depthTexture;if(s.__depthDisposeCallback&&s.__depthDisposeCallback(),G){const K=()=>{delete s.__boundDepthTexture,delete s.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),s.__depthDisposeCallback=K}s.__boundDepthTexture=G}if(p.depthTexture&&!s.__autoAllocateDepthBuffer){if(D)throw new Error("target.depthTexture not supported in Cube render targets");const G=p.texture.mipmaps;G&&G.length>0?Se(s.__webglFramebuffer[0],p):Se(s.__webglFramebuffer,p)}else if(D){s.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[G]),s.__webglDepthbuffer[G]===void 0)s.__webglDepthbuffer[G]=e.createRenderbuffer(),we(s.__webglDepthbuffer[G],p,!1);else{const K=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,F=s.__webglDepthbuffer[G];e.bindRenderbuffer(e.RENDERBUFFER,F),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,F)}}else{const G=p.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),s.__webglDepthbuffer===void 0)s.__webglDepthbuffer=e.createRenderbuffer(),we(s.__webglDepthbuffer,p,!1);else{const K=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,F=s.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,F),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,F)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function ct(p,s,D){const G=i.get(p);s!==void 0&&de(G.__webglFramebuffer,p,p.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),D!==void 0&&Oe(p)}function _(p){const s=p.texture,D=i.get(p),G=i.get(s);p.addEventListener("dispose",L);const K=p.textures,F=p.isWebGLCubeRenderTarget===!0,Ee=K.length>1;if(Ee||(G.__webglTexture===void 0&&(G.__webglTexture=e.createTexture()),G.__version=s.version,f.memory.textures++),F){D.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(s.mipmaps&&s.mipmaps.length>0){D.__webglFramebuffer[ee]=[];for(let me=0;me<s.mipmaps.length;me++)D.__webglFramebuffer[ee][me]=e.createFramebuffer()}else D.__webglFramebuffer[ee]=e.createFramebuffer()}else{if(s.mipmaps&&s.mipmaps.length>0){D.__webglFramebuffer=[];for(let ee=0;ee<s.mipmaps.length;ee++)D.__webglFramebuffer[ee]=e.createFramebuffer()}else D.__webglFramebuffer=e.createFramebuffer();if(Ee)for(let ee=0,me=K.length;ee<me;ee++){const _e=i.get(K[ee]);_e.__webglTexture===void 0&&(_e.__webglTexture=e.createTexture(),f.memory.textures++)}if(p.samples>0&&he(p)===!1){D.__webglMultisampledFramebuffer=e.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let ee=0;ee<K.length;ee++){const me=K[ee];D.__webglColorRenderbuffer[ee]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,D.__webglColorRenderbuffer[ee]);const _e=a.convert(me.format,me.colorSpace),Q=a.convert(me.type),oe=R(me.internalFormat,_e,Q,me.colorSpace,p.isXRRenderTarget===!0),Re=je(p);e.renderbufferStorageMultisample(e.RENDERBUFFER,Re,oe,p.width,p.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ee,e.RENDERBUFFER,D.__webglColorRenderbuffer[ee])}e.bindRenderbuffer(e.RENDERBUFFER,null),p.depthBuffer&&(D.__webglDepthRenderbuffer=e.createRenderbuffer(),we(D.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(F){t.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture),He(e.TEXTURE_CUBE_MAP,s);for(let ee=0;ee<6;ee++)if(s.mipmaps&&s.mipmaps.length>0)for(let me=0;me<s.mipmaps.length;me++)de(D.__webglFramebuffer[ee][me],p,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me);else de(D.__webglFramebuffer[ee],p,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);d(s)&&o(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ee=0,me=K.length;ee<me;ee++){const _e=K[ee],Q=i.get(_e);let oe=e.TEXTURE_2D;(p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(oe=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(oe,Q.__webglTexture),He(oe,_e),de(D.__webglFramebuffer,p,_e,e.COLOR_ATTACHMENT0+ee,oe,0),d(_e)&&o(oe)}t.unbindTexture()}else{let ee=e.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(ee=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ee,G.__webglTexture),He(ee,s),s.mipmaps&&s.mipmaps.length>0)for(let me=0;me<s.mipmaps.length;me++)de(D.__webglFramebuffer[me],p,s,e.COLOR_ATTACHMENT0,ee,me);else de(D.__webglFramebuffer,p,s,e.COLOR_ATTACHMENT0,ee,0);d(s)&&o(ee),t.unbindTexture()}p.depthBuffer&&Oe(p)}function $e(p){const s=p.textures;for(let D=0,G=s.length;D<G;D++){const K=s[D];if(d(K)){const F=y(p),Ee=i.get(K).__webglTexture;t.bindTexture(F,Ee),o(F),t.unbindTexture()}}}const De=[],be=[];function pe(p){if(p.samples>0){if(he(p)===!1){const s=p.textures,D=p.width,G=p.height;let K=e.COLOR_BUFFER_BIT;const F=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Ee=i.get(p),ee=s.length>1;if(ee)for(let _e=0;_e<s.length;_e++)t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const me=p.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let _e=0;_e<s.length;_e++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),ee){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Ee.__webglColorRenderbuffer[_e]);const Q=i.get(s[_e]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Q,0)}e.blitFramebuffer(0,0,D,G,0,0,D,G,K,e.NEAREST),E===!0&&(De.length=0,be.length=0,De.push(e.COLOR_ATTACHMENT0+_e),p.depthBuffer&&p.resolveDepthBuffer===!1&&(De.push(F),be.push(F),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,be)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ee)for(let _e=0;_e<s.length;_e++){t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,Ee.__webglColorRenderbuffer[_e]);const Q=i.get(s[_e]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,Q,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.resolveDepthBuffer===!1&&E){const s=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[s])}}}function je(p){return Math.min(r.maxSamples,p.samples)}function he(p){const s=i.get(p);return p.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&s.__useRenderToTexture!==!1}function Ue(p){const s=f.render.frame;x.get(p)!==s&&(x.set(p,s),p.update())}function lt(p,s){const D=p.colorSpace,G=p.format,K=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||D!==In&&D!==Wt&&(at.getTransfer(D)===Ze?(G!==Ct||K!==Gt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",D)),s}function it(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(g.width=p.naturalWidth||p.width,g.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(g.width=p.displayWidth,g.height=p.displayHeight):(g.width=p.width,g.height=p.height),g}this.allocateTextureUnit=X,this.resetTextureUnits=H,this.setTexture2D=Z,this.setTexture2DArray=W,this.setTexture3D=ne,this.setTextureCube=V,this.rebindTextures=ct,this.setupRenderTarget=_,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=de,this.useMultisampledRTT=he}function qf(e,n){function t(i,r=Wt){let a;const f=at.getTransfer(r);if(i===Gt)return e.UNSIGNED_BYTE;if(i===dr)return e.UNSIGNED_SHORT_4_4_4_4;if(i===fr)return e.UNSIGNED_SHORT_5_5_5_1;if(i===wo)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Po)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Do)return e.BYTE;if(i===Lo)return e.SHORT;if(i===Pn)return e.UNSIGNED_SHORT;if(i===pr)return e.INT;if(i===dn)return e.UNSIGNED_INT;if(i===Ft)return e.FLOAT;if(i===Un)return e.HALF_FLOAT;if(i===yo)return e.ALPHA;if(i===Uo)return e.RGB;if(i===Ct)return e.RGBA;if(i===Mi)return e.DEPTH_COMPONENT;if(i===Cn)return e.DEPTH_STENCIL;if(i===Io)return e.RED;if(i===hr)return e.RED_INTEGER;if(i===No)return e.RG;if(i===mr)return e.RG_INTEGER;if(i===_r)return e.RGBA_INTEGER;if(i===kn||i===zn||i===Wn||i===Xn)if(f===Ze)if(a=n.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===kn)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=n.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===kn)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zn)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wn)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xn)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Oi||i===Fi||i===Bi||i===Hi)if(a=n.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Oi)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Fi)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Bi)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hi)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Gi||i===Vi||i===ki)if(a=n.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Gi||i===Vi)return f===Ze?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===ki)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===zi||i===Wi||i===Xi||i===Yi||i===Ki||i===qi||i===Zi||i===$i||i===ji||i===Qi||i===Ji||i===ea||i===ta||i===na)if(a=n.get("WEBGL_compressed_texture_astc"),a!==null){if(i===zi)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Wi)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xi)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yi)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ki)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===qi)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Zi)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$i)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ji)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qi)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ji)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ea)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ta)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===na)return f===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ia||i===aa||i===ra)if(a=n.get("EXT_texture_compression_bptc"),a!==null){if(i===ia)return f===Ze?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===aa)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ra)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===oa||i===sa||i===la||i===ca)if(a=n.get("EXT_texture_compression_rgtc"),a!==null){if(i===oa)return a.COMPRESSED_RED_RGTC1_EXT;if(i===sa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===la)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ca)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===cn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Zf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$f=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class jf{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new ur(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Dt({vertexShader:Zf,fragmentShader:$f,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new pn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Qf extends Kr{constructor(n,t){super();const i=this;let r=null,a=1,f=null,l="local-floor",E=1,g=null,x=null,S=null,m=null,T=null,U=null;const P=typeof XRWebGLBinding<"u",d=new jf,o={},y=t.getContextAttributes();let R=null,v=null;const O=[],b=[],L=new ze;let B=null;const h=new qt;h.viewport=new dt;const u=new qt;u.viewport=new dt;const w=[h,u],H=new qr;let X=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let q=O[k];return q===void 0&&(q=new Gn,O[k]=q),q.getTargetRaySpace()},this.getControllerGrip=function(k){let q=O[k];return q===void 0&&(q=new Gn,O[k]=q),q.getGripSpace()},this.getHand=function(k){let q=O[k];return q===void 0&&(q=new Gn,O[k]=q),q.getHandSpace()};function Z(k){const q=b.indexOf(k.inputSource);if(q===-1)return;const de=O[q];de!==void 0&&(de.update(k.inputSource,k.frame,g||f),de.dispatchEvent({type:k.type,data:k.inputSource}))}function W(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",ne);for(let k=0;k<O.length;k++){const q=b[k];q!==null&&(b[k]=null,O[k].disconnect(q))}X=null,Y=null,d.reset();for(const k in o)delete o[k];n.setRenderTarget(R),T=null,m=null,S=null,r=null,v=null,Xe.stop(),i.isPresenting=!1,n.setPixelRatio(B),n.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){a=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){l=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return g||f},this.setReferenceSpace=function(k){g=k},this.getBaseLayer=function(){return m!==null?m:T},this.getBinding=function(){return S===null&&P&&(S=new XRWebGLBinding(r,t)),S},this.getFrame=function(){return U},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(R=n.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",W),r.addEventListener("inputsourceschange",ne),y.xrCompatible!==!0&&await t.makeXRCompatible(),B=n.getPixelRatio(),n.getSize(L),P&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,we=null,Se=null;y.depth&&(Se=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=y.stencil?Cn:Mi,we=y.stencil?cn:dn);const Oe={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:a};S=this.getBinding(),m=S.createProjectionLayer(Oe),r.updateRenderState({layers:[m]}),n.setPixelRatio(1),n.setSize(m.textureWidth,m.textureHeight,!1),v=new $t(m.textureWidth,m.textureHeight,{format:Ct,type:Gt,depthTexture:new sr(m.textureWidth,m.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:y.stencil,colorSpace:n.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}else{const de={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:a};T=new XRWebGLLayer(r,t,de),r.updateRenderState({baseLayer:T}),n.setPixelRatio(1),n.setSize(T.framebufferWidth,T.framebufferHeight,!1),v=new $t(T.framebufferWidth,T.framebufferHeight,{format:Ct,type:Gt,colorSpace:n.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:T.ignoreDepthValues===!1,resolveStencilBuffer:T.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(E),g=null,f=await r.requestReferenceSpace(l),Xe.setContext(r),Xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function ne(k){for(let q=0;q<k.removed.length;q++){const de=k.removed[q],we=b.indexOf(de);we>=0&&(b[we]=null,O[we].disconnect(de))}for(let q=0;q<k.added.length;q++){const de=k.added[q];let we=b.indexOf(de);if(we===-1){for(let Oe=0;Oe<O.length;Oe++)if(Oe>=b.length){b.push(de),we=Oe;break}else if(b[Oe]===null){b[Oe]=de,we=Oe;break}if(we===-1)break}const Se=O[we];Se&&Se.connect(de)}}const V=new se,ve=new se;function xe(k,q,de){V.setFromMatrixPosition(q.matrixWorld),ve.setFromMatrixPosition(de.matrixWorld);const we=V.distanceTo(ve),Se=q.projectionMatrix.elements,Oe=de.projectionMatrix.elements,ct=Se[14]/(Se[10]-1),_=Se[14]/(Se[10]+1),$e=(Se[9]+1)/Se[5],De=(Se[9]-1)/Se[5],be=(Se[8]-1)/Se[0],pe=(Oe[8]+1)/Oe[0],je=ct*be,he=ct*pe,Ue=we/(-be+pe),lt=Ue*-be;if(q.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(lt),k.translateZ(Ue),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Se[10]===-1)k.projectionMatrix.copy(q.projectionMatrix),k.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const it=ct+Ue,p=_+Ue,s=je-lt,D=he+(we-lt),G=$e*_/p*it,K=De*_/p*it;k.projectionMatrix.makePerspective(s,D,G,K,it,p),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function ye(k,q){q===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(q.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;let q=k.near,de=k.far;d.texture!==null&&(d.depthNear>0&&(q=d.depthNear),d.depthFar>0&&(de=d.depthFar)),H.near=u.near=h.near=q,H.far=u.far=h.far=de,(X!==H.near||Y!==H.far)&&(r.updateRenderState({depthNear:H.near,depthFar:H.far}),X=H.near,Y=H.far),H.layers.mask=k.layers.mask|6,h.layers.mask=H.layers.mask&3,u.layers.mask=H.layers.mask&5;const we=k.parent,Se=H.cameras;ye(H,we);for(let Oe=0;Oe<Se.length;Oe++)ye(Se[Oe],we);Se.length===2?xe(H,h,u):H.projectionMatrix.copy(h.projectionMatrix),He(k,H,we)};function He(k,q,de){de===null?k.matrix.copy(q.matrixWorld):(k.matrix.copy(de.matrixWorld),k.matrix.invert(),k.matrix.multiply(q.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(q.projectionMatrix),k.projectionMatrixInverse.copy(q.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Zr*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(m===null&&T===null))return E},this.setFoveation=function(k){E=k,m!==null&&(m.fixedFoveation=k),T!==null&&T.fixedFoveation!==void 0&&(T.fixedFoveation=k)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(H)},this.getCameraTexture=function(k){return o[k]};let nt=null;function et(k,q){if(x=q.getViewerPose(g||f),U=q,x!==null){const de=x.views;T!==null&&(n.setRenderTargetFramebuffer(v,T.framebuffer),n.setRenderTarget(v));let we=!1;de.length!==H.cameras.length&&(H.cameras.length=0,we=!0);for(let _=0;_<de.length;_++){const $e=de[_];let De=null;if(T!==null)De=T.getViewport($e);else{const pe=S.getViewSubImage(m,$e);De=pe.viewport,_===0&&(n.setRenderTargetTextures(v,pe.colorTexture,pe.depthStencilTexture),n.setRenderTarget(v))}let be=w[_];be===void 0&&(be=new qt,be.layers.enable(_),be.viewport=new dt,w[_]=be),be.matrix.fromArray($e.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray($e.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(De.x,De.y,De.width,De.height),_===0&&(H.matrix.copy(be.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),we===!0&&H.cameras.push(be)}const Se=r.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&P){S=i.getBinding();const _=S.getDepthInformation(de[0]);_&&_.isValid&&_.texture&&d.init(_,r.renderState)}if(Se&&Se.includes("camera-access")&&P){n.state.unbindTexture(),S=i.getBinding();for(let _=0;_<de.length;_++){const $e=de[_].camera;if($e){let De=o[$e];De||(De=new ur,o[$e]=De);const be=S.getCameraImage($e);De.sourceTexture=be}}}}for(let de=0;de<O.length;de++){const we=b[de],Se=O[de];we!==null&&Se!==void 0&&Se.update(we,q,g||f)}nt&&nt(k,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),U=null}const Xe=new Rr;Xe.setAnimationLoop(et),this.setAnimationLoop=function(k){nt=k},this.dispose=function(){}}}const It=new Dn,Jf=new St;function eu(e,n){function t(d,o){d.matrixAutoUpdate===!0&&d.updateMatrix(),o.value.copy(d.matrix)}function i(d,o){o.color.getRGB(d.fogColor.value,vr(e)),o.isFog?(d.fogNear.value=o.near,d.fogFar.value=o.far):o.isFogExp2&&(d.fogDensity.value=o.density)}function r(d,o,y,R,v){o.isMeshBasicMaterial||o.isMeshLambertMaterial?a(d,o):o.isMeshToonMaterial?(a(d,o),S(d,o)):o.isMeshPhongMaterial?(a(d,o),x(d,o)):o.isMeshStandardMaterial?(a(d,o),m(d,o),o.isMeshPhysicalMaterial&&T(d,o,v)):o.isMeshMatcapMaterial?(a(d,o),U(d,o)):o.isMeshDepthMaterial?a(d,o):o.isMeshDistanceMaterial?(a(d,o),P(d,o)):o.isMeshNormalMaterial?a(d,o):o.isLineBasicMaterial?(f(d,o),o.isLineDashedMaterial&&l(d,o)):o.isPointsMaterial?E(d,o,y,R):o.isSpriteMaterial?g(d,o):o.isShadowMaterial?(d.color.value.copy(o.color),d.opacity.value=o.opacity):o.isShaderMaterial&&(o.uniformsNeedUpdate=!1)}function a(d,o){d.opacity.value=o.opacity,o.color&&d.diffuse.value.copy(o.color),o.emissive&&d.emissive.value.copy(o.emissive).multiplyScalar(o.emissiveIntensity),o.map&&(d.map.value=o.map,t(o.map,d.mapTransform)),o.alphaMap&&(d.alphaMap.value=o.alphaMap,t(o.alphaMap,d.alphaMapTransform)),o.bumpMap&&(d.bumpMap.value=o.bumpMap,t(o.bumpMap,d.bumpMapTransform),d.bumpScale.value=o.bumpScale,o.side===Mt&&(d.bumpScale.value*=-1)),o.normalMap&&(d.normalMap.value=o.normalMap,t(o.normalMap,d.normalMapTransform),d.normalScale.value.copy(o.normalScale),o.side===Mt&&d.normalScale.value.negate()),o.displacementMap&&(d.displacementMap.value=o.displacementMap,t(o.displacementMap,d.displacementMapTransform),d.displacementScale.value=o.displacementScale,d.displacementBias.value=o.displacementBias),o.emissiveMap&&(d.emissiveMap.value=o.emissiveMap,t(o.emissiveMap,d.emissiveMapTransform)),o.specularMap&&(d.specularMap.value=o.specularMap,t(o.specularMap,d.specularMapTransform)),o.alphaTest>0&&(d.alphaTest.value=o.alphaTest);const y=n.get(o),R=y.envMap,v=y.envMapRotation;R&&(d.envMap.value=R,It.copy(v),It.x*=-1,It.y*=-1,It.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(It.y*=-1,It.z*=-1),d.envMapRotation.value.setFromMatrix4(Jf.makeRotationFromEuler(It)),d.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=o.reflectivity,d.ior.value=o.ior,d.refractionRatio.value=o.refractionRatio),o.lightMap&&(d.lightMap.value=o.lightMap,d.lightMapIntensity.value=o.lightMapIntensity,t(o.lightMap,d.lightMapTransform)),o.aoMap&&(d.aoMap.value=o.aoMap,d.aoMapIntensity.value=o.aoMapIntensity,t(o.aoMap,d.aoMapTransform))}function f(d,o){d.diffuse.value.copy(o.color),d.opacity.value=o.opacity,o.map&&(d.map.value=o.map,t(o.map,d.mapTransform))}function l(d,o){d.dashSize.value=o.dashSize,d.totalSize.value=o.dashSize+o.gapSize,d.scale.value=o.scale}function E(d,o,y,R){d.diffuse.value.copy(o.color),d.opacity.value=o.opacity,d.size.value=o.size*y,d.scale.value=R*.5,o.map&&(d.map.value=o.map,t(o.map,d.uvTransform)),o.alphaMap&&(d.alphaMap.value=o.alphaMap,t(o.alphaMap,d.alphaMapTransform)),o.alphaTest>0&&(d.alphaTest.value=o.alphaTest)}function g(d,o){d.diffuse.value.copy(o.color),d.opacity.value=o.opacity,d.rotation.value=o.rotation,o.map&&(d.map.value=o.map,t(o.map,d.mapTransform)),o.alphaMap&&(d.alphaMap.value=o.alphaMap,t(o.alphaMap,d.alphaMapTransform)),o.alphaTest>0&&(d.alphaTest.value=o.alphaTest)}function x(d,o){d.specular.value.copy(o.specular),d.shininess.value=Math.max(o.shininess,1e-4)}function S(d,o){o.gradientMap&&(d.gradientMap.value=o.gradientMap)}function m(d,o){d.metalness.value=o.metalness,o.metalnessMap&&(d.metalnessMap.value=o.metalnessMap,t(o.metalnessMap,d.metalnessMapTransform)),d.roughness.value=o.roughness,o.roughnessMap&&(d.roughnessMap.value=o.roughnessMap,t(o.roughnessMap,d.roughnessMapTransform)),o.envMap&&(d.envMapIntensity.value=o.envMapIntensity)}function T(d,o,y){d.ior.value=o.ior,o.sheen>0&&(d.sheenColor.value.copy(o.sheenColor).multiplyScalar(o.sheen),d.sheenRoughness.value=o.sheenRoughness,o.sheenColorMap&&(d.sheenColorMap.value=o.sheenColorMap,t(o.sheenColorMap,d.sheenColorMapTransform)),o.sheenRoughnessMap&&(d.sheenRoughnessMap.value=o.sheenRoughnessMap,t(o.sheenRoughnessMap,d.sheenRoughnessMapTransform))),o.clearcoat>0&&(d.clearcoat.value=o.clearcoat,d.clearcoatRoughness.value=o.clearcoatRoughness,o.clearcoatMap&&(d.clearcoatMap.value=o.clearcoatMap,t(o.clearcoatMap,d.clearcoatMapTransform)),o.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=o.clearcoatRoughnessMap,t(o.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),o.clearcoatNormalMap&&(d.clearcoatNormalMap.value=o.clearcoatNormalMap,t(o.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(o.clearcoatNormalScale),o.side===Mt&&d.clearcoatNormalScale.value.negate())),o.dispersion>0&&(d.dispersion.value=o.dispersion),o.iridescence>0&&(d.iridescence.value=o.iridescence,d.iridescenceIOR.value=o.iridescenceIOR,d.iridescenceThicknessMinimum.value=o.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=o.iridescenceThicknessRange[1],o.iridescenceMap&&(d.iridescenceMap.value=o.iridescenceMap,t(o.iridescenceMap,d.iridescenceMapTransform)),o.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=o.iridescenceThicknessMap,t(o.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),o.transmission>0&&(d.transmission.value=o.transmission,d.transmissionSamplerMap.value=y.texture,d.transmissionSamplerSize.value.set(y.width,y.height),o.transmissionMap&&(d.transmissionMap.value=o.transmissionMap,t(o.transmissionMap,d.transmissionMapTransform)),d.thickness.value=o.thickness,o.thicknessMap&&(d.thicknessMap.value=o.thicknessMap,t(o.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=o.attenuationDistance,d.attenuationColor.value.copy(o.attenuationColor)),o.anisotropy>0&&(d.anisotropyVector.value.set(o.anisotropy*Math.cos(o.anisotropyRotation),o.anisotropy*Math.sin(o.anisotropyRotation)),o.anisotropyMap&&(d.anisotropyMap.value=o.anisotropyMap,t(o.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=o.specularIntensity,d.specularColor.value.copy(o.specularColor),o.specularColorMap&&(d.specularColorMap.value=o.specularColorMap,t(o.specularColorMap,d.specularColorMapTransform)),o.specularIntensityMap&&(d.specularIntensityMap.value=o.specularIntensityMap,t(o.specularIntensityMap,d.specularIntensityMapTransform))}function U(d,o){o.matcap&&(d.matcap.value=o.matcap)}function P(d,o){const y=n.get(o).light;d.referencePosition.value.setFromMatrixPosition(y.matrixWorld),d.nearDistance.value=y.shadow.camera.near,d.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function tu(e,n,t,i){let r={},a={},f=[];const l=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function E(y,R){const v=R.program;i.uniformBlockBinding(y,v)}function g(y,R){let v=r[y.id];v===void 0&&(U(y),v=x(y),r[y.id]=v,y.addEventListener("dispose",d));const O=R.program;i.updateUBOMapping(y,O);const b=n.render.frame;a[y.id]!==b&&(m(y),a[y.id]=b)}function x(y){const R=S();y.__bindingPointIndex=R;const v=e.createBuffer(),O=y.__size,b=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,v),e.bufferData(e.UNIFORM_BUFFER,O,b),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,R,v),v}function S(){for(let y=0;y<l;y++)if(f.indexOf(y)===-1)return f.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(y){const R=r[y.id],v=y.uniforms,O=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,R);for(let b=0,L=v.length;b<L;b++){const B=Array.isArray(v[b])?v[b]:[v[b]];for(let h=0,u=B.length;h<u;h++){const w=B[h];if(T(w,b,h,O)===!0){const H=w.__offset,X=Array.isArray(w.value)?w.value:[w.value];let Y=0;for(let Z=0;Z<X.length;Z++){const W=X[Z],ne=P(W);typeof W=="number"||typeof W=="boolean"?(w.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,H+Y,w.__data)):W.isMatrix3?(w.__data[0]=W.elements[0],w.__data[1]=W.elements[1],w.__data[2]=W.elements[2],w.__data[3]=0,w.__data[4]=W.elements[3],w.__data[5]=W.elements[4],w.__data[6]=W.elements[5],w.__data[7]=0,w.__data[8]=W.elements[6],w.__data[9]=W.elements[7],w.__data[10]=W.elements[8],w.__data[11]=0):(W.toArray(w.__data,Y),Y+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,H,w.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function T(y,R,v,O){const b=y.value,L=R+"_"+v;if(O[L]===void 0)return typeof b=="number"||typeof b=="boolean"?O[L]=b:O[L]=b.clone(),!0;{const B=O[L];if(typeof b=="number"||typeof b=="boolean"){if(B!==b)return O[L]=b,!0}else if(B.equals(b)===!1)return B.copy(b),!0}return!1}function U(y){const R=y.uniforms;let v=0;const O=16;for(let L=0,B=R.length;L<B;L++){const h=Array.isArray(R[L])?R[L]:[R[L]];for(let u=0,w=h.length;u<w;u++){const H=h[u],X=Array.isArray(H.value)?H.value:[H.value];for(let Y=0,Z=X.length;Y<Z;Y++){const W=X[Y],ne=P(W),V=v%O,ve=V%ne.boundary,xe=V+ve;v+=ve,xe!==0&&O-xe<ne.storage&&(v+=O-xe),H.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=ne.storage}}}const b=v%O;return b>0&&(v+=O-b),y.__size=v,y.__cache={},this}function P(y){const R={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(R.boundary=4,R.storage=4):y.isVector2?(R.boundary=8,R.storage=8):y.isVector3||y.isColor?(R.boundary=16,R.storage=12):y.isVector4?(R.boundary=16,R.storage=16):y.isMatrix3?(R.boundary=48,R.storage=48):y.isMatrix4?(R.boundary=64,R.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),R}function d(y){const R=y.target;R.removeEventListener("dispose",d);const v=f.indexOf(R.__bindingPointIndex);f.splice(v,1),e.deleteBuffer(r[R.id]),delete r[R.id],delete a[R.id]}function o(){for(const y in r)e.deleteBuffer(r[y]);f=[],r={},a={}}return{bind:E,update:g,dispose:o}}class nu{constructor(n={}){const{canvas:t=Wr(),context:i=null,depth:r=!0,stencil:a=!1,alpha:f=!1,antialias:l=!1,premultipliedAlpha:E=!0,preserveDrawingBuffer:g=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:S=!1,reversedDepthBuffer:m=!1}=n;this.isWebGLRenderer=!0;let T;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=i.getContextAttributes().alpha}else T=f;const U=new Uint32Array(4),P=new Int32Array(4);let d=null,o=null;const y=[],R=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let O=!1;this._outputColorSpace=rr;let b=0,L=0,B=null,h=-1,u=null;const w=new dt,H=new dt;let X=null;const Y=new Ve(0);let Z=0,W=t.width,ne=t.height,V=1,ve=null,xe=null;const ye=new dt(0,0,W,ne),He=new dt(0,0,W,ne);let nt=!1;const et=new or;let Xe=!1,k=!1;const q=new St,de=new se,we=new dt,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function ct(){return B===null?V:1}let _=i;function $e(c,A){return t.getContext(c,A)}try{const c={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:E,preserveDrawingBuffer:g,powerPreference:x,failIfMajorPerformanceCaveat:S};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xr}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",$,!1),_===null){const A="webgl2";if(_=$e(A,c),_===null)throw $e(A)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(c){throw console.error("THREE.WebGLRenderer: "+c.message),c}let De,be,pe,je,he,Ue,lt,it,p,s,D,G,K,F,Ee,ee,me,_e,Q,oe,Re,ge,ae,Le;function M(){De=new fd(_),De.init(),ge=new qf(_,De),be=new ad(_,De,n,ge),pe=new Yf(_,De),be.reversedDepthBuffer&&m&&pe.buffers.depth.setReversed(!0),je=new hd(_),he=new Uf,Ue=new Kf(_,De,pe,he,be,ge,je),lt=new od(v),it=new dd(v),p=new Ss(_),ae=new nd(_,p),s=new ud(_,p,je,ae),D=new _d(_,s,p,je),Q=new md(_,be,Ue),ee=new rd(he),G=new yf(v,lt,it,De,be,ae,ee),K=new eu(v,he),F=new Nf,Ee=new Vf(De),_e=new td(v,lt,it,pe,D,T,E),me=new Wf(v,D,be),Le=new tu(_,je,be,pe),oe=new id(_,De,je),Re=new pd(_,De,je),je.programs=G.programs,v.capabilities=be,v.extensions=De,v.properties=he,v.renderLists=F,v.shadowMap=me,v.state=pe,v.info=je}M();const J=new Qf(v,_);this.xr=J,this.getContext=function(){return _},this.getContextAttributes=function(){return _.getContextAttributes()},this.forceContextLoss=function(){const c=De.get("WEBGL_lose_context");c&&c.loseContext()},this.forceContextRestore=function(){const c=De.get("WEBGL_lose_context");c&&c.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(c){c!==void 0&&(V=c,this.setSize(W,ne,!1))},this.getSize=function(c){return c.set(W,ne)},this.setSize=function(c,A,I=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=c,ne=A,t.width=Math.floor(c*V),t.height=Math.floor(A*V),I===!0&&(t.style.width=c+"px",t.style.height=A+"px"),this.setViewport(0,0,c,A)},this.getDrawingBufferSize=function(c){return c.set(W*V,ne*V).floor()},this.setDrawingBufferSize=function(c,A,I){W=c,ne=A,V=I,t.width=Math.floor(c*I),t.height=Math.floor(A*I),this.setViewport(0,0,c,A)},this.getCurrentViewport=function(c){return c.copy(w)},this.getViewport=function(c){return c.copy(ye)},this.setViewport=function(c,A,I,N){c.isVector4?ye.set(c.x,c.y,c.z,c.w):ye.set(c,A,I,N),pe.viewport(w.copy(ye).multiplyScalar(V).round())},this.getScissor=function(c){return c.copy(He)},this.setScissor=function(c,A,I,N){c.isVector4?He.set(c.x,c.y,c.z,c.w):He.set(c,A,I,N),pe.scissor(H.copy(He).multiplyScalar(V).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(c){pe.setScissorTest(nt=c)},this.setOpaqueSort=function(c){ve=c},this.setTransparentSort=function(c){xe=c},this.getClearColor=function(c){return c.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor(...arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha(...arguments)},this.clear=function(c=!0,A=!0,I=!0){let N=0;if(c){let C=!1;if(B!==null){const j=B.texture.format;C=j===_r||j===mr||j===hr}if(C){const j=B.texture.type,re=j===Gt||j===dn||j===Pn||j===cn||j===dr||j===fr,fe=_e.getClearColor(),le=_e.getClearAlpha(),Ae=fe.r,Ce=fe.g,Me=fe.b;re?(U[0]=Ae,U[1]=Ce,U[2]=Me,U[3]=le,_.clearBufferuiv(_.COLOR,0,U)):(P[0]=Ae,P[1]=Ce,P[2]=Me,P[3]=le,_.clearBufferiv(_.COLOR,0,P))}else N|=_.COLOR_BUFFER_BIT}A&&(N|=_.DEPTH_BUFFER_BIT),I&&(N|=_.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),_.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",$,!1),_e.dispose(),F.dispose(),Ee.dispose(),he.dispose(),lt.dispose(),it.dispose(),D.dispose(),ae.dispose(),Le.dispose(),G.dispose(),J.dispose(),J.removeEventListener("sessionstart",xt),J.removeEventListener("sessionend",Pi),Lt.stop()};function te(c){c.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),O=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),O=!1;const c=je.autoReset,A=me.enabled,I=me.autoUpdate,N=me.needsUpdate,C=me.type;M(),je.autoReset=c,me.enabled=A,me.autoUpdate=I,me.needsUpdate=N,me.type=C}function $(c){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",c.statusMessage)}function z(c){const A=c.target;A.removeEventListener("dispose",z),ue(A)}function ue(c){Pe(c),he.remove(c)}function Pe(c){const A=he.get(c).programs;A!==void 0&&(A.forEach(function(I){G.releaseProgram(I)}),c.isShaderMaterial&&G.releaseShaderCache(c))}this.renderBufferDirect=function(c,A,I,N,C,j){A===null&&(A=Se);const re=C.isMesh&&C.matrixWorld.determinant()<0,fe=Br(c,A,I,N,C);pe.setMaterial(N,re);let le=I.index,Ae=1;if(N.wireframe===!0){if(le=s.getWireframeAttribute(I),le===void 0)return;Ae=2}const Ce=I.drawRange,Me=I.attributes.position;let Ne=Ce.start*Ae,ke=(Ce.start+Ce.count)*Ae;j!==null&&(Ne=Math.max(Ne,j.start*Ae),ke=Math.min(ke,(j.start+j.count)*Ae)),le!==null?(Ne=Math.max(Ne,0),ke=Math.min(ke,le.count)):Me!=null&&(Ne=Math.max(Ne,0),ke=Math.min(ke,Me.count));const tt=ke-Ne;if(tt<0||tt===1/0)return;ae.setup(C,N,fe,I,le);let qe,Ye=oe;if(le!==null&&(qe=p.get(le),Ye=Re,Ye.setIndex(qe)),C.isMesh)N.wireframe===!0?(pe.setLineWidth(N.wireframeLinewidth*ct()),Ye.setMode(_.LINES)):Ye.setMode(_.TRIANGLES);else if(C.isLine){let Te=N.linewidth;Te===void 0&&(Te=1),pe.setLineWidth(Te*ct()),C.isLineSegments?Ye.setMode(_.LINES):C.isLineLoop?Ye.setMode(_.LINE_LOOP):Ye.setMode(_.LINE_STRIP)}else C.isPoints?Ye.setMode(_.POINTS):C.isSprite&&Ye.setMode(_.TRIANGLES);if(C.isBatchedMesh)if(C._multiDrawInstances!==null)si("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ye.renderMultiDrawInstances(C._multiDrawStarts,C._multiDrawCounts,C._multiDrawCount,C._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))Ye.renderMultiDraw(C._multiDrawStarts,C._multiDrawCounts,C._multiDrawCount);else{const Te=C._multiDrawStarts,Qe=C._multiDrawCounts,Be=C._multiDrawCount,_t=le?p.get(le).bytesPerElement:1,Vt=he.get(N).currentProgram.getUniforms();for(let gt=0;gt<Be;gt++)Vt.setValue(_,"_gl_DrawID",gt),Ye.render(Te[gt]/_t,Qe[gt])}else if(C.isInstancedMesh)Ye.renderInstances(Ne,tt,C.count);else if(I.isInstancedBufferGeometry){const Te=I._maxInstanceCount!==void 0?I._maxInstanceCount:1/0,Qe=Math.min(I.instanceCount,Te);Ye.renderInstances(Ne,tt,Qe)}else Ye.render(Ne,tt)};function Ke(c,A,I){c.transparent===!0&&c.side===Tt&&c.forceSinglePass===!1?(c.side=Mt,c.needsUpdate=!0,mn(c,A,I),c.side=ln,c.needsUpdate=!0,mn(c,A,I),c.side=Tt):mn(c,A,I)}this.compile=function(c,A,I=null){I===null&&(I=c),o=Ee.get(I),o.init(A),R.push(o),I.traverseVisible(function(C){C.isLight&&C.layers.test(A.layers)&&(o.pushLight(C),C.castShadow&&o.pushShadow(C))}),c!==I&&c.traverseVisible(function(C){C.isLight&&C.layers.test(A.layers)&&(o.pushLight(C),C.castShadow&&o.pushShadow(C))}),o.setupLights();const N=new Set;return c.traverse(function(C){if(!(C.isMesh||C.isPoints||C.isLine||C.isSprite))return;const j=C.material;if(j)if(Array.isArray(j))for(let re=0;re<j.length;re++){const fe=j[re];Ke(fe,I,C),N.add(fe)}else Ke(j,I,C),N.add(j)}),o=R.pop(),N},this.compileAsync=function(c,A,I=null){const N=this.compile(c,A,I);return new Promise(C=>{function j(){if(N.forEach(function(re){he.get(re).currentProgram.isReady()&&N.delete(re)}),N.size===0){C(c);return}setTimeout(j,10)}De.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Ge=null;function Rt(c){Ge&&Ge(c)}function xt(){Lt.stop()}function Pi(){Lt.start()}const Lt=new Rr;Lt.setAnimationLoop(Rt),typeof self<"u"&&Lt.setContext(self),this.setAnimationLoop=function(c){Ge=c,J.setAnimationLoop(c),c===null?Lt.stop():Lt.start()},J.addEventListener("sessionstart",xt),J.addEventListener("sessionend",Pi),this.render=function(c,A){if(A!==void 0&&A.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;if(c.matrixWorldAutoUpdate===!0&&c.updateMatrixWorld(),A.parent===null&&A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(A),A=J.getCamera()),c.isScene===!0&&c.onBeforeRender(v,c,A,B),o=Ee.get(c,R.length),o.init(A),R.push(o),q.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),et.setFromProjectionMatrix(q,Ni,A.reversedDepth),k=this.localClippingEnabled,Xe=ee.init(this.clippingPlanes,k),d=F.get(c,y.length),d.init(),y.push(d),J.enabled===!0&&J.isPresenting===!0){const j=v.xr.getDepthSensingMesh();j!==null&&Bn(j,A,-1/0,v.sortObjects)}Bn(c,A,0,v.sortObjects),d.finish(),v.sortObjects===!0&&d.sort(ve,xe),Oe=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Oe&&_e.addToRenderList(d,c),this.info.render.frame++,Xe===!0&&ee.beginShadows();const I=o.state.shadowsArray;me.render(I,c,A),Xe===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const N=d.opaque,C=d.transmissive;if(o.setupLights(),A.isArrayCamera){const j=A.cameras;if(C.length>0)for(let re=0,fe=j.length;re<fe;re++){const le=j[re];Li(N,C,c,le)}Oe&&_e.render(c);for(let re=0,fe=j.length;re<fe;re++){const le=j[re];Di(d,c,le,le.viewport)}}else C.length>0&&Li(N,C,c,A),Oe&&_e.render(c),Di(d,c,A);B!==null&&L===0&&(Ue.updateMultisampleRenderTarget(B),Ue.updateRenderTargetMipmap(B)),c.isScene===!0&&c.onAfterRender(v,c,A),ae.resetDefaultState(),h=-1,u=null,R.pop(),R.length>0?(o=R[R.length-1],Xe===!0&&ee.setGlobalState(v.clippingPlanes,o.state.camera)):o=null,y.pop(),y.length>0?d=y[y.length-1]:d=null};function Bn(c,A,I,N){if(c.visible===!1)return;if(c.layers.test(A.layers)){if(c.isGroup)I=c.renderOrder;else if(c.isLOD)c.autoUpdate===!0&&c.update(A);else if(c.isLight)o.pushLight(c),c.castShadow&&o.pushShadow(c);else if(c.isSprite){if(!c.frustumCulled||et.intersectsSprite(c)){N&&we.setFromMatrixPosition(c.matrixWorld).applyMatrix4(q);const re=D.update(c),fe=c.material;fe.visible&&d.push(c,re,fe,I,we.z,null)}}else if((c.isMesh||c.isLine||c.isPoints)&&(!c.frustumCulled||et.intersectsObject(c))){const re=D.update(c),fe=c.material;if(N&&(c.boundingSphere!==void 0?(c.boundingSphere===null&&c.computeBoundingSphere(),we.copy(c.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),we.copy(re.boundingSphere.center)),we.applyMatrix4(c.matrixWorld).applyMatrix4(q)),Array.isArray(fe)){const le=re.groups;for(let Ae=0,Ce=le.length;Ae<Ce;Ae++){const Me=le[Ae],Ne=fe[Me.materialIndex];Ne&&Ne.visible&&d.push(c,re,Ne,I,we.z,Me)}}else fe.visible&&d.push(c,re,fe,I,we.z,null)}}const j=c.children;for(let re=0,fe=j.length;re<fe;re++)Bn(j[re],A,I,N)}function Di(c,A,I,N){const C=c.opaque,j=c.transmissive,re=c.transparent;o.setupLightsView(I),Xe===!0&&ee.setGlobalState(v.clippingPlanes,I),N&&pe.viewport(w.copy(N)),C.length>0&&hn(C,A,I),j.length>0&&hn(j,A,I),re.length>0&&hn(re,A,I),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Li(c,A,I,N){if((I.isScene===!0?I.overrideMaterial:null)!==null)return;o.state.transmissionRenderTarget[N.id]===void 0&&(o.state.transmissionRenderTarget[N.id]=new $t(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?Un:Gt,minFilter:nn,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const j=o.state.transmissionRenderTarget[N.id],re=N.viewport||w;j.setSize(re.z*v.transmissionResolutionScale,re.w*v.transmissionResolutionScale);const fe=v.getRenderTarget(),le=v.getActiveCubeFace(),Ae=v.getActiveMipmapLevel();v.setRenderTarget(j),v.getClearColor(Y),Z=v.getClearAlpha(),Z<1&&v.setClearColor(16777215,.5),v.clear(),Oe&&_e.render(I);const Ce=v.toneMapping;v.toneMapping=wt;const Me=N.viewport;if(N.viewport!==void 0&&(N.viewport=void 0),o.setupLightsView(N),Xe===!0&&ee.setGlobalState(v.clippingPlanes,N),hn(c,I,N),Ue.updateMultisampleRenderTarget(j),Ue.updateRenderTargetMipmap(j),De.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let ke=0,tt=A.length;ke<tt;ke++){const qe=A[ke],Ye=qe.object,Te=qe.geometry,Qe=qe.material,Be=qe.group;if(Qe.side===Tt&&Ye.layers.test(N.layers)){const _t=Qe.side;Qe.side=Mt,Qe.needsUpdate=!0,yi(Ye,I,N,Te,Qe,Be),Qe.side=_t,Qe.needsUpdate=!0,Ne=!0}}Ne===!0&&(Ue.updateMultisampleRenderTarget(j),Ue.updateRenderTargetMipmap(j))}v.setRenderTarget(fe,le,Ae),v.setClearColor(Y,Z),Me!==void 0&&(N.viewport=Me),v.toneMapping=Ce}function hn(c,A,I){const N=A.isScene===!0?A.overrideMaterial:null;for(let C=0,j=c.length;C<j;C++){const re=c[C],fe=re.object,le=re.geometry,Ae=re.group;let Ce=re.material;Ce.allowOverride===!0&&N!==null&&(Ce=N),fe.layers.test(I.layers)&&yi(fe,A,I,le,Ce,Ae)}}function yi(c,A,I,N,C,j){c.onBeforeRender(v,A,I,N,C,j),c.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,c.matrixWorld),c.normalMatrix.getNormalMatrix(c.modelViewMatrix),C.onBeforeRender(v,A,I,N,c,j),C.transparent===!0&&C.side===Tt&&C.forceSinglePass===!1?(C.side=Mt,C.needsUpdate=!0,v.renderBufferDirect(I,A,N,C,c,j),C.side=ln,C.needsUpdate=!0,v.renderBufferDirect(I,A,N,C,c,j),C.side=Tt):v.renderBufferDirect(I,A,N,C,c,j),c.onAfterRender(v,A,I,N,C,j)}function mn(c,A,I){A.isScene!==!0&&(A=Se);const N=he.get(c),C=o.state.lights,j=o.state.shadowsArray,re=C.state.version,fe=G.getParameters(c,C.state,j,A,I),le=G.getProgramCacheKey(fe);let Ae=N.programs;N.environment=c.isMeshStandardMaterial?A.environment:null,N.fog=A.fog,N.envMap=(c.isMeshStandardMaterial?it:lt).get(c.envMap||N.environment),N.envMapRotation=N.environment!==null&&c.envMap===null?A.environmentRotation:c.envMapRotation,Ae===void 0&&(c.addEventListener("dispose",z),Ae=new Map,N.programs=Ae);let Ce=Ae.get(le);if(Ce!==void 0){if(N.currentProgram===Ce&&N.lightsStateVersion===re)return Ii(c,fe),Ce}else fe.uniforms=G.getUniforms(c),c.onBeforeCompile(fe,v),Ce=G.acquireProgram(fe,le),Ae.set(le,Ce),N.uniforms=fe.uniforms;const Me=N.uniforms;return(!c.isShaderMaterial&&!c.isRawShaderMaterial||c.clipping===!0)&&(Me.clippingPlanes=ee.uniform),Ii(c,fe),N.needsLights=Gr(c),N.lightsStateVersion=re,N.needsLights&&(Me.ambientLightColor.value=C.state.ambient,Me.lightProbe.value=C.state.probe,Me.directionalLights.value=C.state.directional,Me.directionalLightShadows.value=C.state.directionalShadow,Me.spotLights.value=C.state.spot,Me.spotLightShadows.value=C.state.spotShadow,Me.rectAreaLights.value=C.state.rectArea,Me.ltc_1.value=C.state.rectAreaLTC1,Me.ltc_2.value=C.state.rectAreaLTC2,Me.pointLights.value=C.state.point,Me.pointLightShadows.value=C.state.pointShadow,Me.hemisphereLights.value=C.state.hemi,Me.directionalShadowMap.value=C.state.directionalShadowMap,Me.directionalShadowMatrix.value=C.state.directionalShadowMatrix,Me.spotShadowMap.value=C.state.spotShadowMap,Me.spotLightMatrix.value=C.state.spotLightMatrix,Me.spotLightMap.value=C.state.spotLightMap,Me.pointShadowMap.value=C.state.pointShadowMap,Me.pointShadowMatrix.value=C.state.pointShadowMatrix),N.currentProgram=Ce,N.uniformsList=null,Ce}function Ui(c){if(c.uniformsList===null){const A=c.currentProgram.getUniforms();c.uniformsList=Rn.seqWithValue(A.seq,c.uniforms)}return c.uniformsList}function Ii(c,A){const I=he.get(c);I.outputColorSpace=A.outputColorSpace,I.batching=A.batching,I.batchingColor=A.batchingColor,I.instancing=A.instancing,I.instancingColor=A.instancingColor,I.instancingMorph=A.instancingMorph,I.skinning=A.skinning,I.morphTargets=A.morphTargets,I.morphNormals=A.morphNormals,I.morphColors=A.morphColors,I.morphTargetsCount=A.morphTargetsCount,I.numClippingPlanes=A.numClippingPlanes,I.numIntersection=A.numClipIntersection,I.vertexAlphas=A.vertexAlphas,I.vertexTangents=A.vertexTangents,I.toneMapping=A.toneMapping}function Br(c,A,I,N,C){A.isScene!==!0&&(A=Se),Ue.resetTextureUnits();const j=A.fog,re=N.isMeshStandardMaterial?A.environment:null,fe=B===null?v.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:In,le=(N.isMeshStandardMaterial?it:lt).get(N.envMap||re),Ae=N.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,Ce=!!I.attributes.tangent&&(!!N.normalMap||N.anisotropy>0),Me=!!I.morphAttributes.position,Ne=!!I.morphAttributes.normal,ke=!!I.morphAttributes.color;let tt=wt;N.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(tt=v.toneMapping);const qe=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Ye=qe!==void 0?qe.length:0,Te=he.get(N),Qe=o.state.lights;if(Xe===!0&&(k===!0||c!==u)){const ft=c===u&&N.id===h;ee.setState(N,c,ft)}let Be=!1;N.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Qe.state.version||Te.outputColorSpace!==fe||C.isBatchedMesh&&Te.batching===!1||!C.isBatchedMesh&&Te.batching===!0||C.isBatchedMesh&&Te.batchingColor===!0&&C.colorTexture===null||C.isBatchedMesh&&Te.batchingColor===!1&&C.colorTexture!==null||C.isInstancedMesh&&Te.instancing===!1||!C.isInstancedMesh&&Te.instancing===!0||C.isSkinnedMesh&&Te.skinning===!1||!C.isSkinnedMesh&&Te.skinning===!0||C.isInstancedMesh&&Te.instancingColor===!0&&C.instanceColor===null||C.isInstancedMesh&&Te.instancingColor===!1&&C.instanceColor!==null||C.isInstancedMesh&&Te.instancingMorph===!0&&C.morphTexture===null||C.isInstancedMesh&&Te.instancingMorph===!1&&C.morphTexture!==null||Te.envMap!==le||N.fog===!0&&Te.fog!==j||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ee.numPlanes||Te.numIntersection!==ee.numIntersection)||Te.vertexAlphas!==Ae||Te.vertexTangents!==Ce||Te.morphTargets!==Me||Te.morphNormals!==Ne||Te.morphColors!==ke||Te.toneMapping!==tt||Te.morphTargetsCount!==Ye)&&(Be=!0):(Be=!0,Te.__version=N.version);let _t=Te.currentProgram;Be===!0&&(_t=mn(N,A,C));let Vt=!1,gt=!1,en=!1;const Je=_t.getUniforms(),vt=Te.uniforms;if(pe.useProgram(_t.program)&&(Vt=!0,gt=!0,en=!0),N.id!==h&&(h=N.id,gt=!0),Vt||u!==c){pe.buffers.depth.getReversed()&&c.reversedDepth!==!0&&(c._reversedDepth=!0,c.updateProjectionMatrix()),Je.setValue(_,"projectionMatrix",c.projectionMatrix),Je.setValue(_,"viewMatrix",c.matrixWorldInverse);const pt=Je.map.cameraPosition;pt!==void 0&&pt.setValue(_,de.setFromMatrixPosition(c.matrixWorld)),be.logarithmicDepthBuffer&&Je.setValue(_,"logDepthBufFC",2/(Math.log(c.far+1)/Math.LN2)),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&Je.setValue(_,"isOrthographic",c.isOrthographicCamera===!0),u!==c&&(u=c,gt=!0,en=!0)}if(C.isSkinnedMesh){Je.setOptional(_,C,"bindMatrix"),Je.setOptional(_,C,"bindMatrixInverse");const ft=C.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),Je.setValue(_,"boneTexture",ft.boneTexture,Ue))}C.isBatchedMesh&&(Je.setOptional(_,C,"batchingTexture"),Je.setValue(_,"batchingTexture",C._matricesTexture,Ue),Je.setOptional(_,C,"batchingIdTexture"),Je.setValue(_,"batchingIdTexture",C._indirectTexture,Ue),Je.setOptional(_,C,"batchingColorTexture"),C._colorsTexture!==null&&Je.setValue(_,"batchingColorTexture",C._colorsTexture,Ue));const Et=I.morphAttributes;if((Et.position!==void 0||Et.normal!==void 0||Et.color!==void 0)&&Q.update(C,I,_t),(gt||Te.receiveShadow!==C.receiveShadow)&&(Te.receiveShadow=C.receiveShadow,Je.setValue(_,"receiveShadow",C.receiveShadow)),N.isMeshGouraudMaterial&&N.envMap!==null&&(vt.envMap.value=le,vt.flipEnvMap.value=le.isCubeTexture&&le.isRenderTargetTexture===!1?-1:1),N.isMeshStandardMaterial&&N.envMap===null&&A.environment!==null&&(vt.envMapIntensity.value=A.environmentIntensity),gt&&(Je.setValue(_,"toneMappingExposure",v.toneMappingExposure),Te.needsLights&&Hr(vt,en),j&&N.fog===!0&&K.refreshFogUniforms(vt,j),K.refreshMaterialUniforms(vt,N,V,ne,o.state.transmissionRenderTarget[c.id]),Rn.upload(_,Ui(Te),vt,Ue)),N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(Rn.upload(_,Ui(Te),vt,Ue),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&Je.setValue(_,"center",C.center),Je.setValue(_,"modelViewMatrix",C.modelViewMatrix),Je.setValue(_,"normalMatrix",C.normalMatrix),Je.setValue(_,"modelMatrix",C.matrixWorld),N.isShaderMaterial||N.isRawShaderMaterial){const ft=N.uniformsGroups;for(let pt=0,Hn=ft.length;pt<Hn;pt++){const yt=ft[pt];Le.update(yt,_t),Le.bind(yt,_t)}}return _t}function Hr(c,A){c.ambientLightColor.needsUpdate=A,c.lightProbe.needsUpdate=A,c.directionalLights.needsUpdate=A,c.directionalLightShadows.needsUpdate=A,c.pointLights.needsUpdate=A,c.pointLightShadows.needsUpdate=A,c.spotLights.needsUpdate=A,c.spotLightShadows.needsUpdate=A,c.rectAreaLights.needsUpdate=A,c.hemisphereLights.needsUpdate=A}function Gr(c){return c.isMeshLambertMaterial||c.isMeshToonMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.isShadowMaterial||c.isShaderMaterial&&c.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(c,A,I){const N=he.get(c);N.__autoAllocateDepthBuffer=c.resolveDepthBuffer===!1,N.__autoAllocateDepthBuffer===!1&&(N.__useRenderToTexture=!1),he.get(c.texture).__webglTexture=A,he.get(c.depthTexture).__webglTexture=N.__autoAllocateDepthBuffer?void 0:I,N.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(c,A){const I=he.get(c);I.__webglFramebuffer=A,I.__useDefaultFramebuffer=A===void 0};const Vr=_.createFramebuffer();this.setRenderTarget=function(c,A=0,I=0){B=c,b=A,L=I;let N=!0,C=null,j=!1,re=!1;if(c){const le=he.get(c);if(le.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(_.FRAMEBUFFER,null),N=!1;else if(le.__webglFramebuffer===void 0)Ue.setupRenderTarget(c);else if(le.__hasExternalTextures)Ue.rebindTextures(c,he.get(c.texture).__webglTexture,he.get(c.depthTexture).__webglTexture);else if(c.depthBuffer){const Me=c.depthTexture;if(le.__boundDepthTexture!==Me){if(Me!==null&&he.has(Me)&&(c.width!==Me.image.width||c.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ue.setupDepthRenderbuffer(c)}}const Ae=c.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(re=!0);const Ce=he.get(c).__webglFramebuffer;c.isWebGLCubeRenderTarget?(Array.isArray(Ce[A])?C=Ce[A][I]:C=Ce[A],j=!0):c.samples>0&&Ue.useMultisampledRTT(c)===!1?C=he.get(c).__webglMultisampledFramebuffer:Array.isArray(Ce)?C=Ce[I]:C=Ce,w.copy(c.viewport),H.copy(c.scissor),X=c.scissorTest}else w.copy(ye).multiplyScalar(V).floor(),H.copy(He).multiplyScalar(V).floor(),X=nt;if(I!==0&&(C=Vr),pe.bindFramebuffer(_.FRAMEBUFFER,C)&&N&&pe.drawBuffers(c,C),pe.viewport(w),pe.scissor(H),pe.setScissorTest(X),j){const le=he.get(c.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_CUBE_MAP_POSITIVE_X+A,le.__webglTexture,I)}else if(re){const le=A;for(let Ae=0;Ae<c.textures.length;Ae++){const Ce=he.get(c.textures[Ae]);_.framebufferTextureLayer(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0+Ae,Ce.__webglTexture,I,le)}}else if(c!==null&&I!==0){const le=he.get(c.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,le.__webglTexture,I)}h=-1},this.readRenderTargetPixels=function(c,A,I,N,C,j,re,fe=0){if(!(c&&c.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let le=he.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&re!==void 0&&(le=le[re]),le){pe.bindFramebuffer(_.FRAMEBUFFER,le);try{const Ae=c.textures[fe],Ce=Ae.format,Me=Ae.type;if(!be.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!be.textureTypeReadable(Me)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}A>=0&&A<=c.width-N&&I>=0&&I<=c.height-C&&(c.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+fe),_.readPixels(A,I,N,C,ge.convert(Ce),ge.convert(Me),j))}finally{const Ae=B!==null?he.get(B).__webglFramebuffer:null;pe.bindFramebuffer(_.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(c,A,I,N,C,j,re,fe=0){if(!(c&&c.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let le=he.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&re!==void 0&&(le=le[re]),le)if(A>=0&&A<=c.width-N&&I>=0&&I<=c.height-C){pe.bindFramebuffer(_.FRAMEBUFFER,le);const Ae=c.textures[fe],Ce=Ae.format,Me=Ae.type;if(!be.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!be.textureTypeReadable(Me))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ne=_.createBuffer();_.bindBuffer(_.PIXEL_PACK_BUFFER,Ne),_.bufferData(_.PIXEL_PACK_BUFFER,j.byteLength,_.STREAM_READ),c.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+fe),_.readPixels(A,I,N,C,ge.convert(Ce),ge.convert(Me),0);const ke=B!==null?he.get(B).__webglFramebuffer:null;pe.bindFramebuffer(_.FRAMEBUFFER,ke);const tt=_.fenceSync(_.SYNC_GPU_COMMANDS_COMPLETE,0);return _.flush(),await Yr(_,tt,4),_.bindBuffer(_.PIXEL_PACK_BUFFER,Ne),_.getBufferSubData(_.PIXEL_PACK_BUFFER,0,j),_.deleteBuffer(Ne),_.deleteSync(tt),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(c,A=null,I=0){const N=Math.pow(2,-I),C=Math.floor(c.image.width*N),j=Math.floor(c.image.height*N),re=A!==null?A.x:0,fe=A!==null?A.y:0;Ue.setTexture2D(c,0),_.copyTexSubImage2D(_.TEXTURE_2D,I,0,0,re,fe,C,j),pe.unbindTexture()};const kr=_.createFramebuffer(),zr=_.createFramebuffer();this.copyTextureToTexture=function(c,A,I=null,N=null,C=0,j=null){j===null&&(C!==0?(si("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=C,C=0):j=0);let re,fe,le,Ae,Ce,Me,Ne,ke,tt;const qe=c.isCompressedTexture?c.mipmaps[j]:c.image;if(I!==null)re=I.max.x-I.min.x,fe=I.max.y-I.min.y,le=I.isBox3?I.max.z-I.min.z:1,Ae=I.min.x,Ce=I.min.y,Me=I.isBox3?I.min.z:0;else{const Et=Math.pow(2,-C);re=Math.floor(qe.width*Et),fe=Math.floor(qe.height*Et),c.isDataArrayTexture?le=qe.depth:c.isData3DTexture?le=Math.floor(qe.depth*Et):le=1,Ae=0,Ce=0,Me=0}N!==null?(Ne=N.x,ke=N.y,tt=N.z):(Ne=0,ke=0,tt=0);const Ye=ge.convert(A.format),Te=ge.convert(A.type);let Qe;A.isData3DTexture?(Ue.setTexture3D(A,0),Qe=_.TEXTURE_3D):A.isDataArrayTexture||A.isCompressedArrayTexture?(Ue.setTexture2DArray(A,0),Qe=_.TEXTURE_2D_ARRAY):(Ue.setTexture2D(A,0),Qe=_.TEXTURE_2D),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,A.flipY),_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),_.pixelStorei(_.UNPACK_ALIGNMENT,A.unpackAlignment);const Be=_.getParameter(_.UNPACK_ROW_LENGTH),_t=_.getParameter(_.UNPACK_IMAGE_HEIGHT),Vt=_.getParameter(_.UNPACK_SKIP_PIXELS),gt=_.getParameter(_.UNPACK_SKIP_ROWS),en=_.getParameter(_.UNPACK_SKIP_IMAGES);_.pixelStorei(_.UNPACK_ROW_LENGTH,qe.width),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,qe.height),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Ae),_.pixelStorei(_.UNPACK_SKIP_ROWS,Ce),_.pixelStorei(_.UNPACK_SKIP_IMAGES,Me);const Je=c.isDataArrayTexture||c.isData3DTexture,vt=A.isDataArrayTexture||A.isData3DTexture;if(c.isDepthTexture){const Et=he.get(c),ft=he.get(A),pt=he.get(Et.__renderTarget),Hn=he.get(ft.__renderTarget);pe.bindFramebuffer(_.READ_FRAMEBUFFER,pt.__webglFramebuffer),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let yt=0;yt<le;yt++)Je&&(_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,he.get(c).__webglTexture,C,Me+yt),_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,he.get(A).__webglTexture,j,tt+yt)),_.blitFramebuffer(Ae,Ce,re,fe,Ne,ke,re,fe,_.DEPTH_BUFFER_BIT,_.NEAREST);pe.bindFramebuffer(_.READ_FRAMEBUFFER,null),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else if(C!==0||c.isRenderTargetTexture||he.has(c)){const Et=he.get(c),ft=he.get(A);pe.bindFramebuffer(_.READ_FRAMEBUFFER,kr),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,zr);for(let pt=0;pt<le;pt++)Je?_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,Et.__webglTexture,C,Me+pt):_.framebufferTexture2D(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,Et.__webglTexture,C),vt?_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,ft.__webglTexture,j,tt+pt):_.framebufferTexture2D(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,ft.__webglTexture,j),C!==0?_.blitFramebuffer(Ae,Ce,re,fe,Ne,ke,re,fe,_.COLOR_BUFFER_BIT,_.NEAREST):vt?_.copyTexSubImage3D(Qe,j,Ne,ke,tt+pt,Ae,Ce,re,fe):_.copyTexSubImage2D(Qe,j,Ne,ke,Ae,Ce,re,fe);pe.bindFramebuffer(_.READ_FRAMEBUFFER,null),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else vt?c.isDataTexture||c.isData3DTexture?_.texSubImage3D(Qe,j,Ne,ke,tt,re,fe,le,Ye,Te,qe.data):A.isCompressedArrayTexture?_.compressedTexSubImage3D(Qe,j,Ne,ke,tt,re,fe,le,Ye,qe.data):_.texSubImage3D(Qe,j,Ne,ke,tt,re,fe,le,Ye,Te,qe):c.isDataTexture?_.texSubImage2D(_.TEXTURE_2D,j,Ne,ke,re,fe,Ye,Te,qe.data):c.isCompressedTexture?_.compressedTexSubImage2D(_.TEXTURE_2D,j,Ne,ke,qe.width,qe.height,Ye,qe.data):_.texSubImage2D(_.TEXTURE_2D,j,Ne,ke,re,fe,Ye,Te,qe);_.pixelStorei(_.UNPACK_ROW_LENGTH,Be),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,_t),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Vt),_.pixelStorei(_.UNPACK_SKIP_ROWS,gt),_.pixelStorei(_.UNPACK_SKIP_IMAGES,en),j===0&&A.generateMipmaps&&_.generateMipmap(Qe),pe.unbindTexture()},this.initRenderTarget=function(c){he.get(c).__webglFramebuffer===void 0&&Ue.setupRenderTarget(c)},this.initTexture=function(c){c.isCubeTexture?Ue.setTextureCube(c,0):c.isData3DTexture?Ue.setTexture3D(c,0):c.isDataArrayTexture||c.isCompressedArrayTexture?Ue.setTexture2DArray(c,0):Ue.setTexture2D(c,0),pe.unbindTexture()},this.resetState=function(){b=0,L=0,B=null,pe.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(n),t.unpackColorSpace=at._getUnpackColorSpace()}}const iu=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],au=`
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
`,ru='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',za='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',ou=(e,n)=>{const t=e==="three";return n==="three"?t?".":"..":t?`${n}/`:`../${n}/`},Wa=e=>e.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),su=e=>{if(document.getElementById("portal-nav-toggle"))return;const n=document.createElement("style");n.id="portal-nav-styles",n.textContent=au,document.head.appendChild(n);const t=document.createElement("aside");t.id="portal-nav-drawer",t.setAttribute("aria-hidden","false"),t.setAttribute("aria-label","Portal demos"),t.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${iu.map(a=>`
        <li${a.key===e?' class="portal-nav-current"':""}>
          <a href="${ou(e,a.key)}"${a.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${Wa(a.label)}</span>
            <span class="portal-nav-desc">${Wa(a.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const i=document.createElement("button");i.id="portal-nav-toggle",i.type="button",i.setAttribute("aria-label","Close demos menu"),i.setAttribute("aria-expanded","true"),i.setAttribute("aria-controls","portal-nav-drawer"),i.innerHTML=za,document.body.appendChild(t),document.body.appendChild(i);const r=a=>{t.setAttribute("aria-hidden",a?"false":"true"),i.setAttribute("aria-expanded",a?"true":"false"),i.setAttribute("aria-label",a?"Close demos menu":"Toggle demos menu"),i.innerHTML=a?za:ru};i.addEventListener("click",a=>{a.stopPropagation(),r(t.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",a=>{t.getAttribute("aria-hidden")==="true"||a.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||r(!1)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&t.getAttribute("aria-hidden")==="false"&&r(!1)})},lu=(e,n,t={})=>{const i=t.moveSpeed??4,r=t.lookSensitivity??.0025,a=t.lookKeySpeed??1.5;let f=0,l=0;const E=new Set;cu(n,(L,B)=>{f-=L*r,l-=B*r}),window.addEventListener("keydown",L=>E.add(L.code)),window.addEventListener("keyup",L=>E.delete(L.code)),fu(E);const g=new se,x=new se,S=new se,m=L=>{E.has("KeyQ")&&(f+=a*L),E.has("KeyE")&&(f-=a*L),E.has("KeyR")&&(l-=a*L),E.has("KeyF")&&(l+=a*L),l=du(l),e.quaternion.setFromEuler(new Dn(l,f,0,"YXZ")),x.set(0,0,-1).applyQuaternion(e.quaternion),S.set(1,0,0).applyQuaternion(e.quaternion),g.set(0,0,0),E.has("KeyW")&&g.add(x),E.has("KeyS")&&g.sub(x),E.has("KeyD")&&g.add(S),E.has("KeyA")&&g.sub(S),g.y=0,g.lengthSq()>0&&(g.normalize().multiplyScalar(i*L),e.position.add(g))},T=new St,U=new un,P=new Dn(0,0,0,"YXZ"),d=new se(0,0,0),o=new se,y=new se(0,1,0);return{update:m,setOrientationFromForward:L=>{o.copy(L).normalize(),T.lookAt(d,o,y),U.setFromRotationMatrix(T),P.setFromQuaternion(U,"YXZ"),l=P.x,f=P.y},clearKeys:()=>{E.clear()},getKeys:()=>Array.from(E),setKeys:L=>{E.clear();for(const B of L)E.add(B)}}},cu=(e,n)=>{let t=null,i=0,r=0;e.addEventListener("pointerdown",f=>{if(t===null&&(t=f.pointerId,i=f.clientX,r=f.clientY,f.pointerType!=="mouse"))try{e.setPointerCapture(f.pointerId)}catch{}});const a=f=>{f.pointerId===t&&(t=null)};window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a),window.addEventListener("pointermove",f=>{if(f.pointerId!==t)return;const l=f.clientX-i,E=f.clientY-r;i=f.clientX,r=f.clientY,n(l,E)})},du=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),fu=e=>{if(typeof window>"u")return;const n="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,t=()=>n||window.innerWidth<500;if(t()){Xa(e);return}const i=()=>{t()&&(window.removeEventListener("resize",i),Xa(e))};window.addEventListener("resize",i)},Xa=e=>{const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement and look controls"),n.innerHTML=`
    <button type="button" data-key="KeyQ" class="wasd-btn wasd-yaw-left" aria-label="Yaw left">↶</button>
    <button type="button" data-key="KeyW" class="wasd-btn wasd-forward" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyE" class="wasd-btn wasd-yaw-right" aria-label="Yaw right">↷</button>
    <button type="button" data-key="KeyR" class="wasd-btn wasd-pitch-down" aria-label="Pitch down">⇣</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-back" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
    <button type="button" data-key="KeyF" class="wasd-btn wasd-pitch-up" aria-label="Pitch up">⇡</button>
  `;const t=document.createElement("style");t.textContent=`
    .wasd-pad {
      position: fixed;
      left: 16px;
      bottom: 16px;
      width: min(360px, calc(100vw - 32px));
      height: 168px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
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
    .wasd-yaw-left   { grid-column: 1; grid-row: 1; }
    .wasd-forward    { grid-column: 2; grid-row: 1; }
    .wasd-yaw-right  { grid-column: 3; grid-row: 1; }
    .wasd-pitch-down { grid-column: 4; grid-row: 1; }
    .wasd-left       { grid-column: 1; grid-row: 2; }
    .wasd-back       { grid-column: 2; grid-row: 2; }
    .wasd-right      { grid-column: 3; grid-row: 2; }
    .wasd-pitch-up   { grid-column: 4; grid-row: 2; }
  `,document.head.appendChild(t),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const r=i.dataset.key,a=l=>{l.preventDefault(),l.stopPropagation(),e.add(r),i.classList.add("is-active");try{i.setPointerCapture(l.pointerId)}catch{}},f=l=>{l.stopPropagation(),e.delete(r),i.classList.remove("is-active")};i.addEventListener("pointerdown",a),i.addEventListener("pointerup",f),i.addEventListener("pointercancel",f),i.addEventListener("pointerleave",f),i.addEventListener("contextmenu",l=>l.preventDefault())}},vi=(e,n)=>[e[0]+n[0],e[1]+n[1],e[2]+n[2]],uu=(e,n)=>[e[0]-n[0],e[1]-n[1],e[2]-n[2]],bn=(e,n)=>[e[0]*n,e[1]*n,e[2]*n],Jn=(e,n)=>e[0]*n[0]+e[1]*n[1]+e[2]*n[2],Ya=(e,n)=>[e[1]*n[2]-e[2]*n[1],e[2]*n[0]-e[0]*n[2],e[0]*n[1]-e[1]*n[0]],rn=e=>{const n=Math.hypot(e[0],e[1],e[2]);return n>0?[e[0]/n,e[1]/n,e[2]/n]:[0,0,1]},Ka=e=>{const n=rn(e.normal),t=rn(e.up),i=rn(Ya(t,n)),r=rn(Ya(n,i));return{right:i,up:r,normal:n}},Dr=(e,n)=>[Jn(e,n.right),Jn(e,n.up),Jn(e,n.normal)],Lr=(e,n)=>vi(vi(bn(n.right,e[0]),bn(n.up,e[1])),bn(n.normal,e[2])),yr=e=>[-e[0],e[1],-e[2]],qa=(e,n,t)=>rn(Lr(yr(Dr(e,n)),t)),pu=(e,n)=>{const t=Ka(n.source),i=Ka(n.target),r=uu(e.position,n.source.position),a=Dr(r,t),f=bn(yr(a),n.scale),l={position:vi(n.target.position,Lr(f,i))};return e.forward&&(l.forward=qa(e.forward,t,i)),e.up&&(l.up=qa(e.up,t,i)),l};new Ti;new se;new dt;new dt;const hu=(e=new ze(2,3))=>{const n=new pn(e.x,e.y),t=new Ri({visible:!1}),i=new ut(n,t);return i.name="portal-plane",i.userData.portalSize=e.clone(),i},mu=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,_u=`
uniform vec3 portalPos;
uniform vec3 portalNormal;
uniform vec3 portalRight;
uniform vec3 portalUp;
uniform float portalHalfW;
uniform float portalHalfH;
uniform vec3 hostCameraPos;
uniform mat4 hostInverseViewProjection;
uniform mat4 hostViewMatrix;
uniform mat4 hostProjectionMatrix;
uniform vec3 destinationBackground;

varying vec2 vUv;

vec3 linearToSRGB(vec3 v) {
  return mix(
    pow(v, vec3(0.41666)) * 1.055 - vec3(0.055),
    v * 12.92,
    vec3(lessThanEqual(v, vec3(0.0031308)))
  );
}

void main() {
  if (dot(hostCameraPos - portalPos, portalNormal) < 0.0) discard;

  vec4 farClipPos = hostInverseViewProjection * vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
  vec3 rayDir = normalize(farClipPos.xyz / farClipPos.w - hostCameraPos);

  float denom = dot(rayDir, portalNormal);
  if (denom > -1e-6) discard;
  float t = dot(portalPos - hostCameraPos, portalNormal) / denom;
  if (t < 0.0) discard;

  vec3 hitPos = hostCameraPos + t * rayDir;
  vec3 hitRel = hitPos - portalPos;
  float lx = dot(hitRel, portalRight);
  float ly = dot(hitRel, portalUp);
  if (abs(lx) > portalHalfW || abs(ly) > portalHalfH) discard;

  vec4 hitClip = hostProjectionMatrix * hostViewMatrix * vec4(hitPos, 1.0);
  gl_FragDepth = (hitClip.z / hitClip.w) * 0.5 + 0.5;

  gl_FragColor = vec4(linearToSRGB(destinationBackground), 1.0);
}
`,Qt=1,gu=(e=Qt)=>{const n={portalPos:{value:new se},portalNormal:{value:new se},portalRight:{value:new se},portalUp:{value:new se},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new se},hostInverseViewProjection:{value:new St},hostViewMatrix:{value:new St},hostProjectionMatrix:{value:new St},destinationBackground:{value:new se(0,0,0)}},t=new Dt({uniforms:n,vertexShader:mu,fragmentShader:_u,depthTest:!0,depthWrite:!1,side:Tt,stencilWrite:!0,stencilFunc:Tr,stencilRef:e,stencilFail:Ht,stencilZFail:Ht,stencilZPass:Mr,stencilWriteMask:255}),i=new ut(new pn(2,2),t);i.frustumCulled=!1;const r=new Ln;r.add(i);const a=new Sr(-1,1,1,-1,0,1),f=new St,l=new se(0,0,1),E=new se(1,0,0),g=new se(0,1,0),x=new un;return{scene:r,camera:a,update:(m,T,U)=>{const P=m.userData.portalSize;n.portalHalfW.value=P?P.x/2:1,n.portalHalfH.value=P?P.y/2:1.5,m.getWorldPosition(n.portalPos.value),m.getWorldQuaternion(x),n.portalNormal.value.copy(l).applyQuaternion(x),n.portalRight.value.copy(E).applyQuaternion(x),n.portalUp.value.copy(g).applyQuaternion(x),T.getWorldPosition(n.hostCameraPos.value),f.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),n.hostInverseViewProjection.value.copy(f).invert(),n.hostViewMatrix.value.copy(T.matrixWorldInverse),n.hostProjectionMatrix.value.copy(T.projectionMatrix),n.destinationBackground.value.set(U.r,U.g,U.b)}}},Ur=(e,n)=>{e.traverse(t=>{const i=t;if(!i.isMesh||!i.material)return;const r=Array.isArray(i.material)?i.material:[i.material];for(const a of r)n(a)})},vu=(e,n=Qt)=>{Ur(e,t=>{t.stencilWrite=!0,t.stencilFunc=ds,t.stencilRef=n,t.stencilFail=Ht,t.stencilZFail=Ht,t.stencilZPass=Ht,t.stencilWriteMask=0})},Eu=e=>{Ur(e,n=>{n.stencilWrite=!1})};new se;const ei=new un,Sn=new se,Mn=new se,Tn=new se,Su=(e,n)=>n||(e.background instanceof Ve?e.background:new Ve(0,0,0)),Mu=e=>{const{scene:n,anchor:t}=e,i=e.portalNormal??new se(0,0,1),r=e.stencilRef??Qt;return{scene:n,anchor:t,getAnchor:()=>{t.getWorldPosition(Sn),t.getWorldQuaternion(ei),Mn.copy(i).applyQuaternion(ei).normalize(),Tn.set(0,1,0).applyQuaternion(ei).normalize();const l=t.userData.portalSize;return{position:[Sn.x,Sn.y,Sn.z],normal:[Mn.x,Mn.y,Mn.z],up:[Tn.x,Tn.y,Tn.z],halfWidth:l?l.x/2:void 0,halfHeight:l?l.y/2:void 0}},getBackground:()=>{const l=Su(n,e.background);return{r:l.r,g:l.g,b:l.b}},tick:e.tick,renderAsSource(l,E){l.render(n,E)},renderAsDestination(l,E){const g=n.background;n.background=null,vu(n,r),l.render(n,E),Eu(n),n.background=g}}},Tu=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",xu=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end",Au=new Set(["bufferData","bufferSubData","texImage2D","texSubImage2D","texImage3D","texSubImage3D","compressedTexImage2D","compressedTexSubImage2D","compressedTexImage3D","compressedTexSubImage3D","texStorage2D","texStorage3D","renderbufferStorage","renderbufferStorageMultisample","generateMipmap","shaderSource","compileShader","attachShader","linkProgram"]),Ru=e=>{const n=fs(e.gl,e.replay),t=e.onError??(m=>console.error("[netgl-host] replay error:",m)),i=new Set;let r=null,a=[],f=null,l=null,E=!1;const g=new Set;let x=e.transport.onMessage(m=>{if(Tu(m)){a.push(m);return}if(xu(m)){f?f.push(...a):f=a,a=[];for(const U of g)U();return}if(m.type==="netgl:ready"){const U={type:"netgl:ready-ack"};e.transport.post(U),r||(r=m,e.onReady?.(r));return}e.onControl?.(m)});const S=(m,T)=>{n.invalidate();for(let U=0;U<m.length;U+=1){const P=m[U];if(!(T&&(P.returnId!==void 0||Au.has(P.name))))try{n(P)}catch(d){const o=d instanceof Error?d.message:String(d);i.has(o)||(i.add(o),t(d))}}};return{get ready(){return r},get hasFrame(){return l!==null||f!==null},get canRerun(){return l!==null&&E},replay:n,post(m){e.transport.post(m)},onFrame(m){return g.add(m),()=>{g.delete(m)}},drain(){if(f){const m=f;return f=null,l=m,E=!m.some(T=>T.name.startsWith("delete")),S(m,!1),!0}return l&&E?(S(l,!0),!0):!1},stop(){x?.(),x=null,g.clear()}}},bu=1e3,Ir=e=>(n,t,i,r)=>{const a=e(),f=a.guestSize;if(!f)return null;const l=a.canvasSize(),E=l.width/f.width,g=l.height/f.height;return[Math.round(n*E),Math.round(t*g),Math.round(i*E),Math.round(r*g)]},Nr=e=>{const n=new nu({antialias:!1,stencil:!0,depth:!0});n.outputColorSpace=rr,n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),n.autoClear=!1,e.mount.appendChild(n.domElement);const t=us({output:e.iframe.contentWindow,inputFilter:e.iframe.contentWindow});let i=0,r=0,a=0;const f=new Set;let l=null;const E=()=>l,g=Ru({gl:n.getContext(),transport:t,replay:e.replay(E),onControl:x=>{const S=x;if(S.type==="cesium:rendered"){const m=x;r=m.seq,l.guestSize={width:m.width,height:m.height}}else if(S.type==="cesium:error"){const m=x.message;f.has(m)||(f.add(m),console.error("[cesium guest]",m),e.onStatus(`Cesium error: ${m.split(`
`)[0]}`))}},onError:x=>{console.error("[netgl host] replay error:",x),e.onStatus(`Replay error: ${x instanceof Error?x.message:String(x)}`)}});return l={renderer:n,receiver:g,guestSize:null,canvasSize:()=>{const x=n.getDrawingBufferSize(new ze);return{width:x.x,height:x.y}},tick(x,S){const m=performance.now();if(r<i&&m-a<bu)return null;i+=1,a=m;const T={type:"cesium:tick",seq:i,time:x,view:S};return t.post(T),i},lag:()=>i-r},l},Cu=4e6,wu=-60,Pu=20,ti=16e6,Du=e=>{const n=Nr({...e,replay:b=>({remapScreenViewport:Ir(b),screen:{stencil:{ref:Qt},clear:"depth-only"}})}),{renderer:t,receiver:i}=n,r=new qt(70,window.innerWidth/window.innerHeight,.02,200);r.position.set(0,1.6,5.5);const a=new Ln;a.background=new Ve("#101826"),a.add(new ps(12176639,2241348,1));const f=new xr(16777215,.65);f.position.set(3,6,2),a.add(f);const l=new ut(new pn(18,18),new yn({color:"#1b2a3f",roughness:.95,metalness:.03}));l.rotation.x=-Math.PI/2,a.add(l);const E=new Ai(.9,.9,.9),g=new yn({color:"#5da9ff",roughness:.35});for(let b=0;b<14;b+=1){const L=new ut(E,g);L.position.set(Math.sin(b*.5)*4,.45,-3-b*.65),a.add(L)}const x=hu(new ze(2.6,3.2));x.position.set(0,1.6,-3.5),a.add(x);const S=Mu({scene:a,anchor:x}),m=gu(),T=new Ve("#000000"),U=Lu(),P=lu(r,t.domElement);window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix()});const d=new se,o=new se,y=new se,R=()=>{r.updateMatrixWorld(),r.getWorldPosition(d),r.getWorldDirection(o),y.set(0,1,0).applyQuaternion(r.quaternion);const b=pu({position:[d.x,d.y,d.z],forward:[o.x,o.y,o.z],up:[y.x,y.y,y.z]},{source:S.getAnchor(),target:U,scale:Cu});return{position:b.position,direction:b.forward,up:b.up,fovy:Pt.degToRad(r.fov)}},v=new Ar;n.tick(0,R());const O=()=>{t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(a,r),i.ready&&(m.update(x,r,T),t.render(m.scene,m.camera),t.clearDepth(),i.drain(),t.resetState()),P.update(v.getDelta()),n.tick(v.elapsedTime,R()),requestAnimationFrame(O)};O()},Lu=()=>{const e=Pt.degToRad(wu),n=Pt.degToRad(Pu),t=new se(Math.cos(n)*Math.cos(e),Math.cos(n)*Math.sin(e),Math.sin(n)),i=new se(0,0,1).addScaledVector(t,-t.z).normalize();return{position:[t.x*ti,t.y*ti,t.z*ti],normal:[-t.x,-t.y,-t.z],up:[i.x,i.y,i.z]}},Za={type:"change"},Ci={type:"start"},Or={type:"end"},xn=new ms,$a=new Ti,yu=Math.cos(70*Pt.DEG2RAD),rt=new se,ht=2*Math.PI,We={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ni=1e-6;class Uu extends hs{constructor(n,t=null){super(n,t),this.state=We.NONE,this.target=new se,this.cursor=new se,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zt.ROTATE,MIDDLE:Zt.DOLLY,RIGHT:Zt.PAN},this.touches={ONE:Yt.ROTATE,TWO:Yt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new se,this._lastQuaternion=new un,this._lastTargetPosition=new se,this._quat=new un().setFromUnitVectors(n.up,new se(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ga,this._sphericalDelta=new ga,this._scale=1,this._panOffset=new se,this._rotateStart=new ze,this._rotateEnd=new ze,this._rotateDelta=new ze,this._panStart=new ze,this._panEnd=new ze,this._panDelta=new ze,this._dollyStart=new ze,this._dollyEnd=new ze,this._dollyDelta=new ze,this._dollyDirection=new se,this._mouse=new ze,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Nu.bind(this),this._onPointerDown=Iu.bind(this),this._onPointerUp=Ou.bind(this),this._onContextMenu=zu.bind(this),this._onMouseWheel=Hu.bind(this),this._onKeyDown=Gu.bind(this),this._onTouchStart=Vu.bind(this),this._onTouchMove=ku.bind(this),this._onMouseDown=Fu.bind(this),this._onMouseMove=Bu.bind(this),this._interceptControlDown=Wu.bind(this),this._interceptControlUp=Xu.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Za),this.update(),this.state=We.NONE}update(n=null){const t=this.object.position;rt.copy(t).sub(this.target),rt.applyQuaternion(this._quat),this._spherical.setFromVector3(rt),this.autoRotate&&this.state===We.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=ht:i>Math.PI&&(i-=ht),r<-Math.PI?r+=ht:r>Math.PI&&(r-=ht),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=f!=this._spherical.radius}if(rt.setFromSpherical(this._spherical),rt.applyQuaternion(this._quatInverse),t.copy(this.target).add(rt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const l=rt.length();f=this._clampDistance(l*this._scale);const E=l-f;this.object.position.addScaledVector(this._dollyDirection,E),this.object.updateMatrixWorld(),a=!!E}else if(this.object.isOrthographicCamera){const l=new se(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const E=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=E!==this.object.zoom;const g=new se(this._mouse.x,this._mouse.y,0);g.unproject(this.object),this.object.position.sub(g).add(l),this.object.updateMatrixWorld(),f=rt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(xn.origin.copy(this.object.position),xn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(xn.direction))<yu?this.object.lookAt(this.target):($a.setFromNormalAndCoplanarPoint(this.object.up,this.target),xn.intersectPlane($a,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>ni||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ni||this._lastTargetPosition.distanceToSquared(this.target)>ni?(this.dispatchEvent(Za),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?ht/60*this.autoRotateSpeed*n:ht/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){rt.setFromMatrixColumn(t,0),rt.multiplyScalar(-n),this._panOffset.add(rt)}_panUp(n,t){this.screenSpacePanning===!0?rt.setFromMatrixColumn(t,1):(rt.setFromMatrixColumn(t,0),rt.crossVectors(this.object.up,rt)),rt.multiplyScalar(n),this._panOffset.add(rt)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;rt.copy(r).sub(this.target);let a=rt.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*a/i.clientHeight,this.object.matrix),this._panUp(2*t*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=n-i.left,a=t-i.top,f=i.width,l=i.height;this._mouse.x=r/f*2-1,this._mouse.y=-(a/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),r=.5*(n.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),r=.5*(n.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,r=n.pageY-t.y,a=Math.sqrt(i*i+r*r);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),r=.5*(n.pageX+i.x),a=.5*(n.pageY+i.y);this._rotateEnd.set(r,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),r=.5*(n.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,r=n.pageY-t.y,a=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(n.pageX+t.x)*.5,l=(n.pageY+t.y)*.5;this._updateZoomParameters(f,l)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new ze,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Iu(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function Nu(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function Ou(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Or),this.state=We.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function Fu(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=We.DOLLY;break;case Zt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=We.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=We.ROTATE}break;case Zt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=We.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=We.PAN}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(Ci)}function Bu(e){switch(this.state){case We.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case We.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case We.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function Hu(e){this.enabled===!1||this.enableZoom===!1||this.state!==We.NONE||(e.preventDefault(),this.dispatchEvent(Ci),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Or))}function Gu(e){this.enabled!==!1&&this._handleKeyDown(e)}function Vu(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Yt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=We.TOUCH_ROTATE;break;case Yt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=We.TOUCH_PAN;break;default:this.state=We.NONE}break;case 2:switch(this.touches.TWO){case Yt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=We.TOUCH_DOLLY_PAN;break;case Yt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=We.TOUCH_DOLLY_ROTATE;break;default:this.state=We.NONE}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(Ci)}function ku(e){switch(this._trackPointer(e),this.state){case We.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case We.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case We.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case We.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=We.NONE}}function zu(e){this.enabled!==!1&&e.preventDefault()}function Wu(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Xu(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const wi=1e6,zt=6378137/wi,ja=6356752314245e-6/wi,ii=1.025,Yu=.05,Ku=e=>{const n=Nr({...e,replay:B=>({remapScreenViewport:Ir(B),screen:{stencil:{ref:Qt},blend:"premultiplied-over",clear:"depth-only"}})}),{renderer:t,receiver:i}=n,r=new qt(40,window.innerWidth/window.innerHeight,.01,2e4);r.position.set(6,2.5,26);const a=new Ln;a.background=new Ve("#000000");const f=new se(1,.25,.6).normalize(),l=new xr(16777215,2.2);l.position.copy(f).multiplyScalar(100),a.add(l),a.add(new _s(2241348,.25)),a.add(Zu());const E=new Yn;E.rotation.z=Pt.degToRad(23.4),a.add(E);const g=new Yn;E.add(g);const x=new va(1,128,96),S=new ut(x,new yn({color:"#1d4f91",roughness:.8}));S.scale.set(zt,ja,zt),g.add(S);const m=new Ln,T=new ut(x,new Ri({side:Tt,colorWrite:!1,depthWrite:!1,depthTest:!0,stencilWrite:!0,stencilRef:Qt,stencilFunc:Tr,stencilZPass:Mr,stencilFail:Ht,stencilZFail:Ht}));m.add(T);const U=new Yn;U.rotation.x=Pt.degToRad(-8),a.add(U);const P=new ut(new va(1.737,64,48),new yn({color:"#b8b4ac",roughness:.95}));U.add(P);const d=new Uu(r,t.domElement);d.enableDamping=!0,d.minDistance=zt*1.02,d.maxDistance=400,d.zoomSpeed=.6,d.rotateSpeed=.5;const o=()=>{const B=r.position.length()-zt;d.rotateSpeed=Pt.clamp(B/20,.02,.5)};window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix()});const y=new Ar;let R=e.startTime??0;const v=()=>{g.rotation.y=R*Yu;const B=R*.12;P.position.set(Math.cos(B)*16,0,Math.sin(B)*16),a.updateMatrixWorld(),T.matrixAutoUpdate=!1,T.matrix.copy(g.matrixWorld).multiply(new St().makeScale(zt*ii,ja*ii,zt*ii)),T.matrixWorldNeedsUpdate=!0};let O=0;const b=()=>(r.updateMatrixWorld(),n.tick(R,qu(r,g)));v(),b();const L=()=>{const B=i.hasFrame;S.visible=!B,t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(a,r),B&&(t.render(m,r),t.clearDepth(),i.drain(),t.resetState());const h=Math.min(y.getDelta(),.1);e.paused||(R+=h),o(),d.update(h),v(),b()===null?O+=1:O=0,e.onLag(O),requestAnimationFrame(L)};L()},ai=new St,Qa=new se,Ja=new se,er=new se,ri=new Fe,oi=(e,n)=>[e.x*n,-e.z*n,e.y*n],qu=(e,n)=>(ai.copy(n.matrixWorld).invert(),ri.setFromMatrix4(ai),Qa.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ai),e.getWorldDirection(Ja).applyMatrix3(ri).normalize(),er.set(0,1,0).applyQuaternion(e.quaternion).applyMatrix3(ri).normalize(),{position:oi(Qa,wi),direction:oi(Ja,1),up:oi(er,1),fovy:Pt.degToRad(e.fov)}),Zu=()=>{const n=new Float32Array(12e3),t=new se;let i=7;const r=()=>(i=i*16807%2147483647,i/2147483647);for(let f=0;f<4e3;f+=1)t.set(r()*2-1,r()*2-1,r()*2-1).normalize().multiplyScalar(5e3),n.set([t.x,t.y,t.z],f*3);const a=new xi;return a.setAttribute("position",new sn(n,3)),new gs(a,new vs({color:16777215,size:1.6,sizeAttenuation:!1}))};su("netgl-cesium");const Fn=Es(location.search),Ei=new URLSearchParams(location.search),tr=document.querySelector("#app"),Si=document.querySelector("#guest"),nr=document.querySelector("#status"),$u=document.querySelector("#lag"),Fr=new URLSearchParams({mode:Fn}),ir=Ei.get("imagery");ir&&Fr.set("imagery",ir);Si.src=`cesium.html?${Fr}`;document.querySelectorAll("a[data-mode]").forEach(e=>{const n=new URLSearchParams(location.search);n.set("mode",e.dataset.mode),e.href=`?${n}`,e.dataset.mode===Fn&&e.classList.add("current")});document.querySelector(`[data-help="${Fn}"]`).hidden=!1;const ar=e=>{nr.textContent=e,nr.hidden=!1};Fn==="earth"?Ku({iframe:Si,mount:tr,onStatus:ar,startTime:Number(Ei.get("time")??0),paused:Ei.has("pause"),onLag:e=>{$u.textContent=String(Math.max(0,e))}}):Du({iframe:Si,mount:tr,onStatus:ar});
