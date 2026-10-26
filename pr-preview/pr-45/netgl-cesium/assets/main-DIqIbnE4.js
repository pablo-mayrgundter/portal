import{c as Ka,N as wt,S as la,C as ke,F as ca,M as St,V as le,R as qa,a as dt,w as si,W as Ni,b as $t,d as at,L as nn,H as Un,U as Gt,D as Tt,B as Mt,e as ln,f as In,p as Za,E as $a,g as We,P as qt,A as ja,h as Gn,i as Ct,j as Cn,k as Mi,l as cn,m as dn,n as da,o as Qa,q as Wt,r as wn,s as Ja,t as eo,u as tn,O as to,v as no,x as io,y as ro,z as ao,G as oo,I as so,J as lo,K as co,Q as fo,T as uo,X as po,Y as ho,Z as mo,_ as _o,$ as go,a0 as vo,a1 as Eo,a2 as Vn,a3 as Xt,a4 as _n,a5 as So,a6 as on,a7 as Mo,a8 as To,a9 as xo,aa as Ao,ab as fa,ac as Ro,ad as bo,ae as Co,af as Ti,ag as Fe,ah as wo,ai as Po,aj as Do,ak as Dt,al as xi,am as sn,an as ut,ao as ua,ap as Bt,aq as bt,ar as Pn,as as pa,at as ha,au as ma,av as pn,aw as Lo,ax as yo,ay as Uo,az as Io,aA as _a,aB as Ft,aC as No,aD as Oo,aE as Fo,aF as ga,aG as Bo,aH as va,aI as Ea,aJ as kn,aK as zn,aL as Wn,aM as Xn,aN as je,aO as Oi,aP as Fi,aQ as Bi,aR as Hi,aS as Gi,aT as Vi,aU as ki,aV as zi,aW as Wi,aX as Xi,aY as Yi,aZ as Ki,a_ as qi,a$ as Zi,b0 as $i,b1 as ji,b2 as Qi,b3 as Ji,b4 as er,b5 as tr,b6 as nr,b7 as ir,b8 as rr,b9 as ar,ba as or,bb as sr,bc as lr,bd as cr,be as li,bf as ci,bg as di,bh as fi,bi as ui,bj as pi,bk as hi,bl as Ho,bm as dr,bn as Go,bo as An,bp as Vo,bq as fr,br as ur,bs as pr,bt as mi,bu as _i,bv as ko,bw as Sa,bx as zo,by as Nn,bz as Wo,bA as Xo,bB as Ma,bC as Ai,bD as hr,bE as Dn,bF as mr,bG as Ta,bH as fn,bI as jt,bJ as xa,bK as Ri,bL as Yo,bM as Ko,bN as qo,bO as _r,bP as mt,bQ as Zo,bR as $o,bS as jo,bT as Qo,bU as Jo,bV as es,bW as ts,bX as ns,bY as is,bZ as rs,b_ as as,b$ as os,c0 as ss,c1 as ls,c2 as cs,c3 as ds,c4 as fs,c5 as us,c6 as un,c7 as Aa,c8 as Ht,c9 as Ra,ca as Ln,cb as ps,cc as hs,cd as gr,ce as vr,cf as Er,cg as ms,ch as _s,ci as gs,cj as ba,ck as yn,cl as Pt,cm as Ca,cn as vs,co as Zt,cp as Yt,cq as Sr,cr as Es,cs as Ss,ct as Yn,cu as Mr,cv as Ms,cw as Ts,cx as xs}from"./protocol-Di2HjYNG.js";function wa(){let e=null,n=!1,t=null,i=null;function a(r,f){t(r,f),i=e.requestAnimationFrame(a)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(a),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function As(e){const n=new WeakMap;function t(l,E){const _=l.array,A=l.usage,S=_.byteLength,g=e.createBuffer();e.bindBuffer(E,g),e.bufferData(E,_,A),l.onUploadCallback();let T;if(_ instanceof Float32Array)T=e.FLOAT;else if(typeof Float16Array<"u"&&_ instanceof Float16Array)T=e.HALF_FLOAT;else if(_ instanceof Uint16Array)l.isFloat16BufferAttribute?T=e.HALF_FLOAT:T=e.UNSIGNED_SHORT;else if(_ instanceof Int16Array)T=e.SHORT;else if(_ instanceof Uint32Array)T=e.UNSIGNED_INT;else if(_ instanceof Int32Array)T=e.INT;else if(_ instanceof Int8Array)T=e.BYTE;else if(_ instanceof Uint8Array)T=e.UNSIGNED_BYTE;else if(_ instanceof Uint8ClampedArray)T=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+_);return{buffer:g,type:T,bytesPerElement:_.BYTES_PER_ELEMENT,version:l.version,size:S}}function i(l,E,_){const A=E.array,S=E.updateRanges;if(e.bindBuffer(_,l),S.length===0)e.bufferSubData(_,0,A);else{S.sort((T,N)=>T.start-N.start);let g=0;for(let T=1;T<S.length;T++){const N=S[g],L=S[T];L.start<=N.start+N.count+1?N.count=Math.max(N.count,L.start+L.count-N.start):(++g,S[g]=L)}S.length=g+1;for(let T=0,N=S.length;T<N;T++){const L=S[T];e.bufferSubData(_,L.start*A.BYTES_PER_ELEMENT,A,L.start,L.count)}E.clearUpdateRanges()}E.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const E=n.get(l);E&&(e.deleteBuffer(E.buffer),n.delete(l))}function f(l,E){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const A=n.get(l);(!A||A.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const _=n.get(l);if(_===void 0)n.set(l,t(l,E));else if(_.version<l.version){if(_.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(_.buffer,l,E),_.version=l.version}}return{get:a,remove:r,update:f}}var Rs=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bs=`#ifdef USE_ALPHAHASH
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
#endif`,Cs=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ws=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ps=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ds=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ls=`#ifdef USE_AOMAP
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
#endif`,ys=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Us=`#ifdef USE_BATCHING
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
#endif`,Is=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ns=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Os=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fs=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Bs=`#ifdef USE_IRIDESCENCE
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
#endif`,Hs=`#ifdef USE_BUMPMAP
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
#endif`,Gs=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Vs=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ks=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zs=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ws=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xs=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ys=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ks=`#if defined( USE_COLOR_ALPHA )
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
#endif`,qs=`#define PI 3.141592653589793
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
} // validated`,Zs=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$s=`vec3 transformedNormal = objectNormal;
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
#endif`,js=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qs=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Js=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,el=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tl="gl_FragColor = linearToOutputTexel( gl_FragColor );",nl=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,il=`#ifdef USE_ENVMAP
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
#endif`,rl=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,al=`#ifdef USE_ENVMAP
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
#endif`,ol=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sl=`#ifdef USE_ENVMAP
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
#endif`,ll=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cl=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dl=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fl=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ul=`#ifdef USE_GRADIENTMAP
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
}`,pl=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hl=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ml=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_l=`uniform bool receiveShadow;
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
#endif`,gl=`#ifdef USE_ENVMAP
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
#endif`,vl=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,El=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sl=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ml=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tl=`PhysicalMaterial material;
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
#endif`,xl=`struct PhysicalMaterial {
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
}`,Al=`
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
#endif`,Rl=`#if defined( RE_IndirectDiffuse )
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
#endif`,bl=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ll=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yl=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ul=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Il=`#if defined( USE_POINTS_UV )
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
#endif`,Nl=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ol=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fl=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bl=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hl=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gl=`#ifdef USE_MORPHTARGETS
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
#endif`,Vl=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kl=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zl=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Wl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yl=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kl=`#ifdef USE_NORMALMAP
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
#endif`,ql=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zl=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$l=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jl=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ql=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jl=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ec=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tc=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nc=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ic=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rc=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ac=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,oc=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sc=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lc=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cc=`float getShadowMask() {
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
}`,dc=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fc=`#ifdef USE_SKINNING
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
#endif`,uc=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pc=`#ifdef USE_SKINNING
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
#endif`,hc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mc=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_c=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gc=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,vc=`#ifdef USE_TRANSMISSION
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
#endif`,Ec=`#ifdef USE_TRANSMISSION
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
#endif`,Sc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xc=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ac=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rc=`uniform sampler2D t2D;
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
}`,bc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cc=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pc=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dc=`#include <common>
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
}`,Lc=`#if DEPTH_PACKING == 3200
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
}`,yc=`#define DISTANCE
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
}`,Uc=`#define DISTANCE
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
}`,Ic=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nc=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Oc=`uniform float scale;
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
}`,Fc=`uniform vec3 diffuse;
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
}`,Bc=`#include <common>
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
}`,Hc=`uniform vec3 diffuse;
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
}`,Gc=`#define LAMBERT
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
}`,Vc=`#define LAMBERT
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
}`,kc=`#define MATCAP
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
}`,zc=`#define MATCAP
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
}`,Wc=`#define NORMAL
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
}`,Xc=`#define NORMAL
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
}`,Yc=`#define PHONG
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
}`,Kc=`#define PHONG
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
}`,qc=`#define STANDARD
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
}`,Zc=`#define STANDARD
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
}`,$c=`#define TOON
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
}`,jc=`#define TOON
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
}`,Qc=`uniform float size;
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
}`,Jc=`uniform vec3 diffuse;
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
}`,ed=`#include <common>
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
}`,td=`uniform vec3 color;
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
}`,nd=`uniform float rotation;
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
}`,id=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:Rs,alphahash_pars_fragment:bs,alphamap_fragment:Cs,alphamap_pars_fragment:ws,alphatest_fragment:Ps,alphatest_pars_fragment:Ds,aomap_fragment:Ls,aomap_pars_fragment:ys,batching_pars_vertex:Us,batching_vertex:Is,begin_vertex:Ns,beginnormal_vertex:Os,bsdfs:Fs,iridescence_fragment:Bs,bumpmap_pars_fragment:Hs,clipping_planes_fragment:Gs,clipping_planes_pars_fragment:Vs,clipping_planes_pars_vertex:ks,clipping_planes_vertex:zs,color_fragment:Ws,color_pars_fragment:Xs,color_pars_vertex:Ys,color_vertex:Ks,common:qs,cube_uv_reflection_fragment:Zs,defaultnormal_vertex:$s,displacementmap_pars_vertex:js,displacementmap_vertex:Qs,emissivemap_fragment:Js,emissivemap_pars_fragment:el,colorspace_fragment:tl,colorspace_pars_fragment:nl,envmap_fragment:il,envmap_common_pars_fragment:rl,envmap_pars_fragment:al,envmap_pars_vertex:ol,envmap_physical_pars_fragment:gl,envmap_vertex:sl,fog_vertex:ll,fog_pars_vertex:cl,fog_fragment:dl,fog_pars_fragment:fl,gradientmap_pars_fragment:ul,lightmap_pars_fragment:pl,lights_lambert_fragment:hl,lights_lambert_pars_fragment:ml,lights_pars_begin:_l,lights_toon_fragment:vl,lights_toon_pars_fragment:El,lights_phong_fragment:Sl,lights_phong_pars_fragment:Ml,lights_physical_fragment:Tl,lights_physical_pars_fragment:xl,lights_fragment_begin:Al,lights_fragment_maps:Rl,lights_fragment_end:bl,logdepthbuf_fragment:Cl,logdepthbuf_pars_fragment:wl,logdepthbuf_pars_vertex:Pl,logdepthbuf_vertex:Dl,map_fragment:Ll,map_pars_fragment:yl,map_particle_fragment:Ul,map_particle_pars_fragment:Il,metalnessmap_fragment:Nl,metalnessmap_pars_fragment:Ol,morphinstance_vertex:Fl,morphcolor_vertex:Bl,morphnormal_vertex:Hl,morphtarget_pars_vertex:Gl,morphtarget_vertex:Vl,normal_fragment_begin:kl,normal_fragment_maps:zl,normal_pars_fragment:Wl,normal_pars_vertex:Xl,normal_vertex:Yl,normalmap_pars_fragment:Kl,clearcoat_normal_fragment_begin:ql,clearcoat_normal_fragment_maps:Zl,clearcoat_pars_fragment:$l,iridescence_pars_fragment:jl,opaque_fragment:Ql,packing:Jl,premultiplied_alpha_fragment:ec,project_vertex:tc,dithering_fragment:nc,dithering_pars_fragment:ic,roughnessmap_fragment:rc,roughnessmap_pars_fragment:ac,shadowmap_pars_fragment:oc,shadowmap_pars_vertex:sc,shadowmap_vertex:lc,shadowmask_pars_fragment:cc,skinbase_vertex:dc,skinning_pars_vertex:fc,skinning_vertex:uc,skinnormal_vertex:pc,specularmap_fragment:hc,specularmap_pars_fragment:mc,tonemapping_fragment:_c,tonemapping_pars_fragment:gc,transmission_fragment:vc,transmission_pars_fragment:Ec,uv_pars_fragment:Sc,uv_pars_vertex:Mc,uv_vertex:Tc,worldpos_vertex:xc,background_vert:Ac,background_frag:Rc,backgroundCube_vert:bc,backgroundCube_frag:Cc,cube_vert:wc,cube_frag:Pc,depth_vert:Dc,depth_frag:Lc,distanceRGBA_vert:yc,distanceRGBA_frag:Uc,equirect_vert:Ic,equirect_frag:Nc,linedashed_vert:Oc,linedashed_frag:Fc,meshbasic_vert:Bc,meshbasic_frag:Hc,meshlambert_vert:Gc,meshlambert_frag:Vc,meshmatcap_vert:kc,meshmatcap_frag:zc,meshnormal_vert:Wc,meshnormal_frag:Xc,meshphong_vert:Yc,meshphong_frag:Kc,meshphysical_vert:qc,meshphysical_frag:Zc,meshtoon_vert:$c,meshtoon_frag:jc,points_vert:Qc,points_frag:Jc,shadow_vert:ed,shadow_frag:td,sprite_vert:nd,sprite_frag:id},re={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},At={basic:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ke(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:mt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:mt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new ke(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:mt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:mt([re.points,re.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:mt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:mt([re.common,re.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:mt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:mt([re.sprite,re.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:mt([re.common,re.displacementmap,{referencePosition:{value:new le},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:mt([re.lights,re.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};At.physical={uniforms:mt([At.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const gn={r:0,b:0,g:0},Ut=new Dn,rd=new St;function ad(e,n,t,i,a,r,f){const l=new ke(0);let E=r===!0?0:1,_,A,S=null,g=0,T=null;function N(R){let v=R.isScene===!0?R.background:null;return v&&v.isTexture&&(v=(R.backgroundBlurriness>0?t:n).get(v)),v}function L(R){let v=!1;const O=N(R);O===null?o(l,E):O&&O.isColor&&(o(O,1),v=!0);const x=e.xr.getEnvironmentBlendMode();x==="additive"?i.buffers.color.setClear(0,0,0,1,f):x==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,f),(e.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function d(R,v){const O=N(v);O&&(O.isCubeTexture||O.mapping===Nn)?(A===void 0&&(A=new ut(new Ai(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:hr(At.backgroundCube.uniforms),vertexShader:At.backgroundCube.vertexShader,fragmentShader:At.backgroundCube.fragmentShader,side:Mt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),A.geometry.deleteAttribute("normal"),A.geometry.deleteAttribute("uv"),A.onBeforeRender=function(x,D,H){this.matrixWorld.copyPosition(H.matrixWorld)},Object.defineProperty(A.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(A)),Ut.copy(v.backgroundRotation),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),A.material.uniforms.envMap.value=O,A.material.uniforms.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,A.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,A.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,A.material.uniforms.backgroundRotation.value.setFromMatrix4(rd.makeRotationFromEuler(Ut)),A.material.toneMapped=at.getTransfer(O.colorSpace)!==je,(S!==O||g!==O.version||T!==e.toneMapping)&&(A.material.needsUpdate=!0,S=O,g=O.version,T=e.toneMapping),A.layers.enableAll(),R.unshift(A,A.geometry,A.material,0,0,null)):O&&O.isTexture&&(_===void 0&&(_=new ut(new pn(2,2),new Dt({name:"BackgroundMaterial",uniforms:hr(At.background.uniforms),vertexShader:At.background.vertexShader,fragmentShader:At.background.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),_.geometry.deleteAttribute("normal"),Object.defineProperty(_.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(_)),_.material.uniforms.t2D.value=O,_.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,_.material.toneMapped=at.getTransfer(O.colorSpace)!==je,O.matrixAutoUpdate===!0&&O.updateMatrix(),_.material.uniforms.uvTransform.value.copy(O.matrix),(S!==O||g!==O.version||T!==e.toneMapping)&&(_.material.needsUpdate=!0,S=O,g=O.version,T=e.toneMapping),_.layers.enableAll(),R.unshift(_,_.geometry,_.material,0,0,null))}function o(R,v){R.getRGB(gn,Ma(e)),i.buffers.color.setClear(gn.r,gn.g,gn.b,v,f)}function y(){A!==void 0&&(A.geometry.dispose(),A.material.dispose(),A=void 0),_!==void 0&&(_.geometry.dispose(),_.material.dispose(),_=void 0)}return{getClearColor:function(){return l},setClearColor:function(R,v=1){l.set(R),E=v,o(l,E)},getClearAlpha:function(){return E},setClearAlpha:function(R){E=R,o(l,E)},render:L,addToRenderList:d,dispose:y}}function od(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=g(null);let r=a,f=!1;function l(u,w,B,K,X){let q=!1;const W=S(K,B,w);r!==W&&(r=W,_(r.object)),q=T(u,K,B,X),q&&N(u,K,B,X),X!==null&&n.update(X,e.ELEMENT_ARRAY_BUFFER),(q||f)&&(f=!1,v(u,w,B,K),X!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(X).buffer))}function E(){return e.createVertexArray()}function _(u){return e.bindVertexArray(u)}function A(u){return e.deleteVertexArray(u)}function S(u,w,B){const K=B.wireframe===!0;let X=i[u.id];X===void 0&&(X={},i[u.id]=X);let q=X[w.id];q===void 0&&(q={},X[w.id]=q);let W=q[K];return W===void 0&&(W=g(E()),q[K]=W),W}function g(u){const w=[],B=[],K=[];for(let X=0;X<t;X++)w[X]=0,B[X]=0,K[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:B,attributeDivisors:K,object:u,attributes:{},index:null}}function T(u,w,B,K){const X=r.attributes,q=w.attributes;let W=0;const ne=B.getAttributes();for(const V in ne)if(ne[V].location>=0){const Te=X[V];let Pe=q[V];if(Pe===void 0&&(V==="instanceMatrix"&&u.instanceMatrix&&(Pe=u.instanceMatrix),V==="instanceColor"&&u.instanceColor&&(Pe=u.instanceColor)),Te===void 0||Te.attribute!==Pe||Pe&&Te.data!==Pe.data)return!0;W++}return r.attributesNum!==W||r.index!==K}function N(u,w,B,K){const X={},q=w.attributes;let W=0;const ne=B.getAttributes();for(const V in ne)if(ne[V].location>=0){let Te=q[V];Te===void 0&&(V==="instanceMatrix"&&u.instanceMatrix&&(Te=u.instanceMatrix),V==="instanceColor"&&u.instanceColor&&(Te=u.instanceColor));const Pe={};Pe.attribute=Te,Te&&Te.data&&(Pe.data=Te.data),X[V]=Pe,W++}r.attributes=X,r.attributesNum=W,r.index=K}function L(){const u=r.newAttributes;for(let w=0,B=u.length;w<B;w++)u[w]=0}function d(u){o(u,0)}function o(u,w){const B=r.newAttributes,K=r.enabledAttributes,X=r.attributeDivisors;B[u]=1,K[u]===0&&(e.enableVertexAttribArray(u),K[u]=1),X[u]!==w&&(e.vertexAttribDivisor(u,w),X[u]=w)}function y(){const u=r.newAttributes,w=r.enabledAttributes;for(let B=0,K=w.length;B<K;B++)w[B]!==u[B]&&(e.disableVertexAttribArray(B),w[B]=0)}function R(u,w,B,K,X,q,W){W===!0?e.vertexAttribIPointer(u,w,B,X,q):e.vertexAttribPointer(u,w,B,K,X,q)}function v(u,w,B,K){L();const X=K.attributes,q=B.getAttributes(),W=w.defaultAttributeValues;for(const ne in q){const V=q[ne];if(V.location>=0){let ge=X[ne];if(ge===void 0&&(ne==="instanceMatrix"&&u.instanceMatrix&&(ge=u.instanceMatrix),ne==="instanceColor"&&u.instanceColor&&(ge=u.instanceColor)),ge!==void 0){const Te=ge.normalized,Pe=ge.itemSize,Be=n.get(ge);if(Be===void 0)continue;const et=Be.buffer,Ze=Be.type,Ge=Be.bytesPerElement,z=Ze===e.INT||Ze===e.UNSIGNED_INT||ge.gpuType===_a;if(ge.isInterleavedBufferAttribute){const P=ge.data,$=P.stride,ue=ge.offset;if(P.isInstancedInterleavedBuffer){for(let ce=0;ce<V.locationSize;ce++)o(V.location+ce,P.meshPerAttribute);u.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let ce=0;ce<V.locationSize;ce++)d(V.location+ce);e.bindBuffer(e.ARRAY_BUFFER,et);for(let ce=0;ce<V.locationSize;ce++)R(V.location+ce,Pe/V.locationSize,Ze,Te,$*Ge,(ue+Pe/V.locationSize*ce)*Ge,z)}else{if(ge.isInstancedBufferAttribute){for(let P=0;P<V.locationSize;P++)o(V.location+P,ge.meshPerAttribute);u.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let P=0;P<V.locationSize;P++)d(V.location+P);e.bindBuffer(e.ARRAY_BUFFER,et);for(let P=0;P<V.locationSize;P++)R(V.location+P,Pe/V.locationSize,Ze,Te,Pe*Ge,Pe/V.locationSize*P*Ge,z)}}else if(W!==void 0){const Te=W[ne];if(Te!==void 0)switch(Te.length){case 2:e.vertexAttrib2fv(V.location,Te);break;case 3:e.vertexAttrib3fv(V.location,Te);break;case 4:e.vertexAttrib4fv(V.location,Te);break;default:e.vertexAttrib1fv(V.location,Te)}}}}y()}function O(){H();for(const u in i){const w=i[u];for(const B in w){const K=w[B];for(const X in K)A(K[X].object),delete K[X];delete w[B]}delete i[u]}}function x(u){if(i[u.id]===void 0)return;const w=i[u.id];for(const B in w){const K=w[B];for(const X in K)A(K[X].object),delete K[X];delete w[B]}delete i[u.id]}function D(u){for(const w in i){const B=i[w];if(B[u.id]===void 0)continue;const K=B[u.id];for(const X in K)A(K[X].object),delete K[X];delete B[u.id]}}function H(){p(),f=!0,r!==a&&(r=a,_(r.object))}function p(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:l,reset:H,resetDefaultState:p,dispose:O,releaseStatesOfGeometry:x,releaseStatesOfProgram:D,initAttributes:L,enableAttribute:d,disableUnusedAttributes:y}}function sd(e,n,t){let i;function a(_){i=_}function r(_,A){e.drawArrays(i,_,A),t.update(A,i,1)}function f(_,A,S){S!==0&&(e.drawArraysInstanced(i,_,A,S),t.update(A,i,S))}function l(_,A,S){if(S===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,_,0,A,0,S);let T=0;for(let N=0;N<S;N++)T+=A[N];t.update(T,i,1)}function E(_,A,S,g){if(S===0)return;const T=n.get("WEBGL_multi_draw");if(T===null)for(let N=0;N<_.length;N++)f(_[N],A[N],g[N]);else{T.multiDrawArraysInstancedWEBGL(i,_,0,A,0,g,0,S);let N=0;for(let L=0;L<S;L++)N+=A[L]*g[L];t.update(N,i,1)}}this.setMode=a,this.render=r,this.renderInstances=f,this.renderMultiDraw=l,this.renderMultiDrawInstances=E}function ld(e,n,t,i){let a;function r(){if(a!==void 0)return a;if(n.has("EXT_texture_filter_anisotropic")===!0){const D=n.get("EXT_texture_filter_anisotropic");a=e.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function f(D){return!(D!==Ct&&i.convert(D)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(D){const H=D===Un&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(D!==Gt&&i.convert(D)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==Ft&&!H)}function E(D){if(D==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let _=t.precision!==void 0?t.precision:"highp";const A=E(_);A!==_&&(console.warn("THREE.WebGLRenderer:",_,"not supported, using",A,"instead."),_=A);const S=t.logarithmicDepthBuffer===!0,g=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),T=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),N=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),L=e.getParameter(e.MAX_TEXTURE_SIZE),d=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),o=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),R=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),O=N>0,x=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:E,textureFormatReadable:f,textureTypeReadable:l,precision:_,logarithmicDepthBuffer:S,reversedDepthBuffer:g,maxTextures:T,maxVertexTextures:N,maxTextureSize:L,maxCubemapSize:d,maxAttributes:o,maxVertexUniforms:y,maxVaryings:R,maxFragmentUniforms:v,vertexTextures:O,maxSamples:x}}function cd(e){const n=this;let t=null,i=0,a=!1,r=!1;const f=new Ti,l=new Fe,E={value:null,needsUpdate:!1};this.uniform=E,this.numPlanes=0,this.numIntersection=0,this.init=function(S,g){const T=S.length!==0||g||i!==0||a;return a=g,i=S.length,T},this.beginShadows=function(){r=!0,A(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(S,g){t=A(S,g,0)},this.setState=function(S,g,T){const N=S.clippingPlanes,L=S.clipIntersection,d=S.clipShadows,o=e.get(S);if(!a||N===null||N.length===0||r&&!d)r?A(null):_();else{const y=r?0:i,R=y*4;let v=o.clippingState||null;E.value=v,v=A(N,g,R,T);for(let O=0;O!==R;++O)v[O]=t[O];o.clippingState=v,this.numIntersection=L?this.numPlanes:0,this.numPlanes+=y}};function _(){E.value!==t&&(E.value=t,E.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function A(S,g,T,N){const L=S!==null?S.length:0;let d=null;if(L!==0){if(d=E.value,N!==!0||d===null){const o=T+L*4,y=g.matrixWorldInverse;l.getNormalMatrix(y),(d===null||d.length<o)&&(d=new Float32Array(o));for(let R=0,v=T;R!==L;++R,v+=4)f.copy(S[R]).applyMatrix4(y,l),f.normal.toArray(d,v),d[v+3]=f.constant}E.value=d,E.needsUpdate=!0}return n.numPlanes=L,n.numIntersection=0,d}}function dd(e){let n=new WeakMap;function t(f,l){return l===mi?f.mapping=fn:l===_i&&(f.mapping=jt),f}function i(f){if(f&&f.isTexture){const l=f.mapping;if(l===mi||l===_i)if(n.has(f)){const E=n.get(f).texture;return t(E,f.mapping)}else{const E=f.image;if(E&&E.height>0){const _=new ko(E.height);return _.fromEquirectangularTexture(e,f),n.set(f,_),f.addEventListener("dispose",a),t(_.texture,f.mapping)}else return null}}return f}function a(f){const l=f.target;l.removeEventListener("dispose",a);const E=n.get(l);E!==void 0&&(n.delete(l),E.dispose())}function r(){n=new WeakMap}return{get:i,dispose:r}}const Kt=4,Tr=[.125,.215,.35,.446,.526,.582],Ot=20,Kn=new xa,xr=new ke;let qn=null,Zn=0,$n=0,jn=!1;const Nt=(1+Math.sqrt(5))/2,kt=1/Nt,Ar=[new le(-Nt,kt,0),new le(Nt,kt,0),new le(-kt,0,Nt),new le(kt,0,Nt),new le(0,Nt,-kt),new le(0,Nt,kt),new le(-1,1,-1),new le(1,1,-1),new le(-1,1,1),new le(1,1,1)],fd=new le;class Rr{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,a=100,r={}){const{size:f=256,position:l=fd}=r;qn=this._renderer.getRenderTarget(),Zn=this._renderer.getActiveCubeFace(),$n=this._renderer.getActiveMipmapLevel(),jn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const E=this._allocateTargets();return E.depthBuffer=!0,this._sceneToCubeUV(n,i,a,E,l),t>0&&this._blur(E,0,0,t),this._applyPMREM(E),this._cleanup(E),E}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(qn,Zn,$n),this._renderer.xr.enabled=jn,n.scissorTest=!1,vn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===fn||n.mapping===jt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),qn=this._renderer.getRenderTarget(),Zn=this._renderer.getActiveCubeFace(),$n=this._renderer.getActiveMipmapLevel(),jn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:Un,format:Ct,colorSpace:In,depthBuffer:!1},a=br(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=br(n,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ud(r)),this._blurMaterial=pd(r,n,t)}return a}_compileMaterial(n){const t=new ut(this._lodPlanes[0],n);this._renderer.compile(t,Kn)}_sceneToCubeUV(n,t,i,a,r){const E=new qt(90,1,t,i),_=[1,-1,1,1,1,1],A=[1,1,1,-1,-1,-1],S=this._renderer,g=S.autoClear,T=S.toneMapping;S.getClearColor(xr),S.toneMapping=wt,S.autoClear=!1,S.state.buffers.depth.getReversed()&&(S.setRenderTarget(a),S.clearDepth(),S.setRenderTarget(null));const L=new Ri({name:"PMREM.Background",side:Mt,depthWrite:!1,depthTest:!1}),d=new ut(new Ai,L);let o=!1;const y=n.background;y?y.isColor&&(L.color.copy(y),n.background=null,o=!0):(L.color.copy(xr),o=!0);for(let R=0;R<6;R++){const v=R%3;v===0?(E.up.set(0,_[R],0),E.position.set(r.x,r.y,r.z),E.lookAt(r.x+A[R],r.y,r.z)):v===1?(E.up.set(0,0,_[R]),E.position.set(r.x,r.y,r.z),E.lookAt(r.x,r.y+A[R],r.z)):(E.up.set(0,_[R],0),E.position.set(r.x,r.y,r.z),E.lookAt(r.x,r.y,r.z+A[R]));const O=this._cubeSize;vn(a,v*O,R>2?O:0,O,O),S.setRenderTarget(a),o&&S.render(d,E),S.render(n,E)}d.geometry.dispose(),d.material.dispose(),S.toneMapping=T,S.autoClear=g,n.background=y}_textureToCubeUV(n,t){const i=this._renderer,a=n.mapping===fn||n.mapping===jt;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=wr()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cr());const r=a?this._cubemapMaterial:this._equirectMaterial,f=new ut(this._lodPlanes[0],r),l=r.uniforms;l.envMap.value=n;const E=this._cubeSize;vn(t,0,0,3*E,2*E),i.setRenderTarget(t),i.render(f,Kn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const f=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=Ar[(a-r-1)%Ar.length];this._blur(n,r-1,r,f,l)}t.autoClear=i}_blur(n,t,i,a,r){const f=this._pingPongRenderTarget;this._halfBlur(n,f,t,i,a,"latitudinal",r),this._halfBlur(f,n,i,i,a,"longitudinal",r)}_halfBlur(n,t,i,a,r,f,l){const E=this._renderer,_=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const A=3,S=new ut(this._lodPlanes[a],_),g=_.uniforms,T=this._sizeLods[i]-1,N=isFinite(r)?Math.PI/(2*T):2*Math.PI/(2*Ot-1),L=r/N,d=isFinite(r)?1+Math.floor(A*L):Ot;d>Ot&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Ot}`);const o=[];let y=0;for(let D=0;D<Ot;++D){const H=D/L,p=Math.exp(-H*H/2);o.push(p),D===0?y+=p:D<d&&(y+=2*p)}for(let D=0;D<o.length;D++)o[D]=o[D]/y;g.envMap.value=n.texture,g.samples.value=d,g.weights.value=o,g.latitudinal.value=f==="latitudinal",l&&(g.poleAxis.value=l);const{_lodMax:R}=this;g.dTheta.value=N,g.mipInt.value=R-i;const v=this._sizeLods[a],O=3*v*(a>R-Kt?a-R+Kt:0),x=4*(this._cubeSize-v);vn(t,O,x,3*v,2*v),E.setRenderTarget(t),E.render(S,Kn)}}function ud(e){const n=[],t=[],i=[];let a=e;const r=e-Kt+1+Tr.length;for(let f=0;f<r;f++){const l=Math.pow(2,a);t.push(l);let E=1/l;f>e-Kt?E=Tr[f-e+Kt-1]:f===0&&(E=0),i.push(E);const _=1/(l-2),A=-_,S=1+_,g=[A,A,S,A,S,S,A,A,S,S,A,S],T=6,N=6,L=3,d=2,o=1,y=new Float32Array(L*N*T),R=new Float32Array(d*N*T),v=new Float32Array(o*N*T);for(let x=0;x<T;x++){const D=x%3*2/3-1,H=x>2?0:-1,p=[D,H,0,D+2/3,H,0,D+2/3,H+1,0,D,H,0,D+2/3,H+1,0,D,H+1,0];y.set(p,L*N*x),R.set(g,d*N*x);const u=[x,x,x,x,x,x];v.set(u,o*N*x)}const O=new xi;O.setAttribute("position",new sn(y,L)),O.setAttribute("uv",new sn(R,d)),O.setAttribute("faceIndex",new sn(v,o)),n.push(O),a>Kt&&a--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function br(e,n,t){const i=new $t(e,n,t);return i.texture.mapping=Nn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vn(e,n,t,i,a){e.viewport.set(n,t,i,a),e.scissor.set(n,t,i,a)}function pd(e,n,t){const i=new Float32Array(Ot),a=new le(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:Ot,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:bi(),fragmentShader:`

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
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function Cr(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bi(),fragmentShader:`

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
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function wr(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bi(),fragmentShader:`

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
	`}function hd(e){let n=new WeakMap,t=null;function i(l){if(l&&l.isTexture){const E=l.mapping,_=E===mi||E===_i,A=E===fn||E===jt;if(_||A){let S=n.get(l);const g=S!==void 0?S.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==g)return t===null&&(t=new Rr(e)),S=_?t.fromEquirectangular(l,S):t.fromCubemap(l,S),S.texture.pmremVersion=l.pmremVersion,n.set(l,S),S.texture;if(S!==void 0)return S.texture;{const T=l.image;return _&&T&&T.height>0||A&&T&&a(T)?(t===null&&(t=new Rr(e)),S=_?t.fromEquirectangular(l):t.fromCubemap(l),S.texture.pmremVersion=l.pmremVersion,n.set(l,S),l.addEventListener("dispose",r),S.texture):null}}}return l}function a(l){let E=0;const _=6;for(let A=0;A<_;A++)l[A]!==void 0&&E++;return E===_}function r(l){const E=l.target;E.removeEventListener("dispose",r);const _=n.get(E);_!==void 0&&(n.delete(E),_.dispose())}function f(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:f}}function md(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let a;switch(i){case"WEBGL_depth_texture":a=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=e.getExtension(i)}return n[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&si("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function _d(e,n,t,i){const a={},r=new WeakMap;function f(S){const g=S.target;g.index!==null&&n.remove(g.index);for(const N in g.attributes)n.remove(g.attributes[N]);g.removeEventListener("dispose",f),delete a[g.id];const T=r.get(g);T&&(n.remove(T),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function l(S,g){return a[g.id]===!0||(g.addEventListener("dispose",f),a[g.id]=!0,t.memory.geometries++),g}function E(S){const g=S.attributes;for(const T in g)n.update(g[T],e.ARRAY_BUFFER)}function _(S){const g=[],T=S.index,N=S.attributes.position;let L=0;if(T!==null){const y=T.array;L=T.version;for(let R=0,v=y.length;R<v;R+=3){const O=y[R+0],x=y[R+1],D=y[R+2];g.push(O,x,x,D,D,O)}}else if(N!==void 0){const y=N.array;L=N.version;for(let R=0,v=y.length/3-1;R<v;R+=3){const O=R+0,x=R+1,D=R+2;g.push(O,x,x,D,D,O)}}else return;const d=new(qo(g)?Yo:Ko)(g,1);d.version=L;const o=r.get(S);o&&n.remove(o),r.set(S,d)}function A(S){const g=r.get(S);if(g){const T=S.index;T!==null&&g.version<T.version&&_(S)}else _(S);return r.get(S)}return{get:l,update:E,getWireframeAttribute:A}}function gd(e,n,t){let i;function a(g){i=g}let r,f;function l(g){r=g.type,f=g.bytesPerElement}function E(g,T){e.drawElements(i,T,r,g*f),t.update(T,i,1)}function _(g,T,N){N!==0&&(e.drawElementsInstanced(i,T,r,g*f,N),t.update(T,i,N))}function A(g,T,N){if(N===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,T,0,r,g,0,N);let d=0;for(let o=0;o<N;o++)d+=T[o];t.update(d,i,1)}function S(g,T,N,L){if(N===0)return;const d=n.get("WEBGL_multi_draw");if(d===null)for(let o=0;o<g.length;o++)_(g[o]/f,T[o],L[o]);else{d.multiDrawElementsInstancedWEBGL(i,T,0,r,g,0,L,0,N);let o=0;for(let y=0;y<N;y++)o+=T[y]*L[y];t.update(o,i,1)}}this.setMode=a,this.setIndex=l,this.render=E,this.renderInstances=_,this.renderMultiDraw=A,this.renderMultiDrawInstances=S}function vd(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,f,l){switch(t.calls++,f){case e.TRIANGLES:t.triangles+=l*(r/3);break;case e.LINES:t.lines+=l*(r/2);break;case e.LINE_STRIP:t.lines+=l*(r-1);break;case e.LINE_LOOP:t.lines+=l*r;break;case e.POINTS:t.points+=l*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:a,update:i}}function Ed(e,n,t){const i=new WeakMap,a=new dt;function r(f,l,E){const _=f.morphTargetInfluences,A=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,S=A!==void 0?A.length:0;let g=i.get(l);if(g===void 0||g.count!==S){let p=function(){D.dispose(),i.delete(l),l.removeEventListener("dispose",p)};g!==void 0&&g.texture.dispose();const T=l.morphAttributes.position!==void 0,N=l.morphAttributes.normal!==void 0,L=l.morphAttributes.color!==void 0,d=l.morphAttributes.position||[],o=l.morphAttributes.normal||[],y=l.morphAttributes.color||[];let R=0;T===!0&&(R=1),N===!0&&(R=2),L===!0&&(R=3);let v=l.attributes.position.count*R,O=1;v>n.maxTextureSize&&(O=Math.ceil(v/n.maxTextureSize),v=n.maxTextureSize);const x=new Float32Array(v*O*4*S),D=new Sa(x,v,O,S);D.type=Ft,D.needsUpdate=!0;const H=R*4;for(let u=0;u<S;u++){const w=d[u],B=o[u],K=y[u],X=v*O*4*u;for(let q=0;q<w.count;q++){const W=q*H;T===!0&&(a.fromBufferAttribute(w,q),x[X+W+0]=a.x,x[X+W+1]=a.y,x[X+W+2]=a.z,x[X+W+3]=0),N===!0&&(a.fromBufferAttribute(B,q),x[X+W+4]=a.x,x[X+W+5]=a.y,x[X+W+6]=a.z,x[X+W+7]=0),L===!0&&(a.fromBufferAttribute(K,q),x[X+W+8]=a.x,x[X+W+9]=a.y,x[X+W+10]=a.z,x[X+W+11]=K.itemSize===4?a.w:1)}}g={count:S,texture:D,size:new We(v,O)},i.set(l,g),l.addEventListener("dispose",p)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)E.getUniforms().setValue(e,"morphTexture",f.morphTexture,t);else{let T=0;for(let L=0;L<_.length;L++)T+=_[L];const N=l.morphTargetsRelative?1:1-T;E.getUniforms().setValue(e,"morphTargetBaseInfluence",N),E.getUniforms().setValue(e,"morphTargetInfluences",_)}E.getUniforms().setValue(e,"morphTargetsTexture",g.texture,t),E.getUniforms().setValue(e,"morphTargetsTextureSize",g.size)}return{update:r}}function Sd(e,n,t,i){let a=new WeakMap;function r(E){const _=i.render.frame,A=E.geometry,S=n.get(E,A);if(a.get(S)!==_&&(n.update(S),a.set(S,_)),E.isInstancedMesh&&(E.hasEventListener("dispose",l)===!1&&E.addEventListener("dispose",l),a.get(E)!==_&&(t.update(E.instanceMatrix,e.ARRAY_BUFFER),E.instanceColor!==null&&t.update(E.instanceColor,e.ARRAY_BUFFER),a.set(E,_))),E.isSkinnedMesh){const g=E.skeleton;a.get(g)!==_&&(g.update(),a.set(g,_))}return S}function f(){a=new WeakMap}function l(E){const _=E.target;_.removeEventListener("dispose",l),t.remove(_.instanceMatrix),_.instanceColor!==null&&t.remove(_.instanceColor)}return{update:r,dispose:f}}const Pa=new os,Pr=new da(1,1),Da=new Sa,La=new as,ya=new rs,Dr=[],Lr=[],yr=new Float32Array(16),Ur=new Float32Array(9),Ir=new Float32Array(4);function Jt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const a=n*t;let r=Dr[a];if(r===void 0&&(r=new Float32Array(a),Dr[a]=r),n!==0){i.toArray(r,0);for(let f=1,l=0;f!==n;++f)l+=t,e[f].toArray(r,l)}return r}function st(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function lt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function On(e,n){let t=Lr[n];t===void 0&&(t=new Int32Array(n),Lr[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Md(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Td(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2fv(this.addr,n),lt(t,n)}}function xd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(st(t,n))return;e.uniform3fv(this.addr,n),lt(t,n)}}function Ad(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4fv(this.addr,n),lt(t,n)}}function Rd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Ir.set(i),e.uniformMatrix2fv(this.addr,!1,Ir),lt(t,i)}}function bd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Ur.set(i),e.uniformMatrix3fv(this.addr,!1,Ur),lt(t,i)}}function Cd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;yr.set(i),e.uniformMatrix4fv(this.addr,!1,yr),lt(t,i)}}function wd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Pd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2iv(this.addr,n),lt(t,n)}}function Dd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3iv(this.addr,n),lt(t,n)}}function Ld(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4iv(this.addr,n),lt(t,n)}}function yd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Ud(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2uiv(this.addr,n),lt(t,n)}}function Id(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3uiv(this.addr,n),lt(t,n)}}function Nd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4uiv(this.addr,n),lt(t,n)}}function Od(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let r;this.type===e.SAMPLER_2D_SHADOW?(Pr.compareFunction=fa,r=Pr):r=Pa,t.setTexture2D(n||r,a)}function Fd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(n||La,a)}function Bd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(n||ya,a)}function Hd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(n||Da,a)}function Gd(e){switch(e){case 5126:return Md;case 35664:return Td;case 35665:return xd;case 35666:return Ad;case 35674:return Rd;case 35675:return bd;case 35676:return Cd;case 5124:case 35670:return wd;case 35667:case 35671:return Pd;case 35668:case 35672:return Dd;case 35669:case 35673:return Ld;case 5125:return yd;case 36294:return Ud;case 36295:return Id;case 36296:return Nd;case 35678:case 36198:case 36298:case 36306:case 35682:return Od;case 35679:case 36299:case 36307:return Fd;case 35680:case 36300:case 36308:case 36293:return Bd;case 36289:case 36303:case 36311:case 36292:return Hd}}function Vd(e,n){e.uniform1fv(this.addr,n)}function kd(e,n){const t=Jt(n,this.size,2);e.uniform2fv(this.addr,t)}function zd(e,n){const t=Jt(n,this.size,3);e.uniform3fv(this.addr,t)}function Wd(e,n){const t=Jt(n,this.size,4);e.uniform4fv(this.addr,t)}function Xd(e,n){const t=Jt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Yd(e,n){const t=Jt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function Kd(e,n){const t=Jt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function qd(e,n){e.uniform1iv(this.addr,n)}function Zd(e,n){e.uniform2iv(this.addr,n)}function $d(e,n){e.uniform3iv(this.addr,n)}function jd(e,n){e.uniform4iv(this.addr,n)}function Qd(e,n){e.uniform1uiv(this.addr,n)}function Jd(e,n){e.uniform2uiv(this.addr,n)}function ef(e,n){e.uniform3uiv(this.addr,n)}function tf(e,n){e.uniform4uiv(this.addr,n)}function nf(e,n,t){const i=this.cache,a=n.length,r=On(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let f=0;f!==a;++f)t.setTexture2D(n[f]||Pa,r[f])}function rf(e,n,t){const i=this.cache,a=n.length,r=On(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let f=0;f!==a;++f)t.setTexture3D(n[f]||La,r[f])}function af(e,n,t){const i=this.cache,a=n.length,r=On(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let f=0;f!==a;++f)t.setTextureCube(n[f]||ya,r[f])}function of(e,n,t){const i=this.cache,a=n.length,r=On(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let f=0;f!==a;++f)t.setTexture2DArray(n[f]||Da,r[f])}function sf(e){switch(e){case 5126:return Vd;case 35664:return kd;case 35665:return zd;case 35666:return Wd;case 35674:return Xd;case 35675:return Yd;case 35676:return Kd;case 5124:case 35670:return qd;case 35667:case 35671:return Zd;case 35668:case 35672:return $d;case 35669:case 35673:return jd;case 5125:return Qd;case 36294:return Jd;case 36295:return ef;case 36296:return tf;case 35678:case 36198:case 36298:case 36306:case 35682:return nf;case 35679:case 36299:case 36307:return rf;case 35680:case 36300:case 36308:case 36293:return af;case 36289:case 36303:case 36311:case 36292:return of}}class lf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Gd(t.type)}}class cf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sf(t.type)}}class df{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const a=this.seq;for(let r=0,f=a.length;r!==f;++r){const l=a[r];l.setValue(n,t[l.id],i)}}}const Qn=/(\w+)(\])?(\[|\.)?/g;function Nr(e,n){e.seq.push(n),e.map[n.id]=n}function ff(e,n,t){const i=e.name,a=i.length;for(Qn.lastIndex=0;;){const r=Qn.exec(i),f=Qn.lastIndex;let l=r[1];const E=r[2]==="]",_=r[3];if(E&&(l=l|0),_===void 0||_==="["&&f+2===a){Nr(t,_===void 0?new lf(l,e,n):new cf(l,e,n));break}else{let S=t.map[l];S===void 0&&(S=new df(l),Nr(t,S)),t=S}}}class Rn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const r=n.getActiveUniform(t,a),f=n.getUniformLocation(t,r.name);ff(r,f,this)}}setValue(n,t,i,a){const r=this.map[t];r!==void 0&&r.setValue(n,i,a)}setOptional(n,t,i){const a=t[i];a!==void 0&&this.setValue(n,i,a)}static upload(n,t,i,a){for(let r=0,f=t.length;r!==f;++r){const l=t[r],E=i[l.id];E.needsUpdate!==!1&&l.setValue(n,E.value,a)}}static seqWithValue(n,t){const i=[];for(let a=0,r=n.length;a!==r;++a){const f=n[a];f.id in t&&i.push(f)}return i}}function Or(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const uf=37297;let pf=0;function hf(e,n){const t=e.split(`
`),i=[],a=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let f=a;f<r;f++){const l=f+1;i.push(`${l===n?">":" "} ${l}: ${t[f]}`)}return i.join(`
`)}const Fr=new Fe;function mf(e){at._getMatrix(Fr,at.workingColorSpace,e);const n=`mat3( ${Fr.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(e)){case Ta:return[n,"LinearTransferOETF"];case je:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Br(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const f=/ERROR: 0:(\d+)/.exec(r);if(f){const l=parseInt(f[1]);return t.toUpperCase()+`

`+r+`

`+hf(e.getShaderSource(n),l)}else return r}function _f(e,n){const t=mf(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function gf(e,n){let t;switch(n){case is:t="Linear";break;case ns:t="Reinhard";break;case ts:t="Cineon";break;case es:t="ACESFilmic";break;case Jo:t="AgX";break;case Qo:t="Neutral";break;case jo:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const En=new le;function vf(){at.getLuminanceCoefficients(En);const e=En.x.toFixed(4),n=En.y.toFixed(4),t=En.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ef(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rn).join(`
`)}function Sf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Mf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=e.getActiveAttrib(n,a),f=r.name;let l=1;r.type===e.FLOAT_MAT2&&(l=2),r.type===e.FLOAT_MAT3&&(l=3),r.type===e.FLOAT_MAT4&&(l=4),t[f]={type:r.type,location:e.getAttribLocation(n,f),locationSize:l}}return t}function rn(e){return e!==""}function Hr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Gr(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Tf=/^[ \t]*#include +<([\w\d./]+)>/gm;function gi(e){return e.replace(Tf,Af)}const xf=new Map;function Af(e,n){let t=Ne[n];if(t===void 0){const i=xf.get(n);if(i!==void 0)t=Ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return gi(t)}const Rf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vr(e){return e.replace(Rf,bf)}function bf(e,n,t,i){let a="";for(let r=parseInt(n);r<parseInt(t);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function kr(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}function Cf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===ua?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===$o?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===bt&&(n="SHADOWMAP_TYPE_VSM"),n}function wf(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case fn:case jt:n="ENVMAP_TYPE_CUBE";break;case Nn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Pf(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===jt&&(n="ENVMAP_MODE_REFRACTION"),n}function Df(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case ds:n="ENVMAP_BLENDING_MULTIPLY";break;case cs:n="ENVMAP_BLENDING_MIX";break;case ls:n="ENVMAP_BLENDING_ADD";break}return n}function Lf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function yf(e,n,t,i){const a=e.getContext(),r=t.defines;let f=t.vertexShader,l=t.fragmentShader;const E=Cf(t),_=wf(t),A=Pf(t),S=Df(t),g=Lf(t),T=Ef(t),N=Sf(r),L=a.createProgram();let d,o,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(rn).join(`
`),d.length>0&&(d+=`
`),o=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(rn).join(`
`),o.length>0&&(o+=`
`)):(d=[kr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+A:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+E:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rn).join(`
`),o=[kr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+_:"",t.envMap?"#define "+A:"",t.envMap?"#define "+S:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+E:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wt?"#define TONE_MAPPING":"",t.toneMapping!==wt?Ne.tonemapping_pars_fragment:"",t.toneMapping!==wt?gf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,_f("linearToOutputTexel",t.outputColorSpace),vf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(rn).join(`
`)),f=gi(f),f=Hr(f,t),f=Gr(f,t),l=gi(l),l=Hr(l,t),l=Gr(l,t),f=Vr(f),l=Vr(l),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=[T,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,o=["#define varying in",t.glslVersion===_r?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_r?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+o);const R=y+d+f,v=y+o+l,O=Or(a,a.VERTEX_SHADER,R),x=Or(a,a.FRAGMENT_SHADER,v);a.attachShader(L,O),a.attachShader(L,x),t.index0AttributeName!==void 0?a.bindAttribLocation(L,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(L,0,"position"),a.linkProgram(L);function D(w){if(e.debug.checkShaderErrors){const B=a.getProgramInfoLog(L)||"",K=a.getShaderInfoLog(O)||"",X=a.getShaderInfoLog(x)||"",q=B.trim(),W=K.trim(),ne=X.trim();let V=!0,ge=!0;if(a.getProgramParameter(L,a.LINK_STATUS)===!1)if(V=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,L,O,x);else{const Te=Br(a,O,"vertex"),Pe=Br(a,x,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(L,a.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+q+`
`+Te+`
`+Pe)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(W===""||ne==="")&&(ge=!1);ge&&(w.diagnostics={runnable:V,programLog:q,vertexShader:{log:W,prefix:d},fragmentShader:{log:ne,prefix:o}})}a.deleteShader(O),a.deleteShader(x),H=new Rn(a,L),p=Mf(a,L)}let H;this.getUniforms=function(){return H===void 0&&D(this),H};let p;this.getAttributes=function(){return p===void 0&&D(this),p};let u=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return u===!1&&(u=a.getProgramParameter(L,uf)),u},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(L),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=pf++,this.cacheKey=n,this.usedTimes=1,this.program=L,this.vertexShader=O,this.fragmentShader=x,this}let Uf=0;class If{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,a=this._getShaderStage(t),r=this._getShaderStage(i),f=this._getShaderCacheForMaterial(n);return f.has(a)===!1&&(f.add(a),a.usedTimes++),f.has(r)===!1&&(f.add(r),r.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Nf(n),t.set(n,i)),i}}class Nf{constructor(n){this.id=Uf++,this.code=n,this.usedTimes=0}}function Of(e,n,t,i,a,r,f){const l=new Zo,E=new If,_=new Set,A=[],S=a.logarithmicDepthBuffer,g=a.vertexTextures;let T=a.precision;const N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function L(p){return _.add(p),p===0?"uv":`uv${p}`}function d(p,u,w,B,K){const X=B.fog,q=K.geometry,W=p.isMeshStandardMaterial?B.environment:null,ne=(p.isMeshStandardMaterial?t:n).get(p.envMap||W),V=ne&&ne.mapping===Nn?ne.image.height:null,ge=N[p.type];p.precision!==null&&(T=a.getMaxPrecision(p.precision),T!==p.precision&&console.warn("THREE.WebGLProgram.getParameters:",p.precision,"not supported, using",T,"instead."));const Te=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Pe=Te!==void 0?Te.length:0;let Be=0;q.morphAttributes.position!==void 0&&(Be=1),q.morphAttributes.normal!==void 0&&(Be=2),q.morphAttributes.color!==void 0&&(Be=3);let et,Ze,Ge,z;if(ge){const Ve=At[ge];et=Ve.vertexShader,Ze=Ve.fragmentShader}else et=p.vertexShader,Ze=p.fragmentShader,E.update(p),Ge=E.getVertexShaderID(p),z=E.getFragmentShaderID(p);const P=e.getRenderTarget(),$=e.state.buffers.depth.getReversed(),ue=K.isInstancedMesh===!0,ce=K.isBatchedMesh===!0,Ue=!!p.map,Qe=!!p.matcap,m=!!ne,Ye=!!p.aoMap,Le=!!p.lightMap,Ce=!!p.bumpMap,me=!!p.normalMap,Je=!!p.displacementMap,_e=!!p.emissiveMap,Ie=!!p.metalnessMap,ct=!!p.roughnessMap,rt=p.anisotropy>0,h=p.clearcoat>0,s=p.dispersion>0,U=p.iridescence>0,k=p.sheen>0,Z=p.transmission>0,G=rt&&!!p.anisotropyMap,Me=h&&!!p.clearcoatMap,te=h&&!!p.clearcoatNormalMap,ve=h&&!!p.clearcoatRoughnessMap,Ee=U&&!!p.iridescenceMap,J=U&&!!p.iridescenceThicknessMap,se=k&&!!p.sheenColorMap,be=k&&!!p.sheenRoughnessMap,Se=!!p.specularMap,ae=!!p.specularColorMap,ye=!!p.specularIntensityMap,M=Z&&!!p.transmissionMap,ee=Z&&!!p.thicknessMap,ie=!!p.gradientMap,fe=!!p.alphaMap,j=p.alphaTest>0,Y=!!p.alphaHash,he=!!p.extensions;let De=wt;p.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(De=e.toneMapping);const qe={shaderID:ge,shaderType:p.type,shaderName:p.name,vertexShader:et,fragmentShader:Ze,defines:p.defines,customVertexShaderID:Ge,customFragmentShaderID:z,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:T,batching:ce,batchingColor:ce&&K._colorsTexture!==null,instancing:ue,instancingColor:ue&&K.instanceColor!==null,instancingMorph:ue&&K.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:P===null?e.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:In,alphaToCoverage:!!p.alphaToCoverage,map:Ue,matcap:Qe,envMap:m,envMapMode:m&&ne.mapping,envMapCubeUVHeight:V,aoMap:Ye,lightMap:Le,bumpMap:Ce,normalMap:me,displacementMap:g&&Je,emissiveMap:_e,normalMapObjectSpace:me&&p.normalMapType===Xo,normalMapTangentSpace:me&&p.normalMapType===Wo,metalnessMap:Ie,roughnessMap:ct,anisotropy:rt,anisotropyMap:G,clearcoat:h,clearcoatMap:Me,clearcoatNormalMap:te,clearcoatRoughnessMap:ve,dispersion:s,iridescence:U,iridescenceMap:Ee,iridescenceThicknessMap:J,sheen:k,sheenColorMap:se,sheenRoughnessMap:be,specularMap:Se,specularColorMap:ae,specularIntensityMap:ye,transmission:Z,transmissionMap:M,thicknessMap:ee,gradientMap:ie,opaque:p.transparent===!1&&p.blending===An&&p.alphaToCoverage===!1,alphaMap:fe,alphaTest:j,alphaHash:Y,combine:p.combine,mapUv:Ue&&L(p.map.channel),aoMapUv:Ye&&L(p.aoMap.channel),lightMapUv:Le&&L(p.lightMap.channel),bumpMapUv:Ce&&L(p.bumpMap.channel),normalMapUv:me&&L(p.normalMap.channel),displacementMapUv:Je&&L(p.displacementMap.channel),emissiveMapUv:_e&&L(p.emissiveMap.channel),metalnessMapUv:Ie&&L(p.metalnessMap.channel),roughnessMapUv:ct&&L(p.roughnessMap.channel),anisotropyMapUv:G&&L(p.anisotropyMap.channel),clearcoatMapUv:Me&&L(p.clearcoatMap.channel),clearcoatNormalMapUv:te&&L(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&L(p.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&L(p.iridescenceMap.channel),iridescenceThicknessMapUv:J&&L(p.iridescenceThicknessMap.channel),sheenColorMapUv:se&&L(p.sheenColorMap.channel),sheenRoughnessMapUv:be&&L(p.sheenRoughnessMap.channel),specularMapUv:Se&&L(p.specularMap.channel),specularColorMapUv:ae&&L(p.specularColorMap.channel),specularIntensityMapUv:ye&&L(p.specularIntensityMap.channel),transmissionMapUv:M&&L(p.transmissionMap.channel),thicknessMapUv:ee&&L(p.thicknessMap.channel),alphaMapUv:fe&&L(p.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(me||rt),vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!q.attributes.uv&&(Ue||fe),fog:!!X,useFog:p.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:p.flatShading===!0&&p.wireframe===!1,sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:S,reversedDepthBuffer:$,skinning:K.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:Be,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numSpotLightMaps:u.spotLightMap.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numSpotLightShadowsWithMaps:u.numSpotLightShadowsWithMaps,numLightProbes:u.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:p.dithering,shadowMapEnabled:e.shadowMap.enabled&&w.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:Ue&&p.map.isVideoTexture===!0&&at.getTransfer(p.map.colorSpace)===je,decodeVideoTextureEmissive:_e&&p.emissiveMap.isVideoTexture===!0&&at.getTransfer(p.emissiveMap.colorSpace)===je,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===Tt,flipSided:p.side===Mt,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:he&&p.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&p.extensions.multiDraw===!0||ce)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return qe.vertexUv1s=_.has(1),qe.vertexUv2s=_.has(2),qe.vertexUv3s=_.has(3),_.clear(),qe}function o(p){const u=[];if(p.shaderID?u.push(p.shaderID):(u.push(p.customVertexShaderID),u.push(p.customFragmentShaderID)),p.defines!==void 0)for(const w in p.defines)u.push(w),u.push(p.defines[w]);return p.isRawShaderMaterial===!1&&(y(u,p),R(u,p),u.push(e.outputColorSpace)),u.push(p.customProgramCacheKey),u.join()}function y(p,u){p.push(u.precision),p.push(u.outputColorSpace),p.push(u.envMapMode),p.push(u.envMapCubeUVHeight),p.push(u.mapUv),p.push(u.alphaMapUv),p.push(u.lightMapUv),p.push(u.aoMapUv),p.push(u.bumpMapUv),p.push(u.normalMapUv),p.push(u.displacementMapUv),p.push(u.emissiveMapUv),p.push(u.metalnessMapUv),p.push(u.roughnessMapUv),p.push(u.anisotropyMapUv),p.push(u.clearcoatMapUv),p.push(u.clearcoatNormalMapUv),p.push(u.clearcoatRoughnessMapUv),p.push(u.iridescenceMapUv),p.push(u.iridescenceThicknessMapUv),p.push(u.sheenColorMapUv),p.push(u.sheenRoughnessMapUv),p.push(u.specularMapUv),p.push(u.specularColorMapUv),p.push(u.specularIntensityMapUv),p.push(u.transmissionMapUv),p.push(u.thicknessMapUv),p.push(u.combine),p.push(u.fogExp2),p.push(u.sizeAttenuation),p.push(u.morphTargetsCount),p.push(u.morphAttributeCount),p.push(u.numDirLights),p.push(u.numPointLights),p.push(u.numSpotLights),p.push(u.numSpotLightMaps),p.push(u.numHemiLights),p.push(u.numRectAreaLights),p.push(u.numDirLightShadows),p.push(u.numPointLightShadows),p.push(u.numSpotLightShadows),p.push(u.numSpotLightShadowsWithMaps),p.push(u.numLightProbes),p.push(u.shadowMapType),p.push(u.toneMapping),p.push(u.numClippingPlanes),p.push(u.numClipIntersection),p.push(u.depthPacking)}function R(p,u){l.disableAll(),u.supportsVertexTextures&&l.enable(0),u.instancing&&l.enable(1),u.instancingColor&&l.enable(2),u.instancingMorph&&l.enable(3),u.matcap&&l.enable(4),u.envMap&&l.enable(5),u.normalMapObjectSpace&&l.enable(6),u.normalMapTangentSpace&&l.enable(7),u.clearcoat&&l.enable(8),u.iridescence&&l.enable(9),u.alphaTest&&l.enable(10),u.vertexColors&&l.enable(11),u.vertexAlphas&&l.enable(12),u.vertexUv1s&&l.enable(13),u.vertexUv2s&&l.enable(14),u.vertexUv3s&&l.enable(15),u.vertexTangents&&l.enable(16),u.anisotropy&&l.enable(17),u.alphaHash&&l.enable(18),u.batching&&l.enable(19),u.dispersion&&l.enable(20),u.batchingColor&&l.enable(21),u.gradientMap&&l.enable(22),p.push(l.mask),l.disableAll(),u.fog&&l.enable(0),u.useFog&&l.enable(1),u.flatShading&&l.enable(2),u.logarithmicDepthBuffer&&l.enable(3),u.reversedDepthBuffer&&l.enable(4),u.skinning&&l.enable(5),u.morphTargets&&l.enable(6),u.morphNormals&&l.enable(7),u.morphColors&&l.enable(8),u.premultipliedAlpha&&l.enable(9),u.shadowMapEnabled&&l.enable(10),u.doubleSided&&l.enable(11),u.flipSided&&l.enable(12),u.useDepthPacking&&l.enable(13),u.dithering&&l.enable(14),u.transmission&&l.enable(15),u.sheen&&l.enable(16),u.opaque&&l.enable(17),u.pointsUvs&&l.enable(18),u.decodeVideoTexture&&l.enable(19),u.decodeVideoTextureEmissive&&l.enable(20),u.alphaToCoverage&&l.enable(21),p.push(l.mask)}function v(p){const u=N[p.type];let w;if(u){const B=At[u];w=zo.clone(B.uniforms)}else w=p.uniforms;return w}function O(p,u){let w;for(let B=0,K=A.length;B<K;B++){const X=A[B];if(X.cacheKey===u){w=X,++w.usedTimes;break}}return w===void 0&&(w=new yf(e,u,p,r),A.push(w)),w}function x(p){if(--p.usedTimes===0){const u=A.indexOf(p);A[u]=A[A.length-1],A.pop(),p.destroy()}}function D(p){E.remove(p)}function H(){E.dispose()}return{getParameters:d,getProgramCacheKey:o,getUniforms:v,acquireProgram:O,releaseProgram:x,releaseShaderCache:D,programs:A,dispose:H}}function Ff(){let e=new WeakMap;function n(f){return e.has(f)}function t(f){let l=e.get(f);return l===void 0&&(l={},e.set(f,l)),l}function i(f){e.delete(f)}function a(f,l,E){e.get(f)[l]=E}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:a,dispose:r}}function Bf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function zr(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function Wr(){const e=[];let n=0;const t=[],i=[],a=[];function r(){n=0,t.length=0,i.length=0,a.length=0}function f(S,g,T,N,L,d){let o=e[n];return o===void 0?(o={id:S.id,object:S,geometry:g,material:T,groupOrder:N,renderOrder:S.renderOrder,z:L,group:d},e[n]=o):(o.id=S.id,o.object=S,o.geometry=g,o.material=T,o.groupOrder=N,o.renderOrder=S.renderOrder,o.z=L,o.group=d),n++,o}function l(S,g,T,N,L,d){const o=f(S,g,T,N,L,d);T.transmission>0?i.push(o):T.transparent===!0?a.push(o):t.push(o)}function E(S,g,T,N,L,d){const o=f(S,g,T,N,L,d);T.transmission>0?i.unshift(o):T.transparent===!0?a.unshift(o):t.unshift(o)}function _(S,g){t.length>1&&t.sort(S||Bf),i.length>1&&i.sort(g||zr),a.length>1&&a.sort(g||zr)}function A(){for(let S=n,g=e.length;S<g;S++){const T=e[S];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:t,transmissive:i,transparent:a,init:r,push:l,unshift:E,finish:A,sort:_}}function Hf(){let e=new WeakMap;function n(i,a){const r=e.get(i);let f;return r===void 0?(f=new Wr,e.set(i,[f])):a>=r.length?(f=new Wr,r.push(f)):f=r[a],f}function t(){e=new WeakMap}return{get:n,dispose:t}}function Gf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new le,color:new ke};break;case"SpotLight":t={position:new le,direction:new le,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new le,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new le,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new le,halfWidth:new le,halfHeight:new le};break}return e[n.id]=t,t}}}function Vf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let kf=0;function zf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Wf(e){const n=new Gf,t=Vf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let _=0;_<9;_++)i.probe.push(new le);const a=new le,r=new St,f=new St;function l(_){let A=0,S=0,g=0;for(let p=0;p<9;p++)i.probe[p].set(0,0,0);let T=0,N=0,L=0,d=0,o=0,y=0,R=0,v=0,O=0,x=0,D=0;_.sort(zf);for(let p=0,u=_.length;p<u;p++){const w=_[p],B=w.color,K=w.intensity,X=w.distance,q=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)A+=B.r*K,S+=B.g*K,g+=B.b*K;else if(w.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(w.sh.coefficients[W],K);D++}else if(w.isDirectionalLight){const W=n.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const ne=w.shadow,V=t.get(w);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,i.directionalShadow[T]=V,i.directionalShadowMap[T]=q,i.directionalShadowMatrix[T]=w.shadow.matrix,y++}i.directional[T]=W,T++}else if(w.isSpotLight){const W=n.get(w);W.position.setFromMatrixPosition(w.matrixWorld),W.color.copy(B).multiplyScalar(K),W.distance=X,W.coneCos=Math.cos(w.angle),W.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),W.decay=w.decay,i.spot[L]=W;const ne=w.shadow;if(w.map&&(i.spotLightMap[O]=w.map,O++,ne.updateMatrices(w),w.castShadow&&x++),i.spotLightMatrix[L]=ne.matrix,w.castShadow){const V=t.get(w);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,i.spotShadow[L]=V,i.spotShadowMap[L]=q,v++}L++}else if(w.isRectAreaLight){const W=n.get(w);W.color.copy(B).multiplyScalar(K),W.halfWidth.set(w.width*.5,0,0),W.halfHeight.set(0,w.height*.5,0),i.rectArea[d]=W,d++}else if(w.isPointLight){const W=n.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),W.distance=w.distance,W.decay=w.decay,w.castShadow){const ne=w.shadow,V=t.get(w);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,V.shadowCameraNear=ne.camera.near,V.shadowCameraFar=ne.camera.far,i.pointShadow[N]=V,i.pointShadowMap[N]=q,i.pointShadowMatrix[N]=w.shadow.matrix,R++}i.point[N]=W,N++}else if(w.isHemisphereLight){const W=n.get(w);W.skyColor.copy(w.color).multiplyScalar(K),W.groundColor.copy(w.groundColor).multiplyScalar(K),i.hemi[o]=W,o++}}d>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2)),i.ambient[0]=A,i.ambient[1]=S,i.ambient[2]=g;const H=i.hash;(H.directionalLength!==T||H.pointLength!==N||H.spotLength!==L||H.rectAreaLength!==d||H.hemiLength!==o||H.numDirectionalShadows!==y||H.numPointShadows!==R||H.numSpotShadows!==v||H.numSpotMaps!==O||H.numLightProbes!==D)&&(i.directional.length=T,i.spot.length=L,i.rectArea.length=d,i.point.length=N,i.hemi.length=o,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=v+O-x,i.spotLightMap.length=O,i.numSpotLightShadowsWithMaps=x,i.numLightProbes=D,H.directionalLength=T,H.pointLength=N,H.spotLength=L,H.rectAreaLength=d,H.hemiLength=o,H.numDirectionalShadows=y,H.numPointShadows=R,H.numSpotShadows=v,H.numSpotMaps=O,H.numLightProbes=D,i.version=kf++)}function E(_,A){let S=0,g=0,T=0,N=0,L=0;const d=A.matrixWorldInverse;for(let o=0,y=_.length;o<y;o++){const R=_[o];if(R.isDirectionalLight){const v=i.directional[S];v.direction.setFromMatrixPosition(R.matrixWorld),a.setFromMatrixPosition(R.target.matrixWorld),v.direction.sub(a),v.direction.transformDirection(d),S++}else if(R.isSpotLight){const v=i.spot[T];v.position.setFromMatrixPosition(R.matrixWorld),v.position.applyMatrix4(d),v.direction.setFromMatrixPosition(R.matrixWorld),a.setFromMatrixPosition(R.target.matrixWorld),v.direction.sub(a),v.direction.transformDirection(d),T++}else if(R.isRectAreaLight){const v=i.rectArea[N];v.position.setFromMatrixPosition(R.matrixWorld),v.position.applyMatrix4(d),f.identity(),r.copy(R.matrixWorld),r.premultiply(d),f.extractRotation(r),v.halfWidth.set(R.width*.5,0,0),v.halfHeight.set(0,R.height*.5,0),v.halfWidth.applyMatrix4(f),v.halfHeight.applyMatrix4(f),N++}else if(R.isPointLight){const v=i.point[g];v.position.setFromMatrixPosition(R.matrixWorld),v.position.applyMatrix4(d),g++}else if(R.isHemisphereLight){const v=i.hemi[L];v.direction.setFromMatrixPosition(R.matrixWorld),v.direction.transformDirection(d),L++}}}return{setup:l,setupView:E,state:i}}function Xr(e){const n=new Wf(e),t=[],i=[];function a(A){_.camera=A,t.length=0,i.length=0}function r(A){t.push(A)}function f(A){i.push(A)}function l(){n.setup(t)}function E(A){n.setupView(t,A)}const _={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:a,state:_,setupLights:l,setupLightsView:E,pushLight:r,pushShadow:f}}function Xf(e){let n=new WeakMap;function t(a,r=0){const f=n.get(a);let l;return f===void 0?(l=new Xr(e),n.set(a,[l])):r>=f.length?(l=new Xr(e),f.push(l)):l=f[r],l}function i(){n=new WeakMap}return{get:t,dispose:i}}const Yf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kf=`uniform sampler2D shadow_pass;
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
}`;function qf(e,n,t){let i=new ca;const a=new We,r=new We,f=new dt,l=new wo({depthPacking:Po}),E=new Do,_={},A=t.maxTextureSize,S={[ln]:Mt,[Mt]:ln,[Tt]:Tt},g=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:Yf,fragmentShader:Kf}),T=g.clone();T.defines.HORIZONTAL_PASS=1;const N=new xi;N.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const L=new ut(N,g),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ua;let o=this.type;this.render=function(x,D,H){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||x.length===0)return;const p=e.getRenderTarget(),u=e.getActiveCubeFace(),w=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Bt),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const K=o!==bt&&this.type===bt,X=o===bt&&this.type!==bt;for(let q=0,W=x.length;q<W;q++){const ne=x[q],V=ne.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const ge=V.getFrameExtents();if(a.multiply(ge),r.copy(V.mapSize),(a.x>A||a.y>A)&&(a.x>A&&(r.x=Math.floor(A/ge.x),a.x=r.x*ge.x,V.mapSize.x=r.x),a.y>A&&(r.y=Math.floor(A/ge.y),a.y=r.y*ge.y,V.mapSize.y=r.y)),V.map===null||K===!0||X===!0){const Pe=this.type!==bt?{minFilter:on,magFilter:on}:{};V.map!==null&&V.map.dispose(),V.map=new $t(a.x,a.y,Pe),V.map.texture.name=ne.name+".shadowMap",V.camera.updateProjectionMatrix()}e.setRenderTarget(V.map),e.clear();const Te=V.getViewportCount();for(let Pe=0;Pe<Te;Pe++){const Be=V.getViewport(Pe);f.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),B.viewport(f),V.updateMatrices(ne,Pe),i=V.getFrustum(),v(D,H,V.camera,ne,this.type)}V.isPointLightShadow!==!0&&this.type===bt&&y(V,H),V.needsUpdate=!1}o=this.type,d.needsUpdate=!1,e.setRenderTarget(p,u,w)};function y(x,D){const H=n.update(L);g.defines.VSM_SAMPLES!==x.blurSamples&&(g.defines.VSM_SAMPLES=x.blurSamples,T.defines.VSM_SAMPLES=x.blurSamples,g.needsUpdate=!0,T.needsUpdate=!0),x.mapPass===null&&(x.mapPass=new $t(a.x,a.y)),g.uniforms.shadow_pass.value=x.map.texture,g.uniforms.resolution.value=x.mapSize,g.uniforms.radius.value=x.radius,e.setRenderTarget(x.mapPass),e.clear(),e.renderBufferDirect(D,null,H,g,L,null),T.uniforms.shadow_pass.value=x.mapPass.texture,T.uniforms.resolution.value=x.mapSize,T.uniforms.radius.value=x.radius,e.setRenderTarget(x.map),e.clear(),e.renderBufferDirect(D,null,H,T,L,null)}function R(x,D,H,p){let u=null;const w=H.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(w!==void 0)u=w;else if(u=H.isPointLight===!0?E:l,e.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const B=u.uuid,K=D.uuid;let X=_[B];X===void 0&&(X={},_[B]=X);let q=X[K];q===void 0&&(q=u.clone(),X[K]=q,D.addEventListener("dispose",O)),u=q}if(u.visible=D.visible,u.wireframe=D.wireframe,p===bt?u.side=D.shadowSide!==null?D.shadowSide:D.side:u.side=D.shadowSide!==null?D.shadowSide:S[D.side],u.alphaMap=D.alphaMap,u.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,u.map=D.map,u.clipShadows=D.clipShadows,u.clippingPlanes=D.clippingPlanes,u.clipIntersection=D.clipIntersection,u.displacementMap=D.displacementMap,u.displacementScale=D.displacementScale,u.displacementBias=D.displacementBias,u.wireframeLinewidth=D.wireframeLinewidth,u.linewidth=D.linewidth,H.isPointLight===!0&&u.isMeshDistanceMaterial===!0){const B=e.properties.get(u);B.light=H}return u}function v(x,D,H,p,u){if(x.visible===!1)return;if(x.layers.test(D.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&u===bt)&&(!x.frustumCulled||i.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,x.matrixWorld);const K=n.update(x),X=x.material;if(Array.isArray(X)){const q=K.groups;for(let W=0,ne=q.length;W<ne;W++){const V=q[W],ge=X[V.materialIndex];if(ge&&ge.visible){const Te=R(x,ge,p,u);x.onBeforeShadow(e,x,D,H,K,Te,V),e.renderBufferDirect(H,null,K,Te,x,V),x.onAfterShadow(e,x,D,H,K,Te,V)}}}else if(X.visible){const q=R(x,X,p,u);x.onBeforeShadow(e,x,D,H,K,q,null),e.renderBufferDirect(H,null,K,q,x,null),x.onAfterShadow(e,x,D,H,K,q,null)}}const B=x.children;for(let K=0,X=B.length;K<X;K++)v(B[K],D,H,p,u)}function O(x){x.target.removeEventListener("dispose",O);for(const H in _){const p=_[H],u=x.target.uuid;u in p&&(p[u].dispose(),delete p[u])}}}const Zf={[hi]:pi,[ui]:ci,[fi]:li,[wn]:di,[pi]:hi,[ci]:ui,[li]:fi,[di]:wn};function $f(e,n){function t(){let M=!1;const ee=new dt;let ie=null;const fe=new dt(0,0,0,0);return{setMask:function(j){ie!==j&&!M&&(e.colorMask(j,j,j,j),ie=j)},setLocked:function(j){M=j},setClear:function(j,Y,he,De,qe){qe===!0&&(j*=De,Y*=De,he*=De),ee.set(j,Y,he,De),fe.equals(ee)===!1&&(e.clearColor(j,Y,he,De),fe.copy(ee))},reset:function(){M=!1,ie=null,fe.set(-1,0,0,0)}}}function i(){let M=!1,ee=!1,ie=null,fe=null,j=null;return{setReversed:function(Y){if(ee!==Y){const he=n.get("EXT_clip_control");Y?he.clipControlEXT(he.LOWER_LEFT_EXT,he.ZERO_TO_ONE_EXT):he.clipControlEXT(he.LOWER_LEFT_EXT,he.NEGATIVE_ONE_TO_ONE_EXT),ee=Y;const De=j;j=null,this.setClear(De)}},getReversed:function(){return ee},setTest:function(Y){Y?P(e.DEPTH_TEST):$(e.DEPTH_TEST)},setMask:function(Y){ie!==Y&&!M&&(e.depthMask(Y),ie=Y)},setFunc:function(Y){if(ee&&(Y=Zf[Y]),fe!==Y){switch(Y){case hi:e.depthFunc(e.NEVER);break;case pi:e.depthFunc(e.ALWAYS);break;case ui:e.depthFunc(e.LESS);break;case wn:e.depthFunc(e.LEQUAL);break;case fi:e.depthFunc(e.EQUAL);break;case di:e.depthFunc(e.GEQUAL);break;case ci:e.depthFunc(e.GREATER);break;case li:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}fe=Y}},setLocked:function(Y){M=Y},setClear:function(Y){j!==Y&&(ee&&(Y=1-Y),e.clearDepth(Y),j=Y)},reset:function(){M=!1,ie=null,fe=null,j=null,ee=!1}}}function a(){let M=!1,ee=null,ie=null,fe=null,j=null,Y=null,he=null,De=null,qe=null;return{setTest:function(Ve){M||(Ve?P(e.STENCIL_TEST):$(e.STENCIL_TEST))},setMask:function(Ve){ee!==Ve&&!M&&(e.stencilMask(Ve),ee=Ve)},setFunc:function(Ve,Rt,xt){(ie!==Ve||fe!==Rt||j!==xt)&&(e.stencilFunc(Ve,Rt,xt),ie=Ve,fe=Rt,j=xt)},setOp:function(Ve,Rt,xt){(Y!==Ve||he!==Rt||De!==xt)&&(e.stencilOp(Ve,Rt,xt),Y=Ve,he=Rt,De=xt)},setLocked:function(Ve){M=Ve},setClear:function(Ve){qe!==Ve&&(e.clearStencil(Ve),qe=Ve)},reset:function(){M=!1,ee=null,ie=null,fe=null,j=null,Y=null,he=null,De=null,qe=null}}}const r=new t,f=new i,l=new a,E=new WeakMap,_=new WeakMap;let A={},S={},g=new WeakMap,T=[],N=null,L=!1,d=null,o=null,y=null,R=null,v=null,O=null,x=null,D=new ke(0,0,0),H=0,p=!1,u=null,w=null,B=null,K=null,X=null;const q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ne=0;const V=e.getParameter(e.VERSION);V.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=ne>=1):V.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=ne>=2);let ge=null,Te={};const Pe=e.getParameter(e.SCISSOR_BOX),Be=e.getParameter(e.VIEWPORT),et=new dt().fromArray(Pe),Ze=new dt().fromArray(Be);function Ge(M,ee,ie,fe){const j=new Uint8Array(4),Y=e.createTexture();e.bindTexture(M,Y),e.texParameteri(M,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(M,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let he=0;he<ie;he++)M===e.TEXTURE_3D||M===e.TEXTURE_2D_ARRAY?e.texImage3D(ee,0,e.RGBA,1,1,fe,0,e.RGBA,e.UNSIGNED_BYTE,j):e.texImage2D(ee+he,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,j);return Y}const z={};z[e.TEXTURE_2D]=Ge(e.TEXTURE_2D,e.TEXTURE_2D,1),z[e.TEXTURE_CUBE_MAP]=Ge(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[e.TEXTURE_2D_ARRAY]=Ge(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),z[e.TEXTURE_3D]=Ge(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),f.setClear(1),l.setClear(0),P(e.DEPTH_TEST),f.setFunc(wn),Ce(!1),me(dr),P(e.CULL_FACE),Ye(Bt);function P(M){A[M]!==!0&&(e.enable(M),A[M]=!0)}function $(M){A[M]!==!1&&(e.disable(M),A[M]=!1)}function ue(M,ee){return S[M]!==ee?(e.bindFramebuffer(M,ee),S[M]=ee,M===e.DRAW_FRAMEBUFFER&&(S[e.FRAMEBUFFER]=ee),M===e.FRAMEBUFFER&&(S[e.DRAW_FRAMEBUFFER]=ee),!0):!1}function ce(M,ee){let ie=T,fe=!1;if(M){ie=g.get(ee),ie===void 0&&(ie=[],g.set(ee,ie));const j=M.textures;if(ie.length!==j.length||ie[0]!==e.COLOR_ATTACHMENT0){for(let Y=0,he=j.length;Y<he;Y++)ie[Y]=e.COLOR_ATTACHMENT0+Y;ie.length=j.length,fe=!0}}else ie[0]!==e.BACK&&(ie[0]=e.BACK,fe=!0);fe&&e.drawBuffers(ie)}function Ue(M){return N!==M?(e.useProgram(M),N=M,!0):!1}const Qe={[tn]:e.FUNC_ADD,[eo]:e.FUNC_SUBTRACT,[Ja]:e.FUNC_REVERSE_SUBTRACT};Qe[fs]=e.MIN,Qe[us]=e.MAX;const m={[_o]:e.ZERO,[mo]:e.ONE,[ho]:e.SRC_COLOR,[po]:e.SRC_ALPHA,[uo]:e.SRC_ALPHA_SATURATE,[fo]:e.DST_COLOR,[co]:e.DST_ALPHA,[lo]:e.ONE_MINUS_SRC_COLOR,[so]:e.ONE_MINUS_SRC_ALPHA,[oo]:e.ONE_MINUS_DST_COLOR,[ao]:e.ONE_MINUS_DST_ALPHA,[ro]:e.CONSTANT_COLOR,[io]:e.ONE_MINUS_CONSTANT_COLOR,[no]:e.CONSTANT_ALPHA,[to]:e.ONE_MINUS_CONSTANT_ALPHA};function Ye(M,ee,ie,fe,j,Y,he,De,qe,Ve){if(M===Bt){L===!0&&($(e.BLEND),L=!1);return}if(L===!1&&(P(e.BLEND),L=!0),M!==Vo){if(M!==d||Ve!==p){if((o!==tn||v!==tn)&&(e.blendEquation(e.FUNC_ADD),o=tn,v=tn),Ve)switch(M){case An:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case pr:e.blendFunc(e.ONE,e.ONE);break;case ur:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case fr:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}else switch(M){case An:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case pr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case ur:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fr:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}y=null,R=null,O=null,x=null,D.set(0,0,0),H=0,d=M,p=Ve}return}j=j||ee,Y=Y||ie,he=he||fe,(ee!==o||j!==v)&&(e.blendEquationSeparate(Qe[ee],Qe[j]),o=ee,v=j),(ie!==y||fe!==R||Y!==O||he!==x)&&(e.blendFuncSeparate(m[ie],m[fe],m[Y],m[he]),y=ie,R=fe,O=Y,x=he),(De.equals(D)===!1||qe!==H)&&(e.blendColor(De.r,De.g,De.b,qe),D.copy(De),H=qe),d=M,p=!1}function Le(M,ee){M.side===Tt?$(e.CULL_FACE):P(e.CULL_FACE);let ie=M.side===Mt;ee&&(ie=!ie),Ce(ie),M.blending===An&&M.transparent===!1?Ye(Bt):Ye(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),f.setFunc(M.depthFunc),f.setTest(M.depthTest),f.setMask(M.depthWrite),r.setMask(M.colorWrite);const fe=M.stencilWrite;l.setTest(fe),fe&&(l.setMask(M.stencilWriteMask),l.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),l.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),_e(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?P(e.SAMPLE_ALPHA_TO_COVERAGE):$(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(M){u!==M&&(M?e.frontFace(e.CW):e.frontFace(e.CCW),u=M)}function me(M){M!==Ho?(P(e.CULL_FACE),M!==w&&(M===dr?e.cullFace(e.BACK):M===Go?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):$(e.CULL_FACE),w=M}function Je(M){M!==B&&(W&&e.lineWidth(M),B=M)}function _e(M,ee,ie){M?(P(e.POLYGON_OFFSET_FILL),(K!==ee||X!==ie)&&(e.polygonOffset(ee,ie),K=ee,X=ie)):$(e.POLYGON_OFFSET_FILL)}function Ie(M){M?P(e.SCISSOR_TEST):$(e.SCISSOR_TEST)}function ct(M){M===void 0&&(M=e.TEXTURE0+q-1),ge!==M&&(e.activeTexture(M),ge=M)}function rt(M,ee,ie){ie===void 0&&(ge===null?ie=e.TEXTURE0+q-1:ie=ge);let fe=Te[ie];fe===void 0&&(fe={type:void 0,texture:void 0},Te[ie]=fe),(fe.type!==M||fe.texture!==ee)&&(ge!==ie&&(e.activeTexture(ie),ge=ie),e.bindTexture(M,ee||z[M]),fe.type=M,fe.texture=ee)}function h(){const M=Te[ge];M!==void 0&&M.type!==void 0&&(e.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)}function s(){try{e.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function U(){try{e.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function k(){try{e.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Z(){try{e.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function G(){try{e.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function te(){try{e.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function ve(){try{e.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Ee(){try{e.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function J(){try{e.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function se(M){et.equals(M)===!1&&(e.scissor(M.x,M.y,M.z,M.w),et.copy(M))}function be(M){Ze.equals(M)===!1&&(e.viewport(M.x,M.y,M.z,M.w),Ze.copy(M))}function Se(M,ee){let ie=_.get(ee);ie===void 0&&(ie=new WeakMap,_.set(ee,ie));let fe=ie.get(M);fe===void 0&&(fe=e.getUniformBlockIndex(ee,M.name),ie.set(M,fe))}function ae(M,ee){const fe=_.get(ee).get(M);E.get(ee)!==fe&&(e.uniformBlockBinding(ee,fe,M.__bindingPointIndex),E.set(ee,fe))}function ye(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),f.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),A={},ge=null,Te={},S={},g=new WeakMap,T=[],N=null,L=!1,d=null,o=null,y=null,R=null,v=null,O=null,x=null,D=new ke(0,0,0),H=0,p=!1,u=null,w=null,B=null,K=null,X=null,et.set(0,0,e.canvas.width,e.canvas.height),Ze.set(0,0,e.canvas.width,e.canvas.height),r.reset(),f.reset(),l.reset()}return{buffers:{color:r,depth:f,stencil:l},enable:P,disable:$,bindFramebuffer:ue,drawBuffers:ce,useProgram:Ue,setBlending:Ye,setMaterial:Le,setFlipSided:Ce,setCullFace:me,setLineWidth:Je,setPolygonOffset:_e,setScissorTest:Ie,activeTexture:ct,bindTexture:rt,unbindTexture:h,compressedTexImage2D:s,compressedTexImage3D:U,texImage2D:Ee,texImage3D:J,updateUBOMapping:Se,uniformBlockBinding:ae,texStorage2D:te,texStorage3D:ve,texSubImage2D:k,texSubImage3D:Z,compressedTexSubImage2D:G,compressedTexSubImage3D:Me,scissor:se,viewport:be,reset:ye}}function jf(e,n,t,i,a,r,f){const l=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,E=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new We,A=new WeakMap;let S;const g=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(h,s){return T?new OffscreenCanvas(h,s):ss("canvas")}function L(h,s,U){let k=1;const Z=rt(h);if((Z.width>U||Z.height>U)&&(k=U/Math.max(Z.width,Z.height)),k<1)if(typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&h instanceof ImageBitmap||typeof VideoFrame<"u"&&h instanceof VideoFrame){const G=Math.floor(k*Z.width),Me=Math.floor(k*Z.height);S===void 0&&(S=N(G,Me));const te=s?N(G,Me):S;return te.width=G,te.height=Me,te.getContext("2d").drawImage(h,0,0,G,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+G+"x"+Me+")."),te}else return"data"in h&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),h;return h}function d(h){return h.generateMipmaps}function o(h){e.generateMipmap(h)}function y(h){return h.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:h.isWebGL3DRenderTarget?e.TEXTURE_3D:h.isWebGLArrayRenderTarget||h.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function R(h,s,U,k,Z=!1){if(h!==null){if(e[h]!==void 0)return e[h];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+h+"'")}let G=s;if(s===e.RED&&(U===e.FLOAT&&(G=e.R32F),U===e.HALF_FLOAT&&(G=e.R16F),U===e.UNSIGNED_BYTE&&(G=e.R8)),s===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&(G=e.R8UI),U===e.UNSIGNED_SHORT&&(G=e.R16UI),U===e.UNSIGNED_INT&&(G=e.R32UI),U===e.BYTE&&(G=e.R8I),U===e.SHORT&&(G=e.R16I),U===e.INT&&(G=e.R32I)),s===e.RG&&(U===e.FLOAT&&(G=e.RG32F),U===e.HALF_FLOAT&&(G=e.RG16F),U===e.UNSIGNED_BYTE&&(G=e.RG8)),s===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&(G=e.RG8UI),U===e.UNSIGNED_SHORT&&(G=e.RG16UI),U===e.UNSIGNED_INT&&(G=e.RG32UI),U===e.BYTE&&(G=e.RG8I),U===e.SHORT&&(G=e.RG16I),U===e.INT&&(G=e.RG32I)),s===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&(G=e.RGB8UI),U===e.UNSIGNED_SHORT&&(G=e.RGB16UI),U===e.UNSIGNED_INT&&(G=e.RGB32UI),U===e.BYTE&&(G=e.RGB8I),U===e.SHORT&&(G=e.RGB16I),U===e.INT&&(G=e.RGB32I)),s===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&(G=e.RGBA8UI),U===e.UNSIGNED_SHORT&&(G=e.RGBA16UI),U===e.UNSIGNED_INT&&(G=e.RGBA32UI),U===e.BYTE&&(G=e.RGBA8I),U===e.SHORT&&(G=e.RGBA16I),U===e.INT&&(G=e.RGBA32I)),s===e.RGB&&(U===e.UNSIGNED_INT_5_9_9_9_REV&&(G=e.RGB9_E5),U===e.UNSIGNED_INT_10F_11F_11F_REV&&(G=e.R11F_G11F_B10F)),s===e.RGBA){const Me=Z?Ta:at.getTransfer(k);U===e.FLOAT&&(G=e.RGBA32F),U===e.HALF_FLOAT&&(G=e.RGBA16F),U===e.UNSIGNED_BYTE&&(G=Me===je?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT_4_4_4_4&&(G=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&(G=e.RGB5_A1)}return(G===e.R16F||G===e.R32F||G===e.RG16F||G===e.RG32F||G===e.RGBA16F||G===e.RGBA32F)&&n.get("EXT_color_buffer_float"),G}function v(h,s){let U;return h?s===null||s===dn||s===cn?U=e.DEPTH24_STENCIL8:s===Ft?U=e.DEPTH32F_STENCIL8:s===Pn&&(U=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):s===null||s===dn||s===cn?U=e.DEPTH_COMPONENT24:s===Ft?U=e.DEPTH_COMPONENT32F:s===Pn&&(U=e.DEPTH_COMPONENT16),U}function O(h,s){return d(h)===!0||h.isFramebufferTexture&&h.minFilter!==on&&h.minFilter!==Xt?Math.log2(Math.max(s.width,s.height))+1:h.mipmaps!==void 0&&h.mipmaps.length>0?h.mipmaps.length:h.isCompressedTexture&&Array.isArray(h.image)?s.mipmaps.length:1}function x(h){const s=h.target;s.removeEventListener("dispose",x),H(s),s.isVideoTexture&&A.delete(s)}function D(h){const s=h.target;s.removeEventListener("dispose",D),u(s)}function H(h){const s=i.get(h);if(s.__webglInit===void 0)return;const U=h.source,k=g.get(U);if(k){const Z=k[s.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&p(h),Object.keys(k).length===0&&g.delete(U)}i.remove(h)}function p(h){const s=i.get(h);e.deleteTexture(s.__webglTexture);const U=h.source,k=g.get(U);delete k[s.__cacheKey],f.memory.textures--}function u(h){const s=i.get(h);if(h.depthTexture&&(h.depthTexture.dispose(),i.remove(h.depthTexture)),h.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(s.__webglFramebuffer[k]))for(let Z=0;Z<s.__webglFramebuffer[k].length;Z++)e.deleteFramebuffer(s.__webglFramebuffer[k][Z]);else e.deleteFramebuffer(s.__webglFramebuffer[k]);s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer[k])}else{if(Array.isArray(s.__webglFramebuffer))for(let k=0;k<s.__webglFramebuffer.length;k++)e.deleteFramebuffer(s.__webglFramebuffer[k]);else e.deleteFramebuffer(s.__webglFramebuffer);if(s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer),s.__webglMultisampledFramebuffer&&e.deleteFramebuffer(s.__webglMultisampledFramebuffer),s.__webglColorRenderbuffer)for(let k=0;k<s.__webglColorRenderbuffer.length;k++)s.__webglColorRenderbuffer[k]&&e.deleteRenderbuffer(s.__webglColorRenderbuffer[k]);s.__webglDepthRenderbuffer&&e.deleteRenderbuffer(s.__webglDepthRenderbuffer)}const U=h.textures;for(let k=0,Z=U.length;k<Z;k++){const G=i.get(U[k]);G.__webglTexture&&(e.deleteTexture(G.__webglTexture),f.memory.textures--),i.remove(U[k])}i.remove(h)}let w=0;function B(){w=0}function K(){const h=w;return h>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+h+" texture units while this GPU supports only "+a.maxTextures),w+=1,h}function X(h){const s=[];return s.push(h.wrapS),s.push(h.wrapT),s.push(h.wrapR||0),s.push(h.magFilter),s.push(h.minFilter),s.push(h.anisotropy),s.push(h.internalFormat),s.push(h.format),s.push(h.type),s.push(h.generateMipmaps),s.push(h.premultiplyAlpha),s.push(h.flipY),s.push(h.unpackAlignment),s.push(h.colorSpace),s.join()}function q(h,s){const U=i.get(h);if(h.isVideoTexture&&Ie(h),h.isRenderTargetTexture===!1&&h.isExternalTexture!==!0&&h.version>0&&U.__version!==h.version){const k=h.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{z(U,h,s);return}}else h.isExternalTexture&&(U.__webglTexture=h.sourceTexture?h.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+s)}function W(h,s){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){z(U,h,s);return}t.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+s)}function ne(h,s){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){z(U,h,s);return}t.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+s)}function V(h,s){const U=i.get(h);if(h.version>0&&U.__version!==h.version){P(U,h,s);return}t.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+s)}const ge={[Eo]:e.REPEAT,[vo]:e.CLAMP_TO_EDGE,[go]:e.MIRRORED_REPEAT},Te={[on]:e.NEAREST,[So]:e.NEAREST_MIPMAP_NEAREST,[_n]:e.NEAREST_MIPMAP_LINEAR,[Xt]:e.LINEAR,[Vn]:e.LINEAR_MIPMAP_NEAREST,[nn]:e.LINEAR_MIPMAP_LINEAR},Pe={[Co]:e.NEVER,[bo]:e.ALWAYS,[Ro]:e.LESS,[fa]:e.LEQUAL,[Ao]:e.EQUAL,[xo]:e.GEQUAL,[To]:e.GREATER,[Mo]:e.NOTEQUAL};function Be(h,s){if(s.type===Ft&&n.has("OES_texture_float_linear")===!1&&(s.magFilter===Xt||s.magFilter===Vn||s.magFilter===_n||s.magFilter===nn||s.minFilter===Xt||s.minFilter===Vn||s.minFilter===_n||s.minFilter===nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(h,e.TEXTURE_WRAP_S,ge[s.wrapS]),e.texParameteri(h,e.TEXTURE_WRAP_T,ge[s.wrapT]),(h===e.TEXTURE_3D||h===e.TEXTURE_2D_ARRAY)&&e.texParameteri(h,e.TEXTURE_WRAP_R,ge[s.wrapR]),e.texParameteri(h,e.TEXTURE_MAG_FILTER,Te[s.magFilter]),e.texParameteri(h,e.TEXTURE_MIN_FILTER,Te[s.minFilter]),s.compareFunction&&(e.texParameteri(h,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(h,e.TEXTURE_COMPARE_FUNC,Pe[s.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(s.magFilter===on||s.minFilter!==_n&&s.minFilter!==nn||s.type===Ft&&n.has("OES_texture_float_linear")===!1)return;if(s.anisotropy>1||i.get(s).__currentAnisotropy){const U=n.get("EXT_texture_filter_anisotropic");e.texParameterf(h,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(s.anisotropy,a.getMaxAnisotropy())),i.get(s).__currentAnisotropy=s.anisotropy}}}function et(h,s){let U=!1;h.__webglInit===void 0&&(h.__webglInit=!0,s.addEventListener("dispose",x));const k=s.source;let Z=g.get(k);Z===void 0&&(Z={},g.set(k,Z));const G=X(s);if(G!==h.__cacheKey){Z[G]===void 0&&(Z[G]={texture:e.createTexture(),usedTimes:0},f.memory.textures++,U=!0),Z[G].usedTimes++;const Me=Z[h.__cacheKey];Me!==void 0&&(Z[h.__cacheKey].usedTimes--,Me.usedTimes===0&&p(s)),h.__cacheKey=G,h.__webglTexture=Z[G].texture}return U}function Ze(h,s,U){return Math.floor(Math.floor(h/U)/s)}function Ge(h,s,U,k){const G=h.updateRanges;if(G.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,s.width,s.height,U,k,s.data);else{G.sort((J,se)=>J.start-se.start);let Me=0;for(let J=1;J<G.length;J++){const se=G[Me],be=G[J],Se=se.start+se.count,ae=Ze(be.start,s.width,4),ye=Ze(se.start,s.width,4);be.start<=Se+1&&ae===ye&&Ze(be.start+be.count-1,s.width,4)===ae?se.count=Math.max(se.count,be.start+be.count-se.start):(++Me,G[Me]=be)}G.length=Me+1;const te=e.getParameter(e.UNPACK_ROW_LENGTH),ve=e.getParameter(e.UNPACK_SKIP_PIXELS),Ee=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,s.width);for(let J=0,se=G.length;J<se;J++){const be=G[J],Se=Math.floor(be.start/4),ae=Math.ceil(be.count/4),ye=Se%s.width,M=Math.floor(Se/s.width),ee=ae,ie=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,ye),e.pixelStorei(e.UNPACK_SKIP_ROWS,M),t.texSubImage2D(e.TEXTURE_2D,0,ye,M,ee,ie,U,k,s.data)}h.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,te),e.pixelStorei(e.UNPACK_SKIP_PIXELS,ve),e.pixelStorei(e.UNPACK_SKIP_ROWS,Ee)}}function z(h,s,U){let k=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(k=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(k=e.TEXTURE_3D);const Z=et(h,s),G=s.source;t.bindTexture(k,h.__webglTexture,e.TEXTURE0+U);const Me=i.get(G);if(G.version!==Me.__version||Z===!0){t.activeTexture(e.TEXTURE0+U);const te=at.getPrimaries(at.workingColorSpace),ve=s.colorSpace===Wt?null:at.getPrimaries(s.colorSpace),Ee=s.colorSpace===Wt||te===ve?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let J=L(s.image,!1,a.maxTextureSize);J=ct(s,J);const se=r.convert(s.format,s.colorSpace),be=r.convert(s.type);let Se=R(s.internalFormat,se,be,s.colorSpace,s.isVideoTexture);Be(k,s);let ae;const ye=s.mipmaps,M=s.isVideoTexture!==!0,ee=Me.__version===void 0||Z===!0,ie=G.dataReady,fe=O(s,J);if(s.isDepthTexture)Se=v(s.format===Cn,s.type),ee&&(M?t.texStorage2D(e.TEXTURE_2D,1,Se,J.width,J.height):t.texImage2D(e.TEXTURE_2D,0,Se,J.width,J.height,0,se,be,null));else if(s.isDataTexture)if(ye.length>0){M&&ee&&t.texStorage2D(e.TEXTURE_2D,fe,Se,ye[0].width,ye[0].height);for(let j=0,Y=ye.length;j<Y;j++)ae=ye[j],M?ie&&t.texSubImage2D(e.TEXTURE_2D,j,0,0,ae.width,ae.height,se,be,ae.data):t.texImage2D(e.TEXTURE_2D,j,Se,ae.width,ae.height,0,se,be,ae.data);s.generateMipmaps=!1}else M?(ee&&t.texStorage2D(e.TEXTURE_2D,fe,Se,J.width,J.height),ie&&Ge(s,J,se,be)):t.texImage2D(e.TEXTURE_2D,0,Se,J.width,J.height,0,se,be,J.data);else if(s.isCompressedTexture)if(s.isCompressedArrayTexture){M&&ee&&t.texStorage3D(e.TEXTURE_2D_ARRAY,fe,Se,ye[0].width,ye[0].height,J.depth);for(let j=0,Y=ye.length;j<Y;j++)if(ae=ye[j],s.format!==Ct)if(se!==null)if(M){if(ie)if(s.layerUpdates.size>0){const he=mr(ae.width,ae.height,s.format,s.type);for(const De of s.layerUpdates){const qe=ae.data.subarray(De*he/ae.data.BYTES_PER_ELEMENT,(De+1)*he/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,De,ae.width,ae.height,1,se,qe)}s.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,ae.width,ae.height,J.depth,se,ae.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,j,Se,ae.width,ae.height,J.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else M?ie&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,ae.width,ae.height,J.depth,se,be,ae.data):t.texImage3D(e.TEXTURE_2D_ARRAY,j,Se,ae.width,ae.height,J.depth,0,se,be,ae.data)}else{M&&ee&&t.texStorage2D(e.TEXTURE_2D,fe,Se,ye[0].width,ye[0].height);for(let j=0,Y=ye.length;j<Y;j++)ae=ye[j],s.format!==Ct?se!==null?M?ie&&t.compressedTexSubImage2D(e.TEXTURE_2D,j,0,0,ae.width,ae.height,se,ae.data):t.compressedTexImage2D(e.TEXTURE_2D,j,Se,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):M?ie&&t.texSubImage2D(e.TEXTURE_2D,j,0,0,ae.width,ae.height,se,be,ae.data):t.texImage2D(e.TEXTURE_2D,j,Se,ae.width,ae.height,0,se,be,ae.data)}else if(s.isDataArrayTexture)if(M){if(ee&&t.texStorage3D(e.TEXTURE_2D_ARRAY,fe,Se,J.width,J.height,J.depth),ie)if(s.layerUpdates.size>0){const j=mr(J.width,J.height,s.format,s.type);for(const Y of s.layerUpdates){const he=J.data.subarray(Y*j/J.data.BYTES_PER_ELEMENT,(Y+1)*j/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,Y,J.width,J.height,1,se,be,he)}s.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,se,be,J.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,Se,J.width,J.height,J.depth,0,se,be,J.data);else if(s.isData3DTexture)M?(ee&&t.texStorage3D(e.TEXTURE_3D,fe,Se,J.width,J.height,J.depth),ie&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,se,be,J.data)):t.texImage3D(e.TEXTURE_3D,0,Se,J.width,J.height,J.depth,0,se,be,J.data);else if(s.isFramebufferTexture){if(ee)if(M)t.texStorage2D(e.TEXTURE_2D,fe,Se,J.width,J.height);else{let j=J.width,Y=J.height;for(let he=0;he<fe;he++)t.texImage2D(e.TEXTURE_2D,he,Se,j,Y,0,se,be,null),j>>=1,Y>>=1}}else if(ye.length>0){if(M&&ee){const j=rt(ye[0]);t.texStorage2D(e.TEXTURE_2D,fe,Se,j.width,j.height)}for(let j=0,Y=ye.length;j<Y;j++)ae=ye[j],M?ie&&t.texSubImage2D(e.TEXTURE_2D,j,0,0,se,be,ae):t.texImage2D(e.TEXTURE_2D,j,Se,se,be,ae);s.generateMipmaps=!1}else if(M){if(ee){const j=rt(J);t.texStorage2D(e.TEXTURE_2D,fe,Se,j.width,j.height)}ie&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,se,be,J)}else t.texImage2D(e.TEXTURE_2D,0,Se,se,be,J);d(s)&&o(k),Me.__version=G.version,s.onUpdate&&s.onUpdate(s)}h.__version=s.version}function P(h,s,U){if(s.image.length!==6)return;const k=et(h,s),Z=s.source;t.bindTexture(e.TEXTURE_CUBE_MAP,h.__webglTexture,e.TEXTURE0+U);const G=i.get(Z);if(Z.version!==G.__version||k===!0){t.activeTexture(e.TEXTURE0+U);const Me=at.getPrimaries(at.workingColorSpace),te=s.colorSpace===Wt?null:at.getPrimaries(s.colorSpace),ve=s.colorSpace===Wt||Me===te?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Ee=s.isCompressedTexture||s.image[0].isCompressedTexture,J=s.image[0]&&s.image[0].isDataTexture,se=[];for(let Y=0;Y<6;Y++)!Ee&&!J?se[Y]=L(s.image[Y],!0,a.maxCubemapSize):se[Y]=J?s.image[Y].image:s.image[Y],se[Y]=ct(s,se[Y]);const be=se[0],Se=r.convert(s.format,s.colorSpace),ae=r.convert(s.type),ye=R(s.internalFormat,Se,ae,s.colorSpace),M=s.isVideoTexture!==!0,ee=G.__version===void 0||k===!0,ie=Z.dataReady;let fe=O(s,be);Be(e.TEXTURE_CUBE_MAP,s);let j;if(Ee){M&&ee&&t.texStorage2D(e.TEXTURE_CUBE_MAP,fe,ye,be.width,be.height);for(let Y=0;Y<6;Y++){j=se[Y].mipmaps;for(let he=0;he<j.length;he++){const De=j[he];s.format!==Ct?Se!==null?M?ie&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,De.width,De.height,Se,De.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,ye,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):M?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,De.width,De.height,Se,ae,De.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,ye,De.width,De.height,0,Se,ae,De.data)}}}else{if(j=s.mipmaps,M&&ee){j.length>0&&fe++;const Y=rt(se[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,fe,ye,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(J){M?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,se[Y].width,se[Y].height,Se,ae,se[Y].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ye,se[Y].width,se[Y].height,0,Se,ae,se[Y].data);for(let he=0;he<j.length;he++){const qe=j[he].image[Y].image;M?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,qe.width,qe.height,Se,ae,qe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,ye,qe.width,qe.height,0,Se,ae,qe.data)}}else{M?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Se,ae,se[Y]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ye,Se,ae,se[Y]);for(let he=0;he<j.length;he++){const De=j[he];M?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,Se,ae,De.image[Y]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,ye,Se,ae,De.image[Y])}}}d(s)&&o(e.TEXTURE_CUBE_MAP),G.__version=Z.version,s.onUpdate&&s.onUpdate(s)}h.__version=s.version}function $(h,s,U,k,Z,G){const Me=r.convert(U.format,U.colorSpace),te=r.convert(U.type),ve=R(U.internalFormat,Me,te,U.colorSpace),Ee=i.get(s),J=i.get(U);if(J.__renderTarget=s,!Ee.__hasExternalTextures){const se=Math.max(1,s.width>>G),be=Math.max(1,s.height>>G);Z===e.TEXTURE_3D||Z===e.TEXTURE_2D_ARRAY?t.texImage3D(Z,G,ve,se,be,s.depth,0,Me,te,null):t.texImage2D(Z,G,ve,se,be,0,Me,te,null)}t.bindFramebuffer(e.FRAMEBUFFER,h),_e(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,k,Z,J.__webglTexture,0,Je(s)):(Z===e.TEXTURE_2D||Z>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,k,Z,J.__webglTexture,G),t.bindFramebuffer(e.FRAMEBUFFER,null)}function ue(h,s,U){if(e.bindRenderbuffer(e.RENDERBUFFER,h),s.depthBuffer){const k=s.depthTexture,Z=k&&k.isDepthTexture?k.type:null,G=v(s.stencilBuffer,Z),Me=s.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,te=Je(s);_e(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,te,G,s.width,s.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,te,G,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,G,s.width,s.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Me,e.RENDERBUFFER,h)}else{const k=s.textures;for(let Z=0;Z<k.length;Z++){const G=k[Z],Me=r.convert(G.format,G.colorSpace),te=r.convert(G.type),ve=R(G.internalFormat,Me,te,G.colorSpace),Ee=Je(s);U&&_e(s)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee,ve,s.width,s.height):_e(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee,ve,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,ve,s.width,s.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ce(h,s){if(s&&s.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,h),!(s.depthTexture&&s.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const k=i.get(s.depthTexture);k.__renderTarget=s,(!k.__webglTexture||s.depthTexture.image.width!==s.width||s.depthTexture.image.height!==s.height)&&(s.depthTexture.image.width=s.width,s.depthTexture.image.height=s.height,s.depthTexture.needsUpdate=!0),q(s.depthTexture,0);const Z=k.__webglTexture,G=Je(s);if(s.depthTexture.format===Mi)_e(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0);else if(s.depthTexture.format===Cn)_e(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ue(h){const s=i.get(h),U=h.isWebGLCubeRenderTarget===!0;if(s.__boundDepthTexture!==h.depthTexture){const k=h.depthTexture;if(s.__depthDisposeCallback&&s.__depthDisposeCallback(),k){const Z=()=>{delete s.__boundDepthTexture,delete s.__depthDisposeCallback,k.removeEventListener("dispose",Z)};k.addEventListener("dispose",Z),s.__depthDisposeCallback=Z}s.__boundDepthTexture=k}if(h.depthTexture&&!s.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const k=h.texture.mipmaps;k&&k.length>0?ce(s.__webglFramebuffer[0],h):ce(s.__webglFramebuffer,h)}else if(U){s.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[k]),s.__webglDepthbuffer[k]===void 0)s.__webglDepthbuffer[k]=e.createRenderbuffer(),ue(s.__webglDepthbuffer[k],h,!1);else{const Z=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=s.__webglDepthbuffer[k];e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,Z,e.RENDERBUFFER,G)}}else{const k=h.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),s.__webglDepthbuffer===void 0)s.__webglDepthbuffer=e.createRenderbuffer(),ue(s.__webglDepthbuffer,h,!1);else{const Z=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=s.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,Z,e.RENDERBUFFER,G)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Qe(h,s,U){const k=i.get(h);s!==void 0&&$(k.__webglFramebuffer,h,h.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&Ue(h)}function m(h){const s=h.texture,U=i.get(h),k=i.get(s);h.addEventListener("dispose",D);const Z=h.textures,G=h.isWebGLCubeRenderTarget===!0,Me=Z.length>1;if(Me||(k.__webglTexture===void 0&&(k.__webglTexture=e.createTexture()),k.__version=s.version,f.memory.textures++),G){U.__webglFramebuffer=[];for(let te=0;te<6;te++)if(s.mipmaps&&s.mipmaps.length>0){U.__webglFramebuffer[te]=[];for(let ve=0;ve<s.mipmaps.length;ve++)U.__webglFramebuffer[te][ve]=e.createFramebuffer()}else U.__webglFramebuffer[te]=e.createFramebuffer()}else{if(s.mipmaps&&s.mipmaps.length>0){U.__webglFramebuffer=[];for(let te=0;te<s.mipmaps.length;te++)U.__webglFramebuffer[te]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(Me)for(let te=0,ve=Z.length;te<ve;te++){const Ee=i.get(Z[te]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=e.createTexture(),f.memory.textures++)}if(h.samples>0&&_e(h)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let te=0;te<Z.length;te++){const ve=Z[te];U.__webglColorRenderbuffer[te]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[te]);const Ee=r.convert(ve.format,ve.colorSpace),J=r.convert(ve.type),se=R(ve.internalFormat,Ee,J,ve.colorSpace,h.isXRRenderTarget===!0),be=Je(h);e.renderbufferStorageMultisample(e.RENDERBUFFER,be,se,h.width,h.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+te,e.RENDERBUFFER,U.__webglColorRenderbuffer[te])}e.bindRenderbuffer(e.RENDERBUFFER,null),h.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),ue(U.__webglDepthRenderbuffer,h,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(G){t.bindTexture(e.TEXTURE_CUBE_MAP,k.__webglTexture),Be(e.TEXTURE_CUBE_MAP,s);for(let te=0;te<6;te++)if(s.mipmaps&&s.mipmaps.length>0)for(let ve=0;ve<s.mipmaps.length;ve++)$(U.__webglFramebuffer[te][ve],h,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve);else $(U.__webglFramebuffer[te],h,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);d(s)&&o(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let te=0,ve=Z.length;te<ve;te++){const Ee=Z[te],J=i.get(Ee);let se=e.TEXTURE_2D;(h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(se=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(se,J.__webglTexture),Be(se,Ee),$(U.__webglFramebuffer,h,Ee,e.COLOR_ATTACHMENT0+te,se,0),d(Ee)&&o(se)}t.unbindTexture()}else{let te=e.TEXTURE_2D;if((h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(te=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(te,k.__webglTexture),Be(te,s),s.mipmaps&&s.mipmaps.length>0)for(let ve=0;ve<s.mipmaps.length;ve++)$(U.__webglFramebuffer[ve],h,s,e.COLOR_ATTACHMENT0,te,ve);else $(U.__webglFramebuffer,h,s,e.COLOR_ATTACHMENT0,te,0);d(s)&&o(te),t.unbindTexture()}h.depthBuffer&&Ue(h)}function Ye(h){const s=h.textures;for(let U=0,k=s.length;U<k;U++){const Z=s[U];if(d(Z)){const G=y(h),Me=i.get(Z).__webglTexture;t.bindTexture(G,Me),o(G),t.unbindTexture()}}}const Le=[],Ce=[];function me(h){if(h.samples>0){if(_e(h)===!1){const s=h.textures,U=h.width,k=h.height;let Z=e.COLOR_BUFFER_BIT;const G=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Me=i.get(h),te=s.length>1;if(te)for(let Ee=0;Ee<s.length;Ee++)t.bindFramebuffer(e.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,Me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const ve=h.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Ee=0;Ee<s.length;Ee++){if(h.resolveDepthBuffer&&(h.depthBuffer&&(Z|=e.DEPTH_BUFFER_BIT),h.stencilBuffer&&h.resolveStencilBuffer&&(Z|=e.STENCIL_BUFFER_BIT)),te){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Me.__webglColorRenderbuffer[Ee]);const J=i.get(s[Ee]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,J,0)}e.blitFramebuffer(0,0,U,k,0,0,U,k,Z,e.NEAREST),E===!0&&(Le.length=0,Ce.length=0,Le.push(e.COLOR_ATTACHMENT0+Ee),h.depthBuffer&&h.resolveDepthBuffer===!1&&(Le.push(G),Ce.push(G),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ce)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Le))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),te)for(let Ee=0;Ee<s.length;Ee++){t.bindFramebuffer(e.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.RENDERBUFFER,Me.__webglColorRenderbuffer[Ee]);const J=i.get(s[Ee]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,Me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.TEXTURE_2D,J,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(h.depthBuffer&&h.resolveDepthBuffer===!1&&E){const s=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[s])}}}function Je(h){return Math.min(a.maxSamples,h.samples)}function _e(h){const s=i.get(h);return h.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&s.__useRenderToTexture!==!1}function Ie(h){const s=f.render.frame;A.get(h)!==s&&(A.set(h,s),h.update())}function ct(h,s){const U=h.colorSpace,k=h.format,Z=h.type;return h.isCompressedTexture===!0||h.isVideoTexture===!0||U!==In&&U!==Wt&&(at.getTransfer(U)===je?(k!==Ct||Z!==Gt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),s}function rt(h){return typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement?(_.width=h.naturalWidth||h.width,_.height=h.naturalHeight||h.height):typeof VideoFrame<"u"&&h instanceof VideoFrame?(_.width=h.displayWidth,_.height=h.displayHeight):(_.width=h.width,_.height=h.height),_}this.allocateTextureUnit=K,this.resetTextureUnits=B,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=ne,this.setTextureCube=V,this.rebindTextures=Qe,this.setupRenderTarget=m,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=$,this.useMultisampledRTT=_e}function Qf(e,n){function t(i,a=Wt){let r;const f=at.getTransfer(a);if(i===Gt)return e.UNSIGNED_BYTE;if(i===pa)return e.UNSIGNED_SHORT_4_4_4_4;if(i===ha)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Lo)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===yo)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Uo)return e.BYTE;if(i===Io)return e.SHORT;if(i===Pn)return e.UNSIGNED_SHORT;if(i===_a)return e.INT;if(i===dn)return e.UNSIGNED_INT;if(i===Ft)return e.FLOAT;if(i===Un)return e.HALF_FLOAT;if(i===No)return e.ALPHA;if(i===Oo)return e.RGB;if(i===Ct)return e.RGBA;if(i===Mi)return e.DEPTH_COMPONENT;if(i===Cn)return e.DEPTH_STENCIL;if(i===Fo)return e.RED;if(i===ga)return e.RED_INTEGER;if(i===Bo)return e.RG;if(i===va)return e.RG_INTEGER;if(i===Ea)return e.RGBA_INTEGER;if(i===kn||i===zn||i===Wn||i===Xn)if(f===je)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===kn)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===kn)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zn)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wn)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xn)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Oi||i===Fi||i===Bi||i===Hi)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Oi)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Fi)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Bi)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hi)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Gi||i===Vi||i===ki)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Gi||i===Vi)return f===je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ki)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===zi||i===Wi||i===Xi||i===Yi||i===Ki||i===qi||i===Zi||i===$i||i===ji||i===Qi||i===Ji||i===er||i===tr||i===nr)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===zi)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Wi)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xi)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yi)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ki)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===qi)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Zi)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$i)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ji)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qi)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ji)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===er)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===tr)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===nr)return f===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ir||i===rr||i===ar)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===ir)return f===je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===rr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ar)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===or||i===sr||i===lr||i===cr)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===or)return r.COMPRESSED_RED_RGTC1_EXT;if(i===sr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===cr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===cn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Jf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,eu=`
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

}`;class tu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new ma(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Dt({vertexShader:Jf,fragmentShader:eu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new pn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nu extends $a{constructor(n,t){super();const i=this;let a=null,r=1,f=null,l="local-floor",E=1,_=null,A=null,S=null,g=null,T=null,N=null;const L=typeof XRWebGLBinding<"u",d=new tu,o={},y=t.getContextAttributes();let R=null,v=null;const O=[],x=[],D=new We;let H=null;const p=new qt;p.viewport=new dt;const u=new qt;u.viewport=new dt;const w=[p,u],B=new ja;let K=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let P=O[z];return P===void 0&&(P=new Gn,O[z]=P),P.getTargetRaySpace()},this.getControllerGrip=function(z){let P=O[z];return P===void 0&&(P=new Gn,O[z]=P),P.getGripSpace()},this.getHand=function(z){let P=O[z];return P===void 0&&(P=new Gn,O[z]=P),P.getHandSpace()};function q(z){const P=x.indexOf(z.inputSource);if(P===-1)return;const $=O[P];$!==void 0&&($.update(z.inputSource,z.frame,_||f),$.dispatchEvent({type:z.type,data:z.inputSource}))}function W(){a.removeEventListener("select",q),a.removeEventListener("selectstart",q),a.removeEventListener("selectend",q),a.removeEventListener("squeeze",q),a.removeEventListener("squeezestart",q),a.removeEventListener("squeezeend",q),a.removeEventListener("end",W),a.removeEventListener("inputsourceschange",ne);for(let z=0;z<O.length;z++){const P=x[z];P!==null&&(x[z]=null,O[z].disconnect(P))}K=null,X=null,d.reset();for(const z in o)delete o[z];n.setRenderTarget(R),T=null,g=null,S=null,a=null,v=null,Ge.stop(),i.isPresenting=!1,n.setPixelRatio(H),n.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){l=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return _||f},this.setReferenceSpace=function(z){_=z},this.getBaseLayer=function(){return g!==null?g:T},this.getBinding=function(){return S===null&&L&&(S=new XRWebGLBinding(a,t)),S},this.getFrame=function(){return N},this.getSession=function(){return a},this.setSession=async function(z){if(a=z,a!==null){if(R=n.getRenderTarget(),a.addEventListener("select",q),a.addEventListener("selectstart",q),a.addEventListener("selectend",q),a.addEventListener("squeeze",q),a.addEventListener("squeezestart",q),a.addEventListener("squeezeend",q),a.addEventListener("end",W),a.addEventListener("inputsourceschange",ne),y.xrCompatible!==!0&&await t.makeXRCompatible(),H=n.getPixelRatio(),n.getSize(D),L&&"createProjectionLayer"in XRWebGLBinding.prototype){let $=null,ue=null,ce=null;y.depth&&(ce=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=y.stencil?Cn:Mi,ue=y.stencil?cn:dn);const Ue={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};S=this.getBinding(),g=S.createProjectionLayer(Ue),a.updateRenderState({layers:[g]}),n.setPixelRatio(1),n.setSize(g.textureWidth,g.textureHeight,!1),v=new $t(g.textureWidth,g.textureHeight,{format:Ct,type:Gt,depthTexture:new da(g.textureWidth,g.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:y.stencil,colorSpace:n.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const $={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};T=new XRWebGLLayer(a,t,$),a.updateRenderState({baseLayer:T}),n.setPixelRatio(1),n.setSize(T.framebufferWidth,T.framebufferHeight,!1),v=new $t(T.framebufferWidth,T.framebufferHeight,{format:Ct,type:Gt,colorSpace:n.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:T.ignoreDepthValues===!1,resolveStencilBuffer:T.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(E),_=null,f=await a.requestReferenceSpace(l),Ge.setContext(a),Ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function ne(z){for(let P=0;P<z.removed.length;P++){const $=z.removed[P],ue=x.indexOf($);ue>=0&&(x[ue]=null,O[ue].disconnect($))}for(let P=0;P<z.added.length;P++){const $=z.added[P];let ue=x.indexOf($);if(ue===-1){for(let Ue=0;Ue<O.length;Ue++)if(Ue>=x.length){x.push($),ue=Ue;break}else if(x[Ue]===null){x[Ue]=$,ue=Ue;break}if(ue===-1)break}const ce=O[ue];ce&&ce.connect($)}}const V=new le,ge=new le;function Te(z,P,$){V.setFromMatrixPosition(P.matrixWorld),ge.setFromMatrixPosition($.matrixWorld);const ue=V.distanceTo(ge),ce=P.projectionMatrix.elements,Ue=$.projectionMatrix.elements,Qe=ce[14]/(ce[10]-1),m=ce[14]/(ce[10]+1),Ye=(ce[9]+1)/ce[5],Le=(ce[9]-1)/ce[5],Ce=(ce[8]-1)/ce[0],me=(Ue[8]+1)/Ue[0],Je=Qe*Ce,_e=Qe*me,Ie=ue/(-Ce+me),ct=Ie*-Ce;if(P.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(ct),z.translateZ(Ie),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),ce[10]===-1)z.projectionMatrix.copy(P.projectionMatrix),z.projectionMatrixInverse.copy(P.projectionMatrixInverse);else{const rt=Qe+Ie,h=m+Ie,s=Je-ct,U=_e+(ue-ct),k=Ye*m/h*rt,Z=Le*m/h*rt;z.projectionMatrix.makePerspective(s,U,k,Z,rt,h),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function Pe(z,P){P===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(P.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(a===null)return;let P=z.near,$=z.far;d.texture!==null&&(d.depthNear>0&&(P=d.depthNear),d.depthFar>0&&($=d.depthFar)),B.near=u.near=p.near=P,B.far=u.far=p.far=$,(K!==B.near||X!==B.far)&&(a.updateRenderState({depthNear:B.near,depthFar:B.far}),K=B.near,X=B.far),B.layers.mask=z.layers.mask|6,p.layers.mask=B.layers.mask&3,u.layers.mask=B.layers.mask&5;const ue=z.parent,ce=B.cameras;Pe(B,ue);for(let Ue=0;Ue<ce.length;Ue++)Pe(ce[Ue],ue);ce.length===2?Te(B,p,u):B.projectionMatrix.copy(p.projectionMatrix),Be(z,B,ue)};function Be(z,P,$){$===null?z.matrix.copy(P.matrixWorld):(z.matrix.copy($.matrixWorld),z.matrix.invert(),z.matrix.multiply(P.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(P.projectionMatrix),z.projectionMatrixInverse.copy(P.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Qa*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(g===null&&T===null))return E},this.setFoveation=function(z){E=z,g!==null&&(g.fixedFoveation=z),T!==null&&T.fixedFoveation!==void 0&&(T.fixedFoveation=z)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(B)},this.getCameraTexture=function(z){return o[z]};let et=null;function Ze(z,P){if(A=P.getViewerPose(_||f),N=P,A!==null){const $=A.views;T!==null&&(n.setRenderTargetFramebuffer(v,T.framebuffer),n.setRenderTarget(v));let ue=!1;$.length!==B.cameras.length&&(B.cameras.length=0,ue=!0);for(let m=0;m<$.length;m++){const Ye=$[m];let Le=null;if(T!==null)Le=T.getViewport(Ye);else{const me=S.getViewSubImage(g,Ye);Le=me.viewport,m===0&&(n.setRenderTargetTextures(v,me.colorTexture,me.depthStencilTexture),n.setRenderTarget(v))}let Ce=w[m];Ce===void 0&&(Ce=new qt,Ce.layers.enable(m),Ce.viewport=new dt,w[m]=Ce),Ce.matrix.fromArray(Ye.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(Ye.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Le.x,Le.y,Le.width,Le.height),m===0&&(B.matrix.copy(Ce.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),ue===!0&&B.cameras.push(Ce)}const ce=a.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&L){S=i.getBinding();const m=S.getDepthInformation($[0]);m&&m.isValid&&m.texture&&d.init(m,a.renderState)}if(ce&&ce.includes("camera-access")&&L){n.state.unbindTexture(),S=i.getBinding();for(let m=0;m<$.length;m++){const Ye=$[m].camera;if(Ye){let Le=o[Ye];Le||(Le=new ma,o[Ye]=Le);const Ce=S.getCameraImage(Ye);Le.sourceTexture=Ce}}}}for(let $=0;$<O.length;$++){const ue=x[$],ce=O[$];ue!==null&&ce!==void 0&&ce.update(ue,P,_||f)}et&&et(z,P),P.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:P}),N=null}const Ge=new wa;Ge.setAnimationLoop(Ze),this.setAnimationLoop=function(z){et=z},this.dispose=function(){}}}const It=new Dn,iu=new St;function ru(e,n){function t(d,o){d.matrixAutoUpdate===!0&&d.updateMatrix(),o.value.copy(d.matrix)}function i(d,o){o.color.getRGB(d.fogColor.value,Ma(e)),o.isFog?(d.fogNear.value=o.near,d.fogFar.value=o.far):o.isFogExp2&&(d.fogDensity.value=o.density)}function a(d,o,y,R,v){o.isMeshBasicMaterial||o.isMeshLambertMaterial?r(d,o):o.isMeshToonMaterial?(r(d,o),S(d,o)):o.isMeshPhongMaterial?(r(d,o),A(d,o)):o.isMeshStandardMaterial?(r(d,o),g(d,o),o.isMeshPhysicalMaterial&&T(d,o,v)):o.isMeshMatcapMaterial?(r(d,o),N(d,o)):o.isMeshDepthMaterial?r(d,o):o.isMeshDistanceMaterial?(r(d,o),L(d,o)):o.isMeshNormalMaterial?r(d,o):o.isLineBasicMaterial?(f(d,o),o.isLineDashedMaterial&&l(d,o)):o.isPointsMaterial?E(d,o,y,R):o.isSpriteMaterial?_(d,o):o.isShadowMaterial?(d.color.value.copy(o.color),d.opacity.value=o.opacity):o.isShaderMaterial&&(o.uniformsNeedUpdate=!1)}function r(d,o){d.opacity.value=o.opacity,o.color&&d.diffuse.value.copy(o.color),o.emissive&&d.emissive.value.copy(o.emissive).multiplyScalar(o.emissiveIntensity),o.map&&(d.map.value=o.map,t(o.map,d.mapTransform)),o.alphaMap&&(d.alphaMap.value=o.alphaMap,t(o.alphaMap,d.alphaMapTransform)),o.bumpMap&&(d.bumpMap.value=o.bumpMap,t(o.bumpMap,d.bumpMapTransform),d.bumpScale.value=o.bumpScale,o.side===Mt&&(d.bumpScale.value*=-1)),o.normalMap&&(d.normalMap.value=o.normalMap,t(o.normalMap,d.normalMapTransform),d.normalScale.value.copy(o.normalScale),o.side===Mt&&d.normalScale.value.negate()),o.displacementMap&&(d.displacementMap.value=o.displacementMap,t(o.displacementMap,d.displacementMapTransform),d.displacementScale.value=o.displacementScale,d.displacementBias.value=o.displacementBias),o.emissiveMap&&(d.emissiveMap.value=o.emissiveMap,t(o.emissiveMap,d.emissiveMapTransform)),o.specularMap&&(d.specularMap.value=o.specularMap,t(o.specularMap,d.specularMapTransform)),o.alphaTest>0&&(d.alphaTest.value=o.alphaTest);const y=n.get(o),R=y.envMap,v=y.envMapRotation;R&&(d.envMap.value=R,It.copy(v),It.x*=-1,It.y*=-1,It.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(It.y*=-1,It.z*=-1),d.envMapRotation.value.setFromMatrix4(iu.makeRotationFromEuler(It)),d.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=o.reflectivity,d.ior.value=o.ior,d.refractionRatio.value=o.refractionRatio),o.lightMap&&(d.lightMap.value=o.lightMap,d.lightMapIntensity.value=o.lightMapIntensity,t(o.lightMap,d.lightMapTransform)),o.aoMap&&(d.aoMap.value=o.aoMap,d.aoMapIntensity.value=o.aoMapIntensity,t(o.aoMap,d.aoMapTransform))}function f(d,o){d.diffuse.value.copy(o.color),d.opacity.value=o.opacity,o.map&&(d.map.value=o.map,t(o.map,d.mapTransform))}function l(d,o){d.dashSize.value=o.dashSize,d.totalSize.value=o.dashSize+o.gapSize,d.scale.value=o.scale}function E(d,o,y,R){d.diffuse.value.copy(o.color),d.opacity.value=o.opacity,d.size.value=o.size*y,d.scale.value=R*.5,o.map&&(d.map.value=o.map,t(o.map,d.uvTransform)),o.alphaMap&&(d.alphaMap.value=o.alphaMap,t(o.alphaMap,d.alphaMapTransform)),o.alphaTest>0&&(d.alphaTest.value=o.alphaTest)}function _(d,o){d.diffuse.value.copy(o.color),d.opacity.value=o.opacity,d.rotation.value=o.rotation,o.map&&(d.map.value=o.map,t(o.map,d.mapTransform)),o.alphaMap&&(d.alphaMap.value=o.alphaMap,t(o.alphaMap,d.alphaMapTransform)),o.alphaTest>0&&(d.alphaTest.value=o.alphaTest)}function A(d,o){d.specular.value.copy(o.specular),d.shininess.value=Math.max(o.shininess,1e-4)}function S(d,o){o.gradientMap&&(d.gradientMap.value=o.gradientMap)}function g(d,o){d.metalness.value=o.metalness,o.metalnessMap&&(d.metalnessMap.value=o.metalnessMap,t(o.metalnessMap,d.metalnessMapTransform)),d.roughness.value=o.roughness,o.roughnessMap&&(d.roughnessMap.value=o.roughnessMap,t(o.roughnessMap,d.roughnessMapTransform)),o.envMap&&(d.envMapIntensity.value=o.envMapIntensity)}function T(d,o,y){d.ior.value=o.ior,o.sheen>0&&(d.sheenColor.value.copy(o.sheenColor).multiplyScalar(o.sheen),d.sheenRoughness.value=o.sheenRoughness,o.sheenColorMap&&(d.sheenColorMap.value=o.sheenColorMap,t(o.sheenColorMap,d.sheenColorMapTransform)),o.sheenRoughnessMap&&(d.sheenRoughnessMap.value=o.sheenRoughnessMap,t(o.sheenRoughnessMap,d.sheenRoughnessMapTransform))),o.clearcoat>0&&(d.clearcoat.value=o.clearcoat,d.clearcoatRoughness.value=o.clearcoatRoughness,o.clearcoatMap&&(d.clearcoatMap.value=o.clearcoatMap,t(o.clearcoatMap,d.clearcoatMapTransform)),o.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=o.clearcoatRoughnessMap,t(o.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),o.clearcoatNormalMap&&(d.clearcoatNormalMap.value=o.clearcoatNormalMap,t(o.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(o.clearcoatNormalScale),o.side===Mt&&d.clearcoatNormalScale.value.negate())),o.dispersion>0&&(d.dispersion.value=o.dispersion),o.iridescence>0&&(d.iridescence.value=o.iridescence,d.iridescenceIOR.value=o.iridescenceIOR,d.iridescenceThicknessMinimum.value=o.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=o.iridescenceThicknessRange[1],o.iridescenceMap&&(d.iridescenceMap.value=o.iridescenceMap,t(o.iridescenceMap,d.iridescenceMapTransform)),o.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=o.iridescenceThicknessMap,t(o.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),o.transmission>0&&(d.transmission.value=o.transmission,d.transmissionSamplerMap.value=y.texture,d.transmissionSamplerSize.value.set(y.width,y.height),o.transmissionMap&&(d.transmissionMap.value=o.transmissionMap,t(o.transmissionMap,d.transmissionMapTransform)),d.thickness.value=o.thickness,o.thicknessMap&&(d.thicknessMap.value=o.thicknessMap,t(o.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=o.attenuationDistance,d.attenuationColor.value.copy(o.attenuationColor)),o.anisotropy>0&&(d.anisotropyVector.value.set(o.anisotropy*Math.cos(o.anisotropyRotation),o.anisotropy*Math.sin(o.anisotropyRotation)),o.anisotropyMap&&(d.anisotropyMap.value=o.anisotropyMap,t(o.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=o.specularIntensity,d.specularColor.value.copy(o.specularColor),o.specularColorMap&&(d.specularColorMap.value=o.specularColorMap,t(o.specularColorMap,d.specularColorMapTransform)),o.specularIntensityMap&&(d.specularIntensityMap.value=o.specularIntensityMap,t(o.specularIntensityMap,d.specularIntensityMapTransform))}function N(d,o){o.matcap&&(d.matcap.value=o.matcap)}function L(d,o){const y=n.get(o).light;d.referencePosition.value.setFromMatrixPosition(y.matrixWorld),d.nearDistance.value=y.shadow.camera.near,d.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function au(e,n,t,i){let a={},r={},f=[];const l=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function E(y,R){const v=R.program;i.uniformBlockBinding(y,v)}function _(y,R){let v=a[y.id];v===void 0&&(N(y),v=A(y),a[y.id]=v,y.addEventListener("dispose",d));const O=R.program;i.updateUBOMapping(y,O);const x=n.render.frame;r[y.id]!==x&&(g(y),r[y.id]=x)}function A(y){const R=S();y.__bindingPointIndex=R;const v=e.createBuffer(),O=y.__size,x=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,v),e.bufferData(e.UNIFORM_BUFFER,O,x),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,R,v),v}function S(){for(let y=0;y<l;y++)if(f.indexOf(y)===-1)return f.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(y){const R=a[y.id],v=y.uniforms,O=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,R);for(let x=0,D=v.length;x<D;x++){const H=Array.isArray(v[x])?v[x]:[v[x]];for(let p=0,u=H.length;p<u;p++){const w=H[p];if(T(w,x,p,O)===!0){const B=w.__offset,K=Array.isArray(w.value)?w.value:[w.value];let X=0;for(let q=0;q<K.length;q++){const W=K[q],ne=L(W);typeof W=="number"||typeof W=="boolean"?(w.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,B+X,w.__data)):W.isMatrix3?(w.__data[0]=W.elements[0],w.__data[1]=W.elements[1],w.__data[2]=W.elements[2],w.__data[3]=0,w.__data[4]=W.elements[3],w.__data[5]=W.elements[4],w.__data[6]=W.elements[5],w.__data[7]=0,w.__data[8]=W.elements[6],w.__data[9]=W.elements[7],w.__data[10]=W.elements[8],w.__data[11]=0):(W.toArray(w.__data,X),X+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,B,w.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function T(y,R,v,O){const x=y.value,D=R+"_"+v;if(O[D]===void 0)return typeof x=="number"||typeof x=="boolean"?O[D]=x:O[D]=x.clone(),!0;{const H=O[D];if(typeof x=="number"||typeof x=="boolean"){if(H!==x)return O[D]=x,!0}else if(H.equals(x)===!1)return H.copy(x),!0}return!1}function N(y){const R=y.uniforms;let v=0;const O=16;for(let D=0,H=R.length;D<H;D++){const p=Array.isArray(R[D])?R[D]:[R[D]];for(let u=0,w=p.length;u<w;u++){const B=p[u],K=Array.isArray(B.value)?B.value:[B.value];for(let X=0,q=K.length;X<q;X++){const W=K[X],ne=L(W),V=v%O,ge=V%ne.boundary,Te=V+ge;v+=ge,Te!==0&&O-Te<ne.storage&&(v+=O-Te),B.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=ne.storage}}}const x=v%O;return x>0&&(v+=O-x),y.__size=v,y.__cache={},this}function L(y){const R={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(R.boundary=4,R.storage=4):y.isVector2?(R.boundary=8,R.storage=8):y.isVector3||y.isColor?(R.boundary=16,R.storage=12):y.isVector4?(R.boundary=16,R.storage=16):y.isMatrix3?(R.boundary=48,R.storage=48):y.isMatrix4?(R.boundary=64,R.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),R}function d(y){const R=y.target;R.removeEventListener("dispose",d);const v=f.indexOf(R.__bindingPointIndex);f.splice(v,1),e.deleteBuffer(a[R.id]),delete a[R.id],delete r[R.id]}function o(){for(const y in a)e.deleteBuffer(a[y]);f=[],a={},r={}}return{bind:E,update:_,dispose:o}}class ou{constructor(n={}){const{canvas:t=Ka(),context:i=null,depth:a=!0,stencil:r=!1,alpha:f=!1,antialias:l=!1,premultipliedAlpha:E=!0,preserveDrawingBuffer:_=!1,powerPreference:A="default",failIfMajorPerformanceCaveat:S=!1,reversedDepthBuffer:g=!1}=n;this.isWebGLRenderer=!0;let T;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=i.getContextAttributes().alpha}else T=f;const N=new Uint32Array(4),L=new Int32Array(4);let d=null,o=null;const y=[],R=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let O=!1;this._outputColorSpace=la;let x=0,D=0,H=null,p=-1,u=null;const w=new dt,B=new dt;let K=null;const X=new ke(0);let q=0,W=t.width,ne=t.height,V=1,ge=null,Te=null;const Pe=new dt(0,0,W,ne),Be=new dt(0,0,W,ne);let et=!1;const Ze=new ca;let Ge=!1,z=!1;const P=new St,$=new le,ue=new dt,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ue=!1;function Qe(){return H===null?V:1}let m=i;function Ye(c,b){return t.getContext(c,b)}try{const c={alpha:!0,depth:a,stencil:r,antialias:l,premultipliedAlpha:E,preserveDrawingBuffer:_,powerPreference:A,failIfMajorPerformanceCaveat:S};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qa}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",fe,!1),t.addEventListener("webglcontextcreationerror",j,!1),m===null){const b="webgl2";if(m=Ye(b,c),m===null)throw Ye(b)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(c){throw console.error("THREE.WebGLRenderer: "+c.message),c}let Le,Ce,me,Je,_e,Ie,ct,rt,h,s,U,k,Z,G,Me,te,ve,Ee,J,se,be,Se,ae,ye;function M(){Le=new md(m),Le.init(),Se=new Qf(m,Le),Ce=new ld(m,Le,n,Se),me=new $f(m,Le),Ce.reversedDepthBuffer&&g&&me.buffers.depth.setReversed(!0),Je=new vd(m),_e=new Ff,Ie=new jf(m,Le,me,_e,Ce,Se,Je),ct=new dd(v),rt=new hd(v),h=new As(m),ae=new od(m,h),s=new _d(m,h,Je,ae),U=new Sd(m,s,h,Je),J=new Ed(m,Ce,Ie),te=new cd(_e),k=new Of(v,ct,rt,Le,Ce,ae,te),Z=new ru(v,_e),G=new Hf,Me=new Xf(Le),Ee=new ad(v,ct,rt,me,U,T,E),ve=new qf(v,U,Ce),ye=new au(m,Je,Ce,me),se=new sd(m,Le,Je),be=new gd(m,Le,Je),Je.programs=k.programs,v.capabilities=Ce,v.extensions=Le,v.properties=_e,v.renderLists=G,v.shadowMap=ve,v.state=me,v.info=Je}M();const ee=new nu(v,m);this.xr=ee,this.getContext=function(){return m},this.getContextAttributes=function(){return m.getContextAttributes()},this.forceContextLoss=function(){const c=Le.get("WEBGL_lose_context");c&&c.loseContext()},this.forceContextRestore=function(){const c=Le.get("WEBGL_lose_context");c&&c.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(c){c!==void 0&&(V=c,this.setSize(W,ne,!1))},this.getSize=function(c){return c.set(W,ne)},this.setSize=function(c,b,I=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=c,ne=b,t.width=Math.floor(c*V),t.height=Math.floor(b*V),I===!0&&(t.style.width=c+"px",t.style.height=b+"px"),this.setViewport(0,0,c,b)},this.getDrawingBufferSize=function(c){return c.set(W*V,ne*V).floor()},this.setDrawingBufferSize=function(c,b,I){W=c,ne=b,V=I,t.width=Math.floor(c*I),t.height=Math.floor(b*I),this.setViewport(0,0,c,b)},this.getCurrentViewport=function(c){return c.copy(w)},this.getViewport=function(c){return c.copy(Pe)},this.setViewport=function(c,b,I,F){c.isVector4?Pe.set(c.x,c.y,c.z,c.w):Pe.set(c,b,I,F),me.viewport(w.copy(Pe).multiplyScalar(V).round())},this.getScissor=function(c){return c.copy(Be)},this.setScissor=function(c,b,I,F){c.isVector4?Be.set(c.x,c.y,c.z,c.w):Be.set(c,b,I,F),me.scissor(B.copy(Be).multiplyScalar(V).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(c){me.setScissorTest(et=c)},this.setOpaqueSort=function(c){ge=c},this.setTransparentSort=function(c){Te=c},this.getClearColor=function(c){return c.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(c=!0,b=!0,I=!0){let F=0;if(c){let C=!1;if(H!==null){const Q=H.texture.format;C=Q===Ea||Q===va||Q===ga}if(C){const Q=H.texture.type,oe=Q===Gt||Q===dn||Q===Pn||Q===cn||Q===pa||Q===ha,pe=Ee.getClearColor(),de=Ee.getClearAlpha(),Re=pe.r,we=pe.g,xe=pe.b;oe?(N[0]=Re,N[1]=we,N[2]=xe,N[3]=de,m.clearBufferuiv(m.COLOR,0,N)):(L[0]=Re,L[1]=we,L[2]=xe,L[3]=de,m.clearBufferiv(m.COLOR,0,L))}else F|=m.COLOR_BUFFER_BIT}b&&(F|=m.DEPTH_BUFFER_BIT),I&&(F|=m.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),m.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",fe,!1),t.removeEventListener("webglcontextcreationerror",j,!1),Ee.dispose(),G.dispose(),Me.dispose(),_e.dispose(),ct.dispose(),rt.dispose(),U.dispose(),ae.dispose(),ye.dispose(),k.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",xt),ee.removeEventListener("sessionend",Pi),Lt.stop()};function ie(c){c.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),O=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),O=!1;const c=Je.autoReset,b=ve.enabled,I=ve.autoUpdate,F=ve.needsUpdate,C=ve.type;M(),Je.autoReset=c,ve.enabled=b,ve.autoUpdate=I,ve.needsUpdate=F,ve.type=C}function j(c){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",c.statusMessage)}function Y(c){const b=c.target;b.removeEventListener("dispose",Y),he(b)}function he(c){De(c),_e.remove(c)}function De(c){const b=_e.get(c).programs;b!==void 0&&(b.forEach(function(I){k.releaseProgram(I)}),c.isShaderMaterial&&k.releaseShaderCache(c))}this.renderBufferDirect=function(c,b,I,F,C,Q){b===null&&(b=ce);const oe=C.isMesh&&C.matrixWorld.determinant()<0,pe=Va(c,b,I,F,C);me.setMaterial(F,oe);let de=I.index,Re=1;if(F.wireframe===!0){if(de=s.getWireframeAttribute(I),de===void 0)return;Re=2}const we=I.drawRange,xe=I.attributes.position;let Oe=we.start*Re,ze=(we.start+we.count)*Re;Q!==null&&(Oe=Math.max(Oe,Q.start*Re),ze=Math.min(ze,(Q.start+Q.count)*Re)),de!==null?(Oe=Math.max(Oe,0),ze=Math.min(ze,de.count)):xe!=null&&(Oe=Math.max(Oe,0),ze=Math.min(ze,xe.count));const it=ze-Oe;if(it<0||it===1/0)return;ae.setup(C,F,pe,I,de);let $e,Ke=se;if(de!==null&&($e=h.get(de),Ke=be,Ke.setIndex($e)),C.isMesh)F.wireframe===!0?(me.setLineWidth(F.wireframeLinewidth*Qe()),Ke.setMode(m.LINES)):Ke.setMode(m.TRIANGLES);else if(C.isLine){let Ae=F.linewidth;Ae===void 0&&(Ae=1),me.setLineWidth(Ae*Qe()),C.isLineSegments?Ke.setMode(m.LINES):C.isLineLoop?Ke.setMode(m.LINE_LOOP):Ke.setMode(m.LINE_STRIP)}else C.isPoints?Ke.setMode(m.POINTS):C.isSprite&&Ke.setMode(m.TRIANGLES);if(C.isBatchedMesh)if(C._multiDrawInstances!==null)si("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ke.renderMultiDrawInstances(C._multiDrawStarts,C._multiDrawCounts,C._multiDrawCount,C._multiDrawInstances);else if(Le.get("WEBGL_multi_draw"))Ke.renderMultiDraw(C._multiDrawStarts,C._multiDrawCounts,C._multiDrawCount);else{const Ae=C._multiDrawStarts,tt=C._multiDrawCounts,He=C._multiDrawCount,_t=de?h.get(de).bytesPerElement:1,Vt=_e.get(F).currentProgram.getUniforms();for(let gt=0;gt<He;gt++)Vt.setValue(m,"_gl_DrawID",gt),Ke.render(Ae[gt]/_t,tt[gt])}else if(C.isInstancedMesh)Ke.renderInstances(Oe,it,C.count);else if(I.isInstancedBufferGeometry){const Ae=I._maxInstanceCount!==void 0?I._maxInstanceCount:1/0,tt=Math.min(I.instanceCount,Ae);Ke.renderInstances(Oe,it,tt)}else Ke.render(Oe,it)};function qe(c,b,I){c.transparent===!0&&c.side===Tt&&c.forceSinglePass===!1?(c.side=Mt,c.needsUpdate=!0,mn(c,b,I),c.side=ln,c.needsUpdate=!0,mn(c,b,I),c.side=Tt):mn(c,b,I)}this.compile=function(c,b,I=null){I===null&&(I=c),o=Me.get(I),o.init(b),R.push(o),I.traverseVisible(function(C){C.isLight&&C.layers.test(b.layers)&&(o.pushLight(C),C.castShadow&&o.pushShadow(C))}),c!==I&&c.traverseVisible(function(C){C.isLight&&C.layers.test(b.layers)&&(o.pushLight(C),C.castShadow&&o.pushShadow(C))}),o.setupLights();const F=new Set;return c.traverse(function(C){if(!(C.isMesh||C.isPoints||C.isLine||C.isSprite))return;const Q=C.material;if(Q)if(Array.isArray(Q))for(let oe=0;oe<Q.length;oe++){const pe=Q[oe];qe(pe,I,C),F.add(pe)}else qe(Q,I,C),F.add(Q)}),o=R.pop(),F},this.compileAsync=function(c,b,I=null){const F=this.compile(c,b,I);return new Promise(C=>{function Q(){if(F.forEach(function(oe){_e.get(oe).currentProgram.isReady()&&F.delete(oe)}),F.size===0){C(c);return}setTimeout(Q,10)}Le.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Ve=null;function Rt(c){Ve&&Ve(c)}function xt(){Lt.stop()}function Pi(){Lt.start()}const Lt=new wa;Lt.setAnimationLoop(Rt),typeof self<"u"&&Lt.setContext(self),this.setAnimationLoop=function(c){Ve=c,ee.setAnimationLoop(c),c===null?Lt.stop():Lt.start()},ee.addEventListener("sessionstart",xt),ee.addEventListener("sessionend",Pi),this.render=function(c,b){if(b!==void 0&&b.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;if(c.matrixWorldAutoUpdate===!0&&c.updateMatrixWorld(),b.parent===null&&b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(b),b=ee.getCamera()),c.isScene===!0&&c.onBeforeRender(v,c,b,H),o=Me.get(c,R.length),o.init(b),R.push(o),P.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),Ze.setFromProjectionMatrix(P,Ni,b.reversedDepth),z=this.localClippingEnabled,Ge=te.init(this.clippingPlanes,z),d=G.get(c,y.length),d.init(),y.push(d),ee.enabled===!0&&ee.isPresenting===!0){const Q=v.xr.getDepthSensingMesh();Q!==null&&Bn(Q,b,-1/0,v.sortObjects)}Bn(c,b,0,v.sortObjects),d.finish(),v.sortObjects===!0&&d.sort(ge,Te),Ue=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Ue&&Ee.addToRenderList(d,c),this.info.render.frame++,Ge===!0&&te.beginShadows();const I=o.state.shadowsArray;ve.render(I,c,b),Ge===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const F=d.opaque,C=d.transmissive;if(o.setupLights(),b.isArrayCamera){const Q=b.cameras;if(C.length>0)for(let oe=0,pe=Q.length;oe<pe;oe++){const de=Q[oe];Li(F,C,c,de)}Ue&&Ee.render(c);for(let oe=0,pe=Q.length;oe<pe;oe++){const de=Q[oe];Di(d,c,de,de.viewport)}}else C.length>0&&Li(F,C,c,b),Ue&&Ee.render(c),Di(d,c,b);H!==null&&D===0&&(Ie.updateMultisampleRenderTarget(H),Ie.updateRenderTargetMipmap(H)),c.isScene===!0&&c.onAfterRender(v,c,b),ae.resetDefaultState(),p=-1,u=null,R.pop(),R.length>0?(o=R[R.length-1],Ge===!0&&te.setGlobalState(v.clippingPlanes,o.state.camera)):o=null,y.pop(),y.length>0?d=y[y.length-1]:d=null};function Bn(c,b,I,F){if(c.visible===!1)return;if(c.layers.test(b.layers)){if(c.isGroup)I=c.renderOrder;else if(c.isLOD)c.autoUpdate===!0&&c.update(b);else if(c.isLight)o.pushLight(c),c.castShadow&&o.pushShadow(c);else if(c.isSprite){if(!c.frustumCulled||Ze.intersectsSprite(c)){F&&ue.setFromMatrixPosition(c.matrixWorld).applyMatrix4(P);const oe=U.update(c),pe=c.material;pe.visible&&d.push(c,oe,pe,I,ue.z,null)}}else if((c.isMesh||c.isLine||c.isPoints)&&(!c.frustumCulled||Ze.intersectsObject(c))){const oe=U.update(c),pe=c.material;if(F&&(c.boundingSphere!==void 0?(c.boundingSphere===null&&c.computeBoundingSphere(),ue.copy(c.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),ue.copy(oe.boundingSphere.center)),ue.applyMatrix4(c.matrixWorld).applyMatrix4(P)),Array.isArray(pe)){const de=oe.groups;for(let Re=0,we=de.length;Re<we;Re++){const xe=de[Re],Oe=pe[xe.materialIndex];Oe&&Oe.visible&&d.push(c,oe,Oe,I,ue.z,xe)}}else pe.visible&&d.push(c,oe,pe,I,ue.z,null)}}const Q=c.children;for(let oe=0,pe=Q.length;oe<pe;oe++)Bn(Q[oe],b,I,F)}function Di(c,b,I,F){const C=c.opaque,Q=c.transmissive,oe=c.transparent;o.setupLightsView(I),Ge===!0&&te.setGlobalState(v.clippingPlanes,I),F&&me.viewport(w.copy(F)),C.length>0&&hn(C,b,I),Q.length>0&&hn(Q,b,I),oe.length>0&&hn(oe,b,I),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Li(c,b,I,F){if((I.isScene===!0?I.overrideMaterial:null)!==null)return;o.state.transmissionRenderTarget[F.id]===void 0&&(o.state.transmissionRenderTarget[F.id]=new $t(1,1,{generateMipmaps:!0,type:Le.has("EXT_color_buffer_half_float")||Le.has("EXT_color_buffer_float")?Un:Gt,minFilter:nn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const Q=o.state.transmissionRenderTarget[F.id],oe=F.viewport||w;Q.setSize(oe.z*v.transmissionResolutionScale,oe.w*v.transmissionResolutionScale);const pe=v.getRenderTarget(),de=v.getActiveCubeFace(),Re=v.getActiveMipmapLevel();v.setRenderTarget(Q),v.getClearColor(X),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),Ue&&Ee.render(I);const we=v.toneMapping;v.toneMapping=wt;const xe=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),o.setupLightsView(F),Ge===!0&&te.setGlobalState(v.clippingPlanes,F),hn(c,I,F),Ie.updateMultisampleRenderTarget(Q),Ie.updateRenderTargetMipmap(Q),Le.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let ze=0,it=b.length;ze<it;ze++){const $e=b[ze],Ke=$e.object,Ae=$e.geometry,tt=$e.material,He=$e.group;if(tt.side===Tt&&Ke.layers.test(F.layers)){const _t=tt.side;tt.side=Mt,tt.needsUpdate=!0,yi(Ke,I,F,Ae,tt,He),tt.side=_t,tt.needsUpdate=!0,Oe=!0}}Oe===!0&&(Ie.updateMultisampleRenderTarget(Q),Ie.updateRenderTargetMipmap(Q))}v.setRenderTarget(pe,de,Re),v.setClearColor(X,q),xe!==void 0&&(F.viewport=xe),v.toneMapping=we}function hn(c,b,I){const F=b.isScene===!0?b.overrideMaterial:null;for(let C=0,Q=c.length;C<Q;C++){const oe=c[C],pe=oe.object,de=oe.geometry,Re=oe.group;let we=oe.material;we.allowOverride===!0&&F!==null&&(we=F),pe.layers.test(I.layers)&&yi(pe,b,I,de,we,Re)}}function yi(c,b,I,F,C,Q){c.onBeforeRender(v,b,I,F,C,Q),c.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,c.matrixWorld),c.normalMatrix.getNormalMatrix(c.modelViewMatrix),C.onBeforeRender(v,b,I,F,c,Q),C.transparent===!0&&C.side===Tt&&C.forceSinglePass===!1?(C.side=Mt,C.needsUpdate=!0,v.renderBufferDirect(I,b,F,C,c,Q),C.side=ln,C.needsUpdate=!0,v.renderBufferDirect(I,b,F,C,c,Q),C.side=Tt):v.renderBufferDirect(I,b,F,C,c,Q),c.onAfterRender(v,b,I,F,C,Q)}function mn(c,b,I){b.isScene!==!0&&(b=ce);const F=_e.get(c),C=o.state.lights,Q=o.state.shadowsArray,oe=C.state.version,pe=k.getParameters(c,C.state,Q,b,I),de=k.getProgramCacheKey(pe);let Re=F.programs;F.environment=c.isMeshStandardMaterial?b.environment:null,F.fog=b.fog,F.envMap=(c.isMeshStandardMaterial?rt:ct).get(c.envMap||F.environment),F.envMapRotation=F.environment!==null&&c.envMap===null?b.environmentRotation:c.envMapRotation,Re===void 0&&(c.addEventListener("dispose",Y),Re=new Map,F.programs=Re);let we=Re.get(de);if(we!==void 0){if(F.currentProgram===we&&F.lightsStateVersion===oe)return Ii(c,pe),we}else pe.uniforms=k.getUniforms(c),c.onBeforeCompile(pe,v),we=k.acquireProgram(pe,de),Re.set(de,we),F.uniforms=pe.uniforms;const xe=F.uniforms;return(!c.isShaderMaterial&&!c.isRawShaderMaterial||c.clipping===!0)&&(xe.clippingPlanes=te.uniform),Ii(c,pe),F.needsLights=za(c),F.lightsStateVersion=oe,F.needsLights&&(xe.ambientLightColor.value=C.state.ambient,xe.lightProbe.value=C.state.probe,xe.directionalLights.value=C.state.directional,xe.directionalLightShadows.value=C.state.directionalShadow,xe.spotLights.value=C.state.spot,xe.spotLightShadows.value=C.state.spotShadow,xe.rectAreaLights.value=C.state.rectArea,xe.ltc_1.value=C.state.rectAreaLTC1,xe.ltc_2.value=C.state.rectAreaLTC2,xe.pointLights.value=C.state.point,xe.pointLightShadows.value=C.state.pointShadow,xe.hemisphereLights.value=C.state.hemi,xe.directionalShadowMap.value=C.state.directionalShadowMap,xe.directionalShadowMatrix.value=C.state.directionalShadowMatrix,xe.spotShadowMap.value=C.state.spotShadowMap,xe.spotLightMatrix.value=C.state.spotLightMatrix,xe.spotLightMap.value=C.state.spotLightMap,xe.pointShadowMap.value=C.state.pointShadowMap,xe.pointShadowMatrix.value=C.state.pointShadowMatrix),F.currentProgram=we,F.uniformsList=null,we}function Ui(c){if(c.uniformsList===null){const b=c.currentProgram.getUniforms();c.uniformsList=Rn.seqWithValue(b.seq,c.uniforms)}return c.uniformsList}function Ii(c,b){const I=_e.get(c);I.outputColorSpace=b.outputColorSpace,I.batching=b.batching,I.batchingColor=b.batchingColor,I.instancing=b.instancing,I.instancingColor=b.instancingColor,I.instancingMorph=b.instancingMorph,I.skinning=b.skinning,I.morphTargets=b.morphTargets,I.morphNormals=b.morphNormals,I.morphColors=b.morphColors,I.morphTargetsCount=b.morphTargetsCount,I.numClippingPlanes=b.numClippingPlanes,I.numIntersection=b.numClipIntersection,I.vertexAlphas=b.vertexAlphas,I.vertexTangents=b.vertexTangents,I.toneMapping=b.toneMapping}function Va(c,b,I,F,C){b.isScene!==!0&&(b=ce),Ie.resetTextureUnits();const Q=b.fog,oe=F.isMeshStandardMaterial?b.environment:null,pe=H===null?v.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:In,de=(F.isMeshStandardMaterial?rt:ct).get(F.envMap||oe),Re=F.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,we=!!I.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),xe=!!I.morphAttributes.position,Oe=!!I.morphAttributes.normal,ze=!!I.morphAttributes.color;let it=wt;F.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(it=v.toneMapping);const $e=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Ke=$e!==void 0?$e.length:0,Ae=_e.get(F),tt=o.state.lights;if(Ge===!0&&(z===!0||c!==u)){const ft=c===u&&F.id===p;te.setState(F,c,ft)}let He=!1;F.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==tt.state.version||Ae.outputColorSpace!==pe||C.isBatchedMesh&&Ae.batching===!1||!C.isBatchedMesh&&Ae.batching===!0||C.isBatchedMesh&&Ae.batchingColor===!0&&C.colorTexture===null||C.isBatchedMesh&&Ae.batchingColor===!1&&C.colorTexture!==null||C.isInstancedMesh&&Ae.instancing===!1||!C.isInstancedMesh&&Ae.instancing===!0||C.isSkinnedMesh&&Ae.skinning===!1||!C.isSkinnedMesh&&Ae.skinning===!0||C.isInstancedMesh&&Ae.instancingColor===!0&&C.instanceColor===null||C.isInstancedMesh&&Ae.instancingColor===!1&&C.instanceColor!==null||C.isInstancedMesh&&Ae.instancingMorph===!0&&C.morphTexture===null||C.isInstancedMesh&&Ae.instancingMorph===!1&&C.morphTexture!==null||Ae.envMap!==de||F.fog===!0&&Ae.fog!==Q||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==te.numPlanes||Ae.numIntersection!==te.numIntersection)||Ae.vertexAlphas!==Re||Ae.vertexTangents!==we||Ae.morphTargets!==xe||Ae.morphNormals!==Oe||Ae.morphColors!==ze||Ae.toneMapping!==it||Ae.morphTargetsCount!==Ke)&&(He=!0):(He=!0,Ae.__version=F.version);let _t=Ae.currentProgram;He===!0&&(_t=mn(F,b,C));let Vt=!1,gt=!1,en=!1;const nt=_t.getUniforms(),vt=Ae.uniforms;if(me.useProgram(_t.program)&&(Vt=!0,gt=!0,en=!0),F.id!==p&&(p=F.id,gt=!0),Vt||u!==c){me.buffers.depth.getReversed()&&c.reversedDepth!==!0&&(c._reversedDepth=!0,c.updateProjectionMatrix()),nt.setValue(m,"projectionMatrix",c.projectionMatrix),nt.setValue(m,"viewMatrix",c.matrixWorldInverse);const pt=nt.map.cameraPosition;pt!==void 0&&pt.setValue(m,$.setFromMatrixPosition(c.matrixWorld)),Ce.logarithmicDepthBuffer&&nt.setValue(m,"logDepthBufFC",2/(Math.log(c.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&nt.setValue(m,"isOrthographic",c.isOrthographicCamera===!0),u!==c&&(u=c,gt=!0,en=!0)}if(C.isSkinnedMesh){nt.setOptional(m,C,"bindMatrix"),nt.setOptional(m,C,"bindMatrixInverse");const ft=C.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),nt.setValue(m,"boneTexture",ft.boneTexture,Ie))}C.isBatchedMesh&&(nt.setOptional(m,C,"batchingTexture"),nt.setValue(m,"batchingTexture",C._matricesTexture,Ie),nt.setOptional(m,C,"batchingIdTexture"),nt.setValue(m,"batchingIdTexture",C._indirectTexture,Ie),nt.setOptional(m,C,"batchingColorTexture"),C._colorsTexture!==null&&nt.setValue(m,"batchingColorTexture",C._colorsTexture,Ie));const Et=I.morphAttributes;if((Et.position!==void 0||Et.normal!==void 0||Et.color!==void 0)&&J.update(C,I,_t),(gt||Ae.receiveShadow!==C.receiveShadow)&&(Ae.receiveShadow=C.receiveShadow,nt.setValue(m,"receiveShadow",C.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(vt.envMap.value=de,vt.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&b.environment!==null&&(vt.envMapIntensity.value=b.environmentIntensity),gt&&(nt.setValue(m,"toneMappingExposure",v.toneMappingExposure),Ae.needsLights&&ka(vt,en),Q&&F.fog===!0&&Z.refreshFogUniforms(vt,Q),Z.refreshMaterialUniforms(vt,F,V,ne,o.state.transmissionRenderTarget[c.id]),Rn.upload(m,Ui(Ae),vt,Ie)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Rn.upload(m,Ui(Ae),vt,Ie),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&nt.setValue(m,"center",C.center),nt.setValue(m,"modelViewMatrix",C.modelViewMatrix),nt.setValue(m,"normalMatrix",C.normalMatrix),nt.setValue(m,"modelMatrix",C.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const ft=F.uniformsGroups;for(let pt=0,Hn=ft.length;pt<Hn;pt++){const yt=ft[pt];ye.update(yt,_t),ye.bind(yt,_t)}}return _t}function ka(c,b){c.ambientLightColor.needsUpdate=b,c.lightProbe.needsUpdate=b,c.directionalLights.needsUpdate=b,c.directionalLightShadows.needsUpdate=b,c.pointLights.needsUpdate=b,c.pointLightShadows.needsUpdate=b,c.spotLights.needsUpdate=b,c.spotLightShadows.needsUpdate=b,c.rectAreaLights.needsUpdate=b,c.hemisphereLights.needsUpdate=b}function za(c){return c.isMeshLambertMaterial||c.isMeshToonMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.isShadowMaterial||c.isShaderMaterial&&c.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(c,b,I){const F=_e.get(c);F.__autoAllocateDepthBuffer=c.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),_e.get(c.texture).__webglTexture=b,_e.get(c.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:I,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(c,b){const I=_e.get(c);I.__webglFramebuffer=b,I.__useDefaultFramebuffer=b===void 0};const Wa=m.createFramebuffer();this.setRenderTarget=function(c,b=0,I=0){H=c,x=b,D=I;let F=!0,C=null,Q=!1,oe=!1;if(c){const de=_e.get(c);if(de.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(m.FRAMEBUFFER,null),F=!1;else if(de.__webglFramebuffer===void 0)Ie.setupRenderTarget(c);else if(de.__hasExternalTextures)Ie.rebindTextures(c,_e.get(c.texture).__webglTexture,_e.get(c.depthTexture).__webglTexture);else if(c.depthBuffer){const xe=c.depthTexture;if(de.__boundDepthTexture!==xe){if(xe!==null&&_e.has(xe)&&(c.width!==xe.image.width||c.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(c)}}const Re=c.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(oe=!0);const we=_e.get(c).__webglFramebuffer;c.isWebGLCubeRenderTarget?(Array.isArray(we[b])?C=we[b][I]:C=we[b],Q=!0):c.samples>0&&Ie.useMultisampledRTT(c)===!1?C=_e.get(c).__webglMultisampledFramebuffer:Array.isArray(we)?C=we[I]:C=we,w.copy(c.viewport),B.copy(c.scissor),K=c.scissorTest}else w.copy(Pe).multiplyScalar(V).floor(),B.copy(Be).multiplyScalar(V).floor(),K=et;if(I!==0&&(C=Wa),me.bindFramebuffer(m.FRAMEBUFFER,C)&&F&&me.drawBuffers(c,C),me.viewport(w),me.scissor(B),me.setScissorTest(K),Q){const de=_e.get(c.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_CUBE_MAP_POSITIVE_X+b,de.__webglTexture,I)}else if(oe){const de=b;for(let Re=0;Re<c.textures.length;Re++){const we=_e.get(c.textures[Re]);m.framebufferTextureLayer(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0+Re,we.__webglTexture,I,de)}}else if(c!==null&&I!==0){const de=_e.get(c.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,de.__webglTexture,I)}p=-1},this.readRenderTargetPixels=function(c,b,I,F,C,Q,oe,pe=0){if(!(c&&c.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=_e.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&oe!==void 0&&(de=de[oe]),de){me.bindFramebuffer(m.FRAMEBUFFER,de);try{const Re=c.textures[pe],we=Re.format,xe=Re.type;if(!Ce.textureFormatReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}b>=0&&b<=c.width-F&&I>=0&&I<=c.height-C&&(c.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+pe),m.readPixels(b,I,F,C,Se.convert(we),Se.convert(xe),Q))}finally{const Re=H!==null?_e.get(H).__webglFramebuffer:null;me.bindFramebuffer(m.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(c,b,I,F,C,Q,oe,pe=0){if(!(c&&c.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=_e.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&oe!==void 0&&(de=de[oe]),de)if(b>=0&&b<=c.width-F&&I>=0&&I<=c.height-C){me.bindFramebuffer(m.FRAMEBUFFER,de);const Re=c.textures[pe],we=Re.format,xe=Re.type;if(!Ce.textureFormatReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=m.createBuffer();m.bindBuffer(m.PIXEL_PACK_BUFFER,Oe),m.bufferData(m.PIXEL_PACK_BUFFER,Q.byteLength,m.STREAM_READ),c.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+pe),m.readPixels(b,I,F,C,Se.convert(we),Se.convert(xe),0);const ze=H!==null?_e.get(H).__webglFramebuffer:null;me.bindFramebuffer(m.FRAMEBUFFER,ze);const it=m.fenceSync(m.SYNC_GPU_COMMANDS_COMPLETE,0);return m.flush(),await Za(m,it,4),m.bindBuffer(m.PIXEL_PACK_BUFFER,Oe),m.getBufferSubData(m.PIXEL_PACK_BUFFER,0,Q),m.deleteBuffer(Oe),m.deleteSync(it),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(c,b=null,I=0){const F=Math.pow(2,-I),C=Math.floor(c.image.width*F),Q=Math.floor(c.image.height*F),oe=b!==null?b.x:0,pe=b!==null?b.y:0;Ie.setTexture2D(c,0),m.copyTexSubImage2D(m.TEXTURE_2D,I,0,0,oe,pe,C,Q),me.unbindTexture()};const Xa=m.createFramebuffer(),Ya=m.createFramebuffer();this.copyTextureToTexture=function(c,b,I=null,F=null,C=0,Q=null){Q===null&&(C!==0?(si("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=C,C=0):Q=0);let oe,pe,de,Re,we,xe,Oe,ze,it;const $e=c.isCompressedTexture?c.mipmaps[Q]:c.image;if(I!==null)oe=I.max.x-I.min.x,pe=I.max.y-I.min.y,de=I.isBox3?I.max.z-I.min.z:1,Re=I.min.x,we=I.min.y,xe=I.isBox3?I.min.z:0;else{const Et=Math.pow(2,-C);oe=Math.floor($e.width*Et),pe=Math.floor($e.height*Et),c.isDataArrayTexture?de=$e.depth:c.isData3DTexture?de=Math.floor($e.depth*Et):de=1,Re=0,we=0,xe=0}F!==null?(Oe=F.x,ze=F.y,it=F.z):(Oe=0,ze=0,it=0);const Ke=Se.convert(b.format),Ae=Se.convert(b.type);let tt;b.isData3DTexture?(Ie.setTexture3D(b,0),tt=m.TEXTURE_3D):b.isDataArrayTexture||b.isCompressedArrayTexture?(Ie.setTexture2DArray(b,0),tt=m.TEXTURE_2D_ARRAY):(Ie.setTexture2D(b,0),tt=m.TEXTURE_2D),m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,b.flipY),m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),m.pixelStorei(m.UNPACK_ALIGNMENT,b.unpackAlignment);const He=m.getParameter(m.UNPACK_ROW_LENGTH),_t=m.getParameter(m.UNPACK_IMAGE_HEIGHT),Vt=m.getParameter(m.UNPACK_SKIP_PIXELS),gt=m.getParameter(m.UNPACK_SKIP_ROWS),en=m.getParameter(m.UNPACK_SKIP_IMAGES);m.pixelStorei(m.UNPACK_ROW_LENGTH,$e.width),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,$e.height),m.pixelStorei(m.UNPACK_SKIP_PIXELS,Re),m.pixelStorei(m.UNPACK_SKIP_ROWS,we),m.pixelStorei(m.UNPACK_SKIP_IMAGES,xe);const nt=c.isDataArrayTexture||c.isData3DTexture,vt=b.isDataArrayTexture||b.isData3DTexture;if(c.isDepthTexture){const Et=_e.get(c),ft=_e.get(b),pt=_e.get(Et.__renderTarget),Hn=_e.get(ft.__renderTarget);me.bindFramebuffer(m.READ_FRAMEBUFFER,pt.__webglFramebuffer),me.bindFramebuffer(m.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let yt=0;yt<de;yt++)nt&&(m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,_e.get(c).__webglTexture,C,xe+yt),m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,_e.get(b).__webglTexture,Q,it+yt)),m.blitFramebuffer(Re,we,oe,pe,Oe,ze,oe,pe,m.DEPTH_BUFFER_BIT,m.NEAREST);me.bindFramebuffer(m.READ_FRAMEBUFFER,null),me.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else if(C!==0||c.isRenderTargetTexture||_e.has(c)){const Et=_e.get(c),ft=_e.get(b);me.bindFramebuffer(m.READ_FRAMEBUFFER,Xa),me.bindFramebuffer(m.DRAW_FRAMEBUFFER,Ya);for(let pt=0;pt<de;pt++)nt?m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,Et.__webglTexture,C,xe+pt):m.framebufferTexture2D(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,Et.__webglTexture,C),vt?m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ft.__webglTexture,Q,it+pt):m.framebufferTexture2D(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,ft.__webglTexture,Q),C!==0?m.blitFramebuffer(Re,we,oe,pe,Oe,ze,oe,pe,m.COLOR_BUFFER_BIT,m.NEAREST):vt?m.copyTexSubImage3D(tt,Q,Oe,ze,it+pt,Re,we,oe,pe):m.copyTexSubImage2D(tt,Q,Oe,ze,Re,we,oe,pe);me.bindFramebuffer(m.READ_FRAMEBUFFER,null),me.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else vt?c.isDataTexture||c.isData3DTexture?m.texSubImage3D(tt,Q,Oe,ze,it,oe,pe,de,Ke,Ae,$e.data):b.isCompressedArrayTexture?m.compressedTexSubImage3D(tt,Q,Oe,ze,it,oe,pe,de,Ke,$e.data):m.texSubImage3D(tt,Q,Oe,ze,it,oe,pe,de,Ke,Ae,$e):c.isDataTexture?m.texSubImage2D(m.TEXTURE_2D,Q,Oe,ze,oe,pe,Ke,Ae,$e.data):c.isCompressedTexture?m.compressedTexSubImage2D(m.TEXTURE_2D,Q,Oe,ze,$e.width,$e.height,Ke,$e.data):m.texSubImage2D(m.TEXTURE_2D,Q,Oe,ze,oe,pe,Ke,Ae,$e);m.pixelStorei(m.UNPACK_ROW_LENGTH,He),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,_t),m.pixelStorei(m.UNPACK_SKIP_PIXELS,Vt),m.pixelStorei(m.UNPACK_SKIP_ROWS,gt),m.pixelStorei(m.UNPACK_SKIP_IMAGES,en),Q===0&&b.generateMipmaps&&m.generateMipmap(tt),me.unbindTexture()},this.initRenderTarget=function(c){_e.get(c).__webglFramebuffer===void 0&&Ie.setupRenderTarget(c)},this.initTexture=function(c){c.isCubeTexture?Ie.setTextureCube(c,0):c.isData3DTexture?Ie.setTexture3D(c,0):c.isDataArrayTexture||c.isCompressedArrayTexture?Ie.setTexture2DArray(c,0):Ie.setTexture2D(c,0),me.unbindTexture()},this.resetState=function(){x=0,D=0,H=null,me.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(n),t.unpackColorSpace=at._getUnpackColorSpace()}}const su=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],lu=`
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
`,cu='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Yr='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',du=(e,n)=>{const t=e==="three";return n==="three"?t?".":"..":t?`${n}/`:`../${n}/`},Kr=e=>e.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),fu=e=>{if(document.getElementById("portal-nav-toggle"))return;const n=document.createElement("style");n.id="portal-nav-styles",n.textContent=lu,document.head.appendChild(n);const t=document.createElement("aside");t.id="portal-nav-drawer",t.setAttribute("aria-hidden","false"),t.setAttribute("aria-label","Portal demos"),t.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${su.map(r=>`
        <li${r.key===e?' class="portal-nav-current"':""}>
          <a href="${du(e,r.key)}"${r.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${Kr(r.label)}</span>
            <span class="portal-nav-desc">${Kr(r.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const i=document.createElement("button");i.id="portal-nav-toggle",i.type="button",i.setAttribute("aria-label","Close demos menu"),i.setAttribute("aria-expanded","true"),i.setAttribute("aria-controls","portal-nav-drawer"),i.innerHTML=Yr,document.body.appendChild(t),document.body.appendChild(i);const a=r=>{t.setAttribute("aria-hidden",r?"false":"true"),i.setAttribute("aria-expanded",r?"true":"false"),i.setAttribute("aria-label",r?"Close demos menu":"Toggle demos menu"),i.innerHTML=r?Yr:cu};i.addEventListener("click",r=>{r.stopPropagation(),a(t.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",r=>{t.getAttribute("aria-hidden")==="true"||r.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||a(!1)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&t.getAttribute("aria-hidden")==="false"&&a(!1)})},uu=(e,n,t={})=>{const i=t.moveSpeed??4,a=t.lookSensitivity??.0025,r=t.lookKeySpeed??1.5;let f=0,l=0;const E=new Set;pu(n,(D,H)=>{f-=D*a,l-=H*a}),window.addEventListener("keydown",D=>E.add(D.code)),window.addEventListener("keyup",D=>E.delete(D.code)),mu(E);const _=new le,A=new le,S=new le,g=D=>{E.has("KeyQ")&&(f+=r*D),E.has("KeyE")&&(f-=r*D),E.has("KeyR")&&(l-=r*D),E.has("KeyF")&&(l+=r*D),l=hu(l),e.quaternion.setFromEuler(new Dn(l,f,0,"YXZ")),A.set(0,0,-1).applyQuaternion(e.quaternion),S.set(1,0,0).applyQuaternion(e.quaternion),_.set(0,0,0),E.has("KeyW")&&_.add(A),E.has("KeyS")&&_.sub(A),E.has("KeyD")&&_.add(S),E.has("KeyA")&&_.sub(S),_.y=0,_.lengthSq()>0&&(_.normalize().multiplyScalar(i*D),e.position.add(_))},T=new St,N=new un,L=new Dn(0,0,0,"YXZ"),d=new le(0,0,0),o=new le,y=new le(0,1,0);return{update:g,setOrientationFromForward:D=>{o.copy(D).normalize(),T.lookAt(d,o,y),N.setFromRotationMatrix(T),L.setFromQuaternion(N,"YXZ"),l=L.x,f=L.y},clearKeys:()=>{E.clear()},getKeys:()=>Array.from(E),setKeys:D=>{E.clear();for(const H of D)E.add(H)}}},pu=(e,n)=>{let t=null,i=0,a=0;e.addEventListener("pointerdown",f=>{if(t===null&&(t=f.pointerId,i=f.clientX,a=f.clientY,f.pointerType!=="mouse"))try{e.setPointerCapture(f.pointerId)}catch{}});const r=f=>{f.pointerId===t&&(t=null)};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),window.addEventListener("pointermove",f=>{if(f.pointerId!==t)return;const l=f.clientX-i,E=f.clientY-a;i=f.clientX,a=f.clientY,n(l,E)})},hu=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),mu=e=>{if(typeof window>"u")return;const n="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,t=()=>n||window.innerWidth<500;if(t()){qr(e);return}const i=()=>{t()&&(window.removeEventListener("resize",i),qr(e))};window.addEventListener("resize",i)},qr=e=>{const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement and look controls"),n.innerHTML=`
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
  `,document.head.appendChild(t),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const a=i.dataset.key,r=l=>{l.preventDefault(),l.stopPropagation(),e.add(a),i.classList.add("is-active");try{i.setPointerCapture(l.pointerId)}catch{}},f=l=>{l.stopPropagation(),e.delete(a),i.classList.remove("is-active")};i.addEventListener("pointerdown",r),i.addEventListener("pointerup",f),i.addEventListener("pointercancel",f),i.addEventListener("pointerleave",f),i.addEventListener("contextmenu",l=>l.preventDefault())}},vi=(e,n)=>[e[0]+n[0],e[1]+n[1],e[2]+n[2]],_u=(e,n)=>[e[0]-n[0],e[1]-n[1],e[2]-n[2]],bn=(e,n)=>[e[0]*n,e[1]*n,e[2]*n],Jn=(e,n)=>e[0]*n[0]+e[1]*n[1]+e[2]*n[2],Zr=(e,n)=>[e[1]*n[2]-e[2]*n[1],e[2]*n[0]-e[0]*n[2],e[0]*n[1]-e[1]*n[0]],an=e=>{const n=Math.hypot(e[0],e[1],e[2]);return n>0?[e[0]/n,e[1]/n,e[2]/n]:[0,0,1]},$r=e=>{const n=an(e.normal),t=an(e.up),i=an(Zr(t,n)),a=an(Zr(n,i));return{right:i,up:a,normal:n}},Ua=(e,n)=>[Jn(e,n.right),Jn(e,n.up),Jn(e,n.normal)],Ia=(e,n)=>vi(vi(bn(n.right,e[0]),bn(n.up,e[1])),bn(n.normal,e[2])),Na=e=>[-e[0],e[1],-e[2]],jr=(e,n,t)=>an(Ia(Na(Ua(e,n)),t)),gu=(e,n)=>{const t=$r(n.source),i=$r(n.target),a=_u(e.position,n.source.position),r=Ua(a,t),f=bn(Na(r),n.scale),l={position:vi(n.target.position,Ia(f,i))};return e.forward&&(l.forward=jr(e.forward,t,i)),e.up&&(l.up=jr(e.up,t,i)),l};new Ti;new le;new dt;new dt;const vu=(e=new We(2,3))=>{const n=new pn(e.x,e.y),t=new Ri({visible:!1}),i=new ut(n,t);return i.name="portal-plane",i.userData.portalSize=e.clone(),i},Eu=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Su=`
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
`,Qt=1,Mu=(e=Qt)=>{const n={portalPos:{value:new le},portalNormal:{value:new le},portalRight:{value:new le},portalUp:{value:new le},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new le},hostInverseViewProjection:{value:new St},hostViewMatrix:{value:new St},hostProjectionMatrix:{value:new St},destinationBackground:{value:new le(0,0,0)}},t=new Dt({uniforms:n,vertexShader:Eu,fragmentShader:Su,depthTest:!0,depthWrite:!1,side:Tt,stencilWrite:!0,stencilFunc:Ra,stencilRef:e,stencilFail:Ht,stencilZFail:Ht,stencilZPass:Aa,stencilWriteMask:255}),i=new ut(new pn(2,2),t);i.frustumCulled=!1;const a=new Ln;a.add(i);const r=new xa(-1,1,1,-1,0,1),f=new St,l=new le(0,0,1),E=new le(1,0,0),_=new le(0,1,0),A=new un;return{scene:a,camera:r,update:(g,T,N)=>{const L=g.userData.portalSize;n.portalHalfW.value=L?L.x/2:1,n.portalHalfH.value=L?L.y/2:1.5,g.getWorldPosition(n.portalPos.value),g.getWorldQuaternion(A),n.portalNormal.value.copy(l).applyQuaternion(A),n.portalRight.value.copy(E).applyQuaternion(A),n.portalUp.value.copy(_).applyQuaternion(A),T.getWorldPosition(n.hostCameraPos.value),f.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),n.hostInverseViewProjection.value.copy(f).invert(),n.hostViewMatrix.value.copy(T.matrixWorldInverse),n.hostProjectionMatrix.value.copy(T.projectionMatrix),n.destinationBackground.value.set(N.r,N.g,N.b)}}},Oa=(e,n)=>{e.traverse(t=>{const i=t;if(!i.isMesh||!i.material)return;const a=Array.isArray(i.material)?i.material:[i.material];for(const r of a)n(r)})},Tu=(e,n=Qt)=>{Oa(e,t=>{t.stencilWrite=!0,t.stencilFunc=ps,t.stencilRef=n,t.stencilFail=Ht,t.stencilZFail=Ht,t.stencilZPass=Ht,t.stencilWriteMask=0})},xu=e=>{Oa(e,n=>{n.stencilWrite=!1})};new le;const ei=new un,Sn=new le,Mn=new le,Tn=new le,Au=(e,n)=>n||(e.background instanceof ke?e.background:new ke(0,0,0)),Ru=e=>{const{scene:n,anchor:t}=e,i=e.portalNormal??new le(0,0,1),a=e.stencilRef??Qt;return{scene:n,anchor:t,getAnchor:()=>{t.getWorldPosition(Sn),t.getWorldQuaternion(ei),Mn.copy(i).applyQuaternion(ei).normalize(),Tn.set(0,1,0).applyQuaternion(ei).normalize();const l=t.userData.portalSize;return{position:[Sn.x,Sn.y,Sn.z],normal:[Mn.x,Mn.y,Mn.z],up:[Tn.x,Tn.y,Tn.z],halfWidth:l?l.x/2:void 0,halfHeight:l?l.y/2:void 0}},getBackground:()=>{const l=Au(n,e.background);return{r:l.r,g:l.g,b:l.b}},tick:e.tick,renderAsSource(l,E){l.render(n,E)},renderAsDestination(l,E){const _=n.background;n.background=null,Tu(n,a),l.render(n,E),xu(n),n.background=_}}},bu=new Set(["bufferData","bufferSubData","texImage2D","texSubImage2D","texImage3D","texSubImage3D","compressedTexImage2D","compressedTexSubImage2D","compressedTexImage3D","compressedTexSubImage3D","texStorage2D","texStorage3D","renderbufferStorage","renderbufferStorageMultisample","generateMipmap","shaderSource","compileShader","attachShader","linkProgram"]),Cu=1e3,wu=e=>{const n=e.reproject??null,t=hs(e.gl,n?{...e.replay,reproject:!0}:e.replay),i=n?.frameView??(P=>typeof P.viewId=="number"?P.viewId:null),a=e.onError??(P=>console.error("[netgl-host] replay error:",P)),r=new Set;let f=null,l=[],E=null,_=null,A=!1,S=[],g=[],T=[];const N=new Set,L=e.wire??ms,d=e.transport.outputOrigin,o=e.messageChannel!==!1&&typeof MessageChannel<"u"&&typeof d=="string"&&d!=="*"&&d!=="null";let y=1,R=0,v=0,O=0,x=null,D="none",H=null,p=null,u=0,w=0,B=[],K=!1,X=null,q=null;const W=P=>{if(gr(P))return l.push(P),!0;if(vr(P)){const $={at:E?E.length:0,viewId:i(P)};E?E.push(...l):E=l,S.push($),l=[];for(const ue of N)ue(P);return!0}return!1},ne=P=>{q&&clearTimeout(q),q=null;const $=X??[];X=null,K=P&&x!==null;for(const[ue,ce]of $)Ge(ue,ce)},V=()=>{x&&(x.onmessage=null,x.close()),x=null,D="none",B=[],X&&ne(!1),K=!1},ge=P=>{const $=Math.min(L,typeof P.wire=="number"?P.wire:1),ue=$>=2?{type:"netgl:ready-ack",wire:$}:{type:"netgl:ready-ack"};$>=2&&(y=2,typeof P.seq=="number"&&(ue.seq=P.seq));const ce=typeof P.session=="string"?P.session:null;if($>=2&&(P.port==="stream"||P.port==="all")&&o&&(D==="none"||ce!==null&&ce!==H)){V();const Qe=new MessageChannel;x=Qe.port1,D="offered",H=ce,p={seq:typeof P.seq=="number"?P.seq:0,windowItems:u,control:P.port==="all"},x.onmessage=m=>et(m.data),ue.port=Qe.port2,e.transport.post(ue,[Qe.port2]),p.control&&(X=[],q=setTimeout(()=>ne(!1),Cu))}else e.transport.post(ue);f||(f=P,e.onReady?.(f))},Te=P=>{if(W(P))return;if(Er(P)){O+=1;for(const ue of P.batch)W(ue);return}if(P.type==="netgl:ready"){ge(P);return}e.onControl?.(P)},Pe=P=>gr(P)||vr(P)?1:Er(P)?P.batch.length:0,Be=()=>{if(B.length===0||u<w)return;const P=B;B=[];for(const $ of P)R+=1,v+=Pe($),Te($)},et=P=>{if(!(!P||typeof P!="object")){if(P.type==="netgl:port"&&D==="offered"&&p){const $=P;D="open",w=p.windowItems+Math.max(0,($.after??0)-p.seq),X&&ne(p.control);return}if(B.length>0||u<w){B.push(P);return}R+=1,v+=Pe(P),Te(P)}};let Ze=e.transport.onMessage(P=>{R+=1;const $=Pe(P);v+=$,u+=$,Te(P),$>0&&Be()});const Ge=(P,$)=>{if(X){X.push([P,$]);return}K&&x?x.postMessage(P,$??[]):e.transport.post(P,$)},z=(P,$,ue)=>{t.invalidate();let ce=0;for(let Ue=0;Ue<P.length;Ue+=1){for(;n&&ce<$.length&&$[ce].at<=Ue;)t.setReprojection(n.correction($[ce].viewId)),n.viewport&&t.setViewportRemap(n.viewport($[ce].viewId)),ce+=1;const Qe=P[Ue];if(!(ue&&(Qe.returnId!==void 0||bu.has(Qe.name))))try{t(Qe)}catch(m){const Ye=m instanceof Error?m.message:String(m);r.has(Ye)||(r.add(Ye),a(m))}}n&&(t.setReprojection(null),t.setViewportRemap(null))};return{get ready(){return f},get hasFrame(){return _!==null||E!==null},get canRerun(){return _!==null&&A},replay:t,post:Ge,wire:{get version(){return y},get port(){return D},get controlOnPort(){return K},get messages(){return R},get items(){return v},get batches(){return O}},onFrame(P){return N.add(P),()=>{N.delete(P)}},get drainedViews(){return T},drain(){if(E){const P=E,$=S;return E=null,S=[],_=P,g=$,A=!P.some(ue=>ue.name.startsWith("delete")),T=$.map(ue=>ue.viewId),z(P,$,!1),!0}return _&&A?(T=g.map(P=>P.viewId),z(_,g,!0),!0):!1},stop(){Ze?.(),Ze=null,V(),N.clear()}}},Pu=1e3,Fa=e=>(n,t,i,a)=>{const r=e(),f=r.guestSize;if(!f)return null;const l=r.canvasSize(),E=l.width/f.width,_=l.height/f.height;return[Math.round(n*E),Math.round(t*_),Math.round(i*E),Math.round(a*_)]},Ba=e=>{const n=new ou({antialias:!1,stencil:!0,depth:!0});n.outputColorSpace=la,n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),n.autoClear=!1,e.mount.appendChild(n.domElement);const t=_s({output:e.iframe.contentWindow,inputFilter:e.iframe.contentWindow});let i=0,a=0,r=0;const f=new Set;let l=null;const E=()=>l,_=wu({gl:n.getContext(),transport:t,replay:e.replay(E),onControl:A=>{const S=A;if(S.type==="cesium:rendered"){const g=A;a=g.seq,l.guestSize={width:g.width,height:g.height}}else if(S.type==="cesium:error"){const g=A.message;f.has(g)||(f.add(g),console.error("[cesium guest]",g),e.onStatus(`Cesium error: ${g.split(`
`)[0]}`))}},onError:A=>{console.error("[netgl host] replay error:",A),e.onStatus(`Replay error: ${A instanceof Error?A.message:String(A)}`)}});return l={renderer:n,receiver:_,guestSize:null,canvasSize:()=>{const A=n.getDrawingBufferSize(new We);return{width:A.x,height:A.y}},tick(A,S){const g=performance.now();if(a<i&&g-r<Pu)return null;i+=1,r=g;const T={type:"cesium:tick",seq:i,time:A,view:S};return t.post(T),i},lag:()=>i-a},l},Du=4e6,Lu=-60,yu=20,ti=16e6,Uu=e=>{const n=Ba({...e,replay:x=>({remapScreenViewport:Fa(x),screen:{stencil:{ref:Qt},clear:"depth-only"}})}),{renderer:t,receiver:i}=n,a=new qt(70,window.innerWidth/window.innerHeight,.02,200);a.position.set(0,1.6,5.5);const r=new Ln;r.background=new ke("#101826"),r.add(new gs(12176639,2241348,1));const f=new ba(16777215,.65);f.position.set(3,6,2),r.add(f);const l=new ut(new pn(18,18),new yn({color:"#1b2a3f",roughness:.95,metalness:.03}));l.rotation.x=-Math.PI/2,r.add(l);const E=new Ai(.9,.9,.9),_=new yn({color:"#5da9ff",roughness:.35});for(let x=0;x<14;x+=1){const D=new ut(E,_);D.position.set(Math.sin(x*.5)*4,.45,-3-x*.65),r.add(D)}const A=vu(new We(2.6,3.2));A.position.set(0,1.6,-3.5),r.add(A);const S=Ru({scene:r,anchor:A}),g=Mu(),T=new ke("#000000"),N=Iu(),L=uu(a,t.domElement);window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix()});const d=new le,o=new le,y=new le,R=()=>{a.updateMatrixWorld(),a.getWorldPosition(d),a.getWorldDirection(o),y.set(0,1,0).applyQuaternion(a.quaternion);const x=gu({position:[d.x,d.y,d.z],forward:[o.x,o.y,o.z],up:[y.x,y.y,y.z]},{source:S.getAnchor(),target:N,scale:Du});return{position:x.position,direction:x.forward,up:x.up,fovy:Pt.degToRad(a.fov)}},v=new Ca;n.tick(0,R());const O=()=>{t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,a),i.ready&&(g.update(A,a,T),t.render(g.scene,g.camera),t.clearDepth(),i.drain(),t.resetState()),L.update(v.getDelta()),n.tick(v.elapsedTime,R()),requestAnimationFrame(O)};O()},Iu=()=>{const e=Pt.degToRad(Lu),n=Pt.degToRad(yu),t=new le(Math.cos(n)*Math.cos(e),Math.cos(n)*Math.sin(e),Math.sin(n)),i=new le(0,0,1).addScaledVector(t,-t.z).normalize();return{position:[t.x*ti,t.y*ti,t.z*ti],normal:[-t.x,-t.y,-t.z],up:[i.x,i.y,i.z]}},Qr={type:"change"},Ci={type:"start"},Ha={type:"end"},xn=new Es,Jr=new Ti,Nu=Math.cos(70*Pt.DEG2RAD),ot=new le,ht=2*Math.PI,Xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ni=1e-6;class Ou extends vs{constructor(n,t=null){super(n,t),this.state=Xe.NONE,this.target=new le,this.cursor=new le,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zt.ROTATE,MIDDLE:Zt.DOLLY,RIGHT:Zt.PAN},this.touches={ONE:Yt.ROTATE,TWO:Yt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new le,this._lastQuaternion=new un,this._lastTargetPosition=new le,this._quat=new un().setFromUnitVectors(n.up,new le(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Sr,this._sphericalDelta=new Sr,this._scale=1,this._panOffset=new le,this._rotateStart=new We,this._rotateEnd=new We,this._rotateDelta=new We,this._panStart=new We,this._panEnd=new We,this._panDelta=new We,this._dollyStart=new We,this._dollyEnd=new We,this._dollyDelta=new We,this._dollyDirection=new le,this._mouse=new We,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Bu.bind(this),this._onPointerDown=Fu.bind(this),this._onPointerUp=Hu.bind(this),this._onContextMenu=Yu.bind(this),this._onMouseWheel=ku.bind(this),this._onKeyDown=zu.bind(this),this._onTouchStart=Wu.bind(this),this._onTouchMove=Xu.bind(this),this._onMouseDown=Gu.bind(this),this._onMouseMove=Vu.bind(this),this._interceptControlDown=Ku.bind(this),this._interceptControlUp=qu.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Qr),this.update(),this.state=Xe.NONE}update(n=null){const t=this.object.position;ot.copy(t).sub(this.target),ot.applyQuaternion(this._quat),this._spherical.setFromVector3(ot),this.autoRotate&&this.state===Xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(i)&&isFinite(a)&&(i<-Math.PI?i+=ht:i>Math.PI&&(i-=ht),a<-Math.PI?a+=ht:a>Math.PI&&(a-=ht),i<=a?this._spherical.theta=Math.max(i,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+a)/2?Math.max(i,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=f!=this._spherical.radius}if(ot.setFromSpherical(this._spherical),ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const l=ot.length();f=this._clampDistance(l*this._scale);const E=l-f;this.object.position.addScaledVector(this._dollyDirection,E),this.object.updateMatrixWorld(),r=!!E}else if(this.object.isOrthographicCamera){const l=new le(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const E=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=E!==this.object.zoom;const _=new le(this._mouse.x,this._mouse.y,0);_.unproject(this.object),this.object.position.sub(_).add(l),this.object.updateMatrixWorld(),f=ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(xn.origin.copy(this.object.position),xn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(xn.direction))<Nu?this.object.lookAt(this.target):(Jr.setFromNormalAndCoplanarPoint(this.object.up,this.target),xn.intersectPlane(Jr,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ni||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ni||this._lastTargetPosition.distanceToSquared(this.target)>ni?(this.dispatchEvent(Qr),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?ht/60*this.autoRotateSpeed*n:ht/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){ot.setFromMatrixColumn(t,0),ot.multiplyScalar(-n),this._panOffset.add(ot)}_panUp(n,t){this.screenSpacePanning===!0?ot.setFromMatrixColumn(t,1):(ot.setFromMatrixColumn(t,0),ot.crossVectors(this.object.up,ot)),ot.multiplyScalar(n),this._panOffset.add(ot)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;ot.copy(a).sub(this.target);let r=ot.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),a=n-i.left,r=t-i.top,f=i.width,l=i.height;this._mouse.x=a/f*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),a=.5*(n.pageY+t.y);this._rotateStart.set(i,a)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),a=.5*(n.pageY+t.y);this._panStart.set(i,a)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,a=n.pageY-t.y,r=Math.sqrt(i*i+a*a);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),a=.5*(n.pageX+i.x),r=.5*(n.pageY+i.y);this._rotateEnd.set(a,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),a=.5*(n.pageY+t.y);this._panEnd.set(i,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,a=n.pageY-t.y,r=Math.sqrt(i*i+a*a);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(n.pageX+t.x)*.5,l=(n.pageY+t.y)*.5;this._updateZoomParameters(f,l)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new We,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Fu(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function Bu(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function Hu(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ha),this.state=Xe.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function Gu(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=Xe.DOLLY;break;case Zt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Xe.ROTATE}break;case Zt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Xe.PAN}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent(Ci)}function Vu(e){switch(this.state){case Xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function ku(e){this.enabled===!1||this.enableZoom===!1||this.state!==Xe.NONE||(e.preventDefault(),this.dispatchEvent(Ci),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Ha))}function zu(e){this.enabled!==!1&&this._handleKeyDown(e)}function Wu(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Yt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Xe.TOUCH_ROTATE;break;case Yt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Xe.TOUCH_PAN;break;default:this.state=Xe.NONE}break;case 2:switch(this.touches.TWO){case Yt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Xe.TOUCH_DOLLY_PAN;break;case Yt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Xe.TOUCH_DOLLY_ROTATE;break;default:this.state=Xe.NONE}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent(Ci)}function Xu(e){switch(this._trackPointer(e),this.state){case Xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Xe.NONE}}function Yu(e){this.enabled!==!1&&e.preventDefault()}function Ku(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qu(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const wi=1e6,zt=6378137/wi,ea=6356752314245e-6/wi,ii=1.025,Zu=.05,$u=e=>{const n=Ba({...e,replay:H=>({remapScreenViewport:Fa(H),screen:{stencil:{ref:Qt},blend:"premultiplied-over",clear:"depth-only"}})}),{renderer:t,receiver:i}=n,a=new qt(40,window.innerWidth/window.innerHeight,.01,2e4);a.position.set(6,2.5,26);const r=new Ln;r.background=new ke("#000000");const f=new le(1,.25,.6).normalize(),l=new ba(16777215,2.2);l.position.copy(f).multiplyScalar(100),r.add(l),r.add(new Ss(2241348,.25)),r.add(Qu());const E=new Yn;E.rotation.z=Pt.degToRad(23.4),r.add(E);const _=new Yn;E.add(_);const A=new Mr(1,128,96),S=new ut(A,new yn({color:"#1d4f91",roughness:.8}));S.scale.set(zt,ea,zt),_.add(S);const g=new Ln,T=new ut(A,new Ri({side:Tt,colorWrite:!1,depthWrite:!1,depthTest:!0,stencilWrite:!0,stencilRef:Qt,stencilFunc:Ra,stencilZPass:Aa,stencilFail:Ht,stencilZFail:Ht}));g.add(T);const N=new Yn;N.rotation.x=Pt.degToRad(-8),r.add(N);const L=new ut(new Mr(1.737,64,48),new yn({color:"#b8b4ac",roughness:.95}));N.add(L);const d=new Ou(a,t.domElement);d.enableDamping=!0,d.minDistance=zt*1.02,d.maxDistance=400,d.zoomSpeed=.6,d.rotateSpeed=.5;const o=()=>{const H=a.position.length()-zt;d.rotateSpeed=Pt.clamp(H/20,.02,.5)};window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix()});const y=new Ca;let R=e.startTime??0;const v=()=>{_.rotation.y=R*Zu;const H=R*.12;L.position.set(Math.cos(H)*16,0,Math.sin(H)*16),r.updateMatrixWorld(),T.matrixAutoUpdate=!1,T.matrix.copy(_.matrixWorld).multiply(new St().makeScale(zt*ii,ea*ii,zt*ii)),T.matrixWorldNeedsUpdate=!0};let O=0;const x=()=>(a.updateMatrixWorld(),n.tick(R,ju(a,_)));v(),x();const D=()=>{const H=i.hasFrame;S.visible=!H,t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,a),H&&(t.render(g,a),t.clearDepth(),i.drain(),t.resetState());const p=Math.min(y.getDelta(),.1);e.paused||(R+=p),o(),d.update(p),v(),x()===null?O+=1:O=0,e.onLag(O),requestAnimationFrame(D)};D()},ri=new St,ta=new le,na=new le,ia=new le,ai=new Fe,oi=(e,n)=>[e.x*n,-e.z*n,e.y*n],ju=(e,n)=>(ri.copy(n.matrixWorld).invert(),ai.setFromMatrix4(ri),ta.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ri),e.getWorldDirection(na).applyMatrix3(ai).normalize(),ia.set(0,1,0).applyQuaternion(e.quaternion).applyMatrix3(ai).normalize(),{position:oi(ta,wi),direction:oi(na,1),up:oi(ia,1),fovy:Pt.degToRad(e.fov)}),Qu=()=>{const n=new Float32Array(12e3),t=new le;let i=7;const a=()=>(i=i*16807%2147483647,i/2147483647);for(let f=0;f<4e3;f+=1)t.set(a()*2-1,a()*2-1,a()*2-1).normalize().multiplyScalar(5e3),n.set([t.x,t.y,t.z],f*3);const r=new xi;return r.setAttribute("position",new sn(n,3)),new Ms(r,new Ts({color:16777215,size:1.6,sizeAttenuation:!1}))};fu("netgl-cesium");const Fn=xs(location.search),Ei=new URLSearchParams(location.search),ra=document.querySelector("#app"),Si=document.querySelector("#guest"),aa=document.querySelector("#status"),Ju=document.querySelector("#lag"),Ga=new URLSearchParams({mode:Fn}),oa=Ei.get("imagery");oa&&Ga.set("imagery",oa);Si.src=`cesium.html?${Ga}`;document.querySelectorAll("a[data-mode]").forEach(e=>{const n=new URLSearchParams(location.search);n.set("mode",e.dataset.mode),e.href=`?${n}`,e.dataset.mode===Fn&&e.classList.add("current")});document.querySelector(`[data-help="${Fn}"]`).hidden=!1;const sa=e=>{aa.textContent=e,aa.hidden=!1};Fn==="earth"?$u({iframe:Si,mount:ra,onStatus:sa,startTime:Number(Ei.get("time")??0),paused:Ei.has("pause"),onLag:e=>{Ju.textContent=String(Math.max(0,e))}}):Uu({iframe:Si,mount:ra,onStatus:sa});
