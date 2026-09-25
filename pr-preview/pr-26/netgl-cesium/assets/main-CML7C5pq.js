import{c as kr,N as wt,S as lr,C as Ye,F as cr,M as St,V as ce,R as zr,a as ft,w as ci,W as Oi,b as Zt,d as at,L as tn,H as Nn,U as Bt,D as Tt,B as Mt,e as sn,f as On,p as Wr,E as Xr,g as ke,P as Kt,A as Yr,h as kn,i as Ct,j as bn,k as Ti,l as ln,m as cn,n as fr,o as Kr,q as zt,r as Cn,s as qr,t as $r,u as en,O as Zr,v as jr,x as Qr,y as Jr,z as eo,G as to,I as no,J as io,K as ao,Q as ro,T as oo,X as so,Y as lo,Z as co,_ as fo,$ as uo,a0 as po,a1 as ho,a2 as zn,a3 as Wt,a4 as hn,a5 as mo,a6 as an,a7 as _o,a8 as go,a9 as vo,aa as Eo,ab as dr,ac as So,ad as Mo,ae as To,af as xi,ag as Fe,ah as xo,ai as Ao,aj as Ro,ak as Pt,al as Ai,am as rn,an as ut,ao as ur,ap as Ft,aq as bt,ar as wn,as as pr,at as hr,au as mr,av as dn,aw as bo,ax as Co,ay as wo,az as Po,aA as _r,aB as Ot,aC as Do,aD as Lo,aE as yo,aF as gr,aG as Uo,aH as vr,aI as Er,aJ as Wn,aK as Xn,aL as Yn,aM as Kn,aN as $e,aO as Fi,aP as Bi,aQ as Hi,aR as Gi,aS as Vi,aT as ki,aU as zi,aV as Wi,aW as Xi,aX as Yi,aY as Ki,aZ as qi,a_ as $i,a$ as Zi,b0 as ji,b1 as Qi,b2 as Ji,b3 as ea,b4 as ta,b5 as na,b6 as ia,b7 as aa,b8 as ra,b9 as oa,ba as sa,bb as la,bc as ca,bd as fa,be as fi,bf as di,bg as ui,bh as pi,bi as hi,bj as mi,bk as _i,bl as Io,bm as da,bn as No,bo as An,bp as Oo,bq as ua,br as pa,bs as ha,bt as gi,bu as vi,bv as Fo,bw as Sr,bx as Bo,by as Fn,bz as Ho,bA as Go,bB as Mr,bC as Ri,bD as ma,bE as Pn,bF as _a,bG as Tr,bH as fn,bI as jt,bJ as xr,bK as bi,bL as Vo,bM as ko,bN as zo,bO as ga,bP as mt,bQ as Wo,bR as Xo,bS as Yo,bT as Ko,bU as qo,bV as $o,bW as Zo,bX as jo,bY as Qo,bZ as Jo,b_ as es,b$ as ts,c0 as ns,c1 as is,c2 as as,c3 as rs,c4 as os,c5 as ss,c6 as Dn,c7 as Ar,c8 as Ln,c9 as Rr,ca as yn,cb as ls,cc as cs,cd as br,ce as Un,cf as Cr,cg as fs,ch as qt,ci as Xt,cj as va,ck as ds,cl as on,cm as us,cn as qn,co as Ea,cp as ps,cq as hs,cr as ms}from"./protocol-BOEx8d3e.js";function wr(){let e=null,n=!1,t=null,i=null;function o(r,f){t(r,f),i=e.requestAnimationFrame(o)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(o),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function _s(e){const n=new WeakMap;function t(d,S){const E=d.array,C=d.usage,m=E.byteLength,v=e.createBuffer();e.bindBuffer(S,v),e.bufferData(S,E,C),d.onUploadCallback();let T;if(E instanceof Float32Array)T=e.FLOAT;else if(typeof Float16Array<"u"&&E instanceof Float16Array)T=e.HALF_FLOAT;else if(E instanceof Uint16Array)d.isFloat16BufferAttribute?T=e.HALF_FLOAT:T=e.UNSIGNED_SHORT;else if(E instanceof Int16Array)T=e.SHORT;else if(E instanceof Uint32Array)T=e.UNSIGNED_INT;else if(E instanceof Int32Array)T=e.INT;else if(E instanceof Int8Array)T=e.BYTE;else if(E instanceof Uint8Array)T=e.UNSIGNED_BYTE;else if(E instanceof Uint8ClampedArray)T=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+E);return{buffer:v,type:T,bytesPerElement:E.BYTES_PER_ELEMENT,version:d.version,size:m}}function i(d,S,E){const C=S.array,m=S.updateRanges;if(e.bindBuffer(E,d),m.length===0)e.bufferSubData(E,0,C);else{m.sort((T,N)=>T.start-N.start);let v=0;for(let T=1;T<m.length;T++){const N=m[v],L=m[T];L.start<=N.start+N.count+1?N.count=Math.max(N.count,L.start+L.count-N.start):(++v,m[v]=L)}m.length=v+1;for(let T=0,N=m.length;T<N;T++){const L=m[T];e.bufferSubData(E,L.start*C.BYTES_PER_ELEMENT,C,L.start,L.count)}S.clearUpdateRanges()}S.onUploadCallback()}function o(d){return d.isInterleavedBufferAttribute&&(d=d.data),n.get(d)}function r(d){d.isInterleavedBufferAttribute&&(d=d.data);const S=n.get(d);S&&(e.deleteBuffer(S.buffer),n.delete(d))}function f(d,S){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const C=n.get(d);(!C||C.version<d.version)&&n.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const E=n.get(d);if(E===void 0)n.set(d,t(d,S));else if(E.version<d.version){if(E.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(E.buffer,d,S),E.version=d.version}}return{get:o,remove:r,update:f}}var gs=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vs=`#ifdef USE_ALPHAHASH
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
#endif`,Es=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ss=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ms=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ts=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xs=`#ifdef USE_AOMAP
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
#endif`,As=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rs=`#ifdef USE_BATCHING
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
#endif`,bs=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cs=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ws=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ps=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ds=`#ifdef USE_IRIDESCENCE
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
#endif`,Ls=`#ifdef USE_BUMPMAP
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
#endif`,ys=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Us=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Is=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ns=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Os=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Fs=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Bs=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Hs=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Gs=`#define PI 3.141592653589793
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
} // validated`,Vs=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ks=`vec3 transformedNormal = objectNormal;
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
#endif`,zs=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ws=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xs=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ys=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ks="gl_FragColor = linearToOutputTexel( gl_FragColor );",qs=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$s=`#ifdef USE_ENVMAP
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
#endif`,Zs=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,js=`#ifdef USE_ENVMAP
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
#endif`,Qs=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Js=`#ifdef USE_ENVMAP
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
#endif`,el=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tl=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nl=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,il=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,al=`#ifdef USE_GRADIENTMAP
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
}`,rl=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ol=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ll=`uniform bool receiveShadow;
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
#endif`,cl=`#ifdef USE_ENVMAP
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
#endif`,fl=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ul=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hl=`PhysicalMaterial material;
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
#endif`,ml=`struct PhysicalMaterial {
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
}`,_l=`
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
#endif`,gl=`#if defined( RE_IndirectDiffuse )
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
#endif`,vl=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,El=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ml=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xl=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Al=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rl=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bl=`#if defined( USE_POINTS_UV )
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
#endif`,Cl=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wl=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pl=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dl=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ll=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yl=`#ifdef USE_MORPHTARGETS
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
#endif`,Ul=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Il=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Nl=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ol=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bl=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Hl=`#ifdef USE_NORMALMAP
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
#endif`,Gl=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vl=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kl=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zl=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wl=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xl=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yl=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ql=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$l=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zl=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jl=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ql=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jl=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ec=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tc=`float getShadowMask() {
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
}`,nc=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ic=`#ifdef USE_SKINNING
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
#endif`,ac=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rc=`#ifdef USE_SKINNING
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
#endif`,oc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sc=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lc=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cc=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fc=`#ifdef USE_TRANSMISSION
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
#endif`,dc=`#ifdef USE_TRANSMISSION
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
#endif`,uc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mc=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _c=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gc=`uniform sampler2D t2D;
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
}`,vc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ec=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Sc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mc=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tc=`#include <common>
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
}`,xc=`#if DEPTH_PACKING == 3200
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
}`,Ac=`#define DISTANCE
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
}`,Rc=`#define DISTANCE
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
}`,bc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cc=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wc=`uniform float scale;
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
}`,Pc=`uniform vec3 diffuse;
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
}`,Dc=`#include <common>
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
}`,Lc=`uniform vec3 diffuse;
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
}`,yc=`#define LAMBERT
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
}`,Uc=`#define LAMBERT
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
}`,Ic=`#define MATCAP
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
}`,Nc=`#define MATCAP
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
}`,Oc=`#define NORMAL
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
}`,Fc=`#define NORMAL
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
}`,Bc=`#define PHONG
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
}`,Hc=`#define PHONG
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
}`,Gc=`#define STANDARD
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
}`,Vc=`#define STANDARD
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
}`,kc=`#define TOON
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
}`,zc=`#define TOON
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
}`,Wc=`uniform float size;
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
}`,Xc=`uniform vec3 diffuse;
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
}`,Yc=`#include <common>
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
}`,Kc=`uniform vec3 color;
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
}`,qc=`uniform float rotation;
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
}`,$c=`uniform vec3 diffuse;
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
}`,Ie={alphahash_fragment:gs,alphahash_pars_fragment:vs,alphamap_fragment:Es,alphamap_pars_fragment:Ss,alphatest_fragment:Ms,alphatest_pars_fragment:Ts,aomap_fragment:xs,aomap_pars_fragment:As,batching_pars_vertex:Rs,batching_vertex:bs,begin_vertex:Cs,beginnormal_vertex:ws,bsdfs:Ps,iridescence_fragment:Ds,bumpmap_pars_fragment:Ls,clipping_planes_fragment:ys,clipping_planes_pars_fragment:Us,clipping_planes_pars_vertex:Is,clipping_planes_vertex:Ns,color_fragment:Os,color_pars_fragment:Fs,color_pars_vertex:Bs,color_vertex:Hs,common:Gs,cube_uv_reflection_fragment:Vs,defaultnormal_vertex:ks,displacementmap_pars_vertex:zs,displacementmap_vertex:Ws,emissivemap_fragment:Xs,emissivemap_pars_fragment:Ys,colorspace_fragment:Ks,colorspace_pars_fragment:qs,envmap_fragment:$s,envmap_common_pars_fragment:Zs,envmap_pars_fragment:js,envmap_pars_vertex:Qs,envmap_physical_pars_fragment:cl,envmap_vertex:Js,fog_vertex:el,fog_pars_vertex:tl,fog_fragment:nl,fog_pars_fragment:il,gradientmap_pars_fragment:al,lightmap_pars_fragment:rl,lights_lambert_fragment:ol,lights_lambert_pars_fragment:sl,lights_pars_begin:ll,lights_toon_fragment:fl,lights_toon_pars_fragment:dl,lights_phong_fragment:ul,lights_phong_pars_fragment:pl,lights_physical_fragment:hl,lights_physical_pars_fragment:ml,lights_fragment_begin:_l,lights_fragment_maps:gl,lights_fragment_end:vl,logdepthbuf_fragment:El,logdepthbuf_pars_fragment:Sl,logdepthbuf_pars_vertex:Ml,logdepthbuf_vertex:Tl,map_fragment:xl,map_pars_fragment:Al,map_particle_fragment:Rl,map_particle_pars_fragment:bl,metalnessmap_fragment:Cl,metalnessmap_pars_fragment:wl,morphinstance_vertex:Pl,morphcolor_vertex:Dl,morphnormal_vertex:Ll,morphtarget_pars_vertex:yl,morphtarget_vertex:Ul,normal_fragment_begin:Il,normal_fragment_maps:Nl,normal_pars_fragment:Ol,normal_pars_vertex:Fl,normal_vertex:Bl,normalmap_pars_fragment:Hl,clearcoat_normal_fragment_begin:Gl,clearcoat_normal_fragment_maps:Vl,clearcoat_pars_fragment:kl,iridescence_pars_fragment:zl,opaque_fragment:Wl,packing:Xl,premultiplied_alpha_fragment:Yl,project_vertex:Kl,dithering_fragment:ql,dithering_pars_fragment:$l,roughnessmap_fragment:Zl,roughnessmap_pars_fragment:jl,shadowmap_pars_fragment:Ql,shadowmap_pars_vertex:Jl,shadowmap_vertex:ec,shadowmask_pars_fragment:tc,skinbase_vertex:nc,skinning_pars_vertex:ic,skinning_vertex:ac,skinnormal_vertex:rc,specularmap_fragment:oc,specularmap_pars_fragment:sc,tonemapping_fragment:lc,tonemapping_pars_fragment:cc,transmission_fragment:fc,transmission_pars_fragment:dc,uv_pars_fragment:uc,uv_pars_vertex:pc,uv_vertex:hc,worldpos_vertex:mc,background_vert:_c,background_frag:gc,backgroundCube_vert:vc,backgroundCube_frag:Ec,cube_vert:Sc,cube_frag:Mc,depth_vert:Tc,depth_frag:xc,distanceRGBA_vert:Ac,distanceRGBA_frag:Rc,equirect_vert:bc,equirect_frag:Cc,linedashed_vert:wc,linedashed_frag:Pc,meshbasic_vert:Dc,meshbasic_frag:Lc,meshlambert_vert:yc,meshlambert_frag:Uc,meshmatcap_vert:Ic,meshmatcap_frag:Nc,meshnormal_vert:Oc,meshnormal_frag:Fc,meshphong_vert:Bc,meshphong_frag:Hc,meshphysical_vert:Gc,meshphysical_frag:Vc,meshtoon_vert:kc,meshtoon_frag:zc,points_vert:Wc,points_frag:Xc,shadow_vert:Yc,shadow_frag:Kc,sprite_vert:qc,sprite_frag:$c},ie={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},At={basic:{uniforms:mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:mt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:mt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:mt([ie.points,ie.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:mt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:mt([ie.common,ie.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:mt([ie.sprite,ie.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:mt([ie.common,ie.displacementmap,{referencePosition:{value:new ce},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:mt([ie.lights,ie.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};At.physical={uniforms:mt([At.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const mn={r:0,b:0,g:0},yt=new Pn,Zc=new St;function jc(e,n,t,i,o,r,f){const d=new Ye(0);let S=r===!0?0:1,E,C,m=null,v=0,T=null;function N(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?t:n).get(_)),_}function L(x){let _=!1;const w=N(x);w===null?a(d,S):w&&w.isColor&&(a(w,1),_=!0);const R=e.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,f):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,f),(e.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function s(x,_){const w=N(_);w&&(w.isCubeTexture||w.mapping===Fn)?(C===void 0&&(C=new ut(new Ri(1,1,1),new Pt({name:"BackgroundCubeMaterial",uniforms:ma(At.backgroundCube.uniforms),vertexShader:At.backgroundCube.vertexShader,fragmentShader:At.backgroundCube.fragmentShader,side:Mt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),C.geometry.deleteAttribute("normal"),C.geometry.deleteAttribute("uv"),C.onBeforeRender=function(R,b,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(C.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(C)),yt.copy(_.backgroundRotation),yt.x*=-1,yt.y*=-1,yt.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(yt.y*=-1,yt.z*=-1),C.material.uniforms.envMap.value=w,C.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,C.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,C.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,C.material.uniforms.backgroundRotation.value.setFromMatrix4(Zc.makeRotationFromEuler(yt)),C.material.toneMapped=at.getTransfer(w.colorSpace)!==$e,(m!==w||v!==w.version||T!==e.toneMapping)&&(C.material.needsUpdate=!0,m=w,v=w.version,T=e.toneMapping),C.layers.enableAll(),x.unshift(C,C.geometry,C.material,0,0,null)):w&&w.isTexture&&(E===void 0&&(E=new ut(new dn(2,2),new Pt({name:"BackgroundMaterial",uniforms:ma(At.background.uniforms),vertexShader:At.background.vertexShader,fragmentShader:At.background.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),E.geometry.deleteAttribute("normal"),Object.defineProperty(E.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(E)),E.material.uniforms.t2D.value=w,E.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,E.material.toneMapped=at.getTransfer(w.colorSpace)!==$e,w.matrixAutoUpdate===!0&&w.updateMatrix(),E.material.uniforms.uvTransform.value.copy(w.matrix),(m!==w||v!==w.version||T!==e.toneMapping)&&(E.material.needsUpdate=!0,m=w,v=w.version,T=e.toneMapping),E.layers.enableAll(),x.unshift(E,E.geometry,E.material,0,0,null))}function a(x,_){x.getRGB(mn,Mr(e)),i.buffers.color.setClear(mn.r,mn.g,mn.b,_,f)}function M(){C!==void 0&&(C.geometry.dispose(),C.material.dispose(),C=void 0),E!==void 0&&(E.geometry.dispose(),E.material.dispose(),E=void 0)}return{getClearColor:function(){return d},setClearColor:function(x,_=1){d.set(x),S=_,a(d,S)},getClearAlpha:function(){return S},setClearAlpha:function(x){S=x,a(d,S)},render:L,addToRenderList:s,dispose:M}}function Qc(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},o=v(null);let r=o,f=!1;function d(p,y,B,W,Y){let q=!1;const z=m(W,B,y);r!==z&&(r=z,E(r.object)),q=T(p,W,B,Y),q&&N(p,W,B,Y),Y!==null&&n.update(Y,e.ELEMENT_ARRAY_BUFFER),(q||f)&&(f=!1,_(p,y,B,W),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Y).buffer))}function S(){return e.createVertexArray()}function E(p){return e.bindVertexArray(p)}function C(p){return e.deleteVertexArray(p)}function m(p,y,B){const W=B.wireframe===!0;let Y=i[p.id];Y===void 0&&(Y={},i[p.id]=Y);let q=Y[y.id];q===void 0&&(q={},Y[y.id]=q);let z=q[W];return z===void 0&&(z=v(S()),q[W]=z),z}function v(p){const y=[],B=[],W=[];for(let Y=0;Y<t;Y++)y[Y]=0,B[Y]=0,W[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:B,attributeDivisors:W,object:p,attributes:{},index:null}}function T(p,y,B,W){const Y=r.attributes,q=y.attributes;let z=0;const te=B.getAttributes();for(const V in te)if(te[V].location>=0){const xe=Y[V];let ye=q[V];if(ye===void 0&&(V==="instanceMatrix"&&p.instanceMatrix&&(ye=p.instanceMatrix),V==="instanceColor"&&p.instanceColor&&(ye=p.instanceColor)),xe===void 0||xe.attribute!==ye||ye&&xe.data!==ye.data)return!0;z++}return r.attributesNum!==z||r.index!==W}function N(p,y,B,W){const Y={},q=y.attributes;let z=0;const te=B.getAttributes();for(const V in te)if(te[V].location>=0){let xe=q[V];xe===void 0&&(V==="instanceMatrix"&&p.instanceMatrix&&(xe=p.instanceMatrix),V==="instanceColor"&&p.instanceColor&&(xe=p.instanceColor));const ye={};ye.attribute=xe,xe&&xe.data&&(ye.data=xe.data),Y[V]=ye,z++}r.attributes=Y,r.attributesNum=z,r.index=W}function L(){const p=r.newAttributes;for(let y=0,B=p.length;y<B;y++)p[y]=0}function s(p){a(p,0)}function a(p,y){const B=r.newAttributes,W=r.enabledAttributes,Y=r.attributeDivisors;B[p]=1,W[p]===0&&(e.enableVertexAttribArray(p),W[p]=1),Y[p]!==y&&(e.vertexAttribDivisor(p,y),Y[p]=y)}function M(){const p=r.newAttributes,y=r.enabledAttributes;for(let B=0,W=y.length;B<W;B++)y[B]!==p[B]&&(e.disableVertexAttribArray(B),y[B]=0)}function x(p,y,B,W,Y,q,z){z===!0?e.vertexAttribIPointer(p,y,B,Y,q):e.vertexAttribPointer(p,y,B,W,Y,q)}function _(p,y,B,W){L();const Y=W.attributes,q=B.getAttributes(),z=y.defaultAttributeValues;for(const te in q){const V=q[te];if(V.location>=0){let ve=Y[te];if(ve===void 0&&(te==="instanceMatrix"&&p.instanceMatrix&&(ve=p.instanceMatrix),te==="instanceColor"&&p.instanceColor&&(ve=p.instanceColor)),ve!==void 0){const xe=ve.normalized,ye=ve.itemSize,He=n.get(ve);if(He===void 0)continue;const nt=He.buffer,et=He.type,We=He.bytesPerElement,k=et===e.INT||et===e.UNSIGNED_INT||ve.gpuType===_r;if(ve.isInterleavedBufferAttribute){const $=ve.data,fe=$.stride,we=ve.offset;if($.isInstancedInterleavedBuffer){for(let Se=0;Se<V.locationSize;Se++)a(V.location+Se,$.meshPerAttribute);p.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Se=0;Se<V.locationSize;Se++)s(V.location+Se);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let Se=0;Se<V.locationSize;Se++)x(V.location+Se,ye/V.locationSize,et,xe,fe*We,(we+ye/V.locationSize*Se)*We,k)}else{if(ve.isInstancedBufferAttribute){for(let $=0;$<V.locationSize;$++)a(V.location+$,ve.meshPerAttribute);p.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let $=0;$<V.locationSize;$++)s(V.location+$);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let $=0;$<V.locationSize;$++)x(V.location+$,ye/V.locationSize,et,xe,ye*We,ye/V.locationSize*$*We,k)}}else if(z!==void 0){const xe=z[te];if(xe!==void 0)switch(xe.length){case 2:e.vertexAttrib2fv(V.location,xe);break;case 3:e.vertexAttrib3fv(V.location,xe);break;case 4:e.vertexAttrib4fv(V.location,xe);break;default:e.vertexAttrib1fv(V.location,xe)}}}}M()}function w(){I();for(const p in i){const y=i[p];for(const B in y){const W=y[B];for(const Y in W)C(W[Y].object),delete W[Y];delete y[B]}delete i[p]}}function R(p){if(i[p.id]===void 0)return;const y=i[p.id];for(const B in y){const W=y[B];for(const Y in W)C(W[Y].object),delete W[Y];delete y[B]}delete i[p.id]}function b(p){for(const y in i){const B=i[y];if(B[p.id]===void 0)continue;const W=B[p.id];for(const Y in W)C(W[Y].object),delete W[Y];delete B[p.id]}}function I(){u(),f=!0,r!==o&&(r=o,E(r.object))}function u(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:d,reset:I,resetDefaultState:u,dispose:w,releaseStatesOfGeometry:R,releaseStatesOfProgram:b,initAttributes:L,enableAttribute:s,disableUnusedAttributes:M}}function Jc(e,n,t){let i;function o(E){i=E}function r(E,C){e.drawArrays(i,E,C),t.update(C,i,1)}function f(E,C,m){m!==0&&(e.drawArraysInstanced(i,E,C,m),t.update(C,i,m))}function d(E,C,m){if(m===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,E,0,C,0,m);let T=0;for(let N=0;N<m;N++)T+=C[N];t.update(T,i,1)}function S(E,C,m,v){if(m===0)return;const T=n.get("WEBGL_multi_draw");if(T===null)for(let N=0;N<E.length;N++)f(E[N],C[N],v[N]);else{T.multiDrawArraysInstancedWEBGL(i,E,0,C,0,v,0,m);let N=0;for(let L=0;L<m;L++)N+=C[L]*v[L];t.update(N,i,1)}}this.setMode=o,this.render=r,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=S}function ef(e,n,t,i){let o;function r(){if(o!==void 0)return o;if(n.has("EXT_texture_filter_anisotropic")===!0){const b=n.get("EXT_texture_filter_anisotropic");o=e.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function f(b){return!(b!==Ct&&i.convert(b)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(b){const I=b===Nn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(b!==Bt&&i.convert(b)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Ot&&!I)}function S(b){if(b==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let E=t.precision!==void 0?t.precision:"highp";const C=S(E);C!==E&&(console.warn("THREE.WebGLRenderer:",E,"not supported, using",C,"instead."),E=C);const m=t.logarithmicDepthBuffer===!0,v=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),T=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),N=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),L=e.getParameter(e.MAX_TEXTURE_SIZE),s=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),a=e.getParameter(e.MAX_VERTEX_ATTRIBS),M=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),x=e.getParameter(e.MAX_VARYING_VECTORS),_=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=N>0,R=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:S,textureFormatReadable:f,textureTypeReadable:d,precision:E,logarithmicDepthBuffer:m,reversedDepthBuffer:v,maxTextures:T,maxVertexTextures:N,maxTextureSize:L,maxCubemapSize:s,maxAttributes:a,maxVertexUniforms:M,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:w,maxSamples:R}}function tf(e){const n=this;let t=null,i=0,o=!1,r=!1;const f=new xi,d=new Fe,S={value:null,needsUpdate:!1};this.uniform=S,this.numPlanes=0,this.numIntersection=0,this.init=function(m,v){const T=m.length!==0||v||i!==0||o;return o=v,i=m.length,T},this.beginShadows=function(){r=!0,C(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,v){t=C(m,v,0)},this.setState=function(m,v,T){const N=m.clippingPlanes,L=m.clipIntersection,s=m.clipShadows,a=e.get(m);if(!o||N===null||N.length===0||r&&!s)r?C(null):E();else{const M=r?0:i,x=M*4;let _=a.clippingState||null;S.value=_,_=C(N,v,x,T);for(let w=0;w!==x;++w)_[w]=t[w];a.clippingState=_,this.numIntersection=L?this.numPlanes:0,this.numPlanes+=M}};function E(){S.value!==t&&(S.value=t,S.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function C(m,v,T,N){const L=m!==null?m.length:0;let s=null;if(L!==0){if(s=S.value,N!==!0||s===null){const a=T+L*4,M=v.matrixWorldInverse;d.getNormalMatrix(M),(s===null||s.length<a)&&(s=new Float32Array(a));for(let x=0,_=T;x!==L;++x,_+=4)f.copy(m[x]).applyMatrix4(M,d),f.normal.toArray(s,_),s[_+3]=f.constant}S.value=s,S.needsUpdate=!0}return n.numPlanes=L,n.numIntersection=0,s}}function nf(e){let n=new WeakMap;function t(f,d){return d===gi?f.mapping=fn:d===vi&&(f.mapping=jt),f}function i(f){if(f&&f.isTexture){const d=f.mapping;if(d===gi||d===vi)if(n.has(f)){const S=n.get(f).texture;return t(S,f.mapping)}else{const S=f.image;if(S&&S.height>0){const E=new Fo(S.height);return E.fromEquirectangularTexture(e,f),n.set(f,E),f.addEventListener("dispose",o),t(E.texture,f.mapping)}else return null}}return f}function o(f){const d=f.target;d.removeEventListener("dispose",o);const S=n.get(d);S!==void 0&&(n.delete(d),S.dispose())}function r(){n=new WeakMap}return{get:i,dispose:r}}const Yt=4,Sa=[.125,.215,.35,.446,.526,.582],Nt=20,$n=new xr,Ma=new Ye;let Zn=null,jn=0,Qn=0,Jn=!1;const It=(1+Math.sqrt(5))/2,Gt=1/It,Ta=[new ce(-It,Gt,0),new ce(It,Gt,0),new ce(-Gt,0,It),new ce(Gt,0,It),new ce(0,It,-Gt),new ce(0,It,Gt),new ce(-1,1,-1),new ce(1,1,-1),new ce(-1,1,1),new ce(1,1,1)],af=new ce;class xa{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,o=100,r={}){const{size:f=256,position:d=af}=r;Zn=this._renderer.getRenderTarget(),jn=this._renderer.getActiveCubeFace(),Qn=this._renderer.getActiveMipmapLevel(),Jn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const S=this._allocateTargets();return S.depthBuffer=!0,this._sceneToCubeUV(n,i,o,S,d),t>0&&this._blur(S,0,0,t),this._applyPMREM(S),this._cleanup(S),S}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ba(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ra(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(Zn,jn,Qn),this._renderer.xr.enabled=Jn,n.scissorTest=!1,_n(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===fn||n.mapping===jt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Zn=this._renderer.getRenderTarget(),jn=this._renderer.getActiveCubeFace(),Qn=this._renderer.getActiveMipmapLevel(),Jn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:Nn,format:Ct,colorSpace:On,depthBuffer:!1},o=Aa(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Aa(n,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rf(r)),this._blurMaterial=of(r,n,t)}return o}_compileMaterial(n){const t=new ut(this._lodPlanes[0],n);this._renderer.compile(t,$n)}_sceneToCubeUV(n,t,i,o,r){const S=new Kt(90,1,t,i),E=[1,-1,1,1,1,1],C=[1,1,1,-1,-1,-1],m=this._renderer,v=m.autoClear,T=m.toneMapping;m.getClearColor(Ma),m.toneMapping=wt,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(o),m.clearDepth(),m.setRenderTarget(null));const L=new bi({name:"PMREM.Background",side:Mt,depthWrite:!1,depthTest:!1}),s=new ut(new Ri,L);let a=!1;const M=n.background;M?M.isColor&&(L.color.copy(M),n.background=null,a=!0):(L.color.copy(Ma),a=!0);for(let x=0;x<6;x++){const _=x%3;_===0?(S.up.set(0,E[x],0),S.position.set(r.x,r.y,r.z),S.lookAt(r.x+C[x],r.y,r.z)):_===1?(S.up.set(0,0,E[x]),S.position.set(r.x,r.y,r.z),S.lookAt(r.x,r.y+C[x],r.z)):(S.up.set(0,E[x],0),S.position.set(r.x,r.y,r.z),S.lookAt(r.x,r.y,r.z+C[x]));const w=this._cubeSize;_n(o,_*w,x>2?w:0,w,w),m.setRenderTarget(o),a&&m.render(s,S),m.render(n,S)}s.geometry.dispose(),s.material.dispose(),m.toneMapping=T,m.autoClear=v,n.background=M}_textureToCubeUV(n,t){const i=this._renderer,o=n.mapping===fn||n.mapping===jt;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=ba()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ra());const r=o?this._cubemapMaterial:this._equirectMaterial,f=new ut(this._lodPlanes[0],r),d=r.uniforms;d.envMap.value=n;const S=this._cubeSize;_n(t,0,0,3*S,2*S),i.setRenderTarget(t),i.render(f,$n)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const o=this._lodPlanes.length;for(let r=1;r<o;r++){const f=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),d=Ta[(o-r-1)%Ta.length];this._blur(n,r-1,r,f,d)}t.autoClear=i}_blur(n,t,i,o,r){const f=this._pingPongRenderTarget;this._halfBlur(n,f,t,i,o,"latitudinal",r),this._halfBlur(f,n,i,i,o,"longitudinal",r)}_halfBlur(n,t,i,o,r,f,d){const S=this._renderer,E=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const C=3,m=new ut(this._lodPlanes[o],E),v=E.uniforms,T=this._sizeLods[i]-1,N=isFinite(r)?Math.PI/(2*T):2*Math.PI/(2*Nt-1),L=r/N,s=isFinite(r)?1+Math.floor(C*L):Nt;s>Nt&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${s} samples when the maximum is set to ${Nt}`);const a=[];let M=0;for(let b=0;b<Nt;++b){const I=b/L,u=Math.exp(-I*I/2);a.push(u),b===0?M+=u:b<s&&(M+=2*u)}for(let b=0;b<a.length;b++)a[b]=a[b]/M;v.envMap.value=n.texture,v.samples.value=s,v.weights.value=a,v.latitudinal.value=f==="latitudinal",d&&(v.poleAxis.value=d);const{_lodMax:x}=this;v.dTheta.value=N,v.mipInt.value=x-i;const _=this._sizeLods[o],w=3*_*(o>x-Yt?o-x+Yt:0),R=4*(this._cubeSize-_);_n(t,w,R,3*_,2*_),S.setRenderTarget(t),S.render(m,$n)}}function rf(e){const n=[],t=[],i=[];let o=e;const r=e-Yt+1+Sa.length;for(let f=0;f<r;f++){const d=Math.pow(2,o);t.push(d);let S=1/d;f>e-Yt?S=Sa[f-e+Yt-1]:f===0&&(S=0),i.push(S);const E=1/(d-2),C=-E,m=1+E,v=[C,C,m,C,m,m,C,C,m,m,C,m],T=6,N=6,L=3,s=2,a=1,M=new Float32Array(L*N*T),x=new Float32Array(s*N*T),_=new Float32Array(a*N*T);for(let R=0;R<T;R++){const b=R%3*2/3-1,I=R>2?0:-1,u=[b,I,0,b+2/3,I,0,b+2/3,I+1,0,b,I,0,b+2/3,I+1,0,b,I+1,0];M.set(u,L*N*R),x.set(v,s*N*R);const p=[R,R,R,R,R,R];_.set(p,a*N*R)}const w=new Ai;w.setAttribute("position",new rn(M,L)),w.setAttribute("uv",new rn(x,s)),w.setAttribute("faceIndex",new rn(_,a)),n.push(w),o>Yt&&o--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function Aa(e,n,t){const i=new Zt(e,n,t);return i.texture.mapping=Fn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _n(e,n,t,i,o){e.viewport.set(n,t,i,o),e.scissor.set(n,t,i,o)}function of(e,n,t){const i=new Float32Array(Nt),o=new ce(0,1,0);return new Pt({name:"SphericalGaussianBlur",defines:{n:Nt,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Ci(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function Ra(){return new Pt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ci(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function ba(){return new Pt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ci(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function Ci(){return`

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
	`}function sf(e){let n=new WeakMap,t=null;function i(d){if(d&&d.isTexture){const S=d.mapping,E=S===gi||S===vi,C=S===fn||S===jt;if(E||C){let m=n.get(d);const v=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==v)return t===null&&(t=new xa(e)),m=E?t.fromEquirectangular(d,m):t.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),m.texture;if(m!==void 0)return m.texture;{const T=d.image;return E&&T&&T.height>0||C&&T&&o(T)?(t===null&&(t=new xa(e)),m=E?t.fromEquirectangular(d):t.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),d.addEventListener("dispose",r),m.texture):null}}}return d}function o(d){let S=0;const E=6;for(let C=0;C<E;C++)d[C]!==void 0&&S++;return S===E}function r(d){const S=d.target;S.removeEventListener("dispose",r);const E=n.get(S);E!==void 0&&(n.delete(S),E.dispose())}function f(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:f}}function lf(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let o;switch(i){case"WEBGL_depth_texture":o=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=e.getExtension(i)}return n[i]=o,o}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const o=t(i);return o===null&&ci("THREE.WebGLRenderer: "+i+" extension not supported."),o}}}function cf(e,n,t,i){const o={},r=new WeakMap;function f(m){const v=m.target;v.index!==null&&n.remove(v.index);for(const N in v.attributes)n.remove(v.attributes[N]);v.removeEventListener("dispose",f),delete o[v.id];const T=r.get(v);T&&(n.remove(T),r.delete(v)),i.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,t.memory.geometries--}function d(m,v){return o[v.id]===!0||(v.addEventListener("dispose",f),o[v.id]=!0,t.memory.geometries++),v}function S(m){const v=m.attributes;for(const T in v)n.update(v[T],e.ARRAY_BUFFER)}function E(m){const v=[],T=m.index,N=m.attributes.position;let L=0;if(T!==null){const M=T.array;L=T.version;for(let x=0,_=M.length;x<_;x+=3){const w=M[x+0],R=M[x+1],b=M[x+2];v.push(w,R,R,b,b,w)}}else if(N!==void 0){const M=N.array;L=N.version;for(let x=0,_=M.length/3-1;x<_;x+=3){const w=x+0,R=x+1,b=x+2;v.push(w,R,R,b,b,w)}}else return;const s=new(zo(v)?Vo:ko)(v,1);s.version=L;const a=r.get(m);a&&n.remove(a),r.set(m,s)}function C(m){const v=r.get(m);if(v){const T=m.index;T!==null&&v.version<T.version&&E(m)}else E(m);return r.get(m)}return{get:d,update:S,getWireframeAttribute:C}}function ff(e,n,t){let i;function o(v){i=v}let r,f;function d(v){r=v.type,f=v.bytesPerElement}function S(v,T){e.drawElements(i,T,r,v*f),t.update(T,i,1)}function E(v,T,N){N!==0&&(e.drawElementsInstanced(i,T,r,v*f,N),t.update(T,i,N))}function C(v,T,N){if(N===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,T,0,r,v,0,N);let s=0;for(let a=0;a<N;a++)s+=T[a];t.update(s,i,1)}function m(v,T,N,L){if(N===0)return;const s=n.get("WEBGL_multi_draw");if(s===null)for(let a=0;a<v.length;a++)E(v[a]/f,T[a],L[a]);else{s.multiDrawElementsInstancedWEBGL(i,T,0,r,v,0,L,0,N);let a=0;for(let M=0;M<N;M++)a+=T[M]*L[M];t.update(a,i,1)}}this.setMode=o,this.setIndex=d,this.render=S,this.renderInstances=E,this.renderMultiDraw=C,this.renderMultiDrawInstances=m}function df(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,f,d){switch(t.calls++,f){case e.TRIANGLES:t.triangles+=d*(r/3);break;case e.LINES:t.lines+=d*(r/2);break;case e.LINE_STRIP:t.lines+=d*(r-1);break;case e.LINE_LOOP:t.lines+=d*r;break;case e.POINTS:t.points+=d*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:o,update:i}}function uf(e,n,t){const i=new WeakMap,o=new ft;function r(f,d,S){const E=f.morphTargetInfluences,C=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,m=C!==void 0?C.length:0;let v=i.get(d);if(v===void 0||v.count!==m){let u=function(){b.dispose(),i.delete(d),d.removeEventListener("dispose",u)};v!==void 0&&v.texture.dispose();const T=d.morphAttributes.position!==void 0,N=d.morphAttributes.normal!==void 0,L=d.morphAttributes.color!==void 0,s=d.morphAttributes.position||[],a=d.morphAttributes.normal||[],M=d.morphAttributes.color||[];let x=0;T===!0&&(x=1),N===!0&&(x=2),L===!0&&(x=3);let _=d.attributes.position.count*x,w=1;_>n.maxTextureSize&&(w=Math.ceil(_/n.maxTextureSize),_=n.maxTextureSize);const R=new Float32Array(_*w*4*m),b=new Sr(R,_,w,m);b.type=Ot,b.needsUpdate=!0;const I=x*4;for(let p=0;p<m;p++){const y=s[p],B=a[p],W=M[p],Y=_*w*4*p;for(let q=0;q<y.count;q++){const z=q*I;T===!0&&(o.fromBufferAttribute(y,q),R[Y+z+0]=o.x,R[Y+z+1]=o.y,R[Y+z+2]=o.z,R[Y+z+3]=0),N===!0&&(o.fromBufferAttribute(B,q),R[Y+z+4]=o.x,R[Y+z+5]=o.y,R[Y+z+6]=o.z,R[Y+z+7]=0),L===!0&&(o.fromBufferAttribute(W,q),R[Y+z+8]=o.x,R[Y+z+9]=o.y,R[Y+z+10]=o.z,R[Y+z+11]=W.itemSize===4?o.w:1)}}v={count:m,texture:b,size:new ke(_,w)},i.set(d,v),d.addEventListener("dispose",u)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)S.getUniforms().setValue(e,"morphTexture",f.morphTexture,t);else{let T=0;for(let L=0;L<E.length;L++)T+=E[L];const N=d.morphTargetsRelative?1:1-T;S.getUniforms().setValue(e,"morphTargetBaseInfluence",N),S.getUniforms().setValue(e,"morphTargetInfluences",E)}S.getUniforms().setValue(e,"morphTargetsTexture",v.texture,t),S.getUniforms().setValue(e,"morphTargetsTextureSize",v.size)}return{update:r}}function pf(e,n,t,i){let o=new WeakMap;function r(S){const E=i.render.frame,C=S.geometry,m=n.get(S,C);if(o.get(m)!==E&&(n.update(m),o.set(m,E)),S.isInstancedMesh&&(S.hasEventListener("dispose",d)===!1&&S.addEventListener("dispose",d),o.get(S)!==E&&(t.update(S.instanceMatrix,e.ARRAY_BUFFER),S.instanceColor!==null&&t.update(S.instanceColor,e.ARRAY_BUFFER),o.set(S,E))),S.isSkinnedMesh){const v=S.skeleton;o.get(v)!==E&&(v.update(),o.set(v,E))}return m}function f(){o=new WeakMap}function d(S){const E=S.target;E.removeEventListener("dispose",d),t.remove(E.instanceMatrix),E.instanceColor!==null&&t.remove(E.instanceColor)}return{update:r,dispose:f}}const Pr=new ts,Ca=new fr(1,1),Dr=new Sr,Lr=new es,yr=new Jo,wa=[],Pa=[],Da=new Float32Array(16),La=new Float32Array(9),ya=new Float32Array(4);function Qt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const o=n*t;let r=wa[o];if(r===void 0&&(r=new Float32Array(o),wa[o]=r),n!==0){i.toArray(r,0);for(let f=1,d=0;f!==n;++f)d+=t,e[f].toArray(r,d)}return r}function ot(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function st(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Bn(e,n){let t=Pa[n];t===void 0&&(t=new Int32Array(n),Pa[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function hf(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function mf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2fv(this.addr,n),st(t,n)}}function _f(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(ot(t,n))return;e.uniform3fv(this.addr,n),st(t,n)}}function gf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4fv(this.addr,n),st(t,n)}}function vf(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;ya.set(i),e.uniformMatrix2fv(this.addr,!1,ya),st(t,i)}}function Ef(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;La.set(i),e.uniformMatrix3fv(this.addr,!1,La),st(t,i)}}function Sf(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;Da.set(i),e.uniformMatrix4fv(this.addr,!1,Da),st(t,i)}}function Mf(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Tf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2iv(this.addr,n),st(t,n)}}function xf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ot(t,n))return;e.uniform3iv(this.addr,n),st(t,n)}}function Af(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4iv(this.addr,n),st(t,n)}}function Rf(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function bf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2uiv(this.addr,n),st(t,n)}}function Cf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ot(t,n))return;e.uniform3uiv(this.addr,n),st(t,n)}}function wf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4uiv(this.addr,n),st(t,n)}}function Pf(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o);let r;this.type===e.SAMPLER_2D_SHADOW?(Ca.compareFunction=dr,r=Ca):r=Pr,t.setTexture2D(n||r,o)}function Df(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o),t.setTexture3D(n||Lr,o)}function Lf(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o),t.setTextureCube(n||yr,o)}function yf(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o),t.setTexture2DArray(n||Dr,o)}function Uf(e){switch(e){case 5126:return hf;case 35664:return mf;case 35665:return _f;case 35666:return gf;case 35674:return vf;case 35675:return Ef;case 35676:return Sf;case 5124:case 35670:return Mf;case 35667:case 35671:return Tf;case 35668:case 35672:return xf;case 35669:case 35673:return Af;case 5125:return Rf;case 36294:return bf;case 36295:return Cf;case 36296:return wf;case 35678:case 36198:case 36298:case 36306:case 35682:return Pf;case 35679:case 36299:case 36307:return Df;case 35680:case 36300:case 36308:case 36293:return Lf;case 36289:case 36303:case 36311:case 36292:return yf}}function If(e,n){e.uniform1fv(this.addr,n)}function Nf(e,n){const t=Qt(n,this.size,2);e.uniform2fv(this.addr,t)}function Of(e,n){const t=Qt(n,this.size,3);e.uniform3fv(this.addr,t)}function Ff(e,n){const t=Qt(n,this.size,4);e.uniform4fv(this.addr,t)}function Bf(e,n){const t=Qt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Hf(e,n){const t=Qt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function Gf(e,n){const t=Qt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Vf(e,n){e.uniform1iv(this.addr,n)}function kf(e,n){e.uniform2iv(this.addr,n)}function zf(e,n){e.uniform3iv(this.addr,n)}function Wf(e,n){e.uniform4iv(this.addr,n)}function Xf(e,n){e.uniform1uiv(this.addr,n)}function Yf(e,n){e.uniform2uiv(this.addr,n)}function Kf(e,n){e.uniform3uiv(this.addr,n)}function qf(e,n){e.uniform4uiv(this.addr,n)}function $f(e,n,t){const i=this.cache,o=n.length,r=Bn(t,o);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let f=0;f!==o;++f)t.setTexture2D(n[f]||Pr,r[f])}function Zf(e,n,t){const i=this.cache,o=n.length,r=Bn(t,o);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let f=0;f!==o;++f)t.setTexture3D(n[f]||Lr,r[f])}function jf(e,n,t){const i=this.cache,o=n.length,r=Bn(t,o);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let f=0;f!==o;++f)t.setTextureCube(n[f]||yr,r[f])}function Qf(e,n,t){const i=this.cache,o=n.length,r=Bn(t,o);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let f=0;f!==o;++f)t.setTexture2DArray(n[f]||Dr,r[f])}function Jf(e){switch(e){case 5126:return If;case 35664:return Nf;case 35665:return Of;case 35666:return Ff;case 35674:return Bf;case 35675:return Hf;case 35676:return Gf;case 5124:case 35670:return Vf;case 35667:case 35671:return kf;case 35668:case 35672:return zf;case 35669:case 35673:return Wf;case 5125:return Xf;case 36294:return Yf;case 36295:return Kf;case 36296:return qf;case 35678:case 36198:case 36298:case 36306:case 35682:return $f;case 35679:case 36299:case 36307:return Zf;case 35680:case 36300:case 36308:case 36293:return jf;case 36289:case 36303:case 36311:case 36292:return Qf}}class ed{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Uf(t.type)}}class td{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jf(t.type)}}class nd{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const o=this.seq;for(let r=0,f=o.length;r!==f;++r){const d=o[r];d.setValue(n,t[d.id],i)}}}const ei=/(\w+)(\])?(\[|\.)?/g;function Ua(e,n){e.seq.push(n),e.map[n.id]=n}function id(e,n,t){const i=e.name,o=i.length;for(ei.lastIndex=0;;){const r=ei.exec(i),f=ei.lastIndex;let d=r[1];const S=r[2]==="]",E=r[3];if(S&&(d=d|0),E===void 0||E==="["&&f+2===o){Ua(t,E===void 0?new ed(d,e,n):new td(d,e,n));break}else{let m=t.map[d];m===void 0&&(m=new nd(d),Ua(t,m)),t=m}}}class Rn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const r=n.getActiveUniform(t,o),f=n.getUniformLocation(t,r.name);id(r,f,this)}}setValue(n,t,i,o){const r=this.map[t];r!==void 0&&r.setValue(n,i,o)}setOptional(n,t,i){const o=t[i];o!==void 0&&this.setValue(n,i,o)}static upload(n,t,i,o){for(let r=0,f=t.length;r!==f;++r){const d=t[r],S=i[d.id];S.needsUpdate!==!1&&d.setValue(n,S.value,o)}}static seqWithValue(n,t){const i=[];for(let o=0,r=n.length;o!==r;++o){const f=n[o];f.id in t&&i.push(f)}return i}}function Ia(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const ad=37297;let rd=0;function od(e,n){const t=e.split(`
`),i=[],o=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let f=o;f<r;f++){const d=f+1;i.push(`${d===n?">":" "} ${d}: ${t[f]}`)}return i.join(`
`)}const Na=new Fe;function sd(e){at._getMatrix(Na,at.workingColorSpace,e);const n=`mat3( ${Na.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(e)){case Tr:return[n,"LinearTransferOETF"];case $e:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Oa(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const f=/ERROR: 0:(\d+)/.exec(r);if(f){const d=parseInt(f[1]);return t.toUpperCase()+`

`+r+`

`+od(e.getShaderSource(n),d)}else return r}function ld(e,n){const t=sd(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function cd(e,n){let t;switch(n){case Qo:t="Linear";break;case jo:t="Reinhard";break;case Zo:t="Cineon";break;case $o:t="ACESFilmic";break;case qo:t="AgX";break;case Ko:t="Neutral";break;case Yo:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const gn=new ce;function fd(){at.getLuminanceCoefficients(gn);const e=gn.x.toFixed(4),n=gn.y.toFixed(4),t=gn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dd(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nn).join(`
`)}function ud(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function pd(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let o=0;o<i;o++){const r=e.getActiveAttrib(n,o),f=r.name;let d=1;r.type===e.FLOAT_MAT2&&(d=2),r.type===e.FLOAT_MAT3&&(d=3),r.type===e.FLOAT_MAT4&&(d=4),t[f]={type:r.type,location:e.getAttribLocation(n,f),locationSize:d}}return t}function nn(e){return e!==""}function Fa(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Ba(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const hd=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ei(e){return e.replace(hd,_d)}const md=new Map;function _d(e,n){let t=Ie[n];if(t===void 0){const i=md.get(n);if(i!==void 0)t=Ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return Ei(t)}const gd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ha(e){return e.replace(gd,vd)}function vd(e,n,t,i){let o="";for(let r=parseInt(n);r<parseInt(t);r++)o+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return o}function Ga(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}function Ed(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===ur?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===Xo?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===bt&&(n="SHADOWMAP_TYPE_VSM"),n}function Sd(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case fn:case jt:n="ENVMAP_TYPE_CUBE";break;case Fn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Md(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===jt&&(n="ENVMAP_MODE_REFRACTION"),n}function Td(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case rs:n="ENVMAP_BLENDING_MULTIPLY";break;case as:n="ENVMAP_BLENDING_MIX";break;case is:n="ENVMAP_BLENDING_ADD";break}return n}function xd(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Ad(e,n,t,i){const o=e.getContext(),r=t.defines;let f=t.vertexShader,d=t.fragmentShader;const S=Ed(t),E=Sd(t),C=Md(t),m=Td(t),v=xd(t),T=dd(t),N=ud(r),L=o.createProgram();let s,a,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(s=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(nn).join(`
`),s.length>0&&(s+=`
`),a=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(nn).join(`
`),a.length>0&&(a+=`
`)):(s=[Ga(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+C:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+S:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nn).join(`
`),a=[Ga(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+E:"",t.envMap?"#define "+C:"",t.envMap?"#define "+m:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+S:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wt?"#define TONE_MAPPING":"",t.toneMapping!==wt?Ie.tonemapping_pars_fragment:"",t.toneMapping!==wt?cd("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,ld("linearToOutputTexel",t.outputColorSpace),fd(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(nn).join(`
`)),f=Ei(f),f=Fa(f,t),f=Ba(f,t),d=Ei(d),d=Fa(d,t),d=Ba(d,t),f=Ha(f),d=Ha(d),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,s=[T,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+s,a=["#define varying in",t.glslVersion===ga?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ga?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+a);const x=M+s+f,_=M+a+d,w=Ia(o,o.VERTEX_SHADER,x),R=Ia(o,o.FRAGMENT_SHADER,_);o.attachShader(L,w),o.attachShader(L,R),t.index0AttributeName!==void 0?o.bindAttribLocation(L,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(L,0,"position"),o.linkProgram(L);function b(y){if(e.debug.checkShaderErrors){const B=o.getProgramInfoLog(L)||"",W=o.getShaderInfoLog(w)||"",Y=o.getShaderInfoLog(R)||"",q=B.trim(),z=W.trim(),te=Y.trim();let V=!0,ve=!0;if(o.getProgramParameter(L,o.LINK_STATUS)===!1)if(V=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(o,L,w,R);else{const xe=Oa(o,w,"vertex"),ye=Oa(o,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(L,o.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+q+`
`+xe+`
`+ye)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(z===""||te==="")&&(ve=!1);ve&&(y.diagnostics={runnable:V,programLog:q,vertexShader:{log:z,prefix:s},fragmentShader:{log:te,prefix:a}})}o.deleteShader(w),o.deleteShader(R),I=new Rn(o,L),u=pd(o,L)}let I;this.getUniforms=function(){return I===void 0&&b(this),I};let u;this.getAttributes=function(){return u===void 0&&b(this),u};let p=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return p===!1&&(p=o.getProgramParameter(L,ad)),p},this.destroy=function(){i.releaseStatesOfProgram(this),o.deleteProgram(L),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rd++,this.cacheKey=n,this.usedTimes=1,this.program=L,this.vertexShader=w,this.fragmentShader=R,this}let Rd=0;class bd{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,o=this._getShaderStage(t),r=this._getShaderStage(i),f=this._getShaderCacheForMaterial(n);return f.has(o)===!1&&(f.add(o),o.usedTimes++),f.has(r)===!1&&(f.add(r),r.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Cd(n),t.set(n,i)),i}}class Cd{constructor(n){this.id=Rd++,this.code=n,this.usedTimes=0}}function wd(e,n,t,i,o,r,f){const d=new Wo,S=new bd,E=new Set,C=[],m=o.logarithmicDepthBuffer,v=o.vertexTextures;let T=o.precision;const N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function L(u){return E.add(u),u===0?"uv":`uv${u}`}function s(u,p,y,B,W){const Y=B.fog,q=W.geometry,z=u.isMeshStandardMaterial?B.environment:null,te=(u.isMeshStandardMaterial?t:n).get(u.envMap||z),V=te&&te.mapping===Fn?te.image.height:null,ve=N[u.type];u.precision!==null&&(T=o.getMaxPrecision(u.precision),T!==u.precision&&console.warn("THREE.WebGLProgram.getParameters:",u.precision,"not supported, using",T,"instead."));const xe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ye=xe!==void 0?xe.length:0;let He=0;q.morphAttributes.position!==void 0&&(He=1),q.morphAttributes.normal!==void 0&&(He=2),q.morphAttributes.color!==void 0&&(He=3);let nt,et,We,k;if(ve){const Ge=At[ve];nt=Ge.vertexShader,et=Ge.fragmentShader}else nt=u.vertexShader,et=u.fragmentShader,S.update(u),We=S.getVertexShaderID(u),k=S.getFragmentShaderID(u);const $=e.getRenderTarget(),fe=e.state.buffers.depth.getReversed(),we=W.isInstancedMesh===!0,Se=W.isBatchedMesh===!0,Oe=!!u.map,ct=!!u.matcap,g=!!te,Ze=!!u.aoMap,De=!!u.lightMap,be=!!u.bumpMap,pe=!!u.normalMap,je=!!u.displacementMap,he=!!u.emissiveMap,Ue=!!u.metalnessMap,lt=!!u.roughnessMap,it=u.anisotropy>0,h=u.clearcoat>0,l=u.dispersion>0,U=u.iridescence>0,G=u.sheen>0,K=u.transmission>0,H=it&&!!u.anisotropyMap,Ee=h&&!!u.clearcoatMap,ee=h&&!!u.clearcoatNormalMap,me=h&&!!u.clearcoatRoughnessMap,_e=U&&!!u.iridescenceMap,Q=U&&!!u.iridescenceThicknessMap,oe=G&&!!u.sheenColorMap,Re=G&&!!u.sheenRoughnessMap,ge=!!u.specularMap,ae=!!u.specularColorMap,Le=!!u.specularIntensityMap,A=K&&!!u.transmissionMap,J=K&&!!u.thicknessMap,ne=!!u.gradientMap,le=!!u.alphaMap,Z=u.alphaTest>0,X=!!u.alphaHash,ue=!!u.extensions;let Pe=wt;u.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Pe=e.toneMapping);const Ke={shaderID:ve,shaderType:u.type,shaderName:u.name,vertexShader:nt,fragmentShader:et,defines:u.defines,customVertexShaderID:We,customFragmentShaderID:k,isRawShaderMaterial:u.isRawShaderMaterial===!0,glslVersion:u.glslVersion,precision:T,batching:Se,batchingColor:Se&&W._colorsTexture!==null,instancing:we,instancingColor:we&&W.instanceColor!==null,instancingMorph:we&&W.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:$===null?e.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:On,alphaToCoverage:!!u.alphaToCoverage,map:Oe,matcap:ct,envMap:g,envMapMode:g&&te.mapping,envMapCubeUVHeight:V,aoMap:Ze,lightMap:De,bumpMap:be,normalMap:pe,displacementMap:v&&je,emissiveMap:he,normalMapObjectSpace:pe&&u.normalMapType===Go,normalMapTangentSpace:pe&&u.normalMapType===Ho,metalnessMap:Ue,roughnessMap:lt,anisotropy:it,anisotropyMap:H,clearcoat:h,clearcoatMap:Ee,clearcoatNormalMap:ee,clearcoatRoughnessMap:me,dispersion:l,iridescence:U,iridescenceMap:_e,iridescenceThicknessMap:Q,sheen:G,sheenColorMap:oe,sheenRoughnessMap:Re,specularMap:ge,specularColorMap:ae,specularIntensityMap:Le,transmission:K,transmissionMap:A,thicknessMap:J,gradientMap:ne,opaque:u.transparent===!1&&u.blending===An&&u.alphaToCoverage===!1,alphaMap:le,alphaTest:Z,alphaHash:X,combine:u.combine,mapUv:Oe&&L(u.map.channel),aoMapUv:Ze&&L(u.aoMap.channel),lightMapUv:De&&L(u.lightMap.channel),bumpMapUv:be&&L(u.bumpMap.channel),normalMapUv:pe&&L(u.normalMap.channel),displacementMapUv:je&&L(u.displacementMap.channel),emissiveMapUv:he&&L(u.emissiveMap.channel),metalnessMapUv:Ue&&L(u.metalnessMap.channel),roughnessMapUv:lt&&L(u.roughnessMap.channel),anisotropyMapUv:H&&L(u.anisotropyMap.channel),clearcoatMapUv:Ee&&L(u.clearcoatMap.channel),clearcoatNormalMapUv:ee&&L(u.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&L(u.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&L(u.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&L(u.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&L(u.sheenColorMap.channel),sheenRoughnessMapUv:Re&&L(u.sheenRoughnessMap.channel),specularMapUv:ge&&L(u.specularMap.channel),specularColorMapUv:ae&&L(u.specularColorMap.channel),specularIntensityMapUv:Le&&L(u.specularIntensityMap.channel),transmissionMapUv:A&&L(u.transmissionMap.channel),thicknessMapUv:J&&L(u.thicknessMap.channel),alphaMapUv:le&&L(u.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(pe||it),vertexColors:u.vertexColors,vertexAlphas:u.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!q.attributes.uv&&(Oe||le),fog:!!Y,useFog:u.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:u.flatShading===!0&&u.wireframe===!1,sizeAttenuation:u.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:fe,skinning:W.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:He,numDirLights:p.directional.length,numPointLights:p.point.length,numSpotLights:p.spot.length,numSpotLightMaps:p.spotLightMap.length,numRectAreaLights:p.rectArea.length,numHemiLights:p.hemi.length,numDirLightShadows:p.directionalShadowMap.length,numPointLightShadows:p.pointShadowMap.length,numSpotLightShadows:p.spotShadowMap.length,numSpotLightShadowsWithMaps:p.numSpotLightShadowsWithMaps,numLightProbes:p.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:u.dithering,shadowMapEnabled:e.shadowMap.enabled&&y.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:Oe&&u.map.isVideoTexture===!0&&at.getTransfer(u.map.colorSpace)===$e,decodeVideoTextureEmissive:he&&u.emissiveMap.isVideoTexture===!0&&at.getTransfer(u.emissiveMap.colorSpace)===$e,premultipliedAlpha:u.premultipliedAlpha,doubleSided:u.side===Tt,flipSided:u.side===Mt,useDepthPacking:u.depthPacking>=0,depthPacking:u.depthPacking||0,index0AttributeName:u.index0AttributeName,extensionClipCullDistance:ue&&u.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&u.extensions.multiDraw===!0||Se)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:u.customProgramCacheKey()};return Ke.vertexUv1s=E.has(1),Ke.vertexUv2s=E.has(2),Ke.vertexUv3s=E.has(3),E.clear(),Ke}function a(u){const p=[];if(u.shaderID?p.push(u.shaderID):(p.push(u.customVertexShaderID),p.push(u.customFragmentShaderID)),u.defines!==void 0)for(const y in u.defines)p.push(y),p.push(u.defines[y]);return u.isRawShaderMaterial===!1&&(M(p,u),x(p,u),p.push(e.outputColorSpace)),p.push(u.customProgramCacheKey),p.join()}function M(u,p){u.push(p.precision),u.push(p.outputColorSpace),u.push(p.envMapMode),u.push(p.envMapCubeUVHeight),u.push(p.mapUv),u.push(p.alphaMapUv),u.push(p.lightMapUv),u.push(p.aoMapUv),u.push(p.bumpMapUv),u.push(p.normalMapUv),u.push(p.displacementMapUv),u.push(p.emissiveMapUv),u.push(p.metalnessMapUv),u.push(p.roughnessMapUv),u.push(p.anisotropyMapUv),u.push(p.clearcoatMapUv),u.push(p.clearcoatNormalMapUv),u.push(p.clearcoatRoughnessMapUv),u.push(p.iridescenceMapUv),u.push(p.iridescenceThicknessMapUv),u.push(p.sheenColorMapUv),u.push(p.sheenRoughnessMapUv),u.push(p.specularMapUv),u.push(p.specularColorMapUv),u.push(p.specularIntensityMapUv),u.push(p.transmissionMapUv),u.push(p.thicknessMapUv),u.push(p.combine),u.push(p.fogExp2),u.push(p.sizeAttenuation),u.push(p.morphTargetsCount),u.push(p.morphAttributeCount),u.push(p.numDirLights),u.push(p.numPointLights),u.push(p.numSpotLights),u.push(p.numSpotLightMaps),u.push(p.numHemiLights),u.push(p.numRectAreaLights),u.push(p.numDirLightShadows),u.push(p.numPointLightShadows),u.push(p.numSpotLightShadows),u.push(p.numSpotLightShadowsWithMaps),u.push(p.numLightProbes),u.push(p.shadowMapType),u.push(p.toneMapping),u.push(p.numClippingPlanes),u.push(p.numClipIntersection),u.push(p.depthPacking)}function x(u,p){d.disableAll(),p.supportsVertexTextures&&d.enable(0),p.instancing&&d.enable(1),p.instancingColor&&d.enable(2),p.instancingMorph&&d.enable(3),p.matcap&&d.enable(4),p.envMap&&d.enable(5),p.normalMapObjectSpace&&d.enable(6),p.normalMapTangentSpace&&d.enable(7),p.clearcoat&&d.enable(8),p.iridescence&&d.enable(9),p.alphaTest&&d.enable(10),p.vertexColors&&d.enable(11),p.vertexAlphas&&d.enable(12),p.vertexUv1s&&d.enable(13),p.vertexUv2s&&d.enable(14),p.vertexUv3s&&d.enable(15),p.vertexTangents&&d.enable(16),p.anisotropy&&d.enable(17),p.alphaHash&&d.enable(18),p.batching&&d.enable(19),p.dispersion&&d.enable(20),p.batchingColor&&d.enable(21),p.gradientMap&&d.enable(22),u.push(d.mask),d.disableAll(),p.fog&&d.enable(0),p.useFog&&d.enable(1),p.flatShading&&d.enable(2),p.logarithmicDepthBuffer&&d.enable(3),p.reversedDepthBuffer&&d.enable(4),p.skinning&&d.enable(5),p.morphTargets&&d.enable(6),p.morphNormals&&d.enable(7),p.morphColors&&d.enable(8),p.premultipliedAlpha&&d.enable(9),p.shadowMapEnabled&&d.enable(10),p.doubleSided&&d.enable(11),p.flipSided&&d.enable(12),p.useDepthPacking&&d.enable(13),p.dithering&&d.enable(14),p.transmission&&d.enable(15),p.sheen&&d.enable(16),p.opaque&&d.enable(17),p.pointsUvs&&d.enable(18),p.decodeVideoTexture&&d.enable(19),p.decodeVideoTextureEmissive&&d.enable(20),p.alphaToCoverage&&d.enable(21),u.push(d.mask)}function _(u){const p=N[u.type];let y;if(p){const B=At[p];y=Bo.clone(B.uniforms)}else y=u.uniforms;return y}function w(u,p){let y;for(let B=0,W=C.length;B<W;B++){const Y=C[B];if(Y.cacheKey===p){y=Y,++y.usedTimes;break}}return y===void 0&&(y=new Ad(e,p,u,r),C.push(y)),y}function R(u){if(--u.usedTimes===0){const p=C.indexOf(u);C[p]=C[C.length-1],C.pop(),u.destroy()}}function b(u){S.remove(u)}function I(){S.dispose()}return{getParameters:s,getProgramCacheKey:a,getUniforms:_,acquireProgram:w,releaseProgram:R,releaseShaderCache:b,programs:C,dispose:I}}function Pd(){let e=new WeakMap;function n(f){return e.has(f)}function t(f){let d=e.get(f);return d===void 0&&(d={},e.set(f,d)),d}function i(f){e.delete(f)}function o(f,d,S){e.get(f)[d]=S}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:o,dispose:r}}function Dd(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function Va(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function ka(){const e=[];let n=0;const t=[],i=[],o=[];function r(){n=0,t.length=0,i.length=0,o.length=0}function f(m,v,T,N,L,s){let a=e[n];return a===void 0?(a={id:m.id,object:m,geometry:v,material:T,groupOrder:N,renderOrder:m.renderOrder,z:L,group:s},e[n]=a):(a.id=m.id,a.object=m,a.geometry=v,a.material=T,a.groupOrder=N,a.renderOrder=m.renderOrder,a.z=L,a.group=s),n++,a}function d(m,v,T,N,L,s){const a=f(m,v,T,N,L,s);T.transmission>0?i.push(a):T.transparent===!0?o.push(a):t.push(a)}function S(m,v,T,N,L,s){const a=f(m,v,T,N,L,s);T.transmission>0?i.unshift(a):T.transparent===!0?o.unshift(a):t.unshift(a)}function E(m,v){t.length>1&&t.sort(m||Dd),i.length>1&&i.sort(v||Va),o.length>1&&o.sort(v||Va)}function C(){for(let m=n,v=e.length;m<v;m++){const T=e[m];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:t,transmissive:i,transparent:o,init:r,push:d,unshift:S,finish:C,sort:E}}function Ld(){let e=new WeakMap;function n(i,o){const r=e.get(i);let f;return r===void 0?(f=new ka,e.set(i,[f])):o>=r.length?(f=new ka,r.push(f)):f=r[o],f}function t(){e=new WeakMap}return{get:n,dispose:t}}function yd(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new ce,color:new Ye};break;case"SpotLight":t={position:new ce,direction:new ce,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ce,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ce,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new ce,halfWidth:new ce,halfHeight:new ce};break}return e[n.id]=t,t}}}function Ud(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Id=0;function Nd(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Od(e){const n=new yd,t=Ud(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let E=0;E<9;E++)i.probe.push(new ce);const o=new ce,r=new St,f=new St;function d(E){let C=0,m=0,v=0;for(let u=0;u<9;u++)i.probe[u].set(0,0,0);let T=0,N=0,L=0,s=0,a=0,M=0,x=0,_=0,w=0,R=0,b=0;E.sort(Nd);for(let u=0,p=E.length;u<p;u++){const y=E[u],B=y.color,W=y.intensity,Y=y.distance,q=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)C+=B.r*W,m+=B.g*W,v+=B.b*W;else if(y.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(y.sh.coefficients[z],W);b++}else if(y.isDirectionalLight){const z=n.get(y);if(z.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const te=y.shadow,V=t.get(y);V.shadowIntensity=te.intensity,V.shadowBias=te.bias,V.shadowNormalBias=te.normalBias,V.shadowRadius=te.radius,V.shadowMapSize=te.mapSize,i.directionalShadow[T]=V,i.directionalShadowMap[T]=q,i.directionalShadowMatrix[T]=y.shadow.matrix,M++}i.directional[T]=z,T++}else if(y.isSpotLight){const z=n.get(y);z.position.setFromMatrixPosition(y.matrixWorld),z.color.copy(B).multiplyScalar(W),z.distance=Y,z.coneCos=Math.cos(y.angle),z.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),z.decay=y.decay,i.spot[L]=z;const te=y.shadow;if(y.map&&(i.spotLightMap[w]=y.map,w++,te.updateMatrices(y),y.castShadow&&R++),i.spotLightMatrix[L]=te.matrix,y.castShadow){const V=t.get(y);V.shadowIntensity=te.intensity,V.shadowBias=te.bias,V.shadowNormalBias=te.normalBias,V.shadowRadius=te.radius,V.shadowMapSize=te.mapSize,i.spotShadow[L]=V,i.spotShadowMap[L]=q,_++}L++}else if(y.isRectAreaLight){const z=n.get(y);z.color.copy(B).multiplyScalar(W),z.halfWidth.set(y.width*.5,0,0),z.halfHeight.set(0,y.height*.5,0),i.rectArea[s]=z,s++}else if(y.isPointLight){const z=n.get(y);if(z.color.copy(y.color).multiplyScalar(y.intensity),z.distance=y.distance,z.decay=y.decay,y.castShadow){const te=y.shadow,V=t.get(y);V.shadowIntensity=te.intensity,V.shadowBias=te.bias,V.shadowNormalBias=te.normalBias,V.shadowRadius=te.radius,V.shadowMapSize=te.mapSize,V.shadowCameraNear=te.camera.near,V.shadowCameraFar=te.camera.far,i.pointShadow[N]=V,i.pointShadowMap[N]=q,i.pointShadowMatrix[N]=y.shadow.matrix,x++}i.point[N]=z,N++}else if(y.isHemisphereLight){const z=n.get(y);z.skyColor.copy(y.color).multiplyScalar(W),z.groundColor.copy(y.groundColor).multiplyScalar(W),i.hemi[a]=z,a++}}s>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ie.LTC_FLOAT_1,i.rectAreaLTC2=ie.LTC_FLOAT_2):(i.rectAreaLTC1=ie.LTC_HALF_1,i.rectAreaLTC2=ie.LTC_HALF_2)),i.ambient[0]=C,i.ambient[1]=m,i.ambient[2]=v;const I=i.hash;(I.directionalLength!==T||I.pointLength!==N||I.spotLength!==L||I.rectAreaLength!==s||I.hemiLength!==a||I.numDirectionalShadows!==M||I.numPointShadows!==x||I.numSpotShadows!==_||I.numSpotMaps!==w||I.numLightProbes!==b)&&(i.directional.length=T,i.spot.length=L,i.rectArea.length=s,i.point.length=N,i.hemi.length=a,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=_+w-R,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=b,I.directionalLength=T,I.pointLength=N,I.spotLength=L,I.rectAreaLength=s,I.hemiLength=a,I.numDirectionalShadows=M,I.numPointShadows=x,I.numSpotShadows=_,I.numSpotMaps=w,I.numLightProbes=b,i.version=Id++)}function S(E,C){let m=0,v=0,T=0,N=0,L=0;const s=C.matrixWorldInverse;for(let a=0,M=E.length;a<M;a++){const x=E[a];if(x.isDirectionalLight){const _=i.directional[m];_.direction.setFromMatrixPosition(x.matrixWorld),o.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(o),_.direction.transformDirection(s),m++}else if(x.isSpotLight){const _=i.spot[T];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(s),_.direction.setFromMatrixPosition(x.matrixWorld),o.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(o),_.direction.transformDirection(s),T++}else if(x.isRectAreaLight){const _=i.rectArea[N];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(s),f.identity(),r.copy(x.matrixWorld),r.premultiply(s),f.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(f),_.halfHeight.applyMatrix4(f),N++}else if(x.isPointLight){const _=i.point[v];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(s),v++}else if(x.isHemisphereLight){const _=i.hemi[L];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(s),L++}}}return{setup:d,setupView:S,state:i}}function za(e){const n=new Od(e),t=[],i=[];function o(C){E.camera=C,t.length=0,i.length=0}function r(C){t.push(C)}function f(C){i.push(C)}function d(){n.setup(t)}function S(C){n.setupView(t,C)}const E={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:o,state:E,setupLights:d,setupLightsView:S,pushLight:r,pushShadow:f}}function Fd(e){let n=new WeakMap;function t(o,r=0){const f=n.get(o);let d;return f===void 0?(d=new za(e),n.set(o,[d])):r>=f.length?(d=new za(e),f.push(d)):d=f[r],d}function i(){n=new WeakMap}return{get:t,dispose:i}}const Bd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Hd=`uniform sampler2D shadow_pass;
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
}`;function Gd(e,n,t){let i=new cr;const o=new ke,r=new ke,f=new ft,d=new xo({depthPacking:Ao}),S=new Ro,E={},C=t.maxTextureSize,m={[sn]:Mt,[Mt]:sn,[Tt]:Tt},v=new Pt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:Bd,fragmentShader:Hd}),T=v.clone();T.defines.HORIZONTAL_PASS=1;const N=new Ai;N.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const L=new ut(N,v),s=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ur;let a=this.type;this.render=function(R,b,I){if(s.enabled===!1||s.autoUpdate===!1&&s.needsUpdate===!1||R.length===0)return;const u=e.getRenderTarget(),p=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Ft),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const W=a!==bt&&this.type===bt,Y=a===bt&&this.type!==bt;for(let q=0,z=R.length;q<z;q++){const te=R[q],V=te.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;o.copy(V.mapSize);const ve=V.getFrameExtents();if(o.multiply(ve),r.copy(V.mapSize),(o.x>C||o.y>C)&&(o.x>C&&(r.x=Math.floor(C/ve.x),o.x=r.x*ve.x,V.mapSize.x=r.x),o.y>C&&(r.y=Math.floor(C/ve.y),o.y=r.y*ve.y,V.mapSize.y=r.y)),V.map===null||W===!0||Y===!0){const ye=this.type!==bt?{minFilter:an,magFilter:an}:{};V.map!==null&&V.map.dispose(),V.map=new Zt(o.x,o.y,ye),V.map.texture.name=te.name+".shadowMap",V.camera.updateProjectionMatrix()}e.setRenderTarget(V.map),e.clear();const xe=V.getViewportCount();for(let ye=0;ye<xe;ye++){const He=V.getViewport(ye);f.set(r.x*He.x,r.y*He.y,r.x*He.z,r.y*He.w),B.viewport(f),V.updateMatrices(te,ye),i=V.getFrustum(),_(b,I,V.camera,te,this.type)}V.isPointLightShadow!==!0&&this.type===bt&&M(V,I),V.needsUpdate=!1}a=this.type,s.needsUpdate=!1,e.setRenderTarget(u,p,y)};function M(R,b){const I=n.update(L);v.defines.VSM_SAMPLES!==R.blurSamples&&(v.defines.VSM_SAMPLES=R.blurSamples,T.defines.VSM_SAMPLES=R.blurSamples,v.needsUpdate=!0,T.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Zt(o.x,o.y)),v.uniforms.shadow_pass.value=R.map.texture,v.uniforms.resolution.value=R.mapSize,v.uniforms.radius.value=R.radius,e.setRenderTarget(R.mapPass),e.clear(),e.renderBufferDirect(b,null,I,v,L,null),T.uniforms.shadow_pass.value=R.mapPass.texture,T.uniforms.resolution.value=R.mapSize,T.uniforms.radius.value=R.radius,e.setRenderTarget(R.map),e.clear(),e.renderBufferDirect(b,null,I,T,L,null)}function x(R,b,I,u){let p=null;const y=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(y!==void 0)p=y;else if(p=I.isPointLight===!0?S:d,e.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const B=p.uuid,W=b.uuid;let Y=E[B];Y===void 0&&(Y={},E[B]=Y);let q=Y[W];q===void 0&&(q=p.clone(),Y[W]=q,b.addEventListener("dispose",w)),p=q}if(p.visible=b.visible,p.wireframe=b.wireframe,u===bt?p.side=b.shadowSide!==null?b.shadowSide:b.side:p.side=b.shadowSide!==null?b.shadowSide:m[b.side],p.alphaMap=b.alphaMap,p.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,p.map=b.map,p.clipShadows=b.clipShadows,p.clippingPlanes=b.clippingPlanes,p.clipIntersection=b.clipIntersection,p.displacementMap=b.displacementMap,p.displacementScale=b.displacementScale,p.displacementBias=b.displacementBias,p.wireframeLinewidth=b.wireframeLinewidth,p.linewidth=b.linewidth,I.isPointLight===!0&&p.isMeshDistanceMaterial===!0){const B=e.properties.get(p);B.light=I}return p}function _(R,b,I,u,p){if(R.visible===!1)return;if(R.layers.test(b.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&p===bt)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const W=n.update(R),Y=R.material;if(Array.isArray(Y)){const q=W.groups;for(let z=0,te=q.length;z<te;z++){const V=q[z],ve=Y[V.materialIndex];if(ve&&ve.visible){const xe=x(R,ve,u,p);R.onBeforeShadow(e,R,b,I,W,xe,V),e.renderBufferDirect(I,null,W,xe,R,V),R.onAfterShadow(e,R,b,I,W,xe,V)}}}else if(Y.visible){const q=x(R,Y,u,p);R.onBeforeShadow(e,R,b,I,W,q,null),e.renderBufferDirect(I,null,W,q,R,null),R.onAfterShadow(e,R,b,I,W,q,null)}}const B=R.children;for(let W=0,Y=B.length;W<Y;W++)_(B[W],b,I,u,p)}function w(R){R.target.removeEventListener("dispose",w);for(const I in E){const u=E[I],p=R.target.uuid;p in u&&(u[p].dispose(),delete u[p])}}}const Vd={[_i]:mi,[hi]:di,[pi]:fi,[Cn]:ui,[mi]:_i,[di]:hi,[fi]:pi,[ui]:Cn};function kd(e,n){function t(){let A=!1;const J=new ft;let ne=null;const le=new ft(0,0,0,0);return{setMask:function(Z){ne!==Z&&!A&&(e.colorMask(Z,Z,Z,Z),ne=Z)},setLocked:function(Z){A=Z},setClear:function(Z,X,ue,Pe,Ke){Ke===!0&&(Z*=Pe,X*=Pe,ue*=Pe),J.set(Z,X,ue,Pe),le.equals(J)===!1&&(e.clearColor(Z,X,ue,Pe),le.copy(J))},reset:function(){A=!1,ne=null,le.set(-1,0,0,0)}}}function i(){let A=!1,J=!1,ne=null,le=null,Z=null;return{setReversed:function(X){if(J!==X){const ue=n.get("EXT_clip_control");X?ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.ZERO_TO_ONE_EXT):ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.NEGATIVE_ONE_TO_ONE_EXT),J=X;const Pe=Z;Z=null,this.setClear(Pe)}},getReversed:function(){return J},setTest:function(X){X?$(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(X){ne!==X&&!A&&(e.depthMask(X),ne=X)},setFunc:function(X){if(J&&(X=Vd[X]),le!==X){switch(X){case _i:e.depthFunc(e.NEVER);break;case mi:e.depthFunc(e.ALWAYS);break;case hi:e.depthFunc(e.LESS);break;case Cn:e.depthFunc(e.LEQUAL);break;case pi:e.depthFunc(e.EQUAL);break;case ui:e.depthFunc(e.GEQUAL);break;case di:e.depthFunc(e.GREATER);break;case fi:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}le=X}},setLocked:function(X){A=X},setClear:function(X){Z!==X&&(J&&(X=1-X),e.clearDepth(X),Z=X)},reset:function(){A=!1,ne=null,le=null,Z=null,J=!1}}}function o(){let A=!1,J=null,ne=null,le=null,Z=null,X=null,ue=null,Pe=null,Ke=null;return{setTest:function(Ge){A||(Ge?$(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(Ge){J!==Ge&&!A&&(e.stencilMask(Ge),J=Ge)},setFunc:function(Ge,Rt,xt){(ne!==Ge||le!==Rt||Z!==xt)&&(e.stencilFunc(Ge,Rt,xt),ne=Ge,le=Rt,Z=xt)},setOp:function(Ge,Rt,xt){(X!==Ge||ue!==Rt||Pe!==xt)&&(e.stencilOp(Ge,Rt,xt),X=Ge,ue=Rt,Pe=xt)},setLocked:function(Ge){A=Ge},setClear:function(Ge){Ke!==Ge&&(e.clearStencil(Ge),Ke=Ge)},reset:function(){A=!1,J=null,ne=null,le=null,Z=null,X=null,ue=null,Pe=null,Ke=null}}}const r=new t,f=new i,d=new o,S=new WeakMap,E=new WeakMap;let C={},m={},v=new WeakMap,T=[],N=null,L=!1,s=null,a=null,M=null,x=null,_=null,w=null,R=null,b=new Ye(0,0,0),I=0,u=!1,p=null,y=null,B=null,W=null,Y=null;const q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,te=0;const V=e.getParameter(e.VERSION);V.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(V)[1]),z=te>=1):V.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),z=te>=2);let ve=null,xe={};const ye=e.getParameter(e.SCISSOR_BOX),He=e.getParameter(e.VIEWPORT),nt=new ft().fromArray(ye),et=new ft().fromArray(He);function We(A,J,ne,le){const Z=new Uint8Array(4),X=e.createTexture();e.bindTexture(A,X),e.texParameteri(A,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(A,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ue=0;ue<ne;ue++)A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY?e.texImage3D(J,0,e.RGBA,1,1,le,0,e.RGBA,e.UNSIGNED_BYTE,Z):e.texImage2D(J+ue,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Z);return X}const k={};k[e.TEXTURE_2D]=We(e.TEXTURE_2D,e.TEXTURE_2D,1),k[e.TEXTURE_CUBE_MAP]=We(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[e.TEXTURE_2D_ARRAY]=We(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),k[e.TEXTURE_3D]=We(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),f.setClear(1),d.setClear(0),$(e.DEPTH_TEST),f.setFunc(Cn),be(!1),pe(da),$(e.CULL_FACE),Ze(Ft);function $(A){C[A]!==!0&&(e.enable(A),C[A]=!0)}function fe(A){C[A]!==!1&&(e.disable(A),C[A]=!1)}function we(A,J){return m[A]!==J?(e.bindFramebuffer(A,J),m[A]=J,A===e.DRAW_FRAMEBUFFER&&(m[e.FRAMEBUFFER]=J),A===e.FRAMEBUFFER&&(m[e.DRAW_FRAMEBUFFER]=J),!0):!1}function Se(A,J){let ne=T,le=!1;if(A){ne=v.get(J),ne===void 0&&(ne=[],v.set(J,ne));const Z=A.textures;if(ne.length!==Z.length||ne[0]!==e.COLOR_ATTACHMENT0){for(let X=0,ue=Z.length;X<ue;X++)ne[X]=e.COLOR_ATTACHMENT0+X;ne.length=Z.length,le=!0}}else ne[0]!==e.BACK&&(ne[0]=e.BACK,le=!0);le&&e.drawBuffers(ne)}function Oe(A){return N!==A?(e.useProgram(A),N=A,!0):!1}const ct={[en]:e.FUNC_ADD,[$r]:e.FUNC_SUBTRACT,[qr]:e.FUNC_REVERSE_SUBTRACT};ct[os]=e.MIN,ct[ss]=e.MAX;const g={[fo]:e.ZERO,[co]:e.ONE,[lo]:e.SRC_COLOR,[so]:e.SRC_ALPHA,[oo]:e.SRC_ALPHA_SATURATE,[ro]:e.DST_COLOR,[ao]:e.DST_ALPHA,[io]:e.ONE_MINUS_SRC_COLOR,[no]:e.ONE_MINUS_SRC_ALPHA,[to]:e.ONE_MINUS_DST_COLOR,[eo]:e.ONE_MINUS_DST_ALPHA,[Jr]:e.CONSTANT_COLOR,[Qr]:e.ONE_MINUS_CONSTANT_COLOR,[jr]:e.CONSTANT_ALPHA,[Zr]:e.ONE_MINUS_CONSTANT_ALPHA};function Ze(A,J,ne,le,Z,X,ue,Pe,Ke,Ge){if(A===Ft){L===!0&&(fe(e.BLEND),L=!1);return}if(L===!1&&($(e.BLEND),L=!0),A!==Oo){if(A!==s||Ge!==u){if((a!==en||_!==en)&&(e.blendEquation(e.FUNC_ADD),a=en,_=en),Ge)switch(A){case An:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ha:e.blendFunc(e.ONE,e.ONE);break;case pa:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case ua:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}else switch(A){case An:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ha:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case pa:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ua:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}M=null,x=null,w=null,R=null,b.set(0,0,0),I=0,s=A,u=Ge}return}Z=Z||J,X=X||ne,ue=ue||le,(J!==a||Z!==_)&&(e.blendEquationSeparate(ct[J],ct[Z]),a=J,_=Z),(ne!==M||le!==x||X!==w||ue!==R)&&(e.blendFuncSeparate(g[ne],g[le],g[X],g[ue]),M=ne,x=le,w=X,R=ue),(Pe.equals(b)===!1||Ke!==I)&&(e.blendColor(Pe.r,Pe.g,Pe.b,Ke),b.copy(Pe),I=Ke),s=A,u=!1}function De(A,J){A.side===Tt?fe(e.CULL_FACE):$(e.CULL_FACE);let ne=A.side===Mt;J&&(ne=!ne),be(ne),A.blending===An&&A.transparent===!1?Ze(Ft):Ze(A.blending,A.blendEquation,A.blendSrc,A.blendDst,A.blendEquationAlpha,A.blendSrcAlpha,A.blendDstAlpha,A.blendColor,A.blendAlpha,A.premultipliedAlpha),f.setFunc(A.depthFunc),f.setTest(A.depthTest),f.setMask(A.depthWrite),r.setMask(A.colorWrite);const le=A.stencilWrite;d.setTest(le),le&&(d.setMask(A.stencilWriteMask),d.setFunc(A.stencilFunc,A.stencilRef,A.stencilFuncMask),d.setOp(A.stencilFail,A.stencilZFail,A.stencilZPass)),he(A.polygonOffset,A.polygonOffsetFactor,A.polygonOffsetUnits),A.alphaToCoverage===!0?$(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(A){p!==A&&(A?e.frontFace(e.CW):e.frontFace(e.CCW),p=A)}function pe(A){A!==Io?($(e.CULL_FACE),A!==y&&(A===da?e.cullFace(e.BACK):A===No?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):fe(e.CULL_FACE),y=A}function je(A){A!==B&&(z&&e.lineWidth(A),B=A)}function he(A,J,ne){A?($(e.POLYGON_OFFSET_FILL),(W!==J||Y!==ne)&&(e.polygonOffset(J,ne),W=J,Y=ne)):fe(e.POLYGON_OFFSET_FILL)}function Ue(A){A?$(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function lt(A){A===void 0&&(A=e.TEXTURE0+q-1),ve!==A&&(e.activeTexture(A),ve=A)}function it(A,J,ne){ne===void 0&&(ve===null?ne=e.TEXTURE0+q-1:ne=ve);let le=xe[ne];le===void 0&&(le={type:void 0,texture:void 0},xe[ne]=le),(le.type!==A||le.texture!==J)&&(ve!==ne&&(e.activeTexture(ne),ve=ne),e.bindTexture(A,J||k[A]),le.type=A,le.texture=J)}function h(){const A=xe[ve];A!==void 0&&A.type!==void 0&&(e.bindTexture(A.type,null),A.type=void 0,A.texture=void 0)}function l(){try{e.compressedTexImage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function U(){try{e.compressedTexImage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function G(){try{e.texSubImage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function K(){try{e.texSubImage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function H(){try{e.compressedTexSubImage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ee(){try{e.texStorage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function me(){try{e.texStorage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function _e(){try{e.texImage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Q(){try{e.texImage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function oe(A){nt.equals(A)===!1&&(e.scissor(A.x,A.y,A.z,A.w),nt.copy(A))}function Re(A){et.equals(A)===!1&&(e.viewport(A.x,A.y,A.z,A.w),et.copy(A))}function ge(A,J){let ne=E.get(J);ne===void 0&&(ne=new WeakMap,E.set(J,ne));let le=ne.get(A);le===void 0&&(le=e.getUniformBlockIndex(J,A.name),ne.set(A,le))}function ae(A,J){const le=E.get(J).get(A);S.get(J)!==le&&(e.uniformBlockBinding(J,le,A.__bindingPointIndex),S.set(J,le))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),f.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),C={},ve=null,xe={},m={},v=new WeakMap,T=[],N=null,L=!1,s=null,a=null,M=null,x=null,_=null,w=null,R=null,b=new Ye(0,0,0),I=0,u=!1,p=null,y=null,B=null,W=null,Y=null,nt.set(0,0,e.canvas.width,e.canvas.height),et.set(0,0,e.canvas.width,e.canvas.height),r.reset(),f.reset(),d.reset()}return{buffers:{color:r,depth:f,stencil:d},enable:$,disable:fe,bindFramebuffer:we,drawBuffers:Se,useProgram:Oe,setBlending:Ze,setMaterial:De,setFlipSided:be,setCullFace:pe,setLineWidth:je,setPolygonOffset:he,setScissorTest:Ue,activeTexture:lt,bindTexture:it,unbindTexture:h,compressedTexImage2D:l,compressedTexImage3D:U,texImage2D:_e,texImage3D:Q,updateUBOMapping:ge,uniformBlockBinding:ae,texStorage2D:ee,texStorage3D:me,texSubImage2D:G,texSubImage3D:K,compressedTexSubImage2D:H,compressedTexSubImage3D:Ee,scissor:oe,viewport:Re,reset:Le}}function zd(e,n,t,i,o,r,f){const d=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,S=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),E=new ke,C=new WeakMap;let m;const v=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(h,l){return T?new OffscreenCanvas(h,l):ns("canvas")}function L(h,l,U){let G=1;const K=it(h);if((K.width>U||K.height>U)&&(G=U/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&h instanceof ImageBitmap||typeof VideoFrame<"u"&&h instanceof VideoFrame){const H=Math.floor(G*K.width),Ee=Math.floor(G*K.height);m===void 0&&(m=N(H,Ee));const ee=l?N(H,Ee):m;return ee.width=H,ee.height=Ee,ee.getContext("2d").drawImage(h,0,0,H,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+H+"x"+Ee+")."),ee}else return"data"in h&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),h;return h}function s(h){return h.generateMipmaps}function a(h){e.generateMipmap(h)}function M(h){return h.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:h.isWebGL3DRenderTarget?e.TEXTURE_3D:h.isWebGLArrayRenderTarget||h.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function x(h,l,U,G,K=!1){if(h!==null){if(e[h]!==void 0)return e[h];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+h+"'")}let H=l;if(l===e.RED&&(U===e.FLOAT&&(H=e.R32F),U===e.HALF_FLOAT&&(H=e.R16F),U===e.UNSIGNED_BYTE&&(H=e.R8)),l===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.R8UI),U===e.UNSIGNED_SHORT&&(H=e.R16UI),U===e.UNSIGNED_INT&&(H=e.R32UI),U===e.BYTE&&(H=e.R8I),U===e.SHORT&&(H=e.R16I),U===e.INT&&(H=e.R32I)),l===e.RG&&(U===e.FLOAT&&(H=e.RG32F),U===e.HALF_FLOAT&&(H=e.RG16F),U===e.UNSIGNED_BYTE&&(H=e.RG8)),l===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.RG8UI),U===e.UNSIGNED_SHORT&&(H=e.RG16UI),U===e.UNSIGNED_INT&&(H=e.RG32UI),U===e.BYTE&&(H=e.RG8I),U===e.SHORT&&(H=e.RG16I),U===e.INT&&(H=e.RG32I)),l===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.RGB8UI),U===e.UNSIGNED_SHORT&&(H=e.RGB16UI),U===e.UNSIGNED_INT&&(H=e.RGB32UI),U===e.BYTE&&(H=e.RGB8I),U===e.SHORT&&(H=e.RGB16I),U===e.INT&&(H=e.RGB32I)),l===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.RGBA8UI),U===e.UNSIGNED_SHORT&&(H=e.RGBA16UI),U===e.UNSIGNED_INT&&(H=e.RGBA32UI),U===e.BYTE&&(H=e.RGBA8I),U===e.SHORT&&(H=e.RGBA16I),U===e.INT&&(H=e.RGBA32I)),l===e.RGB&&(U===e.UNSIGNED_INT_5_9_9_9_REV&&(H=e.RGB9_E5),U===e.UNSIGNED_INT_10F_11F_11F_REV&&(H=e.R11F_G11F_B10F)),l===e.RGBA){const Ee=K?Tr:at.getTransfer(G);U===e.FLOAT&&(H=e.RGBA32F),U===e.HALF_FLOAT&&(H=e.RGBA16F),U===e.UNSIGNED_BYTE&&(H=Ee===$e?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT_4_4_4_4&&(H=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&(H=e.RGB5_A1)}return(H===e.R16F||H===e.R32F||H===e.RG16F||H===e.RG32F||H===e.RGBA16F||H===e.RGBA32F)&&n.get("EXT_color_buffer_float"),H}function _(h,l){let U;return h?l===null||l===cn||l===ln?U=e.DEPTH24_STENCIL8:l===Ot?U=e.DEPTH32F_STENCIL8:l===wn&&(U=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):l===null||l===cn||l===ln?U=e.DEPTH_COMPONENT24:l===Ot?U=e.DEPTH_COMPONENT32F:l===wn&&(U=e.DEPTH_COMPONENT16),U}function w(h,l){return s(h)===!0||h.isFramebufferTexture&&h.minFilter!==an&&h.minFilter!==Wt?Math.log2(Math.max(l.width,l.height))+1:h.mipmaps!==void 0&&h.mipmaps.length>0?h.mipmaps.length:h.isCompressedTexture&&Array.isArray(h.image)?l.mipmaps.length:1}function R(h){const l=h.target;l.removeEventListener("dispose",R),I(l),l.isVideoTexture&&C.delete(l)}function b(h){const l=h.target;l.removeEventListener("dispose",b),p(l)}function I(h){const l=i.get(h);if(l.__webglInit===void 0)return;const U=h.source,G=v.get(U);if(G){const K=G[l.__cacheKey];K.usedTimes--,K.usedTimes===0&&u(h),Object.keys(G).length===0&&v.delete(U)}i.remove(h)}function u(h){const l=i.get(h);e.deleteTexture(l.__webglTexture);const U=h.source,G=v.get(U);delete G[l.__cacheKey],f.memory.textures--}function p(h){const l=i.get(h);if(h.depthTexture&&(h.depthTexture.dispose(),i.remove(h.depthTexture)),h.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(l.__webglFramebuffer[G]))for(let K=0;K<l.__webglFramebuffer[G].length;K++)e.deleteFramebuffer(l.__webglFramebuffer[G][K]);else e.deleteFramebuffer(l.__webglFramebuffer[G]);l.__webglDepthbuffer&&e.deleteRenderbuffer(l.__webglDepthbuffer[G])}else{if(Array.isArray(l.__webglFramebuffer))for(let G=0;G<l.__webglFramebuffer.length;G++)e.deleteFramebuffer(l.__webglFramebuffer[G]);else e.deleteFramebuffer(l.__webglFramebuffer);if(l.__webglDepthbuffer&&e.deleteRenderbuffer(l.__webglDepthbuffer),l.__webglMultisampledFramebuffer&&e.deleteFramebuffer(l.__webglMultisampledFramebuffer),l.__webglColorRenderbuffer)for(let G=0;G<l.__webglColorRenderbuffer.length;G++)l.__webglColorRenderbuffer[G]&&e.deleteRenderbuffer(l.__webglColorRenderbuffer[G]);l.__webglDepthRenderbuffer&&e.deleteRenderbuffer(l.__webglDepthRenderbuffer)}const U=h.textures;for(let G=0,K=U.length;G<K;G++){const H=i.get(U[G]);H.__webglTexture&&(e.deleteTexture(H.__webglTexture),f.memory.textures--),i.remove(U[G])}i.remove(h)}let y=0;function B(){y=0}function W(){const h=y;return h>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+h+" texture units while this GPU supports only "+o.maxTextures),y+=1,h}function Y(h){const l=[];return l.push(h.wrapS),l.push(h.wrapT),l.push(h.wrapR||0),l.push(h.magFilter),l.push(h.minFilter),l.push(h.anisotropy),l.push(h.internalFormat),l.push(h.format),l.push(h.type),l.push(h.generateMipmaps),l.push(h.premultiplyAlpha),l.push(h.flipY),l.push(h.unpackAlignment),l.push(h.colorSpace),l.join()}function q(h,l){const U=i.get(h);if(h.isVideoTexture&&Ue(h),h.isRenderTargetTexture===!1&&h.isExternalTexture!==!0&&h.version>0&&U.__version!==h.version){const G=h.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(U,h,l);return}}else h.isExternalTexture&&(U.__webglTexture=h.sourceTexture?h.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+l)}function z(h,l){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){k(U,h,l);return}t.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+l)}function te(h,l){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){k(U,h,l);return}t.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+l)}function V(h,l){const U=i.get(h);if(h.version>0&&U.__version!==h.version){$(U,h,l);return}t.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+l)}const ve={[ho]:e.REPEAT,[po]:e.CLAMP_TO_EDGE,[uo]:e.MIRRORED_REPEAT},xe={[an]:e.NEAREST,[mo]:e.NEAREST_MIPMAP_NEAREST,[hn]:e.NEAREST_MIPMAP_LINEAR,[Wt]:e.LINEAR,[zn]:e.LINEAR_MIPMAP_NEAREST,[tn]:e.LINEAR_MIPMAP_LINEAR},ye={[To]:e.NEVER,[Mo]:e.ALWAYS,[So]:e.LESS,[dr]:e.LEQUAL,[Eo]:e.EQUAL,[vo]:e.GEQUAL,[go]:e.GREATER,[_o]:e.NOTEQUAL};function He(h,l){if(l.type===Ot&&n.has("OES_texture_float_linear")===!1&&(l.magFilter===Wt||l.magFilter===zn||l.magFilter===hn||l.magFilter===tn||l.minFilter===Wt||l.minFilter===zn||l.minFilter===hn||l.minFilter===tn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(h,e.TEXTURE_WRAP_S,ve[l.wrapS]),e.texParameteri(h,e.TEXTURE_WRAP_T,ve[l.wrapT]),(h===e.TEXTURE_3D||h===e.TEXTURE_2D_ARRAY)&&e.texParameteri(h,e.TEXTURE_WRAP_R,ve[l.wrapR]),e.texParameteri(h,e.TEXTURE_MAG_FILTER,xe[l.magFilter]),e.texParameteri(h,e.TEXTURE_MIN_FILTER,xe[l.minFilter]),l.compareFunction&&(e.texParameteri(h,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(h,e.TEXTURE_COMPARE_FUNC,ye[l.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(l.magFilter===an||l.minFilter!==hn&&l.minFilter!==tn||l.type===Ot&&n.has("OES_texture_float_linear")===!1)return;if(l.anisotropy>1||i.get(l).__currentAnisotropy){const U=n.get("EXT_texture_filter_anisotropic");e.texParameterf(h,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(l.anisotropy,o.getMaxAnisotropy())),i.get(l).__currentAnisotropy=l.anisotropy}}}function nt(h,l){let U=!1;h.__webglInit===void 0&&(h.__webglInit=!0,l.addEventListener("dispose",R));const G=l.source;let K=v.get(G);K===void 0&&(K={},v.set(G,K));const H=Y(l);if(H!==h.__cacheKey){K[H]===void 0&&(K[H]={texture:e.createTexture(),usedTimes:0},f.memory.textures++,U=!0),K[H].usedTimes++;const Ee=K[h.__cacheKey];Ee!==void 0&&(K[h.__cacheKey].usedTimes--,Ee.usedTimes===0&&u(l)),h.__cacheKey=H,h.__webglTexture=K[H].texture}return U}function et(h,l,U){return Math.floor(Math.floor(h/U)/l)}function We(h,l,U,G){const H=h.updateRanges;if(H.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,l.width,l.height,U,G,l.data);else{H.sort((Q,oe)=>Q.start-oe.start);let Ee=0;for(let Q=1;Q<H.length;Q++){const oe=H[Ee],Re=H[Q],ge=oe.start+oe.count,ae=et(Re.start,l.width,4),Le=et(oe.start,l.width,4);Re.start<=ge+1&&ae===Le&&et(Re.start+Re.count-1,l.width,4)===ae?oe.count=Math.max(oe.count,Re.start+Re.count-oe.start):(++Ee,H[Ee]=Re)}H.length=Ee+1;const ee=e.getParameter(e.UNPACK_ROW_LENGTH),me=e.getParameter(e.UNPACK_SKIP_PIXELS),_e=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,l.width);for(let Q=0,oe=H.length;Q<oe;Q++){const Re=H[Q],ge=Math.floor(Re.start/4),ae=Math.ceil(Re.count/4),Le=ge%l.width,A=Math.floor(ge/l.width),J=ae,ne=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Le),e.pixelStorei(e.UNPACK_SKIP_ROWS,A),t.texSubImage2D(e.TEXTURE_2D,0,Le,A,J,ne,U,G,l.data)}h.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,ee),e.pixelStorei(e.UNPACK_SKIP_PIXELS,me),e.pixelStorei(e.UNPACK_SKIP_ROWS,_e)}}function k(h,l,U){let G=e.TEXTURE_2D;(l.isDataArrayTexture||l.isCompressedArrayTexture)&&(G=e.TEXTURE_2D_ARRAY),l.isData3DTexture&&(G=e.TEXTURE_3D);const K=nt(h,l),H=l.source;t.bindTexture(G,h.__webglTexture,e.TEXTURE0+U);const Ee=i.get(H);if(H.version!==Ee.__version||K===!0){t.activeTexture(e.TEXTURE0+U);const ee=at.getPrimaries(at.workingColorSpace),me=l.colorSpace===zt?null:at.getPrimaries(l.colorSpace),_e=l.colorSpace===zt||ee===me?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,l.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,l.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,l.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let Q=L(l.image,!1,o.maxTextureSize);Q=lt(l,Q);const oe=r.convert(l.format,l.colorSpace),Re=r.convert(l.type);let ge=x(l.internalFormat,oe,Re,l.colorSpace,l.isVideoTexture);He(G,l);let ae;const Le=l.mipmaps,A=l.isVideoTexture!==!0,J=Ee.__version===void 0||K===!0,ne=H.dataReady,le=w(l,Q);if(l.isDepthTexture)ge=_(l.format===bn,l.type),J&&(A?t.texStorage2D(e.TEXTURE_2D,1,ge,Q.width,Q.height):t.texImage2D(e.TEXTURE_2D,0,ge,Q.width,Q.height,0,oe,Re,null));else if(l.isDataTexture)if(Le.length>0){A&&J&&t.texStorage2D(e.TEXTURE_2D,le,ge,Le[0].width,Le[0].height);for(let Z=0,X=Le.length;Z<X;Z++)ae=Le[Z],A?ne&&t.texSubImage2D(e.TEXTURE_2D,Z,0,0,ae.width,ae.height,oe,Re,ae.data):t.texImage2D(e.TEXTURE_2D,Z,ge,ae.width,ae.height,0,oe,Re,ae.data);l.generateMipmaps=!1}else A?(J&&t.texStorage2D(e.TEXTURE_2D,le,ge,Q.width,Q.height),ne&&We(l,Q,oe,Re)):t.texImage2D(e.TEXTURE_2D,0,ge,Q.width,Q.height,0,oe,Re,Q.data);else if(l.isCompressedTexture)if(l.isCompressedArrayTexture){A&&J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,le,ge,Le[0].width,Le[0].height,Q.depth);for(let Z=0,X=Le.length;Z<X;Z++)if(ae=Le[Z],l.format!==Ct)if(oe!==null)if(A){if(ne)if(l.layerUpdates.size>0){const ue=_a(ae.width,ae.height,l.format,l.type);for(const Pe of l.layerUpdates){const Ke=ae.data.subarray(Pe*ue/ae.data.BYTES_PER_ELEMENT,(Pe+1)*ue/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,Pe,ae.width,ae.height,1,oe,Ke)}l.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,0,ae.width,ae.height,Q.depth,oe,ae.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,Z,ge,ae.width,ae.height,Q.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else A?ne&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,0,ae.width,ae.height,Q.depth,oe,Re,ae.data):t.texImage3D(e.TEXTURE_2D_ARRAY,Z,ge,ae.width,ae.height,Q.depth,0,oe,Re,ae.data)}else{A&&J&&t.texStorage2D(e.TEXTURE_2D,le,ge,Le[0].width,Le[0].height);for(let Z=0,X=Le.length;Z<X;Z++)ae=Le[Z],l.format!==Ct?oe!==null?A?ne&&t.compressedTexSubImage2D(e.TEXTURE_2D,Z,0,0,ae.width,ae.height,oe,ae.data):t.compressedTexImage2D(e.TEXTURE_2D,Z,ge,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):A?ne&&t.texSubImage2D(e.TEXTURE_2D,Z,0,0,ae.width,ae.height,oe,Re,ae.data):t.texImage2D(e.TEXTURE_2D,Z,ge,ae.width,ae.height,0,oe,Re,ae.data)}else if(l.isDataArrayTexture)if(A){if(J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,le,ge,Q.width,Q.height,Q.depth),ne)if(l.layerUpdates.size>0){const Z=_a(Q.width,Q.height,l.format,l.type);for(const X of l.layerUpdates){const ue=Q.data.subarray(X*Z/Q.data.BYTES_PER_ELEMENT,(X+1)*Z/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,X,Q.width,Q.height,1,oe,Re,ue)}l.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,oe,Re,Q.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,ge,Q.width,Q.height,Q.depth,0,oe,Re,Q.data);else if(l.isData3DTexture)A?(J&&t.texStorage3D(e.TEXTURE_3D,le,ge,Q.width,Q.height,Q.depth),ne&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,oe,Re,Q.data)):t.texImage3D(e.TEXTURE_3D,0,ge,Q.width,Q.height,Q.depth,0,oe,Re,Q.data);else if(l.isFramebufferTexture){if(J)if(A)t.texStorage2D(e.TEXTURE_2D,le,ge,Q.width,Q.height);else{let Z=Q.width,X=Q.height;for(let ue=0;ue<le;ue++)t.texImage2D(e.TEXTURE_2D,ue,ge,Z,X,0,oe,Re,null),Z>>=1,X>>=1}}else if(Le.length>0){if(A&&J){const Z=it(Le[0]);t.texStorage2D(e.TEXTURE_2D,le,ge,Z.width,Z.height)}for(let Z=0,X=Le.length;Z<X;Z++)ae=Le[Z],A?ne&&t.texSubImage2D(e.TEXTURE_2D,Z,0,0,oe,Re,ae):t.texImage2D(e.TEXTURE_2D,Z,ge,oe,Re,ae);l.generateMipmaps=!1}else if(A){if(J){const Z=it(Q);t.texStorage2D(e.TEXTURE_2D,le,ge,Z.width,Z.height)}ne&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,oe,Re,Q)}else t.texImage2D(e.TEXTURE_2D,0,ge,oe,Re,Q);s(l)&&a(G),Ee.__version=H.version,l.onUpdate&&l.onUpdate(l)}h.__version=l.version}function $(h,l,U){if(l.image.length!==6)return;const G=nt(h,l),K=l.source;t.bindTexture(e.TEXTURE_CUBE_MAP,h.__webglTexture,e.TEXTURE0+U);const H=i.get(K);if(K.version!==H.__version||G===!0){t.activeTexture(e.TEXTURE0+U);const Ee=at.getPrimaries(at.workingColorSpace),ee=l.colorSpace===zt?null:at.getPrimaries(l.colorSpace),me=l.colorSpace===zt||Ee===ee?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,l.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,l.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,l.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const _e=l.isCompressedTexture||l.image[0].isCompressedTexture,Q=l.image[0]&&l.image[0].isDataTexture,oe=[];for(let X=0;X<6;X++)!_e&&!Q?oe[X]=L(l.image[X],!0,o.maxCubemapSize):oe[X]=Q?l.image[X].image:l.image[X],oe[X]=lt(l,oe[X]);const Re=oe[0],ge=r.convert(l.format,l.colorSpace),ae=r.convert(l.type),Le=x(l.internalFormat,ge,ae,l.colorSpace),A=l.isVideoTexture!==!0,J=H.__version===void 0||G===!0,ne=K.dataReady;let le=w(l,Re);He(e.TEXTURE_CUBE_MAP,l);let Z;if(_e){A&&J&&t.texStorage2D(e.TEXTURE_CUBE_MAP,le,Le,Re.width,Re.height);for(let X=0;X<6;X++){Z=oe[X].mipmaps;for(let ue=0;ue<Z.length;ue++){const Pe=Z[ue];l.format!==Ct?ge!==null?A?ne&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ue,0,0,Pe.width,Pe.height,ge,Pe.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ue,Le,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):A?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ue,0,0,Pe.width,Pe.height,ge,ae,Pe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ue,Le,Pe.width,Pe.height,0,ge,ae,Pe.data)}}}else{if(Z=l.mipmaps,A&&J){Z.length>0&&le++;const X=it(oe[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,le,Le,X.width,X.height)}for(let X=0;X<6;X++)if(Q){A?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,oe[X].width,oe[X].height,ge,ae,oe[X].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Le,oe[X].width,oe[X].height,0,ge,ae,oe[X].data);for(let ue=0;ue<Z.length;ue++){const Ke=Z[ue].image[X].image;A?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ue+1,0,0,Ke.width,Ke.height,ge,ae,Ke.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ue+1,Le,Ke.width,Ke.height,0,ge,ae,Ke.data)}}else{A?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ge,ae,oe[X]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Le,ge,ae,oe[X]);for(let ue=0;ue<Z.length;ue++){const Pe=Z[ue];A?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ue+1,0,0,ge,ae,Pe.image[X]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ue+1,Le,ge,ae,Pe.image[X])}}}s(l)&&a(e.TEXTURE_CUBE_MAP),H.__version=K.version,l.onUpdate&&l.onUpdate(l)}h.__version=l.version}function fe(h,l,U,G,K,H){const Ee=r.convert(U.format,U.colorSpace),ee=r.convert(U.type),me=x(U.internalFormat,Ee,ee,U.colorSpace),_e=i.get(l),Q=i.get(U);if(Q.__renderTarget=l,!_e.__hasExternalTextures){const oe=Math.max(1,l.width>>H),Re=Math.max(1,l.height>>H);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?t.texImage3D(K,H,me,oe,Re,l.depth,0,Ee,ee,null):t.texImage2D(K,H,me,oe,Re,0,Ee,ee,null)}t.bindFramebuffer(e.FRAMEBUFFER,h),he(l)?d.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,G,K,Q.__webglTexture,0,je(l)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,G,K,Q.__webglTexture,H),t.bindFramebuffer(e.FRAMEBUFFER,null)}function we(h,l,U){if(e.bindRenderbuffer(e.RENDERBUFFER,h),l.depthBuffer){const G=l.depthTexture,K=G&&G.isDepthTexture?G.type:null,H=_(l.stencilBuffer,K),Ee=l.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ee=je(l);he(l)?d.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ee,H,l.width,l.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,ee,H,l.width,l.height):e.renderbufferStorage(e.RENDERBUFFER,H,l.width,l.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Ee,e.RENDERBUFFER,h)}else{const G=l.textures;for(let K=0;K<G.length;K++){const H=G[K],Ee=r.convert(H.format,H.colorSpace),ee=r.convert(H.type),me=x(H.internalFormat,Ee,ee,H.colorSpace),_e=je(l);U&&he(l)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,_e,me,l.width,l.height):he(l)?d.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_e,me,l.width,l.height):e.renderbufferStorage(e.RENDERBUFFER,me,l.width,l.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Se(h,l){if(l&&l.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,h),!(l.depthTexture&&l.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=i.get(l.depthTexture);G.__renderTarget=l,(!G.__webglTexture||l.depthTexture.image.width!==l.width||l.depthTexture.image.height!==l.height)&&(l.depthTexture.image.width=l.width,l.depthTexture.image.height=l.height,l.depthTexture.needsUpdate=!0),q(l.depthTexture,0);const K=G.__webglTexture,H=je(l);if(l.depthTexture.format===Ti)he(l)?d.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,H):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(l.depthTexture.format===bn)he(l)?d.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,H):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Oe(h){const l=i.get(h),U=h.isWebGLCubeRenderTarget===!0;if(l.__boundDepthTexture!==h.depthTexture){const G=h.depthTexture;if(l.__depthDisposeCallback&&l.__depthDisposeCallback(),G){const K=()=>{delete l.__boundDepthTexture,delete l.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),l.__depthDisposeCallback=K}l.__boundDepthTexture=G}if(h.depthTexture&&!l.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const G=h.texture.mipmaps;G&&G.length>0?Se(l.__webglFramebuffer[0],h):Se(l.__webglFramebuffer,h)}else if(U){l.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer[G]),l.__webglDepthbuffer[G]===void 0)l.__webglDepthbuffer[G]=e.createRenderbuffer(),we(l.__webglDepthbuffer[G],h,!1);else{const K=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,H=l.__webglDepthbuffer[G];e.bindRenderbuffer(e.RENDERBUFFER,H),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,H)}}else{const G=h.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),l.__webglDepthbuffer===void 0)l.__webglDepthbuffer=e.createRenderbuffer(),we(l.__webglDepthbuffer,h,!1);else{const K=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,H=l.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,H),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,H)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function ct(h,l,U){const G=i.get(h);l!==void 0&&fe(G.__webglFramebuffer,h,h.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&Oe(h)}function g(h){const l=h.texture,U=i.get(h),G=i.get(l);h.addEventListener("dispose",b);const K=h.textures,H=h.isWebGLCubeRenderTarget===!0,Ee=K.length>1;if(Ee||(G.__webglTexture===void 0&&(G.__webglTexture=e.createTexture()),G.__version=l.version,f.memory.textures++),H){U.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(l.mipmaps&&l.mipmaps.length>0){U.__webglFramebuffer[ee]=[];for(let me=0;me<l.mipmaps.length;me++)U.__webglFramebuffer[ee][me]=e.createFramebuffer()}else U.__webglFramebuffer[ee]=e.createFramebuffer()}else{if(l.mipmaps&&l.mipmaps.length>0){U.__webglFramebuffer=[];for(let ee=0;ee<l.mipmaps.length;ee++)U.__webglFramebuffer[ee]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(Ee)for(let ee=0,me=K.length;ee<me;ee++){const _e=i.get(K[ee]);_e.__webglTexture===void 0&&(_e.__webglTexture=e.createTexture(),f.memory.textures++)}if(h.samples>0&&he(h)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let ee=0;ee<K.length;ee++){const me=K[ee];U.__webglColorRenderbuffer[ee]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[ee]);const _e=r.convert(me.format,me.colorSpace),Q=r.convert(me.type),oe=x(me.internalFormat,_e,Q,me.colorSpace,h.isXRRenderTarget===!0),Re=je(h);e.renderbufferStorageMultisample(e.RENDERBUFFER,Re,oe,h.width,h.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ee,e.RENDERBUFFER,U.__webglColorRenderbuffer[ee])}e.bindRenderbuffer(e.RENDERBUFFER,null),h.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),we(U.__webglDepthRenderbuffer,h,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(H){t.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture),He(e.TEXTURE_CUBE_MAP,l);for(let ee=0;ee<6;ee++)if(l.mipmaps&&l.mipmaps.length>0)for(let me=0;me<l.mipmaps.length;me++)fe(U.__webglFramebuffer[ee][me],h,l,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me);else fe(U.__webglFramebuffer[ee],h,l,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);s(l)&&a(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ee=0,me=K.length;ee<me;ee++){const _e=K[ee],Q=i.get(_e);let oe=e.TEXTURE_2D;(h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(oe=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(oe,Q.__webglTexture),He(oe,_e),fe(U.__webglFramebuffer,h,_e,e.COLOR_ATTACHMENT0+ee,oe,0),s(_e)&&a(oe)}t.unbindTexture()}else{let ee=e.TEXTURE_2D;if((h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(ee=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ee,G.__webglTexture),He(ee,l),l.mipmaps&&l.mipmaps.length>0)for(let me=0;me<l.mipmaps.length;me++)fe(U.__webglFramebuffer[me],h,l,e.COLOR_ATTACHMENT0,ee,me);else fe(U.__webglFramebuffer,h,l,e.COLOR_ATTACHMENT0,ee,0);s(l)&&a(ee),t.unbindTexture()}h.depthBuffer&&Oe(h)}function Ze(h){const l=h.textures;for(let U=0,G=l.length;U<G;U++){const K=l[U];if(s(K)){const H=M(h),Ee=i.get(K).__webglTexture;t.bindTexture(H,Ee),a(H),t.unbindTexture()}}}const De=[],be=[];function pe(h){if(h.samples>0){if(he(h)===!1){const l=h.textures,U=h.width,G=h.height;let K=e.COLOR_BUFFER_BIT;const H=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Ee=i.get(h),ee=l.length>1;if(ee)for(let _e=0;_e<l.length;_e++)t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const me=h.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let _e=0;_e<l.length;_e++){if(h.resolveDepthBuffer&&(h.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),h.stencilBuffer&&h.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),ee){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Ee.__webglColorRenderbuffer[_e]);const Q=i.get(l[_e]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Q,0)}e.blitFramebuffer(0,0,U,G,0,0,U,G,K,e.NEAREST),S===!0&&(De.length=0,be.length=0,De.push(e.COLOR_ATTACHMENT0+_e),h.depthBuffer&&h.resolveDepthBuffer===!1&&(De.push(H),be.push(H),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,be)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ee)for(let _e=0;_e<l.length;_e++){t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,Ee.__webglColorRenderbuffer[_e]);const Q=i.get(l[_e]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,Q,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(h.depthBuffer&&h.resolveDepthBuffer===!1&&S){const l=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[l])}}}function je(h){return Math.min(o.maxSamples,h.samples)}function he(h){const l=i.get(h);return h.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&l.__useRenderToTexture!==!1}function Ue(h){const l=f.render.frame;C.get(h)!==l&&(C.set(h,l),h.update())}function lt(h,l){const U=h.colorSpace,G=h.format,K=h.type;return h.isCompressedTexture===!0||h.isVideoTexture===!0||U!==On&&U!==zt&&(at.getTransfer(U)===$e?(G!==Ct||K!==Bt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),l}function it(h){return typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement?(E.width=h.naturalWidth||h.width,E.height=h.naturalHeight||h.height):typeof VideoFrame<"u"&&h instanceof VideoFrame?(E.width=h.displayWidth,E.height=h.displayHeight):(E.width=h.width,E.height=h.height),E}this.allocateTextureUnit=W,this.resetTextureUnits=B,this.setTexture2D=q,this.setTexture2DArray=z,this.setTexture3D=te,this.setTextureCube=V,this.rebindTextures=ct,this.setupRenderTarget=g,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=he}function Wd(e,n){function t(i,o=zt){let r;const f=at.getTransfer(o);if(i===Bt)return e.UNSIGNED_BYTE;if(i===pr)return e.UNSIGNED_SHORT_4_4_4_4;if(i===hr)return e.UNSIGNED_SHORT_5_5_5_1;if(i===bo)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Co)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===wo)return e.BYTE;if(i===Po)return e.SHORT;if(i===wn)return e.UNSIGNED_SHORT;if(i===_r)return e.INT;if(i===cn)return e.UNSIGNED_INT;if(i===Ot)return e.FLOAT;if(i===Nn)return e.HALF_FLOAT;if(i===Do)return e.ALPHA;if(i===Lo)return e.RGB;if(i===Ct)return e.RGBA;if(i===Ti)return e.DEPTH_COMPONENT;if(i===bn)return e.DEPTH_STENCIL;if(i===yo)return e.RED;if(i===gr)return e.RED_INTEGER;if(i===Uo)return e.RG;if(i===vr)return e.RG_INTEGER;if(i===Er)return e.RGBA_INTEGER;if(i===Wn||i===Xn||i===Yn||i===Kn)if(f===$e)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Wn)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Xn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Yn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Kn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Wn)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Xn)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Yn)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Kn)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Fi||i===Bi||i===Hi||i===Gi)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Fi)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Bi)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Hi)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gi)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Vi||i===ki||i===zi)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Vi||i===ki)return f===$e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===zi)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Wi||i===Xi||i===Yi||i===Ki||i===qi||i===$i||i===Zi||i===ji||i===Qi||i===Ji||i===ea||i===ta||i===na||i===ia)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Wi)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xi)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Yi)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ki)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===qi)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===$i)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Zi)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ji)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qi)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ji)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ea)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ta)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===na)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ia)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===aa||i===ra||i===oa)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===aa)return f===$e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ra)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===oa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===sa||i===la||i===ca||i===fa)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===sa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===la)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ca)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===fa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ln?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Xd=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yd=`
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

}`;class Kd{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new mr(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Pt({vertexShader:Xd,fragmentShader:Yd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new dn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qd extends Xr{constructor(n,t){super();const i=this;let o=null,r=1,f=null,d="local-floor",S=1,E=null,C=null,m=null,v=null,T=null,N=null;const L=typeof XRWebGLBinding<"u",s=new Kd,a={},M=t.getContextAttributes();let x=null,_=null;const w=[],R=[],b=new ke;let I=null;const u=new Kt;u.viewport=new ft;const p=new Kt;p.viewport=new ft;const y=[u,p],B=new Yr;let W=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let $=w[k];return $===void 0&&($=new kn,w[k]=$),$.getTargetRaySpace()},this.getControllerGrip=function(k){let $=w[k];return $===void 0&&($=new kn,w[k]=$),$.getGripSpace()},this.getHand=function(k){let $=w[k];return $===void 0&&($=new kn,w[k]=$),$.getHandSpace()};function q(k){const $=R.indexOf(k.inputSource);if($===-1)return;const fe=w[$];fe!==void 0&&(fe.update(k.inputSource,k.frame,E||f),fe.dispatchEvent({type:k.type,data:k.inputSource}))}function z(){o.removeEventListener("select",q),o.removeEventListener("selectstart",q),o.removeEventListener("selectend",q),o.removeEventListener("squeeze",q),o.removeEventListener("squeezestart",q),o.removeEventListener("squeezeend",q),o.removeEventListener("end",z),o.removeEventListener("inputsourceschange",te);for(let k=0;k<w.length;k++){const $=R[k];$!==null&&(R[k]=null,w[k].disconnect($))}W=null,Y=null,s.reset();for(const k in a)delete a[k];n.setRenderTarget(x),T=null,v=null,m=null,o=null,_=null,We.stop(),i.isPresenting=!1,n.setPixelRatio(I),n.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){d=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return E||f},this.setReferenceSpace=function(k){E=k},this.getBaseLayer=function(){return v!==null?v:T},this.getBinding=function(){return m===null&&L&&(m=new XRWebGLBinding(o,t)),m},this.getFrame=function(){return N},this.getSession=function(){return o},this.setSession=async function(k){if(o=k,o!==null){if(x=n.getRenderTarget(),o.addEventListener("select",q),o.addEventListener("selectstart",q),o.addEventListener("selectend",q),o.addEventListener("squeeze",q),o.addEventListener("squeezestart",q),o.addEventListener("squeezeend",q),o.addEventListener("end",z),o.addEventListener("inputsourceschange",te),M.xrCompatible!==!0&&await t.makeXRCompatible(),I=n.getPixelRatio(),n.getSize(b),L&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,we=null,Se=null;M.depth&&(Se=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=M.stencil?bn:Ti,we=M.stencil?ln:cn);const Oe={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};m=this.getBinding(),v=m.createProjectionLayer(Oe),o.updateRenderState({layers:[v]}),n.setPixelRatio(1),n.setSize(v.textureWidth,v.textureHeight,!1),_=new Zt(v.textureWidth,v.textureHeight,{format:Ct,type:Bt,depthTexture:new fr(v.textureWidth,v.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:M.stencil,colorSpace:n.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}else{const fe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};T=new XRWebGLLayer(o,t,fe),o.updateRenderState({baseLayer:T}),n.setPixelRatio(1),n.setSize(T.framebufferWidth,T.framebufferHeight,!1),_=new Zt(T.framebufferWidth,T.framebufferHeight,{format:Ct,type:Bt,colorSpace:n.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:T.ignoreDepthValues===!1,resolveStencilBuffer:T.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(S),E=null,f=await o.requestReferenceSpace(d),We.setContext(o),We.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return s.getDepthTexture()};function te(k){for(let $=0;$<k.removed.length;$++){const fe=k.removed[$],we=R.indexOf(fe);we>=0&&(R[we]=null,w[we].disconnect(fe))}for(let $=0;$<k.added.length;$++){const fe=k.added[$];let we=R.indexOf(fe);if(we===-1){for(let Oe=0;Oe<w.length;Oe++)if(Oe>=R.length){R.push(fe),we=Oe;break}else if(R[Oe]===null){R[Oe]=fe,we=Oe;break}if(we===-1)break}const Se=w[we];Se&&Se.connect(fe)}}const V=new ce,ve=new ce;function xe(k,$,fe){V.setFromMatrixPosition($.matrixWorld),ve.setFromMatrixPosition(fe.matrixWorld);const we=V.distanceTo(ve),Se=$.projectionMatrix.elements,Oe=fe.projectionMatrix.elements,ct=Se[14]/(Se[10]-1),g=Se[14]/(Se[10]+1),Ze=(Se[9]+1)/Se[5],De=(Se[9]-1)/Se[5],be=(Se[8]-1)/Se[0],pe=(Oe[8]+1)/Oe[0],je=ct*be,he=ct*pe,Ue=we/(-be+pe),lt=Ue*-be;if($.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(lt),k.translateZ(Ue),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Se[10]===-1)k.projectionMatrix.copy($.projectionMatrix),k.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const it=ct+Ue,h=g+Ue,l=je-lt,U=he+(we-lt),G=Ze*g/h*it,K=De*g/h*it;k.projectionMatrix.makePerspective(l,U,G,K,it,h),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function ye(k,$){$===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices($.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(o===null)return;let $=k.near,fe=k.far;s.texture!==null&&(s.depthNear>0&&($=s.depthNear),s.depthFar>0&&(fe=s.depthFar)),B.near=p.near=u.near=$,B.far=p.far=u.far=fe,(W!==B.near||Y!==B.far)&&(o.updateRenderState({depthNear:B.near,depthFar:B.far}),W=B.near,Y=B.far),B.layers.mask=k.layers.mask|6,u.layers.mask=B.layers.mask&3,p.layers.mask=B.layers.mask&5;const we=k.parent,Se=B.cameras;ye(B,we);for(let Oe=0;Oe<Se.length;Oe++)ye(Se[Oe],we);Se.length===2?xe(B,u,p):B.projectionMatrix.copy(u.projectionMatrix),He(k,B,we)};function He(k,$,fe){fe===null?k.matrix.copy($.matrixWorld):(k.matrix.copy(fe.matrixWorld),k.matrix.invert(),k.matrix.multiply($.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy($.projectionMatrix),k.projectionMatrixInverse.copy($.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Kr*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(v===null&&T===null))return S},this.setFoveation=function(k){S=k,v!==null&&(v.fixedFoveation=k),T!==null&&T.fixedFoveation!==void 0&&(T.fixedFoveation=k)},this.hasDepthSensing=function(){return s.texture!==null},this.getDepthSensingMesh=function(){return s.getMesh(B)},this.getCameraTexture=function(k){return a[k]};let nt=null;function et(k,$){if(C=$.getViewerPose(E||f),N=$,C!==null){const fe=C.views;T!==null&&(n.setRenderTargetFramebuffer(_,T.framebuffer),n.setRenderTarget(_));let we=!1;fe.length!==B.cameras.length&&(B.cameras.length=0,we=!0);for(let g=0;g<fe.length;g++){const Ze=fe[g];let De=null;if(T!==null)De=T.getViewport(Ze);else{const pe=m.getViewSubImage(v,Ze);De=pe.viewport,g===0&&(n.setRenderTargetTextures(_,pe.colorTexture,pe.depthStencilTexture),n.setRenderTarget(_))}let be=y[g];be===void 0&&(be=new Kt,be.layers.enable(g),be.viewport=new ft,y[g]=be),be.matrix.fromArray(Ze.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Ze.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(De.x,De.y,De.width,De.height),g===0&&(B.matrix.copy(be.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),we===!0&&B.cameras.push(be)}const Se=o.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&L){m=i.getBinding();const g=m.getDepthInformation(fe[0]);g&&g.isValid&&g.texture&&s.init(g,o.renderState)}if(Se&&Se.includes("camera-access")&&L){n.state.unbindTexture(),m=i.getBinding();for(let g=0;g<fe.length;g++){const Ze=fe[g].camera;if(Ze){let De=a[Ze];De||(De=new mr,a[Ze]=De);const be=m.getCameraImage(Ze);De.sourceTexture=be}}}}for(let fe=0;fe<w.length;fe++){const we=R[fe],Se=w[fe];we!==null&&Se!==void 0&&Se.update(we,$,E||f)}nt&&nt(k,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),N=null}const We=new wr;We.setAnimationLoop(et),this.setAnimationLoop=function(k){nt=k},this.dispose=function(){}}}const Ut=new Pn,$d=new St;function Zd(e,n){function t(s,a){s.matrixAutoUpdate===!0&&s.updateMatrix(),a.value.copy(s.matrix)}function i(s,a){a.color.getRGB(s.fogColor.value,Mr(e)),a.isFog?(s.fogNear.value=a.near,s.fogFar.value=a.far):a.isFogExp2&&(s.fogDensity.value=a.density)}function o(s,a,M,x,_){a.isMeshBasicMaterial||a.isMeshLambertMaterial?r(s,a):a.isMeshToonMaterial?(r(s,a),m(s,a)):a.isMeshPhongMaterial?(r(s,a),C(s,a)):a.isMeshStandardMaterial?(r(s,a),v(s,a),a.isMeshPhysicalMaterial&&T(s,a,_)):a.isMeshMatcapMaterial?(r(s,a),N(s,a)):a.isMeshDepthMaterial?r(s,a):a.isMeshDistanceMaterial?(r(s,a),L(s,a)):a.isMeshNormalMaterial?r(s,a):a.isLineBasicMaterial?(f(s,a),a.isLineDashedMaterial&&d(s,a)):a.isPointsMaterial?S(s,a,M,x):a.isSpriteMaterial?E(s,a):a.isShadowMaterial?(s.color.value.copy(a.color),s.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}function r(s,a){s.opacity.value=a.opacity,a.color&&s.diffuse.value.copy(a.color),a.emissive&&s.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(s.map.value=a.map,t(a.map,s.mapTransform)),a.alphaMap&&(s.alphaMap.value=a.alphaMap,t(a.alphaMap,s.alphaMapTransform)),a.bumpMap&&(s.bumpMap.value=a.bumpMap,t(a.bumpMap,s.bumpMapTransform),s.bumpScale.value=a.bumpScale,a.side===Mt&&(s.bumpScale.value*=-1)),a.normalMap&&(s.normalMap.value=a.normalMap,t(a.normalMap,s.normalMapTransform),s.normalScale.value.copy(a.normalScale),a.side===Mt&&s.normalScale.value.negate()),a.displacementMap&&(s.displacementMap.value=a.displacementMap,t(a.displacementMap,s.displacementMapTransform),s.displacementScale.value=a.displacementScale,s.displacementBias.value=a.displacementBias),a.emissiveMap&&(s.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,s.emissiveMapTransform)),a.specularMap&&(s.specularMap.value=a.specularMap,t(a.specularMap,s.specularMapTransform)),a.alphaTest>0&&(s.alphaTest.value=a.alphaTest);const M=n.get(a),x=M.envMap,_=M.envMapRotation;x&&(s.envMap.value=x,Ut.copy(_),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),s.envMapRotation.value.setFromMatrix4($d.makeRotationFromEuler(Ut)),s.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,s.reflectivity.value=a.reflectivity,s.ior.value=a.ior,s.refractionRatio.value=a.refractionRatio),a.lightMap&&(s.lightMap.value=a.lightMap,s.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,s.lightMapTransform)),a.aoMap&&(s.aoMap.value=a.aoMap,s.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,s.aoMapTransform))}function f(s,a){s.diffuse.value.copy(a.color),s.opacity.value=a.opacity,a.map&&(s.map.value=a.map,t(a.map,s.mapTransform))}function d(s,a){s.dashSize.value=a.dashSize,s.totalSize.value=a.dashSize+a.gapSize,s.scale.value=a.scale}function S(s,a,M,x){s.diffuse.value.copy(a.color),s.opacity.value=a.opacity,s.size.value=a.size*M,s.scale.value=x*.5,a.map&&(s.map.value=a.map,t(a.map,s.uvTransform)),a.alphaMap&&(s.alphaMap.value=a.alphaMap,t(a.alphaMap,s.alphaMapTransform)),a.alphaTest>0&&(s.alphaTest.value=a.alphaTest)}function E(s,a){s.diffuse.value.copy(a.color),s.opacity.value=a.opacity,s.rotation.value=a.rotation,a.map&&(s.map.value=a.map,t(a.map,s.mapTransform)),a.alphaMap&&(s.alphaMap.value=a.alphaMap,t(a.alphaMap,s.alphaMapTransform)),a.alphaTest>0&&(s.alphaTest.value=a.alphaTest)}function C(s,a){s.specular.value.copy(a.specular),s.shininess.value=Math.max(a.shininess,1e-4)}function m(s,a){a.gradientMap&&(s.gradientMap.value=a.gradientMap)}function v(s,a){s.metalness.value=a.metalness,a.metalnessMap&&(s.metalnessMap.value=a.metalnessMap,t(a.metalnessMap,s.metalnessMapTransform)),s.roughness.value=a.roughness,a.roughnessMap&&(s.roughnessMap.value=a.roughnessMap,t(a.roughnessMap,s.roughnessMapTransform)),a.envMap&&(s.envMapIntensity.value=a.envMapIntensity)}function T(s,a,M){s.ior.value=a.ior,a.sheen>0&&(s.sheenColor.value.copy(a.sheenColor).multiplyScalar(a.sheen),s.sheenRoughness.value=a.sheenRoughness,a.sheenColorMap&&(s.sheenColorMap.value=a.sheenColorMap,t(a.sheenColorMap,s.sheenColorMapTransform)),a.sheenRoughnessMap&&(s.sheenRoughnessMap.value=a.sheenRoughnessMap,t(a.sheenRoughnessMap,s.sheenRoughnessMapTransform))),a.clearcoat>0&&(s.clearcoat.value=a.clearcoat,s.clearcoatRoughness.value=a.clearcoatRoughness,a.clearcoatMap&&(s.clearcoatMap.value=a.clearcoatMap,t(a.clearcoatMap,s.clearcoatMapTransform)),a.clearcoatRoughnessMap&&(s.clearcoatRoughnessMap.value=a.clearcoatRoughnessMap,t(a.clearcoatRoughnessMap,s.clearcoatRoughnessMapTransform)),a.clearcoatNormalMap&&(s.clearcoatNormalMap.value=a.clearcoatNormalMap,t(a.clearcoatNormalMap,s.clearcoatNormalMapTransform),s.clearcoatNormalScale.value.copy(a.clearcoatNormalScale),a.side===Mt&&s.clearcoatNormalScale.value.negate())),a.dispersion>0&&(s.dispersion.value=a.dispersion),a.iridescence>0&&(s.iridescence.value=a.iridescence,s.iridescenceIOR.value=a.iridescenceIOR,s.iridescenceThicknessMinimum.value=a.iridescenceThicknessRange[0],s.iridescenceThicknessMaximum.value=a.iridescenceThicknessRange[1],a.iridescenceMap&&(s.iridescenceMap.value=a.iridescenceMap,t(a.iridescenceMap,s.iridescenceMapTransform)),a.iridescenceThicknessMap&&(s.iridescenceThicknessMap.value=a.iridescenceThicknessMap,t(a.iridescenceThicknessMap,s.iridescenceThicknessMapTransform))),a.transmission>0&&(s.transmission.value=a.transmission,s.transmissionSamplerMap.value=M.texture,s.transmissionSamplerSize.value.set(M.width,M.height),a.transmissionMap&&(s.transmissionMap.value=a.transmissionMap,t(a.transmissionMap,s.transmissionMapTransform)),s.thickness.value=a.thickness,a.thicknessMap&&(s.thicknessMap.value=a.thicknessMap,t(a.thicknessMap,s.thicknessMapTransform)),s.attenuationDistance.value=a.attenuationDistance,s.attenuationColor.value.copy(a.attenuationColor)),a.anisotropy>0&&(s.anisotropyVector.value.set(a.anisotropy*Math.cos(a.anisotropyRotation),a.anisotropy*Math.sin(a.anisotropyRotation)),a.anisotropyMap&&(s.anisotropyMap.value=a.anisotropyMap,t(a.anisotropyMap,s.anisotropyMapTransform))),s.specularIntensity.value=a.specularIntensity,s.specularColor.value.copy(a.specularColor),a.specularColorMap&&(s.specularColorMap.value=a.specularColorMap,t(a.specularColorMap,s.specularColorMapTransform)),a.specularIntensityMap&&(s.specularIntensityMap.value=a.specularIntensityMap,t(a.specularIntensityMap,s.specularIntensityMapTransform))}function N(s,a){a.matcap&&(s.matcap.value=a.matcap)}function L(s,a){const M=n.get(a).light;s.referencePosition.value.setFromMatrixPosition(M.matrixWorld),s.nearDistance.value=M.shadow.camera.near,s.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:o}}function jd(e,n,t,i){let o={},r={},f=[];const d=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function S(M,x){const _=x.program;i.uniformBlockBinding(M,_)}function E(M,x){let _=o[M.id];_===void 0&&(N(M),_=C(M),o[M.id]=_,M.addEventListener("dispose",s));const w=x.program;i.updateUBOMapping(M,w);const R=n.render.frame;r[M.id]!==R&&(v(M),r[M.id]=R)}function C(M){const x=m();M.__bindingPointIndex=x;const _=e.createBuffer(),w=M.__size,R=M.usage;return e.bindBuffer(e.UNIFORM_BUFFER,_),e.bufferData(e.UNIFORM_BUFFER,w,R),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,x,_),_}function m(){for(let M=0;M<d;M++)if(f.indexOf(M)===-1)return f.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(M){const x=o[M.id],_=M.uniforms,w=M.__cache;e.bindBuffer(e.UNIFORM_BUFFER,x);for(let R=0,b=_.length;R<b;R++){const I=Array.isArray(_[R])?_[R]:[_[R]];for(let u=0,p=I.length;u<p;u++){const y=I[u];if(T(y,R,u,w)===!0){const B=y.__offset,W=Array.isArray(y.value)?y.value:[y.value];let Y=0;for(let q=0;q<W.length;q++){const z=W[q],te=L(z);typeof z=="number"||typeof z=="boolean"?(y.__data[0]=z,e.bufferSubData(e.UNIFORM_BUFFER,B+Y,y.__data)):z.isMatrix3?(y.__data[0]=z.elements[0],y.__data[1]=z.elements[1],y.__data[2]=z.elements[2],y.__data[3]=0,y.__data[4]=z.elements[3],y.__data[5]=z.elements[4],y.__data[6]=z.elements[5],y.__data[7]=0,y.__data[8]=z.elements[6],y.__data[9]=z.elements[7],y.__data[10]=z.elements[8],y.__data[11]=0):(z.toArray(y.__data,Y),Y+=te.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,B,y.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function T(M,x,_,w){const R=M.value,b=x+"_"+_;if(w[b]===void 0)return typeof R=="number"||typeof R=="boolean"?w[b]=R:w[b]=R.clone(),!0;{const I=w[b];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return w[b]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function N(M){const x=M.uniforms;let _=0;const w=16;for(let b=0,I=x.length;b<I;b++){const u=Array.isArray(x[b])?x[b]:[x[b]];for(let p=0,y=u.length;p<y;p++){const B=u[p],W=Array.isArray(B.value)?B.value:[B.value];for(let Y=0,q=W.length;Y<q;Y++){const z=W[Y],te=L(z),V=_%w,ve=V%te.boundary,xe=V+ve;_+=ve,xe!==0&&w-xe<te.storage&&(_+=w-xe),B.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=_,_+=te.storage}}}const R=_%w;return R>0&&(_+=w-R),M.__size=_,M.__cache={},this}function L(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function s(M){const x=M.target;x.removeEventListener("dispose",s);const _=f.indexOf(x.__bindingPointIndex);f.splice(_,1),e.deleteBuffer(o[x.id]),delete o[x.id],delete r[x.id]}function a(){for(const M in o)e.deleteBuffer(o[M]);f=[],o={},r={}}return{bind:S,update:E,dispose:a}}class Qd{constructor(n={}){const{canvas:t=kr(),context:i=null,depth:o=!0,stencil:r=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:S=!0,preserveDrawingBuffer:E=!1,powerPreference:C="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:v=!1}=n;this.isWebGLRenderer=!0;let T;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=i.getContextAttributes().alpha}else T=f;const N=new Uint32Array(4),L=new Int32Array(4);let s=null,a=null;const M=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let w=!1;this._outputColorSpace=lr;let R=0,b=0,I=null,u=-1,p=null;const y=new ft,B=new ft;let W=null;const Y=new Ye(0);let q=0,z=t.width,te=t.height,V=1,ve=null,xe=null;const ye=new ft(0,0,z,te),He=new ft(0,0,z,te);let nt=!1;const et=new cr;let We=!1,k=!1;const $=new St,fe=new ce,we=new ft,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function ct(){return I===null?V:1}let g=i;function Ze(c,P){return t.getContext(c,P)}try{const c={alpha:!0,depth:o,stencil:r,antialias:d,premultipliedAlpha:S,preserveDrawingBuffer:E,powerPreference:C,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zr}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",Z,!1),g===null){const P="webgl2";if(g=Ze(P,c),g===null)throw Ze(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(c){throw console.error("THREE.WebGLRenderer: "+c.message),c}let De,be,pe,je,he,Ue,lt,it,h,l,U,G,K,H,Ee,ee,me,_e,Q,oe,Re,ge,ae,Le;function A(){De=new lf(g),De.init(),ge=new Wd(g,De),be=new ef(g,De,n,ge),pe=new kd(g,De),be.reversedDepthBuffer&&v&&pe.buffers.depth.setReversed(!0),je=new df(g),he=new Pd,Ue=new zd(g,De,pe,he,be,ge,je),lt=new nf(_),it=new sf(_),h=new _s(g),ae=new Qc(g,h),l=new cf(g,h,je,ae),U=new pf(g,l,h,je),Q=new uf(g,be,Ue),ee=new tf(he),G=new wd(_,lt,it,De,be,ae,ee),K=new Zd(_,he),H=new Ld,Ee=new Fd(De),_e=new jc(_,lt,it,pe,U,T,S),me=new Gd(_,U,be),Le=new jd(g,je,be,pe),oe=new Jc(g,De,je),Re=new ff(g,De,je),je.programs=G.programs,_.capabilities=be,_.extensions=De,_.properties=he,_.renderLists=H,_.shadowMap=me,_.state=pe,_.info=je}A();const J=new qd(_,g);this.xr=J,this.getContext=function(){return g},this.getContextAttributes=function(){return g.getContextAttributes()},this.forceContextLoss=function(){const c=De.get("WEBGL_lose_context");c&&c.loseContext()},this.forceContextRestore=function(){const c=De.get("WEBGL_lose_context");c&&c.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(c){c!==void 0&&(V=c,this.setSize(z,te,!1))},this.getSize=function(c){return c.set(z,te)},this.setSize=function(c,P,O=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=c,te=P,t.width=Math.floor(c*V),t.height=Math.floor(P*V),O===!0&&(t.style.width=c+"px",t.style.height=P+"px"),this.setViewport(0,0,c,P)},this.getDrawingBufferSize=function(c){return c.set(z*V,te*V).floor()},this.setDrawingBufferSize=function(c,P,O){z=c,te=P,V=O,t.width=Math.floor(c*O),t.height=Math.floor(P*O),this.setViewport(0,0,c,P)},this.getCurrentViewport=function(c){return c.copy(y)},this.getViewport=function(c){return c.copy(ye)},this.setViewport=function(c,P,O,F){c.isVector4?ye.set(c.x,c.y,c.z,c.w):ye.set(c,P,O,F),pe.viewport(y.copy(ye).multiplyScalar(V).round())},this.getScissor=function(c){return c.copy(He)},this.setScissor=function(c,P,O,F){c.isVector4?He.set(c.x,c.y,c.z,c.w):He.set(c,P,O,F),pe.scissor(B.copy(He).multiplyScalar(V).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(c){pe.setScissorTest(nt=c)},this.setOpaqueSort=function(c){ve=c},this.setTransparentSort=function(c){xe=c},this.getClearColor=function(c){return c.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor(...arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha(...arguments)},this.clear=function(c=!0,P=!0,O=!0){let F=0;if(c){let D=!1;if(I!==null){const j=I.texture.format;D=j===Er||j===vr||j===gr}if(D){const j=I.texture.type,re=j===Bt||j===cn||j===wn||j===ln||j===pr||j===hr,de=_e.getClearColor(),se=_e.getClearAlpha(),Ae=de.r,Ce=de.g,Me=de.b;re?(N[0]=Ae,N[1]=Ce,N[2]=Me,N[3]=se,g.clearBufferuiv(g.COLOR,0,N)):(L[0]=Ae,L[1]=Ce,L[2]=Me,L[3]=se,g.clearBufferiv(g.COLOR,0,L))}else F|=g.COLOR_BUFFER_BIT}P&&(F|=g.DEPTH_BUFFER_BIT),O&&(F|=g.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),g.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",Z,!1),_e.dispose(),H.dispose(),Ee.dispose(),he.dispose(),lt.dispose(),it.dispose(),U.dispose(),ae.dispose(),Le.dispose(),G.dispose(),J.dispose(),J.removeEventListener("sessionstart",xt),J.removeEventListener("sessionend",Di),Dt.stop()};function ne(c){c.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const c=je.autoReset,P=me.enabled,O=me.autoUpdate,F=me.needsUpdate,D=me.type;A(),je.autoReset=c,me.enabled=P,me.autoUpdate=O,me.needsUpdate=F,me.type=D}function Z(c){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",c.statusMessage)}function X(c){const P=c.target;P.removeEventListener("dispose",X),ue(P)}function ue(c){Pe(c),he.remove(c)}function Pe(c){const P=he.get(c).programs;P!==void 0&&(P.forEach(function(O){G.releaseProgram(O)}),c.isShaderMaterial&&G.releaseShaderCache(c))}this.renderBufferDirect=function(c,P,O,F,D,j){P===null&&(P=Se);const re=D.isMesh&&D.matrixWorld.determinant()<0,de=Or(c,P,O,F,D);pe.setMaterial(F,re);let se=O.index,Ae=1;if(F.wireframe===!0){if(se=l.getWireframeAttribute(O),se===void 0)return;Ae=2}const Ce=O.drawRange,Me=O.attributes.position;let Ne=Ce.start*Ae,Ve=(Ce.start+Ce.count)*Ae;j!==null&&(Ne=Math.max(Ne,j.start*Ae),Ve=Math.min(Ve,(j.start+j.count)*Ae)),se!==null?(Ne=Math.max(Ne,0),Ve=Math.min(Ve,se.count)):Me!=null&&(Ne=Math.max(Ne,0),Ve=Math.min(Ve,Me.count));const tt=Ve-Ne;if(tt<0||tt===1/0)return;ae.setup(D,F,de,O,se);let qe,Xe=oe;if(se!==null&&(qe=h.get(se),Xe=Re,Xe.setIndex(qe)),D.isMesh)F.wireframe===!0?(pe.setLineWidth(F.wireframeLinewidth*ct()),Xe.setMode(g.LINES)):Xe.setMode(g.TRIANGLES);else if(D.isLine){let Te=F.linewidth;Te===void 0&&(Te=1),pe.setLineWidth(Te*ct()),D.isLineSegments?Xe.setMode(g.LINES):D.isLineLoop?Xe.setMode(g.LINE_LOOP):Xe.setMode(g.LINE_STRIP)}else D.isPoints?Xe.setMode(g.POINTS):D.isSprite&&Xe.setMode(g.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)ci("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Xe.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))Xe.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const Te=D._multiDrawStarts,Qe=D._multiDrawCounts,Be=D._multiDrawCount,_t=se?h.get(se).bytesPerElement:1,Ht=he.get(F).currentProgram.getUniforms();for(let gt=0;gt<Be;gt++)Ht.setValue(g,"_gl_DrawID",gt),Xe.render(Te[gt]/_t,Qe[gt])}else if(D.isInstancedMesh)Xe.renderInstances(Ne,tt,D.count);else if(O.isInstancedBufferGeometry){const Te=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,Qe=Math.min(O.instanceCount,Te);Xe.renderInstances(Ne,tt,Qe)}else Xe.render(Ne,tt)};function Ke(c,P,O){c.transparent===!0&&c.side===Tt&&c.forceSinglePass===!1?(c.side=Mt,c.needsUpdate=!0,pn(c,P,O),c.side=sn,c.needsUpdate=!0,pn(c,P,O),c.side=Tt):pn(c,P,O)}this.compile=function(c,P,O=null){O===null&&(O=c),a=Ee.get(O),a.init(P),x.push(a),O.traverseVisible(function(D){D.isLight&&D.layers.test(P.layers)&&(a.pushLight(D),D.castShadow&&a.pushShadow(D))}),c!==O&&c.traverseVisible(function(D){D.isLight&&D.layers.test(P.layers)&&(a.pushLight(D),D.castShadow&&a.pushShadow(D))}),a.setupLights();const F=new Set;return c.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const j=D.material;if(j)if(Array.isArray(j))for(let re=0;re<j.length;re++){const de=j[re];Ke(de,O,D),F.add(de)}else Ke(j,O,D),F.add(j)}),a=x.pop(),F},this.compileAsync=function(c,P,O=null){const F=this.compile(c,P,O);return new Promise(D=>{function j(){if(F.forEach(function(re){he.get(re).currentProgram.isReady()&&F.delete(re)}),F.size===0){D(c);return}setTimeout(j,10)}De.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Ge=null;function Rt(c){Ge&&Ge(c)}function xt(){Dt.stop()}function Di(){Dt.start()}const Dt=new wr;Dt.setAnimationLoop(Rt),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(c){Ge=c,J.setAnimationLoop(c),c===null?Dt.stop():Dt.start()},J.addEventListener("sessionstart",xt),J.addEventListener("sessionend",Di),this.render=function(c,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(c.matrixWorldAutoUpdate===!0&&c.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(P),P=J.getCamera()),c.isScene===!0&&c.onBeforeRender(_,c,P,I),a=Ee.get(c,x.length),a.init(P),x.push(a),$.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),et.setFromProjectionMatrix($,Oi,P.reversedDepth),k=this.localClippingEnabled,We=ee.init(this.clippingPlanes,k),s=H.get(c,M.length),s.init(),M.push(s),J.enabled===!0&&J.isPresenting===!0){const j=_.xr.getDepthSensingMesh();j!==null&&Gn(j,P,-1/0,_.sortObjects)}Gn(c,P,0,_.sortObjects),s.finish(),_.sortObjects===!0&&s.sort(ve,xe),Oe=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Oe&&_e.addToRenderList(s,c),this.info.render.frame++,We===!0&&ee.beginShadows();const O=a.state.shadowsArray;me.render(O,c,P),We===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const F=s.opaque,D=s.transmissive;if(a.setupLights(),P.isArrayCamera){const j=P.cameras;if(D.length>0)for(let re=0,de=j.length;re<de;re++){const se=j[re];yi(F,D,c,se)}Oe&&_e.render(c);for(let re=0,de=j.length;re<de;re++){const se=j[re];Li(s,c,se,se.viewport)}}else D.length>0&&yi(F,D,c,P),Oe&&_e.render(c),Li(s,c,P);I!==null&&b===0&&(Ue.updateMultisampleRenderTarget(I),Ue.updateRenderTargetMipmap(I)),c.isScene===!0&&c.onAfterRender(_,c,P),ae.resetDefaultState(),u=-1,p=null,x.pop(),x.length>0?(a=x[x.length-1],We===!0&&ee.setGlobalState(_.clippingPlanes,a.state.camera)):a=null,M.pop(),M.length>0?s=M[M.length-1]:s=null};function Gn(c,P,O,F){if(c.visible===!1)return;if(c.layers.test(P.layers)){if(c.isGroup)O=c.renderOrder;else if(c.isLOD)c.autoUpdate===!0&&c.update(P);else if(c.isLight)a.pushLight(c),c.castShadow&&a.pushShadow(c);else if(c.isSprite){if(!c.frustumCulled||et.intersectsSprite(c)){F&&we.setFromMatrixPosition(c.matrixWorld).applyMatrix4($);const re=U.update(c),de=c.material;de.visible&&s.push(c,re,de,O,we.z,null)}}else if((c.isMesh||c.isLine||c.isPoints)&&(!c.frustumCulled||et.intersectsObject(c))){const re=U.update(c),de=c.material;if(F&&(c.boundingSphere!==void 0?(c.boundingSphere===null&&c.computeBoundingSphere(),we.copy(c.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),we.copy(re.boundingSphere.center)),we.applyMatrix4(c.matrixWorld).applyMatrix4($)),Array.isArray(de)){const se=re.groups;for(let Ae=0,Ce=se.length;Ae<Ce;Ae++){const Me=se[Ae],Ne=de[Me.materialIndex];Ne&&Ne.visible&&s.push(c,re,Ne,O,we.z,Me)}}else de.visible&&s.push(c,re,de,O,we.z,null)}}const j=c.children;for(let re=0,de=j.length;re<de;re++)Gn(j[re],P,O,F)}function Li(c,P,O,F){const D=c.opaque,j=c.transmissive,re=c.transparent;a.setupLightsView(O),We===!0&&ee.setGlobalState(_.clippingPlanes,O),F&&pe.viewport(y.copy(F)),D.length>0&&un(D,P,O),j.length>0&&un(j,P,O),re.length>0&&un(re,P,O),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function yi(c,P,O,F){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;a.state.transmissionRenderTarget[F.id]===void 0&&(a.state.transmissionRenderTarget[F.id]=new Zt(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?Nn:Bt,minFilter:tn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const j=a.state.transmissionRenderTarget[F.id],re=F.viewport||y;j.setSize(re.z*_.transmissionResolutionScale,re.w*_.transmissionResolutionScale);const de=_.getRenderTarget(),se=_.getActiveCubeFace(),Ae=_.getActiveMipmapLevel();_.setRenderTarget(j),_.getClearColor(Y),q=_.getClearAlpha(),q<1&&_.setClearColor(16777215,.5),_.clear(),Oe&&_e.render(O);const Ce=_.toneMapping;_.toneMapping=wt;const Me=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),a.setupLightsView(F),We===!0&&ee.setGlobalState(_.clippingPlanes,F),un(c,O,F),Ue.updateMultisampleRenderTarget(j),Ue.updateRenderTargetMipmap(j),De.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let Ve=0,tt=P.length;Ve<tt;Ve++){const qe=P[Ve],Xe=qe.object,Te=qe.geometry,Qe=qe.material,Be=qe.group;if(Qe.side===Tt&&Xe.layers.test(F.layers)){const _t=Qe.side;Qe.side=Mt,Qe.needsUpdate=!0,Ui(Xe,O,F,Te,Qe,Be),Qe.side=_t,Qe.needsUpdate=!0,Ne=!0}}Ne===!0&&(Ue.updateMultisampleRenderTarget(j),Ue.updateRenderTargetMipmap(j))}_.setRenderTarget(de,se,Ae),_.setClearColor(Y,q),Me!==void 0&&(F.viewport=Me),_.toneMapping=Ce}function un(c,P,O){const F=P.isScene===!0?P.overrideMaterial:null;for(let D=0,j=c.length;D<j;D++){const re=c[D],de=re.object,se=re.geometry,Ae=re.group;let Ce=re.material;Ce.allowOverride===!0&&F!==null&&(Ce=F),de.layers.test(O.layers)&&Ui(de,P,O,se,Ce,Ae)}}function Ui(c,P,O,F,D,j){c.onBeforeRender(_,P,O,F,D,j),c.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,c.matrixWorld),c.normalMatrix.getNormalMatrix(c.modelViewMatrix),D.onBeforeRender(_,P,O,F,c,j),D.transparent===!0&&D.side===Tt&&D.forceSinglePass===!1?(D.side=Mt,D.needsUpdate=!0,_.renderBufferDirect(O,P,F,D,c,j),D.side=sn,D.needsUpdate=!0,_.renderBufferDirect(O,P,F,D,c,j),D.side=Tt):_.renderBufferDirect(O,P,F,D,c,j),c.onAfterRender(_,P,O,F,D,j)}function pn(c,P,O){P.isScene!==!0&&(P=Se);const F=he.get(c),D=a.state.lights,j=a.state.shadowsArray,re=D.state.version,de=G.getParameters(c,D.state,j,P,O),se=G.getProgramCacheKey(de);let Ae=F.programs;F.environment=c.isMeshStandardMaterial?P.environment:null,F.fog=P.fog,F.envMap=(c.isMeshStandardMaterial?it:lt).get(c.envMap||F.environment),F.envMapRotation=F.environment!==null&&c.envMap===null?P.environmentRotation:c.envMapRotation,Ae===void 0&&(c.addEventListener("dispose",X),Ae=new Map,F.programs=Ae);let Ce=Ae.get(se);if(Ce!==void 0){if(F.currentProgram===Ce&&F.lightsStateVersion===re)return Ni(c,de),Ce}else de.uniforms=G.getUniforms(c),c.onBeforeCompile(de,_),Ce=G.acquireProgram(de,se),Ae.set(se,Ce),F.uniforms=de.uniforms;const Me=F.uniforms;return(!c.isShaderMaterial&&!c.isRawShaderMaterial||c.clipping===!0)&&(Me.clippingPlanes=ee.uniform),Ni(c,de),F.needsLights=Br(c),F.lightsStateVersion=re,F.needsLights&&(Me.ambientLightColor.value=D.state.ambient,Me.lightProbe.value=D.state.probe,Me.directionalLights.value=D.state.directional,Me.directionalLightShadows.value=D.state.directionalShadow,Me.spotLights.value=D.state.spot,Me.spotLightShadows.value=D.state.spotShadow,Me.rectAreaLights.value=D.state.rectArea,Me.ltc_1.value=D.state.rectAreaLTC1,Me.ltc_2.value=D.state.rectAreaLTC2,Me.pointLights.value=D.state.point,Me.pointLightShadows.value=D.state.pointShadow,Me.hemisphereLights.value=D.state.hemi,Me.directionalShadowMap.value=D.state.directionalShadowMap,Me.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Me.spotShadowMap.value=D.state.spotShadowMap,Me.spotLightMatrix.value=D.state.spotLightMatrix,Me.spotLightMap.value=D.state.spotLightMap,Me.pointShadowMap.value=D.state.pointShadowMap,Me.pointShadowMatrix.value=D.state.pointShadowMatrix),F.currentProgram=Ce,F.uniformsList=null,Ce}function Ii(c){if(c.uniformsList===null){const P=c.currentProgram.getUniforms();c.uniformsList=Rn.seqWithValue(P.seq,c.uniforms)}return c.uniformsList}function Ni(c,P){const O=he.get(c);O.outputColorSpace=P.outputColorSpace,O.batching=P.batching,O.batchingColor=P.batchingColor,O.instancing=P.instancing,O.instancingColor=P.instancingColor,O.instancingMorph=P.instancingMorph,O.skinning=P.skinning,O.morphTargets=P.morphTargets,O.morphNormals=P.morphNormals,O.morphColors=P.morphColors,O.morphTargetsCount=P.morphTargetsCount,O.numClippingPlanes=P.numClippingPlanes,O.numIntersection=P.numClipIntersection,O.vertexAlphas=P.vertexAlphas,O.vertexTangents=P.vertexTangents,O.toneMapping=P.toneMapping}function Or(c,P,O,F,D){P.isScene!==!0&&(P=Se),Ue.resetTextureUnits();const j=P.fog,re=F.isMeshStandardMaterial?P.environment:null,de=I===null?_.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:On,se=(F.isMeshStandardMaterial?it:lt).get(F.envMap||re),Ae=F.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ce=!!O.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Me=!!O.morphAttributes.position,Ne=!!O.morphAttributes.normal,Ve=!!O.morphAttributes.color;let tt=wt;F.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(tt=_.toneMapping);const qe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Xe=qe!==void 0?qe.length:0,Te=he.get(F),Qe=a.state.lights;if(We===!0&&(k===!0||c!==p)){const dt=c===p&&F.id===u;ee.setState(F,c,dt)}let Be=!1;F.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Qe.state.version||Te.outputColorSpace!==de||D.isBatchedMesh&&Te.batching===!1||!D.isBatchedMesh&&Te.batching===!0||D.isBatchedMesh&&Te.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Te.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Te.instancing===!1||!D.isInstancedMesh&&Te.instancing===!0||D.isSkinnedMesh&&Te.skinning===!1||!D.isSkinnedMesh&&Te.skinning===!0||D.isInstancedMesh&&Te.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Te.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Te.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Te.instancingMorph===!1&&D.morphTexture!==null||Te.envMap!==se||F.fog===!0&&Te.fog!==j||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ee.numPlanes||Te.numIntersection!==ee.numIntersection)||Te.vertexAlphas!==Ae||Te.vertexTangents!==Ce||Te.morphTargets!==Me||Te.morphNormals!==Ne||Te.morphColors!==Ve||Te.toneMapping!==tt||Te.morphTargetsCount!==Xe)&&(Be=!0):(Be=!0,Te.__version=F.version);let _t=Te.currentProgram;Be===!0&&(_t=pn(F,P,D));let Ht=!1,gt=!1,Jt=!1;const Je=_t.getUniforms(),vt=Te.uniforms;if(pe.useProgram(_t.program)&&(Ht=!0,gt=!0,Jt=!0),F.id!==u&&(u=F.id,gt=!0),Ht||p!==c){pe.buffers.depth.getReversed()&&c.reversedDepth!==!0&&(c._reversedDepth=!0,c.updateProjectionMatrix()),Je.setValue(g,"projectionMatrix",c.projectionMatrix),Je.setValue(g,"viewMatrix",c.matrixWorldInverse);const pt=Je.map.cameraPosition;pt!==void 0&&pt.setValue(g,fe.setFromMatrixPosition(c.matrixWorld)),be.logarithmicDepthBuffer&&Je.setValue(g,"logDepthBufFC",2/(Math.log(c.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Je.setValue(g,"isOrthographic",c.isOrthographicCamera===!0),p!==c&&(p=c,gt=!0,Jt=!0)}if(D.isSkinnedMesh){Je.setOptional(g,D,"bindMatrix"),Je.setOptional(g,D,"bindMatrixInverse");const dt=D.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),Je.setValue(g,"boneTexture",dt.boneTexture,Ue))}D.isBatchedMesh&&(Je.setOptional(g,D,"batchingTexture"),Je.setValue(g,"batchingTexture",D._matricesTexture,Ue),Je.setOptional(g,D,"batchingIdTexture"),Je.setValue(g,"batchingIdTexture",D._indirectTexture,Ue),Je.setOptional(g,D,"batchingColorTexture"),D._colorsTexture!==null&&Je.setValue(g,"batchingColorTexture",D._colorsTexture,Ue));const Et=O.morphAttributes;if((Et.position!==void 0||Et.normal!==void 0||Et.color!==void 0)&&Q.update(D,O,_t),(gt||Te.receiveShadow!==D.receiveShadow)&&(Te.receiveShadow=D.receiveShadow,Je.setValue(g,"receiveShadow",D.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(vt.envMap.value=se,vt.flipEnvMap.value=se.isCubeTexture&&se.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&P.environment!==null&&(vt.envMapIntensity.value=P.environmentIntensity),gt&&(Je.setValue(g,"toneMappingExposure",_.toneMappingExposure),Te.needsLights&&Fr(vt,Jt),j&&F.fog===!0&&K.refreshFogUniforms(vt,j),K.refreshMaterialUniforms(vt,F,V,te,a.state.transmissionRenderTarget[c.id]),Rn.upload(g,Ii(Te),vt,Ue)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Rn.upload(g,Ii(Te),vt,Ue),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Je.setValue(g,"center",D.center),Je.setValue(g,"modelViewMatrix",D.modelViewMatrix),Je.setValue(g,"normalMatrix",D.normalMatrix),Je.setValue(g,"modelMatrix",D.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const dt=F.uniformsGroups;for(let pt=0,Vn=dt.length;pt<Vn;pt++){const Lt=dt[pt];Le.update(Lt,_t),Le.bind(Lt,_t)}}return _t}function Fr(c,P){c.ambientLightColor.needsUpdate=P,c.lightProbe.needsUpdate=P,c.directionalLights.needsUpdate=P,c.directionalLightShadows.needsUpdate=P,c.pointLights.needsUpdate=P,c.pointLightShadows.needsUpdate=P,c.spotLights.needsUpdate=P,c.spotLightShadows.needsUpdate=P,c.rectAreaLights.needsUpdate=P,c.hemisphereLights.needsUpdate=P}function Br(c){return c.isMeshLambertMaterial||c.isMeshToonMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.isShadowMaterial||c.isShaderMaterial&&c.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(c,P,O){const F=he.get(c);F.__autoAllocateDepthBuffer=c.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),he.get(c.texture).__webglTexture=P,he.get(c.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:O,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(c,P){const O=he.get(c);O.__webglFramebuffer=P,O.__useDefaultFramebuffer=P===void 0};const Hr=g.createFramebuffer();this.setRenderTarget=function(c,P=0,O=0){I=c,R=P,b=O;let F=!0,D=null,j=!1,re=!1;if(c){const se=he.get(c);if(se.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(g.FRAMEBUFFER,null),F=!1;else if(se.__webglFramebuffer===void 0)Ue.setupRenderTarget(c);else if(se.__hasExternalTextures)Ue.rebindTextures(c,he.get(c.texture).__webglTexture,he.get(c.depthTexture).__webglTexture);else if(c.depthBuffer){const Me=c.depthTexture;if(se.__boundDepthTexture!==Me){if(Me!==null&&he.has(Me)&&(c.width!==Me.image.width||c.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ue.setupDepthRenderbuffer(c)}}const Ae=c.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(re=!0);const Ce=he.get(c).__webglFramebuffer;c.isWebGLCubeRenderTarget?(Array.isArray(Ce[P])?D=Ce[P][O]:D=Ce[P],j=!0):c.samples>0&&Ue.useMultisampledRTT(c)===!1?D=he.get(c).__webglMultisampledFramebuffer:Array.isArray(Ce)?D=Ce[O]:D=Ce,y.copy(c.viewport),B.copy(c.scissor),W=c.scissorTest}else y.copy(ye).multiplyScalar(V).floor(),B.copy(He).multiplyScalar(V).floor(),W=nt;if(O!==0&&(D=Hr),pe.bindFramebuffer(g.FRAMEBUFFER,D)&&F&&pe.drawBuffers(c,D),pe.viewport(y),pe.scissor(B),pe.setScissorTest(W),j){const se=he.get(c.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_CUBE_MAP_POSITIVE_X+P,se.__webglTexture,O)}else if(re){const se=P;for(let Ae=0;Ae<c.textures.length;Ae++){const Ce=he.get(c.textures[Ae]);g.framebufferTextureLayer(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0+Ae,Ce.__webglTexture,O,se)}}else if(c!==null&&O!==0){const se=he.get(c.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,se.__webglTexture,O)}u=-1},this.readRenderTargetPixels=function(c,P,O,F,D,j,re,de=0){if(!(c&&c.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let se=he.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&re!==void 0&&(se=se[re]),se){pe.bindFramebuffer(g.FRAMEBUFFER,se);try{const Ae=c.textures[de],Ce=Ae.format,Me=Ae.type;if(!be.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!be.textureTypeReadable(Me)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=c.width-F&&O>=0&&O<=c.height-D&&(c.textures.length>1&&g.readBuffer(g.COLOR_ATTACHMENT0+de),g.readPixels(P,O,F,D,ge.convert(Ce),ge.convert(Me),j))}finally{const Ae=I!==null?he.get(I).__webglFramebuffer:null;pe.bindFramebuffer(g.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(c,P,O,F,D,j,re,de=0){if(!(c&&c.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let se=he.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&re!==void 0&&(se=se[re]),se)if(P>=0&&P<=c.width-F&&O>=0&&O<=c.height-D){pe.bindFramebuffer(g.FRAMEBUFFER,se);const Ae=c.textures[de],Ce=Ae.format,Me=Ae.type;if(!be.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!be.textureTypeReadable(Me))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ne=g.createBuffer();g.bindBuffer(g.PIXEL_PACK_BUFFER,Ne),g.bufferData(g.PIXEL_PACK_BUFFER,j.byteLength,g.STREAM_READ),c.textures.length>1&&g.readBuffer(g.COLOR_ATTACHMENT0+de),g.readPixels(P,O,F,D,ge.convert(Ce),ge.convert(Me),0);const Ve=I!==null?he.get(I).__webglFramebuffer:null;pe.bindFramebuffer(g.FRAMEBUFFER,Ve);const tt=g.fenceSync(g.SYNC_GPU_COMMANDS_COMPLETE,0);return g.flush(),await Wr(g,tt,4),g.bindBuffer(g.PIXEL_PACK_BUFFER,Ne),g.getBufferSubData(g.PIXEL_PACK_BUFFER,0,j),g.deleteBuffer(Ne),g.deleteSync(tt),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(c,P=null,O=0){const F=Math.pow(2,-O),D=Math.floor(c.image.width*F),j=Math.floor(c.image.height*F),re=P!==null?P.x:0,de=P!==null?P.y:0;Ue.setTexture2D(c,0),g.copyTexSubImage2D(g.TEXTURE_2D,O,0,0,re,de,D,j),pe.unbindTexture()};const Gr=g.createFramebuffer(),Vr=g.createFramebuffer();this.copyTextureToTexture=function(c,P,O=null,F=null,D=0,j=null){j===null&&(D!==0?(ci("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=D,D=0):j=0);let re,de,se,Ae,Ce,Me,Ne,Ve,tt;const qe=c.isCompressedTexture?c.mipmaps[j]:c.image;if(O!==null)re=O.max.x-O.min.x,de=O.max.y-O.min.y,se=O.isBox3?O.max.z-O.min.z:1,Ae=O.min.x,Ce=O.min.y,Me=O.isBox3?O.min.z:0;else{const Et=Math.pow(2,-D);re=Math.floor(qe.width*Et),de=Math.floor(qe.height*Et),c.isDataArrayTexture?se=qe.depth:c.isData3DTexture?se=Math.floor(qe.depth*Et):se=1,Ae=0,Ce=0,Me=0}F!==null?(Ne=F.x,Ve=F.y,tt=F.z):(Ne=0,Ve=0,tt=0);const Xe=ge.convert(P.format),Te=ge.convert(P.type);let Qe;P.isData3DTexture?(Ue.setTexture3D(P,0),Qe=g.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Ue.setTexture2DArray(P,0),Qe=g.TEXTURE_2D_ARRAY):(Ue.setTexture2D(P,0),Qe=g.TEXTURE_2D),g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,P.flipY),g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),g.pixelStorei(g.UNPACK_ALIGNMENT,P.unpackAlignment);const Be=g.getParameter(g.UNPACK_ROW_LENGTH),_t=g.getParameter(g.UNPACK_IMAGE_HEIGHT),Ht=g.getParameter(g.UNPACK_SKIP_PIXELS),gt=g.getParameter(g.UNPACK_SKIP_ROWS),Jt=g.getParameter(g.UNPACK_SKIP_IMAGES);g.pixelStorei(g.UNPACK_ROW_LENGTH,qe.width),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,qe.height),g.pixelStorei(g.UNPACK_SKIP_PIXELS,Ae),g.pixelStorei(g.UNPACK_SKIP_ROWS,Ce),g.pixelStorei(g.UNPACK_SKIP_IMAGES,Me);const Je=c.isDataArrayTexture||c.isData3DTexture,vt=P.isDataArrayTexture||P.isData3DTexture;if(c.isDepthTexture){const Et=he.get(c),dt=he.get(P),pt=he.get(Et.__renderTarget),Vn=he.get(dt.__renderTarget);pe.bindFramebuffer(g.READ_FRAMEBUFFER,pt.__webglFramebuffer),pe.bindFramebuffer(g.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Lt=0;Lt<se;Lt++)Je&&(g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,he.get(c).__webglTexture,D,Me+Lt),g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,he.get(P).__webglTexture,j,tt+Lt)),g.blitFramebuffer(Ae,Ce,re,de,Ne,Ve,re,de,g.DEPTH_BUFFER_BIT,g.NEAREST);pe.bindFramebuffer(g.READ_FRAMEBUFFER,null),pe.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else if(D!==0||c.isRenderTargetTexture||he.has(c)){const Et=he.get(c),dt=he.get(P);pe.bindFramebuffer(g.READ_FRAMEBUFFER,Gr),pe.bindFramebuffer(g.DRAW_FRAMEBUFFER,Vr);for(let pt=0;pt<se;pt++)Je?g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,Et.__webglTexture,D,Me+pt):g.framebufferTexture2D(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,Et.__webglTexture,D),vt?g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,dt.__webglTexture,j,tt+pt):g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,dt.__webglTexture,j),D!==0?g.blitFramebuffer(Ae,Ce,re,de,Ne,Ve,re,de,g.COLOR_BUFFER_BIT,g.NEAREST):vt?g.copyTexSubImage3D(Qe,j,Ne,Ve,tt+pt,Ae,Ce,re,de):g.copyTexSubImage2D(Qe,j,Ne,Ve,Ae,Ce,re,de);pe.bindFramebuffer(g.READ_FRAMEBUFFER,null),pe.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else vt?c.isDataTexture||c.isData3DTexture?g.texSubImage3D(Qe,j,Ne,Ve,tt,re,de,se,Xe,Te,qe.data):P.isCompressedArrayTexture?g.compressedTexSubImage3D(Qe,j,Ne,Ve,tt,re,de,se,Xe,qe.data):g.texSubImage3D(Qe,j,Ne,Ve,tt,re,de,se,Xe,Te,qe):c.isDataTexture?g.texSubImage2D(g.TEXTURE_2D,j,Ne,Ve,re,de,Xe,Te,qe.data):c.isCompressedTexture?g.compressedTexSubImage2D(g.TEXTURE_2D,j,Ne,Ve,qe.width,qe.height,Xe,qe.data):g.texSubImage2D(g.TEXTURE_2D,j,Ne,Ve,re,de,Xe,Te,qe);g.pixelStorei(g.UNPACK_ROW_LENGTH,Be),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,_t),g.pixelStorei(g.UNPACK_SKIP_PIXELS,Ht),g.pixelStorei(g.UNPACK_SKIP_ROWS,gt),g.pixelStorei(g.UNPACK_SKIP_IMAGES,Jt),j===0&&P.generateMipmaps&&g.generateMipmap(Qe),pe.unbindTexture()},this.initRenderTarget=function(c){he.get(c).__webglFramebuffer===void 0&&Ue.setupRenderTarget(c)},this.initTexture=function(c){c.isCubeTexture?Ue.setTextureCube(c,0):c.isData3DTexture?Ue.setTexture3D(c,0):c.isDataArrayTexture||c.isCompressedArrayTexture?Ue.setTexture2DArray(c,0):Ue.setTexture2D(c,0),pe.unbindTexture()},this.resetState=function(){R=0,b=0,I=null,pe.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(n),t.unpackColorSpace=at._getUnpackColorSpace()}}const Jd=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."}],eu=`
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
`,tu='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Wa='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',nu=(e,n)=>{const t=e==="three";return n==="three"?t?".":"..":t?`${n}/`:`../${n}/`},Xa=e=>e.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),iu=e=>{if(document.getElementById("portal-nav-toggle"))return;const n=document.createElement("style");n.id="portal-nav-styles",n.textContent=eu,document.head.appendChild(n);const t=document.createElement("aside");t.id="portal-nav-drawer",t.setAttribute("aria-hidden","false"),t.setAttribute("aria-label","Portal demos"),t.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${Jd.map(r=>`
        <li${r.key===e?' class="portal-nav-current"':""}>
          <a href="${nu(e,r.key)}"${r.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${Xa(r.label)}</span>
            <span class="portal-nav-desc">${Xa(r.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const i=document.createElement("button");i.id="portal-nav-toggle",i.type="button",i.setAttribute("aria-label","Close demos menu"),i.setAttribute("aria-expanded","true"),i.setAttribute("aria-controls","portal-nav-drawer"),i.innerHTML=Wa,document.body.appendChild(t),document.body.appendChild(i);const o=r=>{t.setAttribute("aria-hidden",r?"false":"true"),i.setAttribute("aria-expanded",r?"true":"false"),i.setAttribute("aria-label",r?"Close demos menu":"Toggle demos menu"),i.innerHTML=r?Wa:tu};i.addEventListener("click",r=>{r.stopPropagation(),o(t.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",r=>{t.getAttribute("aria-hidden")==="true"||r.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||o(!1)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&t.getAttribute("aria-hidden")==="false"&&o(!1)})},au=(e,n,t={})=>{const i=t.moveSpeed??4,o=t.lookSensitivity??.0025,r=t.lookKeySpeed??1.5;let f=0,d=0;const S=new Set;ru(n,(b,I)=>{f-=b*o,d-=I*o}),window.addEventListener("keydown",b=>S.add(b.code)),window.addEventListener("keyup",b=>S.delete(b.code)),su(S);const E=new ce,C=new ce,m=new ce,v=b=>{S.has("KeyQ")&&(f+=r*b),S.has("KeyE")&&(f-=r*b),S.has("KeyR")&&(d-=r*b),S.has("KeyF")&&(d+=r*b),d=ou(d),e.quaternion.setFromEuler(new Pn(d,f,0,"YXZ")),C.set(0,0,-1).applyQuaternion(e.quaternion),m.set(1,0,0).applyQuaternion(e.quaternion),E.set(0,0,0),S.has("KeyW")&&E.add(C),S.has("KeyS")&&E.sub(C),S.has("KeyD")&&E.add(m),S.has("KeyA")&&E.sub(m),E.y=0,E.lengthSq()>0&&(E.normalize().multiplyScalar(i*b),e.position.add(E))},T=new St,N=new Dn,L=new Pn(0,0,0,"YXZ"),s=new ce(0,0,0),a=new ce,M=new ce(0,1,0);return{update:v,setOrientationFromForward:b=>{a.copy(b).normalize(),T.lookAt(s,a,M),N.setFromRotationMatrix(T),L.setFromQuaternion(N,"YXZ"),d=L.x,f=L.y},clearKeys:()=>{S.clear()},getKeys:()=>Array.from(S),setKeys:b=>{S.clear();for(const I of b)S.add(I)}}},ru=(e,n)=>{let t=null,i=0,o=0;e.addEventListener("pointerdown",f=>{if(t===null&&(t=f.pointerId,i=f.clientX,o=f.clientY,f.pointerType!=="mouse"))try{e.setPointerCapture(f.pointerId)}catch{}});const r=f=>{f.pointerId===t&&(t=null)};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),window.addEventListener("pointermove",f=>{if(f.pointerId!==t)return;const d=f.clientX-i,S=f.clientY-o;i=f.clientX,o=f.clientY,n(d,S)})},ou=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),su=e=>{if(typeof window>"u")return;const n="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,t=()=>n||window.innerWidth<500;if(t()){Ya(e);return}const i=()=>{t()&&(window.removeEventListener("resize",i),Ya(e))};window.addEventListener("resize",i)},Ya=e=>{const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement and look controls"),n.innerHTML=`
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
  `,document.head.appendChild(t),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const o=i.dataset.key,r=d=>{d.preventDefault(),d.stopPropagation(),e.add(o),i.classList.add("is-active");try{i.setPointerCapture(d.pointerId)}catch{}},f=d=>{d.stopPropagation(),e.delete(o),i.classList.remove("is-active")};i.addEventListener("pointerdown",r),i.addEventListener("pointerup",f),i.addEventListener("pointercancel",f),i.addEventListener("pointerleave",f),i.addEventListener("contextmenu",d=>d.preventDefault())}};new xi;new ce;new ft;new ft;const lu=(e=new ke(2,3))=>{const n=new dn(e.x,e.y),t=new bi({visible:!1}),i=new ut(n,t);return i.name="portal-plane",i.userData.portalSize=e.clone(),i},cu=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,fu=`
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
`,In=1,du=(e=In)=>{const n={portalPos:{value:new ce},portalNormal:{value:new ce},portalRight:{value:new ce},portalUp:{value:new ce},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new ce},hostInverseViewProjection:{value:new St},hostViewMatrix:{value:new St},hostProjectionMatrix:{value:new St},destinationBackground:{value:new ce(0,0,0)}},t=new Pt({uniforms:n,vertexShader:cu,fragmentShader:fu,depthTest:!0,depthWrite:!1,side:Tt,stencilWrite:!0,stencilFunc:Rr,stencilRef:e,stencilFail:Ln,stencilZFail:Ln,stencilZPass:Ar,stencilWriteMask:255}),i=new ut(new dn(2,2),t);i.frustumCulled=!1;const o=new yn;o.add(i);const r=new xr(-1,1,1,-1,0,1),f=new St,d=new ce(0,0,1),S=new ce(1,0,0),E=new ce(0,1,0),C=new Dn;return{scene:o,camera:r,update:(v,T,N)=>{const L=v.userData.portalSize;n.portalHalfW.value=L?L.x/2:1,n.portalHalfH.value=L?L.y/2:1.5,v.getWorldPosition(n.portalPos.value),v.getWorldQuaternion(C),n.portalNormal.value.copy(d).applyQuaternion(C),n.portalRight.value.copy(S).applyQuaternion(C),n.portalUp.value.copy(E).applyQuaternion(C),T.getWorldPosition(n.hostCameraPos.value),f.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),n.hostInverseViewProjection.value.copy(f).invert(),n.hostViewMatrix.value.copy(T.matrixWorldInverse),n.hostProjectionMatrix.value.copy(T.projectionMatrix),n.destinationBackground.value.set(N.r,N.g,N.b)}}},Vt=new ce,uu=(e,n,t,i)=>{let o,r;{const a=e.userData?.portalSize;o=a?a.x/2:.5,r=a?a.y/2:.5}if(e.updateMatrixWorld(!0),!n.matrixWorldInverse)return null;let f=1/0,d=1/0,S=-1/0,E=-1/0,C=0;for(let a=0;a<4;a+=1){const M=(a&1)===0?-o:o,x=(a&2)===0?-r:r;if(Vt.set(M,x,0),Vt.applyMatrix4(e.matrixWorld),Vt.project(n),Vt.z>1)continue;C+=1;const _=(Vt.x+1)*.5*t.width,w=(Vt.y+1)*.5*t.height;_<f&&(f=_),_>S&&(S=_),w<d&&(d=w),w>E&&(E=w)}if(C===0)return null;const m=Math.max(0,Math.floor(f)),v=Math.max(0,Math.floor(d)),T=Math.min(t.width,Math.ceil(S)),N=Math.min(t.height,Math.ceil(E)),L=Math.max(0,T-m),s=Math.max(0,N-v);return L===0||s===0?null:{x:m,y:v,w:L,h:s}};new ce;new ce;new ce;const vn=2960,En=3042,Sn=1028,Mn=1029,pu=1032,hu=519,mu=514,$t=7680,Tn=1,Ka=0,qa=771,ti=32774,$a=()=>({func:hu,ref:0,valueMask:4294967295,fail:$t,zfail:$t,zpass:$t,writeMask:4294967295}),_u=(e,n)=>{const t=n.stencil!==void 0,i=n.blend==="premultiplied-over";let o=!1;const r=$a(),f=$a();let d=0,S="unknown",E=-1,C=!1,m=[Tn,Ka,Tn,Ka],v=[ti,ti],T=0,N="unknown",L=-1;const s=b=>b===Sn?[r]:b===Mn?[f]:b===pu?[r,f]:[],a=(b,I)=>{const u=I;switch(b){case"enable":case"disable":if(u[0]!==vn)return!1;o=b==="enable";break;case"stencilFunc":for(const p of[r,f])p.func=u[0],p.ref=u[1],p.valueMask=u[2];break;case"stencilFuncSeparate":for(const p of s(u[0]))p.func=u[1],p.ref=u[2],p.valueMask=u[3];break;case"stencilOp":for(const p of[r,f])p.fail=u[0],p.zfail=u[1],p.zpass=u[2];break;case"stencilOpSeparate":for(const p of s(u[0]))p.fail=u[1],p.zfail=u[2],p.zpass=u[3];break;case"stencilMask":r.writeMask=u[0],f.writeMask=u[0];break;case"stencilMaskSeparate":for(const p of s(u[0]))p.writeMask=u[1];break;default:return!1}return d+=1,!0},M=(b,I)=>{const u=I;switch(b){case"enable":case"disable":if(u[0]!==En)return!1;C=b==="enable";break;case"blendFunc":m=[u[0],u[1],u[0],u[1]];break;case"blendFuncSeparate":m=[u[0],u[1],u[2],u[3]];break;case"blendEquation":v=[u[0],u[0]];break;case"blendEquationSeparate":v=[u[0],u[1]];break;default:return!1}return T+=1,!0},x=()=>{o?e.enable(vn):e.disable(vn),e.stencilFuncSeparate(Sn,r.func,r.ref,r.valueMask),e.stencilFuncSeparate(Mn,f.func,f.ref,f.valueMask),e.stencilOpSeparate(Sn,r.fail,r.zfail,r.zpass),e.stencilOpSeparate(Mn,f.fail,f.zfail,f.zpass),e.stencilMaskSeparate(Sn,r.writeMask),e.stencilMaskSeparate(Mn,f.writeMask)},_=()=>{const b=n.stencil;e.enable(vn),e.stencilFunc(mu,b.ref,b.valueMask??255),e.stencilOp($t,$t,$t),e.stencilMask(0)},w=()=>{C?e.enable(En):e.disable(En),e.blendFuncSeparate(m[0],m[1],m[2],m[3]),e.blendEquationSeparate(v[0],v[1])},R=()=>{e.enable(En),e.blendFuncSeparate(Tn,qa,Tn,qa),e.blendEquation(ti)};return{intercept(b,I){return!!(t&&a(b,I)||i&&M(b,I))},beforeDraw(b){const I=b?"override":"intended";t&&(S!==I||I==="intended"&&E!==d)&&(I==="override"?_():x(),S=I,E=d),i&&(N!==I||I==="intended"&&L!==T)&&(I==="override"?R():w(),N=I,L=T)},invalidate(){S="unknown",N="unknown"}}},gu={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},vu=36160,Eu=36009,ni=3089,Su=256,ii=6145,Mu=34041,Za=1029,ja=36064,Tu=new Set(["drawArrays","drawElements","drawArraysInstanced","drawElementsInstanced","drawRangeElements","clear","clearBufferfv","clearBufferiv","clearBufferuiv","clearBufferfi"]),xu=(e,n={})=>{const t=new Map;let i=null,o=null,r=null,f=null,d=!1;const S=n.screen?_u(e,n.screen):null,E=n.screen?.clear==="depth-only",C=s=>{const a=o,M=r;if(i!==null||!a||!M||a[2]===0||a[3]===0||a[0]===M[0]&&a[1]===M[1]&&a[2]===M[2]&&a[3]===M[3])return s;const x=M[2]/a[2],_=M[3]/a[3],w=M[0]+(s[0]-a[0])*x,R=M[1]+(s[1]-a[1])*_,b=M[0]+(s[0]+s[2]-a[0])*x,I=M[1]+(s[1]+s[3]-a[1])*_,u=Math.floor(w),p=Math.floor(R);return[u,p,Math.ceil(b)-u,Math.ceil(I)-p]},m=()=>{if(!f)return;const[s,a,M,x]=C(f);e.scissor(s,a,M,x)},v=s=>{if(s==null)return null;const a=typeof s;if(a==="number"||a==="string"||a==="boolean")return s;if(Array.isArray(s))return s.map(v);if(typeof s!="object")return s;const M=s;if("__netgl_handle"in M){const x=M.__netgl_handle,_=t.get(x);if(_===void 0)throw new Error(`NetGL replay: unknown handle id ${x}`);return _}if("__netgl_typedarray"in M){const x=M.__netgl_typedarray,_=gu[x];if(!_)throw new Error(`NetGL replay: unknown typed-array ${x}`);return new _(M.buffer,M.offset,M.length)}if("__netgl_arraybuffer"in M)return M.__netgl_arraybuffer;if("__netgl_imagebitmap"in M)return M.__netgl_imagebitmap;if("__netgl_imagedata"in M){const x=M.width,_=M.height,w=M.buffer,R=new Uint8ClampedArray(w);return new ImageData(R,x,_)}throw new Error("NetGL replay: unknown encoded value shape")},T=(s,a)=>{if(s==="clear"){const M=a[0]&Su;return M===0||(S?.beforeDraw(!0),N(()=>e.clear(M))),!0}if(s==="clearBufferfv"&&a[0]===ii)return S?.beforeDraw(!0),N(()=>e.clearBufferfv(ii,a[1],a[2])),!0;if(s==="clearBufferfi"&&a[0]===Mu){const M=a[2];return S?.beforeDraw(!0),N(()=>e.clearBufferfv(ii,0,[M])),!0}return!!s.startsWith("clearBuffer")},N=s=>{if(d||!r){s();return}const[a,M,x,_]=r;e.enable(ni),e.scissor(a,M,x,_),s(),e.disable(ni),m()};return Object.assign(s=>{let a;try{a=s.args.map(v)}catch(w){const R=w instanceof Error?w.message:String(w);throw new Error(`NetGL replay (decoding ${s.name}): ${R}`)}let M=!1;if(s.name==="bindFramebuffer"){const w=a[0];if(w===vu||w===Eu){const R=a[1];R!==i&&(M=!0),i=R}a[1]===null&&n.screenFramebuffer&&(a=[w,n.screenFramebuffer()])}else n.screenFramebuffer&&(s.name==="drawBuffers"?a=[a[0].map(w=>w===Za?ja:w)]:s.name==="readBuffer"&&a[0]===Za&&(a=[ja]));if(s.name==="viewport"){const[w,R,b,I]=a;if(o=[w,R,b,I],i===null&&n.remapScreenViewport){const u=n.remapScreenViewport(w,R,b,I);u!==null&&(a=[u[0],u[1],u[2],u[3]])}r=a}else if(s.name==="scissor"){const w=a;f=[w[0],w[1],w[2],w[3]],a=[...C(f)]}else(s.name==="enable"||s.name==="disable")&&a[0]===ni&&(d=s.name==="enable");if(S&&S.intercept(s.name,a))return;if(Tu.has(s.name)){const w=i===null;if(w&&E&&T(s.name,a))return;S?.beforeDraw(w)}if(n.__debugTraceViewport&&(s.name==="viewport"||s.name==="scissor"||s.name==="enable"||s.name==="disable"))if(s.name==="enable"||s.name==="disable")a[0]===3089&&n.__debugTraceViewport(`${s.name}(SCISSOR_TEST) drawFb=${i?"RT":"null"}`);else{const[w,R,b,I]=a;n.__debugTraceViewport(`${s.name}(${w},${R},${b}x${I}) drawFb=${i?"RT":"null"}`)}const x=e[s.name];if(typeof x!="function")throw new Error(`NetGL replay: receiver has no method '${s.name}'`);const _=x.apply(e,a);if(s.name==="viewport"&&i===null&&n.remapScreenViewport&&m(),M&&o){const[w,R,b,I]=o,u=i===null&&n.remapScreenViewport?n.remapScreenViewport(w,R,b,I):null,p=u?u[0]:w,y=u?u[1]:R,B=u?u[2]:b,W=u?u[3]:I;e.viewport(p,y,B,W),r=[p,y,B,W],m(),n.__debugTraceViewport&&n.__debugTraceViewport(`post-bind re-issue viewport(${p},${y},${B}x${W}) drawFb=${i?"RT":"null"}`)}s.returnId!==void 0&&_!=null&&typeof _=="object"&&t.set(s.returnId,_)},{invalidate(){S?.invalidate()}})},Au=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",Ru=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end",bu=new Set(["bufferData","bufferSubData","texImage2D","texSubImage2D","texImage3D","texSubImage3D","compressedTexImage2D","compressedTexSubImage2D","compressedTexImage3D","compressedTexSubImage3D","texStorage2D","texStorage3D","renderbufferStorage","renderbufferStorageMultisample","generateMipmap","shaderSource","compileShader","attachShader","linkProgram"]),Cu=e=>{const n=xu(e.gl,e.replay),t=e.onError??(m=>console.error("[netgl-host] replay error:",m)),i=new Set;let o=null,r=[],f=null,d=null,S=!1,E=e.transport.onMessage(m=>{if(Au(m)){r.push(m);return}if(Ru(m)){f?f.push(...r):f=r,r=[];return}if(m.type==="netgl:ready"){o=m,e.onReady?.(o);return}e.onControl?.(m)});const C=(m,v)=>{n.invalidate();for(let T=0;T<m.length;T+=1){const N=m[T];if(!(v&&(N.returnId!==void 0||bu.has(N.name))))try{n(N)}catch(L){const s=L instanceof Error?L.message:String(L);i.has(s)||(i.add(s),t(L))}}};return{get ready(){return o},get hasFrame(){return d!==null||f!==null},replay:n,drain(){if(f){const m=f;return f=null,d=m,S=!m.some(v=>v.name.startsWith("delete")),C(m,!1),!0}return d&&S?(C(d,!0),!0):!1},stop(){E?.(),E=null}}},wu=1e3,Ur=e=>{const n=new Qd({antialias:!1,stencil:!0,depth:!0});n.outputColorSpace=lr,n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),n.autoClear=!1,e.mount.appendChild(n.domElement);const t=ls({output:e.iframe.contentWindow,inputFilter:e.iframe.contentWindow});let i=0,o=0,r=0;const f=new Set;let d=null;const S=()=>d,E=Cu({gl:n.getContext(),transport:t,replay:e.replay(S),onControl:C=>{const m=C;if(m.type==="cesium:rendered"){const v=C;o=v.seq,d.guestSize={width:v.width,height:v.height}}else if(m.type==="cesium:error"){const v=C.message;f.has(v)||(f.add(v),console.error("[cesium guest]",v),e.onStatus(`Cesium error: ${v.split(`
`)[0]}`))}},onError:C=>{console.error("[netgl host] replay error:",C),e.onStatus(`Replay error: ${C instanceof Error?C.message:String(C)}`)}});return d={renderer:n,receiver:E,guestSize:null,canvasSize:()=>{const C=n.getDrawingBufferSize(new ke);return{width:C.x,height:C.y}},tick(C,m){const v=performance.now();if(o<i&&v-r<wu)return null;i+=1,r=v;const T={type:"cesium:tick",seq:i,time:C,view:m};return t.post(T),i},lag:()=>i-o},d},Pu=e=>{let n=null;const t=Ur({...e,replay:()=>({remapScreenViewport:(a,M,x,_)=>{const w=n;if(!w)return null;const R=x/_,b=R>w.w/w.h?w.h*R:w.w,I=b/R;return[Math.floor(w.x+(w.w-b)/2),Math.floor(w.y+(w.h-I)/2),Math.ceil(b),Math.ceil(I)]},screen:{stencil:{ref:In},clear:"depth-only"}})}),{renderer:i,receiver:o}=t,r=new Kt(70,window.innerWidth/window.innerHeight,.02,200);r.position.set(0,1.6,5.5);const f=new yn;f.background=new Ye("#101826"),f.add(new cs(12176639,2241348,1));const d=new br(16777215,.65);d.position.set(3,6,2),f.add(d);const S=new ut(new dn(18,18),new Un({color:"#1b2a3f",roughness:.95,metalness:.03}));S.rotation.x=-Math.PI/2,f.add(S);const E=new Ri(.9,.9,.9),C=new Un({color:"#5da9ff",roughness:.35});for(let a=0;a<14;a+=1){const M=new ut(E,C);M.position.set(Math.sin(a*.5)*4,.45,-3-a*.65),f.add(M)}const m=lu(new ke(2.6,3.2));m.position.set(0,1.6,-3.5),f.add(m);const v=du(),T=new Ye("#000000"),N=au(r,i.domElement);window.addEventListener("resize",()=>{i.setSize(window.innerWidth,window.innerHeight),r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix()});const L=new Cr,s=()=>{if(N.update(L.getDelta()),i.resetState(),i.setRenderTarget(null),i.clear(!0,!0,!0),i.render(f,r),o.ready){v.update(m,r,T),i.render(v.scene,v.camera),i.clearDepth();const{width:a,height:M}=t.canvasSize();n=uu(m,r,{width:a,height:M}),n&&o.drain(),i.resetState()}t.tick(L.elapsedTime),requestAnimationFrame(s)};s()},Qa={type:"change"},wi={type:"start"},Ir={type:"end"},xn=new ds,Ja=new xi,Du=Math.cos(70*on.DEG2RAD),rt=new ce,ht=2*Math.PI,ze={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ai=1e-6;class Lu extends fs{constructor(n,t=null){super(n,t),this.state=ze.NONE,this.target=new ce,this.cursor=new ce,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:qt.ROTATE,MIDDLE:qt.DOLLY,RIGHT:qt.PAN},this.touches={ONE:Xt.ROTATE,TWO:Xt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new ce,this._lastQuaternion=new Dn,this._lastTargetPosition=new ce,this._quat=new Dn().setFromUnitVectors(n.up,new ce(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new va,this._sphericalDelta=new va,this._scale=1,this._panOffset=new ce,this._rotateStart=new ke,this._rotateEnd=new ke,this._rotateDelta=new ke,this._panStart=new ke,this._panEnd=new ke,this._panDelta=new ke,this._dollyStart=new ke,this._dollyEnd=new ke,this._dollyDelta=new ke,this._dollyDirection=new ce,this._mouse=new ke,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Uu.bind(this),this._onPointerDown=yu.bind(this),this._onPointerUp=Iu.bind(this),this._onContextMenu=Vu.bind(this),this._onMouseWheel=Fu.bind(this),this._onKeyDown=Bu.bind(this),this._onTouchStart=Hu.bind(this),this._onTouchMove=Gu.bind(this),this._onMouseDown=Nu.bind(this),this._onMouseMove=Ou.bind(this),this._interceptControlDown=ku.bind(this),this._interceptControlUp=zu.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Qa),this.update(),this.state=ze.NONE}update(n=null){const t=this.object.position;rt.copy(t).sub(this.target),rt.applyQuaternion(this._quat),this._spherical.setFromVector3(rt),this.autoRotate&&this.state===ze.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(i)&&isFinite(o)&&(i<-Math.PI?i+=ht:i>Math.PI&&(i-=ht),o<-Math.PI?o+=ht:o>Math.PI&&(o-=ht),i<=o?this._spherical.theta=Math.max(i,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+o)/2?Math.max(i,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=f!=this._spherical.radius}if(rt.setFromSpherical(this._spherical),rt.applyQuaternion(this._quatInverse),t.copy(this.target).add(rt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const d=rt.length();f=this._clampDistance(d*this._scale);const S=d-f;this.object.position.addScaledVector(this._dollyDirection,S),this.object.updateMatrixWorld(),r=!!S}else if(this.object.isOrthographicCamera){const d=new ce(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const S=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=S!==this.object.zoom;const E=new ce(this._mouse.x,this._mouse.y,0);E.unproject(this.object),this.object.position.sub(E).add(d),this.object.updateMatrixWorld(),f=rt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(xn.origin.copy(this.object.position),xn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(xn.direction))<Du?this.object.lookAt(this.target):(Ja.setFromNormalAndCoplanarPoint(this.object.up,this.target),xn.intersectPlane(Ja,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ai||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ai||this._lastTargetPosition.distanceToSquared(this.target)>ai?(this.dispatchEvent(Qa),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?ht/60*this.autoRotateSpeed*n:ht/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){rt.setFromMatrixColumn(t,0),rt.multiplyScalar(-n),this._panOffset.add(rt)}_panUp(n,t){this.screenSpacePanning===!0?rt.setFromMatrixColumn(t,1):(rt.setFromMatrixColumn(t,0),rt.crossVectors(this.object.up,rt)),rt.multiplyScalar(n),this._panOffset.add(rt)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;rt.copy(o).sub(this.target);let r=rt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),o=n-i.left,r=t-i.top,f=i.width,d=i.height;this._mouse.x=o/f*2-1,this._mouse.y=-(r/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),o=.5*(n.pageY+t.y);this._rotateStart.set(i,o)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),o=.5*(n.pageY+t.y);this._panStart.set(i,o)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,o=n.pageY-t.y,r=Math.sqrt(i*i+o*o);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),o=.5*(n.pageX+i.x),r=.5*(n.pageY+i.y);this._rotateEnd.set(o,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),o=.5*(n.pageY+t.y);this._panEnd.set(i,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,o=n.pageY-t.y,r=Math.sqrt(i*i+o*o);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(n.pageX+t.x)*.5,d=(n.pageY+t.y)*.5;this._updateZoomParameters(f,d)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new ke,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function yu(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function Uu(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function Iu(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ir),this.state=ze.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function Nu(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case qt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=ze.DOLLY;break;case qt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ze.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ze.ROTATE}break;case qt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ze.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ze.PAN}break;default:this.state=ze.NONE}this.state!==ze.NONE&&this.dispatchEvent(wi)}function Ou(e){switch(this.state){case ze.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case ze.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case ze.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function Fu(e){this.enabled===!1||this.enableZoom===!1||this.state!==ze.NONE||(e.preventDefault(),this.dispatchEvent(wi),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Ir))}function Bu(e){this.enabled!==!1&&this._handleKeyDown(e)}function Hu(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Xt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=ze.TOUCH_ROTATE;break;case Xt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=ze.TOUCH_PAN;break;default:this.state=ze.NONE}break;case 2:switch(this.touches.TWO){case Xt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=ze.TOUCH_DOLLY_PAN;break;case Xt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=ze.TOUCH_DOLLY_ROTATE;break;default:this.state=ze.NONE}break;default:this.state=ze.NONE}this.state!==ze.NONE&&this.dispatchEvent(wi)}function Gu(e){switch(this._trackPointer(e),this.state){case ze.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case ze.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case ze.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case ze.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=ze.NONE}}function Vu(e){this.enabled!==!1&&e.preventDefault()}function ku(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zu(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Pi=1e6,kt=6378137/Pi,er=6356752314245e-6/Pi,ri=1.025,Wu=.05,Xu=e=>{const n=Ur({...e,replay:I=>({remapScreenViewport:(u,p,y,B)=>{const W=I(),Y=W.guestSize;if(!Y)return null;const q=W.canvasSize(),z=q.width/Y.width,te=q.height/Y.height;return[Math.round(u*z),Math.round(p*te),Math.round(y*z),Math.round(B*te)]},screen:{stencil:{ref:In},blend:"premultiplied-over",clear:"depth-only"}})}),{renderer:t,receiver:i}=n,o=new Kt(40,window.innerWidth/window.innerHeight,.01,2e4);o.position.set(6,2.5,26);const r=new yn;r.background=new Ye("#000000");const f=new ce(1,.25,.6).normalize(),d=new br(16777215,2.2);d.position.copy(f).multiplyScalar(100),r.add(d),r.add(new us(2241348,.25)),r.add(Ku());const S=new qn;S.rotation.z=on.degToRad(23.4),r.add(S);const E=new qn;S.add(E);const C=new Ea(1,128,96),m=new ut(C,new Un({color:"#1d4f91",roughness:.8}));m.scale.set(kt,er,kt),E.add(m);const v=new yn,T=new ut(C,new bi({side:Tt,colorWrite:!1,depthWrite:!1,depthTest:!0,stencilWrite:!0,stencilRef:In,stencilFunc:Rr,stencilZPass:Ar,stencilFail:Ln,stencilZFail:Ln}));v.add(T);const N=new qn;N.rotation.x=on.degToRad(-8),r.add(N);const L=new ut(new Ea(1.737,64,48),new Un({color:"#b8b4ac",roughness:.95}));N.add(L);const s=new Lu(o,t.domElement);s.enableDamping=!0,s.minDistance=kt*1.02,s.maxDistance=400,s.zoomSpeed=.6,s.rotateSpeed=.5;const a=()=>{const I=o.position.length()-kt;s.rotateSpeed=on.clamp(I/20,.02,.5)};window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix()});const M=new Cr;let x=e.startTime??0;const _=()=>{E.rotation.y=x*Wu;const I=x*.12;L.position.set(Math.cos(I)*16,0,Math.sin(I)*16),r.updateMatrixWorld(),T.matrixAutoUpdate=!1,T.matrix.copy(E.matrixWorld).multiply(new St().makeScale(kt*ri,er*ri,kt*ri)),T.matrixWorldNeedsUpdate=!0};let w=0;const R=()=>(o.updateMatrixWorld(),n.tick(x,Yu(o,E)));_(),R();const b=()=>{const I=i.hasFrame;m.visible=!I,t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,o),I&&(t.render(v,o),t.clearDepth(),i.drain(),t.resetState());const u=Math.min(M.getDelta(),.1);e.paused||(x+=u),a(),s.update(u),_(),R()===null?w+=1:w=0,e.onLag(w),requestAnimationFrame(b)};b()},oi=new St,tr=new ce,nr=new ce,ir=new ce,si=new Fe,li=(e,n)=>[e.x*n,-e.z*n,e.y*n],Yu=(e,n)=>(oi.copy(n.matrixWorld).invert(),si.setFromMatrix4(oi),tr.setFromMatrixPosition(e.matrixWorld).applyMatrix4(oi),e.getWorldDirection(nr).applyMatrix3(si).normalize(),ir.set(0,1,0).applyQuaternion(e.quaternion).applyMatrix3(si).normalize(),{position:li(tr,Pi),direction:li(nr,1),up:li(ir,1),fovy:on.degToRad(e.fov)}),Ku=()=>{const n=new Float32Array(12e3),t=new ce;let i=7;const o=()=>(i=i*16807%2147483647,i/2147483647);for(let f=0;f<4e3;f+=1)t.set(o()*2-1,o()*2-1,o()*2-1).normalize().multiplyScalar(5e3),n.set([t.x,t.y,t.z],f*3);const r=new Ai;return r.setAttribute("position",new rn(n,3)),new ps(r,new hs({color:16777215,size:1.6,sizeAttenuation:!1}))};iu("netgl-cesium");const Hn=ms(location.search),Si=new URLSearchParams(location.search),ar=document.querySelector("#app"),Mi=document.querySelector("#guest"),rr=document.querySelector("#status"),qu=document.querySelector("#lag"),Nr=new URLSearchParams({mode:Hn}),or=Si.get("imagery");or&&Nr.set("imagery",or);Mi.src=`cesium.html?${Nr}`;document.querySelectorAll("a[data-mode]").forEach(e=>{const n=new URLSearchParams(location.search);n.set("mode",e.dataset.mode),e.href=`?${n}`,e.dataset.mode===Hn&&e.classList.add("current")});document.querySelector(`[data-help="${Hn}"]`).hidden=!1;const sr=e=>{rr.textContent=e,rr.hidden=!1};Hn==="earth"?Xu({iframe:Mi,mount:ar,onStatus:sr,startTime:Number(Si.get("time")??0),paused:Si.has("pause"),onLag:e=>{qu.textContent=String(Math.max(0,e))}}):Pu({iframe:Mi,mount:ar,onStatus:sr});
