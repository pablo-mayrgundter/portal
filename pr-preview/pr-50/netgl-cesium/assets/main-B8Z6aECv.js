import{c as Ka,N as wt,S as la,C as ze,F as ca,M as St,V as de,R as qa,a as dt,w as si,W as Ni,b as $t,d as at,L as nn,H as Un,U as Gt,D as Tt,B as Mt,e as ln,f as In,p as Za,E as $a,g as Xe,P as qt,A as ja,h as Gn,i as Ct,j as Cn,k as Mi,l as cn,m as dn,n as da,o as Qa,q as Wt,r as wn,s as Ja,t as eo,u as tn,O as to,v as no,x as io,y as ro,z as ao,G as oo,I as so,J as lo,K as co,Q as fo,T as uo,X as po,Y as ho,Z as mo,_ as _o,$ as go,a0 as vo,a1 as Eo,a2 as Vn,a3 as Xt,a4 as _n,a5 as So,a6 as on,a7 as Mo,a8 as To,a9 as xo,aa as Ao,ab as fa,ac as Ro,ad as bo,ae as Co,af as Ti,ag as Be,ah as wo,ai as Po,aj as Do,ak as Dt,al as xi,am as sn,an as ut,ao as ua,ap as Bt,aq as bt,ar as Pn,as as pa,at as ha,au as ma,av as pn,aw as Lo,ax as yo,ay as Uo,az as Io,aA as _a,aB as Ft,aC as No,aD as Oo,aE as Fo,aF as ga,aG as Bo,aH as va,aI as Ea,aJ as kn,aK as zn,aL as Wn,aM as Xn,aN as $e,aO as Oi,aP as Fi,aQ as Bi,aR as Hi,aS as Gi,aT as Vi,aU as ki,aV as zi,aW as Wi,aX as Xi,aY as Yi,aZ as Ki,a_ as qi,a$ as Zi,b0 as $i,b1 as ji,b2 as Qi,b3 as Ji,b4 as er,b5 as tr,b6 as nr,b7 as ir,b8 as rr,b9 as ar,ba as or,bb as sr,bc as lr,bd as cr,be as li,bf as ci,bg as di,bh as fi,bi as ui,bj as pi,bk as hi,bl as Ho,bm as dr,bn as Go,bo as An,bp as Vo,bq as fr,br as ur,bs as pr,bt as mi,bu as _i,bv as ko,bw as Sa,bx as zo,by as Nn,bz as Wo,bA as Xo,bB as Ma,bC as Ai,bD as hr,bE as Dn,bF as mr,bG as Ta,bH as fn,bI as jt,bJ as xa,bK as Ri,bL as Yo,bM as Ko,bN as qo,bO as _r,bP as mt,bQ as Zo,bR as $o,bS as jo,bT as Qo,bU as Jo,bV as es,bW as ts,bX as ns,bY as is,bZ as rs,b_ as as,b$ as os,c0 as ss,c1 as ls,c2 as cs,c3 as ds,c4 as fs,c5 as us,c6 as un,c7 as Aa,c8 as Ht,c9 as Ra,ca as Ln,cb as ps,cc as hs,cd as gr,ce as vr,cf as Er,cg as ms,ch as _s,ci as gs,cj as ba,ck as yn,cl as Pt,cm as Ca,cn as vs,co as Zt,cp as Yt,cq as Sr,cr as Es,cs as Ss,ct as Yn,cu as Mr,cv as Ms,cw as Ts,cx as xs}from"./protocol-CFbB0cau.js";function wa(){let e=null,n=!1,t=null,i=null;function a(r,d){t(r,d),i=e.requestAnimationFrame(a)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(a),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function As(e){const n=new WeakMap;function t(l,S){const _=l.array,x=l.usage,E=_.byteLength,g=e.createBuffer();e.bindBuffer(S,g),e.bufferData(S,_,x),l.onUploadCallback();let T;if(_ instanceof Float32Array)T=e.FLOAT;else if(typeof Float16Array<"u"&&_ instanceof Float16Array)T=e.HALF_FLOAT;else if(_ instanceof Uint16Array)l.isFloat16BufferAttribute?T=e.HALF_FLOAT:T=e.UNSIGNED_SHORT;else if(_ instanceof Int16Array)T=e.SHORT;else if(_ instanceof Uint32Array)T=e.UNSIGNED_INT;else if(_ instanceof Int32Array)T=e.INT;else if(_ instanceof Int8Array)T=e.BYTE;else if(_ instanceof Uint8Array)T=e.UNSIGNED_BYTE;else if(_ instanceof Uint8ClampedArray)T=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+_);return{buffer:g,type:T,bytesPerElement:_.BYTES_PER_ELEMENT,version:l.version,size:E}}function i(l,S,_){const x=S.array,E=S.updateRanges;if(e.bindBuffer(_,l),E.length===0)e.bufferSubData(_,0,x);else{E.sort((T,N)=>T.start-N.start);let g=0;for(let T=1;T<E.length;T++){const N=E[g],D=E[T];D.start<=N.start+N.count+1?N.count=Math.max(N.count,D.start+D.count-N.start):(++g,E[g]=D)}E.length=g+1;for(let T=0,N=E.length;T<N;T++){const D=E[T];e.bufferSubData(_,D.start*x.BYTES_PER_ELEMENT,x,D.start,D.count)}S.clearUpdateRanges()}S.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const S=n.get(l);S&&(e.deleteBuffer(S.buffer),n.delete(l))}function d(l,S){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const x=n.get(l);(!x||x.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const _=n.get(l);if(_===void 0)n.set(l,t(l,S));else if(_.version<l.version){if(_.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(_.buffer,l,S),_.version=l.version}}return{get:a,remove:r,update:d}}var Rs=`#ifdef USE_ALPHAHASH
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
}`,Ne={alphahash_fragment:Rs,alphahash_pars_fragment:bs,alphamap_fragment:Cs,alphamap_pars_fragment:ws,alphatest_fragment:Ps,alphatest_pars_fragment:Ds,aomap_fragment:Ls,aomap_pars_fragment:ys,batching_pars_vertex:Us,batching_vertex:Is,begin_vertex:Ns,beginnormal_vertex:Os,bsdfs:Fs,iridescence_fragment:Bs,bumpmap_pars_fragment:Hs,clipping_planes_fragment:Gs,clipping_planes_pars_fragment:Vs,clipping_planes_pars_vertex:ks,clipping_planes_vertex:zs,color_fragment:Ws,color_pars_fragment:Xs,color_pars_vertex:Ys,color_vertex:Ks,common:qs,cube_uv_reflection_fragment:Zs,defaultnormal_vertex:$s,displacementmap_pars_vertex:js,displacementmap_vertex:Qs,emissivemap_fragment:Js,emissivemap_pars_fragment:el,colorspace_fragment:tl,colorspace_pars_fragment:nl,envmap_fragment:il,envmap_common_pars_fragment:rl,envmap_pars_fragment:al,envmap_pars_vertex:ol,envmap_physical_pars_fragment:gl,envmap_vertex:sl,fog_vertex:ll,fog_pars_vertex:cl,fog_fragment:dl,fog_pars_fragment:fl,gradientmap_pars_fragment:ul,lightmap_pars_fragment:pl,lights_lambert_fragment:hl,lights_lambert_pars_fragment:ml,lights_pars_begin:_l,lights_toon_fragment:vl,lights_toon_pars_fragment:El,lights_phong_fragment:Sl,lights_phong_pars_fragment:Ml,lights_physical_fragment:Tl,lights_physical_pars_fragment:xl,lights_fragment_begin:Al,lights_fragment_maps:Rl,lights_fragment_end:bl,logdepthbuf_fragment:Cl,logdepthbuf_pars_fragment:wl,logdepthbuf_pars_vertex:Pl,logdepthbuf_vertex:Dl,map_fragment:Ll,map_pars_fragment:yl,map_particle_fragment:Ul,map_particle_pars_fragment:Il,metalnessmap_fragment:Nl,metalnessmap_pars_fragment:Ol,morphinstance_vertex:Fl,morphcolor_vertex:Bl,morphnormal_vertex:Hl,morphtarget_pars_vertex:Gl,morphtarget_vertex:Vl,normal_fragment_begin:kl,normal_fragment_maps:zl,normal_pars_fragment:Wl,normal_pars_vertex:Xl,normal_vertex:Yl,normalmap_pars_fragment:Kl,clearcoat_normal_fragment_begin:ql,clearcoat_normal_fragment_maps:Zl,clearcoat_pars_fragment:$l,iridescence_pars_fragment:jl,opaque_fragment:Ql,packing:Jl,premultiplied_alpha_fragment:ec,project_vertex:tc,dithering_fragment:nc,dithering_pars_fragment:ic,roughnessmap_fragment:rc,roughnessmap_pars_fragment:ac,shadowmap_pars_fragment:oc,shadowmap_pars_vertex:sc,shadowmap_vertex:lc,shadowmask_pars_fragment:cc,skinbase_vertex:dc,skinning_pars_vertex:fc,skinning_vertex:uc,skinnormal_vertex:pc,specularmap_fragment:hc,specularmap_pars_fragment:mc,tonemapping_fragment:_c,tonemapping_pars_fragment:gc,transmission_fragment:vc,transmission_pars_fragment:Ec,uv_pars_fragment:Sc,uv_pars_vertex:Mc,uv_vertex:Tc,worldpos_vertex:xc,background_vert:Ac,background_frag:Rc,backgroundCube_vert:bc,backgroundCube_frag:Cc,cube_vert:wc,cube_frag:Pc,depth_vert:Dc,depth_frag:Lc,distanceRGBA_vert:yc,distanceRGBA_frag:Uc,equirect_vert:Ic,equirect_frag:Nc,linedashed_vert:Oc,linedashed_frag:Fc,meshbasic_vert:Bc,meshbasic_frag:Hc,meshlambert_vert:Gc,meshlambert_frag:Vc,meshmatcap_vert:kc,meshmatcap_frag:zc,meshnormal_vert:Wc,meshnormal_frag:Xc,meshphong_vert:Yc,meshphong_frag:Kc,meshphysical_vert:qc,meshphysical_frag:Zc,meshtoon_vert:$c,meshtoon_frag:jc,points_vert:Qc,points_frag:Jc,shadow_vert:ed,shadow_frag:td,sprite_vert:nd,sprite_frag:id},ae={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},At={basic:{uniforms:mt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:mt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:mt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:mt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:mt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:mt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:mt([ae.points,ae.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:mt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:mt([ae.common,ae.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:mt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:mt([ae.sprite,ae.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:mt([ae.common,ae.displacementmap,{referencePosition:{value:new de},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:mt([ae.lights,ae.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};At.physical={uniforms:mt([At.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const gn={r:0,b:0,g:0},Ut=new Dn,rd=new St;function ad(e,n,t,i,a,r,d){const l=new ze(0);let S=r===!0?0:1,_,x,E=null,g=0,T=null;function N(A){let v=A.isScene===!0?A.background:null;return v&&v.isTexture&&(v=(A.backgroundBlurriness>0?t:n).get(v)),v}function D(A){let v=!1;const U=N(A);U===null?o(l,S):U&&U.isColor&&(o(U,1),v=!0);const R=e.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,d):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,d),(e.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function f(A,v){const U=N(v);U&&(U.isCubeTexture||U.mapping===Nn)?(x===void 0&&(x=new ut(new Ai(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:hr(At.backgroundCube.uniforms),vertexShader:At.backgroundCube.vertexShader,fragmentShader:At.backgroundCube.fragmentShader,side:Mt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),x.geometry.deleteAttribute("normal"),x.geometry.deleteAttribute("uv"),x.onBeforeRender=function(R,P,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(x.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(x)),Ut.copy(v.backgroundRotation),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),x.material.uniforms.envMap.value=U,x.material.uniforms.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,x.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,x.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,x.material.uniforms.backgroundRotation.value.setFromMatrix4(rd.makeRotationFromEuler(Ut)),x.material.toneMapped=at.getTransfer(U.colorSpace)!==$e,(E!==U||g!==U.version||T!==e.toneMapping)&&(x.material.needsUpdate=!0,E=U,g=U.version,T=e.toneMapping),x.layers.enableAll(),A.unshift(x,x.geometry,x.material,0,0,null)):U&&U.isTexture&&(_===void 0&&(_=new ut(new pn(2,2),new Dt({name:"BackgroundMaterial",uniforms:hr(At.background.uniforms),vertexShader:At.background.vertexShader,fragmentShader:At.background.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),_.geometry.deleteAttribute("normal"),Object.defineProperty(_.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(_)),_.material.uniforms.t2D.value=U,_.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,_.material.toneMapped=at.getTransfer(U.colorSpace)!==$e,U.matrixAutoUpdate===!0&&U.updateMatrix(),_.material.uniforms.uvTransform.value.copy(U.matrix),(E!==U||g!==U.version||T!==e.toneMapping)&&(_.material.needsUpdate=!0,E=U,g=U.version,T=e.toneMapping),_.layers.enableAll(),A.unshift(_,_.geometry,_.material,0,0,null))}function o(A,v){A.getRGB(gn,Ma(e)),i.buffers.color.setClear(gn.r,gn.g,gn.b,v,d)}function y(){x!==void 0&&(x.geometry.dispose(),x.material.dispose(),x=void 0),_!==void 0&&(_.geometry.dispose(),_.material.dispose(),_=void 0)}return{getClearColor:function(){return l},setClearColor:function(A,v=1){l.set(A),S=v,o(l,S)},getClearAlpha:function(){return S},setClearAlpha:function(A){S=A,o(l,S)},render:D,addToRenderList:f,dispose:y}}function od(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=g(null);let r=a,d=!1;function l(u,w,H,X,K){let q=!1;const W=E(X,H,w);r!==W&&(r=W,_(r.object)),q=T(u,X,H,K),q&&N(u,X,H,K),K!==null&&n.update(K,e.ELEMENT_ARRAY_BUFFER),(q||d)&&(d=!1,v(u,w,H,X),K!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(K).buffer))}function S(){return e.createVertexArray()}function _(u){return e.bindVertexArray(u)}function x(u){return e.deleteVertexArray(u)}function E(u,w,H){const X=H.wireframe===!0;let K=i[u.id];K===void 0&&(K={},i[u.id]=K);let q=K[w.id];q===void 0&&(q={},K[w.id]=q);let W=q[X];return W===void 0&&(W=g(S()),q[X]=W),W}function g(u){const w=[],H=[],X=[];for(let K=0;K<t;K++)w[K]=0,H[K]=0,X[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:H,attributeDivisors:X,object:u,attributes:{},index:null}}function T(u,w,H,X){const K=r.attributes,q=w.attributes;let W=0;const ie=H.getAttributes();for(const V in ie)if(ie[V].location>=0){const xe=K[V];let Le=q[V];if(Le===void 0&&(V==="instanceMatrix"&&u.instanceMatrix&&(Le=u.instanceMatrix),V==="instanceColor"&&u.instanceColor&&(Le=u.instanceColor)),xe===void 0||xe.attribute!==Le||Le&&xe.data!==Le.data)return!0;W++}return r.attributesNum!==W||r.index!==X}function N(u,w,H,X){const K={},q=w.attributes;let W=0;const ie=H.getAttributes();for(const V in ie)if(ie[V].location>=0){let xe=q[V];xe===void 0&&(V==="instanceMatrix"&&u.instanceMatrix&&(xe=u.instanceMatrix),V==="instanceColor"&&u.instanceColor&&(xe=u.instanceColor));const Le={};Le.attribute=xe,xe&&xe.data&&(Le.data=xe.data),K[V]=Le,W++}r.attributes=K,r.attributesNum=W,r.index=X}function D(){const u=r.newAttributes;for(let w=0,H=u.length;w<H;w++)u[w]=0}function f(u){o(u,0)}function o(u,w){const H=r.newAttributes,X=r.enabledAttributes,K=r.attributeDivisors;H[u]=1,X[u]===0&&(e.enableVertexAttribArray(u),X[u]=1),K[u]!==w&&(e.vertexAttribDivisor(u,w),K[u]=w)}function y(){const u=r.newAttributes,w=r.enabledAttributes;for(let H=0,X=w.length;H<X;H++)w[H]!==u[H]&&(e.disableVertexAttribArray(H),w[H]=0)}function A(u,w,H,X,K,q,W){W===!0?e.vertexAttribIPointer(u,w,H,K,q):e.vertexAttribPointer(u,w,H,X,K,q)}function v(u,w,H,X){D();const K=X.attributes,q=H.getAttributes(),W=w.defaultAttributeValues;for(const ie in q){const V=q[ie];if(V.location>=0){let me=K[ie];if(me===void 0&&(ie==="instanceMatrix"&&u.instanceMatrix&&(me=u.instanceMatrix),ie==="instanceColor"&&u.instanceColor&&(me=u.instanceColor)),me!==void 0){const xe=me.normalized,Le=me.itemSize,Fe=n.get(me);if(Fe===void 0)continue;const Je=Fe.buffer,je=Fe.type,Ve=Fe.bytesPerElement,z=je===e.INT||je===e.UNSIGNED_INT||me.gpuType===_a;if(me.isInterleavedBufferAttribute){const Z=me.data,F=Z.stride,ne=me.offset;if(Z.isInstancedInterleavedBuffer){for(let se=0;se<V.locationSize;se++)o(V.location+se,Z.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let se=0;se<V.locationSize;se++)f(V.location+se);e.bindBuffer(e.ARRAY_BUFFER,Je);for(let se=0;se<V.locationSize;se++)A(V.location+se,Le/V.locationSize,je,xe,F*Ve,(ne+Le/V.locationSize*se)*Ve,z)}else{if(me.isInstancedBufferAttribute){for(let Z=0;Z<V.locationSize;Z++)o(V.location+Z,me.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Z=0;Z<V.locationSize;Z++)f(V.location+Z);e.bindBuffer(e.ARRAY_BUFFER,Je);for(let Z=0;Z<V.locationSize;Z++)A(V.location+Z,Le/V.locationSize,je,xe,Le*Ve,Le/V.locationSize*Z*Ve,z)}}else if(W!==void 0){const xe=W[ie];if(xe!==void 0)switch(xe.length){case 2:e.vertexAttrib2fv(V.location,xe);break;case 3:e.vertexAttrib3fv(V.location,xe);break;case 4:e.vertexAttrib4fv(V.location,xe);break;default:e.vertexAttrib1fv(V.location,xe)}}}}y()}function U(){B();for(const u in i){const w=i[u];for(const H in w){const X=w[H];for(const K in X)x(X[K].object),delete X[K];delete w[H]}delete i[u]}}function R(u){if(i[u.id]===void 0)return;const w=i[u.id];for(const H in w){const X=w[H];for(const K in X)x(X[K].object),delete X[K];delete w[H]}delete i[u.id]}function P(u){for(const w in i){const H=i[w];if(H[u.id]===void 0)continue;const X=H[u.id];for(const K in X)x(X[K].object),delete X[K];delete H[u.id]}}function B(){h(),d=!0,r!==a&&(r=a,_(r.object))}function h(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:l,reset:B,resetDefaultState:h,dispose:U,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:D,enableAttribute:f,disableUnusedAttributes:y}}function sd(e,n,t){let i;function a(_){i=_}function r(_,x){e.drawArrays(i,_,x),t.update(x,i,1)}function d(_,x,E){E!==0&&(e.drawArraysInstanced(i,_,x,E),t.update(x,i,E))}function l(_,x,E){if(E===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,_,0,x,0,E);let T=0;for(let N=0;N<E;N++)T+=x[N];t.update(T,i,1)}function S(_,x,E,g){if(E===0)return;const T=n.get("WEBGL_multi_draw");if(T===null)for(let N=0;N<_.length;N++)d(_[N],x[N],g[N]);else{T.multiDrawArraysInstancedWEBGL(i,_,0,x,0,g,0,E);let N=0;for(let D=0;D<E;D++)N+=x[D]*g[D];t.update(N,i,1)}}this.setMode=a,this.render=r,this.renderInstances=d,this.renderMultiDraw=l,this.renderMultiDrawInstances=S}function ld(e,n,t,i){let a;function r(){if(a!==void 0)return a;if(n.has("EXT_texture_filter_anisotropic")===!0){const P=n.get("EXT_texture_filter_anisotropic");a=e.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function d(P){return!(P!==Ct&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(P){const B=P===Un&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(P!==Gt&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Ft&&!B)}function S(P){if(P==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let _=t.precision!==void 0?t.precision:"highp";const x=S(_);x!==_&&(console.warn("THREE.WebGLRenderer:",_,"not supported, using",x,"instead."),_=x);const E=t.logarithmicDepthBuffer===!0,g=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),T=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),N=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),o=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),A=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),U=N>0,R=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:S,textureFormatReadable:d,textureTypeReadable:l,precision:_,logarithmicDepthBuffer:E,reversedDepthBuffer:g,maxTextures:T,maxVertexTextures:N,maxTextureSize:D,maxCubemapSize:f,maxAttributes:o,maxVertexUniforms:y,maxVaryings:A,maxFragmentUniforms:v,vertexTextures:U,maxSamples:R}}function cd(e){const n=this;let t=null,i=0,a=!1,r=!1;const d=new Ti,l=new Be,S={value:null,needsUpdate:!1};this.uniform=S,this.numPlanes=0,this.numIntersection=0,this.init=function(E,g){const T=E.length!==0||g||i!==0||a;return a=g,i=E.length,T},this.beginShadows=function(){r=!0,x(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(E,g){t=x(E,g,0)},this.setState=function(E,g,T){const N=E.clippingPlanes,D=E.clipIntersection,f=E.clipShadows,o=e.get(E);if(!a||N===null||N.length===0||r&&!f)r?x(null):_();else{const y=r?0:i,A=y*4;let v=o.clippingState||null;S.value=v,v=x(N,g,A,T);for(let U=0;U!==A;++U)v[U]=t[U];o.clippingState=v,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=y}};function _(){S.value!==t&&(S.value=t,S.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function x(E,g,T,N){const D=E!==null?E.length:0;let f=null;if(D!==0){if(f=S.value,N!==!0||f===null){const o=T+D*4,y=g.matrixWorldInverse;l.getNormalMatrix(y),(f===null||f.length<o)&&(f=new Float32Array(o));for(let A=0,v=T;A!==D;++A,v+=4)d.copy(E[A]).applyMatrix4(y,l),d.normal.toArray(f,v),f[v+3]=d.constant}S.value=f,S.needsUpdate=!0}return n.numPlanes=D,n.numIntersection=0,f}}function dd(e){let n=new WeakMap;function t(d,l){return l===mi?d.mapping=fn:l===_i&&(d.mapping=jt),d}function i(d){if(d&&d.isTexture){const l=d.mapping;if(l===mi||l===_i)if(n.has(d)){const S=n.get(d).texture;return t(S,d.mapping)}else{const S=d.image;if(S&&S.height>0){const _=new ko(S.height);return _.fromEquirectangularTexture(e,d),n.set(d,_),d.addEventListener("dispose",a),t(_.texture,d.mapping)}else return null}}return d}function a(d){const l=d.target;l.removeEventListener("dispose",a);const S=n.get(l);S!==void 0&&(n.delete(l),S.dispose())}function r(){n=new WeakMap}return{get:i,dispose:r}}const Kt=4,Tr=[.125,.215,.35,.446,.526,.582],Ot=20,Kn=new xa,xr=new ze;let qn=null,Zn=0,$n=0,jn=!1;const Nt=(1+Math.sqrt(5))/2,kt=1/Nt,Ar=[new de(-Nt,kt,0),new de(Nt,kt,0),new de(-kt,0,Nt),new de(kt,0,Nt),new de(0,Nt,-kt),new de(0,Nt,kt),new de(-1,1,-1),new de(1,1,-1),new de(-1,1,1),new de(1,1,1)],fd=new de;class Rr{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,a=100,r={}){const{size:d=256,position:l=fd}=r;qn=this._renderer.getRenderTarget(),Zn=this._renderer.getActiveCubeFace(),$n=this._renderer.getActiveMipmapLevel(),jn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const S=this._allocateTargets();return S.depthBuffer=!0,this._sceneToCubeUV(n,i,a,S,l),t>0&&this._blur(S,0,0,t),this._applyPMREM(S),this._cleanup(S),S}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(qn,Zn,$n),this._renderer.xr.enabled=jn,n.scissorTest=!1,vn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===fn||n.mapping===jt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),qn=this._renderer.getRenderTarget(),Zn=this._renderer.getActiveCubeFace(),$n=this._renderer.getActiveMipmapLevel(),jn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:Un,format:Ct,colorSpace:In,depthBuffer:!1},a=br(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=br(n,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ud(r)),this._blurMaterial=pd(r,n,t)}return a}_compileMaterial(n){const t=new ut(this._lodPlanes[0],n);this._renderer.compile(t,Kn)}_sceneToCubeUV(n,t,i,a,r){const S=new qt(90,1,t,i),_=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],E=this._renderer,g=E.autoClear,T=E.toneMapping;E.getClearColor(xr),E.toneMapping=wt,E.autoClear=!1,E.state.buffers.depth.getReversed()&&(E.setRenderTarget(a),E.clearDepth(),E.setRenderTarget(null));const D=new Ri({name:"PMREM.Background",side:Mt,depthWrite:!1,depthTest:!1}),f=new ut(new Ai,D);let o=!1;const y=n.background;y?y.isColor&&(D.color.copy(y),n.background=null,o=!0):(D.color.copy(xr),o=!0);for(let A=0;A<6;A++){const v=A%3;v===0?(S.up.set(0,_[A],0),S.position.set(r.x,r.y,r.z),S.lookAt(r.x+x[A],r.y,r.z)):v===1?(S.up.set(0,0,_[A]),S.position.set(r.x,r.y,r.z),S.lookAt(r.x,r.y+x[A],r.z)):(S.up.set(0,_[A],0),S.position.set(r.x,r.y,r.z),S.lookAt(r.x,r.y,r.z+x[A]));const U=this._cubeSize;vn(a,v*U,A>2?U:0,U,U),E.setRenderTarget(a),o&&E.render(f,S),E.render(n,S)}f.geometry.dispose(),f.material.dispose(),E.toneMapping=T,E.autoClear=g,n.background=y}_textureToCubeUV(n,t){const i=this._renderer,a=n.mapping===fn||n.mapping===jt;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=wr()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cr());const r=a?this._cubemapMaterial:this._equirectMaterial,d=new ut(this._lodPlanes[0],r),l=r.uniforms;l.envMap.value=n;const S=this._cubeSize;vn(t,0,0,3*S,2*S),i.setRenderTarget(t),i.render(d,Kn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const d=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=Ar[(a-r-1)%Ar.length];this._blur(n,r-1,r,d,l)}t.autoClear=i}_blur(n,t,i,a,r){const d=this._pingPongRenderTarget;this._halfBlur(n,d,t,i,a,"latitudinal",r),this._halfBlur(d,n,i,i,a,"longitudinal",r)}_halfBlur(n,t,i,a,r,d,l){const S=this._renderer,_=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const x=3,E=new ut(this._lodPlanes[a],_),g=_.uniforms,T=this._sizeLods[i]-1,N=isFinite(r)?Math.PI/(2*T):2*Math.PI/(2*Ot-1),D=r/N,f=isFinite(r)?1+Math.floor(x*D):Ot;f>Ot&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Ot}`);const o=[];let y=0;for(let P=0;P<Ot;++P){const B=P/D,h=Math.exp(-B*B/2);o.push(h),P===0?y+=h:P<f&&(y+=2*h)}for(let P=0;P<o.length;P++)o[P]=o[P]/y;g.envMap.value=n.texture,g.samples.value=f,g.weights.value=o,g.latitudinal.value=d==="latitudinal",l&&(g.poleAxis.value=l);const{_lodMax:A}=this;g.dTheta.value=N,g.mipInt.value=A-i;const v=this._sizeLods[a],U=3*v*(a>A-Kt?a-A+Kt:0),R=4*(this._cubeSize-v);vn(t,U,R,3*v,2*v),S.setRenderTarget(t),S.render(E,Kn)}}function ud(e){const n=[],t=[],i=[];let a=e;const r=e-Kt+1+Tr.length;for(let d=0;d<r;d++){const l=Math.pow(2,a);t.push(l);let S=1/l;d>e-Kt?S=Tr[d-e+Kt-1]:d===0&&(S=0),i.push(S);const _=1/(l-2),x=-_,E=1+_,g=[x,x,E,x,E,E,x,x,E,E,x,E],T=6,N=6,D=3,f=2,o=1,y=new Float32Array(D*N*T),A=new Float32Array(f*N*T),v=new Float32Array(o*N*T);for(let R=0;R<T;R++){const P=R%3*2/3-1,B=R>2?0:-1,h=[P,B,0,P+2/3,B,0,P+2/3,B+1,0,P,B,0,P+2/3,B+1,0,P,B+1,0];y.set(h,D*N*R),A.set(g,f*N*R);const u=[R,R,R,R,R,R];v.set(u,o*N*R)}const U=new xi;U.setAttribute("position",new sn(y,D)),U.setAttribute("uv",new sn(A,f)),U.setAttribute("faceIndex",new sn(v,o)),n.push(U),a>Kt&&a--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function br(e,n,t){const i=new $t(e,n,t);return i.texture.mapping=Nn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vn(e,n,t,i,a){e.viewport.set(n,t,i,a),e.scissor.set(n,t,i,a)}function pd(e,n,t){const i=new Float32Array(Ot),a=new de(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:Ot,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:bi(),fragmentShader:`

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
	`}function hd(e){let n=new WeakMap,t=null;function i(l){if(l&&l.isTexture){const S=l.mapping,_=S===mi||S===_i,x=S===fn||S===jt;if(_||x){let E=n.get(l);const g=E!==void 0?E.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==g)return t===null&&(t=new Rr(e)),E=_?t.fromEquirectangular(l,E):t.fromCubemap(l,E),E.texture.pmremVersion=l.pmremVersion,n.set(l,E),E.texture;if(E!==void 0)return E.texture;{const T=l.image;return _&&T&&T.height>0||x&&T&&a(T)?(t===null&&(t=new Rr(e)),E=_?t.fromEquirectangular(l):t.fromCubemap(l),E.texture.pmremVersion=l.pmremVersion,n.set(l,E),l.addEventListener("dispose",r),E.texture):null}}}return l}function a(l){let S=0;const _=6;for(let x=0;x<_;x++)l[x]!==void 0&&S++;return S===_}function r(l){const S=l.target;S.removeEventListener("dispose",r);const _=n.get(S);_!==void 0&&(n.delete(S),_.dispose())}function d(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:d}}function md(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let a;switch(i){case"WEBGL_depth_texture":a=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=e.getExtension(i)}return n[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&si("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function _d(e,n,t,i){const a={},r=new WeakMap;function d(E){const g=E.target;g.index!==null&&n.remove(g.index);for(const N in g.attributes)n.remove(g.attributes[N]);g.removeEventListener("dispose",d),delete a[g.id];const T=r.get(g);T&&(n.remove(T),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function l(E,g){return a[g.id]===!0||(g.addEventListener("dispose",d),a[g.id]=!0,t.memory.geometries++),g}function S(E){const g=E.attributes;for(const T in g)n.update(g[T],e.ARRAY_BUFFER)}function _(E){const g=[],T=E.index,N=E.attributes.position;let D=0;if(T!==null){const y=T.array;D=T.version;for(let A=0,v=y.length;A<v;A+=3){const U=y[A+0],R=y[A+1],P=y[A+2];g.push(U,R,R,P,P,U)}}else if(N!==void 0){const y=N.array;D=N.version;for(let A=0,v=y.length/3-1;A<v;A+=3){const U=A+0,R=A+1,P=A+2;g.push(U,R,R,P,P,U)}}else return;const f=new(qo(g)?Yo:Ko)(g,1);f.version=D;const o=r.get(E);o&&n.remove(o),r.set(E,f)}function x(E){const g=r.get(E);if(g){const T=E.index;T!==null&&g.version<T.version&&_(E)}else _(E);return r.get(E)}return{get:l,update:S,getWireframeAttribute:x}}function gd(e,n,t){let i;function a(g){i=g}let r,d;function l(g){r=g.type,d=g.bytesPerElement}function S(g,T){e.drawElements(i,T,r,g*d),t.update(T,i,1)}function _(g,T,N){N!==0&&(e.drawElementsInstanced(i,T,r,g*d,N),t.update(T,i,N))}function x(g,T,N){if(N===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,T,0,r,g,0,N);let f=0;for(let o=0;o<N;o++)f+=T[o];t.update(f,i,1)}function E(g,T,N,D){if(N===0)return;const f=n.get("WEBGL_multi_draw");if(f===null)for(let o=0;o<g.length;o++)_(g[o]/d,T[o],D[o]);else{f.multiDrawElementsInstancedWEBGL(i,T,0,r,g,0,D,0,N);let o=0;for(let y=0;y<N;y++)o+=T[y]*D[y];t.update(o,i,1)}}this.setMode=a,this.setIndex=l,this.render=S,this.renderInstances=_,this.renderMultiDraw=x,this.renderMultiDrawInstances=E}function vd(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,d,l){switch(t.calls++,d){case e.TRIANGLES:t.triangles+=l*(r/3);break;case e.LINES:t.lines+=l*(r/2);break;case e.LINE_STRIP:t.lines+=l*(r-1);break;case e.LINE_LOOP:t.lines+=l*r;break;case e.POINTS:t.points+=l*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:a,update:i}}function Ed(e,n,t){const i=new WeakMap,a=new dt;function r(d,l,S){const _=d.morphTargetInfluences,x=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,E=x!==void 0?x.length:0;let g=i.get(l);if(g===void 0||g.count!==E){let h=function(){P.dispose(),i.delete(l),l.removeEventListener("dispose",h)};g!==void 0&&g.texture.dispose();const T=l.morphAttributes.position!==void 0,N=l.morphAttributes.normal!==void 0,D=l.morphAttributes.color!==void 0,f=l.morphAttributes.position||[],o=l.morphAttributes.normal||[],y=l.morphAttributes.color||[];let A=0;T===!0&&(A=1),N===!0&&(A=2),D===!0&&(A=3);let v=l.attributes.position.count*A,U=1;v>n.maxTextureSize&&(U=Math.ceil(v/n.maxTextureSize),v=n.maxTextureSize);const R=new Float32Array(v*U*4*E),P=new Sa(R,v,U,E);P.type=Ft,P.needsUpdate=!0;const B=A*4;for(let u=0;u<E;u++){const w=f[u],H=o[u],X=y[u],K=v*U*4*u;for(let q=0;q<w.count;q++){const W=q*B;T===!0&&(a.fromBufferAttribute(w,q),R[K+W+0]=a.x,R[K+W+1]=a.y,R[K+W+2]=a.z,R[K+W+3]=0),N===!0&&(a.fromBufferAttribute(H,q),R[K+W+4]=a.x,R[K+W+5]=a.y,R[K+W+6]=a.z,R[K+W+7]=0),D===!0&&(a.fromBufferAttribute(X,q),R[K+W+8]=a.x,R[K+W+9]=a.y,R[K+W+10]=a.z,R[K+W+11]=X.itemSize===4?a.w:1)}}g={count:E,texture:P,size:new Xe(v,U)},i.set(l,g),l.addEventListener("dispose",h)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)S.getUniforms().setValue(e,"morphTexture",d.morphTexture,t);else{let T=0;for(let D=0;D<_.length;D++)T+=_[D];const N=l.morphTargetsRelative?1:1-T;S.getUniforms().setValue(e,"morphTargetBaseInfluence",N),S.getUniforms().setValue(e,"morphTargetInfluences",_)}S.getUniforms().setValue(e,"morphTargetsTexture",g.texture,t),S.getUniforms().setValue(e,"morphTargetsTextureSize",g.size)}return{update:r}}function Sd(e,n,t,i){let a=new WeakMap;function r(S){const _=i.render.frame,x=S.geometry,E=n.get(S,x);if(a.get(E)!==_&&(n.update(E),a.set(E,_)),S.isInstancedMesh&&(S.hasEventListener("dispose",l)===!1&&S.addEventListener("dispose",l),a.get(S)!==_&&(t.update(S.instanceMatrix,e.ARRAY_BUFFER),S.instanceColor!==null&&t.update(S.instanceColor,e.ARRAY_BUFFER),a.set(S,_))),S.isSkinnedMesh){const g=S.skeleton;a.get(g)!==_&&(g.update(),a.set(g,_))}return E}function d(){a=new WeakMap}function l(S){const _=S.target;_.removeEventListener("dispose",l),t.remove(_.instanceMatrix),_.instanceColor!==null&&t.remove(_.instanceColor)}return{update:r,dispose:d}}const Pa=new os,Pr=new da(1,1),Da=new Sa,La=new as,ya=new rs,Dr=[],Lr=[],yr=new Float32Array(16),Ur=new Float32Array(9),Ir=new Float32Array(4);function Jt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const a=n*t;let r=Dr[a];if(r===void 0&&(r=new Float32Array(a),Dr[a]=r),n!==0){i.toArray(r,0);for(let d=1,l=0;d!==n;++d)l+=t,e[d].toArray(r,l)}return r}function st(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function lt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function On(e,n){let t=Lr[n];t===void 0&&(t=new Int32Array(n),Lr[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Md(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Td(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2fv(this.addr,n),lt(t,n)}}function xd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(st(t,n))return;e.uniform3fv(this.addr,n),lt(t,n)}}function Ad(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4fv(this.addr,n),lt(t,n)}}function Rd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Ir.set(i),e.uniformMatrix2fv(this.addr,!1,Ir),lt(t,i)}}function bd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;Ur.set(i),e.uniformMatrix3fv(this.addr,!1,Ur),lt(t,i)}}function Cd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;yr.set(i),e.uniformMatrix4fv(this.addr,!1,yr),lt(t,i)}}function wd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Pd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2iv(this.addr,n),lt(t,n)}}function Dd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3iv(this.addr,n),lt(t,n)}}function Ld(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4iv(this.addr,n),lt(t,n)}}function yd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Ud(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2uiv(this.addr,n),lt(t,n)}}function Id(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3uiv(this.addr,n),lt(t,n)}}function Nd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4uiv(this.addr,n),lt(t,n)}}function Od(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let r;this.type===e.SAMPLER_2D_SHADOW?(Pr.compareFunction=fa,r=Pr):r=Pa,t.setTexture2D(n||r,a)}function Fd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(n||La,a)}function Bd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(n||ya,a)}function Hd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(n||Da,a)}function Gd(e){switch(e){case 5126:return Md;case 35664:return Td;case 35665:return xd;case 35666:return Ad;case 35674:return Rd;case 35675:return bd;case 35676:return Cd;case 5124:case 35670:return wd;case 35667:case 35671:return Pd;case 35668:case 35672:return Dd;case 35669:case 35673:return Ld;case 5125:return yd;case 36294:return Ud;case 36295:return Id;case 36296:return Nd;case 35678:case 36198:case 36298:case 36306:case 35682:return Od;case 35679:case 36299:case 36307:return Fd;case 35680:case 36300:case 36308:case 36293:return Bd;case 36289:case 36303:case 36311:case 36292:return Hd}}function Vd(e,n){e.uniform1fv(this.addr,n)}function kd(e,n){const t=Jt(n,this.size,2);e.uniform2fv(this.addr,t)}function zd(e,n){const t=Jt(n,this.size,3);e.uniform3fv(this.addr,t)}function Wd(e,n){const t=Jt(n,this.size,4);e.uniform4fv(this.addr,t)}function Xd(e,n){const t=Jt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Yd(e,n){const t=Jt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function Kd(e,n){const t=Jt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function qd(e,n){e.uniform1iv(this.addr,n)}function Zd(e,n){e.uniform2iv(this.addr,n)}function $d(e,n){e.uniform3iv(this.addr,n)}function jd(e,n){e.uniform4iv(this.addr,n)}function Qd(e,n){e.uniform1uiv(this.addr,n)}function Jd(e,n){e.uniform2uiv(this.addr,n)}function ef(e,n){e.uniform3uiv(this.addr,n)}function tf(e,n){e.uniform4uiv(this.addr,n)}function nf(e,n,t){const i=this.cache,a=n.length,r=On(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let d=0;d!==a;++d)t.setTexture2D(n[d]||Pa,r[d])}function rf(e,n,t){const i=this.cache,a=n.length,r=On(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let d=0;d!==a;++d)t.setTexture3D(n[d]||La,r[d])}function af(e,n,t){const i=this.cache,a=n.length,r=On(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let d=0;d!==a;++d)t.setTextureCube(n[d]||ya,r[d])}function of(e,n,t){const i=this.cache,a=n.length,r=On(t,a);st(i,r)||(e.uniform1iv(this.addr,r),lt(i,r));for(let d=0;d!==a;++d)t.setTexture2DArray(n[d]||Da,r[d])}function sf(e){switch(e){case 5126:return Vd;case 35664:return kd;case 35665:return zd;case 35666:return Wd;case 35674:return Xd;case 35675:return Yd;case 35676:return Kd;case 5124:case 35670:return qd;case 35667:case 35671:return Zd;case 35668:case 35672:return $d;case 35669:case 35673:return jd;case 5125:return Qd;case 36294:return Jd;case 36295:return ef;case 36296:return tf;case 35678:case 36198:case 36298:case 36306:case 35682:return nf;case 35679:case 36299:case 36307:return rf;case 35680:case 36300:case 36308:case 36293:return af;case 36289:case 36303:case 36311:case 36292:return of}}class lf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Gd(t.type)}}class cf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sf(t.type)}}class df{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const a=this.seq;for(let r=0,d=a.length;r!==d;++r){const l=a[r];l.setValue(n,t[l.id],i)}}}const Qn=/(\w+)(\])?(\[|\.)?/g;function Nr(e,n){e.seq.push(n),e.map[n.id]=n}function ff(e,n,t){const i=e.name,a=i.length;for(Qn.lastIndex=0;;){const r=Qn.exec(i),d=Qn.lastIndex;let l=r[1];const S=r[2]==="]",_=r[3];if(S&&(l=l|0),_===void 0||_==="["&&d+2===a){Nr(t,_===void 0?new lf(l,e,n):new cf(l,e,n));break}else{let E=t.map[l];E===void 0&&(E=new df(l),Nr(t,E)),t=E}}}class Rn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const r=n.getActiveUniform(t,a),d=n.getUniformLocation(t,r.name);ff(r,d,this)}}setValue(n,t,i,a){const r=this.map[t];r!==void 0&&r.setValue(n,i,a)}setOptional(n,t,i){const a=t[i];a!==void 0&&this.setValue(n,i,a)}static upload(n,t,i,a){for(let r=0,d=t.length;r!==d;++r){const l=t[r],S=i[l.id];S.needsUpdate!==!1&&l.setValue(n,S.value,a)}}static seqWithValue(n,t){const i=[];for(let a=0,r=n.length;a!==r;++a){const d=n[a];d.id in t&&i.push(d)}return i}}function Or(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const uf=37297;let pf=0;function hf(e,n){const t=e.split(`
`),i=[],a=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let d=a;d<r;d++){const l=d+1;i.push(`${l===n?">":" "} ${l}: ${t[d]}`)}return i.join(`
`)}const Fr=new Be;function mf(e){at._getMatrix(Fr,at.workingColorSpace,e);const n=`mat3( ${Fr.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(e)){case Ta:return[n,"LinearTransferOETF"];case $e:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Br(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const d=/ERROR: 0:(\d+)/.exec(r);if(d){const l=parseInt(d[1]);return t.toUpperCase()+`

`+r+`

`+hf(e.getShaderSource(n),l)}else return r}function _f(e,n){const t=mf(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function gf(e,n){let t;switch(n){case is:t="Linear";break;case ns:t="Reinhard";break;case ts:t="Cineon";break;case es:t="ACESFilmic";break;case Jo:t="AgX";break;case Qo:t="Neutral";break;case jo:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const En=new de;function vf(){at.getLuminanceCoefficients(En);const e=En.x.toFixed(4),n=En.y.toFixed(4),t=En.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ef(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rn).join(`
`)}function Sf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Mf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=e.getActiveAttrib(n,a),d=r.name;let l=1;r.type===e.FLOAT_MAT2&&(l=2),r.type===e.FLOAT_MAT3&&(l=3),r.type===e.FLOAT_MAT4&&(l=4),t[d]={type:r.type,location:e.getAttribLocation(n,d),locationSize:l}}return t}function rn(e){return e!==""}function Hr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Gr(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Tf=/^[ \t]*#include +<([\w\d./]+)>/gm;function gi(e){return e.replace(Tf,Af)}const xf=new Map;function Af(e,n){let t=Ne[n];if(t===void 0){const i=xf.get(n);if(i!==void 0)t=Ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return gi(t)}const Rf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vr(e){return e.replace(Rf,bf)}function bf(e,n,t,i){let a="";for(let r=parseInt(n);r<parseInt(t);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function kr(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}function Cf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===ua?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===$o?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===bt&&(n="SHADOWMAP_TYPE_VSM"),n}function wf(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case fn:case jt:n="ENVMAP_TYPE_CUBE";break;case Nn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Pf(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===jt&&(n="ENVMAP_MODE_REFRACTION"),n}function Df(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case ds:n="ENVMAP_BLENDING_MULTIPLY";break;case cs:n="ENVMAP_BLENDING_MIX";break;case ls:n="ENVMAP_BLENDING_ADD";break}return n}function Lf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function yf(e,n,t,i){const a=e.getContext(),r=t.defines;let d=t.vertexShader,l=t.fragmentShader;const S=Cf(t),_=wf(t),x=Pf(t),E=Df(t),g=Lf(t),T=Ef(t),N=Sf(r),D=a.createProgram();let f,o,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(rn).join(`
`),f.length>0&&(f+=`
`),o=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(rn).join(`
`),o.length>0&&(o+=`
`)):(f=[kr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+x:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+S:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rn).join(`
`),o=[kr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+_:"",t.envMap?"#define "+x:"",t.envMap?"#define "+E:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+S:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wt?"#define TONE_MAPPING":"",t.toneMapping!==wt?Ne.tonemapping_pars_fragment:"",t.toneMapping!==wt?gf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,_f("linearToOutputTexel",t.outputColorSpace),vf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(rn).join(`
`)),d=gi(d),d=Hr(d,t),d=Gr(d,t),l=gi(l),l=Hr(l,t),l=Gr(l,t),d=Vr(d),l=Vr(l),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[T,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,o=["#define varying in",t.glslVersion===_r?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_r?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+o);const A=y+f+d,v=y+o+l,U=Or(a,a.VERTEX_SHADER,A),R=Or(a,a.FRAGMENT_SHADER,v);a.attachShader(D,U),a.attachShader(D,R),t.index0AttributeName!==void 0?a.bindAttribLocation(D,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(D,0,"position"),a.linkProgram(D);function P(w){if(e.debug.checkShaderErrors){const H=a.getProgramInfoLog(D)||"",X=a.getShaderInfoLog(U)||"",K=a.getShaderInfoLog(R)||"",q=H.trim(),W=X.trim(),ie=K.trim();let V=!0,me=!0;if(a.getProgramParameter(D,a.LINK_STATUS)===!1)if(V=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,D,U,R);else{const xe=Br(a,U,"vertex"),Le=Br(a,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(D,a.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+q+`
`+xe+`
`+Le)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(W===""||ie==="")&&(me=!1);me&&(w.diagnostics={runnable:V,programLog:q,vertexShader:{log:W,prefix:f},fragmentShader:{log:ie,prefix:o}})}a.deleteShader(U),a.deleteShader(R),B=new Rn(a,D),h=Mf(a,D)}let B;this.getUniforms=function(){return B===void 0&&P(this),B};let h;this.getAttributes=function(){return h===void 0&&P(this),h};let u=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return u===!1&&(u=a.getProgramParameter(D,uf)),u},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(D),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=pf++,this.cacheKey=n,this.usedTimes=1,this.program=D,this.vertexShader=U,this.fragmentShader=R,this}let Uf=0;class If{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,a=this._getShaderStage(t),r=this._getShaderStage(i),d=this._getShaderCacheForMaterial(n);return d.has(a)===!1&&(d.add(a),a.usedTimes++),d.has(r)===!1&&(d.add(r),r.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Nf(n),t.set(n,i)),i}}class Nf{constructor(n){this.id=Uf++,this.code=n,this.usedTimes=0}}function Of(e,n,t,i,a,r,d){const l=new Zo,S=new If,_=new Set,x=[],E=a.logarithmicDepthBuffer,g=a.vertexTextures;let T=a.precision;const N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function D(h){return _.add(h),h===0?"uv":`uv${h}`}function f(h,u,w,H,X){const K=H.fog,q=X.geometry,W=h.isMeshStandardMaterial?H.environment:null,ie=(h.isMeshStandardMaterial?t:n).get(h.envMap||W),V=ie&&ie.mapping===Nn?ie.image.height:null,me=N[h.type];h.precision!==null&&(T=a.getMaxPrecision(h.precision),T!==h.precision&&console.warn("THREE.WebGLProgram.getParameters:",h.precision,"not supported, using",T,"instead."));const xe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Le=xe!==void 0?xe.length:0;let Fe=0;q.morphAttributes.position!==void 0&&(Fe=1),q.morphAttributes.normal!==void 0&&(Fe=2),q.morphAttributes.color!==void 0&&(Fe=3);let Je,je,Ve,z;if(me){const ke=At[me];Je=ke.vertexShader,je=ke.fragmentShader}else Je=h.vertexShader,je=h.fragmentShader,S.update(h),Ve=S.getVertexShaderID(h),z=S.getFragmentShaderID(h);const Z=e.getRenderTarget(),F=e.state.buffers.depth.getReversed(),ne=X.isInstancedMesh===!0,se=X.isBatchedMesh===!0,Ae=!!h.map,nt=!!h.matcap,m=!!ie,Ge=!!h.aoMap,De=!!h.lightMap,we=!!h.bumpMap,_e=!!h.normalMap,Qe=!!h.displacementMap,ge=!!h.emissiveMap,Ie=!!h.metalnessMap,ct=!!h.roughnessMap,rt=h.anisotropy>0,p=h.clearcoat>0,s=h.dispersion>0,L=h.iridescence>0,k=h.sheen>0,$=h.transmission>0,G=rt&&!!h.anisotropyMap,Me=p&&!!h.clearcoatMap,te=p&&!!h.clearcoatNormalMap,ve=p&&!!h.clearcoatRoughnessMap,Ee=L&&!!h.iridescenceMap,J=L&&!!h.iridescenceThicknessMap,ce=k&&!!h.sheenColorMap,Ce=k&&!!h.sheenRoughnessMap,Se=!!h.specularMap,oe=!!h.specularColorMap,Ue=!!h.specularIntensityMap,M=$&&!!h.transmissionMap,ee=$&&!!h.thicknessMap,re=!!h.gradientMap,ue=!!h.alphaMap,j=h.alphaTest>0,Y=!!h.alphaHash,he=!!h.extensions;let ye=wt;h.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(ye=e.toneMapping);const qe={shaderID:me,shaderType:h.type,shaderName:h.name,vertexShader:Je,fragmentShader:je,defines:h.defines,customVertexShaderID:Ve,customFragmentShaderID:z,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:T,batching:se,batchingColor:se&&X._colorsTexture!==null,instancing:ne,instancingColor:ne&&X.instanceColor!==null,instancingMorph:ne&&X.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:Z===null?e.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:In,alphaToCoverage:!!h.alphaToCoverage,map:Ae,matcap:nt,envMap:m,envMapMode:m&&ie.mapping,envMapCubeUVHeight:V,aoMap:Ge,lightMap:De,bumpMap:we,normalMap:_e,displacementMap:g&&Qe,emissiveMap:ge,normalMapObjectSpace:_e&&h.normalMapType===Xo,normalMapTangentSpace:_e&&h.normalMapType===Wo,metalnessMap:Ie,roughnessMap:ct,anisotropy:rt,anisotropyMap:G,clearcoat:p,clearcoatMap:Me,clearcoatNormalMap:te,clearcoatRoughnessMap:ve,dispersion:s,iridescence:L,iridescenceMap:Ee,iridescenceThicknessMap:J,sheen:k,sheenColorMap:ce,sheenRoughnessMap:Ce,specularMap:Se,specularColorMap:oe,specularIntensityMap:Ue,transmission:$,transmissionMap:M,thicknessMap:ee,gradientMap:re,opaque:h.transparent===!1&&h.blending===An&&h.alphaToCoverage===!1,alphaMap:ue,alphaTest:j,alphaHash:Y,combine:h.combine,mapUv:Ae&&D(h.map.channel),aoMapUv:Ge&&D(h.aoMap.channel),lightMapUv:De&&D(h.lightMap.channel),bumpMapUv:we&&D(h.bumpMap.channel),normalMapUv:_e&&D(h.normalMap.channel),displacementMapUv:Qe&&D(h.displacementMap.channel),emissiveMapUv:ge&&D(h.emissiveMap.channel),metalnessMapUv:Ie&&D(h.metalnessMap.channel),roughnessMapUv:ct&&D(h.roughnessMap.channel),anisotropyMapUv:G&&D(h.anisotropyMap.channel),clearcoatMapUv:Me&&D(h.clearcoatMap.channel),clearcoatNormalMapUv:te&&D(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&D(h.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&D(h.iridescenceMap.channel),iridescenceThicknessMapUv:J&&D(h.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&D(h.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&D(h.sheenRoughnessMap.channel),specularMapUv:Se&&D(h.specularMap.channel),specularColorMapUv:oe&&D(h.specularColorMap.channel),specularIntensityMapUv:Ue&&D(h.specularIntensityMap.channel),transmissionMapUv:M&&D(h.transmissionMap.channel),thicknessMapUv:ee&&D(h.thicknessMap.channel),alphaMapUv:ue&&D(h.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(_e||rt),vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!q.attributes.uv&&(Ae||ue),fog:!!K,useFog:h.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:h.flatShading===!0&&h.wireframe===!1,sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:E,reversedDepthBuffer:F,skinning:X.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:Fe,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numSpotLightMaps:u.spotLightMap.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numSpotLightShadowsWithMaps:u.numSpotLightShadowsWithMaps,numLightProbes:u.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:h.dithering,shadowMapEnabled:e.shadowMap.enabled&&w.length>0,shadowMapType:e.shadowMap.type,toneMapping:ye,decodeVideoTexture:Ae&&h.map.isVideoTexture===!0&&at.getTransfer(h.map.colorSpace)===$e,decodeVideoTextureEmissive:ge&&h.emissiveMap.isVideoTexture===!0&&at.getTransfer(h.emissiveMap.colorSpace)===$e,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===Tt,flipSided:h.side===Mt,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:he&&h.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&h.extensions.multiDraw===!0||se)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return qe.vertexUv1s=_.has(1),qe.vertexUv2s=_.has(2),qe.vertexUv3s=_.has(3),_.clear(),qe}function o(h){const u=[];if(h.shaderID?u.push(h.shaderID):(u.push(h.customVertexShaderID),u.push(h.customFragmentShaderID)),h.defines!==void 0)for(const w in h.defines)u.push(w),u.push(h.defines[w]);return h.isRawShaderMaterial===!1&&(y(u,h),A(u,h),u.push(e.outputColorSpace)),u.push(h.customProgramCacheKey),u.join()}function y(h,u){h.push(u.precision),h.push(u.outputColorSpace),h.push(u.envMapMode),h.push(u.envMapCubeUVHeight),h.push(u.mapUv),h.push(u.alphaMapUv),h.push(u.lightMapUv),h.push(u.aoMapUv),h.push(u.bumpMapUv),h.push(u.normalMapUv),h.push(u.displacementMapUv),h.push(u.emissiveMapUv),h.push(u.metalnessMapUv),h.push(u.roughnessMapUv),h.push(u.anisotropyMapUv),h.push(u.clearcoatMapUv),h.push(u.clearcoatNormalMapUv),h.push(u.clearcoatRoughnessMapUv),h.push(u.iridescenceMapUv),h.push(u.iridescenceThicknessMapUv),h.push(u.sheenColorMapUv),h.push(u.sheenRoughnessMapUv),h.push(u.specularMapUv),h.push(u.specularColorMapUv),h.push(u.specularIntensityMapUv),h.push(u.transmissionMapUv),h.push(u.thicknessMapUv),h.push(u.combine),h.push(u.fogExp2),h.push(u.sizeAttenuation),h.push(u.morphTargetsCount),h.push(u.morphAttributeCount),h.push(u.numDirLights),h.push(u.numPointLights),h.push(u.numSpotLights),h.push(u.numSpotLightMaps),h.push(u.numHemiLights),h.push(u.numRectAreaLights),h.push(u.numDirLightShadows),h.push(u.numPointLightShadows),h.push(u.numSpotLightShadows),h.push(u.numSpotLightShadowsWithMaps),h.push(u.numLightProbes),h.push(u.shadowMapType),h.push(u.toneMapping),h.push(u.numClippingPlanes),h.push(u.numClipIntersection),h.push(u.depthPacking)}function A(h,u){l.disableAll(),u.supportsVertexTextures&&l.enable(0),u.instancing&&l.enable(1),u.instancingColor&&l.enable(2),u.instancingMorph&&l.enable(3),u.matcap&&l.enable(4),u.envMap&&l.enable(5),u.normalMapObjectSpace&&l.enable(6),u.normalMapTangentSpace&&l.enable(7),u.clearcoat&&l.enable(8),u.iridescence&&l.enable(9),u.alphaTest&&l.enable(10),u.vertexColors&&l.enable(11),u.vertexAlphas&&l.enable(12),u.vertexUv1s&&l.enable(13),u.vertexUv2s&&l.enable(14),u.vertexUv3s&&l.enable(15),u.vertexTangents&&l.enable(16),u.anisotropy&&l.enable(17),u.alphaHash&&l.enable(18),u.batching&&l.enable(19),u.dispersion&&l.enable(20),u.batchingColor&&l.enable(21),u.gradientMap&&l.enable(22),h.push(l.mask),l.disableAll(),u.fog&&l.enable(0),u.useFog&&l.enable(1),u.flatShading&&l.enable(2),u.logarithmicDepthBuffer&&l.enable(3),u.reversedDepthBuffer&&l.enable(4),u.skinning&&l.enable(5),u.morphTargets&&l.enable(6),u.morphNormals&&l.enable(7),u.morphColors&&l.enable(8),u.premultipliedAlpha&&l.enable(9),u.shadowMapEnabled&&l.enable(10),u.doubleSided&&l.enable(11),u.flipSided&&l.enable(12),u.useDepthPacking&&l.enable(13),u.dithering&&l.enable(14),u.transmission&&l.enable(15),u.sheen&&l.enable(16),u.opaque&&l.enable(17),u.pointsUvs&&l.enable(18),u.decodeVideoTexture&&l.enable(19),u.decodeVideoTextureEmissive&&l.enable(20),u.alphaToCoverage&&l.enable(21),h.push(l.mask)}function v(h){const u=N[h.type];let w;if(u){const H=At[u];w=zo.clone(H.uniforms)}else w=h.uniforms;return w}function U(h,u){let w;for(let H=0,X=x.length;H<X;H++){const K=x[H];if(K.cacheKey===u){w=K,++w.usedTimes;break}}return w===void 0&&(w=new yf(e,u,h,r),x.push(w)),w}function R(h){if(--h.usedTimes===0){const u=x.indexOf(h);x[u]=x[x.length-1],x.pop(),h.destroy()}}function P(h){S.remove(h)}function B(){S.dispose()}return{getParameters:f,getProgramCacheKey:o,getUniforms:v,acquireProgram:U,releaseProgram:R,releaseShaderCache:P,programs:x,dispose:B}}function Ff(){let e=new WeakMap;function n(d){return e.has(d)}function t(d){let l=e.get(d);return l===void 0&&(l={},e.set(d,l)),l}function i(d){e.delete(d)}function a(d,l,S){e.get(d)[l]=S}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:a,dispose:r}}function Bf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function zr(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function Wr(){const e=[];let n=0;const t=[],i=[],a=[];function r(){n=0,t.length=0,i.length=0,a.length=0}function d(E,g,T,N,D,f){let o=e[n];return o===void 0?(o={id:E.id,object:E,geometry:g,material:T,groupOrder:N,renderOrder:E.renderOrder,z:D,group:f},e[n]=o):(o.id=E.id,o.object=E,o.geometry=g,o.material=T,o.groupOrder=N,o.renderOrder=E.renderOrder,o.z=D,o.group=f),n++,o}function l(E,g,T,N,D,f){const o=d(E,g,T,N,D,f);T.transmission>0?i.push(o):T.transparent===!0?a.push(o):t.push(o)}function S(E,g,T,N,D,f){const o=d(E,g,T,N,D,f);T.transmission>0?i.unshift(o):T.transparent===!0?a.unshift(o):t.unshift(o)}function _(E,g){t.length>1&&t.sort(E||Bf),i.length>1&&i.sort(g||zr),a.length>1&&a.sort(g||zr)}function x(){for(let E=n,g=e.length;E<g;E++){const T=e[E];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:t,transmissive:i,transparent:a,init:r,push:l,unshift:S,finish:x,sort:_}}function Hf(){let e=new WeakMap;function n(i,a){const r=e.get(i);let d;return r===void 0?(d=new Wr,e.set(i,[d])):a>=r.length?(d=new Wr,r.push(d)):d=r[a],d}function t(){e=new WeakMap}return{get:n,dispose:t}}function Gf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new de,color:new ze};break;case"SpotLight":t={position:new de,direction:new de,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new de,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new de,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new de,halfWidth:new de,halfHeight:new de};break}return e[n.id]=t,t}}}function Vf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let kf=0;function zf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Wf(e){const n=new Gf,t=Vf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let _=0;_<9;_++)i.probe.push(new de);const a=new de,r=new St,d=new St;function l(_){let x=0,E=0,g=0;for(let h=0;h<9;h++)i.probe[h].set(0,0,0);let T=0,N=0,D=0,f=0,o=0,y=0,A=0,v=0,U=0,R=0,P=0;_.sort(zf);for(let h=0,u=_.length;h<u;h++){const w=_[h],H=w.color,X=w.intensity,K=w.distance,q=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)x+=H.r*X,E+=H.g*X,g+=H.b*X;else if(w.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(w.sh.coefficients[W],X);P++}else if(w.isDirectionalLight){const W=n.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const ie=w.shadow,V=t.get(w);V.shadowIntensity=ie.intensity,V.shadowBias=ie.bias,V.shadowNormalBias=ie.normalBias,V.shadowRadius=ie.radius,V.shadowMapSize=ie.mapSize,i.directionalShadow[T]=V,i.directionalShadowMap[T]=q,i.directionalShadowMatrix[T]=w.shadow.matrix,y++}i.directional[T]=W,T++}else if(w.isSpotLight){const W=n.get(w);W.position.setFromMatrixPosition(w.matrixWorld),W.color.copy(H).multiplyScalar(X),W.distance=K,W.coneCos=Math.cos(w.angle),W.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),W.decay=w.decay,i.spot[D]=W;const ie=w.shadow;if(w.map&&(i.spotLightMap[U]=w.map,U++,ie.updateMatrices(w),w.castShadow&&R++),i.spotLightMatrix[D]=ie.matrix,w.castShadow){const V=t.get(w);V.shadowIntensity=ie.intensity,V.shadowBias=ie.bias,V.shadowNormalBias=ie.normalBias,V.shadowRadius=ie.radius,V.shadowMapSize=ie.mapSize,i.spotShadow[D]=V,i.spotShadowMap[D]=q,v++}D++}else if(w.isRectAreaLight){const W=n.get(w);W.color.copy(H).multiplyScalar(X),W.halfWidth.set(w.width*.5,0,0),W.halfHeight.set(0,w.height*.5,0),i.rectArea[f]=W,f++}else if(w.isPointLight){const W=n.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),W.distance=w.distance,W.decay=w.decay,w.castShadow){const ie=w.shadow,V=t.get(w);V.shadowIntensity=ie.intensity,V.shadowBias=ie.bias,V.shadowNormalBias=ie.normalBias,V.shadowRadius=ie.radius,V.shadowMapSize=ie.mapSize,V.shadowCameraNear=ie.camera.near,V.shadowCameraFar=ie.camera.far,i.pointShadow[N]=V,i.pointShadowMap[N]=q,i.pointShadowMatrix[N]=w.shadow.matrix,A++}i.point[N]=W,N++}else if(w.isHemisphereLight){const W=n.get(w);W.skyColor.copy(w.color).multiplyScalar(X),W.groundColor.copy(w.groundColor).multiplyScalar(X),i.hemi[o]=W,o++}}f>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=x,i.ambient[1]=E,i.ambient[2]=g;const B=i.hash;(B.directionalLength!==T||B.pointLength!==N||B.spotLength!==D||B.rectAreaLength!==f||B.hemiLength!==o||B.numDirectionalShadows!==y||B.numPointShadows!==A||B.numSpotShadows!==v||B.numSpotMaps!==U||B.numLightProbes!==P)&&(i.directional.length=T,i.spot.length=D,i.rectArea.length=f,i.point.length=N,i.hemi.length=o,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=v+U-R,i.spotLightMap.length=U,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,B.directionalLength=T,B.pointLength=N,B.spotLength=D,B.rectAreaLength=f,B.hemiLength=o,B.numDirectionalShadows=y,B.numPointShadows=A,B.numSpotShadows=v,B.numSpotMaps=U,B.numLightProbes=P,i.version=kf++)}function S(_,x){let E=0,g=0,T=0,N=0,D=0;const f=x.matrixWorldInverse;for(let o=0,y=_.length;o<y;o++){const A=_[o];if(A.isDirectionalLight){const v=i.directional[E];v.direction.setFromMatrixPosition(A.matrixWorld),a.setFromMatrixPosition(A.target.matrixWorld),v.direction.sub(a),v.direction.transformDirection(f),E++}else if(A.isSpotLight){const v=i.spot[T];v.position.setFromMatrixPosition(A.matrixWorld),v.position.applyMatrix4(f),v.direction.setFromMatrixPosition(A.matrixWorld),a.setFromMatrixPosition(A.target.matrixWorld),v.direction.sub(a),v.direction.transformDirection(f),T++}else if(A.isRectAreaLight){const v=i.rectArea[N];v.position.setFromMatrixPosition(A.matrixWorld),v.position.applyMatrix4(f),d.identity(),r.copy(A.matrixWorld),r.premultiply(f),d.extractRotation(r),v.halfWidth.set(A.width*.5,0,0),v.halfHeight.set(0,A.height*.5,0),v.halfWidth.applyMatrix4(d),v.halfHeight.applyMatrix4(d),N++}else if(A.isPointLight){const v=i.point[g];v.position.setFromMatrixPosition(A.matrixWorld),v.position.applyMatrix4(f),g++}else if(A.isHemisphereLight){const v=i.hemi[D];v.direction.setFromMatrixPosition(A.matrixWorld),v.direction.transformDirection(f),D++}}}return{setup:l,setupView:S,state:i}}function Xr(e){const n=new Wf(e),t=[],i=[];function a(x){_.camera=x,t.length=0,i.length=0}function r(x){t.push(x)}function d(x){i.push(x)}function l(){n.setup(t)}function S(x){n.setupView(t,x)}const _={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:a,state:_,setupLights:l,setupLightsView:S,pushLight:r,pushShadow:d}}function Xf(e){let n=new WeakMap;function t(a,r=0){const d=n.get(a);let l;return d===void 0?(l=new Xr(e),n.set(a,[l])):r>=d.length?(l=new Xr(e),d.push(l)):l=d[r],l}function i(){n=new WeakMap}return{get:t,dispose:i}}const Yf=`void main() {
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
}`;function qf(e,n,t){let i=new ca;const a=new Xe,r=new Xe,d=new dt,l=new wo({depthPacking:Po}),S=new Do,_={},x=t.maxTextureSize,E={[ln]:Mt,[Mt]:ln,[Tt]:Tt},g=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:Yf,fragmentShader:Kf}),T=g.clone();T.defines.HORIZONTAL_PASS=1;const N=new xi;N.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new ut(N,g),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ua;let o=this.type;this.render=function(R,P,B){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||R.length===0)return;const h=e.getRenderTarget(),u=e.getActiveCubeFace(),w=e.getActiveMipmapLevel(),H=e.state;H.setBlending(Bt),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const X=o!==bt&&this.type===bt,K=o===bt&&this.type!==bt;for(let q=0,W=R.length;q<W;q++){const ie=R[q],V=ie.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const me=V.getFrameExtents();if(a.multiply(me),r.copy(V.mapSize),(a.x>x||a.y>x)&&(a.x>x&&(r.x=Math.floor(x/me.x),a.x=r.x*me.x,V.mapSize.x=r.x),a.y>x&&(r.y=Math.floor(x/me.y),a.y=r.y*me.y,V.mapSize.y=r.y)),V.map===null||X===!0||K===!0){const Le=this.type!==bt?{minFilter:on,magFilter:on}:{};V.map!==null&&V.map.dispose(),V.map=new $t(a.x,a.y,Le),V.map.texture.name=ie.name+".shadowMap",V.camera.updateProjectionMatrix()}e.setRenderTarget(V.map),e.clear();const xe=V.getViewportCount();for(let Le=0;Le<xe;Le++){const Fe=V.getViewport(Le);d.set(r.x*Fe.x,r.y*Fe.y,r.x*Fe.z,r.y*Fe.w),H.viewport(d),V.updateMatrices(ie,Le),i=V.getFrustum(),v(P,B,V.camera,ie,this.type)}V.isPointLightShadow!==!0&&this.type===bt&&y(V,B),V.needsUpdate=!1}o=this.type,f.needsUpdate=!1,e.setRenderTarget(h,u,w)};function y(R,P){const B=n.update(D);g.defines.VSM_SAMPLES!==R.blurSamples&&(g.defines.VSM_SAMPLES=R.blurSamples,T.defines.VSM_SAMPLES=R.blurSamples,g.needsUpdate=!0,T.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new $t(a.x,a.y)),g.uniforms.shadow_pass.value=R.map.texture,g.uniforms.resolution.value=R.mapSize,g.uniforms.radius.value=R.radius,e.setRenderTarget(R.mapPass),e.clear(),e.renderBufferDirect(P,null,B,g,D,null),T.uniforms.shadow_pass.value=R.mapPass.texture,T.uniforms.resolution.value=R.mapSize,T.uniforms.radius.value=R.radius,e.setRenderTarget(R.map),e.clear(),e.renderBufferDirect(P,null,B,T,D,null)}function A(R,P,B,h){let u=null;const w=B.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(w!==void 0)u=w;else if(u=B.isPointLight===!0?S:l,e.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const H=u.uuid,X=P.uuid;let K=_[H];K===void 0&&(K={},_[H]=K);let q=K[X];q===void 0&&(q=u.clone(),K[X]=q,P.addEventListener("dispose",U)),u=q}if(u.visible=P.visible,u.wireframe=P.wireframe,h===bt?u.side=P.shadowSide!==null?P.shadowSide:P.side:u.side=P.shadowSide!==null?P.shadowSide:E[P.side],u.alphaMap=P.alphaMap,u.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,u.map=P.map,u.clipShadows=P.clipShadows,u.clippingPlanes=P.clippingPlanes,u.clipIntersection=P.clipIntersection,u.displacementMap=P.displacementMap,u.displacementScale=P.displacementScale,u.displacementBias=P.displacementBias,u.wireframeLinewidth=P.wireframeLinewidth,u.linewidth=P.linewidth,B.isPointLight===!0&&u.isMeshDistanceMaterial===!0){const H=e.properties.get(u);H.light=B}return u}function v(R,P,B,h,u){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&u===bt)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,R.matrixWorld);const X=n.update(R),K=R.material;if(Array.isArray(K)){const q=X.groups;for(let W=0,ie=q.length;W<ie;W++){const V=q[W],me=K[V.materialIndex];if(me&&me.visible){const xe=A(R,me,h,u);R.onBeforeShadow(e,R,P,B,X,xe,V),e.renderBufferDirect(B,null,X,xe,R,V),R.onAfterShadow(e,R,P,B,X,xe,V)}}}else if(K.visible){const q=A(R,K,h,u);R.onBeforeShadow(e,R,P,B,X,q,null),e.renderBufferDirect(B,null,X,q,R,null),R.onAfterShadow(e,R,P,B,X,q,null)}}const H=R.children;for(let X=0,K=H.length;X<K;X++)v(H[X],P,B,h,u)}function U(R){R.target.removeEventListener("dispose",U);for(const B in _){const h=_[B],u=R.target.uuid;u in h&&(h[u].dispose(),delete h[u])}}}const Zf={[hi]:pi,[ui]:ci,[fi]:li,[wn]:di,[pi]:hi,[ci]:ui,[li]:fi,[di]:wn};function $f(e,n){function t(){let M=!1;const ee=new dt;let re=null;const ue=new dt(0,0,0,0);return{setMask:function(j){re!==j&&!M&&(e.colorMask(j,j,j,j),re=j)},setLocked:function(j){M=j},setClear:function(j,Y,he,ye,qe){qe===!0&&(j*=ye,Y*=ye,he*=ye),ee.set(j,Y,he,ye),ue.equals(ee)===!1&&(e.clearColor(j,Y,he,ye),ue.copy(ee))},reset:function(){M=!1,re=null,ue.set(-1,0,0,0)}}}function i(){let M=!1,ee=!1,re=null,ue=null,j=null;return{setReversed:function(Y){if(ee!==Y){const he=n.get("EXT_clip_control");Y?he.clipControlEXT(he.LOWER_LEFT_EXT,he.ZERO_TO_ONE_EXT):he.clipControlEXT(he.LOWER_LEFT_EXT,he.NEGATIVE_ONE_TO_ONE_EXT),ee=Y;const ye=j;j=null,this.setClear(ye)}},getReversed:function(){return ee},setTest:function(Y){Y?Z(e.DEPTH_TEST):F(e.DEPTH_TEST)},setMask:function(Y){re!==Y&&!M&&(e.depthMask(Y),re=Y)},setFunc:function(Y){if(ee&&(Y=Zf[Y]),ue!==Y){switch(Y){case hi:e.depthFunc(e.NEVER);break;case pi:e.depthFunc(e.ALWAYS);break;case ui:e.depthFunc(e.LESS);break;case wn:e.depthFunc(e.LEQUAL);break;case fi:e.depthFunc(e.EQUAL);break;case di:e.depthFunc(e.GEQUAL);break;case ci:e.depthFunc(e.GREATER);break;case li:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ue=Y}},setLocked:function(Y){M=Y},setClear:function(Y){j!==Y&&(ee&&(Y=1-Y),e.clearDepth(Y),j=Y)},reset:function(){M=!1,re=null,ue=null,j=null,ee=!1}}}function a(){let M=!1,ee=null,re=null,ue=null,j=null,Y=null,he=null,ye=null,qe=null;return{setTest:function(ke){M||(ke?Z(e.STENCIL_TEST):F(e.STENCIL_TEST))},setMask:function(ke){ee!==ke&&!M&&(e.stencilMask(ke),ee=ke)},setFunc:function(ke,Rt,xt){(re!==ke||ue!==Rt||j!==xt)&&(e.stencilFunc(ke,Rt,xt),re=ke,ue=Rt,j=xt)},setOp:function(ke,Rt,xt){(Y!==ke||he!==Rt||ye!==xt)&&(e.stencilOp(ke,Rt,xt),Y=ke,he=Rt,ye=xt)},setLocked:function(ke){M=ke},setClear:function(ke){qe!==ke&&(e.clearStencil(ke),qe=ke)},reset:function(){M=!1,ee=null,re=null,ue=null,j=null,Y=null,he=null,ye=null,qe=null}}}const r=new t,d=new i,l=new a,S=new WeakMap,_=new WeakMap;let x={},E={},g=new WeakMap,T=[],N=null,D=!1,f=null,o=null,y=null,A=null,v=null,U=null,R=null,P=new ze(0,0,0),B=0,h=!1,u=null,w=null,H=null,X=null,K=null;const q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ie=0;const V=e.getParameter(e.VERSION);V.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=ie>=1):V.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=ie>=2);let me=null,xe={};const Le=e.getParameter(e.SCISSOR_BOX),Fe=e.getParameter(e.VIEWPORT),Je=new dt().fromArray(Le),je=new dt().fromArray(Fe);function Ve(M,ee,re,ue){const j=new Uint8Array(4),Y=e.createTexture();e.bindTexture(M,Y),e.texParameteri(M,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(M,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let he=0;he<re;he++)M===e.TEXTURE_3D||M===e.TEXTURE_2D_ARRAY?e.texImage3D(ee,0,e.RGBA,1,1,ue,0,e.RGBA,e.UNSIGNED_BYTE,j):e.texImage2D(ee+he,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,j);return Y}const z={};z[e.TEXTURE_2D]=Ve(e.TEXTURE_2D,e.TEXTURE_2D,1),z[e.TEXTURE_CUBE_MAP]=Ve(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[e.TEXTURE_2D_ARRAY]=Ve(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),z[e.TEXTURE_3D]=Ve(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),d.setClear(1),l.setClear(0),Z(e.DEPTH_TEST),d.setFunc(wn),we(!1),_e(dr),Z(e.CULL_FACE),Ge(Bt);function Z(M){x[M]!==!0&&(e.enable(M),x[M]=!0)}function F(M){x[M]!==!1&&(e.disable(M),x[M]=!1)}function ne(M,ee){return E[M]!==ee?(e.bindFramebuffer(M,ee),E[M]=ee,M===e.DRAW_FRAMEBUFFER&&(E[e.FRAMEBUFFER]=ee),M===e.FRAMEBUFFER&&(E[e.DRAW_FRAMEBUFFER]=ee),!0):!1}function se(M,ee){let re=T,ue=!1;if(M){re=g.get(ee),re===void 0&&(re=[],g.set(ee,re));const j=M.textures;if(re.length!==j.length||re[0]!==e.COLOR_ATTACHMENT0){for(let Y=0,he=j.length;Y<he;Y++)re[Y]=e.COLOR_ATTACHMENT0+Y;re.length=j.length,ue=!0}}else re[0]!==e.BACK&&(re[0]=e.BACK,ue=!0);ue&&e.drawBuffers(re)}function Ae(M){return N!==M?(e.useProgram(M),N=M,!0):!1}const nt={[tn]:e.FUNC_ADD,[eo]:e.FUNC_SUBTRACT,[Ja]:e.FUNC_REVERSE_SUBTRACT};nt[fs]=e.MIN,nt[us]=e.MAX;const m={[_o]:e.ZERO,[mo]:e.ONE,[ho]:e.SRC_COLOR,[po]:e.SRC_ALPHA,[uo]:e.SRC_ALPHA_SATURATE,[fo]:e.DST_COLOR,[co]:e.DST_ALPHA,[lo]:e.ONE_MINUS_SRC_COLOR,[so]:e.ONE_MINUS_SRC_ALPHA,[oo]:e.ONE_MINUS_DST_COLOR,[ao]:e.ONE_MINUS_DST_ALPHA,[ro]:e.CONSTANT_COLOR,[io]:e.ONE_MINUS_CONSTANT_COLOR,[no]:e.CONSTANT_ALPHA,[to]:e.ONE_MINUS_CONSTANT_ALPHA};function Ge(M,ee,re,ue,j,Y,he,ye,qe,ke){if(M===Bt){D===!0&&(F(e.BLEND),D=!1);return}if(D===!1&&(Z(e.BLEND),D=!0),M!==Vo){if(M!==f||ke!==h){if((o!==tn||v!==tn)&&(e.blendEquation(e.FUNC_ADD),o=tn,v=tn),ke)switch(M){case An:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case pr:e.blendFunc(e.ONE,e.ONE);break;case ur:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case fr:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}else switch(M){case An:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case pr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case ur:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fr:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}y=null,A=null,U=null,R=null,P.set(0,0,0),B=0,f=M,h=ke}return}j=j||ee,Y=Y||re,he=he||ue,(ee!==o||j!==v)&&(e.blendEquationSeparate(nt[ee],nt[j]),o=ee,v=j),(re!==y||ue!==A||Y!==U||he!==R)&&(e.blendFuncSeparate(m[re],m[ue],m[Y],m[he]),y=re,A=ue,U=Y,R=he),(ye.equals(P)===!1||qe!==B)&&(e.blendColor(ye.r,ye.g,ye.b,qe),P.copy(ye),B=qe),f=M,h=!1}function De(M,ee){M.side===Tt?F(e.CULL_FACE):Z(e.CULL_FACE);let re=M.side===Mt;ee&&(re=!re),we(re),M.blending===An&&M.transparent===!1?Ge(Bt):Ge(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),d.setFunc(M.depthFunc),d.setTest(M.depthTest),d.setMask(M.depthWrite),r.setMask(M.colorWrite);const ue=M.stencilWrite;l.setTest(ue),ue&&(l.setMask(M.stencilWriteMask),l.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),l.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),ge(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?Z(e.SAMPLE_ALPHA_TO_COVERAGE):F(e.SAMPLE_ALPHA_TO_COVERAGE)}function we(M){u!==M&&(M?e.frontFace(e.CW):e.frontFace(e.CCW),u=M)}function _e(M){M!==Ho?(Z(e.CULL_FACE),M!==w&&(M===dr?e.cullFace(e.BACK):M===Go?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):F(e.CULL_FACE),w=M}function Qe(M){M!==H&&(W&&e.lineWidth(M),H=M)}function ge(M,ee,re){M?(Z(e.POLYGON_OFFSET_FILL),(X!==ee||K!==re)&&(e.polygonOffset(ee,re),X=ee,K=re)):F(e.POLYGON_OFFSET_FILL)}function Ie(M){M?Z(e.SCISSOR_TEST):F(e.SCISSOR_TEST)}function ct(M){M===void 0&&(M=e.TEXTURE0+q-1),me!==M&&(e.activeTexture(M),me=M)}function rt(M,ee,re){re===void 0&&(me===null?re=e.TEXTURE0+q-1:re=me);let ue=xe[re];ue===void 0&&(ue={type:void 0,texture:void 0},xe[re]=ue),(ue.type!==M||ue.texture!==ee)&&(me!==re&&(e.activeTexture(re),me=re),e.bindTexture(M,ee||z[M]),ue.type=M,ue.texture=ee)}function p(){const M=xe[me];M!==void 0&&M.type!==void 0&&(e.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)}function s(){try{e.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function L(){try{e.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function k(){try{e.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function $(){try{e.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function G(){try{e.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function te(){try{e.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function ve(){try{e.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Ee(){try{e.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function J(){try{e.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function ce(M){Je.equals(M)===!1&&(e.scissor(M.x,M.y,M.z,M.w),Je.copy(M))}function Ce(M){je.equals(M)===!1&&(e.viewport(M.x,M.y,M.z,M.w),je.copy(M))}function Se(M,ee){let re=_.get(ee);re===void 0&&(re=new WeakMap,_.set(ee,re));let ue=re.get(M);ue===void 0&&(ue=e.getUniformBlockIndex(ee,M.name),re.set(M,ue))}function oe(M,ee){const ue=_.get(ee).get(M);S.get(ee)!==ue&&(e.uniformBlockBinding(ee,ue,M.__bindingPointIndex),S.set(ee,ue))}function Ue(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),d.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),x={},me=null,xe={},E={},g=new WeakMap,T=[],N=null,D=!1,f=null,o=null,y=null,A=null,v=null,U=null,R=null,P=new ze(0,0,0),B=0,h=!1,u=null,w=null,H=null,X=null,K=null,Je.set(0,0,e.canvas.width,e.canvas.height),je.set(0,0,e.canvas.width,e.canvas.height),r.reset(),d.reset(),l.reset()}return{buffers:{color:r,depth:d,stencil:l},enable:Z,disable:F,bindFramebuffer:ne,drawBuffers:se,useProgram:Ae,setBlending:Ge,setMaterial:De,setFlipSided:we,setCullFace:_e,setLineWidth:Qe,setPolygonOffset:ge,setScissorTest:Ie,activeTexture:ct,bindTexture:rt,unbindTexture:p,compressedTexImage2D:s,compressedTexImage3D:L,texImage2D:Ee,texImage3D:J,updateUBOMapping:Se,uniformBlockBinding:oe,texStorage2D:te,texStorage3D:ve,texSubImage2D:k,texSubImage3D:$,compressedTexSubImage2D:G,compressedTexSubImage3D:Me,scissor:ce,viewport:Ce,reset:Ue}}function jf(e,n,t,i,a,r,d){const l=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,S=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new Xe,x=new WeakMap;let E;const g=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(p,s){return T?new OffscreenCanvas(p,s):ss("canvas")}function D(p,s,L){let k=1;const $=rt(p);if(($.width>L||$.height>L)&&(k=L/Math.max($.width,$.height)),k<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){const G=Math.floor(k*$.width),Me=Math.floor(k*$.height);E===void 0&&(E=N(G,Me));const te=s?N(G,Me):E;return te.width=G,te.height=Me,te.getContext("2d").drawImage(p,0,0,G,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+G+"x"+Me+")."),te}else return"data"in p&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),p;return p}function f(p){return p.generateMipmaps}function o(p){e.generateMipmap(p)}function y(p){return p.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?e.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function A(p,s,L,k,$=!1){if(p!==null){if(e[p]!==void 0)return e[p];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let G=s;if(s===e.RED&&(L===e.FLOAT&&(G=e.R32F),L===e.HALF_FLOAT&&(G=e.R16F),L===e.UNSIGNED_BYTE&&(G=e.R8)),s===e.RED_INTEGER&&(L===e.UNSIGNED_BYTE&&(G=e.R8UI),L===e.UNSIGNED_SHORT&&(G=e.R16UI),L===e.UNSIGNED_INT&&(G=e.R32UI),L===e.BYTE&&(G=e.R8I),L===e.SHORT&&(G=e.R16I),L===e.INT&&(G=e.R32I)),s===e.RG&&(L===e.FLOAT&&(G=e.RG32F),L===e.HALF_FLOAT&&(G=e.RG16F),L===e.UNSIGNED_BYTE&&(G=e.RG8)),s===e.RG_INTEGER&&(L===e.UNSIGNED_BYTE&&(G=e.RG8UI),L===e.UNSIGNED_SHORT&&(G=e.RG16UI),L===e.UNSIGNED_INT&&(G=e.RG32UI),L===e.BYTE&&(G=e.RG8I),L===e.SHORT&&(G=e.RG16I),L===e.INT&&(G=e.RG32I)),s===e.RGB_INTEGER&&(L===e.UNSIGNED_BYTE&&(G=e.RGB8UI),L===e.UNSIGNED_SHORT&&(G=e.RGB16UI),L===e.UNSIGNED_INT&&(G=e.RGB32UI),L===e.BYTE&&(G=e.RGB8I),L===e.SHORT&&(G=e.RGB16I),L===e.INT&&(G=e.RGB32I)),s===e.RGBA_INTEGER&&(L===e.UNSIGNED_BYTE&&(G=e.RGBA8UI),L===e.UNSIGNED_SHORT&&(G=e.RGBA16UI),L===e.UNSIGNED_INT&&(G=e.RGBA32UI),L===e.BYTE&&(G=e.RGBA8I),L===e.SHORT&&(G=e.RGBA16I),L===e.INT&&(G=e.RGBA32I)),s===e.RGB&&(L===e.UNSIGNED_INT_5_9_9_9_REV&&(G=e.RGB9_E5),L===e.UNSIGNED_INT_10F_11F_11F_REV&&(G=e.R11F_G11F_B10F)),s===e.RGBA){const Me=$?Ta:at.getTransfer(k);L===e.FLOAT&&(G=e.RGBA32F),L===e.HALF_FLOAT&&(G=e.RGBA16F),L===e.UNSIGNED_BYTE&&(G=Me===$e?e.SRGB8_ALPHA8:e.RGBA8),L===e.UNSIGNED_SHORT_4_4_4_4&&(G=e.RGBA4),L===e.UNSIGNED_SHORT_5_5_5_1&&(G=e.RGB5_A1)}return(G===e.R16F||G===e.R32F||G===e.RG16F||G===e.RG32F||G===e.RGBA16F||G===e.RGBA32F)&&n.get("EXT_color_buffer_float"),G}function v(p,s){let L;return p?s===null||s===dn||s===cn?L=e.DEPTH24_STENCIL8:s===Ft?L=e.DEPTH32F_STENCIL8:s===Pn&&(L=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):s===null||s===dn||s===cn?L=e.DEPTH_COMPONENT24:s===Ft?L=e.DEPTH_COMPONENT32F:s===Pn&&(L=e.DEPTH_COMPONENT16),L}function U(p,s){return f(p)===!0||p.isFramebufferTexture&&p.minFilter!==on&&p.minFilter!==Xt?Math.log2(Math.max(s.width,s.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?s.mipmaps.length:1}function R(p){const s=p.target;s.removeEventListener("dispose",R),B(s),s.isVideoTexture&&x.delete(s)}function P(p){const s=p.target;s.removeEventListener("dispose",P),u(s)}function B(p){const s=i.get(p);if(s.__webglInit===void 0)return;const L=p.source,k=g.get(L);if(k){const $=k[s.__cacheKey];$.usedTimes--,$.usedTimes===0&&h(p),Object.keys(k).length===0&&g.delete(L)}i.remove(p)}function h(p){const s=i.get(p);e.deleteTexture(s.__webglTexture);const L=p.source,k=g.get(L);delete k[s.__cacheKey],d.memory.textures--}function u(p){const s=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(s.__webglFramebuffer[k]))for(let $=0;$<s.__webglFramebuffer[k].length;$++)e.deleteFramebuffer(s.__webglFramebuffer[k][$]);else e.deleteFramebuffer(s.__webglFramebuffer[k]);s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer[k])}else{if(Array.isArray(s.__webglFramebuffer))for(let k=0;k<s.__webglFramebuffer.length;k++)e.deleteFramebuffer(s.__webglFramebuffer[k]);else e.deleteFramebuffer(s.__webglFramebuffer);if(s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer),s.__webglMultisampledFramebuffer&&e.deleteFramebuffer(s.__webglMultisampledFramebuffer),s.__webglColorRenderbuffer)for(let k=0;k<s.__webglColorRenderbuffer.length;k++)s.__webglColorRenderbuffer[k]&&e.deleteRenderbuffer(s.__webglColorRenderbuffer[k]);s.__webglDepthRenderbuffer&&e.deleteRenderbuffer(s.__webglDepthRenderbuffer)}const L=p.textures;for(let k=0,$=L.length;k<$;k++){const G=i.get(L[k]);G.__webglTexture&&(e.deleteTexture(G.__webglTexture),d.memory.textures--),i.remove(L[k])}i.remove(p)}let w=0;function H(){w=0}function X(){const p=w;return p>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+p+" texture units while this GPU supports only "+a.maxTextures),w+=1,p}function K(p){const s=[];return s.push(p.wrapS),s.push(p.wrapT),s.push(p.wrapR||0),s.push(p.magFilter),s.push(p.minFilter),s.push(p.anisotropy),s.push(p.internalFormat),s.push(p.format),s.push(p.type),s.push(p.generateMipmaps),s.push(p.premultiplyAlpha),s.push(p.flipY),s.push(p.unpackAlignment),s.push(p.colorSpace),s.join()}function q(p,s){const L=i.get(p);if(p.isVideoTexture&&Ie(p),p.isRenderTargetTexture===!1&&p.isExternalTexture!==!0&&p.version>0&&L.__version!==p.version){const k=p.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{z(L,p,s);return}}else p.isExternalTexture&&(L.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,L.__webglTexture,e.TEXTURE0+s)}function W(p,s){const L=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&L.__version!==p.version){z(L,p,s);return}t.bindTexture(e.TEXTURE_2D_ARRAY,L.__webglTexture,e.TEXTURE0+s)}function ie(p,s){const L=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&L.__version!==p.version){z(L,p,s);return}t.bindTexture(e.TEXTURE_3D,L.__webglTexture,e.TEXTURE0+s)}function V(p,s){const L=i.get(p);if(p.version>0&&L.__version!==p.version){Z(L,p,s);return}t.bindTexture(e.TEXTURE_CUBE_MAP,L.__webglTexture,e.TEXTURE0+s)}const me={[Eo]:e.REPEAT,[vo]:e.CLAMP_TO_EDGE,[go]:e.MIRRORED_REPEAT},xe={[on]:e.NEAREST,[So]:e.NEAREST_MIPMAP_NEAREST,[_n]:e.NEAREST_MIPMAP_LINEAR,[Xt]:e.LINEAR,[Vn]:e.LINEAR_MIPMAP_NEAREST,[nn]:e.LINEAR_MIPMAP_LINEAR},Le={[Co]:e.NEVER,[bo]:e.ALWAYS,[Ro]:e.LESS,[fa]:e.LEQUAL,[Ao]:e.EQUAL,[xo]:e.GEQUAL,[To]:e.GREATER,[Mo]:e.NOTEQUAL};function Fe(p,s){if(s.type===Ft&&n.has("OES_texture_float_linear")===!1&&(s.magFilter===Xt||s.magFilter===Vn||s.magFilter===_n||s.magFilter===nn||s.minFilter===Xt||s.minFilter===Vn||s.minFilter===_n||s.minFilter===nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(p,e.TEXTURE_WRAP_S,me[s.wrapS]),e.texParameteri(p,e.TEXTURE_WRAP_T,me[s.wrapT]),(p===e.TEXTURE_3D||p===e.TEXTURE_2D_ARRAY)&&e.texParameteri(p,e.TEXTURE_WRAP_R,me[s.wrapR]),e.texParameteri(p,e.TEXTURE_MAG_FILTER,xe[s.magFilter]),e.texParameteri(p,e.TEXTURE_MIN_FILTER,xe[s.minFilter]),s.compareFunction&&(e.texParameteri(p,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(p,e.TEXTURE_COMPARE_FUNC,Le[s.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(s.magFilter===on||s.minFilter!==_n&&s.minFilter!==nn||s.type===Ft&&n.has("OES_texture_float_linear")===!1)return;if(s.anisotropy>1||i.get(s).__currentAnisotropy){const L=n.get("EXT_texture_filter_anisotropic");e.texParameterf(p,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(s.anisotropy,a.getMaxAnisotropy())),i.get(s).__currentAnisotropy=s.anisotropy}}}function Je(p,s){let L=!1;p.__webglInit===void 0&&(p.__webglInit=!0,s.addEventListener("dispose",R));const k=s.source;let $=g.get(k);$===void 0&&($={},g.set(k,$));const G=K(s);if(G!==p.__cacheKey){$[G]===void 0&&($[G]={texture:e.createTexture(),usedTimes:0},d.memory.textures++,L=!0),$[G].usedTimes++;const Me=$[p.__cacheKey];Me!==void 0&&($[p.__cacheKey].usedTimes--,Me.usedTimes===0&&h(s)),p.__cacheKey=G,p.__webglTexture=$[G].texture}return L}function je(p,s,L){return Math.floor(Math.floor(p/L)/s)}function Ve(p,s,L,k){const G=p.updateRanges;if(G.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,s.width,s.height,L,k,s.data);else{G.sort((J,ce)=>J.start-ce.start);let Me=0;for(let J=1;J<G.length;J++){const ce=G[Me],Ce=G[J],Se=ce.start+ce.count,oe=je(Ce.start,s.width,4),Ue=je(ce.start,s.width,4);Ce.start<=Se+1&&oe===Ue&&je(Ce.start+Ce.count-1,s.width,4)===oe?ce.count=Math.max(ce.count,Ce.start+Ce.count-ce.start):(++Me,G[Me]=Ce)}G.length=Me+1;const te=e.getParameter(e.UNPACK_ROW_LENGTH),ve=e.getParameter(e.UNPACK_SKIP_PIXELS),Ee=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,s.width);for(let J=0,ce=G.length;J<ce;J++){const Ce=G[J],Se=Math.floor(Ce.start/4),oe=Math.ceil(Ce.count/4),Ue=Se%s.width,M=Math.floor(Se/s.width),ee=oe,re=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ue),e.pixelStorei(e.UNPACK_SKIP_ROWS,M),t.texSubImage2D(e.TEXTURE_2D,0,Ue,M,ee,re,L,k,s.data)}p.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,te),e.pixelStorei(e.UNPACK_SKIP_PIXELS,ve),e.pixelStorei(e.UNPACK_SKIP_ROWS,Ee)}}function z(p,s,L){let k=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(k=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(k=e.TEXTURE_3D);const $=Je(p,s),G=s.source;t.bindTexture(k,p.__webglTexture,e.TEXTURE0+L);const Me=i.get(G);if(G.version!==Me.__version||$===!0){t.activeTexture(e.TEXTURE0+L);const te=at.getPrimaries(at.workingColorSpace),ve=s.colorSpace===Wt?null:at.getPrimaries(s.colorSpace),Ee=s.colorSpace===Wt||te===ve?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let J=D(s.image,!1,a.maxTextureSize);J=ct(s,J);const ce=r.convert(s.format,s.colorSpace),Ce=r.convert(s.type);let Se=A(s.internalFormat,ce,Ce,s.colorSpace,s.isVideoTexture);Fe(k,s);let oe;const Ue=s.mipmaps,M=s.isVideoTexture!==!0,ee=Me.__version===void 0||$===!0,re=G.dataReady,ue=U(s,J);if(s.isDepthTexture)Se=v(s.format===Cn,s.type),ee&&(M?t.texStorage2D(e.TEXTURE_2D,1,Se,J.width,J.height):t.texImage2D(e.TEXTURE_2D,0,Se,J.width,J.height,0,ce,Ce,null));else if(s.isDataTexture)if(Ue.length>0){M&&ee&&t.texStorage2D(e.TEXTURE_2D,ue,Se,Ue[0].width,Ue[0].height);for(let j=0,Y=Ue.length;j<Y;j++)oe=Ue[j],M?re&&t.texSubImage2D(e.TEXTURE_2D,j,0,0,oe.width,oe.height,ce,Ce,oe.data):t.texImage2D(e.TEXTURE_2D,j,Se,oe.width,oe.height,0,ce,Ce,oe.data);s.generateMipmaps=!1}else M?(ee&&t.texStorage2D(e.TEXTURE_2D,ue,Se,J.width,J.height),re&&Ve(s,J,ce,Ce)):t.texImage2D(e.TEXTURE_2D,0,Se,J.width,J.height,0,ce,Ce,J.data);else if(s.isCompressedTexture)if(s.isCompressedArrayTexture){M&&ee&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Se,Ue[0].width,Ue[0].height,J.depth);for(let j=0,Y=Ue.length;j<Y;j++)if(oe=Ue[j],s.format!==Ct)if(ce!==null)if(M){if(re)if(s.layerUpdates.size>0){const he=mr(oe.width,oe.height,s.format,s.type);for(const ye of s.layerUpdates){const qe=oe.data.subarray(ye*he/oe.data.BYTES_PER_ELEMENT,(ye+1)*he/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,ye,oe.width,oe.height,1,ce,qe)}s.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,J.depth,ce,oe.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,j,Se,oe.width,oe.height,J.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else M?re&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,J.depth,ce,Ce,oe.data):t.texImage3D(e.TEXTURE_2D_ARRAY,j,Se,oe.width,oe.height,J.depth,0,ce,Ce,oe.data)}else{M&&ee&&t.texStorage2D(e.TEXTURE_2D,ue,Se,Ue[0].width,Ue[0].height);for(let j=0,Y=Ue.length;j<Y;j++)oe=Ue[j],s.format!==Ct?ce!==null?M?re&&t.compressedTexSubImage2D(e.TEXTURE_2D,j,0,0,oe.width,oe.height,ce,oe.data):t.compressedTexImage2D(e.TEXTURE_2D,j,Se,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):M?re&&t.texSubImage2D(e.TEXTURE_2D,j,0,0,oe.width,oe.height,ce,Ce,oe.data):t.texImage2D(e.TEXTURE_2D,j,Se,oe.width,oe.height,0,ce,Ce,oe.data)}else if(s.isDataArrayTexture)if(M){if(ee&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ue,Se,J.width,J.height,J.depth),re)if(s.layerUpdates.size>0){const j=mr(J.width,J.height,s.format,s.type);for(const Y of s.layerUpdates){const he=J.data.subarray(Y*j/J.data.BYTES_PER_ELEMENT,(Y+1)*j/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,Y,J.width,J.height,1,ce,Ce,he)}s.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ce,Ce,J.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,Se,J.width,J.height,J.depth,0,ce,Ce,J.data);else if(s.isData3DTexture)M?(ee&&t.texStorage3D(e.TEXTURE_3D,ue,Se,J.width,J.height,J.depth),re&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ce,Ce,J.data)):t.texImage3D(e.TEXTURE_3D,0,Se,J.width,J.height,J.depth,0,ce,Ce,J.data);else if(s.isFramebufferTexture){if(ee)if(M)t.texStorage2D(e.TEXTURE_2D,ue,Se,J.width,J.height);else{let j=J.width,Y=J.height;for(let he=0;he<ue;he++)t.texImage2D(e.TEXTURE_2D,he,Se,j,Y,0,ce,Ce,null),j>>=1,Y>>=1}}else if(Ue.length>0){if(M&&ee){const j=rt(Ue[0]);t.texStorage2D(e.TEXTURE_2D,ue,Se,j.width,j.height)}for(let j=0,Y=Ue.length;j<Y;j++)oe=Ue[j],M?re&&t.texSubImage2D(e.TEXTURE_2D,j,0,0,ce,Ce,oe):t.texImage2D(e.TEXTURE_2D,j,Se,ce,Ce,oe);s.generateMipmaps=!1}else if(M){if(ee){const j=rt(J);t.texStorage2D(e.TEXTURE_2D,ue,Se,j.width,j.height)}re&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,ce,Ce,J)}else t.texImage2D(e.TEXTURE_2D,0,Se,ce,Ce,J);f(s)&&o(k),Me.__version=G.version,s.onUpdate&&s.onUpdate(s)}p.__version=s.version}function Z(p,s,L){if(s.image.length!==6)return;const k=Je(p,s),$=s.source;t.bindTexture(e.TEXTURE_CUBE_MAP,p.__webglTexture,e.TEXTURE0+L);const G=i.get($);if($.version!==G.__version||k===!0){t.activeTexture(e.TEXTURE0+L);const Me=at.getPrimaries(at.workingColorSpace),te=s.colorSpace===Wt?null:at.getPrimaries(s.colorSpace),ve=s.colorSpace===Wt||Me===te?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Ee=s.isCompressedTexture||s.image[0].isCompressedTexture,J=s.image[0]&&s.image[0].isDataTexture,ce=[];for(let Y=0;Y<6;Y++)!Ee&&!J?ce[Y]=D(s.image[Y],!0,a.maxCubemapSize):ce[Y]=J?s.image[Y].image:s.image[Y],ce[Y]=ct(s,ce[Y]);const Ce=ce[0],Se=r.convert(s.format,s.colorSpace),oe=r.convert(s.type),Ue=A(s.internalFormat,Se,oe,s.colorSpace),M=s.isVideoTexture!==!0,ee=G.__version===void 0||k===!0,re=$.dataReady;let ue=U(s,Ce);Fe(e.TEXTURE_CUBE_MAP,s);let j;if(Ee){M&&ee&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,Ue,Ce.width,Ce.height);for(let Y=0;Y<6;Y++){j=ce[Y].mipmaps;for(let he=0;he<j.length;he++){const ye=j[he];s.format!==Ct?Se!==null?M?re&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,ye.width,ye.height,Se,ye.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,Ue,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):M?re&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,ye.width,ye.height,Se,oe,ye.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,Ue,ye.width,ye.height,0,Se,oe,ye.data)}}}else{if(j=s.mipmaps,M&&ee){j.length>0&&ue++;const Y=rt(ce[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ue,Ue,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(J){M?re&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ce[Y].width,ce[Y].height,Se,oe,ce[Y].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ue,ce[Y].width,ce[Y].height,0,Se,oe,ce[Y].data);for(let he=0;he<j.length;he++){const qe=j[he].image[Y].image;M?re&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,qe.width,qe.height,Se,oe,qe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,Ue,qe.width,qe.height,0,Se,oe,qe.data)}}else{M?re&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Se,oe,ce[Y]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ue,Se,oe,ce[Y]);for(let he=0;he<j.length;he++){const ye=j[he];M?re&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,Se,oe,ye.image[Y]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,Ue,Se,oe,ye.image[Y])}}}f(s)&&o(e.TEXTURE_CUBE_MAP),G.__version=$.version,s.onUpdate&&s.onUpdate(s)}p.__version=s.version}function F(p,s,L,k,$,G){const Me=r.convert(L.format,L.colorSpace),te=r.convert(L.type),ve=A(L.internalFormat,Me,te,L.colorSpace),Ee=i.get(s),J=i.get(L);if(J.__renderTarget=s,!Ee.__hasExternalTextures){const ce=Math.max(1,s.width>>G),Ce=Math.max(1,s.height>>G);$===e.TEXTURE_3D||$===e.TEXTURE_2D_ARRAY?t.texImage3D($,G,ve,ce,Ce,s.depth,0,Me,te,null):t.texImage2D($,G,ve,ce,Ce,0,Me,te,null)}t.bindFramebuffer(e.FRAMEBUFFER,p),ge(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,k,$,J.__webglTexture,0,Qe(s)):($===e.TEXTURE_2D||$>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,k,$,J.__webglTexture,G),t.bindFramebuffer(e.FRAMEBUFFER,null)}function ne(p,s,L){if(e.bindRenderbuffer(e.RENDERBUFFER,p),s.depthBuffer){const k=s.depthTexture,$=k&&k.isDepthTexture?k.type:null,G=v(s.stencilBuffer,$),Me=s.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,te=Qe(s);ge(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,te,G,s.width,s.height):L?e.renderbufferStorageMultisample(e.RENDERBUFFER,te,G,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,G,s.width,s.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Me,e.RENDERBUFFER,p)}else{const k=s.textures;for(let $=0;$<k.length;$++){const G=k[$],Me=r.convert(G.format,G.colorSpace),te=r.convert(G.type),ve=A(G.internalFormat,Me,te,G.colorSpace),Ee=Qe(s);L&&ge(s)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee,ve,s.width,s.height):ge(s)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee,ve,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,ve,s.width,s.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function se(p,s){if(s&&s.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,p),!(s.depthTexture&&s.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const k=i.get(s.depthTexture);k.__renderTarget=s,(!k.__webglTexture||s.depthTexture.image.width!==s.width||s.depthTexture.image.height!==s.height)&&(s.depthTexture.image.width=s.width,s.depthTexture.image.height=s.height,s.depthTexture.needsUpdate=!0),q(s.depthTexture,0);const $=k.__webglTexture,G=Qe(s);if(s.depthTexture.format===Mi)ge(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,$,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,$,0);else if(s.depthTexture.format===Cn)ge(s)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,$,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Ae(p){const s=i.get(p),L=p.isWebGLCubeRenderTarget===!0;if(s.__boundDepthTexture!==p.depthTexture){const k=p.depthTexture;if(s.__depthDisposeCallback&&s.__depthDisposeCallback(),k){const $=()=>{delete s.__boundDepthTexture,delete s.__depthDisposeCallback,k.removeEventListener("dispose",$)};k.addEventListener("dispose",$),s.__depthDisposeCallback=$}s.__boundDepthTexture=k}if(p.depthTexture&&!s.__autoAllocateDepthBuffer){if(L)throw new Error("target.depthTexture not supported in Cube render targets");const k=p.texture.mipmaps;k&&k.length>0?se(s.__webglFramebuffer[0],p):se(s.__webglFramebuffer,p)}else if(L){s.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[k]),s.__webglDepthbuffer[k]===void 0)s.__webglDepthbuffer[k]=e.createRenderbuffer(),ne(s.__webglDepthbuffer[k],p,!1);else{const $=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=s.__webglDepthbuffer[k];e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,G)}}else{const k=p.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),s.__webglDepthbuffer===void 0)s.__webglDepthbuffer=e.createRenderbuffer(),ne(s.__webglDepthbuffer,p,!1);else{const $=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=s.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,G)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function nt(p,s,L){const k=i.get(p);s!==void 0&&F(k.__webglFramebuffer,p,p.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),L!==void 0&&Ae(p)}function m(p){const s=p.texture,L=i.get(p),k=i.get(s);p.addEventListener("dispose",P);const $=p.textures,G=p.isWebGLCubeRenderTarget===!0,Me=$.length>1;if(Me||(k.__webglTexture===void 0&&(k.__webglTexture=e.createTexture()),k.__version=s.version,d.memory.textures++),G){L.__webglFramebuffer=[];for(let te=0;te<6;te++)if(s.mipmaps&&s.mipmaps.length>0){L.__webglFramebuffer[te]=[];for(let ve=0;ve<s.mipmaps.length;ve++)L.__webglFramebuffer[te][ve]=e.createFramebuffer()}else L.__webglFramebuffer[te]=e.createFramebuffer()}else{if(s.mipmaps&&s.mipmaps.length>0){L.__webglFramebuffer=[];for(let te=0;te<s.mipmaps.length;te++)L.__webglFramebuffer[te]=e.createFramebuffer()}else L.__webglFramebuffer=e.createFramebuffer();if(Me)for(let te=0,ve=$.length;te<ve;te++){const Ee=i.get($[te]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=e.createTexture(),d.memory.textures++)}if(p.samples>0&&ge(p)===!1){L.__webglMultisampledFramebuffer=e.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let te=0;te<$.length;te++){const ve=$[te];L.__webglColorRenderbuffer[te]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,L.__webglColorRenderbuffer[te]);const Ee=r.convert(ve.format,ve.colorSpace),J=r.convert(ve.type),ce=A(ve.internalFormat,Ee,J,ve.colorSpace,p.isXRRenderTarget===!0),Ce=Qe(p);e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce,ce,p.width,p.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+te,e.RENDERBUFFER,L.__webglColorRenderbuffer[te])}e.bindRenderbuffer(e.RENDERBUFFER,null),p.depthBuffer&&(L.__webglDepthRenderbuffer=e.createRenderbuffer(),ne(L.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(G){t.bindTexture(e.TEXTURE_CUBE_MAP,k.__webglTexture),Fe(e.TEXTURE_CUBE_MAP,s);for(let te=0;te<6;te++)if(s.mipmaps&&s.mipmaps.length>0)for(let ve=0;ve<s.mipmaps.length;ve++)F(L.__webglFramebuffer[te][ve],p,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve);else F(L.__webglFramebuffer[te],p,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);f(s)&&o(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let te=0,ve=$.length;te<ve;te++){const Ee=$[te],J=i.get(Ee);let ce=e.TEXTURE_2D;(p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(ce=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ce,J.__webglTexture),Fe(ce,Ee),F(L.__webglFramebuffer,p,Ee,e.COLOR_ATTACHMENT0+te,ce,0),f(Ee)&&o(ce)}t.unbindTexture()}else{let te=e.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(te=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(te,k.__webglTexture),Fe(te,s),s.mipmaps&&s.mipmaps.length>0)for(let ve=0;ve<s.mipmaps.length;ve++)F(L.__webglFramebuffer[ve],p,s,e.COLOR_ATTACHMENT0,te,ve);else F(L.__webglFramebuffer,p,s,e.COLOR_ATTACHMENT0,te,0);f(s)&&o(te),t.unbindTexture()}p.depthBuffer&&Ae(p)}function Ge(p){const s=p.textures;for(let L=0,k=s.length;L<k;L++){const $=s[L];if(f($)){const G=y(p),Me=i.get($).__webglTexture;t.bindTexture(G,Me),o(G),t.unbindTexture()}}}const De=[],we=[];function _e(p){if(p.samples>0){if(ge(p)===!1){const s=p.textures,L=p.width,k=p.height;let $=e.COLOR_BUFFER_BIT;const G=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Me=i.get(p),te=s.length>1;if(te)for(let Ee=0;Ee<s.length;Ee++)t.bindFramebuffer(e.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,Me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const ve=p.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Ee=0;Ee<s.length;Ee++){if(p.resolveDepthBuffer&&(p.depthBuffer&&($|=e.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&($|=e.STENCIL_BUFFER_BIT)),te){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Me.__webglColorRenderbuffer[Ee]);const J=i.get(s[Ee]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,J,0)}e.blitFramebuffer(0,0,L,k,0,0,L,k,$,e.NEAREST),S===!0&&(De.length=0,we.length=0,De.push(e.COLOR_ATTACHMENT0+Ee),p.depthBuffer&&p.resolveDepthBuffer===!1&&(De.push(G),we.push(G),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,we)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),te)for(let Ee=0;Ee<s.length;Ee++){t.bindFramebuffer(e.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.RENDERBUFFER,Me.__webglColorRenderbuffer[Ee]);const J=i.get(s[Ee]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,Me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ee,e.TEXTURE_2D,J,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.resolveDepthBuffer===!1&&S){const s=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[s])}}}function Qe(p){return Math.min(a.maxSamples,p.samples)}function ge(p){const s=i.get(p);return p.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&s.__useRenderToTexture!==!1}function Ie(p){const s=d.render.frame;x.get(p)!==s&&(x.set(p,s),p.update())}function ct(p,s){const L=p.colorSpace,k=p.format,$=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||L!==In&&L!==Wt&&(at.getTransfer(L)===$e?(k!==Ct||$!==Gt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",L)),s}function rt(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(_.width=p.naturalWidth||p.width,_.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(_.width=p.displayWidth,_.height=p.displayHeight):(_.width=p.width,_.height=p.height),_}this.allocateTextureUnit=X,this.resetTextureUnits=H,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=ie,this.setTextureCube=V,this.rebindTextures=nt,this.setupRenderTarget=m,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=F,this.useMultisampledRTT=ge}function Qf(e,n){function t(i,a=Wt){let r;const d=at.getTransfer(a);if(i===Gt)return e.UNSIGNED_BYTE;if(i===pa)return e.UNSIGNED_SHORT_4_4_4_4;if(i===ha)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Lo)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===yo)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Uo)return e.BYTE;if(i===Io)return e.SHORT;if(i===Pn)return e.UNSIGNED_SHORT;if(i===_a)return e.INT;if(i===dn)return e.UNSIGNED_INT;if(i===Ft)return e.FLOAT;if(i===Un)return e.HALF_FLOAT;if(i===No)return e.ALPHA;if(i===Oo)return e.RGB;if(i===Ct)return e.RGBA;if(i===Mi)return e.DEPTH_COMPONENT;if(i===Cn)return e.DEPTH_STENCIL;if(i===Fo)return e.RED;if(i===ga)return e.RED_INTEGER;if(i===Bo)return e.RG;if(i===va)return e.RG_INTEGER;if(i===Ea)return e.RGBA_INTEGER;if(i===kn||i===zn||i===Wn||i===Xn)if(d===$e)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===kn)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===kn)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zn)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wn)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xn)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Oi||i===Fi||i===Bi||i===Hi)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Oi)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Fi)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Bi)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hi)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Gi||i===Vi||i===ki)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Gi||i===Vi)return d===$e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ki)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===zi||i===Wi||i===Xi||i===Yi||i===Ki||i===qi||i===Zi||i===$i||i===ji||i===Qi||i===Ji||i===er||i===tr||i===nr)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===zi)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Wi)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xi)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yi)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ki)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===qi)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Zi)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$i)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ji)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qi)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ji)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===er)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===tr)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===nr)return d===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ir||i===rr||i===ar)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===ir)return d===$e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===rr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ar)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===or||i===sr||i===lr||i===cr)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===or)return r.COMPRESSED_RED_RGTC1_EXT;if(i===sr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===cr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===cn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Jf=`
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

}`;class tu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new ma(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Dt({vertexShader:Jf,fragmentShader:eu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new pn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nu extends $a{constructor(n,t){super();const i=this;let a=null,r=1,d=null,l="local-floor",S=1,_=null,x=null,E=null,g=null,T=null,N=null;const D=typeof XRWebGLBinding<"u",f=new tu,o={},y=t.getContextAttributes();let A=null,v=null;const U=[],R=[],P=new Xe;let B=null;const h=new qt;h.viewport=new dt;const u=new qt;u.viewport=new dt;const w=[h,u],H=new ja;let X=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let Z=U[z];return Z===void 0&&(Z=new Gn,U[z]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(z){let Z=U[z];return Z===void 0&&(Z=new Gn,U[z]=Z),Z.getGripSpace()},this.getHand=function(z){let Z=U[z];return Z===void 0&&(Z=new Gn,U[z]=Z),Z.getHandSpace()};function q(z){const Z=R.indexOf(z.inputSource);if(Z===-1)return;const F=U[Z];F!==void 0&&(F.update(z.inputSource,z.frame,_||d),F.dispatchEvent({type:z.type,data:z.inputSource}))}function W(){a.removeEventListener("select",q),a.removeEventListener("selectstart",q),a.removeEventListener("selectend",q),a.removeEventListener("squeeze",q),a.removeEventListener("squeezestart",q),a.removeEventListener("squeezeend",q),a.removeEventListener("end",W),a.removeEventListener("inputsourceschange",ie);for(let z=0;z<U.length;z++){const Z=R[z];Z!==null&&(R[z]=null,U[z].disconnect(Z))}X=null,K=null,f.reset();for(const z in o)delete o[z];n.setRenderTarget(A),T=null,g=null,E=null,a=null,v=null,Ve.stop(),i.isPresenting=!1,n.setPixelRatio(B),n.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){l=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return _||d},this.setReferenceSpace=function(z){_=z},this.getBaseLayer=function(){return g!==null?g:T},this.getBinding=function(){return E===null&&D&&(E=new XRWebGLBinding(a,t)),E},this.getFrame=function(){return N},this.getSession=function(){return a},this.setSession=async function(z){if(a=z,a!==null){if(A=n.getRenderTarget(),a.addEventListener("select",q),a.addEventListener("selectstart",q),a.addEventListener("selectend",q),a.addEventListener("squeeze",q),a.addEventListener("squeezestart",q),a.addEventListener("squeezeend",q),a.addEventListener("end",W),a.addEventListener("inputsourceschange",ie),y.xrCompatible!==!0&&await t.makeXRCompatible(),B=n.getPixelRatio(),n.getSize(P),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let F=null,ne=null,se=null;y.depth&&(se=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,F=y.stencil?Cn:Mi,ne=y.stencil?cn:dn);const Ae={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:r};E=this.getBinding(),g=E.createProjectionLayer(Ae),a.updateRenderState({layers:[g]}),n.setPixelRatio(1),n.setSize(g.textureWidth,g.textureHeight,!1),v=new $t(g.textureWidth,g.textureHeight,{format:Ct,type:Gt,depthTexture:new da(g.textureWidth,g.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,F),stencilBuffer:y.stencil,colorSpace:n.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const F={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};T=new XRWebGLLayer(a,t,F),a.updateRenderState({baseLayer:T}),n.setPixelRatio(1),n.setSize(T.framebufferWidth,T.framebufferHeight,!1),v=new $t(T.framebufferWidth,T.framebufferHeight,{format:Ct,type:Gt,colorSpace:n.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:T.ignoreDepthValues===!1,resolveStencilBuffer:T.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(S),_=null,d=await a.requestReferenceSpace(l),Ve.setContext(a),Ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function ie(z){for(let Z=0;Z<z.removed.length;Z++){const F=z.removed[Z],ne=R.indexOf(F);ne>=0&&(R[ne]=null,U[ne].disconnect(F))}for(let Z=0;Z<z.added.length;Z++){const F=z.added[Z];let ne=R.indexOf(F);if(ne===-1){for(let Ae=0;Ae<U.length;Ae++)if(Ae>=R.length){R.push(F),ne=Ae;break}else if(R[Ae]===null){R[Ae]=F,ne=Ae;break}if(ne===-1)break}const se=U[ne];se&&se.connect(F)}}const V=new de,me=new de;function xe(z,Z,F){V.setFromMatrixPosition(Z.matrixWorld),me.setFromMatrixPosition(F.matrixWorld);const ne=V.distanceTo(me),se=Z.projectionMatrix.elements,Ae=F.projectionMatrix.elements,nt=se[14]/(se[10]-1),m=se[14]/(se[10]+1),Ge=(se[9]+1)/se[5],De=(se[9]-1)/se[5],we=(se[8]-1)/se[0],_e=(Ae[8]+1)/Ae[0],Qe=nt*we,ge=nt*_e,Ie=ne/(-we+_e),ct=Ie*-we;if(Z.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(ct),z.translateZ(Ie),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),se[10]===-1)z.projectionMatrix.copy(Z.projectionMatrix),z.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const rt=nt+Ie,p=m+Ie,s=Qe-ct,L=ge+(ne-ct),k=Ge*m/p*rt,$=De*m/p*rt;z.projectionMatrix.makePerspective(s,L,k,$,rt,p),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function Le(z,Z){Z===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(Z.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(a===null)return;let Z=z.near,F=z.far;f.texture!==null&&(f.depthNear>0&&(Z=f.depthNear),f.depthFar>0&&(F=f.depthFar)),H.near=u.near=h.near=Z,H.far=u.far=h.far=F,(X!==H.near||K!==H.far)&&(a.updateRenderState({depthNear:H.near,depthFar:H.far}),X=H.near,K=H.far),H.layers.mask=z.layers.mask|6,h.layers.mask=H.layers.mask&3,u.layers.mask=H.layers.mask&5;const ne=z.parent,se=H.cameras;Le(H,ne);for(let Ae=0;Ae<se.length;Ae++)Le(se[Ae],ne);se.length===2?xe(H,h,u):H.projectionMatrix.copy(h.projectionMatrix),Fe(z,H,ne)};function Fe(z,Z,F){F===null?z.matrix.copy(Z.matrixWorld):(z.matrix.copy(F.matrixWorld),z.matrix.invert(),z.matrix.multiply(Z.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(Z.projectionMatrix),z.projectionMatrixInverse.copy(Z.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Qa*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(g===null&&T===null))return S},this.setFoveation=function(z){S=z,g!==null&&(g.fixedFoveation=z),T!==null&&T.fixedFoveation!==void 0&&(T.fixedFoveation=z)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(H)},this.getCameraTexture=function(z){return o[z]};let Je=null;function je(z,Z){if(x=Z.getViewerPose(_||d),N=Z,x!==null){const F=x.views;T!==null&&(n.setRenderTargetFramebuffer(v,T.framebuffer),n.setRenderTarget(v));let ne=!1;F.length!==H.cameras.length&&(H.cameras.length=0,ne=!0);for(let m=0;m<F.length;m++){const Ge=F[m];let De=null;if(T!==null)De=T.getViewport(Ge);else{const _e=E.getViewSubImage(g,Ge);De=_e.viewport,m===0&&(n.setRenderTargetTextures(v,_e.colorTexture,_e.depthStencilTexture),n.setRenderTarget(v))}let we=w[m];we===void 0&&(we=new qt,we.layers.enable(m),we.viewport=new dt,w[m]=we),we.matrix.fromArray(Ge.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(Ge.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(De.x,De.y,De.width,De.height),m===0&&(H.matrix.copy(we.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),ne===!0&&H.cameras.push(we)}const se=a.enabledFeatures;if(se&&se.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&D){E=i.getBinding();const m=E.getDepthInformation(F[0]);m&&m.isValid&&m.texture&&f.init(m,a.renderState)}if(se&&se.includes("camera-access")&&D){n.state.unbindTexture(),E=i.getBinding();for(let m=0;m<F.length;m++){const Ge=F[m].camera;if(Ge){let De=o[Ge];De||(De=new ma,o[Ge]=De);const we=E.getCameraImage(Ge);De.sourceTexture=we}}}}for(let F=0;F<U.length;F++){const ne=R[F],se=U[F];ne!==null&&se!==void 0&&se.update(ne,Z,_||d)}Je&&Je(z,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),N=null}const Ve=new wa;Ve.setAnimationLoop(je),this.setAnimationLoop=function(z){Je=z},this.dispose=function(){}}}const It=new Dn,iu=new St;function ru(e,n){function t(f,o){f.matrixAutoUpdate===!0&&f.updateMatrix(),o.value.copy(f.matrix)}function i(f,o){o.color.getRGB(f.fogColor.value,Ma(e)),o.isFog?(f.fogNear.value=o.near,f.fogFar.value=o.far):o.isFogExp2&&(f.fogDensity.value=o.density)}function a(f,o,y,A,v){o.isMeshBasicMaterial||o.isMeshLambertMaterial?r(f,o):o.isMeshToonMaterial?(r(f,o),E(f,o)):o.isMeshPhongMaterial?(r(f,o),x(f,o)):o.isMeshStandardMaterial?(r(f,o),g(f,o),o.isMeshPhysicalMaterial&&T(f,o,v)):o.isMeshMatcapMaterial?(r(f,o),N(f,o)):o.isMeshDepthMaterial?r(f,o):o.isMeshDistanceMaterial?(r(f,o),D(f,o)):o.isMeshNormalMaterial?r(f,o):o.isLineBasicMaterial?(d(f,o),o.isLineDashedMaterial&&l(f,o)):o.isPointsMaterial?S(f,o,y,A):o.isSpriteMaterial?_(f,o):o.isShadowMaterial?(f.color.value.copy(o.color),f.opacity.value=o.opacity):o.isShaderMaterial&&(o.uniformsNeedUpdate=!1)}function r(f,o){f.opacity.value=o.opacity,o.color&&f.diffuse.value.copy(o.color),o.emissive&&f.emissive.value.copy(o.emissive).multiplyScalar(o.emissiveIntensity),o.map&&(f.map.value=o.map,t(o.map,f.mapTransform)),o.alphaMap&&(f.alphaMap.value=o.alphaMap,t(o.alphaMap,f.alphaMapTransform)),o.bumpMap&&(f.bumpMap.value=o.bumpMap,t(o.bumpMap,f.bumpMapTransform),f.bumpScale.value=o.bumpScale,o.side===Mt&&(f.bumpScale.value*=-1)),o.normalMap&&(f.normalMap.value=o.normalMap,t(o.normalMap,f.normalMapTransform),f.normalScale.value.copy(o.normalScale),o.side===Mt&&f.normalScale.value.negate()),o.displacementMap&&(f.displacementMap.value=o.displacementMap,t(o.displacementMap,f.displacementMapTransform),f.displacementScale.value=o.displacementScale,f.displacementBias.value=o.displacementBias),o.emissiveMap&&(f.emissiveMap.value=o.emissiveMap,t(o.emissiveMap,f.emissiveMapTransform)),o.specularMap&&(f.specularMap.value=o.specularMap,t(o.specularMap,f.specularMapTransform)),o.alphaTest>0&&(f.alphaTest.value=o.alphaTest);const y=n.get(o),A=y.envMap,v=y.envMapRotation;A&&(f.envMap.value=A,It.copy(v),It.x*=-1,It.y*=-1,It.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(It.y*=-1,It.z*=-1),f.envMapRotation.value.setFromMatrix4(iu.makeRotationFromEuler(It)),f.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=o.reflectivity,f.ior.value=o.ior,f.refractionRatio.value=o.refractionRatio),o.lightMap&&(f.lightMap.value=o.lightMap,f.lightMapIntensity.value=o.lightMapIntensity,t(o.lightMap,f.lightMapTransform)),o.aoMap&&(f.aoMap.value=o.aoMap,f.aoMapIntensity.value=o.aoMapIntensity,t(o.aoMap,f.aoMapTransform))}function d(f,o){f.diffuse.value.copy(o.color),f.opacity.value=o.opacity,o.map&&(f.map.value=o.map,t(o.map,f.mapTransform))}function l(f,o){f.dashSize.value=o.dashSize,f.totalSize.value=o.dashSize+o.gapSize,f.scale.value=o.scale}function S(f,o,y,A){f.diffuse.value.copy(o.color),f.opacity.value=o.opacity,f.size.value=o.size*y,f.scale.value=A*.5,o.map&&(f.map.value=o.map,t(o.map,f.uvTransform)),o.alphaMap&&(f.alphaMap.value=o.alphaMap,t(o.alphaMap,f.alphaMapTransform)),o.alphaTest>0&&(f.alphaTest.value=o.alphaTest)}function _(f,o){f.diffuse.value.copy(o.color),f.opacity.value=o.opacity,f.rotation.value=o.rotation,o.map&&(f.map.value=o.map,t(o.map,f.mapTransform)),o.alphaMap&&(f.alphaMap.value=o.alphaMap,t(o.alphaMap,f.alphaMapTransform)),o.alphaTest>0&&(f.alphaTest.value=o.alphaTest)}function x(f,o){f.specular.value.copy(o.specular),f.shininess.value=Math.max(o.shininess,1e-4)}function E(f,o){o.gradientMap&&(f.gradientMap.value=o.gradientMap)}function g(f,o){f.metalness.value=o.metalness,o.metalnessMap&&(f.metalnessMap.value=o.metalnessMap,t(o.metalnessMap,f.metalnessMapTransform)),f.roughness.value=o.roughness,o.roughnessMap&&(f.roughnessMap.value=o.roughnessMap,t(o.roughnessMap,f.roughnessMapTransform)),o.envMap&&(f.envMapIntensity.value=o.envMapIntensity)}function T(f,o,y){f.ior.value=o.ior,o.sheen>0&&(f.sheenColor.value.copy(o.sheenColor).multiplyScalar(o.sheen),f.sheenRoughness.value=o.sheenRoughness,o.sheenColorMap&&(f.sheenColorMap.value=o.sheenColorMap,t(o.sheenColorMap,f.sheenColorMapTransform)),o.sheenRoughnessMap&&(f.sheenRoughnessMap.value=o.sheenRoughnessMap,t(o.sheenRoughnessMap,f.sheenRoughnessMapTransform))),o.clearcoat>0&&(f.clearcoat.value=o.clearcoat,f.clearcoatRoughness.value=o.clearcoatRoughness,o.clearcoatMap&&(f.clearcoatMap.value=o.clearcoatMap,t(o.clearcoatMap,f.clearcoatMapTransform)),o.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=o.clearcoatRoughnessMap,t(o.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),o.clearcoatNormalMap&&(f.clearcoatNormalMap.value=o.clearcoatNormalMap,t(o.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(o.clearcoatNormalScale),o.side===Mt&&f.clearcoatNormalScale.value.negate())),o.dispersion>0&&(f.dispersion.value=o.dispersion),o.iridescence>0&&(f.iridescence.value=o.iridescence,f.iridescenceIOR.value=o.iridescenceIOR,f.iridescenceThicknessMinimum.value=o.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=o.iridescenceThicknessRange[1],o.iridescenceMap&&(f.iridescenceMap.value=o.iridescenceMap,t(o.iridescenceMap,f.iridescenceMapTransform)),o.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=o.iridescenceThicknessMap,t(o.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),o.transmission>0&&(f.transmission.value=o.transmission,f.transmissionSamplerMap.value=y.texture,f.transmissionSamplerSize.value.set(y.width,y.height),o.transmissionMap&&(f.transmissionMap.value=o.transmissionMap,t(o.transmissionMap,f.transmissionMapTransform)),f.thickness.value=o.thickness,o.thicknessMap&&(f.thicknessMap.value=o.thicknessMap,t(o.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=o.attenuationDistance,f.attenuationColor.value.copy(o.attenuationColor)),o.anisotropy>0&&(f.anisotropyVector.value.set(o.anisotropy*Math.cos(o.anisotropyRotation),o.anisotropy*Math.sin(o.anisotropyRotation)),o.anisotropyMap&&(f.anisotropyMap.value=o.anisotropyMap,t(o.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=o.specularIntensity,f.specularColor.value.copy(o.specularColor),o.specularColorMap&&(f.specularColorMap.value=o.specularColorMap,t(o.specularColorMap,f.specularColorMapTransform)),o.specularIntensityMap&&(f.specularIntensityMap.value=o.specularIntensityMap,t(o.specularIntensityMap,f.specularIntensityMapTransform))}function N(f,o){o.matcap&&(f.matcap.value=o.matcap)}function D(f,o){const y=n.get(o).light;f.referencePosition.value.setFromMatrixPosition(y.matrixWorld),f.nearDistance.value=y.shadow.camera.near,f.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function au(e,n,t,i){let a={},r={},d=[];const l=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function S(y,A){const v=A.program;i.uniformBlockBinding(y,v)}function _(y,A){let v=a[y.id];v===void 0&&(N(y),v=x(y),a[y.id]=v,y.addEventListener("dispose",f));const U=A.program;i.updateUBOMapping(y,U);const R=n.render.frame;r[y.id]!==R&&(g(y),r[y.id]=R)}function x(y){const A=E();y.__bindingPointIndex=A;const v=e.createBuffer(),U=y.__size,R=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,v),e.bufferData(e.UNIFORM_BUFFER,U,R),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,A,v),v}function E(){for(let y=0;y<l;y++)if(d.indexOf(y)===-1)return d.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(y){const A=a[y.id],v=y.uniforms,U=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,A);for(let R=0,P=v.length;R<P;R++){const B=Array.isArray(v[R])?v[R]:[v[R]];for(let h=0,u=B.length;h<u;h++){const w=B[h];if(T(w,R,h,U)===!0){const H=w.__offset,X=Array.isArray(w.value)?w.value:[w.value];let K=0;for(let q=0;q<X.length;q++){const W=X[q],ie=D(W);typeof W=="number"||typeof W=="boolean"?(w.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,H+K,w.__data)):W.isMatrix3?(w.__data[0]=W.elements[0],w.__data[1]=W.elements[1],w.__data[2]=W.elements[2],w.__data[3]=0,w.__data[4]=W.elements[3],w.__data[5]=W.elements[4],w.__data[6]=W.elements[5],w.__data[7]=0,w.__data[8]=W.elements[6],w.__data[9]=W.elements[7],w.__data[10]=W.elements[8],w.__data[11]=0):(W.toArray(w.__data,K),K+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,H,w.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function T(y,A,v,U){const R=y.value,P=A+"_"+v;if(U[P]===void 0)return typeof R=="number"||typeof R=="boolean"?U[P]=R:U[P]=R.clone(),!0;{const B=U[P];if(typeof R=="number"||typeof R=="boolean"){if(B!==R)return U[P]=R,!0}else if(B.equals(R)===!1)return B.copy(R),!0}return!1}function N(y){const A=y.uniforms;let v=0;const U=16;for(let P=0,B=A.length;P<B;P++){const h=Array.isArray(A[P])?A[P]:[A[P]];for(let u=0,w=h.length;u<w;u++){const H=h[u],X=Array.isArray(H.value)?H.value:[H.value];for(let K=0,q=X.length;K<q;K++){const W=X[K],ie=D(W),V=v%U,me=V%ie.boundary,xe=V+me;v+=me,xe!==0&&U-xe<ie.storage&&(v+=U-xe),H.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=ie.storage}}}const R=v%U;return R>0&&(v+=U-R),y.__size=v,y.__cache={},this}function D(y){const A={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(A.boundary=4,A.storage=4):y.isVector2?(A.boundary=8,A.storage=8):y.isVector3||y.isColor?(A.boundary=16,A.storage=12):y.isVector4?(A.boundary=16,A.storage=16):y.isMatrix3?(A.boundary=48,A.storage=48):y.isMatrix4?(A.boundary=64,A.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),A}function f(y){const A=y.target;A.removeEventListener("dispose",f);const v=d.indexOf(A.__bindingPointIndex);d.splice(v,1),e.deleteBuffer(a[A.id]),delete a[A.id],delete r[A.id]}function o(){for(const y in a)e.deleteBuffer(a[y]);d=[],a={},r={}}return{bind:S,update:_,dispose:o}}class ou{constructor(n={}){const{canvas:t=Ka(),context:i=null,depth:a=!0,stencil:r=!1,alpha:d=!1,antialias:l=!1,premultipliedAlpha:S=!0,preserveDrawingBuffer:_=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:E=!1,reversedDepthBuffer:g=!1}=n;this.isWebGLRenderer=!0;let T;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=i.getContextAttributes().alpha}else T=d;const N=new Uint32Array(4),D=new Int32Array(4);let f=null,o=null;const y=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let U=!1;this._outputColorSpace=la;let R=0,P=0,B=null,h=-1,u=null;const w=new dt,H=new dt;let X=null;const K=new ze(0);let q=0,W=t.width,ie=t.height,V=1,me=null,xe=null;const Le=new dt(0,0,W,ie),Fe=new dt(0,0,W,ie);let Je=!1;const je=new ca;let Ve=!1,z=!1;const Z=new St,F=new de,ne=new dt,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ae=!1;function nt(){return B===null?V:1}let m=i;function Ge(c,b){return t.getContext(c,b)}try{const c={alpha:!0,depth:a,stencil:r,antialias:l,premultipliedAlpha:S,preserveDrawingBuffer:_,powerPreference:x,failIfMajorPerformanceCaveat:E};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qa}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",j,!1),m===null){const b="webgl2";if(m=Ge(b,c),m===null)throw Ge(b)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(c){throw console.error("THREE.WebGLRenderer: "+c.message),c}let De,we,_e,Qe,ge,Ie,ct,rt,p,s,L,k,$,G,Me,te,ve,Ee,J,ce,Ce,Se,oe,Ue;function M(){De=new md(m),De.init(),Se=new Qf(m,De),we=new ld(m,De,n,Se),_e=new $f(m,De),we.reversedDepthBuffer&&g&&_e.buffers.depth.setReversed(!0),Qe=new vd(m),ge=new Ff,Ie=new jf(m,De,_e,ge,we,Se,Qe),ct=new dd(v),rt=new hd(v),p=new As(m),oe=new od(m,p),s=new _d(m,p,Qe,oe),L=new Sd(m,s,p,Qe),J=new Ed(m,we,Ie),te=new cd(ge),k=new Of(v,ct,rt,De,we,oe,te),$=new ru(v,ge),G=new Hf,Me=new Xf(De),Ee=new ad(v,ct,rt,_e,L,T,S),ve=new qf(v,L,we),Ue=new au(m,Qe,we,_e),ce=new sd(m,De,Qe),Ce=new gd(m,De,Qe),Qe.programs=k.programs,v.capabilities=we,v.extensions=De,v.properties=ge,v.renderLists=G,v.shadowMap=ve,v.state=_e,v.info=Qe}M();const ee=new nu(v,m);this.xr=ee,this.getContext=function(){return m},this.getContextAttributes=function(){return m.getContextAttributes()},this.forceContextLoss=function(){const c=De.get("WEBGL_lose_context");c&&c.loseContext()},this.forceContextRestore=function(){const c=De.get("WEBGL_lose_context");c&&c.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(c){c!==void 0&&(V=c,this.setSize(W,ie,!1))},this.getSize=function(c){return c.set(W,ie)},this.setSize=function(c,b,I=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=c,ie=b,t.width=Math.floor(c*V),t.height=Math.floor(b*V),I===!0&&(t.style.width=c+"px",t.style.height=b+"px"),this.setViewport(0,0,c,b)},this.getDrawingBufferSize=function(c){return c.set(W*V,ie*V).floor()},this.setDrawingBufferSize=function(c,b,I){W=c,ie=b,V=I,t.width=Math.floor(c*I),t.height=Math.floor(b*I),this.setViewport(0,0,c,b)},this.getCurrentViewport=function(c){return c.copy(w)},this.getViewport=function(c){return c.copy(Le)},this.setViewport=function(c,b,I,O){c.isVector4?Le.set(c.x,c.y,c.z,c.w):Le.set(c,b,I,O),_e.viewport(w.copy(Le).multiplyScalar(V).round())},this.getScissor=function(c){return c.copy(Fe)},this.setScissor=function(c,b,I,O){c.isVector4?Fe.set(c.x,c.y,c.z,c.w):Fe.set(c,b,I,O),_e.scissor(H.copy(Fe).multiplyScalar(V).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(c){_e.setScissorTest(Je=c)},this.setOpaqueSort=function(c){me=c},this.setTransparentSort=function(c){xe=c},this.getClearColor=function(c){return c.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(c=!0,b=!0,I=!0){let O=0;if(c){let C=!1;if(B!==null){const Q=B.texture.format;C=Q===Ea||Q===va||Q===ga}if(C){const Q=B.texture.type,le=Q===Gt||Q===dn||Q===Pn||Q===cn||Q===pa||Q===ha,pe=Ee.getClearColor(),fe=Ee.getClearAlpha(),be=pe.r,Pe=pe.g,Te=pe.b;le?(N[0]=be,N[1]=Pe,N[2]=Te,N[3]=fe,m.clearBufferuiv(m.COLOR,0,N)):(D[0]=be,D[1]=Pe,D[2]=Te,D[3]=fe,m.clearBufferiv(m.COLOR,0,D))}else O|=m.COLOR_BUFFER_BIT}b&&(O|=m.DEPTH_BUFFER_BIT),I&&(O|=m.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),m.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",j,!1),Ee.dispose(),G.dispose(),Me.dispose(),ge.dispose(),ct.dispose(),rt.dispose(),L.dispose(),oe.dispose(),Ue.dispose(),k.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",xt),ee.removeEventListener("sessionend",Pi),Lt.stop()};function re(c){c.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;const c=Qe.autoReset,b=ve.enabled,I=ve.autoUpdate,O=ve.needsUpdate,C=ve.type;M(),Qe.autoReset=c,ve.enabled=b,ve.autoUpdate=I,ve.needsUpdate=O,ve.type=C}function j(c){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",c.statusMessage)}function Y(c){const b=c.target;b.removeEventListener("dispose",Y),he(b)}function he(c){ye(c),ge.remove(c)}function ye(c){const b=ge.get(c).programs;b!==void 0&&(b.forEach(function(I){k.releaseProgram(I)}),c.isShaderMaterial&&k.releaseShaderCache(c))}this.renderBufferDirect=function(c,b,I,O,C,Q){b===null&&(b=se);const le=C.isMesh&&C.matrixWorld.determinant()<0,pe=Va(c,b,I,O,C);_e.setMaterial(O,le);let fe=I.index,be=1;if(O.wireframe===!0){if(fe=s.getWireframeAttribute(I),fe===void 0)return;be=2}const Pe=I.drawRange,Te=I.attributes.position;let Oe=Pe.start*be,We=(Pe.start+Pe.count)*be;Q!==null&&(Oe=Math.max(Oe,Q.start*be),We=Math.min(We,(Q.start+Q.count)*be)),fe!==null?(Oe=Math.max(Oe,0),We=Math.min(We,fe.count)):Te!=null&&(Oe=Math.max(Oe,0),We=Math.min(We,Te.count));const it=We-Oe;if(it<0||it===1/0)return;oe.setup(C,O,pe,I,fe);let Ze,Ke=ce;if(fe!==null&&(Ze=p.get(fe),Ke=Ce,Ke.setIndex(Ze)),C.isMesh)O.wireframe===!0?(_e.setLineWidth(O.wireframeLinewidth*nt()),Ke.setMode(m.LINES)):Ke.setMode(m.TRIANGLES);else if(C.isLine){let Re=O.linewidth;Re===void 0&&(Re=1),_e.setLineWidth(Re*nt()),C.isLineSegments?Ke.setMode(m.LINES):C.isLineLoop?Ke.setMode(m.LINE_LOOP):Ke.setMode(m.LINE_STRIP)}else C.isPoints?Ke.setMode(m.POINTS):C.isSprite&&Ke.setMode(m.TRIANGLES);if(C.isBatchedMesh)if(C._multiDrawInstances!==null)si("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ke.renderMultiDrawInstances(C._multiDrawStarts,C._multiDrawCounts,C._multiDrawCount,C._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))Ke.renderMultiDraw(C._multiDrawStarts,C._multiDrawCounts,C._multiDrawCount);else{const Re=C._multiDrawStarts,et=C._multiDrawCounts,He=C._multiDrawCount,_t=fe?p.get(fe).bytesPerElement:1,Vt=ge.get(O).currentProgram.getUniforms();for(let gt=0;gt<He;gt++)Vt.setValue(m,"_gl_DrawID",gt),Ke.render(Re[gt]/_t,et[gt])}else if(C.isInstancedMesh)Ke.renderInstances(Oe,it,C.count);else if(I.isInstancedBufferGeometry){const Re=I._maxInstanceCount!==void 0?I._maxInstanceCount:1/0,et=Math.min(I.instanceCount,Re);Ke.renderInstances(Oe,it,et)}else Ke.render(Oe,it)};function qe(c,b,I){c.transparent===!0&&c.side===Tt&&c.forceSinglePass===!1?(c.side=Mt,c.needsUpdate=!0,mn(c,b,I),c.side=ln,c.needsUpdate=!0,mn(c,b,I),c.side=Tt):mn(c,b,I)}this.compile=function(c,b,I=null){I===null&&(I=c),o=Me.get(I),o.init(b),A.push(o),I.traverseVisible(function(C){C.isLight&&C.layers.test(b.layers)&&(o.pushLight(C),C.castShadow&&o.pushShadow(C))}),c!==I&&c.traverseVisible(function(C){C.isLight&&C.layers.test(b.layers)&&(o.pushLight(C),C.castShadow&&o.pushShadow(C))}),o.setupLights();const O=new Set;return c.traverse(function(C){if(!(C.isMesh||C.isPoints||C.isLine||C.isSprite))return;const Q=C.material;if(Q)if(Array.isArray(Q))for(let le=0;le<Q.length;le++){const pe=Q[le];qe(pe,I,C),O.add(pe)}else qe(Q,I,C),O.add(Q)}),o=A.pop(),O},this.compileAsync=function(c,b,I=null){const O=this.compile(c,b,I);return new Promise(C=>{function Q(){if(O.forEach(function(le){ge.get(le).currentProgram.isReady()&&O.delete(le)}),O.size===0){C(c);return}setTimeout(Q,10)}De.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let ke=null;function Rt(c){ke&&ke(c)}function xt(){Lt.stop()}function Pi(){Lt.start()}const Lt=new wa;Lt.setAnimationLoop(Rt),typeof self<"u"&&Lt.setContext(self),this.setAnimationLoop=function(c){ke=c,ee.setAnimationLoop(c),c===null?Lt.stop():Lt.start()},ee.addEventListener("sessionstart",xt),ee.addEventListener("sessionend",Pi),this.render=function(c,b){if(b!==void 0&&b.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;if(c.matrixWorldAutoUpdate===!0&&c.updateMatrixWorld(),b.parent===null&&b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(b),b=ee.getCamera()),c.isScene===!0&&c.onBeforeRender(v,c,b,B),o=Me.get(c,A.length),o.init(b),A.push(o),Z.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),je.setFromProjectionMatrix(Z,Ni,b.reversedDepth),z=this.localClippingEnabled,Ve=te.init(this.clippingPlanes,z),f=G.get(c,y.length),f.init(),y.push(f),ee.enabled===!0&&ee.isPresenting===!0){const Q=v.xr.getDepthSensingMesh();Q!==null&&Bn(Q,b,-1/0,v.sortObjects)}Bn(c,b,0,v.sortObjects),f.finish(),v.sortObjects===!0&&f.sort(me,xe),Ae=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Ae&&Ee.addToRenderList(f,c),this.info.render.frame++,Ve===!0&&te.beginShadows();const I=o.state.shadowsArray;ve.render(I,c,b),Ve===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=f.opaque,C=f.transmissive;if(o.setupLights(),b.isArrayCamera){const Q=b.cameras;if(C.length>0)for(let le=0,pe=Q.length;le<pe;le++){const fe=Q[le];Li(O,C,c,fe)}Ae&&Ee.render(c);for(let le=0,pe=Q.length;le<pe;le++){const fe=Q[le];Di(f,c,fe,fe.viewport)}}else C.length>0&&Li(O,C,c,b),Ae&&Ee.render(c),Di(f,c,b);B!==null&&P===0&&(Ie.updateMultisampleRenderTarget(B),Ie.updateRenderTargetMipmap(B)),c.isScene===!0&&c.onAfterRender(v,c,b),oe.resetDefaultState(),h=-1,u=null,A.pop(),A.length>0?(o=A[A.length-1],Ve===!0&&te.setGlobalState(v.clippingPlanes,o.state.camera)):o=null,y.pop(),y.length>0?f=y[y.length-1]:f=null};function Bn(c,b,I,O){if(c.visible===!1)return;if(c.layers.test(b.layers)){if(c.isGroup)I=c.renderOrder;else if(c.isLOD)c.autoUpdate===!0&&c.update(b);else if(c.isLight)o.pushLight(c),c.castShadow&&o.pushShadow(c);else if(c.isSprite){if(!c.frustumCulled||je.intersectsSprite(c)){O&&ne.setFromMatrixPosition(c.matrixWorld).applyMatrix4(Z);const le=L.update(c),pe=c.material;pe.visible&&f.push(c,le,pe,I,ne.z,null)}}else if((c.isMesh||c.isLine||c.isPoints)&&(!c.frustumCulled||je.intersectsObject(c))){const le=L.update(c),pe=c.material;if(O&&(c.boundingSphere!==void 0?(c.boundingSphere===null&&c.computeBoundingSphere(),ne.copy(c.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),ne.copy(le.boundingSphere.center)),ne.applyMatrix4(c.matrixWorld).applyMatrix4(Z)),Array.isArray(pe)){const fe=le.groups;for(let be=0,Pe=fe.length;be<Pe;be++){const Te=fe[be],Oe=pe[Te.materialIndex];Oe&&Oe.visible&&f.push(c,le,Oe,I,ne.z,Te)}}else pe.visible&&f.push(c,le,pe,I,ne.z,null)}}const Q=c.children;for(let le=0,pe=Q.length;le<pe;le++)Bn(Q[le],b,I,O)}function Di(c,b,I,O){const C=c.opaque,Q=c.transmissive,le=c.transparent;o.setupLightsView(I),Ve===!0&&te.setGlobalState(v.clippingPlanes,I),O&&_e.viewport(w.copy(O)),C.length>0&&hn(C,b,I),Q.length>0&&hn(Q,b,I),le.length>0&&hn(le,b,I),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Li(c,b,I,O){if((I.isScene===!0?I.overrideMaterial:null)!==null)return;o.state.transmissionRenderTarget[O.id]===void 0&&(o.state.transmissionRenderTarget[O.id]=new $t(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?Un:Gt,minFilter:nn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const Q=o.state.transmissionRenderTarget[O.id],le=O.viewport||w;Q.setSize(le.z*v.transmissionResolutionScale,le.w*v.transmissionResolutionScale);const pe=v.getRenderTarget(),fe=v.getActiveCubeFace(),be=v.getActiveMipmapLevel();v.setRenderTarget(Q),v.getClearColor(K),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),Ae&&Ee.render(I);const Pe=v.toneMapping;v.toneMapping=wt;const Te=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),o.setupLightsView(O),Ve===!0&&te.setGlobalState(v.clippingPlanes,O),hn(c,I,O),Ie.updateMultisampleRenderTarget(Q),Ie.updateRenderTargetMipmap(Q),De.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let We=0,it=b.length;We<it;We++){const Ze=b[We],Ke=Ze.object,Re=Ze.geometry,et=Ze.material,He=Ze.group;if(et.side===Tt&&Ke.layers.test(O.layers)){const _t=et.side;et.side=Mt,et.needsUpdate=!0,yi(Ke,I,O,Re,et,He),et.side=_t,et.needsUpdate=!0,Oe=!0}}Oe===!0&&(Ie.updateMultisampleRenderTarget(Q),Ie.updateRenderTargetMipmap(Q))}v.setRenderTarget(pe,fe,be),v.setClearColor(K,q),Te!==void 0&&(O.viewport=Te),v.toneMapping=Pe}function hn(c,b,I){const O=b.isScene===!0?b.overrideMaterial:null;for(let C=0,Q=c.length;C<Q;C++){const le=c[C],pe=le.object,fe=le.geometry,be=le.group;let Pe=le.material;Pe.allowOverride===!0&&O!==null&&(Pe=O),pe.layers.test(I.layers)&&yi(pe,b,I,fe,Pe,be)}}function yi(c,b,I,O,C,Q){c.onBeforeRender(v,b,I,O,C,Q),c.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,c.matrixWorld),c.normalMatrix.getNormalMatrix(c.modelViewMatrix),C.onBeforeRender(v,b,I,O,c,Q),C.transparent===!0&&C.side===Tt&&C.forceSinglePass===!1?(C.side=Mt,C.needsUpdate=!0,v.renderBufferDirect(I,b,O,C,c,Q),C.side=ln,C.needsUpdate=!0,v.renderBufferDirect(I,b,O,C,c,Q),C.side=Tt):v.renderBufferDirect(I,b,O,C,c,Q),c.onAfterRender(v,b,I,O,C,Q)}function mn(c,b,I){b.isScene!==!0&&(b=se);const O=ge.get(c),C=o.state.lights,Q=o.state.shadowsArray,le=C.state.version,pe=k.getParameters(c,C.state,Q,b,I),fe=k.getProgramCacheKey(pe);let be=O.programs;O.environment=c.isMeshStandardMaterial?b.environment:null,O.fog=b.fog,O.envMap=(c.isMeshStandardMaterial?rt:ct).get(c.envMap||O.environment),O.envMapRotation=O.environment!==null&&c.envMap===null?b.environmentRotation:c.envMapRotation,be===void 0&&(c.addEventListener("dispose",Y),be=new Map,O.programs=be);let Pe=be.get(fe);if(Pe!==void 0){if(O.currentProgram===Pe&&O.lightsStateVersion===le)return Ii(c,pe),Pe}else pe.uniforms=k.getUniforms(c),c.onBeforeCompile(pe,v),Pe=k.acquireProgram(pe,fe),be.set(fe,Pe),O.uniforms=pe.uniforms;const Te=O.uniforms;return(!c.isShaderMaterial&&!c.isRawShaderMaterial||c.clipping===!0)&&(Te.clippingPlanes=te.uniform),Ii(c,pe),O.needsLights=za(c),O.lightsStateVersion=le,O.needsLights&&(Te.ambientLightColor.value=C.state.ambient,Te.lightProbe.value=C.state.probe,Te.directionalLights.value=C.state.directional,Te.directionalLightShadows.value=C.state.directionalShadow,Te.spotLights.value=C.state.spot,Te.spotLightShadows.value=C.state.spotShadow,Te.rectAreaLights.value=C.state.rectArea,Te.ltc_1.value=C.state.rectAreaLTC1,Te.ltc_2.value=C.state.rectAreaLTC2,Te.pointLights.value=C.state.point,Te.pointLightShadows.value=C.state.pointShadow,Te.hemisphereLights.value=C.state.hemi,Te.directionalShadowMap.value=C.state.directionalShadowMap,Te.directionalShadowMatrix.value=C.state.directionalShadowMatrix,Te.spotShadowMap.value=C.state.spotShadowMap,Te.spotLightMatrix.value=C.state.spotLightMatrix,Te.spotLightMap.value=C.state.spotLightMap,Te.pointShadowMap.value=C.state.pointShadowMap,Te.pointShadowMatrix.value=C.state.pointShadowMatrix),O.currentProgram=Pe,O.uniformsList=null,Pe}function Ui(c){if(c.uniformsList===null){const b=c.currentProgram.getUniforms();c.uniformsList=Rn.seqWithValue(b.seq,c.uniforms)}return c.uniformsList}function Ii(c,b){const I=ge.get(c);I.outputColorSpace=b.outputColorSpace,I.batching=b.batching,I.batchingColor=b.batchingColor,I.instancing=b.instancing,I.instancingColor=b.instancingColor,I.instancingMorph=b.instancingMorph,I.skinning=b.skinning,I.morphTargets=b.morphTargets,I.morphNormals=b.morphNormals,I.morphColors=b.morphColors,I.morphTargetsCount=b.morphTargetsCount,I.numClippingPlanes=b.numClippingPlanes,I.numIntersection=b.numClipIntersection,I.vertexAlphas=b.vertexAlphas,I.vertexTangents=b.vertexTangents,I.toneMapping=b.toneMapping}function Va(c,b,I,O,C){b.isScene!==!0&&(b=se),Ie.resetTextureUnits();const Q=b.fog,le=O.isMeshStandardMaterial?b.environment:null,pe=B===null?v.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:In,fe=(O.isMeshStandardMaterial?rt:ct).get(O.envMap||le),be=O.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,Pe=!!I.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Te=!!I.morphAttributes.position,Oe=!!I.morphAttributes.normal,We=!!I.morphAttributes.color;let it=wt;O.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(it=v.toneMapping);const Ze=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Ke=Ze!==void 0?Ze.length:0,Re=ge.get(O),et=o.state.lights;if(Ve===!0&&(z===!0||c!==u)){const ft=c===u&&O.id===h;te.setState(O,c,ft)}let He=!1;O.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==et.state.version||Re.outputColorSpace!==pe||C.isBatchedMesh&&Re.batching===!1||!C.isBatchedMesh&&Re.batching===!0||C.isBatchedMesh&&Re.batchingColor===!0&&C.colorTexture===null||C.isBatchedMesh&&Re.batchingColor===!1&&C.colorTexture!==null||C.isInstancedMesh&&Re.instancing===!1||!C.isInstancedMesh&&Re.instancing===!0||C.isSkinnedMesh&&Re.skinning===!1||!C.isSkinnedMesh&&Re.skinning===!0||C.isInstancedMesh&&Re.instancingColor===!0&&C.instanceColor===null||C.isInstancedMesh&&Re.instancingColor===!1&&C.instanceColor!==null||C.isInstancedMesh&&Re.instancingMorph===!0&&C.morphTexture===null||C.isInstancedMesh&&Re.instancingMorph===!1&&C.morphTexture!==null||Re.envMap!==fe||O.fog===!0&&Re.fog!==Q||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==te.numPlanes||Re.numIntersection!==te.numIntersection)||Re.vertexAlphas!==be||Re.vertexTangents!==Pe||Re.morphTargets!==Te||Re.morphNormals!==Oe||Re.morphColors!==We||Re.toneMapping!==it||Re.morphTargetsCount!==Ke)&&(He=!0):(He=!0,Re.__version=O.version);let _t=Re.currentProgram;He===!0&&(_t=mn(O,b,C));let Vt=!1,gt=!1,en=!1;const tt=_t.getUniforms(),vt=Re.uniforms;if(_e.useProgram(_t.program)&&(Vt=!0,gt=!0,en=!0),O.id!==h&&(h=O.id,gt=!0),Vt||u!==c){_e.buffers.depth.getReversed()&&c.reversedDepth!==!0&&(c._reversedDepth=!0,c.updateProjectionMatrix()),tt.setValue(m,"projectionMatrix",c.projectionMatrix),tt.setValue(m,"viewMatrix",c.matrixWorldInverse);const pt=tt.map.cameraPosition;pt!==void 0&&pt.setValue(m,F.setFromMatrixPosition(c.matrixWorld)),we.logarithmicDepthBuffer&&tt.setValue(m,"logDepthBufFC",2/(Math.log(c.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&tt.setValue(m,"isOrthographic",c.isOrthographicCamera===!0),u!==c&&(u=c,gt=!0,en=!0)}if(C.isSkinnedMesh){tt.setOptional(m,C,"bindMatrix"),tt.setOptional(m,C,"bindMatrixInverse");const ft=C.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),tt.setValue(m,"boneTexture",ft.boneTexture,Ie))}C.isBatchedMesh&&(tt.setOptional(m,C,"batchingTexture"),tt.setValue(m,"batchingTexture",C._matricesTexture,Ie),tt.setOptional(m,C,"batchingIdTexture"),tt.setValue(m,"batchingIdTexture",C._indirectTexture,Ie),tt.setOptional(m,C,"batchingColorTexture"),C._colorsTexture!==null&&tt.setValue(m,"batchingColorTexture",C._colorsTexture,Ie));const Et=I.morphAttributes;if((Et.position!==void 0||Et.normal!==void 0||Et.color!==void 0)&&J.update(C,I,_t),(gt||Re.receiveShadow!==C.receiveShadow)&&(Re.receiveShadow=C.receiveShadow,tt.setValue(m,"receiveShadow",C.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(vt.envMap.value=fe,vt.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&b.environment!==null&&(vt.envMapIntensity.value=b.environmentIntensity),gt&&(tt.setValue(m,"toneMappingExposure",v.toneMappingExposure),Re.needsLights&&ka(vt,en),Q&&O.fog===!0&&$.refreshFogUniforms(vt,Q),$.refreshMaterialUniforms(vt,O,V,ie,o.state.transmissionRenderTarget[c.id]),Rn.upload(m,Ui(Re),vt,Ie)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Rn.upload(m,Ui(Re),vt,Ie),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&tt.setValue(m,"center",C.center),tt.setValue(m,"modelViewMatrix",C.modelViewMatrix),tt.setValue(m,"normalMatrix",C.normalMatrix),tt.setValue(m,"modelMatrix",C.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const ft=O.uniformsGroups;for(let pt=0,Hn=ft.length;pt<Hn;pt++){const yt=ft[pt];Ue.update(yt,_t),Ue.bind(yt,_t)}}return _t}function ka(c,b){c.ambientLightColor.needsUpdate=b,c.lightProbe.needsUpdate=b,c.directionalLights.needsUpdate=b,c.directionalLightShadows.needsUpdate=b,c.pointLights.needsUpdate=b,c.pointLightShadows.needsUpdate=b,c.spotLights.needsUpdate=b,c.spotLightShadows.needsUpdate=b,c.rectAreaLights.needsUpdate=b,c.hemisphereLights.needsUpdate=b}function za(c){return c.isMeshLambertMaterial||c.isMeshToonMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.isShadowMaterial||c.isShaderMaterial&&c.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(c,b,I){const O=ge.get(c);O.__autoAllocateDepthBuffer=c.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),ge.get(c.texture).__webglTexture=b,ge.get(c.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:I,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(c,b){const I=ge.get(c);I.__webglFramebuffer=b,I.__useDefaultFramebuffer=b===void 0};const Wa=m.createFramebuffer();this.setRenderTarget=function(c,b=0,I=0){B=c,R=b,P=I;let O=!0,C=null,Q=!1,le=!1;if(c){const fe=ge.get(c);if(fe.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(m.FRAMEBUFFER,null),O=!1;else if(fe.__webglFramebuffer===void 0)Ie.setupRenderTarget(c);else if(fe.__hasExternalTextures)Ie.rebindTextures(c,ge.get(c.texture).__webglTexture,ge.get(c.depthTexture).__webglTexture);else if(c.depthBuffer){const Te=c.depthTexture;if(fe.__boundDepthTexture!==Te){if(Te!==null&&ge.has(Te)&&(c.width!==Te.image.width||c.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(c)}}const be=c.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(le=!0);const Pe=ge.get(c).__webglFramebuffer;c.isWebGLCubeRenderTarget?(Array.isArray(Pe[b])?C=Pe[b][I]:C=Pe[b],Q=!0):c.samples>0&&Ie.useMultisampledRTT(c)===!1?C=ge.get(c).__webglMultisampledFramebuffer:Array.isArray(Pe)?C=Pe[I]:C=Pe,w.copy(c.viewport),H.copy(c.scissor),X=c.scissorTest}else w.copy(Le).multiplyScalar(V).floor(),H.copy(Fe).multiplyScalar(V).floor(),X=Je;if(I!==0&&(C=Wa),_e.bindFramebuffer(m.FRAMEBUFFER,C)&&O&&_e.drawBuffers(c,C),_e.viewport(w),_e.scissor(H),_e.setScissorTest(X),Q){const fe=ge.get(c.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_CUBE_MAP_POSITIVE_X+b,fe.__webglTexture,I)}else if(le){const fe=b;for(let be=0;be<c.textures.length;be++){const Pe=ge.get(c.textures[be]);m.framebufferTextureLayer(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0+be,Pe.__webglTexture,I,fe)}}else if(c!==null&&I!==0){const fe=ge.get(c.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,fe.__webglTexture,I)}h=-1},this.readRenderTargetPixels=function(c,b,I,O,C,Q,le,pe=0){if(!(c&&c.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=ge.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&le!==void 0&&(fe=fe[le]),fe){_e.bindFramebuffer(m.FRAMEBUFFER,fe);try{const be=c.textures[pe],Pe=be.format,Te=be.type;if(!we.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!we.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}b>=0&&b<=c.width-O&&I>=0&&I<=c.height-C&&(c.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+pe),m.readPixels(b,I,O,C,Se.convert(Pe),Se.convert(Te),Q))}finally{const be=B!==null?ge.get(B).__webglFramebuffer:null;_e.bindFramebuffer(m.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(c,b,I,O,C,Q,le,pe=0){if(!(c&&c.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=ge.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&le!==void 0&&(fe=fe[le]),fe)if(b>=0&&b<=c.width-O&&I>=0&&I<=c.height-C){_e.bindFramebuffer(m.FRAMEBUFFER,fe);const be=c.textures[pe],Pe=be.format,Te=be.type;if(!we.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!we.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=m.createBuffer();m.bindBuffer(m.PIXEL_PACK_BUFFER,Oe),m.bufferData(m.PIXEL_PACK_BUFFER,Q.byteLength,m.STREAM_READ),c.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+pe),m.readPixels(b,I,O,C,Se.convert(Pe),Se.convert(Te),0);const We=B!==null?ge.get(B).__webglFramebuffer:null;_e.bindFramebuffer(m.FRAMEBUFFER,We);const it=m.fenceSync(m.SYNC_GPU_COMMANDS_COMPLETE,0);return m.flush(),await Za(m,it,4),m.bindBuffer(m.PIXEL_PACK_BUFFER,Oe),m.getBufferSubData(m.PIXEL_PACK_BUFFER,0,Q),m.deleteBuffer(Oe),m.deleteSync(it),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(c,b=null,I=0){const O=Math.pow(2,-I),C=Math.floor(c.image.width*O),Q=Math.floor(c.image.height*O),le=b!==null?b.x:0,pe=b!==null?b.y:0;Ie.setTexture2D(c,0),m.copyTexSubImage2D(m.TEXTURE_2D,I,0,0,le,pe,C,Q),_e.unbindTexture()};const Xa=m.createFramebuffer(),Ya=m.createFramebuffer();this.copyTextureToTexture=function(c,b,I=null,O=null,C=0,Q=null){Q===null&&(C!==0?(si("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=C,C=0):Q=0);let le,pe,fe,be,Pe,Te,Oe,We,it;const Ze=c.isCompressedTexture?c.mipmaps[Q]:c.image;if(I!==null)le=I.max.x-I.min.x,pe=I.max.y-I.min.y,fe=I.isBox3?I.max.z-I.min.z:1,be=I.min.x,Pe=I.min.y,Te=I.isBox3?I.min.z:0;else{const Et=Math.pow(2,-C);le=Math.floor(Ze.width*Et),pe=Math.floor(Ze.height*Et),c.isDataArrayTexture?fe=Ze.depth:c.isData3DTexture?fe=Math.floor(Ze.depth*Et):fe=1,be=0,Pe=0,Te=0}O!==null?(Oe=O.x,We=O.y,it=O.z):(Oe=0,We=0,it=0);const Ke=Se.convert(b.format),Re=Se.convert(b.type);let et;b.isData3DTexture?(Ie.setTexture3D(b,0),et=m.TEXTURE_3D):b.isDataArrayTexture||b.isCompressedArrayTexture?(Ie.setTexture2DArray(b,0),et=m.TEXTURE_2D_ARRAY):(Ie.setTexture2D(b,0),et=m.TEXTURE_2D),m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,b.flipY),m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),m.pixelStorei(m.UNPACK_ALIGNMENT,b.unpackAlignment);const He=m.getParameter(m.UNPACK_ROW_LENGTH),_t=m.getParameter(m.UNPACK_IMAGE_HEIGHT),Vt=m.getParameter(m.UNPACK_SKIP_PIXELS),gt=m.getParameter(m.UNPACK_SKIP_ROWS),en=m.getParameter(m.UNPACK_SKIP_IMAGES);m.pixelStorei(m.UNPACK_ROW_LENGTH,Ze.width),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,Ze.height),m.pixelStorei(m.UNPACK_SKIP_PIXELS,be),m.pixelStorei(m.UNPACK_SKIP_ROWS,Pe),m.pixelStorei(m.UNPACK_SKIP_IMAGES,Te);const tt=c.isDataArrayTexture||c.isData3DTexture,vt=b.isDataArrayTexture||b.isData3DTexture;if(c.isDepthTexture){const Et=ge.get(c),ft=ge.get(b),pt=ge.get(Et.__renderTarget),Hn=ge.get(ft.__renderTarget);_e.bindFramebuffer(m.READ_FRAMEBUFFER,pt.__webglFramebuffer),_e.bindFramebuffer(m.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let yt=0;yt<fe;yt++)tt&&(m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ge.get(c).__webglTexture,C,Te+yt),m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ge.get(b).__webglTexture,Q,it+yt)),m.blitFramebuffer(be,Pe,le,pe,Oe,We,le,pe,m.DEPTH_BUFFER_BIT,m.NEAREST);_e.bindFramebuffer(m.READ_FRAMEBUFFER,null),_e.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else if(C!==0||c.isRenderTargetTexture||ge.has(c)){const Et=ge.get(c),ft=ge.get(b);_e.bindFramebuffer(m.READ_FRAMEBUFFER,Xa),_e.bindFramebuffer(m.DRAW_FRAMEBUFFER,Ya);for(let pt=0;pt<fe;pt++)tt?m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,Et.__webglTexture,C,Te+pt):m.framebufferTexture2D(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,Et.__webglTexture,C),vt?m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ft.__webglTexture,Q,it+pt):m.framebufferTexture2D(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,ft.__webglTexture,Q),C!==0?m.blitFramebuffer(be,Pe,le,pe,Oe,We,le,pe,m.COLOR_BUFFER_BIT,m.NEAREST):vt?m.copyTexSubImage3D(et,Q,Oe,We,it+pt,be,Pe,le,pe):m.copyTexSubImage2D(et,Q,Oe,We,be,Pe,le,pe);_e.bindFramebuffer(m.READ_FRAMEBUFFER,null),_e.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else vt?c.isDataTexture||c.isData3DTexture?m.texSubImage3D(et,Q,Oe,We,it,le,pe,fe,Ke,Re,Ze.data):b.isCompressedArrayTexture?m.compressedTexSubImage3D(et,Q,Oe,We,it,le,pe,fe,Ke,Ze.data):m.texSubImage3D(et,Q,Oe,We,it,le,pe,fe,Ke,Re,Ze):c.isDataTexture?m.texSubImage2D(m.TEXTURE_2D,Q,Oe,We,le,pe,Ke,Re,Ze.data):c.isCompressedTexture?m.compressedTexSubImage2D(m.TEXTURE_2D,Q,Oe,We,Ze.width,Ze.height,Ke,Ze.data):m.texSubImage2D(m.TEXTURE_2D,Q,Oe,We,le,pe,Ke,Re,Ze);m.pixelStorei(m.UNPACK_ROW_LENGTH,He),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,_t),m.pixelStorei(m.UNPACK_SKIP_PIXELS,Vt),m.pixelStorei(m.UNPACK_SKIP_ROWS,gt),m.pixelStorei(m.UNPACK_SKIP_IMAGES,en),Q===0&&b.generateMipmaps&&m.generateMipmap(et),_e.unbindTexture()},this.initRenderTarget=function(c){ge.get(c).__webglFramebuffer===void 0&&Ie.setupRenderTarget(c)},this.initTexture=function(c){c.isCubeTexture?Ie.setTextureCube(c,0):c.isData3DTexture?Ie.setTexture3D(c,0):c.isDataArrayTexture||c.isCompressedArrayTexture?Ie.setTexture2DArray(c,0):Ie.setTexture2D(c,0),_e.unbindTexture()},this.resetState=function(){R=0,P=0,B=null,_e.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(n),t.unpackColorSpace=at._getUnpackColorSpace()}}const su=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."},{key:"netgl-deck",label:"NetGL + deck.gl",description:"A cross-origin three.js guest drawn over a deck.gl globe, in deck's clip space, occluded by the Earth."}],lu=`
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
#portal-nav-drawer .portal-nav-docs { margin-top: 18px; }
#portal-nav-drawer .portal-nav-docs a { border-color: rgba(154, 140, 255, 0.35); }
#portal-nav-drawer .portal-nav-docs a:hover { background: rgba(154, 140, 255, 0.12); border-color: rgba(154, 140, 255, 0.6); }
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
`,cu='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Yr='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',du=(e,n)=>{const t=e==="three";return n==="three"?t?".":"..":t?`${n}/`:`../${n}/`},fu=e=>{const t=location.pathname.replace(/[^/]*$/,"").replace(/[^/]+\/$/,""),i=t.match(/^(.*\/)v\/([^/]+)\/$/);return i?{root:t,siteRoot:i[1],snapshot:i[2]}:{root:t,siteRoot:t,snapshot:null}},uu=(e,n)=>{const{siteRoot:t,snapshot:i}=fu(),a=`${n}/`,r=(d,l)=>{e.innerHTML="";const S=[["latest",`latest · ${l}`],...d.map(_=>[_,`v${_} snapshot`])];i&&!d.includes(i)&&S.push([i,`v${i} snapshot`]);for(const[_,x]of S){const E=document.createElement("option");E.value=_,E.textContent=x,E.selected=_===(i??"latest"),e.appendChild(E)}};fetch(`${t}v/versions.json`,{cache:"no-cache"}).then(d=>d.ok?d.json():null).then(d=>{d?.versions&&r(d.versions,d.latest??"main")}).catch(()=>{}),e.addEventListener("change",()=>{const d=e.value,l=d==="latest"?t:`${t}v/${d}/`;location.href=`${l}${a}${location.search}${location.hash}`})},Kr=e=>e.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),pu=e=>{if(document.getElementById("portal-nav-toggle"))return;const n=document.createElement("style");n.id="portal-nav-styles",n.textContent=lu,document.head.appendChild(n);const t=document.createElement("aside");t.id="portal-nav-drawer",t.setAttribute("aria-hidden","false"),t.setAttribute("aria-label","Portal demos"),t.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <label class="portal-nav-version">Version
      <select id="portal-nav-version" aria-label="Site version"><option value="latest" selected>latest</option></select>
    </label>
    <ul>
      ${su.map(d=>`
        <li${d.key===e?' class="portal-nav-current"':""}>
          <a href="${du(e,d.key)}"${d.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${Kr(d.label)}</span>
            <span class="portal-nav-desc">${Kr(d.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <div class="portal-nav-docs">
      <a href="../rfcs/">
        <span class="portal-nav-label">Docs: what Portal is, and where it's going</span>
        <span class="portal-nav-desc">The RFC responses: an overview of NetGL, one page per RFC, the tracks of work and the versions they claim.</span>
      </a>
    </div>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const i=document.createElement("button");i.id="portal-nav-toggle",i.type="button",i.setAttribute("aria-label","Close demos menu"),i.setAttribute("aria-expanded","true"),i.setAttribute("aria-controls","portal-nav-drawer"),i.innerHTML=Yr,document.body.appendChild(t),document.body.appendChild(i);const a=t.querySelector("#portal-nav-version");a&&uu(a,e);const r=d=>{t.setAttribute("aria-hidden",d?"false":"true"),i.setAttribute("aria-expanded",d?"true":"false"),i.setAttribute("aria-label",d?"Close demos menu":"Toggle demos menu"),i.innerHTML=d?Yr:cu};i.addEventListener("click",d=>{d.stopPropagation(),r(t.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",d=>{t.getAttribute("aria-hidden")==="true"||d.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||r(!1)}),document.addEventListener("keydown",d=>{d.key==="Escape"&&t.getAttribute("aria-hidden")==="false"&&r(!1)})},hu=(e,n,t={})=>{const i=t.moveSpeed??4,a=t.lookSensitivity??.0025,r=t.lookKeySpeed??1.5;let d=0,l=0;const S=new Set;mu(n,(P,B)=>{d-=P*a,l-=B*a}),window.addEventListener("keydown",P=>S.add(P.code)),window.addEventListener("keyup",P=>S.delete(P.code)),gu(S);const _=new de,x=new de,E=new de,g=P=>{S.has("KeyQ")&&(d+=r*P),S.has("KeyE")&&(d-=r*P),S.has("KeyR")&&(l-=r*P),S.has("KeyF")&&(l+=r*P),l=_u(l),e.quaternion.setFromEuler(new Dn(l,d,0,"YXZ")),x.set(0,0,-1).applyQuaternion(e.quaternion),E.set(1,0,0).applyQuaternion(e.quaternion),_.set(0,0,0),S.has("KeyW")&&_.add(x),S.has("KeyS")&&_.sub(x),S.has("KeyD")&&_.add(E),S.has("KeyA")&&_.sub(E),_.y=0,_.lengthSq()>0&&(_.normalize().multiplyScalar(i*P),e.position.add(_))},T=new St,N=new un,D=new Dn(0,0,0,"YXZ"),f=new de(0,0,0),o=new de,y=new de(0,1,0);return{update:g,setOrientationFromForward:P=>{o.copy(P).normalize(),T.lookAt(f,o,y),N.setFromRotationMatrix(T),D.setFromQuaternion(N,"YXZ"),l=D.x,d=D.y},clearKeys:()=>{S.clear()},getKeys:()=>Array.from(S),setKeys:P=>{S.clear();for(const B of P)S.add(B)}}},mu=(e,n)=>{let t=null,i=0,a=0;e.addEventListener("pointerdown",d=>{if(t===null&&(t=d.pointerId,i=d.clientX,a=d.clientY,d.pointerType!=="mouse"))try{e.setPointerCapture(d.pointerId)}catch{}});const r=d=>{d.pointerId===t&&(t=null)};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),window.addEventListener("pointermove",d=>{if(d.pointerId!==t)return;const l=d.clientX-i,S=d.clientY-a;i=d.clientX,a=d.clientY,n(l,S)})},_u=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),gu=e=>{if(typeof window>"u")return;const n="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,t=()=>n||window.innerWidth<500;if(t()){qr(e);return}const i=()=>{t()&&(window.removeEventListener("resize",i),qr(e))};window.addEventListener("resize",i)},qr=e=>{const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement and look controls"),n.innerHTML=`
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
  `,document.head.appendChild(t),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const a=i.dataset.key,r=l=>{l.preventDefault(),l.stopPropagation(),e.add(a),i.classList.add("is-active");try{i.setPointerCapture(l.pointerId)}catch{}},d=l=>{l.stopPropagation(),e.delete(a),i.classList.remove("is-active")};i.addEventListener("pointerdown",r),i.addEventListener("pointerup",d),i.addEventListener("pointercancel",d),i.addEventListener("pointerleave",d),i.addEventListener("contextmenu",l=>l.preventDefault())}},vi=(e,n)=>[e[0]+n[0],e[1]+n[1],e[2]+n[2]],vu=(e,n)=>[e[0]-n[0],e[1]-n[1],e[2]-n[2]],bn=(e,n)=>[e[0]*n,e[1]*n,e[2]*n],Jn=(e,n)=>e[0]*n[0]+e[1]*n[1]+e[2]*n[2],Zr=(e,n)=>[e[1]*n[2]-e[2]*n[1],e[2]*n[0]-e[0]*n[2],e[0]*n[1]-e[1]*n[0]],an=e=>{const n=Math.hypot(e[0],e[1],e[2]);return n>0?[e[0]/n,e[1]/n,e[2]/n]:[0,0,1]},$r=e=>{const n=an(e.normal),t=an(e.up),i=an(Zr(t,n)),a=an(Zr(n,i));return{right:i,up:a,normal:n}},Ua=(e,n)=>[Jn(e,n.right),Jn(e,n.up),Jn(e,n.normal)],Ia=(e,n)=>vi(vi(bn(n.right,e[0]),bn(n.up,e[1])),bn(n.normal,e[2])),Na=e=>[-e[0],e[1],-e[2]],jr=(e,n,t)=>an(Ia(Na(Ua(e,n)),t)),Eu=(e,n)=>{const t=$r(n.source),i=$r(n.target),a=vu(e.position,n.source.position),r=Ua(a,t),d=bn(Na(r),n.scale),l={position:vi(n.target.position,Ia(d,i))};return e.forward&&(l.forward=jr(e.forward,t,i)),e.up&&(l.up=jr(e.up,t,i)),l};new Ti;new de;new dt;new dt;const Su=(e=new Xe(2,3))=>{const n=new pn(e.x,e.y),t=new Ri({visible:!1}),i=new ut(n,t);return i.name="portal-plane",i.userData.portalSize=e.clone(),i},Mu=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Tu=`
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
`,Qt=1,xu=(e=Qt)=>{const n={portalPos:{value:new de},portalNormal:{value:new de},portalRight:{value:new de},portalUp:{value:new de},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new de},hostInverseViewProjection:{value:new St},hostViewMatrix:{value:new St},hostProjectionMatrix:{value:new St},destinationBackground:{value:new de(0,0,0)}},t=new Dt({uniforms:n,vertexShader:Mu,fragmentShader:Tu,depthTest:!0,depthWrite:!1,side:Tt,stencilWrite:!0,stencilFunc:Ra,stencilRef:e,stencilFail:Ht,stencilZFail:Ht,stencilZPass:Aa,stencilWriteMask:255}),i=new ut(new pn(2,2),t);i.frustumCulled=!1;const a=new Ln;a.add(i);const r=new xa(-1,1,1,-1,0,1),d=new St,l=new de(0,0,1),S=new de(1,0,0),_=new de(0,1,0),x=new un;return{scene:a,camera:r,update:(g,T,N)=>{const D=g.userData.portalSize;n.portalHalfW.value=D?D.x/2:1,n.portalHalfH.value=D?D.y/2:1.5,g.getWorldPosition(n.portalPos.value),g.getWorldQuaternion(x),n.portalNormal.value.copy(l).applyQuaternion(x),n.portalRight.value.copy(S).applyQuaternion(x),n.portalUp.value.copy(_).applyQuaternion(x),T.getWorldPosition(n.hostCameraPos.value),d.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),n.hostInverseViewProjection.value.copy(d).invert(),n.hostViewMatrix.value.copy(T.matrixWorldInverse),n.hostProjectionMatrix.value.copy(T.projectionMatrix),n.destinationBackground.value.set(N.r,N.g,N.b)}}},Oa=(e,n)=>{e.traverse(t=>{const i=t;if(!i.isMesh||!i.material)return;const a=Array.isArray(i.material)?i.material:[i.material];for(const r of a)n(r)})},Au=(e,n=Qt)=>{Oa(e,t=>{t.stencilWrite=!0,t.stencilFunc=ps,t.stencilRef=n,t.stencilFail=Ht,t.stencilZFail=Ht,t.stencilZPass=Ht,t.stencilWriteMask=0})},Ru=e=>{Oa(e,n=>{n.stencilWrite=!1})};new de;const ei=new un,Sn=new de,Mn=new de,Tn=new de,bu=(e,n)=>n||(e.background instanceof ze?e.background:new ze(0,0,0)),Cu=e=>{const{scene:n,anchor:t}=e,i=e.portalNormal??new de(0,0,1),a=e.stencilRef??Qt;return{scene:n,anchor:t,getAnchor:()=>{t.getWorldPosition(Sn),t.getWorldQuaternion(ei),Mn.copy(i).applyQuaternion(ei).normalize(),Tn.set(0,1,0).applyQuaternion(ei).normalize();const l=t.userData.portalSize;return{position:[Sn.x,Sn.y,Sn.z],normal:[Mn.x,Mn.y,Mn.z],up:[Tn.x,Tn.y,Tn.z],halfWidth:l?l.x/2:void 0,halfHeight:l?l.y/2:void 0}},getBackground:()=>{const l=bu(n,e.background);return{r:l.r,g:l.g,b:l.b}},tick:e.tick,renderAsSource(l,S){l.render(n,S)},renderAsDestination(l,S){const _=n.background;n.background=null,Au(n,a),l.render(n,S),Ru(n),n.background=_}}},wu=new Set(["bufferData","bufferSubData","texImage2D","texSubImage2D","texImage3D","texSubImage3D","compressedTexImage2D","compressedTexSubImage2D","compressedTexImage3D","compressedTexSubImage3D","texStorage2D","texStorage3D","renderbufferStorage","renderbufferStorageMultisample","generateMipmap","shaderSource","compileShader","attachShader","linkProgram"]),Pu=1e3,Du=e=>{const n=e.reproject??null,t=e.beforeFrame,i=hs(e.gl,n?{...e.replay,reproject:!0}:e.replay),a=n?.frameView??(F=>typeof F.viewId=="number"?F.viewId:null),r=e.onError??(F=>console.error("[netgl-host] replay error:",F)),d=new Set;let l=null,S=[],_=null,x=null,E=!1,g=[],T=[],N=[];const D=new Set,f=e.wire??ms,o=e.transport.outputOrigin,y=e.messageChannel!==!1&&typeof MessageChannel<"u"&&typeof o=="string"&&o!=="*"&&o!=="null";let A=1,v=0,U=0,R=0,P=null,B="none",h=null,u=null,w=0,H=0,X=[],K=!1,q=null,W=null;const ie=F=>{if(gr(F))return S.push(F),!0;if(vr(F)){const ne={at:_?_.length:0,viewId:a(F),end:F};_?_.push(...S):_=S,g.push(ne),S=[];for(const se of D)se(F);return!0}return!1},V=F=>{W&&clearTimeout(W),W=null;const ne=q??[];q=null,K=F&&P!==null;for(const[se,Ae]of ne)z(se,Ae)},me=()=>{P&&(P.onmessage=null,P.close()),P=null,B="none",X=[],q&&V(!1),K=!1},xe=F=>{const ne=Math.min(f,typeof F.wire=="number"?F.wire:1),se=ne>=2?{type:"netgl:ready-ack",wire:ne}:{type:"netgl:ready-ack"};ne>=2&&(A=2,typeof F.seq=="number"&&(se.seq=F.seq));const Ae=typeof F.session=="string"?F.session:null;if(ne>=2&&(F.port==="stream"||F.port==="all")&&y&&(B==="none"||Ae!==null&&Ae!==h)){me();const m=new MessageChannel;P=m.port1,B="offered",h=Ae,u={seq:typeof F.seq=="number"?F.seq:0,windowItems:w,control:F.port==="all"},P.onmessage=Ge=>je(Ge.data),se.port=m.port2,e.transport.post(se,[m.port2]),u.control&&(q=[],W=setTimeout(()=>V(!1),Pu))}else e.transport.post(se);l||(l=F,e.onReady?.(l))},Le=F=>{if(ie(F))return;if(Er(F)){R+=1;for(const se of F.batch)ie(se);return}if(F.type==="netgl:ready"){xe(F);return}e.onControl?.(F)},Fe=F=>gr(F)||vr(F)?1:Er(F)?F.batch.length:0,Je=()=>{if(X.length===0||w<H)return;const F=X;X=[];for(const ne of F)v+=1,U+=Fe(ne),Le(ne)},je=F=>{if(!(!F||typeof F!="object")){if(F.type==="netgl:port"&&B==="offered"&&u){const ne=F;B="open",H=u.windowItems+Math.max(0,(ne.after??0)-u.seq),q&&V(u.control);return}if(X.length>0||w<H){X.push(F);return}v+=1,U+=Fe(F),Le(F)}};let Ve=e.transport.onMessage(F=>{v+=1;const ne=Fe(F);U+=ne,w+=ne,Le(F),ne>0&&Je()});const z=(F,ne)=>{if(q){q.push([F,ne]);return}K&&P?P.postMessage(F,ne??[]):e.transport.post(F,ne)},Z=(F,ne,se)=>{i.invalidate();let Ae=0;for(let nt=0;nt<F.length;nt+=1){for(;(n||t)&&Ae<ne.length&&ne[Ae].at<=nt;)n&&(i.setReprojection(n.correction(ne[Ae].viewId)),n.viewport&&i.setViewportRemap(n.viewport(ne[Ae].viewId)),n.pixelScale&&i.setPixelScale(n.pixelScale(ne[Ae].viewId))),t?.(ne[Ae].end),Ae+=1;const m=F[nt];if(!(se&&(m.returnId!==void 0||wu.has(m.name))))try{i(m)}catch(Ge){const De=Ge instanceof Error?Ge.message:String(Ge);d.has(De)||(d.add(De),r(Ge))}}if(t)for(;Ae<ne.length;Ae+=1)t(ne[Ae].end);n&&(i.setReprojection(null),i.setViewportRemap(null),i.setPixelScale(null))};return{get ready(){return l},get hasFrame(){return x!==null||_!==null},get canRerun(){return x!==null&&E},replay:i,post:z,wire:{get version(){return A},get port(){return B},get controlOnPort(){return K},get messages(){return v},get items(){return U},get batches(){return R}},onFrame(F){return D.add(F),()=>{D.delete(F)}},get drainedViews(){return N},drain(){if(_){const F=_,ne=g;return _=null,g=[],x=F,T=ne,E=!F.some(se=>se.name.startsWith("delete")),N=ne.map(se=>se.viewId),Z(F,ne,!1),!0}return x&&E?(N=T.map(F=>F.viewId),Z(x,T,!0),!0):!1},stop(){Ve?.(),Ve=null,me(),D.clear()}}},Lu=1e3,Fa=e=>(n,t,i,a)=>{const r=e(),d=r.guestSize;if(!d)return null;const l=r.canvasSize(),S=l.width/d.width,_=l.height/d.height;return[Math.round(n*S),Math.round(t*_),Math.round(i*S),Math.round(a*_)]},Ba=e=>{const n=new ou({antialias:!1,stencil:!0,depth:!0});n.outputColorSpace=la,n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),n.autoClear=!1,e.mount.appendChild(n.domElement);const t=_s({output:e.iframe.contentWindow,inputFilter:e.iframe.contentWindow});let i=0,a=0,r=0;const d=new Set;let l=null;const S=()=>l,_=Du({gl:n.getContext(),transport:t,replay:e.replay(S),onControl:x=>{const E=x;if(E.type==="cesium:rendered"){const g=x;a=g.seq,l.guestSize={width:g.width,height:g.height}}else if(E.type==="cesium:error"){const g=x.message;d.has(g)||(d.add(g),console.error("[cesium guest]",g),e.onStatus(`Cesium error: ${g.split(`
`)[0]}`))}},onError:x=>{console.error("[netgl host] replay error:",x),e.onStatus(`Replay error: ${x instanceof Error?x.message:String(x)}`)}});return l={renderer:n,receiver:_,guestSize:null,canvasSize:()=>{const x=n.getDrawingBufferSize(new Xe);return{width:x.x,height:x.y}},tick(x,E){const g=performance.now();if(a<i&&g-r<Lu)return null;i+=1,r=g;const T={type:"cesium:tick",seq:i,time:x,view:E};return t.post(T),i},lag:()=>i-a},l},yu=4e6,Uu=-60,Iu=20,ti=16e6,Nu=e=>{const n=Ba({...e,replay:R=>({remapScreenViewport:Fa(R),screen:{stencil:{ref:Qt},clear:"depth-only"}})}),{renderer:t,receiver:i}=n,a=new qt(70,window.innerWidth/window.innerHeight,.02,200);a.position.set(0,1.6,5.5);const r=new Ln;r.background=new ze("#101826"),r.add(new gs(12176639,2241348,1));const d=new ba(16777215,.65);d.position.set(3,6,2),r.add(d);const l=new ut(new pn(18,18),new yn({color:"#1b2a3f",roughness:.95,metalness:.03}));l.rotation.x=-Math.PI/2,r.add(l);const S=new Ai(.9,.9,.9),_=new yn({color:"#5da9ff",roughness:.35});for(let R=0;R<14;R+=1){const P=new ut(S,_);P.position.set(Math.sin(R*.5)*4,.45,-3-R*.65),r.add(P)}const x=Su(new Xe(2.6,3.2));x.position.set(0,1.6,-3.5),r.add(x);const E=Cu({scene:r,anchor:x}),g=xu(),T=new ze("#000000"),N=Ou(),D=hu(a,t.domElement);window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix()});const f=new de,o=new de,y=new de,A=()=>{a.updateMatrixWorld(),a.getWorldPosition(f),a.getWorldDirection(o),y.set(0,1,0).applyQuaternion(a.quaternion);const R=Eu({position:[f.x,f.y,f.z],forward:[o.x,o.y,o.z],up:[y.x,y.y,y.z]},{source:E.getAnchor(),target:N,scale:yu});return{position:R.position,direction:R.forward,up:R.up,fovy:Pt.degToRad(a.fov)}},v=new Ca;n.tick(0,A());const U=()=>{t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,a),i.ready&&(g.update(x,a,T),t.render(g.scene,g.camera),t.clearDepth(),i.drain(),t.resetState()),D.update(v.getDelta()),n.tick(v.elapsedTime,A()),requestAnimationFrame(U)};U()},Ou=()=>{const e=Pt.degToRad(Uu),n=Pt.degToRad(Iu),t=new de(Math.cos(n)*Math.cos(e),Math.cos(n)*Math.sin(e),Math.sin(n)),i=new de(0,0,1).addScaledVector(t,-t.z).normalize();return{position:[t.x*ti,t.y*ti,t.z*ti],normal:[-t.x,-t.y,-t.z],up:[i.x,i.y,i.z]}},Qr={type:"change"},Ci={type:"start"},Ha={type:"end"},xn=new Es,Jr=new Ti,Fu=Math.cos(70*Pt.DEG2RAD),ot=new de,ht=2*Math.PI,Ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ni=1e-6;class Bu extends vs{constructor(n,t=null){super(n,t),this.state=Ye.NONE,this.target=new de,this.cursor=new de,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zt.ROTATE,MIDDLE:Zt.DOLLY,RIGHT:Zt.PAN},this.touches={ONE:Yt.ROTATE,TWO:Yt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new de,this._lastQuaternion=new un,this._lastTargetPosition=new de,this._quat=new un().setFromUnitVectors(n.up,new de(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Sr,this._sphericalDelta=new Sr,this._scale=1,this._panOffset=new de,this._rotateStart=new Xe,this._rotateEnd=new Xe,this._rotateDelta=new Xe,this._panStart=new Xe,this._panEnd=new Xe,this._panDelta=new Xe,this._dollyStart=new Xe,this._dollyEnd=new Xe,this._dollyDelta=new Xe,this._dollyDirection=new de,this._mouse=new Xe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Gu.bind(this),this._onPointerDown=Hu.bind(this),this._onPointerUp=Vu.bind(this),this._onContextMenu=qu.bind(this),this._onMouseWheel=Wu.bind(this),this._onKeyDown=Xu.bind(this),this._onTouchStart=Yu.bind(this),this._onTouchMove=Ku.bind(this),this._onMouseDown=ku.bind(this),this._onMouseMove=zu.bind(this),this._interceptControlDown=Zu.bind(this),this._interceptControlUp=$u.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Qr),this.update(),this.state=Ye.NONE}update(n=null){const t=this.object.position;ot.copy(t).sub(this.target),ot.applyQuaternion(this._quat),this._spherical.setFromVector3(ot),this.autoRotate&&this.state===Ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(i)&&isFinite(a)&&(i<-Math.PI?i+=ht:i>Math.PI&&(i-=ht),a<-Math.PI?a+=ht:a>Math.PI&&(a-=ht),i<=a?this._spherical.theta=Math.max(i,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+a)/2?Math.max(i,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const d=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=d!=this._spherical.radius}if(ot.setFromSpherical(this._spherical),ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let d=null;if(this.object.isPerspectiveCamera){const l=ot.length();d=this._clampDistance(l*this._scale);const S=l-d;this.object.position.addScaledVector(this._dollyDirection,S),this.object.updateMatrixWorld(),r=!!S}else if(this.object.isOrthographicCamera){const l=new de(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const S=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=S!==this.object.zoom;const _=new de(this._mouse.x,this._mouse.y,0);_.unproject(this.object),this.object.position.sub(_).add(l),this.object.updateMatrixWorld(),d=ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;d!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(d).add(this.object.position):(xn.origin.copy(this.object.position),xn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(xn.direction))<Fu?this.object.lookAt(this.target):(Jr.setFromNormalAndCoplanarPoint(this.object.up,this.target),xn.intersectPlane(Jr,this.target))))}else if(this.object.isOrthographicCamera){const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),d!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ni||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ni||this._lastTargetPosition.distanceToSquared(this.target)>ni?(this.dispatchEvent(Qr),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?ht/60*this.autoRotateSpeed*n:ht/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){ot.setFromMatrixColumn(t,0),ot.multiplyScalar(-n),this._panOffset.add(ot)}_panUp(n,t){this.screenSpacePanning===!0?ot.setFromMatrixColumn(t,1):(ot.setFromMatrixColumn(t,0),ot.crossVectors(this.object.up,ot)),ot.multiplyScalar(n),this._panOffset.add(ot)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;ot.copy(a).sub(this.target);let r=ot.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),a=n-i.left,r=t-i.top,d=i.width,l=i.height;this._mouse.x=a/d*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),a=.5*(n.pageY+t.y);this._rotateStart.set(i,a)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),a=.5*(n.pageY+t.y);this._panStart.set(i,a)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,a=n.pageY-t.y,r=Math.sqrt(i*i+a*a);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),a=.5*(n.pageX+i.x),r=.5*(n.pageY+i.y);this._rotateEnd.set(a,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),a=.5*(n.pageY+t.y);this._panEnd.set(i,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,a=n.pageY-t.y,r=Math.sqrt(i*i+a*a);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const d=(n.pageX+t.x)*.5,l=(n.pageY+t.y)*.5;this._updateZoomParameters(d,l)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new Xe,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Hu(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function Gu(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function Vu(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ha),this.state=Ye.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function ku(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=Ye.DOLLY;break;case Zt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Ye.ROTATE}break;case Zt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Ye.PAN}break;default:this.state=Ye.NONE}this.state!==Ye.NONE&&this.dispatchEvent(Ci)}function zu(e){switch(this.state){case Ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function Wu(e){this.enabled===!1||this.enableZoom===!1||this.state!==Ye.NONE||(e.preventDefault(),this.dispatchEvent(Ci),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Ha))}function Xu(e){this.enabled!==!1&&this._handleKeyDown(e)}function Yu(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Yt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Ye.TOUCH_ROTATE;break;case Yt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Ye.TOUCH_PAN;break;default:this.state=Ye.NONE}break;case 2:switch(this.touches.TWO){case Yt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Ye.TOUCH_DOLLY_PAN;break;case Yt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Ye.TOUCH_DOLLY_ROTATE;break;default:this.state=Ye.NONE}break;default:this.state=Ye.NONE}this.state!==Ye.NONE&&this.dispatchEvent(Ci)}function Ku(e){switch(this._trackPointer(e),this.state){case Ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Ye.NONE}}function qu(e){this.enabled!==!1&&e.preventDefault()}function Zu(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function $u(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const wi=1e6,zt=6378137/wi,ea=6356752314245e-6/wi,ii=1.025,ju=.05,Qu=e=>{const n=Ba({...e,replay:B=>({remapScreenViewport:Fa(B),screen:{stencil:{ref:Qt},blend:"premultiplied-over",clear:"depth-only"}})}),{renderer:t,receiver:i}=n,a=new qt(40,window.innerWidth/window.innerHeight,.01,2e4);a.position.set(6,2.5,26);const r=new Ln;r.background=new ze("#000000");const d=new de(1,.25,.6).normalize(),l=new ba(16777215,2.2);l.position.copy(d).multiplyScalar(100),r.add(l),r.add(new Ss(2241348,.25)),r.add(ep());const S=new Yn;S.rotation.z=Pt.degToRad(23.4),r.add(S);const _=new Yn;S.add(_);const x=new Mr(1,128,96),E=new ut(x,new yn({color:"#1d4f91",roughness:.8}));E.scale.set(zt,ea,zt),_.add(E);const g=new Ln,T=new ut(x,new Ri({side:Tt,colorWrite:!1,depthWrite:!1,depthTest:!0,stencilWrite:!0,stencilRef:Qt,stencilFunc:Ra,stencilZPass:Aa,stencilFail:Ht,stencilZFail:Ht}));g.add(T);const N=new Yn;N.rotation.x=Pt.degToRad(-8),r.add(N);const D=new ut(new Mr(1.737,64,48),new yn({color:"#b8b4ac",roughness:.95}));N.add(D);const f=new Bu(a,t.domElement);f.enableDamping=!0,f.minDistance=zt*1.02,f.maxDistance=400,f.zoomSpeed=.6,f.rotateSpeed=.5;const o=()=>{const B=a.position.length()-zt;f.rotateSpeed=Pt.clamp(B/20,.02,.5)};window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix()});const y=new Ca;let A=e.startTime??0;const v=()=>{_.rotation.y=A*ju;const B=A*.12;D.position.set(Math.cos(B)*16,0,Math.sin(B)*16),r.updateMatrixWorld(),T.matrixAutoUpdate=!1,T.matrix.copy(_.matrixWorld).multiply(new St().makeScale(zt*ii,ea*ii,zt*ii)),T.matrixWorldNeedsUpdate=!0};let U=0;const R=()=>(a.updateMatrixWorld(),n.tick(A,Ju(a,_)));v(),R();const P=()=>{const B=i.hasFrame;E.visible=!B,t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,a),B&&(t.render(g,a),t.clearDepth(),i.drain(),t.resetState());const h=Math.min(y.getDelta(),.1);e.paused||(A+=h),o(),f.update(h),v(),R()===null?U+=1:U=0,e.onLag(U),requestAnimationFrame(P)};P()},ri=new St,ta=new de,na=new de,ia=new de,ai=new Be,oi=(e,n)=>[e.x*n,-e.z*n,e.y*n],Ju=(e,n)=>(ri.copy(n.matrixWorld).invert(),ai.setFromMatrix4(ri),ta.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ri),e.getWorldDirection(na).applyMatrix3(ai).normalize(),ia.set(0,1,0).applyQuaternion(e.quaternion).applyMatrix3(ai).normalize(),{position:oi(ta,wi),direction:oi(na,1),up:oi(ia,1),fovy:Pt.degToRad(e.fov)}),ep=()=>{const n=new Float32Array(12e3),t=new de;let i=7;const a=()=>(i=i*16807%2147483647,i/2147483647);for(let d=0;d<4e3;d+=1)t.set(a()*2-1,a()*2-1,a()*2-1).normalize().multiplyScalar(5e3),n.set([t.x,t.y,t.z],d*3);const r=new xi;return r.setAttribute("position",new sn(n,3)),new Ms(r,new Ts({color:16777215,size:1.6,sizeAttenuation:!1}))};pu("netgl-cesium");const Fn=xs(location.search),Ei=new URLSearchParams(location.search),ra=document.querySelector("#app"),Si=document.querySelector("#guest"),aa=document.querySelector("#status"),tp=document.querySelector("#lag"),Ga=new URLSearchParams({mode:Fn}),oa=Ei.get("imagery");oa&&Ga.set("imagery",oa);Si.src=`cesium.html?${Ga}`;document.querySelectorAll("a[data-mode]").forEach(e=>{const n=new URLSearchParams(location.search);n.set("mode",e.dataset.mode),e.href=`?${n}`,e.dataset.mode===Fn&&e.classList.add("current")});document.querySelector(`[data-help="${Fn}"]`).hidden=!1;const sa=e=>{aa.textContent=e,aa.hidden=!1};Fn==="earth"?Qu({iframe:Si,mount:ra,onStatus:sa,startTime:Number(Ei.get("time")??0),paused:Ei.has("pause"),onLag:e=>{tp.textContent=String(Math.max(0,e))}}):Nu({iframe:Si,mount:ra,onStatus:sa});
