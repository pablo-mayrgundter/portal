import{c as kr,N as Ct,S as fr,C as $e,F as dr,d as Jt,V as ze,R as Wr,e as dt,w as yn,W as ti,f as kt,g as rt,L as Yt,H as vn,U as yt,D as Mt,B as vt,h as jt,j as gn,p as zr,E as Xr,k as ut,P as $t,A as Kr,l as An,n as At,o as hn,q as Yn,r as en,t as tn,u as ur,v as Yr,x as Gt,y as _n,z as qr,G as $r,I as Kt,O as Zr,J as Qr,K as Jr,Q as jr,T as ea,X as ta,Y as na,Z as ia,_ as ra,$ as aa,a0 as oa,a1 as sa,a2 as ca,a3 as la,a4 as fa,a5 as da,a6 as ua,a7 as pa,a8 as xn,a9 as Ht,aa as on,ab as ha,ac as Zt,ad as _a,ae as ma,af as va,ag as ga,ah as pr,ai as Ea,aj as Sa,ak as Ta,al as Ma,am as He,an as Aa,ao as xa,ap as Ra,aq as Ft,ar as Qt,as as xt,at as Rt,au as hr,av as Nt,aw as Tt,ax as mn,ay as _r,az as mr,aA as vr,aB as gr,aC as Ca,aD as ba,aE as Pa,aF as La,aG as Er,aH as wt,aI as Ua,aJ as Da,aK as Ia,aL as Sr,aM as wa,aN as Tr,aO as Mr,aP as Rn,aQ as Cn,aR as bn,aS as Pn,aT as qe,aU as ni,aV as ii,aW as ri,aX as ai,aY as oi,aZ as si,a_ as ci,a$ as li,b0 as fi,b1 as di,b2 as ui,b3 as pi,b4 as hi,b5 as _i,b6 as mi,b7 as vi,b8 as gi,b9 as Ei,ba as Si,bb as Ti,bc as Mi,bd as Ai,be as xi,bf as Ri,bg as Ci,bh as bi,bi as Pi,bj as Li,bk as Fn,bl as On,bm as Bn,bn as Gn,bo as Hn,bp as Vn,bq as kn,br as Na,bs as Ui,bt as ya,bu as un,bv as Fa,bw as Di,bx as Ii,by as wi,bz as Wn,bA as zn,bB as Oa,bC as Ar,bD as Ba,bE as En,bF as Ga,bG as Ha,bH as xr,bI as Rr,bJ as Ni,bK as Cr,bL as yi,bM as br,bN as nn,bO as Wt,bP as Va,bQ as ka,bR as Wa,bS as za,bT as Xa,bU as Fi,bV as ft,bW as Ka,bX as Ya,bY as qa,bZ as $a,b_ as Za,b$ as Qa,c0 as Ja,c1 as ja,c2 as eo,c3 as to,c4 as no,c5 as io,c6 as ro,c7 as ao,c8 as oo,c9 as so,ca as co,cb as lo,cc as fo,cd as uo,ce as po,cf as ho,cg as _o,M as sn,ch as Oi,ci as Bi,cj as mo,ck as vo,s as go,cl as cn}from"./points-DDy-mQu0.js";function Pr(){let e=null,n=!1,t=null,i=null;function l(a,d){t(a,d),i=e.requestAnimationFrame(l)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(l),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(a){t=a},setContext:function(a){e=a}}}function Eo(e){const n=new WeakMap;function t(c,x){const T=c.array,L=c.usage,m=T.byteLength,_=e.createBuffer();e.bindBuffer(x,_),e.bufferData(x,T,L),c.onUploadCallback();let S;if(T instanceof Float32Array)S=e.FLOAT;else if(typeof Float16Array<"u"&&T instanceof Float16Array)S=e.HALF_FLOAT;else if(T instanceof Uint16Array)c.isFloat16BufferAttribute?S=e.HALF_FLOAT:S=e.UNSIGNED_SHORT;else if(T instanceof Int16Array)S=e.SHORT;else if(T instanceof Uint32Array)S=e.UNSIGNED_INT;else if(T instanceof Int32Array)S=e.INT;else if(T instanceof Int8Array)S=e.BYTE;else if(T instanceof Uint8Array)S=e.UNSIGNED_BYTE;else if(T instanceof Uint8ClampedArray)S=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+T);return{buffer:_,type:S,bytesPerElement:T.BYTES_PER_ELEMENT,version:c.version,size:m}}function i(c,x,T){const L=x.array,m=x.updateRanges;if(e.bindBuffer(T,c),m.length===0)e.bufferSubData(T,0,L);else{m.sort((S,N)=>S.start-N.start);let _=0;for(let S=1;S<m.length;S++){const N=m[_],g=m[S];g.start<=N.start+N.count+1?N.count=Math.max(N.count,g.start+g.count-N.start):(++_,m[_]=g)}m.length=_+1;for(let S=0,N=m.length;S<N;S++){const g=m[S];e.bufferSubData(T,g.start*L.BYTES_PER_ELEMENT,L,g.start,g.count)}x.clearUpdateRanges()}x.onUploadCallback()}function l(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const x=n.get(c);x&&(e.deleteBuffer(x.buffer),n.delete(c))}function d(c,x){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const L=n.get(c);(!L||L.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const T=n.get(c);if(T===void 0)n.set(c,t(c,x));else if(T.version<c.version){if(T.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(T.buffer,c,x),T.version=c.version}}return{get:l,remove:a,update:d}}var So=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,To=`#ifdef USE_ALPHAHASH
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
#endif`,Mo=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ao=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xo=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ro=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Co=`#ifdef USE_AOMAP
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
#endif`,bo=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Po=`#ifdef USE_BATCHING
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
#endif`,Lo=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Uo=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Do=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Io=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wo=`#ifdef USE_IRIDESCENCE
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
#endif`,No=`#ifdef USE_BUMPMAP
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
#endif`,yo=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Oo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bo=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Go=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ho=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ko=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Wo=`#define PI 3.141592653589793
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
} // validated`,zo=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xo=`vec3 transformedNormal = objectNormal;
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
#endif`,Ko=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yo=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qo=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$o=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zo="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qo=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jo=`#ifdef USE_ENVMAP
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
#endif`,jo=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,es=`#ifdef USE_ENVMAP
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
#endif`,ts=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ns=`#ifdef USE_ENVMAP
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
#endif`,is=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rs=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,as=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,os=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ss=`#ifdef USE_GRADIENTMAP
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
}`,cs=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ls=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fs=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ds=`uniform bool receiveShadow;
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
#endif`,us=`#ifdef USE_ENVMAP
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
#endif`,ps=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hs=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_s=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ms=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vs=`PhysicalMaterial material;
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
#endif`,gs=`struct PhysicalMaterial {
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
}`,Es=`
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
#endif`,Ss=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ts=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ms=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,As=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xs=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rs=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cs=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bs=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ps=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ls=`#if defined( USE_POINTS_UV )
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
#endif`,Us=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ds=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Is=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ws=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ns=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ys=`#ifdef USE_MORPHTARGETS
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
#endif`,Fs=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Os=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Bs=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vs=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ks=`#ifdef USE_NORMALMAP
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
#endif`,Ws=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zs=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xs=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ks=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ys=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qs=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$s=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zs=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qs=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Js=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,js=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ec=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tc=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nc=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ic=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
}`,ac=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,oc=`#ifdef USE_SKINNING
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
#endif`,sc=`#ifdef USE_SKINNING
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
#endif`,lc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fc=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dc=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uc=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pc=`#ifdef USE_TRANSMISSION
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
#endif`,hc=`#ifdef USE_TRANSMISSION
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
#endif`,mc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gc=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ec=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sc=`uniform sampler2D t2D;
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
}`,Mc=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xc=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rc=`#include <common>
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
}`,bc=`#define DISTANCE
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
}`,Lc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Uc=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dc=`uniform float scale;
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
}`,Ic=`uniform vec3 diffuse;
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
}`,wc=`#include <common>
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
}`,Oc=`#define MATCAP
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
}`,Bc=`#define MATCAP
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
}`,Hc=`#define NORMAL
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
}`,Vc=`#define PHONG
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
}`,kc=`#define PHONG
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
}`,zc=`#define STANDARD
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
}`,Xc=`#define TOON
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
}`,Yc=`uniform float size;
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
}`,qc=`uniform vec3 diffuse;
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
}`,Zc=`uniform vec3 color;
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
}`,ye={alphahash_fragment:So,alphahash_pars_fragment:To,alphamap_fragment:Mo,alphamap_pars_fragment:Ao,alphatest_fragment:xo,alphatest_pars_fragment:Ro,aomap_fragment:Co,aomap_pars_fragment:bo,batching_pars_vertex:Po,batching_vertex:Lo,begin_vertex:Uo,beginnormal_vertex:Do,bsdfs:Io,iridescence_fragment:wo,bumpmap_pars_fragment:No,clipping_planes_fragment:yo,clipping_planes_pars_fragment:Fo,clipping_planes_pars_vertex:Oo,clipping_planes_vertex:Bo,color_fragment:Go,color_pars_fragment:Ho,color_pars_vertex:Vo,color_vertex:ko,common:Wo,cube_uv_reflection_fragment:zo,defaultnormal_vertex:Xo,displacementmap_pars_vertex:Ko,displacementmap_vertex:Yo,emissivemap_fragment:qo,emissivemap_pars_fragment:$o,colorspace_fragment:Zo,colorspace_pars_fragment:Qo,envmap_fragment:Jo,envmap_common_pars_fragment:jo,envmap_pars_fragment:es,envmap_pars_vertex:ts,envmap_physical_pars_fragment:us,envmap_vertex:ns,fog_vertex:is,fog_pars_vertex:rs,fog_fragment:as,fog_pars_fragment:os,gradientmap_pars_fragment:ss,lightmap_pars_fragment:cs,lights_lambert_fragment:ls,lights_lambert_pars_fragment:fs,lights_pars_begin:ds,lights_toon_fragment:ps,lights_toon_pars_fragment:hs,lights_phong_fragment:_s,lights_phong_pars_fragment:ms,lights_physical_fragment:vs,lights_physical_pars_fragment:gs,lights_fragment_begin:Es,lights_fragment_maps:Ss,lights_fragment_end:Ts,logdepthbuf_fragment:Ms,logdepthbuf_pars_fragment:As,logdepthbuf_pars_vertex:xs,logdepthbuf_vertex:Rs,map_fragment:Cs,map_pars_fragment:bs,map_particle_fragment:Ps,map_particle_pars_fragment:Ls,metalnessmap_fragment:Us,metalnessmap_pars_fragment:Ds,morphinstance_vertex:Is,morphcolor_vertex:ws,morphnormal_vertex:Ns,morphtarget_pars_vertex:ys,morphtarget_vertex:Fs,normal_fragment_begin:Os,normal_fragment_maps:Bs,normal_pars_fragment:Gs,normal_pars_vertex:Hs,normal_vertex:Vs,normalmap_pars_fragment:ks,clearcoat_normal_fragment_begin:Ws,clearcoat_normal_fragment_maps:zs,clearcoat_pars_fragment:Xs,iridescence_pars_fragment:Ks,opaque_fragment:Ys,packing:qs,premultiplied_alpha_fragment:$s,project_vertex:Zs,dithering_fragment:Qs,dithering_pars_fragment:Js,roughnessmap_fragment:js,roughnessmap_pars_fragment:ec,shadowmap_pars_fragment:tc,shadowmap_pars_vertex:nc,shadowmap_vertex:ic,shadowmask_pars_fragment:rc,skinbase_vertex:ac,skinning_pars_vertex:oc,skinning_vertex:sc,skinnormal_vertex:cc,specularmap_fragment:lc,specularmap_pars_fragment:fc,tonemapping_fragment:dc,tonemapping_pars_fragment:uc,transmission_fragment:pc,transmission_pars_fragment:hc,uv_pars_fragment:_c,uv_pars_vertex:mc,uv_vertex:vc,worldpos_vertex:gc,background_vert:Ec,background_frag:Sc,backgroundCube_vert:Tc,backgroundCube_frag:Mc,cube_vert:Ac,cube_frag:xc,depth_vert:Rc,depth_frag:Cc,distanceRGBA_vert:bc,distanceRGBA_frag:Pc,equirect_vert:Lc,equirect_frag:Uc,linedashed_vert:Dc,linedashed_frag:Ic,meshbasic_vert:wc,meshbasic_frag:Nc,meshlambert_vert:yc,meshlambert_frag:Fc,meshmatcap_vert:Oc,meshmatcap_frag:Bc,meshnormal_vert:Gc,meshnormal_frag:Hc,meshphong_vert:Vc,meshphong_frag:kc,meshphysical_vert:Wc,meshphysical_frag:zc,meshtoon_vert:Xc,meshtoon_frag:Kc,points_vert:Yc,points_frag:qc,shadow_vert:$c,shadow_frag:Zc,sprite_vert:Qc,sprite_frag:Jc},se={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Et={basic:{uniforms:ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:ye.meshbasic_vert,fragmentShader:ye.meshbasic_frag},lambert:{uniforms:ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new $e(0)}}]),vertexShader:ye.meshlambert_vert,fragmentShader:ye.meshlambert_frag},phong:{uniforms:ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:ye.meshphong_vert,fragmentShader:ye.meshphong_frag},standard:{uniforms:ft([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag},toon:{uniforms:ft([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new $e(0)}}]),vertexShader:ye.meshtoon_vert,fragmentShader:ye.meshtoon_frag},matcap:{uniforms:ft([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:ye.meshmatcap_vert,fragmentShader:ye.meshmatcap_frag},points:{uniforms:ft([se.points,se.fog]),vertexShader:ye.points_vert,fragmentShader:ye.points_frag},dashed:{uniforms:ft([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ye.linedashed_vert,fragmentShader:ye.linedashed_frag},depth:{uniforms:ft([se.common,se.displacementmap]),vertexShader:ye.depth_vert,fragmentShader:ye.depth_frag},normal:{uniforms:ft([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:ye.meshnormal_vert,fragmentShader:ye.meshnormal_frag},sprite:{uniforms:ft([se.sprite,se.fog]),vertexShader:ye.sprite_vert,fragmentShader:ye.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ye.background_vert,fragmentShader:ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:ye.backgroundCube_vert,fragmentShader:ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ye.cube_vert,fragmentShader:ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ye.equirect_vert,fragmentShader:ye.equirect_frag},distanceRGBA:{uniforms:ft([se.common,se.displacementmap,{referencePosition:{value:new ze},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ye.distanceRGBA_vert,fragmentShader:ye.distanceRGBA_frag},shadow:{uniforms:ft([se.lights,se.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:ye.shadow_vert,fragmentShader:ye.shadow_frag}};Et.physical={uniforms:ft([Et.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag};const ln={r:0,b:0,g:0},Lt=new Cr,jc=new Jt;function el(e,n,t,i,l,a,d){const c=new $e(0);let x=a===!0?0:1,T,L,m=null,_=0,S=null;function N(R){let E=R.isScene===!0?R.background:null;return E&&E.isTexture&&(E=(R.backgroundBlurriness>0?t:n).get(E)),E}function g(R){let E=!1;const B=N(R);B===null?r(c,x):B&&B.isColor&&(r(B,1),E=!0);const D=e.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,d):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,d),(e.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function s(R,E){const B=N(E);B&&(B.isCubeTexture||B.mapping===En)?(L===void 0&&(L=new Rt(new Rr(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:Ni(Et.backgroundCube.uniforms),vertexShader:Et.backgroundCube.vertexShader,fragmentShader:Et.backgroundCube.fragmentShader,side:vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),L.geometry.deleteAttribute("normal"),L.geometry.deleteAttribute("uv"),L.onBeforeRender=function(D,F,X){this.matrixWorld.copyPosition(X.matrixWorld)},Object.defineProperty(L.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(L)),Lt.copy(E.backgroundRotation),Lt.x*=-1,Lt.y*=-1,Lt.z*=-1,B.isCubeTexture&&B.isRenderTargetTexture===!1&&(Lt.y*=-1,Lt.z*=-1),L.material.uniforms.envMap.value=B,L.material.uniforms.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1,L.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,L.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,L.material.uniforms.backgroundRotation.value.setFromMatrix4(jc.makeRotationFromEuler(Lt)),L.material.toneMapped=rt.getTransfer(B.colorSpace)!==qe,(m!==B||_!==B.version||S!==e.toneMapping)&&(L.material.needsUpdate=!0,m=B,_=B.version,S=e.toneMapping),L.layers.enableAll(),R.unshift(L,L.geometry,L.material,0,0,null)):B&&B.isTexture&&(T===void 0&&(T=new Rt(new gr(2,2),new Ft({name:"BackgroundMaterial",uniforms:Ni(Et.background.uniforms),vertexShader:Et.background.vertexShader,fragmentShader:Et.background.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),T.geometry.deleteAttribute("normal"),Object.defineProperty(T.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(T)),T.material.uniforms.t2D.value=B,T.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,T.material.toneMapped=rt.getTransfer(B.colorSpace)!==qe,B.matrixAutoUpdate===!0&&B.updateMatrix(),T.material.uniforms.uvTransform.value.copy(B.matrix),(m!==B||_!==B.version||S!==e.toneMapping)&&(T.material.needsUpdate=!0,m=B,_=B.version,S=e.toneMapping),T.layers.enableAll(),R.unshift(T,T.geometry,T.material,0,0,null))}function r(R,E){R.getRGB(ln,xr(e)),i.buffers.color.setClear(ln.r,ln.g,ln.b,E,d)}function A(){L!==void 0&&(L.geometry.dispose(),L.material.dispose(),L=void 0),T!==void 0&&(T.geometry.dispose(),T.material.dispose(),T=void 0)}return{getClearColor:function(){return c},setClearColor:function(R,E=1){c.set(R),x=E,r(c,x)},getClearAlpha:function(){return x},setClearAlpha:function(R){x=R,r(c,x)},render:g,addToRenderList:s,dispose:A}}function tl(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},l=_(null);let a=l,d=!1;function c(u,U,H,q,Z){let Q=!1;const K=m(q,H,U);a!==K&&(a=K,T(a.object)),Q=S(u,q,H,Z),Q&&N(u,q,H,Z),Z!==null&&n.update(Z,e.ELEMENT_ARRAY_BUFFER),(Q||d)&&(d=!1,E(u,U,H,q),Z!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Z).buffer))}function x(){return e.createVertexArray()}function T(u){return e.bindVertexArray(u)}function L(u){return e.deleteVertexArray(u)}function m(u,U,H){const q=H.wireframe===!0;let Z=i[u.id];Z===void 0&&(Z={},i[u.id]=Z);let Q=Z[U.id];Q===void 0&&(Q={},Z[U.id]=Q);let K=Q[q];return K===void 0&&(K=_(x()),Q[q]=K),K}function _(u){const U=[],H=[],q=[];for(let Z=0;Z<t;Z++)U[Z]=0,H[Z]=0,q[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:H,attributeDivisors:q,object:u,attributes:{},index:null}}function S(u,U,H,q){const Z=a.attributes,Q=U.attributes;let K=0;const ae=H.getAttributes();for(const k in ae)if(ae[k].location>=0){const Me=Z[k];let Ue=Q[k];if(Ue===void 0&&(k==="instanceMatrix"&&u.instanceMatrix&&(Ue=u.instanceMatrix),k==="instanceColor"&&u.instanceColor&&(Ue=u.instanceColor)),Me===void 0||Me.attribute!==Ue||Ue&&Me.data!==Ue.data)return!0;K++}return a.attributesNum!==K||a.index!==q}function N(u,U,H,q){const Z={},Q=U.attributes;let K=0;const ae=H.getAttributes();for(const k in ae)if(ae[k].location>=0){let Me=Q[k];Me===void 0&&(k==="instanceMatrix"&&u.instanceMatrix&&(Me=u.instanceMatrix),k==="instanceColor"&&u.instanceColor&&(Me=u.instanceColor));const Ue={};Ue.attribute=Me,Me&&Me.data&&(Ue.data=Me.data),Z[k]=Ue,K++}a.attributes=Z,a.attributesNum=K,a.index=q}function g(){const u=a.newAttributes;for(let U=0,H=u.length;U<H;U++)u[U]=0}function s(u){r(u,0)}function r(u,U){const H=a.newAttributes,q=a.enabledAttributes,Z=a.attributeDivisors;H[u]=1,q[u]===0&&(e.enableVertexAttribArray(u),q[u]=1),Z[u]!==U&&(e.vertexAttribDivisor(u,U),Z[u]=U)}function A(){const u=a.newAttributes,U=a.enabledAttributes;for(let H=0,q=U.length;H<q;H++)U[H]!==u[H]&&(e.disableVertexAttribArray(H),U[H]=0)}function R(u,U,H,q,Z,Q,K){K===!0?e.vertexAttribIPointer(u,U,H,Z,Q):e.vertexAttribPointer(u,U,H,q,Z,Q)}function E(u,U,H,q){g();const Z=q.attributes,Q=H.getAttributes(),K=U.defaultAttributeValues;for(const ae in Q){const k=Q[ae];if(k.location>=0){let pe=Z[ae];if(pe===void 0&&(ae==="instanceMatrix"&&u.instanceMatrix&&(pe=u.instanceMatrix),ae==="instanceColor"&&u.instanceColor&&(pe=u.instanceColor)),pe!==void 0){const Me=pe.normalized,Ue=pe.itemSize,Be=n.get(pe);if(Be===void 0)continue;const Ze=Be.buffer,Ke=Be.type,Oe=Be.bytesPerElement,W=Ke===e.INT||Ke===e.UNSIGNED_INT||pe.gpuType===Er;if(pe.isInterleavedBufferAttribute){const Y=pe.data,G=Y.stride,C=pe.offset;if(Y.isInstancedInterleavedBuffer){for(let j=0;j<k.locationSize;j++)r(k.location+j,Y.meshPerAttribute);u.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let j=0;j<k.locationSize;j++)s(k.location+j);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let j=0;j<k.locationSize;j++)R(k.location+j,Ue/k.locationSize,Ke,Me,G*Oe,(C+Ue/k.locationSize*j)*Oe,W)}else{if(pe.isInstancedBufferAttribute){for(let Y=0;Y<k.locationSize;Y++)r(k.location+Y,pe.meshPerAttribute);u.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Y=0;Y<k.locationSize;Y++)s(k.location+Y);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let Y=0;Y<k.locationSize;Y++)R(k.location+Y,Ue/k.locationSize,Ke,Me,Ue*Oe,Ue/k.locationSize*Y*Oe,W)}}else if(K!==void 0){const Me=K[ae];if(Me!==void 0)switch(Me.length){case 2:e.vertexAttrib2fv(k.location,Me);break;case 3:e.vertexAttrib3fv(k.location,Me);break;case 4:e.vertexAttrib4fv(k.location,Me);break;default:e.vertexAttrib1fv(k.location,Me)}}}}A()}function B(){X();for(const u in i){const U=i[u];for(const H in U){const q=U[H];for(const Z in q)L(q[Z].object),delete q[Z];delete U[H]}delete i[u]}}function D(u){if(i[u.id]===void 0)return;const U=i[u.id];for(const H in U){const q=U[H];for(const Z in q)L(q[Z].object),delete q[Z];delete U[H]}delete i[u.id]}function F(u){for(const U in i){const H=i[U];if(H[u.id]===void 0)continue;const q=H[u.id];for(const Z in q)L(q[Z].object),delete q[Z];delete H[u.id]}}function X(){h(),d=!0,a!==l&&(a=l,T(a.object))}function h(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:c,reset:X,resetDefaultState:h,dispose:B,releaseStatesOfGeometry:D,releaseStatesOfProgram:F,initAttributes:g,enableAttribute:s,disableUnusedAttributes:A}}function nl(e,n,t){let i;function l(T){i=T}function a(T,L){e.drawArrays(i,T,L),t.update(L,i,1)}function d(T,L,m){m!==0&&(e.drawArraysInstanced(i,T,L,m),t.update(L,i,m))}function c(T,L,m){if(m===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,T,0,L,0,m);let S=0;for(let N=0;N<m;N++)S+=L[N];t.update(S,i,1)}function x(T,L,m,_){if(m===0)return;const S=n.get("WEBGL_multi_draw");if(S===null)for(let N=0;N<T.length;N++)d(T[N],L[N],_[N]);else{S.multiDrawArraysInstancedWEBGL(i,T,0,L,0,_,0,m);let N=0;for(let g=0;g<m;g++)N+=L[g]*_[g];t.update(N,i,1)}}this.setMode=l,this.render=a,this.renderInstances=d,this.renderMultiDraw=c,this.renderMultiDrawInstances=x}function il(e,n,t,i){let l;function a(){if(l!==void 0)return l;if(n.has("EXT_texture_filter_anisotropic")===!0){const F=n.get("EXT_texture_filter_anisotropic");l=e.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function d(F){return!(F!==At&&i.convert(F)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(F){const X=F===vn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(F!==yt&&i.convert(F)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&F!==wt&&!X)}function x(F){if(F==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let T=t.precision!==void 0?t.precision:"highp";const L=x(T);L!==T&&(console.warn("THREE.WebGLRenderer:",T,"not supported, using",L,"instead."),T=L);const m=t.logarithmicDepthBuffer===!0,_=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),S=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),N=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),s=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),r=e.getParameter(e.MAX_VERTEX_ATTRIBS),A=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),R=e.getParameter(e.MAX_VARYING_VECTORS),E=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),B=N>0,D=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:x,textureFormatReadable:d,textureTypeReadable:c,precision:T,logarithmicDepthBuffer:m,reversedDepthBuffer:_,maxTextures:S,maxVertexTextures:N,maxTextureSize:g,maxCubemapSize:s,maxAttributes:r,maxVertexUniforms:A,maxVaryings:R,maxFragmentUniforms:E,vertexTextures:B,maxSamples:D}}function rl(e){const n=this;let t=null,i=0,l=!1,a=!1;const d=new Ma,c=new He,x={value:null,needsUpdate:!1};this.uniform=x,this.numPlanes=0,this.numIntersection=0,this.init=function(m,_){const S=m.length!==0||_||i!==0||l;return l=_,i=m.length,S},this.beginShadows=function(){a=!0,L(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(m,_){t=L(m,_,0)},this.setState=function(m,_,S){const N=m.clippingPlanes,g=m.clipIntersection,s=m.clipShadows,r=e.get(m);if(!l||N===null||N.length===0||a&&!s)a?L(null):T();else{const A=a?0:i,R=A*4;let E=r.clippingState||null;x.value=E,E=L(N,_,R,S);for(let B=0;B!==R;++B)E[B]=t[B];r.clippingState=E,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=A}};function T(){x.value!==t&&(x.value=t,x.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function L(m,_,S,N){const g=m!==null?m.length:0;let s=null;if(g!==0){if(s=x.value,N!==!0||s===null){const r=S+g*4,A=_.matrixWorldInverse;c.getNormalMatrix(A),(s===null||s.length<r)&&(s=new Float32Array(r));for(let R=0,E=S;R!==g;++R,E+=4)d.copy(m[R]).applyMatrix4(A,c),d.normal.toArray(s,E),s[E+3]=d.constant}x.value=s,x.needsUpdate=!0}return n.numPlanes=g,n.numIntersection=0,s}}function al(e){let n=new WeakMap;function t(d,c){return c===Wn?d.mapping=nn:c===zn&&(d.mapping=Wt),d}function i(d){if(d&&d.isTexture){const c=d.mapping;if(c===Wn||c===zn)if(n.has(d)){const x=n.get(d).texture;return t(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const T=new Oa(x.height);return T.fromEquirectangularTexture(e,d),n.set(d,T),d.addEventListener("dispose",l),t(T.texture,d.mapping)}else return null}}return d}function l(d){const c=d.target;c.removeEventListener("dispose",l);const x=n.get(c);x!==void 0&&(n.delete(c),x.dispose())}function a(){n=new WeakMap}return{get:i,dispose:a}}const Vt=4,Gi=[.125,.215,.35,.446,.526,.582],It=20,Ln=new Va,Hi=new $e;let Un=null,Dn=0,In=0,wn=!1;const Dt=(1+Math.sqrt(5))/2,Bt=1/Dt,Vi=[new ze(-Dt,Bt,0),new ze(Dt,Bt,0),new ze(-Bt,0,Dt),new ze(Bt,0,Dt),new ze(0,Dt,-Bt),new ze(0,Dt,Bt),new ze(-1,1,-1),new ze(1,1,-1),new ze(-1,1,1),new ze(1,1,1)],ol=new ze;class ki{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,l=100,a={}){const{size:d=256,position:c=ol}=a;Un=this._renderer.getRenderTarget(),Dn=this._renderer.getActiveCubeFace(),In=this._renderer.getActiveMipmapLevel(),wn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const x=this._allocateTargets();return x.depthBuffer=!0,this._sceneToCubeUV(n,i,l,x,c),t>0&&this._blur(x,0,0,t),this._applyPMREM(x),this._cleanup(x),x}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xi(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zi(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(Un,Dn,In),this._renderer.xr.enabled=wn,n.scissorTest=!1,fn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===nn||n.mapping===Wt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Un=this._renderer.getRenderTarget(),Dn=this._renderer.getActiveCubeFace(),In=this._renderer.getActiveMipmapLevel(),wn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ht,minFilter:Ht,generateMipmaps:!1,type:vn,format:At,colorSpace:gn,depthBuffer:!1},l=Wi(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wi(n,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sl(a)),this._blurMaterial=cl(a,n,t)}return l}_compileMaterial(n){const t=new Rt(this._lodPlanes[0],n);this._renderer.compile(t,Ln)}_sceneToCubeUV(n,t,i,l,a){const x=new $t(90,1,t,i),T=[1,-1,1,1,1,1],L=[1,1,1,-1,-1,-1],m=this._renderer,_=m.autoClear,S=m.toneMapping;m.getClearColor(Hi),m.toneMapping=Ct,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(l),m.clearDepth(),m.setRenderTarget(null));const g=new ka({name:"PMREM.Background",side:vt,depthWrite:!1,depthTest:!1}),s=new Rt(new Rr,g);let r=!1;const A=n.background;A?A.isColor&&(g.color.copy(A),n.background=null,r=!0):(g.color.copy(Hi),r=!0);for(let R=0;R<6;R++){const E=R%3;E===0?(x.up.set(0,T[R],0),x.position.set(a.x,a.y,a.z),x.lookAt(a.x+L[R],a.y,a.z)):E===1?(x.up.set(0,0,T[R]),x.position.set(a.x,a.y,a.z),x.lookAt(a.x,a.y+L[R],a.z)):(x.up.set(0,T[R],0),x.position.set(a.x,a.y,a.z),x.lookAt(a.x,a.y,a.z+L[R]));const B=this._cubeSize;fn(l,E*B,R>2?B:0,B,B),m.setRenderTarget(l),r&&m.render(s,x),m.render(n,x)}s.geometry.dispose(),s.material.dispose(),m.toneMapping=S,m.autoClear=_,n.background=A}_textureToCubeUV(n,t){const i=this._renderer,l=n.mapping===nn||n.mapping===Wt;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xi()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zi());const a=l?this._cubemapMaterial:this._equirectMaterial,d=new Rt(this._lodPlanes[0],a),c=a.uniforms;c.envMap.value=n;const x=this._cubeSize;fn(t,0,0,3*x,2*x),i.setRenderTarget(t),i.render(d,Ln)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const l=this._lodPlanes.length;for(let a=1;a<l;a++){const d=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),c=Vi[(l-a-1)%Vi.length];this._blur(n,a-1,a,d,c)}t.autoClear=i}_blur(n,t,i,l,a){const d=this._pingPongRenderTarget;this._halfBlur(n,d,t,i,l,"latitudinal",a),this._halfBlur(d,n,i,i,l,"longitudinal",a)}_halfBlur(n,t,i,l,a,d,c){const x=this._renderer,T=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const L=3,m=new Rt(this._lodPlanes[l],T),_=T.uniforms,S=this._sizeLods[i]-1,N=isFinite(a)?Math.PI/(2*S):2*Math.PI/(2*It-1),g=a/N,s=isFinite(a)?1+Math.floor(L*g):It;s>It&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${s} samples when the maximum is set to ${It}`);const r=[];let A=0;for(let F=0;F<It;++F){const X=F/g,h=Math.exp(-X*X/2);r.push(h),F===0?A+=h:F<s&&(A+=2*h)}for(let F=0;F<r.length;F++)r[F]=r[F]/A;_.envMap.value=n.texture,_.samples.value=s,_.weights.value=r,_.latitudinal.value=d==="latitudinal",c&&(_.poleAxis.value=c);const{_lodMax:R}=this;_.dTheta.value=N,_.mipInt.value=R-i;const E=this._sizeLods[l],B=3*E*(l>R-Vt?l-R+Vt:0),D=4*(this._cubeSize-E);fn(t,B,D,3*E,2*E),x.setRenderTarget(t),x.render(m,Ln)}}function sl(e){const n=[],t=[],i=[];let l=e;const a=e-Vt+1+Gi.length;for(let d=0;d<a;d++){const c=Math.pow(2,l);t.push(c);let x=1/c;d>e-Vt?x=Gi[d-e+Vt-1]:d===0&&(x=0),i.push(x);const T=1/(c-2),L=-T,m=1+T,_=[L,L,m,L,m,m,L,L,m,m,L,m],S=6,N=6,g=3,s=2,r=1,A=new Float32Array(g*N*S),R=new Float32Array(s*N*S),E=new Float32Array(r*N*S);for(let D=0;D<S;D++){const F=D%3*2/3-1,X=D>2?0:-1,h=[F,X,0,F+2/3,X,0,F+2/3,X+1,0,F,X,0,F+2/3,X+1,0,F,X+1,0];A.set(h,g*N*D),R.set(_,s*N*D);const u=[D,D,D,D,D,D];E.set(u,r*N*D)}const B=new Qt;B.setAttribute("position",new xt(A,g)),B.setAttribute("uv",new xt(R,s)),B.setAttribute("faceIndex",new xt(E,r)),n.push(B),l>Vt&&l--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function Wi(e,n,t){const i=new kt(e,n,t);return i.texture.mapping=En,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fn(e,n,t,i,l){e.viewport.set(n,t,i,l),e.scissor.set(n,t,i,l)}function cl(e,n,t){const i=new Float32Array(It),l=new ze(0,1,0);return new Ft({name:"SphericalGaussianBlur",defines:{n:It,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:qn(),fragmentShader:`

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
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function zi(){return new Ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qn(),fragmentShader:`

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
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function Xi(){return new Ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function qn(){return`

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
	`}function ll(e){let n=new WeakMap,t=null;function i(c){if(c&&c.isTexture){const x=c.mapping,T=x===Wn||x===zn,L=x===nn||x===Wt;if(T||L){let m=n.get(c);const _=m!==void 0?m.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==_)return t===null&&(t=new ki(e)),m=T?t.fromEquirectangular(c,m):t.fromCubemap(c,m),m.texture.pmremVersion=c.pmremVersion,n.set(c,m),m.texture;if(m!==void 0)return m.texture;{const S=c.image;return T&&S&&S.height>0||L&&S&&l(S)?(t===null&&(t=new ki(e)),m=T?t.fromEquirectangular(c):t.fromCubemap(c),m.texture.pmremVersion=c.pmremVersion,n.set(c,m),c.addEventListener("dispose",a),m.texture):null}}}return c}function l(c){let x=0;const T=6;for(let L=0;L<T;L++)c[L]!==void 0&&x++;return x===T}function a(c){const x=c.target;x.removeEventListener("dispose",a);const T=n.get(x);T!==void 0&&(n.delete(x),T.dispose())}function d(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:d}}function fl(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let l;switch(i){case"WEBGL_depth_texture":l=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=e.getExtension(i)}return n[i]=l,l}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const l=t(i);return l===null&&yn("THREE.WebGLRenderer: "+i+" extension not supported."),l}}}function dl(e,n,t,i){const l={},a=new WeakMap;function d(m){const _=m.target;_.index!==null&&n.remove(_.index);for(const N in _.attributes)n.remove(_.attributes[N]);_.removeEventListener("dispose",d),delete l[_.id];const S=a.get(_);S&&(n.remove(S),a.delete(_)),i.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(m,_){return l[_.id]===!0||(_.addEventListener("dispose",d),l[_.id]=!0,t.memory.geometries++),_}function x(m){const _=m.attributes;for(const S in _)n.update(_[S],e.ARRAY_BUFFER)}function T(m){const _=[],S=m.index,N=m.attributes.position;let g=0;if(S!==null){const A=S.array;g=S.version;for(let R=0,E=A.length;R<E;R+=3){const B=A[R+0],D=A[R+1],F=A[R+2];_.push(B,D,D,F,F,B)}}else if(N!==void 0){const A=N.array;g=N.version;for(let R=0,E=A.length/3-1;R<E;R+=3){const B=R+0,D=R+1,F=R+2;_.push(B,D,D,F,F,B)}}else return;const s=new(Xa(_)?Wa:za)(_,1);s.version=g;const r=a.get(m);r&&n.remove(r),a.set(m,s)}function L(m){const _=a.get(m);if(_){const S=m.index;S!==null&&_.version<S.version&&T(m)}else T(m);return a.get(m)}return{get:c,update:x,getWireframeAttribute:L}}function ul(e,n,t){let i;function l(_){i=_}let a,d;function c(_){a=_.type,d=_.bytesPerElement}function x(_,S){e.drawElements(i,S,a,_*d),t.update(S,i,1)}function T(_,S,N){N!==0&&(e.drawElementsInstanced(i,S,a,_*d,N),t.update(S,i,N))}function L(_,S,N){if(N===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,S,0,a,_,0,N);let s=0;for(let r=0;r<N;r++)s+=S[r];t.update(s,i,1)}function m(_,S,N,g){if(N===0)return;const s=n.get("WEBGL_multi_draw");if(s===null)for(let r=0;r<_.length;r++)T(_[r]/d,S[r],g[r]);else{s.multiDrawElementsInstancedWEBGL(i,S,0,a,_,0,g,0,N);let r=0;for(let A=0;A<N;A++)r+=S[A]*g[A];t.update(r,i,1)}}this.setMode=l,this.setIndex=c,this.render=x,this.renderInstances=T,this.renderMultiDraw=L,this.renderMultiDrawInstances=m}function pl(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,d,c){switch(t.calls++,d){case e.TRIANGLES:t.triangles+=c*(a/3);break;case e.LINES:t.lines+=c*(a/2);break;case e.LINE_STRIP:t.lines+=c*(a-1);break;case e.LINE_LOOP:t.lines+=c*a;break;case e.POINTS:t.points+=c*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function l(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:l,update:i}}function hl(e,n,t){const i=new WeakMap,l=new dt;function a(d,c,x){const T=d.morphTargetInfluences,L=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,m=L!==void 0?L.length:0;let _=i.get(c);if(_===void 0||_.count!==m){let h=function(){F.dispose(),i.delete(c),c.removeEventListener("dispose",h)};_!==void 0&&_.texture.dispose();const S=c.morphAttributes.position!==void 0,N=c.morphAttributes.normal!==void 0,g=c.morphAttributes.color!==void 0,s=c.morphAttributes.position||[],r=c.morphAttributes.normal||[],A=c.morphAttributes.color||[];let R=0;S===!0&&(R=1),N===!0&&(R=2),g===!0&&(R=3);let E=c.attributes.position.count*R,B=1;E>n.maxTextureSize&&(B=Math.ceil(E/n.maxTextureSize),E=n.maxTextureSize);const D=new Float32Array(E*B*4*m),F=new Ar(D,E,B,m);F.type=wt,F.needsUpdate=!0;const X=R*4;for(let u=0;u<m;u++){const U=s[u],H=r[u],q=A[u],Z=E*B*4*u;for(let Q=0;Q<U.count;Q++){const K=Q*X;S===!0&&(l.fromBufferAttribute(U,Q),D[Z+K+0]=l.x,D[Z+K+1]=l.y,D[Z+K+2]=l.z,D[Z+K+3]=0),N===!0&&(l.fromBufferAttribute(H,Q),D[Z+K+4]=l.x,D[Z+K+5]=l.y,D[Z+K+6]=l.z,D[Z+K+7]=0),g===!0&&(l.fromBufferAttribute(q,Q),D[Z+K+8]=l.x,D[Z+K+9]=l.y,D[Z+K+10]=l.z,D[Z+K+11]=q.itemSize===4?l.w:1)}}_={count:m,texture:F,size:new ut(E,B)},i.set(c,_),c.addEventListener("dispose",h)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)x.getUniforms().setValue(e,"morphTexture",d.morphTexture,t);else{let S=0;for(let g=0;g<T.length;g++)S+=T[g];const N=c.morphTargetsRelative?1:1-S;x.getUniforms().setValue(e,"morphTargetBaseInfluence",N),x.getUniforms().setValue(e,"morphTargetInfluences",T)}x.getUniforms().setValue(e,"morphTargetsTexture",_.texture,t),x.getUniforms().setValue(e,"morphTargetsTextureSize",_.size)}return{update:a}}function _l(e,n,t,i){let l=new WeakMap;function a(x){const T=i.render.frame,L=x.geometry,m=n.get(x,L);if(l.get(m)!==T&&(n.update(m),l.set(m,T)),x.isInstancedMesh&&(x.hasEventListener("dispose",c)===!1&&x.addEventListener("dispose",c),l.get(x)!==T&&(t.update(x.instanceMatrix,e.ARRAY_BUFFER),x.instanceColor!==null&&t.update(x.instanceColor,e.ARRAY_BUFFER),l.set(x,T))),x.isSkinnedMesh){const _=x.skeleton;l.get(_)!==T&&(_.update(),l.set(_,T))}return m}function d(){l=new WeakMap}function c(x){const T=x.target;T.removeEventListener("dispose",c),t.remove(T.instanceMatrix),T.instanceColor!==null&&t.remove(T.instanceColor)}return{update:a,dispose:d}}const Lr=new io,Ki=new ur(1,1),Ur=new Ar,Dr=new no,Ir=new to,Yi=[],qi=[],$i=new Float32Array(16),Zi=new Float32Array(9),Qi=new Float32Array(4);function zt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const l=n*t;let a=Yi[l];if(a===void 0&&(a=new Float32Array(l),Yi[l]=a),n!==0){i.toArray(a,0);for(let d=1,c=0;d!==n;++d)c+=t,e[d].toArray(a,c)}return a}function at(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function ot(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Sn(e,n){let t=qi[n];t===void 0&&(t=new Int32Array(n),qi[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function ml(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function vl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(at(t,n))return;e.uniform2fv(this.addr,n),ot(t,n)}}function gl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(at(t,n))return;e.uniform3fv(this.addr,n),ot(t,n)}}function El(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(at(t,n))return;e.uniform4fv(this.addr,n),ot(t,n)}}function Sl(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(at(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),ot(t,n)}else{if(at(t,i))return;Qi.set(i),e.uniformMatrix2fv(this.addr,!1,Qi),ot(t,i)}}function Tl(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(at(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),ot(t,n)}else{if(at(t,i))return;Zi.set(i),e.uniformMatrix3fv(this.addr,!1,Zi),ot(t,i)}}function Ml(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(at(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),ot(t,n)}else{if(at(t,i))return;$i.set(i),e.uniformMatrix4fv(this.addr,!1,$i),ot(t,i)}}function Al(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function xl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(at(t,n))return;e.uniform2iv(this.addr,n),ot(t,n)}}function Rl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(at(t,n))return;e.uniform3iv(this.addr,n),ot(t,n)}}function Cl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(at(t,n))return;e.uniform4iv(this.addr,n),ot(t,n)}}function bl(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Pl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(at(t,n))return;e.uniform2uiv(this.addr,n),ot(t,n)}}function Ll(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(at(t,n))return;e.uniform3uiv(this.addr,n),ot(t,n)}}function Ul(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(at(t,n))return;e.uniform4uiv(this.addr,n),ot(t,n)}}function Dl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l);let a;this.type===e.SAMPLER_2D_SHADOW?(Ki.compareFunction=pr,a=Ki):a=Lr,t.setTexture2D(n||a,l)}function Il(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTexture3D(n||Dr,l)}function wl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTextureCube(n||Ir,l)}function Nl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTexture2DArray(n||Ur,l)}function yl(e){switch(e){case 5126:return ml;case 35664:return vl;case 35665:return gl;case 35666:return El;case 35674:return Sl;case 35675:return Tl;case 35676:return Ml;case 5124:case 35670:return Al;case 35667:case 35671:return xl;case 35668:case 35672:return Rl;case 35669:case 35673:return Cl;case 5125:return bl;case 36294:return Pl;case 36295:return Ll;case 36296:return Ul;case 35678:case 36198:case 36298:case 36306:case 35682:return Dl;case 35679:case 36299:case 36307:return Il;case 35680:case 36300:case 36308:case 36293:return wl;case 36289:case 36303:case 36311:case 36292:return Nl}}function Fl(e,n){e.uniform1fv(this.addr,n)}function Ol(e,n){const t=zt(n,this.size,2);e.uniform2fv(this.addr,t)}function Bl(e,n){const t=zt(n,this.size,3);e.uniform3fv(this.addr,t)}function Gl(e,n){const t=zt(n,this.size,4);e.uniform4fv(this.addr,t)}function Hl(e,n){const t=zt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Vl(e,n){const t=zt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function kl(e,n){const t=zt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Wl(e,n){e.uniform1iv(this.addr,n)}function zl(e,n){e.uniform2iv(this.addr,n)}function Xl(e,n){e.uniform3iv(this.addr,n)}function Kl(e,n){e.uniform4iv(this.addr,n)}function Yl(e,n){e.uniform1uiv(this.addr,n)}function ql(e,n){e.uniform2uiv(this.addr,n)}function $l(e,n){e.uniform3uiv(this.addr,n)}function Zl(e,n){e.uniform4uiv(this.addr,n)}function Ql(e,n,t){const i=this.cache,l=n.length,a=Sn(t,l);at(i,a)||(e.uniform1iv(this.addr,a),ot(i,a));for(let d=0;d!==l;++d)t.setTexture2D(n[d]||Lr,a[d])}function Jl(e,n,t){const i=this.cache,l=n.length,a=Sn(t,l);at(i,a)||(e.uniform1iv(this.addr,a),ot(i,a));for(let d=0;d!==l;++d)t.setTexture3D(n[d]||Dr,a[d])}function jl(e,n,t){const i=this.cache,l=n.length,a=Sn(t,l);at(i,a)||(e.uniform1iv(this.addr,a),ot(i,a));for(let d=0;d!==l;++d)t.setTextureCube(n[d]||Ir,a[d])}function ef(e,n,t){const i=this.cache,l=n.length,a=Sn(t,l);at(i,a)||(e.uniform1iv(this.addr,a),ot(i,a));for(let d=0;d!==l;++d)t.setTexture2DArray(n[d]||Ur,a[d])}function tf(e){switch(e){case 5126:return Fl;case 35664:return Ol;case 35665:return Bl;case 35666:return Gl;case 35674:return Hl;case 35675:return Vl;case 35676:return kl;case 5124:case 35670:return Wl;case 35667:case 35671:return zl;case 35668:case 35672:return Xl;case 35669:case 35673:return Kl;case 5125:return Yl;case 36294:return ql;case 36295:return $l;case 36296:return Zl;case 35678:case 36198:case 36298:case 36306:case 35682:return Ql;case 35679:case 36299:case 36307:return Jl;case 35680:case 36300:case 36308:case 36293:return jl;case 36289:case 36303:case 36311:case 36292:return ef}}class nf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=yl(t.type)}}class rf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tf(t.type)}}class af{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const l=this.seq;for(let a=0,d=l.length;a!==d;++a){const c=l[a];c.setValue(n,t[c.id],i)}}}const Nn=/(\w+)(\])?(\[|\.)?/g;function Ji(e,n){e.seq.push(n),e.map[n.id]=n}function of(e,n,t){const i=e.name,l=i.length;for(Nn.lastIndex=0;;){const a=Nn.exec(i),d=Nn.lastIndex;let c=a[1];const x=a[2]==="]",T=a[3];if(x&&(c=c|0),T===void 0||T==="["&&d+2===l){Ji(t,T===void 0?new nf(c,e,n):new rf(c,e,n));break}else{let m=t.map[c];m===void 0&&(m=new af(c),Ji(t,m)),t=m}}}class pn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let l=0;l<i;++l){const a=n.getActiveUniform(t,l),d=n.getUniformLocation(t,a.name);of(a,d,this)}}setValue(n,t,i,l){const a=this.map[t];a!==void 0&&a.setValue(n,i,l)}setOptional(n,t,i){const l=t[i];l!==void 0&&this.setValue(n,i,l)}static upload(n,t,i,l){for(let a=0,d=t.length;a!==d;++a){const c=t[a],x=i[c.id];x.needsUpdate!==!1&&c.setValue(n,x.value,l)}}static seqWithValue(n,t){const i=[];for(let l=0,a=n.length;l!==a;++l){const d=n[l];d.id in t&&i.push(d)}return i}}function ji(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const sf=37297;let cf=0;function lf(e,n){const t=e.split(`
`),i=[],l=Math.max(n-6,0),a=Math.min(n+6,t.length);for(let d=l;d<a;d++){const c=d+1;i.push(`${c===n?">":" "} ${c}: ${t[d]}`)}return i.join(`
`)}const er=new He;function ff(e){rt._getMatrix(er,rt.workingColorSpace,e);const n=`mat3( ${er.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(e)){case br:return[n,"LinearTransferOETF"];case qe:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function tr(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),a=(e.getShaderInfoLog(n)||"").trim();if(i&&a==="")return"";const d=/ERROR: 0:(\d+)/.exec(a);if(d){const c=parseInt(d[1]);return t.toUpperCase()+`

`+a+`

`+lf(e.getShaderSource(n),c)}else return a}function df(e,n){const t=ff(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function uf(e,n){let t;switch(n){case eo:t="Linear";break;case ja:t="Reinhard";break;case Ja:t="Cineon";break;case Qa:t="ACESFilmic";break;case Za:t="AgX";break;case $a:t="Neutral";break;case qa:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const dn=new ze;function pf(){rt.getLuminanceCoefficients(dn);const e=dn.x.toFixed(4),n=dn.y.toFixed(4),t=dn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hf(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qt).join(`
`)}function _f(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function mf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let l=0;l<i;l++){const a=e.getActiveAttrib(n,l),d=a.name;let c=1;a.type===e.FLOAT_MAT2&&(c=2),a.type===e.FLOAT_MAT3&&(c=3),a.type===e.FLOAT_MAT4&&(c=4),t[d]={type:a.type,location:e.getAttribLocation(n,d),locationSize:c}}return t}function qt(e){return e!==""}function nr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function ir(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const vf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xn(e){return e.replace(vf,Ef)}const gf=new Map;function Ef(e,n){let t=ye[n];if(t===void 0){const i=gf.get(n);if(i!==void 0)t=ye[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return Xn(t)}const Sf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rr(e){return e.replace(Sf,Tf)}function Tf(e,n,t,i){let l="";for(let a=parseInt(n);a<parseInt(t);a++)l+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return l}function ar(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}function Mf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===hr?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===Ya?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Tt&&(n="SHADOWMAP_TYPE_VSM"),n}function Af(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case nn:case Wt:n="ENVMAP_TYPE_CUBE";break;case En:n="ENVMAP_TYPE_CUBE_UV";break}return n}function xf(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===Wt&&(n="ENVMAP_MODE_REFRACTION"),n}function Rf(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case so:n="ENVMAP_BLENDING_MULTIPLY";break;case oo:n="ENVMAP_BLENDING_MIX";break;case ao:n="ENVMAP_BLENDING_ADD";break}return n}function Cf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function bf(e,n,t,i){const l=e.getContext(),a=t.defines;let d=t.vertexShader,c=t.fragmentShader;const x=Mf(t),T=Af(t),L=xf(t),m=Rf(t),_=Cf(t),S=hf(t),N=_f(a),g=l.createProgram();let s,r,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(s=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(qt).join(`
`),s.length>0&&(s+=`
`),r=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(qt).join(`
`),r.length>0&&(r+=`
`)):(s=[ar(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+L:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+x:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qt).join(`
`),r=[ar(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+T:"",t.envMap?"#define "+L:"",t.envMap?"#define "+m:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+x:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ct?"#define TONE_MAPPING":"",t.toneMapping!==Ct?ye.tonemapping_pars_fragment:"",t.toneMapping!==Ct?uf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ye.colorspace_pars_fragment,df("linearToOutputTexel",t.outputColorSpace),pf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qt).join(`
`)),d=Xn(d),d=nr(d,t),d=ir(d,t),c=Xn(c),c=nr(c,t),c=ir(c,t),d=rr(d),c=rr(c),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,s=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+s,r=["#define varying in",t.glslVersion===Fi?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+r);const R=A+s+d,E=A+r+c,B=ji(l,l.VERTEX_SHADER,R),D=ji(l,l.FRAGMENT_SHADER,E);l.attachShader(g,B),l.attachShader(g,D),t.index0AttributeName!==void 0?l.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&l.bindAttribLocation(g,0,"position"),l.linkProgram(g);function F(U){if(e.debug.checkShaderErrors){const H=l.getProgramInfoLog(g)||"",q=l.getShaderInfoLog(B)||"",Z=l.getShaderInfoLog(D)||"",Q=H.trim(),K=q.trim(),ae=Z.trim();let k=!0,pe=!0;if(l.getProgramParameter(g,l.LINK_STATUS)===!1)if(k=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(l,g,B,D);else{const Me=tr(l,B,"vertex"),Ue=tr(l,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(g,l.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+Q+`
`+Me+`
`+Ue)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(K===""||ae==="")&&(pe=!1);pe&&(U.diagnostics={runnable:k,programLog:Q,vertexShader:{log:K,prefix:s},fragmentShader:{log:ae,prefix:r}})}l.deleteShader(B),l.deleteShader(D),X=new pn(l,g),h=mf(l,g)}let X;this.getUniforms=function(){return X===void 0&&F(this),X};let h;this.getAttributes=function(){return h===void 0&&F(this),h};let u=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return u===!1&&(u=l.getProgramParameter(g,sf)),u},this.destroy=function(){i.releaseStatesOfProgram(this),l.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cf++,this.cacheKey=n,this.usedTimes=1,this.program=g,this.vertexShader=B,this.fragmentShader=D,this}let Pf=0;class Lf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,l=this._getShaderStage(t),a=this._getShaderStage(i),d=this._getShaderCacheForMaterial(n);return d.has(l)===!1&&(d.add(l),l.usedTimes++),d.has(a)===!1&&(d.add(a),a.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Uf(n),t.set(n,i)),i}}class Uf{constructor(n){this.id=Pf++,this.code=n,this.usedTimes=0}}function Df(e,n,t,i,l,a,d){const c=new Ka,x=new Lf,T=new Set,L=[],m=l.logarithmicDepthBuffer,_=l.vertexTextures;let S=l.precision;const N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(h){return T.add(h),h===0?"uv":`uv${h}`}function s(h,u,U,H,q){const Z=H.fog,Q=q.geometry,K=h.isMeshStandardMaterial?H.environment:null,ae=(h.isMeshStandardMaterial?t:n).get(h.envMap||K),k=ae&&ae.mapping===En?ae.image.height:null,pe=N[h.type];h.precision!==null&&(S=l.getMaxPrecision(h.precision),S!==h.precision&&console.warn("THREE.WebGLProgram.getParameters:",h.precision,"not supported, using",S,"instead."));const Me=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Ue=Me!==void 0?Me.length:0;let Be=0;Q.morphAttributes.position!==void 0&&(Be=1),Q.morphAttributes.normal!==void 0&&(Be=2),Q.morphAttributes.color!==void 0&&(Be=3);let Ze,Ke,Oe,W;if(pe){const Ve=Et[pe];Ze=Ve.vertexShader,Ke=Ve.fragmentShader}else Ze=h.vertexShader,Ke=h.fragmentShader,x.update(h),Oe=x.getVertexShaderID(h),W=x.getFragmentShaderID(h);const Y=e.getRenderTarget(),G=e.state.buffers.depth.getReversed(),C=q.isInstancedMesh===!0,j=q.isBatchedMesh===!0,Ae=!!h.map,Qe=!!h.matcap,v=!!ae,Je=!!h.aoMap,Ie=!!h.lightMap,Pe=!!h.bumpMap,me=!!h.normalMap,je=!!h.displacementMap,ve=!!h.emissiveMap,Ne=!!h.metalnessMap,st=!!h.roughnessMap,it=h.anisotropy>0,p=h.clearcoat>0,o=h.dispersion>0,I=h.iridescence>0,z=h.sheen>0,J=h.transmission>0,V=it&&!!h.anisotropyMap,Te=p&&!!h.clearcoatMap,re=p&&!!h.clearcoatNormalMap,ge=p&&!!h.clearcoatRoughnessMap,Ee=I&&!!h.iridescenceMap,ne=I&&!!h.iridescenceThicknessMap,fe=z&&!!h.sheenColorMap,be=z&&!!h.sheenRoughnessMap,Se=!!h.specularMap,ce=!!h.specularColorMap,we=!!h.specularIntensityMap,M=J&&!!h.transmissionMap,ie=J&&!!h.thicknessMap,oe=!!h.gradientMap,ue=!!h.alphaMap,ee=h.alphaTest>0,$=!!h.alphaHash,_e=!!h.extensions;let De=Ct;h.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(De=e.toneMapping);const Xe={shaderID:pe,shaderType:h.type,shaderName:h.name,vertexShader:Ze,fragmentShader:Ke,defines:h.defines,customVertexShaderID:Oe,customFragmentShaderID:W,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:S,batching:j,batchingColor:j&&q._colorsTexture!==null,instancing:C,instancingColor:C&&q.instanceColor!==null,instancingMorph:C&&q.morphTexture!==null,supportsVertexTextures:_,outputColorSpace:Y===null?e.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:gn,alphaToCoverage:!!h.alphaToCoverage,map:Ae,matcap:Qe,envMap:v,envMapMode:v&&ae.mapping,envMapCubeUVHeight:k,aoMap:Je,lightMap:Ie,bumpMap:Pe,normalMap:me,displacementMap:_&&je,emissiveMap:ve,normalMapObjectSpace:me&&h.normalMapType===Ha,normalMapTangentSpace:me&&h.normalMapType===Ga,metalnessMap:Ne,roughnessMap:st,anisotropy:it,anisotropyMap:V,clearcoat:p,clearcoatMap:Te,clearcoatNormalMap:re,clearcoatRoughnessMap:ge,dispersion:o,iridescence:I,iridescenceMap:Ee,iridescenceThicknessMap:ne,sheen:z,sheenColorMap:fe,sheenRoughnessMap:be,specularMap:Se,specularColorMap:ce,specularIntensityMap:we,transmission:J,transmissionMap:M,thicknessMap:ie,gradientMap:oe,opaque:h.transparent===!1&&h.blending===un&&h.alphaToCoverage===!1,alphaMap:ue,alphaTest:ee,alphaHash:$,combine:h.combine,mapUv:Ae&&g(h.map.channel),aoMapUv:Je&&g(h.aoMap.channel),lightMapUv:Ie&&g(h.lightMap.channel),bumpMapUv:Pe&&g(h.bumpMap.channel),normalMapUv:me&&g(h.normalMap.channel),displacementMapUv:je&&g(h.displacementMap.channel),emissiveMapUv:ve&&g(h.emissiveMap.channel),metalnessMapUv:Ne&&g(h.metalnessMap.channel),roughnessMapUv:st&&g(h.roughnessMap.channel),anisotropyMapUv:V&&g(h.anisotropyMap.channel),clearcoatMapUv:Te&&g(h.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&g(h.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&g(h.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&g(h.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&g(h.sheenColorMap.channel),sheenRoughnessMapUv:be&&g(h.sheenRoughnessMap.channel),specularMapUv:Se&&g(h.specularMap.channel),specularColorMapUv:ce&&g(h.specularColorMap.channel),specularIntensityMapUv:we&&g(h.specularIntensityMap.channel),transmissionMapUv:M&&g(h.transmissionMap.channel),thicknessMapUv:ie&&g(h.thicknessMap.channel),alphaMapUv:ue&&g(h.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(me||it),vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!Q.attributes.uv&&(Ae||ue),fog:!!Z,useFog:h.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:h.flatShading===!0&&h.wireframe===!1,sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:G,skinning:q.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Ue,morphTextureStride:Be,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numSpotLightMaps:u.spotLightMap.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numSpotLightShadowsWithMaps:u.numSpotLightShadowsWithMaps,numLightProbes:u.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:h.dithering,shadowMapEnabled:e.shadowMap.enabled&&U.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:Ae&&h.map.isVideoTexture===!0&&rt.getTransfer(h.map.colorSpace)===qe,decodeVideoTextureEmissive:ve&&h.emissiveMap.isVideoTexture===!0&&rt.getTransfer(h.emissiveMap.colorSpace)===qe,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===Mt,flipSided:h.side===vt,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:_e&&h.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&h.extensions.multiDraw===!0||j)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return Xe.vertexUv1s=T.has(1),Xe.vertexUv2s=T.has(2),Xe.vertexUv3s=T.has(3),T.clear(),Xe}function r(h){const u=[];if(h.shaderID?u.push(h.shaderID):(u.push(h.customVertexShaderID),u.push(h.customFragmentShaderID)),h.defines!==void 0)for(const U in h.defines)u.push(U),u.push(h.defines[U]);return h.isRawShaderMaterial===!1&&(A(u,h),R(u,h),u.push(e.outputColorSpace)),u.push(h.customProgramCacheKey),u.join()}function A(h,u){h.push(u.precision),h.push(u.outputColorSpace),h.push(u.envMapMode),h.push(u.envMapCubeUVHeight),h.push(u.mapUv),h.push(u.alphaMapUv),h.push(u.lightMapUv),h.push(u.aoMapUv),h.push(u.bumpMapUv),h.push(u.normalMapUv),h.push(u.displacementMapUv),h.push(u.emissiveMapUv),h.push(u.metalnessMapUv),h.push(u.roughnessMapUv),h.push(u.anisotropyMapUv),h.push(u.clearcoatMapUv),h.push(u.clearcoatNormalMapUv),h.push(u.clearcoatRoughnessMapUv),h.push(u.iridescenceMapUv),h.push(u.iridescenceThicknessMapUv),h.push(u.sheenColorMapUv),h.push(u.sheenRoughnessMapUv),h.push(u.specularMapUv),h.push(u.specularColorMapUv),h.push(u.specularIntensityMapUv),h.push(u.transmissionMapUv),h.push(u.thicknessMapUv),h.push(u.combine),h.push(u.fogExp2),h.push(u.sizeAttenuation),h.push(u.morphTargetsCount),h.push(u.morphAttributeCount),h.push(u.numDirLights),h.push(u.numPointLights),h.push(u.numSpotLights),h.push(u.numSpotLightMaps),h.push(u.numHemiLights),h.push(u.numRectAreaLights),h.push(u.numDirLightShadows),h.push(u.numPointLightShadows),h.push(u.numSpotLightShadows),h.push(u.numSpotLightShadowsWithMaps),h.push(u.numLightProbes),h.push(u.shadowMapType),h.push(u.toneMapping),h.push(u.numClippingPlanes),h.push(u.numClipIntersection),h.push(u.depthPacking)}function R(h,u){c.disableAll(),u.supportsVertexTextures&&c.enable(0),u.instancing&&c.enable(1),u.instancingColor&&c.enable(2),u.instancingMorph&&c.enable(3),u.matcap&&c.enable(4),u.envMap&&c.enable(5),u.normalMapObjectSpace&&c.enable(6),u.normalMapTangentSpace&&c.enable(7),u.clearcoat&&c.enable(8),u.iridescence&&c.enable(9),u.alphaTest&&c.enable(10),u.vertexColors&&c.enable(11),u.vertexAlphas&&c.enable(12),u.vertexUv1s&&c.enable(13),u.vertexUv2s&&c.enable(14),u.vertexUv3s&&c.enable(15),u.vertexTangents&&c.enable(16),u.anisotropy&&c.enable(17),u.alphaHash&&c.enable(18),u.batching&&c.enable(19),u.dispersion&&c.enable(20),u.batchingColor&&c.enable(21),u.gradientMap&&c.enable(22),h.push(c.mask),c.disableAll(),u.fog&&c.enable(0),u.useFog&&c.enable(1),u.flatShading&&c.enable(2),u.logarithmicDepthBuffer&&c.enable(3),u.reversedDepthBuffer&&c.enable(4),u.skinning&&c.enable(5),u.morphTargets&&c.enable(6),u.morphNormals&&c.enable(7),u.morphColors&&c.enable(8),u.premultipliedAlpha&&c.enable(9),u.shadowMapEnabled&&c.enable(10),u.doubleSided&&c.enable(11),u.flipSided&&c.enable(12),u.useDepthPacking&&c.enable(13),u.dithering&&c.enable(14),u.transmission&&c.enable(15),u.sheen&&c.enable(16),u.opaque&&c.enable(17),u.pointsUvs&&c.enable(18),u.decodeVideoTexture&&c.enable(19),u.decodeVideoTextureEmissive&&c.enable(20),u.alphaToCoverage&&c.enable(21),h.push(c.mask)}function E(h){const u=N[h.type];let U;if(u){const H=Et[u];U=Ba.clone(H.uniforms)}else U=h.uniforms;return U}function B(h,u){let U;for(let H=0,q=L.length;H<q;H++){const Z=L[H];if(Z.cacheKey===u){U=Z,++U.usedTimes;break}}return U===void 0&&(U=new bf(e,u,h,a),L.push(U)),U}function D(h){if(--h.usedTimes===0){const u=L.indexOf(h);L[u]=L[L.length-1],L.pop(),h.destroy()}}function F(h){x.remove(h)}function X(){x.dispose()}return{getParameters:s,getProgramCacheKey:r,getUniforms:E,acquireProgram:B,releaseProgram:D,releaseShaderCache:F,programs:L,dispose:X}}function If(){let e=new WeakMap;function n(d){return e.has(d)}function t(d){let c=e.get(d);return c===void 0&&(c={},e.set(d,c)),c}function i(d){e.delete(d)}function l(d,c,x){e.get(d)[c]=x}function a(){e=new WeakMap}return{has:n,get:t,remove:i,update:l,dispose:a}}function wf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function or(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function sr(){const e=[];let n=0;const t=[],i=[],l=[];function a(){n=0,t.length=0,i.length=0,l.length=0}function d(m,_,S,N,g,s){let r=e[n];return r===void 0?(r={id:m.id,object:m,geometry:_,material:S,groupOrder:N,renderOrder:m.renderOrder,z:g,group:s},e[n]=r):(r.id=m.id,r.object=m,r.geometry=_,r.material=S,r.groupOrder=N,r.renderOrder=m.renderOrder,r.z=g,r.group=s),n++,r}function c(m,_,S,N,g,s){const r=d(m,_,S,N,g,s);S.transmission>0?i.push(r):S.transparent===!0?l.push(r):t.push(r)}function x(m,_,S,N,g,s){const r=d(m,_,S,N,g,s);S.transmission>0?i.unshift(r):S.transparent===!0?l.unshift(r):t.unshift(r)}function T(m,_){t.length>1&&t.sort(m||wf),i.length>1&&i.sort(_||or),l.length>1&&l.sort(_||or)}function L(){for(let m=n,_=e.length;m<_;m++){const S=e[m];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:i,transparent:l,init:a,push:c,unshift:x,finish:L,sort:T}}function Nf(){let e=new WeakMap;function n(i,l){const a=e.get(i);let d;return a===void 0?(d=new sr,e.set(i,[d])):l>=a.length?(d=new sr,a.push(d)):d=a[l],d}function t(){e=new WeakMap}return{get:n,dispose:t}}function yf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new ze,color:new $e};break;case"SpotLight":t={position:new ze,direction:new ze,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ze,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ze,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new ze,halfWidth:new ze,halfHeight:new ze};break}return e[n.id]=t,t}}}function Ff(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Of=0;function Bf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Gf(e){const n=new yf,t=Ff(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let T=0;T<9;T++)i.probe.push(new ze);const l=new ze,a=new Jt,d=new Jt;function c(T){let L=0,m=0,_=0;for(let h=0;h<9;h++)i.probe[h].set(0,0,0);let S=0,N=0,g=0,s=0,r=0,A=0,R=0,E=0,B=0,D=0,F=0;T.sort(Bf);for(let h=0,u=T.length;h<u;h++){const U=T[h],H=U.color,q=U.intensity,Z=U.distance,Q=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)L+=H.r*q,m+=H.g*q,_+=H.b*q;else if(U.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(U.sh.coefficients[K],q);F++}else if(U.isDirectionalLight){const K=n.get(U);if(K.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const ae=U.shadow,k=t.get(U);k.shadowIntensity=ae.intensity,k.shadowBias=ae.bias,k.shadowNormalBias=ae.normalBias,k.shadowRadius=ae.radius,k.shadowMapSize=ae.mapSize,i.directionalShadow[S]=k,i.directionalShadowMap[S]=Q,i.directionalShadowMatrix[S]=U.shadow.matrix,A++}i.directional[S]=K,S++}else if(U.isSpotLight){const K=n.get(U);K.position.setFromMatrixPosition(U.matrixWorld),K.color.copy(H).multiplyScalar(q),K.distance=Z,K.coneCos=Math.cos(U.angle),K.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),K.decay=U.decay,i.spot[g]=K;const ae=U.shadow;if(U.map&&(i.spotLightMap[B]=U.map,B++,ae.updateMatrices(U),U.castShadow&&D++),i.spotLightMatrix[g]=ae.matrix,U.castShadow){const k=t.get(U);k.shadowIntensity=ae.intensity,k.shadowBias=ae.bias,k.shadowNormalBias=ae.normalBias,k.shadowRadius=ae.radius,k.shadowMapSize=ae.mapSize,i.spotShadow[g]=k,i.spotShadowMap[g]=Q,E++}g++}else if(U.isRectAreaLight){const K=n.get(U);K.color.copy(H).multiplyScalar(q),K.halfWidth.set(U.width*.5,0,0),K.halfHeight.set(0,U.height*.5,0),i.rectArea[s]=K,s++}else if(U.isPointLight){const K=n.get(U);if(K.color.copy(U.color).multiplyScalar(U.intensity),K.distance=U.distance,K.decay=U.decay,U.castShadow){const ae=U.shadow,k=t.get(U);k.shadowIntensity=ae.intensity,k.shadowBias=ae.bias,k.shadowNormalBias=ae.normalBias,k.shadowRadius=ae.radius,k.shadowMapSize=ae.mapSize,k.shadowCameraNear=ae.camera.near,k.shadowCameraFar=ae.camera.far,i.pointShadow[N]=k,i.pointShadowMap[N]=Q,i.pointShadowMatrix[N]=U.shadow.matrix,R++}i.point[N]=K,N++}else if(U.isHemisphereLight){const K=n.get(U);K.skyColor.copy(U.color).multiplyScalar(q),K.groundColor.copy(U.groundColor).multiplyScalar(q),i.hemi[r]=K,r++}}s>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2)),i.ambient[0]=L,i.ambient[1]=m,i.ambient[2]=_;const X=i.hash;(X.directionalLength!==S||X.pointLength!==N||X.spotLength!==g||X.rectAreaLength!==s||X.hemiLength!==r||X.numDirectionalShadows!==A||X.numPointShadows!==R||X.numSpotShadows!==E||X.numSpotMaps!==B||X.numLightProbes!==F)&&(i.directional.length=S,i.spot.length=g,i.rectArea.length=s,i.point.length=N,i.hemi.length=r,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=E+B-D,i.spotLightMap.length=B,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=F,X.directionalLength=S,X.pointLength=N,X.spotLength=g,X.rectAreaLength=s,X.hemiLength=r,X.numDirectionalShadows=A,X.numPointShadows=R,X.numSpotShadows=E,X.numSpotMaps=B,X.numLightProbes=F,i.version=Of++)}function x(T,L){let m=0,_=0,S=0,N=0,g=0;const s=L.matrixWorldInverse;for(let r=0,A=T.length;r<A;r++){const R=T[r];if(R.isDirectionalLight){const E=i.directional[m];E.direction.setFromMatrixPosition(R.matrixWorld),l.setFromMatrixPosition(R.target.matrixWorld),E.direction.sub(l),E.direction.transformDirection(s),m++}else if(R.isSpotLight){const E=i.spot[S];E.position.setFromMatrixPosition(R.matrixWorld),E.position.applyMatrix4(s),E.direction.setFromMatrixPosition(R.matrixWorld),l.setFromMatrixPosition(R.target.matrixWorld),E.direction.sub(l),E.direction.transformDirection(s),S++}else if(R.isRectAreaLight){const E=i.rectArea[N];E.position.setFromMatrixPosition(R.matrixWorld),E.position.applyMatrix4(s),d.identity(),a.copy(R.matrixWorld),a.premultiply(s),d.extractRotation(a),E.halfWidth.set(R.width*.5,0,0),E.halfHeight.set(0,R.height*.5,0),E.halfWidth.applyMatrix4(d),E.halfHeight.applyMatrix4(d),N++}else if(R.isPointLight){const E=i.point[_];E.position.setFromMatrixPosition(R.matrixWorld),E.position.applyMatrix4(s),_++}else if(R.isHemisphereLight){const E=i.hemi[g];E.direction.setFromMatrixPosition(R.matrixWorld),E.direction.transformDirection(s),g++}}}return{setup:c,setupView:x,state:i}}function cr(e){const n=new Gf(e),t=[],i=[];function l(L){T.camera=L,t.length=0,i.length=0}function a(L){t.push(L)}function d(L){i.push(L)}function c(){n.setup(t)}function x(L){n.setupView(t,L)}const T={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:l,state:T,setupLights:c,setupLightsView:x,pushLight:a,pushShadow:d}}function Hf(e){let n=new WeakMap;function t(l,a=0){const d=n.get(l);let c;return d===void 0?(c=new cr(e),n.set(l,[c])):a>=d.length?(c=new cr(e),d.push(c)):c=d[a],c}function i(){n=new WeakMap}return{get:t,dispose:i}}const Vf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kf=`uniform sampler2D shadow_pass;
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
}`;function Wf(e,n,t){let i=new dr;const l=new ut,a=new ut,d=new dt,c=new Aa({depthPacking:xa}),x=new Ra,T={},L=t.maxTextureSize,m={[jt]:vt,[vt]:jt,[Mt]:Mt},_=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:Vf,fragmentShader:kf}),S=_.clone();S.defines.HORIZONTAL_PASS=1;const N=new Qt;N.setAttribute("position",new xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Rt(N,_),s=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hr;let r=this.type;this.render=function(D,F,X){if(s.enabled===!1||s.autoUpdate===!1&&s.needsUpdate===!1||D.length===0)return;const h=e.getRenderTarget(),u=e.getActiveCubeFace(),U=e.getActiveMipmapLevel(),H=e.state;H.setBlending(Nt),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const q=r!==Tt&&this.type===Tt,Z=r===Tt&&this.type!==Tt;for(let Q=0,K=D.length;Q<K;Q++){const ae=D[Q],k=ae.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",ae,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;l.copy(k.mapSize);const pe=k.getFrameExtents();if(l.multiply(pe),a.copy(k.mapSize),(l.x>L||l.y>L)&&(l.x>L&&(a.x=Math.floor(L/pe.x),l.x=a.x*pe.x,k.mapSize.x=a.x),l.y>L&&(a.y=Math.floor(L/pe.y),l.y=a.y*pe.y,k.mapSize.y=a.y)),k.map===null||q===!0||Z===!0){const Ue=this.type!==Tt?{minFilter:Zt,magFilter:Zt}:{};k.map!==null&&k.map.dispose(),k.map=new kt(l.x,l.y,Ue),k.map.texture.name=ae.name+".shadowMap",k.camera.updateProjectionMatrix()}e.setRenderTarget(k.map),e.clear();const Me=k.getViewportCount();for(let Ue=0;Ue<Me;Ue++){const Be=k.getViewport(Ue);d.set(a.x*Be.x,a.y*Be.y,a.x*Be.z,a.y*Be.w),H.viewport(d),k.updateMatrices(ae,Ue),i=k.getFrustum(),E(F,X,k.camera,ae,this.type)}k.isPointLightShadow!==!0&&this.type===Tt&&A(k,X),k.needsUpdate=!1}r=this.type,s.needsUpdate=!1,e.setRenderTarget(h,u,U)};function A(D,F){const X=n.update(g);_.defines.VSM_SAMPLES!==D.blurSamples&&(_.defines.VSM_SAMPLES=D.blurSamples,S.defines.VSM_SAMPLES=D.blurSamples,_.needsUpdate=!0,S.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new kt(l.x,l.y)),_.uniforms.shadow_pass.value=D.map.texture,_.uniforms.resolution.value=D.mapSize,_.uniforms.radius.value=D.radius,e.setRenderTarget(D.mapPass),e.clear(),e.renderBufferDirect(F,null,X,_,g,null),S.uniforms.shadow_pass.value=D.mapPass.texture,S.uniforms.resolution.value=D.mapSize,S.uniforms.radius.value=D.radius,e.setRenderTarget(D.map),e.clear(),e.renderBufferDirect(F,null,X,S,g,null)}function R(D,F,X,h){let u=null;const U=X.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(U!==void 0)u=U;else if(u=X.isPointLight===!0?x:c,e.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){const H=u.uuid,q=F.uuid;let Z=T[H];Z===void 0&&(Z={},T[H]=Z);let Q=Z[q];Q===void 0&&(Q=u.clone(),Z[q]=Q,F.addEventListener("dispose",B)),u=Q}if(u.visible=F.visible,u.wireframe=F.wireframe,h===Tt?u.side=F.shadowSide!==null?F.shadowSide:F.side:u.side=F.shadowSide!==null?F.shadowSide:m[F.side],u.alphaMap=F.alphaMap,u.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,u.map=F.map,u.clipShadows=F.clipShadows,u.clippingPlanes=F.clippingPlanes,u.clipIntersection=F.clipIntersection,u.displacementMap=F.displacementMap,u.displacementScale=F.displacementScale,u.displacementBias=F.displacementBias,u.wireframeLinewidth=F.wireframeLinewidth,u.linewidth=F.linewidth,X.isPointLight===!0&&u.isMeshDistanceMaterial===!0){const H=e.properties.get(u);H.light=X}return u}function E(D,F,X,h,u){if(D.visible===!1)return;if(D.layers.test(F.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&u===Tt)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,D.matrixWorld);const q=n.update(D),Z=D.material;if(Array.isArray(Z)){const Q=q.groups;for(let K=0,ae=Q.length;K<ae;K++){const k=Q[K],pe=Z[k.materialIndex];if(pe&&pe.visible){const Me=R(D,pe,h,u);D.onBeforeShadow(e,D,F,X,q,Me,k),e.renderBufferDirect(X,null,q,Me,D,k),D.onAfterShadow(e,D,F,X,q,Me,k)}}}else if(Z.visible){const Q=R(D,Z,h,u);D.onBeforeShadow(e,D,F,X,q,Q,null),e.renderBufferDirect(X,null,q,Q,D,null),D.onAfterShadow(e,D,F,X,q,Q,null)}}const H=D.children;for(let q=0,Z=H.length;q<Z;q++)E(H[q],F,X,h,u)}function B(D){D.target.removeEventListener("dispose",B);for(const X in T){const h=T[X],u=D.target.uuid;u in h&&(h[u].dispose(),delete h[u])}}}const zf={[kn]:Vn,[Hn]:On,[Gn]:Fn,[_n]:Bn,[Vn]:kn,[On]:Hn,[Fn]:Gn,[Bn]:_n};function Xf(e,n){function t(){let M=!1;const ie=new dt;let oe=null;const ue=new dt(0,0,0,0);return{setMask:function(ee){oe!==ee&&!M&&(e.colorMask(ee,ee,ee,ee),oe=ee)},setLocked:function(ee){M=ee},setClear:function(ee,$,_e,De,Xe){Xe===!0&&(ee*=De,$*=De,_e*=De),ie.set(ee,$,_e,De),ue.equals(ie)===!1&&(e.clearColor(ee,$,_e,De),ue.copy(ie))},reset:function(){M=!1,oe=null,ue.set(-1,0,0,0)}}}function i(){let M=!1,ie=!1,oe=null,ue=null,ee=null;return{setReversed:function($){if(ie!==$){const _e=n.get("EXT_clip_control");$?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ie=$;const De=ee;ee=null,this.setClear(De)}},getReversed:function(){return ie},setTest:function($){$?Y(e.DEPTH_TEST):G(e.DEPTH_TEST)},setMask:function($){oe!==$&&!M&&(e.depthMask($),oe=$)},setFunc:function($){if(ie&&($=zf[$]),ue!==$){switch($){case kn:e.depthFunc(e.NEVER);break;case Vn:e.depthFunc(e.ALWAYS);break;case Hn:e.depthFunc(e.LESS);break;case _n:e.depthFunc(e.LEQUAL);break;case Gn:e.depthFunc(e.EQUAL);break;case Bn:e.depthFunc(e.GEQUAL);break;case On:e.depthFunc(e.GREATER);break;case Fn:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ue=$}},setLocked:function($){M=$},setClear:function($){ee!==$&&(ie&&($=1-$),e.clearDepth($),ee=$)},reset:function(){M=!1,oe=null,ue=null,ee=null,ie=!1}}}function l(){let M=!1,ie=null,oe=null,ue=null,ee=null,$=null,_e=null,De=null,Xe=null;return{setTest:function(Ve){M||(Ve?Y(e.STENCIL_TEST):G(e.STENCIL_TEST))},setMask:function(Ve){ie!==Ve&&!M&&(e.stencilMask(Ve),ie=Ve)},setFunc:function(Ve,St,gt){(oe!==Ve||ue!==St||ee!==gt)&&(e.stencilFunc(Ve,St,gt),oe=Ve,ue=St,ee=gt)},setOp:function(Ve,St,gt){($!==Ve||_e!==St||De!==gt)&&(e.stencilOp(Ve,St,gt),$=Ve,_e=St,De=gt)},setLocked:function(Ve){M=Ve},setClear:function(Ve){Xe!==Ve&&(e.clearStencil(Ve),Xe=Ve)},reset:function(){M=!1,ie=null,oe=null,ue=null,ee=null,$=null,_e=null,De=null,Xe=null}}}const a=new t,d=new i,c=new l,x=new WeakMap,T=new WeakMap;let L={},m={},_=new WeakMap,S=[],N=null,g=!1,s=null,r=null,A=null,R=null,E=null,B=null,D=null,F=new $e(0,0,0),X=0,h=!1,u=null,U=null,H=null,q=null,Z=null;const Q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,ae=0;const k=e.getParameter(e.VERSION);k.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(k)[1]),K=ae>=1):k.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),K=ae>=2);let pe=null,Me={};const Ue=e.getParameter(e.SCISSOR_BOX),Be=e.getParameter(e.VIEWPORT),Ze=new dt().fromArray(Ue),Ke=new dt().fromArray(Be);function Oe(M,ie,oe,ue){const ee=new Uint8Array(4),$=e.createTexture();e.bindTexture(M,$),e.texParameteri(M,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(M,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let _e=0;_e<oe;_e++)M===e.TEXTURE_3D||M===e.TEXTURE_2D_ARRAY?e.texImage3D(ie,0,e.RGBA,1,1,ue,0,e.RGBA,e.UNSIGNED_BYTE,ee):e.texImage2D(ie+_e,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ee);return $}const W={};W[e.TEXTURE_2D]=Oe(e.TEXTURE_2D,e.TEXTURE_2D,1),W[e.TEXTURE_CUBE_MAP]=Oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[e.TEXTURE_2D_ARRAY]=Oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),W[e.TEXTURE_3D]=Oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),d.setClear(1),c.setClear(0),Y(e.DEPTH_TEST),d.setFunc(_n),Pe(!1),me(Ui),Y(e.CULL_FACE),Je(Nt);function Y(M){L[M]!==!0&&(e.enable(M),L[M]=!0)}function G(M){L[M]!==!1&&(e.disable(M),L[M]=!1)}function C(M,ie){return m[M]!==ie?(e.bindFramebuffer(M,ie),m[M]=ie,M===e.DRAW_FRAMEBUFFER&&(m[e.FRAMEBUFFER]=ie),M===e.FRAMEBUFFER&&(m[e.DRAW_FRAMEBUFFER]=ie),!0):!1}function j(M,ie){let oe=S,ue=!1;if(M){oe=_.get(ie),oe===void 0&&(oe=[],_.set(ie,oe));const ee=M.textures;if(oe.length!==ee.length||oe[0]!==e.COLOR_ATTACHMENT0){for(let $=0,_e=ee.length;$<_e;$++)oe[$]=e.COLOR_ATTACHMENT0+$;oe.length=ee.length,ue=!0}}else oe[0]!==e.BACK&&(oe[0]=e.BACK,ue=!0);ue&&e.drawBuffers(oe)}function Ae(M){return N!==M?(e.useProgram(M),N=M,!0):!1}const Qe={[Kt]:e.FUNC_ADD,[$r]:e.FUNC_SUBTRACT,[qr]:e.FUNC_REVERSE_SUBTRACT};Qe[co]=e.MIN,Qe[lo]=e.MAX;const v={[fa]:e.ZERO,[la]:e.ONE,[ca]:e.SRC_COLOR,[sa]:e.SRC_ALPHA,[oa]:e.SRC_ALPHA_SATURATE,[aa]:e.DST_COLOR,[ra]:e.DST_ALPHA,[ia]:e.ONE_MINUS_SRC_COLOR,[na]:e.ONE_MINUS_SRC_ALPHA,[ta]:e.ONE_MINUS_DST_COLOR,[ea]:e.ONE_MINUS_DST_ALPHA,[jr]:e.CONSTANT_COLOR,[Jr]:e.ONE_MINUS_CONSTANT_COLOR,[Qr]:e.CONSTANT_ALPHA,[Zr]:e.ONE_MINUS_CONSTANT_ALPHA};function Je(M,ie,oe,ue,ee,$,_e,De,Xe,Ve){if(M===Nt){g===!0&&(G(e.BLEND),g=!1);return}if(g===!1&&(Y(e.BLEND),g=!0),M!==Fa){if(M!==s||Ve!==h){if((r!==Kt||E!==Kt)&&(e.blendEquation(e.FUNC_ADD),r=Kt,E=Kt),Ve)switch(M){case un:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case wi:e.blendFunc(e.ONE,e.ONE);break;case Ii:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Di:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}else switch(M){case un:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case wi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Ii:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Di:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}A=null,R=null,B=null,D=null,F.set(0,0,0),X=0,s=M,h=Ve}return}ee=ee||ie,$=$||oe,_e=_e||ue,(ie!==r||ee!==E)&&(e.blendEquationSeparate(Qe[ie],Qe[ee]),r=ie,E=ee),(oe!==A||ue!==R||$!==B||_e!==D)&&(e.blendFuncSeparate(v[oe],v[ue],v[$],v[_e]),A=oe,R=ue,B=$,D=_e),(De.equals(F)===!1||Xe!==X)&&(e.blendColor(De.r,De.g,De.b,Xe),F.copy(De),X=Xe),s=M,h=!1}function Ie(M,ie){M.side===Mt?G(e.CULL_FACE):Y(e.CULL_FACE);let oe=M.side===vt;ie&&(oe=!oe),Pe(oe),M.blending===un&&M.transparent===!1?Je(Nt):Je(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),d.setFunc(M.depthFunc),d.setTest(M.depthTest),d.setMask(M.depthWrite),a.setMask(M.colorWrite);const ue=M.stencilWrite;c.setTest(ue),ue&&(c.setMask(M.stencilWriteMask),c.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),c.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),ve(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?Y(e.SAMPLE_ALPHA_TO_COVERAGE):G(e.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(M){u!==M&&(M?e.frontFace(e.CW):e.frontFace(e.CCW),u=M)}function me(M){M!==Na?(Y(e.CULL_FACE),M!==U&&(M===Ui?e.cullFace(e.BACK):M===ya?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):G(e.CULL_FACE),U=M}function je(M){M!==H&&(K&&e.lineWidth(M),H=M)}function ve(M,ie,oe){M?(Y(e.POLYGON_OFFSET_FILL),(q!==ie||Z!==oe)&&(e.polygonOffset(ie,oe),q=ie,Z=oe)):G(e.POLYGON_OFFSET_FILL)}function Ne(M){M?Y(e.SCISSOR_TEST):G(e.SCISSOR_TEST)}function st(M){M===void 0&&(M=e.TEXTURE0+Q-1),pe!==M&&(e.activeTexture(M),pe=M)}function it(M,ie,oe){oe===void 0&&(pe===null?oe=e.TEXTURE0+Q-1:oe=pe);let ue=Me[oe];ue===void 0&&(ue={type:void 0,texture:void 0},Me[oe]=ue),(ue.type!==M||ue.texture!==ie)&&(pe!==oe&&(e.activeTexture(oe),pe=oe),e.bindTexture(M,ie||W[M]),ue.type=M,ue.texture=ie)}function p(){const M=Me[pe];M!==void 0&&M.type!==void 0&&(e.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)}function o(){try{e.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function I(){try{e.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function z(){try{e.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function J(){try{e.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Te(){try{e.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function re(){try{e.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function ge(){try{e.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Ee(){try{e.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function ne(){try{e.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function fe(M){Ze.equals(M)===!1&&(e.scissor(M.x,M.y,M.z,M.w),Ze.copy(M))}function be(M){Ke.equals(M)===!1&&(e.viewport(M.x,M.y,M.z,M.w),Ke.copy(M))}function Se(M,ie){let oe=T.get(ie);oe===void 0&&(oe=new WeakMap,T.set(ie,oe));let ue=oe.get(M);ue===void 0&&(ue=e.getUniformBlockIndex(ie,M.name),oe.set(M,ue))}function ce(M,ie){const ue=T.get(ie).get(M);x.get(ie)!==ue&&(e.uniformBlockBinding(ie,ue,M.__bindingPointIndex),x.set(ie,ue))}function we(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),d.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),L={},pe=null,Me={},m={},_=new WeakMap,S=[],N=null,g=!1,s=null,r=null,A=null,R=null,E=null,B=null,D=null,F=new $e(0,0,0),X=0,h=!1,u=null,U=null,H=null,q=null,Z=null,Ze.set(0,0,e.canvas.width,e.canvas.height),Ke.set(0,0,e.canvas.width,e.canvas.height),a.reset(),d.reset(),c.reset()}return{buffers:{color:a,depth:d,stencil:c},enable:Y,disable:G,bindFramebuffer:C,drawBuffers:j,useProgram:Ae,setBlending:Je,setMaterial:Ie,setFlipSided:Pe,setCullFace:me,setLineWidth:je,setPolygonOffset:ve,setScissorTest:Ne,activeTexture:st,bindTexture:it,unbindTexture:p,compressedTexImage2D:o,compressedTexImage3D:I,texImage2D:Ee,texImage3D:ne,updateUBOMapping:Se,uniformBlockBinding:ce,texStorage2D:re,texStorage3D:ge,texSubImage2D:z,texSubImage3D:J,compressedTexSubImage2D:V,compressedTexSubImage3D:Te,scissor:fe,viewport:be,reset:we}}function Kf(e,n,t,i,l,a,d){const c=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,x=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),T=new ut,L=new WeakMap;let m;const _=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(p,o){return S?new OffscreenCanvas(p,o):ro("canvas")}function g(p,o,I){let z=1;const J=it(p);if((J.width>I||J.height>I)&&(z=I/Math.max(J.width,J.height)),z<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){const V=Math.floor(z*J.width),Te=Math.floor(z*J.height);m===void 0&&(m=N(V,Te));const re=o?N(V,Te):m;return re.width=V,re.height=Te,re.getContext("2d").drawImage(p,0,0,V,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+V+"x"+Te+")."),re}else return"data"in p&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),p;return p}function s(p){return p.generateMipmaps}function r(p){e.generateMipmap(p)}function A(p){return p.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?e.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function R(p,o,I,z,J=!1){if(p!==null){if(e[p]!==void 0)return e[p];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let V=o;if(o===e.RED&&(I===e.FLOAT&&(V=e.R32F),I===e.HALF_FLOAT&&(V=e.R16F),I===e.UNSIGNED_BYTE&&(V=e.R8)),o===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(V=e.R8UI),I===e.UNSIGNED_SHORT&&(V=e.R16UI),I===e.UNSIGNED_INT&&(V=e.R32UI),I===e.BYTE&&(V=e.R8I),I===e.SHORT&&(V=e.R16I),I===e.INT&&(V=e.R32I)),o===e.RG&&(I===e.FLOAT&&(V=e.RG32F),I===e.HALF_FLOAT&&(V=e.RG16F),I===e.UNSIGNED_BYTE&&(V=e.RG8)),o===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(V=e.RG8UI),I===e.UNSIGNED_SHORT&&(V=e.RG16UI),I===e.UNSIGNED_INT&&(V=e.RG32UI),I===e.BYTE&&(V=e.RG8I),I===e.SHORT&&(V=e.RG16I),I===e.INT&&(V=e.RG32I)),o===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(V=e.RGB8UI),I===e.UNSIGNED_SHORT&&(V=e.RGB16UI),I===e.UNSIGNED_INT&&(V=e.RGB32UI),I===e.BYTE&&(V=e.RGB8I),I===e.SHORT&&(V=e.RGB16I),I===e.INT&&(V=e.RGB32I)),o===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(V=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(V=e.RGBA16UI),I===e.UNSIGNED_INT&&(V=e.RGBA32UI),I===e.BYTE&&(V=e.RGBA8I),I===e.SHORT&&(V=e.RGBA16I),I===e.INT&&(V=e.RGBA32I)),o===e.RGB&&(I===e.UNSIGNED_INT_5_9_9_9_REV&&(V=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(V=e.R11F_G11F_B10F)),o===e.RGBA){const Te=J?br:rt.getTransfer(z);I===e.FLOAT&&(V=e.RGBA32F),I===e.HALF_FLOAT&&(V=e.RGBA16F),I===e.UNSIGNED_BYTE&&(V=Te===qe?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT_4_4_4_4&&(V=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(V=e.RGB5_A1)}return(V===e.R16F||V===e.R32F||V===e.RG16F||V===e.RG32F||V===e.RGBA16F||V===e.RGBA32F)&&n.get("EXT_color_buffer_float"),V}function E(p,o){let I;return p?o===null||o===tn||o===en?I=e.DEPTH24_STENCIL8:o===wt?I=e.DEPTH32F_STENCIL8:o===mn&&(I=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):o===null||o===tn||o===en?I=e.DEPTH_COMPONENT24:o===wt?I=e.DEPTH_COMPONENT32F:o===mn&&(I=e.DEPTH_COMPONENT16),I}function B(p,o){return s(p)===!0||p.isFramebufferTexture&&p.minFilter!==Zt&&p.minFilter!==Ht?Math.log2(Math.max(o.width,o.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?o.mipmaps.length:1}function D(p){const o=p.target;o.removeEventListener("dispose",D),X(o),o.isVideoTexture&&L.delete(o)}function F(p){const o=p.target;o.removeEventListener("dispose",F),u(o)}function X(p){const o=i.get(p);if(o.__webglInit===void 0)return;const I=p.source,z=_.get(I);if(z){const J=z[o.__cacheKey];J.usedTimes--,J.usedTimes===0&&h(p),Object.keys(z).length===0&&_.delete(I)}i.remove(p)}function h(p){const o=i.get(p);e.deleteTexture(o.__webglTexture);const I=p.source,z=_.get(I);delete z[o.__cacheKey],d.memory.textures--}function u(p){const o=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(o.__webglFramebuffer[z]))for(let J=0;J<o.__webglFramebuffer[z].length;J++)e.deleteFramebuffer(o.__webglFramebuffer[z][J]);else e.deleteFramebuffer(o.__webglFramebuffer[z]);o.__webglDepthbuffer&&e.deleteRenderbuffer(o.__webglDepthbuffer[z])}else{if(Array.isArray(o.__webglFramebuffer))for(let z=0;z<o.__webglFramebuffer.length;z++)e.deleteFramebuffer(o.__webglFramebuffer[z]);else e.deleteFramebuffer(o.__webglFramebuffer);if(o.__webglDepthbuffer&&e.deleteRenderbuffer(o.__webglDepthbuffer),o.__webglMultisampledFramebuffer&&e.deleteFramebuffer(o.__webglMultisampledFramebuffer),o.__webglColorRenderbuffer)for(let z=0;z<o.__webglColorRenderbuffer.length;z++)o.__webglColorRenderbuffer[z]&&e.deleteRenderbuffer(o.__webglColorRenderbuffer[z]);o.__webglDepthRenderbuffer&&e.deleteRenderbuffer(o.__webglDepthRenderbuffer)}const I=p.textures;for(let z=0,J=I.length;z<J;z++){const V=i.get(I[z]);V.__webglTexture&&(e.deleteTexture(V.__webglTexture),d.memory.textures--),i.remove(I[z])}i.remove(p)}let U=0;function H(){U=0}function q(){const p=U;return p>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+p+" texture units while this GPU supports only "+l.maxTextures),U+=1,p}function Z(p){const o=[];return o.push(p.wrapS),o.push(p.wrapT),o.push(p.wrapR||0),o.push(p.magFilter),o.push(p.minFilter),o.push(p.anisotropy),o.push(p.internalFormat),o.push(p.format),o.push(p.type),o.push(p.generateMipmaps),o.push(p.premultiplyAlpha),o.push(p.flipY),o.push(p.unpackAlignment),o.push(p.colorSpace),o.join()}function Q(p,o){const I=i.get(p);if(p.isVideoTexture&&Ne(p),p.isRenderTargetTexture===!1&&p.isExternalTexture!==!0&&p.version>0&&I.__version!==p.version){const z=p.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(I,p,o);return}}else p.isExternalTexture&&(I.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+o)}function K(p,o){const I=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&I.__version!==p.version){W(I,p,o);return}t.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+o)}function ae(p,o){const I=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&I.__version!==p.version){W(I,p,o);return}t.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+o)}function k(p,o){const I=i.get(p);if(p.version>0&&I.__version!==p.version){Y(I,p,o);return}t.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+o)}const pe={[pa]:e.REPEAT,[ua]:e.CLAMP_TO_EDGE,[da]:e.MIRRORED_REPEAT},Me={[Zt]:e.NEAREST,[ha]:e.NEAREST_MIPMAP_NEAREST,[on]:e.NEAREST_MIPMAP_LINEAR,[Ht]:e.LINEAR,[xn]:e.LINEAR_MIPMAP_NEAREST,[Yt]:e.LINEAR_MIPMAP_LINEAR},Ue={[Ta]:e.NEVER,[Sa]:e.ALWAYS,[Ea]:e.LESS,[pr]:e.LEQUAL,[ga]:e.EQUAL,[va]:e.GEQUAL,[ma]:e.GREATER,[_a]:e.NOTEQUAL};function Be(p,o){if(o.type===wt&&n.has("OES_texture_float_linear")===!1&&(o.magFilter===Ht||o.magFilter===xn||o.magFilter===on||o.magFilter===Yt||o.minFilter===Ht||o.minFilter===xn||o.minFilter===on||o.minFilter===Yt)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(p,e.TEXTURE_WRAP_S,pe[o.wrapS]),e.texParameteri(p,e.TEXTURE_WRAP_T,pe[o.wrapT]),(p===e.TEXTURE_3D||p===e.TEXTURE_2D_ARRAY)&&e.texParameteri(p,e.TEXTURE_WRAP_R,pe[o.wrapR]),e.texParameteri(p,e.TEXTURE_MAG_FILTER,Me[o.magFilter]),e.texParameteri(p,e.TEXTURE_MIN_FILTER,Me[o.minFilter]),o.compareFunction&&(e.texParameteri(p,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(p,e.TEXTURE_COMPARE_FUNC,Ue[o.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(o.magFilter===Zt||o.minFilter!==on&&o.minFilter!==Yt||o.type===wt&&n.has("OES_texture_float_linear")===!1)return;if(o.anisotropy>1||i.get(o).__currentAnisotropy){const I=n.get("EXT_texture_filter_anisotropic");e.texParameterf(p,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(o.anisotropy,l.getMaxAnisotropy())),i.get(o).__currentAnisotropy=o.anisotropy}}}function Ze(p,o){let I=!1;p.__webglInit===void 0&&(p.__webglInit=!0,o.addEventListener("dispose",D));const z=o.source;let J=_.get(z);J===void 0&&(J={},_.set(z,J));const V=Z(o);if(V!==p.__cacheKey){J[V]===void 0&&(J[V]={texture:e.createTexture(),usedTimes:0},d.memory.textures++,I=!0),J[V].usedTimes++;const Te=J[p.__cacheKey];Te!==void 0&&(J[p.__cacheKey].usedTimes--,Te.usedTimes===0&&h(o)),p.__cacheKey=V,p.__webglTexture=J[V].texture}return I}function Ke(p,o,I){return Math.floor(Math.floor(p/I)/o)}function Oe(p,o,I,z){const V=p.updateRanges;if(V.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,o.width,o.height,I,z,o.data);else{V.sort((ne,fe)=>ne.start-fe.start);let Te=0;for(let ne=1;ne<V.length;ne++){const fe=V[Te],be=V[ne],Se=fe.start+fe.count,ce=Ke(be.start,o.width,4),we=Ke(fe.start,o.width,4);be.start<=Se+1&&ce===we&&Ke(be.start+be.count-1,o.width,4)===ce?fe.count=Math.max(fe.count,be.start+be.count-fe.start):(++Te,V[Te]=be)}V.length=Te+1;const re=e.getParameter(e.UNPACK_ROW_LENGTH),ge=e.getParameter(e.UNPACK_SKIP_PIXELS),Ee=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,o.width);for(let ne=0,fe=V.length;ne<fe;ne++){const be=V[ne],Se=Math.floor(be.start/4),ce=Math.ceil(be.count/4),we=Se%o.width,M=Math.floor(Se/o.width),ie=ce,oe=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,we),e.pixelStorei(e.UNPACK_SKIP_ROWS,M),t.texSubImage2D(e.TEXTURE_2D,0,we,M,ie,oe,I,z,o.data)}p.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,re),e.pixelStorei(e.UNPACK_SKIP_PIXELS,ge),e.pixelStorei(e.UNPACK_SKIP_ROWS,Ee)}}function W(p,o,I){let z=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(z=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(z=e.TEXTURE_3D);const J=Ze(p,o),V=o.source;t.bindTexture(z,p.__webglTexture,e.TEXTURE0+I);const Te=i.get(V);if(V.version!==Te.__version||J===!0){t.activeTexture(e.TEXTURE0+I);const re=rt.getPrimaries(rt.workingColorSpace),ge=o.colorSpace===Gt?null:rt.getPrimaries(o.colorSpace),Ee=o.colorSpace===Gt||re===ge?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let ne=g(o.image,!1,l.maxTextureSize);ne=st(o,ne);const fe=a.convert(o.format,o.colorSpace),be=a.convert(o.type);let Se=R(o.internalFormat,fe,be,o.colorSpace,o.isVideoTexture);Be(z,o);let ce;const we=o.mipmaps,M=o.isVideoTexture!==!0,ie=Te.__version===void 0||J===!0,oe=V.dataReady,ue=B(o,ne);if(o.isDepthTexture)Se=E(o.format===hn,o.type),ie&&(M?t.texStorage2D(e.TEXTURE_2D,1,Se,ne.width,ne.height):t.texImage2D(e.TEXTURE_2D,0,Se,ne.width,ne.height,0,fe,be,null));else if(o.isDataTexture)if(we.length>0){M&&ie&&t.texStorage2D(e.TEXTURE_2D,ue,Se,we[0].width,we[0].height);for(let ee=0,$=we.length;ee<$;ee++)ce=we[ee],M?oe&&t.texSubImage2D(e.TEXTURE_2D,ee,0,0,ce.width,ce.height,fe,be,ce.data):t.texImage2D(e.TEXTURE_2D,ee,Se,ce.width,ce.height,0,fe,be,ce.data);o.generateMipmaps=!1}else M?(ie&&t.texStorage2D(e.TEXTURE_2D,ue,Se,ne.width,ne.height),oe&&Oe(o,ne,fe,be)):t.texImage2D(e.TEXTURE_2D,0,Se,ne.width,ne.height,0,fe,be,ne.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){M&&ie&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Se,we[0].width,we[0].height,ne.depth);for(let ee=0,$=we.length;ee<$;ee++)if(ce=we[ee],o.format!==At)if(fe!==null)if(M){if(oe)if(o.layerUpdates.size>0){const _e=yi(ce.width,ce.height,o.format,o.type);for(const De of o.layerUpdates){const Xe=ce.data.subarray(De*_e/ce.data.BYTES_PER_ELEMENT,(De+1)*_e/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ee,0,0,De,ce.width,ce.height,1,fe,Xe)}o.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,fe,ce.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ee,Se,ce.width,ce.height,ne.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else M?oe&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,fe,be,ce.data):t.texImage3D(e.TEXTURE_2D_ARRAY,ee,Se,ce.width,ce.height,ne.depth,0,fe,be,ce.data)}else{M&&ie&&t.texStorage2D(e.TEXTURE_2D,ue,Se,we[0].width,we[0].height);for(let ee=0,$=we.length;ee<$;ee++)ce=we[ee],o.format!==At?fe!==null?M?oe&&t.compressedTexSubImage2D(e.TEXTURE_2D,ee,0,0,ce.width,ce.height,fe,ce.data):t.compressedTexImage2D(e.TEXTURE_2D,ee,Se,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):M?oe&&t.texSubImage2D(e.TEXTURE_2D,ee,0,0,ce.width,ce.height,fe,be,ce.data):t.texImage2D(e.TEXTURE_2D,ee,Se,ce.width,ce.height,0,fe,be,ce.data)}else if(o.isDataArrayTexture)if(M){if(ie&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Se,ne.width,ne.height,ne.depth),oe)if(o.layerUpdates.size>0){const ee=yi(ne.width,ne.height,o.format,o.type);for(const $ of o.layerUpdates){const _e=ne.data.subarray($*ee/ne.data.BYTES_PER_ELEMENT,($+1)*ee/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,$,ne.width,ne.height,1,fe,be,_e)}o.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,fe,be,ne.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,Se,ne.width,ne.height,ne.depth,0,fe,be,ne.data);else if(o.isData3DTexture)M?(ie&&t.texStorage3D(e.TEXTURE_3D,ue,Se,ne.width,ne.height,ne.depth),oe&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,fe,be,ne.data)):t.texImage3D(e.TEXTURE_3D,0,Se,ne.width,ne.height,ne.depth,0,fe,be,ne.data);else if(o.isFramebufferTexture){if(ie)if(M)t.texStorage2D(e.TEXTURE_2D,ue,Se,ne.width,ne.height);else{let ee=ne.width,$=ne.height;for(let _e=0;_e<ue;_e++)t.texImage2D(e.TEXTURE_2D,_e,Se,ee,$,0,fe,be,null),ee>>=1,$>>=1}}else if(we.length>0){if(M&&ie){const ee=it(we[0]);t.texStorage2D(e.TEXTURE_2D,ue,Se,ee.width,ee.height)}for(let ee=0,$=we.length;ee<$;ee++)ce=we[ee],M?oe&&t.texSubImage2D(e.TEXTURE_2D,ee,0,0,fe,be,ce):t.texImage2D(e.TEXTURE_2D,ee,Se,fe,be,ce);o.generateMipmaps=!1}else if(M){if(ie){const ee=it(ne);t.texStorage2D(e.TEXTURE_2D,ue,Se,ee.width,ee.height)}oe&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,fe,be,ne)}else t.texImage2D(e.TEXTURE_2D,0,Se,fe,be,ne);s(o)&&r(z),Te.__version=V.version,o.onUpdate&&o.onUpdate(o)}p.__version=o.version}function Y(p,o,I){if(o.image.length!==6)return;const z=Ze(p,o),J=o.source;t.bindTexture(e.TEXTURE_CUBE_MAP,p.__webglTexture,e.TEXTURE0+I);const V=i.get(J);if(J.version!==V.__version||z===!0){t.activeTexture(e.TEXTURE0+I);const Te=rt.getPrimaries(rt.workingColorSpace),re=o.colorSpace===Gt?null:rt.getPrimaries(o.colorSpace),ge=o.colorSpace===Gt||Te===re?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Ee=o.isCompressedTexture||o.image[0].isCompressedTexture,ne=o.image[0]&&o.image[0].isDataTexture,fe=[];for(let $=0;$<6;$++)!Ee&&!ne?fe[$]=g(o.image[$],!0,l.maxCubemapSize):fe[$]=ne?o.image[$].image:o.image[$],fe[$]=st(o,fe[$]);const be=fe[0],Se=a.convert(o.format,o.colorSpace),ce=a.convert(o.type),we=R(o.internalFormat,Se,ce,o.colorSpace),M=o.isVideoTexture!==!0,ie=V.__version===void 0||z===!0,oe=J.dataReady;let ue=B(o,be);Be(e.TEXTURE_CUBE_MAP,o);let ee;if(Ee){M&&ie&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,we,be.width,be.height);for(let $=0;$<6;$++){ee=fe[$].mipmaps;for(let _e=0;_e<ee.length;_e++){const De=ee[_e];o.format!==At?Se!==null?M?oe&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,De.width,De.height,Se,De.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,we,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,De.width,De.height,Se,ce,De.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,we,De.width,De.height,0,Se,ce,De.data)}}}else{if(ee=o.mipmaps,M&&ie){ee.length>0&&ue++;const $=it(fe[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,we,$.width,$.height)}for(let $=0;$<6;$++)if(ne){M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,fe[$].width,fe[$].height,Se,ce,fe[$].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,we,fe[$].width,fe[$].height,0,Se,ce,fe[$].data);for(let _e=0;_e<ee.length;_e++){const Xe=ee[_e].image[$].image;M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,Xe.width,Xe.height,Se,ce,Xe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,we,Xe.width,Xe.height,0,Se,ce,Xe.data)}}else{M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Se,ce,fe[$]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,we,Se,ce,fe[$]);for(let _e=0;_e<ee.length;_e++){const De=ee[_e];M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,Se,ce,De.image[$]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,we,Se,ce,De.image[$])}}}s(o)&&r(e.TEXTURE_CUBE_MAP),V.__version=J.version,o.onUpdate&&o.onUpdate(o)}p.__version=o.version}function G(p,o,I,z,J,V){const Te=a.convert(I.format,I.colorSpace),re=a.convert(I.type),ge=R(I.internalFormat,Te,re,I.colorSpace),Ee=i.get(o),ne=i.get(I);if(ne.__renderTarget=o,!Ee.__hasExternalTextures){const fe=Math.max(1,o.width>>V),be=Math.max(1,o.height>>V);J===e.TEXTURE_3D||J===e.TEXTURE_2D_ARRAY?t.texImage3D(J,V,ge,fe,be,o.depth,0,Te,re,null):t.texImage2D(J,V,ge,fe,be,0,Te,re,null)}t.bindFramebuffer(e.FRAMEBUFFER,p),ve(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,z,J,ne.__webglTexture,0,je(o)):(J===e.TEXTURE_2D||J>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,z,J,ne.__webglTexture,V),t.bindFramebuffer(e.FRAMEBUFFER,null)}function C(p,o,I){if(e.bindRenderbuffer(e.RENDERBUFFER,p),o.depthBuffer){const z=o.depthTexture,J=z&&z.isDepthTexture?z.type:null,V=E(o.stencilBuffer,J),Te=o.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,re=je(o);ve(o)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,re,V,o.width,o.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,re,V,o.width,o.height):e.renderbufferStorage(e.RENDERBUFFER,V,o.width,o.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Te,e.RENDERBUFFER,p)}else{const z=o.textures;for(let J=0;J<z.length;J++){const V=z[J],Te=a.convert(V.format,V.colorSpace),re=a.convert(V.type),ge=R(V.internalFormat,Te,re,V.colorSpace),Ee=je(o);I&&ve(o)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee,ge,o.width,o.height):ve(o)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee,ge,o.width,o.height):e.renderbufferStorage(e.RENDERBUFFER,ge,o.width,o.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function j(p,o){if(o&&o.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,p),!(o.depthTexture&&o.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const z=i.get(o.depthTexture);z.__renderTarget=o,(!z.__webglTexture||o.depthTexture.image.width!==o.width||o.depthTexture.image.height!==o.height)&&(o.depthTexture.image.width=o.width,o.depthTexture.image.height=o.height,o.depthTexture.needsUpdate=!0),Q(o.depthTexture,0);const J=z.__webglTexture,V=je(o);if(o.depthTexture.format===Yn)ve(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,J,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,J,0);else if(o.depthTexture.format===hn)ve(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,J,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ae(p){const o=i.get(p),I=p.isWebGLCubeRenderTarget===!0;if(o.__boundDepthTexture!==p.depthTexture){const z=p.depthTexture;if(o.__depthDisposeCallback&&o.__depthDisposeCallback(),z){const J=()=>{delete o.__boundDepthTexture,delete o.__depthDisposeCallback,z.removeEventListener("dispose",J)};z.addEventListener("dispose",J),o.__depthDisposeCallback=J}o.__boundDepthTexture=z}if(p.depthTexture&&!o.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");const z=p.texture.mipmaps;z&&z.length>0?j(o.__webglFramebuffer[0],p):j(o.__webglFramebuffer,p)}else if(I){o.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer[z]),o.__webglDepthbuffer[z]===void 0)o.__webglDepthbuffer[z]=e.createRenderbuffer(),C(o.__webglDepthbuffer[z],p,!1);else{const J=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=o.__webglDepthbuffer[z];e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,J,e.RENDERBUFFER,V)}}else{const z=p.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer),o.__webglDepthbuffer===void 0)o.__webglDepthbuffer=e.createRenderbuffer(),C(o.__webglDepthbuffer,p,!1);else{const J=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=o.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,J,e.RENDERBUFFER,V)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Qe(p,o,I){const z=i.get(p);o!==void 0&&G(z.__webglFramebuffer,p,p.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&Ae(p)}function v(p){const o=p.texture,I=i.get(p),z=i.get(o);p.addEventListener("dispose",F);const J=p.textures,V=p.isWebGLCubeRenderTarget===!0,Te=J.length>1;if(Te||(z.__webglTexture===void 0&&(z.__webglTexture=e.createTexture()),z.__version=o.version,d.memory.textures++),V){I.__webglFramebuffer=[];for(let re=0;re<6;re++)if(o.mipmaps&&o.mipmaps.length>0){I.__webglFramebuffer[re]=[];for(let ge=0;ge<o.mipmaps.length;ge++)I.__webglFramebuffer[re][ge]=e.createFramebuffer()}else I.__webglFramebuffer[re]=e.createFramebuffer()}else{if(o.mipmaps&&o.mipmaps.length>0){I.__webglFramebuffer=[];for(let re=0;re<o.mipmaps.length;re++)I.__webglFramebuffer[re]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(Te)for(let re=0,ge=J.length;re<ge;re++){const Ee=i.get(J[re]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=e.createTexture(),d.memory.textures++)}if(p.samples>0&&ve(p)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const ge=J[re];I.__webglColorRenderbuffer[re]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[re]);const Ee=a.convert(ge.format,ge.colorSpace),ne=a.convert(ge.type),fe=R(ge.internalFormat,Ee,ne,ge.colorSpace,p.isXRRenderTarget===!0),be=je(p);e.renderbufferStorageMultisample(e.RENDERBUFFER,be,fe,p.width,p.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+re,e.RENDERBUFFER,I.__webglColorRenderbuffer[re])}e.bindRenderbuffer(e.RENDERBUFFER,null),p.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),C(I.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(V){t.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture),Be(e.TEXTURE_CUBE_MAP,o);for(let re=0;re<6;re++)if(o.mipmaps&&o.mipmaps.length>0)for(let ge=0;ge<o.mipmaps.length;ge++)G(I.__webglFramebuffer[re][ge],p,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+re,ge);else G(I.__webglFramebuffer[re],p,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);s(o)&&r(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let re=0,ge=J.length;re<ge;re++){const Ee=J[re],ne=i.get(Ee);let fe=e.TEXTURE_2D;(p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(fe=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(fe,ne.__webglTexture),Be(fe,Ee),G(I.__webglFramebuffer,p,Ee,e.COLOR_ATTACHMENT0+re,fe,0),s(Ee)&&r(fe)}t.unbindTexture()}else{let re=e.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(re=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(re,z.__webglTexture),Be(re,o),o.mipmaps&&o.mipmaps.length>0)for(let ge=0;ge<o.mipmaps.length;ge++)G(I.__webglFramebuffer[ge],p,o,e.COLOR_ATTACHMENT0,re,ge);else G(I.__webglFramebuffer,p,o,e.COLOR_ATTACHMENT0,re,0);s(o)&&r(re),t.unbindTexture()}p.depthBuffer&&Ae(p)}function Je(p){const o=p.textures;for(let I=0,z=o.length;I<z;I++){const J=o[I];if(s(J)){const V=A(p),Te=i.get(J).__webglTexture;t.bindTexture(V,Te),r(V),t.unbindTexture()}}}const Ie=[],Pe=[];function me(p){if(p.samples>0){if(ve(p)===!1){const o=p.textures,I=p.width,z=p.height;let J=e.COLOR_BUFFER_BIT;const V=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Te=i.get(p),re=o.length>1;if(re)for(let Ee=0;Ee<o.length;Ee++)t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const ge=p.texture.mipmaps;ge&&ge.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Ee=0;Ee<o.length;Ee++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(J|=e.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(J|=e.STENCIL_BUFFER_BIT)),re){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);const ne=i.get(o[Ee]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ne,0)}e.blitFramebuffer(0,0,I,z,0,0,I,z,J,e.NEAREST),x===!0&&(Ie.length=0,Pe.length=0,Ie.push(e.COLOR_ATTACHMENT0+Ee),p.depthBuffer&&p.resolveDepthBuffer===!1&&(Ie.push(V),Pe.push(V),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Pe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),re)for(let Ee=0;Ee<o.length;Ee++){t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);const ne=i.get(o[Ee]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.TEXTURE_2D,ne,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.resolveDepthBuffer===!1&&x){const o=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[o])}}}function je(p){return Math.min(l.maxSamples,p.samples)}function ve(p){const o=i.get(p);return p.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&o.__useRenderToTexture!==!1}function Ne(p){const o=d.render.frame;L.get(p)!==o&&(L.set(p,o),p.update())}function st(p,o){const I=p.colorSpace,z=p.format,J=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||I!==gn&&I!==Gt&&(rt.getTransfer(I)===qe?(z!==At||J!==yt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),o}function it(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(T.width=p.naturalWidth||p.width,T.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(T.width=p.displayWidth,T.height=p.displayHeight):(T.width=p.width,T.height=p.height),T}this.allocateTextureUnit=q,this.resetTextureUnits=H,this.setTexture2D=Q,this.setTexture2DArray=K,this.setTexture3D=ae,this.setTextureCube=k,this.rebindTextures=Qe,this.setupRenderTarget=v,this.updateRenderTargetMipmap=Je,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=G,this.useMultisampledRTT=ve}function Yf(e,n){function t(i,l=Gt){let a;const d=rt.getTransfer(l);if(i===yt)return e.UNSIGNED_BYTE;if(i===_r)return e.UNSIGNED_SHORT_4_4_4_4;if(i===mr)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Ca)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===ba)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Pa)return e.BYTE;if(i===La)return e.SHORT;if(i===mn)return e.UNSIGNED_SHORT;if(i===Er)return e.INT;if(i===tn)return e.UNSIGNED_INT;if(i===wt)return e.FLOAT;if(i===vn)return e.HALF_FLOAT;if(i===Ua)return e.ALPHA;if(i===Da)return e.RGB;if(i===At)return e.RGBA;if(i===Yn)return e.DEPTH_COMPONENT;if(i===hn)return e.DEPTH_STENCIL;if(i===Ia)return e.RED;if(i===Sr)return e.RED_INTEGER;if(i===wa)return e.RG;if(i===Tr)return e.RG_INTEGER;if(i===Mr)return e.RGBA_INTEGER;if(i===Rn||i===Cn||i===bn||i===Pn)if(d===qe)if(a=n.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Rn)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===bn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Pn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=n.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Rn)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cn)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===bn)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Pn)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ni||i===ii||i===ri||i===ai)if(a=n.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===ni)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ii)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ri)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ai)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oi||i===si||i===ci)if(a=n.get("WEBGL_compressed_texture_etc"),a!==null){if(i===oi||i===si)return d===qe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===ci)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===li||i===fi||i===di||i===ui||i===pi||i===hi||i===_i||i===mi||i===vi||i===gi||i===Ei||i===Si||i===Ti||i===Mi)if(a=n.get("WEBGL_compressed_texture_astc"),a!==null){if(i===li)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===di)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ui)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===pi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===hi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_i)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===gi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ei)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Si)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ti)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Mi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ai||i===xi||i===Ri)if(a=n.get("EXT_texture_compression_bptc"),a!==null){if(i===Ai)return d===qe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xi)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ri)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ci||i===bi||i===Pi||i===Li)if(a=n.get("EXT_texture_compression_rgtc"),a!==null){if(i===Ci)return a.COMPRESSED_RED_RGTC1_EXT;if(i===bi)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pi)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Li)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===en?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const qf=`
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

}`;class Zf{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new vr(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Ft({vertexShader:qf,fragmentShader:$f,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rt(new gr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Qf extends Xr{constructor(n,t){super();const i=this;let l=null,a=1,d=null,c="local-floor",x=1,T=null,L=null,m=null,_=null,S=null,N=null;const g=typeof XRWebGLBinding<"u",s=new Zf,r={},A=t.getContextAttributes();let R=null,E=null;const B=[],D=[],F=new ut;let X=null;const h=new $t;h.viewport=new dt;const u=new $t;u.viewport=new dt;const U=[h,u],H=new Kr;let q=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Y=B[W];return Y===void 0&&(Y=new An,B[W]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(W){let Y=B[W];return Y===void 0&&(Y=new An,B[W]=Y),Y.getGripSpace()},this.getHand=function(W){let Y=B[W];return Y===void 0&&(Y=new An,B[W]=Y),Y.getHandSpace()};function Q(W){const Y=D.indexOf(W.inputSource);if(Y===-1)return;const G=B[Y];G!==void 0&&(G.update(W.inputSource,W.frame,T||d),G.dispatchEvent({type:W.type,data:W.inputSource}))}function K(){l.removeEventListener("select",Q),l.removeEventListener("selectstart",Q),l.removeEventListener("selectend",Q),l.removeEventListener("squeeze",Q),l.removeEventListener("squeezestart",Q),l.removeEventListener("squeezeend",Q),l.removeEventListener("end",K),l.removeEventListener("inputsourceschange",ae);for(let W=0;W<B.length;W++){const Y=D[W];Y!==null&&(D[W]=null,B[W].disconnect(Y))}q=null,Z=null,s.reset();for(const W in r)delete r[W];n.setRenderTarget(R),S=null,_=null,m=null,l=null,E=null,Oe.stop(),i.isPresenting=!1,n.setPixelRatio(X),n.setSize(F.width,F.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){c=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return T||d},this.setReferenceSpace=function(W){T=W},this.getBaseLayer=function(){return _!==null?_:S},this.getBinding=function(){return m===null&&g&&(m=new XRWebGLBinding(l,t)),m},this.getFrame=function(){return N},this.getSession=function(){return l},this.setSession=async function(W){if(l=W,l!==null){if(R=n.getRenderTarget(),l.addEventListener("select",Q),l.addEventListener("selectstart",Q),l.addEventListener("selectend",Q),l.addEventListener("squeeze",Q),l.addEventListener("squeezestart",Q),l.addEventListener("squeezeend",Q),l.addEventListener("end",K),l.addEventListener("inputsourceschange",ae),A.xrCompatible!==!0&&await t.makeXRCompatible(),X=n.getPixelRatio(),n.getSize(F),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,C=null,j=null;A.depth&&(j=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=A.stencil?hn:Yn,C=A.stencil?en:tn);const Ae={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:a};m=this.getBinding(),_=m.createProjectionLayer(Ae),l.updateRenderState({layers:[_]}),n.setPixelRatio(1),n.setSize(_.textureWidth,_.textureHeight,!1),E=new kt(_.textureWidth,_.textureHeight,{format:At,type:yt,depthTexture:new ur(_.textureWidth,_.textureHeight,C,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:A.stencil,colorSpace:n.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}else{const G={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:a};S=new XRWebGLLayer(l,t,G),l.updateRenderState({baseLayer:S}),n.setPixelRatio(1),n.setSize(S.framebufferWidth,S.framebufferHeight,!1),E=new kt(S.framebufferWidth,S.framebufferHeight,{format:At,type:yt,colorSpace:n.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(x),T=null,d=await l.requestReferenceSpace(c),Oe.setContext(l),Oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return s.getDepthTexture()};function ae(W){for(let Y=0;Y<W.removed.length;Y++){const G=W.removed[Y],C=D.indexOf(G);C>=0&&(D[C]=null,B[C].disconnect(G))}for(let Y=0;Y<W.added.length;Y++){const G=W.added[Y];let C=D.indexOf(G);if(C===-1){for(let Ae=0;Ae<B.length;Ae++)if(Ae>=D.length){D.push(G),C=Ae;break}else if(D[Ae]===null){D[Ae]=G,C=Ae;break}if(C===-1)break}const j=B[C];j&&j.connect(G)}}const k=new ze,pe=new ze;function Me(W,Y,G){k.setFromMatrixPosition(Y.matrixWorld),pe.setFromMatrixPosition(G.matrixWorld);const C=k.distanceTo(pe),j=Y.projectionMatrix.elements,Ae=G.projectionMatrix.elements,Qe=j[14]/(j[10]-1),v=j[14]/(j[10]+1),Je=(j[9]+1)/j[5],Ie=(j[9]-1)/j[5],Pe=(j[8]-1)/j[0],me=(Ae[8]+1)/Ae[0],je=Qe*Pe,ve=Qe*me,Ne=C/(-Pe+me),st=Ne*-Pe;if(Y.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(st),W.translateZ(Ne),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),j[10]===-1)W.projectionMatrix.copy(Y.projectionMatrix),W.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const it=Qe+Ne,p=v+Ne,o=je-st,I=ve+(C-st),z=Je*v/p*it,J=Ie*v/p*it;W.projectionMatrix.makePerspective(o,I,z,J,it,p),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function Ue(W,Y){Y===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Y.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(l===null)return;let Y=W.near,G=W.far;s.texture!==null&&(s.depthNear>0&&(Y=s.depthNear),s.depthFar>0&&(G=s.depthFar)),H.near=u.near=h.near=Y,H.far=u.far=h.far=G,(q!==H.near||Z!==H.far)&&(l.updateRenderState({depthNear:H.near,depthFar:H.far}),q=H.near,Z=H.far),H.layers.mask=W.layers.mask|6,h.layers.mask=H.layers.mask&3,u.layers.mask=H.layers.mask&5;const C=W.parent,j=H.cameras;Ue(H,C);for(let Ae=0;Ae<j.length;Ae++)Ue(j[Ae],C);j.length===2?Me(H,h,u):H.projectionMatrix.copy(h.projectionMatrix),Be(W,H,C)};function Be(W,Y,G){G===null?W.matrix.copy(Y.matrixWorld):(W.matrix.copy(G.matrixWorld),W.matrix.invert(),W.matrix.multiply(Y.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Y.projectionMatrix),W.projectionMatrixInverse.copy(Y.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Yr*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(_===null&&S===null))return x},this.setFoveation=function(W){x=W,_!==null&&(_.fixedFoveation=W),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=W)},this.hasDepthSensing=function(){return s.texture!==null},this.getDepthSensingMesh=function(){return s.getMesh(H)},this.getCameraTexture=function(W){return r[W]};let Ze=null;function Ke(W,Y){if(L=Y.getViewerPose(T||d),N=Y,L!==null){const G=L.views;S!==null&&(n.setRenderTargetFramebuffer(E,S.framebuffer),n.setRenderTarget(E));let C=!1;G.length!==H.cameras.length&&(H.cameras.length=0,C=!0);for(let v=0;v<G.length;v++){const Je=G[v];let Ie=null;if(S!==null)Ie=S.getViewport(Je);else{const me=m.getViewSubImage(_,Je);Ie=me.viewport,v===0&&(n.setRenderTargetTextures(E,me.colorTexture,me.depthStencilTexture),n.setRenderTarget(E))}let Pe=U[v];Pe===void 0&&(Pe=new $t,Pe.layers.enable(v),Pe.viewport=new dt,U[v]=Pe),Pe.matrix.fromArray(Je.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(Je.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),v===0&&(H.matrix.copy(Pe.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),C===!0&&H.cameras.push(Pe)}const j=l.enabledFeatures;if(j&&j.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&g){m=i.getBinding();const v=m.getDepthInformation(G[0]);v&&v.isValid&&v.texture&&s.init(v,l.renderState)}if(j&&j.includes("camera-access")&&g){n.state.unbindTexture(),m=i.getBinding();for(let v=0;v<G.length;v++){const Je=G[v].camera;if(Je){let Ie=r[Je];Ie||(Ie=new vr,r[Je]=Ie);const Pe=m.getCameraImage(Je);Ie.sourceTexture=Pe}}}}for(let G=0;G<B.length;G++){const C=D[G],j=B[G];C!==null&&j!==void 0&&j.update(C,Y,T||d)}Ze&&Ze(W,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),N=null}const Oe=new Pr;Oe.setAnimationLoop(Ke),this.setAnimationLoop=function(W){Ze=W},this.dispose=function(){}}}const Ut=new Cr,Jf=new Jt;function jf(e,n){function t(s,r){s.matrixAutoUpdate===!0&&s.updateMatrix(),r.value.copy(s.matrix)}function i(s,r){r.color.getRGB(s.fogColor.value,xr(e)),r.isFog?(s.fogNear.value=r.near,s.fogFar.value=r.far):r.isFogExp2&&(s.fogDensity.value=r.density)}function l(s,r,A,R,E){r.isMeshBasicMaterial||r.isMeshLambertMaterial?a(s,r):r.isMeshToonMaterial?(a(s,r),m(s,r)):r.isMeshPhongMaterial?(a(s,r),L(s,r)):r.isMeshStandardMaterial?(a(s,r),_(s,r),r.isMeshPhysicalMaterial&&S(s,r,E)):r.isMeshMatcapMaterial?(a(s,r),N(s,r)):r.isMeshDepthMaterial?a(s,r):r.isMeshDistanceMaterial?(a(s,r),g(s,r)):r.isMeshNormalMaterial?a(s,r):r.isLineBasicMaterial?(d(s,r),r.isLineDashedMaterial&&c(s,r)):r.isPointsMaterial?x(s,r,A,R):r.isSpriteMaterial?T(s,r):r.isShadowMaterial?(s.color.value.copy(r.color),s.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)}function a(s,r){s.opacity.value=r.opacity,r.color&&s.diffuse.value.copy(r.color),r.emissive&&s.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(s.map.value=r.map,t(r.map,s.mapTransform)),r.alphaMap&&(s.alphaMap.value=r.alphaMap,t(r.alphaMap,s.alphaMapTransform)),r.bumpMap&&(s.bumpMap.value=r.bumpMap,t(r.bumpMap,s.bumpMapTransform),s.bumpScale.value=r.bumpScale,r.side===vt&&(s.bumpScale.value*=-1)),r.normalMap&&(s.normalMap.value=r.normalMap,t(r.normalMap,s.normalMapTransform),s.normalScale.value.copy(r.normalScale),r.side===vt&&s.normalScale.value.negate()),r.displacementMap&&(s.displacementMap.value=r.displacementMap,t(r.displacementMap,s.displacementMapTransform),s.displacementScale.value=r.displacementScale,s.displacementBias.value=r.displacementBias),r.emissiveMap&&(s.emissiveMap.value=r.emissiveMap,t(r.emissiveMap,s.emissiveMapTransform)),r.specularMap&&(s.specularMap.value=r.specularMap,t(r.specularMap,s.specularMapTransform)),r.alphaTest>0&&(s.alphaTest.value=r.alphaTest);const A=n.get(r),R=A.envMap,E=A.envMapRotation;R&&(s.envMap.value=R,Ut.copy(E),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),s.envMapRotation.value.setFromMatrix4(Jf.makeRotationFromEuler(Ut)),s.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,s.reflectivity.value=r.reflectivity,s.ior.value=r.ior,s.refractionRatio.value=r.refractionRatio),r.lightMap&&(s.lightMap.value=r.lightMap,s.lightMapIntensity.value=r.lightMapIntensity,t(r.lightMap,s.lightMapTransform)),r.aoMap&&(s.aoMap.value=r.aoMap,s.aoMapIntensity.value=r.aoMapIntensity,t(r.aoMap,s.aoMapTransform))}function d(s,r){s.diffuse.value.copy(r.color),s.opacity.value=r.opacity,r.map&&(s.map.value=r.map,t(r.map,s.mapTransform))}function c(s,r){s.dashSize.value=r.dashSize,s.totalSize.value=r.dashSize+r.gapSize,s.scale.value=r.scale}function x(s,r,A,R){s.diffuse.value.copy(r.color),s.opacity.value=r.opacity,s.size.value=r.size*A,s.scale.value=R*.5,r.map&&(s.map.value=r.map,t(r.map,s.uvTransform)),r.alphaMap&&(s.alphaMap.value=r.alphaMap,t(r.alphaMap,s.alphaMapTransform)),r.alphaTest>0&&(s.alphaTest.value=r.alphaTest)}function T(s,r){s.diffuse.value.copy(r.color),s.opacity.value=r.opacity,s.rotation.value=r.rotation,r.map&&(s.map.value=r.map,t(r.map,s.mapTransform)),r.alphaMap&&(s.alphaMap.value=r.alphaMap,t(r.alphaMap,s.alphaMapTransform)),r.alphaTest>0&&(s.alphaTest.value=r.alphaTest)}function L(s,r){s.specular.value.copy(r.specular),s.shininess.value=Math.max(r.shininess,1e-4)}function m(s,r){r.gradientMap&&(s.gradientMap.value=r.gradientMap)}function _(s,r){s.metalness.value=r.metalness,r.metalnessMap&&(s.metalnessMap.value=r.metalnessMap,t(r.metalnessMap,s.metalnessMapTransform)),s.roughness.value=r.roughness,r.roughnessMap&&(s.roughnessMap.value=r.roughnessMap,t(r.roughnessMap,s.roughnessMapTransform)),r.envMap&&(s.envMapIntensity.value=r.envMapIntensity)}function S(s,r,A){s.ior.value=r.ior,r.sheen>0&&(s.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),s.sheenRoughness.value=r.sheenRoughness,r.sheenColorMap&&(s.sheenColorMap.value=r.sheenColorMap,t(r.sheenColorMap,s.sheenColorMapTransform)),r.sheenRoughnessMap&&(s.sheenRoughnessMap.value=r.sheenRoughnessMap,t(r.sheenRoughnessMap,s.sheenRoughnessMapTransform))),r.clearcoat>0&&(s.clearcoat.value=r.clearcoat,s.clearcoatRoughness.value=r.clearcoatRoughness,r.clearcoatMap&&(s.clearcoatMap.value=r.clearcoatMap,t(r.clearcoatMap,s.clearcoatMapTransform)),r.clearcoatRoughnessMap&&(s.clearcoatRoughnessMap.value=r.clearcoatRoughnessMap,t(r.clearcoatRoughnessMap,s.clearcoatRoughnessMapTransform)),r.clearcoatNormalMap&&(s.clearcoatNormalMap.value=r.clearcoatNormalMap,t(r.clearcoatNormalMap,s.clearcoatNormalMapTransform),s.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),r.side===vt&&s.clearcoatNormalScale.value.negate())),r.dispersion>0&&(s.dispersion.value=r.dispersion),r.iridescence>0&&(s.iridescence.value=r.iridescence,s.iridescenceIOR.value=r.iridescenceIOR,s.iridescenceThicknessMinimum.value=r.iridescenceThicknessRange[0],s.iridescenceThicknessMaximum.value=r.iridescenceThicknessRange[1],r.iridescenceMap&&(s.iridescenceMap.value=r.iridescenceMap,t(r.iridescenceMap,s.iridescenceMapTransform)),r.iridescenceThicknessMap&&(s.iridescenceThicknessMap.value=r.iridescenceThicknessMap,t(r.iridescenceThicknessMap,s.iridescenceThicknessMapTransform))),r.transmission>0&&(s.transmission.value=r.transmission,s.transmissionSamplerMap.value=A.texture,s.transmissionSamplerSize.value.set(A.width,A.height),r.transmissionMap&&(s.transmissionMap.value=r.transmissionMap,t(r.transmissionMap,s.transmissionMapTransform)),s.thickness.value=r.thickness,r.thicknessMap&&(s.thicknessMap.value=r.thicknessMap,t(r.thicknessMap,s.thicknessMapTransform)),s.attenuationDistance.value=r.attenuationDistance,s.attenuationColor.value.copy(r.attenuationColor)),r.anisotropy>0&&(s.anisotropyVector.value.set(r.anisotropy*Math.cos(r.anisotropyRotation),r.anisotropy*Math.sin(r.anisotropyRotation)),r.anisotropyMap&&(s.anisotropyMap.value=r.anisotropyMap,t(r.anisotropyMap,s.anisotropyMapTransform))),s.specularIntensity.value=r.specularIntensity,s.specularColor.value.copy(r.specularColor),r.specularColorMap&&(s.specularColorMap.value=r.specularColorMap,t(r.specularColorMap,s.specularColorMapTransform)),r.specularIntensityMap&&(s.specularIntensityMap.value=r.specularIntensityMap,t(r.specularIntensityMap,s.specularIntensityMapTransform))}function N(s,r){r.matcap&&(s.matcap.value=r.matcap)}function g(s,r){const A=n.get(r).light;s.referencePosition.value.setFromMatrixPosition(A.matrixWorld),s.nearDistance.value=A.shadow.camera.near,s.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:l}}function ed(e,n,t,i){let l={},a={},d=[];const c=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function x(A,R){const E=R.program;i.uniformBlockBinding(A,E)}function T(A,R){let E=l[A.id];E===void 0&&(N(A),E=L(A),l[A.id]=E,A.addEventListener("dispose",s));const B=R.program;i.updateUBOMapping(A,B);const D=n.render.frame;a[A.id]!==D&&(_(A),a[A.id]=D)}function L(A){const R=m();A.__bindingPointIndex=R;const E=e.createBuffer(),B=A.__size,D=A.usage;return e.bindBuffer(e.UNIFORM_BUFFER,E),e.bufferData(e.UNIFORM_BUFFER,B,D),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,R,E),E}function m(){for(let A=0;A<c;A++)if(d.indexOf(A)===-1)return d.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(A){const R=l[A.id],E=A.uniforms,B=A.__cache;e.bindBuffer(e.UNIFORM_BUFFER,R);for(let D=0,F=E.length;D<F;D++){const X=Array.isArray(E[D])?E[D]:[E[D]];for(let h=0,u=X.length;h<u;h++){const U=X[h];if(S(U,D,h,B)===!0){const H=U.__offset,q=Array.isArray(U.value)?U.value:[U.value];let Z=0;for(let Q=0;Q<q.length;Q++){const K=q[Q],ae=g(K);typeof K=="number"||typeof K=="boolean"?(U.__data[0]=K,e.bufferSubData(e.UNIFORM_BUFFER,H+Z,U.__data)):K.isMatrix3?(U.__data[0]=K.elements[0],U.__data[1]=K.elements[1],U.__data[2]=K.elements[2],U.__data[3]=0,U.__data[4]=K.elements[3],U.__data[5]=K.elements[4],U.__data[6]=K.elements[5],U.__data[7]=0,U.__data[8]=K.elements[6],U.__data[9]=K.elements[7],U.__data[10]=K.elements[8],U.__data[11]=0):(K.toArray(U.__data,Z),Z+=ae.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,H,U.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function S(A,R,E,B){const D=A.value,F=R+"_"+E;if(B[F]===void 0)return typeof D=="number"||typeof D=="boolean"?B[F]=D:B[F]=D.clone(),!0;{const X=B[F];if(typeof D=="number"||typeof D=="boolean"){if(X!==D)return B[F]=D,!0}else if(X.equals(D)===!1)return X.copy(D),!0}return!1}function N(A){const R=A.uniforms;let E=0;const B=16;for(let F=0,X=R.length;F<X;F++){const h=Array.isArray(R[F])?R[F]:[R[F]];for(let u=0,U=h.length;u<U;u++){const H=h[u],q=Array.isArray(H.value)?H.value:[H.value];for(let Z=0,Q=q.length;Z<Q;Z++){const K=q[Z],ae=g(K),k=E%B,pe=k%ae.boundary,Me=k+pe;E+=pe,Me!==0&&B-Me<ae.storage&&(E+=B-Me),H.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=E,E+=ae.storage}}}const D=E%B;return D>0&&(E+=B-D),A.__size=E,A.__cache={},this}function g(A){const R={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(R.boundary=4,R.storage=4):A.isVector2?(R.boundary=8,R.storage=8):A.isVector3||A.isColor?(R.boundary=16,R.storage=12):A.isVector4?(R.boundary=16,R.storage=16):A.isMatrix3?(R.boundary=48,R.storage=48):A.isMatrix4?(R.boundary=64,R.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),R}function s(A){const R=A.target;R.removeEventListener("dispose",s);const E=d.indexOf(R.__bindingPointIndex);d.splice(E,1),e.deleteBuffer(l[R.id]),delete l[R.id],delete a[R.id]}function r(){for(const A in l)e.deleteBuffer(l[A]);d=[],l={},a={}}return{bind:x,update:T,dispose:r}}class td{constructor(n={}){const{canvas:t=kr(),context:i=null,depth:l=!0,stencil:a=!1,alpha:d=!1,antialias:c=!1,premultipliedAlpha:x=!0,preserveDrawingBuffer:T=!1,powerPreference:L="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:_=!1}=n;this.isWebGLRenderer=!0;let S;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=i.getContextAttributes().alpha}else S=d;const N=new Uint32Array(4),g=new Int32Array(4);let s=null,r=null;const A=[],R=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ct,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let B=!1;this._outputColorSpace=fr;let D=0,F=0,X=null,h=-1,u=null;const U=new dt,H=new dt;let q=null;const Z=new $e(0);let Q=0,K=t.width,ae=t.height,k=1,pe=null,Me=null;const Ue=new dt(0,0,K,ae),Be=new dt(0,0,K,ae);let Ze=!1;const Ke=new dr;let Oe=!1,W=!1;const Y=new Jt,G=new ze,C=new dt,j={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ae=!1;function Qe(){return X===null?k:1}let v=i;function Je(f,b){return t.getContext(f,b)}try{const f={alpha:!0,depth:l,stencil:a,antialias:c,premultipliedAlpha:x,preserveDrawingBuffer:T,powerPreference:L,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wr}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",ee,!1),v===null){const b="webgl2";if(v=Je(b,f),v===null)throw Je(b)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(f){throw console.error("THREE.WebGLRenderer: "+f.message),f}let Ie,Pe,me,je,ve,Ne,st,it,p,o,I,z,J,V,Te,re,ge,Ee,ne,fe,be,Se,ce,we;function M(){Ie=new fl(v),Ie.init(),Se=new Yf(v,Ie),Pe=new il(v,Ie,n,Se),me=new Xf(v,Ie),Pe.reversedDepthBuffer&&_&&me.buffers.depth.setReversed(!0),je=new pl(v),ve=new If,Ne=new Kf(v,Ie,me,ve,Pe,Se,je),st=new al(E),it=new ll(E),p=new Eo(v),ce=new tl(v,p),o=new dl(v,p,je,ce),I=new _l(v,o,p,je),ne=new hl(v,Pe,Ne),re=new rl(ve),z=new Df(E,st,it,Ie,Pe,ce,re),J=new jf(E,ve),V=new Nf,Te=new Hf(Ie),Ee=new el(E,st,it,me,I,S,x),ge=new Wf(E,I,Pe),we=new ed(v,je,Pe,me),fe=new nl(v,Ie,je),be=new ul(v,Ie,je),je.programs=z.programs,E.capabilities=Pe,E.extensions=Ie,E.properties=ve,E.renderLists=V,E.shadowMap=ge,E.state=me,E.info=je}M();const ie=new Qf(E,v);this.xr=ie,this.getContext=function(){return v},this.getContextAttributes=function(){return v.getContextAttributes()},this.forceContextLoss=function(){const f=Ie.get("WEBGL_lose_context");f&&f.loseContext()},this.forceContextRestore=function(){const f=Ie.get("WEBGL_lose_context");f&&f.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(f){f!==void 0&&(k=f,this.setSize(K,ae,!1))},this.getSize=function(f){return f.set(K,ae)},this.setSize=function(f,b,y=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=f,ae=b,t.width=Math.floor(f*k),t.height=Math.floor(b*k),y===!0&&(t.style.width=f+"px",t.style.height=b+"px"),this.setViewport(0,0,f,b)},this.getDrawingBufferSize=function(f){return f.set(K*k,ae*k).floor()},this.setDrawingBufferSize=function(f,b,y){K=f,ae=b,k=y,t.width=Math.floor(f*y),t.height=Math.floor(b*y),this.setViewport(0,0,f,b)},this.getCurrentViewport=function(f){return f.copy(U)},this.getViewport=function(f){return f.copy(Ue)},this.setViewport=function(f,b,y,O){f.isVector4?Ue.set(f.x,f.y,f.z,f.w):Ue.set(f,b,y,O),me.viewport(U.copy(Ue).multiplyScalar(k).round())},this.getScissor=function(f){return f.copy(Be)},this.setScissor=function(f,b,y,O){f.isVector4?Be.set(f.x,f.y,f.z,f.w):Be.set(f,b,y,O),me.scissor(H.copy(Be).multiplyScalar(k).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(f){me.setScissorTest(Ze=f)},this.setOpaqueSort=function(f){pe=f},this.setTransparentSort=function(f){Me=f},this.getClearColor=function(f){return f.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(f=!0,b=!0,y=!0){let O=0;if(f){let P=!1;if(X!==null){const te=X.texture.format;P=te===Mr||te===Tr||te===Sr}if(P){const te=X.texture.type,le=te===yt||te===tn||te===mn||te===en||te===_r||te===mr,he=Ee.getClearColor(),de=Ee.getClearAlpha(),Ce=he.r,Le=he.g,xe=he.b;le?(N[0]=Ce,N[1]=Le,N[2]=xe,N[3]=de,v.clearBufferuiv(v.COLOR,0,N)):(g[0]=Ce,g[1]=Le,g[2]=xe,g[3]=de,v.clearBufferiv(v.COLOR,0,g))}else O|=v.COLOR_BUFFER_BIT}b&&(O|=v.DEPTH_BUFFER_BIT),y&&(O|=v.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),v.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),Ee.dispose(),V.dispose(),Te.dispose(),ve.dispose(),st.dispose(),it.dispose(),I.dispose(),ce.dispose(),we.dispose(),z.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",gt),ie.removeEventListener("sessionend",$n),bt.stop()};function oe(f){f.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;const f=je.autoReset,b=ge.enabled,y=ge.autoUpdate,O=ge.needsUpdate,P=ge.type;M(),je.autoReset=f,ge.enabled=b,ge.autoUpdate=y,ge.needsUpdate=O,ge.type=P}function ee(f){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",f.statusMessage)}function $(f){const b=f.target;b.removeEventListener("dispose",$),_e(b)}function _e(f){De(f),ve.remove(f)}function De(f){const b=ve.get(f).programs;b!==void 0&&(b.forEach(function(y){z.releaseProgram(y)}),f.isShaderMaterial&&z.releaseShaderCache(f))}this.renderBufferDirect=function(f,b,y,O,P,te){b===null&&(b=j);const le=P.isMesh&&P.matrixWorld.determinant()<0,he=Fr(f,b,y,O,P);me.setMaterial(O,le);let de=y.index,Ce=1;if(O.wireframe===!0){if(de=o.getWireframeAttribute(y),de===void 0)return;Ce=2}const Le=y.drawRange,xe=y.attributes.position;let Fe=Le.start*Ce,ke=(Le.start+Le.count)*Ce;te!==null&&(Fe=Math.max(Fe,te.start*Ce),ke=Math.min(ke,(te.start+te.count)*Ce)),de!==null?(Fe=Math.max(Fe,0),ke=Math.min(ke,de.count)):xe!=null&&(Fe=Math.max(Fe,0),ke=Math.min(ke,xe.count));const nt=ke-Fe;if(nt<0||nt===1/0)return;ce.setup(P,O,he,y,de);let Ye,We=fe;if(de!==null&&(Ye=p.get(de),We=be,We.setIndex(Ye)),P.isMesh)O.wireframe===!0?(me.setLineWidth(O.wireframeLinewidth*Qe()),We.setMode(v.LINES)):We.setMode(v.TRIANGLES);else if(P.isLine){let Re=O.linewidth;Re===void 0&&(Re=1),me.setLineWidth(Re*Qe()),P.isLineSegments?We.setMode(v.LINES):P.isLineLoop?We.setMode(v.LINE_LOOP):We.setMode(v.LINE_STRIP)}else P.isPoints?We.setMode(v.POINTS):P.isSprite&&We.setMode(v.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)yn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),We.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))We.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{const Re=P._multiDrawStarts,et=P._multiDrawCounts,Ge=P._multiDrawCount,pt=de?p.get(de).bytesPerElement:1,Ot=ve.get(O).currentProgram.getUniforms();for(let ht=0;ht<Ge;ht++)Ot.setValue(v,"_gl_DrawID",ht),We.render(Re[ht]/pt,et[ht])}else if(P.isInstancedMesh)We.renderInstances(Fe,nt,P.count);else if(y.isInstancedBufferGeometry){const Re=y._maxInstanceCount!==void 0?y._maxInstanceCount:1/0,et=Math.min(y.instanceCount,Re);We.renderInstances(Fe,nt,et)}else We.render(Fe,nt)};function Xe(f,b,y){f.transparent===!0&&f.side===Mt&&f.forceSinglePass===!1?(f.side=vt,f.needsUpdate=!0,an(f,b,y),f.side=jt,f.needsUpdate=!0,an(f,b,y),f.side=Mt):an(f,b,y)}this.compile=function(f,b,y=null){y===null&&(y=f),r=Te.get(y),r.init(b),R.push(r),y.traverseVisible(function(P){P.isLight&&P.layers.test(b.layers)&&(r.pushLight(P),P.castShadow&&r.pushShadow(P))}),f!==y&&f.traverseVisible(function(P){P.isLight&&P.layers.test(b.layers)&&(r.pushLight(P),P.castShadow&&r.pushShadow(P))}),r.setupLights();const O=new Set;return f.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;const te=P.material;if(te)if(Array.isArray(te))for(let le=0;le<te.length;le++){const he=te[le];Xe(he,y,P),O.add(he)}else Xe(te,y,P),O.add(te)}),r=R.pop(),O},this.compileAsync=function(f,b,y=null){const O=this.compile(f,b,y);return new Promise(P=>{function te(){if(O.forEach(function(le){ve.get(le).currentProgram.isReady()&&O.delete(le)}),O.size===0){P(f);return}setTimeout(te,10)}Ie.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Ve=null;function St(f){Ve&&Ve(f)}function gt(){bt.stop()}function $n(){bt.start()}const bt=new Pr;bt.setAnimationLoop(St),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(f){Ve=f,ie.setAnimationLoop(f),f===null?bt.stop():bt.start()},ie.addEventListener("sessionstart",gt),ie.addEventListener("sessionend",$n),this.render=function(f,b){if(b!==void 0&&b.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),b.parent===null&&b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(b),b=ie.getCamera()),f.isScene===!0&&f.onBeforeRender(E,f,b,X),r=Te.get(f,R.length),r.init(b),R.push(r),Y.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),Ke.setFromProjectionMatrix(Y,ti,b.reversedDepth),W=this.localClippingEnabled,Oe=re.init(this.clippingPlanes,W),s=V.get(f,A.length),s.init(),A.push(s),ie.enabled===!0&&ie.isPresenting===!0){const te=E.xr.getDepthSensingMesh();te!==null&&Tn(te,b,-1/0,E.sortObjects)}Tn(f,b,0,E.sortObjects),s.finish(),E.sortObjects===!0&&s.sort(pe,Me),Ae=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Ae&&Ee.addToRenderList(s,f),this.info.render.frame++,Oe===!0&&re.beginShadows();const y=r.state.shadowsArray;ge.render(y,f,b),Oe===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=s.opaque,P=s.transmissive;if(r.setupLights(),b.isArrayCamera){const te=b.cameras;if(P.length>0)for(let le=0,he=te.length;le<he;le++){const de=te[le];Qn(O,P,f,de)}Ae&&Ee.render(f);for(let le=0,he=te.length;le<he;le++){const de=te[le];Zn(s,f,de,de.viewport)}}else P.length>0&&Qn(O,P,f,b),Ae&&Ee.render(f),Zn(s,f,b);X!==null&&F===0&&(Ne.updateMultisampleRenderTarget(X),Ne.updateRenderTargetMipmap(X)),f.isScene===!0&&f.onAfterRender(E,f,b),ce.resetDefaultState(),h=-1,u=null,R.pop(),R.length>0?(r=R[R.length-1],Oe===!0&&re.setGlobalState(E.clippingPlanes,r.state.camera)):r=null,A.pop(),A.length>0?s=A[A.length-1]:s=null};function Tn(f,b,y,O){if(f.visible===!1)return;if(f.layers.test(b.layers)){if(f.isGroup)y=f.renderOrder;else if(f.isLOD)f.autoUpdate===!0&&f.update(b);else if(f.isLight)r.pushLight(f),f.castShadow&&r.pushShadow(f);else if(f.isSprite){if(!f.frustumCulled||Ke.intersectsSprite(f)){O&&C.setFromMatrixPosition(f.matrixWorld).applyMatrix4(Y);const le=I.update(f),he=f.material;he.visible&&s.push(f,le,he,y,C.z,null)}}else if((f.isMesh||f.isLine||f.isPoints)&&(!f.frustumCulled||Ke.intersectsObject(f))){const le=I.update(f),he=f.material;if(O&&(f.boundingSphere!==void 0?(f.boundingSphere===null&&f.computeBoundingSphere(),C.copy(f.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),C.copy(le.boundingSphere.center)),C.applyMatrix4(f.matrixWorld).applyMatrix4(Y)),Array.isArray(he)){const de=le.groups;for(let Ce=0,Le=de.length;Ce<Le;Ce++){const xe=de[Ce],Fe=he[xe.materialIndex];Fe&&Fe.visible&&s.push(f,le,Fe,y,C.z,xe)}}else he.visible&&s.push(f,le,he,y,C.z,null)}}const te=f.children;for(let le=0,he=te.length;le<he;le++)Tn(te[le],b,y,O)}function Zn(f,b,y,O){const P=f.opaque,te=f.transmissive,le=f.transparent;r.setupLightsView(y),Oe===!0&&re.setGlobalState(E.clippingPlanes,y),O&&me.viewport(U.copy(O)),P.length>0&&rn(P,b,y),te.length>0&&rn(te,b,y),le.length>0&&rn(le,b,y),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Qn(f,b,y,O){if((y.isScene===!0?y.overrideMaterial:null)!==null)return;r.state.transmissionRenderTarget[O.id]===void 0&&(r.state.transmissionRenderTarget[O.id]=new kt(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float")?vn:yt,minFilter:Yt,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const te=r.state.transmissionRenderTarget[O.id],le=O.viewport||U;te.setSize(le.z*E.transmissionResolutionScale,le.w*E.transmissionResolutionScale);const he=E.getRenderTarget(),de=E.getActiveCubeFace(),Ce=E.getActiveMipmapLevel();E.setRenderTarget(te),E.getClearColor(Z),Q=E.getClearAlpha(),Q<1&&E.setClearColor(16777215,.5),E.clear(),Ae&&Ee.render(y);const Le=E.toneMapping;E.toneMapping=Ct;const xe=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),r.setupLightsView(O),Oe===!0&&re.setGlobalState(E.clippingPlanes,O),rn(f,y,O),Ne.updateMultisampleRenderTarget(te),Ne.updateRenderTargetMipmap(te),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let ke=0,nt=b.length;ke<nt;ke++){const Ye=b[ke],We=Ye.object,Re=Ye.geometry,et=Ye.material,Ge=Ye.group;if(et.side===Mt&&We.layers.test(O.layers)){const pt=et.side;et.side=vt,et.needsUpdate=!0,Jn(We,y,O,Re,et,Ge),et.side=pt,et.needsUpdate=!0,Fe=!0}}Fe===!0&&(Ne.updateMultisampleRenderTarget(te),Ne.updateRenderTargetMipmap(te))}E.setRenderTarget(he,de,Ce),E.setClearColor(Z,Q),xe!==void 0&&(O.viewport=xe),E.toneMapping=Le}function rn(f,b,y){const O=b.isScene===!0?b.overrideMaterial:null;for(let P=0,te=f.length;P<te;P++){const le=f[P],he=le.object,de=le.geometry,Ce=le.group;let Le=le.material;Le.allowOverride===!0&&O!==null&&(Le=O),he.layers.test(y.layers)&&Jn(he,b,y,de,Le,Ce)}}function Jn(f,b,y,O,P,te){f.onBeforeRender(E,b,y,O,P,te),f.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,f.matrixWorld),f.normalMatrix.getNormalMatrix(f.modelViewMatrix),P.onBeforeRender(E,b,y,O,f,te),P.transparent===!0&&P.side===Mt&&P.forceSinglePass===!1?(P.side=vt,P.needsUpdate=!0,E.renderBufferDirect(y,b,O,P,f,te),P.side=jt,P.needsUpdate=!0,E.renderBufferDirect(y,b,O,P,f,te),P.side=Mt):E.renderBufferDirect(y,b,O,P,f,te),f.onAfterRender(E,b,y,O,P,te)}function an(f,b,y){b.isScene!==!0&&(b=j);const O=ve.get(f),P=r.state.lights,te=r.state.shadowsArray,le=P.state.version,he=z.getParameters(f,P.state,te,b,y),de=z.getProgramCacheKey(he);let Ce=O.programs;O.environment=f.isMeshStandardMaterial?b.environment:null,O.fog=b.fog,O.envMap=(f.isMeshStandardMaterial?it:st).get(f.envMap||O.environment),O.envMapRotation=O.environment!==null&&f.envMap===null?b.environmentRotation:f.envMapRotation,Ce===void 0&&(f.addEventListener("dispose",$),Ce=new Map,O.programs=Ce);let Le=Ce.get(de);if(Le!==void 0){if(O.currentProgram===Le&&O.lightsStateVersion===le)return ei(f,he),Le}else he.uniforms=z.getUniforms(f),f.onBeforeCompile(he,E),Le=z.acquireProgram(he,de),Ce.set(de,Le),O.uniforms=he.uniforms;const xe=O.uniforms;return(!f.isShaderMaterial&&!f.isRawShaderMaterial||f.clipping===!0)&&(xe.clippingPlanes=re.uniform),ei(f,he),O.needsLights=Br(f),O.lightsStateVersion=le,O.needsLights&&(xe.ambientLightColor.value=P.state.ambient,xe.lightProbe.value=P.state.probe,xe.directionalLights.value=P.state.directional,xe.directionalLightShadows.value=P.state.directionalShadow,xe.spotLights.value=P.state.spot,xe.spotLightShadows.value=P.state.spotShadow,xe.rectAreaLights.value=P.state.rectArea,xe.ltc_1.value=P.state.rectAreaLTC1,xe.ltc_2.value=P.state.rectAreaLTC2,xe.pointLights.value=P.state.point,xe.pointLightShadows.value=P.state.pointShadow,xe.hemisphereLights.value=P.state.hemi,xe.directionalShadowMap.value=P.state.directionalShadowMap,xe.directionalShadowMatrix.value=P.state.directionalShadowMatrix,xe.spotShadowMap.value=P.state.spotShadowMap,xe.spotLightMatrix.value=P.state.spotLightMatrix,xe.spotLightMap.value=P.state.spotLightMap,xe.pointShadowMap.value=P.state.pointShadowMap,xe.pointShadowMatrix.value=P.state.pointShadowMatrix),O.currentProgram=Le,O.uniformsList=null,Le}function jn(f){if(f.uniformsList===null){const b=f.currentProgram.getUniforms();f.uniformsList=pn.seqWithValue(b.seq,f.uniforms)}return f.uniformsList}function ei(f,b){const y=ve.get(f);y.outputColorSpace=b.outputColorSpace,y.batching=b.batching,y.batchingColor=b.batchingColor,y.instancing=b.instancing,y.instancingColor=b.instancingColor,y.instancingMorph=b.instancingMorph,y.skinning=b.skinning,y.morphTargets=b.morphTargets,y.morphNormals=b.morphNormals,y.morphColors=b.morphColors,y.morphTargetsCount=b.morphTargetsCount,y.numClippingPlanes=b.numClippingPlanes,y.numIntersection=b.numClipIntersection,y.vertexAlphas=b.vertexAlphas,y.vertexTangents=b.vertexTangents,y.toneMapping=b.toneMapping}function Fr(f,b,y,O,P){b.isScene!==!0&&(b=j),Ne.resetTextureUnits();const te=b.fog,le=O.isMeshStandardMaterial?b.environment:null,he=X===null?E.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:gn,de=(O.isMeshStandardMaterial?it:st).get(O.envMap||le),Ce=O.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,Le=!!y.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),xe=!!y.morphAttributes.position,Fe=!!y.morphAttributes.normal,ke=!!y.morphAttributes.color;let nt=Ct;O.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(nt=E.toneMapping);const Ye=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,We=Ye!==void 0?Ye.length:0,Re=ve.get(O),et=r.state.lights;if(Oe===!0&&(W===!0||f!==u)){const ct=f===u&&O.id===h;re.setState(O,f,ct)}let Ge=!1;O.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==et.state.version||Re.outputColorSpace!==he||P.isBatchedMesh&&Re.batching===!1||!P.isBatchedMesh&&Re.batching===!0||P.isBatchedMesh&&Re.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&Re.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&Re.instancing===!1||!P.isInstancedMesh&&Re.instancing===!0||P.isSkinnedMesh&&Re.skinning===!1||!P.isSkinnedMesh&&Re.skinning===!0||P.isInstancedMesh&&Re.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&Re.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&Re.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&Re.instancingMorph===!1&&P.morphTexture!==null||Re.envMap!==de||O.fog===!0&&Re.fog!==te||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==re.numPlanes||Re.numIntersection!==re.numIntersection)||Re.vertexAlphas!==Ce||Re.vertexTangents!==Le||Re.morphTargets!==xe||Re.morphNormals!==Fe||Re.morphColors!==ke||Re.toneMapping!==nt||Re.morphTargetsCount!==We)&&(Ge=!0):(Ge=!0,Re.__version=O.version);let pt=Re.currentProgram;Ge===!0&&(pt=an(O,b,P));let Ot=!1,ht=!1,Xt=!1;const tt=pt.getUniforms(),_t=Re.uniforms;if(me.useProgram(pt.program)&&(Ot=!0,ht=!0,Xt=!0),O.id!==h&&(h=O.id,ht=!0),Ot||u!==f){me.buffers.depth.getReversed()&&f.reversedDepth!==!0&&(f._reversedDepth=!0,f.updateProjectionMatrix()),tt.setValue(v,"projectionMatrix",f.projectionMatrix),tt.setValue(v,"viewMatrix",f.matrixWorldInverse);const lt=tt.map.cameraPosition;lt!==void 0&&lt.setValue(v,G.setFromMatrixPosition(f.matrixWorld)),Pe.logarithmicDepthBuffer&&tt.setValue(v,"logDepthBufFC",2/(Math.log(f.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&tt.setValue(v,"isOrthographic",f.isOrthographicCamera===!0),u!==f&&(u=f,ht=!0,Xt=!0)}if(P.isSkinnedMesh){tt.setOptional(v,P,"bindMatrix"),tt.setOptional(v,P,"bindMatrixInverse");const ct=P.skeleton;ct&&(ct.boneTexture===null&&ct.computeBoneTexture(),tt.setValue(v,"boneTexture",ct.boneTexture,Ne))}P.isBatchedMesh&&(tt.setOptional(v,P,"batchingTexture"),tt.setValue(v,"batchingTexture",P._matricesTexture,Ne),tt.setOptional(v,P,"batchingIdTexture"),tt.setValue(v,"batchingIdTexture",P._indirectTexture,Ne),tt.setOptional(v,P,"batchingColorTexture"),P._colorsTexture!==null&&tt.setValue(v,"batchingColorTexture",P._colorsTexture,Ne));const mt=y.morphAttributes;if((mt.position!==void 0||mt.normal!==void 0||mt.color!==void 0)&&ne.update(P,y,pt),(ht||Re.receiveShadow!==P.receiveShadow)&&(Re.receiveShadow=P.receiveShadow,tt.setValue(v,"receiveShadow",P.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(_t.envMap.value=de,_t.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&b.environment!==null&&(_t.envMapIntensity.value=b.environmentIntensity),ht&&(tt.setValue(v,"toneMappingExposure",E.toneMappingExposure),Re.needsLights&&Or(_t,Xt),te&&O.fog===!0&&J.refreshFogUniforms(_t,te),J.refreshMaterialUniforms(_t,O,k,ae,r.state.transmissionRenderTarget[f.id]),pn.upload(v,jn(Re),_t,Ne)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(pn.upload(v,jn(Re),_t,Ne),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&tt.setValue(v,"center",P.center),tt.setValue(v,"modelViewMatrix",P.modelViewMatrix),tt.setValue(v,"normalMatrix",P.normalMatrix),tt.setValue(v,"modelMatrix",P.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const ct=O.uniformsGroups;for(let lt=0,Mn=ct.length;lt<Mn;lt++){const Pt=ct[lt];we.update(Pt,pt),we.bind(Pt,pt)}}return pt}function Or(f,b){f.ambientLightColor.needsUpdate=b,f.lightProbe.needsUpdate=b,f.directionalLights.needsUpdate=b,f.directionalLightShadows.needsUpdate=b,f.pointLights.needsUpdate=b,f.pointLightShadows.needsUpdate=b,f.spotLights.needsUpdate=b,f.spotLightShadows.needsUpdate=b,f.rectAreaLights.needsUpdate=b,f.hemisphereLights.needsUpdate=b}function Br(f){return f.isMeshLambertMaterial||f.isMeshToonMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isShadowMaterial||f.isShaderMaterial&&f.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(f,b,y){const O=ve.get(f);O.__autoAllocateDepthBuffer=f.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),ve.get(f.texture).__webglTexture=b,ve.get(f.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:y,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(f,b){const y=ve.get(f);y.__webglFramebuffer=b,y.__useDefaultFramebuffer=b===void 0};const Gr=v.createFramebuffer();this.setRenderTarget=function(f,b=0,y=0){X=f,D=b,F=y;let O=!0,P=null,te=!1,le=!1;if(f){const de=ve.get(f);if(de.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(v.FRAMEBUFFER,null),O=!1;else if(de.__webglFramebuffer===void 0)Ne.setupRenderTarget(f);else if(de.__hasExternalTextures)Ne.rebindTextures(f,ve.get(f.texture).__webglTexture,ve.get(f.depthTexture).__webglTexture);else if(f.depthBuffer){const xe=f.depthTexture;if(de.__boundDepthTexture!==xe){if(xe!==null&&ve.has(xe)&&(f.width!==xe.image.width||f.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(f)}}const Ce=f.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(le=!0);const Le=ve.get(f).__webglFramebuffer;f.isWebGLCubeRenderTarget?(Array.isArray(Le[b])?P=Le[b][y]:P=Le[b],te=!0):f.samples>0&&Ne.useMultisampledRTT(f)===!1?P=ve.get(f).__webglMultisampledFramebuffer:Array.isArray(Le)?P=Le[y]:P=Le,U.copy(f.viewport),H.copy(f.scissor),q=f.scissorTest}else U.copy(Ue).multiplyScalar(k).floor(),H.copy(Be).multiplyScalar(k).floor(),q=Ze;if(y!==0&&(P=Gr),me.bindFramebuffer(v.FRAMEBUFFER,P)&&O&&me.drawBuffers(f,P),me.viewport(U),me.scissor(H),me.setScissorTest(q),te){const de=ve.get(f.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_CUBE_MAP_POSITIVE_X+b,de.__webglTexture,y)}else if(le){const de=b;for(let Ce=0;Ce<f.textures.length;Ce++){const Le=ve.get(f.textures[Ce]);v.framebufferTextureLayer(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0+Ce,Le.__webglTexture,y,de)}}else if(f!==null&&y!==0){const de=ve.get(f.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,de.__webglTexture,y)}h=-1},this.readRenderTargetPixels=function(f,b,y,O,P,te,le,he=0){if(!(f&&f.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=ve.get(f).__webglFramebuffer;if(f.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de){me.bindFramebuffer(v.FRAMEBUFFER,de);try{const Ce=f.textures[he],Le=Ce.format,xe=Ce.type;if(!Pe.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}b>=0&&b<=f.width-O&&y>=0&&y<=f.height-P&&(f.textures.length>1&&v.readBuffer(v.COLOR_ATTACHMENT0+he),v.readPixels(b,y,O,P,Se.convert(Le),Se.convert(xe),te))}finally{const Ce=X!==null?ve.get(X).__webglFramebuffer:null;me.bindFramebuffer(v.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(f,b,y,O,P,te,le,he=0){if(!(f&&f.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=ve.get(f).__webglFramebuffer;if(f.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de)if(b>=0&&b<=f.width-O&&y>=0&&y<=f.height-P){me.bindFramebuffer(v.FRAMEBUFFER,de);const Ce=f.textures[he],Le=Ce.format,xe=Ce.type;if(!Pe.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Fe=v.createBuffer();v.bindBuffer(v.PIXEL_PACK_BUFFER,Fe),v.bufferData(v.PIXEL_PACK_BUFFER,te.byteLength,v.STREAM_READ),f.textures.length>1&&v.readBuffer(v.COLOR_ATTACHMENT0+he),v.readPixels(b,y,O,P,Se.convert(Le),Se.convert(xe),0);const ke=X!==null?ve.get(X).__webglFramebuffer:null;me.bindFramebuffer(v.FRAMEBUFFER,ke);const nt=v.fenceSync(v.SYNC_GPU_COMMANDS_COMPLETE,0);return v.flush(),await zr(v,nt,4),v.bindBuffer(v.PIXEL_PACK_BUFFER,Fe),v.getBufferSubData(v.PIXEL_PACK_BUFFER,0,te),v.deleteBuffer(Fe),v.deleteSync(nt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(f,b=null,y=0){const O=Math.pow(2,-y),P=Math.floor(f.image.width*O),te=Math.floor(f.image.height*O),le=b!==null?b.x:0,he=b!==null?b.y:0;Ne.setTexture2D(f,0),v.copyTexSubImage2D(v.TEXTURE_2D,y,0,0,le,he,P,te),me.unbindTexture()};const Hr=v.createFramebuffer(),Vr=v.createFramebuffer();this.copyTextureToTexture=function(f,b,y=null,O=null,P=0,te=null){te===null&&(P!==0?(yn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=P,P=0):te=0);let le,he,de,Ce,Le,xe,Fe,ke,nt;const Ye=f.isCompressedTexture?f.mipmaps[te]:f.image;if(y!==null)le=y.max.x-y.min.x,he=y.max.y-y.min.y,de=y.isBox3?y.max.z-y.min.z:1,Ce=y.min.x,Le=y.min.y,xe=y.isBox3?y.min.z:0;else{const mt=Math.pow(2,-P);le=Math.floor(Ye.width*mt),he=Math.floor(Ye.height*mt),f.isDataArrayTexture?de=Ye.depth:f.isData3DTexture?de=Math.floor(Ye.depth*mt):de=1,Ce=0,Le=0,xe=0}O!==null?(Fe=O.x,ke=O.y,nt=O.z):(Fe=0,ke=0,nt=0);const We=Se.convert(b.format),Re=Se.convert(b.type);let et;b.isData3DTexture?(Ne.setTexture3D(b,0),et=v.TEXTURE_3D):b.isDataArrayTexture||b.isCompressedArrayTexture?(Ne.setTexture2DArray(b,0),et=v.TEXTURE_2D_ARRAY):(Ne.setTexture2D(b,0),et=v.TEXTURE_2D),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,b.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,b.unpackAlignment);const Ge=v.getParameter(v.UNPACK_ROW_LENGTH),pt=v.getParameter(v.UNPACK_IMAGE_HEIGHT),Ot=v.getParameter(v.UNPACK_SKIP_PIXELS),ht=v.getParameter(v.UNPACK_SKIP_ROWS),Xt=v.getParameter(v.UNPACK_SKIP_IMAGES);v.pixelStorei(v.UNPACK_ROW_LENGTH,Ye.width),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,Ye.height),v.pixelStorei(v.UNPACK_SKIP_PIXELS,Ce),v.pixelStorei(v.UNPACK_SKIP_ROWS,Le),v.pixelStorei(v.UNPACK_SKIP_IMAGES,xe);const tt=f.isDataArrayTexture||f.isData3DTexture,_t=b.isDataArrayTexture||b.isData3DTexture;if(f.isDepthTexture){const mt=ve.get(f),ct=ve.get(b),lt=ve.get(mt.__renderTarget),Mn=ve.get(ct.__renderTarget);me.bindFramebuffer(v.READ_FRAMEBUFFER,lt.__webglFramebuffer),me.bindFramebuffer(v.DRAW_FRAMEBUFFER,Mn.__webglFramebuffer);for(let Pt=0;Pt<de;Pt++)tt&&(v.framebufferTextureLayer(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,ve.get(f).__webglTexture,P,xe+Pt),v.framebufferTextureLayer(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,ve.get(b).__webglTexture,te,nt+Pt)),v.blitFramebuffer(Ce,Le,le,he,Fe,ke,le,he,v.DEPTH_BUFFER_BIT,v.NEAREST);me.bindFramebuffer(v.READ_FRAMEBUFFER,null),me.bindFramebuffer(v.DRAW_FRAMEBUFFER,null)}else if(P!==0||f.isRenderTargetTexture||ve.has(f)){const mt=ve.get(f),ct=ve.get(b);me.bindFramebuffer(v.READ_FRAMEBUFFER,Hr),me.bindFramebuffer(v.DRAW_FRAMEBUFFER,Vr);for(let lt=0;lt<de;lt++)tt?v.framebufferTextureLayer(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,mt.__webglTexture,P,xe+lt):v.framebufferTexture2D(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,mt.__webglTexture,P),_t?v.framebufferTextureLayer(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,ct.__webglTexture,te,nt+lt):v.framebufferTexture2D(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,ct.__webglTexture,te),P!==0?v.blitFramebuffer(Ce,Le,le,he,Fe,ke,le,he,v.COLOR_BUFFER_BIT,v.NEAREST):_t?v.copyTexSubImage3D(et,te,Fe,ke,nt+lt,Ce,Le,le,he):v.copyTexSubImage2D(et,te,Fe,ke,Ce,Le,le,he);me.bindFramebuffer(v.READ_FRAMEBUFFER,null),me.bindFramebuffer(v.DRAW_FRAMEBUFFER,null)}else _t?f.isDataTexture||f.isData3DTexture?v.texSubImage3D(et,te,Fe,ke,nt,le,he,de,We,Re,Ye.data):b.isCompressedArrayTexture?v.compressedTexSubImage3D(et,te,Fe,ke,nt,le,he,de,We,Ye.data):v.texSubImage3D(et,te,Fe,ke,nt,le,he,de,We,Re,Ye):f.isDataTexture?v.texSubImage2D(v.TEXTURE_2D,te,Fe,ke,le,he,We,Re,Ye.data):f.isCompressedTexture?v.compressedTexSubImage2D(v.TEXTURE_2D,te,Fe,ke,Ye.width,Ye.height,We,Ye.data):v.texSubImage2D(v.TEXTURE_2D,te,Fe,ke,le,he,We,Re,Ye);v.pixelStorei(v.UNPACK_ROW_LENGTH,Ge),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,pt),v.pixelStorei(v.UNPACK_SKIP_PIXELS,Ot),v.pixelStorei(v.UNPACK_SKIP_ROWS,ht),v.pixelStorei(v.UNPACK_SKIP_IMAGES,Xt),te===0&&b.generateMipmaps&&v.generateMipmap(et),me.unbindTexture()},this.initRenderTarget=function(f){ve.get(f).__webglFramebuffer===void 0&&Ne.setupRenderTarget(f)},this.initTexture=function(f){f.isCubeTexture?Ne.setTextureCube(f,0):f.isData3DTexture?Ne.setTexture3D(f,0):f.isDataArrayTexture||f.isCompressedArrayTexture?Ne.setTexture2DArray(f,0):Ne.setTexture2D(f,0),me.unbindTexture()},this.resetState=function(){D=0,F=0,X=null,me.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(n),t.unpackColorSpace=rt._getUnpackColorSpace()}}const w={BLEND:3042,CULL_FACE:2884,DEPTH_TEST:2929,DITHER:3024,POLYGON_OFFSET_FILL:32823,SAMPLE_ALPHA_TO_COVERAGE:32926,SAMPLE_COVERAGE:32928,SCISSOR_TEST:3089,STENCIL_TEST:2960,RASTERIZER_DISCARD:35977,BLEND_COLOR:32773,BLEND_EQUATION_RGB:32777,BLEND_EQUATION_ALPHA:34877,BLEND_SRC_RGB:32969,BLEND_DST_RGB:32968,BLEND_SRC_ALPHA:32971,BLEND_DST_ALPHA:32970,COLOR_CLEAR_VALUE:3106,DEPTH_CLEAR_VALUE:2931,STENCIL_CLEAR_VALUE:2961,COLOR_WRITEMASK:3107,CULL_FACE_MODE:2885,DEPTH_FUNC:2932,DEPTH_WRITEMASK:2930,DEPTH_RANGE:2928,FRONT_FACE:2886,LINE_WIDTH:2849,POLYGON_OFFSET_FACTOR:32824,POLYGON_OFFSET_UNITS:10752,SAMPLE_COVERAGE_VALUE:32938,SAMPLE_COVERAGE_INVERT:32939,SCISSOR_BOX:3088,VIEWPORT:2978,FRONT:1028,BACK:1029,STENCIL_FUNC:2962,STENCIL_REF:2967,STENCIL_VALUE_MASK:2963,STENCIL_BACK_FUNC:34816,STENCIL_BACK_REF:36003,STENCIL_BACK_VALUE_MASK:36004,STENCIL_FAIL:2964,STENCIL_PASS_DEPTH_FAIL:2965,STENCIL_PASS_DEPTH_PASS:2966,STENCIL_BACK_FAIL:34817,STENCIL_BACK_PASS_DEPTH_FAIL:34818,STENCIL_BACK_PASS_DEPTH_PASS:34819,STENCIL_WRITEMASK:2968,STENCIL_BACK_WRITEMASK:36005,GENERATE_MIPMAP_HINT:33170,FRAGMENT_SHADER_DERIVATIVE_HINT:35723,PACK_ALIGNMENT:3333,UNPACK_ALIGNMENT:3317,UNPACK_FLIP_Y_WEBGL:37440,UNPACK_PREMULTIPLY_ALPHA_WEBGL:37441,UNPACK_COLORSPACE_CONVERSION_WEBGL:37443,PACK_ROW_LENGTH:3330,PACK_SKIP_PIXELS:3332,PACK_SKIP_ROWS:3331,UNPACK_ROW_LENGTH:3314,UNPACK_IMAGE_HEIGHT:32878,UNPACK_SKIP_PIXELS:3316,UNPACK_SKIP_ROWS:3315,UNPACK_SKIP_IMAGES:32877,READ_FRAMEBUFFER:36008,DRAW_FRAMEBUFFER:36009,RENDERBUFFER:36161,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,COPY_READ_BUFFER:36662,COPY_WRITE_BUFFER:36663,PIXEL_PACK_BUFFER:35051,PIXEL_UNPACK_BUFFER:35052,UNIFORM_BUFFER:35345,TRANSFORM_FEEDBACK:36386,TRANSFORM_FEEDBACK_BUFFER:35982,TEXTURE0:33984,TEXTURE_2D:3553,TEXTURE_CUBE_MAP:34067,TEXTURE_3D:32879,TEXTURE_2D_ARRAY:35866,CURRENT_VERTEX_ATTRIB:34342,MAX_VERTEX_ATTRIBS:34921},wr=[w.BLEND,w.CULL_FACE,w.DEPTH_TEST,w.DITHER,w.POLYGON_OFFSET_FILL,w.SAMPLE_ALPHA_TO_COVERAGE,w.SAMPLE_COVERAGE,w.SCISSOR_TEST,w.STENCIL_TEST,w.RASTERIZER_DISCARD],Nr=[w.PACK_ALIGNMENT,w.UNPACK_ALIGNMENT,w.UNPACK_FLIP_Y_WEBGL,w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.UNPACK_COLORSPACE_CONVERSION_WEBGL,w.PACK_ROW_LENGTH,w.PACK_SKIP_PIXELS,w.PACK_SKIP_ROWS,w.UNPACK_ROW_LENGTH,w.UNPACK_IMAGE_HEIGHT,w.UNPACK_SKIP_PIXELS,w.UNPACK_SKIP_ROWS,w.UNPACK_SKIP_IMAGES],nd=[w.ARRAY_BUFFER,w.COPY_READ_BUFFER,w.COPY_WRITE_BUFFER,w.PIXEL_PACK_BUFFER,w.PIXEL_UNPACK_BUFFER,w.TRANSFORM_FEEDBACK_BUFFER,w.UNIFORM_BUFFER],id=[w.TEXTURE_2D,w.TEXTURE_CUBE_MAP,w.TEXTURE_3D,w.TEXTURE_2D_ARRAY],lr=36160,rd=256,ad=()=>{let e=null,n=null,t=null,i=null,l=null,a=null,d=null;const c=new Map,x=new Map;let T=0;const L=new Map,m=new Map,_=g=>{let s=L.get(g);return s||(s=new Map,L.set(g,s)),s},S=g=>g!=null&&typeof g=="object"?g:null,N=g=>{e===g&&(e=null),n===g&&(n=null),t===g&&(t=null),i===g&&(i=null),l===g&&(l=null),d===g&&(d=null);for(const[s,r]of c)r===g&&c.set(s,null);for(const[s,r]of x)r.buffer===g&&x.set(s,{buffer:null,offset:0,size:0});for(const s of L.values())for(const[r,A]of s)A===g&&s.set(r,null);for(const[s,r]of m)r===g&&m.set(s,null)};return{observe(g,s){switch(g){case"bindFramebuffer":{const r=s[0],A=S(s[1]);(r===lr||r===w.DRAW_FRAMEBUFFER)&&(e=A),(r===lr||r===w.READ_FRAMEBUFFER)&&(n=A);break}case"bindRenderbuffer":t=S(s[1]);break;case"bindVertexArray":i=S(s[0]);break;case"bindBuffer":{const r=s[0];r===w.ELEMENT_ARRAY_BUFFER?i===null&&(l=S(s[1])):c.set(r,S(s[1]));break}case"bindBufferBase":case"bindBufferRange":{const r=s[0],A=S(s[2]);c.set(r,A),r===w.UNIFORM_BUFFER&&x.set(s[1],{buffer:A,offset:g==="bindBufferRange"?s[3]:0,size:g==="bindBufferRange"?s[4]:0});break}case"useProgram":a=S(s[0]);break;case"bindTransformFeedback":d=S(s[1]);break;case"activeTexture":{const r=s[0]-w.TEXTURE0;r>=0&&r<rd&&(T=r);break}case"bindTexture":_(T).set(s[0],S(s[1]));break;case"bindSampler":m.set(s[0],S(s[1]));break;case"deleteFramebuffer":case"deleteRenderbuffer":case"deleteVertexArray":case"deleteBuffer":case"deleteTexture":case"deleteSampler":case"deleteTransformFeedback":{const r=S(s[0]);r&&N(r);break}}},emit(g){g("bindFramebuffer",w.READ_FRAMEBUFFER,n),g("bindFramebuffer",w.DRAW_FRAMEBUFFER,e),g("bindRenderbuffer",w.RENDERBUFFER,t),g("bindVertexArray",null),g("bindBuffer",w.ELEMENT_ARRAY_BUFFER,l),g("bindVertexArray",i),g("bindTransformFeedback",w.TRANSFORM_FEEDBACK,d);for(const[r,A]of x)A.buffer&&A.size>0?g("bindBufferRange",w.UNIFORM_BUFFER,r,A.buffer,A.offset,A.size):g("bindBufferBase",w.UNIFORM_BUFFER,r,A.buffer);for(const r of nd)c.has(r)&&g("bindBuffer",r,c.get(r)??null);g("useProgram",a);const s=new Set([...L.keys(),...m.keys()]);for(const r of s){g("activeTexture",w.TEXTURE0+r);for(const A of id)g("bindTexture",A,L.get(r)?.get(A)??null);g("bindSampler",r,m.get(r)??null)}g("activeTexture",w.TEXTURE0+T)}}},od=(e,n,t,i)=>{const l=[],a=e,d=m=>a.getParameter(m),c=(m,..._)=>{l.push({name:m,args:_.map(t)})},x=m=>Array.from(m),T=m=>Array.from(m);if(n.emit(c),i)return i.emit(c),l;for(const m of wr)c(a.isEnabled(m)?"enable":"disable",m);c("blendColor",...x(d(w.BLEND_COLOR))),c("blendEquationSeparate",d(w.BLEND_EQUATION_RGB),d(w.BLEND_EQUATION_ALPHA)),c("blendFuncSeparate",d(w.BLEND_SRC_RGB),d(w.BLEND_DST_RGB),d(w.BLEND_SRC_ALPHA),d(w.BLEND_DST_ALPHA)),c("colorMask",...T(d(w.COLOR_WRITEMASK))),c("clearColor",...x(d(w.COLOR_CLEAR_VALUE))),c("clearDepth",d(w.DEPTH_CLEAR_VALUE)),c("clearStencil",d(w.STENCIL_CLEAR_VALUE)),c("cullFace",d(w.CULL_FACE_MODE)),c("frontFace",d(w.FRONT_FACE)),c("depthFunc",d(w.DEPTH_FUNC)),c("depthMask",d(w.DEPTH_WRITEMASK)),c("depthRange",...x(d(w.DEPTH_RANGE))),c("lineWidth",d(w.LINE_WIDTH)),c("polygonOffset",d(w.POLYGON_OFFSET_FACTOR),d(w.POLYGON_OFFSET_UNITS)),c("sampleCoverage",d(w.SAMPLE_COVERAGE_VALUE),d(w.SAMPLE_COVERAGE_INVERT)),c("stencilFuncSeparate",w.FRONT,d(w.STENCIL_FUNC),d(w.STENCIL_REF),d(w.STENCIL_VALUE_MASK)),c("stencilFuncSeparate",w.BACK,d(w.STENCIL_BACK_FUNC),d(w.STENCIL_BACK_REF),d(w.STENCIL_BACK_VALUE_MASK)),c("stencilOpSeparate",w.FRONT,d(w.STENCIL_FAIL),d(w.STENCIL_PASS_DEPTH_FAIL),d(w.STENCIL_PASS_DEPTH_PASS)),c("stencilOpSeparate",w.BACK,d(w.STENCIL_BACK_FAIL),d(w.STENCIL_BACK_PASS_DEPTH_FAIL),d(w.STENCIL_BACK_PASS_DEPTH_PASS)),c("stencilMaskSeparate",w.FRONT,d(w.STENCIL_WRITEMASK)),c("stencilMaskSeparate",w.BACK,d(w.STENCIL_BACK_WRITEMASK)),c("hint",w.GENERATE_MIPMAP_HINT,d(w.GENERATE_MIPMAP_HINT)),c("hint",w.FRAGMENT_SHADER_DERIVATIVE_HINT,d(w.FRAGMENT_SHADER_DERIVATIVE_HINT));for(const m of Nr){const _=d(m);c("pixelStorei",m,typeof _=="boolean"?_?1:0:_)}const L=d(w.MAX_VERTEX_ATTRIBS);for(let m=0;m<L;m+=1){const _=a.getVertexAttrib(m,w.CURRENT_VERTEX_ATTRIB);_&&(_ instanceof Int32Array?c("vertexAttribI4iv",m,Array.from(_)):_ instanceof Uint32Array?c("vertexAttribI4uiv",m,Array.from(_)):c("vertexAttrib4fv",m,Array.from(_)))}return c("scissor",...x(d(w.SCISSOR_BOX))),c("viewport",...x(d(w.VIEWPORT))),l},sd=1032,cd=32769,ld=32770,fd=32771,dd=32772,ud=37444,pd=new Set([w.UNPACK_FLIP_Y_WEBGL,w.UNPACK_PREMULTIPLY_ALPHA_WEBGL]),hd=new Set([w.PACK_ALIGNMENT,w.UNPACK_ALIGNMENT]),_d=e=>{const n=e,t=G=>n.getParameter(G),i=G=>Array.from(G),l=G=>Array.from(G),a=G=>Number(G)|0,d=G=>Number(G)>>>0,c=G=>Math.fround(Number(G));let x=new Map,T=[],L=[],m=[],_=[],S=[],N,g,s,r,A,R,E=[],B,D=[],F=[],X={front:[],back:[]},h={front:[],back:[]},u={front:0,back:0},U=new Map,H=new Map,q=new Map,Z=[],Q=[];const K=(G,C)=>pd.has(G)?typeof C=="boolean"?C?1:0:a(C)!==0?1:0:a(C),ae=()=>{x=new Map(wr.map(C=>[C,n.isEnabled(C)])),T=i(t(w.BLEND_COLOR)),L=[t(w.BLEND_EQUATION_RGB),t(w.BLEND_EQUATION_ALPHA)],m=[t(w.BLEND_SRC_RGB),t(w.BLEND_DST_RGB),t(w.BLEND_SRC_ALPHA),t(w.BLEND_DST_ALPHA)],_=l(t(w.COLOR_WRITEMASK)),S=i(t(w.COLOR_CLEAR_VALUE)),N=t(w.DEPTH_CLEAR_VALUE),g=t(w.STENCIL_CLEAR_VALUE),s=t(w.CULL_FACE_MODE),r=t(w.FRONT_FACE),A=t(w.DEPTH_FUNC),R=!!t(w.DEPTH_WRITEMASK),E=i(t(w.DEPTH_RANGE)),B=t(w.LINE_WIDTH),D=[t(w.POLYGON_OFFSET_FACTOR),t(w.POLYGON_OFFSET_UNITS)],F=[t(w.SAMPLE_COVERAGE_VALUE),t(w.SAMPLE_COVERAGE_INVERT)],X={front:[t(w.STENCIL_FUNC),t(w.STENCIL_REF),t(w.STENCIL_VALUE_MASK)],back:[t(w.STENCIL_BACK_FUNC),t(w.STENCIL_BACK_REF),t(w.STENCIL_BACK_VALUE_MASK)]},h={front:[t(w.STENCIL_FAIL),t(w.STENCIL_PASS_DEPTH_FAIL),t(w.STENCIL_PASS_DEPTH_PASS)],back:[t(w.STENCIL_BACK_FAIL),t(w.STENCIL_BACK_PASS_DEPTH_FAIL),t(w.STENCIL_BACK_PASS_DEPTH_PASS)]},u={front:t(w.STENCIL_WRITEMASK),back:t(w.STENCIL_BACK_WRITEMASK)},U=new Map([[w.GENERATE_MIPMAP_HINT,t(w.GENERATE_MIPMAP_HINT)],[w.FRAGMENT_SHADER_DERIVATIVE_HINT,t(w.FRAGMENT_SHADER_DERIVATIVE_HINT)]]),H=new Map(Nr.map(C=>[C,K(C,t(C))])),q=new Map;const G=t(w.MAX_VERTEX_ATTRIBS);for(let C=0;C<G;C+=1){const j=n.getVertexAttrib(C,w.CURRENT_VERTEX_ATTRIB);j&&(j instanceof Int32Array?q.set(C,["vertexAttribI4iv",Array.from(j)]):j instanceof Uint32Array?q.set(C,["vertexAttribI4uiv",Array.from(j)]):q.set(C,["vertexAttrib4fv",Array.from(j)]))}Z=i(t(w.SCISSOR_BOX)),Q=i(t(w.VIEWPORT))};ae();let k=!1;const pe=n.canvas;pe&&typeof pe.addEventListener=="function"&&(pe.addEventListener("webglcontextlost",()=>{k=!0}),pe.addEventListener("webglcontextrestored",()=>{k=!1,ae()}));const Me=G=>G===w.FRONT?["front"]:G===w.BACK?["back"]:G===sd?["front","back"]:[],Ue=G=>G===cd||G===ld,Be=G=>G===fd||G===dd,Ze=(G,C)=>!(Ue(G)&&Be(C)||Be(G)&&Ue(C)),Ke=G=>a(G[2])>=0&&a(G[3])>=0,Oe=(G,C)=>{const j=[0,0,0,1];for(let Ae=0;Ae<G;Ae+=1)j[Ae]=Number(C[1+Ae]);return j},W=(G,C)=>{const j=C;if(!j||typeof j.length!="number"||j.length<G)return null;const Ae=[0,0,0,1];for(let Qe=0;Qe<G;Qe+=1)Ae[Qe]=Number(j[Qe]);return Ae},Y=(G,C,j,Ae)=>{const Qe=Number(G)>>>0;!j||!q.has(Qe)||q.set(Qe,[C,Ae?j.map(Ae):j])};return{observe(G,C){if(!k)switch(G){case"enable":case"disable":x.has(C[0])&&x.set(C[0],G==="enable");break;case"blendColor":T=C.slice(0,4).map(c);break;case"blendEquation":L=[C[0],C[0]];break;case"blendEquationSeparate":L=[C[0],C[1]];break;case"blendFunc":Ze(C[0],C[1])&&(m=[C[0],C[1],C[0],C[1]]);break;case"blendFuncSeparate":Ze(C[0],C[1])&&(m=[C[0],C[1],C[2],C[3]]);break;case"colorMask":_=C.slice(0,4).map(Boolean);break;case"clearColor":S=C.slice(0,4).map(c);break;case"clearDepth":N=c(C[0]);break;case"clearStencil":g=a(C[0]);break;case"cullFace":s=C[0];break;case"frontFace":r=C[0];break;case"depthFunc":A=C[0];break;case"depthMask":R=!!C[0];break;case"depthRange":Number(C[0])>Number(C[1])||(E=[c(C[0]),c(C[1])]);break;case"lineWidth":Number(C[0])>0&&(B=c(C[0]));break;case"polygonOffset":D=[c(C[0]),c(C[1])];break;case"sampleCoverage":F=[c(C[0]),!!C[1]];break;case"stencilFunc":{const j=[C[0],a(C[1]),d(C[2])];X={front:j,back:[...j]};break}case"stencilFuncSeparate":for(const j of Me(C[0]))X[j]=[C[1],a(C[2]),d(C[3])];break;case"stencilOp":h={front:[C[0],C[1],C[2]],back:[C[0],C[1],C[2]]};break;case"stencilOpSeparate":for(const j of Me(C[0]))h[j]=[C[1],C[2],C[3]];break;case"stencilMask":u={front:d(C[0]),back:d(C[0])};break;case"stencilMaskSeparate":for(const j of Me(C[0]))u[j]=d(C[1]);break;case"hint":U.has(C[0])&&U.set(C[0],C[1]);break;case"pixelStorei":{const j=C[0];if(!H.has(j))break;const Ae=K(j,C[1]);if((hd.has(j)?![1,2,4,8].includes(Ae):Ae<0)||j===w.UNPACK_COLORSPACE_CONVERSION_WEBGL&&Ae!==0&&Ae!==ud)break;H.set(j,Ae);break}case"vertexAttrib1f":Y(C[0],"vertexAttrib4fv",Oe(1,C),c);break;case"vertexAttrib2f":Y(C[0],"vertexAttrib4fv",Oe(2,C),c);break;case"vertexAttrib3f":Y(C[0],"vertexAttrib4fv",Oe(3,C),c);break;case"vertexAttrib4f":Y(C[0],"vertexAttrib4fv",Oe(4,C),c);break;case"vertexAttrib1fv":Y(C[0],"vertexAttrib4fv",W(1,C[1]),c);break;case"vertexAttrib2fv":Y(C[0],"vertexAttrib4fv",W(2,C[1]),c);break;case"vertexAttrib3fv":Y(C[0],"vertexAttrib4fv",W(3,C[1]),c);break;case"vertexAttrib4fv":Y(C[0],"vertexAttrib4fv",W(4,C[1]),c);break;case"vertexAttribI4i":Y(C[0],"vertexAttribI4iv",Oe(4,C),a);break;case"vertexAttribI4iv":Y(C[0],"vertexAttribI4iv",W(4,C[1]),a);break;case"vertexAttribI4ui":Y(C[0],"vertexAttribI4uiv",Oe(4,C),d);break;case"vertexAttribI4uiv":Y(C[0],"vertexAttribI4uiv",W(4,C[1]),d);break;case"scissor":Ke(C)&&(Z=C.slice(0,4).map(a));break;case"viewport":Ke(C)&&(Q=C.slice(0,4).map(a));break}},emit(G){for(const[C,j]of x)G(j?"enable":"disable",C);G("blendColor",...T),G("blendEquationSeparate",...L),G("blendFuncSeparate",...m),G("colorMask",..._),G("clearColor",...S),G("clearDepth",N),G("clearStencil",g),G("cullFace",s),G("frontFace",r),G("depthFunc",A),G("depthMask",R),G("depthRange",...E),G("lineWidth",B),G("polygonOffset",...D),G("sampleCoverage",...F),G("stencilFuncSeparate",w.FRONT,...X.front),G("stencilFuncSeparate",w.BACK,...X.back),G("stencilOpSeparate",w.FRONT,...h.front),G("stencilOpSeparate",w.BACK,...h.back),G("stencilMaskSeparate",w.FRONT,u.front),G("stencilMaskSeparate",w.BACK,u.back);for(const[C,j]of U)G("hint",C,j);for(const[C,j]of H)G("pixelStorei",C,j);for(const[C,[j,Ae]]of q)G(j,C,[...Ae]);G("scissor",...Z),G("viewport",...Q)},reseed:ae}},md=new Set(["getParameter","getError","getContextAttributes","isContextLost","getSupportedExtensions","getShaderParameter","getProgramParameter","getActiveUniform","getActiveAttrib","getActiveUniforms","getActiveUniformBlockParameter","getActiveUniformBlockName","getShaderInfoLog","getProgramInfoLog","getAttribLocation","getUniformBlockIndex","getFragDataLocation","getUniformIndices","getUniform","isProgram","isShader","isBuffer","isTexture","isFramebuffer","isRenderbuffer","isVertexArray","isSampler","isSync","isQuery","isTransformFeedback","getBufferParameter","getFramebufferAttachmentParameter","getRenderbufferParameter","getSamplerParameter","getTexParameter","getVertexAttrib","getVertexAttribOffset","getQueryParameter","getQuery","getSyncParameter","getInternalformatParameter","getIndexedParameter","getTransformFeedbackVarying","checkFramebufferStatus","readPixels","getBufferSubData","clientWaitSync"]),vd=(e,n)=>md.has(e)?e==="readPixels"?typeof n[6]!="number":!0:!1,gd=new Set(["createBuffer","createTexture","createProgram","createShader","createFramebuffer","createRenderbuffer","createVertexArray","createSampler","createTransformFeedback","createQuery","getUniformLocation","fenceSync"]),Ed=(e,n,t={})=>{const i=new Map;let l=1;const a=ad(),d=(t.scalarState??"tracked")==="tracked"?_d(e):void 0;let c=null;const x=()=>{if(!c){if(typeof document>"u")throw new Error("NetGL recorder: image-source encoding needs a document. Worker hosts should convert image sources to ImageBitmap before passing to gl.texImage2D (and we can extend the encoder to take ImageBitmap directly with no 2D-canvas detour).");const S=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});if(!S)throw new Error("NetGL recorder: failed to get 2d context for scratch canvas");c=S}return c},T=_=>{const S=_,N=S.naturalWidth??S.videoWidth??S.width,g=S.naturalHeight??S.videoHeight??S.height;if(!N||!g)throw new Error(`NetGL recorder: image source has zero dims (${_.constructor.name})`);const s=x();s.canvas.width=N,s.canvas.height=g,s.clearRect(0,0,N,g),s.drawImage(_,0,0);const r=s.getImageData(0,0,N,g);return{__netgl_imagedata:!0,width:N,height:g,buffer:r.data.buffer}},L=_=>{if(_==null)return null;const S=typeof _;if(S==="number"||S==="string"||S==="boolean")return _;if(S!=="object")return null;const N=i.get(_);if(N!==void 0)return{__netgl_handle:N};if(ArrayBuffer.isView(_)){const g=_,s=g.buffer;return g.byteLength<s.byteLength?{__netgl_typedarray:g.constructor.name,buffer:s.slice(g.byteOffset,g.byteOffset+g.byteLength),offset:0,length:g.length}:{__netgl_typedarray:g.constructor.name,buffer:s,offset:g.byteOffset,length:g.length}}if(_ instanceof ArrayBuffer)return{__netgl_arraybuffer:_};if(typeof ImageBitmap<"u"&&_ instanceof ImageBitmap)return{__netgl_imagebitmap:_};if(typeof HTMLImageElement<"u"&&_ instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&_ instanceof HTMLCanvasElement||typeof HTMLVideoElement<"u"&&_ instanceof HTMLVideoElement||typeof OffscreenCanvas<"u"&&_ instanceof OffscreenCanvas)return T(_);if(typeof ImageData<"u"&&_ instanceof ImageData)return{__netgl_imagedata:!0,width:_.width,height:_.height,buffer:_.data.buffer};if(Array.isArray(_))return _.map(L);throw new Error(`NetGL recorder: cannot encode argument of type ${_.constructor?.name}`)};return{gl:new Proxy(e,{get(_,S){const N=Reflect.get(_,S);if(typeof N!="function")return N;const g=typeof S=="string"?S:String(S);return function(...r){const A=N.apply(_,r);if(vd(g,r))return A;a.observe(g,r),d?.observe(g,r);let R;gd.has(g)&&A!=null&&typeof A=="object"&&(R=l,l+=1,i.set(A,R));const E=r.map(L);return n({name:g,args:E,returnId:R}),A}},set(_,S,N){return Reflect.set(_,S,N,_)}}),checkpoint(){for(const _ of od(e,a,L,d))n(_)}}},Sd=500,Td=(e={})=>{const{canvas:n=Md(),contextAttributes:t={antialias:!1,stencil:!0,depth:!0},checkpoints:i=!0}=e,l=e.transport??fo({output:parent,inputFilter:parent}),a=n.getContext("webgl2",t);if(!a)throw new Error("makeNetGLGuestContext: failed to create WebGL2 shadow context");const d=Ed(a,c=>l.post(c),{scalarState:i?e.scalarState:"queried"});return i&&d.checkpoint(),{gl:d.gl,shadow:a,transport:l,endFrame(){const c={type:"netgl:frame-end"};l.post(c),i&&d.checkpoint()},announce(c,x={r:0,g:0,b:0}){const T={type:"netgl:ready",anchor:c,background:x};l.post(T);const L=setInterval(()=>l.post(T),Sd),m=l.onMessage(_=>{_.type==="netgl:ready-ack"&&(clearInterval(L),m())})}}},Md=()=>{const e=document.createElement("canvas");return e.width=1,e.height=1,e},Ad=e=>{const{scene:n,camera:t,transport:i}=e,l=Td({transport:i,canvas:e.canvas}),a=new e.WebGLRenderer({antialias:!1,alpha:!0,...e.rendererParams,context:l.gl,canvas:l.shadow.canvas});a.autoClear=!1,a.setPixelRatio(1),n.background=null,t.matrixAutoUpdate=!1;let d=null,c=[0,0],x=null;const T=m=>{d=m,t.matrix.fromArray(po(m.viewMatrix)),t.matrixWorldNeedsUpdate=!0,t.projectionMatrix.fromArray(m.projectionMatrix),t.projectionMatrixInverse.copy(t.projectionMatrix).invert();const[_,S,N,g]=m.viewport,s=_+N,r=S+g;(s!==c[0]||r!==c[1])&&(a.setSize(s,r,!1),c=[s,r]),a.setViewport(_,S,N,g)},L=()=>{a.render(n,t),l.endFrame()};return{renderer:a,core:l,get view(){return d},applyView:T,render:L,start(){x||(x=i.onMessage(m=>{uo(m)&&(e.onView?.(m.view),T(m.view),L())}),l.announce({position:[0,0,0],normal:[0,0,1],up:[0,1,0]}))},stop(){x?.(),x=null}}},Kn=["http://localhost:5190","http://127.0.0.1:5190","http://localhost:5400","http://127.0.0.1:5400","https://pablo-mayrgundter.github.io"];location.origin!=="null"&&!Kn.includes(location.origin)&&Kn.push(location.origin);const yr=document.getElementById("msg"),xd=()=>{const e=ho({hostOrigins:Kn,onReject:r=>console.warn("[netgl-deck guest] dropped a message",r)}),n=new _o,t=new Float32Array(sn.length*3),i=new Float32Array(sn.length*3);sn.forEach((r,A)=>{const R=new $e().setRGB(r.color[0]/255,r.color[1]/255,r.color[2]/255,fr);i.set([R.r,R.g,R.b],A*3)});const l=new Qt;l.setAttribute("position",new xt(t,3)),l.setAttribute("color",new xt(i,3));const a=new Oi({size:8,sizeAttenuation:!1,vertexColors:!0,depthWrite:!1}),d=new Bi(l,a);d.frustumCulled=!1,n.add(d);const c=256,x=new Float32Array(c*3),T=new Qt;T.setAttribute("position",new xt(x,3));const L=new mo(T,new vo({color:4251903,depthWrite:!1}));L.frustumCulled=!1,n.add(L);const m=new Qt;m.setAttribute("position",new xt(new Float32Array(3),3));const _=new Bi(m,new Oi({color:16777215,size:6,sizeAttenuation:!1,depthWrite:!1}));_.frustumCulled=!1,n.add(_);const S=(r,A)=>{const R=cn.inclinationDeg*Math.PI/180,E=cn.ascendingNodeLngDeg*Math.PI/180,B=A+cn.altitude,D=Math.cos(r),F=Math.sin(r)*Math.cos(R),X=Math.sin(r)*Math.sin(R);return[B*(D*Math.cos(E)-F*Math.sin(E)),B*(D*Math.sin(E)+F*Math.cos(E)),B*X]};let N=0;const g=r=>{const A=r.earth?.radius??6378137;if(A!==N){N=A,sn.forEach((E,B)=>t.set(go(E.lng,E.lat,E.alt,A),B*3)),l.attributes.position.needsUpdate=!0;for(let E=0;E<c;E+=1)x.set(S(E/c*2*Math.PI,A),E*3);T.attributes.position.needsUpdate=!0}const R=r.timeMs/6e4/cn.periodMin%1*2*Math.PI;m.attributes.position.set(S(R,A)),m.attributes.position.needsUpdate=!0,a.size=8*r.pixelRatio,_.material.size=6*r.pixelRatio};Ad({WebGLRenderer:td,scene:n,camera:new $t,transport:e,onView:g}).start(),yr.textContent="NetGL guest running; drawing into the host."};try{xd()}catch(e){yr.textContent=`Not started: ${e instanceof Error?e.message:String(e)}`}
