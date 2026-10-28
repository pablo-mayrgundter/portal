import{c as eo,N as Pt,S as ma,C as ze,F as _a,M as Mt,V as le,R as to,a as dt,w as fi,W as Hi,b as jt,d as at,L as rn,H as On,U as Vt,D as xt,B as Tt,e as cn,f as Fn,p as no,E as io,g as Ye,P as $t,A as ro,h as Wn,i as Ct,j as Dn,k as Ri,l as dn,m as fn,n as ga,o as ao,q as Xt,r as Ln,s as oo,t as so,u as nn,O as lo,v as co,x as fo,y as uo,z as po,G as ho,I as mo,J as _o,K as go,Q as vo,T as Eo,X as So,Y as Mo,Z as To,_ as xo,$ as Ao,a0 as Ro,a1 as bo,a2 as zn,a3 as Yt,a4 as gn,a5 as wo,a6 as sn,a7 as Co,a8 as Po,a9 as Do,aa as Lo,ab as va,ac as yo,ad as Uo,ae as Io,af as bi,ag as He,ah as No,ai as Oo,aj as Fo,ak as Lt,al as wi,am as ln,an as ut,ao as Ea,ap as Ht,aq as wt,ar as yn,as as Sa,at as Ma,au as Ta,av as hn,aw as Bo,ax as Ho,ay as Go,az as Vo,aA as xa,aB as Bt,aC as ko,aD as Wo,aE as zo,aF as Aa,aG as Xo,aH as Ra,aI as ba,aJ as Xn,aK as Yn,aL as Kn,aM as qn,aN as et,aO as Gi,aP as Vi,aQ as ki,aR as Wi,aS as zi,aT as Xi,aU as Yi,aV as Ki,aW as qi,aX as $i,aY as Zi,aZ as ji,a_ as Qi,a$ as Ji,b0 as er,b1 as tr,b2 as nr,b3 as ir,b4 as rr,b5 as ar,b6 as or,b7 as sr,b8 as lr,b9 as cr,ba as dr,bb as fr,bc as ur,bd as pr,be as ui,bf as pi,bg as hi,bh as mi,bi as _i,bj as gi,bk as vi,bl as Yo,bm as hr,bn as Ko,bo as wn,bp as qo,bq as mr,br as _r,bs as gr,bt as Ei,bu as Si,bv as $o,bw as wa,bx as Zo,by as Bn,bz as jo,bA as Qo,bB as Ca,bC as Ci,bD as vr,bE as Un,bF as Er,bG as Pa,bH as un,bI as Qt,bJ as Da,bK as Pi,bL as Jo,bM as es,bN as ts,bO as Sr,bP as mt,bQ as ns,bR as is,bS as rs,bT as as,bU as os,bV as ss,bW as ls,bX as cs,bY as ds,bZ as fs,b_ as us,b$ as ps,c0 as hs,c1 as ms,c2 as _s,c3 as gs,c4 as vs,c5 as Es,c6 as pn,c7 as La,c8 as Gt,c9 as ya,ca as In,cb as Ss,cc as Ms,cd as Mr,ce as Tr,cf as xr,cg as Ts,ch as xs,ci as As,cj as Ua,ck as Nn,cl as Dt,cm as Ia,cn as Rs,co as Zt,cp as Kt,cq as Ar,cr as bs,cs as ws,ct as $n,cu as Rr,cv as Cs,cw as Ps,cx as Ds}from"./protocol-CFbB0cau.js";function Na(){let e=null,n=!1,t=null,i=null;function o(r,c){t(r,c),i=e.requestAnimationFrame(o)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(o),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function Ls(e){const n=new WeakMap;function t(l,v){const E=l.array,b=l.usage,T=E.byteLength,M=e.createBuffer();e.bindBuffer(v,M),e.bufferData(v,E,b),l.onUploadCallback();let x;if(E instanceof Float32Array)x=e.FLOAT;else if(typeof Float16Array<"u"&&E instanceof Float16Array)x=e.HALF_FLOAT;else if(E instanceof Uint16Array)l.isFloat16BufferAttribute?x=e.HALF_FLOAT:x=e.UNSIGNED_SHORT;else if(E instanceof Int16Array)x=e.SHORT;else if(E instanceof Uint32Array)x=e.UNSIGNED_INT;else if(E instanceof Int32Array)x=e.INT;else if(E instanceof Int8Array)x=e.BYTE;else if(E instanceof Uint8Array)x=e.UNSIGNED_BYTE;else if(E instanceof Uint8ClampedArray)x=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+E);return{buffer:M,type:x,bytesPerElement:E.BYTES_PER_ELEMENT,version:l.version,size:T}}function i(l,v,E){const b=v.array,T=v.updateRanges;if(e.bindBuffer(E,l),T.length===0)e.bufferSubData(E,0,b);else{T.sort((x,I)=>x.start-I.start);let M=0;for(let x=1;x<T.length;x++){const I=T[M],y=T[x];y.start<=I.start+I.count+1?I.count=Math.max(I.count,y.start+y.count-I.start):(++M,T[M]=y)}T.length=M+1;for(let x=0,I=T.length;x<I;x++){const y=T[x];e.bufferSubData(E,y.start*b.BYTES_PER_ELEMENT,b,y.start,y.count)}v.clearUpdateRanges()}v.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const v=n.get(l);v&&(e.deleteBuffer(v.buffer),n.delete(l))}function c(l,v){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const b=n.get(l);(!b||b.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const E=n.get(l);if(E===void 0)n.set(l,t(l,v));else if(E.version<l.version){if(E.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(E.buffer,l,v),E.version=l.version}}return{get:o,remove:r,update:c}}var ys=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Us=`#ifdef USE_ALPHAHASH
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
#endif`,Is=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ns=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Os=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fs=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bs=`#ifdef USE_AOMAP
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
#endif`,Hs=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gs=`#ifdef USE_BATCHING
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
#endif`,Vs=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ks=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ws=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zs=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xs=`#ifdef USE_IRIDESCENCE
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
#endif`,Ys=`#ifdef USE_BUMPMAP
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
#endif`,Ks=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qs=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$s=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zs=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,js=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qs=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Js=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,el=`#if defined( USE_COLOR_ALPHA )
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
#endif`,tl=`#define PI 3.141592653589793
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
} // validated`,nl=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,il=`vec3 transformedNormal = objectNormal;
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
#endif`,rl=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,al=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ol=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sl=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ll="gl_FragColor = linearToOutputTexel( gl_FragColor );",cl=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dl=`#ifdef USE_ENVMAP
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
#endif`,fl=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ul=`#ifdef USE_ENVMAP
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
#endif`,pl=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hl=`#ifdef USE_ENVMAP
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
#endif`,ml=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_l=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gl=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vl=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,El=`#ifdef USE_GRADIENTMAP
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
}`,Sl=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ml=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xl=`uniform bool receiveShadow;
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
#endif`,Al=`#ifdef USE_ENVMAP
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
#endif`,Rl=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wl=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pl=`PhysicalMaterial material;
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
#endif`,Dl=`struct PhysicalMaterial {
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
}`,Ll=`
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
#endif`,yl=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ul=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Il=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ol=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bl=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hl=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gl=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vl=`#if defined( USE_POINTS_UV )
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
#endif`,kl=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wl=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zl=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xl=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yl=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kl=`#ifdef USE_MORPHTARGETS
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
#endif`,ql=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$l=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zl=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ql=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jl=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ec=`#ifdef USE_NORMALMAP
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
#endif`,tc=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nc=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ic=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rc=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ac=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,oc=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sc=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lc=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cc=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dc=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fc=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uc=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pc=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hc=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mc=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_c=`float getShadowMask() {
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
}`,gc=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vc=`#ifdef USE_SKINNING
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
#endif`,Ec=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sc=`#ifdef USE_SKINNING
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
#endif`,Mc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tc=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xc=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ac=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rc=`#ifdef USE_TRANSMISSION
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
#endif`,bc=`#ifdef USE_TRANSMISSION
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
#endif`,wc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dc=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lc=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yc=`uniform sampler2D t2D;
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
}`,Uc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ic=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Nc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Oc=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fc=`#include <common>
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
}`,Bc=`#if DEPTH_PACKING == 3200
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
}`,Hc=`#define DISTANCE
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
}`,Gc=`#define DISTANCE
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
}`,Vc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kc=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wc=`uniform float scale;
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
}`,zc=`uniform vec3 diffuse;
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
}`,Xc=`#include <common>
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
}`,Yc=`uniform vec3 diffuse;
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
}`,Kc=`#define LAMBERT
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
}`,qc=`#define LAMBERT
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
}`,$c=`#define MATCAP
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
}`,Zc=`#define MATCAP
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
}`,jc=`#define NORMAL
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
}`,Qc=`#define NORMAL
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
}`,Jc=`#define PHONG
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
}`,ed=`#define PHONG
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
}`,td=`#define STANDARD
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
}`,nd=`#define STANDARD
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
}`,id=`#define TOON
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
}`,rd=`#define TOON
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
}`,ad=`uniform float size;
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
}`,od=`uniform vec3 diffuse;
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
}`,sd=`#include <common>
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
}`,ld=`uniform vec3 color;
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
}`,cd=`uniform float rotation;
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
}`,dd=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:ys,alphahash_pars_fragment:Us,alphamap_fragment:Is,alphamap_pars_fragment:Ns,alphatest_fragment:Os,alphatest_pars_fragment:Fs,aomap_fragment:Bs,aomap_pars_fragment:Hs,batching_pars_vertex:Gs,batching_vertex:Vs,begin_vertex:ks,beginnormal_vertex:Ws,bsdfs:zs,iridescence_fragment:Xs,bumpmap_pars_fragment:Ys,clipping_planes_fragment:Ks,clipping_planes_pars_fragment:qs,clipping_planes_pars_vertex:$s,clipping_planes_vertex:Zs,color_fragment:js,color_pars_fragment:Qs,color_pars_vertex:Js,color_vertex:el,common:tl,cube_uv_reflection_fragment:nl,defaultnormal_vertex:il,displacementmap_pars_vertex:rl,displacementmap_vertex:al,emissivemap_fragment:ol,emissivemap_pars_fragment:sl,colorspace_fragment:ll,colorspace_pars_fragment:cl,envmap_fragment:dl,envmap_common_pars_fragment:fl,envmap_pars_fragment:ul,envmap_pars_vertex:pl,envmap_physical_pars_fragment:Al,envmap_vertex:hl,fog_vertex:ml,fog_pars_vertex:_l,fog_fragment:gl,fog_pars_fragment:vl,gradientmap_pars_fragment:El,lightmap_pars_fragment:Sl,lights_lambert_fragment:Ml,lights_lambert_pars_fragment:Tl,lights_pars_begin:xl,lights_toon_fragment:Rl,lights_toon_pars_fragment:bl,lights_phong_fragment:wl,lights_phong_pars_fragment:Cl,lights_physical_fragment:Pl,lights_physical_pars_fragment:Dl,lights_fragment_begin:Ll,lights_fragment_maps:yl,lights_fragment_end:Ul,logdepthbuf_fragment:Il,logdepthbuf_pars_fragment:Nl,logdepthbuf_pars_vertex:Ol,logdepthbuf_vertex:Fl,map_fragment:Bl,map_pars_fragment:Hl,map_particle_fragment:Gl,map_particle_pars_fragment:Vl,metalnessmap_fragment:kl,metalnessmap_pars_fragment:Wl,morphinstance_vertex:zl,morphcolor_vertex:Xl,morphnormal_vertex:Yl,morphtarget_pars_vertex:Kl,morphtarget_vertex:ql,normal_fragment_begin:$l,normal_fragment_maps:Zl,normal_pars_fragment:jl,normal_pars_vertex:Ql,normal_vertex:Jl,normalmap_pars_fragment:ec,clearcoat_normal_fragment_begin:tc,clearcoat_normal_fragment_maps:nc,clearcoat_pars_fragment:ic,iridescence_pars_fragment:rc,opaque_fragment:ac,packing:oc,premultiplied_alpha_fragment:sc,project_vertex:lc,dithering_fragment:cc,dithering_pars_fragment:dc,roughnessmap_fragment:fc,roughnessmap_pars_fragment:uc,shadowmap_pars_fragment:pc,shadowmap_pars_vertex:hc,shadowmap_vertex:mc,shadowmask_pars_fragment:_c,skinbase_vertex:gc,skinning_pars_vertex:vc,skinning_vertex:Ec,skinnormal_vertex:Sc,specularmap_fragment:Mc,specularmap_pars_fragment:Tc,tonemapping_fragment:xc,tonemapping_pars_fragment:Ac,transmission_fragment:Rc,transmission_pars_fragment:bc,uv_pars_fragment:wc,uv_pars_vertex:Cc,uv_vertex:Pc,worldpos_vertex:Dc,background_vert:Lc,background_frag:yc,backgroundCube_vert:Uc,backgroundCube_frag:Ic,cube_vert:Nc,cube_frag:Oc,depth_vert:Fc,depth_frag:Bc,distanceRGBA_vert:Hc,distanceRGBA_frag:Gc,equirect_vert:Vc,equirect_frag:kc,linedashed_vert:Wc,linedashed_frag:zc,meshbasic_vert:Xc,meshbasic_frag:Yc,meshlambert_vert:Kc,meshlambert_frag:qc,meshmatcap_vert:$c,meshmatcap_frag:Zc,meshnormal_vert:jc,meshnormal_frag:Qc,meshphong_vert:Jc,meshphong_frag:ed,meshphysical_vert:td,meshphysical_frag:nd,meshtoon_vert:id,meshtoon_frag:rd,points_vert:ad,points_frag:od,shadow_vert:sd,shadow_frag:ld,sprite_vert:cd,sprite_frag:dd},re={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Rt={basic:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ze(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:mt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:mt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new ze(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:mt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:mt([re.points,re.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:mt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:mt([re.common,re.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:mt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:mt([re.sprite,re.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:mt([re.common,re.displacementmap,{referencePosition:{value:new le},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:mt([re.lights,re.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};Rt.physical={uniforms:mt([Rt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const vn={r:0,b:0,g:0},It=new Un,fd=new Mt;function ud(e,n,t,i,o,r,c){const l=new ze(0);let v=r===!0?0:1,E,b,T=null,M=0,x=null;function I(_){let g=_.isScene===!0?_.background:null;return g&&g.isTexture&&(g=(_.backgroundBlurriness>0?t:n).get(g)),g}function y(_){let g=!1;const D=I(_);D===null?a(l,v):D&&D.isColor&&(a(D,1),g=!0);const A=e.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,c):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(e.autoClear||g)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function f(_,g){const D=I(g);D&&(D.isCubeTexture||D.mapping===Bn)?(b===void 0&&(b=new ut(new Ci(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:vr(Rt.backgroundCube.uniforms),vertexShader:Rt.backgroundCube.vertexShader,fragmentShader:Rt.backgroundCube.fragmentShader,side:Tt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),b.geometry.deleteAttribute("normal"),b.geometry.deleteAttribute("uv"),b.onBeforeRender=function(A,P,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(b.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(b)),It.copy(g.backgroundRotation),It.x*=-1,It.y*=-1,It.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(It.y*=-1,It.z*=-1),b.material.uniforms.envMap.value=D,b.material.uniforms.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,b.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,b.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,b.material.uniforms.backgroundRotation.value.setFromMatrix4(fd.makeRotationFromEuler(It)),b.material.toneMapped=at.getTransfer(D.colorSpace)!==et,(T!==D||M!==D.version||x!==e.toneMapping)&&(b.material.needsUpdate=!0,T=D,M=D.version,x=e.toneMapping),b.layers.enableAll(),_.unshift(b,b.geometry,b.material,0,0,null)):D&&D.isTexture&&(E===void 0&&(E=new ut(new hn(2,2),new Lt({name:"BackgroundMaterial",uniforms:vr(Rt.background.uniforms),vertexShader:Rt.background.vertexShader,fragmentShader:Rt.background.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),E.geometry.deleteAttribute("normal"),Object.defineProperty(E.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(E)),E.material.uniforms.t2D.value=D,E.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,E.material.toneMapped=at.getTransfer(D.colorSpace)!==et,D.matrixAutoUpdate===!0&&D.updateMatrix(),E.material.uniforms.uvTransform.value.copy(D.matrix),(T!==D||M!==D.version||x!==e.toneMapping)&&(E.material.needsUpdate=!0,T=D,M=D.version,x=e.toneMapping),E.layers.enableAll(),_.unshift(E,E.geometry,E.material,0,0,null))}function a(_,g){_.getRGB(vn,Ca(e)),i.buffers.color.setClear(vn.r,vn.g,vn.b,g,c)}function S(){b!==void 0&&(b.geometry.dispose(),b.material.dispose(),b=void 0),E!==void 0&&(E.geometry.dispose(),E.material.dispose(),E=void 0)}return{getClearColor:function(){return l},setClearColor:function(_,g=1){l.set(_),v=g,a(l,v)},getClearAlpha:function(){return v},setClearAlpha:function(_){v=_,a(l,v)},render:y,addToRenderList:f,dispose:S}}function pd(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},o=M(null);let r=o,c=!1;function l(u,L,B,X,Y){let q=!1;const W=T(X,B,L);r!==W&&(r=W,E(r.object)),q=x(u,X,B,Y),q&&I(u,X,B,Y),Y!==null&&n.update(Y,e.ELEMENT_ARRAY_BUFFER),(q||c)&&(c=!1,g(u,L,B,X),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Y).buffer))}function v(){return e.createVertexArray()}function E(u){return e.bindVertexArray(u)}function b(u){return e.deleteVertexArray(u)}function T(u,L,B){const X=B.wireframe===!0;let Y=i[u.id];Y===void 0&&(Y={},i[u.id]=Y);let q=Y[L.id];q===void 0&&(q={},Y[L.id]=q);let W=q[X];return W===void 0&&(W=M(v()),q[X]=W),W}function M(u){const L=[],B=[],X=[];for(let Y=0;Y<t;Y++)L[Y]=0,B[Y]=0,X[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:X,object:u,attributes:{},index:null}}function x(u,L,B,X){const Y=r.attributes,q=L.attributes;let W=0;const te=B.getAttributes();for(const G in te)if(te[G].location>=0){const Ae=Y[G];let ye=q[G];if(ye===void 0&&(G==="instanceMatrix"&&u.instanceMatrix&&(ye=u.instanceMatrix),G==="instanceColor"&&u.instanceColor&&(ye=u.instanceColor)),Ae===void 0||Ae.attribute!==ye||ye&&Ae.data!==ye.data)return!0;W++}return r.attributesNum!==W||r.index!==X}function I(u,L,B,X){const Y={},q=L.attributes;let W=0;const te=B.getAttributes();for(const G in te)if(te[G].location>=0){let Ae=q[G];Ae===void 0&&(G==="instanceMatrix"&&u.instanceMatrix&&(Ae=u.instanceMatrix),G==="instanceColor"&&u.instanceColor&&(Ae=u.instanceColor));const ye={};ye.attribute=Ae,Ae&&Ae.data&&(ye.data=Ae.data),Y[G]=ye,W++}r.attributes=Y,r.attributesNum=W,r.index=X}function y(){const u=r.newAttributes;for(let L=0,B=u.length;L<B;L++)u[L]=0}function f(u){a(u,0)}function a(u,L){const B=r.newAttributes,X=r.enabledAttributes,Y=r.attributeDivisors;B[u]=1,X[u]===0&&(e.enableVertexAttribArray(u),X[u]=1),Y[u]!==L&&(e.vertexAttribDivisor(u,L),Y[u]=L)}function S(){const u=r.newAttributes,L=r.enabledAttributes;for(let B=0,X=L.length;B<X;B++)L[B]!==u[B]&&(e.disableVertexAttribArray(B),L[B]=0)}function _(u,L,B,X,Y,q,W){W===!0?e.vertexAttribIPointer(u,L,B,Y,q):e.vertexAttribPointer(u,L,B,X,Y,q)}function g(u,L,B,X){y();const Y=X.attributes,q=B.getAttributes(),W=L.defaultAttributeValues;for(const te in q){const G=q[te];if(G.location>=0){let me=Y[te];if(me===void 0&&(te==="instanceMatrix"&&u.instanceMatrix&&(me=u.instanceMatrix),te==="instanceColor"&&u.instanceColor&&(me=u.instanceColor)),me!==void 0){const Ae=me.normalized,ye=me.itemSize,Ge=n.get(me);if(Ge===void 0)continue;const Qe=Ge.buffer,$e=Ge.type,We=Ge.bytesPerElement,k=$e===e.INT||$e===e.UNSIGNED_INT||me.gpuType===xa;if(me.isInterleavedBufferAttribute){const $=me.data,de=$.stride,Ce=me.offset;if($.isInstancedInterleavedBuffer){for(let ve=0;ve<G.locationSize;ve++)a(G.location+ve,$.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ve=0;ve<G.locationSize;ve++)f(G.location+ve);e.bindBuffer(e.ARRAY_BUFFER,Qe);for(let ve=0;ve<G.locationSize;ve++)_(G.location+ve,ye/G.locationSize,$e,Ae,de*We,(Ce+ye/G.locationSize*ve)*We,k)}else{if(me.isInstancedBufferAttribute){for(let $=0;$<G.locationSize;$++)a(G.location+$,me.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let $=0;$<G.locationSize;$++)f(G.location+$);e.bindBuffer(e.ARRAY_BUFFER,Qe);for(let $=0;$<G.locationSize;$++)_(G.location+$,ye/G.locationSize,$e,Ae,ye*We,ye/G.locationSize*$*We,k)}}else if(W!==void 0){const Ae=W[te];if(Ae!==void 0)switch(Ae.length){case 2:e.vertexAttrib2fv(G.location,Ae);break;case 3:e.vertexAttrib3fv(G.location,Ae);break;case 4:e.vertexAttrib4fv(G.location,Ae);break;default:e.vertexAttrib1fv(G.location,Ae)}}}}S()}function D(){F();for(const u in i){const L=i[u];for(const B in L){const X=L[B];for(const Y in X)b(X[Y].object),delete X[Y];delete L[B]}delete i[u]}}function A(u){if(i[u.id]===void 0)return;const L=i[u.id];for(const B in L){const X=L[B];for(const Y in X)b(X[Y].object),delete X[Y];delete L[B]}delete i[u.id]}function P(u){for(const L in i){const B=i[L];if(B[u.id]===void 0)continue;const X=B[u.id];for(const Y in X)b(X[Y].object),delete X[Y];delete B[u.id]}}function F(){p(),c=!0,r!==o&&(r=o,E(r.object))}function p(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:l,reset:F,resetDefaultState:p,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:y,enableAttribute:f,disableUnusedAttributes:S}}function hd(e,n,t){let i;function o(E){i=E}function r(E,b){e.drawArrays(i,E,b),t.update(b,i,1)}function c(E,b,T){T!==0&&(e.drawArraysInstanced(i,E,b,T),t.update(b,i,T))}function l(E,b,T){if(T===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,E,0,b,0,T);let x=0;for(let I=0;I<T;I++)x+=b[I];t.update(x,i,1)}function v(E,b,T,M){if(T===0)return;const x=n.get("WEBGL_multi_draw");if(x===null)for(let I=0;I<E.length;I++)c(E[I],b[I],M[I]);else{x.multiDrawArraysInstancedWEBGL(i,E,0,b,0,M,0,T);let I=0;for(let y=0;y<T;y++)I+=b[y]*M[y];t.update(I,i,1)}}this.setMode=o,this.render=r,this.renderInstances=c,this.renderMultiDraw=l,this.renderMultiDrawInstances=v}function md(e,n,t,i){let o;function r(){if(o!==void 0)return o;if(n.has("EXT_texture_filter_anisotropic")===!0){const P=n.get("EXT_texture_filter_anisotropic");o=e.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function c(P){return!(P!==Ct&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(P){const F=P===On&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(P!==Vt&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Bt&&!F)}function v(P){if(P==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let E=t.precision!==void 0?t.precision:"highp";const b=v(E);b!==E&&(console.warn("THREE.WebGLRenderer:",E,"not supported, using",b,"instead."),E=b);const T=t.logarithmicDepthBuffer===!0,M=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),x=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),I=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),a=e.getParameter(e.MAX_VERTEX_ATTRIBS),S=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),g=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),D=I>0,A=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:v,textureFormatReadable:c,textureTypeReadable:l,precision:E,logarithmicDepthBuffer:T,reversedDepthBuffer:M,maxTextures:x,maxVertexTextures:I,maxTextureSize:y,maxCubemapSize:f,maxAttributes:a,maxVertexUniforms:S,maxVaryings:_,maxFragmentUniforms:g,vertexTextures:D,maxSamples:A}}function _d(e){const n=this;let t=null,i=0,o=!1,r=!1;const c=new bi,l=new He,v={value:null,needsUpdate:!1};this.uniform=v,this.numPlanes=0,this.numIntersection=0,this.init=function(T,M){const x=T.length!==0||M||i!==0||o;return o=M,i=T.length,x},this.beginShadows=function(){r=!0,b(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(T,M){t=b(T,M,0)},this.setState=function(T,M,x){const I=T.clippingPlanes,y=T.clipIntersection,f=T.clipShadows,a=e.get(T);if(!o||I===null||I.length===0||r&&!f)r?b(null):E();else{const S=r?0:i,_=S*4;let g=a.clippingState||null;v.value=g,g=b(I,M,_,x);for(let D=0;D!==_;++D)g[D]=t[D];a.clippingState=g,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function E(){v.value!==t&&(v.value=t,v.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function b(T,M,x,I){const y=T!==null?T.length:0;let f=null;if(y!==0){if(f=v.value,I!==!0||f===null){const a=x+y*4,S=M.matrixWorldInverse;l.getNormalMatrix(S),(f===null||f.length<a)&&(f=new Float32Array(a));for(let _=0,g=x;_!==y;++_,g+=4)c.copy(T[_]).applyMatrix4(S,l),c.normal.toArray(f,g),f[g+3]=c.constant}v.value=f,v.needsUpdate=!0}return n.numPlanes=y,n.numIntersection=0,f}}function gd(e){let n=new WeakMap;function t(c,l){return l===Ei?c.mapping=un:l===Si&&(c.mapping=Qt),c}function i(c){if(c&&c.isTexture){const l=c.mapping;if(l===Ei||l===Si)if(n.has(c)){const v=n.get(c).texture;return t(v,c.mapping)}else{const v=c.image;if(v&&v.height>0){const E=new $o(v.height);return E.fromEquirectangularTexture(e,c),n.set(c,E),c.addEventListener("dispose",o),t(E.texture,c.mapping)}else return null}}return c}function o(c){const l=c.target;l.removeEventListener("dispose",o);const v=n.get(l);v!==void 0&&(n.delete(l),v.dispose())}function r(){n=new WeakMap}return{get:i,dispose:r}}const qt=4,br=[.125,.215,.35,.446,.526,.582],Ft=20,Zn=new Da,wr=new ze;let jn=null,Qn=0,Jn=0,ei=!1;const Ot=(1+Math.sqrt(5))/2,Wt=1/Ot,Cr=[new le(-Ot,Wt,0),new le(Ot,Wt,0),new le(-Wt,0,Ot),new le(Wt,0,Ot),new le(0,Ot,-Wt),new le(0,Ot,Wt),new le(-1,1,-1),new le(1,1,-1),new le(-1,1,1),new le(1,1,1)],vd=new le;class Pr{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,o=100,r={}){const{size:c=256,position:l=vd}=r;jn=this._renderer.getRenderTarget(),Qn=this._renderer.getActiveCubeFace(),Jn=this._renderer.getActiveMipmapLevel(),ei=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(c);const v=this._allocateTargets();return v.depthBuffer=!0,this._sceneToCubeUV(n,i,o,v,l),t>0&&this._blur(v,0,0,t),this._applyPMREM(v),this._cleanup(v),v}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(jn,Qn,Jn),this._renderer.xr.enabled=ei,n.scissorTest=!1,En(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===un||n.mapping===Qt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),jn=this._renderer.getRenderTarget(),Qn=this._renderer.getActiveCubeFace(),Jn=this._renderer.getActiveMipmapLevel(),ei=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:On,format:Ct,colorSpace:Fn,depthBuffer:!1},o=Dr(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dr(n,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ed(r)),this._blurMaterial=Sd(r,n,t)}return o}_compileMaterial(n){const t=new ut(this._lodPlanes[0],n);this._renderer.compile(t,Zn)}_sceneToCubeUV(n,t,i,o,r){const v=new $t(90,1,t,i),E=[1,-1,1,1,1,1],b=[1,1,1,-1,-1,-1],T=this._renderer,M=T.autoClear,x=T.toneMapping;T.getClearColor(wr),T.toneMapping=Pt,T.autoClear=!1,T.state.buffers.depth.getReversed()&&(T.setRenderTarget(o),T.clearDepth(),T.setRenderTarget(null));const y=new Pi({name:"PMREM.Background",side:Tt,depthWrite:!1,depthTest:!1}),f=new ut(new Ci,y);let a=!1;const S=n.background;S?S.isColor&&(y.color.copy(S),n.background=null,a=!0):(y.color.copy(wr),a=!0);for(let _=0;_<6;_++){const g=_%3;g===0?(v.up.set(0,E[_],0),v.position.set(r.x,r.y,r.z),v.lookAt(r.x+b[_],r.y,r.z)):g===1?(v.up.set(0,0,E[_]),v.position.set(r.x,r.y,r.z),v.lookAt(r.x,r.y+b[_],r.z)):(v.up.set(0,E[_],0),v.position.set(r.x,r.y,r.z),v.lookAt(r.x,r.y,r.z+b[_]));const D=this._cubeSize;En(o,g*D,_>2?D:0,D,D),T.setRenderTarget(o),a&&T.render(f,v),T.render(n,v)}f.geometry.dispose(),f.material.dispose(),T.toneMapping=x,T.autoClear=M,n.background=S}_textureToCubeUV(n,t){const i=this._renderer,o=n.mapping===un||n.mapping===Qt;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=yr()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lr());const r=o?this._cubemapMaterial:this._equirectMaterial,c=new ut(this._lodPlanes[0],r),l=r.uniforms;l.envMap.value=n;const v=this._cubeSize;En(t,0,0,3*v,2*v),i.setRenderTarget(t),i.render(c,Zn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const o=this._lodPlanes.length;for(let r=1;r<o;r++){const c=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=Cr[(o-r-1)%Cr.length];this._blur(n,r-1,r,c,l)}t.autoClear=i}_blur(n,t,i,o,r){const c=this._pingPongRenderTarget;this._halfBlur(n,c,t,i,o,"latitudinal",r),this._halfBlur(c,n,i,i,o,"longitudinal",r)}_halfBlur(n,t,i,o,r,c,l){const v=this._renderer,E=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const b=3,T=new ut(this._lodPlanes[o],E),M=E.uniforms,x=this._sizeLods[i]-1,I=isFinite(r)?Math.PI/(2*x):2*Math.PI/(2*Ft-1),y=r/I,f=isFinite(r)?1+Math.floor(b*y):Ft;f>Ft&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Ft}`);const a=[];let S=0;for(let P=0;P<Ft;++P){const F=P/y,p=Math.exp(-F*F/2);a.push(p),P===0?S+=p:P<f&&(S+=2*p)}for(let P=0;P<a.length;P++)a[P]=a[P]/S;M.envMap.value=n.texture,M.samples.value=f,M.weights.value=a,M.latitudinal.value=c==="latitudinal",l&&(M.poleAxis.value=l);const{_lodMax:_}=this;M.dTheta.value=I,M.mipInt.value=_-i;const g=this._sizeLods[o],D=3*g*(o>_-qt?o-_+qt:0),A=4*(this._cubeSize-g);En(t,D,A,3*g,2*g),v.setRenderTarget(t),v.render(T,Zn)}}function Ed(e){const n=[],t=[],i=[];let o=e;const r=e-qt+1+br.length;for(let c=0;c<r;c++){const l=Math.pow(2,o);t.push(l);let v=1/l;c>e-qt?v=br[c-e+qt-1]:c===0&&(v=0),i.push(v);const E=1/(l-2),b=-E,T=1+E,M=[b,b,T,b,T,T,b,b,T,T,b,T],x=6,I=6,y=3,f=2,a=1,S=new Float32Array(y*I*x),_=new Float32Array(f*I*x),g=new Float32Array(a*I*x);for(let A=0;A<x;A++){const P=A%3*2/3-1,F=A>2?0:-1,p=[P,F,0,P+2/3,F,0,P+2/3,F+1,0,P,F,0,P+2/3,F+1,0,P,F+1,0];S.set(p,y*I*A),_.set(M,f*I*A);const u=[A,A,A,A,A,A];g.set(u,a*I*A)}const D=new wi;D.setAttribute("position",new ln(S,y)),D.setAttribute("uv",new ln(_,f)),D.setAttribute("faceIndex",new ln(g,a)),n.push(D),o>qt&&o--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function Dr(e,n,t){const i=new jt(e,n,t);return i.texture.mapping=Bn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function En(e,n,t,i,o){e.viewport.set(n,t,i,o),e.scissor.set(n,t,i,o)}function Sd(e,n,t){const i=new Float32Array(Ft),o=new le(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:Ft,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Di(),fragmentShader:`

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
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function Lr(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Di(),fragmentShader:`

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
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function yr(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Di(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function Di(){return`

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
	`}function Md(e){let n=new WeakMap,t=null;function i(l){if(l&&l.isTexture){const v=l.mapping,E=v===Ei||v===Si,b=v===un||v===Qt;if(E||b){let T=n.get(l);const M=T!==void 0?T.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==M)return t===null&&(t=new Pr(e)),T=E?t.fromEquirectangular(l,T):t.fromCubemap(l,T),T.texture.pmremVersion=l.pmremVersion,n.set(l,T),T.texture;if(T!==void 0)return T.texture;{const x=l.image;return E&&x&&x.height>0||b&&x&&o(x)?(t===null&&(t=new Pr(e)),T=E?t.fromEquirectangular(l):t.fromCubemap(l),T.texture.pmremVersion=l.pmremVersion,n.set(l,T),l.addEventListener("dispose",r),T.texture):null}}}return l}function o(l){let v=0;const E=6;for(let b=0;b<E;b++)l[b]!==void 0&&v++;return v===E}function r(l){const v=l.target;v.removeEventListener("dispose",r);const E=n.get(v);E!==void 0&&(n.delete(v),E.dispose())}function c(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:c}}function Td(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let o;switch(i){case"WEBGL_depth_texture":o=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=e.getExtension(i)}return n[i]=o,o}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const o=t(i);return o===null&&fi("THREE.WebGLRenderer: "+i+" extension not supported."),o}}}function xd(e,n,t,i){const o={},r=new WeakMap;function c(T){const M=T.target;M.index!==null&&n.remove(M.index);for(const I in M.attributes)n.remove(M.attributes[I]);M.removeEventListener("dispose",c),delete o[M.id];const x=r.get(M);x&&(n.remove(x),r.delete(M)),i.releaseStatesOfGeometry(M),M.isInstancedBufferGeometry===!0&&delete M._maxInstanceCount,t.memory.geometries--}function l(T,M){return o[M.id]===!0||(M.addEventListener("dispose",c),o[M.id]=!0,t.memory.geometries++),M}function v(T){const M=T.attributes;for(const x in M)n.update(M[x],e.ARRAY_BUFFER)}function E(T){const M=[],x=T.index,I=T.attributes.position;let y=0;if(x!==null){const S=x.array;y=x.version;for(let _=0,g=S.length;_<g;_+=3){const D=S[_+0],A=S[_+1],P=S[_+2];M.push(D,A,A,P,P,D)}}else if(I!==void 0){const S=I.array;y=I.version;for(let _=0,g=S.length/3-1;_<g;_+=3){const D=_+0,A=_+1,P=_+2;M.push(D,A,A,P,P,D)}}else return;const f=new(ts(M)?Jo:es)(M,1);f.version=y;const a=r.get(T);a&&n.remove(a),r.set(T,f)}function b(T){const M=r.get(T);if(M){const x=T.index;x!==null&&M.version<x.version&&E(T)}else E(T);return r.get(T)}return{get:l,update:v,getWireframeAttribute:b}}function Ad(e,n,t){let i;function o(M){i=M}let r,c;function l(M){r=M.type,c=M.bytesPerElement}function v(M,x){e.drawElements(i,x,r,M*c),t.update(x,i,1)}function E(M,x,I){I!==0&&(e.drawElementsInstanced(i,x,r,M*c,I),t.update(x,i,I))}function b(M,x,I){if(I===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,x,0,r,M,0,I);let f=0;for(let a=0;a<I;a++)f+=x[a];t.update(f,i,1)}function T(M,x,I,y){if(I===0)return;const f=n.get("WEBGL_multi_draw");if(f===null)for(let a=0;a<M.length;a++)E(M[a]/c,x[a],y[a]);else{f.multiDrawElementsInstancedWEBGL(i,x,0,r,M,0,y,0,I);let a=0;for(let S=0;S<I;S++)a+=x[S]*y[S];t.update(a,i,1)}}this.setMode=o,this.setIndex=l,this.render=v,this.renderInstances=E,this.renderMultiDraw=b,this.renderMultiDrawInstances=T}function Rd(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,c,l){switch(t.calls++,c){case e.TRIANGLES:t.triangles+=l*(r/3);break;case e.LINES:t.lines+=l*(r/2);break;case e.LINE_STRIP:t.lines+=l*(r-1);break;case e.LINE_LOOP:t.lines+=l*r;break;case e.POINTS:t.points+=l*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:o,update:i}}function bd(e,n,t){const i=new WeakMap,o=new dt;function r(c,l,v){const E=c.morphTargetInfluences,b=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,T=b!==void 0?b.length:0;let M=i.get(l);if(M===void 0||M.count!==T){let p=function(){P.dispose(),i.delete(l),l.removeEventListener("dispose",p)};M!==void 0&&M.texture.dispose();const x=l.morphAttributes.position!==void 0,I=l.morphAttributes.normal!==void 0,y=l.morphAttributes.color!==void 0,f=l.morphAttributes.position||[],a=l.morphAttributes.normal||[],S=l.morphAttributes.color||[];let _=0;x===!0&&(_=1),I===!0&&(_=2),y===!0&&(_=3);let g=l.attributes.position.count*_,D=1;g>n.maxTextureSize&&(D=Math.ceil(g/n.maxTextureSize),g=n.maxTextureSize);const A=new Float32Array(g*D*4*T),P=new wa(A,g,D,T);P.type=Bt,P.needsUpdate=!0;const F=_*4;for(let u=0;u<T;u++){const L=f[u],B=a[u],X=S[u],Y=g*D*4*u;for(let q=0;q<L.count;q++){const W=q*F;x===!0&&(o.fromBufferAttribute(L,q),A[Y+W+0]=o.x,A[Y+W+1]=o.y,A[Y+W+2]=o.z,A[Y+W+3]=0),I===!0&&(o.fromBufferAttribute(B,q),A[Y+W+4]=o.x,A[Y+W+5]=o.y,A[Y+W+6]=o.z,A[Y+W+7]=0),y===!0&&(o.fromBufferAttribute(X,q),A[Y+W+8]=o.x,A[Y+W+9]=o.y,A[Y+W+10]=o.z,A[Y+W+11]=X.itemSize===4?o.w:1)}}M={count:T,texture:P,size:new Ye(g,D)},i.set(l,M),l.addEventListener("dispose",p)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)v.getUniforms().setValue(e,"morphTexture",c.morphTexture,t);else{let x=0;for(let y=0;y<E.length;y++)x+=E[y];const I=l.morphTargetsRelative?1:1-x;v.getUniforms().setValue(e,"morphTargetBaseInfluence",I),v.getUniforms().setValue(e,"morphTargetInfluences",E)}v.getUniforms().setValue(e,"morphTargetsTexture",M.texture,t),v.getUniforms().setValue(e,"morphTargetsTextureSize",M.size)}return{update:r}}function wd(e,n,t,i){let o=new WeakMap;function r(v){const E=i.render.frame,b=v.geometry,T=n.get(v,b);if(o.get(T)!==E&&(n.update(T),o.set(T,E)),v.isInstancedMesh&&(v.hasEventListener("dispose",l)===!1&&v.addEventListener("dispose",l),o.get(v)!==E&&(t.update(v.instanceMatrix,e.ARRAY_BUFFER),v.instanceColor!==null&&t.update(v.instanceColor,e.ARRAY_BUFFER),o.set(v,E))),v.isSkinnedMesh){const M=v.skeleton;o.get(M)!==E&&(M.update(),o.set(M,E))}return T}function c(){o=new WeakMap}function l(v){const E=v.target;E.removeEventListener("dispose",l),t.remove(E.instanceMatrix),E.instanceColor!==null&&t.remove(E.instanceColor)}return{update:r,dispose:c}}const Oa=new ps,Ur=new ga(1,1),Fa=new wa,Ba=new us,Ha=new fs,Ir=[],Nr=[],Or=new Float32Array(16),Fr=new Float32Array(9),Br=new Float32Array(4);function en(e,n,t){const i=e[0];if(i<=0||i>0)return e;const o=n*t;let r=Ir[o];if(r===void 0&&(r=new Float32Array(o),Ir[o]=r),n!==0){i.toArray(r,0);for(let c=1,l=0;c!==n;++c)l+=t,e[c].toArray(r,l)}return r}function st(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function lt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Hn(e,n){let t=Nr[n];t===void 0&&(t=new Int32Array(n),Nr[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Cd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Pd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2fv(this.addr,n),lt(t,n)}}function Dd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(st(t,n))return;e.uniform3fv(this.addr,n),lt(t,n)}}function Ld(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4fv(this.addr,n),lt(t,n)}}function yd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Br.set(i),e.uniformMatrix2fv(this.addr,!1,Br),lt(t,i)}}function Ud(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Fr.set(i),e.uniformMatrix3fv(this.addr,!1,Fr),lt(t,i)}}function Id(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Or.set(i),e.uniformMatrix4fv(this.addr,!1,Or),lt(t,i)}}function Nd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Od(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2iv(this.addr,n),lt(t,n)}}function Fd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3iv(this.addr,n),lt(t,n)}}function Bd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4iv(this.addr,n),lt(t,n)}}function Hd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Gd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2uiv(this.addr,n),lt(t,n)}}function Vd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3uiv(this.addr,n),lt(t,n)}}function kd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4uiv(this.addr,n),lt(t,n)}}function Wd(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o);let r;this.type===e.SAMPLER_2D_SHADOW?(Ur.compareFunction=va,r=Ur):r=Oa,t.setTexture2D(n||r,o)}function zd(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o),t.setTexture3D(n||Ba,o)}function Xd(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o),t.setTextureCube(n||Ha,o)}function Yd(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o),t.setTexture2DArray(n||Fa,o)}function Kd(e){switch(e){case 5126:return Cd;case 35664:return Pd;case 35665:return Dd;case 35666:return Ld;case 35674:return yd;case 35675:return Ud;case 35676:return Id;case 5124:case 35670:return Nd;case 35667:case 35671:return Od;case 35668:case 35672:return Fd;case 35669:case 35673:return Bd;case 5125:return Hd;case 36294:return Gd;case 36295:return Vd;case 36296:return kd;case 35678:case 36198:case 36298:case 36306:case 35682:return Wd;case 35679:case 36299:case 36307:return zd;case 35680:case 36300:case 36308:case 36293:return Xd;case 36289:case 36303:case 36311:case 36292:return Yd}}function qd(e,n){e.uniform1fv(this.addr,n)}function $d(e,n){const t=en(n,this.size,2);e.uniform2fv(this.addr,t)}function Zd(e,n){const t=en(n,this.size,3);e.uniform3fv(this.addr,t)}function jd(e,n){const t=en(n,this.size,4);e.uniform4fv(this.addr,t)}function Qd(e,n){const t=en(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Jd(e,n){const t=en(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function ef(e,n){const t=en(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function tf(e,n){e.uniform1iv(this.addr,n)}function nf(e,n){e.uniform2iv(this.addr,n)}function rf(e,n){e.uniform3iv(this.addr,n)}function af(e,n){e.uniform4iv(this.addr,n)}function of(e,n){e.uniform1uiv(this.addr,n)}function sf(e,n){e.uniform2uiv(this.addr,n)}function lf(e,n){e.uniform3uiv(this.addr,n)}function cf(e,n){e.uniform4uiv(this.addr,n)}function df(e,n,t){const i=this.cache,o=n.length,r=Hn(t,o);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let c=0;c!==o;++c)t.setTexture2D(n[c]||Oa,r[c])}function ff(e,n,t){const i=this.cache,o=n.length,r=Hn(t,o);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let c=0;c!==o;++c)t.setTexture3D(n[c]||Ba,r[c])}function uf(e,n,t){const i=this.cache,o=n.length,r=Hn(t,o);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let c=0;c!==o;++c)t.setTextureCube(n[c]||Ha,r[c])}function pf(e,n,t){const i=this.cache,o=n.length,r=Hn(t,o);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let c=0;c!==o;++c)t.setTexture2DArray(n[c]||Fa,r[c])}function hf(e){switch(e){case 5126:return qd;case 35664:return $d;case 35665:return Zd;case 35666:return jd;case 35674:return Qd;case 35675:return Jd;case 35676:return ef;case 5124:case 35670:return tf;case 35667:case 35671:return nf;case 35668:case 35672:return rf;case 35669:case 35673:return af;case 5125:return of;case 36294:return sf;case 36295:return lf;case 36296:return cf;case 35678:case 36198:case 36298:case 36306:case 35682:return df;case 35679:case 36299:case 36307:return ff;case 35680:case 36300:case 36308:case 36293:return uf;case 36289:case 36303:case 36311:case 36292:return pf}}class mf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Kd(t.type)}}class _f{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hf(t.type)}}class gf{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const o=this.seq;for(let r=0,c=o.length;r!==c;++r){const l=o[r];l.setValue(n,t[l.id],i)}}}const ti=/(\w+)(\])?(\[|\.)?/g;function Hr(e,n){e.seq.push(n),e.map[n.id]=n}function vf(e,n,t){const i=e.name,o=i.length;for(ti.lastIndex=0;;){const r=ti.exec(i),c=ti.lastIndex;let l=r[1];const v=r[2]==="]",E=r[3];if(v&&(l=l|0),E===void 0||E==="["&&c+2===o){Hr(t,E===void 0?new mf(l,e,n):new _f(l,e,n));break}else{let T=t.map[l];T===void 0&&(T=new gf(l),Hr(t,T)),t=T}}}class Cn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const r=n.getActiveUniform(t,o),c=n.getUniformLocation(t,r.name);vf(r,c,this)}}setValue(n,t,i,o){const r=this.map[t];r!==void 0&&r.setValue(n,i,o)}setOptional(n,t,i){const o=t[i];o!==void 0&&this.setValue(n,i,o)}static upload(n,t,i,o){for(let r=0,c=t.length;r!==c;++r){const l=t[r],v=i[l.id];v.needsUpdate!==!1&&l.setValue(n,v.value,o)}}static seqWithValue(n,t){const i=[];for(let o=0,r=n.length;o!==r;++o){const c=n[o];c.id in t&&i.push(c)}return i}}function Gr(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const Ef=37297;let Sf=0;function Mf(e,n){const t=e.split(`
`),i=[],o=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let c=o;c<r;c++){const l=c+1;i.push(`${l===n?">":" "} ${l}: ${t[c]}`)}return i.join(`
`)}const Vr=new He;function Tf(e){at._getMatrix(Vr,at.workingColorSpace,e);const n=`mat3( ${Vr.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(e)){case Pa:return[n,"LinearTransferOETF"];case et:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function kr(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const c=/ERROR: 0:(\d+)/.exec(r);if(c){const l=parseInt(c[1]);return t.toUpperCase()+`

`+r+`

`+Mf(e.getShaderSource(n),l)}else return r}function xf(e,n){const t=Tf(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Af(e,n){let t;switch(n){case ds:t="Linear";break;case cs:t="Reinhard";break;case ls:t="Cineon";break;case ss:t="ACESFilmic";break;case os:t="AgX";break;case as:t="Neutral";break;case rs:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sn=new le;function Rf(){at.getLuminanceCoefficients(Sn);const e=Sn.x.toFixed(4),n=Sn.y.toFixed(4),t=Sn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bf(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(an).join(`
`)}function wf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Cf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let o=0;o<i;o++){const r=e.getActiveAttrib(n,o),c=r.name;let l=1;r.type===e.FLOAT_MAT2&&(l=2),r.type===e.FLOAT_MAT3&&(l=3),r.type===e.FLOAT_MAT4&&(l=4),t[c]={type:r.type,location:e.getAttribLocation(n,c),locationSize:l}}return t}function an(e){return e!==""}function Wr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function zr(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Pf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mi(e){return e.replace(Pf,Lf)}const Df=new Map;function Lf(e,n){let t=Fe[n];if(t===void 0){const i=Df.get(n);if(i!==void 0)t=Fe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return Mi(t)}const yf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xr(e){return e.replace(yf,Uf)}function Uf(e,n,t,i){let o="";for(let r=parseInt(n);r<parseInt(t);r++)o+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return o}function Yr(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}function If(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Ea?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===is?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===wt&&(n="SHADOWMAP_TYPE_VSM"),n}function Nf(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case un:case Qt:n="ENVMAP_TYPE_CUBE";break;case Bn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Of(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===Qt&&(n="ENVMAP_MODE_REFRACTION"),n}function Ff(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case gs:n="ENVMAP_BLENDING_MULTIPLY";break;case _s:n="ENVMAP_BLENDING_MIX";break;case ms:n="ENVMAP_BLENDING_ADD";break}return n}function Bf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Hf(e,n,t,i){const o=e.getContext(),r=t.defines;let c=t.vertexShader,l=t.fragmentShader;const v=If(t),E=Nf(t),b=Of(t),T=Ff(t),M=Bf(t),x=bf(t),I=wf(r),y=o.createProgram();let f,a,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,I].filter(an).join(`
`),f.length>0&&(f+=`
`),a=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,I].filter(an).join(`
`),a.length>0&&(a+=`
`)):(f=[Yr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,I,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+b:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+v:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(an).join(`
`),a=[Yr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,I,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+E:"",t.envMap?"#define "+b:"",t.envMap?"#define "+T:"",M?"#define CUBEUV_TEXEL_WIDTH "+M.texelWidth:"",M?"#define CUBEUV_TEXEL_HEIGHT "+M.texelHeight:"",M?"#define CUBEUV_MAX_MIP "+M.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+v:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pt?"#define TONE_MAPPING":"",t.toneMapping!==Pt?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Pt?Af("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,xf("linearToOutputTexel",t.outputColorSpace),Rf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(an).join(`
`)),c=Mi(c),c=Wr(c,t),c=zr(c,t),l=Mi(l),l=Wr(l,t),l=zr(l,t),c=Xr(c),l=Xr(l),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,f=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,a=["#define varying in",t.glslVersion===Sr?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+a);const _=S+f+c,g=S+a+l,D=Gr(o,o.VERTEX_SHADER,_),A=Gr(o,o.FRAGMENT_SHADER,g);o.attachShader(y,D),o.attachShader(y,A),t.index0AttributeName!==void 0?o.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(y,0,"position"),o.linkProgram(y);function P(L){if(e.debug.checkShaderErrors){const B=o.getProgramInfoLog(y)||"",X=o.getShaderInfoLog(D)||"",Y=o.getShaderInfoLog(A)||"",q=B.trim(),W=X.trim(),te=Y.trim();let G=!0,me=!0;if(o.getProgramParameter(y,o.LINK_STATUS)===!1)if(G=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(o,y,D,A);else{const Ae=kr(o,D,"vertex"),ye=kr(o,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(y,o.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+q+`
`+Ae+`
`+ye)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(W===""||te==="")&&(me=!1);me&&(L.diagnostics={runnable:G,programLog:q,vertexShader:{log:W,prefix:f},fragmentShader:{log:te,prefix:a}})}o.deleteShader(D),o.deleteShader(A),F=new Cn(o,y),p=Cf(o,y)}let F;this.getUniforms=function(){return F===void 0&&P(this),F};let p;this.getAttributes=function(){return p===void 0&&P(this),p};let u=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return u===!1&&(u=o.getProgramParameter(y,Ef)),u},this.destroy=function(){i.releaseStatesOfProgram(this),o.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sf++,this.cacheKey=n,this.usedTimes=1,this.program=y,this.vertexShader=D,this.fragmentShader=A,this}let Gf=0;class Vf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,o=this._getShaderStage(t),r=this._getShaderStage(i),c=this._getShaderCacheForMaterial(n);return c.has(o)===!1&&(c.add(o),o.usedTimes++),c.has(r)===!1&&(c.add(r),r.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new kf(n),t.set(n,i)),i}}class kf{constructor(n){this.id=Gf++,this.code=n,this.usedTimes=0}}function Wf(e,n,t,i,o,r,c){const l=new ns,v=new Vf,E=new Set,b=[],T=o.logarithmicDepthBuffer,M=o.vertexTextures;let x=o.precision;const I={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(p){return E.add(p),p===0?"uv":`uv${p}`}function f(p,u,L,B,X){const Y=B.fog,q=X.geometry,W=p.isMeshStandardMaterial?B.environment:null,te=(p.isMeshStandardMaterial?t:n).get(p.envMap||W),G=te&&te.mapping===Bn?te.image.height:null,me=I[p.type];p.precision!==null&&(x=o.getMaxPrecision(p.precision),x!==p.precision&&console.warn("THREE.WebGLProgram.getParameters:",p.precision,"not supported, using",x,"instead."));const Ae=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ye=Ae!==void 0?Ae.length:0;let Ge=0;q.morphAttributes.position!==void 0&&(Ge=1),q.morphAttributes.normal!==void 0&&(Ge=2),q.morphAttributes.color!==void 0&&(Ge=3);let Qe,$e,We,k;if(me){const ke=Rt[me];Qe=ke.vertexShader,$e=ke.fragmentShader}else Qe=p.vertexShader,$e=p.fragmentShader,v.update(p),We=v.getVertexShaderID(p),k=v.getFragmentShaderID(p);const $=e.getRenderTarget(),de=e.state.buffers.depth.getReversed(),Ce=X.isInstancedMesh===!0,ve=X.isBatchedMesh===!0,K=!!p.map,Se=!!p.matcap,m=!!te,Ie=!!p.aoMap,we=!!p.lightMap,_e=!!p.bumpMap,fe=!!p.normalMap,Ze=!!p.displacementMap,ge=!!p.emissiveMap,Oe=!!p.metalnessMap,ct=!!p.roughnessMap,rt=p.anisotropy>0,h=p.clearcoat>0,s=p.dispersion>0,U=p.iridescence>0,V=p.sheen>0,Z=p.transmission>0,H=rt&&!!p.anisotropyMap,xe=h&&!!p.clearcoatMap,ne=h&&!!p.clearcoatNormalMap,Ee=h&&!!p.clearcoatRoughnessMap,Me=U&&!!p.iridescenceMap,J=U&&!!p.iridescenceThicknessMap,se=V&&!!p.sheenColorMap,De=V&&!!p.sheenRoughnessMap,Te=!!p.specularMap,ae=!!p.specularColorMap,Ne=!!p.specularIntensityMap,R=Z&&!!p.transmissionMap,ee=Z&&!!p.thicknessMap,ie=!!p.gradientMap,ue=!!p.alphaMap,j=p.alphaTest>0,z=!!p.alphaHash,he=!!p.extensions;let Ue=Pt;p.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ue=e.toneMapping);const je={shaderID:me,shaderType:p.type,shaderName:p.name,vertexShader:Qe,fragmentShader:$e,defines:p.defines,customVertexShaderID:We,customFragmentShaderID:k,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:x,batching:ve,batchingColor:ve&&X._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&X.instanceColor!==null,instancingMorph:Ce&&X.morphTexture!==null,supportsVertexTextures:M,outputColorSpace:$===null?e.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Fn,alphaToCoverage:!!p.alphaToCoverage,map:K,matcap:Se,envMap:m,envMapMode:m&&te.mapping,envMapCubeUVHeight:G,aoMap:Ie,lightMap:we,bumpMap:_e,normalMap:fe,displacementMap:M&&Ze,emissiveMap:ge,normalMapObjectSpace:fe&&p.normalMapType===Qo,normalMapTangentSpace:fe&&p.normalMapType===jo,metalnessMap:Oe,roughnessMap:ct,anisotropy:rt,anisotropyMap:H,clearcoat:h,clearcoatMap:xe,clearcoatNormalMap:ne,clearcoatRoughnessMap:Ee,dispersion:s,iridescence:U,iridescenceMap:Me,iridescenceThicknessMap:J,sheen:V,sheenColorMap:se,sheenRoughnessMap:De,specularMap:Te,specularColorMap:ae,specularIntensityMap:Ne,transmission:Z,transmissionMap:R,thicknessMap:ee,gradientMap:ie,opaque:p.transparent===!1&&p.blending===wn&&p.alphaToCoverage===!1,alphaMap:ue,alphaTest:j,alphaHash:z,combine:p.combine,mapUv:K&&y(p.map.channel),aoMapUv:Ie&&y(p.aoMap.channel),lightMapUv:we&&y(p.lightMap.channel),bumpMapUv:_e&&y(p.bumpMap.channel),normalMapUv:fe&&y(p.normalMap.channel),displacementMapUv:Ze&&y(p.displacementMap.channel),emissiveMapUv:ge&&y(p.emissiveMap.channel),metalnessMapUv:Oe&&y(p.metalnessMap.channel),roughnessMapUv:ct&&y(p.roughnessMap.channel),anisotropyMapUv:H&&y(p.anisotropyMap.channel),clearcoatMapUv:xe&&y(p.clearcoatMap.channel),clearcoatNormalMapUv:ne&&y(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&y(p.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&y(p.iridescenceMap.channel),iridescenceThicknessMapUv:J&&y(p.iridescenceThicknessMap.channel),sheenColorMapUv:se&&y(p.sheenColorMap.channel),sheenRoughnessMapUv:De&&y(p.sheenRoughnessMap.channel),specularMapUv:Te&&y(p.specularMap.channel),specularColorMapUv:ae&&y(p.specularColorMap.channel),specularIntensityMapUv:Ne&&y(p.specularIntensityMap.channel),transmissionMapUv:R&&y(p.transmissionMap.channel),thicknessMapUv:ee&&y(p.thicknessMap.channel),alphaMapUv:ue&&y(p.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(fe||rt),vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!q.attributes.uv&&(K||ue),fog:!!Y,useFog:p.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:p.flatShading===!0&&p.wireframe===!1,sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:T,reversedDepthBuffer:de,skinning:X.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Ge,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numSpotLightMaps:u.spotLightMap.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numSpotLightShadowsWithMaps:u.numSpotLightShadowsWithMaps,numLightProbes:u.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:p.dithering,shadowMapEnabled:e.shadowMap.enabled&&L.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ue,decodeVideoTexture:K&&p.map.isVideoTexture===!0&&at.getTransfer(p.map.colorSpace)===et,decodeVideoTextureEmissive:ge&&p.emissiveMap.isVideoTexture===!0&&at.getTransfer(p.emissiveMap.colorSpace)===et,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===xt,flipSided:p.side===Tt,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:he&&p.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&p.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return je.vertexUv1s=E.has(1),je.vertexUv2s=E.has(2),je.vertexUv3s=E.has(3),E.clear(),je}function a(p){const u=[];if(p.shaderID?u.push(p.shaderID):(u.push(p.customVertexShaderID),u.push(p.customFragmentShaderID)),p.defines!==void 0)for(const L in p.defines)u.push(L),u.push(p.defines[L]);return p.isRawShaderMaterial===!1&&(S(u,p),_(u,p),u.push(e.outputColorSpace)),u.push(p.customProgramCacheKey),u.join()}function S(p,u){p.push(u.precision),p.push(u.outputColorSpace),p.push(u.envMapMode),p.push(u.envMapCubeUVHeight),p.push(u.mapUv),p.push(u.alphaMapUv),p.push(u.lightMapUv),p.push(u.aoMapUv),p.push(u.bumpMapUv),p.push(u.normalMapUv),p.push(u.displacementMapUv),p.push(u.emissiveMapUv),p.push(u.metalnessMapUv),p.push(u.roughnessMapUv),p.push(u.anisotropyMapUv),p.push(u.clearcoatMapUv),p.push(u.clearcoatNormalMapUv),p.push(u.clearcoatRoughnessMapUv),p.push(u.iridescenceMapUv),p.push(u.iridescenceThicknessMapUv),p.push(u.sheenColorMapUv),p.push(u.sheenRoughnessMapUv),p.push(u.specularMapUv),p.push(u.specularColorMapUv),p.push(u.specularIntensityMapUv),p.push(u.transmissionMapUv),p.push(u.thicknessMapUv),p.push(u.combine),p.push(u.fogExp2),p.push(u.sizeAttenuation),p.push(u.morphTargetsCount),p.push(u.morphAttributeCount),p.push(u.numDirLights),p.push(u.numPointLights),p.push(u.numSpotLights),p.push(u.numSpotLightMaps),p.push(u.numHemiLights),p.push(u.numRectAreaLights),p.push(u.numDirLightShadows),p.push(u.numPointLightShadows),p.push(u.numSpotLightShadows),p.push(u.numSpotLightShadowsWithMaps),p.push(u.numLightProbes),p.push(u.shadowMapType),p.push(u.toneMapping),p.push(u.numClippingPlanes),p.push(u.numClipIntersection),p.push(u.depthPacking)}function _(p,u){l.disableAll(),u.supportsVertexTextures&&l.enable(0),u.instancing&&l.enable(1),u.instancingColor&&l.enable(2),u.instancingMorph&&l.enable(3),u.matcap&&l.enable(4),u.envMap&&l.enable(5),u.normalMapObjectSpace&&l.enable(6),u.normalMapTangentSpace&&l.enable(7),u.clearcoat&&l.enable(8),u.iridescence&&l.enable(9),u.alphaTest&&l.enable(10),u.vertexColors&&l.enable(11),u.vertexAlphas&&l.enable(12),u.vertexUv1s&&l.enable(13),u.vertexUv2s&&l.enable(14),u.vertexUv3s&&l.enable(15),u.vertexTangents&&l.enable(16),u.anisotropy&&l.enable(17),u.alphaHash&&l.enable(18),u.batching&&l.enable(19),u.dispersion&&l.enable(20),u.batchingColor&&l.enable(21),u.gradientMap&&l.enable(22),p.push(l.mask),l.disableAll(),u.fog&&l.enable(0),u.useFog&&l.enable(1),u.flatShading&&l.enable(2),u.logarithmicDepthBuffer&&l.enable(3),u.reversedDepthBuffer&&l.enable(4),u.skinning&&l.enable(5),u.morphTargets&&l.enable(6),u.morphNormals&&l.enable(7),u.morphColors&&l.enable(8),u.premultipliedAlpha&&l.enable(9),u.shadowMapEnabled&&l.enable(10),u.doubleSided&&l.enable(11),u.flipSided&&l.enable(12),u.useDepthPacking&&l.enable(13),u.dithering&&l.enable(14),u.transmission&&l.enable(15),u.sheen&&l.enable(16),u.opaque&&l.enable(17),u.pointsUvs&&l.enable(18),u.decodeVideoTexture&&l.enable(19),u.decodeVideoTextureEmissive&&l.enable(20),u.alphaToCoverage&&l.enable(21),p.push(l.mask)}function g(p){const u=I[p.type];let L;if(u){const B=Rt[u];L=Zo.clone(B.uniforms)}else L=p.uniforms;return L}function D(p,u){let L;for(let B=0,X=b.length;B<X;B++){const Y=b[B];if(Y.cacheKey===u){L=Y,++L.usedTimes;break}}return L===void 0&&(L=new Hf(e,u,p,r),b.push(L)),L}function A(p){if(--p.usedTimes===0){const u=b.indexOf(p);b[u]=b[b.length-1],b.pop(),p.destroy()}}function P(p){v.remove(p)}function F(){v.dispose()}return{getParameters:f,getProgramCacheKey:a,getUniforms:g,acquireProgram:D,releaseProgram:A,releaseShaderCache:P,programs:b,dispose:F}}function zf(){let e=new WeakMap;function n(c){return e.has(c)}function t(c){let l=e.get(c);return l===void 0&&(l={},e.set(c,l)),l}function i(c){e.delete(c)}function o(c,l,v){e.get(c)[l]=v}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:o,dispose:r}}function Xf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function Kr(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function qr(){const e=[];let n=0;const t=[],i=[],o=[];function r(){n=0,t.length=0,i.length=0,o.length=0}function c(T,M,x,I,y,f){let a=e[n];return a===void 0?(a={id:T.id,object:T,geometry:M,material:x,groupOrder:I,renderOrder:T.renderOrder,z:y,group:f},e[n]=a):(a.id=T.id,a.object=T,a.geometry=M,a.material=x,a.groupOrder=I,a.renderOrder=T.renderOrder,a.z=y,a.group=f),n++,a}function l(T,M,x,I,y,f){const a=c(T,M,x,I,y,f);x.transmission>0?i.push(a):x.transparent===!0?o.push(a):t.push(a)}function v(T,M,x,I,y,f){const a=c(T,M,x,I,y,f);x.transmission>0?i.unshift(a):x.transparent===!0?o.unshift(a):t.unshift(a)}function E(T,M){t.length>1&&t.sort(T||Xf),i.length>1&&i.sort(M||Kr),o.length>1&&o.sort(M||Kr)}function b(){for(let T=n,M=e.length;T<M;T++){const x=e[T];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:o,init:r,push:l,unshift:v,finish:b,sort:E}}function Yf(){let e=new WeakMap;function n(i,o){const r=e.get(i);let c;return r===void 0?(c=new qr,e.set(i,[c])):o>=r.length?(c=new qr,r.push(c)):c=r[o],c}function t(){e=new WeakMap}return{get:n,dispose:t}}function Kf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new le,color:new ze};break;case"SpotLight":t={position:new le,direction:new le,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new le,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new le,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new le,halfWidth:new le,halfHeight:new le};break}return e[n.id]=t,t}}}function qf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let $f=0;function Zf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function jf(e){const n=new Kf,t=qf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let E=0;E<9;E++)i.probe.push(new le);const o=new le,r=new Mt,c=new Mt;function l(E){let b=0,T=0,M=0;for(let p=0;p<9;p++)i.probe[p].set(0,0,0);let x=0,I=0,y=0,f=0,a=0,S=0,_=0,g=0,D=0,A=0,P=0;E.sort(Zf);for(let p=0,u=E.length;p<u;p++){const L=E[p],B=L.color,X=L.intensity,Y=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)b+=B.r*X,T+=B.g*X,M+=B.b*X;else if(L.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(L.sh.coefficients[W],X);P++}else if(L.isDirectionalLight){const W=n.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const te=L.shadow,G=t.get(L);G.shadowIntensity=te.intensity,G.shadowBias=te.bias,G.shadowNormalBias=te.normalBias,G.shadowRadius=te.radius,G.shadowMapSize=te.mapSize,i.directionalShadow[x]=G,i.directionalShadowMap[x]=q,i.directionalShadowMatrix[x]=L.shadow.matrix,S++}i.directional[x]=W,x++}else if(L.isSpotLight){const W=n.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(B).multiplyScalar(X),W.distance=Y,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,i.spot[y]=W;const te=L.shadow;if(L.map&&(i.spotLightMap[D]=L.map,D++,te.updateMatrices(L),L.castShadow&&A++),i.spotLightMatrix[y]=te.matrix,L.castShadow){const G=t.get(L);G.shadowIntensity=te.intensity,G.shadowBias=te.bias,G.shadowNormalBias=te.normalBias,G.shadowRadius=te.radius,G.shadowMapSize=te.mapSize,i.spotShadow[y]=G,i.spotShadowMap[y]=q,g++}y++}else if(L.isRectAreaLight){const W=n.get(L);W.color.copy(B).multiplyScalar(X),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),i.rectArea[f]=W,f++}else if(L.isPointLight){const W=n.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const te=L.shadow,G=t.get(L);G.shadowIntensity=te.intensity,G.shadowBias=te.bias,G.shadowNormalBias=te.normalBias,G.shadowRadius=te.radius,G.shadowMapSize=te.mapSize,G.shadowCameraNear=te.camera.near,G.shadowCameraFar=te.camera.far,i.pointShadow[I]=G,i.pointShadowMap[I]=q,i.pointShadowMatrix[I]=L.shadow.matrix,_++}i.point[I]=W,I++}else if(L.isHemisphereLight){const W=n.get(L);W.skyColor.copy(L.color).multiplyScalar(X),W.groundColor.copy(L.groundColor).multiplyScalar(X),i.hemi[a]=W,a++}}f>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2)),i.ambient[0]=b,i.ambient[1]=T,i.ambient[2]=M;const F=i.hash;(F.directionalLength!==x||F.pointLength!==I||F.spotLength!==y||F.rectAreaLength!==f||F.hemiLength!==a||F.numDirectionalShadows!==S||F.numPointShadows!==_||F.numSpotShadows!==g||F.numSpotMaps!==D||F.numLightProbes!==P)&&(i.directional.length=x,i.spot.length=y,i.rectArea.length=f,i.point.length=I,i.hemi.length=a,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=g,i.spotShadowMap.length=g,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=g+D-A,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,F.directionalLength=x,F.pointLength=I,F.spotLength=y,F.rectAreaLength=f,F.hemiLength=a,F.numDirectionalShadows=S,F.numPointShadows=_,F.numSpotShadows=g,F.numSpotMaps=D,F.numLightProbes=P,i.version=$f++)}function v(E,b){let T=0,M=0,x=0,I=0,y=0;const f=b.matrixWorldInverse;for(let a=0,S=E.length;a<S;a++){const _=E[a];if(_.isDirectionalLight){const g=i.directional[T];g.direction.setFromMatrixPosition(_.matrixWorld),o.setFromMatrixPosition(_.target.matrixWorld),g.direction.sub(o),g.direction.transformDirection(f),T++}else if(_.isSpotLight){const g=i.spot[x];g.position.setFromMatrixPosition(_.matrixWorld),g.position.applyMatrix4(f),g.direction.setFromMatrixPosition(_.matrixWorld),o.setFromMatrixPosition(_.target.matrixWorld),g.direction.sub(o),g.direction.transformDirection(f),x++}else if(_.isRectAreaLight){const g=i.rectArea[I];g.position.setFromMatrixPosition(_.matrixWorld),g.position.applyMatrix4(f),c.identity(),r.copy(_.matrixWorld),r.premultiply(f),c.extractRotation(r),g.halfWidth.set(_.width*.5,0,0),g.halfHeight.set(0,_.height*.5,0),g.halfWidth.applyMatrix4(c),g.halfHeight.applyMatrix4(c),I++}else if(_.isPointLight){const g=i.point[M];g.position.setFromMatrixPosition(_.matrixWorld),g.position.applyMatrix4(f),M++}else if(_.isHemisphereLight){const g=i.hemi[y];g.direction.setFromMatrixPosition(_.matrixWorld),g.direction.transformDirection(f),y++}}}return{setup:l,setupView:v,state:i}}function $r(e){const n=new jf(e),t=[],i=[];function o(b){E.camera=b,t.length=0,i.length=0}function r(b){t.push(b)}function c(b){i.push(b)}function l(){n.setup(t)}function v(b){n.setupView(t,b)}const E={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:o,state:E,setupLights:l,setupLightsView:v,pushLight:r,pushShadow:c}}function Qf(e){let n=new WeakMap;function t(o,r=0){const c=n.get(o);let l;return c===void 0?(l=new $r(e),n.set(o,[l])):r>=c.length?(l=new $r(e),c.push(l)):l=c[r],l}function i(){n=new WeakMap}return{get:t,dispose:i}}const Jf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,eu=`uniform sampler2D shadow_pass;
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
}`;function tu(e,n,t){let i=new _a;const o=new Ye,r=new Ye,c=new dt,l=new No({depthPacking:Oo}),v=new Fo,E={},b=t.maxTextureSize,T={[cn]:Tt,[Tt]:cn,[xt]:xt},M=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:Jf,fragmentShader:eu}),x=M.clone();x.defines.HORIZONTAL_PASS=1;const I=new wi;I.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ut(I,M),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ea;let a=this.type;this.render=function(A,P,F){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||A.length===0)return;const p=e.getRenderTarget(),u=e.getActiveCubeFace(),L=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Ht),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const X=a!==wt&&this.type===wt,Y=a===wt&&this.type!==wt;for(let q=0,W=A.length;q<W;q++){const te=A[q],G=te.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;o.copy(G.mapSize);const me=G.getFrameExtents();if(o.multiply(me),r.copy(G.mapSize),(o.x>b||o.y>b)&&(o.x>b&&(r.x=Math.floor(b/me.x),o.x=r.x*me.x,G.mapSize.x=r.x),o.y>b&&(r.y=Math.floor(b/me.y),o.y=r.y*me.y,G.mapSize.y=r.y)),G.map===null||X===!0||Y===!0){const ye=this.type!==wt?{minFilter:sn,magFilter:sn}:{};G.map!==null&&G.map.dispose(),G.map=new jt(o.x,o.y,ye),G.map.texture.name=te.name+".shadowMap",G.camera.updateProjectionMatrix()}e.setRenderTarget(G.map),e.clear();const Ae=G.getViewportCount();for(let ye=0;ye<Ae;ye++){const Ge=G.getViewport(ye);c.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),B.viewport(c),G.updateMatrices(te,ye),i=G.getFrustum(),g(P,F,G.camera,te,this.type)}G.isPointLightShadow!==!0&&this.type===wt&&S(G,F),G.needsUpdate=!1}a=this.type,f.needsUpdate=!1,e.setRenderTarget(p,u,L)};function S(A,P){const F=n.update(y);M.defines.VSM_SAMPLES!==A.blurSamples&&(M.defines.VSM_SAMPLES=A.blurSamples,x.defines.VSM_SAMPLES=A.blurSamples,M.needsUpdate=!0,x.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new jt(o.x,o.y)),M.uniforms.shadow_pass.value=A.map.texture,M.uniforms.resolution.value=A.mapSize,M.uniforms.radius.value=A.radius,e.setRenderTarget(A.mapPass),e.clear(),e.renderBufferDirect(P,null,F,M,y,null),x.uniforms.shadow_pass.value=A.mapPass.texture,x.uniforms.resolution.value=A.mapSize,x.uniforms.radius.value=A.radius,e.setRenderTarget(A.map),e.clear(),e.renderBufferDirect(P,null,F,x,y,null)}function _(A,P,F,p){let u=null;const L=F.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)u=L;else if(u=F.isPointLight===!0?v:l,e.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=u.uuid,X=P.uuid;let Y=E[B];Y===void 0&&(Y={},E[B]=Y);let q=Y[X];q===void 0&&(q=u.clone(),Y[X]=q,P.addEventListener("dispose",D)),u=q}if(u.visible=P.visible,u.wireframe=P.wireframe,p===wt?u.side=P.shadowSide!==null?P.shadowSide:P.side:u.side=P.shadowSide!==null?P.shadowSide:T[P.side],u.alphaMap=P.alphaMap,u.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,u.map=P.map,u.clipShadows=P.clipShadows,u.clippingPlanes=P.clippingPlanes,u.clipIntersection=P.clipIntersection,u.displacementMap=P.displacementMap,u.displacementScale=P.displacementScale,u.displacementBias=P.displacementBias,u.wireframeLinewidth=P.wireframeLinewidth,u.linewidth=P.linewidth,F.isPointLight===!0&&u.isMeshDistanceMaterial===!0){const B=e.properties.get(u);B.light=F}return u}function g(A,P,F,p,u){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&u===wt)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,A.matrixWorld);const X=n.update(A),Y=A.material;if(Array.isArray(Y)){const q=X.groups;for(let W=0,te=q.length;W<te;W++){const G=q[W],me=Y[G.materialIndex];if(me&&me.visible){const Ae=_(A,me,p,u);A.onBeforeShadow(e,A,P,F,X,Ae,G),e.renderBufferDirect(F,null,X,Ae,A,G),A.onAfterShadow(e,A,P,F,X,Ae,G)}}}else if(Y.visible){const q=_(A,Y,p,u);A.onBeforeShadow(e,A,P,F,X,q,null),e.renderBufferDirect(F,null,X,q,A,null),A.onAfterShadow(e,A,P,F,X,q,null)}}const B=A.children;for(let X=0,Y=B.length;X<Y;X++)g(B[X],P,F,p,u)}function D(A){A.target.removeEventListener("dispose",D);for(const F in E){const p=E[F],u=A.target.uuid;u in p&&(p[u].dispose(),delete p[u])}}}const nu={[vi]:gi,[_i]:pi,[mi]:ui,[Ln]:hi,[gi]:vi,[pi]:_i,[ui]:mi,[hi]:Ln};function iu(e,n){function t(){let R=!1;const ee=new dt;let ie=null;const ue=new dt(0,0,0,0);return{setMask:function(j){ie!==j&&!R&&(e.colorMask(j,j,j,j),ie=j)},setLocked:function(j){R=j},setClear:function(j,z,he,Ue,je){je===!0&&(j*=Ue,z*=Ue,he*=Ue),ee.set(j,z,he,Ue),ue.equals(ee)===!1&&(e.clearColor(j,z,he,Ue),ue.copy(ee))},reset:function(){R=!1,ie=null,ue.set(-1,0,0,0)}}}function i(){let R=!1,ee=!1,ie=null,ue=null,j=null;return{setReversed:function(z){if(ee!==z){const he=n.get("EXT_clip_control");z?he.clipControlEXT(he.LOWER_LEFT_EXT,he.ZERO_TO_ONE_EXT):he.clipControlEXT(he.LOWER_LEFT_EXT,he.NEGATIVE_ONE_TO_ONE_EXT),ee=z;const Ue=j;j=null,this.setClear(Ue)}},getReversed:function(){return ee},setTest:function(z){z?$(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(z){ie!==z&&!R&&(e.depthMask(z),ie=z)},setFunc:function(z){if(ee&&(z=nu[z]),ue!==z){switch(z){case vi:e.depthFunc(e.NEVER);break;case gi:e.depthFunc(e.ALWAYS);break;case _i:e.depthFunc(e.LESS);break;case Ln:e.depthFunc(e.LEQUAL);break;case mi:e.depthFunc(e.EQUAL);break;case hi:e.depthFunc(e.GEQUAL);break;case pi:e.depthFunc(e.GREATER);break;case ui:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ue=z}},setLocked:function(z){R=z},setClear:function(z){j!==z&&(ee&&(z=1-z),e.clearDepth(z),j=z)},reset:function(){R=!1,ie=null,ue=null,j=null,ee=!1}}}function o(){let R=!1,ee=null,ie=null,ue=null,j=null,z=null,he=null,Ue=null,je=null;return{setTest:function(ke){R||(ke?$(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(ke){ee!==ke&&!R&&(e.stencilMask(ke),ee=ke)},setFunc:function(ke,bt,At){(ie!==ke||ue!==bt||j!==At)&&(e.stencilFunc(ke,bt,At),ie=ke,ue=bt,j=At)},setOp:function(ke,bt,At){(z!==ke||he!==bt||Ue!==At)&&(e.stencilOp(ke,bt,At),z=ke,he=bt,Ue=At)},setLocked:function(ke){R=ke},setClear:function(ke){je!==ke&&(e.clearStencil(ke),je=ke)},reset:function(){R=!1,ee=null,ie=null,ue=null,j=null,z=null,he=null,Ue=null,je=null}}}const r=new t,c=new i,l=new o,v=new WeakMap,E=new WeakMap;let b={},T={},M=new WeakMap,x=[],I=null,y=!1,f=null,a=null,S=null,_=null,g=null,D=null,A=null,P=new ze(0,0,0),F=0,p=!1,u=null,L=null,B=null,X=null,Y=null;const q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,te=0;const G=e.getParameter(e.VERSION);G.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=te>=1):G.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=te>=2);let me=null,Ae={};const ye=e.getParameter(e.SCISSOR_BOX),Ge=e.getParameter(e.VIEWPORT),Qe=new dt().fromArray(ye),$e=new dt().fromArray(Ge);function We(R,ee,ie,ue){const j=new Uint8Array(4),z=e.createTexture();e.bindTexture(R,z),e.texParameteri(R,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(R,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let he=0;he<ie;he++)R===e.TEXTURE_3D||R===e.TEXTURE_2D_ARRAY?e.texImage3D(ee,0,e.RGBA,1,1,ue,0,e.RGBA,e.UNSIGNED_BYTE,j):e.texImage2D(ee+he,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,j);return z}const k={};k[e.TEXTURE_2D]=We(e.TEXTURE_2D,e.TEXTURE_2D,1),k[e.TEXTURE_CUBE_MAP]=We(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[e.TEXTURE_2D_ARRAY]=We(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),k[e.TEXTURE_3D]=We(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),c.setClear(1),l.setClear(0),$(e.DEPTH_TEST),c.setFunc(Ln),_e(!1),fe(hr),$(e.CULL_FACE),Ie(Ht);function $(R){b[R]!==!0&&(e.enable(R),b[R]=!0)}function de(R){b[R]!==!1&&(e.disable(R),b[R]=!1)}function Ce(R,ee){return T[R]!==ee?(e.bindFramebuffer(R,ee),T[R]=ee,R===e.DRAW_FRAMEBUFFER&&(T[e.FRAMEBUFFER]=ee),R===e.FRAMEBUFFER&&(T[e.DRAW_FRAMEBUFFER]=ee),!0):!1}function ve(R,ee){let ie=x,ue=!1;if(R){ie=M.get(ee),ie===void 0&&(ie=[],M.set(ee,ie));const j=R.textures;if(ie.length!==j.length||ie[0]!==e.COLOR_ATTACHMENT0){for(let z=0,he=j.length;z<he;z++)ie[z]=e.COLOR_ATTACHMENT0+z;ie.length=j.length,ue=!0}}else ie[0]!==e.BACK&&(ie[0]=e.BACK,ue=!0);ue&&e.drawBuffers(ie)}function K(R){return I!==R?(e.useProgram(R),I=R,!0):!1}const Se={[nn]:e.FUNC_ADD,[so]:e.FUNC_SUBTRACT,[oo]:e.FUNC_REVERSE_SUBTRACT};Se[vs]=e.MIN,Se[Es]=e.MAX;const m={[xo]:e.ZERO,[To]:e.ONE,[Mo]:e.SRC_COLOR,[So]:e.SRC_ALPHA,[Eo]:e.SRC_ALPHA_SATURATE,[vo]:e.DST_COLOR,[go]:e.DST_ALPHA,[_o]:e.ONE_MINUS_SRC_COLOR,[mo]:e.ONE_MINUS_SRC_ALPHA,[ho]:e.ONE_MINUS_DST_COLOR,[po]:e.ONE_MINUS_DST_ALPHA,[uo]:e.CONSTANT_COLOR,[fo]:e.ONE_MINUS_CONSTANT_COLOR,[co]:e.CONSTANT_ALPHA,[lo]:e.ONE_MINUS_CONSTANT_ALPHA};function Ie(R,ee,ie,ue,j,z,he,Ue,je,ke){if(R===Ht){y===!0&&(de(e.BLEND),y=!1);return}if(y===!1&&($(e.BLEND),y=!0),R!==qo){if(R!==f||ke!==p){if((a!==nn||g!==nn)&&(e.blendEquation(e.FUNC_ADD),a=nn,g=nn),ke)switch(R){case wn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case gr:e.blendFunc(e.ONE,e.ONE);break;case _r:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case mr:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case wn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case gr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case _r:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case mr:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}S=null,_=null,D=null,A=null,P.set(0,0,0),F=0,f=R,p=ke}return}j=j||ee,z=z||ie,he=he||ue,(ee!==a||j!==g)&&(e.blendEquationSeparate(Se[ee],Se[j]),a=ee,g=j),(ie!==S||ue!==_||z!==D||he!==A)&&(e.blendFuncSeparate(m[ie],m[ue],m[z],m[he]),S=ie,_=ue,D=z,A=he),(Ue.equals(P)===!1||je!==F)&&(e.blendColor(Ue.r,Ue.g,Ue.b,je),P.copy(Ue),F=je),f=R,p=!1}function we(R,ee){R.side===xt?de(e.CULL_FACE):$(e.CULL_FACE);let ie=R.side===Tt;ee&&(ie=!ie),_e(ie),R.blending===wn&&R.transparent===!1?Ie(Ht):Ie(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),c.setFunc(R.depthFunc),c.setTest(R.depthTest),c.setMask(R.depthWrite),r.setMask(R.colorWrite);const ue=R.stencilWrite;l.setTest(ue),ue&&(l.setMask(R.stencilWriteMask),l.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),l.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),ge(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?$(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function _e(R){u!==R&&(R?e.frontFace(e.CW):e.frontFace(e.CCW),u=R)}function fe(R){R!==Yo?($(e.CULL_FACE),R!==L&&(R===hr?e.cullFace(e.BACK):R===Ko?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):de(e.CULL_FACE),L=R}function Ze(R){R!==B&&(W&&e.lineWidth(R),B=R)}function ge(R,ee,ie){R?($(e.POLYGON_OFFSET_FILL),(X!==ee||Y!==ie)&&(e.polygonOffset(ee,ie),X=ee,Y=ie)):de(e.POLYGON_OFFSET_FILL)}function Oe(R){R?$(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function ct(R){R===void 0&&(R=e.TEXTURE0+q-1),me!==R&&(e.activeTexture(R),me=R)}function rt(R,ee,ie){ie===void 0&&(me===null?ie=e.TEXTURE0+q-1:ie=me);let ue=Ae[ie];ue===void 0&&(ue={type:void 0,texture:void 0},Ae[ie]=ue),(ue.type!==R||ue.texture!==ee)&&(me!==ie&&(e.activeTexture(ie),me=ie),e.bindTexture(R,ee||k[R]),ue.type=R,ue.texture=ee)}function h(){const R=Ae[me];R!==void 0&&R.type!==void 0&&(e.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function s(){try{e.compressedTexImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function U(){try{e.compressedTexImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function V(){try{e.texSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Z(){try{e.texSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function H(){try{e.compressedTexSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function xe(){try{e.compressedTexSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ne(){try{e.texStorage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ee(){try{e.texStorage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Me(){try{e.texImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function J(){try{e.texImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function se(R){Qe.equals(R)===!1&&(e.scissor(R.x,R.y,R.z,R.w),Qe.copy(R))}function De(R){$e.equals(R)===!1&&(e.viewport(R.x,R.y,R.z,R.w),$e.copy(R))}function Te(R,ee){let ie=E.get(ee);ie===void 0&&(ie=new WeakMap,E.set(ee,ie));let ue=ie.get(R);ue===void 0&&(ue=e.getUniformBlockIndex(ee,R.name),ie.set(R,ue))}function ae(R,ee){const ue=E.get(ee).get(R);v.get(ee)!==ue&&(e.uniformBlockBinding(ee,ue,R.__bindingPointIndex),v.set(ee,ue))}function Ne(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),c.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),b={},me=null,Ae={},T={},M=new WeakMap,x=[],I=null,y=!1,f=null,a=null,S=null,_=null,g=null,D=null,A=null,P=new ze(0,0,0),F=0,p=!1,u=null,L=null,B=null,X=null,Y=null,Qe.set(0,0,e.canvas.width,e.canvas.height),$e.set(0,0,e.canvas.width,e.canvas.height),r.reset(),c.reset(),l.reset()}return{buffers:{color:r,depth:c,stencil:l},enable:$,disable:de,bindFramebuffer:Ce,drawBuffers:ve,useProgram:K,setBlending:Ie,setMaterial:we,setFlipSided:_e,setCullFace:fe,setLineWidth:Ze,setPolygonOffset:ge,setScissorTest:Oe,activeTexture:ct,bindTexture:rt,unbindTexture:h,compressedTexImage2D:s,compressedTexImage3D:U,texImage2D:Me,texImage3D:J,updateUBOMapping:Te,uniformBlockBinding:ae,texStorage2D:ne,texStorage3D:Ee,texSubImage2D:V,texSubImage3D:Z,compressedTexSubImage2D:H,compressedTexSubImage3D:xe,scissor:se,viewport:De,reset:Ne}}function ru(e,n,t,i,o,r,c){const l=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,v=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),E=new Ye,b=new WeakMap;let T;const M=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function I(h,s){return x?new OffscreenCanvas(h,s):hs("canvas")}function y(h,s,U){let V=1;const Z=rt(h);if((Z.width>U||Z.height>U)&&(V=U/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&h instanceof ImageBitmap||typeof VideoFrame<"u"&&h instanceof VideoFrame){const H=Math.floor(V*Z.width),xe=Math.floor(V*Z.height);T===void 0&&(T=I(H,xe));const ne=s?I(H,xe):T;return ne.width=H,ne.height=xe,ne.getContext("2d").drawImage(h,0,0,H,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+H+"x"+xe+")."),ne}else return"data"in h&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),h;return h}function f(h){return h.generateMipmaps}function a(h){e.generateMipmap(h)}function S(h){return h.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:h.isWebGL3DRenderTarget?e.TEXTURE_3D:h.isWebGLArrayRenderTarget||h.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(h,s,U,V,Z=!1){if(h!==null){if(e[h]!==void 0)return e[h];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+h+"'")}let H=s;if(s===e.RED&&(U===e.FLOAT&&(H=e.R32F),U===e.HALF_FLOAT&&(H=e.R16F),U===e.UNSIGNED_BYTE&&(H=e.R8)),s===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.R8UI),U===e.UNSIGNED_SHORT&&(H=e.R16UI),U===e.UNSIGNED_INT&&(H=e.R32UI),U===e.BYTE&&(H=e.R8I),U===e.SHORT&&(H=e.R16I),U===e.INT&&(H=e.R32I)),s===e.RG&&(U===e.FLOAT&&(H=e.RG32F),U===e.HALF_FLOAT&&(H=e.RG16F),U===e.UNSIGNED_BYTE&&(H=e.RG8)),s===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.RG8UI),U===e.UNSIGNED_SHORT&&(H=e.RG16UI),U===e.UNSIGNED_INT&&(H=e.RG32UI),U===e.BYTE&&(H=e.RG8I),U===e.SHORT&&(H=e.RG16I),U===e.INT&&(H=e.RG32I)),s===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.RGB8UI),U===e.UNSIGNED_SHORT&&(H=e.RGB16UI),U===e.UNSIGNED_INT&&(H=e.RGB32UI),U===e.BYTE&&(H=e.RGB8I),U===e.SHORT&&(H=e.RGB16I),U===e.INT&&(H=e.RGB32I)),s===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.RGBA8UI),U===e.UNSIGNED_SHORT&&(H=e.RGBA16UI),U===e.UNSIGNED_INT&&(H=e.RGBA32UI),U===e.BYTE&&(H=e.RGBA8I),U===e.SHORT&&(H=e.RGBA16I),U===e.INT&&(H=e.RGBA32I)),s===e.RGB&&(U===e.UNSIGNED_INT_5_9_9_9_REV&&(H=e.RGB9_E5),U===e.UNSIGNED_INT_10F_11F_11F_REV&&(H=e.R11F_G11F_B10F)),s===e.RGBA){const xe=Z?Pa:at.getTransfer(V);U===e.FLOAT&&(H=e.RGBA32F),U===e.HALF_FLOAT&&(H=e.RGBA16F),U===e.UNSIGNED_BYTE&&(H=xe===et?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT_4_4_4_4&&(H=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&(H=e.RGB5_A1)}return(H===e.R16F||H===e.R32F||H===e.RG16F||H===e.RG32F||H===e.RGBA16F||H===e.RGBA32F)&&n.get("EXT_color_buffer_float"),H}function g(h,s){let U;return h?s===null||s===fn||s===dn?U=e.DEPTH24_STENCIL8:s===Bt?U=e.DEPTH32F_STENCIL8:s===yn&&(U=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):s===null||s===fn||s===dn?U=e.DEPTH_COMPONENT24:s===Bt?U=e.DEPTH_COMPONENT32F:s===yn&&(U=e.DEPTH_COMPONENT16),U}function D(h,s){return f(h)===!0||h.isFramebufferTexture&&h.minFilter!==sn&&h.minFilter!==Yt?Math.log2(Math.max(s.width,s.height))+1:h.mipmaps!==void 0&&h.mipmaps.length>0?h.mipmaps.length:h.isCompressedTexture&&Array.isArray(h.image)?s.mipmaps.length:1}function A(h){const s=h.target;s.removeEventListener("dispose",A),F(s),s.isVideoTexture&&b.delete(s)}function P(h){const s=h.target;s.removeEventListener("dispose",P),u(s)}function F(h){const s=i.get(h);if(s.__webglInit===void 0)return;const U=h.source,V=M.get(U);if(V){const Z=V[s.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&p(h),Object.keys(V).length===0&&M.delete(U)}i.remove(h)}function p(h){const s=i.get(h);e.deleteTexture(s.__webglTexture);const U=h.source,V=M.get(U);delete V[s.__cacheKey],c.memory.textures--}function u(h){const s=i.get(h);if(h.depthTexture&&(h.depthTexture.dispose(),i.remove(h.depthTexture)),h.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(s.__webglFramebuffer[V]))for(let Z=0;Z<s.__webglFramebuffer[V].length;Z++)e.deleteFramebuffer(s.__webglFramebuffer[V][Z]);else e.deleteFramebuffer(s.__webglFramebuffer[V]);s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer[V])}else{if(Array.isArray(s.__webglFramebuffer))for(let V=0;V<s.__webglFramebuffer.length;V++)e.deleteFramebuffer(s.__webglFramebuffer[V]);else e.deleteFramebuffer(s.__webglFramebuffer);if(s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer),s.__webglMultisampledFramebuffer&&e.deleteFramebuffer(s.__webglMultisampledFramebuffer),s.__webglColorRenderbuffer)for(let V=0;V<s.__webglColorRenderbuffer.length;V++)s.__webglColorRenderbuffer[V]&&e.deleteRenderbuffer(s.__webglColorRenderbuffer[V]);s.__webglDepthRenderbuffer&&e.deleteRenderbuffer(s.__webglDepthRenderbuffer)}const U=h.textures;for(let V=0,Z=U.length;V<Z;V++){const H=i.get(U[V]);H.__webglTexture&&(e.deleteTexture(H.__webglTexture),c.memory.textures--),i.remove(U[V])}i.remove(h)}let L=0;function B(){L=0}function X(){const h=L;return h>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+h+" texture units while this GPU supports only "+o.maxTextures),L+=1,h}function Y(h){const s=[];return s.push(h.wrapS),s.push(h.wrapT),s.push(h.wrapR||0),s.push(h.magFilter),s.push(h.minFilter),s.push(h.anisotropy),s.push(h.internalFormat),s.push(h.format),s.push(h.type),s.push(h.generateMipmaps),s.push(h.premultiplyAlpha),s.push(h.flipY),s.push(h.unpackAlignment),s.push(h.colorSpace),s.join()}function q(h,s){const U=i.get(h);if(h.isVideoTexture&&Oe(h),h.isRenderTargetTexture===!1&&h.isExternalTexture!==!0&&h.version>0&&U.__version!==h.version){const V=h.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(U,h,s);return}}else h.isExternalTexture&&(U.__webglTexture=h.sourceTexture?h.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+s)}function W(h,s){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){k(U,h,s);return}t.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+s)}function te(h,s){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){k(U,h,s);return}t.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+s)}function G(h,s){const U=i.get(h);if(h.version>0&&U.__version!==h.version){$(U,h,s);return}t.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+s)}const me={[bo]:e.REPEAT,[Ro]:e.CLAMP_TO_EDGE,[Ao]:e.MIRRORED_REPEAT},Ae={[sn]:e.NEAREST,[wo]:e.NEAREST_MIPMAP_NEAREST,[gn]:e.NEAREST_MIPMAP_LINEAR,[Yt]:e.LINEAR,[zn]:e.LINEAR_MIPMAP_NEAREST,[rn]:e.LINEAR_MIPMAP_LINEAR},ye={[Io]:e.NEVER,[Uo]:e.ALWAYS,[yo]:e.LESS,[va]:e.LEQUAL,[Lo]:e.EQUAL,[Do]:e.GEQUAL,[Po]:e.GREATER,[Co]:e.NOTEQUAL};function Ge(h,s){if(s.type===Bt&&n.has("OES_texture_float_linear")===!1&&(s.magFilter===Yt||s.magFilter===zn||s.magFilter===gn||s.magFilter===rn||s.minFilter===Yt||s.minFilter===zn||s.minFilter===gn||s.minFilter===rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(h,e.TEXTURE_WRAP_S,me[s.wrapS]),e.texParameteri(h,e.TEXTURE_WRAP_T,me[s.wrapT]),(h===e.TEXTURE_3D||h===e.TEXTURE_2D_ARRAY)&&e.texParameteri(h,e.TEXTURE_WRAP_R,me[s.wrapR]),e.texParameteri(h,e.TEXTURE_MAG_FILTER,Ae[s.magFilter]),e.texParameteri(h,e.TEXTURE_MIN_FILTER,Ae[s.minFilter]),s.compareFunction&&(e.texParameteri(h,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(h,e.TEXTURE_COMPARE_FUNC,ye[s.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(s.magFilter===sn||s.minFilter!==gn&&s.minFilter!==rn||s.type===Bt&&n.has("OES_texture_float_linear")===!1)return;if(s.anisotropy>1||i.get(s).__currentAnisotropy){const U=n.get("EXT_texture_filter_anisotropic");e.texParameterf(h,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(s.anisotropy,o.getMaxAnisotropy())),i.get(s).__currentAnisotropy=s.anisotropy}}}function Qe(h,s){let U=!1;h.__webglInit===void 0&&(h.__webglInit=!0,s.addEventListener("dispose",A));const V=s.source;let Z=M.get(V);Z===void 0&&(Z={},M.set(V,Z));const H=Y(s);if(H!==h.__cacheKey){Z[H]===void 0&&(Z[H]={texture:e.createTexture(),usedTimes:0},c.memory.textures++,U=!0),Z[H].usedTimes++;const xe=Z[h.__cacheKey];xe!==void 0&&(Z[h.__cacheKey].usedTimes--,xe.usedTimes===0&&p(s)),h.__cacheKey=H,h.__webglTexture=Z[H].texture}return U}function $e(h,s,U){return Math.floor(Math.floor(h/U)/s)}function We(h,s,U,V){const H=h.updateRanges;if(H.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,s.width,s.height,U,V,s.data);else{H.sort((J,se)=>J.start-se.start);let xe=0;for(let J=1;J<H.length;J++){const se=H[xe],De=H[J],Te=se.start+se.count,ae=$e(De.start,s.width,4),Ne=$e(se.start,s.width,4);De.start<=Te+1&&ae===Ne&&$e(De.start+De.count-1,s.width,4)===ae?se.count=Math.max(se.count,De.start+De.count-se.start):(++xe,H[xe]=De)}H.length=xe+1;const ne=e.getParameter(e.UNPACK_ROW_LENGTH),Ee=e.getParameter(e.UNPACK_SKIP_PIXELS),Me=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,s.width);for(let J=0,se=H.length;J<se;J++){const De=H[J],Te=Math.floor(De.start/4),ae=Math.ceil(De.count/4),Ne=Te%s.width,R=Math.floor(Te/s.width),ee=ae,ie=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ne),e.pixelStorei(e.UNPACK_SKIP_ROWS,R),t.texSubImage2D(e.TEXTURE_2D,0,Ne,R,ee,ie,U,V,s.data)}h.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,ne),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ee),e.pixelStorei(e.UNPACK_SKIP_ROWS,Me)}}function k(h,s,U){let V=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(V=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(V=e.TEXTURE_3D);const Z=Qe(h,s),H=s.source;t.bindTexture(V,h.__webglTexture,e.TEXTURE0+U);const xe=i.get(H);if(H.version!==xe.__version||Z===!0){t.activeTexture(e.TEXTURE0+U);const ne=at.getPrimaries(at.workingColorSpace),Ee=s.colorSpace===Xt?null:at.getPrimaries(s.colorSpace),Me=s.colorSpace===Xt||ne===Ee?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let J=y(s.image,!1,o.maxTextureSize);J=ct(s,J);const se=r.convert(s.format,s.colorSpace),De=r.convert(s.type);let Te=_(s.internalFormat,se,De,s.colorSpace,s.isVideoTexture);Ge(V,s);let ae;const Ne=s.mipmaps,R=s.isVideoTexture!==!0,ee=xe.__version===void 0||Z===!0,ie=H.dataReady,ue=D(s,J);if(s.isDepthTexture)Te=g(s.format===Dn,s.type),ee&&(R?t.texStorage2D(e.TEXTURE_2D,1,Te,J.width,J.height):t.texImage2D(e.TEXTURE_2D,0,Te,J.width,J.height,0,se,De,null));else if(s.isDataTexture)if(Ne.length>0){R&&ee&&t.texStorage2D(e.TEXTURE_2D,ue,Te,Ne[0].width,Ne[0].height);for(let j=0,z=Ne.length;j<z;j++)ae=Ne[j],R?ie&&t.texSubImage2D(e.TEXTURE_2D,j,0,0,ae.width,ae.height,se,De,ae.data):t.texImage2D(e.TEXTURE_2D,j,Te,ae.width,ae.height,0,se,De,ae.data);s.generateMipmaps=!1}else R?(ee&&t.texStorage2D(e.TEXTURE_2D,ue,Te,J.width,J.height),ie&&We(s,J,se,De)):t.texImage2D(e.TEXTURE_2D,0,Te,J.width,J.height,0,se,De,J.data);else if(s.isCompressedTexture)if(s.isCompressedArrayTexture){R&&ee&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Te,Ne[0].width,Ne[0].height,J.depth);for(let j=0,z=Ne.length;j<z;j++)if(ae=Ne[j],s.format!==Ct)if(se!==null)if(R){if(ie)if(s.layerUpdates.size>0){const he=Er(ae.width,ae.height,s.format,s.type);for(const Ue of s.layerUpdates){const je=ae.data.subarray(Ue*he/ae.data.BYTES_PER_ELEMENT,(Ue+1)*he/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,Ue,ae.width,ae.height,1,se,je)}s.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,ae.width,ae.height,J.depth,se,ae.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,j,Te,ae.width,ae.height,J.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?ie&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,ae.width,ae.height,J.depth,se,De,ae.data):t.texImage3D(e.TEXTURE_2D_ARRAY,j,Te,ae.width,ae.height,J.depth,0,se,De,ae.data)}else{R&&ee&&t.texStorage2D(e.TEXTURE_2D,ue,Te,Ne[0].width,Ne[0].height);for(let j=0,z=Ne.length;j<z;j++)ae=Ne[j],s.format!==Ct?se!==null?R?ie&&t.compressedTexSubImage2D(e.TEXTURE_2D,j,0,0,ae.width,ae.height,se,ae.data):t.compressedTexImage2D(e.TEXTURE_2D,j,Te,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?ie&&t.texSubImage2D(e.TEXTURE_2D,j,0,0,ae.width,ae.height,se,De,ae.data):t.texImage2D(e.TEXTURE_2D,j,Te,ae.width,ae.height,0,se,De,ae.data)}else if(s.isDataArrayTexture)if(R){if(ee&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Te,J.width,J.height,J.depth),ie)if(s.layerUpdates.size>0){const j=Er(J.width,J.height,s.format,s.type);for(const z of s.layerUpdates){const he=J.data.subarray(z*j/J.data.BYTES_PER_ELEMENT,(z+1)*j/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,z,J.width,J.height,1,se,De,he)}s.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,se,De,J.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,Te,J.width,J.height,J.depth,0,se,De,J.data);else if(s.isData3DTexture)R?(ee&&t.texStorage3D(e.TEXTURE_3D,ue,Te,J.width,J.height,J.depth),ie&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,se,De,J.data)):t.texImage3D(e.TEXTURE_3D,0,Te,J.width,J.height,J.depth,0,se,De,J.data);else if(s.isFramebufferTexture){if(ee)if(R)t.texStorage2D(e.TEXTURE_2D,ue,Te,J.width,J.height);else{let j=J.width,z=J.height;for(let he=0;he<ue;he++)t.texImage2D(e.TEXTURE_2D,he,Te,j,z,0,se,De,null),j>>=1,z>>=1}}else if(Ne.length>0){if(R&&ee){const j=rt(Ne[0]);t.texStorage2D(e.TEXTURE_2D,ue,Te,j.width,j.height)}for(let j=0,z=Ne.length;j<z;j++)ae=Ne[j],R?ie&&t.texSubImage2D(e.TEXTURE_2D,j,0,0,se,De,ae):t.texImage2D(e.TEXTURE_2D,j,Te,se,De,ae);s.generateMipmaps=!1}else if(R){if(ee){const j=rt(J);t.texStorage2D(e.TEXTURE_2D,ue,Te,j.width,j.height)}ie&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,se,De,J)}else t.texImage2D(e.TEXTURE_2D,0,Te,se,De,J);f(s)&&a(V),xe.__version=H.version,s.onUpdate&&s.onUpdate(s)}h.__version=s.version}function $(h,s,U){if(s.image.length!==6)return;const V=Qe(h,s),Z=s.source;t.bindTexture(e.TEXTURE_CUBE_MAP,h.__webglTexture,e.TEXTURE0+U);const H=i.get(Z);if(Z.version!==H.__version||V===!0){t.activeTexture(e.TEXTURE0+U);const xe=at.getPrimaries(at.workingColorSpace),ne=s.colorSpace===Xt?null:at.getPrimaries(s.colorSpace),Ee=s.colorSpace===Xt||xe===ne?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Me=s.isCompressedTexture||s.image[0].isCompressedTexture,J=s.image[0]&&s.image[0].isDataTexture,se=[];for(let z=0;z<6;z++)!Me&&!J?se[z]=y(s.image[z],!0,o.maxCubemapSize):se[z]=J?s.image[z].image:s.image[z],se[z]=ct(s,se[z]);const De=se[0],Te=r.convert(s.format,s.colorSpace),ae=r.convert(s.type),Ne=_(s.internalFormat,Te,ae,s.colorSpace),R=s.isVideoTexture!==!0,ee=H.__version===void 0||V===!0,ie=Z.dataReady;let ue=D(s,De);Ge(e.TEXTURE_CUBE_MAP,s);let j;if(Me){R&&ee&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,Ne,De.width,De.height);for(let z=0;z<6;z++){j=se[z].mipmaps;for(let he=0;he<j.length;he++){const Ue=j[he];s.format!==Ct?Te!==null?R?ie&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,he,0,0,Ue.width,Ue.height,Te,Ue.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,he,Ne,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,he,0,0,Ue.width,Ue.height,Te,ae,Ue.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,he,Ne,Ue.width,Ue.height,0,Te,ae,Ue.data)}}}else{if(j=s.mipmaps,R&&ee){j.length>0&&ue++;const z=rt(se[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,Ne,z.width,z.height)}for(let z=0;z<6;z++)if(J){R?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,se[z].width,se[z].height,Te,ae,se[z].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Ne,se[z].width,se[z].height,0,Te,ae,se[z].data);for(let he=0;he<j.length;he++){const je=j[he].image[z].image;R?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,he+1,0,0,je.width,je.height,Te,ae,je.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,he+1,Ne,je.width,je.height,0,Te,ae,je.data)}}else{R?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,Te,ae,se[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Ne,Te,ae,se[z]);for(let he=0;he<j.length;he++){const Ue=j[he];R?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,he+1,0,0,Te,ae,Ue.image[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,he+1,Ne,Te,ae,Ue.image[z])}}}f(s)&&a(e.TEXTURE_CUBE_MAP),H.__version=Z.version,s.onUpdate&&s.onUpdate(s)}h.__version=s.version}function de(h,s,U,V,Z,H){const xe=r.convert(U.format,U.colorSpace),ne=r.convert(U.type),Ee=_(U.internalFormat,xe,ne,U.colorSpace),Me=i.get(s),J=i.get(U);if(J.__renderTarget=s,!Me.__hasExternalTextures){const se=Math.max(1,s.width>>H),De=Math.max(1,s.height>>H);Z===e.TEXTURE_3D||Z===e.TEXTURE_2D_ARRAY?t.texImage3D(Z,H,Ee,se,De,s.depth,0,xe,ne,null):t.texImage2D(Z,H,Ee,se,De,0,xe,ne,null)}t.bindFramebuffer(e.FRAMEBUFFER,h),ge(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,V,Z,J.__webglTexture,0,Ze(s)):(Z===e.TEXTURE_2D||Z>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,V,Z,J.__webglTexture,H),t.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(h,s,U){if(e.bindRenderbuffer(e.RENDERBUFFER,h),s.depthBuffer){const V=s.depthTexture,Z=V&&V.isDepthTexture?V.type:null,H=g(s.stencilBuffer,Z),xe=s.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ne=Ze(s);ge(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ne,H,s.width,s.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,ne,H,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,H,s.width,s.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,xe,e.RENDERBUFFER,h)}else{const V=s.textures;for(let Z=0;Z<V.length;Z++){const H=V[Z],xe=r.convert(H.format,H.colorSpace),ne=r.convert(H.type),Ee=_(H.internalFormat,xe,ne,H.colorSpace),Me=Ze(s);U&&ge(s)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me,Ee,s.width,s.height):ge(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me,Ee,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,Ee,s.width,s.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ve(h,s){if(s&&s.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,h),!(s.depthTexture&&s.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const V=i.get(s.depthTexture);V.__renderTarget=s,(!V.__webglTexture||s.depthTexture.image.width!==s.width||s.depthTexture.image.height!==s.height)&&(s.depthTexture.image.width=s.width,s.depthTexture.image.height=s.height,s.depthTexture.needsUpdate=!0),q(s.depthTexture,0);const Z=V.__webglTexture,H=Ze(s);if(s.depthTexture.format===Ri)ge(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0,H):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0);else if(s.depthTexture.format===Dn)ge(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0,H):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function K(h){const s=i.get(h),U=h.isWebGLCubeRenderTarget===!0;if(s.__boundDepthTexture!==h.depthTexture){const V=h.depthTexture;if(s.__depthDisposeCallback&&s.__depthDisposeCallback(),V){const Z=()=>{delete s.__boundDepthTexture,delete s.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),s.__depthDisposeCallback=Z}s.__boundDepthTexture=V}if(h.depthTexture&&!s.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const V=h.texture.mipmaps;V&&V.length>0?ve(s.__webglFramebuffer[0],h):ve(s.__webglFramebuffer,h)}else if(U){s.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[V]),s.__webglDepthbuffer[V]===void 0)s.__webglDepthbuffer[V]=e.createRenderbuffer(),Ce(s.__webglDepthbuffer[V],h,!1);else{const Z=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,H=s.__webglDepthbuffer[V];e.bindRenderbuffer(e.RENDERBUFFER,H),e.framebufferRenderbuffer(e.FRAMEBUFFER,Z,e.RENDERBUFFER,H)}}else{const V=h.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),s.__webglDepthbuffer===void 0)s.__webglDepthbuffer=e.createRenderbuffer(),Ce(s.__webglDepthbuffer,h,!1);else{const Z=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,H=s.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,H),e.framebufferRenderbuffer(e.FRAMEBUFFER,Z,e.RENDERBUFFER,H)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(h,s,U){const V=i.get(h);s!==void 0&&de(V.__webglFramebuffer,h,h.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&K(h)}function m(h){const s=h.texture,U=i.get(h),V=i.get(s);h.addEventListener("dispose",P);const Z=h.textures,H=h.isWebGLCubeRenderTarget===!0,xe=Z.length>1;if(xe||(V.__webglTexture===void 0&&(V.__webglTexture=e.createTexture()),V.__version=s.version,c.memory.textures++),H){U.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(s.mipmaps&&s.mipmaps.length>0){U.__webglFramebuffer[ne]=[];for(let Ee=0;Ee<s.mipmaps.length;Ee++)U.__webglFramebuffer[ne][Ee]=e.createFramebuffer()}else U.__webglFramebuffer[ne]=e.createFramebuffer()}else{if(s.mipmaps&&s.mipmaps.length>0){U.__webglFramebuffer=[];for(let ne=0;ne<s.mipmaps.length;ne++)U.__webglFramebuffer[ne]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(xe)for(let ne=0,Ee=Z.length;ne<Ee;ne++){const Me=i.get(Z[ne]);Me.__webglTexture===void 0&&(Me.__webglTexture=e.createTexture(),c.memory.textures++)}if(h.samples>0&&ge(h)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let ne=0;ne<Z.length;ne++){const Ee=Z[ne];U.__webglColorRenderbuffer[ne]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[ne]);const Me=r.convert(Ee.format,Ee.colorSpace),J=r.convert(Ee.type),se=_(Ee.internalFormat,Me,J,Ee.colorSpace,h.isXRRenderTarget===!0),De=Ze(h);e.renderbufferStorageMultisample(e.RENDERBUFFER,De,se,h.width,h.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ne,e.RENDERBUFFER,U.__webglColorRenderbuffer[ne])}e.bindRenderbuffer(e.RENDERBUFFER,null),h.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),Ce(U.__webglDepthRenderbuffer,h,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(H){t.bindTexture(e.TEXTURE_CUBE_MAP,V.__webglTexture),Ge(e.TEXTURE_CUBE_MAP,s);for(let ne=0;ne<6;ne++)if(s.mipmaps&&s.mipmaps.length>0)for(let Ee=0;Ee<s.mipmaps.length;Ee++)de(U.__webglFramebuffer[ne][Ee],h,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ee);else de(U.__webglFramebuffer[ne],h,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);f(s)&&a(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ne=0,Ee=Z.length;ne<Ee;ne++){const Me=Z[ne],J=i.get(Me);let se=e.TEXTURE_2D;(h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(se=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(se,J.__webglTexture),Ge(se,Me),de(U.__webglFramebuffer,h,Me,e.COLOR_ATTACHMENT0+ne,se,0),f(Me)&&a(se)}t.unbindTexture()}else{let ne=e.TEXTURE_2D;if((h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(ne=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ne,V.__webglTexture),Ge(ne,s),s.mipmaps&&s.mipmaps.length>0)for(let Ee=0;Ee<s.mipmaps.length;Ee++)de(U.__webglFramebuffer[Ee],h,s,e.COLOR_ATTACHMENT0,ne,Ee);else de(U.__webglFramebuffer,h,s,e.COLOR_ATTACHMENT0,ne,0);f(s)&&a(ne),t.unbindTexture()}h.depthBuffer&&K(h)}function Ie(h){const s=h.textures;for(let U=0,V=s.length;U<V;U++){const Z=s[U];if(f(Z)){const H=S(h),xe=i.get(Z).__webglTexture;t.bindTexture(H,xe),a(H),t.unbindTexture()}}}const we=[],_e=[];function fe(h){if(h.samples>0){if(ge(h)===!1){const s=h.textures,U=h.width,V=h.height;let Z=e.COLOR_BUFFER_BIT;const H=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,xe=i.get(h),ne=s.length>1;if(ne)for(let Me=0;Me<s.length;Me++)t.bindFramebuffer(e.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Me,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,xe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Me,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const Ee=h.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Me=0;Me<s.length;Me++){if(h.resolveDepthBuffer&&(h.depthBuffer&&(Z|=e.DEPTH_BUFFER_BIT),h.stencilBuffer&&h.resolveStencilBuffer&&(Z|=e.STENCIL_BUFFER_BIT)),ne){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,xe.__webglColorRenderbuffer[Me]);const J=i.get(s[Me]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,J,0)}e.blitFramebuffer(0,0,U,V,0,0,U,V,Z,e.NEAREST),v===!0&&(we.length=0,_e.length=0,we.push(e.COLOR_ATTACHMENT0+Me),h.depthBuffer&&h.resolveDepthBuffer===!1&&(we.push(H),_e.push(H),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,_e)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ne)for(let Me=0;Me<s.length;Me++){t.bindFramebuffer(e.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Me,e.RENDERBUFFER,xe.__webglColorRenderbuffer[Me]);const J=i.get(s[Me]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,xe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Me,e.TEXTURE_2D,J,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(h.depthBuffer&&h.resolveDepthBuffer===!1&&v){const s=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[s])}}}function Ze(h){return Math.min(o.maxSamples,h.samples)}function ge(h){const s=i.get(h);return h.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&s.__useRenderToTexture!==!1}function Oe(h){const s=c.render.frame;b.get(h)!==s&&(b.set(h,s),h.update())}function ct(h,s){const U=h.colorSpace,V=h.format,Z=h.type;return h.isCompressedTexture===!0||h.isVideoTexture===!0||U!==Fn&&U!==Xt&&(at.getTransfer(U)===et?(V!==Ct||Z!==Vt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),s}function rt(h){return typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement?(E.width=h.naturalWidth||h.width,E.height=h.naturalHeight||h.height):typeof VideoFrame<"u"&&h instanceof VideoFrame?(E.width=h.displayWidth,E.height=h.displayHeight):(E.width=h.width,E.height=h.height),E}this.allocateTextureUnit=X,this.resetTextureUnits=B,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=te,this.setTextureCube=G,this.rebindTextures=Se,this.setupRenderTarget=m,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=fe,this.setupDepthRenderbuffer=K,this.setupFrameBufferTexture=de,this.useMultisampledRTT=ge}function au(e,n){function t(i,o=Xt){let r;const c=at.getTransfer(o);if(i===Vt)return e.UNSIGNED_BYTE;if(i===Sa)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Ma)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Bo)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Ho)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Go)return e.BYTE;if(i===Vo)return e.SHORT;if(i===yn)return e.UNSIGNED_SHORT;if(i===xa)return e.INT;if(i===fn)return e.UNSIGNED_INT;if(i===Bt)return e.FLOAT;if(i===On)return e.HALF_FLOAT;if(i===ko)return e.ALPHA;if(i===Wo)return e.RGB;if(i===Ct)return e.RGBA;if(i===Ri)return e.DEPTH_COMPONENT;if(i===Dn)return e.DEPTH_STENCIL;if(i===zo)return e.RED;if(i===Aa)return e.RED_INTEGER;if(i===Xo)return e.RG;if(i===Ra)return e.RG_INTEGER;if(i===ba)return e.RGBA_INTEGER;if(i===Xn||i===Yn||i===Kn||i===qn)if(c===et)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Xn)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Yn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Kn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===qn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Xn)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Yn)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Kn)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===qn)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Gi||i===Vi||i===ki||i===Wi)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Gi)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Vi)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ki)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wi)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===zi||i===Xi||i===Yi)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===zi||i===Xi)return c===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Yi)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ki||i===qi||i===$i||i===Zi||i===ji||i===Qi||i===Ji||i===er||i===tr||i===nr||i===ir||i===rr||i===ar||i===or)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ki)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===qi)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$i)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Zi)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ji)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qi)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ji)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===er)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===tr)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nr)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ir)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===rr)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ar)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===or)return c===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sr||i===lr||i===cr)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===sr)return c===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===lr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===cr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===dr||i===fr||i===ur||i===pr)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===dr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===fr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ur)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===pr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===dn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const ou=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,su=`
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

}`;class lu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new Ta(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Lt({vertexShader:ou,fragmentShader:su,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new hn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cu extends io{constructor(n,t){super();const i=this;let o=null,r=1,c=null,l="local-floor",v=1,E=null,b=null,T=null,M=null,x=null,I=null;const y=typeof XRWebGLBinding<"u",f=new lu,a={},S=t.getContextAttributes();let _=null,g=null;const D=[],A=[],P=new Ye;let F=null;const p=new $t;p.viewport=new dt;const u=new $t;u.viewport=new dt;const L=[p,u],B=new ro;let X=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let $=D[k];return $===void 0&&($=new Wn,D[k]=$),$.getTargetRaySpace()},this.getControllerGrip=function(k){let $=D[k];return $===void 0&&($=new Wn,D[k]=$),$.getGripSpace()},this.getHand=function(k){let $=D[k];return $===void 0&&($=new Wn,D[k]=$),$.getHandSpace()};function q(k){const $=A.indexOf(k.inputSource);if($===-1)return;const de=D[$];de!==void 0&&(de.update(k.inputSource,k.frame,E||c),de.dispatchEvent({type:k.type,data:k.inputSource}))}function W(){o.removeEventListener("select",q),o.removeEventListener("selectstart",q),o.removeEventListener("selectend",q),o.removeEventListener("squeeze",q),o.removeEventListener("squeezestart",q),o.removeEventListener("squeezeend",q),o.removeEventListener("end",W),o.removeEventListener("inputsourceschange",te);for(let k=0;k<D.length;k++){const $=A[k];$!==null&&(A[k]=null,D[k].disconnect($))}X=null,Y=null,f.reset();for(const k in a)delete a[k];n.setRenderTarget(_),x=null,M=null,T=null,o=null,g=null,We.stop(),i.isPresenting=!1,n.setPixelRatio(F),n.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){l=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return E||c},this.setReferenceSpace=function(k){E=k},this.getBaseLayer=function(){return M!==null?M:x},this.getBinding=function(){return T===null&&y&&(T=new XRWebGLBinding(o,t)),T},this.getFrame=function(){return I},this.getSession=function(){return o},this.setSession=async function(k){if(o=k,o!==null){if(_=n.getRenderTarget(),o.addEventListener("select",q),o.addEventListener("selectstart",q),o.addEventListener("selectend",q),o.addEventListener("squeeze",q),o.addEventListener("squeezestart",q),o.addEventListener("squeezeend",q),o.addEventListener("end",W),o.addEventListener("inputsourceschange",te),S.xrCompatible!==!0&&await t.makeXRCompatible(),F=n.getPixelRatio(),n.getSize(P),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Ce=null,ve=null;S.depth&&(ve=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=S.stencil?Dn:Ri,Ce=S.stencil?dn:fn);const K={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};T=this.getBinding(),M=T.createProjectionLayer(K),o.updateRenderState({layers:[M]}),n.setPixelRatio(1),n.setSize(M.textureWidth,M.textureHeight,!1),g=new jt(M.textureWidth,M.textureHeight,{format:Ct,type:Vt,depthTexture:new ga(M.textureWidth,M.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:S.stencil,colorSpace:n.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}else{const de={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};x=new XRWebGLLayer(o,t,de),o.updateRenderState({baseLayer:x}),n.setPixelRatio(1),n.setSize(x.framebufferWidth,x.framebufferHeight,!1),g=new jt(x.framebufferWidth,x.framebufferHeight,{format:Ct,type:Vt,colorSpace:n.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(v),E=null,c=await o.requestReferenceSpace(l),We.setContext(o),We.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function te(k){for(let $=0;$<k.removed.length;$++){const de=k.removed[$],Ce=A.indexOf(de);Ce>=0&&(A[Ce]=null,D[Ce].disconnect(de))}for(let $=0;$<k.added.length;$++){const de=k.added[$];let Ce=A.indexOf(de);if(Ce===-1){for(let K=0;K<D.length;K++)if(K>=A.length){A.push(de),Ce=K;break}else if(A[K]===null){A[K]=de,Ce=K;break}if(Ce===-1)break}const ve=D[Ce];ve&&ve.connect(de)}}const G=new le,me=new le;function Ae(k,$,de){G.setFromMatrixPosition($.matrixWorld),me.setFromMatrixPosition(de.matrixWorld);const Ce=G.distanceTo(me),ve=$.projectionMatrix.elements,K=de.projectionMatrix.elements,Se=ve[14]/(ve[10]-1),m=ve[14]/(ve[10]+1),Ie=(ve[9]+1)/ve[5],we=(ve[9]-1)/ve[5],_e=(ve[8]-1)/ve[0],fe=(K[8]+1)/K[0],Ze=Se*_e,ge=Se*fe,Oe=Ce/(-_e+fe),ct=Oe*-_e;if($.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(ct),k.translateZ(Oe),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),ve[10]===-1)k.projectionMatrix.copy($.projectionMatrix),k.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const rt=Se+Oe,h=m+Oe,s=Ze-ct,U=ge+(Ce-ct),V=Ie*m/h*rt,Z=we*m/h*rt;k.projectionMatrix.makePerspective(s,U,V,Z,rt,h),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function ye(k,$){$===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices($.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(o===null)return;let $=k.near,de=k.far;f.texture!==null&&(f.depthNear>0&&($=f.depthNear),f.depthFar>0&&(de=f.depthFar)),B.near=u.near=p.near=$,B.far=u.far=p.far=de,(X!==B.near||Y!==B.far)&&(o.updateRenderState({depthNear:B.near,depthFar:B.far}),X=B.near,Y=B.far),B.layers.mask=k.layers.mask|6,p.layers.mask=B.layers.mask&3,u.layers.mask=B.layers.mask&5;const Ce=k.parent,ve=B.cameras;ye(B,Ce);for(let K=0;K<ve.length;K++)ye(ve[K],Ce);ve.length===2?Ae(B,p,u):B.projectionMatrix.copy(p.projectionMatrix),Ge(k,B,Ce)};function Ge(k,$,de){de===null?k.matrix.copy($.matrixWorld):(k.matrix.copy(de.matrixWorld),k.matrix.invert(),k.matrix.multiply($.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy($.projectionMatrix),k.projectionMatrixInverse.copy($.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=ao*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(M===null&&x===null))return v},this.setFoveation=function(k){v=k,M!==null&&(M.fixedFoveation=k),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=k)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(B)},this.getCameraTexture=function(k){return a[k]};let Qe=null;function $e(k,$){if(b=$.getViewerPose(E||c),I=$,b!==null){const de=b.views;x!==null&&(n.setRenderTargetFramebuffer(g,x.framebuffer),n.setRenderTarget(g));let Ce=!1;de.length!==B.cameras.length&&(B.cameras.length=0,Ce=!0);for(let m=0;m<de.length;m++){const Ie=de[m];let we=null;if(x!==null)we=x.getViewport(Ie);else{const fe=T.getViewSubImage(M,Ie);we=fe.viewport,m===0&&(n.setRenderTargetTextures(g,fe.colorTexture,fe.depthStencilTexture),n.setRenderTarget(g))}let _e=L[m];_e===void 0&&(_e=new $t,_e.layers.enable(m),_e.viewport=new dt,L[m]=_e),_e.matrix.fromArray(Ie.transform.matrix),_e.matrix.decompose(_e.position,_e.quaternion,_e.scale),_e.projectionMatrix.fromArray(Ie.projectionMatrix),_e.projectionMatrixInverse.copy(_e.projectionMatrix).invert(),_e.viewport.set(we.x,we.y,we.width,we.height),m===0&&(B.matrix.copy(_e.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ce===!0&&B.cameras.push(_e)}const ve=o.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&y){T=i.getBinding();const m=T.getDepthInformation(de[0]);m&&m.isValid&&m.texture&&f.init(m,o.renderState)}if(ve&&ve.includes("camera-access")&&y){n.state.unbindTexture(),T=i.getBinding();for(let m=0;m<de.length;m++){const Ie=de[m].camera;if(Ie){let we=a[Ie];we||(we=new Ta,a[Ie]=we);const _e=T.getCameraImage(Ie);we.sourceTexture=_e}}}}for(let de=0;de<D.length;de++){const Ce=A[de],ve=D[de];Ce!==null&&ve!==void 0&&ve.update(Ce,$,E||c)}Qe&&Qe(k,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),I=null}const We=new Na;We.setAnimationLoop($e),this.setAnimationLoop=function(k){Qe=k},this.dispose=function(){}}}const Nt=new Un,du=new Mt;function fu(e,n){function t(f,a){f.matrixAutoUpdate===!0&&f.updateMatrix(),a.value.copy(f.matrix)}function i(f,a){a.color.getRGB(f.fogColor.value,Ca(e)),a.isFog?(f.fogNear.value=a.near,f.fogFar.value=a.far):a.isFogExp2&&(f.fogDensity.value=a.density)}function o(f,a,S,_,g){a.isMeshBasicMaterial||a.isMeshLambertMaterial?r(f,a):a.isMeshToonMaterial?(r(f,a),T(f,a)):a.isMeshPhongMaterial?(r(f,a),b(f,a)):a.isMeshStandardMaterial?(r(f,a),M(f,a),a.isMeshPhysicalMaterial&&x(f,a,g)):a.isMeshMatcapMaterial?(r(f,a),I(f,a)):a.isMeshDepthMaterial?r(f,a):a.isMeshDistanceMaterial?(r(f,a),y(f,a)):a.isMeshNormalMaterial?r(f,a):a.isLineBasicMaterial?(c(f,a),a.isLineDashedMaterial&&l(f,a)):a.isPointsMaterial?v(f,a,S,_):a.isSpriteMaterial?E(f,a):a.isShadowMaterial?(f.color.value.copy(a.color),f.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}function r(f,a){f.opacity.value=a.opacity,a.color&&f.diffuse.value.copy(a.color),a.emissive&&f.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(f.map.value=a.map,t(a.map,f.mapTransform)),a.alphaMap&&(f.alphaMap.value=a.alphaMap,t(a.alphaMap,f.alphaMapTransform)),a.bumpMap&&(f.bumpMap.value=a.bumpMap,t(a.bumpMap,f.bumpMapTransform),f.bumpScale.value=a.bumpScale,a.side===Tt&&(f.bumpScale.value*=-1)),a.normalMap&&(f.normalMap.value=a.normalMap,t(a.normalMap,f.normalMapTransform),f.normalScale.value.copy(a.normalScale),a.side===Tt&&f.normalScale.value.negate()),a.displacementMap&&(f.displacementMap.value=a.displacementMap,t(a.displacementMap,f.displacementMapTransform),f.displacementScale.value=a.displacementScale,f.displacementBias.value=a.displacementBias),a.emissiveMap&&(f.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,f.emissiveMapTransform)),a.specularMap&&(f.specularMap.value=a.specularMap,t(a.specularMap,f.specularMapTransform)),a.alphaTest>0&&(f.alphaTest.value=a.alphaTest);const S=n.get(a),_=S.envMap,g=S.envMapRotation;_&&(f.envMap.value=_,Nt.copy(g),Nt.x*=-1,Nt.y*=-1,Nt.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Nt.y*=-1,Nt.z*=-1),f.envMapRotation.value.setFromMatrix4(du.makeRotationFromEuler(Nt)),f.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=a.reflectivity,f.ior.value=a.ior,f.refractionRatio.value=a.refractionRatio),a.lightMap&&(f.lightMap.value=a.lightMap,f.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,f.lightMapTransform)),a.aoMap&&(f.aoMap.value=a.aoMap,f.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,f.aoMapTransform))}function c(f,a){f.diffuse.value.copy(a.color),f.opacity.value=a.opacity,a.map&&(f.map.value=a.map,t(a.map,f.mapTransform))}function l(f,a){f.dashSize.value=a.dashSize,f.totalSize.value=a.dashSize+a.gapSize,f.scale.value=a.scale}function v(f,a,S,_){f.diffuse.value.copy(a.color),f.opacity.value=a.opacity,f.size.value=a.size*S,f.scale.value=_*.5,a.map&&(f.map.value=a.map,t(a.map,f.uvTransform)),a.alphaMap&&(f.alphaMap.value=a.alphaMap,t(a.alphaMap,f.alphaMapTransform)),a.alphaTest>0&&(f.alphaTest.value=a.alphaTest)}function E(f,a){f.diffuse.value.copy(a.color),f.opacity.value=a.opacity,f.rotation.value=a.rotation,a.map&&(f.map.value=a.map,t(a.map,f.mapTransform)),a.alphaMap&&(f.alphaMap.value=a.alphaMap,t(a.alphaMap,f.alphaMapTransform)),a.alphaTest>0&&(f.alphaTest.value=a.alphaTest)}function b(f,a){f.specular.value.copy(a.specular),f.shininess.value=Math.max(a.shininess,1e-4)}function T(f,a){a.gradientMap&&(f.gradientMap.value=a.gradientMap)}function M(f,a){f.metalness.value=a.metalness,a.metalnessMap&&(f.metalnessMap.value=a.metalnessMap,t(a.metalnessMap,f.metalnessMapTransform)),f.roughness.value=a.roughness,a.roughnessMap&&(f.roughnessMap.value=a.roughnessMap,t(a.roughnessMap,f.roughnessMapTransform)),a.envMap&&(f.envMapIntensity.value=a.envMapIntensity)}function x(f,a,S){f.ior.value=a.ior,a.sheen>0&&(f.sheenColor.value.copy(a.sheenColor).multiplyScalar(a.sheen),f.sheenRoughness.value=a.sheenRoughness,a.sheenColorMap&&(f.sheenColorMap.value=a.sheenColorMap,t(a.sheenColorMap,f.sheenColorMapTransform)),a.sheenRoughnessMap&&(f.sheenRoughnessMap.value=a.sheenRoughnessMap,t(a.sheenRoughnessMap,f.sheenRoughnessMapTransform))),a.clearcoat>0&&(f.clearcoat.value=a.clearcoat,f.clearcoatRoughness.value=a.clearcoatRoughness,a.clearcoatMap&&(f.clearcoatMap.value=a.clearcoatMap,t(a.clearcoatMap,f.clearcoatMapTransform)),a.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=a.clearcoatRoughnessMap,t(a.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),a.clearcoatNormalMap&&(f.clearcoatNormalMap.value=a.clearcoatNormalMap,t(a.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(a.clearcoatNormalScale),a.side===Tt&&f.clearcoatNormalScale.value.negate())),a.dispersion>0&&(f.dispersion.value=a.dispersion),a.iridescence>0&&(f.iridescence.value=a.iridescence,f.iridescenceIOR.value=a.iridescenceIOR,f.iridescenceThicknessMinimum.value=a.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=a.iridescenceThicknessRange[1],a.iridescenceMap&&(f.iridescenceMap.value=a.iridescenceMap,t(a.iridescenceMap,f.iridescenceMapTransform)),a.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=a.iridescenceThicknessMap,t(a.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),a.transmission>0&&(f.transmission.value=a.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),a.transmissionMap&&(f.transmissionMap.value=a.transmissionMap,t(a.transmissionMap,f.transmissionMapTransform)),f.thickness.value=a.thickness,a.thicknessMap&&(f.thicknessMap.value=a.thicknessMap,t(a.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=a.attenuationDistance,f.attenuationColor.value.copy(a.attenuationColor)),a.anisotropy>0&&(f.anisotropyVector.value.set(a.anisotropy*Math.cos(a.anisotropyRotation),a.anisotropy*Math.sin(a.anisotropyRotation)),a.anisotropyMap&&(f.anisotropyMap.value=a.anisotropyMap,t(a.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=a.specularIntensity,f.specularColor.value.copy(a.specularColor),a.specularColorMap&&(f.specularColorMap.value=a.specularColorMap,t(a.specularColorMap,f.specularColorMapTransform)),a.specularIntensityMap&&(f.specularIntensityMap.value=a.specularIntensityMap,t(a.specularIntensityMap,f.specularIntensityMapTransform))}function I(f,a){a.matcap&&(f.matcap.value=a.matcap)}function y(f,a){const S=n.get(a).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:o}}function uu(e,n,t,i){let o={},r={},c=[];const l=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function v(S,_){const g=_.program;i.uniformBlockBinding(S,g)}function E(S,_){let g=o[S.id];g===void 0&&(I(S),g=b(S),o[S.id]=g,S.addEventListener("dispose",f));const D=_.program;i.updateUBOMapping(S,D);const A=n.render.frame;r[S.id]!==A&&(M(S),r[S.id]=A)}function b(S){const _=T();S.__bindingPointIndex=_;const g=e.createBuffer(),D=S.__size,A=S.usage;return e.bindBuffer(e.UNIFORM_BUFFER,g),e.bufferData(e.UNIFORM_BUFFER,D,A),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,_,g),g}function T(){for(let S=0;S<l;S++)if(c.indexOf(S)===-1)return c.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function M(S){const _=o[S.id],g=S.uniforms,D=S.__cache;e.bindBuffer(e.UNIFORM_BUFFER,_);for(let A=0,P=g.length;A<P;A++){const F=Array.isArray(g[A])?g[A]:[g[A]];for(let p=0,u=F.length;p<u;p++){const L=F[p];if(x(L,A,p,D)===!0){const B=L.__offset,X=Array.isArray(L.value)?L.value:[L.value];let Y=0;for(let q=0;q<X.length;q++){const W=X[q],te=y(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,B+Y,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,Y),Y+=te.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,B,L.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function x(S,_,g,D){const A=S.value,P=_+"_"+g;if(D[P]===void 0)return typeof A=="number"||typeof A=="boolean"?D[P]=A:D[P]=A.clone(),!0;{const F=D[P];if(typeof A=="number"||typeof A=="boolean"){if(F!==A)return D[P]=A,!0}else if(F.equals(A)===!1)return F.copy(A),!0}return!1}function I(S){const _=S.uniforms;let g=0;const D=16;for(let P=0,F=_.length;P<F;P++){const p=Array.isArray(_[P])?_[P]:[_[P]];for(let u=0,L=p.length;u<L;u++){const B=p[u],X=Array.isArray(B.value)?B.value:[B.value];for(let Y=0,q=X.length;Y<q;Y++){const W=X[Y],te=y(W),G=g%D,me=G%te.boundary,Ae=G+me;g+=me,Ae!==0&&D-Ae<te.storage&&(g+=D-Ae),B.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=g,g+=te.storage}}}const A=g%D;return A>0&&(g+=D-A),S.__size=g,S.__cache={},this}function y(S){const _={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(_.boundary=4,_.storage=4):S.isVector2?(_.boundary=8,_.storage=8):S.isVector3||S.isColor?(_.boundary=16,_.storage=12):S.isVector4?(_.boundary=16,_.storage=16):S.isMatrix3?(_.boundary=48,_.storage=48):S.isMatrix4?(_.boundary=64,_.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),_}function f(S){const _=S.target;_.removeEventListener("dispose",f);const g=c.indexOf(_.__bindingPointIndex);c.splice(g,1),e.deleteBuffer(o[_.id]),delete o[_.id],delete r[_.id]}function a(){for(const S in o)e.deleteBuffer(o[S]);c=[],o={},r={}}return{bind:v,update:E,dispose:a}}class pu{constructor(n={}){const{canvas:t=eo(),context:i=null,depth:o=!0,stencil:r=!1,alpha:c=!1,antialias:l=!1,premultipliedAlpha:v=!0,preserveDrawingBuffer:E=!1,powerPreference:b="default",failIfMajorPerformanceCaveat:T=!1,reversedDepthBuffer:M=!1}=n;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=c;const I=new Uint32Array(4),y=new Int32Array(4);let f=null,a=null;const S=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const g=this;let D=!1;this._outputColorSpace=ma;let A=0,P=0,F=null,p=-1,u=null;const L=new dt,B=new dt;let X=null;const Y=new ze(0);let q=0,W=t.width,te=t.height,G=1,me=null,Ae=null;const ye=new dt(0,0,W,te),Ge=new dt(0,0,W,te);let Qe=!1;const $e=new _a;let We=!1,k=!1;const $=new Mt,de=new le,Ce=new dt,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let K=!1;function Se(){return F===null?G:1}let m=i;function Ie(d,w){return t.getContext(d,w)}try{const d={alpha:!0,depth:o,stencil:r,antialias:l,premultipliedAlpha:v,preserveDrawingBuffer:E,powerPreference:b,failIfMajorPerformanceCaveat:T};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${to}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",j,!1),m===null){const w="webgl2";if(m=Ie(w,d),m===null)throw Ie(w)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(d){throw console.error("THREE.WebGLRenderer: "+d.message),d}let we,_e,fe,Ze,ge,Oe,ct,rt,h,s,U,V,Z,H,xe,ne,Ee,Me,J,se,De,Te,ae,Ne;function R(){we=new Td(m),we.init(),Te=new au(m,we),_e=new md(m,we,n,Te),fe=new iu(m,we),_e.reversedDepthBuffer&&M&&fe.buffers.depth.setReversed(!0),Ze=new Rd(m),ge=new zf,Oe=new ru(m,we,fe,ge,_e,Te,Ze),ct=new gd(g),rt=new Md(g),h=new Ls(m),ae=new pd(m,h),s=new xd(m,h,Ze,ae),U=new wd(m,s,h,Ze),J=new bd(m,_e,Oe),ne=new _d(ge),V=new Wf(g,ct,rt,we,_e,ae,ne),Z=new fu(g,ge),H=new Yf,xe=new Qf(we),Me=new ud(g,ct,rt,fe,U,x,v),Ee=new tu(g,U,_e),Ne=new uu(m,Ze,_e,fe),se=new hd(m,we,Ze),De=new Ad(m,we,Ze),Ze.programs=V.programs,g.capabilities=_e,g.extensions=we,g.properties=ge,g.renderLists=H,g.shadowMap=Ee,g.state=fe,g.info=Ze}R();const ee=new cu(g,m);this.xr=ee,this.getContext=function(){return m},this.getContextAttributes=function(){return m.getContextAttributes()},this.forceContextLoss=function(){const d=we.get("WEBGL_lose_context");d&&d.loseContext()},this.forceContextRestore=function(){const d=we.get("WEBGL_lose_context");d&&d.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(d){d!==void 0&&(G=d,this.setSize(W,te,!1))},this.getSize=function(d){return d.set(W,te)},this.setSize=function(d,w,N=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=d,te=w,t.width=Math.floor(d*G),t.height=Math.floor(w*G),N===!0&&(t.style.width=d+"px",t.style.height=w+"px"),this.setViewport(0,0,d,w)},this.getDrawingBufferSize=function(d){return d.set(W*G,te*G).floor()},this.setDrawingBufferSize=function(d,w,N){W=d,te=w,G=N,t.width=Math.floor(d*N),t.height=Math.floor(w*N),this.setViewport(0,0,d,w)},this.getCurrentViewport=function(d){return d.copy(L)},this.getViewport=function(d){return d.copy(ye)},this.setViewport=function(d,w,N,O){d.isVector4?ye.set(d.x,d.y,d.z,d.w):ye.set(d,w,N,O),fe.viewport(L.copy(ye).multiplyScalar(G).round())},this.getScissor=function(d){return d.copy(Ge)},this.setScissor=function(d,w,N,O){d.isVector4?Ge.set(d.x,d.y,d.z,d.w):Ge.set(d,w,N,O),fe.scissor(B.copy(Ge).multiplyScalar(G).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(d){fe.setScissorTest(Qe=d)},this.setOpaqueSort=function(d){me=d},this.setTransparentSort=function(d){Ae=d},this.getClearColor=function(d){return d.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(d=!0,w=!0,N=!0){let O=0;if(d){let C=!1;if(F!==null){const Q=F.texture.format;C=Q===ba||Q===Ra||Q===Aa}if(C){const Q=F.texture.type,oe=Q===Vt||Q===fn||Q===yn||Q===dn||Q===Sa||Q===Ma,pe=Me.getClearColor(),ce=Me.getClearAlpha(),Pe=pe.r,Le=pe.g,Re=pe.b;oe?(I[0]=Pe,I[1]=Le,I[2]=Re,I[3]=ce,m.clearBufferuiv(m.COLOR,0,I)):(y[0]=Pe,y[1]=Le,y[2]=Re,y[3]=ce,m.clearBufferiv(m.COLOR,0,y))}else O|=m.COLOR_BUFFER_BIT}w&&(O|=m.DEPTH_BUFFER_BIT),N&&(O|=m.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),m.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",j,!1),Me.dispose(),H.dispose(),xe.dispose(),ge.dispose(),ct.dispose(),rt.dispose(),U.dispose(),ae.dispose(),Ne.dispose(),V.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",At),ee.removeEventListener("sessionend",Ui),yt.stop()};function ie(d){d.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const d=Ze.autoReset,w=Ee.enabled,N=Ee.autoUpdate,O=Ee.needsUpdate,C=Ee.type;R(),Ze.autoReset=d,Ee.enabled=w,Ee.autoUpdate=N,Ee.needsUpdate=O,Ee.type=C}function j(d){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",d.statusMessage)}function z(d){const w=d.target;w.removeEventListener("dispose",z),he(w)}function he(d){Ue(d),ge.remove(d)}function Ue(d){const w=ge.get(d).programs;w!==void 0&&(w.forEach(function(N){V.releaseProgram(N)}),d.isShaderMaterial&&V.releaseShaderCache(d))}this.renderBufferDirect=function(d,w,N,O,C,Q){w===null&&(w=ve);const oe=C.isMesh&&C.matrixWorld.determinant()<0,pe=qa(d,w,N,O,C);fe.setMaterial(O,oe);let ce=N.index,Pe=1;if(O.wireframe===!0){if(ce=s.getWireframeAttribute(N),ce===void 0)return;Pe=2}const Le=N.drawRange,Re=N.attributes.position;let Be=Le.start*Pe,Xe=(Le.start+Le.count)*Pe;Q!==null&&(Be=Math.max(Be,Q.start*Pe),Xe=Math.min(Xe,(Q.start+Q.count)*Pe)),ce!==null?(Be=Math.max(Be,0),Xe=Math.min(Xe,ce.count)):Re!=null&&(Be=Math.max(Be,0),Xe=Math.min(Xe,Re.count));const it=Xe-Be;if(it<0||it===1/0)return;ae.setup(C,O,pe,N,ce);let Je,qe=se;if(ce!==null&&(Je=h.get(ce),qe=De,qe.setIndex(Je)),C.isMesh)O.wireframe===!0?(fe.setLineWidth(O.wireframeLinewidth*Se()),qe.setMode(m.LINES)):qe.setMode(m.TRIANGLES);else if(C.isLine){let be=O.linewidth;be===void 0&&(be=1),fe.setLineWidth(be*Se()),C.isLineSegments?qe.setMode(m.LINES):C.isLineLoop?qe.setMode(m.LINE_LOOP):qe.setMode(m.LINE_STRIP)}else C.isPoints?qe.setMode(m.POINTS):C.isSprite&&qe.setMode(m.TRIANGLES);if(C.isBatchedMesh)if(C._multiDrawInstances!==null)fi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),qe.renderMultiDrawInstances(C._multiDrawStarts,C._multiDrawCounts,C._multiDrawCount,C._multiDrawInstances);else if(we.get("WEBGL_multi_draw"))qe.renderMultiDraw(C._multiDrawStarts,C._multiDrawCounts,C._multiDrawCount);else{const be=C._multiDrawStarts,tt=C._multiDrawCounts,Ve=C._multiDrawCount,_t=ce?h.get(ce).bytesPerElement:1,kt=ge.get(O).currentProgram.getUniforms();for(let gt=0;gt<Ve;gt++)kt.setValue(m,"_gl_DrawID",gt),qe.render(be[gt]/_t,tt[gt])}else if(C.isInstancedMesh)qe.renderInstances(Be,it,C.count);else if(N.isInstancedBufferGeometry){const be=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,tt=Math.min(N.instanceCount,be);qe.renderInstances(Be,it,tt)}else qe.render(Be,it)};function je(d,w,N){d.transparent===!0&&d.side===xt&&d.forceSinglePass===!1?(d.side=Tt,d.needsUpdate=!0,_n(d,w,N),d.side=cn,d.needsUpdate=!0,_n(d,w,N),d.side=xt):_n(d,w,N)}this.compile=function(d,w,N=null){N===null&&(N=d),a=xe.get(N),a.init(w),_.push(a),N.traverseVisible(function(C){C.isLight&&C.layers.test(w.layers)&&(a.pushLight(C),C.castShadow&&a.pushShadow(C))}),d!==N&&d.traverseVisible(function(C){C.isLight&&C.layers.test(w.layers)&&(a.pushLight(C),C.castShadow&&a.pushShadow(C))}),a.setupLights();const O=new Set;return d.traverse(function(C){if(!(C.isMesh||C.isPoints||C.isLine||C.isSprite))return;const Q=C.material;if(Q)if(Array.isArray(Q))for(let oe=0;oe<Q.length;oe++){const pe=Q[oe];je(pe,N,C),O.add(pe)}else je(Q,N,C),O.add(Q)}),a=_.pop(),O},this.compileAsync=function(d,w,N=null){const O=this.compile(d,w,N);return new Promise(C=>{function Q(){if(O.forEach(function(oe){ge.get(oe).currentProgram.isReady()&&O.delete(oe)}),O.size===0){C(d);return}setTimeout(Q,10)}we.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let ke=null;function bt(d){ke&&ke(d)}function At(){yt.stop()}function Ui(){yt.start()}const yt=new Na;yt.setAnimationLoop(bt),typeof self<"u"&&yt.setContext(self),this.setAnimationLoop=function(d){ke=d,ee.setAnimationLoop(d),d===null?yt.stop():yt.start()},ee.addEventListener("sessionstart",At),ee.addEventListener("sessionend",Ui),this.render=function(d,w){if(w!==void 0&&w.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),w.parent===null&&w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(w),w=ee.getCamera()),d.isScene===!0&&d.onBeforeRender(g,d,w,F),a=xe.get(d,_.length),a.init(w),_.push(a),$.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse),$e.setFromProjectionMatrix($,Hi,w.reversedDepth),k=this.localClippingEnabled,We=ne.init(this.clippingPlanes,k),f=H.get(d,S.length),f.init(),S.push(f),ee.enabled===!0&&ee.isPresenting===!0){const Q=g.xr.getDepthSensingMesh();Q!==null&&Vn(Q,w,-1/0,g.sortObjects)}Vn(d,w,0,g.sortObjects),f.finish(),g.sortObjects===!0&&f.sort(me,Ae),K=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,K&&Me.addToRenderList(f,d),this.info.render.frame++,We===!0&&ne.beginShadows();const N=a.state.shadowsArray;Ee.render(N,d,w),We===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=f.opaque,C=f.transmissive;if(a.setupLights(),w.isArrayCamera){const Q=w.cameras;if(C.length>0)for(let oe=0,pe=Q.length;oe<pe;oe++){const ce=Q[oe];Ni(O,C,d,ce)}K&&Me.render(d);for(let oe=0,pe=Q.length;oe<pe;oe++){const ce=Q[oe];Ii(f,d,ce,ce.viewport)}}else C.length>0&&Ni(O,C,d,w),K&&Me.render(d),Ii(f,d,w);F!==null&&P===0&&(Oe.updateMultisampleRenderTarget(F),Oe.updateRenderTargetMipmap(F)),d.isScene===!0&&d.onAfterRender(g,d,w),ae.resetDefaultState(),p=-1,u=null,_.pop(),_.length>0?(a=_[_.length-1],We===!0&&ne.setGlobalState(g.clippingPlanes,a.state.camera)):a=null,S.pop(),S.length>0?f=S[S.length-1]:f=null};function Vn(d,w,N,O){if(d.visible===!1)return;if(d.layers.test(w.layers)){if(d.isGroup)N=d.renderOrder;else if(d.isLOD)d.autoUpdate===!0&&d.update(w);else if(d.isLight)a.pushLight(d),d.castShadow&&a.pushShadow(d);else if(d.isSprite){if(!d.frustumCulled||$e.intersectsSprite(d)){O&&Ce.setFromMatrixPosition(d.matrixWorld).applyMatrix4($);const oe=U.update(d),pe=d.material;pe.visible&&f.push(d,oe,pe,N,Ce.z,null)}}else if((d.isMesh||d.isLine||d.isPoints)&&(!d.frustumCulled||$e.intersectsObject(d))){const oe=U.update(d),pe=d.material;if(O&&(d.boundingSphere!==void 0?(d.boundingSphere===null&&d.computeBoundingSphere(),Ce.copy(d.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Ce.copy(oe.boundingSphere.center)),Ce.applyMatrix4(d.matrixWorld).applyMatrix4($)),Array.isArray(pe)){const ce=oe.groups;for(let Pe=0,Le=ce.length;Pe<Le;Pe++){const Re=ce[Pe],Be=pe[Re.materialIndex];Be&&Be.visible&&f.push(d,oe,Be,N,Ce.z,Re)}}else pe.visible&&f.push(d,oe,pe,N,Ce.z,null)}}const Q=d.children;for(let oe=0,pe=Q.length;oe<pe;oe++)Vn(Q[oe],w,N,O)}function Ii(d,w,N,O){const C=d.opaque,Q=d.transmissive,oe=d.transparent;a.setupLightsView(N),We===!0&&ne.setGlobalState(g.clippingPlanes,N),O&&fe.viewport(L.copy(O)),C.length>0&&mn(C,w,N),Q.length>0&&mn(Q,w,N),oe.length>0&&mn(oe,w,N),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Ni(d,w,N,O){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;a.state.transmissionRenderTarget[O.id]===void 0&&(a.state.transmissionRenderTarget[O.id]=new jt(1,1,{generateMipmaps:!0,type:we.has("EXT_color_buffer_half_float")||we.has("EXT_color_buffer_float")?On:Vt,minFilter:rn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const Q=a.state.transmissionRenderTarget[O.id],oe=O.viewport||L;Q.setSize(oe.z*g.transmissionResolutionScale,oe.w*g.transmissionResolutionScale);const pe=g.getRenderTarget(),ce=g.getActiveCubeFace(),Pe=g.getActiveMipmapLevel();g.setRenderTarget(Q),g.getClearColor(Y),q=g.getClearAlpha(),q<1&&g.setClearColor(16777215,.5),g.clear(),K&&Me.render(N);const Le=g.toneMapping;g.toneMapping=Pt;const Re=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),a.setupLightsView(O),We===!0&&ne.setGlobalState(g.clippingPlanes,O),mn(d,N,O),Oe.updateMultisampleRenderTarget(Q),Oe.updateRenderTargetMipmap(Q),we.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let Xe=0,it=w.length;Xe<it;Xe++){const Je=w[Xe],qe=Je.object,be=Je.geometry,tt=Je.material,Ve=Je.group;if(tt.side===xt&&qe.layers.test(O.layers)){const _t=tt.side;tt.side=Tt,tt.needsUpdate=!0,Oi(qe,N,O,be,tt,Ve),tt.side=_t,tt.needsUpdate=!0,Be=!0}}Be===!0&&(Oe.updateMultisampleRenderTarget(Q),Oe.updateRenderTargetMipmap(Q))}g.setRenderTarget(pe,ce,Pe),g.setClearColor(Y,q),Re!==void 0&&(O.viewport=Re),g.toneMapping=Le}function mn(d,w,N){const O=w.isScene===!0?w.overrideMaterial:null;for(let C=0,Q=d.length;C<Q;C++){const oe=d[C],pe=oe.object,ce=oe.geometry,Pe=oe.group;let Le=oe.material;Le.allowOverride===!0&&O!==null&&(Le=O),pe.layers.test(N.layers)&&Oi(pe,w,N,ce,Le,Pe)}}function Oi(d,w,N,O,C,Q){d.onBeforeRender(g,w,N,O,C,Q),d.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,d.matrixWorld),d.normalMatrix.getNormalMatrix(d.modelViewMatrix),C.onBeforeRender(g,w,N,O,d,Q),C.transparent===!0&&C.side===xt&&C.forceSinglePass===!1?(C.side=Tt,C.needsUpdate=!0,g.renderBufferDirect(N,w,O,C,d,Q),C.side=cn,C.needsUpdate=!0,g.renderBufferDirect(N,w,O,C,d,Q),C.side=xt):g.renderBufferDirect(N,w,O,C,d,Q),d.onAfterRender(g,w,N,O,C,Q)}function _n(d,w,N){w.isScene!==!0&&(w=ve);const O=ge.get(d),C=a.state.lights,Q=a.state.shadowsArray,oe=C.state.version,pe=V.getParameters(d,C.state,Q,w,N),ce=V.getProgramCacheKey(pe);let Pe=O.programs;O.environment=d.isMeshStandardMaterial?w.environment:null,O.fog=w.fog,O.envMap=(d.isMeshStandardMaterial?rt:ct).get(d.envMap||O.environment),O.envMapRotation=O.environment!==null&&d.envMap===null?w.environmentRotation:d.envMapRotation,Pe===void 0&&(d.addEventListener("dispose",z),Pe=new Map,O.programs=Pe);let Le=Pe.get(ce);if(Le!==void 0){if(O.currentProgram===Le&&O.lightsStateVersion===oe)return Bi(d,pe),Le}else pe.uniforms=V.getUniforms(d),d.onBeforeCompile(pe,g),Le=V.acquireProgram(pe,ce),Pe.set(ce,Le),O.uniforms=pe.uniforms;const Re=O.uniforms;return(!d.isShaderMaterial&&!d.isRawShaderMaterial||d.clipping===!0)&&(Re.clippingPlanes=ne.uniform),Bi(d,pe),O.needsLights=Za(d),O.lightsStateVersion=oe,O.needsLights&&(Re.ambientLightColor.value=C.state.ambient,Re.lightProbe.value=C.state.probe,Re.directionalLights.value=C.state.directional,Re.directionalLightShadows.value=C.state.directionalShadow,Re.spotLights.value=C.state.spot,Re.spotLightShadows.value=C.state.spotShadow,Re.rectAreaLights.value=C.state.rectArea,Re.ltc_1.value=C.state.rectAreaLTC1,Re.ltc_2.value=C.state.rectAreaLTC2,Re.pointLights.value=C.state.point,Re.pointLightShadows.value=C.state.pointShadow,Re.hemisphereLights.value=C.state.hemi,Re.directionalShadowMap.value=C.state.directionalShadowMap,Re.directionalShadowMatrix.value=C.state.directionalShadowMatrix,Re.spotShadowMap.value=C.state.spotShadowMap,Re.spotLightMatrix.value=C.state.spotLightMatrix,Re.spotLightMap.value=C.state.spotLightMap,Re.pointShadowMap.value=C.state.pointShadowMap,Re.pointShadowMatrix.value=C.state.pointShadowMatrix),O.currentProgram=Le,O.uniformsList=null,Le}function Fi(d){if(d.uniformsList===null){const w=d.currentProgram.getUniforms();d.uniformsList=Cn.seqWithValue(w.seq,d.uniforms)}return d.uniformsList}function Bi(d,w){const N=ge.get(d);N.outputColorSpace=w.outputColorSpace,N.batching=w.batching,N.batchingColor=w.batchingColor,N.instancing=w.instancing,N.instancingColor=w.instancingColor,N.instancingMorph=w.instancingMorph,N.skinning=w.skinning,N.morphTargets=w.morphTargets,N.morphNormals=w.morphNormals,N.morphColors=w.morphColors,N.morphTargetsCount=w.morphTargetsCount,N.numClippingPlanes=w.numClippingPlanes,N.numIntersection=w.numClipIntersection,N.vertexAlphas=w.vertexAlphas,N.vertexTangents=w.vertexTangents,N.toneMapping=w.toneMapping}function qa(d,w,N,O,C){w.isScene!==!0&&(w=ve),Oe.resetTextureUnits();const Q=w.fog,oe=O.isMeshStandardMaterial?w.environment:null,pe=F===null?g.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Fn,ce=(O.isMeshStandardMaterial?rt:ct).get(O.envMap||oe),Pe=O.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Le=!!N.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Re=!!N.morphAttributes.position,Be=!!N.morphAttributes.normal,Xe=!!N.morphAttributes.color;let it=Pt;O.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(it=g.toneMapping);const Je=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,qe=Je!==void 0?Je.length:0,be=ge.get(O),tt=a.state.lights;if(We===!0&&(k===!0||d!==u)){const ft=d===u&&O.id===p;ne.setState(O,d,ft)}let Ve=!1;O.version===be.__version?(be.needsLights&&be.lightsStateVersion!==tt.state.version||be.outputColorSpace!==pe||C.isBatchedMesh&&be.batching===!1||!C.isBatchedMesh&&be.batching===!0||C.isBatchedMesh&&be.batchingColor===!0&&C.colorTexture===null||C.isBatchedMesh&&be.batchingColor===!1&&C.colorTexture!==null||C.isInstancedMesh&&be.instancing===!1||!C.isInstancedMesh&&be.instancing===!0||C.isSkinnedMesh&&be.skinning===!1||!C.isSkinnedMesh&&be.skinning===!0||C.isInstancedMesh&&be.instancingColor===!0&&C.instanceColor===null||C.isInstancedMesh&&be.instancingColor===!1&&C.instanceColor!==null||C.isInstancedMesh&&be.instancingMorph===!0&&C.morphTexture===null||C.isInstancedMesh&&be.instancingMorph===!1&&C.morphTexture!==null||be.envMap!==ce||O.fog===!0&&be.fog!==Q||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==ne.numPlanes||be.numIntersection!==ne.numIntersection)||be.vertexAlphas!==Pe||be.vertexTangents!==Le||be.morphTargets!==Re||be.morphNormals!==Be||be.morphColors!==Xe||be.toneMapping!==it||be.morphTargetsCount!==qe)&&(Ve=!0):(Ve=!0,be.__version=O.version);let _t=be.currentProgram;Ve===!0&&(_t=_n(O,w,C));let kt=!1,gt=!1,tn=!1;const nt=_t.getUniforms(),Et=be.uniforms;if(fe.useProgram(_t.program)&&(kt=!0,gt=!0,tn=!0),O.id!==p&&(p=O.id,gt=!0),kt||u!==d){fe.buffers.depth.getReversed()&&d.reversedDepth!==!0&&(d._reversedDepth=!0,d.updateProjectionMatrix()),nt.setValue(m,"projectionMatrix",d.projectionMatrix),nt.setValue(m,"viewMatrix",d.matrixWorldInverse);const pt=nt.map.cameraPosition;pt!==void 0&&pt.setValue(m,de.setFromMatrixPosition(d.matrixWorld)),_e.logarithmicDepthBuffer&&nt.setValue(m,"logDepthBufFC",2/(Math.log(d.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&nt.setValue(m,"isOrthographic",d.isOrthographicCamera===!0),u!==d&&(u=d,gt=!0,tn=!0)}if(C.isSkinnedMesh){nt.setOptional(m,C,"bindMatrix"),nt.setOptional(m,C,"bindMatrixInverse");const ft=C.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),nt.setValue(m,"boneTexture",ft.boneTexture,Oe))}C.isBatchedMesh&&(nt.setOptional(m,C,"batchingTexture"),nt.setValue(m,"batchingTexture",C._matricesTexture,Oe),nt.setOptional(m,C,"batchingIdTexture"),nt.setValue(m,"batchingIdTexture",C._indirectTexture,Oe),nt.setOptional(m,C,"batchingColorTexture"),C._colorsTexture!==null&&nt.setValue(m,"batchingColorTexture",C._colorsTexture,Oe));const St=N.morphAttributes;if((St.position!==void 0||St.normal!==void 0||St.color!==void 0)&&J.update(C,N,_t),(gt||be.receiveShadow!==C.receiveShadow)&&(be.receiveShadow=C.receiveShadow,nt.setValue(m,"receiveShadow",C.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Et.envMap.value=ce,Et.flipEnvMap.value=ce.isCubeTexture&&ce.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&w.environment!==null&&(Et.envMapIntensity.value=w.environmentIntensity),gt&&(nt.setValue(m,"toneMappingExposure",g.toneMappingExposure),be.needsLights&&$a(Et,tn),Q&&O.fog===!0&&Z.refreshFogUniforms(Et,Q),Z.refreshMaterialUniforms(Et,O,G,te,a.state.transmissionRenderTarget[d.id]),Cn.upload(m,Fi(be),Et,Oe)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Cn.upload(m,Fi(be),Et,Oe),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&nt.setValue(m,"center",C.center),nt.setValue(m,"modelViewMatrix",C.modelViewMatrix),nt.setValue(m,"normalMatrix",C.normalMatrix),nt.setValue(m,"modelMatrix",C.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const ft=O.uniformsGroups;for(let pt=0,kn=ft.length;pt<kn;pt++){const Ut=ft[pt];Ne.update(Ut,_t),Ne.bind(Ut,_t)}}return _t}function $a(d,w){d.ambientLightColor.needsUpdate=w,d.lightProbe.needsUpdate=w,d.directionalLights.needsUpdate=w,d.directionalLightShadows.needsUpdate=w,d.pointLights.needsUpdate=w,d.pointLightShadows.needsUpdate=w,d.spotLights.needsUpdate=w,d.spotLightShadows.needsUpdate=w,d.rectAreaLights.needsUpdate=w,d.hemisphereLights.needsUpdate=w}function Za(d){return d.isMeshLambertMaterial||d.isMeshToonMaterial||d.isMeshPhongMaterial||d.isMeshStandardMaterial||d.isShadowMaterial||d.isShaderMaterial&&d.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(d,w,N){const O=ge.get(d);O.__autoAllocateDepthBuffer=d.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),ge.get(d.texture).__webglTexture=w,ge.get(d.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:N,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(d,w){const N=ge.get(d);N.__webglFramebuffer=w,N.__useDefaultFramebuffer=w===void 0};const ja=m.createFramebuffer();this.setRenderTarget=function(d,w=0,N=0){F=d,A=w,P=N;let O=!0,C=null,Q=!1,oe=!1;if(d){const ce=ge.get(d);if(ce.__useDefaultFramebuffer!==void 0)fe.bindFramebuffer(m.FRAMEBUFFER,null),O=!1;else if(ce.__webglFramebuffer===void 0)Oe.setupRenderTarget(d);else if(ce.__hasExternalTextures)Oe.rebindTextures(d,ge.get(d.texture).__webglTexture,ge.get(d.depthTexture).__webglTexture);else if(d.depthBuffer){const Re=d.depthTexture;if(ce.__boundDepthTexture!==Re){if(Re!==null&&ge.has(Re)&&(d.width!==Re.image.width||d.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(d)}}const Pe=d.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(oe=!0);const Le=ge.get(d).__webglFramebuffer;d.isWebGLCubeRenderTarget?(Array.isArray(Le[w])?C=Le[w][N]:C=Le[w],Q=!0):d.samples>0&&Oe.useMultisampledRTT(d)===!1?C=ge.get(d).__webglMultisampledFramebuffer:Array.isArray(Le)?C=Le[N]:C=Le,L.copy(d.viewport),B.copy(d.scissor),X=d.scissorTest}else L.copy(ye).multiplyScalar(G).floor(),B.copy(Ge).multiplyScalar(G).floor(),X=Qe;if(N!==0&&(C=ja),fe.bindFramebuffer(m.FRAMEBUFFER,C)&&O&&fe.drawBuffers(d,C),fe.viewport(L),fe.scissor(B),fe.setScissorTest(X),Q){const ce=ge.get(d.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_CUBE_MAP_POSITIVE_X+w,ce.__webglTexture,N)}else if(oe){const ce=w;for(let Pe=0;Pe<d.textures.length;Pe++){const Le=ge.get(d.textures[Pe]);m.framebufferTextureLayer(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0+Pe,Le.__webglTexture,N,ce)}}else if(d!==null&&N!==0){const ce=ge.get(d.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,ce.__webglTexture,N)}p=-1},this.readRenderTargetPixels=function(d,w,N,O,C,Q,oe,pe=0){if(!(d&&d.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ce=ge.get(d).__webglFramebuffer;if(d.isWebGLCubeRenderTarget&&oe!==void 0&&(ce=ce[oe]),ce){fe.bindFramebuffer(m.FRAMEBUFFER,ce);try{const Pe=d.textures[pe],Le=Pe.format,Re=Pe.type;if(!_e.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}w>=0&&w<=d.width-O&&N>=0&&N<=d.height-C&&(d.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+pe),m.readPixels(w,N,O,C,Te.convert(Le),Te.convert(Re),Q))}finally{const Pe=F!==null?ge.get(F).__webglFramebuffer:null;fe.bindFramebuffer(m.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(d,w,N,O,C,Q,oe,pe=0){if(!(d&&d.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ce=ge.get(d).__webglFramebuffer;if(d.isWebGLCubeRenderTarget&&oe!==void 0&&(ce=ce[oe]),ce)if(w>=0&&w<=d.width-O&&N>=0&&N<=d.height-C){fe.bindFramebuffer(m.FRAMEBUFFER,ce);const Pe=d.textures[pe],Le=Pe.format,Re=Pe.type;if(!_e.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Be=m.createBuffer();m.bindBuffer(m.PIXEL_PACK_BUFFER,Be),m.bufferData(m.PIXEL_PACK_BUFFER,Q.byteLength,m.STREAM_READ),d.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+pe),m.readPixels(w,N,O,C,Te.convert(Le),Te.convert(Re),0);const Xe=F!==null?ge.get(F).__webglFramebuffer:null;fe.bindFramebuffer(m.FRAMEBUFFER,Xe);const it=m.fenceSync(m.SYNC_GPU_COMMANDS_COMPLETE,0);return m.flush(),await no(m,it,4),m.bindBuffer(m.PIXEL_PACK_BUFFER,Be),m.getBufferSubData(m.PIXEL_PACK_BUFFER,0,Q),m.deleteBuffer(Be),m.deleteSync(it),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(d,w=null,N=0){const O=Math.pow(2,-N),C=Math.floor(d.image.width*O),Q=Math.floor(d.image.height*O),oe=w!==null?w.x:0,pe=w!==null?w.y:0;Oe.setTexture2D(d,0),m.copyTexSubImage2D(m.TEXTURE_2D,N,0,0,oe,pe,C,Q),fe.unbindTexture()};const Qa=m.createFramebuffer(),Ja=m.createFramebuffer();this.copyTextureToTexture=function(d,w,N=null,O=null,C=0,Q=null){Q===null&&(C!==0?(fi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=C,C=0):Q=0);let oe,pe,ce,Pe,Le,Re,Be,Xe,it;const Je=d.isCompressedTexture?d.mipmaps[Q]:d.image;if(N!==null)oe=N.max.x-N.min.x,pe=N.max.y-N.min.y,ce=N.isBox3?N.max.z-N.min.z:1,Pe=N.min.x,Le=N.min.y,Re=N.isBox3?N.min.z:0;else{const St=Math.pow(2,-C);oe=Math.floor(Je.width*St),pe=Math.floor(Je.height*St),d.isDataArrayTexture?ce=Je.depth:d.isData3DTexture?ce=Math.floor(Je.depth*St):ce=1,Pe=0,Le=0,Re=0}O!==null?(Be=O.x,Xe=O.y,it=O.z):(Be=0,Xe=0,it=0);const qe=Te.convert(w.format),be=Te.convert(w.type);let tt;w.isData3DTexture?(Oe.setTexture3D(w,0),tt=m.TEXTURE_3D):w.isDataArrayTexture||w.isCompressedArrayTexture?(Oe.setTexture2DArray(w,0),tt=m.TEXTURE_2D_ARRAY):(Oe.setTexture2D(w,0),tt=m.TEXTURE_2D),m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,w.flipY),m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),m.pixelStorei(m.UNPACK_ALIGNMENT,w.unpackAlignment);const Ve=m.getParameter(m.UNPACK_ROW_LENGTH),_t=m.getParameter(m.UNPACK_IMAGE_HEIGHT),kt=m.getParameter(m.UNPACK_SKIP_PIXELS),gt=m.getParameter(m.UNPACK_SKIP_ROWS),tn=m.getParameter(m.UNPACK_SKIP_IMAGES);m.pixelStorei(m.UNPACK_ROW_LENGTH,Je.width),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,Je.height),m.pixelStorei(m.UNPACK_SKIP_PIXELS,Pe),m.pixelStorei(m.UNPACK_SKIP_ROWS,Le),m.pixelStorei(m.UNPACK_SKIP_IMAGES,Re);const nt=d.isDataArrayTexture||d.isData3DTexture,Et=w.isDataArrayTexture||w.isData3DTexture;if(d.isDepthTexture){const St=ge.get(d),ft=ge.get(w),pt=ge.get(St.__renderTarget),kn=ge.get(ft.__renderTarget);fe.bindFramebuffer(m.READ_FRAMEBUFFER,pt.__webglFramebuffer),fe.bindFramebuffer(m.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let Ut=0;Ut<ce;Ut++)nt&&(m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ge.get(d).__webglTexture,C,Re+Ut),m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ge.get(w).__webglTexture,Q,it+Ut)),m.blitFramebuffer(Pe,Le,oe,pe,Be,Xe,oe,pe,m.DEPTH_BUFFER_BIT,m.NEAREST);fe.bindFramebuffer(m.READ_FRAMEBUFFER,null),fe.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else if(C!==0||d.isRenderTargetTexture||ge.has(d)){const St=ge.get(d),ft=ge.get(w);fe.bindFramebuffer(m.READ_FRAMEBUFFER,Qa),fe.bindFramebuffer(m.DRAW_FRAMEBUFFER,Ja);for(let pt=0;pt<ce;pt++)nt?m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,St.__webglTexture,C,Re+pt):m.framebufferTexture2D(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,St.__webglTexture,C),Et?m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ft.__webglTexture,Q,it+pt):m.framebufferTexture2D(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,ft.__webglTexture,Q),C!==0?m.blitFramebuffer(Pe,Le,oe,pe,Be,Xe,oe,pe,m.COLOR_BUFFER_BIT,m.NEAREST):Et?m.copyTexSubImage3D(tt,Q,Be,Xe,it+pt,Pe,Le,oe,pe):m.copyTexSubImage2D(tt,Q,Be,Xe,Pe,Le,oe,pe);fe.bindFramebuffer(m.READ_FRAMEBUFFER,null),fe.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else Et?d.isDataTexture||d.isData3DTexture?m.texSubImage3D(tt,Q,Be,Xe,it,oe,pe,ce,qe,be,Je.data):w.isCompressedArrayTexture?m.compressedTexSubImage3D(tt,Q,Be,Xe,it,oe,pe,ce,qe,Je.data):m.texSubImage3D(tt,Q,Be,Xe,it,oe,pe,ce,qe,be,Je):d.isDataTexture?m.texSubImage2D(m.TEXTURE_2D,Q,Be,Xe,oe,pe,qe,be,Je.data):d.isCompressedTexture?m.compressedTexSubImage2D(m.TEXTURE_2D,Q,Be,Xe,Je.width,Je.height,qe,Je.data):m.texSubImage2D(m.TEXTURE_2D,Q,Be,Xe,oe,pe,qe,be,Je);m.pixelStorei(m.UNPACK_ROW_LENGTH,Ve),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,_t),m.pixelStorei(m.UNPACK_SKIP_PIXELS,kt),m.pixelStorei(m.UNPACK_SKIP_ROWS,gt),m.pixelStorei(m.UNPACK_SKIP_IMAGES,tn),Q===0&&w.generateMipmaps&&m.generateMipmap(tt),fe.unbindTexture()},this.initRenderTarget=function(d){ge.get(d).__webglFramebuffer===void 0&&Oe.setupRenderTarget(d)},this.initTexture=function(d){d.isCubeTexture?Oe.setTextureCube(d,0):d.isData3DTexture?Oe.setTexture3D(d,0):d.isDataArrayTexture||d.isCompressedArrayTexture?Oe.setTexture2DArray(d,0):Oe.setTexture2D(d,0),fe.unbindTexture()},this.resetState=function(){A=0,P=0,F=null,fe.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(n),t.unpackColorSpace=at._getUnpackColorSpace()}}const hu=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],mu=`
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
`,_u='<svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',gu='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Zr='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',vu=(e,n)=>`../${n}/`,Eu=e=>{const t=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),i=t.match(/^(.*\/)v\/([^/]+)\/$/);return i?{root:t,siteRoot:i[1],snapshot:i[2]}:{root:t,siteRoot:t,snapshot:null}},Su=(e,n)=>{const{siteRoot:t,snapshot:i}=Eu(),o=t.replace(/pr-preview\/pr-\d+\/$/,""),r=v=>`${n}/`;let c={};const l=(v,E)=>{e.innerHTML="";const b=[["latest",`latest · ${E}`],...v.map(T=>{const M=c[T]??{};return[T,`v${T}${M.date?` · ${M.date}`:""}`]})];i&&!v.includes(i)&&b.push([i,`v${i} snapshot`]);for(const[T,M]of b){const x=document.createElement("option");x.value=T,x.textContent=M,x.selected=T===(i??"latest"),e.appendChild(x)}};fetch(`${t}v/versions.json`,{cache:"no-cache"}).then(v=>v.ok?v.json():null).then(v=>{v?.versions&&(c=v.meta??{},l(v.versions,v.latest??"main"))}).catch(()=>{}),e.addEventListener("change",()=>{const v=e.value,E=v==="latest"?t:`${o}v/${v}/`,b=v==="latest"||!c[v]?.demos||c[v].demos.includes(n);location.href=b?`${E}${r(v==="latest"?void 0:c[v])}${location.search}${location.hash}`:E})},jr=e=>e.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),Mu=e=>{if(document.getElementById("portal-nav-toggle"))return;const n=document.createElement("style");n.id="portal-nav-styles",n.textContent=mu,document.head.appendChild(n);const t=document.createElement("aside");t.id="portal-nav-drawer",t.setAttribute("aria-hidden","false"),t.setAttribute("aria-label","Portal demos"),t.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <p class="portal-nav-intro">Portal links independent 3D web renderers at the GL layer: a guest's WebGL2 calls replay into the host's context, so engines compose without rewriting either. What it is, and where it's going: <a href="../" target="_blank" rel="noopener">the summary and RFC responses${_u}</a></p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${hu.map(c=>`
        <li${c.key===e?' class="portal-nav-current"':""}>
          <a href="${vu(e,c.key)}"${c.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${jr(c.label)}</span>
            <span class="portal-nav-desc">${jr(c.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const i=document.createElement("button");i.id="portal-nav-toggle",i.type="button",i.setAttribute("aria-label","Close demos menu"),i.setAttribute("aria-expanded","true"),i.setAttribute("aria-controls","portal-nav-drawer"),i.innerHTML=Zr,document.body.appendChild(t),document.body.appendChild(i);const o=t.querySelector("#portal-nav-version");o&&Su(o,e);const r=c=>{t.setAttribute("aria-hidden",c?"false":"true"),i.setAttribute("aria-expanded",c?"true":"false"),i.setAttribute("aria-label",c?"Close demos menu":"Toggle demos menu"),i.innerHTML=c?Zr:gu};i.addEventListener("click",c=>{c.stopPropagation(),r(t.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",c=>{t.getAttribute("aria-hidden")==="true"||c.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||r(!1)}),document.addEventListener("keydown",c=>{c.key==="Escape"&&t.getAttribute("aria-hidden")==="false"&&r(!1)})},Tu=(e,n,t={})=>{const i=t.moveSpeed??4,o=t.lookSensitivity??.0025,r=t.lookKeySpeed??1.5;let c=0,l=0;const v=new Set;xu(n,(P,F)=>{c-=P*o,l-=F*o}),window.addEventListener("keydown",P=>v.add(P.code)),window.addEventListener("keyup",P=>v.delete(P.code)),Ru(v);const E=new le,b=new le,T=new le,M=P=>{v.has("KeyQ")&&(c+=r*P),v.has("KeyE")&&(c-=r*P),v.has("KeyR")&&(l-=r*P),v.has("KeyF")&&(l+=r*P),l=Au(l),e.quaternion.setFromEuler(new Un(l,c,0,"YXZ")),b.set(0,0,-1).applyQuaternion(e.quaternion),T.set(1,0,0).applyQuaternion(e.quaternion),E.set(0,0,0),v.has("KeyW")&&E.add(b),v.has("KeyS")&&E.sub(b),v.has("KeyD")&&E.add(T),v.has("KeyA")&&E.sub(T),E.y=0,E.lengthSq()>0&&(E.normalize().multiplyScalar(i*P),e.position.add(E))},x=new Mt,I=new pn,y=new Un(0,0,0,"YXZ"),f=new le(0,0,0),a=new le,S=new le(0,1,0);return{update:M,setOrientationFromForward:P=>{a.copy(P).normalize(),x.lookAt(f,a,S),I.setFromRotationMatrix(x),y.setFromQuaternion(I,"YXZ"),l=y.x,c=y.y},clearKeys:()=>{v.clear()},getKeys:()=>Array.from(v),setKeys:P=>{v.clear();for(const F of P)v.add(F)}}},xu=(e,n)=>{let t=null,i=0,o=0;e.addEventListener("pointerdown",c=>{if(t===null&&(t=c.pointerId,i=c.clientX,o=c.clientY,c.pointerType!=="mouse"))try{e.setPointerCapture(c.pointerId)}catch{}});const r=c=>{c.pointerId===t&&(t=null)};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),window.addEventListener("pointermove",c=>{if(c.pointerId!==t)return;const l=c.clientX-i,v=c.clientY-o;i=c.clientX,o=c.clientY,n(l,v)})},Au=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),Ru=e=>{if(typeof window>"u")return;const n="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,t=()=>n||window.innerWidth<500;if(t()){Qr(e);return}const i=()=>{t()&&(window.removeEventListener("resize",i),Qr(e))};window.addEventListener("resize",i)},Qr=e=>{const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement and look controls"),n.innerHTML=`
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
  `,document.head.appendChild(t),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const o=i.dataset.key,r=l=>{l.preventDefault(),l.stopPropagation(),e.add(o),i.classList.add("is-active");try{i.setPointerCapture(l.pointerId)}catch{}},c=l=>{l.stopPropagation(),e.delete(o),i.classList.remove("is-active")};i.addEventListener("pointerdown",r),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c),i.addEventListener("pointerleave",c),i.addEventListener("contextmenu",l=>l.preventDefault())}},Ti=(e,n)=>[e[0]+n[0],e[1]+n[1],e[2]+n[2]],bu=(e,n)=>[e[0]-n[0],e[1]-n[1],e[2]-n[2]],Pn=(e,n)=>[e[0]*n,e[1]*n,e[2]*n],ni=(e,n)=>e[0]*n[0]+e[1]*n[1]+e[2]*n[2],Jr=(e,n)=>[e[1]*n[2]-e[2]*n[1],e[2]*n[0]-e[0]*n[2],e[0]*n[1]-e[1]*n[0]],on=e=>{const n=Math.hypot(e[0],e[1],e[2]);return n>0?[e[0]/n,e[1]/n,e[2]/n]:[0,0,1]},ea=e=>{const n=on(e.normal),t=on(e.up),i=on(Jr(t,n)),o=on(Jr(n,i));return{right:i,up:o,normal:n}},Ga=(e,n)=>[ni(e,n.right),ni(e,n.up),ni(e,n.normal)],Va=(e,n)=>Ti(Ti(Pn(n.right,e[0]),Pn(n.up,e[1])),Pn(n.normal,e[2])),ka=e=>[-e[0],e[1],-e[2]],ta=(e,n,t)=>on(Va(ka(Ga(e,n)),t)),wu=(e,n)=>{const t=ea(n.source),i=ea(n.target),o=bu(e.position,n.source.position),r=Ga(o,t),c=Pn(ka(r),n.scale),l={position:Ti(n.target.position,Va(c,i))};return e.forward&&(l.forward=ta(e.forward,t,i)),e.up&&(l.up=ta(e.up,t,i)),l};new bi;new le;new dt;new dt;const Cu=(e=new Ye(2,3))=>{const n=new hn(e.x,e.y),t=new Pi({visible:!1}),i=new ut(n,t);return i.name="portal-plane",i.userData.portalSize=e.clone(),i},Pu=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Du=`
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
`,Jt=1,Lu=(e=Jt)=>{const n={portalPos:{value:new le},portalNormal:{value:new le},portalRight:{value:new le},portalUp:{value:new le},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new le},hostInverseViewProjection:{value:new Mt},hostViewMatrix:{value:new Mt},hostProjectionMatrix:{value:new Mt},destinationBackground:{value:new le(0,0,0)}},t=new Lt({uniforms:n,vertexShader:Pu,fragmentShader:Du,depthTest:!0,depthWrite:!1,side:xt,stencilWrite:!0,stencilFunc:ya,stencilRef:e,stencilFail:Gt,stencilZFail:Gt,stencilZPass:La,stencilWriteMask:255}),i=new ut(new hn(2,2),t);i.frustumCulled=!1;const o=new In;o.add(i);const r=new Da(-1,1,1,-1,0,1),c=new Mt,l=new le(0,0,1),v=new le(1,0,0),E=new le(0,1,0),b=new pn;return{scene:o,camera:r,update:(M,x,I)=>{const y=M.userData.portalSize;n.portalHalfW.value=y?y.x/2:1,n.portalHalfH.value=y?y.y/2:1.5,M.getWorldPosition(n.portalPos.value),M.getWorldQuaternion(b),n.portalNormal.value.copy(l).applyQuaternion(b),n.portalRight.value.copy(v).applyQuaternion(b),n.portalUp.value.copy(E).applyQuaternion(b),x.getWorldPosition(n.hostCameraPos.value),c.multiplyMatrices(x.projectionMatrix,x.matrixWorldInverse),n.hostInverseViewProjection.value.copy(c).invert(),n.hostViewMatrix.value.copy(x.matrixWorldInverse),n.hostProjectionMatrix.value.copy(x.projectionMatrix),n.destinationBackground.value.set(I.r,I.g,I.b)}}},Wa=(e,n)=>{e.traverse(t=>{const i=t;if(!i.isMesh||!i.material)return;const o=Array.isArray(i.material)?i.material:[i.material];for(const r of o)n(r)})},yu=(e,n=Jt)=>{Wa(e,t=>{t.stencilWrite=!0,t.stencilFunc=Ss,t.stencilRef=n,t.stencilFail=Gt,t.stencilZFail=Gt,t.stencilZPass=Gt,t.stencilWriteMask=0})},Uu=e=>{Wa(e,n=>{n.stencilWrite=!1})};new le;const ii=new pn,Mn=new le,Tn=new le,xn=new le,Iu=(e,n)=>n||(e.background instanceof ze?e.background:new ze(0,0,0)),Nu=e=>{const{scene:n,anchor:t}=e,i=e.portalNormal??new le(0,0,1),o=e.stencilRef??Jt;return{scene:n,anchor:t,getAnchor:()=>{t.getWorldPosition(Mn),t.getWorldQuaternion(ii),Tn.copy(i).applyQuaternion(ii).normalize(),xn.set(0,1,0).applyQuaternion(ii).normalize();const l=t.userData.portalSize;return{position:[Mn.x,Mn.y,Mn.z],normal:[Tn.x,Tn.y,Tn.z],up:[xn.x,xn.y,xn.z],halfWidth:l?l.x/2:void 0,halfHeight:l?l.y/2:void 0}},getBackground:()=>{const l=Iu(n,e.background);return{r:l.r,g:l.g,b:l.b}},tick:e.tick,renderAsSource(l,v){l.render(n,v)},renderAsDestination(l,v){const E=n.background;n.background=null,yu(n,o),l.render(n,v),Uu(n),n.background=E}}},An=36160,Rn=36008,ri=36009,na=36161,ia=34963,Ou=36386,ra=33984,Fu=new Set(["deleteBuffer","deleteFramebuffer","deleteProgram","deleteQuery","deleteRenderbuffer","deleteSampler","deleteShader","deleteSync","deleteTexture","deleteTransformFeedback","deleteVertexArray"]),Bu=e=>({__netgl_handle:e}),vt=e=>e!=null&&typeof e=="object"&&!Array.isArray(e)&&"__netgl_handle"in e?e.__netgl_handle:null,Hu=()=>{let e=null,n=null,t=null,i=null,o=null,r=ra;const c=new Map,l=new Map,v=new Map,E=new Map,b=new Map,T=new Map,M=a=>a===Rn?n:e,x=(a,S,_)=>{const g=M(a);if(g===null)return;let D=T.get(g);D||(D=new Map,T.set(g,D)),_?D.set(S,_):D.delete(S)},I=(a,S,_)=>{_===null?a.delete(S):a.set(S,_)},y=(a,S)=>{const _=e===n?[[An,e]]:[[ri,e],[Rn,n]];for(const[g,D]of _){const A=D===null?void 0:T.get(D);if(A)for(const[P,F]of A)F.id===a&&(F.kind==="texture2D"?S.push({name:"framebufferTexture2D",args:[g,P,F.textarget,null,0]}):F.kind==="layer"?S.push({name:"framebufferTextureLayer",args:[g,P,null,0,0]}):S.push({name:"framebufferRenderbuffer",args:[g,P,na,null]}),A.delete(P))}},f=(a,S)=>{const _=[];switch(a){case"deleteFramebuffer":e===S&&n===S?_.push({name:"bindFramebuffer",args:[An,null]}):e===S?_.push({name:"bindFramebuffer",args:[ri,null]}):n===S&&_.push({name:"bindFramebuffer",args:[Rn,null]}),e===S&&(e=null),n===S&&(n=null),T.delete(S);break;case"deleteRenderbuffer":y(S,_),t===S&&(_.push({name:"bindRenderbuffer",args:[na,null]}),t=null);break;case"deleteTexture":{y(S,_);let g=r;for(const[D,A]of E)for(const[P,F]of A)F===S&&(D!==g&&(_.push({name:"activeTexture",args:[D]}),g=D),_.push({name:"bindTexture",args:[P,null]}),A.delete(P));g!==r&&_.push({name:"activeTexture",args:[r]});break}case"deleteSampler":for(const[g,D]of b)D===S&&(_.push({name:"bindSampler",args:[g,null]}),b.delete(g));break;case"deleteBuffer":{const g=new Set;for(const[D,A]of v)A.id===S&&(_.push({name:"bindBufferBase",args:[A.target,A.index,null]}),g.add(A.target),v.delete(D));for(const D of g){const A=c.get(D);A!==void 0&&A!==S?_.push({name:"bindBuffer",args:[D,Bu(A)]}):c.delete(D)}for(const[D,A]of c)A===S&&(_.push({name:"bindBuffer",args:[D,null]}),c.delete(D));l.get(i??0)===S&&(_.push({name:"bindBuffer",args:[ia,null]}),l.delete(i??0));break}case"deleteVertexArray":i===S&&(_.push({name:"bindVertexArray",args:[null]}),i=null),l.delete(S);break;case"deleteTransformFeedback":o===S&&(_.push({name:"bindTransformFeedback",args:[Ou,null]}),o=null);break}return _};return{observe(a){const S=a.args;switch(a.name){case"bindFramebuffer":{const _=S[0],g=vt(S[1]);return(_===An||_===ri)&&(e=g),(_===An||_===Rn)&&(n=g),null}case"bindRenderbuffer":return t=vt(S[1]),null;case"bindVertexArray":return i=vt(S[0]),null;case"bindTransformFeedback":return o=vt(S[1]),null;case"bindBuffer":{const _=S[0];return _===ia?I(l,i??0,vt(S[1])):I(c,_,vt(S[1])),null}case"bindBufferBase":case"bindBufferRange":{const _=S[0],g=S[1],D=vt(S[2]);return I(c,_,D),D===null?v.delete(`${_}:${g}`):v.set(`${_}:${g}`,{target:_,index:g,id:D}),null}case"activeTexture":return r=S[0],null;case"bindTexture":{let _=E.get(r);return _||(_=new Map,E.set(r,_)),I(_,S[0],vt(S[1])),null}case"bindSampler":return I(b,S[0],vt(S[1])),null;case"framebufferTexture2D":{const _=vt(S[3]);return x(S[0],S[1],_===null?null:{kind:"texture2D",id:_,textarget:S[2]}),null}case"framebufferTextureLayer":{const _=vt(S[2]);return x(S[0],S[1],_===null?null:{kind:"layer",id:_}),null}case"framebufferRenderbuffer":{const _=vt(S[3]);return x(S[0],S[1],_===null?null:{kind:"renderbuffer",id:_}),null}default:if(!Fu.has(a.name))return null;{const _=vt(S[0]);return _===null?[]:f(a.name,_)}}},reset(){e=null,n=null,t=null,i=null,o=null,r=ra,c.clear(),l.clear(),v.clear(),E.clear(),b.clear()}}},Gu=new Set(["bufferData","bufferSubData","texImage2D","texSubImage2D","texImage3D","texSubImage3D","compressedTexImage2D","compressedTexSubImage2D","compressedTexImage3D","compressedTexSubImage3D","texStorage2D","texStorage3D","renderbufferStorage","renderbufferStorageMultisample","generateMipmap","shaderSource","compileShader","attachShader","linkProgram"]),Vu=new Set(["readPixels","getBufferSubData","fenceSync","clientWaitSync","waitSync"]),ku=1e3,Wu=e=>{const n=e.reproject??null,t=e.beforeFrame,i=Ms(e.gl,n?{...e.replay,reproject:!0}:e.replay),o=n?.frameView??(K=>typeof K.viewId=="number"?K.viewId:null),r=e.onError??(K=>console.error("[netgl-host] replay error:",K)),c=new Set;let l=null,v=[],E=null,b=null,T=!1;const M=Hu();let x=[],I=[],y=[],f=[];const a=new Set,S=e.wire??Ts,_=e.transport.outputOrigin,g=e.messageChannel!==!1&&typeof MessageChannel<"u"&&typeof _=="string"&&_!=="*"&&_!=="null";let D=1,A=0,P=0,F=0,p=null,u="none",L=null,B=null,X=0,Y=0,q=[],W=!1,te=null,G=null;const me=K=>{if(Mr(K))return v.push(K),!0;if(Tr(K)){const Se={at:E?E.length:0,viewId:o(K),end:K};E?E.push(...v):E=v,I.push(Se),v=[];for(const m of a)m(K);return!0}return!1},Ae=K=>{G&&clearTimeout(G),G=null;const Se=te??[];te=null,W=K&&p!==null;for(const[m,Ie]of Se)de(m,Ie)},ye=()=>{p&&(p.onmessage=null,p.close()),p=null,u="none",q=[],te&&Ae(!1),W=!1},Ge=K=>{const Se=Math.min(S,typeof K.wire=="number"?K.wire:1),m=Se>=2?{type:"netgl:ready-ack",wire:Se}:{type:"netgl:ready-ack"};Se>=2&&(D=2,typeof K.seq=="number"&&(m.seq=K.seq));const Ie=typeof K.session=="string"?K.session:null;if(Se>=2&&(K.port==="stream"||K.port==="all")&&g&&(u==="none"||Ie!==null&&Ie!==L)){ye();const _e=new MessageChannel;p=_e.port1,u="offered",L=Ie,B={seq:typeof K.seq=="number"?K.seq:0,windowItems:X,control:K.port==="all"},p.onmessage=fe=>k(fe.data),m.port=_e.port2,e.transport.post(m,[_e.port2]),B.control&&(te=[],G=setTimeout(()=>Ae(!1),ku))}else e.transport.post(m);l||(l=K,e.onReady?.(l))},Qe=K=>{if(me(K))return;if(xr(K)){F+=1;for(const m of K.batch)me(m);return}if(K.type==="netgl:ready"){Ge(K);return}e.onControl?.(K)},$e=K=>Mr(K)||Tr(K)?1:xr(K)?K.batch.length:0,We=()=>{if(q.length===0||X<Y)return;const K=q;q=[];for(const Se of K)A+=1,P+=$e(Se),Qe(Se)},k=K=>{if(!(!K||typeof K!="object")){if(K.type==="netgl:port"&&u==="offered"&&B){const Se=K;u="open",Y=B.windowItems+Math.max(0,(Se.after??0)-B.seq),te&&Ae(B.control);return}if(q.length>0||X<Y){q.push(K);return}A+=1,P+=$e(K),Qe(K)}};let $=e.transport.onMessage(K=>{A+=1;const Se=$e(K);P+=Se,X+=Se,Qe(K),Se>0&&We()});const de=(K,Se)=>{if(te){te.push([K,Se]);return}W&&p?p.postMessage(K,Se??[]):e.transport.post(K,Se)},Ce=K=>{try{i(K)}catch(Se){const m=Se instanceof Error?Se.message:String(Se);c.has(m)||(c.add(m),r(Se))}},ve=(K,Se,m)=>{if(i.invalidate(),M.reset(),!m){const we=x;x=[];for(const _e of we)Ce(_e)}let Ie=0;for(let we=0;we<K.length;we+=1){for(;(n||t)&&Ie<Se.length&&Se[Ie].at<=we;)n&&(i.setReprojection(n.correction(Se[Ie].viewId)),n.viewport&&i.setViewportRemap(n.viewport(Se[Ie].viewId)),n.pixelScale&&i.setPixelScale(n.pixelScale(Se[Ie].viewId))),t?.(Se[Ie].end),Ie+=1;const _e=K[we];if(m&&(_e.returnId!==void 0||Gu.has(_e.name)))continue;const fe=M.observe(_e);if(fe){for(const Ze of fe)Ce(Ze);m||x.push(_e);continue}Ce(_e)}if(t)for(;Ie<Se.length;Ie+=1)t(Se[Ie].end);n&&(i.setReprojection(null),i.setViewportRemap(null),i.setPixelScale(null))};return{get ready(){return l},get hasFrame(){return b!==null||E!==null},get canRerun(){return b!==null&&T},get pendingDeletes(){return x.length},replay:i,post:de,wire:{get version(){return D},get port(){return u},get controlOnPort(){return W},get messages(){return A},get items(){return P},get batches(){return F}},onFrame(K){return a.add(K),()=>{a.delete(K)}},get drainedViews(){return f},drain(){if(E){const K=E,Se=I;return E=null,I=[],b=K,y=Se,T=!K.some(m=>Vu.has(m.name)),f=Se.map(m=>m.viewId),ve(K,Se,!1),!0}return b&&T?(f=y.map(K=>K.viewId),ve(b,y,!0),!0):!1},stop(){$?.(),$=null,ye(),a.clear()}}},zu=1e3,za=e=>(n,t,i,o)=>{const r=e(),c=r.guestSize;if(!c)return null;const l=r.canvasSize(),v=l.width/c.width,E=l.height/c.height;return[Math.round(n*v),Math.round(t*E),Math.round(i*v),Math.round(o*E)]},Xa=e=>{const n=new pu({antialias:!1,stencil:!0,depth:!0});n.outputColorSpace=ma,n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),n.autoClear=!1,e.mount.appendChild(n.domElement);const t=xs({output:e.iframe.contentWindow,inputFilter:e.iframe.contentWindow});let i=0,o=0,r=0;const c=new Set;let l=null;const v=()=>l,E=Wu({gl:n.getContext(),transport:t,replay:e.replay(v),onControl:b=>{const T=b;if(T.type==="cesium:rendered"){const M=b;o=M.seq,l.guestSize={width:M.width,height:M.height}}else if(T.type==="cesium:error"){const M=b.message;c.has(M)||(c.add(M),console.error("[cesium guest]",M),e.onStatus(`Cesium error: ${M.split(`
`)[0]}`))}},onError:b=>{console.error("[netgl host] replay error:",b),e.onStatus(`Replay error: ${b instanceof Error?b.message:String(b)}`)}});return l={renderer:n,receiver:E,guestSize:null,canvasSize:()=>{const b=n.getDrawingBufferSize(new Ye);return{width:b.x,height:b.y}},tick(b,T){const M=performance.now();if(o<i&&M-r<zu)return null;i+=1,r=M;const x={type:"cesium:tick",seq:i,time:b,view:T};return t.post(x),i},lag:()=>i-o},l},Xu=4e6,Yu=-60,Ku=20,ai=16e6,qu=e=>{const n=Xa({...e,replay:A=>({remapScreenViewport:za(A),screen:{stencil:{ref:Jt},clear:"depth-only"}})}),{renderer:t,receiver:i}=n,o=new $t(70,window.innerWidth/window.innerHeight,.02,200);o.position.set(0,1.6,5.5);const r=new In;r.background=new ze("#101826"),r.add(new As(12176639,2241348,1));const c=new Ua(16777215,.65);c.position.set(3,6,2),r.add(c);const l=new ut(new hn(18,18),new Nn({color:"#1b2a3f",roughness:.95,metalness:.03}));l.rotation.x=-Math.PI/2,r.add(l);const v=new Ci(.9,.9,.9),E=new Nn({color:"#5da9ff",roughness:.35});for(let A=0;A<14;A+=1){const P=new ut(v,E);P.position.set(Math.sin(A*.5)*4,.45,-3-A*.65),r.add(P)}const b=Cu(new Ye(2.6,3.2));b.position.set(0,1.6,-3.5),r.add(b);const T=Nu({scene:r,anchor:b}),M=Lu(),x=new ze("#000000"),I=$u(),y=Tu(o,t.domElement);window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix()});const f=new le,a=new le,S=new le,_=()=>{o.updateMatrixWorld(),o.getWorldPosition(f),o.getWorldDirection(a),S.set(0,1,0).applyQuaternion(o.quaternion);const A=wu({position:[f.x,f.y,f.z],forward:[a.x,a.y,a.z],up:[S.x,S.y,S.z]},{source:T.getAnchor(),target:I,scale:Xu});return{position:A.position,direction:A.forward,up:A.up,fovy:Dt.degToRad(o.fov)}},g=new Ia;n.tick(0,_());const D=()=>{t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,o),i.ready&&(M.update(b,o,x),t.render(M.scene,M.camera),t.clearDepth(),i.drain(),t.resetState()),y.update(g.getDelta()),n.tick(g.elapsedTime,_()),requestAnimationFrame(D)};D()},$u=()=>{const e=Dt.degToRad(Yu),n=Dt.degToRad(Ku),t=new le(Math.cos(n)*Math.cos(e),Math.cos(n)*Math.sin(e),Math.sin(n)),i=new le(0,0,1).addScaledVector(t,-t.z).normalize();return{position:[t.x*ai,t.y*ai,t.z*ai],normal:[-t.x,-t.y,-t.z],up:[i.x,i.y,i.z]}},aa={type:"change"},Li={type:"start"},Ya={type:"end"},bn=new bs,oa=new bi,Zu=Math.cos(70*Dt.DEG2RAD),ot=new le,ht=2*Math.PI,Ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},oi=1e-6;class ju extends Rs{constructor(n,t=null){super(n,t),this.state=Ke.NONE,this.target=new le,this.cursor=new le,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zt.ROTATE,MIDDLE:Zt.DOLLY,RIGHT:Zt.PAN},this.touches={ONE:Kt.ROTATE,TWO:Kt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new le,this._lastQuaternion=new pn,this._lastTargetPosition=new le,this._quat=new pn().setFromUnitVectors(n.up,new le(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ar,this._sphericalDelta=new Ar,this._scale=1,this._panOffset=new le,this._rotateStart=new Ye,this._rotateEnd=new Ye,this._rotateDelta=new Ye,this._panStart=new Ye,this._panEnd=new Ye,this._panDelta=new Ye,this._dollyStart=new Ye,this._dollyEnd=new Ye,this._dollyDelta=new Ye,this._dollyDirection=new le,this._mouse=new Ye,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ju.bind(this),this._onPointerDown=Qu.bind(this),this._onPointerUp=ep.bind(this),this._onContextMenu=sp.bind(this),this._onMouseWheel=ip.bind(this),this._onKeyDown=rp.bind(this),this._onTouchStart=ap.bind(this),this._onTouchMove=op.bind(this),this._onMouseDown=tp.bind(this),this._onMouseMove=np.bind(this),this._interceptControlDown=lp.bind(this),this._interceptControlUp=cp.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(aa),this.update(),this.state=Ke.NONE}update(n=null){const t=this.object.position;ot.copy(t).sub(this.target),ot.applyQuaternion(this._quat),this._spherical.setFromVector3(ot),this.autoRotate&&this.state===Ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(i)&&isFinite(o)&&(i<-Math.PI?i+=ht:i>Math.PI&&(i-=ht),o<-Math.PI?o+=ht:o>Math.PI&&(o-=ht),i<=o?this._spherical.theta=Math.max(i,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+o)/2?Math.max(i,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const c=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=c!=this._spherical.radius}if(ot.setFromSpherical(this._spherical),ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let c=null;if(this.object.isPerspectiveCamera){const l=ot.length();c=this._clampDistance(l*this._scale);const v=l-c;this.object.position.addScaledVector(this._dollyDirection,v),this.object.updateMatrixWorld(),r=!!v}else if(this.object.isOrthographicCamera){const l=new le(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const v=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=v!==this.object.zoom;const E=new le(this._mouse.x,this._mouse.y,0);E.unproject(this.object),this.object.position.sub(E).add(l),this.object.updateMatrixWorld(),c=ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;c!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(c).add(this.object.position):(bn.origin.copy(this.object.position),bn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(bn.direction))<Zu?this.object.lookAt(this.target):(oa.setFromNormalAndCoplanarPoint(this.object.up,this.target),bn.intersectPlane(oa,this.target))))}else if(this.object.isOrthographicCamera){const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),c!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>oi||8*(1-this._lastQuaternion.dot(this.object.quaternion))>oi||this._lastTargetPosition.distanceToSquared(this.target)>oi?(this.dispatchEvent(aa),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?ht/60*this.autoRotateSpeed*n:ht/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){ot.setFromMatrixColumn(t,0),ot.multiplyScalar(-n),this._panOffset.add(ot)}_panUp(n,t){this.screenSpacePanning===!0?ot.setFromMatrixColumn(t,1):(ot.setFromMatrixColumn(t,0),ot.crossVectors(this.object.up,ot)),ot.multiplyScalar(n),this._panOffset.add(ot)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;ot.copy(o).sub(this.target);let r=ot.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),o=n-i.left,r=t-i.top,c=i.width,l=i.height;this._mouse.x=o/c*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),o=.5*(n.pageY+t.y);this._rotateStart.set(i,o)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),o=.5*(n.pageY+t.y);this._panStart.set(i,o)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,o=n.pageY-t.y,r=Math.sqrt(i*i+o*o);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),o=.5*(n.pageX+i.x),r=.5*(n.pageY+i.y);this._rotateEnd.set(o,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),o=.5*(n.pageY+t.y);this._panEnd.set(i,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,o=n.pageY-t.y,r=Math.sqrt(i*i+o*o);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const c=(n.pageX+t.x)*.5,l=(n.pageY+t.y)*.5;this._updateZoomParameters(c,l)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new Ye,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Qu(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function Ju(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function ep(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ya),this.state=Ke.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function tp(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=Ke.DOLLY;break;case Zt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Ke.ROTATE}break;case Zt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Ke.PAN}break;default:this.state=Ke.NONE}this.state!==Ke.NONE&&this.dispatchEvent(Li)}function np(e){switch(this.state){case Ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function ip(e){this.enabled===!1||this.enableZoom===!1||this.state!==Ke.NONE||(e.preventDefault(),this.dispatchEvent(Li),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Ya))}function rp(e){this.enabled!==!1&&this._handleKeyDown(e)}function ap(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Kt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Ke.TOUCH_ROTATE;break;case Kt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Ke.TOUCH_PAN;break;default:this.state=Ke.NONE}break;case 2:switch(this.touches.TWO){case Kt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Ke.TOUCH_DOLLY_PAN;break;case Kt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Ke.TOUCH_DOLLY_ROTATE;break;default:this.state=Ke.NONE}break;default:this.state=Ke.NONE}this.state!==Ke.NONE&&this.dispatchEvent(Li)}function op(e){switch(this._trackPointer(e),this.state){case Ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Ke.NONE}}function sp(e){this.enabled!==!1&&e.preventDefault()}function lp(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function cp(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const yi=1e6,zt=6378137/yi,sa=6356752314245e-6/yi,si=1.025,dp=.05,fp=e=>{const n=Xa({...e,replay:F=>({remapScreenViewport:za(F),screen:{stencil:{ref:Jt},blend:"premultiplied-over",clear:"depth-only"}})}),{renderer:t,receiver:i}=n,o=new $t(40,window.innerWidth/window.innerHeight,.01,2e4);o.position.set(6,2.5,26);const r=new In;r.background=new ze("#000000");const c=new le(1,.25,.6).normalize(),l=new Ua(16777215,2.2);l.position.copy(c).multiplyScalar(100),r.add(l),r.add(new ws(2241348,.25)),r.add(pp());const v=new $n;v.rotation.z=Dt.degToRad(23.4),r.add(v);const E=new $n;v.add(E);const b=new Rr(1,128,96),T=new ut(b,new Nn({color:"#1d4f91",roughness:.8}));T.scale.set(zt,sa,zt),E.add(T);const M=new In,x=new ut(b,new Pi({side:xt,colorWrite:!1,depthWrite:!1,depthTest:!0,stencilWrite:!0,stencilRef:Jt,stencilFunc:ya,stencilZPass:La,stencilFail:Gt,stencilZFail:Gt}));M.add(x);const I=new $n;I.rotation.x=Dt.degToRad(-8),r.add(I);const y=new ut(new Rr(1.737,64,48),new Nn({color:"#b8b4ac",roughness:.95}));I.add(y);const f=new ju(o,t.domElement);f.enableDamping=!0,f.minDistance=zt*1.02,f.maxDistance=400,f.zoomSpeed=.6,f.rotateSpeed=.5;const a=()=>{const F=o.position.length()-zt;f.rotateSpeed=Dt.clamp(F/20,.02,.5)};window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix()});const S=new Ia;let _=e.startTime??0;const g=()=>{E.rotation.y=_*dp;const F=_*.12;y.position.set(Math.cos(F)*16,0,Math.sin(F)*16),r.updateMatrixWorld(),x.matrixAutoUpdate=!1,x.matrix.copy(E.matrixWorld).multiply(new Mt().makeScale(zt*si,sa*si,zt*si)),x.matrixWorldNeedsUpdate=!0};let D=0;const A=()=>(o.updateMatrixWorld(),n.tick(_,up(o,E)));g(),A();const P=()=>{const F=i.hasFrame;T.visible=!F,t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,o),F&&(t.render(M,o),t.clearDepth(),i.drain(),t.resetState());const p=Math.min(S.getDelta(),.1);e.paused||(_+=p),a(),f.update(p),g(),A()===null?D+=1:D=0,e.onLag(D),requestAnimationFrame(P)};P()},li=new Mt,la=new le,ca=new le,da=new le,ci=new He,di=(e,n)=>[e.x*n,-e.z*n,e.y*n],up=(e,n)=>(li.copy(n.matrixWorld).invert(),ci.setFromMatrix4(li),la.setFromMatrixPosition(e.matrixWorld).applyMatrix4(li),e.getWorldDirection(ca).applyMatrix3(ci).normalize(),da.set(0,1,0).applyQuaternion(e.quaternion).applyMatrix3(ci).normalize(),{position:di(la,yi),direction:di(ca,1),up:di(da,1),fovy:Dt.degToRad(e.fov)}),pp=()=>{const n=new Float32Array(12e3),t=new le;let i=7;const o=()=>(i=i*16807%2147483647,i/2147483647);for(let c=0;c<4e3;c+=1)t.set(o()*2-1,o()*2-1,o()*2-1).normalize().multiplyScalar(5e3),n.set([t.x,t.y,t.z],c*3);const r=new wi;return r.setAttribute("position",new ln(n,3)),new Cs(r,new Ps({color:16777215,size:1.6,sizeAttenuation:!1}))};Mu("netgl-cesium");const Gn=Ds(location.search),xi=new URLSearchParams(location.search),fa=document.querySelector("#app"),Ai=document.querySelector("#guest"),ua=document.querySelector("#status"),hp=document.querySelector("#lag"),Ka=new URLSearchParams({mode:Gn}),pa=xi.get("imagery");pa&&Ka.set("imagery",pa);Ai.src=`cesium.html?${Ka}`;document.querySelectorAll("a[data-mode]").forEach(e=>{const n=new URLSearchParams(location.search);n.set("mode",e.dataset.mode),e.href=`?${n}`,e.dataset.mode===Gn&&e.classList.add("current")});document.querySelector(`[data-help="${Gn}"]`).hidden=!1;const ha=e=>{ua.textContent=e,ua.hidden=!1};Gn==="earth"?fp({iframe:Ai,mount:fa,onStatus:ha,startTime:Number(xi.get("time")??0),paused:xi.has("pause"),onLag:e=>{hp.textContent=String(Math.max(0,e))}}):qu({iframe:Ai,mount:fa,onStatus:ha});
