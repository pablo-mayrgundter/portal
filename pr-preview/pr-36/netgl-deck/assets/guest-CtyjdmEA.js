import{f as kr,N as Ct,S as fr,C as $e,F as dr,g as Jt,V as ze,R as Wr,h as dt,w as yn,W as ti,j as kt,k as rt,L as Yt,H as vn,U as yt,D as Mt,B as vt,l as jt,n as gn,p as zr,E as Xr,o as ut,P as $t,A as Kr,q as An,r as At,t as hn,u as Yn,v as en,x as tn,y as ur,z as Yr,G as Gt,I as _n,J as qr,K as $r,O as Kt,Q as Zr,T as Qr,X as Jr,Y as jr,Z as ea,_ as ta,$ as na,a0 as ia,a1 as ra,a2 as aa,a3 as oa,a4 as sa,a5 as ca,a6 as la,a7 as fa,a8 as da,a9 as ua,aa as pa,ab as xn,ac as Ht,ad as on,ae as ha,af as Zt,ag as _a,ah as ma,ai as va,aj as ga,ak as pr,al as Ea,am as Sa,an as Ta,ao as Ma,ap as He,aq as Aa,ar as xa,as as Ra,at as Ft,au as Qt,av as xt,aw as Rt,ax as hr,ay as Nt,az as Tt,aA as mn,aB as _r,aC as mr,aD as vr,aE as gr,aF as Ca,aG as ba,aH as Pa,aI as La,aJ as Er,aK as wt,aL as Ua,aM as Da,aN as Ia,aO as Sr,aP as wa,aQ as Tr,aR as Mr,aS as Rn,aT as Cn,aU as bn,aV as Pn,aW as qe,aX as ni,aY as ii,aZ as ri,a_ as ai,a$ as oi,b0 as si,b1 as ci,b2 as li,b3 as fi,b4 as di,b5 as ui,b6 as pi,b7 as hi,b8 as _i,b9 as mi,ba as vi,bb as gi,bc as Ei,bd as Si,be as Ti,bf as Mi,bg as Ai,bh as xi,bi as Ri,bj as Ci,bk as bi,bl as Pi,bm as Li,bn as Fn,bo as On,bp as Bn,bq as Gn,br as Hn,bs as Vn,bt as kn,bu as Na,bv as Ui,bw as ya,bx as un,by as Fa,bz as Di,bA as Ii,bB as wi,bC as Wn,bD as zn,bE as Oa,bF as Ar,bG as Ba,bH as En,bI as Ga,bJ as Ha,bK as xr,bL as Rr,bM as Ni,bN as Cr,bO as yi,bP as br,bQ as nn,bR as Wt,bS as Va,bT as ka,bU as Wa,bV as za,bW as Xa,bX as Fi,bY as ft,bZ as Ka,b_ as Ya,b$ as qa,c0 as $a,c1 as Za,c2 as Qa,c3 as Ja,c4 as ja,c5 as eo,c6 as to,c7 as no,c8 as io,c9 as ro,ca as ao,cb as oo,cc as so,cd as co,ce as lo,cf as fo,cg as uo,ch as po,ci as ho,cj as _o,ck as mo,M as sn,cl as Oi,cm as Bi,cn as vo,co as go,s as Eo,cp as cn}from"./points-BkPVccNl.js";function Pr(){let e=null,n=!1,t=null,i=null;function l(a,d){t(a,d),i=e.requestAnimationFrame(l)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(l),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(a){t=a},setContext:function(a){e=a}}}function So(e){const n=new WeakMap;function t(c,x){const S=c.array,I=c.usage,_=S.byteLength,E=e.createBuffer();e.bindBuffer(x,E),e.bufferData(x,S,I),c.onUploadCallback();let T;if(S instanceof Float32Array)T=e.FLOAT;else if(typeof Float16Array<"u"&&S instanceof Float16Array)T=e.HALF_FLOAT;else if(S instanceof Uint16Array)c.isFloat16BufferAttribute?T=e.HALF_FLOAT:T=e.UNSIGNED_SHORT;else if(S instanceof Int16Array)T=e.SHORT;else if(S instanceof Uint32Array)T=e.UNSIGNED_INT;else if(S instanceof Int32Array)T=e.INT;else if(S instanceof Int8Array)T=e.BYTE;else if(S instanceof Uint8Array)T=e.UNSIGNED_BYTE;else if(S instanceof Uint8ClampedArray)T=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+S);return{buffer:E,type:T,bytesPerElement:S.BYTES_PER_ELEMENT,version:c.version,size:_}}function i(c,x,S){const I=x.array,_=x.updateRanges;if(e.bindBuffer(S,c),_.length===0)e.bufferSubData(S,0,I);else{_.sort((T,P)=>T.start-P.start);let E=0;for(let T=1;T<_.length;T++){const P=_[E],g=_[T];g.start<=P.start+P.count+1?P.count=Math.max(P.count,g.start+g.count-P.start):(++E,_[E]=g)}_.length=E+1;for(let T=0,P=_.length;T<P;T++){const g=_[T];e.bufferSubData(S,g.start*I.BYTES_PER_ELEMENT,I,g.start,g.count)}x.clearUpdateRanges()}x.onUploadCallback()}function l(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const x=n.get(c);x&&(e.deleteBuffer(x.buffer),n.delete(c))}function d(c,x){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const I=n.get(c);(!I||I.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const S=n.get(c);if(S===void 0)n.set(c,t(c,x));else if(S.version<c.version){if(S.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(S.buffer,c,x),S.version=c.version}}return{get:l,remove:a,update:d}}var To=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mo=`#ifdef USE_ALPHAHASH
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
#endif`,Ao=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xo=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ro=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Co=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bo=`#ifdef USE_AOMAP
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
#endif`,Po=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lo=`#ifdef USE_BATCHING
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
#endif`,Uo=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Do=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Io=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wo=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,No=`#ifdef USE_IRIDESCENCE
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
#endif`,yo=`#ifdef USE_BUMPMAP
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
#endif`,Fo=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Oo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Go=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ho=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ko=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wo=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zo=`#define PI 3.141592653589793
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
} // validated`,Xo=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ko=`vec3 transformedNormal = objectNormal;
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
#endif`,Yo=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qo=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$o=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zo=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qo="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jo=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jo=`#ifdef USE_ENVMAP
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
#endif`,es=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ts=`#ifdef USE_ENVMAP
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
#endif`,ns=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,is=`#ifdef USE_ENVMAP
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
#endif`,rs=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,as=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,os=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ss=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cs=`#ifdef USE_GRADIENTMAP
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
}`,ls=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fs=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ds=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,us=`uniform bool receiveShadow;
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
#endif`,ps=`#ifdef USE_ENVMAP
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
#endif`,hs=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_s=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ms=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vs=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gs=`PhysicalMaterial material;
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
#endif`,Es=`struct PhysicalMaterial {
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
}`,Ss=`
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
#endif`,Ts=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ms=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,As=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xs=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rs=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cs=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bs=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ps=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ls=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Us=`#if defined( USE_POINTS_UV )
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
#endif`,Ds=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Is=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ws=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ns=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ys=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fs=`#ifdef USE_MORPHTARGETS
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
#endif`,Os=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bs=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gs=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ks=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ws=`#ifdef USE_NORMALMAP
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
#endif`,zs=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xs=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ks=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ys=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qs=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$s=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zs=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qs=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Js=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,js=`#ifdef DITHERING
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
#endif`,rc=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ac=`float getShadowMask() {
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
#endif`,cc=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lc=`#ifdef USE_SKINNING
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
#endif`,fc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dc=`#ifdef USE_SPECULARMAP
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
#endif`,_c=`#ifdef USE_TRANSMISSION
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
#endif`,mc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
}`,Tc=`uniform sampler2D t2D;
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
}`,Mc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ac=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xc=`varying vec3 vWorldDirection;
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
}`,Cc=`#include <common>
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
}`,bc=`#if DEPTH_PACKING == 3200
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
}`,Pc=`#define DISTANCE
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
}`,Lc=`#define DISTANCE
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
}`,Uc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dc=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ic=`uniform float scale;
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
}`,wc=`uniform vec3 diffuse;
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
}`,Nc=`#include <common>
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
}`,yc=`uniform vec3 diffuse;
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
}`,Fc=`#define LAMBERT
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
}`,Oc=`#define LAMBERT
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
}`,Gc=`#define MATCAP
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
}`,Hc=`#define NORMAL
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
}`,Wc=`#define PHONG
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
}`,zc=`#define STANDARD
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
}`,Kc=`#define TOON
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
}`,Yc=`#define TOON
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
}`,$c=`uniform vec3 diffuse;
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
}`,Zc=`#include <common>
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
}`,Qc=`uniform vec3 color;
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
}`,Jc=`uniform float rotation;
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
}`,jc=`uniform vec3 diffuse;
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
}`,ye={alphahash_fragment:To,alphahash_pars_fragment:Mo,alphamap_fragment:Ao,alphamap_pars_fragment:xo,alphatest_fragment:Ro,alphatest_pars_fragment:Co,aomap_fragment:bo,aomap_pars_fragment:Po,batching_pars_vertex:Lo,batching_vertex:Uo,begin_vertex:Do,beginnormal_vertex:Io,bsdfs:wo,iridescence_fragment:No,bumpmap_pars_fragment:yo,clipping_planes_fragment:Fo,clipping_planes_pars_fragment:Oo,clipping_planes_pars_vertex:Bo,clipping_planes_vertex:Go,color_fragment:Ho,color_pars_fragment:Vo,color_pars_vertex:ko,color_vertex:Wo,common:zo,cube_uv_reflection_fragment:Xo,defaultnormal_vertex:Ko,displacementmap_pars_vertex:Yo,displacementmap_vertex:qo,emissivemap_fragment:$o,emissivemap_pars_fragment:Zo,colorspace_fragment:Qo,colorspace_pars_fragment:Jo,envmap_fragment:jo,envmap_common_pars_fragment:es,envmap_pars_fragment:ts,envmap_pars_vertex:ns,envmap_physical_pars_fragment:ps,envmap_vertex:is,fog_vertex:rs,fog_pars_vertex:as,fog_fragment:os,fog_pars_fragment:ss,gradientmap_pars_fragment:cs,lightmap_pars_fragment:ls,lights_lambert_fragment:fs,lights_lambert_pars_fragment:ds,lights_pars_begin:us,lights_toon_fragment:hs,lights_toon_pars_fragment:_s,lights_phong_fragment:ms,lights_phong_pars_fragment:vs,lights_physical_fragment:gs,lights_physical_pars_fragment:Es,lights_fragment_begin:Ss,lights_fragment_maps:Ts,lights_fragment_end:Ms,logdepthbuf_fragment:As,logdepthbuf_pars_fragment:xs,logdepthbuf_pars_vertex:Rs,logdepthbuf_vertex:Cs,map_fragment:bs,map_pars_fragment:Ps,map_particle_fragment:Ls,map_particle_pars_fragment:Us,metalnessmap_fragment:Ds,metalnessmap_pars_fragment:Is,morphinstance_vertex:ws,morphcolor_vertex:Ns,morphnormal_vertex:ys,morphtarget_pars_vertex:Fs,morphtarget_vertex:Os,normal_fragment_begin:Bs,normal_fragment_maps:Gs,normal_pars_fragment:Hs,normal_pars_vertex:Vs,normal_vertex:ks,normalmap_pars_fragment:Ws,clearcoat_normal_fragment_begin:zs,clearcoat_normal_fragment_maps:Xs,clearcoat_pars_fragment:Ks,iridescence_pars_fragment:Ys,opaque_fragment:qs,packing:$s,premultiplied_alpha_fragment:Zs,project_vertex:Qs,dithering_fragment:Js,dithering_pars_fragment:js,roughnessmap_fragment:ec,roughnessmap_pars_fragment:tc,shadowmap_pars_fragment:nc,shadowmap_pars_vertex:ic,shadowmap_vertex:rc,shadowmask_pars_fragment:ac,skinbase_vertex:oc,skinning_pars_vertex:sc,skinning_vertex:cc,skinnormal_vertex:lc,specularmap_fragment:fc,specularmap_pars_fragment:dc,tonemapping_fragment:uc,tonemapping_pars_fragment:pc,transmission_fragment:hc,transmission_pars_fragment:_c,uv_pars_fragment:mc,uv_pars_vertex:vc,uv_vertex:gc,worldpos_vertex:Ec,background_vert:Sc,background_frag:Tc,backgroundCube_vert:Mc,backgroundCube_frag:Ac,cube_vert:xc,cube_frag:Rc,depth_vert:Cc,depth_frag:bc,distanceRGBA_vert:Pc,distanceRGBA_frag:Lc,equirect_vert:Uc,equirect_frag:Dc,linedashed_vert:Ic,linedashed_frag:wc,meshbasic_vert:Nc,meshbasic_frag:yc,meshlambert_vert:Fc,meshlambert_frag:Oc,meshmatcap_vert:Bc,meshmatcap_frag:Gc,meshnormal_vert:Hc,meshnormal_frag:Vc,meshphong_vert:kc,meshphong_frag:Wc,meshphysical_vert:zc,meshphysical_frag:Xc,meshtoon_vert:Kc,meshtoon_frag:Yc,points_vert:qc,points_frag:$c,shadow_vert:Zc,shadow_frag:Qc,sprite_vert:Jc,sprite_frag:jc},se={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Et={basic:{uniforms:ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:ye.meshbasic_vert,fragmentShader:ye.meshbasic_frag},lambert:{uniforms:ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new $e(0)}}]),vertexShader:ye.meshlambert_vert,fragmentShader:ye.meshlambert_frag},phong:{uniforms:ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:ye.meshphong_vert,fragmentShader:ye.meshphong_frag},standard:{uniforms:ft([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag},toon:{uniforms:ft([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new $e(0)}}]),vertexShader:ye.meshtoon_vert,fragmentShader:ye.meshtoon_frag},matcap:{uniforms:ft([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:ye.meshmatcap_vert,fragmentShader:ye.meshmatcap_frag},points:{uniforms:ft([se.points,se.fog]),vertexShader:ye.points_vert,fragmentShader:ye.points_frag},dashed:{uniforms:ft([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ye.linedashed_vert,fragmentShader:ye.linedashed_frag},depth:{uniforms:ft([se.common,se.displacementmap]),vertexShader:ye.depth_vert,fragmentShader:ye.depth_frag},normal:{uniforms:ft([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:ye.meshnormal_vert,fragmentShader:ye.meshnormal_frag},sprite:{uniforms:ft([se.sprite,se.fog]),vertexShader:ye.sprite_vert,fragmentShader:ye.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ye.background_vert,fragmentShader:ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:ye.backgroundCube_vert,fragmentShader:ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ye.cube_vert,fragmentShader:ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ye.equirect_vert,fragmentShader:ye.equirect_frag},distanceRGBA:{uniforms:ft([se.common,se.displacementmap,{referencePosition:{value:new ze},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ye.distanceRGBA_vert,fragmentShader:ye.distanceRGBA_frag},shadow:{uniforms:ft([se.lights,se.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:ye.shadow_vert,fragmentShader:ye.shadow_frag}};Et.physical={uniforms:ft([Et.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag};const ln={r:0,b:0,g:0},Lt=new Cr,el=new Jt;function tl(e,n,t,i,l,a,d){const c=new $e(0);let x=a===!0?0:1,S,I,_=null,E=0,T=null;function P(R){let v=R.isScene===!0?R.background:null;return v&&v.isTexture&&(v=(R.backgroundBlurriness>0?t:n).get(v)),v}function g(R){let v=!1;const y=P(R);y===null?r(c,x):y&&y.isColor&&(r(y,1),v=!0);const U=e.xr.getEnvironmentBlendMode();U==="additive"?i.buffers.color.setClear(0,0,0,1,d):U==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,d),(e.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function s(R,v){const y=P(v);y&&(y.isCubeTexture||y.mapping===En)?(I===void 0&&(I=new Rt(new Rr(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:Ni(Et.backgroundCube.uniforms),vertexShader:Et.backgroundCube.vertexShader,fragmentShader:Et.backgroundCube.fragmentShader,side:vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),I.geometry.deleteAttribute("normal"),I.geometry.deleteAttribute("uv"),I.onBeforeRender=function(U,F,X){this.matrixWorld.copyPosition(X.matrixWorld)},Object.defineProperty(I.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(I)),Lt.copy(v.backgroundRotation),Lt.x*=-1,Lt.y*=-1,Lt.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Lt.y*=-1,Lt.z*=-1),I.material.uniforms.envMap.value=y,I.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,I.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,I.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,I.material.uniforms.backgroundRotation.value.setFromMatrix4(el.makeRotationFromEuler(Lt)),I.material.toneMapped=rt.getTransfer(y.colorSpace)!==qe,(_!==y||E!==y.version||T!==e.toneMapping)&&(I.material.needsUpdate=!0,_=y,E=y.version,T=e.toneMapping),I.layers.enableAll(),R.unshift(I,I.geometry,I.material,0,0,null)):y&&y.isTexture&&(S===void 0&&(S=new Rt(new gr(2,2),new Ft({name:"BackgroundMaterial",uniforms:Ni(Et.background.uniforms),vertexShader:Et.background.vertexShader,fragmentShader:Et.background.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),S.geometry.deleteAttribute("normal"),Object.defineProperty(S.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(S)),S.material.uniforms.t2D.value=y,S.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,S.material.toneMapped=rt.getTransfer(y.colorSpace)!==qe,y.matrixAutoUpdate===!0&&y.updateMatrix(),S.material.uniforms.uvTransform.value.copy(y.matrix),(_!==y||E!==y.version||T!==e.toneMapping)&&(S.material.needsUpdate=!0,_=y,E=y.version,T=e.toneMapping),S.layers.enableAll(),R.unshift(S,S.geometry,S.material,0,0,null))}function r(R,v){R.getRGB(ln,xr(e)),i.buffers.color.setClear(ln.r,ln.g,ln.b,v,d)}function A(){I!==void 0&&(I.geometry.dispose(),I.material.dispose(),I=void 0),S!==void 0&&(S.geometry.dispose(),S.material.dispose(),S=void 0)}return{getClearColor:function(){return c},setClearColor:function(R,v=1){c.set(R),x=v,r(c,x)},getClearAlpha:function(){return x},setClearAlpha:function(R){x=R,r(c,x)},render:g,addToRenderList:s,dispose:A}}function nl(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},l=E(null);let a=l,d=!1;function c(u,D,H,q,Z){let Q=!1;const K=_(q,H,D);a!==K&&(a=K,S(a.object)),Q=T(u,q,H,Z),Q&&P(u,q,H,Z),Z!==null&&n.update(Z,e.ELEMENT_ARRAY_BUFFER),(Q||d)&&(d=!1,v(u,D,H,q),Z!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Z).buffer))}function x(){return e.createVertexArray()}function S(u){return e.bindVertexArray(u)}function I(u){return e.deleteVertexArray(u)}function _(u,D,H){const q=H.wireframe===!0;let Z=i[u.id];Z===void 0&&(Z={},i[u.id]=Z);let Q=Z[D.id];Q===void 0&&(Q={},Z[D.id]=Q);let K=Q[q];return K===void 0&&(K=E(x()),Q[q]=K),K}function E(u){const D=[],H=[],q=[];for(let Z=0;Z<t;Z++)D[Z]=0,H[Z]=0,q[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:H,attributeDivisors:q,object:u,attributes:{},index:null}}function T(u,D,H,q){const Z=a.attributes,Q=D.attributes;let K=0;const ae=H.getAttributes();for(const k in ae)if(ae[k].location>=0){const Me=Z[k];let Ue=Q[k];if(Ue===void 0&&(k==="instanceMatrix"&&u.instanceMatrix&&(Ue=u.instanceMatrix),k==="instanceColor"&&u.instanceColor&&(Ue=u.instanceColor)),Me===void 0||Me.attribute!==Ue||Ue&&Me.data!==Ue.data)return!0;K++}return a.attributesNum!==K||a.index!==q}function P(u,D,H,q){const Z={},Q=D.attributes;let K=0;const ae=H.getAttributes();for(const k in ae)if(ae[k].location>=0){let Me=Q[k];Me===void 0&&(k==="instanceMatrix"&&u.instanceMatrix&&(Me=u.instanceMatrix),k==="instanceColor"&&u.instanceColor&&(Me=u.instanceColor));const Ue={};Ue.attribute=Me,Me&&Me.data&&(Ue.data=Me.data),Z[k]=Ue,K++}a.attributes=Z,a.attributesNum=K,a.index=q}function g(){const u=a.newAttributes;for(let D=0,H=u.length;D<H;D++)u[D]=0}function s(u){r(u,0)}function r(u,D){const H=a.newAttributes,q=a.enabledAttributes,Z=a.attributeDivisors;H[u]=1,q[u]===0&&(e.enableVertexAttribArray(u),q[u]=1),Z[u]!==D&&(e.vertexAttribDivisor(u,D),Z[u]=D)}function A(){const u=a.newAttributes,D=a.enabledAttributes;for(let H=0,q=D.length;H<q;H++)D[H]!==u[H]&&(e.disableVertexAttribArray(H),D[H]=0)}function R(u,D,H,q,Z,Q,K){K===!0?e.vertexAttribIPointer(u,D,H,Z,Q):e.vertexAttribPointer(u,D,H,q,Z,Q)}function v(u,D,H,q){g();const Z=q.attributes,Q=H.getAttributes(),K=D.defaultAttributeValues;for(const ae in Q){const k=Q[ae];if(k.location>=0){let pe=Z[ae];if(pe===void 0&&(ae==="instanceMatrix"&&u.instanceMatrix&&(pe=u.instanceMatrix),ae==="instanceColor"&&u.instanceColor&&(pe=u.instanceColor)),pe!==void 0){const Me=pe.normalized,Ue=pe.itemSize,Be=n.get(pe);if(Be===void 0)continue;const Ze=Be.buffer,Ke=Be.type,Oe=Be.bytesPerElement,W=Ke===e.INT||Ke===e.UNSIGNED_INT||pe.gpuType===Er;if(pe.isInterleavedBufferAttribute){const Y=pe.data,G=Y.stride,C=pe.offset;if(Y.isInstancedInterleavedBuffer){for(let j=0;j<k.locationSize;j++)r(k.location+j,Y.meshPerAttribute);u.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let j=0;j<k.locationSize;j++)s(k.location+j);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let j=0;j<k.locationSize;j++)R(k.location+j,Ue/k.locationSize,Ke,Me,G*Oe,(C+Ue/k.locationSize*j)*Oe,W)}else{if(pe.isInstancedBufferAttribute){for(let Y=0;Y<k.locationSize;Y++)r(k.location+Y,pe.meshPerAttribute);u.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Y=0;Y<k.locationSize;Y++)s(k.location+Y);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let Y=0;Y<k.locationSize;Y++)R(k.location+Y,Ue/k.locationSize,Ke,Me,Ue*Oe,Ue/k.locationSize*Y*Oe,W)}}else if(K!==void 0){const Me=K[ae];if(Me!==void 0)switch(Me.length){case 2:e.vertexAttrib2fv(k.location,Me);break;case 3:e.vertexAttrib3fv(k.location,Me);break;case 4:e.vertexAttrib4fv(k.location,Me);break;default:e.vertexAttrib1fv(k.location,Me)}}}}A()}function y(){X();for(const u in i){const D=i[u];for(const H in D){const q=D[H];for(const Z in q)I(q[Z].object),delete q[Z];delete D[H]}delete i[u]}}function U(u){if(i[u.id]===void 0)return;const D=i[u.id];for(const H in D){const q=D[H];for(const Z in q)I(q[Z].object),delete q[Z];delete D[H]}delete i[u.id]}function F(u){for(const D in i){const H=i[D];if(H[u.id]===void 0)continue;const q=H[u.id];for(const Z in q)I(q[Z].object),delete q[Z];delete H[u.id]}}function X(){h(),d=!0,a!==l&&(a=l,S(a.object))}function h(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:c,reset:X,resetDefaultState:h,dispose:y,releaseStatesOfGeometry:U,releaseStatesOfProgram:F,initAttributes:g,enableAttribute:s,disableUnusedAttributes:A}}function il(e,n,t){let i;function l(S){i=S}function a(S,I){e.drawArrays(i,S,I),t.update(I,i,1)}function d(S,I,_){_!==0&&(e.drawArraysInstanced(i,S,I,_),t.update(I,i,_))}function c(S,I,_){if(_===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,S,0,I,0,_);let T=0;for(let P=0;P<_;P++)T+=I[P];t.update(T,i,1)}function x(S,I,_,E){if(_===0)return;const T=n.get("WEBGL_multi_draw");if(T===null)for(let P=0;P<S.length;P++)d(S[P],I[P],E[P]);else{T.multiDrawArraysInstancedWEBGL(i,S,0,I,0,E,0,_);let P=0;for(let g=0;g<_;g++)P+=I[g]*E[g];t.update(P,i,1)}}this.setMode=l,this.render=a,this.renderInstances=d,this.renderMultiDraw=c,this.renderMultiDrawInstances=x}function rl(e,n,t,i){let l;function a(){if(l!==void 0)return l;if(n.has("EXT_texture_filter_anisotropic")===!0){const F=n.get("EXT_texture_filter_anisotropic");l=e.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function d(F){return!(F!==At&&i.convert(F)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(F){const X=F===vn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(F!==yt&&i.convert(F)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&F!==wt&&!X)}function x(F){if(F==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let S=t.precision!==void 0?t.precision:"highp";const I=x(S);I!==S&&(console.warn("THREE.WebGLRenderer:",S,"not supported, using",I,"instead."),S=I);const _=t.logarithmicDepthBuffer===!0,E=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),T=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),P=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),s=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),r=e.getParameter(e.MAX_VERTEX_ATTRIBS),A=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),R=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),y=P>0,U=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:x,textureFormatReadable:d,textureTypeReadable:c,precision:S,logarithmicDepthBuffer:_,reversedDepthBuffer:E,maxTextures:T,maxVertexTextures:P,maxTextureSize:g,maxCubemapSize:s,maxAttributes:r,maxVertexUniforms:A,maxVaryings:R,maxFragmentUniforms:v,vertexTextures:y,maxSamples:U}}function al(e){const n=this;let t=null,i=0,l=!1,a=!1;const d=new Ma,c=new He,x={value:null,needsUpdate:!1};this.uniform=x,this.numPlanes=0,this.numIntersection=0,this.init=function(_,E){const T=_.length!==0||E||i!==0||l;return l=E,i=_.length,T},this.beginShadows=function(){a=!0,I(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(_,E){t=I(_,E,0)},this.setState=function(_,E,T){const P=_.clippingPlanes,g=_.clipIntersection,s=_.clipShadows,r=e.get(_);if(!l||P===null||P.length===0||a&&!s)a?I(null):S();else{const A=a?0:i,R=A*4;let v=r.clippingState||null;x.value=v,v=I(P,E,R,T);for(let y=0;y!==R;++y)v[y]=t[y];r.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=A}};function S(){x.value!==t&&(x.value=t,x.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function I(_,E,T,P){const g=_!==null?_.length:0;let s=null;if(g!==0){if(s=x.value,P!==!0||s===null){const r=T+g*4,A=E.matrixWorldInverse;c.getNormalMatrix(A),(s===null||s.length<r)&&(s=new Float32Array(r));for(let R=0,v=T;R!==g;++R,v+=4)d.copy(_[R]).applyMatrix4(A,c),d.normal.toArray(s,v),s[v+3]=d.constant}x.value=s,x.needsUpdate=!0}return n.numPlanes=g,n.numIntersection=0,s}}function ol(e){let n=new WeakMap;function t(d,c){return c===Wn?d.mapping=nn:c===zn&&(d.mapping=Wt),d}function i(d){if(d&&d.isTexture){const c=d.mapping;if(c===Wn||c===zn)if(n.has(d)){const x=n.get(d).texture;return t(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const S=new Oa(x.height);return S.fromEquirectangularTexture(e,d),n.set(d,S),d.addEventListener("dispose",l),t(S.texture,d.mapping)}else return null}}return d}function l(d){const c=d.target;c.removeEventListener("dispose",l);const x=n.get(c);x!==void 0&&(n.delete(c),x.dispose())}function a(){n=new WeakMap}return{get:i,dispose:a}}const Vt=4,Gi=[.125,.215,.35,.446,.526,.582],It=20,Ln=new Va,Hi=new $e;let Un=null,Dn=0,In=0,wn=!1;const Dt=(1+Math.sqrt(5))/2,Bt=1/Dt,Vi=[new ze(-Dt,Bt,0),new ze(Dt,Bt,0),new ze(-Bt,0,Dt),new ze(Bt,0,Dt),new ze(0,Dt,-Bt),new ze(0,Dt,Bt),new ze(-1,1,-1),new ze(1,1,-1),new ze(-1,1,1),new ze(1,1,1)],sl=new ze;class ki{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,l=100,a={}){const{size:d=256,position:c=sl}=a;Un=this._renderer.getRenderTarget(),Dn=this._renderer.getActiveCubeFace(),In=this._renderer.getActiveMipmapLevel(),wn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const x=this._allocateTargets();return x.depthBuffer=!0,this._sceneToCubeUV(n,i,l,x,c),t>0&&this._blur(x,0,0,t),this._applyPMREM(x),this._cleanup(x),x}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xi(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zi(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(Un,Dn,In),this._renderer.xr.enabled=wn,n.scissorTest=!1,fn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===nn||n.mapping===Wt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Un=this._renderer.getRenderTarget(),Dn=this._renderer.getActiveCubeFace(),In=this._renderer.getActiveMipmapLevel(),wn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ht,minFilter:Ht,generateMipmaps:!1,type:vn,format:At,colorSpace:gn,depthBuffer:!1},l=Wi(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wi(n,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cl(a)),this._blurMaterial=ll(a,n,t)}return l}_compileMaterial(n){const t=new Rt(this._lodPlanes[0],n);this._renderer.compile(t,Ln)}_sceneToCubeUV(n,t,i,l,a){const x=new $t(90,1,t,i),S=[1,-1,1,1,1,1],I=[1,1,1,-1,-1,-1],_=this._renderer,E=_.autoClear,T=_.toneMapping;_.getClearColor(Hi),_.toneMapping=Ct,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null));const g=new ka({name:"PMREM.Background",side:vt,depthWrite:!1,depthTest:!1}),s=new Rt(new Rr,g);let r=!1;const A=n.background;A?A.isColor&&(g.color.copy(A),n.background=null,r=!0):(g.color.copy(Hi),r=!0);for(let R=0;R<6;R++){const v=R%3;v===0?(x.up.set(0,S[R],0),x.position.set(a.x,a.y,a.z),x.lookAt(a.x+I[R],a.y,a.z)):v===1?(x.up.set(0,0,S[R]),x.position.set(a.x,a.y,a.z),x.lookAt(a.x,a.y+I[R],a.z)):(x.up.set(0,S[R],0),x.position.set(a.x,a.y,a.z),x.lookAt(a.x,a.y,a.z+I[R]));const y=this._cubeSize;fn(l,v*y,R>2?y:0,y,y),_.setRenderTarget(l),r&&_.render(s,x),_.render(n,x)}s.geometry.dispose(),s.material.dispose(),_.toneMapping=T,_.autoClear=E,n.background=A}_textureToCubeUV(n,t){const i=this._renderer,l=n.mapping===nn||n.mapping===Wt;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xi()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zi());const a=l?this._cubemapMaterial:this._equirectMaterial,d=new Rt(this._lodPlanes[0],a),c=a.uniforms;c.envMap.value=n;const x=this._cubeSize;fn(t,0,0,3*x,2*x),i.setRenderTarget(t),i.render(d,Ln)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const l=this._lodPlanes.length;for(let a=1;a<l;a++){const d=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),c=Vi[(l-a-1)%Vi.length];this._blur(n,a-1,a,d,c)}t.autoClear=i}_blur(n,t,i,l,a){const d=this._pingPongRenderTarget;this._halfBlur(n,d,t,i,l,"latitudinal",a),this._halfBlur(d,n,i,i,l,"longitudinal",a)}_halfBlur(n,t,i,l,a,d,c){const x=this._renderer,S=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const I=3,_=new Rt(this._lodPlanes[l],S),E=S.uniforms,T=this._sizeLods[i]-1,P=isFinite(a)?Math.PI/(2*T):2*Math.PI/(2*It-1),g=a/P,s=isFinite(a)?1+Math.floor(I*g):It;s>It&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${s} samples when the maximum is set to ${It}`);const r=[];let A=0;for(let F=0;F<It;++F){const X=F/g,h=Math.exp(-X*X/2);r.push(h),F===0?A+=h:F<s&&(A+=2*h)}for(let F=0;F<r.length;F++)r[F]=r[F]/A;E.envMap.value=n.texture,E.samples.value=s,E.weights.value=r,E.latitudinal.value=d==="latitudinal",c&&(E.poleAxis.value=c);const{_lodMax:R}=this;E.dTheta.value=P,E.mipInt.value=R-i;const v=this._sizeLods[l],y=3*v*(l>R-Vt?l-R+Vt:0),U=4*(this._cubeSize-v);fn(t,y,U,3*v,2*v),x.setRenderTarget(t),x.render(_,Ln)}}function cl(e){const n=[],t=[],i=[];let l=e;const a=e-Vt+1+Gi.length;for(let d=0;d<a;d++){const c=Math.pow(2,l);t.push(c);let x=1/c;d>e-Vt?x=Gi[d-e+Vt-1]:d===0&&(x=0),i.push(x);const S=1/(c-2),I=-S,_=1+S,E=[I,I,_,I,_,_,I,I,_,_,I,_],T=6,P=6,g=3,s=2,r=1,A=new Float32Array(g*P*T),R=new Float32Array(s*P*T),v=new Float32Array(r*P*T);for(let U=0;U<T;U++){const F=U%3*2/3-1,X=U>2?0:-1,h=[F,X,0,F+2/3,X,0,F+2/3,X+1,0,F,X,0,F+2/3,X+1,0,F,X+1,0];A.set(h,g*P*U),R.set(E,s*P*U);const u=[U,U,U,U,U,U];v.set(u,r*P*U)}const y=new Qt;y.setAttribute("position",new xt(A,g)),y.setAttribute("uv",new xt(R,s)),y.setAttribute("faceIndex",new xt(v,r)),n.push(y),l>Vt&&l--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function Wi(e,n,t){const i=new kt(e,n,t);return i.texture.mapping=En,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fn(e,n,t,i,l){e.viewport.set(n,t,i,l),e.scissor.set(n,t,i,l)}function ll(e,n,t){const i=new Float32Array(It),l=new ze(0,1,0);return new Ft({name:"SphericalGaussianBlur",defines:{n:It,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:qn(),fragmentShader:`

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
	`}function fl(e){let n=new WeakMap,t=null;function i(c){if(c&&c.isTexture){const x=c.mapping,S=x===Wn||x===zn,I=x===nn||x===Wt;if(S||I){let _=n.get(c);const E=_!==void 0?_.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==E)return t===null&&(t=new ki(e)),_=S?t.fromEquirectangular(c,_):t.fromCubemap(c,_),_.texture.pmremVersion=c.pmremVersion,n.set(c,_),_.texture;if(_!==void 0)return _.texture;{const T=c.image;return S&&T&&T.height>0||I&&T&&l(T)?(t===null&&(t=new ki(e)),_=S?t.fromEquirectangular(c):t.fromCubemap(c),_.texture.pmremVersion=c.pmremVersion,n.set(c,_),c.addEventListener("dispose",a),_.texture):null}}}return c}function l(c){let x=0;const S=6;for(let I=0;I<S;I++)c[I]!==void 0&&x++;return x===S}function a(c){const x=c.target;x.removeEventListener("dispose",a);const S=n.get(x);S!==void 0&&(n.delete(x),S.dispose())}function d(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:d}}function dl(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let l;switch(i){case"WEBGL_depth_texture":l=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=e.getExtension(i)}return n[i]=l,l}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const l=t(i);return l===null&&yn("THREE.WebGLRenderer: "+i+" extension not supported."),l}}}function ul(e,n,t,i){const l={},a=new WeakMap;function d(_){const E=_.target;E.index!==null&&n.remove(E.index);for(const P in E.attributes)n.remove(E.attributes[P]);E.removeEventListener("dispose",d),delete l[E.id];const T=a.get(E);T&&(n.remove(T),a.delete(E)),i.releaseStatesOfGeometry(E),E.isInstancedBufferGeometry===!0&&delete E._maxInstanceCount,t.memory.geometries--}function c(_,E){return l[E.id]===!0||(E.addEventListener("dispose",d),l[E.id]=!0,t.memory.geometries++),E}function x(_){const E=_.attributes;for(const T in E)n.update(E[T],e.ARRAY_BUFFER)}function S(_){const E=[],T=_.index,P=_.attributes.position;let g=0;if(T!==null){const A=T.array;g=T.version;for(let R=0,v=A.length;R<v;R+=3){const y=A[R+0],U=A[R+1],F=A[R+2];E.push(y,U,U,F,F,y)}}else if(P!==void 0){const A=P.array;g=P.version;for(let R=0,v=A.length/3-1;R<v;R+=3){const y=R+0,U=R+1,F=R+2;E.push(y,U,U,F,F,y)}}else return;const s=new(Xa(E)?Wa:za)(E,1);s.version=g;const r=a.get(_);r&&n.remove(r),a.set(_,s)}function I(_){const E=a.get(_);if(E){const T=_.index;T!==null&&E.version<T.version&&S(_)}else S(_);return a.get(_)}return{get:c,update:x,getWireframeAttribute:I}}function pl(e,n,t){let i;function l(E){i=E}let a,d;function c(E){a=E.type,d=E.bytesPerElement}function x(E,T){e.drawElements(i,T,a,E*d),t.update(T,i,1)}function S(E,T,P){P!==0&&(e.drawElementsInstanced(i,T,a,E*d,P),t.update(T,i,P))}function I(E,T,P){if(P===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,T,0,a,E,0,P);let s=0;for(let r=0;r<P;r++)s+=T[r];t.update(s,i,1)}function _(E,T,P,g){if(P===0)return;const s=n.get("WEBGL_multi_draw");if(s===null)for(let r=0;r<E.length;r++)S(E[r]/d,T[r],g[r]);else{s.multiDrawElementsInstancedWEBGL(i,T,0,a,E,0,g,0,P);let r=0;for(let A=0;A<P;A++)r+=T[A]*g[A];t.update(r,i,1)}}this.setMode=l,this.setIndex=c,this.render=x,this.renderInstances=S,this.renderMultiDraw=I,this.renderMultiDrawInstances=_}function hl(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,d,c){switch(t.calls++,d){case e.TRIANGLES:t.triangles+=c*(a/3);break;case e.LINES:t.lines+=c*(a/2);break;case e.LINE_STRIP:t.lines+=c*(a-1);break;case e.LINE_LOOP:t.lines+=c*a;break;case e.POINTS:t.points+=c*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function l(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:l,update:i}}function _l(e,n,t){const i=new WeakMap,l=new dt;function a(d,c,x){const S=d.morphTargetInfluences,I=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,_=I!==void 0?I.length:0;let E=i.get(c);if(E===void 0||E.count!==_){let h=function(){F.dispose(),i.delete(c),c.removeEventListener("dispose",h)};E!==void 0&&E.texture.dispose();const T=c.morphAttributes.position!==void 0,P=c.morphAttributes.normal!==void 0,g=c.morphAttributes.color!==void 0,s=c.morphAttributes.position||[],r=c.morphAttributes.normal||[],A=c.morphAttributes.color||[];let R=0;T===!0&&(R=1),P===!0&&(R=2),g===!0&&(R=3);let v=c.attributes.position.count*R,y=1;v>n.maxTextureSize&&(y=Math.ceil(v/n.maxTextureSize),v=n.maxTextureSize);const U=new Float32Array(v*y*4*_),F=new Ar(U,v,y,_);F.type=wt,F.needsUpdate=!0;const X=R*4;for(let u=0;u<_;u++){const D=s[u],H=r[u],q=A[u],Z=v*y*4*u;for(let Q=0;Q<D.count;Q++){const K=Q*X;T===!0&&(l.fromBufferAttribute(D,Q),U[Z+K+0]=l.x,U[Z+K+1]=l.y,U[Z+K+2]=l.z,U[Z+K+3]=0),P===!0&&(l.fromBufferAttribute(H,Q),U[Z+K+4]=l.x,U[Z+K+5]=l.y,U[Z+K+6]=l.z,U[Z+K+7]=0),g===!0&&(l.fromBufferAttribute(q,Q),U[Z+K+8]=l.x,U[Z+K+9]=l.y,U[Z+K+10]=l.z,U[Z+K+11]=q.itemSize===4?l.w:1)}}E={count:_,texture:F,size:new ut(v,y)},i.set(c,E),c.addEventListener("dispose",h)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)x.getUniforms().setValue(e,"morphTexture",d.morphTexture,t);else{let T=0;for(let g=0;g<S.length;g++)T+=S[g];const P=c.morphTargetsRelative?1:1-T;x.getUniforms().setValue(e,"morphTargetBaseInfluence",P),x.getUniforms().setValue(e,"morphTargetInfluences",S)}x.getUniforms().setValue(e,"morphTargetsTexture",E.texture,t),x.getUniforms().setValue(e,"morphTargetsTextureSize",E.size)}return{update:a}}function ml(e,n,t,i){let l=new WeakMap;function a(x){const S=i.render.frame,I=x.geometry,_=n.get(x,I);if(l.get(_)!==S&&(n.update(_),l.set(_,S)),x.isInstancedMesh&&(x.hasEventListener("dispose",c)===!1&&x.addEventListener("dispose",c),l.get(x)!==S&&(t.update(x.instanceMatrix,e.ARRAY_BUFFER),x.instanceColor!==null&&t.update(x.instanceColor,e.ARRAY_BUFFER),l.set(x,S))),x.isSkinnedMesh){const E=x.skeleton;l.get(E)!==S&&(E.update(),l.set(E,S))}return _}function d(){l=new WeakMap}function c(x){const S=x.target;S.removeEventListener("dispose",c),t.remove(S.instanceMatrix),S.instanceColor!==null&&t.remove(S.instanceColor)}return{update:a,dispose:d}}const Lr=new io,Ki=new ur(1,1),Ur=new Ar,Dr=new no,Ir=new to,Yi=[],qi=[],$i=new Float32Array(16),Zi=new Float32Array(9),Qi=new Float32Array(4);function zt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const l=n*t;let a=Yi[l];if(a===void 0&&(a=new Float32Array(l),Yi[l]=a),n!==0){i.toArray(a,0);for(let d=1,c=0;d!==n;++d)c+=t,e[d].toArray(a,c)}return a}function at(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function ot(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Sn(e,n){let t=qi[n];t===void 0&&(t=new Int32Array(n),qi[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function vl(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function gl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(at(t,n))return;e.uniform2fv(this.addr,n),ot(t,n)}}function El(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(at(t,n))return;e.uniform3fv(this.addr,n),ot(t,n)}}function Sl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(at(t,n))return;e.uniform4fv(this.addr,n),ot(t,n)}}function Tl(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(at(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),ot(t,n)}else{if(at(t,i))return;Qi.set(i),e.uniformMatrix2fv(this.addr,!1,Qi),ot(t,i)}}function Ml(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(at(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),ot(t,n)}else{if(at(t,i))return;Zi.set(i),e.uniformMatrix3fv(this.addr,!1,Zi),ot(t,i)}}function Al(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(at(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),ot(t,n)}else{if(at(t,i))return;$i.set(i),e.uniformMatrix4fv(this.addr,!1,$i),ot(t,i)}}function xl(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Rl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(at(t,n))return;e.uniform2iv(this.addr,n),ot(t,n)}}function Cl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(at(t,n))return;e.uniform3iv(this.addr,n),ot(t,n)}}function bl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(at(t,n))return;e.uniform4iv(this.addr,n),ot(t,n)}}function Pl(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Ll(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(at(t,n))return;e.uniform2uiv(this.addr,n),ot(t,n)}}function Ul(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(at(t,n))return;e.uniform3uiv(this.addr,n),ot(t,n)}}function Dl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(at(t,n))return;e.uniform4uiv(this.addr,n),ot(t,n)}}function Il(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l);let a;this.type===e.SAMPLER_2D_SHADOW?(Ki.compareFunction=pr,a=Ki):a=Lr,t.setTexture2D(n||a,l)}function wl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTexture3D(n||Dr,l)}function Nl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTextureCube(n||Ir,l)}function yl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTexture2DArray(n||Ur,l)}function Fl(e){switch(e){case 5126:return vl;case 35664:return gl;case 35665:return El;case 35666:return Sl;case 35674:return Tl;case 35675:return Ml;case 35676:return Al;case 5124:case 35670:return xl;case 35667:case 35671:return Rl;case 35668:case 35672:return Cl;case 35669:case 35673:return bl;case 5125:return Pl;case 36294:return Ll;case 36295:return Ul;case 36296:return Dl;case 35678:case 36198:case 36298:case 36306:case 35682:return Il;case 35679:case 36299:case 36307:return wl;case 35680:case 36300:case 36308:case 36293:return Nl;case 36289:case 36303:case 36311:case 36292:return yl}}function Ol(e,n){e.uniform1fv(this.addr,n)}function Bl(e,n){const t=zt(n,this.size,2);e.uniform2fv(this.addr,t)}function Gl(e,n){const t=zt(n,this.size,3);e.uniform3fv(this.addr,t)}function Hl(e,n){const t=zt(n,this.size,4);e.uniform4fv(this.addr,t)}function Vl(e,n){const t=zt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function kl(e,n){const t=zt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function Wl(e,n){const t=zt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function zl(e,n){e.uniform1iv(this.addr,n)}function Xl(e,n){e.uniform2iv(this.addr,n)}function Kl(e,n){e.uniform3iv(this.addr,n)}function Yl(e,n){e.uniform4iv(this.addr,n)}function ql(e,n){e.uniform1uiv(this.addr,n)}function $l(e,n){e.uniform2uiv(this.addr,n)}function Zl(e,n){e.uniform3uiv(this.addr,n)}function Ql(e,n){e.uniform4uiv(this.addr,n)}function Jl(e,n,t){const i=this.cache,l=n.length,a=Sn(t,l);at(i,a)||(e.uniform1iv(this.addr,a),ot(i,a));for(let d=0;d!==l;++d)t.setTexture2D(n[d]||Lr,a[d])}function jl(e,n,t){const i=this.cache,l=n.length,a=Sn(t,l);at(i,a)||(e.uniform1iv(this.addr,a),ot(i,a));for(let d=0;d!==l;++d)t.setTexture3D(n[d]||Dr,a[d])}function ef(e,n,t){const i=this.cache,l=n.length,a=Sn(t,l);at(i,a)||(e.uniform1iv(this.addr,a),ot(i,a));for(let d=0;d!==l;++d)t.setTextureCube(n[d]||Ir,a[d])}function tf(e,n,t){const i=this.cache,l=n.length,a=Sn(t,l);at(i,a)||(e.uniform1iv(this.addr,a),ot(i,a));for(let d=0;d!==l;++d)t.setTexture2DArray(n[d]||Ur,a[d])}function nf(e){switch(e){case 5126:return Ol;case 35664:return Bl;case 35665:return Gl;case 35666:return Hl;case 35674:return Vl;case 35675:return kl;case 35676:return Wl;case 5124:case 35670:return zl;case 35667:case 35671:return Xl;case 35668:case 35672:return Kl;case 35669:case 35673:return Yl;case 5125:return ql;case 36294:return $l;case 36295:return Zl;case 36296:return Ql;case 35678:case 36198:case 36298:case 36306:case 35682:return Jl;case 35679:case 36299:case 36307:return jl;case 35680:case 36300:case 36308:case 36293:return ef;case 36289:case 36303:case 36311:case 36292:return tf}}class rf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Fl(t.type)}}class af{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=nf(t.type)}}class of{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const l=this.seq;for(let a=0,d=l.length;a!==d;++a){const c=l[a];c.setValue(n,t[c.id],i)}}}const Nn=/(\w+)(\])?(\[|\.)?/g;function Ji(e,n){e.seq.push(n),e.map[n.id]=n}function sf(e,n,t){const i=e.name,l=i.length;for(Nn.lastIndex=0;;){const a=Nn.exec(i),d=Nn.lastIndex;let c=a[1];const x=a[2]==="]",S=a[3];if(x&&(c=c|0),S===void 0||S==="["&&d+2===l){Ji(t,S===void 0?new rf(c,e,n):new af(c,e,n));break}else{let _=t.map[c];_===void 0&&(_=new of(c),Ji(t,_)),t=_}}}class pn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let l=0;l<i;++l){const a=n.getActiveUniform(t,l),d=n.getUniformLocation(t,a.name);sf(a,d,this)}}setValue(n,t,i,l){const a=this.map[t];a!==void 0&&a.setValue(n,i,l)}setOptional(n,t,i){const l=t[i];l!==void 0&&this.setValue(n,i,l)}static upload(n,t,i,l){for(let a=0,d=t.length;a!==d;++a){const c=t[a],x=i[c.id];x.needsUpdate!==!1&&c.setValue(n,x.value,l)}}static seqWithValue(n,t){const i=[];for(let l=0,a=n.length;l!==a;++l){const d=n[l];d.id in t&&i.push(d)}return i}}function ji(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const cf=37297;let lf=0;function ff(e,n){const t=e.split(`
`),i=[],l=Math.max(n-6,0),a=Math.min(n+6,t.length);for(let d=l;d<a;d++){const c=d+1;i.push(`${c===n?">":" "} ${c}: ${t[d]}`)}return i.join(`
`)}const er=new He;function df(e){rt._getMatrix(er,rt.workingColorSpace,e);const n=`mat3( ${er.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(e)){case br:return[n,"LinearTransferOETF"];case qe:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function tr(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),a=(e.getShaderInfoLog(n)||"").trim();if(i&&a==="")return"";const d=/ERROR: 0:(\d+)/.exec(a);if(d){const c=parseInt(d[1]);return t.toUpperCase()+`

`+a+`

`+ff(e.getShaderSource(n),c)}else return a}function uf(e,n){const t=df(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function pf(e,n){let t;switch(n){case eo:t="Linear";break;case ja:t="Reinhard";break;case Ja:t="Cineon";break;case Qa:t="ACESFilmic";break;case Za:t="AgX";break;case $a:t="Neutral";break;case qa:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const dn=new ze;function hf(){rt.getLuminanceCoefficients(dn);const e=dn.x.toFixed(4),n=dn.y.toFixed(4),t=dn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _f(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qt).join(`
`)}function mf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function vf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let l=0;l<i;l++){const a=e.getActiveAttrib(n,l),d=a.name;let c=1;a.type===e.FLOAT_MAT2&&(c=2),a.type===e.FLOAT_MAT3&&(c=3),a.type===e.FLOAT_MAT4&&(c=4),t[d]={type:a.type,location:e.getAttribLocation(n,d),locationSize:c}}return t}function qt(e){return e!==""}function nr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function ir(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const gf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xn(e){return e.replace(gf,Sf)}const Ef=new Map;function Sf(e,n){let t=ye[n];if(t===void 0){const i=Ef.get(n);if(i!==void 0)t=ye[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return Xn(t)}const Tf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rr(e){return e.replace(Tf,Mf)}function Mf(e,n,t,i){let l="";for(let a=parseInt(n);a<parseInt(t);a++)l+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return l}function ar(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}function Af(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===hr?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===Ya?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Tt&&(n="SHADOWMAP_TYPE_VSM"),n}function xf(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case nn:case Wt:n="ENVMAP_TYPE_CUBE";break;case En:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Rf(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===Wt&&(n="ENVMAP_MODE_REFRACTION"),n}function Cf(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case so:n="ENVMAP_BLENDING_MULTIPLY";break;case oo:n="ENVMAP_BLENDING_MIX";break;case ao:n="ENVMAP_BLENDING_ADD";break}return n}function bf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Pf(e,n,t,i){const l=e.getContext(),a=t.defines;let d=t.vertexShader,c=t.fragmentShader;const x=Af(t),S=xf(t),I=Rf(t),_=Cf(t),E=bf(t),T=_f(t),P=mf(a),g=l.createProgram();let s,r,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(s=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,P].filter(qt).join(`
`),s.length>0&&(s+=`
`),r=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,P].filter(qt).join(`
`),r.length>0&&(r+=`
`)):(s=[ar(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,P,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+I:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+x:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qt).join(`
`),r=[ar(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,P,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+S:"",t.envMap?"#define "+I:"",t.envMap?"#define "+_:"",E?"#define CUBEUV_TEXEL_WIDTH "+E.texelWidth:"",E?"#define CUBEUV_TEXEL_HEIGHT "+E.texelHeight:"",E?"#define CUBEUV_MAX_MIP "+E.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+x:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ct?"#define TONE_MAPPING":"",t.toneMapping!==Ct?ye.tonemapping_pars_fragment:"",t.toneMapping!==Ct?pf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ye.colorspace_pars_fragment,uf("linearToOutputTexel",t.outputColorSpace),hf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qt).join(`
`)),d=Xn(d),d=nr(d,t),d=ir(d,t),c=Xn(c),c=nr(c,t),c=ir(c,t),d=rr(d),c=rr(c),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,s=[T,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+s,r=["#define varying in",t.glslVersion===Fi?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+r);const R=A+s+d,v=A+r+c,y=ji(l,l.VERTEX_SHADER,R),U=ji(l,l.FRAGMENT_SHADER,v);l.attachShader(g,y),l.attachShader(g,U),t.index0AttributeName!==void 0?l.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&l.bindAttribLocation(g,0,"position"),l.linkProgram(g);function F(D){if(e.debug.checkShaderErrors){const H=l.getProgramInfoLog(g)||"",q=l.getShaderInfoLog(y)||"",Z=l.getShaderInfoLog(U)||"",Q=H.trim(),K=q.trim(),ae=Z.trim();let k=!0,pe=!0;if(l.getProgramParameter(g,l.LINK_STATUS)===!1)if(k=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(l,g,y,U);else{const Me=tr(l,y,"vertex"),Ue=tr(l,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(g,l.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Q+`
`+Me+`
`+Ue)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(K===""||ae==="")&&(pe=!1);pe&&(D.diagnostics={runnable:k,programLog:Q,vertexShader:{log:K,prefix:s},fragmentShader:{log:ae,prefix:r}})}l.deleteShader(y),l.deleteShader(U),X=new pn(l,g),h=vf(l,g)}let X;this.getUniforms=function(){return X===void 0&&F(this),X};let h;this.getAttributes=function(){return h===void 0&&F(this),h};let u=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return u===!1&&(u=l.getProgramParameter(g,cf)),u},this.destroy=function(){i.releaseStatesOfProgram(this),l.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=lf++,this.cacheKey=n,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=U,this}let Lf=0;class Uf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,l=this._getShaderStage(t),a=this._getShaderStage(i),d=this._getShaderCacheForMaterial(n);return d.has(l)===!1&&(d.add(l),l.usedTimes++),d.has(a)===!1&&(d.add(a),a.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Df(n),t.set(n,i)),i}}class Df{constructor(n){this.id=Lf++,this.code=n,this.usedTimes=0}}function If(e,n,t,i,l,a,d){const c=new Ka,x=new Uf,S=new Set,I=[],_=l.logarithmicDepthBuffer,E=l.vertexTextures;let T=l.precision;const P={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(h){return S.add(h),h===0?"uv":`uv${h}`}function s(h,u,D,H,q){const Z=H.fog,Q=q.geometry,K=h.isMeshStandardMaterial?H.environment:null,ae=(h.isMeshStandardMaterial?t:n).get(h.envMap||K),k=ae&&ae.mapping===En?ae.image.height:null,pe=P[h.type];h.precision!==null&&(T=l.getMaxPrecision(h.precision),T!==h.precision&&console.warn("THREE.WebGLProgram.getParameters:",h.precision,"not supported, using",T,"instead."));const Me=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Ue=Me!==void 0?Me.length:0;let Be=0;Q.morphAttributes.position!==void 0&&(Be=1),Q.morphAttributes.normal!==void 0&&(Be=2),Q.morphAttributes.color!==void 0&&(Be=3);let Ze,Ke,Oe,W;if(pe){const Ve=Et[pe];Ze=Ve.vertexShader,Ke=Ve.fragmentShader}else Ze=h.vertexShader,Ke=h.fragmentShader,x.update(h),Oe=x.getVertexShaderID(h),W=x.getFragmentShaderID(h);const Y=e.getRenderTarget(),G=e.state.buffers.depth.getReversed(),C=q.isInstancedMesh===!0,j=q.isBatchedMesh===!0,Ae=!!h.map,Qe=!!h.matcap,m=!!ae,Je=!!h.aoMap,Ie=!!h.lightMap,Pe=!!h.bumpMap,me=!!h.normalMap,je=!!h.displacementMap,ve=!!h.emissiveMap,Ne=!!h.metalnessMap,st=!!h.roughnessMap,it=h.anisotropy>0,p=h.clearcoat>0,o=h.dispersion>0,w=h.iridescence>0,z=h.sheen>0,J=h.transmission>0,V=it&&!!h.anisotropyMap,Te=p&&!!h.clearcoatMap,re=p&&!!h.clearcoatNormalMap,ge=p&&!!h.clearcoatRoughnessMap,Ee=w&&!!h.iridescenceMap,ne=w&&!!h.iridescenceThicknessMap,fe=z&&!!h.sheenColorMap,be=z&&!!h.sheenRoughnessMap,Se=!!h.specularMap,ce=!!h.specularColorMap,we=!!h.specularIntensityMap,M=J&&!!h.transmissionMap,ie=J&&!!h.thicknessMap,oe=!!h.gradientMap,ue=!!h.alphaMap,ee=h.alphaTest>0,$=!!h.alphaHash,_e=!!h.extensions;let De=Ct;h.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(De=e.toneMapping);const Xe={shaderID:pe,shaderType:h.type,shaderName:h.name,vertexShader:Ze,fragmentShader:Ke,defines:h.defines,customVertexShaderID:Oe,customFragmentShaderID:W,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:T,batching:j,batchingColor:j&&q._colorsTexture!==null,instancing:C,instancingColor:C&&q.instanceColor!==null,instancingMorph:C&&q.morphTexture!==null,supportsVertexTextures:E,outputColorSpace:Y===null?e.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:gn,alphaToCoverage:!!h.alphaToCoverage,map:Ae,matcap:Qe,envMap:m,envMapMode:m&&ae.mapping,envMapCubeUVHeight:k,aoMap:Je,lightMap:Ie,bumpMap:Pe,normalMap:me,displacementMap:E&&je,emissiveMap:ve,normalMapObjectSpace:me&&h.normalMapType===Ha,normalMapTangentSpace:me&&h.normalMapType===Ga,metalnessMap:Ne,roughnessMap:st,anisotropy:it,anisotropyMap:V,clearcoat:p,clearcoatMap:Te,clearcoatNormalMap:re,clearcoatRoughnessMap:ge,dispersion:o,iridescence:w,iridescenceMap:Ee,iridescenceThicknessMap:ne,sheen:z,sheenColorMap:fe,sheenRoughnessMap:be,specularMap:Se,specularColorMap:ce,specularIntensityMap:we,transmission:J,transmissionMap:M,thicknessMap:ie,gradientMap:oe,opaque:h.transparent===!1&&h.blending===un&&h.alphaToCoverage===!1,alphaMap:ue,alphaTest:ee,alphaHash:$,combine:h.combine,mapUv:Ae&&g(h.map.channel),aoMapUv:Je&&g(h.aoMap.channel),lightMapUv:Ie&&g(h.lightMap.channel),bumpMapUv:Pe&&g(h.bumpMap.channel),normalMapUv:me&&g(h.normalMap.channel),displacementMapUv:je&&g(h.displacementMap.channel),emissiveMapUv:ve&&g(h.emissiveMap.channel),metalnessMapUv:Ne&&g(h.metalnessMap.channel),roughnessMapUv:st&&g(h.roughnessMap.channel),anisotropyMapUv:V&&g(h.anisotropyMap.channel),clearcoatMapUv:Te&&g(h.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&g(h.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&g(h.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&g(h.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&g(h.sheenColorMap.channel),sheenRoughnessMapUv:be&&g(h.sheenRoughnessMap.channel),specularMapUv:Se&&g(h.specularMap.channel),specularColorMapUv:ce&&g(h.specularColorMap.channel),specularIntensityMapUv:we&&g(h.specularIntensityMap.channel),transmissionMapUv:M&&g(h.transmissionMap.channel),thicknessMapUv:ie&&g(h.thicknessMap.channel),alphaMapUv:ue&&g(h.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(me||it),vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!Q.attributes.uv&&(Ae||ue),fog:!!Z,useFog:h.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:h.flatShading===!0&&h.wireframe===!1,sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:G,skinning:q.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Ue,morphTextureStride:Be,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numSpotLightMaps:u.spotLightMap.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numSpotLightShadowsWithMaps:u.numSpotLightShadowsWithMaps,numLightProbes:u.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:h.dithering,shadowMapEnabled:e.shadowMap.enabled&&D.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:Ae&&h.map.isVideoTexture===!0&&rt.getTransfer(h.map.colorSpace)===qe,decodeVideoTextureEmissive:ve&&h.emissiveMap.isVideoTexture===!0&&rt.getTransfer(h.emissiveMap.colorSpace)===qe,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===Mt,flipSided:h.side===vt,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:_e&&h.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&h.extensions.multiDraw===!0||j)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return Xe.vertexUv1s=S.has(1),Xe.vertexUv2s=S.has(2),Xe.vertexUv3s=S.has(3),S.clear(),Xe}function r(h){const u=[];if(h.shaderID?u.push(h.shaderID):(u.push(h.customVertexShaderID),u.push(h.customFragmentShaderID)),h.defines!==void 0)for(const D in h.defines)u.push(D),u.push(h.defines[D]);return h.isRawShaderMaterial===!1&&(A(u,h),R(u,h),u.push(e.outputColorSpace)),u.push(h.customProgramCacheKey),u.join()}function A(h,u){h.push(u.precision),h.push(u.outputColorSpace),h.push(u.envMapMode),h.push(u.envMapCubeUVHeight),h.push(u.mapUv),h.push(u.alphaMapUv),h.push(u.lightMapUv),h.push(u.aoMapUv),h.push(u.bumpMapUv),h.push(u.normalMapUv),h.push(u.displacementMapUv),h.push(u.emissiveMapUv),h.push(u.metalnessMapUv),h.push(u.roughnessMapUv),h.push(u.anisotropyMapUv),h.push(u.clearcoatMapUv),h.push(u.clearcoatNormalMapUv),h.push(u.clearcoatRoughnessMapUv),h.push(u.iridescenceMapUv),h.push(u.iridescenceThicknessMapUv),h.push(u.sheenColorMapUv),h.push(u.sheenRoughnessMapUv),h.push(u.specularMapUv),h.push(u.specularColorMapUv),h.push(u.specularIntensityMapUv),h.push(u.transmissionMapUv),h.push(u.thicknessMapUv),h.push(u.combine),h.push(u.fogExp2),h.push(u.sizeAttenuation),h.push(u.morphTargetsCount),h.push(u.morphAttributeCount),h.push(u.numDirLights),h.push(u.numPointLights),h.push(u.numSpotLights),h.push(u.numSpotLightMaps),h.push(u.numHemiLights),h.push(u.numRectAreaLights),h.push(u.numDirLightShadows),h.push(u.numPointLightShadows),h.push(u.numSpotLightShadows),h.push(u.numSpotLightShadowsWithMaps),h.push(u.numLightProbes),h.push(u.shadowMapType),h.push(u.toneMapping),h.push(u.numClippingPlanes),h.push(u.numClipIntersection),h.push(u.depthPacking)}function R(h,u){c.disableAll(),u.supportsVertexTextures&&c.enable(0),u.instancing&&c.enable(1),u.instancingColor&&c.enable(2),u.instancingMorph&&c.enable(3),u.matcap&&c.enable(4),u.envMap&&c.enable(5),u.normalMapObjectSpace&&c.enable(6),u.normalMapTangentSpace&&c.enable(7),u.clearcoat&&c.enable(8),u.iridescence&&c.enable(9),u.alphaTest&&c.enable(10),u.vertexColors&&c.enable(11),u.vertexAlphas&&c.enable(12),u.vertexUv1s&&c.enable(13),u.vertexUv2s&&c.enable(14),u.vertexUv3s&&c.enable(15),u.vertexTangents&&c.enable(16),u.anisotropy&&c.enable(17),u.alphaHash&&c.enable(18),u.batching&&c.enable(19),u.dispersion&&c.enable(20),u.batchingColor&&c.enable(21),u.gradientMap&&c.enable(22),h.push(c.mask),c.disableAll(),u.fog&&c.enable(0),u.useFog&&c.enable(1),u.flatShading&&c.enable(2),u.logarithmicDepthBuffer&&c.enable(3),u.reversedDepthBuffer&&c.enable(4),u.skinning&&c.enable(5),u.morphTargets&&c.enable(6),u.morphNormals&&c.enable(7),u.morphColors&&c.enable(8),u.premultipliedAlpha&&c.enable(9),u.shadowMapEnabled&&c.enable(10),u.doubleSided&&c.enable(11),u.flipSided&&c.enable(12),u.useDepthPacking&&c.enable(13),u.dithering&&c.enable(14),u.transmission&&c.enable(15),u.sheen&&c.enable(16),u.opaque&&c.enable(17),u.pointsUvs&&c.enable(18),u.decodeVideoTexture&&c.enable(19),u.decodeVideoTextureEmissive&&c.enable(20),u.alphaToCoverage&&c.enable(21),h.push(c.mask)}function v(h){const u=P[h.type];let D;if(u){const H=Et[u];D=Ba.clone(H.uniforms)}else D=h.uniforms;return D}function y(h,u){let D;for(let H=0,q=I.length;H<q;H++){const Z=I[H];if(Z.cacheKey===u){D=Z,++D.usedTimes;break}}return D===void 0&&(D=new Pf(e,u,h,a),I.push(D)),D}function U(h){if(--h.usedTimes===0){const u=I.indexOf(h);I[u]=I[I.length-1],I.pop(),h.destroy()}}function F(h){x.remove(h)}function X(){x.dispose()}return{getParameters:s,getProgramCacheKey:r,getUniforms:v,acquireProgram:y,releaseProgram:U,releaseShaderCache:F,programs:I,dispose:X}}function wf(){let e=new WeakMap;function n(d){return e.has(d)}function t(d){let c=e.get(d);return c===void 0&&(c={},e.set(d,c)),c}function i(d){e.delete(d)}function l(d,c,x){e.get(d)[c]=x}function a(){e=new WeakMap}return{has:n,get:t,remove:i,update:l,dispose:a}}function Nf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function or(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function sr(){const e=[];let n=0;const t=[],i=[],l=[];function a(){n=0,t.length=0,i.length=0,l.length=0}function d(_,E,T,P,g,s){let r=e[n];return r===void 0?(r={id:_.id,object:_,geometry:E,material:T,groupOrder:P,renderOrder:_.renderOrder,z:g,group:s},e[n]=r):(r.id=_.id,r.object=_,r.geometry=E,r.material=T,r.groupOrder=P,r.renderOrder=_.renderOrder,r.z=g,r.group=s),n++,r}function c(_,E,T,P,g,s){const r=d(_,E,T,P,g,s);T.transmission>0?i.push(r):T.transparent===!0?l.push(r):t.push(r)}function x(_,E,T,P,g,s){const r=d(_,E,T,P,g,s);T.transmission>0?i.unshift(r):T.transparent===!0?l.unshift(r):t.unshift(r)}function S(_,E){t.length>1&&t.sort(_||Nf),i.length>1&&i.sort(E||or),l.length>1&&l.sort(E||or)}function I(){for(let _=n,E=e.length;_<E;_++){const T=e[_];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:t,transmissive:i,transparent:l,init:a,push:c,unshift:x,finish:I,sort:S}}function yf(){let e=new WeakMap;function n(i,l){const a=e.get(i);let d;return a===void 0?(d=new sr,e.set(i,[d])):l>=a.length?(d=new sr,a.push(d)):d=a[l],d}function t(){e=new WeakMap}return{get:n,dispose:t}}function Ff(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new ze,color:new $e};break;case"SpotLight":t={position:new ze,direction:new ze,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ze,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ze,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new ze,halfWidth:new ze,halfHeight:new ze};break}return e[n.id]=t,t}}}function Of(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Bf=0;function Gf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Hf(e){const n=new Ff,t=Of(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let S=0;S<9;S++)i.probe.push(new ze);const l=new ze,a=new Jt,d=new Jt;function c(S){let I=0,_=0,E=0;for(let h=0;h<9;h++)i.probe[h].set(0,0,0);let T=0,P=0,g=0,s=0,r=0,A=0,R=0,v=0,y=0,U=0,F=0;S.sort(Gf);for(let h=0,u=S.length;h<u;h++){const D=S[h],H=D.color,q=D.intensity,Z=D.distance,Q=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)I+=H.r*q,_+=H.g*q,E+=H.b*q;else if(D.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(D.sh.coefficients[K],q);F++}else if(D.isDirectionalLight){const K=n.get(D);if(K.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ae=D.shadow,k=t.get(D);k.shadowIntensity=ae.intensity,k.shadowBias=ae.bias,k.shadowNormalBias=ae.normalBias,k.shadowRadius=ae.radius,k.shadowMapSize=ae.mapSize,i.directionalShadow[T]=k,i.directionalShadowMap[T]=Q,i.directionalShadowMatrix[T]=D.shadow.matrix,A++}i.directional[T]=K,T++}else if(D.isSpotLight){const K=n.get(D);K.position.setFromMatrixPosition(D.matrixWorld),K.color.copy(H).multiplyScalar(q),K.distance=Z,K.coneCos=Math.cos(D.angle),K.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),K.decay=D.decay,i.spot[g]=K;const ae=D.shadow;if(D.map&&(i.spotLightMap[y]=D.map,y++,ae.updateMatrices(D),D.castShadow&&U++),i.spotLightMatrix[g]=ae.matrix,D.castShadow){const k=t.get(D);k.shadowIntensity=ae.intensity,k.shadowBias=ae.bias,k.shadowNormalBias=ae.normalBias,k.shadowRadius=ae.radius,k.shadowMapSize=ae.mapSize,i.spotShadow[g]=k,i.spotShadowMap[g]=Q,v++}g++}else if(D.isRectAreaLight){const K=n.get(D);K.color.copy(H).multiplyScalar(q),K.halfWidth.set(D.width*.5,0,0),K.halfHeight.set(0,D.height*.5,0),i.rectArea[s]=K,s++}else if(D.isPointLight){const K=n.get(D);if(K.color.copy(D.color).multiplyScalar(D.intensity),K.distance=D.distance,K.decay=D.decay,D.castShadow){const ae=D.shadow,k=t.get(D);k.shadowIntensity=ae.intensity,k.shadowBias=ae.bias,k.shadowNormalBias=ae.normalBias,k.shadowRadius=ae.radius,k.shadowMapSize=ae.mapSize,k.shadowCameraNear=ae.camera.near,k.shadowCameraFar=ae.camera.far,i.pointShadow[P]=k,i.pointShadowMap[P]=Q,i.pointShadowMatrix[P]=D.shadow.matrix,R++}i.point[P]=K,P++}else if(D.isHemisphereLight){const K=n.get(D);K.skyColor.copy(D.color).multiplyScalar(q),K.groundColor.copy(D.groundColor).multiplyScalar(q),i.hemi[r]=K,r++}}s>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2)),i.ambient[0]=I,i.ambient[1]=_,i.ambient[2]=E;const X=i.hash;(X.directionalLength!==T||X.pointLength!==P||X.spotLength!==g||X.rectAreaLength!==s||X.hemiLength!==r||X.numDirectionalShadows!==A||X.numPointShadows!==R||X.numSpotShadows!==v||X.numSpotMaps!==y||X.numLightProbes!==F)&&(i.directional.length=T,i.spot.length=g,i.rectArea.length=s,i.point.length=P,i.hemi.length=r,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=v+y-U,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=U,i.numLightProbes=F,X.directionalLength=T,X.pointLength=P,X.spotLength=g,X.rectAreaLength=s,X.hemiLength=r,X.numDirectionalShadows=A,X.numPointShadows=R,X.numSpotShadows=v,X.numSpotMaps=y,X.numLightProbes=F,i.version=Bf++)}function x(S,I){let _=0,E=0,T=0,P=0,g=0;const s=I.matrixWorldInverse;for(let r=0,A=S.length;r<A;r++){const R=S[r];if(R.isDirectionalLight){const v=i.directional[_];v.direction.setFromMatrixPosition(R.matrixWorld),l.setFromMatrixPosition(R.target.matrixWorld),v.direction.sub(l),v.direction.transformDirection(s),_++}else if(R.isSpotLight){const v=i.spot[T];v.position.setFromMatrixPosition(R.matrixWorld),v.position.applyMatrix4(s),v.direction.setFromMatrixPosition(R.matrixWorld),l.setFromMatrixPosition(R.target.matrixWorld),v.direction.sub(l),v.direction.transformDirection(s),T++}else if(R.isRectAreaLight){const v=i.rectArea[P];v.position.setFromMatrixPosition(R.matrixWorld),v.position.applyMatrix4(s),d.identity(),a.copy(R.matrixWorld),a.premultiply(s),d.extractRotation(a),v.halfWidth.set(R.width*.5,0,0),v.halfHeight.set(0,R.height*.5,0),v.halfWidth.applyMatrix4(d),v.halfHeight.applyMatrix4(d),P++}else if(R.isPointLight){const v=i.point[E];v.position.setFromMatrixPosition(R.matrixWorld),v.position.applyMatrix4(s),E++}else if(R.isHemisphereLight){const v=i.hemi[g];v.direction.setFromMatrixPosition(R.matrixWorld),v.direction.transformDirection(s),g++}}}return{setup:c,setupView:x,state:i}}function cr(e){const n=new Hf(e),t=[],i=[];function l(I){S.camera=I,t.length=0,i.length=0}function a(I){t.push(I)}function d(I){i.push(I)}function c(){n.setup(t)}function x(I){n.setupView(t,I)}const S={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:l,state:S,setupLights:c,setupLightsView:x,pushLight:a,pushShadow:d}}function Vf(e){let n=new WeakMap;function t(l,a=0){const d=n.get(l);let c;return d===void 0?(c=new cr(e),n.set(l,[c])):a>=d.length?(c=new cr(e),d.push(c)):c=d[a],c}function i(){n=new WeakMap}return{get:t,dispose:i}}const kf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wf=`uniform sampler2D shadow_pass;
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
}`;function zf(e,n,t){let i=new dr;const l=new ut,a=new ut,d=new dt,c=new Aa({depthPacking:xa}),x=new Ra,S={},I=t.maxTextureSize,_={[jt]:vt,[vt]:jt,[Mt]:Mt},E=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:kf,fragmentShader:Wf}),T=E.clone();T.defines.HORIZONTAL_PASS=1;const P=new Qt;P.setAttribute("position",new xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Rt(P,E),s=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hr;let r=this.type;this.render=function(U,F,X){if(s.enabled===!1||s.autoUpdate===!1&&s.needsUpdate===!1||U.length===0)return;const h=e.getRenderTarget(),u=e.getActiveCubeFace(),D=e.getActiveMipmapLevel(),H=e.state;H.setBlending(Nt),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const q=r!==Tt&&this.type===Tt,Z=r===Tt&&this.type!==Tt;for(let Q=0,K=U.length;Q<K;Q++){const ae=U[Q],k=ae.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",ae,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;l.copy(k.mapSize);const pe=k.getFrameExtents();if(l.multiply(pe),a.copy(k.mapSize),(l.x>I||l.y>I)&&(l.x>I&&(a.x=Math.floor(I/pe.x),l.x=a.x*pe.x,k.mapSize.x=a.x),l.y>I&&(a.y=Math.floor(I/pe.y),l.y=a.y*pe.y,k.mapSize.y=a.y)),k.map===null||q===!0||Z===!0){const Ue=this.type!==Tt?{minFilter:Zt,magFilter:Zt}:{};k.map!==null&&k.map.dispose(),k.map=new kt(l.x,l.y,Ue),k.map.texture.name=ae.name+".shadowMap",k.camera.updateProjectionMatrix()}e.setRenderTarget(k.map),e.clear();const Me=k.getViewportCount();for(let Ue=0;Ue<Me;Ue++){const Be=k.getViewport(Ue);d.set(a.x*Be.x,a.y*Be.y,a.x*Be.z,a.y*Be.w),H.viewport(d),k.updateMatrices(ae,Ue),i=k.getFrustum(),v(F,X,k.camera,ae,this.type)}k.isPointLightShadow!==!0&&this.type===Tt&&A(k,X),k.needsUpdate=!1}r=this.type,s.needsUpdate=!1,e.setRenderTarget(h,u,D)};function A(U,F){const X=n.update(g);E.defines.VSM_SAMPLES!==U.blurSamples&&(E.defines.VSM_SAMPLES=U.blurSamples,T.defines.VSM_SAMPLES=U.blurSamples,E.needsUpdate=!0,T.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new kt(l.x,l.y)),E.uniforms.shadow_pass.value=U.map.texture,E.uniforms.resolution.value=U.mapSize,E.uniforms.radius.value=U.radius,e.setRenderTarget(U.mapPass),e.clear(),e.renderBufferDirect(F,null,X,E,g,null),T.uniforms.shadow_pass.value=U.mapPass.texture,T.uniforms.resolution.value=U.mapSize,T.uniforms.radius.value=U.radius,e.setRenderTarget(U.map),e.clear(),e.renderBufferDirect(F,null,X,T,g,null)}function R(U,F,X,h){let u=null;const D=X.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(D!==void 0)u=D;else if(u=X.isPointLight===!0?x:c,e.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){const H=u.uuid,q=F.uuid;let Z=S[H];Z===void 0&&(Z={},S[H]=Z);let Q=Z[q];Q===void 0&&(Q=u.clone(),Z[q]=Q,F.addEventListener("dispose",y)),u=Q}if(u.visible=F.visible,u.wireframe=F.wireframe,h===Tt?u.side=F.shadowSide!==null?F.shadowSide:F.side:u.side=F.shadowSide!==null?F.shadowSide:_[F.side],u.alphaMap=F.alphaMap,u.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,u.map=F.map,u.clipShadows=F.clipShadows,u.clippingPlanes=F.clippingPlanes,u.clipIntersection=F.clipIntersection,u.displacementMap=F.displacementMap,u.displacementScale=F.displacementScale,u.displacementBias=F.displacementBias,u.wireframeLinewidth=F.wireframeLinewidth,u.linewidth=F.linewidth,X.isPointLight===!0&&u.isMeshDistanceMaterial===!0){const H=e.properties.get(u);H.light=X}return u}function v(U,F,X,h,u){if(U.visible===!1)return;if(U.layers.test(F.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&u===Tt)&&(!U.frustumCulled||i.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,U.matrixWorld);const q=n.update(U),Z=U.material;if(Array.isArray(Z)){const Q=q.groups;for(let K=0,ae=Q.length;K<ae;K++){const k=Q[K],pe=Z[k.materialIndex];if(pe&&pe.visible){const Me=R(U,pe,h,u);U.onBeforeShadow(e,U,F,X,q,Me,k),e.renderBufferDirect(X,null,q,Me,U,k),U.onAfterShadow(e,U,F,X,q,Me,k)}}}else if(Z.visible){const Q=R(U,Z,h,u);U.onBeforeShadow(e,U,F,X,q,Q,null),e.renderBufferDirect(X,null,q,Q,U,null),U.onAfterShadow(e,U,F,X,q,Q,null)}}const H=U.children;for(let q=0,Z=H.length;q<Z;q++)v(H[q],F,X,h,u)}function y(U){U.target.removeEventListener("dispose",y);for(const X in S){const h=S[X],u=U.target.uuid;u in h&&(h[u].dispose(),delete h[u])}}}const Xf={[kn]:Vn,[Hn]:On,[Gn]:Fn,[_n]:Bn,[Vn]:kn,[On]:Hn,[Fn]:Gn,[Bn]:_n};function Kf(e,n){function t(){let M=!1;const ie=new dt;let oe=null;const ue=new dt(0,0,0,0);return{setMask:function(ee){oe!==ee&&!M&&(e.colorMask(ee,ee,ee,ee),oe=ee)},setLocked:function(ee){M=ee},setClear:function(ee,$,_e,De,Xe){Xe===!0&&(ee*=De,$*=De,_e*=De),ie.set(ee,$,_e,De),ue.equals(ie)===!1&&(e.clearColor(ee,$,_e,De),ue.copy(ie))},reset:function(){M=!1,oe=null,ue.set(-1,0,0,0)}}}function i(){let M=!1,ie=!1,oe=null,ue=null,ee=null;return{setReversed:function($){if(ie!==$){const _e=n.get("EXT_clip_control");$?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ie=$;const De=ee;ee=null,this.setClear(De)}},getReversed:function(){return ie},setTest:function($){$?Y(e.DEPTH_TEST):G(e.DEPTH_TEST)},setMask:function($){oe!==$&&!M&&(e.depthMask($),oe=$)},setFunc:function($){if(ie&&($=Xf[$]),ue!==$){switch($){case kn:e.depthFunc(e.NEVER);break;case Vn:e.depthFunc(e.ALWAYS);break;case Hn:e.depthFunc(e.LESS);break;case _n:e.depthFunc(e.LEQUAL);break;case Gn:e.depthFunc(e.EQUAL);break;case Bn:e.depthFunc(e.GEQUAL);break;case On:e.depthFunc(e.GREATER);break;case Fn:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ue=$}},setLocked:function($){M=$},setClear:function($){ee!==$&&(ie&&($=1-$),e.clearDepth($),ee=$)},reset:function(){M=!1,oe=null,ue=null,ee=null,ie=!1}}}function l(){let M=!1,ie=null,oe=null,ue=null,ee=null,$=null,_e=null,De=null,Xe=null;return{setTest:function(Ve){M||(Ve?Y(e.STENCIL_TEST):G(e.STENCIL_TEST))},setMask:function(Ve){ie!==Ve&&!M&&(e.stencilMask(Ve),ie=Ve)},setFunc:function(Ve,St,gt){(oe!==Ve||ue!==St||ee!==gt)&&(e.stencilFunc(Ve,St,gt),oe=Ve,ue=St,ee=gt)},setOp:function(Ve,St,gt){($!==Ve||_e!==St||De!==gt)&&(e.stencilOp(Ve,St,gt),$=Ve,_e=St,De=gt)},setLocked:function(Ve){M=Ve},setClear:function(Ve){Xe!==Ve&&(e.clearStencil(Ve),Xe=Ve)},reset:function(){M=!1,ie=null,oe=null,ue=null,ee=null,$=null,_e=null,De=null,Xe=null}}}const a=new t,d=new i,c=new l,x=new WeakMap,S=new WeakMap;let I={},_={},E=new WeakMap,T=[],P=null,g=!1,s=null,r=null,A=null,R=null,v=null,y=null,U=null,F=new $e(0,0,0),X=0,h=!1,u=null,D=null,H=null,q=null,Z=null;const Q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,ae=0;const k=e.getParameter(e.VERSION);k.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(k)[1]),K=ae>=1):k.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),K=ae>=2);let pe=null,Me={};const Ue=e.getParameter(e.SCISSOR_BOX),Be=e.getParameter(e.VIEWPORT),Ze=new dt().fromArray(Ue),Ke=new dt().fromArray(Be);function Oe(M,ie,oe,ue){const ee=new Uint8Array(4),$=e.createTexture();e.bindTexture(M,$),e.texParameteri(M,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(M,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let _e=0;_e<oe;_e++)M===e.TEXTURE_3D||M===e.TEXTURE_2D_ARRAY?e.texImage3D(ie,0,e.RGBA,1,1,ue,0,e.RGBA,e.UNSIGNED_BYTE,ee):e.texImage2D(ie+_e,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ee);return $}const W={};W[e.TEXTURE_2D]=Oe(e.TEXTURE_2D,e.TEXTURE_2D,1),W[e.TEXTURE_CUBE_MAP]=Oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[e.TEXTURE_2D_ARRAY]=Oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),W[e.TEXTURE_3D]=Oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),d.setClear(1),c.setClear(0),Y(e.DEPTH_TEST),d.setFunc(_n),Pe(!1),me(Ui),Y(e.CULL_FACE),Je(Nt);function Y(M){I[M]!==!0&&(e.enable(M),I[M]=!0)}function G(M){I[M]!==!1&&(e.disable(M),I[M]=!1)}function C(M,ie){return _[M]!==ie?(e.bindFramebuffer(M,ie),_[M]=ie,M===e.DRAW_FRAMEBUFFER&&(_[e.FRAMEBUFFER]=ie),M===e.FRAMEBUFFER&&(_[e.DRAW_FRAMEBUFFER]=ie),!0):!1}function j(M,ie){let oe=T,ue=!1;if(M){oe=E.get(ie),oe===void 0&&(oe=[],E.set(ie,oe));const ee=M.textures;if(oe.length!==ee.length||oe[0]!==e.COLOR_ATTACHMENT0){for(let $=0,_e=ee.length;$<_e;$++)oe[$]=e.COLOR_ATTACHMENT0+$;oe.length=ee.length,ue=!0}}else oe[0]!==e.BACK&&(oe[0]=e.BACK,ue=!0);ue&&e.drawBuffers(oe)}function Ae(M){return P!==M?(e.useProgram(M),P=M,!0):!1}const Qe={[Kt]:e.FUNC_ADD,[$r]:e.FUNC_SUBTRACT,[qr]:e.FUNC_REVERSE_SUBTRACT};Qe[co]=e.MIN,Qe[lo]=e.MAX;const m={[fa]:e.ZERO,[la]:e.ONE,[ca]:e.SRC_COLOR,[sa]:e.SRC_ALPHA,[oa]:e.SRC_ALPHA_SATURATE,[aa]:e.DST_COLOR,[ra]:e.DST_ALPHA,[ia]:e.ONE_MINUS_SRC_COLOR,[na]:e.ONE_MINUS_SRC_ALPHA,[ta]:e.ONE_MINUS_DST_COLOR,[ea]:e.ONE_MINUS_DST_ALPHA,[jr]:e.CONSTANT_COLOR,[Jr]:e.ONE_MINUS_CONSTANT_COLOR,[Qr]:e.CONSTANT_ALPHA,[Zr]:e.ONE_MINUS_CONSTANT_ALPHA};function Je(M,ie,oe,ue,ee,$,_e,De,Xe,Ve){if(M===Nt){g===!0&&(G(e.BLEND),g=!1);return}if(g===!1&&(Y(e.BLEND),g=!0),M!==Fa){if(M!==s||Ve!==h){if((r!==Kt||v!==Kt)&&(e.blendEquation(e.FUNC_ADD),r=Kt,v=Kt),Ve)switch(M){case un:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case wi:e.blendFunc(e.ONE,e.ONE);break;case Ii:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Di:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}else switch(M){case un:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case wi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Ii:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Di:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}A=null,R=null,y=null,U=null,F.set(0,0,0),X=0,s=M,h=Ve}return}ee=ee||ie,$=$||oe,_e=_e||ue,(ie!==r||ee!==v)&&(e.blendEquationSeparate(Qe[ie],Qe[ee]),r=ie,v=ee),(oe!==A||ue!==R||$!==y||_e!==U)&&(e.blendFuncSeparate(m[oe],m[ue],m[$],m[_e]),A=oe,R=ue,y=$,U=_e),(De.equals(F)===!1||Xe!==X)&&(e.blendColor(De.r,De.g,De.b,Xe),F.copy(De),X=Xe),s=M,h=!1}function Ie(M,ie){M.side===Mt?G(e.CULL_FACE):Y(e.CULL_FACE);let oe=M.side===vt;ie&&(oe=!oe),Pe(oe),M.blending===un&&M.transparent===!1?Je(Nt):Je(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),d.setFunc(M.depthFunc),d.setTest(M.depthTest),d.setMask(M.depthWrite),a.setMask(M.colorWrite);const ue=M.stencilWrite;c.setTest(ue),ue&&(c.setMask(M.stencilWriteMask),c.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),c.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),ve(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?Y(e.SAMPLE_ALPHA_TO_COVERAGE):G(e.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(M){u!==M&&(M?e.frontFace(e.CW):e.frontFace(e.CCW),u=M)}function me(M){M!==Na?(Y(e.CULL_FACE),M!==D&&(M===Ui?e.cullFace(e.BACK):M===ya?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):G(e.CULL_FACE),D=M}function je(M){M!==H&&(K&&e.lineWidth(M),H=M)}function ve(M,ie,oe){M?(Y(e.POLYGON_OFFSET_FILL),(q!==ie||Z!==oe)&&(e.polygonOffset(ie,oe),q=ie,Z=oe)):G(e.POLYGON_OFFSET_FILL)}function Ne(M){M?Y(e.SCISSOR_TEST):G(e.SCISSOR_TEST)}function st(M){M===void 0&&(M=e.TEXTURE0+Q-1),pe!==M&&(e.activeTexture(M),pe=M)}function it(M,ie,oe){oe===void 0&&(pe===null?oe=e.TEXTURE0+Q-1:oe=pe);let ue=Me[oe];ue===void 0&&(ue={type:void 0,texture:void 0},Me[oe]=ue),(ue.type!==M||ue.texture!==ie)&&(pe!==oe&&(e.activeTexture(oe),pe=oe),e.bindTexture(M,ie||W[M]),ue.type=M,ue.texture=ie)}function p(){const M=Me[pe];M!==void 0&&M.type!==void 0&&(e.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)}function o(){try{e.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function w(){try{e.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function z(){try{e.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function J(){try{e.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Te(){try{e.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function re(){try{e.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function ge(){try{e.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Ee(){try{e.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function ne(){try{e.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function fe(M){Ze.equals(M)===!1&&(e.scissor(M.x,M.y,M.z,M.w),Ze.copy(M))}function be(M){Ke.equals(M)===!1&&(e.viewport(M.x,M.y,M.z,M.w),Ke.copy(M))}function Se(M,ie){let oe=S.get(ie);oe===void 0&&(oe=new WeakMap,S.set(ie,oe));let ue=oe.get(M);ue===void 0&&(ue=e.getUniformBlockIndex(ie,M.name),oe.set(M,ue))}function ce(M,ie){const ue=S.get(ie).get(M);x.get(ie)!==ue&&(e.uniformBlockBinding(ie,ue,M.__bindingPointIndex),x.set(ie,ue))}function we(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),d.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),I={},pe=null,Me={},_={},E=new WeakMap,T=[],P=null,g=!1,s=null,r=null,A=null,R=null,v=null,y=null,U=null,F=new $e(0,0,0),X=0,h=!1,u=null,D=null,H=null,q=null,Z=null,Ze.set(0,0,e.canvas.width,e.canvas.height),Ke.set(0,0,e.canvas.width,e.canvas.height),a.reset(),d.reset(),c.reset()}return{buffers:{color:a,depth:d,stencil:c},enable:Y,disable:G,bindFramebuffer:C,drawBuffers:j,useProgram:Ae,setBlending:Je,setMaterial:Ie,setFlipSided:Pe,setCullFace:me,setLineWidth:je,setPolygonOffset:ve,setScissorTest:Ne,activeTexture:st,bindTexture:it,unbindTexture:p,compressedTexImage2D:o,compressedTexImage3D:w,texImage2D:Ee,texImage3D:ne,updateUBOMapping:Se,uniformBlockBinding:ce,texStorage2D:re,texStorage3D:ge,texSubImage2D:z,texSubImage3D:J,compressedTexSubImage2D:V,compressedTexSubImage3D:Te,scissor:fe,viewport:be,reset:we}}function Yf(e,n,t,i,l,a,d){const c=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,x=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),S=new ut,I=new WeakMap;let _;const E=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function P(p,o){return T?new OffscreenCanvas(p,o):ro("canvas")}function g(p,o,w){let z=1;const J=it(p);if((J.width>w||J.height>w)&&(z=w/Math.max(J.width,J.height)),z<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){const V=Math.floor(z*J.width),Te=Math.floor(z*J.height);_===void 0&&(_=P(V,Te));const re=o?P(V,Te):_;return re.width=V,re.height=Te,re.getContext("2d").drawImage(p,0,0,V,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+V+"x"+Te+")."),re}else return"data"in p&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),p;return p}function s(p){return p.generateMipmaps}function r(p){e.generateMipmap(p)}function A(p){return p.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?e.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function R(p,o,w,z,J=!1){if(p!==null){if(e[p]!==void 0)return e[p];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let V=o;if(o===e.RED&&(w===e.FLOAT&&(V=e.R32F),w===e.HALF_FLOAT&&(V=e.R16F),w===e.UNSIGNED_BYTE&&(V=e.R8)),o===e.RED_INTEGER&&(w===e.UNSIGNED_BYTE&&(V=e.R8UI),w===e.UNSIGNED_SHORT&&(V=e.R16UI),w===e.UNSIGNED_INT&&(V=e.R32UI),w===e.BYTE&&(V=e.R8I),w===e.SHORT&&(V=e.R16I),w===e.INT&&(V=e.R32I)),o===e.RG&&(w===e.FLOAT&&(V=e.RG32F),w===e.HALF_FLOAT&&(V=e.RG16F),w===e.UNSIGNED_BYTE&&(V=e.RG8)),o===e.RG_INTEGER&&(w===e.UNSIGNED_BYTE&&(V=e.RG8UI),w===e.UNSIGNED_SHORT&&(V=e.RG16UI),w===e.UNSIGNED_INT&&(V=e.RG32UI),w===e.BYTE&&(V=e.RG8I),w===e.SHORT&&(V=e.RG16I),w===e.INT&&(V=e.RG32I)),o===e.RGB_INTEGER&&(w===e.UNSIGNED_BYTE&&(V=e.RGB8UI),w===e.UNSIGNED_SHORT&&(V=e.RGB16UI),w===e.UNSIGNED_INT&&(V=e.RGB32UI),w===e.BYTE&&(V=e.RGB8I),w===e.SHORT&&(V=e.RGB16I),w===e.INT&&(V=e.RGB32I)),o===e.RGBA_INTEGER&&(w===e.UNSIGNED_BYTE&&(V=e.RGBA8UI),w===e.UNSIGNED_SHORT&&(V=e.RGBA16UI),w===e.UNSIGNED_INT&&(V=e.RGBA32UI),w===e.BYTE&&(V=e.RGBA8I),w===e.SHORT&&(V=e.RGBA16I),w===e.INT&&(V=e.RGBA32I)),o===e.RGB&&(w===e.UNSIGNED_INT_5_9_9_9_REV&&(V=e.RGB9_E5),w===e.UNSIGNED_INT_10F_11F_11F_REV&&(V=e.R11F_G11F_B10F)),o===e.RGBA){const Te=J?br:rt.getTransfer(z);w===e.FLOAT&&(V=e.RGBA32F),w===e.HALF_FLOAT&&(V=e.RGBA16F),w===e.UNSIGNED_BYTE&&(V=Te===qe?e.SRGB8_ALPHA8:e.RGBA8),w===e.UNSIGNED_SHORT_4_4_4_4&&(V=e.RGBA4),w===e.UNSIGNED_SHORT_5_5_5_1&&(V=e.RGB5_A1)}return(V===e.R16F||V===e.R32F||V===e.RG16F||V===e.RG32F||V===e.RGBA16F||V===e.RGBA32F)&&n.get("EXT_color_buffer_float"),V}function v(p,o){let w;return p?o===null||o===tn||o===en?w=e.DEPTH24_STENCIL8:o===wt?w=e.DEPTH32F_STENCIL8:o===mn&&(w=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):o===null||o===tn||o===en?w=e.DEPTH_COMPONENT24:o===wt?w=e.DEPTH_COMPONENT32F:o===mn&&(w=e.DEPTH_COMPONENT16),w}function y(p,o){return s(p)===!0||p.isFramebufferTexture&&p.minFilter!==Zt&&p.minFilter!==Ht?Math.log2(Math.max(o.width,o.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?o.mipmaps.length:1}function U(p){const o=p.target;o.removeEventListener("dispose",U),X(o),o.isVideoTexture&&I.delete(o)}function F(p){const o=p.target;o.removeEventListener("dispose",F),u(o)}function X(p){const o=i.get(p);if(o.__webglInit===void 0)return;const w=p.source,z=E.get(w);if(z){const J=z[o.__cacheKey];J.usedTimes--,J.usedTimes===0&&h(p),Object.keys(z).length===0&&E.delete(w)}i.remove(p)}function h(p){const o=i.get(p);e.deleteTexture(o.__webglTexture);const w=p.source,z=E.get(w);delete z[o.__cacheKey],d.memory.textures--}function u(p){const o=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(o.__webglFramebuffer[z]))for(let J=0;J<o.__webglFramebuffer[z].length;J++)e.deleteFramebuffer(o.__webglFramebuffer[z][J]);else e.deleteFramebuffer(o.__webglFramebuffer[z]);o.__webglDepthbuffer&&e.deleteRenderbuffer(o.__webglDepthbuffer[z])}else{if(Array.isArray(o.__webglFramebuffer))for(let z=0;z<o.__webglFramebuffer.length;z++)e.deleteFramebuffer(o.__webglFramebuffer[z]);else e.deleteFramebuffer(o.__webglFramebuffer);if(o.__webglDepthbuffer&&e.deleteRenderbuffer(o.__webglDepthbuffer),o.__webglMultisampledFramebuffer&&e.deleteFramebuffer(o.__webglMultisampledFramebuffer),o.__webglColorRenderbuffer)for(let z=0;z<o.__webglColorRenderbuffer.length;z++)o.__webglColorRenderbuffer[z]&&e.deleteRenderbuffer(o.__webglColorRenderbuffer[z]);o.__webglDepthRenderbuffer&&e.deleteRenderbuffer(o.__webglDepthRenderbuffer)}const w=p.textures;for(let z=0,J=w.length;z<J;z++){const V=i.get(w[z]);V.__webglTexture&&(e.deleteTexture(V.__webglTexture),d.memory.textures--),i.remove(w[z])}i.remove(p)}let D=0;function H(){D=0}function q(){const p=D;return p>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+p+" texture units while this GPU supports only "+l.maxTextures),D+=1,p}function Z(p){const o=[];return o.push(p.wrapS),o.push(p.wrapT),o.push(p.wrapR||0),o.push(p.magFilter),o.push(p.minFilter),o.push(p.anisotropy),o.push(p.internalFormat),o.push(p.format),o.push(p.type),o.push(p.generateMipmaps),o.push(p.premultiplyAlpha),o.push(p.flipY),o.push(p.unpackAlignment),o.push(p.colorSpace),o.join()}function Q(p,o){const w=i.get(p);if(p.isVideoTexture&&Ne(p),p.isRenderTargetTexture===!1&&p.isExternalTexture!==!0&&p.version>0&&w.__version!==p.version){const z=p.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(w,p,o);return}}else p.isExternalTexture&&(w.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,w.__webglTexture,e.TEXTURE0+o)}function K(p,o){const w=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&w.__version!==p.version){W(w,p,o);return}t.bindTexture(e.TEXTURE_2D_ARRAY,w.__webglTexture,e.TEXTURE0+o)}function ae(p,o){const w=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&w.__version!==p.version){W(w,p,o);return}t.bindTexture(e.TEXTURE_3D,w.__webglTexture,e.TEXTURE0+o)}function k(p,o){const w=i.get(p);if(p.version>0&&w.__version!==p.version){Y(w,p,o);return}t.bindTexture(e.TEXTURE_CUBE_MAP,w.__webglTexture,e.TEXTURE0+o)}const pe={[pa]:e.REPEAT,[ua]:e.CLAMP_TO_EDGE,[da]:e.MIRRORED_REPEAT},Me={[Zt]:e.NEAREST,[ha]:e.NEAREST_MIPMAP_NEAREST,[on]:e.NEAREST_MIPMAP_LINEAR,[Ht]:e.LINEAR,[xn]:e.LINEAR_MIPMAP_NEAREST,[Yt]:e.LINEAR_MIPMAP_LINEAR},Ue={[Ta]:e.NEVER,[Sa]:e.ALWAYS,[Ea]:e.LESS,[pr]:e.LEQUAL,[ga]:e.EQUAL,[va]:e.GEQUAL,[ma]:e.GREATER,[_a]:e.NOTEQUAL};function Be(p,o){if(o.type===wt&&n.has("OES_texture_float_linear")===!1&&(o.magFilter===Ht||o.magFilter===xn||o.magFilter===on||o.magFilter===Yt||o.minFilter===Ht||o.minFilter===xn||o.minFilter===on||o.minFilter===Yt)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(p,e.TEXTURE_WRAP_S,pe[o.wrapS]),e.texParameteri(p,e.TEXTURE_WRAP_T,pe[o.wrapT]),(p===e.TEXTURE_3D||p===e.TEXTURE_2D_ARRAY)&&e.texParameteri(p,e.TEXTURE_WRAP_R,pe[o.wrapR]),e.texParameteri(p,e.TEXTURE_MAG_FILTER,Me[o.magFilter]),e.texParameteri(p,e.TEXTURE_MIN_FILTER,Me[o.minFilter]),o.compareFunction&&(e.texParameteri(p,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(p,e.TEXTURE_COMPARE_FUNC,Ue[o.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(o.magFilter===Zt||o.minFilter!==on&&o.minFilter!==Yt||o.type===wt&&n.has("OES_texture_float_linear")===!1)return;if(o.anisotropy>1||i.get(o).__currentAnisotropy){const w=n.get("EXT_texture_filter_anisotropic");e.texParameterf(p,w.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(o.anisotropy,l.getMaxAnisotropy())),i.get(o).__currentAnisotropy=o.anisotropy}}}function Ze(p,o){let w=!1;p.__webglInit===void 0&&(p.__webglInit=!0,o.addEventListener("dispose",U));const z=o.source;let J=E.get(z);J===void 0&&(J={},E.set(z,J));const V=Z(o);if(V!==p.__cacheKey){J[V]===void 0&&(J[V]={texture:e.createTexture(),usedTimes:0},d.memory.textures++,w=!0),J[V].usedTimes++;const Te=J[p.__cacheKey];Te!==void 0&&(J[p.__cacheKey].usedTimes--,Te.usedTimes===0&&h(o)),p.__cacheKey=V,p.__webglTexture=J[V].texture}return w}function Ke(p,o,w){return Math.floor(Math.floor(p/w)/o)}function Oe(p,o,w,z){const V=p.updateRanges;if(V.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,o.width,o.height,w,z,o.data);else{V.sort((ne,fe)=>ne.start-fe.start);let Te=0;for(let ne=1;ne<V.length;ne++){const fe=V[Te],be=V[ne],Se=fe.start+fe.count,ce=Ke(be.start,o.width,4),we=Ke(fe.start,o.width,4);be.start<=Se+1&&ce===we&&Ke(be.start+be.count-1,o.width,4)===ce?fe.count=Math.max(fe.count,be.start+be.count-fe.start):(++Te,V[Te]=be)}V.length=Te+1;const re=e.getParameter(e.UNPACK_ROW_LENGTH),ge=e.getParameter(e.UNPACK_SKIP_PIXELS),Ee=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,o.width);for(let ne=0,fe=V.length;ne<fe;ne++){const be=V[ne],Se=Math.floor(be.start/4),ce=Math.ceil(be.count/4),we=Se%o.width,M=Math.floor(Se/o.width),ie=ce,oe=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,we),e.pixelStorei(e.UNPACK_SKIP_ROWS,M),t.texSubImage2D(e.TEXTURE_2D,0,we,M,ie,oe,w,z,o.data)}p.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,re),e.pixelStorei(e.UNPACK_SKIP_PIXELS,ge),e.pixelStorei(e.UNPACK_SKIP_ROWS,Ee)}}function W(p,o,w){let z=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(z=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(z=e.TEXTURE_3D);const J=Ze(p,o),V=o.source;t.bindTexture(z,p.__webglTexture,e.TEXTURE0+w);const Te=i.get(V);if(V.version!==Te.__version||J===!0){t.activeTexture(e.TEXTURE0+w);const re=rt.getPrimaries(rt.workingColorSpace),ge=o.colorSpace===Gt?null:rt.getPrimaries(o.colorSpace),Ee=o.colorSpace===Gt||re===ge?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let ne=g(o.image,!1,l.maxTextureSize);ne=st(o,ne);const fe=a.convert(o.format,o.colorSpace),be=a.convert(o.type);let Se=R(o.internalFormat,fe,be,o.colorSpace,o.isVideoTexture);Be(z,o);let ce;const we=o.mipmaps,M=o.isVideoTexture!==!0,ie=Te.__version===void 0||J===!0,oe=V.dataReady,ue=y(o,ne);if(o.isDepthTexture)Se=v(o.format===hn,o.type),ie&&(M?t.texStorage2D(e.TEXTURE_2D,1,Se,ne.width,ne.height):t.texImage2D(e.TEXTURE_2D,0,Se,ne.width,ne.height,0,fe,be,null));else if(o.isDataTexture)if(we.length>0){M&&ie&&t.texStorage2D(e.TEXTURE_2D,ue,Se,we[0].width,we[0].height);for(let ee=0,$=we.length;ee<$;ee++)ce=we[ee],M?oe&&t.texSubImage2D(e.TEXTURE_2D,ee,0,0,ce.width,ce.height,fe,be,ce.data):t.texImage2D(e.TEXTURE_2D,ee,Se,ce.width,ce.height,0,fe,be,ce.data);o.generateMipmaps=!1}else M?(ie&&t.texStorage2D(e.TEXTURE_2D,ue,Se,ne.width,ne.height),oe&&Oe(o,ne,fe,be)):t.texImage2D(e.TEXTURE_2D,0,Se,ne.width,ne.height,0,fe,be,ne.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){M&&ie&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Se,we[0].width,we[0].height,ne.depth);for(let ee=0,$=we.length;ee<$;ee++)if(ce=we[ee],o.format!==At)if(fe!==null)if(M){if(oe)if(o.layerUpdates.size>0){const _e=yi(ce.width,ce.height,o.format,o.type);for(const De of o.layerUpdates){const Xe=ce.data.subarray(De*_e/ce.data.BYTES_PER_ELEMENT,(De+1)*_e/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ee,0,0,De,ce.width,ce.height,1,fe,Xe)}o.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,fe,ce.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ee,Se,ce.width,ce.height,ne.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else M?oe&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,fe,be,ce.data):t.texImage3D(e.TEXTURE_2D_ARRAY,ee,Se,ce.width,ce.height,ne.depth,0,fe,be,ce.data)}else{M&&ie&&t.texStorage2D(e.TEXTURE_2D,ue,Se,we[0].width,we[0].height);for(let ee=0,$=we.length;ee<$;ee++)ce=we[ee],o.format!==At?fe!==null?M?oe&&t.compressedTexSubImage2D(e.TEXTURE_2D,ee,0,0,ce.width,ce.height,fe,ce.data):t.compressedTexImage2D(e.TEXTURE_2D,ee,Se,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):M?oe&&t.texSubImage2D(e.TEXTURE_2D,ee,0,0,ce.width,ce.height,fe,be,ce.data):t.texImage2D(e.TEXTURE_2D,ee,Se,ce.width,ce.height,0,fe,be,ce.data)}else if(o.isDataArrayTexture)if(M){if(ie&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Se,ne.width,ne.height,ne.depth),oe)if(o.layerUpdates.size>0){const ee=yi(ne.width,ne.height,o.format,o.type);for(const $ of o.layerUpdates){const _e=ne.data.subarray($*ee/ne.data.BYTES_PER_ELEMENT,($+1)*ee/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,$,ne.width,ne.height,1,fe,be,_e)}o.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,fe,be,ne.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,Se,ne.width,ne.height,ne.depth,0,fe,be,ne.data);else if(o.isData3DTexture)M?(ie&&t.texStorage3D(e.TEXTURE_3D,ue,Se,ne.width,ne.height,ne.depth),oe&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,fe,be,ne.data)):t.texImage3D(e.TEXTURE_3D,0,Se,ne.width,ne.height,ne.depth,0,fe,be,ne.data);else if(o.isFramebufferTexture){if(ie)if(M)t.texStorage2D(e.TEXTURE_2D,ue,Se,ne.width,ne.height);else{let ee=ne.width,$=ne.height;for(let _e=0;_e<ue;_e++)t.texImage2D(e.TEXTURE_2D,_e,Se,ee,$,0,fe,be,null),ee>>=1,$>>=1}}else if(we.length>0){if(M&&ie){const ee=it(we[0]);t.texStorage2D(e.TEXTURE_2D,ue,Se,ee.width,ee.height)}for(let ee=0,$=we.length;ee<$;ee++)ce=we[ee],M?oe&&t.texSubImage2D(e.TEXTURE_2D,ee,0,0,fe,be,ce):t.texImage2D(e.TEXTURE_2D,ee,Se,fe,be,ce);o.generateMipmaps=!1}else if(M){if(ie){const ee=it(ne);t.texStorage2D(e.TEXTURE_2D,ue,Se,ee.width,ee.height)}oe&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,fe,be,ne)}else t.texImage2D(e.TEXTURE_2D,0,Se,fe,be,ne);s(o)&&r(z),Te.__version=V.version,o.onUpdate&&o.onUpdate(o)}p.__version=o.version}function Y(p,o,w){if(o.image.length!==6)return;const z=Ze(p,o),J=o.source;t.bindTexture(e.TEXTURE_CUBE_MAP,p.__webglTexture,e.TEXTURE0+w);const V=i.get(J);if(J.version!==V.__version||z===!0){t.activeTexture(e.TEXTURE0+w);const Te=rt.getPrimaries(rt.workingColorSpace),re=o.colorSpace===Gt?null:rt.getPrimaries(o.colorSpace),ge=o.colorSpace===Gt||Te===re?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Ee=o.isCompressedTexture||o.image[0].isCompressedTexture,ne=o.image[0]&&o.image[0].isDataTexture,fe=[];for(let $=0;$<6;$++)!Ee&&!ne?fe[$]=g(o.image[$],!0,l.maxCubemapSize):fe[$]=ne?o.image[$].image:o.image[$],fe[$]=st(o,fe[$]);const be=fe[0],Se=a.convert(o.format,o.colorSpace),ce=a.convert(o.type),we=R(o.internalFormat,Se,ce,o.colorSpace),M=o.isVideoTexture!==!0,ie=V.__version===void 0||z===!0,oe=J.dataReady;let ue=y(o,be);Be(e.TEXTURE_CUBE_MAP,o);let ee;if(Ee){M&&ie&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,we,be.width,be.height);for(let $=0;$<6;$++){ee=fe[$].mipmaps;for(let _e=0;_e<ee.length;_e++){const De=ee[_e];o.format!==At?Se!==null?M?oe&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,De.width,De.height,Se,De.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,we,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,De.width,De.height,Se,ce,De.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,we,De.width,De.height,0,Se,ce,De.data)}}}else{if(ee=o.mipmaps,M&&ie){ee.length>0&&ue++;const $=it(fe[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,we,$.width,$.height)}for(let $=0;$<6;$++)if(ne){M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,fe[$].width,fe[$].height,Se,ce,fe[$].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,we,fe[$].width,fe[$].height,0,Se,ce,fe[$].data);for(let _e=0;_e<ee.length;_e++){const Xe=ee[_e].image[$].image;M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,Xe.width,Xe.height,Se,ce,Xe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,we,Xe.width,Xe.height,0,Se,ce,Xe.data)}}else{M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Se,ce,fe[$]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,we,Se,ce,fe[$]);for(let _e=0;_e<ee.length;_e++){const De=ee[_e];M?oe&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,Se,ce,De.image[$]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,we,Se,ce,De.image[$])}}}s(o)&&r(e.TEXTURE_CUBE_MAP),V.__version=J.version,o.onUpdate&&o.onUpdate(o)}p.__version=o.version}function G(p,o,w,z,J,V){const Te=a.convert(w.format,w.colorSpace),re=a.convert(w.type),ge=R(w.internalFormat,Te,re,w.colorSpace),Ee=i.get(o),ne=i.get(w);if(ne.__renderTarget=o,!Ee.__hasExternalTextures){const fe=Math.max(1,o.width>>V),be=Math.max(1,o.height>>V);J===e.TEXTURE_3D||J===e.TEXTURE_2D_ARRAY?t.texImage3D(J,V,ge,fe,be,o.depth,0,Te,re,null):t.texImage2D(J,V,ge,fe,be,0,Te,re,null)}t.bindFramebuffer(e.FRAMEBUFFER,p),ve(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,z,J,ne.__webglTexture,0,je(o)):(J===e.TEXTURE_2D||J>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,z,J,ne.__webglTexture,V),t.bindFramebuffer(e.FRAMEBUFFER,null)}function C(p,o,w){if(e.bindRenderbuffer(e.RENDERBUFFER,p),o.depthBuffer){const z=o.depthTexture,J=z&&z.isDepthTexture?z.type:null,V=v(o.stencilBuffer,J),Te=o.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,re=je(o);ve(o)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,re,V,o.width,o.height):w?e.renderbufferStorageMultisample(e.RENDERBUFFER,re,V,o.width,o.height):e.renderbufferStorage(e.RENDERBUFFER,V,o.width,o.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Te,e.RENDERBUFFER,p)}else{const z=o.textures;for(let J=0;J<z.length;J++){const V=z[J],Te=a.convert(V.format,V.colorSpace),re=a.convert(V.type),ge=R(V.internalFormat,Te,re,V.colorSpace),Ee=je(o);w&&ve(o)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee,ge,o.width,o.height):ve(o)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee,ge,o.width,o.height):e.renderbufferStorage(e.RENDERBUFFER,ge,o.width,o.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function j(p,o){if(o&&o.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,p),!(o.depthTexture&&o.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const z=i.get(o.depthTexture);z.__renderTarget=o,(!z.__webglTexture||o.depthTexture.image.width!==o.width||o.depthTexture.image.height!==o.height)&&(o.depthTexture.image.width=o.width,o.depthTexture.image.height=o.height,o.depthTexture.needsUpdate=!0),Q(o.depthTexture,0);const J=z.__webglTexture,V=je(o);if(o.depthTexture.format===Yn)ve(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,J,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,J,0);else if(o.depthTexture.format===hn)ve(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,J,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ae(p){const o=i.get(p),w=p.isWebGLCubeRenderTarget===!0;if(o.__boundDepthTexture!==p.depthTexture){const z=p.depthTexture;if(o.__depthDisposeCallback&&o.__depthDisposeCallback(),z){const J=()=>{delete o.__boundDepthTexture,delete o.__depthDisposeCallback,z.removeEventListener("dispose",J)};z.addEventListener("dispose",J),o.__depthDisposeCallback=J}o.__boundDepthTexture=z}if(p.depthTexture&&!o.__autoAllocateDepthBuffer){if(w)throw new Error("target.depthTexture not supported in Cube render targets");const z=p.texture.mipmaps;z&&z.length>0?j(o.__webglFramebuffer[0],p):j(o.__webglFramebuffer,p)}else if(w){o.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer[z]),o.__webglDepthbuffer[z]===void 0)o.__webglDepthbuffer[z]=e.createRenderbuffer(),C(o.__webglDepthbuffer[z],p,!1);else{const J=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=o.__webglDepthbuffer[z];e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,J,e.RENDERBUFFER,V)}}else{const z=p.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer),o.__webglDepthbuffer===void 0)o.__webglDepthbuffer=e.createRenderbuffer(),C(o.__webglDepthbuffer,p,!1);else{const J=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=o.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,J,e.RENDERBUFFER,V)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Qe(p,o,w){const z=i.get(p);o!==void 0&&G(z.__webglFramebuffer,p,p.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),w!==void 0&&Ae(p)}function m(p){const o=p.texture,w=i.get(p),z=i.get(o);p.addEventListener("dispose",F);const J=p.textures,V=p.isWebGLCubeRenderTarget===!0,Te=J.length>1;if(Te||(z.__webglTexture===void 0&&(z.__webglTexture=e.createTexture()),z.__version=o.version,d.memory.textures++),V){w.__webglFramebuffer=[];for(let re=0;re<6;re++)if(o.mipmaps&&o.mipmaps.length>0){w.__webglFramebuffer[re]=[];for(let ge=0;ge<o.mipmaps.length;ge++)w.__webglFramebuffer[re][ge]=e.createFramebuffer()}else w.__webglFramebuffer[re]=e.createFramebuffer()}else{if(o.mipmaps&&o.mipmaps.length>0){w.__webglFramebuffer=[];for(let re=0;re<o.mipmaps.length;re++)w.__webglFramebuffer[re]=e.createFramebuffer()}else w.__webglFramebuffer=e.createFramebuffer();if(Te)for(let re=0,ge=J.length;re<ge;re++){const Ee=i.get(J[re]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=e.createTexture(),d.memory.textures++)}if(p.samples>0&&ve(p)===!1){w.__webglMultisampledFramebuffer=e.createFramebuffer(),w.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,w.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const ge=J[re];w.__webglColorRenderbuffer[re]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,w.__webglColorRenderbuffer[re]);const Ee=a.convert(ge.format,ge.colorSpace),ne=a.convert(ge.type),fe=R(ge.internalFormat,Ee,ne,ge.colorSpace,p.isXRRenderTarget===!0),be=je(p);e.renderbufferStorageMultisample(e.RENDERBUFFER,be,fe,p.width,p.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+re,e.RENDERBUFFER,w.__webglColorRenderbuffer[re])}e.bindRenderbuffer(e.RENDERBUFFER,null),p.depthBuffer&&(w.__webglDepthRenderbuffer=e.createRenderbuffer(),C(w.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(V){t.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture),Be(e.TEXTURE_CUBE_MAP,o);for(let re=0;re<6;re++)if(o.mipmaps&&o.mipmaps.length>0)for(let ge=0;ge<o.mipmaps.length;ge++)G(w.__webglFramebuffer[re][ge],p,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+re,ge);else G(w.__webglFramebuffer[re],p,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);s(o)&&r(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let re=0,ge=J.length;re<ge;re++){const Ee=J[re],ne=i.get(Ee);let fe=e.TEXTURE_2D;(p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(fe=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(fe,ne.__webglTexture),Be(fe,Ee),G(w.__webglFramebuffer,p,Ee,e.COLOR_ATTACHMENT0+re,fe,0),s(Ee)&&r(fe)}t.unbindTexture()}else{let re=e.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(re=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(re,z.__webglTexture),Be(re,o),o.mipmaps&&o.mipmaps.length>0)for(let ge=0;ge<o.mipmaps.length;ge++)G(w.__webglFramebuffer[ge],p,o,e.COLOR_ATTACHMENT0,re,ge);else G(w.__webglFramebuffer,p,o,e.COLOR_ATTACHMENT0,re,0);s(o)&&r(re),t.unbindTexture()}p.depthBuffer&&Ae(p)}function Je(p){const o=p.textures;for(let w=0,z=o.length;w<z;w++){const J=o[w];if(s(J)){const V=A(p),Te=i.get(J).__webglTexture;t.bindTexture(V,Te),r(V),t.unbindTexture()}}}const Ie=[],Pe=[];function me(p){if(p.samples>0){if(ve(p)===!1){const o=p.textures,w=p.width,z=p.height;let J=e.COLOR_BUFFER_BIT;const V=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Te=i.get(p),re=o.length>1;if(re)for(let Ee=0;Ee<o.length;Ee++)t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const ge=p.texture.mipmaps;ge&&ge.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Ee=0;Ee<o.length;Ee++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(J|=e.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(J|=e.STENCIL_BUFFER_BIT)),re){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);const ne=i.get(o[Ee]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ne,0)}e.blitFramebuffer(0,0,w,z,0,0,w,z,J,e.NEAREST),x===!0&&(Ie.length=0,Pe.length=0,Ie.push(e.COLOR_ATTACHMENT0+Ee),p.depthBuffer&&p.resolveDepthBuffer===!1&&(Ie.push(V),Pe.push(V),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Pe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),re)for(let Ee=0;Ee<o.length;Ee++){t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);const ne=i.get(o[Ee]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,Te.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.TEXTURE_2D,ne,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.resolveDepthBuffer===!1&&x){const o=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[o])}}}function je(p){return Math.min(l.maxSamples,p.samples)}function ve(p){const o=i.get(p);return p.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&o.__useRenderToTexture!==!1}function Ne(p){const o=d.render.frame;I.get(p)!==o&&(I.set(p,o),p.update())}function st(p,o){const w=p.colorSpace,z=p.format,J=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||w!==gn&&w!==Gt&&(rt.getTransfer(w)===qe?(z!==At||J!==yt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",w)),o}function it(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(S.width=p.naturalWidth||p.width,S.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(S.width=p.displayWidth,S.height=p.displayHeight):(S.width=p.width,S.height=p.height),S}this.allocateTextureUnit=q,this.resetTextureUnits=H,this.setTexture2D=Q,this.setTexture2DArray=K,this.setTexture3D=ae,this.setTextureCube=k,this.rebindTextures=Qe,this.setupRenderTarget=m,this.updateRenderTargetMipmap=Je,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=G,this.useMultisampledRTT=ve}function qf(e,n){function t(i,l=Gt){let a;const d=rt.getTransfer(l);if(i===yt)return e.UNSIGNED_BYTE;if(i===_r)return e.UNSIGNED_SHORT_4_4_4_4;if(i===mr)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Ca)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===ba)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Pa)return e.BYTE;if(i===La)return e.SHORT;if(i===mn)return e.UNSIGNED_SHORT;if(i===Er)return e.INT;if(i===tn)return e.UNSIGNED_INT;if(i===wt)return e.FLOAT;if(i===vn)return e.HALF_FLOAT;if(i===Ua)return e.ALPHA;if(i===Da)return e.RGB;if(i===At)return e.RGBA;if(i===Yn)return e.DEPTH_COMPONENT;if(i===hn)return e.DEPTH_STENCIL;if(i===Ia)return e.RED;if(i===Sr)return e.RED_INTEGER;if(i===wa)return e.RG;if(i===Tr)return e.RG_INTEGER;if(i===Mr)return e.RGBA_INTEGER;if(i===Rn||i===Cn||i===bn||i===Pn)if(d===qe)if(a=n.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Rn)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===bn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Pn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=n.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Rn)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cn)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===bn)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Pn)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ni||i===ii||i===ri||i===ai)if(a=n.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===ni)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ii)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ri)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ai)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oi||i===si||i===ci)if(a=n.get("WEBGL_compressed_texture_etc"),a!==null){if(i===oi||i===si)return d===qe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===ci)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===li||i===fi||i===di||i===ui||i===pi||i===hi||i===_i||i===mi||i===vi||i===gi||i===Ei||i===Si||i===Ti||i===Mi)if(a=n.get("WEBGL_compressed_texture_astc"),a!==null){if(i===li)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===di)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ui)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===pi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===hi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_i)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===gi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ei)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Si)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ti)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Mi)return d===qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ai||i===xi||i===Ri)if(a=n.get("EXT_texture_compression_bptc"),a!==null){if(i===Ai)return d===qe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xi)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ri)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ci||i===bi||i===Pi||i===Li)if(a=n.get("EXT_texture_compression_rgtc"),a!==null){if(i===Ci)return a.COMPRESSED_RED_RGTC1_EXT;if(i===bi)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pi)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Li)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===en?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const $f=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zf=`
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

}`;class Qf{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new vr(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Ft({vertexShader:$f,fragmentShader:Zf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rt(new gr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Jf extends Xr{constructor(n,t){super();const i=this;let l=null,a=1,d=null,c="local-floor",x=1,S=null,I=null,_=null,E=null,T=null,P=null;const g=typeof XRWebGLBinding<"u",s=new Qf,r={},A=t.getContextAttributes();let R=null,v=null;const y=[],U=[],F=new ut;let X=null;const h=new $t;h.viewport=new dt;const u=new $t;u.viewport=new dt;const D=[h,u],H=new Kr;let q=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Y=y[W];return Y===void 0&&(Y=new An,y[W]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(W){let Y=y[W];return Y===void 0&&(Y=new An,y[W]=Y),Y.getGripSpace()},this.getHand=function(W){let Y=y[W];return Y===void 0&&(Y=new An,y[W]=Y),Y.getHandSpace()};function Q(W){const Y=U.indexOf(W.inputSource);if(Y===-1)return;const G=y[Y];G!==void 0&&(G.update(W.inputSource,W.frame,S||d),G.dispatchEvent({type:W.type,data:W.inputSource}))}function K(){l.removeEventListener("select",Q),l.removeEventListener("selectstart",Q),l.removeEventListener("selectend",Q),l.removeEventListener("squeeze",Q),l.removeEventListener("squeezestart",Q),l.removeEventListener("squeezeend",Q),l.removeEventListener("end",K),l.removeEventListener("inputsourceschange",ae);for(let W=0;W<y.length;W++){const Y=U[W];Y!==null&&(U[W]=null,y[W].disconnect(Y))}q=null,Z=null,s.reset();for(const W in r)delete r[W];n.setRenderTarget(R),T=null,E=null,_=null,l=null,v=null,Oe.stop(),i.isPresenting=!1,n.setPixelRatio(X),n.setSize(F.width,F.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){c=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return S||d},this.setReferenceSpace=function(W){S=W},this.getBaseLayer=function(){return E!==null?E:T},this.getBinding=function(){return _===null&&g&&(_=new XRWebGLBinding(l,t)),_},this.getFrame=function(){return P},this.getSession=function(){return l},this.setSession=async function(W){if(l=W,l!==null){if(R=n.getRenderTarget(),l.addEventListener("select",Q),l.addEventListener("selectstart",Q),l.addEventListener("selectend",Q),l.addEventListener("squeeze",Q),l.addEventListener("squeezestart",Q),l.addEventListener("squeezeend",Q),l.addEventListener("end",K),l.addEventListener("inputsourceschange",ae),A.xrCompatible!==!0&&await t.makeXRCompatible(),X=n.getPixelRatio(),n.getSize(F),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,C=null,j=null;A.depth&&(j=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=A.stencil?hn:Yn,C=A.stencil?en:tn);const Ae={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:a};_=this.getBinding(),E=_.createProjectionLayer(Ae),l.updateRenderState({layers:[E]}),n.setPixelRatio(1),n.setSize(E.textureWidth,E.textureHeight,!1),v=new kt(E.textureWidth,E.textureHeight,{format:At,type:yt,depthTexture:new ur(E.textureWidth,E.textureHeight,C,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:A.stencil,colorSpace:n.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}else{const G={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:a};T=new XRWebGLLayer(l,t,G),l.updateRenderState({baseLayer:T}),n.setPixelRatio(1),n.setSize(T.framebufferWidth,T.framebufferHeight,!1),v=new kt(T.framebufferWidth,T.framebufferHeight,{format:At,type:yt,colorSpace:n.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:T.ignoreDepthValues===!1,resolveStencilBuffer:T.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(x),S=null,d=await l.requestReferenceSpace(c),Oe.setContext(l),Oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return s.getDepthTexture()};function ae(W){for(let Y=0;Y<W.removed.length;Y++){const G=W.removed[Y],C=U.indexOf(G);C>=0&&(U[C]=null,y[C].disconnect(G))}for(let Y=0;Y<W.added.length;Y++){const G=W.added[Y];let C=U.indexOf(G);if(C===-1){for(let Ae=0;Ae<y.length;Ae++)if(Ae>=U.length){U.push(G),C=Ae;break}else if(U[Ae]===null){U[Ae]=G,C=Ae;break}if(C===-1)break}const j=y[C];j&&j.connect(G)}}const k=new ze,pe=new ze;function Me(W,Y,G){k.setFromMatrixPosition(Y.matrixWorld),pe.setFromMatrixPosition(G.matrixWorld);const C=k.distanceTo(pe),j=Y.projectionMatrix.elements,Ae=G.projectionMatrix.elements,Qe=j[14]/(j[10]-1),m=j[14]/(j[10]+1),Je=(j[9]+1)/j[5],Ie=(j[9]-1)/j[5],Pe=(j[8]-1)/j[0],me=(Ae[8]+1)/Ae[0],je=Qe*Pe,ve=Qe*me,Ne=C/(-Pe+me),st=Ne*-Pe;if(Y.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(st),W.translateZ(Ne),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),j[10]===-1)W.projectionMatrix.copy(Y.projectionMatrix),W.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const it=Qe+Ne,p=m+Ne,o=je-st,w=ve+(C-st),z=Je*m/p*it,J=Ie*m/p*it;W.projectionMatrix.makePerspective(o,w,z,J,it,p),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function Ue(W,Y){Y===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Y.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(l===null)return;let Y=W.near,G=W.far;s.texture!==null&&(s.depthNear>0&&(Y=s.depthNear),s.depthFar>0&&(G=s.depthFar)),H.near=u.near=h.near=Y,H.far=u.far=h.far=G,(q!==H.near||Z!==H.far)&&(l.updateRenderState({depthNear:H.near,depthFar:H.far}),q=H.near,Z=H.far),H.layers.mask=W.layers.mask|6,h.layers.mask=H.layers.mask&3,u.layers.mask=H.layers.mask&5;const C=W.parent,j=H.cameras;Ue(H,C);for(let Ae=0;Ae<j.length;Ae++)Ue(j[Ae],C);j.length===2?Me(H,h,u):H.projectionMatrix.copy(h.projectionMatrix),Be(W,H,C)};function Be(W,Y,G){G===null?W.matrix.copy(Y.matrixWorld):(W.matrix.copy(G.matrixWorld),W.matrix.invert(),W.matrix.multiply(Y.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Y.projectionMatrix),W.projectionMatrixInverse.copy(Y.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Yr*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(E===null&&T===null))return x},this.setFoveation=function(W){x=W,E!==null&&(E.fixedFoveation=W),T!==null&&T.fixedFoveation!==void 0&&(T.fixedFoveation=W)},this.hasDepthSensing=function(){return s.texture!==null},this.getDepthSensingMesh=function(){return s.getMesh(H)},this.getCameraTexture=function(W){return r[W]};let Ze=null;function Ke(W,Y){if(I=Y.getViewerPose(S||d),P=Y,I!==null){const G=I.views;T!==null&&(n.setRenderTargetFramebuffer(v,T.framebuffer),n.setRenderTarget(v));let C=!1;G.length!==H.cameras.length&&(H.cameras.length=0,C=!0);for(let m=0;m<G.length;m++){const Je=G[m];let Ie=null;if(T!==null)Ie=T.getViewport(Je);else{const me=_.getViewSubImage(E,Je);Ie=me.viewport,m===0&&(n.setRenderTargetTextures(v,me.colorTexture,me.depthStencilTexture),n.setRenderTarget(v))}let Pe=D[m];Pe===void 0&&(Pe=new $t,Pe.layers.enable(m),Pe.viewport=new dt,D[m]=Pe),Pe.matrix.fromArray(Je.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(Je.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),m===0&&(H.matrix.copy(Pe.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),C===!0&&H.cameras.push(Pe)}const j=l.enabledFeatures;if(j&&j.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&g){_=i.getBinding();const m=_.getDepthInformation(G[0]);m&&m.isValid&&m.texture&&s.init(m,l.renderState)}if(j&&j.includes("camera-access")&&g){n.state.unbindTexture(),_=i.getBinding();for(let m=0;m<G.length;m++){const Je=G[m].camera;if(Je){let Ie=r[Je];Ie||(Ie=new vr,r[Je]=Ie);const Pe=_.getCameraImage(Je);Ie.sourceTexture=Pe}}}}for(let G=0;G<y.length;G++){const C=U[G],j=y[G];C!==null&&j!==void 0&&j.update(C,Y,S||d)}Ze&&Ze(W,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),P=null}const Oe=new Pr;Oe.setAnimationLoop(Ke),this.setAnimationLoop=function(W){Ze=W},this.dispose=function(){}}}const Ut=new Cr,jf=new Jt;function ed(e,n){function t(s,r){s.matrixAutoUpdate===!0&&s.updateMatrix(),r.value.copy(s.matrix)}function i(s,r){r.color.getRGB(s.fogColor.value,xr(e)),r.isFog?(s.fogNear.value=r.near,s.fogFar.value=r.far):r.isFogExp2&&(s.fogDensity.value=r.density)}function l(s,r,A,R,v){r.isMeshBasicMaterial||r.isMeshLambertMaterial?a(s,r):r.isMeshToonMaterial?(a(s,r),_(s,r)):r.isMeshPhongMaterial?(a(s,r),I(s,r)):r.isMeshStandardMaterial?(a(s,r),E(s,r),r.isMeshPhysicalMaterial&&T(s,r,v)):r.isMeshMatcapMaterial?(a(s,r),P(s,r)):r.isMeshDepthMaterial?a(s,r):r.isMeshDistanceMaterial?(a(s,r),g(s,r)):r.isMeshNormalMaterial?a(s,r):r.isLineBasicMaterial?(d(s,r),r.isLineDashedMaterial&&c(s,r)):r.isPointsMaterial?x(s,r,A,R):r.isSpriteMaterial?S(s,r):r.isShadowMaterial?(s.color.value.copy(r.color),s.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)}function a(s,r){s.opacity.value=r.opacity,r.color&&s.diffuse.value.copy(r.color),r.emissive&&s.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(s.map.value=r.map,t(r.map,s.mapTransform)),r.alphaMap&&(s.alphaMap.value=r.alphaMap,t(r.alphaMap,s.alphaMapTransform)),r.bumpMap&&(s.bumpMap.value=r.bumpMap,t(r.bumpMap,s.bumpMapTransform),s.bumpScale.value=r.bumpScale,r.side===vt&&(s.bumpScale.value*=-1)),r.normalMap&&(s.normalMap.value=r.normalMap,t(r.normalMap,s.normalMapTransform),s.normalScale.value.copy(r.normalScale),r.side===vt&&s.normalScale.value.negate()),r.displacementMap&&(s.displacementMap.value=r.displacementMap,t(r.displacementMap,s.displacementMapTransform),s.displacementScale.value=r.displacementScale,s.displacementBias.value=r.displacementBias),r.emissiveMap&&(s.emissiveMap.value=r.emissiveMap,t(r.emissiveMap,s.emissiveMapTransform)),r.specularMap&&(s.specularMap.value=r.specularMap,t(r.specularMap,s.specularMapTransform)),r.alphaTest>0&&(s.alphaTest.value=r.alphaTest);const A=n.get(r),R=A.envMap,v=A.envMapRotation;R&&(s.envMap.value=R,Ut.copy(v),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),s.envMapRotation.value.setFromMatrix4(jf.makeRotationFromEuler(Ut)),s.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,s.reflectivity.value=r.reflectivity,s.ior.value=r.ior,s.refractionRatio.value=r.refractionRatio),r.lightMap&&(s.lightMap.value=r.lightMap,s.lightMapIntensity.value=r.lightMapIntensity,t(r.lightMap,s.lightMapTransform)),r.aoMap&&(s.aoMap.value=r.aoMap,s.aoMapIntensity.value=r.aoMapIntensity,t(r.aoMap,s.aoMapTransform))}function d(s,r){s.diffuse.value.copy(r.color),s.opacity.value=r.opacity,r.map&&(s.map.value=r.map,t(r.map,s.mapTransform))}function c(s,r){s.dashSize.value=r.dashSize,s.totalSize.value=r.dashSize+r.gapSize,s.scale.value=r.scale}function x(s,r,A,R){s.diffuse.value.copy(r.color),s.opacity.value=r.opacity,s.size.value=r.size*A,s.scale.value=R*.5,r.map&&(s.map.value=r.map,t(r.map,s.uvTransform)),r.alphaMap&&(s.alphaMap.value=r.alphaMap,t(r.alphaMap,s.alphaMapTransform)),r.alphaTest>0&&(s.alphaTest.value=r.alphaTest)}function S(s,r){s.diffuse.value.copy(r.color),s.opacity.value=r.opacity,s.rotation.value=r.rotation,r.map&&(s.map.value=r.map,t(r.map,s.mapTransform)),r.alphaMap&&(s.alphaMap.value=r.alphaMap,t(r.alphaMap,s.alphaMapTransform)),r.alphaTest>0&&(s.alphaTest.value=r.alphaTest)}function I(s,r){s.specular.value.copy(r.specular),s.shininess.value=Math.max(r.shininess,1e-4)}function _(s,r){r.gradientMap&&(s.gradientMap.value=r.gradientMap)}function E(s,r){s.metalness.value=r.metalness,r.metalnessMap&&(s.metalnessMap.value=r.metalnessMap,t(r.metalnessMap,s.metalnessMapTransform)),s.roughness.value=r.roughness,r.roughnessMap&&(s.roughnessMap.value=r.roughnessMap,t(r.roughnessMap,s.roughnessMapTransform)),r.envMap&&(s.envMapIntensity.value=r.envMapIntensity)}function T(s,r,A){s.ior.value=r.ior,r.sheen>0&&(s.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),s.sheenRoughness.value=r.sheenRoughness,r.sheenColorMap&&(s.sheenColorMap.value=r.sheenColorMap,t(r.sheenColorMap,s.sheenColorMapTransform)),r.sheenRoughnessMap&&(s.sheenRoughnessMap.value=r.sheenRoughnessMap,t(r.sheenRoughnessMap,s.sheenRoughnessMapTransform))),r.clearcoat>0&&(s.clearcoat.value=r.clearcoat,s.clearcoatRoughness.value=r.clearcoatRoughness,r.clearcoatMap&&(s.clearcoatMap.value=r.clearcoatMap,t(r.clearcoatMap,s.clearcoatMapTransform)),r.clearcoatRoughnessMap&&(s.clearcoatRoughnessMap.value=r.clearcoatRoughnessMap,t(r.clearcoatRoughnessMap,s.clearcoatRoughnessMapTransform)),r.clearcoatNormalMap&&(s.clearcoatNormalMap.value=r.clearcoatNormalMap,t(r.clearcoatNormalMap,s.clearcoatNormalMapTransform),s.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),r.side===vt&&s.clearcoatNormalScale.value.negate())),r.dispersion>0&&(s.dispersion.value=r.dispersion),r.iridescence>0&&(s.iridescence.value=r.iridescence,s.iridescenceIOR.value=r.iridescenceIOR,s.iridescenceThicknessMinimum.value=r.iridescenceThicknessRange[0],s.iridescenceThicknessMaximum.value=r.iridescenceThicknessRange[1],r.iridescenceMap&&(s.iridescenceMap.value=r.iridescenceMap,t(r.iridescenceMap,s.iridescenceMapTransform)),r.iridescenceThicknessMap&&(s.iridescenceThicknessMap.value=r.iridescenceThicknessMap,t(r.iridescenceThicknessMap,s.iridescenceThicknessMapTransform))),r.transmission>0&&(s.transmission.value=r.transmission,s.transmissionSamplerMap.value=A.texture,s.transmissionSamplerSize.value.set(A.width,A.height),r.transmissionMap&&(s.transmissionMap.value=r.transmissionMap,t(r.transmissionMap,s.transmissionMapTransform)),s.thickness.value=r.thickness,r.thicknessMap&&(s.thicknessMap.value=r.thicknessMap,t(r.thicknessMap,s.thicknessMapTransform)),s.attenuationDistance.value=r.attenuationDistance,s.attenuationColor.value.copy(r.attenuationColor)),r.anisotropy>0&&(s.anisotropyVector.value.set(r.anisotropy*Math.cos(r.anisotropyRotation),r.anisotropy*Math.sin(r.anisotropyRotation)),r.anisotropyMap&&(s.anisotropyMap.value=r.anisotropyMap,t(r.anisotropyMap,s.anisotropyMapTransform))),s.specularIntensity.value=r.specularIntensity,s.specularColor.value.copy(r.specularColor),r.specularColorMap&&(s.specularColorMap.value=r.specularColorMap,t(r.specularColorMap,s.specularColorMapTransform)),r.specularIntensityMap&&(s.specularIntensityMap.value=r.specularIntensityMap,t(r.specularIntensityMap,s.specularIntensityMapTransform))}function P(s,r){r.matcap&&(s.matcap.value=r.matcap)}function g(s,r){const A=n.get(r).light;s.referencePosition.value.setFromMatrixPosition(A.matrixWorld),s.nearDistance.value=A.shadow.camera.near,s.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:l}}function td(e,n,t,i){let l={},a={},d=[];const c=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function x(A,R){const v=R.program;i.uniformBlockBinding(A,v)}function S(A,R){let v=l[A.id];v===void 0&&(P(A),v=I(A),l[A.id]=v,A.addEventListener("dispose",s));const y=R.program;i.updateUBOMapping(A,y);const U=n.render.frame;a[A.id]!==U&&(E(A),a[A.id]=U)}function I(A){const R=_();A.__bindingPointIndex=R;const v=e.createBuffer(),y=A.__size,U=A.usage;return e.bindBuffer(e.UNIFORM_BUFFER,v),e.bufferData(e.UNIFORM_BUFFER,y,U),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,R,v),v}function _(){for(let A=0;A<c;A++)if(d.indexOf(A)===-1)return d.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function E(A){const R=l[A.id],v=A.uniforms,y=A.__cache;e.bindBuffer(e.UNIFORM_BUFFER,R);for(let U=0,F=v.length;U<F;U++){const X=Array.isArray(v[U])?v[U]:[v[U]];for(let h=0,u=X.length;h<u;h++){const D=X[h];if(T(D,U,h,y)===!0){const H=D.__offset,q=Array.isArray(D.value)?D.value:[D.value];let Z=0;for(let Q=0;Q<q.length;Q++){const K=q[Q],ae=g(K);typeof K=="number"||typeof K=="boolean"?(D.__data[0]=K,e.bufferSubData(e.UNIFORM_BUFFER,H+Z,D.__data)):K.isMatrix3?(D.__data[0]=K.elements[0],D.__data[1]=K.elements[1],D.__data[2]=K.elements[2],D.__data[3]=0,D.__data[4]=K.elements[3],D.__data[5]=K.elements[4],D.__data[6]=K.elements[5],D.__data[7]=0,D.__data[8]=K.elements[6],D.__data[9]=K.elements[7],D.__data[10]=K.elements[8],D.__data[11]=0):(K.toArray(D.__data,Z),Z+=ae.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,H,D.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function T(A,R,v,y){const U=A.value,F=R+"_"+v;if(y[F]===void 0)return typeof U=="number"||typeof U=="boolean"?y[F]=U:y[F]=U.clone(),!0;{const X=y[F];if(typeof U=="number"||typeof U=="boolean"){if(X!==U)return y[F]=U,!0}else if(X.equals(U)===!1)return X.copy(U),!0}return!1}function P(A){const R=A.uniforms;let v=0;const y=16;for(let F=0,X=R.length;F<X;F++){const h=Array.isArray(R[F])?R[F]:[R[F]];for(let u=0,D=h.length;u<D;u++){const H=h[u],q=Array.isArray(H.value)?H.value:[H.value];for(let Z=0,Q=q.length;Z<Q;Z++){const K=q[Z],ae=g(K),k=v%y,pe=k%ae.boundary,Me=k+pe;v+=pe,Me!==0&&y-Me<ae.storage&&(v+=y-Me),H.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=ae.storage}}}const U=v%y;return U>0&&(v+=y-U),A.__size=v,A.__cache={},this}function g(A){const R={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(R.boundary=4,R.storage=4):A.isVector2?(R.boundary=8,R.storage=8):A.isVector3||A.isColor?(R.boundary=16,R.storage=12):A.isVector4?(R.boundary=16,R.storage=16):A.isMatrix3?(R.boundary=48,R.storage=48):A.isMatrix4?(R.boundary=64,R.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),R}function s(A){const R=A.target;R.removeEventListener("dispose",s);const v=d.indexOf(R.__bindingPointIndex);d.splice(v,1),e.deleteBuffer(l[R.id]),delete l[R.id],delete a[R.id]}function r(){for(const A in l)e.deleteBuffer(l[A]);d=[],l={},a={}}return{bind:x,update:S,dispose:r}}class nd{constructor(n={}){const{canvas:t=kr(),context:i=null,depth:l=!0,stencil:a=!1,alpha:d=!1,antialias:c=!1,premultipliedAlpha:x=!0,preserveDrawingBuffer:S=!1,powerPreference:I="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:E=!1}=n;this.isWebGLRenderer=!0;let T;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=i.getContextAttributes().alpha}else T=d;const P=new Uint32Array(4),g=new Int32Array(4);let s=null,r=null;const A=[],R=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ct,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let y=!1;this._outputColorSpace=fr;let U=0,F=0,X=null,h=-1,u=null;const D=new dt,H=new dt;let q=null;const Z=new $e(0);let Q=0,K=t.width,ae=t.height,k=1,pe=null,Me=null;const Ue=new dt(0,0,K,ae),Be=new dt(0,0,K,ae);let Ze=!1;const Ke=new dr;let Oe=!1,W=!1;const Y=new Jt,G=new ze,C=new dt,j={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ae=!1;function Qe(){return X===null?k:1}let m=i;function Je(f,b){return t.getContext(f,b)}try{const f={alpha:!0,depth:l,stencil:a,antialias:c,premultipliedAlpha:x,preserveDrawingBuffer:S,powerPreference:I,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wr}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",ee,!1),m===null){const b="webgl2";if(m=Je(b,f),m===null)throw Je(b)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(f){throw console.error("THREE.WebGLRenderer: "+f.message),f}let Ie,Pe,me,je,ve,Ne,st,it,p,o,w,z,J,V,Te,re,ge,Ee,ne,fe,be,Se,ce,we;function M(){Ie=new dl(m),Ie.init(),Se=new qf(m,Ie),Pe=new rl(m,Ie,n,Se),me=new Kf(m,Ie),Pe.reversedDepthBuffer&&E&&me.buffers.depth.setReversed(!0),je=new hl(m),ve=new wf,Ne=new Yf(m,Ie,me,ve,Pe,Se,je),st=new ol(v),it=new fl(v),p=new So(m),ce=new nl(m,p),o=new ul(m,p,je,ce),w=new ml(m,o,p,je),ne=new _l(m,Pe,Ne),re=new al(ve),z=new If(v,st,it,Ie,Pe,ce,re),J=new ed(v,ve),V=new yf,Te=new Vf(Ie),Ee=new tl(v,st,it,me,w,T,x),ge=new zf(v,w,Pe),we=new td(m,je,Pe,me),fe=new il(m,Ie,je),be=new pl(m,Ie,je),je.programs=z.programs,v.capabilities=Pe,v.extensions=Ie,v.properties=ve,v.renderLists=V,v.shadowMap=ge,v.state=me,v.info=je}M();const ie=new Jf(v,m);this.xr=ie,this.getContext=function(){return m},this.getContextAttributes=function(){return m.getContextAttributes()},this.forceContextLoss=function(){const f=Ie.get("WEBGL_lose_context");f&&f.loseContext()},this.forceContextRestore=function(){const f=Ie.get("WEBGL_lose_context");f&&f.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(f){f!==void 0&&(k=f,this.setSize(K,ae,!1))},this.getSize=function(f){return f.set(K,ae)},this.setSize=function(f,b,O=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=f,ae=b,t.width=Math.floor(f*k),t.height=Math.floor(b*k),O===!0&&(t.style.width=f+"px",t.style.height=b+"px"),this.setViewport(0,0,f,b)},this.getDrawingBufferSize=function(f){return f.set(K*k,ae*k).floor()},this.setDrawingBufferSize=function(f,b,O){K=f,ae=b,k=O,t.width=Math.floor(f*O),t.height=Math.floor(b*O),this.setViewport(0,0,f,b)},this.getCurrentViewport=function(f){return f.copy(D)},this.getViewport=function(f){return f.copy(Ue)},this.setViewport=function(f,b,O,B){f.isVector4?Ue.set(f.x,f.y,f.z,f.w):Ue.set(f,b,O,B),me.viewport(D.copy(Ue).multiplyScalar(k).round())},this.getScissor=function(f){return f.copy(Be)},this.setScissor=function(f,b,O,B){f.isVector4?Be.set(f.x,f.y,f.z,f.w):Be.set(f,b,O,B),me.scissor(H.copy(Be).multiplyScalar(k).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(f){me.setScissorTest(Ze=f)},this.setOpaqueSort=function(f){pe=f},this.setTransparentSort=function(f){Me=f},this.getClearColor=function(f){return f.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(f=!0,b=!0,O=!0){let B=0;if(f){let L=!1;if(X!==null){const te=X.texture.format;L=te===Mr||te===Tr||te===Sr}if(L){const te=X.texture.type,le=te===yt||te===tn||te===mn||te===en||te===_r||te===mr,he=Ee.getClearColor(),de=Ee.getClearAlpha(),Ce=he.r,Le=he.g,xe=he.b;le?(P[0]=Ce,P[1]=Le,P[2]=xe,P[3]=de,m.clearBufferuiv(m.COLOR,0,P)):(g[0]=Ce,g[1]=Le,g[2]=xe,g[3]=de,m.clearBufferiv(m.COLOR,0,g))}else B|=m.COLOR_BUFFER_BIT}b&&(B|=m.DEPTH_BUFFER_BIT),O&&(B|=m.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),m.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),Ee.dispose(),V.dispose(),Te.dispose(),ve.dispose(),st.dispose(),it.dispose(),w.dispose(),ce.dispose(),we.dispose(),z.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",gt),ie.removeEventListener("sessionend",$n),bt.stop()};function oe(f){f.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const f=je.autoReset,b=ge.enabled,O=ge.autoUpdate,B=ge.needsUpdate,L=ge.type;M(),je.autoReset=f,ge.enabled=b,ge.autoUpdate=O,ge.needsUpdate=B,ge.type=L}function ee(f){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",f.statusMessage)}function $(f){const b=f.target;b.removeEventListener("dispose",$),_e(b)}function _e(f){De(f),ve.remove(f)}function De(f){const b=ve.get(f).programs;b!==void 0&&(b.forEach(function(O){z.releaseProgram(O)}),f.isShaderMaterial&&z.releaseShaderCache(f))}this.renderBufferDirect=function(f,b,O,B,L,te){b===null&&(b=j);const le=L.isMesh&&L.matrixWorld.determinant()<0,he=Fr(f,b,O,B,L);me.setMaterial(B,le);let de=O.index,Ce=1;if(B.wireframe===!0){if(de=o.getWireframeAttribute(O),de===void 0)return;Ce=2}const Le=O.drawRange,xe=O.attributes.position;let Fe=Le.start*Ce,ke=(Le.start+Le.count)*Ce;te!==null&&(Fe=Math.max(Fe,te.start*Ce),ke=Math.min(ke,(te.start+te.count)*Ce)),de!==null?(Fe=Math.max(Fe,0),ke=Math.min(ke,de.count)):xe!=null&&(Fe=Math.max(Fe,0),ke=Math.min(ke,xe.count));const nt=ke-Fe;if(nt<0||nt===1/0)return;ce.setup(L,B,he,O,de);let Ye,We=fe;if(de!==null&&(Ye=p.get(de),We=be,We.setIndex(Ye)),L.isMesh)B.wireframe===!0?(me.setLineWidth(B.wireframeLinewidth*Qe()),We.setMode(m.LINES)):We.setMode(m.TRIANGLES);else if(L.isLine){let Re=B.linewidth;Re===void 0&&(Re=1),me.setLineWidth(Re*Qe()),L.isLineSegments?We.setMode(m.LINES):L.isLineLoop?We.setMode(m.LINE_LOOP):We.setMode(m.LINE_STRIP)}else L.isPoints?We.setMode(m.POINTS):L.isSprite&&We.setMode(m.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)yn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),We.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))We.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{const Re=L._multiDrawStarts,et=L._multiDrawCounts,Ge=L._multiDrawCount,pt=de?p.get(de).bytesPerElement:1,Ot=ve.get(B).currentProgram.getUniforms();for(let ht=0;ht<Ge;ht++)Ot.setValue(m,"_gl_DrawID",ht),We.render(Re[ht]/pt,et[ht])}else if(L.isInstancedMesh)We.renderInstances(Fe,nt,L.count);else if(O.isInstancedBufferGeometry){const Re=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,et=Math.min(O.instanceCount,Re);We.renderInstances(Fe,nt,et)}else We.render(Fe,nt)};function Xe(f,b,O){f.transparent===!0&&f.side===Mt&&f.forceSinglePass===!1?(f.side=vt,f.needsUpdate=!0,an(f,b,O),f.side=jt,f.needsUpdate=!0,an(f,b,O),f.side=Mt):an(f,b,O)}this.compile=function(f,b,O=null){O===null&&(O=f),r=Te.get(O),r.init(b),R.push(r),O.traverseVisible(function(L){L.isLight&&L.layers.test(b.layers)&&(r.pushLight(L),L.castShadow&&r.pushShadow(L))}),f!==O&&f.traverseVisible(function(L){L.isLight&&L.layers.test(b.layers)&&(r.pushLight(L),L.castShadow&&r.pushShadow(L))}),r.setupLights();const B=new Set;return f.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;const te=L.material;if(te)if(Array.isArray(te))for(let le=0;le<te.length;le++){const he=te[le];Xe(he,O,L),B.add(he)}else Xe(te,O,L),B.add(te)}),r=R.pop(),B},this.compileAsync=function(f,b,O=null){const B=this.compile(f,b,O);return new Promise(L=>{function te(){if(B.forEach(function(le){ve.get(le).currentProgram.isReady()&&B.delete(le)}),B.size===0){L(f);return}setTimeout(te,10)}Ie.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Ve=null;function St(f){Ve&&Ve(f)}function gt(){bt.stop()}function $n(){bt.start()}const bt=new Pr;bt.setAnimationLoop(St),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(f){Ve=f,ie.setAnimationLoop(f),f===null?bt.stop():bt.start()},ie.addEventListener("sessionstart",gt),ie.addEventListener("sessionend",$n),this.render=function(f,b){if(b!==void 0&&b.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),b.parent===null&&b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(b),b=ie.getCamera()),f.isScene===!0&&f.onBeforeRender(v,f,b,X),r=Te.get(f,R.length),r.init(b),R.push(r),Y.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),Ke.setFromProjectionMatrix(Y,ti,b.reversedDepth),W=this.localClippingEnabled,Oe=re.init(this.clippingPlanes,W),s=V.get(f,A.length),s.init(),A.push(s),ie.enabled===!0&&ie.isPresenting===!0){const te=v.xr.getDepthSensingMesh();te!==null&&Tn(te,b,-1/0,v.sortObjects)}Tn(f,b,0,v.sortObjects),s.finish(),v.sortObjects===!0&&s.sort(pe,Me),Ae=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Ae&&Ee.addToRenderList(s,f),this.info.render.frame++,Oe===!0&&re.beginShadows();const O=r.state.shadowsArray;ge.render(O,f,b),Oe===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=s.opaque,L=s.transmissive;if(r.setupLights(),b.isArrayCamera){const te=b.cameras;if(L.length>0)for(let le=0,he=te.length;le<he;le++){const de=te[le];Qn(B,L,f,de)}Ae&&Ee.render(f);for(let le=0,he=te.length;le<he;le++){const de=te[le];Zn(s,f,de,de.viewport)}}else L.length>0&&Qn(B,L,f,b),Ae&&Ee.render(f),Zn(s,f,b);X!==null&&F===0&&(Ne.updateMultisampleRenderTarget(X),Ne.updateRenderTargetMipmap(X)),f.isScene===!0&&f.onAfterRender(v,f,b),ce.resetDefaultState(),h=-1,u=null,R.pop(),R.length>0?(r=R[R.length-1],Oe===!0&&re.setGlobalState(v.clippingPlanes,r.state.camera)):r=null,A.pop(),A.length>0?s=A[A.length-1]:s=null};function Tn(f,b,O,B){if(f.visible===!1)return;if(f.layers.test(b.layers)){if(f.isGroup)O=f.renderOrder;else if(f.isLOD)f.autoUpdate===!0&&f.update(b);else if(f.isLight)r.pushLight(f),f.castShadow&&r.pushShadow(f);else if(f.isSprite){if(!f.frustumCulled||Ke.intersectsSprite(f)){B&&C.setFromMatrixPosition(f.matrixWorld).applyMatrix4(Y);const le=w.update(f),he=f.material;he.visible&&s.push(f,le,he,O,C.z,null)}}else if((f.isMesh||f.isLine||f.isPoints)&&(!f.frustumCulled||Ke.intersectsObject(f))){const le=w.update(f),he=f.material;if(B&&(f.boundingSphere!==void 0?(f.boundingSphere===null&&f.computeBoundingSphere(),C.copy(f.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),C.copy(le.boundingSphere.center)),C.applyMatrix4(f.matrixWorld).applyMatrix4(Y)),Array.isArray(he)){const de=le.groups;for(let Ce=0,Le=de.length;Ce<Le;Ce++){const xe=de[Ce],Fe=he[xe.materialIndex];Fe&&Fe.visible&&s.push(f,le,Fe,O,C.z,xe)}}else he.visible&&s.push(f,le,he,O,C.z,null)}}const te=f.children;for(let le=0,he=te.length;le<he;le++)Tn(te[le],b,O,B)}function Zn(f,b,O,B){const L=f.opaque,te=f.transmissive,le=f.transparent;r.setupLightsView(O),Oe===!0&&re.setGlobalState(v.clippingPlanes,O),B&&me.viewport(D.copy(B)),L.length>0&&rn(L,b,O),te.length>0&&rn(te,b,O),le.length>0&&rn(le,b,O),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Qn(f,b,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;r.state.transmissionRenderTarget[B.id]===void 0&&(r.state.transmissionRenderTarget[B.id]=new kt(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float")?vn:yt,minFilter:Yt,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const te=r.state.transmissionRenderTarget[B.id],le=B.viewport||D;te.setSize(le.z*v.transmissionResolutionScale,le.w*v.transmissionResolutionScale);const he=v.getRenderTarget(),de=v.getActiveCubeFace(),Ce=v.getActiveMipmapLevel();v.setRenderTarget(te),v.getClearColor(Z),Q=v.getClearAlpha(),Q<1&&v.setClearColor(16777215,.5),v.clear(),Ae&&Ee.render(O);const Le=v.toneMapping;v.toneMapping=Ct;const xe=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),r.setupLightsView(B),Oe===!0&&re.setGlobalState(v.clippingPlanes,B),rn(f,O,B),Ne.updateMultisampleRenderTarget(te),Ne.updateRenderTargetMipmap(te),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let ke=0,nt=b.length;ke<nt;ke++){const Ye=b[ke],We=Ye.object,Re=Ye.geometry,et=Ye.material,Ge=Ye.group;if(et.side===Mt&&We.layers.test(B.layers)){const pt=et.side;et.side=vt,et.needsUpdate=!0,Jn(We,O,B,Re,et,Ge),et.side=pt,et.needsUpdate=!0,Fe=!0}}Fe===!0&&(Ne.updateMultisampleRenderTarget(te),Ne.updateRenderTargetMipmap(te))}v.setRenderTarget(he,de,Ce),v.setClearColor(Z,Q),xe!==void 0&&(B.viewport=xe),v.toneMapping=Le}function rn(f,b,O){const B=b.isScene===!0?b.overrideMaterial:null;for(let L=0,te=f.length;L<te;L++){const le=f[L],he=le.object,de=le.geometry,Ce=le.group;let Le=le.material;Le.allowOverride===!0&&B!==null&&(Le=B),he.layers.test(O.layers)&&Jn(he,b,O,de,Le,Ce)}}function Jn(f,b,O,B,L,te){f.onBeforeRender(v,b,O,B,L,te),f.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,f.matrixWorld),f.normalMatrix.getNormalMatrix(f.modelViewMatrix),L.onBeforeRender(v,b,O,B,f,te),L.transparent===!0&&L.side===Mt&&L.forceSinglePass===!1?(L.side=vt,L.needsUpdate=!0,v.renderBufferDirect(O,b,B,L,f,te),L.side=jt,L.needsUpdate=!0,v.renderBufferDirect(O,b,B,L,f,te),L.side=Mt):v.renderBufferDirect(O,b,B,L,f,te),f.onAfterRender(v,b,O,B,L,te)}function an(f,b,O){b.isScene!==!0&&(b=j);const B=ve.get(f),L=r.state.lights,te=r.state.shadowsArray,le=L.state.version,he=z.getParameters(f,L.state,te,b,O),de=z.getProgramCacheKey(he);let Ce=B.programs;B.environment=f.isMeshStandardMaterial?b.environment:null,B.fog=b.fog,B.envMap=(f.isMeshStandardMaterial?it:st).get(f.envMap||B.environment),B.envMapRotation=B.environment!==null&&f.envMap===null?b.environmentRotation:f.envMapRotation,Ce===void 0&&(f.addEventListener("dispose",$),Ce=new Map,B.programs=Ce);let Le=Ce.get(de);if(Le!==void 0){if(B.currentProgram===Le&&B.lightsStateVersion===le)return ei(f,he),Le}else he.uniforms=z.getUniforms(f),f.onBeforeCompile(he,v),Le=z.acquireProgram(he,de),Ce.set(de,Le),B.uniforms=he.uniforms;const xe=B.uniforms;return(!f.isShaderMaterial&&!f.isRawShaderMaterial||f.clipping===!0)&&(xe.clippingPlanes=re.uniform),ei(f,he),B.needsLights=Br(f),B.lightsStateVersion=le,B.needsLights&&(xe.ambientLightColor.value=L.state.ambient,xe.lightProbe.value=L.state.probe,xe.directionalLights.value=L.state.directional,xe.directionalLightShadows.value=L.state.directionalShadow,xe.spotLights.value=L.state.spot,xe.spotLightShadows.value=L.state.spotShadow,xe.rectAreaLights.value=L.state.rectArea,xe.ltc_1.value=L.state.rectAreaLTC1,xe.ltc_2.value=L.state.rectAreaLTC2,xe.pointLights.value=L.state.point,xe.pointLightShadows.value=L.state.pointShadow,xe.hemisphereLights.value=L.state.hemi,xe.directionalShadowMap.value=L.state.directionalShadowMap,xe.directionalShadowMatrix.value=L.state.directionalShadowMatrix,xe.spotShadowMap.value=L.state.spotShadowMap,xe.spotLightMatrix.value=L.state.spotLightMatrix,xe.spotLightMap.value=L.state.spotLightMap,xe.pointShadowMap.value=L.state.pointShadowMap,xe.pointShadowMatrix.value=L.state.pointShadowMatrix),B.currentProgram=Le,B.uniformsList=null,Le}function jn(f){if(f.uniformsList===null){const b=f.currentProgram.getUniforms();f.uniformsList=pn.seqWithValue(b.seq,f.uniforms)}return f.uniformsList}function ei(f,b){const O=ve.get(f);O.outputColorSpace=b.outputColorSpace,O.batching=b.batching,O.batchingColor=b.batchingColor,O.instancing=b.instancing,O.instancingColor=b.instancingColor,O.instancingMorph=b.instancingMorph,O.skinning=b.skinning,O.morphTargets=b.morphTargets,O.morphNormals=b.morphNormals,O.morphColors=b.morphColors,O.morphTargetsCount=b.morphTargetsCount,O.numClippingPlanes=b.numClippingPlanes,O.numIntersection=b.numClipIntersection,O.vertexAlphas=b.vertexAlphas,O.vertexTangents=b.vertexTangents,O.toneMapping=b.toneMapping}function Fr(f,b,O,B,L){b.isScene!==!0&&(b=j),Ne.resetTextureUnits();const te=b.fog,le=B.isMeshStandardMaterial?b.environment:null,he=X===null?v.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:gn,de=(B.isMeshStandardMaterial?it:st).get(B.envMap||le),Ce=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Le=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),xe=!!O.morphAttributes.position,Fe=!!O.morphAttributes.normal,ke=!!O.morphAttributes.color;let nt=Ct;B.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(nt=v.toneMapping);const Ye=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,We=Ye!==void 0?Ye.length:0,Re=ve.get(B),et=r.state.lights;if(Oe===!0&&(W===!0||f!==u)){const ct=f===u&&B.id===h;re.setState(B,f,ct)}let Ge=!1;B.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==et.state.version||Re.outputColorSpace!==he||L.isBatchedMesh&&Re.batching===!1||!L.isBatchedMesh&&Re.batching===!0||L.isBatchedMesh&&Re.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Re.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Re.instancing===!1||!L.isInstancedMesh&&Re.instancing===!0||L.isSkinnedMesh&&Re.skinning===!1||!L.isSkinnedMesh&&Re.skinning===!0||L.isInstancedMesh&&Re.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Re.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Re.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Re.instancingMorph===!1&&L.morphTexture!==null||Re.envMap!==de||B.fog===!0&&Re.fog!==te||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==re.numPlanes||Re.numIntersection!==re.numIntersection)||Re.vertexAlphas!==Ce||Re.vertexTangents!==Le||Re.morphTargets!==xe||Re.morphNormals!==Fe||Re.morphColors!==ke||Re.toneMapping!==nt||Re.morphTargetsCount!==We)&&(Ge=!0):(Ge=!0,Re.__version=B.version);let pt=Re.currentProgram;Ge===!0&&(pt=an(B,b,L));let Ot=!1,ht=!1,Xt=!1;const tt=pt.getUniforms(),_t=Re.uniforms;if(me.useProgram(pt.program)&&(Ot=!0,ht=!0,Xt=!0),B.id!==h&&(h=B.id,ht=!0),Ot||u!==f){me.buffers.depth.getReversed()&&f.reversedDepth!==!0&&(f._reversedDepth=!0,f.updateProjectionMatrix()),tt.setValue(m,"projectionMatrix",f.projectionMatrix),tt.setValue(m,"viewMatrix",f.matrixWorldInverse);const lt=tt.map.cameraPosition;lt!==void 0&&lt.setValue(m,G.setFromMatrixPosition(f.matrixWorld)),Pe.logarithmicDepthBuffer&&tt.setValue(m,"logDepthBufFC",2/(Math.log(f.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&tt.setValue(m,"isOrthographic",f.isOrthographicCamera===!0),u!==f&&(u=f,ht=!0,Xt=!0)}if(L.isSkinnedMesh){tt.setOptional(m,L,"bindMatrix"),tt.setOptional(m,L,"bindMatrixInverse");const ct=L.skeleton;ct&&(ct.boneTexture===null&&ct.computeBoneTexture(),tt.setValue(m,"boneTexture",ct.boneTexture,Ne))}L.isBatchedMesh&&(tt.setOptional(m,L,"batchingTexture"),tt.setValue(m,"batchingTexture",L._matricesTexture,Ne),tt.setOptional(m,L,"batchingIdTexture"),tt.setValue(m,"batchingIdTexture",L._indirectTexture,Ne),tt.setOptional(m,L,"batchingColorTexture"),L._colorsTexture!==null&&tt.setValue(m,"batchingColorTexture",L._colorsTexture,Ne));const mt=O.morphAttributes;if((mt.position!==void 0||mt.normal!==void 0||mt.color!==void 0)&&ne.update(L,O,pt),(ht||Re.receiveShadow!==L.receiveShadow)&&(Re.receiveShadow=L.receiveShadow,tt.setValue(m,"receiveShadow",L.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(_t.envMap.value=de,_t.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&b.environment!==null&&(_t.envMapIntensity.value=b.environmentIntensity),ht&&(tt.setValue(m,"toneMappingExposure",v.toneMappingExposure),Re.needsLights&&Or(_t,Xt),te&&B.fog===!0&&J.refreshFogUniforms(_t,te),J.refreshMaterialUniforms(_t,B,k,ae,r.state.transmissionRenderTarget[f.id]),pn.upload(m,jn(Re),_t,Ne)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(pn.upload(m,jn(Re),_t,Ne),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&tt.setValue(m,"center",L.center),tt.setValue(m,"modelViewMatrix",L.modelViewMatrix),tt.setValue(m,"normalMatrix",L.normalMatrix),tt.setValue(m,"modelMatrix",L.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const ct=B.uniformsGroups;for(let lt=0,Mn=ct.length;lt<Mn;lt++){const Pt=ct[lt];we.update(Pt,pt),we.bind(Pt,pt)}}return pt}function Or(f,b){f.ambientLightColor.needsUpdate=b,f.lightProbe.needsUpdate=b,f.directionalLights.needsUpdate=b,f.directionalLightShadows.needsUpdate=b,f.pointLights.needsUpdate=b,f.pointLightShadows.needsUpdate=b,f.spotLights.needsUpdate=b,f.spotLightShadows.needsUpdate=b,f.rectAreaLights.needsUpdate=b,f.hemisphereLights.needsUpdate=b}function Br(f){return f.isMeshLambertMaterial||f.isMeshToonMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isShadowMaterial||f.isShaderMaterial&&f.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(f,b,O){const B=ve.get(f);B.__autoAllocateDepthBuffer=f.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),ve.get(f.texture).__webglTexture=b,ve.get(f.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:O,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(f,b){const O=ve.get(f);O.__webglFramebuffer=b,O.__useDefaultFramebuffer=b===void 0};const Gr=m.createFramebuffer();this.setRenderTarget=function(f,b=0,O=0){X=f,U=b,F=O;let B=!0,L=null,te=!1,le=!1;if(f){const de=ve.get(f);if(de.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(m.FRAMEBUFFER,null),B=!1;else if(de.__webglFramebuffer===void 0)Ne.setupRenderTarget(f);else if(de.__hasExternalTextures)Ne.rebindTextures(f,ve.get(f.texture).__webglTexture,ve.get(f.depthTexture).__webglTexture);else if(f.depthBuffer){const xe=f.depthTexture;if(de.__boundDepthTexture!==xe){if(xe!==null&&ve.has(xe)&&(f.width!==xe.image.width||f.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(f)}}const Ce=f.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(le=!0);const Le=ve.get(f).__webglFramebuffer;f.isWebGLCubeRenderTarget?(Array.isArray(Le[b])?L=Le[b][O]:L=Le[b],te=!0):f.samples>0&&Ne.useMultisampledRTT(f)===!1?L=ve.get(f).__webglMultisampledFramebuffer:Array.isArray(Le)?L=Le[O]:L=Le,D.copy(f.viewport),H.copy(f.scissor),q=f.scissorTest}else D.copy(Ue).multiplyScalar(k).floor(),H.copy(Be).multiplyScalar(k).floor(),q=Ze;if(O!==0&&(L=Gr),me.bindFramebuffer(m.FRAMEBUFFER,L)&&B&&me.drawBuffers(f,L),me.viewport(D),me.scissor(H),me.setScissorTest(q),te){const de=ve.get(f.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_CUBE_MAP_POSITIVE_X+b,de.__webglTexture,O)}else if(le){const de=b;for(let Ce=0;Ce<f.textures.length;Ce++){const Le=ve.get(f.textures[Ce]);m.framebufferTextureLayer(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0+Ce,Le.__webglTexture,O,de)}}else if(f!==null&&O!==0){const de=ve.get(f.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,de.__webglTexture,O)}h=-1},this.readRenderTargetPixels=function(f,b,O,B,L,te,le,he=0){if(!(f&&f.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=ve.get(f).__webglFramebuffer;if(f.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de){me.bindFramebuffer(m.FRAMEBUFFER,de);try{const Ce=f.textures[he],Le=Ce.format,xe=Ce.type;if(!Pe.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}b>=0&&b<=f.width-B&&O>=0&&O<=f.height-L&&(f.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+he),m.readPixels(b,O,B,L,Se.convert(Le),Se.convert(xe),te))}finally{const Ce=X!==null?ve.get(X).__webglFramebuffer:null;me.bindFramebuffer(m.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(f,b,O,B,L,te,le,he=0){if(!(f&&f.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=ve.get(f).__webglFramebuffer;if(f.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de)if(b>=0&&b<=f.width-B&&O>=0&&O<=f.height-L){me.bindFramebuffer(m.FRAMEBUFFER,de);const Ce=f.textures[he],Le=Ce.format,xe=Ce.type;if(!Pe.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Fe=m.createBuffer();m.bindBuffer(m.PIXEL_PACK_BUFFER,Fe),m.bufferData(m.PIXEL_PACK_BUFFER,te.byteLength,m.STREAM_READ),f.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+he),m.readPixels(b,O,B,L,Se.convert(Le),Se.convert(xe),0);const ke=X!==null?ve.get(X).__webglFramebuffer:null;me.bindFramebuffer(m.FRAMEBUFFER,ke);const nt=m.fenceSync(m.SYNC_GPU_COMMANDS_COMPLETE,0);return m.flush(),await zr(m,nt,4),m.bindBuffer(m.PIXEL_PACK_BUFFER,Fe),m.getBufferSubData(m.PIXEL_PACK_BUFFER,0,te),m.deleteBuffer(Fe),m.deleteSync(nt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(f,b=null,O=0){const B=Math.pow(2,-O),L=Math.floor(f.image.width*B),te=Math.floor(f.image.height*B),le=b!==null?b.x:0,he=b!==null?b.y:0;Ne.setTexture2D(f,0),m.copyTexSubImage2D(m.TEXTURE_2D,O,0,0,le,he,L,te),me.unbindTexture()};const Hr=m.createFramebuffer(),Vr=m.createFramebuffer();this.copyTextureToTexture=function(f,b,O=null,B=null,L=0,te=null){te===null&&(L!==0?(yn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=L,L=0):te=0);let le,he,de,Ce,Le,xe,Fe,ke,nt;const Ye=f.isCompressedTexture?f.mipmaps[te]:f.image;if(O!==null)le=O.max.x-O.min.x,he=O.max.y-O.min.y,de=O.isBox3?O.max.z-O.min.z:1,Ce=O.min.x,Le=O.min.y,xe=O.isBox3?O.min.z:0;else{const mt=Math.pow(2,-L);le=Math.floor(Ye.width*mt),he=Math.floor(Ye.height*mt),f.isDataArrayTexture?de=Ye.depth:f.isData3DTexture?de=Math.floor(Ye.depth*mt):de=1,Ce=0,Le=0,xe=0}B!==null?(Fe=B.x,ke=B.y,nt=B.z):(Fe=0,ke=0,nt=0);const We=Se.convert(b.format),Re=Se.convert(b.type);let et;b.isData3DTexture?(Ne.setTexture3D(b,0),et=m.TEXTURE_3D):b.isDataArrayTexture||b.isCompressedArrayTexture?(Ne.setTexture2DArray(b,0),et=m.TEXTURE_2D_ARRAY):(Ne.setTexture2D(b,0),et=m.TEXTURE_2D),m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,b.flipY),m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),m.pixelStorei(m.UNPACK_ALIGNMENT,b.unpackAlignment);const Ge=m.getParameter(m.UNPACK_ROW_LENGTH),pt=m.getParameter(m.UNPACK_IMAGE_HEIGHT),Ot=m.getParameter(m.UNPACK_SKIP_PIXELS),ht=m.getParameter(m.UNPACK_SKIP_ROWS),Xt=m.getParameter(m.UNPACK_SKIP_IMAGES);m.pixelStorei(m.UNPACK_ROW_LENGTH,Ye.width),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,Ye.height),m.pixelStorei(m.UNPACK_SKIP_PIXELS,Ce),m.pixelStorei(m.UNPACK_SKIP_ROWS,Le),m.pixelStorei(m.UNPACK_SKIP_IMAGES,xe);const tt=f.isDataArrayTexture||f.isData3DTexture,_t=b.isDataArrayTexture||b.isData3DTexture;if(f.isDepthTexture){const mt=ve.get(f),ct=ve.get(b),lt=ve.get(mt.__renderTarget),Mn=ve.get(ct.__renderTarget);me.bindFramebuffer(m.READ_FRAMEBUFFER,lt.__webglFramebuffer),me.bindFramebuffer(m.DRAW_FRAMEBUFFER,Mn.__webglFramebuffer);for(let Pt=0;Pt<de;Pt++)tt&&(m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ve.get(f).__webglTexture,L,xe+Pt),m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ve.get(b).__webglTexture,te,nt+Pt)),m.blitFramebuffer(Ce,Le,le,he,Fe,ke,le,he,m.DEPTH_BUFFER_BIT,m.NEAREST);me.bindFramebuffer(m.READ_FRAMEBUFFER,null),me.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else if(L!==0||f.isRenderTargetTexture||ve.has(f)){const mt=ve.get(f),ct=ve.get(b);me.bindFramebuffer(m.READ_FRAMEBUFFER,Hr),me.bindFramebuffer(m.DRAW_FRAMEBUFFER,Vr);for(let lt=0;lt<de;lt++)tt?m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,mt.__webglTexture,L,xe+lt):m.framebufferTexture2D(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,mt.__webglTexture,L),_t?m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ct.__webglTexture,te,nt+lt):m.framebufferTexture2D(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,ct.__webglTexture,te),L!==0?m.blitFramebuffer(Ce,Le,le,he,Fe,ke,le,he,m.COLOR_BUFFER_BIT,m.NEAREST):_t?m.copyTexSubImage3D(et,te,Fe,ke,nt+lt,Ce,Le,le,he):m.copyTexSubImage2D(et,te,Fe,ke,Ce,Le,le,he);me.bindFramebuffer(m.READ_FRAMEBUFFER,null),me.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else _t?f.isDataTexture||f.isData3DTexture?m.texSubImage3D(et,te,Fe,ke,nt,le,he,de,We,Re,Ye.data):b.isCompressedArrayTexture?m.compressedTexSubImage3D(et,te,Fe,ke,nt,le,he,de,We,Ye.data):m.texSubImage3D(et,te,Fe,ke,nt,le,he,de,We,Re,Ye):f.isDataTexture?m.texSubImage2D(m.TEXTURE_2D,te,Fe,ke,le,he,We,Re,Ye.data):f.isCompressedTexture?m.compressedTexSubImage2D(m.TEXTURE_2D,te,Fe,ke,Ye.width,Ye.height,We,Ye.data):m.texSubImage2D(m.TEXTURE_2D,te,Fe,ke,le,he,We,Re,Ye);m.pixelStorei(m.UNPACK_ROW_LENGTH,Ge),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,pt),m.pixelStorei(m.UNPACK_SKIP_PIXELS,Ot),m.pixelStorei(m.UNPACK_SKIP_ROWS,ht),m.pixelStorei(m.UNPACK_SKIP_IMAGES,Xt),te===0&&b.generateMipmaps&&m.generateMipmap(et),me.unbindTexture()},this.initRenderTarget=function(f){ve.get(f).__webglFramebuffer===void 0&&Ne.setupRenderTarget(f)},this.initTexture=function(f){f.isCubeTexture?Ne.setTextureCube(f,0):f.isData3DTexture?Ne.setTexture3D(f,0):f.isDataArrayTexture||f.isCompressedArrayTexture?Ne.setTexture2DArray(f,0):Ne.setTexture2D(f,0),me.unbindTexture()},this.resetState=function(){U=0,F=0,X=null,me.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(n),t.unpackColorSpace=rt._getUnpackColorSpace()}}const N={BLEND:3042,CULL_FACE:2884,DEPTH_TEST:2929,DITHER:3024,POLYGON_OFFSET_FILL:32823,SAMPLE_ALPHA_TO_COVERAGE:32926,SAMPLE_COVERAGE:32928,SCISSOR_TEST:3089,STENCIL_TEST:2960,RASTERIZER_DISCARD:35977,BLEND_COLOR:32773,BLEND_EQUATION_RGB:32777,BLEND_EQUATION_ALPHA:34877,BLEND_SRC_RGB:32969,BLEND_DST_RGB:32968,BLEND_SRC_ALPHA:32971,BLEND_DST_ALPHA:32970,COLOR_CLEAR_VALUE:3106,DEPTH_CLEAR_VALUE:2931,STENCIL_CLEAR_VALUE:2961,COLOR_WRITEMASK:3107,CULL_FACE_MODE:2885,DEPTH_FUNC:2932,DEPTH_WRITEMASK:2930,DEPTH_RANGE:2928,FRONT_FACE:2886,LINE_WIDTH:2849,POLYGON_OFFSET_FACTOR:32824,POLYGON_OFFSET_UNITS:10752,SAMPLE_COVERAGE_VALUE:32938,SAMPLE_COVERAGE_INVERT:32939,SCISSOR_BOX:3088,VIEWPORT:2978,FRONT:1028,BACK:1029,STENCIL_FUNC:2962,STENCIL_REF:2967,STENCIL_VALUE_MASK:2963,STENCIL_BACK_FUNC:34816,STENCIL_BACK_REF:36003,STENCIL_BACK_VALUE_MASK:36004,STENCIL_FAIL:2964,STENCIL_PASS_DEPTH_FAIL:2965,STENCIL_PASS_DEPTH_PASS:2966,STENCIL_BACK_FAIL:34817,STENCIL_BACK_PASS_DEPTH_FAIL:34818,STENCIL_BACK_PASS_DEPTH_PASS:34819,STENCIL_WRITEMASK:2968,STENCIL_BACK_WRITEMASK:36005,GENERATE_MIPMAP_HINT:33170,FRAGMENT_SHADER_DERIVATIVE_HINT:35723,PACK_ALIGNMENT:3333,UNPACK_ALIGNMENT:3317,UNPACK_FLIP_Y_WEBGL:37440,UNPACK_PREMULTIPLY_ALPHA_WEBGL:37441,UNPACK_COLORSPACE_CONVERSION_WEBGL:37443,PACK_ROW_LENGTH:3330,PACK_SKIP_PIXELS:3332,PACK_SKIP_ROWS:3331,UNPACK_ROW_LENGTH:3314,UNPACK_IMAGE_HEIGHT:32878,UNPACK_SKIP_PIXELS:3316,UNPACK_SKIP_ROWS:3315,UNPACK_SKIP_IMAGES:32877,READ_FRAMEBUFFER:36008,DRAW_FRAMEBUFFER:36009,RENDERBUFFER:36161,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,COPY_READ_BUFFER:36662,COPY_WRITE_BUFFER:36663,PIXEL_PACK_BUFFER:35051,PIXEL_UNPACK_BUFFER:35052,UNIFORM_BUFFER:35345,TRANSFORM_FEEDBACK:36386,TRANSFORM_FEEDBACK_BUFFER:35982,TEXTURE0:33984,TEXTURE_2D:3553,TEXTURE_CUBE_MAP:34067,TEXTURE_3D:32879,TEXTURE_2D_ARRAY:35866,CURRENT_VERTEX_ATTRIB:34342,MAX_VERTEX_ATTRIBS:34921},wr=[N.BLEND,N.CULL_FACE,N.DEPTH_TEST,N.DITHER,N.POLYGON_OFFSET_FILL,N.SAMPLE_ALPHA_TO_COVERAGE,N.SAMPLE_COVERAGE,N.SCISSOR_TEST,N.STENCIL_TEST,N.RASTERIZER_DISCARD],Nr=[N.PACK_ALIGNMENT,N.UNPACK_ALIGNMENT,N.UNPACK_FLIP_Y_WEBGL,N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.UNPACK_COLORSPACE_CONVERSION_WEBGL,N.PACK_ROW_LENGTH,N.PACK_SKIP_PIXELS,N.PACK_SKIP_ROWS,N.UNPACK_ROW_LENGTH,N.UNPACK_IMAGE_HEIGHT,N.UNPACK_SKIP_PIXELS,N.UNPACK_SKIP_ROWS,N.UNPACK_SKIP_IMAGES],id=[N.ARRAY_BUFFER,N.COPY_READ_BUFFER,N.COPY_WRITE_BUFFER,N.PIXEL_PACK_BUFFER,N.PIXEL_UNPACK_BUFFER,N.TRANSFORM_FEEDBACK_BUFFER,N.UNIFORM_BUFFER],rd=[N.TEXTURE_2D,N.TEXTURE_CUBE_MAP,N.TEXTURE_3D,N.TEXTURE_2D_ARRAY],lr=36160,ad=256,od=()=>{let e=null,n=null,t=null,i=null,l=null,a=null,d=null;const c=new Map,x=new Map;let S=0;const I=new Map,_=new Map,E=g=>{let s=I.get(g);return s||(s=new Map,I.set(g,s)),s},T=g=>g!=null&&typeof g=="object"?g:null,P=g=>{e===g&&(e=null),n===g&&(n=null),t===g&&(t=null),i===g&&(i=null),l===g&&(l=null),d===g&&(d=null);for(const[s,r]of c)r===g&&c.set(s,null);for(const[s,r]of x)r.buffer===g&&x.set(s,{buffer:null,offset:0,size:0});for(const s of I.values())for(const[r,A]of s)A===g&&s.set(r,null);for(const[s,r]of _)r===g&&_.set(s,null)};return{observe(g,s){switch(g){case"bindFramebuffer":{const r=s[0],A=T(s[1]);(r===lr||r===N.DRAW_FRAMEBUFFER)&&(e=A),(r===lr||r===N.READ_FRAMEBUFFER)&&(n=A);break}case"bindRenderbuffer":t=T(s[1]);break;case"bindVertexArray":i=T(s[0]);break;case"bindBuffer":{const r=s[0];r===N.ELEMENT_ARRAY_BUFFER?i===null&&(l=T(s[1])):c.set(r,T(s[1]));break}case"bindBufferBase":case"bindBufferRange":{const r=s[0],A=T(s[2]);c.set(r,A),r===N.UNIFORM_BUFFER&&x.set(s[1],{buffer:A,offset:g==="bindBufferRange"?s[3]:0,size:g==="bindBufferRange"?s[4]:0});break}case"useProgram":a=T(s[0]);break;case"bindTransformFeedback":d=T(s[1]);break;case"activeTexture":{const r=s[0]-N.TEXTURE0;r>=0&&r<ad&&(S=r);break}case"bindTexture":E(S).set(s[0],T(s[1]));break;case"bindSampler":_.set(s[0],T(s[1]));break;case"deleteFramebuffer":case"deleteRenderbuffer":case"deleteVertexArray":case"deleteBuffer":case"deleteTexture":case"deleteSampler":case"deleteTransformFeedback":{const r=T(s[0]);r&&P(r);break}}},emit(g){g("bindFramebuffer",N.READ_FRAMEBUFFER,n),g("bindFramebuffer",N.DRAW_FRAMEBUFFER,e),g("bindRenderbuffer",N.RENDERBUFFER,t),g("bindVertexArray",null),g("bindBuffer",N.ELEMENT_ARRAY_BUFFER,l),g("bindVertexArray",i),g("bindTransformFeedback",N.TRANSFORM_FEEDBACK,d);for(const[r,A]of x)A.buffer&&A.size>0?g("bindBufferRange",N.UNIFORM_BUFFER,r,A.buffer,A.offset,A.size):g("bindBufferBase",N.UNIFORM_BUFFER,r,A.buffer);for(const r of id)c.has(r)&&g("bindBuffer",r,c.get(r)??null);g("useProgram",a);const s=new Set([...I.keys(),..._.keys()]);for(const r of s){g("activeTexture",N.TEXTURE0+r);for(const A of rd)g("bindTexture",A,I.get(r)?.get(A)??null);g("bindSampler",r,_.get(r)??null)}g("activeTexture",N.TEXTURE0+S)}}},sd=(e,n,t,i)=>{const l=[],a=e,d=_=>a.getParameter(_),c=(_,...E)=>{l.push({name:_,args:E.map(t)})},x=_=>Array.from(_),S=_=>Array.from(_);if(n.emit(c),i)return i.emit(c),l;for(const _ of wr)c(a.isEnabled(_)?"enable":"disable",_);c("blendColor",...x(d(N.BLEND_COLOR))),c("blendEquationSeparate",d(N.BLEND_EQUATION_RGB),d(N.BLEND_EQUATION_ALPHA)),c("blendFuncSeparate",d(N.BLEND_SRC_RGB),d(N.BLEND_DST_RGB),d(N.BLEND_SRC_ALPHA),d(N.BLEND_DST_ALPHA)),c("colorMask",...S(d(N.COLOR_WRITEMASK))),c("clearColor",...x(d(N.COLOR_CLEAR_VALUE))),c("clearDepth",d(N.DEPTH_CLEAR_VALUE)),c("clearStencil",d(N.STENCIL_CLEAR_VALUE)),c("cullFace",d(N.CULL_FACE_MODE)),c("frontFace",d(N.FRONT_FACE)),c("depthFunc",d(N.DEPTH_FUNC)),c("depthMask",d(N.DEPTH_WRITEMASK)),c("depthRange",...x(d(N.DEPTH_RANGE))),c("lineWidth",d(N.LINE_WIDTH)),c("polygonOffset",d(N.POLYGON_OFFSET_FACTOR),d(N.POLYGON_OFFSET_UNITS)),c("sampleCoverage",d(N.SAMPLE_COVERAGE_VALUE),d(N.SAMPLE_COVERAGE_INVERT)),c("stencilFuncSeparate",N.FRONT,d(N.STENCIL_FUNC),d(N.STENCIL_REF),d(N.STENCIL_VALUE_MASK)),c("stencilFuncSeparate",N.BACK,d(N.STENCIL_BACK_FUNC),d(N.STENCIL_BACK_REF),d(N.STENCIL_BACK_VALUE_MASK)),c("stencilOpSeparate",N.FRONT,d(N.STENCIL_FAIL),d(N.STENCIL_PASS_DEPTH_FAIL),d(N.STENCIL_PASS_DEPTH_PASS)),c("stencilOpSeparate",N.BACK,d(N.STENCIL_BACK_FAIL),d(N.STENCIL_BACK_PASS_DEPTH_FAIL),d(N.STENCIL_BACK_PASS_DEPTH_PASS)),c("stencilMaskSeparate",N.FRONT,d(N.STENCIL_WRITEMASK)),c("stencilMaskSeparate",N.BACK,d(N.STENCIL_BACK_WRITEMASK)),c("hint",N.GENERATE_MIPMAP_HINT,d(N.GENERATE_MIPMAP_HINT)),c("hint",N.FRAGMENT_SHADER_DERIVATIVE_HINT,d(N.FRAGMENT_SHADER_DERIVATIVE_HINT));for(const _ of Nr){const E=d(_);c("pixelStorei",_,typeof E=="boolean"?E?1:0:E)}const I=d(N.MAX_VERTEX_ATTRIBS);for(let _=0;_<I;_+=1){const E=a.getVertexAttrib(_,N.CURRENT_VERTEX_ATTRIB);E&&(E instanceof Int32Array?c("vertexAttribI4iv",_,Array.from(E)):E instanceof Uint32Array?c("vertexAttribI4uiv",_,Array.from(E)):c("vertexAttrib4fv",_,Array.from(E)))}return c("scissor",...x(d(N.SCISSOR_BOX))),c("viewport",...x(d(N.VIEWPORT))),l},cd=1032,ld=32769,fd=32770,dd=32771,ud=32772,pd=37444,hd=new Set([N.UNPACK_FLIP_Y_WEBGL,N.UNPACK_PREMULTIPLY_ALPHA_WEBGL]),_d=new Set([N.PACK_ALIGNMENT,N.UNPACK_ALIGNMENT]),md=e=>{const n=e,t=G=>n.getParameter(G),i=G=>Array.from(G),l=G=>Array.from(G),a=G=>Number(G)|0,d=G=>Number(G)>>>0,c=G=>Math.fround(Number(G));let x=new Map,S=[],I=[],_=[],E=[],T=[],P,g,s,r,A,R,v=[],y,U=[],F=[],X={front:[],back:[]},h={front:[],back:[]},u={front:0,back:0},D=new Map,H=new Map,q=new Map,Z=[],Q=[];const K=(G,C)=>hd.has(G)?typeof C=="boolean"?C?1:0:a(C)!==0?1:0:a(C),ae=()=>{x=new Map(wr.map(C=>[C,n.isEnabled(C)])),S=i(t(N.BLEND_COLOR)),I=[t(N.BLEND_EQUATION_RGB),t(N.BLEND_EQUATION_ALPHA)],_=[t(N.BLEND_SRC_RGB),t(N.BLEND_DST_RGB),t(N.BLEND_SRC_ALPHA),t(N.BLEND_DST_ALPHA)],E=l(t(N.COLOR_WRITEMASK)),T=i(t(N.COLOR_CLEAR_VALUE)),P=t(N.DEPTH_CLEAR_VALUE),g=t(N.STENCIL_CLEAR_VALUE),s=t(N.CULL_FACE_MODE),r=t(N.FRONT_FACE),A=t(N.DEPTH_FUNC),R=!!t(N.DEPTH_WRITEMASK),v=i(t(N.DEPTH_RANGE)),y=t(N.LINE_WIDTH),U=[t(N.POLYGON_OFFSET_FACTOR),t(N.POLYGON_OFFSET_UNITS)],F=[t(N.SAMPLE_COVERAGE_VALUE),t(N.SAMPLE_COVERAGE_INVERT)],X={front:[t(N.STENCIL_FUNC),t(N.STENCIL_REF),t(N.STENCIL_VALUE_MASK)],back:[t(N.STENCIL_BACK_FUNC),t(N.STENCIL_BACK_REF),t(N.STENCIL_BACK_VALUE_MASK)]},h={front:[t(N.STENCIL_FAIL),t(N.STENCIL_PASS_DEPTH_FAIL),t(N.STENCIL_PASS_DEPTH_PASS)],back:[t(N.STENCIL_BACK_FAIL),t(N.STENCIL_BACK_PASS_DEPTH_FAIL),t(N.STENCIL_BACK_PASS_DEPTH_PASS)]},u={front:t(N.STENCIL_WRITEMASK),back:t(N.STENCIL_BACK_WRITEMASK)},D=new Map([[N.GENERATE_MIPMAP_HINT,t(N.GENERATE_MIPMAP_HINT)],[N.FRAGMENT_SHADER_DERIVATIVE_HINT,t(N.FRAGMENT_SHADER_DERIVATIVE_HINT)]]),H=new Map(Nr.map(C=>[C,K(C,t(C))])),q=new Map;const G=t(N.MAX_VERTEX_ATTRIBS);for(let C=0;C<G;C+=1){const j=n.getVertexAttrib(C,N.CURRENT_VERTEX_ATTRIB);j&&(j instanceof Int32Array?q.set(C,["vertexAttribI4iv",Array.from(j)]):j instanceof Uint32Array?q.set(C,["vertexAttribI4uiv",Array.from(j)]):q.set(C,["vertexAttrib4fv",Array.from(j)]))}Z=i(t(N.SCISSOR_BOX)),Q=i(t(N.VIEWPORT))};ae();let k=!1;const pe=n.canvas;pe&&typeof pe.addEventListener=="function"&&(pe.addEventListener("webglcontextlost",()=>{k=!0}),pe.addEventListener("webglcontextrestored",()=>{k=!1,ae()}));const Me=G=>G===N.FRONT?["front"]:G===N.BACK?["back"]:G===cd?["front","back"]:[],Ue=G=>G===ld||G===fd,Be=G=>G===dd||G===ud,Ze=(G,C)=>!(Ue(G)&&Be(C)||Be(G)&&Ue(C)),Ke=G=>a(G[2])>=0&&a(G[3])>=0,Oe=(G,C)=>{const j=[0,0,0,1];for(let Ae=0;Ae<G;Ae+=1)j[Ae]=Number(C[1+Ae]);return j},W=(G,C)=>{const j=C;if(!j||typeof j.length!="number"||j.length<G)return null;const Ae=[0,0,0,1];for(let Qe=0;Qe<G;Qe+=1)Ae[Qe]=Number(j[Qe]);return Ae},Y=(G,C,j,Ae)=>{const Qe=Number(G)>>>0;!j||!q.has(Qe)||q.set(Qe,[C,Ae?j.map(Ae):j])};return{observe(G,C){if(!k)switch(G){case"enable":case"disable":x.has(C[0])&&x.set(C[0],G==="enable");break;case"blendColor":S=C.slice(0,4).map(c);break;case"blendEquation":I=[C[0],C[0]];break;case"blendEquationSeparate":I=[C[0],C[1]];break;case"blendFunc":Ze(C[0],C[1])&&(_=[C[0],C[1],C[0],C[1]]);break;case"blendFuncSeparate":Ze(C[0],C[1])&&(_=[C[0],C[1],C[2],C[3]]);break;case"colorMask":E=C.slice(0,4).map(Boolean);break;case"clearColor":T=C.slice(0,4).map(c);break;case"clearDepth":P=c(C[0]);break;case"clearStencil":g=a(C[0]);break;case"cullFace":s=C[0];break;case"frontFace":r=C[0];break;case"depthFunc":A=C[0];break;case"depthMask":R=!!C[0];break;case"depthRange":Number(C[0])>Number(C[1])||(v=[c(C[0]),c(C[1])]);break;case"lineWidth":Number(C[0])>0&&(y=c(C[0]));break;case"polygonOffset":U=[c(C[0]),c(C[1])];break;case"sampleCoverage":F=[c(C[0]),!!C[1]];break;case"stencilFunc":{const j=[C[0],a(C[1]),d(C[2])];X={front:j,back:[...j]};break}case"stencilFuncSeparate":for(const j of Me(C[0]))X[j]=[C[1],a(C[2]),d(C[3])];break;case"stencilOp":h={front:[C[0],C[1],C[2]],back:[C[0],C[1],C[2]]};break;case"stencilOpSeparate":for(const j of Me(C[0]))h[j]=[C[1],C[2],C[3]];break;case"stencilMask":u={front:d(C[0]),back:d(C[0])};break;case"stencilMaskSeparate":for(const j of Me(C[0]))u[j]=d(C[1]);break;case"hint":D.has(C[0])&&D.set(C[0],C[1]);break;case"pixelStorei":{const j=C[0];if(!H.has(j))break;const Ae=K(j,C[1]);if((_d.has(j)?![1,2,4,8].includes(Ae):Ae<0)||j===N.UNPACK_COLORSPACE_CONVERSION_WEBGL&&Ae!==0&&Ae!==pd)break;H.set(j,Ae);break}case"vertexAttrib1f":Y(C[0],"vertexAttrib4fv",Oe(1,C),c);break;case"vertexAttrib2f":Y(C[0],"vertexAttrib4fv",Oe(2,C),c);break;case"vertexAttrib3f":Y(C[0],"vertexAttrib4fv",Oe(3,C),c);break;case"vertexAttrib4f":Y(C[0],"vertexAttrib4fv",Oe(4,C),c);break;case"vertexAttrib1fv":Y(C[0],"vertexAttrib4fv",W(1,C[1]),c);break;case"vertexAttrib2fv":Y(C[0],"vertexAttrib4fv",W(2,C[1]),c);break;case"vertexAttrib3fv":Y(C[0],"vertexAttrib4fv",W(3,C[1]),c);break;case"vertexAttrib4fv":Y(C[0],"vertexAttrib4fv",W(4,C[1]),c);break;case"vertexAttribI4i":Y(C[0],"vertexAttribI4iv",Oe(4,C),a);break;case"vertexAttribI4iv":Y(C[0],"vertexAttribI4iv",W(4,C[1]),a);break;case"vertexAttribI4ui":Y(C[0],"vertexAttribI4uiv",Oe(4,C),d);break;case"vertexAttribI4uiv":Y(C[0],"vertexAttribI4uiv",W(4,C[1]),d);break;case"scissor":Ke(C)&&(Z=C.slice(0,4).map(a));break;case"viewport":Ke(C)&&(Q=C.slice(0,4).map(a));break}},emit(G){for(const[C,j]of x)G(j?"enable":"disable",C);G("blendColor",...S),G("blendEquationSeparate",...I),G("blendFuncSeparate",..._),G("colorMask",...E),G("clearColor",...T),G("clearDepth",P),G("clearStencil",g),G("cullFace",s),G("frontFace",r),G("depthFunc",A),G("depthMask",R),G("depthRange",...v),G("lineWidth",y),G("polygonOffset",...U),G("sampleCoverage",...F),G("stencilFuncSeparate",N.FRONT,...X.front),G("stencilFuncSeparate",N.BACK,...X.back),G("stencilOpSeparate",N.FRONT,...h.front),G("stencilOpSeparate",N.BACK,...h.back),G("stencilMaskSeparate",N.FRONT,u.front),G("stencilMaskSeparate",N.BACK,u.back);for(const[C,j]of D)G("hint",C,j);for(const[C,j]of H)G("pixelStorei",C,j);for(const[C,[j,Ae]]of q)G(j,C,[...Ae]);G("scissor",...Z),G("viewport",...Q)},reseed:ae}},vd=new Set(["getParameter","getError","getContextAttributes","isContextLost","getSupportedExtensions","getShaderParameter","getProgramParameter","getActiveUniform","getActiveAttrib","getActiveUniforms","getActiveUniformBlockParameter","getActiveUniformBlockName","getShaderInfoLog","getProgramInfoLog","getAttribLocation","getUniformBlockIndex","getFragDataLocation","getUniformIndices","getUniform","isProgram","isShader","isBuffer","isTexture","isFramebuffer","isRenderbuffer","isVertexArray","isSampler","isSync","isQuery","isTransformFeedback","getBufferParameter","getFramebufferAttachmentParameter","getRenderbufferParameter","getSamplerParameter","getTexParameter","getVertexAttrib","getVertexAttribOffset","getQueryParameter","getQuery","getSyncParameter","getInternalformatParameter","getIndexedParameter","getTransformFeedbackVarying","checkFramebufferStatus","readPixels","getBufferSubData","clientWaitSync"]),gd=(e,n)=>vd.has(e)?e==="readPixels"?typeof n[6]!="number":!0:!1,Ed=new Set(["createBuffer","createTexture","createProgram","createShader","createFramebuffer","createRenderbuffer","createVertexArray","createSampler","createTransformFeedback","createQuery","getUniformLocation","fenceSync"]),Sd=(e,n,t={})=>{const i=new Map;let l=1;const a=od(),d=(t.scalarState??"tracked")==="tracked"?md(e):void 0;let c=!1,x=null;const S=()=>{if(!x){if(typeof document>"u")throw new Error("NetGL recorder: image-source encoding needs a document. Worker hosts should convert image sources to ImageBitmap before passing to gl.texImage2D (and we can extend the encoder to take ImageBitmap directly with no 2D-canvas detour).");const g=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});if(!g)throw new Error("NetGL recorder: failed to get 2d context for scratch canvas");x=g}return x},I=P=>{const g=P,s=g.naturalWidth??g.videoWidth??g.width,r=g.naturalHeight??g.videoHeight??g.height;if(!s||!r)throw new Error(`NetGL recorder: image source has zero dims (${P.constructor.name})`);const A=S();A.canvas.width=s,A.canvas.height=r,A.clearRect(0,0,s,r),A.drawImage(P,0,0);const R=A.getImageData(0,0,s,r);return{__netgl_imagedata:!0,width:s,height:r,buffer:R.data.buffer}},_=P=>{if(P==null)return null;const g=typeof P;if(g==="number"||g==="string"||g==="boolean")return P;if(g!=="object")return null;const s=i.get(P);if(s!==void 0)return{__netgl_handle:s};if(ArrayBuffer.isView(P)){const r=P,A=r.buffer;return r.byteLength<A.byteLength?{__netgl_typedarray:r.constructor.name,buffer:A.slice(r.byteOffset,r.byteOffset+r.byteLength),offset:0,length:r.length}:{__netgl_typedarray:r.constructor.name,buffer:A,offset:r.byteOffset,length:r.length}}if(P instanceof ArrayBuffer)return{__netgl_arraybuffer:P};if(typeof ImageBitmap<"u"&&P instanceof ImageBitmap)return{__netgl_imagebitmap:P};if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof HTMLVideoElement<"u"&&P instanceof HTMLVideoElement||typeof OffscreenCanvas<"u"&&P instanceof OffscreenCanvas)return I(P);if(typeof ImageData<"u"&&P instanceof ImageData)return{__netgl_imagedata:!0,width:P.width,height:P.height,buffer:P.data.buffer};if(Array.isArray(P))return P.map(_);throw new Error(`NetGL recorder: cannot encode argument of type ${P.constructor?.name}`)},E=new Proxy(e,{get(P,g){const s=Reflect.get(P,g);if(typeof s!="function")return s;const r=typeof g=="string"?g:String(g);return function(...R){const v=gd(r,R);c&&!v&&(c=!1,T());const y=s.apply(P,R);if(v)return y;a.observe(r,R),d?.observe(r,R);let U;Ed.has(r)&&y!=null&&typeof y=="object"&&(U=l,l+=1,i.set(y,U));const F=R.map(_);return n({name:r,args:F,returnId:U}),y}},set(P,g,s){return Reflect.set(P,g,s,P)}}),T=()=>{for(const P of sd(e,a,_,d))n(P)};return{gl:E,checkpoint(){c=!1,T()},deferCheckpoint(){c=!0}}},Td=500,Md=(e={})=>{const{canvas:n=Ad(),contextAttributes:t={antialias:!1,stencil:!0,depth:!0},checkpoints:i=!0}=e,l=e.transport??fo({output:parent,inputFilter:parent}),a=n.getContext("webgl2",t);if(!a)throw new Error("makeNetGLGuestContext: failed to create WebGL2 shadow context");const d=Sd(a,c=>l.post(c),{scalarState:i?e.scalarState:"queried"});return i&&d.checkpoint(),{gl:d.gl,shadow:a,transport:l,endFrame(c={}){const x={type:"netgl:frame-end"};l.post(x),i&&c.checkpoint!==!1&&d.checkpoint()},subFrame(){const c={type:"netgl:frame-end"};l.post(c),i&&d.deferCheckpoint()},announce(c,x={r:0,g:0,b:0}){const S={type:"netgl:ready",anchor:c,background:x};l.post(S);const I=setInterval(()=>l.post(S),Td),_=l.onMessage(E=>{E.type==="netgl:ready-ack"&&(clearInterval(I),_())})}}},Ad=()=>{const e=document.createElement("canvas");return e.width=1,e.height=1,e},xd=e=>{const{scene:n,camera:t,transport:i}=e,l=Md({transport:i,canvas:e.canvas}),a=new e.WebGLRenderer({antialias:!1,alpha:!0,...e.rendererParams,context:l.gl,canvas:l.shadow.canvas});a.autoClear=!1,a.setPixelRatio(1),n.background=null,t.matrixAutoUpdate=!1;let d=null,c=[0,0],x=null;const S=_=>{d=_,t.matrix.fromArray(ho(_.viewMatrix)),t.matrixWorldNeedsUpdate=!0,t.projectionMatrix.fromArray(_.projectionMatrix),t.projectionMatrixInverse.copy(t.projectionMatrix).invert();const[E,T,P,g]=_.viewport,s=E+P,r=T+g;(s!==c[0]||r!==c[1])&&(a.setSize(s,r,!1),c=[s,r]),a.setViewport(E,T,P,g)},I=()=>{a.render(n,t),l.endFrame()};return{renderer:a,core:l,get view(){return d},applyView:S,render:I,start(){x||(x=i.onMessage(_=>{po(_)&&(e.onView?.(_.view),S(_.view),I())}),l.announce({position:[0,0,0],normal:[0,0,1],up:[0,1,0]}))},stop(){x?.(),x=null},invalidate(_){uo(i,_)}}},Kn=["http://localhost:5190","http://127.0.0.1:5190","http://localhost:5400","http://127.0.0.1:5400","https://pablo-mayrgundter.github.io"];location.origin!=="null"&&!Kn.includes(location.origin)&&Kn.push(location.origin);const yr=document.getElementById("msg"),Rd=()=>{const e=_o({hostOrigins:Kn,onReject:r=>console.warn("[netgl-deck guest] dropped a message",r)}),n=new mo,t=new Float32Array(sn.length*3),i=new Float32Array(sn.length*3);sn.forEach((r,A)=>{const R=new $e().setRGB(r.color[0]/255,r.color[1]/255,r.color[2]/255,fr);i.set([R.r,R.g,R.b],A*3)});const l=new Qt;l.setAttribute("position",new xt(t,3)),l.setAttribute("color",new xt(i,3));const a=new Oi({size:8,sizeAttenuation:!1,vertexColors:!0,depthWrite:!1}),d=new Bi(l,a);d.frustumCulled=!1,n.add(d);const c=256,x=new Float32Array(c*3),S=new Qt;S.setAttribute("position",new xt(x,3));const I=new vo(S,new go({color:4251903,depthWrite:!1}));I.frustumCulled=!1,n.add(I);const _=new Qt;_.setAttribute("position",new xt(new Float32Array(3),3));const E=new Bi(_,new Oi({color:16777215,size:6,sizeAttenuation:!1,depthWrite:!1}));E.frustumCulled=!1,n.add(E);const T=(r,A)=>{const R=cn.inclinationDeg*Math.PI/180,v=cn.ascendingNodeLngDeg*Math.PI/180,y=A+cn.altitude,U=Math.cos(r),F=Math.sin(r)*Math.cos(R),X=Math.sin(r)*Math.sin(R);return[y*(U*Math.cos(v)-F*Math.sin(v)),y*(U*Math.sin(v)+F*Math.cos(v)),y*X]};let P=0;const g=r=>{const A=r.earth?.radius??6378137;if(A!==P){P=A,sn.forEach((v,y)=>t.set(Eo(v.lng,v.lat,v.alt,A),y*3)),l.attributes.position.needsUpdate=!0;for(let v=0;v<c;v+=1)x.set(T(v/c*2*Math.PI,A),v*3);S.attributes.position.needsUpdate=!0}const R=r.timeMs/6e4/cn.periodMin%1*2*Math.PI;_.attributes.position.set(T(R,A)),_.attributes.position.needsUpdate=!0,a.size=8*r.pixelRatio,E.material.size=6*r.pixelRatio};xd({WebGLRenderer:nd,scene:n,camera:new $t,transport:e,onView:g}).start(),yr.textContent="NetGL guest running; drawing into the host."};try{Rd()}catch(e){yr.textContent=`Not started: ${e instanceof Error?e.message:String(e)}`}
