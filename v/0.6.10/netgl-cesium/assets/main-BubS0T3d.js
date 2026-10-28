import{c as eo,N as Pt,S as ma,C as Xe,F as _a,M as Mt,V as ce,R as to,a as dt,w as fi,W as Hi,b as jt,d as at,L as rn,H as On,U as Vt,D as xt,B as Tt,e as cn,f as Fn,p as no,E as io,g as Ke,P as $t,A as ro,h as Wn,i as Ct,j as Dn,k as Ri,l as dn,m as fn,n as ga,o as ao,q as Xt,r as Ln,s as oo,t as so,u as nn,O as lo,v as co,x as fo,y as uo,z as po,G as ho,I as mo,J as _o,K as go,Q as vo,T as Eo,X as So,Y as Mo,Z as To,_ as xo,$ as Ao,a0 as Ro,a1 as bo,a2 as zn,a3 as Yt,a4 as gn,a5 as wo,a6 as sn,a7 as Co,a8 as Po,a9 as Do,aa as Lo,ab as va,ac as yo,ad as Uo,ae as Io,af as bi,ag as Ge,ah as No,ai as Oo,aj as Fo,ak as Lt,al as wi,am as ln,an as ut,ao as Ea,ap as Ht,aq as wt,ar as yn,as as Sa,at as Ma,au as Ta,av as hn,aw as Bo,ax as Ho,ay as Go,az as Vo,aA as xa,aB as Bt,aC as ko,aD as Wo,aE as zo,aF as Aa,aG as Xo,aH as Ra,aI as ba,aJ as Xn,aK as Yn,aL as Kn,aM as qn,aN as Je,aO as Gi,aP as Vi,aQ as ki,aR as Wi,aS as zi,aT as Xi,aU as Yi,aV as Ki,aW as qi,aX as $i,aY as Zi,aZ as ji,a_ as Qi,a$ as Ji,b0 as er,b1 as tr,b2 as nr,b3 as ir,b4 as rr,b5 as ar,b6 as or,b7 as sr,b8 as lr,b9 as cr,ba as dr,bb as fr,bc as ur,bd as pr,be as ui,bf as pi,bg as hi,bh as mi,bi as _i,bj as gi,bk as vi,bl as Yo,bm as hr,bn as Ko,bo as wn,bp as qo,bq as mr,br as _r,bs as gr,bt as Ei,bu as Si,bv as $o,bw as wa,bx as Zo,by as Bn,bz as jo,bA as Qo,bB as Ca,bC as Ci,bD as vr,bE as Un,bF as Er,bG as Pa,bH as un,bI as Qt,bJ as Da,bK as Pi,bL as Jo,bM as es,bN as ts,bO as Sr,bP as mt,bQ as ns,bR as is,bS as rs,bT as as,bU as os,bV as ss,bW as ls,bX as cs,bY as ds,bZ as fs,b_ as us,b$ as ps,c0 as hs,c1 as ms,c2 as _s,c3 as gs,c4 as vs,c5 as Es,c6 as pn,c7 as La,c8 as Gt,c9 as ya,ca as In,cb as Ss,cc as Ms,cd as Mr,ce as Tr,cf as xr,cg as Ts,ch as xs,ci as As,cj as Ua,ck as Nn,cl as Dt,cm as Ia,cn as Rs,co as Zt,cp as Kt,cq as Ar,cr as bs,cs as ws,ct as $n,cu as Rr,cv as Cs,cw as Ps,cx as Ds}from"./protocol-BdVdfIb0.js";function Na(){let e=null,n=!1,t=null,i=null;function a(r,d){t(r,d),i=e.requestAnimationFrame(a)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(a),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function Ls(e){const n=new WeakMap;function t(l,v){const S=l.array,A=l.usage,M=S.byteLength,T=e.createBuffer();e.bindBuffer(v,T),e.bufferData(v,S,A),l.onUploadCallback();let x;if(S instanceof Float32Array)x=e.FLOAT;else if(typeof Float16Array<"u"&&S instanceof Float16Array)x=e.HALF_FLOAT;else if(S instanceof Uint16Array)l.isFloat16BufferAttribute?x=e.HALF_FLOAT:x=e.UNSIGNED_SHORT;else if(S instanceof Int16Array)x=e.SHORT;else if(S instanceof Uint32Array)x=e.UNSIGNED_INT;else if(S instanceof Int32Array)x=e.INT;else if(S instanceof Int8Array)x=e.BYTE;else if(S instanceof Uint8Array)x=e.UNSIGNED_BYTE;else if(S instanceof Uint8ClampedArray)x=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+S);return{buffer:T,type:x,bytesPerElement:S.BYTES_PER_ELEMENT,version:l.version,size:M}}function i(l,v,S){const A=v.array,M=v.updateRanges;if(e.bindBuffer(S,l),M.length===0)e.bufferSubData(S,0,A);else{M.sort((x,I)=>x.start-I.start);let T=0;for(let x=1;x<M.length;x++){const I=M[T],y=M[x];y.start<=I.start+I.count+1?I.count=Math.max(I.count,y.start+y.count-I.start):(++T,M[T]=y)}M.length=T+1;for(let x=0,I=M.length;x<I;x++){const y=M[x];e.bufferSubData(S,y.start*A.BYTES_PER_ELEMENT,A,y.start,y.count)}v.clearUpdateRanges()}v.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const v=n.get(l);v&&(e.deleteBuffer(v.buffer),n.delete(l))}function d(l,v){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const A=n.get(l);(!A||A.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const S=n.get(l);if(S===void 0)n.set(l,t(l,v));else if(S.version<l.version){if(S.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(S.buffer,l,v),S.version=l.version}}return{get:a,remove:r,update:d}}var ys=`#ifdef USE_ALPHAHASH
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
}`,Oe={alphahash_fragment:ys,alphahash_pars_fragment:Us,alphamap_fragment:Is,alphamap_pars_fragment:Ns,alphatest_fragment:Os,alphatest_pars_fragment:Fs,aomap_fragment:Bs,aomap_pars_fragment:Hs,batching_pars_vertex:Gs,batching_vertex:Vs,begin_vertex:ks,beginnormal_vertex:Ws,bsdfs:zs,iridescence_fragment:Xs,bumpmap_pars_fragment:Ys,clipping_planes_fragment:Ks,clipping_planes_pars_fragment:qs,clipping_planes_pars_vertex:$s,clipping_planes_vertex:Zs,color_fragment:js,color_pars_fragment:Qs,color_pars_vertex:Js,color_vertex:el,common:tl,cube_uv_reflection_fragment:nl,defaultnormal_vertex:il,displacementmap_pars_vertex:rl,displacementmap_vertex:al,emissivemap_fragment:ol,emissivemap_pars_fragment:sl,colorspace_fragment:ll,colorspace_pars_fragment:cl,envmap_fragment:dl,envmap_common_pars_fragment:fl,envmap_pars_fragment:ul,envmap_pars_vertex:pl,envmap_physical_pars_fragment:Al,envmap_vertex:hl,fog_vertex:ml,fog_pars_vertex:_l,fog_fragment:gl,fog_pars_fragment:vl,gradientmap_pars_fragment:El,lightmap_pars_fragment:Sl,lights_lambert_fragment:Ml,lights_lambert_pars_fragment:Tl,lights_pars_begin:xl,lights_toon_fragment:Rl,lights_toon_pars_fragment:bl,lights_phong_fragment:wl,lights_phong_pars_fragment:Cl,lights_physical_fragment:Pl,lights_physical_pars_fragment:Dl,lights_fragment_begin:Ll,lights_fragment_maps:yl,lights_fragment_end:Ul,logdepthbuf_fragment:Il,logdepthbuf_pars_fragment:Nl,logdepthbuf_pars_vertex:Ol,logdepthbuf_vertex:Fl,map_fragment:Bl,map_pars_fragment:Hl,map_particle_fragment:Gl,map_particle_pars_fragment:Vl,metalnessmap_fragment:kl,metalnessmap_pars_fragment:Wl,morphinstance_vertex:zl,morphcolor_vertex:Xl,morphnormal_vertex:Yl,morphtarget_pars_vertex:Kl,morphtarget_vertex:ql,normal_fragment_begin:$l,normal_fragment_maps:Zl,normal_pars_fragment:jl,normal_pars_vertex:Ql,normal_vertex:Jl,normalmap_pars_fragment:ec,clearcoat_normal_fragment_begin:tc,clearcoat_normal_fragment_maps:nc,clearcoat_pars_fragment:ic,iridescence_pars_fragment:rc,opaque_fragment:ac,packing:oc,premultiplied_alpha_fragment:sc,project_vertex:lc,dithering_fragment:cc,dithering_pars_fragment:dc,roughnessmap_fragment:fc,roughnessmap_pars_fragment:uc,shadowmap_pars_fragment:pc,shadowmap_pars_vertex:hc,shadowmap_vertex:mc,shadowmask_pars_fragment:_c,skinbase_vertex:gc,skinning_pars_vertex:vc,skinning_vertex:Ec,skinnormal_vertex:Sc,specularmap_fragment:Mc,specularmap_pars_fragment:Tc,tonemapping_fragment:xc,tonemapping_pars_fragment:Ac,transmission_fragment:Rc,transmission_pars_fragment:bc,uv_pars_fragment:wc,uv_pars_vertex:Cc,uv_vertex:Pc,worldpos_vertex:Dc,background_vert:Lc,background_frag:yc,backgroundCube_vert:Uc,backgroundCube_frag:Ic,cube_vert:Nc,cube_frag:Oc,depth_vert:Fc,depth_frag:Bc,distanceRGBA_vert:Hc,distanceRGBA_frag:Gc,equirect_vert:Vc,equirect_frag:kc,linedashed_vert:Wc,linedashed_frag:zc,meshbasic_vert:Xc,meshbasic_frag:Yc,meshlambert_vert:Kc,meshlambert_frag:qc,meshmatcap_vert:$c,meshmatcap_frag:Zc,meshnormal_vert:jc,meshnormal_frag:Qc,meshphong_vert:Jc,meshphong_frag:ed,meshphysical_vert:td,meshphysical_frag:nd,meshtoon_vert:id,meshtoon_frag:rd,points_vert:ad,points_frag:od,shadow_vert:sd,shadow_frag:ld,sprite_vert:cd,sprite_frag:dd},re={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Rt={basic:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:mt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:mt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:mt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:mt([re.points,re.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:mt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:mt([re.common,re.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:mt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:mt([re.sprite,re.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:mt([re.common,re.displacementmap,{referencePosition:{value:new ce},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:mt([re.lights,re.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};Rt.physical={uniforms:mt([Rt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const vn={r:0,b:0,g:0},It=new Un,fd=new Mt;function ud(e,n,t,i,a,r,d){const l=new Xe(0);let v=r===!0?0:1,S,A,M=null,T=0,x=null;function I(_){let g=_.isScene===!0?_.background:null;return g&&g.isTexture&&(g=(_.backgroundBlurriness>0?t:n).get(g)),g}function y(_){let g=!1;const L=I(_);L===null?o(l,v):L&&L.isColor&&(o(L,1),g=!0);const R=e.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,d):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,d),(e.autoClear||g)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function f(_,g){const L=I(g);L&&(L.isCubeTexture||L.mapping===Bn)?(A===void 0&&(A=new ut(new Ci(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:vr(Rt.backgroundCube.uniforms),vertexShader:Rt.backgroundCube.vertexShader,fragmentShader:Rt.backgroundCube.fragmentShader,side:Tt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),A.geometry.deleteAttribute("normal"),A.geometry.deleteAttribute("uv"),A.onBeforeRender=function(R,D,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(A.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(A)),It.copy(g.backgroundRotation),It.x*=-1,It.y*=-1,It.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(It.y*=-1,It.z*=-1),A.material.uniforms.envMap.value=L,A.material.uniforms.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,A.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,A.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,A.material.uniforms.backgroundRotation.value.setFromMatrix4(fd.makeRotationFromEuler(It)),A.material.toneMapped=at.getTransfer(L.colorSpace)!==Je,(M!==L||T!==L.version||x!==e.toneMapping)&&(A.material.needsUpdate=!0,M=L,T=L.version,x=e.toneMapping),A.layers.enableAll(),_.unshift(A,A.geometry,A.material,0,0,null)):L&&L.isTexture&&(S===void 0&&(S=new ut(new hn(2,2),new Lt({name:"BackgroundMaterial",uniforms:vr(Rt.background.uniforms),vertexShader:Rt.background.vertexShader,fragmentShader:Rt.background.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),S.geometry.deleteAttribute("normal"),Object.defineProperty(S.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(S)),S.material.uniforms.t2D.value=L,S.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,S.material.toneMapped=at.getTransfer(L.colorSpace)!==Je,L.matrixAutoUpdate===!0&&L.updateMatrix(),S.material.uniforms.uvTransform.value.copy(L.matrix),(M!==L||T!==L.version||x!==e.toneMapping)&&(S.material.needsUpdate=!0,M=L,T=L.version,x=e.toneMapping),S.layers.enableAll(),_.unshift(S,S.geometry,S.material,0,0,null))}function o(_,g){_.getRGB(vn,Ca(e)),i.buffers.color.setClear(vn.r,vn.g,vn.b,g,d)}function E(){A!==void 0&&(A.geometry.dispose(),A.material.dispose(),A=void 0),S!==void 0&&(S.geometry.dispose(),S.material.dispose(),S=void 0)}return{getClearColor:function(){return l},setClearColor:function(_,g=1){l.set(_),v=g,o(l,v)},getClearAlpha:function(){return v},setClearAlpha:function(_){v=_,o(l,v)},render:y,addToRenderList:f,dispose:E}}function pd(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=T(null);let r=a,d=!1;function l(u,C,H,z,Y){let q=!1;const k=M(z,H,C);r!==k&&(r=k,S(r.object)),q=x(u,z,H,Y),q&&I(u,z,H,Y),Y!==null&&n.update(Y,e.ELEMENT_ARRAY_BUFFER),(q||d)&&(d=!1,g(u,C,H,z),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Y).buffer))}function v(){return e.createVertexArray()}function S(u){return e.bindVertexArray(u)}function A(u){return e.deleteVertexArray(u)}function M(u,C,H){const z=H.wireframe===!0;let Y=i[u.id];Y===void 0&&(Y={},i[u.id]=Y);let q=Y[C.id];q===void 0&&(q={},Y[C.id]=q);let k=q[z];return k===void 0&&(k=T(v()),q[z]=k),k}function T(u){const C=[],H=[],z=[];for(let Y=0;Y<t;Y++)C[Y]=0,H[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:z,object:u,attributes:{},index:null}}function x(u,C,H,z){const Y=r.attributes,q=C.attributes;let k=0;const ne=H.getAttributes();for(const B in ne)if(ne[B].location>=0){const Re=Y[B];let ye=q[B];if(ye===void 0&&(B==="instanceMatrix"&&u.instanceMatrix&&(ye=u.instanceMatrix),B==="instanceColor"&&u.instanceColor&&(ye=u.instanceColor)),Re===void 0||Re.attribute!==ye||ye&&Re.data!==ye.data)return!0;k++}return r.attributesNum!==k||r.index!==z}function I(u,C,H,z){const Y={},q=C.attributes;let k=0;const ne=H.getAttributes();for(const B in ne)if(ne[B].location>=0){let Re=q[B];Re===void 0&&(B==="instanceMatrix"&&u.instanceMatrix&&(Re=u.instanceMatrix),B==="instanceColor"&&u.instanceColor&&(Re=u.instanceColor));const ye={};ye.attribute=Re,Re&&Re.data&&(ye.data=Re.data),Y[B]=ye,k++}r.attributes=Y,r.attributesNum=k,r.index=z}function y(){const u=r.newAttributes;for(let C=0,H=u.length;C<H;C++)u[C]=0}function f(u){o(u,0)}function o(u,C){const H=r.newAttributes,z=r.enabledAttributes,Y=r.attributeDivisors;H[u]=1,z[u]===0&&(e.enableVertexAttribArray(u),z[u]=1),Y[u]!==C&&(e.vertexAttribDivisor(u,C),Y[u]=C)}function E(){const u=r.newAttributes,C=r.enabledAttributes;for(let H=0,z=C.length;H<z;H++)C[H]!==u[H]&&(e.disableVertexAttribArray(H),C[H]=0)}function _(u,C,H,z,Y,q,k){k===!0?e.vertexAttribIPointer(u,C,H,Y,q):e.vertexAttribPointer(u,C,H,z,Y,q)}function g(u,C,H,z){y();const Y=z.attributes,q=H.getAttributes(),k=C.defaultAttributeValues;for(const ne in q){const B=q[ne];if(B.location>=0){let pe=Y[ne];if(pe===void 0&&(ne==="instanceMatrix"&&u.instanceMatrix&&(pe=u.instanceMatrix),ne==="instanceColor"&&u.instanceColor&&(pe=u.instanceColor)),pe!==void 0){const Re=pe.normalized,ye=pe.itemSize,He=n.get(pe);if(He===void 0)continue;const et=He.buffer,Ze=He.type,ke=He.bytesPerElement,W=Ze===e.INT||Ze===e.UNSIGNED_INT||pe.gpuType===xa;if(pe.isInterleavedBufferAttribute){const K=pe.data,fe=K.stride,Ce=pe.offset;if(K.isInstancedInterleavedBuffer){for(let ve=0;ve<B.locationSize;ve++)o(B.location+ve,K.meshPerAttribute);u.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ve=0;ve<B.locationSize;ve++)f(B.location+ve);e.bindBuffer(e.ARRAY_BUFFER,et);for(let ve=0;ve<B.locationSize;ve++)_(B.location+ve,ye/B.locationSize,Ze,Re,fe*ke,(Ce+ye/B.locationSize*ve)*ke,W)}else{if(pe.isInstancedBufferAttribute){for(let K=0;K<B.locationSize;K++)o(B.location+K,pe.meshPerAttribute);u.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let K=0;K<B.locationSize;K++)f(B.location+K);e.bindBuffer(e.ARRAY_BUFFER,et);for(let K=0;K<B.locationSize;K++)_(B.location+K,ye/B.locationSize,Ze,Re,ye*ke,ye/B.locationSize*K*ke,W)}}else if(k!==void 0){const Re=k[ne];if(Re!==void 0)switch(Re.length){case 2:e.vertexAttrib2fv(B.location,Re);break;case 3:e.vertexAttrib3fv(B.location,Re);break;case 4:e.vertexAttrib4fv(B.location,Re);break;default:e.vertexAttrib1fv(B.location,Re)}}}}E()}function L(){F();for(const u in i){const C=i[u];for(const H in C){const z=C[H];for(const Y in z)A(z[Y].object),delete z[Y];delete C[H]}delete i[u]}}function R(u){if(i[u.id]===void 0)return;const C=i[u.id];for(const H in C){const z=C[H];for(const Y in z)A(z[Y].object),delete z[Y];delete C[H]}delete i[u.id]}function D(u){for(const C in i){const H=i[C];if(H[u.id]===void 0)continue;const z=H[u.id];for(const Y in z)A(z[Y].object),delete z[Y];delete H[u.id]}}function F(){m(),d=!0,r!==a&&(r=a,S(r.object))}function m(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:l,reset:F,resetDefaultState:m,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfProgram:D,initAttributes:y,enableAttribute:f,disableUnusedAttributes:E}}function hd(e,n,t){let i;function a(S){i=S}function r(S,A){e.drawArrays(i,S,A),t.update(A,i,1)}function d(S,A,M){M!==0&&(e.drawArraysInstanced(i,S,A,M),t.update(A,i,M))}function l(S,A,M){if(M===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,S,0,A,0,M);let x=0;for(let I=0;I<M;I++)x+=A[I];t.update(x,i,1)}function v(S,A,M,T){if(M===0)return;const x=n.get("WEBGL_multi_draw");if(x===null)for(let I=0;I<S.length;I++)d(S[I],A[I],T[I]);else{x.multiDrawArraysInstancedWEBGL(i,S,0,A,0,T,0,M);let I=0;for(let y=0;y<M;y++)I+=A[y]*T[y];t.update(I,i,1)}}this.setMode=a,this.render=r,this.renderInstances=d,this.renderMultiDraw=l,this.renderMultiDrawInstances=v}function md(e,n,t,i){let a;function r(){if(a!==void 0)return a;if(n.has("EXT_texture_filter_anisotropic")===!0){const D=n.get("EXT_texture_filter_anisotropic");a=e.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function d(D){return!(D!==Ct&&i.convert(D)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(D){const F=D===On&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(D!==Vt&&i.convert(D)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==Bt&&!F)}function v(D){if(D==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let S=t.precision!==void 0?t.precision:"highp";const A=v(S);A!==S&&(console.warn("THREE.WebGLRenderer:",S,"not supported, using",A,"instead."),S=A);const M=t.logarithmicDepthBuffer===!0,T=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),x=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),I=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),o=e.getParameter(e.MAX_VERTEX_ATTRIBS),E=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),g=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),L=I>0,R=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:v,textureFormatReadable:d,textureTypeReadable:l,precision:S,logarithmicDepthBuffer:M,reversedDepthBuffer:T,maxTextures:x,maxVertexTextures:I,maxTextureSize:y,maxCubemapSize:f,maxAttributes:o,maxVertexUniforms:E,maxVaryings:_,maxFragmentUniforms:g,vertexTextures:L,maxSamples:R}}function _d(e){const n=this;let t=null,i=0,a=!1,r=!1;const d=new bi,l=new Ge,v={value:null,needsUpdate:!1};this.uniform=v,this.numPlanes=0,this.numIntersection=0,this.init=function(M,T){const x=M.length!==0||T||i!==0||a;return a=T,i=M.length,x},this.beginShadows=function(){r=!0,A(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(M,T){t=A(M,T,0)},this.setState=function(M,T,x){const I=M.clippingPlanes,y=M.clipIntersection,f=M.clipShadows,o=e.get(M);if(!a||I===null||I.length===0||r&&!f)r?A(null):S();else{const E=r?0:i,_=E*4;let g=o.clippingState||null;v.value=g,g=A(I,T,_,x);for(let L=0;L!==_;++L)g[L]=t[L];o.clippingState=g,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function S(){v.value!==t&&(v.value=t,v.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function A(M,T,x,I){const y=M!==null?M.length:0;let f=null;if(y!==0){if(f=v.value,I!==!0||f===null){const o=x+y*4,E=T.matrixWorldInverse;l.getNormalMatrix(E),(f===null||f.length<o)&&(f=new Float32Array(o));for(let _=0,g=x;_!==y;++_,g+=4)d.copy(M[_]).applyMatrix4(E,l),d.normal.toArray(f,g),f[g+3]=d.constant}v.value=f,v.needsUpdate=!0}return n.numPlanes=y,n.numIntersection=0,f}}function gd(e){let n=new WeakMap;function t(d,l){return l===Ei?d.mapping=un:l===Si&&(d.mapping=Qt),d}function i(d){if(d&&d.isTexture){const l=d.mapping;if(l===Ei||l===Si)if(n.has(d)){const v=n.get(d).texture;return t(v,d.mapping)}else{const v=d.image;if(v&&v.height>0){const S=new $o(v.height);return S.fromEquirectangularTexture(e,d),n.set(d,S),d.addEventListener("dispose",a),t(S.texture,d.mapping)}else return null}}return d}function a(d){const l=d.target;l.removeEventListener("dispose",a);const v=n.get(l);v!==void 0&&(n.delete(l),v.dispose())}function r(){n=new WeakMap}return{get:i,dispose:r}}const qt=4,br=[.125,.215,.35,.446,.526,.582],Ft=20,Zn=new Da,wr=new Xe;let jn=null,Qn=0,Jn=0,ei=!1;const Ot=(1+Math.sqrt(5))/2,Wt=1/Ot,Cr=[new ce(-Ot,Wt,0),new ce(Ot,Wt,0),new ce(-Wt,0,Ot),new ce(Wt,0,Ot),new ce(0,Ot,-Wt),new ce(0,Ot,Wt),new ce(-1,1,-1),new ce(1,1,-1),new ce(-1,1,1),new ce(1,1,1)],vd=new ce;class Pr{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,a=100,r={}){const{size:d=256,position:l=vd}=r;jn=this._renderer.getRenderTarget(),Qn=this._renderer.getActiveCubeFace(),Jn=this._renderer.getActiveMipmapLevel(),ei=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const v=this._allocateTargets();return v.depthBuffer=!0,this._sceneToCubeUV(n,i,a,v,l),t>0&&this._blur(v,0,0,t),this._applyPMREM(v),this._cleanup(v),v}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(jn,Qn,Jn),this._renderer.xr.enabled=ei,n.scissorTest=!1,En(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===un||n.mapping===Qt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),jn=this._renderer.getRenderTarget(),Qn=this._renderer.getActiveCubeFace(),Jn=this._renderer.getActiveMipmapLevel(),ei=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:On,format:Ct,colorSpace:Fn,depthBuffer:!1},a=Dr(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dr(n,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ed(r)),this._blurMaterial=Sd(r,n,t)}return a}_compileMaterial(n){const t=new ut(this._lodPlanes[0],n);this._renderer.compile(t,Zn)}_sceneToCubeUV(n,t,i,a,r){const v=new $t(90,1,t,i),S=[1,-1,1,1,1,1],A=[1,1,1,-1,-1,-1],M=this._renderer,T=M.autoClear,x=M.toneMapping;M.getClearColor(wr),M.toneMapping=Pt,M.autoClear=!1,M.state.buffers.depth.getReversed()&&(M.setRenderTarget(a),M.clearDepth(),M.setRenderTarget(null));const y=new Pi({name:"PMREM.Background",side:Tt,depthWrite:!1,depthTest:!1}),f=new ut(new Ci,y);let o=!1;const E=n.background;E?E.isColor&&(y.color.copy(E),n.background=null,o=!0):(y.color.copy(wr),o=!0);for(let _=0;_<6;_++){const g=_%3;g===0?(v.up.set(0,S[_],0),v.position.set(r.x,r.y,r.z),v.lookAt(r.x+A[_],r.y,r.z)):g===1?(v.up.set(0,0,S[_]),v.position.set(r.x,r.y,r.z),v.lookAt(r.x,r.y+A[_],r.z)):(v.up.set(0,S[_],0),v.position.set(r.x,r.y,r.z),v.lookAt(r.x,r.y,r.z+A[_]));const L=this._cubeSize;En(a,g*L,_>2?L:0,L,L),M.setRenderTarget(a),o&&M.render(f,v),M.render(n,v)}f.geometry.dispose(),f.material.dispose(),M.toneMapping=x,M.autoClear=T,n.background=E}_textureToCubeUV(n,t){const i=this._renderer,a=n.mapping===un||n.mapping===Qt;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=yr()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lr());const r=a?this._cubemapMaterial:this._equirectMaterial,d=new ut(this._lodPlanes[0],r),l=r.uniforms;l.envMap.value=n;const v=this._cubeSize;En(t,0,0,3*v,2*v),i.setRenderTarget(t),i.render(d,Zn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const d=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=Cr[(a-r-1)%Cr.length];this._blur(n,r-1,r,d,l)}t.autoClear=i}_blur(n,t,i,a,r){const d=this._pingPongRenderTarget;this._halfBlur(n,d,t,i,a,"latitudinal",r),this._halfBlur(d,n,i,i,a,"longitudinal",r)}_halfBlur(n,t,i,a,r,d,l){const v=this._renderer,S=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const A=3,M=new ut(this._lodPlanes[a],S),T=S.uniforms,x=this._sizeLods[i]-1,I=isFinite(r)?Math.PI/(2*x):2*Math.PI/(2*Ft-1),y=r/I,f=isFinite(r)?1+Math.floor(A*y):Ft;f>Ft&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Ft}`);const o=[];let E=0;for(let D=0;D<Ft;++D){const F=D/y,m=Math.exp(-F*F/2);o.push(m),D===0?E+=m:D<f&&(E+=2*m)}for(let D=0;D<o.length;D++)o[D]=o[D]/E;T.envMap.value=n.texture,T.samples.value=f,T.weights.value=o,T.latitudinal.value=d==="latitudinal",l&&(T.poleAxis.value=l);const{_lodMax:_}=this;T.dTheta.value=I,T.mipInt.value=_-i;const g=this._sizeLods[a],L=3*g*(a>_-qt?a-_+qt:0),R=4*(this._cubeSize-g);En(t,L,R,3*g,2*g),v.setRenderTarget(t),v.render(M,Zn)}}function Ed(e){const n=[],t=[],i=[];let a=e;const r=e-qt+1+br.length;for(let d=0;d<r;d++){const l=Math.pow(2,a);t.push(l);let v=1/l;d>e-qt?v=br[d-e+qt-1]:d===0&&(v=0),i.push(v);const S=1/(l-2),A=-S,M=1+S,T=[A,A,M,A,M,M,A,A,M,M,A,M],x=6,I=6,y=3,f=2,o=1,E=new Float32Array(y*I*x),_=new Float32Array(f*I*x),g=new Float32Array(o*I*x);for(let R=0;R<x;R++){const D=R%3*2/3-1,F=R>2?0:-1,m=[D,F,0,D+2/3,F,0,D+2/3,F+1,0,D,F,0,D+2/3,F+1,0,D,F+1,0];E.set(m,y*I*R),_.set(T,f*I*R);const u=[R,R,R,R,R,R];g.set(u,o*I*R)}const L=new wi;L.setAttribute("position",new ln(E,y)),L.setAttribute("uv",new ln(_,f)),L.setAttribute("faceIndex",new ln(g,o)),n.push(L),a>qt&&a--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function Dr(e,n,t){const i=new jt(e,n,t);return i.texture.mapping=Bn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function En(e,n,t,i,a){e.viewport.set(n,t,i,a),e.scissor.set(n,t,i,a)}function Sd(e,n,t){const i=new Float32Array(Ft),a=new ce(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:Ft,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Di(),fragmentShader:`

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
	`}function Md(e){let n=new WeakMap,t=null;function i(l){if(l&&l.isTexture){const v=l.mapping,S=v===Ei||v===Si,A=v===un||v===Qt;if(S||A){let M=n.get(l);const T=M!==void 0?M.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==T)return t===null&&(t=new Pr(e)),M=S?t.fromEquirectangular(l,M):t.fromCubemap(l,M),M.texture.pmremVersion=l.pmremVersion,n.set(l,M),M.texture;if(M!==void 0)return M.texture;{const x=l.image;return S&&x&&x.height>0||A&&x&&a(x)?(t===null&&(t=new Pr(e)),M=S?t.fromEquirectangular(l):t.fromCubemap(l),M.texture.pmremVersion=l.pmremVersion,n.set(l,M),l.addEventListener("dispose",r),M.texture):null}}}return l}function a(l){let v=0;const S=6;for(let A=0;A<S;A++)l[A]!==void 0&&v++;return v===S}function r(l){const v=l.target;v.removeEventListener("dispose",r);const S=n.get(v);S!==void 0&&(n.delete(v),S.dispose())}function d(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:d}}function Td(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let a;switch(i){case"WEBGL_depth_texture":a=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=e.getExtension(i)}return n[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&fi("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function xd(e,n,t,i){const a={},r=new WeakMap;function d(M){const T=M.target;T.index!==null&&n.remove(T.index);for(const I in T.attributes)n.remove(T.attributes[I]);T.removeEventListener("dispose",d),delete a[T.id];const x=r.get(T);x&&(n.remove(x),r.delete(T)),i.releaseStatesOfGeometry(T),T.isInstancedBufferGeometry===!0&&delete T._maxInstanceCount,t.memory.geometries--}function l(M,T){return a[T.id]===!0||(T.addEventListener("dispose",d),a[T.id]=!0,t.memory.geometries++),T}function v(M){const T=M.attributes;for(const x in T)n.update(T[x],e.ARRAY_BUFFER)}function S(M){const T=[],x=M.index,I=M.attributes.position;let y=0;if(x!==null){const E=x.array;y=x.version;for(let _=0,g=E.length;_<g;_+=3){const L=E[_+0],R=E[_+1],D=E[_+2];T.push(L,R,R,D,D,L)}}else if(I!==void 0){const E=I.array;y=I.version;for(let _=0,g=E.length/3-1;_<g;_+=3){const L=_+0,R=_+1,D=_+2;T.push(L,R,R,D,D,L)}}else return;const f=new(ts(T)?Jo:es)(T,1);f.version=y;const o=r.get(M);o&&n.remove(o),r.set(M,f)}function A(M){const T=r.get(M);if(T){const x=M.index;x!==null&&T.version<x.version&&S(M)}else S(M);return r.get(M)}return{get:l,update:v,getWireframeAttribute:A}}function Ad(e,n,t){let i;function a(T){i=T}let r,d;function l(T){r=T.type,d=T.bytesPerElement}function v(T,x){e.drawElements(i,x,r,T*d),t.update(x,i,1)}function S(T,x,I){I!==0&&(e.drawElementsInstanced(i,x,r,T*d,I),t.update(x,i,I))}function A(T,x,I){if(I===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,x,0,r,T,0,I);let f=0;for(let o=0;o<I;o++)f+=x[o];t.update(f,i,1)}function M(T,x,I,y){if(I===0)return;const f=n.get("WEBGL_multi_draw");if(f===null)for(let o=0;o<T.length;o++)S(T[o]/d,x[o],y[o]);else{f.multiDrawElementsInstancedWEBGL(i,x,0,r,T,0,y,0,I);let o=0;for(let E=0;E<I;E++)o+=x[E]*y[E];t.update(o,i,1)}}this.setMode=a,this.setIndex=l,this.render=v,this.renderInstances=S,this.renderMultiDraw=A,this.renderMultiDrawInstances=M}function Rd(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,d,l){switch(t.calls++,d){case e.TRIANGLES:t.triangles+=l*(r/3);break;case e.LINES:t.lines+=l*(r/2);break;case e.LINE_STRIP:t.lines+=l*(r-1);break;case e.LINE_LOOP:t.lines+=l*r;break;case e.POINTS:t.points+=l*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:a,update:i}}function bd(e,n,t){const i=new WeakMap,a=new dt;function r(d,l,v){const S=d.morphTargetInfluences,A=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,M=A!==void 0?A.length:0;let T=i.get(l);if(T===void 0||T.count!==M){let m=function(){D.dispose(),i.delete(l),l.removeEventListener("dispose",m)};T!==void 0&&T.texture.dispose();const x=l.morphAttributes.position!==void 0,I=l.morphAttributes.normal!==void 0,y=l.morphAttributes.color!==void 0,f=l.morphAttributes.position||[],o=l.morphAttributes.normal||[],E=l.morphAttributes.color||[];let _=0;x===!0&&(_=1),I===!0&&(_=2),y===!0&&(_=3);let g=l.attributes.position.count*_,L=1;g>n.maxTextureSize&&(L=Math.ceil(g/n.maxTextureSize),g=n.maxTextureSize);const R=new Float32Array(g*L*4*M),D=new wa(R,g,L,M);D.type=Bt,D.needsUpdate=!0;const F=_*4;for(let u=0;u<M;u++){const C=f[u],H=o[u],z=E[u],Y=g*L*4*u;for(let q=0;q<C.count;q++){const k=q*F;x===!0&&(a.fromBufferAttribute(C,q),R[Y+k+0]=a.x,R[Y+k+1]=a.y,R[Y+k+2]=a.z,R[Y+k+3]=0),I===!0&&(a.fromBufferAttribute(H,q),R[Y+k+4]=a.x,R[Y+k+5]=a.y,R[Y+k+6]=a.z,R[Y+k+7]=0),y===!0&&(a.fromBufferAttribute(z,q),R[Y+k+8]=a.x,R[Y+k+9]=a.y,R[Y+k+10]=a.z,R[Y+k+11]=z.itemSize===4?a.w:1)}}T={count:M,texture:D,size:new Ke(g,L)},i.set(l,T),l.addEventListener("dispose",m)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)v.getUniforms().setValue(e,"morphTexture",d.morphTexture,t);else{let x=0;for(let y=0;y<S.length;y++)x+=S[y];const I=l.morphTargetsRelative?1:1-x;v.getUniforms().setValue(e,"morphTargetBaseInfluence",I),v.getUniforms().setValue(e,"morphTargetInfluences",S)}v.getUniforms().setValue(e,"morphTargetsTexture",T.texture,t),v.getUniforms().setValue(e,"morphTargetsTextureSize",T.size)}return{update:r}}function wd(e,n,t,i){let a=new WeakMap;function r(v){const S=i.render.frame,A=v.geometry,M=n.get(v,A);if(a.get(M)!==S&&(n.update(M),a.set(M,S)),v.isInstancedMesh&&(v.hasEventListener("dispose",l)===!1&&v.addEventListener("dispose",l),a.get(v)!==S&&(t.update(v.instanceMatrix,e.ARRAY_BUFFER),v.instanceColor!==null&&t.update(v.instanceColor,e.ARRAY_BUFFER),a.set(v,S))),v.isSkinnedMesh){const T=v.skeleton;a.get(T)!==S&&(T.update(),a.set(T,S))}return M}function d(){a=new WeakMap}function l(v){const S=v.target;S.removeEventListener("dispose",l),t.remove(S.instanceMatrix),S.instanceColor!==null&&t.remove(S.instanceColor)}return{update:r,dispose:d}}const Oa=new ps,Ur=new ga(1,1),Fa=new wa,Ba=new us,Ha=new fs,Ir=[],Nr=[],Or=new Float32Array(16),Fr=new Float32Array(9),Br=new Float32Array(4);function en(e,n,t){const i=e[0];if(i<=0||i>0)return e;const a=n*t;let r=Ir[a];if(r===void 0&&(r=new Float32Array(a),Ir[a]=r),n!==0){i.toArray(r,0);for(let d=1,l=0;d!==n;++d)l+=t,e[d].toArray(r,l)}return r}function st(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function lt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Hn(e,n){let t=Nr[n];t===void 0&&(t=new Int32Array(n),Nr[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Cd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Pd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2fv(this.addr,n),lt(t,n)}}function Dd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(st(t,n))return;e.uniform3fv(this.addr,n),lt(t,n)}}function Ld(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4fv(this.addr,n),lt(t,n)}}function yd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Br.set(i),e.uniformMatrix2fv(this.addr,!1,Br),lt(t,i)}}function Ud(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Fr.set(i),e.uniformMatrix3fv(this.addr,!1,Fr),lt(t,i)}}function Id(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Or.set(i),e.uniformMatrix4fv(this.addr,!1,Or),lt(t,i)}}function Nd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Od(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2iv(this.addr,n),lt(t,n)}}function Fd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3iv(this.addr,n),lt(t,n)}}function Bd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4iv(this.addr,n),lt(t,n)}}function Hd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Gd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2uiv(this.addr,n),lt(t,n)}}function Vd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3uiv(this.addr,n),lt(t,n)}}function kd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4uiv(this.addr,n),lt(t,n)}}function Wd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let r;this.type===e.SAMPLER_2D_SHADOW?(Ur.compareFunction=va,r=Ur):r=Oa,t.setTexture2D(n||r,a)}function zd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(n||Ba,a)}function Xd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(n||Ha,a)}function Yd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(n||Fa,a)}function Kd(e){switch(e){case 5126:return Cd;case 35664:return Pd;case 35665:return Dd;case 35666:return Ld;case 35674:return yd;case 35675:return Ud;case 35676:return Id;case 5124:case 35670:return Nd;case 35667:case 35671:return Od;case 35668:case 35672:return Fd;case 35669:case 35673:return Bd;case 5125:return Hd;case 36294:return Gd;case 36295:return Vd;case 36296:return kd;case 35678:case 36198:case 36298:case 36306:case 35682:return Wd;case 35679:case 36299:case 36307:return zd;case 35680:case 36300:case 36308:case 36293:return Xd;case 36289:case 36303:case 36311:case 36292:return Yd}}function qd(e,n){e.uniform1fv(this.addr,n)}function $d(e,n){const t=en(n,this.size,2);e.uniform2fv(this.addr,t)}function Zd(e,n){const t=en(n,this.size,3);e.uniform3fv(this.addr,t)}function jd(e,n){const t=en(n,this.size,4);e.uniform4fv(this.addr,t)}function Qd(e,n){const t=en(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Jd(e,n){const t=en(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function ef(e,n){const t=en(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function tf(e,n){e.uniform1iv(this.addr,n)}function nf(e,n){e.uniform2iv(this.addr,n)}function rf(e,n){e.uniform3iv(this.addr,n)}function af(e,n){e.uniform4iv(this.addr,n)}function of(e,n){e.uniform1uiv(this.addr,n)}function sf(e,n){e.uniform2uiv(this.addr,n)}function lf(e,n){e.uniform3uiv(this.addr,n)}function cf(e,n){e.uniform4uiv(this.addr,n)}function df(e,n,t){const i=this.cache,a=n.length,r=Hn(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let d=0;d!==a;++d)t.setTexture2D(n[d]||Oa,r[d])}function ff(e,n,t){const i=this.cache,a=n.length,r=Hn(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let d=0;d!==a;++d)t.setTexture3D(n[d]||Ba,r[d])}function uf(e,n,t){const i=this.cache,a=n.length,r=Hn(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let d=0;d!==a;++d)t.setTextureCube(n[d]||Ha,r[d])}function pf(e,n,t){const i=this.cache,a=n.length,r=Hn(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let d=0;d!==a;++d)t.setTexture2DArray(n[d]||Fa,r[d])}function hf(e){switch(e){case 5126:return qd;case 35664:return $d;case 35665:return Zd;case 35666:return jd;case 35674:return Qd;case 35675:return Jd;case 35676:return ef;case 5124:case 35670:return tf;case 35667:case 35671:return nf;case 35668:case 35672:return rf;case 35669:case 35673:return af;case 5125:return of;case 36294:return sf;case 36295:return lf;case 36296:return cf;case 35678:case 36198:case 36298:case 36306:case 35682:return df;case 35679:case 36299:case 36307:return ff;case 35680:case 36300:case 36308:case 36293:return uf;case 36289:case 36303:case 36311:case 36292:return pf}}class mf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Kd(t.type)}}class _f{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hf(t.type)}}class gf{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const a=this.seq;for(let r=0,d=a.length;r!==d;++r){const l=a[r];l.setValue(n,t[l.id],i)}}}const ti=/(\w+)(\])?(\[|\.)?/g;function Hr(e,n){e.seq.push(n),e.map[n.id]=n}function vf(e,n,t){const i=e.name,a=i.length;for(ti.lastIndex=0;;){const r=ti.exec(i),d=ti.lastIndex;let l=r[1];const v=r[2]==="]",S=r[3];if(v&&(l=l|0),S===void 0||S==="["&&d+2===a){Hr(t,S===void 0?new mf(l,e,n):new _f(l,e,n));break}else{let M=t.map[l];M===void 0&&(M=new gf(l),Hr(t,M)),t=M}}}class Cn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const r=n.getActiveUniform(t,a),d=n.getUniformLocation(t,r.name);vf(r,d,this)}}setValue(n,t,i,a){const r=this.map[t];r!==void 0&&r.setValue(n,i,a)}setOptional(n,t,i){const a=t[i];a!==void 0&&this.setValue(n,i,a)}static upload(n,t,i,a){for(let r=0,d=t.length;r!==d;++r){const l=t[r],v=i[l.id];v.needsUpdate!==!1&&l.setValue(n,v.value,a)}}static seqWithValue(n,t){const i=[];for(let a=0,r=n.length;a!==r;++a){const d=n[a];d.id in t&&i.push(d)}return i}}function Gr(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const Ef=37297;let Sf=0;function Mf(e,n){const t=e.split(`
`),i=[],a=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let d=a;d<r;d++){const l=d+1;i.push(`${l===n?">":" "} ${l}: ${t[d]}`)}return i.join(`
`)}const Vr=new Ge;function Tf(e){at._getMatrix(Vr,at.workingColorSpace,e);const n=`mat3( ${Vr.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(e)){case Pa:return[n,"LinearTransferOETF"];case Je:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function kr(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const d=/ERROR: 0:(\d+)/.exec(r);if(d){const l=parseInt(d[1]);return t.toUpperCase()+`

`+r+`

`+Mf(e.getShaderSource(n),l)}else return r}function xf(e,n){const t=Tf(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Af(e,n){let t;switch(n){case ds:t="Linear";break;case cs:t="Reinhard";break;case ls:t="Cineon";break;case ss:t="ACESFilmic";break;case os:t="AgX";break;case as:t="Neutral";break;case rs:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sn=new ce;function Rf(){at.getLuminanceCoefficients(Sn);const e=Sn.x.toFixed(4),n=Sn.y.toFixed(4),t=Sn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bf(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(an).join(`
`)}function wf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Cf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=e.getActiveAttrib(n,a),d=r.name;let l=1;r.type===e.FLOAT_MAT2&&(l=2),r.type===e.FLOAT_MAT3&&(l=3),r.type===e.FLOAT_MAT4&&(l=4),t[d]={type:r.type,location:e.getAttribLocation(n,d),locationSize:l}}return t}function an(e){return e!==""}function Wr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function zr(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Pf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mi(e){return e.replace(Pf,Lf)}const Df=new Map;function Lf(e,n){let t=Oe[n];if(t===void 0){const i=Df.get(n);if(i!==void 0)t=Oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return Mi(t)}const yf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xr(e){return e.replace(yf,Uf)}function Uf(e,n,t,i){let a="";for(let r=parseInt(n);r<parseInt(t);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Yr(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}function If(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Ea?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===is?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===wt&&(n="SHADOWMAP_TYPE_VSM"),n}function Nf(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case un:case Qt:n="ENVMAP_TYPE_CUBE";break;case Bn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Of(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===Qt&&(n="ENVMAP_MODE_REFRACTION"),n}function Ff(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case gs:n="ENVMAP_BLENDING_MULTIPLY";break;case _s:n="ENVMAP_BLENDING_MIX";break;case ms:n="ENVMAP_BLENDING_ADD";break}return n}function Bf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Hf(e,n,t,i){const a=e.getContext(),r=t.defines;let d=t.vertexShader,l=t.fragmentShader;const v=If(t),S=Nf(t),A=Of(t),M=Ff(t),T=Bf(t),x=bf(t),I=wf(r),y=a.createProgram();let f,o,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,I].filter(an).join(`
`),f.length>0&&(f+=`
`),o=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,I].filter(an).join(`
`),o.length>0&&(o+=`
`)):(f=[Yr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,I,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+A:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+v:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(an).join(`
`),o=[Yr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,I,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+S:"",t.envMap?"#define "+A:"",t.envMap?"#define "+M:"",T?"#define CUBEUV_TEXEL_WIDTH "+T.texelWidth:"",T?"#define CUBEUV_TEXEL_HEIGHT "+T.texelHeight:"",T?"#define CUBEUV_MAX_MIP "+T.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+v:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pt?"#define TONE_MAPPING":"",t.toneMapping!==Pt?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Pt?Af("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,xf("linearToOutputTexel",t.outputColorSpace),Rf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(an).join(`
`)),d=Mi(d),d=Wr(d,t),d=zr(d,t),l=Mi(l),l=Wr(l,t),l=zr(l,t),d=Xr(d),l=Xr(l),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,f=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,o=["#define varying in",t.glslVersion===Sr?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+o);const _=E+f+d,g=E+o+l,L=Gr(a,a.VERTEX_SHADER,_),R=Gr(a,a.FRAGMENT_SHADER,g);a.attachShader(y,L),a.attachShader(y,R),t.index0AttributeName!==void 0?a.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(y,0,"position"),a.linkProgram(y);function D(C){if(e.debug.checkShaderErrors){const H=a.getProgramInfoLog(y)||"",z=a.getShaderInfoLog(L)||"",Y=a.getShaderInfoLog(R)||"",q=H.trim(),k=z.trim(),ne=Y.trim();let B=!0,pe=!0;if(a.getProgramParameter(y,a.LINK_STATUS)===!1)if(B=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,y,L,R);else{const Re=kr(a,L,"vertex"),ye=kr(a,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(y,a.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+q+`
`+Re+`
`+ye)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(k===""||ne==="")&&(pe=!1);pe&&(C.diagnostics={runnable:B,programLog:q,vertexShader:{log:k,prefix:f},fragmentShader:{log:ne,prefix:o}})}a.deleteShader(L),a.deleteShader(R),F=new Cn(a,y),m=Cf(a,y)}let F;this.getUniforms=function(){return F===void 0&&D(this),F};let m;this.getAttributes=function(){return m===void 0&&D(this),m};let u=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return u===!1&&(u=a.getProgramParameter(y,Ef)),u},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sf++,this.cacheKey=n,this.usedTimes=1,this.program=y,this.vertexShader=L,this.fragmentShader=R,this}let Gf=0;class Vf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,a=this._getShaderStage(t),r=this._getShaderStage(i),d=this._getShaderCacheForMaterial(n);return d.has(a)===!1&&(d.add(a),a.usedTimes++),d.has(r)===!1&&(d.add(r),r.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new kf(n),t.set(n,i)),i}}class kf{constructor(n){this.id=Gf++,this.code=n,this.usedTimes=0}}function Wf(e,n,t,i,a,r,d){const l=new ns,v=new Vf,S=new Set,A=[],M=a.logarithmicDepthBuffer,T=a.vertexTextures;let x=a.precision;const I={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(m){return S.add(m),m===0?"uv":`uv${m}`}function f(m,u,C,H,z){const Y=H.fog,q=z.geometry,k=m.isMeshStandardMaterial?H.environment:null,ne=(m.isMeshStandardMaterial?t:n).get(m.envMap||k),B=ne&&ne.mapping===Bn?ne.image.height:null,pe=I[m.type];m.precision!==null&&(x=a.getMaxPrecision(m.precision),x!==m.precision&&console.warn("THREE.WebGLProgram.getParameters:",m.precision,"not supported, using",x,"instead."));const Re=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ye=Re!==void 0?Re.length:0;let He=0;q.morphAttributes.position!==void 0&&(He=1),q.morphAttributes.normal!==void 0&&(He=2),q.morphAttributes.color!==void 0&&(He=3);let et,Ze,ke,W;if(pe){const We=Rt[pe];et=We.vertexShader,Ze=We.fragmentShader}else et=m.vertexShader,Ze=m.fragmentShader,v.update(m),ke=v.getVertexShaderID(m),W=v.getFragmentShaderID(m);const K=e.getRenderTarget(),fe=e.state.buffers.depth.getReversed(),Ce=z.isInstancedMesh===!0,ve=z.isBatchedMesh===!0,Fe=!!m.map,ee=!!m.matcap,p=!!ne,Le=!!m.aoMap,he=!!m.lightMap,xe=!!m.bumpMap,se=!!m.normalMap,ze=!!m.displacementMap,me=!!m.emissiveMap,Ne=!!m.metalnessMap,ct=!!m.roughnessMap,rt=m.anisotropy>0,h=m.clearcoat>0,s=m.dispersion>0,U=m.iridescence>0,V=m.sheen>0,$=m.transmission>0,G=rt&&!!m.anisotropyMap,Te=h&&!!m.clearcoatMap,te=h&&!!m.clearcoatNormalMap,Ee=h&&!!m.clearcoatRoughnessMap,Se=U&&!!m.iridescenceMap,Q=U&&!!m.iridescenceThicknessMap,le=V&&!!m.sheenColorMap,Pe=V&&!!m.sheenRoughnessMap,Me=!!m.specularMap,ae=!!m.specularColorMap,Ie=!!m.specularIntensityMap,b=$&&!!m.transmissionMap,J=$&&!!m.thicknessMap,ie=!!m.gradientMap,ue=!!m.alphaMap,Z=m.alphaTest>0,X=!!m.alphaHash,ge=!!m.extensions;let Ue=Pt;m.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ue=e.toneMapping);const je={shaderID:pe,shaderType:m.type,shaderName:m.name,vertexShader:et,fragmentShader:Ze,defines:m.defines,customVertexShaderID:ke,customFragmentShaderID:W,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:x,batching:ve,batchingColor:ve&&z._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&z.instanceColor!==null,instancingMorph:Ce&&z.morphTexture!==null,supportsVertexTextures:T,outputColorSpace:K===null?e.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Fn,alphaToCoverage:!!m.alphaToCoverage,map:Fe,matcap:ee,envMap:p,envMapMode:p&&ne.mapping,envMapCubeUVHeight:B,aoMap:Le,lightMap:he,bumpMap:xe,normalMap:se,displacementMap:T&&ze,emissiveMap:me,normalMapObjectSpace:se&&m.normalMapType===Qo,normalMapTangentSpace:se&&m.normalMapType===jo,metalnessMap:Ne,roughnessMap:ct,anisotropy:rt,anisotropyMap:G,clearcoat:h,clearcoatMap:Te,clearcoatNormalMap:te,clearcoatRoughnessMap:Ee,dispersion:s,iridescence:U,iridescenceMap:Se,iridescenceThicknessMap:Q,sheen:V,sheenColorMap:le,sheenRoughnessMap:Pe,specularMap:Me,specularColorMap:ae,specularIntensityMap:Ie,transmission:$,transmissionMap:b,thicknessMap:J,gradientMap:ie,opaque:m.transparent===!1&&m.blending===wn&&m.alphaToCoverage===!1,alphaMap:ue,alphaTest:Z,alphaHash:X,combine:m.combine,mapUv:Fe&&y(m.map.channel),aoMapUv:Le&&y(m.aoMap.channel),lightMapUv:he&&y(m.lightMap.channel),bumpMapUv:xe&&y(m.bumpMap.channel),normalMapUv:se&&y(m.normalMap.channel),displacementMapUv:ze&&y(m.displacementMap.channel),emissiveMapUv:me&&y(m.emissiveMap.channel),metalnessMapUv:Ne&&y(m.metalnessMap.channel),roughnessMapUv:ct&&y(m.roughnessMap.channel),anisotropyMapUv:G&&y(m.anisotropyMap.channel),clearcoatMapUv:Te&&y(m.clearcoatMap.channel),clearcoatNormalMapUv:te&&y(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&y(m.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&y(m.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&y(m.iridescenceThicknessMap.channel),sheenColorMapUv:le&&y(m.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&y(m.sheenRoughnessMap.channel),specularMapUv:Me&&y(m.specularMap.channel),specularColorMapUv:ae&&y(m.specularColorMap.channel),specularIntensityMapUv:Ie&&y(m.specularIntensityMap.channel),transmissionMapUv:b&&y(m.transmissionMap.channel),thicknessMapUv:J&&y(m.thicknessMap.channel),alphaMapUv:ue&&y(m.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(se||rt),vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!q.attributes.uv&&(Fe||ue),fog:!!Y,useFog:m.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:m.flatShading===!0&&m.wireframe===!1,sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:M,reversedDepthBuffer:fe,skinning:z.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:He,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numSpotLightMaps:u.spotLightMap.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numSpotLightShadowsWithMaps:u.numSpotLightShadowsWithMaps,numLightProbes:u.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:m.dithering,shadowMapEnabled:e.shadowMap.enabled&&C.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Fe&&m.map.isVideoTexture===!0&&at.getTransfer(m.map.colorSpace)===Je,decodeVideoTextureEmissive:me&&m.emissiveMap.isVideoTexture===!0&&at.getTransfer(m.emissiveMap.colorSpace)===Je,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===xt,flipSided:m.side===Tt,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:ge&&m.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&m.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return je.vertexUv1s=S.has(1),je.vertexUv2s=S.has(2),je.vertexUv3s=S.has(3),S.clear(),je}function o(m){const u=[];if(m.shaderID?u.push(m.shaderID):(u.push(m.customVertexShaderID),u.push(m.customFragmentShaderID)),m.defines!==void 0)for(const C in m.defines)u.push(C),u.push(m.defines[C]);return m.isRawShaderMaterial===!1&&(E(u,m),_(u,m),u.push(e.outputColorSpace)),u.push(m.customProgramCacheKey),u.join()}function E(m,u){m.push(u.precision),m.push(u.outputColorSpace),m.push(u.envMapMode),m.push(u.envMapCubeUVHeight),m.push(u.mapUv),m.push(u.alphaMapUv),m.push(u.lightMapUv),m.push(u.aoMapUv),m.push(u.bumpMapUv),m.push(u.normalMapUv),m.push(u.displacementMapUv),m.push(u.emissiveMapUv),m.push(u.metalnessMapUv),m.push(u.roughnessMapUv),m.push(u.anisotropyMapUv),m.push(u.clearcoatMapUv),m.push(u.clearcoatNormalMapUv),m.push(u.clearcoatRoughnessMapUv),m.push(u.iridescenceMapUv),m.push(u.iridescenceThicknessMapUv),m.push(u.sheenColorMapUv),m.push(u.sheenRoughnessMapUv),m.push(u.specularMapUv),m.push(u.specularColorMapUv),m.push(u.specularIntensityMapUv),m.push(u.transmissionMapUv),m.push(u.thicknessMapUv),m.push(u.combine),m.push(u.fogExp2),m.push(u.sizeAttenuation),m.push(u.morphTargetsCount),m.push(u.morphAttributeCount),m.push(u.numDirLights),m.push(u.numPointLights),m.push(u.numSpotLights),m.push(u.numSpotLightMaps),m.push(u.numHemiLights),m.push(u.numRectAreaLights),m.push(u.numDirLightShadows),m.push(u.numPointLightShadows),m.push(u.numSpotLightShadows),m.push(u.numSpotLightShadowsWithMaps),m.push(u.numLightProbes),m.push(u.shadowMapType),m.push(u.toneMapping),m.push(u.numClippingPlanes),m.push(u.numClipIntersection),m.push(u.depthPacking)}function _(m,u){l.disableAll(),u.supportsVertexTextures&&l.enable(0),u.instancing&&l.enable(1),u.instancingColor&&l.enable(2),u.instancingMorph&&l.enable(3),u.matcap&&l.enable(4),u.envMap&&l.enable(5),u.normalMapObjectSpace&&l.enable(6),u.normalMapTangentSpace&&l.enable(7),u.clearcoat&&l.enable(8),u.iridescence&&l.enable(9),u.alphaTest&&l.enable(10),u.vertexColors&&l.enable(11),u.vertexAlphas&&l.enable(12),u.vertexUv1s&&l.enable(13),u.vertexUv2s&&l.enable(14),u.vertexUv3s&&l.enable(15),u.vertexTangents&&l.enable(16),u.anisotropy&&l.enable(17),u.alphaHash&&l.enable(18),u.batching&&l.enable(19),u.dispersion&&l.enable(20),u.batchingColor&&l.enable(21),u.gradientMap&&l.enable(22),m.push(l.mask),l.disableAll(),u.fog&&l.enable(0),u.useFog&&l.enable(1),u.flatShading&&l.enable(2),u.logarithmicDepthBuffer&&l.enable(3),u.reversedDepthBuffer&&l.enable(4),u.skinning&&l.enable(5),u.morphTargets&&l.enable(6),u.morphNormals&&l.enable(7),u.morphColors&&l.enable(8),u.premultipliedAlpha&&l.enable(9),u.shadowMapEnabled&&l.enable(10),u.doubleSided&&l.enable(11),u.flipSided&&l.enable(12),u.useDepthPacking&&l.enable(13),u.dithering&&l.enable(14),u.transmission&&l.enable(15),u.sheen&&l.enable(16),u.opaque&&l.enable(17),u.pointsUvs&&l.enable(18),u.decodeVideoTexture&&l.enable(19),u.decodeVideoTextureEmissive&&l.enable(20),u.alphaToCoverage&&l.enable(21),m.push(l.mask)}function g(m){const u=I[m.type];let C;if(u){const H=Rt[u];C=Zo.clone(H.uniforms)}else C=m.uniforms;return C}function L(m,u){let C;for(let H=0,z=A.length;H<z;H++){const Y=A[H];if(Y.cacheKey===u){C=Y,++C.usedTimes;break}}return C===void 0&&(C=new Hf(e,u,m,r),A.push(C)),C}function R(m){if(--m.usedTimes===0){const u=A.indexOf(m);A[u]=A[A.length-1],A.pop(),m.destroy()}}function D(m){v.remove(m)}function F(){v.dispose()}return{getParameters:f,getProgramCacheKey:o,getUniforms:g,acquireProgram:L,releaseProgram:R,releaseShaderCache:D,programs:A,dispose:F}}function zf(){let e=new WeakMap;function n(d){return e.has(d)}function t(d){let l=e.get(d);return l===void 0&&(l={},e.set(d,l)),l}function i(d){e.delete(d)}function a(d,l,v){e.get(d)[l]=v}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:a,dispose:r}}function Xf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function Kr(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function qr(){const e=[];let n=0;const t=[],i=[],a=[];function r(){n=0,t.length=0,i.length=0,a.length=0}function d(M,T,x,I,y,f){let o=e[n];return o===void 0?(o={id:M.id,object:M,geometry:T,material:x,groupOrder:I,renderOrder:M.renderOrder,z:y,group:f},e[n]=o):(o.id=M.id,o.object=M,o.geometry=T,o.material=x,o.groupOrder=I,o.renderOrder=M.renderOrder,o.z=y,o.group=f),n++,o}function l(M,T,x,I,y,f){const o=d(M,T,x,I,y,f);x.transmission>0?i.push(o):x.transparent===!0?a.push(o):t.push(o)}function v(M,T,x,I,y,f){const o=d(M,T,x,I,y,f);x.transmission>0?i.unshift(o):x.transparent===!0?a.unshift(o):t.unshift(o)}function S(M,T){t.length>1&&t.sort(M||Xf),i.length>1&&i.sort(T||Kr),a.length>1&&a.sort(T||Kr)}function A(){for(let M=n,T=e.length;M<T;M++){const x=e[M];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:a,init:r,push:l,unshift:v,finish:A,sort:S}}function Yf(){let e=new WeakMap;function n(i,a){const r=e.get(i);let d;return r===void 0?(d=new qr,e.set(i,[d])):a>=r.length?(d=new qr,r.push(d)):d=r[a],d}function t(){e=new WeakMap}return{get:n,dispose:t}}function Kf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new ce,color:new Xe};break;case"SpotLight":t={position:new ce,direction:new ce,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ce,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ce,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new ce,halfWidth:new ce,halfHeight:new ce};break}return e[n.id]=t,t}}}function qf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let $f=0;function Zf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function jf(e){const n=new Kf,t=qf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let S=0;S<9;S++)i.probe.push(new ce);const a=new ce,r=new Mt,d=new Mt;function l(S){let A=0,M=0,T=0;for(let m=0;m<9;m++)i.probe[m].set(0,0,0);let x=0,I=0,y=0,f=0,o=0,E=0,_=0,g=0,L=0,R=0,D=0;S.sort(Zf);for(let m=0,u=S.length;m<u;m++){const C=S[m],H=C.color,z=C.intensity,Y=C.distance,q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)A+=H.r*z,M+=H.g*z,T+=H.b*z;else if(C.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(C.sh.coefficients[k],z);D++}else if(C.isDirectionalLight){const k=n.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const ne=C.shadow,B=t.get(C);B.shadowIntensity=ne.intensity,B.shadowBias=ne.bias,B.shadowNormalBias=ne.normalBias,B.shadowRadius=ne.radius,B.shadowMapSize=ne.mapSize,i.directionalShadow[x]=B,i.directionalShadowMap[x]=q,i.directionalShadowMatrix[x]=C.shadow.matrix,E++}i.directional[x]=k,x++}else if(C.isSpotLight){const k=n.get(C);k.position.setFromMatrixPosition(C.matrixWorld),k.color.copy(H).multiplyScalar(z),k.distance=Y,k.coneCos=Math.cos(C.angle),k.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),k.decay=C.decay,i.spot[y]=k;const ne=C.shadow;if(C.map&&(i.spotLightMap[L]=C.map,L++,ne.updateMatrices(C),C.castShadow&&R++),i.spotLightMatrix[y]=ne.matrix,C.castShadow){const B=t.get(C);B.shadowIntensity=ne.intensity,B.shadowBias=ne.bias,B.shadowNormalBias=ne.normalBias,B.shadowRadius=ne.radius,B.shadowMapSize=ne.mapSize,i.spotShadow[y]=B,i.spotShadowMap[y]=q,g++}y++}else if(C.isRectAreaLight){const k=n.get(C);k.color.copy(H).multiplyScalar(z),k.halfWidth.set(C.width*.5,0,0),k.halfHeight.set(0,C.height*.5,0),i.rectArea[f]=k,f++}else if(C.isPointLight){const k=n.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),k.distance=C.distance,k.decay=C.decay,C.castShadow){const ne=C.shadow,B=t.get(C);B.shadowIntensity=ne.intensity,B.shadowBias=ne.bias,B.shadowNormalBias=ne.normalBias,B.shadowRadius=ne.radius,B.shadowMapSize=ne.mapSize,B.shadowCameraNear=ne.camera.near,B.shadowCameraFar=ne.camera.far,i.pointShadow[I]=B,i.pointShadowMap[I]=q,i.pointShadowMatrix[I]=C.shadow.matrix,_++}i.point[I]=k,I++}else if(C.isHemisphereLight){const k=n.get(C);k.skyColor.copy(C.color).multiplyScalar(z),k.groundColor.copy(C.groundColor).multiplyScalar(z),i.hemi[o]=k,o++}}f>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2)),i.ambient[0]=A,i.ambient[1]=M,i.ambient[2]=T;const F=i.hash;(F.directionalLength!==x||F.pointLength!==I||F.spotLength!==y||F.rectAreaLength!==f||F.hemiLength!==o||F.numDirectionalShadows!==E||F.numPointShadows!==_||F.numSpotShadows!==g||F.numSpotMaps!==L||F.numLightProbes!==D)&&(i.directional.length=x,i.spot.length=y,i.rectArea.length=f,i.point.length=I,i.hemi.length=o,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=g,i.spotShadowMap.length=g,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=g+L-R,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=D,F.directionalLength=x,F.pointLength=I,F.spotLength=y,F.rectAreaLength=f,F.hemiLength=o,F.numDirectionalShadows=E,F.numPointShadows=_,F.numSpotShadows=g,F.numSpotMaps=L,F.numLightProbes=D,i.version=$f++)}function v(S,A){let M=0,T=0,x=0,I=0,y=0;const f=A.matrixWorldInverse;for(let o=0,E=S.length;o<E;o++){const _=S[o];if(_.isDirectionalLight){const g=i.directional[M];g.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),g.direction.sub(a),g.direction.transformDirection(f),M++}else if(_.isSpotLight){const g=i.spot[x];g.position.setFromMatrixPosition(_.matrixWorld),g.position.applyMatrix4(f),g.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),g.direction.sub(a),g.direction.transformDirection(f),x++}else if(_.isRectAreaLight){const g=i.rectArea[I];g.position.setFromMatrixPosition(_.matrixWorld),g.position.applyMatrix4(f),d.identity(),r.copy(_.matrixWorld),r.premultiply(f),d.extractRotation(r),g.halfWidth.set(_.width*.5,0,0),g.halfHeight.set(0,_.height*.5,0),g.halfWidth.applyMatrix4(d),g.halfHeight.applyMatrix4(d),I++}else if(_.isPointLight){const g=i.point[T];g.position.setFromMatrixPosition(_.matrixWorld),g.position.applyMatrix4(f),T++}else if(_.isHemisphereLight){const g=i.hemi[y];g.direction.setFromMatrixPosition(_.matrixWorld),g.direction.transformDirection(f),y++}}}return{setup:l,setupView:v,state:i}}function $r(e){const n=new jf(e),t=[],i=[];function a(A){S.camera=A,t.length=0,i.length=0}function r(A){t.push(A)}function d(A){i.push(A)}function l(){n.setup(t)}function v(A){n.setupView(t,A)}const S={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:a,state:S,setupLights:l,setupLightsView:v,pushLight:r,pushShadow:d}}function Qf(e){let n=new WeakMap;function t(a,r=0){const d=n.get(a);let l;return d===void 0?(l=new $r(e),n.set(a,[l])):r>=d.length?(l=new $r(e),d.push(l)):l=d[r],l}function i(){n=new WeakMap}return{get:t,dispose:i}}const Jf=`void main() {
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
}`;function tu(e,n,t){let i=new _a;const a=new Ke,r=new Ke,d=new dt,l=new No({depthPacking:Oo}),v=new Fo,S={},A=t.maxTextureSize,M={[cn]:Tt,[Tt]:cn,[xt]:xt},T=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:Jf,fragmentShader:eu}),x=T.clone();x.defines.HORIZONTAL_PASS=1;const I=new wi;I.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ut(I,T),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ea;let o=this.type;this.render=function(R,D,F){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||R.length===0)return;const m=e.getRenderTarget(),u=e.getActiveCubeFace(),C=e.getActiveMipmapLevel(),H=e.state;H.setBlending(Ht),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const z=o!==wt&&this.type===wt,Y=o===wt&&this.type!==wt;for(let q=0,k=R.length;q<k;q++){const ne=R[q],B=ne.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;a.copy(B.mapSize);const pe=B.getFrameExtents();if(a.multiply(pe),r.copy(B.mapSize),(a.x>A||a.y>A)&&(a.x>A&&(r.x=Math.floor(A/pe.x),a.x=r.x*pe.x,B.mapSize.x=r.x),a.y>A&&(r.y=Math.floor(A/pe.y),a.y=r.y*pe.y,B.mapSize.y=r.y)),B.map===null||z===!0||Y===!0){const ye=this.type!==wt?{minFilter:sn,magFilter:sn}:{};B.map!==null&&B.map.dispose(),B.map=new jt(a.x,a.y,ye),B.map.texture.name=ne.name+".shadowMap",B.camera.updateProjectionMatrix()}e.setRenderTarget(B.map),e.clear();const Re=B.getViewportCount();for(let ye=0;ye<Re;ye++){const He=B.getViewport(ye);d.set(r.x*He.x,r.y*He.y,r.x*He.z,r.y*He.w),H.viewport(d),B.updateMatrices(ne,ye),i=B.getFrustum(),g(D,F,B.camera,ne,this.type)}B.isPointLightShadow!==!0&&this.type===wt&&E(B,F),B.needsUpdate=!1}o=this.type,f.needsUpdate=!1,e.setRenderTarget(m,u,C)};function E(R,D){const F=n.update(y);T.defines.VSM_SAMPLES!==R.blurSamples&&(T.defines.VSM_SAMPLES=R.blurSamples,x.defines.VSM_SAMPLES=R.blurSamples,T.needsUpdate=!0,x.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new jt(a.x,a.y)),T.uniforms.shadow_pass.value=R.map.texture,T.uniforms.resolution.value=R.mapSize,T.uniforms.radius.value=R.radius,e.setRenderTarget(R.mapPass),e.clear(),e.renderBufferDirect(D,null,F,T,y,null),x.uniforms.shadow_pass.value=R.mapPass.texture,x.uniforms.resolution.value=R.mapSize,x.uniforms.radius.value=R.radius,e.setRenderTarget(R.map),e.clear(),e.renderBufferDirect(D,null,F,x,y,null)}function _(R,D,F,m){let u=null;const C=F.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)u=C;else if(u=F.isPointLight===!0?v:l,e.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const H=u.uuid,z=D.uuid;let Y=S[H];Y===void 0&&(Y={},S[H]=Y);let q=Y[z];q===void 0&&(q=u.clone(),Y[z]=q,D.addEventListener("dispose",L)),u=q}if(u.visible=D.visible,u.wireframe=D.wireframe,m===wt?u.side=D.shadowSide!==null?D.shadowSide:D.side:u.side=D.shadowSide!==null?D.shadowSide:M[D.side],u.alphaMap=D.alphaMap,u.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,u.map=D.map,u.clipShadows=D.clipShadows,u.clippingPlanes=D.clippingPlanes,u.clipIntersection=D.clipIntersection,u.displacementMap=D.displacementMap,u.displacementScale=D.displacementScale,u.displacementBias=D.displacementBias,u.wireframeLinewidth=D.wireframeLinewidth,u.linewidth=D.linewidth,F.isPointLight===!0&&u.isMeshDistanceMaterial===!0){const H=e.properties.get(u);H.light=F}return u}function g(R,D,F,m,u){if(R.visible===!1)return;if(R.layers.test(D.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&u===wt)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,R.matrixWorld);const z=n.update(R),Y=R.material;if(Array.isArray(Y)){const q=z.groups;for(let k=0,ne=q.length;k<ne;k++){const B=q[k],pe=Y[B.materialIndex];if(pe&&pe.visible){const Re=_(R,pe,m,u);R.onBeforeShadow(e,R,D,F,z,Re,B),e.renderBufferDirect(F,null,z,Re,R,B),R.onAfterShadow(e,R,D,F,z,Re,B)}}}else if(Y.visible){const q=_(R,Y,m,u);R.onBeforeShadow(e,R,D,F,z,q,null),e.renderBufferDirect(F,null,z,q,R,null),R.onAfterShadow(e,R,D,F,z,q,null)}}const H=R.children;for(let z=0,Y=H.length;z<Y;z++)g(H[z],D,F,m,u)}function L(R){R.target.removeEventListener("dispose",L);for(const F in S){const m=S[F],u=R.target.uuid;u in m&&(m[u].dispose(),delete m[u])}}}const nu={[vi]:gi,[_i]:pi,[mi]:ui,[Ln]:hi,[gi]:vi,[pi]:_i,[ui]:mi,[hi]:Ln};function iu(e,n){function t(){let b=!1;const J=new dt;let ie=null;const ue=new dt(0,0,0,0);return{setMask:function(Z){ie!==Z&&!b&&(e.colorMask(Z,Z,Z,Z),ie=Z)},setLocked:function(Z){b=Z},setClear:function(Z,X,ge,Ue,je){je===!0&&(Z*=Ue,X*=Ue,ge*=Ue),J.set(Z,X,ge,Ue),ue.equals(J)===!1&&(e.clearColor(Z,X,ge,Ue),ue.copy(J))},reset:function(){b=!1,ie=null,ue.set(-1,0,0,0)}}}function i(){let b=!1,J=!1,ie=null,ue=null,Z=null;return{setReversed:function(X){if(J!==X){const ge=n.get("EXT_clip_control");X?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),J=X;const Ue=Z;Z=null,this.setClear(Ue)}},getReversed:function(){return J},setTest:function(X){X?K(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(X){ie!==X&&!b&&(e.depthMask(X),ie=X)},setFunc:function(X){if(J&&(X=nu[X]),ue!==X){switch(X){case vi:e.depthFunc(e.NEVER);break;case gi:e.depthFunc(e.ALWAYS);break;case _i:e.depthFunc(e.LESS);break;case Ln:e.depthFunc(e.LEQUAL);break;case mi:e.depthFunc(e.EQUAL);break;case hi:e.depthFunc(e.GEQUAL);break;case pi:e.depthFunc(e.GREATER);break;case ui:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ue=X}},setLocked:function(X){b=X},setClear:function(X){Z!==X&&(J&&(X=1-X),e.clearDepth(X),Z=X)},reset:function(){b=!1,ie=null,ue=null,Z=null,J=!1}}}function a(){let b=!1,J=null,ie=null,ue=null,Z=null,X=null,ge=null,Ue=null,je=null;return{setTest:function(We){b||(We?K(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(We){J!==We&&!b&&(e.stencilMask(We),J=We)},setFunc:function(We,bt,At){(ie!==We||ue!==bt||Z!==At)&&(e.stencilFunc(We,bt,At),ie=We,ue=bt,Z=At)},setOp:function(We,bt,At){(X!==We||ge!==bt||Ue!==At)&&(e.stencilOp(We,bt,At),X=We,ge=bt,Ue=At)},setLocked:function(We){b=We},setClear:function(We){je!==We&&(e.clearStencil(We),je=We)},reset:function(){b=!1,J=null,ie=null,ue=null,Z=null,X=null,ge=null,Ue=null,je=null}}}const r=new t,d=new i,l=new a,v=new WeakMap,S=new WeakMap;let A={},M={},T=new WeakMap,x=[],I=null,y=!1,f=null,o=null,E=null,_=null,g=null,L=null,R=null,D=new Xe(0,0,0),F=0,m=!1,u=null,C=null,H=null,z=null,Y=null;const q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,ne=0;const B=e.getParameter(e.VERSION);B.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(B)[1]),k=ne>=1):B.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),k=ne>=2);let pe=null,Re={};const ye=e.getParameter(e.SCISSOR_BOX),He=e.getParameter(e.VIEWPORT),et=new dt().fromArray(ye),Ze=new dt().fromArray(He);function ke(b,J,ie,ue){const Z=new Uint8Array(4),X=e.createTexture();e.bindTexture(b,X),e.texParameteri(b,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(b,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ge=0;ge<ie;ge++)b===e.TEXTURE_3D||b===e.TEXTURE_2D_ARRAY?e.texImage3D(J,0,e.RGBA,1,1,ue,0,e.RGBA,e.UNSIGNED_BYTE,Z):e.texImage2D(J+ge,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Z);return X}const W={};W[e.TEXTURE_2D]=ke(e.TEXTURE_2D,e.TEXTURE_2D,1),W[e.TEXTURE_CUBE_MAP]=ke(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[e.TEXTURE_2D_ARRAY]=ke(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),W[e.TEXTURE_3D]=ke(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),d.setClear(1),l.setClear(0),K(e.DEPTH_TEST),d.setFunc(Ln),xe(!1),se(hr),K(e.CULL_FACE),Le(Ht);function K(b){A[b]!==!0&&(e.enable(b),A[b]=!0)}function fe(b){A[b]!==!1&&(e.disable(b),A[b]=!1)}function Ce(b,J){return M[b]!==J?(e.bindFramebuffer(b,J),M[b]=J,b===e.DRAW_FRAMEBUFFER&&(M[e.FRAMEBUFFER]=J),b===e.FRAMEBUFFER&&(M[e.DRAW_FRAMEBUFFER]=J),!0):!1}function ve(b,J){let ie=x,ue=!1;if(b){ie=T.get(J),ie===void 0&&(ie=[],T.set(J,ie));const Z=b.textures;if(ie.length!==Z.length||ie[0]!==e.COLOR_ATTACHMENT0){for(let X=0,ge=Z.length;X<ge;X++)ie[X]=e.COLOR_ATTACHMENT0+X;ie.length=Z.length,ue=!0}}else ie[0]!==e.BACK&&(ie[0]=e.BACK,ue=!0);ue&&e.drawBuffers(ie)}function Fe(b){return I!==b?(e.useProgram(b),I=b,!0):!1}const ee={[nn]:e.FUNC_ADD,[so]:e.FUNC_SUBTRACT,[oo]:e.FUNC_REVERSE_SUBTRACT};ee[vs]=e.MIN,ee[Es]=e.MAX;const p={[xo]:e.ZERO,[To]:e.ONE,[Mo]:e.SRC_COLOR,[So]:e.SRC_ALPHA,[Eo]:e.SRC_ALPHA_SATURATE,[vo]:e.DST_COLOR,[go]:e.DST_ALPHA,[_o]:e.ONE_MINUS_SRC_COLOR,[mo]:e.ONE_MINUS_SRC_ALPHA,[ho]:e.ONE_MINUS_DST_COLOR,[po]:e.ONE_MINUS_DST_ALPHA,[uo]:e.CONSTANT_COLOR,[fo]:e.ONE_MINUS_CONSTANT_COLOR,[co]:e.CONSTANT_ALPHA,[lo]:e.ONE_MINUS_CONSTANT_ALPHA};function Le(b,J,ie,ue,Z,X,ge,Ue,je,We){if(b===Ht){y===!0&&(fe(e.BLEND),y=!1);return}if(y===!1&&(K(e.BLEND),y=!0),b!==qo){if(b!==f||We!==m){if((o!==nn||g!==nn)&&(e.blendEquation(e.FUNC_ADD),o=nn,g=nn),We)switch(b){case wn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case gr:e.blendFunc(e.ONE,e.ONE);break;case _r:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case mr:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}else switch(b){case wn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case gr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case _r:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case mr:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}E=null,_=null,L=null,R=null,D.set(0,0,0),F=0,f=b,m=We}return}Z=Z||J,X=X||ie,ge=ge||ue,(J!==o||Z!==g)&&(e.blendEquationSeparate(ee[J],ee[Z]),o=J,g=Z),(ie!==E||ue!==_||X!==L||ge!==R)&&(e.blendFuncSeparate(p[ie],p[ue],p[X],p[ge]),E=ie,_=ue,L=X,R=ge),(Ue.equals(D)===!1||je!==F)&&(e.blendColor(Ue.r,Ue.g,Ue.b,je),D.copy(Ue),F=je),f=b,m=!1}function he(b,J){b.side===xt?fe(e.CULL_FACE):K(e.CULL_FACE);let ie=b.side===Tt;J&&(ie=!ie),xe(ie),b.blending===wn&&b.transparent===!1?Le(Ht):Le(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),d.setFunc(b.depthFunc),d.setTest(b.depthTest),d.setMask(b.depthWrite),r.setMask(b.colorWrite);const ue=b.stencilWrite;l.setTest(ue),ue&&(l.setMask(b.stencilWriteMask),l.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),l.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),me(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?K(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function xe(b){u!==b&&(b?e.frontFace(e.CW):e.frontFace(e.CCW),u=b)}function se(b){b!==Yo?(K(e.CULL_FACE),b!==C&&(b===hr?e.cullFace(e.BACK):b===Ko?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):fe(e.CULL_FACE),C=b}function ze(b){b!==H&&(k&&e.lineWidth(b),H=b)}function me(b,J,ie){b?(K(e.POLYGON_OFFSET_FILL),(z!==J||Y!==ie)&&(e.polygonOffset(J,ie),z=J,Y=ie)):fe(e.POLYGON_OFFSET_FILL)}function Ne(b){b?K(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function ct(b){b===void 0&&(b=e.TEXTURE0+q-1),pe!==b&&(e.activeTexture(b),pe=b)}function rt(b,J,ie){ie===void 0&&(pe===null?ie=e.TEXTURE0+q-1:ie=pe);let ue=Re[ie];ue===void 0&&(ue={type:void 0,texture:void 0},Re[ie]=ue),(ue.type!==b||ue.texture!==J)&&(pe!==ie&&(e.activeTexture(ie),pe=ie),e.bindTexture(b,J||W[b]),ue.type=b,ue.texture=J)}function h(){const b=Re[pe];b!==void 0&&b.type!==void 0&&(e.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)}function s(){try{e.compressedTexImage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function U(){try{e.compressedTexImage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function V(){try{e.texSubImage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function $(){try{e.texSubImage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function G(){try{e.compressedTexSubImage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Te(){try{e.compressedTexSubImage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function te(){try{e.texStorage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Ee(){try{e.texStorage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Se(){try{e.texImage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Q(){try{e.texImage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function le(b){et.equals(b)===!1&&(e.scissor(b.x,b.y,b.z,b.w),et.copy(b))}function Pe(b){Ze.equals(b)===!1&&(e.viewport(b.x,b.y,b.z,b.w),Ze.copy(b))}function Me(b,J){let ie=S.get(J);ie===void 0&&(ie=new WeakMap,S.set(J,ie));let ue=ie.get(b);ue===void 0&&(ue=e.getUniformBlockIndex(J,b.name),ie.set(b,ue))}function ae(b,J){const ue=S.get(J).get(b);v.get(J)!==ue&&(e.uniformBlockBinding(J,ue,b.__bindingPointIndex),v.set(J,ue))}function Ie(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),d.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),A={},pe=null,Re={},M={},T=new WeakMap,x=[],I=null,y=!1,f=null,o=null,E=null,_=null,g=null,L=null,R=null,D=new Xe(0,0,0),F=0,m=!1,u=null,C=null,H=null,z=null,Y=null,et.set(0,0,e.canvas.width,e.canvas.height),Ze.set(0,0,e.canvas.width,e.canvas.height),r.reset(),d.reset(),l.reset()}return{buffers:{color:r,depth:d,stencil:l},enable:K,disable:fe,bindFramebuffer:Ce,drawBuffers:ve,useProgram:Fe,setBlending:Le,setMaterial:he,setFlipSided:xe,setCullFace:se,setLineWidth:ze,setPolygonOffset:me,setScissorTest:Ne,activeTexture:ct,bindTexture:rt,unbindTexture:h,compressedTexImage2D:s,compressedTexImage3D:U,texImage2D:Se,texImage3D:Q,updateUBOMapping:Me,uniformBlockBinding:ae,texStorage2D:te,texStorage3D:Ee,texSubImage2D:V,texSubImage3D:$,compressedTexSubImage2D:G,compressedTexSubImage3D:Te,scissor:le,viewport:Pe,reset:Ie}}function ru(e,n,t,i,a,r,d){const l=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,v=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),S=new Ke,A=new WeakMap;let M;const T=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function I(h,s){return x?new OffscreenCanvas(h,s):hs("canvas")}function y(h,s,U){let V=1;const $=rt(h);if(($.width>U||$.height>U)&&(V=U/Math.max($.width,$.height)),V<1)if(typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&h instanceof ImageBitmap||typeof VideoFrame<"u"&&h instanceof VideoFrame){const G=Math.floor(V*$.width),Te=Math.floor(V*$.height);M===void 0&&(M=I(G,Te));const te=s?I(G,Te):M;return te.width=G,te.height=Te,te.getContext("2d").drawImage(h,0,0,G,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+G+"x"+Te+")."),te}else return"data"in h&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),h;return h}function f(h){return h.generateMipmaps}function o(h){e.generateMipmap(h)}function E(h){return h.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:h.isWebGL3DRenderTarget?e.TEXTURE_3D:h.isWebGLArrayRenderTarget||h.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(h,s,U,V,$=!1){if(h!==null){if(e[h]!==void 0)return e[h];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+h+"'")}let G=s;if(s===e.RED&&(U===e.FLOAT&&(G=e.R32F),U===e.HALF_FLOAT&&(G=e.R16F),U===e.UNSIGNED_BYTE&&(G=e.R8)),s===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&(G=e.R8UI),U===e.UNSIGNED_SHORT&&(G=e.R16UI),U===e.UNSIGNED_INT&&(G=e.R32UI),U===e.BYTE&&(G=e.R8I),U===e.SHORT&&(G=e.R16I),U===e.INT&&(G=e.R32I)),s===e.RG&&(U===e.FLOAT&&(G=e.RG32F),U===e.HALF_FLOAT&&(G=e.RG16F),U===e.UNSIGNED_BYTE&&(G=e.RG8)),s===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&(G=e.RG8UI),U===e.UNSIGNED_SHORT&&(G=e.RG16UI),U===e.UNSIGNED_INT&&(G=e.RG32UI),U===e.BYTE&&(G=e.RG8I),U===e.SHORT&&(G=e.RG16I),U===e.INT&&(G=e.RG32I)),s===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&(G=e.RGB8UI),U===e.UNSIGNED_SHORT&&(G=e.RGB16UI),U===e.UNSIGNED_INT&&(G=e.RGB32UI),U===e.BYTE&&(G=e.RGB8I),U===e.SHORT&&(G=e.RGB16I),U===e.INT&&(G=e.RGB32I)),s===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&(G=e.RGBA8UI),U===e.UNSIGNED_SHORT&&(G=e.RGBA16UI),U===e.UNSIGNED_INT&&(G=e.RGBA32UI),U===e.BYTE&&(G=e.RGBA8I),U===e.SHORT&&(G=e.RGBA16I),U===e.INT&&(G=e.RGBA32I)),s===e.RGB&&(U===e.UNSIGNED_INT_5_9_9_9_REV&&(G=e.RGB9_E5),U===e.UNSIGNED_INT_10F_11F_11F_REV&&(G=e.R11F_G11F_B10F)),s===e.RGBA){const Te=$?Pa:at.getTransfer(V);U===e.FLOAT&&(G=e.RGBA32F),U===e.HALF_FLOAT&&(G=e.RGBA16F),U===e.UNSIGNED_BYTE&&(G=Te===Je?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT_4_4_4_4&&(G=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&(G=e.RGB5_A1)}return(G===e.R16F||G===e.R32F||G===e.RG16F||G===e.RG32F||G===e.RGBA16F||G===e.RGBA32F)&&n.get("EXT_color_buffer_float"),G}function g(h,s){let U;return h?s===null||s===fn||s===dn?U=e.DEPTH24_STENCIL8:s===Bt?U=e.DEPTH32F_STENCIL8:s===yn&&(U=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):s===null||s===fn||s===dn?U=e.DEPTH_COMPONENT24:s===Bt?U=e.DEPTH_COMPONENT32F:s===yn&&(U=e.DEPTH_COMPONENT16),U}function L(h,s){return f(h)===!0||h.isFramebufferTexture&&h.minFilter!==sn&&h.minFilter!==Yt?Math.log2(Math.max(s.width,s.height))+1:h.mipmaps!==void 0&&h.mipmaps.length>0?h.mipmaps.length:h.isCompressedTexture&&Array.isArray(h.image)?s.mipmaps.length:1}function R(h){const s=h.target;s.removeEventListener("dispose",R),F(s),s.isVideoTexture&&A.delete(s)}function D(h){const s=h.target;s.removeEventListener("dispose",D),u(s)}function F(h){const s=i.get(h);if(s.__webglInit===void 0)return;const U=h.source,V=T.get(U);if(V){const $=V[s.__cacheKey];$.usedTimes--,$.usedTimes===0&&m(h),Object.keys(V).length===0&&T.delete(U)}i.remove(h)}function m(h){const s=i.get(h);e.deleteTexture(s.__webglTexture);const U=h.source,V=T.get(U);delete V[s.__cacheKey],d.memory.textures--}function u(h){const s=i.get(h);if(h.depthTexture&&(h.depthTexture.dispose(),i.remove(h.depthTexture)),h.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(s.__webglFramebuffer[V]))for(let $=0;$<s.__webglFramebuffer[V].length;$++)e.deleteFramebuffer(s.__webglFramebuffer[V][$]);else e.deleteFramebuffer(s.__webglFramebuffer[V]);s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer[V])}else{if(Array.isArray(s.__webglFramebuffer))for(let V=0;V<s.__webglFramebuffer.length;V++)e.deleteFramebuffer(s.__webglFramebuffer[V]);else e.deleteFramebuffer(s.__webglFramebuffer);if(s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer),s.__webglMultisampledFramebuffer&&e.deleteFramebuffer(s.__webglMultisampledFramebuffer),s.__webglColorRenderbuffer)for(let V=0;V<s.__webglColorRenderbuffer.length;V++)s.__webglColorRenderbuffer[V]&&e.deleteRenderbuffer(s.__webglColorRenderbuffer[V]);s.__webglDepthRenderbuffer&&e.deleteRenderbuffer(s.__webglDepthRenderbuffer)}const U=h.textures;for(let V=0,$=U.length;V<$;V++){const G=i.get(U[V]);G.__webglTexture&&(e.deleteTexture(G.__webglTexture),d.memory.textures--),i.remove(U[V])}i.remove(h)}let C=0;function H(){C=0}function z(){const h=C;return h>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+h+" texture units while this GPU supports only "+a.maxTextures),C+=1,h}function Y(h){const s=[];return s.push(h.wrapS),s.push(h.wrapT),s.push(h.wrapR||0),s.push(h.magFilter),s.push(h.minFilter),s.push(h.anisotropy),s.push(h.internalFormat),s.push(h.format),s.push(h.type),s.push(h.generateMipmaps),s.push(h.premultiplyAlpha),s.push(h.flipY),s.push(h.unpackAlignment),s.push(h.colorSpace),s.join()}function q(h,s){const U=i.get(h);if(h.isVideoTexture&&Ne(h),h.isRenderTargetTexture===!1&&h.isExternalTexture!==!0&&h.version>0&&U.__version!==h.version){const V=h.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(U,h,s);return}}else h.isExternalTexture&&(U.__webglTexture=h.sourceTexture?h.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+s)}function k(h,s){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){W(U,h,s);return}t.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+s)}function ne(h,s){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){W(U,h,s);return}t.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+s)}function B(h,s){const U=i.get(h);if(h.version>0&&U.__version!==h.version){K(U,h,s);return}t.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+s)}const pe={[bo]:e.REPEAT,[Ro]:e.CLAMP_TO_EDGE,[Ao]:e.MIRRORED_REPEAT},Re={[sn]:e.NEAREST,[wo]:e.NEAREST_MIPMAP_NEAREST,[gn]:e.NEAREST_MIPMAP_LINEAR,[Yt]:e.LINEAR,[zn]:e.LINEAR_MIPMAP_NEAREST,[rn]:e.LINEAR_MIPMAP_LINEAR},ye={[Io]:e.NEVER,[Uo]:e.ALWAYS,[yo]:e.LESS,[va]:e.LEQUAL,[Lo]:e.EQUAL,[Do]:e.GEQUAL,[Po]:e.GREATER,[Co]:e.NOTEQUAL};function He(h,s){if(s.type===Bt&&n.has("OES_texture_float_linear")===!1&&(s.magFilter===Yt||s.magFilter===zn||s.magFilter===gn||s.magFilter===rn||s.minFilter===Yt||s.minFilter===zn||s.minFilter===gn||s.minFilter===rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(h,e.TEXTURE_WRAP_S,pe[s.wrapS]),e.texParameteri(h,e.TEXTURE_WRAP_T,pe[s.wrapT]),(h===e.TEXTURE_3D||h===e.TEXTURE_2D_ARRAY)&&e.texParameteri(h,e.TEXTURE_WRAP_R,pe[s.wrapR]),e.texParameteri(h,e.TEXTURE_MAG_FILTER,Re[s.magFilter]),e.texParameteri(h,e.TEXTURE_MIN_FILTER,Re[s.minFilter]),s.compareFunction&&(e.texParameteri(h,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(h,e.TEXTURE_COMPARE_FUNC,ye[s.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(s.magFilter===sn||s.minFilter!==gn&&s.minFilter!==rn||s.type===Bt&&n.has("OES_texture_float_linear")===!1)return;if(s.anisotropy>1||i.get(s).__currentAnisotropy){const U=n.get("EXT_texture_filter_anisotropic");e.texParameterf(h,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(s.anisotropy,a.getMaxAnisotropy())),i.get(s).__currentAnisotropy=s.anisotropy}}}function et(h,s){let U=!1;h.__webglInit===void 0&&(h.__webglInit=!0,s.addEventListener("dispose",R));const V=s.source;let $=T.get(V);$===void 0&&($={},T.set(V,$));const G=Y(s);if(G!==h.__cacheKey){$[G]===void 0&&($[G]={texture:e.createTexture(),usedTimes:0},d.memory.textures++,U=!0),$[G].usedTimes++;const Te=$[h.__cacheKey];Te!==void 0&&($[h.__cacheKey].usedTimes--,Te.usedTimes===0&&m(s)),h.__cacheKey=G,h.__webglTexture=$[G].texture}return U}function Ze(h,s,U){return Math.floor(Math.floor(h/U)/s)}function ke(h,s,U,V){const G=h.updateRanges;if(G.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,s.width,s.height,U,V,s.data);else{G.sort((Q,le)=>Q.start-le.start);let Te=0;for(let Q=1;Q<G.length;Q++){const le=G[Te],Pe=G[Q],Me=le.start+le.count,ae=Ze(Pe.start,s.width,4),Ie=Ze(le.start,s.width,4);Pe.start<=Me+1&&ae===Ie&&Ze(Pe.start+Pe.count-1,s.width,4)===ae?le.count=Math.max(le.count,Pe.start+Pe.count-le.start):(++Te,G[Te]=Pe)}G.length=Te+1;const te=e.getParameter(e.UNPACK_ROW_LENGTH),Ee=e.getParameter(e.UNPACK_SKIP_PIXELS),Se=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,s.width);for(let Q=0,le=G.length;Q<le;Q++){const Pe=G[Q],Me=Math.floor(Pe.start/4),ae=Math.ceil(Pe.count/4),Ie=Me%s.width,b=Math.floor(Me/s.width),J=ae,ie=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ie),e.pixelStorei(e.UNPACK_SKIP_ROWS,b),t.texSubImage2D(e.TEXTURE_2D,0,Ie,b,J,ie,U,V,s.data)}h.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,te),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ee),e.pixelStorei(e.UNPACK_SKIP_ROWS,Se)}}function W(h,s,U){let V=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(V=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(V=e.TEXTURE_3D);const $=et(h,s),G=s.source;t.bindTexture(V,h.__webglTexture,e.TEXTURE0+U);const Te=i.get(G);if(G.version!==Te.__version||$===!0){t.activeTexture(e.TEXTURE0+U);const te=at.getPrimaries(at.workingColorSpace),Ee=s.colorSpace===Xt?null:at.getPrimaries(s.colorSpace),Se=s.colorSpace===Xt||te===Ee?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let Q=y(s.image,!1,a.maxTextureSize);Q=ct(s,Q);const le=r.convert(s.format,s.colorSpace),Pe=r.convert(s.type);let Me=_(s.internalFormat,le,Pe,s.colorSpace,s.isVideoTexture);He(V,s);let ae;const Ie=s.mipmaps,b=s.isVideoTexture!==!0,J=Te.__version===void 0||$===!0,ie=G.dataReady,ue=L(s,Q);if(s.isDepthTexture)Me=g(s.format===Dn,s.type),J&&(b?t.texStorage2D(e.TEXTURE_2D,1,Me,Q.width,Q.height):t.texImage2D(e.TEXTURE_2D,0,Me,Q.width,Q.height,0,le,Pe,null));else if(s.isDataTexture)if(Ie.length>0){b&&J&&t.texStorage2D(e.TEXTURE_2D,ue,Me,Ie[0].width,Ie[0].height);for(let Z=0,X=Ie.length;Z<X;Z++)ae=Ie[Z],b?ie&&t.texSubImage2D(e.TEXTURE_2D,Z,0,0,ae.width,ae.height,le,Pe,ae.data):t.texImage2D(e.TEXTURE_2D,Z,Me,ae.width,ae.height,0,le,Pe,ae.data);s.generateMipmaps=!1}else b?(J&&t.texStorage2D(e.TEXTURE_2D,ue,Me,Q.width,Q.height),ie&&ke(s,Q,le,Pe)):t.texImage2D(e.TEXTURE_2D,0,Me,Q.width,Q.height,0,le,Pe,Q.data);else if(s.isCompressedTexture)if(s.isCompressedArrayTexture){b&&J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Me,Ie[0].width,Ie[0].height,Q.depth);for(let Z=0,X=Ie.length;Z<X;Z++)if(ae=Ie[Z],s.format!==Ct)if(le!==null)if(b){if(ie)if(s.layerUpdates.size>0){const ge=Er(ae.width,ae.height,s.format,s.type);for(const Ue of s.layerUpdates){const je=ae.data.subarray(Ue*ge/ae.data.BYTES_PER_ELEMENT,(Ue+1)*ge/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,Ue,ae.width,ae.height,1,le,je)}s.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,0,ae.width,ae.height,Q.depth,le,ae.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,Z,Me,ae.width,ae.height,Q.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else b?ie&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,0,ae.width,ae.height,Q.depth,le,Pe,ae.data):t.texImage3D(e.TEXTURE_2D_ARRAY,Z,Me,ae.width,ae.height,Q.depth,0,le,Pe,ae.data)}else{b&&J&&t.texStorage2D(e.TEXTURE_2D,ue,Me,Ie[0].width,Ie[0].height);for(let Z=0,X=Ie.length;Z<X;Z++)ae=Ie[Z],s.format!==Ct?le!==null?b?ie&&t.compressedTexSubImage2D(e.TEXTURE_2D,Z,0,0,ae.width,ae.height,le,ae.data):t.compressedTexImage2D(e.TEXTURE_2D,Z,Me,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):b?ie&&t.texSubImage2D(e.TEXTURE_2D,Z,0,0,ae.width,ae.height,le,Pe,ae.data):t.texImage2D(e.TEXTURE_2D,Z,Me,ae.width,ae.height,0,le,Pe,ae.data)}else if(s.isDataArrayTexture)if(b){if(J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Me,Q.width,Q.height,Q.depth),ie)if(s.layerUpdates.size>0){const Z=Er(Q.width,Q.height,s.format,s.type);for(const X of s.layerUpdates){const ge=Q.data.subarray(X*Z/Q.data.BYTES_PER_ELEMENT,(X+1)*Z/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,X,Q.width,Q.height,1,le,Pe,ge)}s.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,le,Pe,Q.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,Me,Q.width,Q.height,Q.depth,0,le,Pe,Q.data);else if(s.isData3DTexture)b?(J&&t.texStorage3D(e.TEXTURE_3D,ue,Me,Q.width,Q.height,Q.depth),ie&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,le,Pe,Q.data)):t.texImage3D(e.TEXTURE_3D,0,Me,Q.width,Q.height,Q.depth,0,le,Pe,Q.data);else if(s.isFramebufferTexture){if(J)if(b)t.texStorage2D(e.TEXTURE_2D,ue,Me,Q.width,Q.height);else{let Z=Q.width,X=Q.height;for(let ge=0;ge<ue;ge++)t.texImage2D(e.TEXTURE_2D,ge,Me,Z,X,0,le,Pe,null),Z>>=1,X>>=1}}else if(Ie.length>0){if(b&&J){const Z=rt(Ie[0]);t.texStorage2D(e.TEXTURE_2D,ue,Me,Z.width,Z.height)}for(let Z=0,X=Ie.length;Z<X;Z++)ae=Ie[Z],b?ie&&t.texSubImage2D(e.TEXTURE_2D,Z,0,0,le,Pe,ae):t.texImage2D(e.TEXTURE_2D,Z,Me,le,Pe,ae);s.generateMipmaps=!1}else if(b){if(J){const Z=rt(Q);t.texStorage2D(e.TEXTURE_2D,ue,Me,Z.width,Z.height)}ie&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,le,Pe,Q)}else t.texImage2D(e.TEXTURE_2D,0,Me,le,Pe,Q);f(s)&&o(V),Te.__version=G.version,s.onUpdate&&s.onUpdate(s)}h.__version=s.version}function K(h,s,U){if(s.image.length!==6)return;const V=et(h,s),$=s.source;t.bindTexture(e.TEXTURE_CUBE_MAP,h.__webglTexture,e.TEXTURE0+U);const G=i.get($);if($.version!==G.__version||V===!0){t.activeTexture(e.TEXTURE0+U);const Te=at.getPrimaries(at.workingColorSpace),te=s.colorSpace===Xt?null:at.getPrimaries(s.colorSpace),Ee=s.colorSpace===Xt||Te===te?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Se=s.isCompressedTexture||s.image[0].isCompressedTexture,Q=s.image[0]&&s.image[0].isDataTexture,le=[];for(let X=0;X<6;X++)!Se&&!Q?le[X]=y(s.image[X],!0,a.maxCubemapSize):le[X]=Q?s.image[X].image:s.image[X],le[X]=ct(s,le[X]);const Pe=le[0],Me=r.convert(s.format,s.colorSpace),ae=r.convert(s.type),Ie=_(s.internalFormat,Me,ae,s.colorSpace),b=s.isVideoTexture!==!0,J=G.__version===void 0||V===!0,ie=$.dataReady;let ue=L(s,Pe);He(e.TEXTURE_CUBE_MAP,s);let Z;if(Se){b&&J&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,Ie,Pe.width,Pe.height);for(let X=0;X<6;X++){Z=le[X].mipmaps;for(let ge=0;ge<Z.length;ge++){const Ue=Z[ge];s.format!==Ct?Me!==null?b?ie&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ge,0,0,Ue.width,Ue.height,Me,Ue.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ge,Ie,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):b?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ge,0,0,Ue.width,Ue.height,Me,ae,Ue.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ge,Ie,Ue.width,Ue.height,0,Me,ae,Ue.data)}}}else{if(Z=s.mipmaps,b&&J){Z.length>0&&ue++;const X=rt(le[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,Ie,X.width,X.height)}for(let X=0;X<6;X++)if(Q){b?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,le[X].width,le[X].height,Me,ae,le[X].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ie,le[X].width,le[X].height,0,Me,ae,le[X].data);for(let ge=0;ge<Z.length;ge++){const je=Z[ge].image[X].image;b?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ge+1,0,0,je.width,je.height,Me,ae,je.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ge+1,Ie,je.width,je.height,0,Me,ae,je.data)}}else{b?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Me,ae,le[X]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ie,Me,ae,le[X]);for(let ge=0;ge<Z.length;ge++){const Ue=Z[ge];b?ie&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ge+1,0,0,Me,ae,Ue.image[X]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,ge+1,Ie,Me,ae,Ue.image[X])}}}f(s)&&o(e.TEXTURE_CUBE_MAP),G.__version=$.version,s.onUpdate&&s.onUpdate(s)}h.__version=s.version}function fe(h,s,U,V,$,G){const Te=r.convert(U.format,U.colorSpace),te=r.convert(U.type),Ee=_(U.internalFormat,Te,te,U.colorSpace),Se=i.get(s),Q=i.get(U);if(Q.__renderTarget=s,!Se.__hasExternalTextures){const le=Math.max(1,s.width>>G),Pe=Math.max(1,s.height>>G);$===e.TEXTURE_3D||$===e.TEXTURE_2D_ARRAY?t.texImage3D($,G,Ee,le,Pe,s.depth,0,Te,te,null):t.texImage2D($,G,Ee,le,Pe,0,Te,te,null)}t.bindFramebuffer(e.FRAMEBUFFER,h),me(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,V,$,Q.__webglTexture,0,ze(s)):($===e.TEXTURE_2D||$>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,V,$,Q.__webglTexture,G),t.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(h,s,U){if(e.bindRenderbuffer(e.RENDERBUFFER,h),s.depthBuffer){const V=s.depthTexture,$=V&&V.isDepthTexture?V.type:null,G=g(s.stencilBuffer,$),Te=s.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,te=ze(s);me(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,te,G,s.width,s.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,te,G,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,G,s.width,s.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Te,e.RENDERBUFFER,h)}else{const V=s.textures;for(let $=0;$<V.length;$++){const G=V[$],Te=r.convert(G.format,G.colorSpace),te=r.convert(G.type),Ee=_(G.internalFormat,Te,te,G.colorSpace),Se=ze(s);U&&me(s)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Se,Ee,s.width,s.height):me(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Se,Ee,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,Ee,s.width,s.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ve(h,s){if(s&&s.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,h),!(s.depthTexture&&s.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const V=i.get(s.depthTexture);V.__renderTarget=s,(!V.__webglTexture||s.depthTexture.image.width!==s.width||s.depthTexture.image.height!==s.height)&&(s.depthTexture.image.width=s.width,s.depthTexture.image.height=s.height,s.depthTexture.needsUpdate=!0),q(s.depthTexture,0);const $=V.__webglTexture,G=ze(s);if(s.depthTexture.format===Ri)me(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,$,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,$,0);else if(s.depthTexture.format===Dn)me(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,$,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Fe(h){const s=i.get(h),U=h.isWebGLCubeRenderTarget===!0;if(s.__boundDepthTexture!==h.depthTexture){const V=h.depthTexture;if(s.__depthDisposeCallback&&s.__depthDisposeCallback(),V){const $=()=>{delete s.__boundDepthTexture,delete s.__depthDisposeCallback,V.removeEventListener("dispose",$)};V.addEventListener("dispose",$),s.__depthDisposeCallback=$}s.__boundDepthTexture=V}if(h.depthTexture&&!s.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const V=h.texture.mipmaps;V&&V.length>0?ve(s.__webglFramebuffer[0],h):ve(s.__webglFramebuffer,h)}else if(U){s.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[V]),s.__webglDepthbuffer[V]===void 0)s.__webglDepthbuffer[V]=e.createRenderbuffer(),Ce(s.__webglDepthbuffer[V],h,!1);else{const $=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=s.__webglDepthbuffer[V];e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,G)}}else{const V=h.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),s.__webglDepthbuffer===void 0)s.__webglDepthbuffer=e.createRenderbuffer(),Ce(s.__webglDepthbuffer,h,!1);else{const $=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=s.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,G)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function ee(h,s,U){const V=i.get(h);s!==void 0&&fe(V.__webglFramebuffer,h,h.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&Fe(h)}function p(h){const s=h.texture,U=i.get(h),V=i.get(s);h.addEventListener("dispose",D);const $=h.textures,G=h.isWebGLCubeRenderTarget===!0,Te=$.length>1;if(Te||(V.__webglTexture===void 0&&(V.__webglTexture=e.createTexture()),V.__version=s.version,d.memory.textures++),G){U.__webglFramebuffer=[];for(let te=0;te<6;te++)if(s.mipmaps&&s.mipmaps.length>0){U.__webglFramebuffer[te]=[];for(let Ee=0;Ee<s.mipmaps.length;Ee++)U.__webglFramebuffer[te][Ee]=e.createFramebuffer()}else U.__webglFramebuffer[te]=e.createFramebuffer()}else{if(s.mipmaps&&s.mipmaps.length>0){U.__webglFramebuffer=[];for(let te=0;te<s.mipmaps.length;te++)U.__webglFramebuffer[te]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(Te)for(let te=0,Ee=$.length;te<Ee;te++){const Se=i.get($[te]);Se.__webglTexture===void 0&&(Se.__webglTexture=e.createTexture(),d.memory.textures++)}if(h.samples>0&&me(h)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let te=0;te<$.length;te++){const Ee=$[te];U.__webglColorRenderbuffer[te]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[te]);const Se=r.convert(Ee.format,Ee.colorSpace),Q=r.convert(Ee.type),le=_(Ee.internalFormat,Se,Q,Ee.colorSpace,h.isXRRenderTarget===!0),Pe=ze(h);e.renderbufferStorageMultisample(e.RENDERBUFFER,Pe,le,h.width,h.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+te,e.RENDERBUFFER,U.__webglColorRenderbuffer[te])}e.bindRenderbuffer(e.RENDERBUFFER,null),h.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),Ce(U.__webglDepthRenderbuffer,h,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(G){t.bindTexture(e.TEXTURE_CUBE_MAP,V.__webglTexture),He(e.TEXTURE_CUBE_MAP,s);for(let te=0;te<6;te++)if(s.mipmaps&&s.mipmaps.length>0)for(let Ee=0;Ee<s.mipmaps.length;Ee++)fe(U.__webglFramebuffer[te][Ee],h,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ee);else fe(U.__webglFramebuffer[te],h,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);f(s)&&o(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let te=0,Ee=$.length;te<Ee;te++){const Se=$[te],Q=i.get(Se);let le=e.TEXTURE_2D;(h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(le=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(le,Q.__webglTexture),He(le,Se),fe(U.__webglFramebuffer,h,Se,e.COLOR_ATTACHMENT0+te,le,0),f(Se)&&o(le)}t.unbindTexture()}else{let te=e.TEXTURE_2D;if((h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(te=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(te,V.__webglTexture),He(te,s),s.mipmaps&&s.mipmaps.length>0)for(let Ee=0;Ee<s.mipmaps.length;Ee++)fe(U.__webglFramebuffer[Ee],h,s,e.COLOR_ATTACHMENT0,te,Ee);else fe(U.__webglFramebuffer,h,s,e.COLOR_ATTACHMENT0,te,0);f(s)&&o(te),t.unbindTexture()}h.depthBuffer&&Fe(h)}function Le(h){const s=h.textures;for(let U=0,V=s.length;U<V;U++){const $=s[U];if(f($)){const G=E(h),Te=i.get($).__webglTexture;t.bindTexture(G,Te),o(G),t.unbindTexture()}}}const he=[],xe=[];function se(h){if(h.samples>0){if(me(h)===!1){const s=h.textures,U=h.width,V=h.height;let $=e.COLOR_BUFFER_BIT;const G=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Te=i.get(h),te=s.length>1;if(te)for(let Se=0;Se<s.length;Se++)t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Se,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Se,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const Ee=h.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Se=0;Se<s.length;Se++){if(h.resolveDepthBuffer&&(h.depthBuffer&&($|=e.DEPTH_BUFFER_BIT),h.stencilBuffer&&h.resolveStencilBuffer&&($|=e.STENCIL_BUFFER_BIT)),te){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Te.__webglColorRenderbuffer[Se]);const Q=i.get(s[Se]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Q,0)}e.blitFramebuffer(0,0,U,V,0,0,U,V,$,e.NEAREST),v===!0&&(he.length=0,xe.length=0,he.push(e.COLOR_ATTACHMENT0+Se),h.depthBuffer&&h.resolveDepthBuffer===!1&&(he.push(G),xe.push(G),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,xe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,he))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),te)for(let Se=0;Se<s.length;Se++){t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Se,e.RENDERBUFFER,Te.__webglColorRenderbuffer[Se]);const Q=i.get(s[Se]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Se,e.TEXTURE_2D,Q,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(h.depthBuffer&&h.resolveDepthBuffer===!1&&v){const s=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[s])}}}function ze(h){return Math.min(a.maxSamples,h.samples)}function me(h){const s=i.get(h);return h.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&s.__useRenderToTexture!==!1}function Ne(h){const s=d.render.frame;A.get(h)!==s&&(A.set(h,s),h.update())}function ct(h,s){const U=h.colorSpace,V=h.format,$=h.type;return h.isCompressedTexture===!0||h.isVideoTexture===!0||U!==Fn&&U!==Xt&&(at.getTransfer(U)===Je?(V!==Ct||$!==Vt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),s}function rt(h){return typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement?(S.width=h.naturalWidth||h.width,S.height=h.naturalHeight||h.height):typeof VideoFrame<"u"&&h instanceof VideoFrame?(S.width=h.displayWidth,S.height=h.displayHeight):(S.width=h.width,S.height=h.height),S}this.allocateTextureUnit=z,this.resetTextureUnits=H,this.setTexture2D=q,this.setTexture2DArray=k,this.setTexture3D=ne,this.setTextureCube=B,this.rebindTextures=ee,this.setupRenderTarget=p,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=se,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=me}function au(e,n){function t(i,a=Xt){let r;const d=at.getTransfer(a);if(i===Vt)return e.UNSIGNED_BYTE;if(i===Sa)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Ma)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Bo)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Ho)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Go)return e.BYTE;if(i===Vo)return e.SHORT;if(i===yn)return e.UNSIGNED_SHORT;if(i===xa)return e.INT;if(i===fn)return e.UNSIGNED_INT;if(i===Bt)return e.FLOAT;if(i===On)return e.HALF_FLOAT;if(i===ko)return e.ALPHA;if(i===Wo)return e.RGB;if(i===Ct)return e.RGBA;if(i===Ri)return e.DEPTH_COMPONENT;if(i===Dn)return e.DEPTH_STENCIL;if(i===zo)return e.RED;if(i===Aa)return e.RED_INTEGER;if(i===Xo)return e.RG;if(i===Ra)return e.RG_INTEGER;if(i===ba)return e.RGBA_INTEGER;if(i===Xn||i===Yn||i===Kn||i===qn)if(d===Je)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Xn)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Yn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Kn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===qn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Xn)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Yn)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Kn)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===qn)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Gi||i===Vi||i===ki||i===Wi)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Gi)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Vi)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ki)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wi)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===zi||i===Xi||i===Yi)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===zi||i===Xi)return d===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Yi)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ki||i===qi||i===$i||i===Zi||i===ji||i===Qi||i===Ji||i===er||i===tr||i===nr||i===ir||i===rr||i===ar||i===or)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ki)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===qi)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$i)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Zi)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ji)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qi)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ji)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===er)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===tr)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nr)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ir)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===rr)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ar)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===or)return d===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sr||i===lr||i===cr)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===sr)return d===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===lr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===cr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===dr||i===fr||i===ur||i===pr)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===dr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===fr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ur)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===pr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===dn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const ou=`
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

}`;class lu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new Ta(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Lt({vertexShader:ou,fragmentShader:su,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new hn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cu extends io{constructor(n,t){super();const i=this;let a=null,r=1,d=null,l="local-floor",v=1,S=null,A=null,M=null,T=null,x=null,I=null;const y=typeof XRWebGLBinding<"u",f=new lu,o={},E=t.getContextAttributes();let _=null,g=null;const L=[],R=[],D=new Ke;let F=null;const m=new $t;m.viewport=new dt;const u=new $t;u.viewport=new dt;const C=[m,u],H=new ro;let z=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let K=L[W];return K===void 0&&(K=new Wn,L[W]=K),K.getTargetRaySpace()},this.getControllerGrip=function(W){let K=L[W];return K===void 0&&(K=new Wn,L[W]=K),K.getGripSpace()},this.getHand=function(W){let K=L[W];return K===void 0&&(K=new Wn,L[W]=K),K.getHandSpace()};function q(W){const K=R.indexOf(W.inputSource);if(K===-1)return;const fe=L[K];fe!==void 0&&(fe.update(W.inputSource,W.frame,S||d),fe.dispatchEvent({type:W.type,data:W.inputSource}))}function k(){a.removeEventListener("select",q),a.removeEventListener("selectstart",q),a.removeEventListener("selectend",q),a.removeEventListener("squeeze",q),a.removeEventListener("squeezestart",q),a.removeEventListener("squeezeend",q),a.removeEventListener("end",k),a.removeEventListener("inputsourceschange",ne);for(let W=0;W<L.length;W++){const K=R[W];K!==null&&(R[W]=null,L[W].disconnect(K))}z=null,Y=null,f.reset();for(const W in o)delete o[W];n.setRenderTarget(_),x=null,T=null,M=null,a=null,g=null,ke.stop(),i.isPresenting=!1,n.setPixelRatio(F),n.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){l=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return S||d},this.setReferenceSpace=function(W){S=W},this.getBaseLayer=function(){return T!==null?T:x},this.getBinding=function(){return M===null&&y&&(M=new XRWebGLBinding(a,t)),M},this.getFrame=function(){return I},this.getSession=function(){return a},this.setSession=async function(W){if(a=W,a!==null){if(_=n.getRenderTarget(),a.addEventListener("select",q),a.addEventListener("selectstart",q),a.addEventListener("selectend",q),a.addEventListener("squeeze",q),a.addEventListener("squeezestart",q),a.addEventListener("squeezeend",q),a.addEventListener("end",k),a.addEventListener("inputsourceschange",ne),E.xrCompatible!==!0&&await t.makeXRCompatible(),F=n.getPixelRatio(),n.getSize(D),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Ce=null,ve=null;E.depth&&(ve=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=E.stencil?Dn:Ri,Ce=E.stencil?dn:fn);const Fe={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};M=this.getBinding(),T=M.createProjectionLayer(Fe),a.updateRenderState({layers:[T]}),n.setPixelRatio(1),n.setSize(T.textureWidth,T.textureHeight,!1),g=new jt(T.textureWidth,T.textureHeight,{format:Ct,type:Vt,depthTexture:new ga(T.textureWidth,T.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:E.stencil,colorSpace:n.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:T.ignoreDepthValues===!1,resolveStencilBuffer:T.ignoreDepthValues===!1})}else{const fe={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};x=new XRWebGLLayer(a,t,fe),a.updateRenderState({baseLayer:x}),n.setPixelRatio(1),n.setSize(x.framebufferWidth,x.framebufferHeight,!1),g=new jt(x.framebufferWidth,x.framebufferHeight,{format:Ct,type:Vt,colorSpace:n.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(v),S=null,d=await a.requestReferenceSpace(l),ke.setContext(a),ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function ne(W){for(let K=0;K<W.removed.length;K++){const fe=W.removed[K],Ce=R.indexOf(fe);Ce>=0&&(R[Ce]=null,L[Ce].disconnect(fe))}for(let K=0;K<W.added.length;K++){const fe=W.added[K];let Ce=R.indexOf(fe);if(Ce===-1){for(let Fe=0;Fe<L.length;Fe++)if(Fe>=R.length){R.push(fe),Ce=Fe;break}else if(R[Fe]===null){R[Fe]=fe,Ce=Fe;break}if(Ce===-1)break}const ve=L[Ce];ve&&ve.connect(fe)}}const B=new ce,pe=new ce;function Re(W,K,fe){B.setFromMatrixPosition(K.matrixWorld),pe.setFromMatrixPosition(fe.matrixWorld);const Ce=B.distanceTo(pe),ve=K.projectionMatrix.elements,Fe=fe.projectionMatrix.elements,ee=ve[14]/(ve[10]-1),p=ve[14]/(ve[10]+1),Le=(ve[9]+1)/ve[5],he=(ve[9]-1)/ve[5],xe=(ve[8]-1)/ve[0],se=(Fe[8]+1)/Fe[0],ze=ee*xe,me=ee*se,Ne=Ce/(-xe+se),ct=Ne*-xe;if(K.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ct),W.translateZ(Ne),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),ve[10]===-1)W.projectionMatrix.copy(K.projectionMatrix),W.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const rt=ee+Ne,h=p+Ne,s=ze-ct,U=me+(Ce-ct),V=Le*p/h*rt,$=he*p/h*rt;W.projectionMatrix.makePerspective(s,U,V,$,rt,h),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ye(W,K){K===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(K.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(a===null)return;let K=W.near,fe=W.far;f.texture!==null&&(f.depthNear>0&&(K=f.depthNear),f.depthFar>0&&(fe=f.depthFar)),H.near=u.near=m.near=K,H.far=u.far=m.far=fe,(z!==H.near||Y!==H.far)&&(a.updateRenderState({depthNear:H.near,depthFar:H.far}),z=H.near,Y=H.far),H.layers.mask=W.layers.mask|6,m.layers.mask=H.layers.mask&3,u.layers.mask=H.layers.mask&5;const Ce=W.parent,ve=H.cameras;ye(H,Ce);for(let Fe=0;Fe<ve.length;Fe++)ye(ve[Fe],Ce);ve.length===2?Re(H,m,u):H.projectionMatrix.copy(m.projectionMatrix),He(W,H,Ce)};function He(W,K,fe){fe===null?W.matrix.copy(K.matrixWorld):(W.matrix.copy(fe.matrixWorld),W.matrix.invert(),W.matrix.multiply(K.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(K.projectionMatrix),W.projectionMatrixInverse.copy(K.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=ao*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(T===null&&x===null))return v},this.setFoveation=function(W){v=W,T!==null&&(T.fixedFoveation=W),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=W)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(H)},this.getCameraTexture=function(W){return o[W]};let et=null;function Ze(W,K){if(A=K.getViewerPose(S||d),I=K,A!==null){const fe=A.views;x!==null&&(n.setRenderTargetFramebuffer(g,x.framebuffer),n.setRenderTarget(g));let Ce=!1;fe.length!==H.cameras.length&&(H.cameras.length=0,Ce=!0);for(let p=0;p<fe.length;p++){const Le=fe[p];let he=null;if(x!==null)he=x.getViewport(Le);else{const se=M.getViewSubImage(T,Le);he=se.viewport,p===0&&(n.setRenderTargetTextures(g,se.colorTexture,se.depthStencilTexture),n.setRenderTarget(g))}let xe=C[p];xe===void 0&&(xe=new $t,xe.layers.enable(p),xe.viewport=new dt,C[p]=xe),xe.matrix.fromArray(Le.transform.matrix),xe.matrix.decompose(xe.position,xe.quaternion,xe.scale),xe.projectionMatrix.fromArray(Le.projectionMatrix),xe.projectionMatrixInverse.copy(xe.projectionMatrix).invert(),xe.viewport.set(he.x,he.y,he.width,he.height),p===0&&(H.matrix.copy(xe.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Ce===!0&&H.cameras.push(xe)}const ve=a.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&y){M=i.getBinding();const p=M.getDepthInformation(fe[0]);p&&p.isValid&&p.texture&&f.init(p,a.renderState)}if(ve&&ve.includes("camera-access")&&y){n.state.unbindTexture(),M=i.getBinding();for(let p=0;p<fe.length;p++){const Le=fe[p].camera;if(Le){let he=o[Le];he||(he=new Ta,o[Le]=he);const xe=M.getCameraImage(Le);he.sourceTexture=xe}}}}for(let fe=0;fe<L.length;fe++){const Ce=R[fe],ve=L[fe];Ce!==null&&ve!==void 0&&ve.update(Ce,K,S||d)}et&&et(W,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),I=null}const ke=new Na;ke.setAnimationLoop(Ze),this.setAnimationLoop=function(W){et=W},this.dispose=function(){}}}const Nt=new Un,du=new Mt;function fu(e,n){function t(f,o){f.matrixAutoUpdate===!0&&f.updateMatrix(),o.value.copy(f.matrix)}function i(f,o){o.color.getRGB(f.fogColor.value,Ca(e)),o.isFog?(f.fogNear.value=o.near,f.fogFar.value=o.far):o.isFogExp2&&(f.fogDensity.value=o.density)}function a(f,o,E,_,g){o.isMeshBasicMaterial||o.isMeshLambertMaterial?r(f,o):o.isMeshToonMaterial?(r(f,o),M(f,o)):o.isMeshPhongMaterial?(r(f,o),A(f,o)):o.isMeshStandardMaterial?(r(f,o),T(f,o),o.isMeshPhysicalMaterial&&x(f,o,g)):o.isMeshMatcapMaterial?(r(f,o),I(f,o)):o.isMeshDepthMaterial?r(f,o):o.isMeshDistanceMaterial?(r(f,o),y(f,o)):o.isMeshNormalMaterial?r(f,o):o.isLineBasicMaterial?(d(f,o),o.isLineDashedMaterial&&l(f,o)):o.isPointsMaterial?v(f,o,E,_):o.isSpriteMaterial?S(f,o):o.isShadowMaterial?(f.color.value.copy(o.color),f.opacity.value=o.opacity):o.isShaderMaterial&&(o.uniformsNeedUpdate=!1)}function r(f,o){f.opacity.value=o.opacity,o.color&&f.diffuse.value.copy(o.color),o.emissive&&f.emissive.value.copy(o.emissive).multiplyScalar(o.emissiveIntensity),o.map&&(f.map.value=o.map,t(o.map,f.mapTransform)),o.alphaMap&&(f.alphaMap.value=o.alphaMap,t(o.alphaMap,f.alphaMapTransform)),o.bumpMap&&(f.bumpMap.value=o.bumpMap,t(o.bumpMap,f.bumpMapTransform),f.bumpScale.value=o.bumpScale,o.side===Tt&&(f.bumpScale.value*=-1)),o.normalMap&&(f.normalMap.value=o.normalMap,t(o.normalMap,f.normalMapTransform),f.normalScale.value.copy(o.normalScale),o.side===Tt&&f.normalScale.value.negate()),o.displacementMap&&(f.displacementMap.value=o.displacementMap,t(o.displacementMap,f.displacementMapTransform),f.displacementScale.value=o.displacementScale,f.displacementBias.value=o.displacementBias),o.emissiveMap&&(f.emissiveMap.value=o.emissiveMap,t(o.emissiveMap,f.emissiveMapTransform)),o.specularMap&&(f.specularMap.value=o.specularMap,t(o.specularMap,f.specularMapTransform)),o.alphaTest>0&&(f.alphaTest.value=o.alphaTest);const E=n.get(o),_=E.envMap,g=E.envMapRotation;_&&(f.envMap.value=_,Nt.copy(g),Nt.x*=-1,Nt.y*=-1,Nt.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Nt.y*=-1,Nt.z*=-1),f.envMapRotation.value.setFromMatrix4(du.makeRotationFromEuler(Nt)),f.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=o.reflectivity,f.ior.value=o.ior,f.refractionRatio.value=o.refractionRatio),o.lightMap&&(f.lightMap.value=o.lightMap,f.lightMapIntensity.value=o.lightMapIntensity,t(o.lightMap,f.lightMapTransform)),o.aoMap&&(f.aoMap.value=o.aoMap,f.aoMapIntensity.value=o.aoMapIntensity,t(o.aoMap,f.aoMapTransform))}function d(f,o){f.diffuse.value.copy(o.color),f.opacity.value=o.opacity,o.map&&(f.map.value=o.map,t(o.map,f.mapTransform))}function l(f,o){f.dashSize.value=o.dashSize,f.totalSize.value=o.dashSize+o.gapSize,f.scale.value=o.scale}function v(f,o,E,_){f.diffuse.value.copy(o.color),f.opacity.value=o.opacity,f.size.value=o.size*E,f.scale.value=_*.5,o.map&&(f.map.value=o.map,t(o.map,f.uvTransform)),o.alphaMap&&(f.alphaMap.value=o.alphaMap,t(o.alphaMap,f.alphaMapTransform)),o.alphaTest>0&&(f.alphaTest.value=o.alphaTest)}function S(f,o){f.diffuse.value.copy(o.color),f.opacity.value=o.opacity,f.rotation.value=o.rotation,o.map&&(f.map.value=o.map,t(o.map,f.mapTransform)),o.alphaMap&&(f.alphaMap.value=o.alphaMap,t(o.alphaMap,f.alphaMapTransform)),o.alphaTest>0&&(f.alphaTest.value=o.alphaTest)}function A(f,o){f.specular.value.copy(o.specular),f.shininess.value=Math.max(o.shininess,1e-4)}function M(f,o){o.gradientMap&&(f.gradientMap.value=o.gradientMap)}function T(f,o){f.metalness.value=o.metalness,o.metalnessMap&&(f.metalnessMap.value=o.metalnessMap,t(o.metalnessMap,f.metalnessMapTransform)),f.roughness.value=o.roughness,o.roughnessMap&&(f.roughnessMap.value=o.roughnessMap,t(o.roughnessMap,f.roughnessMapTransform)),o.envMap&&(f.envMapIntensity.value=o.envMapIntensity)}function x(f,o,E){f.ior.value=o.ior,o.sheen>0&&(f.sheenColor.value.copy(o.sheenColor).multiplyScalar(o.sheen),f.sheenRoughness.value=o.sheenRoughness,o.sheenColorMap&&(f.sheenColorMap.value=o.sheenColorMap,t(o.sheenColorMap,f.sheenColorMapTransform)),o.sheenRoughnessMap&&(f.sheenRoughnessMap.value=o.sheenRoughnessMap,t(o.sheenRoughnessMap,f.sheenRoughnessMapTransform))),o.clearcoat>0&&(f.clearcoat.value=o.clearcoat,f.clearcoatRoughness.value=o.clearcoatRoughness,o.clearcoatMap&&(f.clearcoatMap.value=o.clearcoatMap,t(o.clearcoatMap,f.clearcoatMapTransform)),o.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=o.clearcoatRoughnessMap,t(o.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),o.clearcoatNormalMap&&(f.clearcoatNormalMap.value=o.clearcoatNormalMap,t(o.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(o.clearcoatNormalScale),o.side===Tt&&f.clearcoatNormalScale.value.negate())),o.dispersion>0&&(f.dispersion.value=o.dispersion),o.iridescence>0&&(f.iridescence.value=o.iridescence,f.iridescenceIOR.value=o.iridescenceIOR,f.iridescenceThicknessMinimum.value=o.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=o.iridescenceThicknessRange[1],o.iridescenceMap&&(f.iridescenceMap.value=o.iridescenceMap,t(o.iridescenceMap,f.iridescenceMapTransform)),o.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=o.iridescenceThicknessMap,t(o.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),o.transmission>0&&(f.transmission.value=o.transmission,f.transmissionSamplerMap.value=E.texture,f.transmissionSamplerSize.value.set(E.width,E.height),o.transmissionMap&&(f.transmissionMap.value=o.transmissionMap,t(o.transmissionMap,f.transmissionMapTransform)),f.thickness.value=o.thickness,o.thicknessMap&&(f.thicknessMap.value=o.thicknessMap,t(o.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=o.attenuationDistance,f.attenuationColor.value.copy(o.attenuationColor)),o.anisotropy>0&&(f.anisotropyVector.value.set(o.anisotropy*Math.cos(o.anisotropyRotation),o.anisotropy*Math.sin(o.anisotropyRotation)),o.anisotropyMap&&(f.anisotropyMap.value=o.anisotropyMap,t(o.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=o.specularIntensity,f.specularColor.value.copy(o.specularColor),o.specularColorMap&&(f.specularColorMap.value=o.specularColorMap,t(o.specularColorMap,f.specularColorMapTransform)),o.specularIntensityMap&&(f.specularIntensityMap.value=o.specularIntensityMap,t(o.specularIntensityMap,f.specularIntensityMapTransform))}function I(f,o){o.matcap&&(f.matcap.value=o.matcap)}function y(f,o){const E=n.get(o).light;f.referencePosition.value.setFromMatrixPosition(E.matrixWorld),f.nearDistance.value=E.shadow.camera.near,f.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function uu(e,n,t,i){let a={},r={},d=[];const l=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function v(E,_){const g=_.program;i.uniformBlockBinding(E,g)}function S(E,_){let g=a[E.id];g===void 0&&(I(E),g=A(E),a[E.id]=g,E.addEventListener("dispose",f));const L=_.program;i.updateUBOMapping(E,L);const R=n.render.frame;r[E.id]!==R&&(T(E),r[E.id]=R)}function A(E){const _=M();E.__bindingPointIndex=_;const g=e.createBuffer(),L=E.__size,R=E.usage;return e.bindBuffer(e.UNIFORM_BUFFER,g),e.bufferData(e.UNIFORM_BUFFER,L,R),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,_,g),g}function M(){for(let E=0;E<l;E++)if(d.indexOf(E)===-1)return d.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function T(E){const _=a[E.id],g=E.uniforms,L=E.__cache;e.bindBuffer(e.UNIFORM_BUFFER,_);for(let R=0,D=g.length;R<D;R++){const F=Array.isArray(g[R])?g[R]:[g[R]];for(let m=0,u=F.length;m<u;m++){const C=F[m];if(x(C,R,m,L)===!0){const H=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let Y=0;for(let q=0;q<z.length;q++){const k=z[q],ne=y(k);typeof k=="number"||typeof k=="boolean"?(C.__data[0]=k,e.bufferSubData(e.UNIFORM_BUFFER,H+Y,C.__data)):k.isMatrix3?(C.__data[0]=k.elements[0],C.__data[1]=k.elements[1],C.__data[2]=k.elements[2],C.__data[3]=0,C.__data[4]=k.elements[3],C.__data[5]=k.elements[4],C.__data[6]=k.elements[5],C.__data[7]=0,C.__data[8]=k.elements[6],C.__data[9]=k.elements[7],C.__data[10]=k.elements[8],C.__data[11]=0):(k.toArray(C.__data,Y),Y+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,H,C.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function x(E,_,g,L){const R=E.value,D=_+"_"+g;if(L[D]===void 0)return typeof R=="number"||typeof R=="boolean"?L[D]=R:L[D]=R.clone(),!0;{const F=L[D];if(typeof R=="number"||typeof R=="boolean"){if(F!==R)return L[D]=R,!0}else if(F.equals(R)===!1)return F.copy(R),!0}return!1}function I(E){const _=E.uniforms;let g=0;const L=16;for(let D=0,F=_.length;D<F;D++){const m=Array.isArray(_[D])?_[D]:[_[D]];for(let u=0,C=m.length;u<C;u++){const H=m[u],z=Array.isArray(H.value)?H.value:[H.value];for(let Y=0,q=z.length;Y<q;Y++){const k=z[Y],ne=y(k),B=g%L,pe=B%ne.boundary,Re=B+pe;g+=pe,Re!==0&&L-Re<ne.storage&&(g+=L-Re),H.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=g,g+=ne.storage}}}const R=g%L;return R>0&&(g+=L-R),E.__size=g,E.__cache={},this}function y(E){const _={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(_.boundary=4,_.storage=4):E.isVector2?(_.boundary=8,_.storage=8):E.isVector3||E.isColor?(_.boundary=16,_.storage=12):E.isVector4?(_.boundary=16,_.storage=16):E.isMatrix3?(_.boundary=48,_.storage=48):E.isMatrix4?(_.boundary=64,_.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),_}function f(E){const _=E.target;_.removeEventListener("dispose",f);const g=d.indexOf(_.__bindingPointIndex);d.splice(g,1),e.deleteBuffer(a[_.id]),delete a[_.id],delete r[_.id]}function o(){for(const E in a)e.deleteBuffer(a[E]);d=[],a={},r={}}return{bind:v,update:S,dispose:o}}class pu{constructor(n={}){const{canvas:t=eo(),context:i=null,depth:a=!0,stencil:r=!1,alpha:d=!1,antialias:l=!1,premultipliedAlpha:v=!0,preserveDrawingBuffer:S=!1,powerPreference:A="default",failIfMajorPerformanceCaveat:M=!1,reversedDepthBuffer:T=!1}=n;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=d;const I=new Uint32Array(4),y=new Int32Array(4);let f=null,o=null;const E=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const g=this;let L=!1;this._outputColorSpace=ma;let R=0,D=0,F=null,m=-1,u=null;const C=new dt,H=new dt;let z=null;const Y=new Xe(0);let q=0,k=t.width,ne=t.height,B=1,pe=null,Re=null;const ye=new dt(0,0,k,ne),He=new dt(0,0,k,ne);let et=!1;const Ze=new _a;let ke=!1,W=!1;const K=new Mt,fe=new ce,Ce=new dt,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function ee(){return F===null?B:1}let p=i;function Le(c,w){return t.getContext(c,w)}try{const c={alpha:!0,depth:a,stencil:r,antialias:l,premultipliedAlpha:v,preserveDrawingBuffer:S,powerPreference:A,failIfMajorPerformanceCaveat:M};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${to}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",Z,!1),p===null){const w="webgl2";if(p=Le(w,c),p===null)throw Le(w)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(c){throw console.error("THREE.WebGLRenderer: "+c.message),c}let he,xe,se,ze,me,Ne,ct,rt,h,s,U,V,$,G,Te,te,Ee,Se,Q,le,Pe,Me,ae,Ie;function b(){he=new Td(p),he.init(),Me=new au(p,he),xe=new md(p,he,n,Me),se=new iu(p,he),xe.reversedDepthBuffer&&T&&se.buffers.depth.setReversed(!0),ze=new Rd(p),me=new zf,Ne=new ru(p,he,se,me,xe,Me,ze),ct=new gd(g),rt=new Md(g),h=new Ls(p),ae=new pd(p,h),s=new xd(p,h,ze,ae),U=new wd(p,s,h,ze),Q=new bd(p,xe,Ne),te=new _d(me),V=new Wf(g,ct,rt,he,xe,ae,te),$=new fu(g,me),G=new Yf,Te=new Qf(he),Se=new ud(g,ct,rt,se,U,x,v),Ee=new tu(g,U,xe),Ie=new uu(p,ze,xe,se),le=new hd(p,he,ze),Pe=new Ad(p,he,ze),ze.programs=V.programs,g.capabilities=xe,g.extensions=he,g.properties=me,g.renderLists=G,g.shadowMap=Ee,g.state=se,g.info=ze}b();const J=new cu(g,p);this.xr=J,this.getContext=function(){return p},this.getContextAttributes=function(){return p.getContextAttributes()},this.forceContextLoss=function(){const c=he.get("WEBGL_lose_context");c&&c.loseContext()},this.forceContextRestore=function(){const c=he.get("WEBGL_lose_context");c&&c.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(c){c!==void 0&&(B=c,this.setSize(k,ne,!1))},this.getSize=function(c){return c.set(k,ne)},this.setSize=function(c,w,N=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=c,ne=w,t.width=Math.floor(c*B),t.height=Math.floor(w*B),N===!0&&(t.style.width=c+"px",t.style.height=w+"px"),this.setViewport(0,0,c,w)},this.getDrawingBufferSize=function(c){return c.set(k*B,ne*B).floor()},this.setDrawingBufferSize=function(c,w,N){k=c,ne=w,B=N,t.width=Math.floor(c*N),t.height=Math.floor(w*N),this.setViewport(0,0,c,w)},this.getCurrentViewport=function(c){return c.copy(C)},this.getViewport=function(c){return c.copy(ye)},this.setViewport=function(c,w,N,O){c.isVector4?ye.set(c.x,c.y,c.z,c.w):ye.set(c,w,N,O),se.viewport(C.copy(ye).multiplyScalar(B).round())},this.getScissor=function(c){return c.copy(He)},this.setScissor=function(c,w,N,O){c.isVector4?He.set(c.x,c.y,c.z,c.w):He.set(c,w,N,O),se.scissor(H.copy(He).multiplyScalar(B).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(c){se.setScissorTest(et=c)},this.setOpaqueSort=function(c){pe=c},this.setTransparentSort=function(c){Re=c},this.getClearColor=function(c){return c.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor(...arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha(...arguments)},this.clear=function(c=!0,w=!0,N=!0){let O=0;if(c){let P=!1;if(F!==null){const j=F.texture.format;P=j===ba||j===Ra||j===Aa}if(P){const j=F.texture.type,oe=j===Vt||j===fn||j===yn||j===dn||j===Sa||j===Ma,_e=Se.getClearColor(),de=Se.getClearAlpha(),we=_e.r,De=_e.g,Ae=_e.b;oe?(I[0]=we,I[1]=De,I[2]=Ae,I[3]=de,p.clearBufferuiv(p.COLOR,0,I)):(y[0]=we,y[1]=De,y[2]=Ae,y[3]=de,p.clearBufferiv(p.COLOR,0,y))}else O|=p.COLOR_BUFFER_BIT}w&&(O|=p.DEPTH_BUFFER_BIT),N&&(O|=p.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),p.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",Z,!1),Se.dispose(),G.dispose(),Te.dispose(),me.dispose(),ct.dispose(),rt.dispose(),U.dispose(),ae.dispose(),Ie.dispose(),V.dispose(),J.dispose(),J.removeEventListener("sessionstart",At),J.removeEventListener("sessionend",Ui),yt.stop()};function ie(c){c.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const c=ze.autoReset,w=Ee.enabled,N=Ee.autoUpdate,O=Ee.needsUpdate,P=Ee.type;b(),ze.autoReset=c,Ee.enabled=w,Ee.autoUpdate=N,Ee.needsUpdate=O,Ee.type=P}function Z(c){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",c.statusMessage)}function X(c){const w=c.target;w.removeEventListener("dispose",X),ge(w)}function ge(c){Ue(c),me.remove(c)}function Ue(c){const w=me.get(c).programs;w!==void 0&&(w.forEach(function(N){V.releaseProgram(N)}),c.isShaderMaterial&&V.releaseShaderCache(c))}this.renderBufferDirect=function(c,w,N,O,P,j){w===null&&(w=ve);const oe=P.isMesh&&P.matrixWorld.determinant()<0,_e=qa(c,w,N,O,P);se.setMaterial(O,oe);let de=N.index,we=1;if(O.wireframe===!0){if(de=s.getWireframeAttribute(N),de===void 0)return;we=2}const De=N.drawRange,Ae=N.attributes.position;let Be=De.start*we,Ye=(De.start+De.count)*we;j!==null&&(Be=Math.max(Be,j.start*we),Ye=Math.min(Ye,(j.start+j.count)*we)),de!==null?(Be=Math.max(Be,0),Ye=Math.min(Ye,de.count)):Ae!=null&&(Be=Math.max(Be,0),Ye=Math.min(Ye,Ae.count));const it=Ye-Be;if(it<0||it===1/0)return;ae.setup(P,O,_e,N,de);let Qe,$e=le;if(de!==null&&(Qe=h.get(de),$e=Pe,$e.setIndex(Qe)),P.isMesh)O.wireframe===!0?(se.setLineWidth(O.wireframeLinewidth*ee()),$e.setMode(p.LINES)):$e.setMode(p.TRIANGLES);else if(P.isLine){let be=O.linewidth;be===void 0&&(be=1),se.setLineWidth(be*ee()),P.isLineSegments?$e.setMode(p.LINES):P.isLineLoop?$e.setMode(p.LINE_LOOP):$e.setMode(p.LINE_STRIP)}else P.isPoints?$e.setMode(p.POINTS):P.isSprite&&$e.setMode(p.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)fi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),$e.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))$e.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{const be=P._multiDrawStarts,tt=P._multiDrawCounts,Ve=P._multiDrawCount,_t=de?h.get(de).bytesPerElement:1,kt=me.get(O).currentProgram.getUniforms();for(let gt=0;gt<Ve;gt++)kt.setValue(p,"_gl_DrawID",gt),$e.render(be[gt]/_t,tt[gt])}else if(P.isInstancedMesh)$e.renderInstances(Be,it,P.count);else if(N.isInstancedBufferGeometry){const be=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,tt=Math.min(N.instanceCount,be);$e.renderInstances(Be,it,tt)}else $e.render(Be,it)};function je(c,w,N){c.transparent===!0&&c.side===xt&&c.forceSinglePass===!1?(c.side=Tt,c.needsUpdate=!0,_n(c,w,N),c.side=cn,c.needsUpdate=!0,_n(c,w,N),c.side=xt):_n(c,w,N)}this.compile=function(c,w,N=null){N===null&&(N=c),o=Te.get(N),o.init(w),_.push(o),N.traverseVisible(function(P){P.isLight&&P.layers.test(w.layers)&&(o.pushLight(P),P.castShadow&&o.pushShadow(P))}),c!==N&&c.traverseVisible(function(P){P.isLight&&P.layers.test(w.layers)&&(o.pushLight(P),P.castShadow&&o.pushShadow(P))}),o.setupLights();const O=new Set;return c.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;const j=P.material;if(j)if(Array.isArray(j))for(let oe=0;oe<j.length;oe++){const _e=j[oe];je(_e,N,P),O.add(_e)}else je(j,N,P),O.add(j)}),o=_.pop(),O},this.compileAsync=function(c,w,N=null){const O=this.compile(c,w,N);return new Promise(P=>{function j(){if(O.forEach(function(oe){me.get(oe).currentProgram.isReady()&&O.delete(oe)}),O.size===0){P(c);return}setTimeout(j,10)}he.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let We=null;function bt(c){We&&We(c)}function At(){yt.stop()}function Ui(){yt.start()}const yt=new Na;yt.setAnimationLoop(bt),typeof self<"u"&&yt.setContext(self),this.setAnimationLoop=function(c){We=c,J.setAnimationLoop(c),c===null?yt.stop():yt.start()},J.addEventListener("sessionstart",At),J.addEventListener("sessionend",Ui),this.render=function(c,w){if(w!==void 0&&w.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(c.matrixWorldAutoUpdate===!0&&c.updateMatrixWorld(),w.parent===null&&w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(w),w=J.getCamera()),c.isScene===!0&&c.onBeforeRender(g,c,w,F),o=Te.get(c,_.length),o.init(w),_.push(o),K.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse),Ze.setFromProjectionMatrix(K,Hi,w.reversedDepth),W=this.localClippingEnabled,ke=te.init(this.clippingPlanes,W),f=G.get(c,E.length),f.init(),E.push(f),J.enabled===!0&&J.isPresenting===!0){const j=g.xr.getDepthSensingMesh();j!==null&&Vn(j,w,-1/0,g.sortObjects)}Vn(c,w,0,g.sortObjects),f.finish(),g.sortObjects===!0&&f.sort(pe,Re),Fe=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Fe&&Se.addToRenderList(f,c),this.info.render.frame++,ke===!0&&te.beginShadows();const N=o.state.shadowsArray;Ee.render(N,c,w),ke===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=f.opaque,P=f.transmissive;if(o.setupLights(),w.isArrayCamera){const j=w.cameras;if(P.length>0)for(let oe=0,_e=j.length;oe<_e;oe++){const de=j[oe];Ni(O,P,c,de)}Fe&&Se.render(c);for(let oe=0,_e=j.length;oe<_e;oe++){const de=j[oe];Ii(f,c,de,de.viewport)}}else P.length>0&&Ni(O,P,c,w),Fe&&Se.render(c),Ii(f,c,w);F!==null&&D===0&&(Ne.updateMultisampleRenderTarget(F),Ne.updateRenderTargetMipmap(F)),c.isScene===!0&&c.onAfterRender(g,c,w),ae.resetDefaultState(),m=-1,u=null,_.pop(),_.length>0?(o=_[_.length-1],ke===!0&&te.setGlobalState(g.clippingPlanes,o.state.camera)):o=null,E.pop(),E.length>0?f=E[E.length-1]:f=null};function Vn(c,w,N,O){if(c.visible===!1)return;if(c.layers.test(w.layers)){if(c.isGroup)N=c.renderOrder;else if(c.isLOD)c.autoUpdate===!0&&c.update(w);else if(c.isLight)o.pushLight(c),c.castShadow&&o.pushShadow(c);else if(c.isSprite){if(!c.frustumCulled||Ze.intersectsSprite(c)){O&&Ce.setFromMatrixPosition(c.matrixWorld).applyMatrix4(K);const oe=U.update(c),_e=c.material;_e.visible&&f.push(c,oe,_e,N,Ce.z,null)}}else if((c.isMesh||c.isLine||c.isPoints)&&(!c.frustumCulled||Ze.intersectsObject(c))){const oe=U.update(c),_e=c.material;if(O&&(c.boundingSphere!==void 0?(c.boundingSphere===null&&c.computeBoundingSphere(),Ce.copy(c.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Ce.copy(oe.boundingSphere.center)),Ce.applyMatrix4(c.matrixWorld).applyMatrix4(K)),Array.isArray(_e)){const de=oe.groups;for(let we=0,De=de.length;we<De;we++){const Ae=de[we],Be=_e[Ae.materialIndex];Be&&Be.visible&&f.push(c,oe,Be,N,Ce.z,Ae)}}else _e.visible&&f.push(c,oe,_e,N,Ce.z,null)}}const j=c.children;for(let oe=0,_e=j.length;oe<_e;oe++)Vn(j[oe],w,N,O)}function Ii(c,w,N,O){const P=c.opaque,j=c.transmissive,oe=c.transparent;o.setupLightsView(N),ke===!0&&te.setGlobalState(g.clippingPlanes,N),O&&se.viewport(C.copy(O)),P.length>0&&mn(P,w,N),j.length>0&&mn(j,w,N),oe.length>0&&mn(oe,w,N),se.buffers.depth.setTest(!0),se.buffers.depth.setMask(!0),se.buffers.color.setMask(!0),se.setPolygonOffset(!1)}function Ni(c,w,N,O){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;o.state.transmissionRenderTarget[O.id]===void 0&&(o.state.transmissionRenderTarget[O.id]=new jt(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?On:Vt,minFilter:rn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const j=o.state.transmissionRenderTarget[O.id],oe=O.viewport||C;j.setSize(oe.z*g.transmissionResolutionScale,oe.w*g.transmissionResolutionScale);const _e=g.getRenderTarget(),de=g.getActiveCubeFace(),we=g.getActiveMipmapLevel();g.setRenderTarget(j),g.getClearColor(Y),q=g.getClearAlpha(),q<1&&g.setClearColor(16777215,.5),g.clear(),Fe&&Se.render(N);const De=g.toneMapping;g.toneMapping=Pt;const Ae=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),o.setupLightsView(O),ke===!0&&te.setGlobalState(g.clippingPlanes,O),mn(c,N,O),Ne.updateMultisampleRenderTarget(j),Ne.updateRenderTargetMipmap(j),he.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let Ye=0,it=w.length;Ye<it;Ye++){const Qe=w[Ye],$e=Qe.object,be=Qe.geometry,tt=Qe.material,Ve=Qe.group;if(tt.side===xt&&$e.layers.test(O.layers)){const _t=tt.side;tt.side=Tt,tt.needsUpdate=!0,Oi($e,N,O,be,tt,Ve),tt.side=_t,tt.needsUpdate=!0,Be=!0}}Be===!0&&(Ne.updateMultisampleRenderTarget(j),Ne.updateRenderTargetMipmap(j))}g.setRenderTarget(_e,de,we),g.setClearColor(Y,q),Ae!==void 0&&(O.viewport=Ae),g.toneMapping=De}function mn(c,w,N){const O=w.isScene===!0?w.overrideMaterial:null;for(let P=0,j=c.length;P<j;P++){const oe=c[P],_e=oe.object,de=oe.geometry,we=oe.group;let De=oe.material;De.allowOverride===!0&&O!==null&&(De=O),_e.layers.test(N.layers)&&Oi(_e,w,N,de,De,we)}}function Oi(c,w,N,O,P,j){c.onBeforeRender(g,w,N,O,P,j),c.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,c.matrixWorld),c.normalMatrix.getNormalMatrix(c.modelViewMatrix),P.onBeforeRender(g,w,N,O,c,j),P.transparent===!0&&P.side===xt&&P.forceSinglePass===!1?(P.side=Tt,P.needsUpdate=!0,g.renderBufferDirect(N,w,O,P,c,j),P.side=cn,P.needsUpdate=!0,g.renderBufferDirect(N,w,O,P,c,j),P.side=xt):g.renderBufferDirect(N,w,O,P,c,j),c.onAfterRender(g,w,N,O,P,j)}function _n(c,w,N){w.isScene!==!0&&(w=ve);const O=me.get(c),P=o.state.lights,j=o.state.shadowsArray,oe=P.state.version,_e=V.getParameters(c,P.state,j,w,N),de=V.getProgramCacheKey(_e);let we=O.programs;O.environment=c.isMeshStandardMaterial?w.environment:null,O.fog=w.fog,O.envMap=(c.isMeshStandardMaterial?rt:ct).get(c.envMap||O.environment),O.envMapRotation=O.environment!==null&&c.envMap===null?w.environmentRotation:c.envMapRotation,we===void 0&&(c.addEventListener("dispose",X),we=new Map,O.programs=we);let De=we.get(de);if(De!==void 0){if(O.currentProgram===De&&O.lightsStateVersion===oe)return Bi(c,_e),De}else _e.uniforms=V.getUniforms(c),c.onBeforeCompile(_e,g),De=V.acquireProgram(_e,de),we.set(de,De),O.uniforms=_e.uniforms;const Ae=O.uniforms;return(!c.isShaderMaterial&&!c.isRawShaderMaterial||c.clipping===!0)&&(Ae.clippingPlanes=te.uniform),Bi(c,_e),O.needsLights=Za(c),O.lightsStateVersion=oe,O.needsLights&&(Ae.ambientLightColor.value=P.state.ambient,Ae.lightProbe.value=P.state.probe,Ae.directionalLights.value=P.state.directional,Ae.directionalLightShadows.value=P.state.directionalShadow,Ae.spotLights.value=P.state.spot,Ae.spotLightShadows.value=P.state.spotShadow,Ae.rectAreaLights.value=P.state.rectArea,Ae.ltc_1.value=P.state.rectAreaLTC1,Ae.ltc_2.value=P.state.rectAreaLTC2,Ae.pointLights.value=P.state.point,Ae.pointLightShadows.value=P.state.pointShadow,Ae.hemisphereLights.value=P.state.hemi,Ae.directionalShadowMap.value=P.state.directionalShadowMap,Ae.directionalShadowMatrix.value=P.state.directionalShadowMatrix,Ae.spotShadowMap.value=P.state.spotShadowMap,Ae.spotLightMatrix.value=P.state.spotLightMatrix,Ae.spotLightMap.value=P.state.spotLightMap,Ae.pointShadowMap.value=P.state.pointShadowMap,Ae.pointShadowMatrix.value=P.state.pointShadowMatrix),O.currentProgram=De,O.uniformsList=null,De}function Fi(c){if(c.uniformsList===null){const w=c.currentProgram.getUniforms();c.uniformsList=Cn.seqWithValue(w.seq,c.uniforms)}return c.uniformsList}function Bi(c,w){const N=me.get(c);N.outputColorSpace=w.outputColorSpace,N.batching=w.batching,N.batchingColor=w.batchingColor,N.instancing=w.instancing,N.instancingColor=w.instancingColor,N.instancingMorph=w.instancingMorph,N.skinning=w.skinning,N.morphTargets=w.morphTargets,N.morphNormals=w.morphNormals,N.morphColors=w.morphColors,N.morphTargetsCount=w.morphTargetsCount,N.numClippingPlanes=w.numClippingPlanes,N.numIntersection=w.numClipIntersection,N.vertexAlphas=w.vertexAlphas,N.vertexTangents=w.vertexTangents,N.toneMapping=w.toneMapping}function qa(c,w,N,O,P){w.isScene!==!0&&(w=ve),Ne.resetTextureUnits();const j=w.fog,oe=O.isMeshStandardMaterial?w.environment:null,_e=F===null?g.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Fn,de=(O.isMeshStandardMaterial?rt:ct).get(O.envMap||oe),we=O.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,De=!!N.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Ae=!!N.morphAttributes.position,Be=!!N.morphAttributes.normal,Ye=!!N.morphAttributes.color;let it=Pt;O.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(it=g.toneMapping);const Qe=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,$e=Qe!==void 0?Qe.length:0,be=me.get(O),tt=o.state.lights;if(ke===!0&&(W===!0||c!==u)){const ft=c===u&&O.id===m;te.setState(O,c,ft)}let Ve=!1;O.version===be.__version?(be.needsLights&&be.lightsStateVersion!==tt.state.version||be.outputColorSpace!==_e||P.isBatchedMesh&&be.batching===!1||!P.isBatchedMesh&&be.batching===!0||P.isBatchedMesh&&be.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&be.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&be.instancing===!1||!P.isInstancedMesh&&be.instancing===!0||P.isSkinnedMesh&&be.skinning===!1||!P.isSkinnedMesh&&be.skinning===!0||P.isInstancedMesh&&be.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&be.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&be.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&be.instancingMorph===!1&&P.morphTexture!==null||be.envMap!==de||O.fog===!0&&be.fog!==j||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==te.numPlanes||be.numIntersection!==te.numIntersection)||be.vertexAlphas!==we||be.vertexTangents!==De||be.morphTargets!==Ae||be.morphNormals!==Be||be.morphColors!==Ye||be.toneMapping!==it||be.morphTargetsCount!==$e)&&(Ve=!0):(Ve=!0,be.__version=O.version);let _t=be.currentProgram;Ve===!0&&(_t=_n(O,w,P));let kt=!1,gt=!1,tn=!1;const nt=_t.getUniforms(),Et=be.uniforms;if(se.useProgram(_t.program)&&(kt=!0,gt=!0,tn=!0),O.id!==m&&(m=O.id,gt=!0),kt||u!==c){se.buffers.depth.getReversed()&&c.reversedDepth!==!0&&(c._reversedDepth=!0,c.updateProjectionMatrix()),nt.setValue(p,"projectionMatrix",c.projectionMatrix),nt.setValue(p,"viewMatrix",c.matrixWorldInverse);const pt=nt.map.cameraPosition;pt!==void 0&&pt.setValue(p,fe.setFromMatrixPosition(c.matrixWorld)),xe.logarithmicDepthBuffer&&nt.setValue(p,"logDepthBufFC",2/(Math.log(c.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&nt.setValue(p,"isOrthographic",c.isOrthographicCamera===!0),u!==c&&(u=c,gt=!0,tn=!0)}if(P.isSkinnedMesh){nt.setOptional(p,P,"bindMatrix"),nt.setOptional(p,P,"bindMatrixInverse");const ft=P.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),nt.setValue(p,"boneTexture",ft.boneTexture,Ne))}P.isBatchedMesh&&(nt.setOptional(p,P,"batchingTexture"),nt.setValue(p,"batchingTexture",P._matricesTexture,Ne),nt.setOptional(p,P,"batchingIdTexture"),nt.setValue(p,"batchingIdTexture",P._indirectTexture,Ne),nt.setOptional(p,P,"batchingColorTexture"),P._colorsTexture!==null&&nt.setValue(p,"batchingColorTexture",P._colorsTexture,Ne));const St=N.morphAttributes;if((St.position!==void 0||St.normal!==void 0||St.color!==void 0)&&Q.update(P,N,_t),(gt||be.receiveShadow!==P.receiveShadow)&&(be.receiveShadow=P.receiveShadow,nt.setValue(p,"receiveShadow",P.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Et.envMap.value=de,Et.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&w.environment!==null&&(Et.envMapIntensity.value=w.environmentIntensity),gt&&(nt.setValue(p,"toneMappingExposure",g.toneMappingExposure),be.needsLights&&$a(Et,tn),j&&O.fog===!0&&$.refreshFogUniforms(Et,j),$.refreshMaterialUniforms(Et,O,B,ne,o.state.transmissionRenderTarget[c.id]),Cn.upload(p,Fi(be),Et,Ne)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Cn.upload(p,Fi(be),Et,Ne),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&nt.setValue(p,"center",P.center),nt.setValue(p,"modelViewMatrix",P.modelViewMatrix),nt.setValue(p,"normalMatrix",P.normalMatrix),nt.setValue(p,"modelMatrix",P.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const ft=O.uniformsGroups;for(let pt=0,kn=ft.length;pt<kn;pt++){const Ut=ft[pt];Ie.update(Ut,_t),Ie.bind(Ut,_t)}}return _t}function $a(c,w){c.ambientLightColor.needsUpdate=w,c.lightProbe.needsUpdate=w,c.directionalLights.needsUpdate=w,c.directionalLightShadows.needsUpdate=w,c.pointLights.needsUpdate=w,c.pointLightShadows.needsUpdate=w,c.spotLights.needsUpdate=w,c.spotLightShadows.needsUpdate=w,c.rectAreaLights.needsUpdate=w,c.hemisphereLights.needsUpdate=w}function Za(c){return c.isMeshLambertMaterial||c.isMeshToonMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.isShadowMaterial||c.isShaderMaterial&&c.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(c,w,N){const O=me.get(c);O.__autoAllocateDepthBuffer=c.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),me.get(c.texture).__webglTexture=w,me.get(c.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:N,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(c,w){const N=me.get(c);N.__webglFramebuffer=w,N.__useDefaultFramebuffer=w===void 0};const ja=p.createFramebuffer();this.setRenderTarget=function(c,w=0,N=0){F=c,R=w,D=N;let O=!0,P=null,j=!1,oe=!1;if(c){const de=me.get(c);if(de.__useDefaultFramebuffer!==void 0)se.bindFramebuffer(p.FRAMEBUFFER,null),O=!1;else if(de.__webglFramebuffer===void 0)Ne.setupRenderTarget(c);else if(de.__hasExternalTextures)Ne.rebindTextures(c,me.get(c.texture).__webglTexture,me.get(c.depthTexture).__webglTexture);else if(c.depthBuffer){const Ae=c.depthTexture;if(de.__boundDepthTexture!==Ae){if(Ae!==null&&me.has(Ae)&&(c.width!==Ae.image.width||c.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(c)}}const we=c.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(oe=!0);const De=me.get(c).__webglFramebuffer;c.isWebGLCubeRenderTarget?(Array.isArray(De[w])?P=De[w][N]:P=De[w],j=!0):c.samples>0&&Ne.useMultisampledRTT(c)===!1?P=me.get(c).__webglMultisampledFramebuffer:Array.isArray(De)?P=De[N]:P=De,C.copy(c.viewport),H.copy(c.scissor),z=c.scissorTest}else C.copy(ye).multiplyScalar(B).floor(),H.copy(He).multiplyScalar(B).floor(),z=et;if(N!==0&&(P=ja),se.bindFramebuffer(p.FRAMEBUFFER,P)&&O&&se.drawBuffers(c,P),se.viewport(C),se.scissor(H),se.setScissorTest(z),j){const de=me.get(c.texture);p.framebufferTexture2D(p.FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_CUBE_MAP_POSITIVE_X+w,de.__webglTexture,N)}else if(oe){const de=w;for(let we=0;we<c.textures.length;we++){const De=me.get(c.textures[we]);p.framebufferTextureLayer(p.FRAMEBUFFER,p.COLOR_ATTACHMENT0+we,De.__webglTexture,N,de)}}else if(c!==null&&N!==0){const de=me.get(c.texture);p.framebufferTexture2D(p.FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,de.__webglTexture,N)}m=-1},this.readRenderTargetPixels=function(c,w,N,O,P,j,oe,_e=0){if(!(c&&c.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=me.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&oe!==void 0&&(de=de[oe]),de){se.bindFramebuffer(p.FRAMEBUFFER,de);try{const we=c.textures[_e],De=we.format,Ae=we.type;if(!xe.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xe.textureTypeReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}w>=0&&w<=c.width-O&&N>=0&&N<=c.height-P&&(c.textures.length>1&&p.readBuffer(p.COLOR_ATTACHMENT0+_e),p.readPixels(w,N,O,P,Me.convert(De),Me.convert(Ae),j))}finally{const we=F!==null?me.get(F).__webglFramebuffer:null;se.bindFramebuffer(p.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(c,w,N,O,P,j,oe,_e=0){if(!(c&&c.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=me.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&oe!==void 0&&(de=de[oe]),de)if(w>=0&&w<=c.width-O&&N>=0&&N<=c.height-P){se.bindFramebuffer(p.FRAMEBUFFER,de);const we=c.textures[_e],De=we.format,Ae=we.type;if(!xe.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xe.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Be=p.createBuffer();p.bindBuffer(p.PIXEL_PACK_BUFFER,Be),p.bufferData(p.PIXEL_PACK_BUFFER,j.byteLength,p.STREAM_READ),c.textures.length>1&&p.readBuffer(p.COLOR_ATTACHMENT0+_e),p.readPixels(w,N,O,P,Me.convert(De),Me.convert(Ae),0);const Ye=F!==null?me.get(F).__webglFramebuffer:null;se.bindFramebuffer(p.FRAMEBUFFER,Ye);const it=p.fenceSync(p.SYNC_GPU_COMMANDS_COMPLETE,0);return p.flush(),await no(p,it,4),p.bindBuffer(p.PIXEL_PACK_BUFFER,Be),p.getBufferSubData(p.PIXEL_PACK_BUFFER,0,j),p.deleteBuffer(Be),p.deleteSync(it),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(c,w=null,N=0){const O=Math.pow(2,-N),P=Math.floor(c.image.width*O),j=Math.floor(c.image.height*O),oe=w!==null?w.x:0,_e=w!==null?w.y:0;Ne.setTexture2D(c,0),p.copyTexSubImage2D(p.TEXTURE_2D,N,0,0,oe,_e,P,j),se.unbindTexture()};const Qa=p.createFramebuffer(),Ja=p.createFramebuffer();this.copyTextureToTexture=function(c,w,N=null,O=null,P=0,j=null){j===null&&(P!==0?(fi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=P,P=0):j=0);let oe,_e,de,we,De,Ae,Be,Ye,it;const Qe=c.isCompressedTexture?c.mipmaps[j]:c.image;if(N!==null)oe=N.max.x-N.min.x,_e=N.max.y-N.min.y,de=N.isBox3?N.max.z-N.min.z:1,we=N.min.x,De=N.min.y,Ae=N.isBox3?N.min.z:0;else{const St=Math.pow(2,-P);oe=Math.floor(Qe.width*St),_e=Math.floor(Qe.height*St),c.isDataArrayTexture?de=Qe.depth:c.isData3DTexture?de=Math.floor(Qe.depth*St):de=1,we=0,De=0,Ae=0}O!==null?(Be=O.x,Ye=O.y,it=O.z):(Be=0,Ye=0,it=0);const $e=Me.convert(w.format),be=Me.convert(w.type);let tt;w.isData3DTexture?(Ne.setTexture3D(w,0),tt=p.TEXTURE_3D):w.isDataArrayTexture||w.isCompressedArrayTexture?(Ne.setTexture2DArray(w,0),tt=p.TEXTURE_2D_ARRAY):(Ne.setTexture2D(w,0),tt=p.TEXTURE_2D),p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL,w.flipY),p.pixelStorei(p.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),p.pixelStorei(p.UNPACK_ALIGNMENT,w.unpackAlignment);const Ve=p.getParameter(p.UNPACK_ROW_LENGTH),_t=p.getParameter(p.UNPACK_IMAGE_HEIGHT),kt=p.getParameter(p.UNPACK_SKIP_PIXELS),gt=p.getParameter(p.UNPACK_SKIP_ROWS),tn=p.getParameter(p.UNPACK_SKIP_IMAGES);p.pixelStorei(p.UNPACK_ROW_LENGTH,Qe.width),p.pixelStorei(p.UNPACK_IMAGE_HEIGHT,Qe.height),p.pixelStorei(p.UNPACK_SKIP_PIXELS,we),p.pixelStorei(p.UNPACK_SKIP_ROWS,De),p.pixelStorei(p.UNPACK_SKIP_IMAGES,Ae);const nt=c.isDataArrayTexture||c.isData3DTexture,Et=w.isDataArrayTexture||w.isData3DTexture;if(c.isDepthTexture){const St=me.get(c),ft=me.get(w),pt=me.get(St.__renderTarget),kn=me.get(ft.__renderTarget);se.bindFramebuffer(p.READ_FRAMEBUFFER,pt.__webglFramebuffer),se.bindFramebuffer(p.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let Ut=0;Ut<de;Ut++)nt&&(p.framebufferTextureLayer(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,me.get(c).__webglTexture,P,Ae+Ut),p.framebufferTextureLayer(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,me.get(w).__webglTexture,j,it+Ut)),p.blitFramebuffer(we,De,oe,_e,Be,Ye,oe,_e,p.DEPTH_BUFFER_BIT,p.NEAREST);se.bindFramebuffer(p.READ_FRAMEBUFFER,null),se.bindFramebuffer(p.DRAW_FRAMEBUFFER,null)}else if(P!==0||c.isRenderTargetTexture||me.has(c)){const St=me.get(c),ft=me.get(w);se.bindFramebuffer(p.READ_FRAMEBUFFER,Qa),se.bindFramebuffer(p.DRAW_FRAMEBUFFER,Ja);for(let pt=0;pt<de;pt++)nt?p.framebufferTextureLayer(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,St.__webglTexture,P,Ae+pt):p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,St.__webglTexture,P),Et?p.framebufferTextureLayer(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,ft.__webglTexture,j,it+pt):p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,ft.__webglTexture,j),P!==0?p.blitFramebuffer(we,De,oe,_e,Be,Ye,oe,_e,p.COLOR_BUFFER_BIT,p.NEAREST):Et?p.copyTexSubImage3D(tt,j,Be,Ye,it+pt,we,De,oe,_e):p.copyTexSubImage2D(tt,j,Be,Ye,we,De,oe,_e);se.bindFramebuffer(p.READ_FRAMEBUFFER,null),se.bindFramebuffer(p.DRAW_FRAMEBUFFER,null)}else Et?c.isDataTexture||c.isData3DTexture?p.texSubImage3D(tt,j,Be,Ye,it,oe,_e,de,$e,be,Qe.data):w.isCompressedArrayTexture?p.compressedTexSubImage3D(tt,j,Be,Ye,it,oe,_e,de,$e,Qe.data):p.texSubImage3D(tt,j,Be,Ye,it,oe,_e,de,$e,be,Qe):c.isDataTexture?p.texSubImage2D(p.TEXTURE_2D,j,Be,Ye,oe,_e,$e,be,Qe.data):c.isCompressedTexture?p.compressedTexSubImage2D(p.TEXTURE_2D,j,Be,Ye,Qe.width,Qe.height,$e,Qe.data):p.texSubImage2D(p.TEXTURE_2D,j,Be,Ye,oe,_e,$e,be,Qe);p.pixelStorei(p.UNPACK_ROW_LENGTH,Ve),p.pixelStorei(p.UNPACK_IMAGE_HEIGHT,_t),p.pixelStorei(p.UNPACK_SKIP_PIXELS,kt),p.pixelStorei(p.UNPACK_SKIP_ROWS,gt),p.pixelStorei(p.UNPACK_SKIP_IMAGES,tn),j===0&&w.generateMipmaps&&p.generateMipmap(tt),se.unbindTexture()},this.initRenderTarget=function(c){me.get(c).__webglFramebuffer===void 0&&Ne.setupRenderTarget(c)},this.initTexture=function(c){c.isCubeTexture?Ne.setTextureCube(c,0):c.isData3DTexture?Ne.setTexture3D(c,0):c.isDataArrayTexture||c.isCompressedArrayTexture?Ne.setTexture2DArray(c,0):Ne.setTexture2D(c,0),se.unbindTexture()},this.resetState=function(){R=0,D=0,F=null,se.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(n),t.unpackColorSpace=at._getUnpackColorSpace()}}const hu=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],mu=`
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
`,_u='<svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',gu='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Zr='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',vu=(e,n)=>`../${n}/`,Eu=e=>{const t=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),i=t.match(/^(.*\/)v\/([^/]+)\/$/);return i?{root:t,siteRoot:i[1],snapshot:i[2]}:{root:t,siteRoot:t,snapshot:null}},Su=(e,n)=>{const{siteRoot:t,snapshot:i}=Eu(),a=t.replace(/pr-preview\/pr-\d+\/$/,""),r=v=>`${n}/`;let d={};const l=(v,S)=>{e.innerHTML="";const A=[["latest",`latest · ${S}`],...v.map(M=>{const T=d[M]??{};return[M,`v${M}${T.date?` · ${T.date}`:""}`]})];i&&!v.includes(i)&&A.push([i,`v${i} snapshot`]);for(const[M,T]of A){const x=document.createElement("option");x.value=M,x.textContent=T,x.selected=M===(i??"latest"),e.appendChild(x)}};fetch(`${t}v/versions.json`,{cache:"no-cache"}).then(v=>v.ok?v.json():null).then(v=>{v?.versions&&(d=v.meta??{},l(v.versions,v.latest??"main"))}).catch(()=>{}),e.addEventListener("change",()=>{const v=e.value,S=v==="latest"?t:`${a}v/${v}/`,A=v==="latest"||!d[v]?.demos||d[v].demos.includes(n);location.href=A?`${S}${r(v==="latest"?void 0:d[v])}${location.search}${location.hash}`:S})},jr=e=>e.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),Mu=e=>{if(document.getElementById("portal-nav-toggle"))return;const n=document.createElement("style");n.id="portal-nav-styles",n.textContent=mu,document.head.appendChild(n);const t=document.createElement("aside");t.id="portal-nav-drawer",t.setAttribute("aria-hidden","false"),t.setAttribute("aria-label","Portal demos"),t.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <p class="portal-nav-intro">Portal links independent 3D web renderers at the GL layer: a guest's WebGL2 calls replay into the host's context, so engines compose without rewriting either. What it is, and where it's going: <a href="../" target="_blank" rel="noopener">the summary and RFC responses${_u}</a></p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${hu.map(d=>`
        <li${d.key===e?' class="portal-nav-current"':""}>
          <a href="${vu(e,d.key)}"${d.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${jr(d.label)}</span>
            <span class="portal-nav-desc">${jr(d.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const i=document.createElement("button");i.id="portal-nav-toggle",i.type="button",i.setAttribute("aria-label","Close demos menu"),i.setAttribute("aria-expanded","true"),i.setAttribute("aria-controls","portal-nav-drawer"),i.innerHTML=Zr,document.body.appendChild(t),document.body.appendChild(i);const a=t.querySelector("#portal-nav-version");a&&Su(a,e);const r=d=>{t.setAttribute("aria-hidden",d?"false":"true"),i.setAttribute("aria-expanded",d?"true":"false"),i.setAttribute("aria-label",d?"Close demos menu":"Toggle demos menu"),i.innerHTML=d?Zr:gu};i.addEventListener("click",d=>{d.stopPropagation(),r(t.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",d=>{t.getAttribute("aria-hidden")==="true"||d.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||r(!1)}),document.addEventListener("keydown",d=>{d.key==="Escape"&&t.getAttribute("aria-hidden")==="false"&&r(!1)})},Tu=(e,n,t={})=>{const i=t.moveSpeed??4,a=t.lookSensitivity??.0025,r=t.lookKeySpeed??1.5;let d=0,l=0;const v=new Set;xu(n,(D,F)=>{d-=D*a,l-=F*a}),window.addEventListener("keydown",D=>v.add(D.code)),window.addEventListener("keyup",D=>v.delete(D.code)),Ru(v);const S=new ce,A=new ce,M=new ce,T=D=>{v.has("KeyQ")&&(d+=r*D),v.has("KeyE")&&(d-=r*D),v.has("KeyR")&&(l-=r*D),v.has("KeyF")&&(l+=r*D),l=Au(l),e.quaternion.setFromEuler(new Un(l,d,0,"YXZ")),A.set(0,0,-1).applyQuaternion(e.quaternion),M.set(1,0,0).applyQuaternion(e.quaternion),S.set(0,0,0),v.has("KeyW")&&S.add(A),v.has("KeyS")&&S.sub(A),v.has("KeyD")&&S.add(M),v.has("KeyA")&&S.sub(M),S.y=0,S.lengthSq()>0&&(S.normalize().multiplyScalar(i*D),e.position.add(S))},x=new Mt,I=new pn,y=new Un(0,0,0,"YXZ"),f=new ce(0,0,0),o=new ce,E=new ce(0,1,0);return{update:T,setOrientationFromForward:D=>{o.copy(D).normalize(),x.lookAt(f,o,E),I.setFromRotationMatrix(x),y.setFromQuaternion(I,"YXZ"),l=y.x,d=y.y},clearKeys:()=>{v.clear()},getKeys:()=>Array.from(v),setKeys:D=>{v.clear();for(const F of D)v.add(F)}}},xu=(e,n)=>{let t=null,i=0,a=0;e.addEventListener("pointerdown",d=>{if(t===null&&(t=d.pointerId,i=d.clientX,a=d.clientY,d.pointerType!=="mouse"))try{e.setPointerCapture(d.pointerId)}catch{}});const r=d=>{d.pointerId===t&&(t=null)};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),window.addEventListener("pointermove",d=>{if(d.pointerId!==t)return;const l=d.clientX-i,v=d.clientY-a;i=d.clientX,a=d.clientY,n(l,v)})},Au=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),Ru=e=>{if(typeof window>"u")return;const n="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,t=()=>n||window.innerWidth<500;if(t()){Qr(e);return}const i=()=>{t()&&(window.removeEventListener("resize",i),Qr(e))};window.addEventListener("resize",i)},Qr=e=>{const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement and look controls"),n.innerHTML=`
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
  `,document.head.appendChild(t),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const a=i.dataset.key,r=l=>{l.preventDefault(),l.stopPropagation(),e.add(a),i.classList.add("is-active");try{i.setPointerCapture(l.pointerId)}catch{}},d=l=>{l.stopPropagation(),e.delete(a),i.classList.remove("is-active")};i.addEventListener("pointerdown",r),i.addEventListener("pointerup",d),i.addEventListener("pointercancel",d),i.addEventListener("pointerleave",d),i.addEventListener("contextmenu",l=>l.preventDefault())}},Ti=(e,n)=>[e[0]+n[0],e[1]+n[1],e[2]+n[2]],bu=(e,n)=>[e[0]-n[0],e[1]-n[1],e[2]-n[2]],Pn=(e,n)=>[e[0]*n,e[1]*n,e[2]*n],ni=(e,n)=>e[0]*n[0]+e[1]*n[1]+e[2]*n[2],Jr=(e,n)=>[e[1]*n[2]-e[2]*n[1],e[2]*n[0]-e[0]*n[2],e[0]*n[1]-e[1]*n[0]],on=e=>{const n=Math.hypot(e[0],e[1],e[2]);return n>0?[e[0]/n,e[1]/n,e[2]/n]:[0,0,1]},ea=e=>{const n=on(e.normal),t=on(e.up),i=on(Jr(t,n)),a=on(Jr(n,i));return{right:i,up:a,normal:n}},Ga=(e,n)=>[ni(e,n.right),ni(e,n.up),ni(e,n.normal)],Va=(e,n)=>Ti(Ti(Pn(n.right,e[0]),Pn(n.up,e[1])),Pn(n.normal,e[2])),ka=e=>[-e[0],e[1],-e[2]],ta=(e,n,t)=>on(Va(ka(Ga(e,n)),t)),wu=(e,n)=>{const t=ea(n.source),i=ea(n.target),a=bu(e.position,n.source.position),r=Ga(a,t),d=Pn(ka(r),n.scale),l={position:Ti(n.target.position,Va(d,i))};return e.forward&&(l.forward=ta(e.forward,t,i)),e.up&&(l.up=ta(e.up,t,i)),l};new bi;new ce;new dt;new dt;const Cu=(e=new Ke(2,3))=>{const n=new hn(e.x,e.y),t=new Pi({visible:!1}),i=new ut(n,t);return i.name="portal-plane",i.userData.portalSize=e.clone(),i},Pu=`
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
`,Jt=1,Lu=(e=Jt)=>{const n={portalPos:{value:new ce},portalNormal:{value:new ce},portalRight:{value:new ce},portalUp:{value:new ce},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new ce},hostInverseViewProjection:{value:new Mt},hostViewMatrix:{value:new Mt},hostProjectionMatrix:{value:new Mt},destinationBackground:{value:new ce(0,0,0)}},t=new Lt({uniforms:n,vertexShader:Pu,fragmentShader:Du,depthTest:!0,depthWrite:!1,side:xt,stencilWrite:!0,stencilFunc:ya,stencilRef:e,stencilFail:Gt,stencilZFail:Gt,stencilZPass:La,stencilWriteMask:255}),i=new ut(new hn(2,2),t);i.frustumCulled=!1;const a=new In;a.add(i);const r=new Da(-1,1,1,-1,0,1),d=new Mt,l=new ce(0,0,1),v=new ce(1,0,0),S=new ce(0,1,0),A=new pn;return{scene:a,camera:r,update:(T,x,I)=>{const y=T.userData.portalSize;n.portalHalfW.value=y?y.x/2:1,n.portalHalfH.value=y?y.y/2:1.5,T.getWorldPosition(n.portalPos.value),T.getWorldQuaternion(A),n.portalNormal.value.copy(l).applyQuaternion(A),n.portalRight.value.copy(v).applyQuaternion(A),n.portalUp.value.copy(S).applyQuaternion(A),x.getWorldPosition(n.hostCameraPos.value),d.multiplyMatrices(x.projectionMatrix,x.matrixWorldInverse),n.hostInverseViewProjection.value.copy(d).invert(),n.hostViewMatrix.value.copy(x.matrixWorldInverse),n.hostProjectionMatrix.value.copy(x.projectionMatrix),n.destinationBackground.value.set(I.r,I.g,I.b)}}},Wa=(e,n)=>{e.traverse(t=>{const i=t;if(!i.isMesh||!i.material)return;const a=Array.isArray(i.material)?i.material:[i.material];for(const r of a)n(r)})},yu=(e,n=Jt)=>{Wa(e,t=>{t.stencilWrite=!0,t.stencilFunc=Ss,t.stencilRef=n,t.stencilFail=Gt,t.stencilZFail=Gt,t.stencilZPass=Gt,t.stencilWriteMask=0})},Uu=e=>{Wa(e,n=>{n.stencilWrite=!1})};new ce;const ii=new pn,Mn=new ce,Tn=new ce,xn=new ce,Iu=(e,n)=>n||(e.background instanceof Xe?e.background:new Xe(0,0,0)),Nu=e=>{const{scene:n,anchor:t}=e,i=e.portalNormal??new ce(0,0,1),a=e.stencilRef??Jt;return{scene:n,anchor:t,getAnchor:()=>{t.getWorldPosition(Mn),t.getWorldQuaternion(ii),Tn.copy(i).applyQuaternion(ii).normalize(),xn.set(0,1,0).applyQuaternion(ii).normalize();const l=t.userData.portalSize;return{position:[Mn.x,Mn.y,Mn.z],normal:[Tn.x,Tn.y,Tn.z],up:[xn.x,xn.y,xn.z],halfWidth:l?l.x/2:void 0,halfHeight:l?l.y/2:void 0}},getBackground:()=>{const l=Iu(n,e.background);return{r:l.r,g:l.g,b:l.b}},tick:e.tick,renderAsSource(l,v){l.render(n,v)},renderAsDestination(l,v){const S=n.background;n.background=null,yu(n,a),l.render(n,v),Uu(n),n.background=S}}},An=36160,Rn=36008,ri=36009,na=36161,ia=34963,Ou=36386,ra=33984,Fu=new Set(["deleteBuffer","deleteFramebuffer","deleteProgram","deleteQuery","deleteRenderbuffer","deleteSampler","deleteShader","deleteSync","deleteTexture","deleteTransformFeedback","deleteVertexArray"]),Bu=e=>({__netgl_handle:e}),vt=e=>e!=null&&typeof e=="object"&&!Array.isArray(e)&&"__netgl_handle"in e?e.__netgl_handle:null,Hu=()=>{let e=null,n=null,t=null,i=null,a=null,r=ra;const d=new Map,l=new Map,v=new Map,S=new Map,A=new Map,M=new Map,T=o=>o===Rn?n:e,x=(o,E,_)=>{const g=T(o);if(g===null)return;let L=M.get(g);L||(L=new Map,M.set(g,L)),_?L.set(E,_):L.delete(E)},I=(o,E,_)=>{_===null?o.delete(E):o.set(E,_)},y=(o,E)=>{const _=e===n?[[An,e]]:[[ri,e],[Rn,n]];for(const[g,L]of _){const R=L===null?void 0:M.get(L);if(R)for(const[D,F]of R)F.id===o&&(F.kind==="texture2D"?E.push({name:"framebufferTexture2D",args:[g,D,F.textarget,null,0]}):F.kind==="layer"?E.push({name:"framebufferTextureLayer",args:[g,D,null,0,0]}):E.push({name:"framebufferRenderbuffer",args:[g,D,na,null]}),R.delete(D))}},f=(o,E)=>{const _=[];switch(o){case"deleteFramebuffer":e===E&&n===E?_.push({name:"bindFramebuffer",args:[An,null]}):e===E?_.push({name:"bindFramebuffer",args:[ri,null]}):n===E&&_.push({name:"bindFramebuffer",args:[Rn,null]}),e===E&&(e=null),n===E&&(n=null),M.delete(E);break;case"deleteRenderbuffer":y(E,_),t===E&&(_.push({name:"bindRenderbuffer",args:[na,null]}),t=null);break;case"deleteTexture":{y(E,_);let g=r;for(const[L,R]of S)for(const[D,F]of R)F===E&&(L!==g&&(_.push({name:"activeTexture",args:[L]}),g=L),_.push({name:"bindTexture",args:[D,null]}),R.delete(D));g!==r&&_.push({name:"activeTexture",args:[r]});break}case"deleteSampler":for(const[g,L]of A)L===E&&(_.push({name:"bindSampler",args:[g,null]}),A.delete(g));break;case"deleteBuffer":{const g=new Set;for(const[L,R]of v)R.id===E&&(_.push({name:"bindBufferBase",args:[R.target,R.index,null]}),g.add(R.target),v.delete(L));for(const L of g){const R=d.get(L);R!==void 0&&R!==E?_.push({name:"bindBuffer",args:[L,Bu(R)]}):d.delete(L)}for(const[L,R]of d)R===E&&(_.push({name:"bindBuffer",args:[L,null]}),d.delete(L));l.get(i??0)===E&&(_.push({name:"bindBuffer",args:[ia,null]}),l.delete(i??0));break}case"deleteVertexArray":i===E&&(_.push({name:"bindVertexArray",args:[null]}),i=null),l.delete(E);break;case"deleteTransformFeedback":a===E&&(_.push({name:"bindTransformFeedback",args:[Ou,null]}),a=null);break}return _};return{observe(o){const E=o.args;switch(o.name){case"bindFramebuffer":{const _=E[0],g=vt(E[1]);return(_===An||_===ri)&&(e=g),(_===An||_===Rn)&&(n=g),null}case"bindRenderbuffer":return t=vt(E[1]),null;case"bindVertexArray":return i=vt(E[0]),null;case"bindTransformFeedback":return a=vt(E[1]),null;case"bindBuffer":{const _=E[0];return _===ia?I(l,i??0,vt(E[1])):I(d,_,vt(E[1])),null}case"bindBufferBase":case"bindBufferRange":{const _=E[0],g=E[1],L=vt(E[2]);return I(d,_,L),L===null?v.delete(`${_}:${g}`):v.set(`${_}:${g}`,{target:_,index:g,id:L}),null}case"activeTexture":return r=E[0],null;case"bindTexture":{let _=S.get(r);return _||(_=new Map,S.set(r,_)),I(_,E[0],vt(E[1])),null}case"bindSampler":return I(A,E[0],vt(E[1])),null;case"framebufferTexture2D":{const _=vt(E[3]);return x(E[0],E[1],_===null?null:{kind:"texture2D",id:_,textarget:E[2]}),null}case"framebufferTextureLayer":{const _=vt(E[2]);return x(E[0],E[1],_===null?null:{kind:"layer",id:_}),null}case"framebufferRenderbuffer":{const _=vt(E[3]);return x(E[0],E[1],_===null?null:{kind:"renderbuffer",id:_}),null}default:if(!Fu.has(o.name))return null;{const _=vt(E[0]);return _===null?[]:f(o.name,_)}}},reset(){e=null,n=null,t=null,i=null,a=null,r=ra,d.clear(),l.clear(),v.clear(),S.clear(),A.clear()}}},Gu=new Set(["bufferData","bufferSubData","texImage2D","texSubImage2D","texImage3D","texSubImage3D","compressedTexImage2D","compressedTexSubImage2D","compressedTexImage3D","compressedTexSubImage3D","texStorage2D","texStorage3D","renderbufferStorage","renderbufferStorageMultisample","generateMipmap","shaderSource","compileShader","attachShader","linkProgram"]),Vu=new Set(["readPixels","getBufferSubData","fenceSync","clientWaitSync","waitSync"]),ku=1e3,Wu=e=>{const n=e.reproject??null,t=n?.targets==="named",i=e.beforeFrame,a=Ms(e.gl,n?{...e.replay,reproject:!0}:e.replay),r=n?.frameView??(ee=>typeof ee.viewId=="number"?ee.viewId:null),d=e.onError??(ee=>console.error("[netgl-host] replay error:",ee)),l=new Set;let v=null,S=[],A=null,M=null,T=!1;const x=Hu();let I=[],y=[],f=[],o=[];const E=new Set,_=e.wire??Ts,g=e.transport.outputOrigin,L=e.messageChannel!==!1&&typeof MessageChannel<"u"&&typeof g=="string"&&g!=="*"&&g!=="null";let R=1,D=0,F=0,m=0,u=null,C="none",H=null,z=null,Y=0,q=0,k=[],ne=!1,B=null,pe=null;const Re=ee=>{if(Mr(ee))return S.push(ee),!0;if(Tr(ee)){const p={at:A?A.length:0,viewId:r(ee),end:ee};A?A.push(...S):A=S,y.push(p),S=[];for(const Le of E)Le(ee);return!0}return!1},ye=ee=>{pe&&clearTimeout(pe),pe=null;const p=B??[];B=null,ne=ee&&u!==null;for(const[Le,he]of p)Ce(Le,he)},He=()=>{u&&(u.onmessage=null,u.close()),u=null,C="none",k=[],B&&ye(!1),ne=!1},et=ee=>{const p=Math.min(_,typeof ee.wire=="number"?ee.wire:1),Le=p>=2?{type:"netgl:ready-ack",wire:p}:{type:"netgl:ready-ack"};p>=2&&(R=2,typeof ee.seq=="number"&&(Le.seq=ee.seq));const he=typeof ee.session=="string"?ee.session:null;if(p>=2&&(ee.port==="stream"||ee.port==="all")&&L&&(C==="none"||he!==null&&he!==H)){He();const se=new MessageChannel;u=se.port1,C="offered",H=he,z={seq:typeof ee.seq=="number"?ee.seq:0,windowItems:Y,control:ee.port==="all"},u.onmessage=ze=>K(ze.data),Le.port=se.port2,e.transport.post(Le,[se.port2]),z.control&&(B=[],pe=setTimeout(()=>ye(!1),ku))}else e.transport.post(Le);v||(v=ee,e.onReady?.(v))},Ze=ee=>{if(Re(ee))return;if(xr(ee)){m+=1;for(const Le of ee.batch)Re(Le);return}if(ee.type==="netgl:ready"){et(ee);return}e.onControl?.(ee)},ke=ee=>Mr(ee)||Tr(ee)?1:xr(ee)?ee.batch.length:0,W=()=>{if(k.length===0||Y<q)return;const ee=k;k=[];for(const p of ee)D+=1,F+=ke(p),Ze(p)},K=ee=>{if(!(!ee||typeof ee!="object")){if(ee.type==="netgl:port"&&C==="offered"&&z){const p=ee;C="open",q=z.windowItems+Math.max(0,(p.after??0)-z.seq),B&&ye(z.control);return}if(k.length>0||Y<q){k.push(ee);return}D+=1,F+=ke(ee),Ze(ee)}};let fe=e.transport.onMessage(ee=>{D+=1;const p=ke(ee);F+=p,Y+=p,Ze(ee),p>0&&W()});const Ce=(ee,p)=>{if(B){B.push([ee,p]);return}ne&&u?u.postMessage(ee,p??[]):e.transport.post(ee,p)},ve=ee=>{try{a(ee)}catch(p){const Le=p instanceof Error?p.message:String(p);l.has(Le)||(l.add(Le),d(p))}},Fe=(ee,p,Le)=>{if(a.invalidate(),x.reset(),!Le){const xe=I;I=[];for(const se of xe)ve(se)}let he=0;for(let xe=0;xe<ee.length;xe+=1){for(;(n||i)&&he<p.length&&p[he].at<=xe;)n&&(a.setReprojection(n.correction(p[he].viewId,p[he].end)),t&&a.setScreenTargets(p[he].end.screenTargets??null),n.viewport&&a.setViewportRemap(n.viewport(p[he].viewId)),n.pixelScale&&a.setPixelScale(n.pixelScale(p[he].viewId))),i?.(p[he].end),he+=1;const se=ee[xe];if(Le&&(se.returnId!==void 0||Gu.has(se.name)))continue;const ze=x.observe(se);if(ze){for(const me of ze)ve(me);Le||I.push(se);continue}ve(se)}if(i)for(;he<p.length;he+=1)i(p[he].end);n&&(a.setReprojection(null),a.setViewportRemap(null),a.setPixelScale(null),a.setScreenTargets(null))};return{get ready(){return v},get hasFrame(){return M!==null||A!==null},get canRerun(){return M!==null&&T},get pendingDeletes(){return I.length},replay:a,post:Ce,wire:{get version(){return R},get port(){return C},get controlOnPort(){return ne},get messages(){return D},get items(){return F},get batches(){return m}},onFrame(ee){return E.add(ee),()=>{E.delete(ee)}},get drainedViews(){return o},drain(){if(A){const ee=A,p=y;return A=null,y=[],M=ee,f=p,T=!ee.some(Le=>Vu.has(Le.name)),o=p.map(Le=>Le.viewId),Fe(ee,p,!1),!0}return M&&T?(o=f.map(ee=>ee.viewId),Fe(M,f,!0),!0):!1},stop(){fe?.(),fe=null,He(),E.clear()}}},zu=1e3,za=e=>(n,t,i,a)=>{const r=e(),d=r.guestSize;if(!d)return null;const l=r.canvasSize(),v=l.width/d.width,S=l.height/d.height;return[Math.round(n*v),Math.round(t*S),Math.round(i*v),Math.round(a*S)]},Xa=e=>{const n=new pu({antialias:!1,stencil:!0,depth:!0});n.outputColorSpace=ma,n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),n.autoClear=!1,e.mount.appendChild(n.domElement);const t=xs({output:e.iframe.contentWindow,inputFilter:e.iframe.contentWindow});let i=0,a=0,r=0;const d=new Set;let l=null;const v=()=>l,S=Wu({gl:n.getContext(),transport:t,replay:e.replay(v),onControl:A=>{const M=A;if(M.type==="cesium:rendered"){const T=A;a=T.seq,l.guestSize={width:T.width,height:T.height}}else if(M.type==="cesium:error"){const T=A.message;d.has(T)||(d.add(T),console.error("[cesium guest]",T),e.onStatus(`Cesium error: ${T.split(`
`)[0]}`))}},onError:A=>{console.error("[netgl host] replay error:",A),e.onStatus(`Replay error: ${A instanceof Error?A.message:String(A)}`)}});return l={renderer:n,receiver:S,guestSize:null,canvasSize:()=>{const A=n.getDrawingBufferSize(new Ke);return{width:A.x,height:A.y}},tick(A,M){const T=performance.now();if(a<i&&T-r<zu)return null;i+=1,r=T;const x={type:"cesium:tick",seq:i,time:A,view:M};return t.post(x),i},lag:()=>i-a},l},Xu=4e6,Yu=-60,Ku=20,ai=16e6,qu=e=>{const n=Xa({...e,replay:R=>({remapScreenViewport:za(R),screen:{stencil:{ref:Jt},clear:"depth-only"}})}),{renderer:t,receiver:i}=n,a=new $t(70,window.innerWidth/window.innerHeight,.02,200);a.position.set(0,1.6,5.5);const r=new In;r.background=new Xe("#101826"),r.add(new As(12176639,2241348,1));const d=new Ua(16777215,.65);d.position.set(3,6,2),r.add(d);const l=new ut(new hn(18,18),new Nn({color:"#1b2a3f",roughness:.95,metalness:.03}));l.rotation.x=-Math.PI/2,r.add(l);const v=new Ci(.9,.9,.9),S=new Nn({color:"#5da9ff",roughness:.35});for(let R=0;R<14;R+=1){const D=new ut(v,S);D.position.set(Math.sin(R*.5)*4,.45,-3-R*.65),r.add(D)}const A=Cu(new Ke(2.6,3.2));A.position.set(0,1.6,-3.5),r.add(A);const M=Nu({scene:r,anchor:A}),T=Lu(),x=new Xe("#000000"),I=$u(),y=Tu(a,t.domElement);window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix()});const f=new ce,o=new ce,E=new ce,_=()=>{a.updateMatrixWorld(),a.getWorldPosition(f),a.getWorldDirection(o),E.set(0,1,0).applyQuaternion(a.quaternion);const R=wu({position:[f.x,f.y,f.z],forward:[o.x,o.y,o.z],up:[E.x,E.y,E.z]},{source:M.getAnchor(),target:I,scale:Xu});return{position:R.position,direction:R.forward,up:R.up,fovy:Dt.degToRad(a.fov)}},g=new Ia;n.tick(0,_());const L=()=>{t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,a),i.ready&&(T.update(A,a,x),t.render(T.scene,T.camera),t.clearDepth(),i.drain(),t.resetState()),y.update(g.getDelta()),n.tick(g.elapsedTime,_()),requestAnimationFrame(L)};L()},$u=()=>{const e=Dt.degToRad(Yu),n=Dt.degToRad(Ku),t=new ce(Math.cos(n)*Math.cos(e),Math.cos(n)*Math.sin(e),Math.sin(n)),i=new ce(0,0,1).addScaledVector(t,-t.z).normalize();return{position:[t.x*ai,t.y*ai,t.z*ai],normal:[-t.x,-t.y,-t.z],up:[i.x,i.y,i.z]}},aa={type:"change"},Li={type:"start"},Ya={type:"end"},bn=new bs,oa=new bi,Zu=Math.cos(70*Dt.DEG2RAD),ot=new ce,ht=2*Math.PI,qe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},oi=1e-6;class ju extends Rs{constructor(n,t=null){super(n,t),this.state=qe.NONE,this.target=new ce,this.cursor=new ce,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zt.ROTATE,MIDDLE:Zt.DOLLY,RIGHT:Zt.PAN},this.touches={ONE:Kt.ROTATE,TWO:Kt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new ce,this._lastQuaternion=new pn,this._lastTargetPosition=new ce,this._quat=new pn().setFromUnitVectors(n.up,new ce(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ar,this._sphericalDelta=new Ar,this._scale=1,this._panOffset=new ce,this._rotateStart=new Ke,this._rotateEnd=new Ke,this._rotateDelta=new Ke,this._panStart=new Ke,this._panEnd=new Ke,this._panDelta=new Ke,this._dollyStart=new Ke,this._dollyEnd=new Ke,this._dollyDelta=new Ke,this._dollyDirection=new ce,this._mouse=new Ke,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ju.bind(this),this._onPointerDown=Qu.bind(this),this._onPointerUp=ep.bind(this),this._onContextMenu=sp.bind(this),this._onMouseWheel=ip.bind(this),this._onKeyDown=rp.bind(this),this._onTouchStart=ap.bind(this),this._onTouchMove=op.bind(this),this._onMouseDown=tp.bind(this),this._onMouseMove=np.bind(this),this._interceptControlDown=lp.bind(this),this._interceptControlUp=cp.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(aa),this.update(),this.state=qe.NONE}update(n=null){const t=this.object.position;ot.copy(t).sub(this.target),ot.applyQuaternion(this._quat),this._spherical.setFromVector3(ot),this.autoRotate&&this.state===qe.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(i)&&isFinite(a)&&(i<-Math.PI?i+=ht:i>Math.PI&&(i-=ht),a<-Math.PI?a+=ht:a>Math.PI&&(a-=ht),i<=a?this._spherical.theta=Math.max(i,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+a)/2?Math.max(i,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const d=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=d!=this._spherical.radius}if(ot.setFromSpherical(this._spherical),ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let d=null;if(this.object.isPerspectiveCamera){const l=ot.length();d=this._clampDistance(l*this._scale);const v=l-d;this.object.position.addScaledVector(this._dollyDirection,v),this.object.updateMatrixWorld(),r=!!v}else if(this.object.isOrthographicCamera){const l=new ce(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const v=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=v!==this.object.zoom;const S=new ce(this._mouse.x,this._mouse.y,0);S.unproject(this.object),this.object.position.sub(S).add(l),this.object.updateMatrixWorld(),d=ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;d!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(d).add(this.object.position):(bn.origin.copy(this.object.position),bn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(bn.direction))<Zu?this.object.lookAt(this.target):(oa.setFromNormalAndCoplanarPoint(this.object.up,this.target),bn.intersectPlane(oa,this.target))))}else if(this.object.isOrthographicCamera){const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),d!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>oi||8*(1-this._lastQuaternion.dot(this.object.quaternion))>oi||this._lastTargetPosition.distanceToSquared(this.target)>oi?(this.dispatchEvent(aa),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?ht/60*this.autoRotateSpeed*n:ht/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){ot.setFromMatrixColumn(t,0),ot.multiplyScalar(-n),this._panOffset.add(ot)}_panUp(n,t){this.screenSpacePanning===!0?ot.setFromMatrixColumn(t,1):(ot.setFromMatrixColumn(t,0),ot.crossVectors(this.object.up,ot)),ot.multiplyScalar(n),this._panOffset.add(ot)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;ot.copy(a).sub(this.target);let r=ot.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),a=n-i.left,r=t-i.top,d=i.width,l=i.height;this._mouse.x=a/d*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),a=.5*(n.pageY+t.y);this._rotateStart.set(i,a)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),a=.5*(n.pageY+t.y);this._panStart.set(i,a)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,a=n.pageY-t.y,r=Math.sqrt(i*i+a*a);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),a=.5*(n.pageX+i.x),r=.5*(n.pageY+i.y);this._rotateEnd.set(a,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),a=.5*(n.pageY+t.y);this._panEnd.set(i,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,a=n.pageY-t.y,r=Math.sqrt(i*i+a*a);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const d=(n.pageX+t.x)*.5,l=(n.pageY+t.y)*.5;this._updateZoomParameters(d,l)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new Ke,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Qu(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function Ju(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function ep(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ya),this.state=qe.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function tp(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=qe.DOLLY;break;case Zt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=qe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=qe.ROTATE}break;case Zt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=qe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=qe.PAN}break;default:this.state=qe.NONE}this.state!==qe.NONE&&this.dispatchEvent(Li)}function np(e){switch(this.state){case qe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case qe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case qe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function ip(e){this.enabled===!1||this.enableZoom===!1||this.state!==qe.NONE||(e.preventDefault(),this.dispatchEvent(Li),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Ya))}function rp(e){this.enabled!==!1&&this._handleKeyDown(e)}function ap(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Kt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=qe.TOUCH_ROTATE;break;case Kt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=qe.TOUCH_PAN;break;default:this.state=qe.NONE}break;case 2:switch(this.touches.TWO){case Kt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=qe.TOUCH_DOLLY_PAN;break;case Kt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=qe.TOUCH_DOLLY_ROTATE;break;default:this.state=qe.NONE}break;default:this.state=qe.NONE}this.state!==qe.NONE&&this.dispatchEvent(Li)}function op(e){switch(this._trackPointer(e),this.state){case qe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case qe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case qe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case qe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=qe.NONE}}function sp(e){this.enabled!==!1&&e.preventDefault()}function lp(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function cp(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const yi=1e6,zt=6378137/yi,sa=6356752314245e-6/yi,si=1.025,dp=.05,fp=e=>{const n=Xa({...e,replay:F=>({remapScreenViewport:za(F),screen:{stencil:{ref:Jt},blend:"premultiplied-over",clear:"depth-only"}})}),{renderer:t,receiver:i}=n,a=new $t(40,window.innerWidth/window.innerHeight,.01,2e4);a.position.set(6,2.5,26);const r=new In;r.background=new Xe("#000000");const d=new ce(1,.25,.6).normalize(),l=new Ua(16777215,2.2);l.position.copy(d).multiplyScalar(100),r.add(l),r.add(new ws(2241348,.25)),r.add(pp());const v=new $n;v.rotation.z=Dt.degToRad(23.4),r.add(v);const S=new $n;v.add(S);const A=new Rr(1,128,96),M=new ut(A,new Nn({color:"#1d4f91",roughness:.8}));M.scale.set(zt,sa,zt),S.add(M);const T=new In,x=new ut(A,new Pi({side:xt,colorWrite:!1,depthWrite:!1,depthTest:!0,stencilWrite:!0,stencilRef:Jt,stencilFunc:ya,stencilZPass:La,stencilFail:Gt,stencilZFail:Gt}));T.add(x);const I=new $n;I.rotation.x=Dt.degToRad(-8),r.add(I);const y=new ut(new Rr(1.737,64,48),new Nn({color:"#b8b4ac",roughness:.95}));I.add(y);const f=new ju(a,t.domElement);f.enableDamping=!0,f.minDistance=zt*1.02,f.maxDistance=400,f.zoomSpeed=.6,f.rotateSpeed=.5;const o=()=>{const F=a.position.length()-zt;f.rotateSpeed=Dt.clamp(F/20,.02,.5)};window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix()});const E=new Ia;let _=e.startTime??0;const g=()=>{S.rotation.y=_*dp;const F=_*.12;y.position.set(Math.cos(F)*16,0,Math.sin(F)*16),r.updateMatrixWorld(),x.matrixAutoUpdate=!1,x.matrix.copy(S.matrixWorld).multiply(new Mt().makeScale(zt*si,sa*si,zt*si)),x.matrixWorldNeedsUpdate=!0};let L=0;const R=()=>(a.updateMatrixWorld(),n.tick(_,up(a,S)));g(),R();const D=()=>{const F=i.hasFrame;M.visible=!F,t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,a),F&&(t.render(T,a),t.clearDepth(),i.drain(),t.resetState());const m=Math.min(E.getDelta(),.1);e.paused||(_+=m),o(),f.update(m),g(),R()===null?L+=1:L=0,e.onLag(L),requestAnimationFrame(D)};D()},li=new Mt,la=new ce,ca=new ce,da=new ce,ci=new Ge,di=(e,n)=>[e.x*n,-e.z*n,e.y*n],up=(e,n)=>(li.copy(n.matrixWorld).invert(),ci.setFromMatrix4(li),la.setFromMatrixPosition(e.matrixWorld).applyMatrix4(li),e.getWorldDirection(ca).applyMatrix3(ci).normalize(),da.set(0,1,0).applyQuaternion(e.quaternion).applyMatrix3(ci).normalize(),{position:di(la,yi),direction:di(ca,1),up:di(da,1),fovy:Dt.degToRad(e.fov)}),pp=()=>{const n=new Float32Array(12e3),t=new ce;let i=7;const a=()=>(i=i*16807%2147483647,i/2147483647);for(let d=0;d<4e3;d+=1)t.set(a()*2-1,a()*2-1,a()*2-1).normalize().multiplyScalar(5e3),n.set([t.x,t.y,t.z],d*3);const r=new wi;return r.setAttribute("position",new ln(n,3)),new Cs(r,new Ps({color:16777215,size:1.6,sizeAttenuation:!1}))};Mu("netgl-cesium");const Gn=Ds(location.search),xi=new URLSearchParams(location.search),fa=document.querySelector("#app"),Ai=document.querySelector("#guest"),ua=document.querySelector("#status"),hp=document.querySelector("#lag"),Ka=new URLSearchParams({mode:Gn}),pa=xi.get("imagery");pa&&Ka.set("imagery",pa);Ai.src=`cesium.html?${Ka}`;document.querySelectorAll("a[data-mode]").forEach(e=>{const n=new URLSearchParams(location.search);n.set("mode",e.dataset.mode),e.href=`?${n}`,e.dataset.mode===Gn&&e.classList.add("current")});document.querySelector(`[data-help="${Gn}"]`).hidden=!1;const ha=e=>{ua.textContent=e,ua.hidden=!1};Gn==="earth"?fp({iframe:Ai,mount:fa,onStatus:ha,startTime:Number(xi.get("time")??0),paused:xi.has("pause"),onLag:e=>{hp.textContent=String(Math.max(0,e))}}):qu({iframe:Ai,mount:fa,onStatus:ha});
