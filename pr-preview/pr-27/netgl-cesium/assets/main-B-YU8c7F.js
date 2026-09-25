import{c as ro,N as wt,S as Ea,C as Ve,F as Sa,M as St,V as se,R as ao,a as dt,w as _i,W as Wi,b as jt,d as rt,L as rn,H as Hn,U as Gt,D as Tt,B as Mt,e as cn,f as Gn,p as oo,E as so,g as ze,P as qt,A as lo,h as Yn,i as Ct,j as Un,k as Di,l as dn,m as fn,n as Ma,o as co,q as Wt,r as In,s as fo,t as uo,u as nn,O as po,v as ho,x as mo,y as _o,z as go,G as vo,I as Eo,J as So,K as Mo,Q as To,T as xo,X as Ao,Y as Ro,Z as bo,_ as Co,$ as wo,a0 as Po,a1 as Do,a2 as Kn,a3 as Xt,a4 as gn,a5 as Lo,a6 as sn,a7 as yo,a8 as Uo,a9 as Io,aa as No,ab as Ta,ac as Oo,ad as Fo,ae as Bo,af as Li,ag as Fe,ah as Ho,ai as Go,aj as Vo,ak as Dt,al as yi,am as ln,an as ut,ao as xa,ap as Bt,aq as bt,ar as Nn,as as Aa,at as Ra,au as ba,av as hn,aw as ko,ax as zo,ay as Wo,az as Xo,aA as Ca,aB as Ft,aC as Yo,aD as Ko,aE as qo,aF as wa,aG as $o,aH as Pa,aI as Da,aJ as qn,aK as $n,aL as Zn,aM as jn,aN as $e,aO as Xi,aP as Yi,aQ as Ki,aR as qi,aS as $i,aT as Zi,aU as ji,aV as Qi,aW as Ji,aX as er,aY as tr,aZ as nr,a_ as ir,a$ as rr,b0 as ar,b1 as or,b2 as sr,b3 as lr,b4 as cr,b5 as dr,b6 as fr,b7 as ur,b8 as pr,b9 as hr,ba as mr,bb as _r,bc as gr,bd as vr,be as gi,bf as vi,bg as Ei,bh as Si,bi as Mi,bj as Ti,bk as xi,bl as Zo,bm as Er,bn as jo,bo as Dn,bp as Qo,bq as Sr,br as Mr,bs as Tr,bt as Ai,bu as Ri,bv as Jo,bw as La,bx as es,by as Vn,bz as ts,bA as ns,bB as ya,bC as Ui,bD as xr,bE as On,bF as Ar,bG as Ua,bH as un,bI as Qt,bJ as Ia,bK as Ii,bL as is,bM as rs,bN as as,bO as Rr,bP as mt,bQ as os,bR as ss,bS as ls,bT as cs,bU as ds,bV as fs,bW as us,bX as ps,bY as hs,bZ as ms,b_ as _s,b$ as gs,c0 as vs,c1 as Es,c2 as Ss,c3 as Ms,c4 as Ts,c5 as xs,c6 as pn,c7 as Na,c8 as Ht,c9 as Oa,ca as Fn,cb as As,cc as Rs,cd as bs,ce as Fa,cf as Bn,cg as Pt,ch as Ba,ci as Cs,cj as $t,ck as Yt,cl as br,cm as ws,cn as Ps,co as Qn,cp as Cr,cq as Ds,cr as Ls,cs as ys}from"./protocol-DmfdGqC2.js";function Ha(){let e=null,n=!1,t=null,i=null;function o(r,f){t(r,f),i=e.requestAnimationFrame(o)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(o),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function Us(e){const n=new WeakMap;function t(c,E){const S=c.array,b=c.usage,m=S.byteLength,v=e.createBuffer();e.bindBuffer(E,v),e.bufferData(E,S,b),c.onUploadCallback();let M;if(S instanceof Float32Array)M=e.FLOAT;else if(typeof Float16Array<"u"&&S instanceof Float16Array)M=e.HALF_FLOAT;else if(S instanceof Uint16Array)c.isFloat16BufferAttribute?M=e.HALF_FLOAT:M=e.UNSIGNED_SHORT;else if(S instanceof Int16Array)M=e.SHORT;else if(S instanceof Uint32Array)M=e.UNSIGNED_INT;else if(S instanceof Int32Array)M=e.INT;else if(S instanceof Int8Array)M=e.BYTE;else if(S instanceof Uint8Array)M=e.UNSIGNED_BYTE;else if(S instanceof Uint8ClampedArray)M=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+S);return{buffer:v,type:M,bytesPerElement:S.BYTES_PER_ELEMENT,version:c.version,size:m}}function i(c,E,S){const b=E.array,m=E.updateRanges;if(e.bindBuffer(S,c),m.length===0)e.bufferSubData(S,0,b);else{m.sort((M,N)=>M.start-N.start);let v=0;for(let M=1;M<m.length;M++){const N=m[v],y=m[M];y.start<=N.start+N.count+1?N.count=Math.max(N.count,y.start+y.count-N.start):(++v,m[v]=y)}m.length=v+1;for(let M=0,N=m.length;M<N;M++){const y=m[M];e.bufferSubData(S,y.start*b.BYTES_PER_ELEMENT,b,y.start,y.count)}E.clearUpdateRanges()}E.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const E=n.get(c);E&&(e.deleteBuffer(E.buffer),n.delete(c))}function f(c,E){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const b=n.get(c);(!b||b.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const S=n.get(c);if(S===void 0)n.set(c,t(c,E));else if(S.version<c.version){if(S.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(S.buffer,c,E),S.version=c.version}}return{get:o,remove:r,update:f}}var Is=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ns=`#ifdef USE_ALPHAHASH
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
#endif`,Os=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fs=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bs=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hs=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gs=`#ifdef USE_AOMAP
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
#endif`,Vs=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ks=`#ifdef USE_BATCHING
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
#endif`,zs=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ws=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xs=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ys=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ks=`#ifdef USE_IRIDESCENCE
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
#endif`,qs=`#ifdef USE_BUMPMAP
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
#endif`,$s=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zs=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,js=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qs=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Js=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,el=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tl=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nl=`#if defined( USE_COLOR_ALPHA )
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
#endif`,il=`#define PI 3.141592653589793
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
} // validated`,rl=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,al=`vec3 transformedNormal = objectNormal;
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
#endif`,ol=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sl=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ll=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cl=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dl="gl_FragColor = linearToOutputTexel( gl_FragColor );",fl=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ul=`#ifdef USE_ENVMAP
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
#endif`,pl=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hl=`#ifdef USE_ENVMAP
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
#endif`,ml=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_l=`#ifdef USE_ENVMAP
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
#endif`,gl=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vl=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,El=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sl=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ml=`#ifdef USE_GRADIENTMAP
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
}`,Tl=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xl=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Al=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rl=`uniform bool receiveShadow;
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
#endif`,bl=`#ifdef USE_ENVMAP
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
#endif`,Cl=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pl=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ll=`PhysicalMaterial material;
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
#endif`,yl=`struct PhysicalMaterial {
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
}`,Ul=`
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
#endif`,Il=`#if defined( RE_IndirectDiffuse )
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
#endif`,Nl=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ol=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gl=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vl=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kl=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zl=`#if defined( USE_POINTS_UV )
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
#endif`,Wl=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xl=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yl=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kl=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ql=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$l=`#ifdef USE_MORPHTARGETS
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
#endif`,Zl=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jl=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ql=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Jl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ec=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tc=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nc=`#ifdef USE_NORMALMAP
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
#endif`,ic=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rc=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ac=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oc=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sc=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lc=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cc=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dc=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fc=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uc=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pc=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hc=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mc=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_c=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gc=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vc=`float getShadowMask() {
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
}`,Ec=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sc=`#ifdef USE_SKINNING
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
#endif`,Mc=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tc=`#ifdef USE_SKINNING
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
#endif`,xc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ac=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rc=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bc=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cc=`#ifdef USE_TRANSMISSION
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
#endif`,wc=`#ifdef USE_TRANSMISSION
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
#endif`,Pc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yc=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Uc=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ic=`uniform sampler2D t2D;
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
}`,Nc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Oc=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Fc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bc=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hc=`#include <common>
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
}`,Gc=`#if DEPTH_PACKING == 3200
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
}`,Vc=`#define DISTANCE
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
}`,kc=`#define DISTANCE
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
}`,zc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wc=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xc=`uniform float scale;
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
}`,Yc=`uniform vec3 diffuse;
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
}`,Kc=`#include <common>
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
}`,qc=`uniform vec3 diffuse;
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
}`,$c=`#define LAMBERT
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
}`,Zc=`#define LAMBERT
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
}`,jc=`#define MATCAP
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
}`,Qc=`#define MATCAP
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
}`,Jc=`#define NORMAL
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
}`,ed=`#define NORMAL
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
}`,td=`#define PHONG
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
}`,nd=`#define PHONG
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
}`,id=`#define STANDARD
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
}`,rd=`#define STANDARD
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
}`,ad=`#define TOON
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
}`,od=`#define TOON
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
}`,sd=`uniform float size;
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
}`,ld=`uniform vec3 diffuse;
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
}`,cd=`#include <common>
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
}`,dd=`uniform vec3 color;
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
}`,fd=`uniform float rotation;
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
}`,ud=`uniform vec3 diffuse;
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
}`,Ie={alphahash_fragment:Is,alphahash_pars_fragment:Ns,alphamap_fragment:Os,alphamap_pars_fragment:Fs,alphatest_fragment:Bs,alphatest_pars_fragment:Hs,aomap_fragment:Gs,aomap_pars_fragment:Vs,batching_pars_vertex:ks,batching_vertex:zs,begin_vertex:Ws,beginnormal_vertex:Xs,bsdfs:Ys,iridescence_fragment:Ks,bumpmap_pars_fragment:qs,clipping_planes_fragment:$s,clipping_planes_pars_fragment:Zs,clipping_planes_pars_vertex:js,clipping_planes_vertex:Qs,color_fragment:Js,color_pars_fragment:el,color_pars_vertex:tl,color_vertex:nl,common:il,cube_uv_reflection_fragment:rl,defaultnormal_vertex:al,displacementmap_pars_vertex:ol,displacementmap_vertex:sl,emissivemap_fragment:ll,emissivemap_pars_fragment:cl,colorspace_fragment:dl,colorspace_pars_fragment:fl,envmap_fragment:ul,envmap_common_pars_fragment:pl,envmap_pars_fragment:hl,envmap_pars_vertex:ml,envmap_physical_pars_fragment:bl,envmap_vertex:_l,fog_vertex:gl,fog_pars_vertex:vl,fog_fragment:El,fog_pars_fragment:Sl,gradientmap_pars_fragment:Ml,lightmap_pars_fragment:Tl,lights_lambert_fragment:xl,lights_lambert_pars_fragment:Al,lights_pars_begin:Rl,lights_toon_fragment:Cl,lights_toon_pars_fragment:wl,lights_phong_fragment:Pl,lights_phong_pars_fragment:Dl,lights_physical_fragment:Ll,lights_physical_pars_fragment:yl,lights_fragment_begin:Ul,lights_fragment_maps:Il,lights_fragment_end:Nl,logdepthbuf_fragment:Ol,logdepthbuf_pars_fragment:Fl,logdepthbuf_pars_vertex:Bl,logdepthbuf_vertex:Hl,map_fragment:Gl,map_pars_fragment:Vl,map_particle_fragment:kl,map_particle_pars_fragment:zl,metalnessmap_fragment:Wl,metalnessmap_pars_fragment:Xl,morphinstance_vertex:Yl,morphcolor_vertex:Kl,morphnormal_vertex:ql,morphtarget_pars_vertex:$l,morphtarget_vertex:Zl,normal_fragment_begin:jl,normal_fragment_maps:Ql,normal_pars_fragment:Jl,normal_pars_vertex:ec,normal_vertex:tc,normalmap_pars_fragment:nc,clearcoat_normal_fragment_begin:ic,clearcoat_normal_fragment_maps:rc,clearcoat_pars_fragment:ac,iridescence_pars_fragment:oc,opaque_fragment:sc,packing:lc,premultiplied_alpha_fragment:cc,project_vertex:dc,dithering_fragment:fc,dithering_pars_fragment:uc,roughnessmap_fragment:pc,roughnessmap_pars_fragment:hc,shadowmap_pars_fragment:mc,shadowmap_pars_vertex:_c,shadowmap_vertex:gc,shadowmask_pars_fragment:vc,skinbase_vertex:Ec,skinning_pars_vertex:Sc,skinning_vertex:Mc,skinnormal_vertex:Tc,specularmap_fragment:xc,specularmap_pars_fragment:Ac,tonemapping_fragment:Rc,tonemapping_pars_fragment:bc,transmission_fragment:Cc,transmission_pars_fragment:wc,uv_pars_fragment:Pc,uv_pars_vertex:Dc,uv_vertex:Lc,worldpos_vertex:yc,background_vert:Uc,background_frag:Ic,backgroundCube_vert:Nc,backgroundCube_frag:Oc,cube_vert:Fc,cube_frag:Bc,depth_vert:Hc,depth_frag:Gc,distanceRGBA_vert:Vc,distanceRGBA_frag:kc,equirect_vert:zc,equirect_frag:Wc,linedashed_vert:Xc,linedashed_frag:Yc,meshbasic_vert:Kc,meshbasic_frag:qc,meshlambert_vert:$c,meshlambert_frag:Zc,meshmatcap_vert:jc,meshmatcap_frag:Qc,meshnormal_vert:Jc,meshnormal_frag:ed,meshphong_vert:td,meshphong_frag:nd,meshphysical_vert:id,meshphysical_frag:rd,meshtoon_vert:ad,meshtoon_frag:od,points_vert:sd,points_frag:ld,shadow_vert:cd,shadow_frag:dd,sprite_vert:fd,sprite_frag:ud},ie={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},At={basic:{uniforms:mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:mt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:mt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:mt([ie.points,ie.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:mt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:mt([ie.common,ie.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:mt([ie.sprite,ie.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:mt([ie.common,ie.displacementmap,{referencePosition:{value:new se},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:mt([ie.lights,ie.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};At.physical={uniforms:mt([At.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const vn={r:0,b:0,g:0},Ut=new On,pd=new St;function hd(e,n,t,i,o,r,f){const c=new Ve(0);let E=r===!0?0:1,S,b,m=null,v=0,M=null;function N(x){let g=x.isScene===!0?x.background:null;return g&&g.isTexture&&(g=(x.backgroundBlurriness>0?t:n).get(g)),g}function y(x){let g=!1;const P=N(x);P===null?a(c,E):P&&P.isColor&&(a(P,1),g=!0);const A=e.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,f):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,f),(e.autoClear||g)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function s(x,g){const P=N(g);P&&(P.isCubeTexture||P.mapping===Vn)?(b===void 0&&(b=new ut(new Ui(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:xr(At.backgroundCube.uniforms),vertexShader:At.backgroundCube.vertexShader,fragmentShader:At.backgroundCube.fragmentShader,side:Mt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),b.geometry.deleteAttribute("normal"),b.geometry.deleteAttribute("uv"),b.onBeforeRender=function(A,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(b.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(b)),Ut.copy(g.backgroundRotation),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),b.material.uniforms.envMap.value=P,b.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,b.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,b.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,b.material.uniforms.backgroundRotation.value.setFromMatrix4(pd.makeRotationFromEuler(Ut)),b.material.toneMapped=rt.getTransfer(P.colorSpace)!==$e,(m!==P||v!==P.version||M!==e.toneMapping)&&(b.material.needsUpdate=!0,m=P,v=P.version,M=e.toneMapping),b.layers.enableAll(),x.unshift(b,b.geometry,b.material,0,0,null)):P&&P.isTexture&&(S===void 0&&(S=new ut(new hn(2,2),new Dt({name:"BackgroundMaterial",uniforms:xr(At.background.uniforms),vertexShader:At.background.vertexShader,fragmentShader:At.background.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),S.geometry.deleteAttribute("normal"),Object.defineProperty(S.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(S)),S.material.uniforms.t2D.value=P,S.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,S.material.toneMapped=rt.getTransfer(P.colorSpace)!==$e,P.matrixAutoUpdate===!0&&P.updateMatrix(),S.material.uniforms.uvTransform.value.copy(P.matrix),(m!==P||v!==P.version||M!==e.toneMapping)&&(S.material.needsUpdate=!0,m=P,v=P.version,M=e.toneMapping),S.layers.enableAll(),x.unshift(S,S.geometry,S.material,0,0,null))}function a(x,g){x.getRGB(vn,ya(e)),i.buffers.color.setClear(vn.r,vn.g,vn.b,g,f)}function T(){b!==void 0&&(b.geometry.dispose(),b.material.dispose(),b=void 0),S!==void 0&&(S.geometry.dispose(),S.material.dispose(),S=void 0)}return{getClearColor:function(){return c},setClearColor:function(x,g=1){c.set(x),E=g,a(c,E)},getClearAlpha:function(){return E},setClearAlpha:function(x){E=x,a(c,E)},render:y,addToRenderList:s,dispose:T}}function md(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},o=v(null);let r=o,f=!1;function c(p,L,B,X,Y){let $=!1;const W=m(X,B,L);r!==W&&(r=W,S(r.object)),$=M(p,X,B,Y),$&&N(p,X,B,Y),Y!==null&&n.update(Y,e.ELEMENT_ARRAY_BUFFER),($||f)&&(f=!1,g(p,L,B,X),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Y).buffer))}function E(){return e.createVertexArray()}function S(p){return e.bindVertexArray(p)}function b(p){return e.deleteVertexArray(p)}function m(p,L,B){const X=B.wireframe===!0;let Y=i[p.id];Y===void 0&&(Y={},i[p.id]=Y);let $=Y[L.id];$===void 0&&($={},Y[L.id]=$);let W=$[X];return W===void 0&&(W=v(E()),$[X]=W),W}function v(p){const L=[],B=[],X=[];for(let Y=0;Y<t;Y++)L[Y]=0,B[Y]=0,X[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:X,object:p,attributes:{},index:null}}function M(p,L,B,X){const Y=r.attributes,$=L.attributes;let W=0;const ne=B.getAttributes();for(const V in ne)if(ne[V].location>=0){const xe=Y[V];let ye=$[V];if(ye===void 0&&(V==="instanceMatrix"&&p.instanceMatrix&&(ye=p.instanceMatrix),V==="instanceColor"&&p.instanceColor&&(ye=p.instanceColor)),xe===void 0||xe.attribute!==ye||ye&&xe.data!==ye.data)return!0;W++}return r.attributesNum!==W||r.index!==X}function N(p,L,B,X){const Y={},$=L.attributes;let W=0;const ne=B.getAttributes();for(const V in ne)if(ne[V].location>=0){let xe=$[V];xe===void 0&&(V==="instanceMatrix"&&p.instanceMatrix&&(xe=p.instanceMatrix),V==="instanceColor"&&p.instanceColor&&(xe=p.instanceColor));const ye={};ye.attribute=xe,xe&&xe.data&&(ye.data=xe.data),Y[V]=ye,W++}r.attributes=Y,r.attributesNum=W,r.index=X}function y(){const p=r.newAttributes;for(let L=0,B=p.length;L<B;L++)p[L]=0}function s(p){a(p,0)}function a(p,L){const B=r.newAttributes,X=r.enabledAttributes,Y=r.attributeDivisors;B[p]=1,X[p]===0&&(e.enableVertexAttribArray(p),X[p]=1),Y[p]!==L&&(e.vertexAttribDivisor(p,L),Y[p]=L)}function T(){const p=r.newAttributes,L=r.enabledAttributes;for(let B=0,X=L.length;B<X;B++)L[B]!==p[B]&&(e.disableVertexAttribArray(B),L[B]=0)}function x(p,L,B,X,Y,$,W){W===!0?e.vertexAttribIPointer(p,L,B,Y,$):e.vertexAttribPointer(p,L,B,X,Y,$)}function g(p,L,B,X){y();const Y=X.attributes,$=B.getAttributes(),W=L.defaultAttributeValues;for(const ne in $){const V=$[ne];if(V.location>=0){let ve=Y[ne];if(ve===void 0&&(ne==="instanceMatrix"&&p.instanceMatrix&&(ve=p.instanceMatrix),ne==="instanceColor"&&p.instanceColor&&(ve=p.instanceColor)),ve!==void 0){const xe=ve.normalized,ye=ve.itemSize,He=n.get(ve);if(He===void 0)continue;const nt=He.buffer,et=He.type,Xe=He.bytesPerElement,k=et===e.INT||et===e.UNSIGNED_INT||ve.gpuType===Ca;if(ve.isInterleavedBufferAttribute){const q=ve.data,de=q.stride,we=ve.offset;if(q.isInstancedInterleavedBuffer){for(let Se=0;Se<V.locationSize;Se++)a(V.location+Se,q.meshPerAttribute);p.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Se=0;Se<V.locationSize;Se++)s(V.location+Se);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let Se=0;Se<V.locationSize;Se++)x(V.location+Se,ye/V.locationSize,et,xe,de*Xe,(we+ye/V.locationSize*Se)*Xe,k)}else{if(ve.isInstancedBufferAttribute){for(let q=0;q<V.locationSize;q++)a(V.location+q,ve.meshPerAttribute);p.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let q=0;q<V.locationSize;q++)s(V.location+q);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let q=0;q<V.locationSize;q++)x(V.location+q,ye/V.locationSize,et,xe,ye*Xe,ye/V.locationSize*q*Xe,k)}}else if(W!==void 0){const xe=W[ne];if(xe!==void 0)switch(xe.length){case 2:e.vertexAttrib2fv(V.location,xe);break;case 3:e.vertexAttrib3fv(V.location,xe);break;case 4:e.vertexAttrib4fv(V.location,xe);break;default:e.vertexAttrib1fv(V.location,xe)}}}}T()}function P(){I();for(const p in i){const L=i[p];for(const B in L){const X=L[B];for(const Y in X)b(X[Y].object),delete X[Y];delete L[B]}delete i[p]}}function A(p){if(i[p.id]===void 0)return;const L=i[p.id];for(const B in L){const X=L[B];for(const Y in X)b(X[Y].object),delete X[Y];delete L[B]}delete i[p.id]}function C(p){for(const L in i){const B=i[L];if(B[p.id]===void 0)continue;const X=B[p.id];for(const Y in X)b(X[Y].object),delete X[Y];delete B[p.id]}}function I(){u(),f=!0,r!==o&&(r=o,S(r.object))}function u(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:c,reset:I,resetDefaultState:u,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:s,disableUnusedAttributes:T}}function _d(e,n,t){let i;function o(S){i=S}function r(S,b){e.drawArrays(i,S,b),t.update(b,i,1)}function f(S,b,m){m!==0&&(e.drawArraysInstanced(i,S,b,m),t.update(b,i,m))}function c(S,b,m){if(m===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,S,0,b,0,m);let M=0;for(let N=0;N<m;N++)M+=b[N];t.update(M,i,1)}function E(S,b,m,v){if(m===0)return;const M=n.get("WEBGL_multi_draw");if(M===null)for(let N=0;N<S.length;N++)f(S[N],b[N],v[N]);else{M.multiDrawArraysInstancedWEBGL(i,S,0,b,0,v,0,m);let N=0;for(let y=0;y<m;y++)N+=b[y]*v[y];t.update(N,i,1)}}this.setMode=o,this.render=r,this.renderInstances=f,this.renderMultiDraw=c,this.renderMultiDrawInstances=E}function gd(e,n,t,i){let o;function r(){if(o!==void 0)return o;if(n.has("EXT_texture_filter_anisotropic")===!0){const C=n.get("EXT_texture_filter_anisotropic");o=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function f(C){return!(C!==Ct&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){const I=C===Hn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(C!==Gt&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Ft&&!I)}function E(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let S=t.precision!==void 0?t.precision:"highp";const b=E(S);b!==S&&(console.warn("THREE.WebGLRenderer:",S,"not supported, using",b,"instead."),S=b);const m=t.logarithmicDepthBuffer===!0,v=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),M=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),N=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=e.getParameter(e.MAX_TEXTURE_SIZE),s=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),a=e.getParameter(e.MAX_VERTEX_ATTRIBS),T=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),x=e.getParameter(e.MAX_VARYING_VECTORS),g=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),P=N>0,A=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:E,textureFormatReadable:f,textureTypeReadable:c,precision:S,logarithmicDepthBuffer:m,reversedDepthBuffer:v,maxTextures:M,maxVertexTextures:N,maxTextureSize:y,maxCubemapSize:s,maxAttributes:a,maxVertexUniforms:T,maxVaryings:x,maxFragmentUniforms:g,vertexTextures:P,maxSamples:A}}function vd(e){const n=this;let t=null,i=0,o=!1,r=!1;const f=new Li,c=new Fe,E={value:null,needsUpdate:!1};this.uniform=E,this.numPlanes=0,this.numIntersection=0,this.init=function(m,v){const M=m.length!==0||v||i!==0||o;return o=v,i=m.length,M},this.beginShadows=function(){r=!0,b(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,v){t=b(m,v,0)},this.setState=function(m,v,M){const N=m.clippingPlanes,y=m.clipIntersection,s=m.clipShadows,a=e.get(m);if(!o||N===null||N.length===0||r&&!s)r?b(null):S();else{const T=r?0:i,x=T*4;let g=a.clippingState||null;E.value=g,g=b(N,v,x,M);for(let P=0;P!==x;++P)g[P]=t[P];a.clippingState=g,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=T}};function S(){E.value!==t&&(E.value=t,E.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function b(m,v,M,N){const y=m!==null?m.length:0;let s=null;if(y!==0){if(s=E.value,N!==!0||s===null){const a=M+y*4,T=v.matrixWorldInverse;c.getNormalMatrix(T),(s===null||s.length<a)&&(s=new Float32Array(a));for(let x=0,g=M;x!==y;++x,g+=4)f.copy(m[x]).applyMatrix4(T,c),f.normal.toArray(s,g),s[g+3]=f.constant}E.value=s,E.needsUpdate=!0}return n.numPlanes=y,n.numIntersection=0,s}}function Ed(e){let n=new WeakMap;function t(f,c){return c===Ai?f.mapping=un:c===Ri&&(f.mapping=Qt),f}function i(f){if(f&&f.isTexture){const c=f.mapping;if(c===Ai||c===Ri)if(n.has(f)){const E=n.get(f).texture;return t(E,f.mapping)}else{const E=f.image;if(E&&E.height>0){const S=new Jo(E.height);return S.fromEquirectangularTexture(e,f),n.set(f,S),f.addEventListener("dispose",o),t(S.texture,f.mapping)}else return null}}return f}function o(f){const c=f.target;c.removeEventListener("dispose",o);const E=n.get(c);E!==void 0&&(n.delete(c),E.dispose())}function r(){n=new WeakMap}return{get:i,dispose:r}}const Kt=4,wr=[.125,.215,.35,.446,.526,.582],Ot=20,Jn=new Ia,Pr=new Ve;let ei=null,ti=0,ni=0,ii=!1;const Nt=(1+Math.sqrt(5))/2,kt=1/Nt,Dr=[new se(-Nt,kt,0),new se(Nt,kt,0),new se(-kt,0,Nt),new se(kt,0,Nt),new se(0,Nt,-kt),new se(0,Nt,kt),new se(-1,1,-1),new se(1,1,-1),new se(-1,1,1),new se(1,1,1)],Sd=new se;class Lr{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,o=100,r={}){const{size:f=256,position:c=Sd}=r;ei=this._renderer.getRenderTarget(),ti=this._renderer.getActiveCubeFace(),ni=this._renderer.getActiveMipmapLevel(),ii=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const E=this._allocateTargets();return E.depthBuffer=!0,this._sceneToCubeUV(n,i,o,E,c),t>0&&this._blur(E,0,0,t),this._applyPMREM(E),this._cleanup(E),E}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ir(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ur(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(ei,ti,ni),this._renderer.xr.enabled=ii,n.scissorTest=!1,En(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===un||n.mapping===Qt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),ei=this._renderer.getRenderTarget(),ti=this._renderer.getActiveCubeFace(),ni=this._renderer.getActiveMipmapLevel(),ii=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:Hn,format:Ct,colorSpace:Gn,depthBuffer:!1},o=yr(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yr(n,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Md(r)),this._blurMaterial=Td(r,n,t)}return o}_compileMaterial(n){const t=new ut(this._lodPlanes[0],n);this._renderer.compile(t,Jn)}_sceneToCubeUV(n,t,i,o,r){const E=new qt(90,1,t,i),S=[1,-1,1,1,1,1],b=[1,1,1,-1,-1,-1],m=this._renderer,v=m.autoClear,M=m.toneMapping;m.getClearColor(Pr),m.toneMapping=wt,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(o),m.clearDepth(),m.setRenderTarget(null));const y=new Ii({name:"PMREM.Background",side:Mt,depthWrite:!1,depthTest:!1}),s=new ut(new Ui,y);let a=!1;const T=n.background;T?T.isColor&&(y.color.copy(T),n.background=null,a=!0):(y.color.copy(Pr),a=!0);for(let x=0;x<6;x++){const g=x%3;g===0?(E.up.set(0,S[x],0),E.position.set(r.x,r.y,r.z),E.lookAt(r.x+b[x],r.y,r.z)):g===1?(E.up.set(0,0,S[x]),E.position.set(r.x,r.y,r.z),E.lookAt(r.x,r.y+b[x],r.z)):(E.up.set(0,S[x],0),E.position.set(r.x,r.y,r.z),E.lookAt(r.x,r.y,r.z+b[x]));const P=this._cubeSize;En(o,g*P,x>2?P:0,P,P),m.setRenderTarget(o),a&&m.render(s,E),m.render(n,E)}s.geometry.dispose(),s.material.dispose(),m.toneMapping=M,m.autoClear=v,n.background=T}_textureToCubeUV(n,t){const i=this._renderer,o=n.mapping===un||n.mapping===Qt;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ir()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ur());const r=o?this._cubemapMaterial:this._equirectMaterial,f=new ut(this._lodPlanes[0],r),c=r.uniforms;c.envMap.value=n;const E=this._cubeSize;En(t,0,0,3*E,2*E),i.setRenderTarget(t),i.render(f,Jn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const o=this._lodPlanes.length;for(let r=1;r<o;r++){const f=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),c=Dr[(o-r-1)%Dr.length];this._blur(n,r-1,r,f,c)}t.autoClear=i}_blur(n,t,i,o,r){const f=this._pingPongRenderTarget;this._halfBlur(n,f,t,i,o,"latitudinal",r),this._halfBlur(f,n,i,i,o,"longitudinal",r)}_halfBlur(n,t,i,o,r,f,c){const E=this._renderer,S=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const b=3,m=new ut(this._lodPlanes[o],S),v=S.uniforms,M=this._sizeLods[i]-1,N=isFinite(r)?Math.PI/(2*M):2*Math.PI/(2*Ot-1),y=r/N,s=isFinite(r)?1+Math.floor(b*y):Ot;s>Ot&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${s} samples when the maximum is set to ${Ot}`);const a=[];let T=0;for(let C=0;C<Ot;++C){const I=C/y,u=Math.exp(-I*I/2);a.push(u),C===0?T+=u:C<s&&(T+=2*u)}for(let C=0;C<a.length;C++)a[C]=a[C]/T;v.envMap.value=n.texture,v.samples.value=s,v.weights.value=a,v.latitudinal.value=f==="latitudinal",c&&(v.poleAxis.value=c);const{_lodMax:x}=this;v.dTheta.value=N,v.mipInt.value=x-i;const g=this._sizeLods[o],P=3*g*(o>x-Kt?o-x+Kt:0),A=4*(this._cubeSize-g);En(t,P,A,3*g,2*g),E.setRenderTarget(t),E.render(m,Jn)}}function Md(e){const n=[],t=[],i=[];let o=e;const r=e-Kt+1+wr.length;for(let f=0;f<r;f++){const c=Math.pow(2,o);t.push(c);let E=1/c;f>e-Kt?E=wr[f-e+Kt-1]:f===0&&(E=0),i.push(E);const S=1/(c-2),b=-S,m=1+S,v=[b,b,m,b,m,m,b,b,m,m,b,m],M=6,N=6,y=3,s=2,a=1,T=new Float32Array(y*N*M),x=new Float32Array(s*N*M),g=new Float32Array(a*N*M);for(let A=0;A<M;A++){const C=A%3*2/3-1,I=A>2?0:-1,u=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];T.set(u,y*N*A),x.set(v,s*N*A);const p=[A,A,A,A,A,A];g.set(p,a*N*A)}const P=new yi;P.setAttribute("position",new ln(T,y)),P.setAttribute("uv",new ln(x,s)),P.setAttribute("faceIndex",new ln(g,a)),n.push(P),o>Kt&&o--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function yr(e,n,t){const i=new jt(e,n,t);return i.texture.mapping=Vn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function En(e,n,t,i,o){e.viewport.set(n,t,i,o),e.scissor.set(n,t,i,o)}function Td(e,n,t){const i=new Float32Array(Ot),o=new se(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:Ot,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Ni(),fragmentShader:`

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
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function Ur(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ni(),fragmentShader:`

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
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function Ir(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ni(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function Ni(){return`

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
	`}function xd(e){let n=new WeakMap,t=null;function i(c){if(c&&c.isTexture){const E=c.mapping,S=E===Ai||E===Ri,b=E===un||E===Qt;if(S||b){let m=n.get(c);const v=m!==void 0?m.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==v)return t===null&&(t=new Lr(e)),m=S?t.fromEquirectangular(c,m):t.fromCubemap(c,m),m.texture.pmremVersion=c.pmremVersion,n.set(c,m),m.texture;if(m!==void 0)return m.texture;{const M=c.image;return S&&M&&M.height>0||b&&M&&o(M)?(t===null&&(t=new Lr(e)),m=S?t.fromEquirectangular(c):t.fromCubemap(c),m.texture.pmremVersion=c.pmremVersion,n.set(c,m),c.addEventListener("dispose",r),m.texture):null}}}return c}function o(c){let E=0;const S=6;for(let b=0;b<S;b++)c[b]!==void 0&&E++;return E===S}function r(c){const E=c.target;E.removeEventListener("dispose",r);const S=n.get(E);S!==void 0&&(n.delete(E),S.dispose())}function f(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:f}}function Ad(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let o;switch(i){case"WEBGL_depth_texture":o=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=e.getExtension(i)}return n[i]=o,o}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const o=t(i);return o===null&&_i("THREE.WebGLRenderer: "+i+" extension not supported."),o}}}function Rd(e,n,t,i){const o={},r=new WeakMap;function f(m){const v=m.target;v.index!==null&&n.remove(v.index);for(const N in v.attributes)n.remove(v.attributes[N]);v.removeEventListener("dispose",f),delete o[v.id];const M=r.get(v);M&&(n.remove(M),r.delete(v)),i.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,t.memory.geometries--}function c(m,v){return o[v.id]===!0||(v.addEventListener("dispose",f),o[v.id]=!0,t.memory.geometries++),v}function E(m){const v=m.attributes;for(const M in v)n.update(v[M],e.ARRAY_BUFFER)}function S(m){const v=[],M=m.index,N=m.attributes.position;let y=0;if(M!==null){const T=M.array;y=M.version;for(let x=0,g=T.length;x<g;x+=3){const P=T[x+0],A=T[x+1],C=T[x+2];v.push(P,A,A,C,C,P)}}else if(N!==void 0){const T=N.array;y=N.version;for(let x=0,g=T.length/3-1;x<g;x+=3){const P=x+0,A=x+1,C=x+2;v.push(P,A,A,C,C,P)}}else return;const s=new(as(v)?is:rs)(v,1);s.version=y;const a=r.get(m);a&&n.remove(a),r.set(m,s)}function b(m){const v=r.get(m);if(v){const M=m.index;M!==null&&v.version<M.version&&S(m)}else S(m);return r.get(m)}return{get:c,update:E,getWireframeAttribute:b}}function bd(e,n,t){let i;function o(v){i=v}let r,f;function c(v){r=v.type,f=v.bytesPerElement}function E(v,M){e.drawElements(i,M,r,v*f),t.update(M,i,1)}function S(v,M,N){N!==0&&(e.drawElementsInstanced(i,M,r,v*f,N),t.update(M,i,N))}function b(v,M,N){if(N===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,M,0,r,v,0,N);let s=0;for(let a=0;a<N;a++)s+=M[a];t.update(s,i,1)}function m(v,M,N,y){if(N===0)return;const s=n.get("WEBGL_multi_draw");if(s===null)for(let a=0;a<v.length;a++)S(v[a]/f,M[a],y[a]);else{s.multiDrawElementsInstancedWEBGL(i,M,0,r,v,0,y,0,N);let a=0;for(let T=0;T<N;T++)a+=M[T]*y[T];t.update(a,i,1)}}this.setMode=o,this.setIndex=c,this.render=E,this.renderInstances=S,this.renderMultiDraw=b,this.renderMultiDrawInstances=m}function Cd(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,f,c){switch(t.calls++,f){case e.TRIANGLES:t.triangles+=c*(r/3);break;case e.LINES:t.lines+=c*(r/2);break;case e.LINE_STRIP:t.lines+=c*(r-1);break;case e.LINE_LOOP:t.lines+=c*r;break;case e.POINTS:t.points+=c*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:o,update:i}}function wd(e,n,t){const i=new WeakMap,o=new dt;function r(f,c,E){const S=f.morphTargetInfluences,b=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,m=b!==void 0?b.length:0;let v=i.get(c);if(v===void 0||v.count!==m){let u=function(){C.dispose(),i.delete(c),c.removeEventListener("dispose",u)};v!==void 0&&v.texture.dispose();const M=c.morphAttributes.position!==void 0,N=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,s=c.morphAttributes.position||[],a=c.morphAttributes.normal||[],T=c.morphAttributes.color||[];let x=0;M===!0&&(x=1),N===!0&&(x=2),y===!0&&(x=3);let g=c.attributes.position.count*x,P=1;g>n.maxTextureSize&&(P=Math.ceil(g/n.maxTextureSize),g=n.maxTextureSize);const A=new Float32Array(g*P*4*m),C=new La(A,g,P,m);C.type=Ft,C.needsUpdate=!0;const I=x*4;for(let p=0;p<m;p++){const L=s[p],B=a[p],X=T[p],Y=g*P*4*p;for(let $=0;$<L.count;$++){const W=$*I;M===!0&&(o.fromBufferAttribute(L,$),A[Y+W+0]=o.x,A[Y+W+1]=o.y,A[Y+W+2]=o.z,A[Y+W+3]=0),N===!0&&(o.fromBufferAttribute(B,$),A[Y+W+4]=o.x,A[Y+W+5]=o.y,A[Y+W+6]=o.z,A[Y+W+7]=0),y===!0&&(o.fromBufferAttribute(X,$),A[Y+W+8]=o.x,A[Y+W+9]=o.y,A[Y+W+10]=o.z,A[Y+W+11]=X.itemSize===4?o.w:1)}}v={count:m,texture:C,size:new ze(g,P)},i.set(c,v),c.addEventListener("dispose",u)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)E.getUniforms().setValue(e,"morphTexture",f.morphTexture,t);else{let M=0;for(let y=0;y<S.length;y++)M+=S[y];const N=c.morphTargetsRelative?1:1-M;E.getUniforms().setValue(e,"morphTargetBaseInfluence",N),E.getUniforms().setValue(e,"morphTargetInfluences",S)}E.getUniforms().setValue(e,"morphTargetsTexture",v.texture,t),E.getUniforms().setValue(e,"morphTargetsTextureSize",v.size)}return{update:r}}function Pd(e,n,t,i){let o=new WeakMap;function r(E){const S=i.render.frame,b=E.geometry,m=n.get(E,b);if(o.get(m)!==S&&(n.update(m),o.set(m,S)),E.isInstancedMesh&&(E.hasEventListener("dispose",c)===!1&&E.addEventListener("dispose",c),o.get(E)!==S&&(t.update(E.instanceMatrix,e.ARRAY_BUFFER),E.instanceColor!==null&&t.update(E.instanceColor,e.ARRAY_BUFFER),o.set(E,S))),E.isSkinnedMesh){const v=E.skeleton;o.get(v)!==S&&(v.update(),o.set(v,S))}return m}function f(){o=new WeakMap}function c(E){const S=E.target;S.removeEventListener("dispose",c),t.remove(S.instanceMatrix),S.instanceColor!==null&&t.remove(S.instanceColor)}return{update:r,dispose:f}}const Ga=new gs,Nr=new Ma(1,1),Va=new La,ka=new _s,za=new ms,Or=[],Fr=[],Br=new Float32Array(16),Hr=new Float32Array(9),Gr=new Float32Array(4);function en(e,n,t){const i=e[0];if(i<=0||i>0)return e;const o=n*t;let r=Or[o];if(r===void 0&&(r=new Float32Array(o),Or[o]=r),n!==0){i.toArray(r,0);for(let f=1,c=0;f!==n;++f)c+=t,e[f].toArray(r,c)}return r}function ot(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function st(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function kn(e,n){let t=Fr[n];t===void 0&&(t=new Int32Array(n),Fr[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Dd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Ld(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2fv(this.addr,n),st(t,n)}}function yd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(ot(t,n))return;e.uniform3fv(this.addr,n),st(t,n)}}function Ud(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4fv(this.addr,n),st(t,n)}}function Id(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;Gr.set(i),e.uniformMatrix2fv(this.addr,!1,Gr),st(t,i)}}function Nd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;Hr.set(i),e.uniformMatrix3fv(this.addr,!1,Hr),st(t,i)}}function Od(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;Br.set(i),e.uniformMatrix4fv(this.addr,!1,Br),st(t,i)}}function Fd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Bd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2iv(this.addr,n),st(t,n)}}function Hd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ot(t,n))return;e.uniform3iv(this.addr,n),st(t,n)}}function Gd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4iv(this.addr,n),st(t,n)}}function Vd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function kd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2uiv(this.addr,n),st(t,n)}}function zd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ot(t,n))return;e.uniform3uiv(this.addr,n),st(t,n)}}function Wd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4uiv(this.addr,n),st(t,n)}}function Xd(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o);let r;this.type===e.SAMPLER_2D_SHADOW?(Nr.compareFunction=Ta,r=Nr):r=Ga,t.setTexture2D(n||r,o)}function Yd(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o),t.setTexture3D(n||ka,o)}function Kd(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o),t.setTextureCube(n||za,o)}function qd(e,n,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(e.uniform1i(this.addr,o),i[0]=o),t.setTexture2DArray(n||Va,o)}function $d(e){switch(e){case 5126:return Dd;case 35664:return Ld;case 35665:return yd;case 35666:return Ud;case 35674:return Id;case 35675:return Nd;case 35676:return Od;case 5124:case 35670:return Fd;case 35667:case 35671:return Bd;case 35668:case 35672:return Hd;case 35669:case 35673:return Gd;case 5125:return Vd;case 36294:return kd;case 36295:return zd;case 36296:return Wd;case 35678:case 36198:case 36298:case 36306:case 35682:return Xd;case 35679:case 36299:case 36307:return Yd;case 35680:case 36300:case 36308:case 36293:return Kd;case 36289:case 36303:case 36311:case 36292:return qd}}function Zd(e,n){e.uniform1fv(this.addr,n)}function jd(e,n){const t=en(n,this.size,2);e.uniform2fv(this.addr,t)}function Qd(e,n){const t=en(n,this.size,3);e.uniform3fv(this.addr,t)}function Jd(e,n){const t=en(n,this.size,4);e.uniform4fv(this.addr,t)}function ef(e,n){const t=en(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function tf(e,n){const t=en(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function nf(e,n){const t=en(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function rf(e,n){e.uniform1iv(this.addr,n)}function af(e,n){e.uniform2iv(this.addr,n)}function of(e,n){e.uniform3iv(this.addr,n)}function sf(e,n){e.uniform4iv(this.addr,n)}function lf(e,n){e.uniform1uiv(this.addr,n)}function cf(e,n){e.uniform2uiv(this.addr,n)}function df(e,n){e.uniform3uiv(this.addr,n)}function ff(e,n){e.uniform4uiv(this.addr,n)}function uf(e,n,t){const i=this.cache,o=n.length,r=kn(t,o);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let f=0;f!==o;++f)t.setTexture2D(n[f]||Ga,r[f])}function pf(e,n,t){const i=this.cache,o=n.length,r=kn(t,o);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let f=0;f!==o;++f)t.setTexture3D(n[f]||ka,r[f])}function hf(e,n,t){const i=this.cache,o=n.length,r=kn(t,o);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let f=0;f!==o;++f)t.setTextureCube(n[f]||za,r[f])}function mf(e,n,t){const i=this.cache,o=n.length,r=kn(t,o);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let f=0;f!==o;++f)t.setTexture2DArray(n[f]||Va,r[f])}function _f(e){switch(e){case 5126:return Zd;case 35664:return jd;case 35665:return Qd;case 35666:return Jd;case 35674:return ef;case 35675:return tf;case 35676:return nf;case 5124:case 35670:return rf;case 35667:case 35671:return af;case 35668:case 35672:return of;case 35669:case 35673:return sf;case 5125:return lf;case 36294:return cf;case 36295:return df;case 36296:return ff;case 35678:case 36198:case 36298:case 36306:case 35682:return uf;case 35679:case 36299:case 36307:return pf;case 35680:case 36300:case 36308:case 36293:return hf;case 36289:case 36303:case 36311:case 36292:return mf}}class gf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=$d(t.type)}}class vf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_f(t.type)}}class Ef{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const o=this.seq;for(let r=0,f=o.length;r!==f;++r){const c=o[r];c.setValue(n,t[c.id],i)}}}const ri=/(\w+)(\])?(\[|\.)?/g;function Vr(e,n){e.seq.push(n),e.map[n.id]=n}function Sf(e,n,t){const i=e.name,o=i.length;for(ri.lastIndex=0;;){const r=ri.exec(i),f=ri.lastIndex;let c=r[1];const E=r[2]==="]",S=r[3];if(E&&(c=c|0),S===void 0||S==="["&&f+2===o){Vr(t,S===void 0?new gf(c,e,n):new vf(c,e,n));break}else{let m=t.map[c];m===void 0&&(m=new Ef(c),Vr(t,m)),t=m}}}class Ln{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const r=n.getActiveUniform(t,o),f=n.getUniformLocation(t,r.name);Sf(r,f,this)}}setValue(n,t,i,o){const r=this.map[t];r!==void 0&&r.setValue(n,i,o)}setOptional(n,t,i){const o=t[i];o!==void 0&&this.setValue(n,i,o)}static upload(n,t,i,o){for(let r=0,f=t.length;r!==f;++r){const c=t[r],E=i[c.id];E.needsUpdate!==!1&&c.setValue(n,E.value,o)}}static seqWithValue(n,t){const i=[];for(let o=0,r=n.length;o!==r;++o){const f=n[o];f.id in t&&i.push(f)}return i}}function kr(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const Mf=37297;let Tf=0;function xf(e,n){const t=e.split(`
`),i=[],o=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let f=o;f<r;f++){const c=f+1;i.push(`${c===n?">":" "} ${c}: ${t[f]}`)}return i.join(`
`)}const zr=new Fe;function Af(e){rt._getMatrix(zr,rt.workingColorSpace,e);const n=`mat3( ${zr.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(e)){case Ua:return[n,"LinearTransferOETF"];case $e:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Wr(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const f=/ERROR: 0:(\d+)/.exec(r);if(f){const c=parseInt(f[1]);return t.toUpperCase()+`

`+r+`

`+xf(e.getShaderSource(n),c)}else return r}function Rf(e,n){const t=Af(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function bf(e,n){let t;switch(n){case hs:t="Linear";break;case ps:t="Reinhard";break;case us:t="Cineon";break;case fs:t="ACESFilmic";break;case ds:t="AgX";break;case cs:t="Neutral";break;case ls:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sn=new se;function Cf(){rt.getLuminanceCoefficients(Sn);const e=Sn.x.toFixed(4),n=Sn.y.toFixed(4),t=Sn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wf(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(an).join(`
`)}function Pf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Df(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let o=0;o<i;o++){const r=e.getActiveAttrib(n,o),f=r.name;let c=1;r.type===e.FLOAT_MAT2&&(c=2),r.type===e.FLOAT_MAT3&&(c=3),r.type===e.FLOAT_MAT4&&(c=4),t[f]={type:r.type,location:e.getAttribLocation(n,f),locationSize:c}}return t}function an(e){return e!==""}function Xr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Yr(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Lf=/^[ \t]*#include +<([\w\d./]+)>/gm;function bi(e){return e.replace(Lf,Uf)}const yf=new Map;function Uf(e,n){let t=Ie[n];if(t===void 0){const i=yf.get(n);if(i!==void 0)t=Ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return bi(t)}const If=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kr(e){return e.replace(If,Nf)}function Nf(e,n,t,i){let o="";for(let r=parseInt(n);r<parseInt(t);r++)o+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return o}function qr(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}function Of(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===xa?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===ss?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===bt&&(n="SHADOWMAP_TYPE_VSM"),n}function Ff(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case un:case Qt:n="ENVMAP_TYPE_CUBE";break;case Vn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Bf(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===Qt&&(n="ENVMAP_MODE_REFRACTION"),n}function Hf(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Ms:n="ENVMAP_BLENDING_MULTIPLY";break;case Ss:n="ENVMAP_BLENDING_MIX";break;case Es:n="ENVMAP_BLENDING_ADD";break}return n}function Gf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Vf(e,n,t,i){const o=e.getContext(),r=t.defines;let f=t.vertexShader,c=t.fragmentShader;const E=Of(t),S=Ff(t),b=Bf(t),m=Hf(t),v=Gf(t),M=wf(t),N=Pf(r),y=o.createProgram();let s,a,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(s=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(an).join(`
`),s.length>0&&(s+=`
`),a=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(an).join(`
`),a.length>0&&(a+=`
`)):(s=[qr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+b:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+E:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(an).join(`
`),a=[qr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+S:"",t.envMap?"#define "+b:"",t.envMap?"#define "+m:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+E:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wt?"#define TONE_MAPPING":"",t.toneMapping!==wt?Ie.tonemapping_pars_fragment:"",t.toneMapping!==wt?bf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,Rf("linearToOutputTexel",t.outputColorSpace),Cf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(an).join(`
`)),f=bi(f),f=Xr(f,t),f=Yr(f,t),c=bi(c),c=Xr(c,t),c=Yr(c,t),f=Kr(f),c=Kr(c),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,s=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+s,a=["#define varying in",t.glslVersion===Rr?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+a);const x=T+s+f,g=T+a+c,P=kr(o,o.VERTEX_SHADER,x),A=kr(o,o.FRAGMENT_SHADER,g);o.attachShader(y,P),o.attachShader(y,A),t.index0AttributeName!==void 0?o.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(y,0,"position"),o.linkProgram(y);function C(L){if(e.debug.checkShaderErrors){const B=o.getProgramInfoLog(y)||"",X=o.getShaderInfoLog(P)||"",Y=o.getShaderInfoLog(A)||"",$=B.trim(),W=X.trim(),ne=Y.trim();let V=!0,ve=!0;if(o.getProgramParameter(y,o.LINK_STATUS)===!1)if(V=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(o,y,P,A);else{const xe=Wr(o,P,"vertex"),ye=Wr(o,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(y,o.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+$+`
`+xe+`
`+ye)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(W===""||ne==="")&&(ve=!1);ve&&(L.diagnostics={runnable:V,programLog:$,vertexShader:{log:W,prefix:s},fragmentShader:{log:ne,prefix:a}})}o.deleteShader(P),o.deleteShader(A),I=new Ln(o,y),u=Df(o,y)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let u;this.getAttributes=function(){return u===void 0&&C(this),u};let p=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return p===!1&&(p=o.getProgramParameter(y,Mf)),p},this.destroy=function(){i.releaseStatesOfProgram(this),o.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Tf++,this.cacheKey=n,this.usedTimes=1,this.program=y,this.vertexShader=P,this.fragmentShader=A,this}let kf=0;class zf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,o=this._getShaderStage(t),r=this._getShaderStage(i),f=this._getShaderCacheForMaterial(n);return f.has(o)===!1&&(f.add(o),o.usedTimes++),f.has(r)===!1&&(f.add(r),r.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Wf(n),t.set(n,i)),i}}class Wf{constructor(n){this.id=kf++,this.code=n,this.usedTimes=0}}function Xf(e,n,t,i,o,r,f){const c=new os,E=new zf,S=new Set,b=[],m=o.logarithmicDepthBuffer,v=o.vertexTextures;let M=o.precision;const N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(u){return S.add(u),u===0?"uv":`uv${u}`}function s(u,p,L,B,X){const Y=B.fog,$=X.geometry,W=u.isMeshStandardMaterial?B.environment:null,ne=(u.isMeshStandardMaterial?t:n).get(u.envMap||W),V=ne&&ne.mapping===Vn?ne.image.height:null,ve=N[u.type];u.precision!==null&&(M=o.getMaxPrecision(u.precision),M!==u.precision&&console.warn("THREE.WebGLProgram.getParameters:",u.precision,"not supported, using",M,"instead."));const xe=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ye=xe!==void 0?xe.length:0;let He=0;$.morphAttributes.position!==void 0&&(He=1),$.morphAttributes.normal!==void 0&&(He=2),$.morphAttributes.color!==void 0&&(He=3);let nt,et,Xe,k;if(ve){const Ge=At[ve];nt=Ge.vertexShader,et=Ge.fragmentShader}else nt=u.vertexShader,et=u.fragmentShader,E.update(u),Xe=E.getVertexShaderID(u),k=E.getFragmentShaderID(u);const q=e.getRenderTarget(),de=e.state.buffers.depth.getReversed(),we=X.isInstancedMesh===!0,Se=X.isBatchedMesh===!0,Oe=!!u.map,ct=!!u.matcap,_=!!ne,Ze=!!u.aoMap,De=!!u.lightMap,be=!!u.bumpMap,pe=!!u.normalMap,je=!!u.displacementMap,he=!!u.emissiveMap,Ue=!!u.metalnessMap,lt=!!u.roughnessMap,it=u.anisotropy>0,h=u.clearcoat>0,l=u.dispersion>0,U=u.iridescence>0,G=u.sheen>0,K=u.transmission>0,H=it&&!!u.anisotropyMap,Ee=h&&!!u.clearcoatMap,ee=h&&!!u.clearcoatNormalMap,me=h&&!!u.clearcoatRoughnessMap,_e=U&&!!u.iridescenceMap,Q=U&&!!u.iridescenceThicknessMap,oe=G&&!!u.sheenColorMap,Re=G&&!!u.sheenRoughnessMap,ge=!!u.specularMap,re=!!u.specularColorMap,Le=!!u.specularIntensityMap,R=K&&!!u.transmissionMap,J=K&&!!u.thicknessMap,te=!!u.gradientMap,ce=!!u.alphaMap,Z=u.alphaTest>0,z=!!u.alphaHash,ue=!!u.extensions;let Pe=wt;u.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Pe=e.toneMapping);const Ke={shaderID:ve,shaderType:u.type,shaderName:u.name,vertexShader:nt,fragmentShader:et,defines:u.defines,customVertexShaderID:Xe,customFragmentShaderID:k,isRawShaderMaterial:u.isRawShaderMaterial===!0,glslVersion:u.glslVersion,precision:M,batching:Se,batchingColor:Se&&X._colorsTexture!==null,instancing:we,instancingColor:we&&X.instanceColor!==null,instancingMorph:we&&X.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:q===null?e.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Gn,alphaToCoverage:!!u.alphaToCoverage,map:Oe,matcap:ct,envMap:_,envMapMode:_&&ne.mapping,envMapCubeUVHeight:V,aoMap:Ze,lightMap:De,bumpMap:be,normalMap:pe,displacementMap:v&&je,emissiveMap:he,normalMapObjectSpace:pe&&u.normalMapType===ns,normalMapTangentSpace:pe&&u.normalMapType===ts,metalnessMap:Ue,roughnessMap:lt,anisotropy:it,anisotropyMap:H,clearcoat:h,clearcoatMap:Ee,clearcoatNormalMap:ee,clearcoatRoughnessMap:me,dispersion:l,iridescence:U,iridescenceMap:_e,iridescenceThicknessMap:Q,sheen:G,sheenColorMap:oe,sheenRoughnessMap:Re,specularMap:ge,specularColorMap:re,specularIntensityMap:Le,transmission:K,transmissionMap:R,thicknessMap:J,gradientMap:te,opaque:u.transparent===!1&&u.blending===Dn&&u.alphaToCoverage===!1,alphaMap:ce,alphaTest:Z,alphaHash:z,combine:u.combine,mapUv:Oe&&y(u.map.channel),aoMapUv:Ze&&y(u.aoMap.channel),lightMapUv:De&&y(u.lightMap.channel),bumpMapUv:be&&y(u.bumpMap.channel),normalMapUv:pe&&y(u.normalMap.channel),displacementMapUv:je&&y(u.displacementMap.channel),emissiveMapUv:he&&y(u.emissiveMap.channel),metalnessMapUv:Ue&&y(u.metalnessMap.channel),roughnessMapUv:lt&&y(u.roughnessMap.channel),anisotropyMapUv:H&&y(u.anisotropyMap.channel),clearcoatMapUv:Ee&&y(u.clearcoatMap.channel),clearcoatNormalMapUv:ee&&y(u.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&y(u.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&y(u.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&y(u.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&y(u.sheenColorMap.channel),sheenRoughnessMapUv:Re&&y(u.sheenRoughnessMap.channel),specularMapUv:ge&&y(u.specularMap.channel),specularColorMapUv:re&&y(u.specularColorMap.channel),specularIntensityMapUv:Le&&y(u.specularIntensityMap.channel),transmissionMapUv:R&&y(u.transmissionMap.channel),thicknessMapUv:J&&y(u.thicknessMap.channel),alphaMapUv:ce&&y(u.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(pe||it),vertexColors:u.vertexColors,vertexAlphas:u.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!$.attributes.uv&&(Oe||ce),fog:!!Y,useFog:u.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:u.flatShading===!0&&u.wireframe===!1,sizeAttenuation:u.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:de,skinning:X.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:He,numDirLights:p.directional.length,numPointLights:p.point.length,numSpotLights:p.spot.length,numSpotLightMaps:p.spotLightMap.length,numRectAreaLights:p.rectArea.length,numHemiLights:p.hemi.length,numDirLightShadows:p.directionalShadowMap.length,numPointLightShadows:p.pointShadowMap.length,numSpotLightShadows:p.spotShadowMap.length,numSpotLightShadowsWithMaps:p.numSpotLightShadowsWithMaps,numLightProbes:p.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:u.dithering,shadowMapEnabled:e.shadowMap.enabled&&L.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:Oe&&u.map.isVideoTexture===!0&&rt.getTransfer(u.map.colorSpace)===$e,decodeVideoTextureEmissive:he&&u.emissiveMap.isVideoTexture===!0&&rt.getTransfer(u.emissiveMap.colorSpace)===$e,premultipliedAlpha:u.premultipliedAlpha,doubleSided:u.side===Tt,flipSided:u.side===Mt,useDepthPacking:u.depthPacking>=0,depthPacking:u.depthPacking||0,index0AttributeName:u.index0AttributeName,extensionClipCullDistance:ue&&u.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&u.extensions.multiDraw===!0||Se)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:u.customProgramCacheKey()};return Ke.vertexUv1s=S.has(1),Ke.vertexUv2s=S.has(2),Ke.vertexUv3s=S.has(3),S.clear(),Ke}function a(u){const p=[];if(u.shaderID?p.push(u.shaderID):(p.push(u.customVertexShaderID),p.push(u.customFragmentShaderID)),u.defines!==void 0)for(const L in u.defines)p.push(L),p.push(u.defines[L]);return u.isRawShaderMaterial===!1&&(T(p,u),x(p,u),p.push(e.outputColorSpace)),p.push(u.customProgramCacheKey),p.join()}function T(u,p){u.push(p.precision),u.push(p.outputColorSpace),u.push(p.envMapMode),u.push(p.envMapCubeUVHeight),u.push(p.mapUv),u.push(p.alphaMapUv),u.push(p.lightMapUv),u.push(p.aoMapUv),u.push(p.bumpMapUv),u.push(p.normalMapUv),u.push(p.displacementMapUv),u.push(p.emissiveMapUv),u.push(p.metalnessMapUv),u.push(p.roughnessMapUv),u.push(p.anisotropyMapUv),u.push(p.clearcoatMapUv),u.push(p.clearcoatNormalMapUv),u.push(p.clearcoatRoughnessMapUv),u.push(p.iridescenceMapUv),u.push(p.iridescenceThicknessMapUv),u.push(p.sheenColorMapUv),u.push(p.sheenRoughnessMapUv),u.push(p.specularMapUv),u.push(p.specularColorMapUv),u.push(p.specularIntensityMapUv),u.push(p.transmissionMapUv),u.push(p.thicknessMapUv),u.push(p.combine),u.push(p.fogExp2),u.push(p.sizeAttenuation),u.push(p.morphTargetsCount),u.push(p.morphAttributeCount),u.push(p.numDirLights),u.push(p.numPointLights),u.push(p.numSpotLights),u.push(p.numSpotLightMaps),u.push(p.numHemiLights),u.push(p.numRectAreaLights),u.push(p.numDirLightShadows),u.push(p.numPointLightShadows),u.push(p.numSpotLightShadows),u.push(p.numSpotLightShadowsWithMaps),u.push(p.numLightProbes),u.push(p.shadowMapType),u.push(p.toneMapping),u.push(p.numClippingPlanes),u.push(p.numClipIntersection),u.push(p.depthPacking)}function x(u,p){c.disableAll(),p.supportsVertexTextures&&c.enable(0),p.instancing&&c.enable(1),p.instancingColor&&c.enable(2),p.instancingMorph&&c.enable(3),p.matcap&&c.enable(4),p.envMap&&c.enable(5),p.normalMapObjectSpace&&c.enable(6),p.normalMapTangentSpace&&c.enable(7),p.clearcoat&&c.enable(8),p.iridescence&&c.enable(9),p.alphaTest&&c.enable(10),p.vertexColors&&c.enable(11),p.vertexAlphas&&c.enable(12),p.vertexUv1s&&c.enable(13),p.vertexUv2s&&c.enable(14),p.vertexUv3s&&c.enable(15),p.vertexTangents&&c.enable(16),p.anisotropy&&c.enable(17),p.alphaHash&&c.enable(18),p.batching&&c.enable(19),p.dispersion&&c.enable(20),p.batchingColor&&c.enable(21),p.gradientMap&&c.enable(22),u.push(c.mask),c.disableAll(),p.fog&&c.enable(0),p.useFog&&c.enable(1),p.flatShading&&c.enable(2),p.logarithmicDepthBuffer&&c.enable(3),p.reversedDepthBuffer&&c.enable(4),p.skinning&&c.enable(5),p.morphTargets&&c.enable(6),p.morphNormals&&c.enable(7),p.morphColors&&c.enable(8),p.premultipliedAlpha&&c.enable(9),p.shadowMapEnabled&&c.enable(10),p.doubleSided&&c.enable(11),p.flipSided&&c.enable(12),p.useDepthPacking&&c.enable(13),p.dithering&&c.enable(14),p.transmission&&c.enable(15),p.sheen&&c.enable(16),p.opaque&&c.enable(17),p.pointsUvs&&c.enable(18),p.decodeVideoTexture&&c.enable(19),p.decodeVideoTextureEmissive&&c.enable(20),p.alphaToCoverage&&c.enable(21),u.push(c.mask)}function g(u){const p=N[u.type];let L;if(p){const B=At[p];L=es.clone(B.uniforms)}else L=u.uniforms;return L}function P(u,p){let L;for(let B=0,X=b.length;B<X;B++){const Y=b[B];if(Y.cacheKey===p){L=Y,++L.usedTimes;break}}return L===void 0&&(L=new Vf(e,p,u,r),b.push(L)),L}function A(u){if(--u.usedTimes===0){const p=b.indexOf(u);b[p]=b[b.length-1],b.pop(),u.destroy()}}function C(u){E.remove(u)}function I(){E.dispose()}return{getParameters:s,getProgramCacheKey:a,getUniforms:g,acquireProgram:P,releaseProgram:A,releaseShaderCache:C,programs:b,dispose:I}}function Yf(){let e=new WeakMap;function n(f){return e.has(f)}function t(f){let c=e.get(f);return c===void 0&&(c={},e.set(f,c)),c}function i(f){e.delete(f)}function o(f,c,E){e.get(f)[c]=E}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:o,dispose:r}}function Kf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function $r(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function Zr(){const e=[];let n=0;const t=[],i=[],o=[];function r(){n=0,t.length=0,i.length=0,o.length=0}function f(m,v,M,N,y,s){let a=e[n];return a===void 0?(a={id:m.id,object:m,geometry:v,material:M,groupOrder:N,renderOrder:m.renderOrder,z:y,group:s},e[n]=a):(a.id=m.id,a.object=m,a.geometry=v,a.material=M,a.groupOrder=N,a.renderOrder=m.renderOrder,a.z=y,a.group=s),n++,a}function c(m,v,M,N,y,s){const a=f(m,v,M,N,y,s);M.transmission>0?i.push(a):M.transparent===!0?o.push(a):t.push(a)}function E(m,v,M,N,y,s){const a=f(m,v,M,N,y,s);M.transmission>0?i.unshift(a):M.transparent===!0?o.unshift(a):t.unshift(a)}function S(m,v){t.length>1&&t.sort(m||Kf),i.length>1&&i.sort(v||$r),o.length>1&&o.sort(v||$r)}function b(){for(let m=n,v=e.length;m<v;m++){const M=e[m];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:i,transparent:o,init:r,push:c,unshift:E,finish:b,sort:S}}function qf(){let e=new WeakMap;function n(i,o){const r=e.get(i);let f;return r===void 0?(f=new Zr,e.set(i,[f])):o>=r.length?(f=new Zr,r.push(f)):f=r[o],f}function t(){e=new WeakMap}return{get:n,dispose:t}}function $f(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new se,color:new Ve};break;case"SpotLight":t={position:new se,direction:new se,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new se,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new se,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new se,halfWidth:new se,halfHeight:new se};break}return e[n.id]=t,t}}}function Zf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let jf=0;function Qf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Jf(e){const n=new $f,t=Zf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let S=0;S<9;S++)i.probe.push(new se);const o=new se,r=new St,f=new St;function c(S){let b=0,m=0,v=0;for(let u=0;u<9;u++)i.probe[u].set(0,0,0);let M=0,N=0,y=0,s=0,a=0,T=0,x=0,g=0,P=0,A=0,C=0;S.sort(Qf);for(let u=0,p=S.length;u<p;u++){const L=S[u],B=L.color,X=L.intensity,Y=L.distance,$=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)b+=B.r*X,m+=B.g*X,v+=B.b*X;else if(L.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(L.sh.coefficients[W],X);C++}else if(L.isDirectionalLight){const W=n.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const ne=L.shadow,V=t.get(L);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,i.directionalShadow[M]=V,i.directionalShadowMap[M]=$,i.directionalShadowMatrix[M]=L.shadow.matrix,T++}i.directional[M]=W,M++}else if(L.isSpotLight){const W=n.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(B).multiplyScalar(X),W.distance=Y,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,i.spot[y]=W;const ne=L.shadow;if(L.map&&(i.spotLightMap[P]=L.map,P++,ne.updateMatrices(L),L.castShadow&&A++),i.spotLightMatrix[y]=ne.matrix,L.castShadow){const V=t.get(L);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,i.spotShadow[y]=V,i.spotShadowMap[y]=$,g++}y++}else if(L.isRectAreaLight){const W=n.get(L);W.color.copy(B).multiplyScalar(X),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),i.rectArea[s]=W,s++}else if(L.isPointLight){const W=n.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const ne=L.shadow,V=t.get(L);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,V.shadowCameraNear=ne.camera.near,V.shadowCameraFar=ne.camera.far,i.pointShadow[N]=V,i.pointShadowMap[N]=$,i.pointShadowMatrix[N]=L.shadow.matrix,x++}i.point[N]=W,N++}else if(L.isHemisphereLight){const W=n.get(L);W.skyColor.copy(L.color).multiplyScalar(X),W.groundColor.copy(L.groundColor).multiplyScalar(X),i.hemi[a]=W,a++}}s>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ie.LTC_FLOAT_1,i.rectAreaLTC2=ie.LTC_FLOAT_2):(i.rectAreaLTC1=ie.LTC_HALF_1,i.rectAreaLTC2=ie.LTC_HALF_2)),i.ambient[0]=b,i.ambient[1]=m,i.ambient[2]=v;const I=i.hash;(I.directionalLength!==M||I.pointLength!==N||I.spotLength!==y||I.rectAreaLength!==s||I.hemiLength!==a||I.numDirectionalShadows!==T||I.numPointShadows!==x||I.numSpotShadows!==g||I.numSpotMaps!==P||I.numLightProbes!==C)&&(i.directional.length=M,i.spot.length=y,i.rectArea.length=s,i.point.length=N,i.hemi.length=a,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=g,i.spotShadowMap.length=g,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=g+P-A,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,I.directionalLength=M,I.pointLength=N,I.spotLength=y,I.rectAreaLength=s,I.hemiLength=a,I.numDirectionalShadows=T,I.numPointShadows=x,I.numSpotShadows=g,I.numSpotMaps=P,I.numLightProbes=C,i.version=jf++)}function E(S,b){let m=0,v=0,M=0,N=0,y=0;const s=b.matrixWorldInverse;for(let a=0,T=S.length;a<T;a++){const x=S[a];if(x.isDirectionalLight){const g=i.directional[m];g.direction.setFromMatrixPosition(x.matrixWorld),o.setFromMatrixPosition(x.target.matrixWorld),g.direction.sub(o),g.direction.transformDirection(s),m++}else if(x.isSpotLight){const g=i.spot[M];g.position.setFromMatrixPosition(x.matrixWorld),g.position.applyMatrix4(s),g.direction.setFromMatrixPosition(x.matrixWorld),o.setFromMatrixPosition(x.target.matrixWorld),g.direction.sub(o),g.direction.transformDirection(s),M++}else if(x.isRectAreaLight){const g=i.rectArea[N];g.position.setFromMatrixPosition(x.matrixWorld),g.position.applyMatrix4(s),f.identity(),r.copy(x.matrixWorld),r.premultiply(s),f.extractRotation(r),g.halfWidth.set(x.width*.5,0,0),g.halfHeight.set(0,x.height*.5,0),g.halfWidth.applyMatrix4(f),g.halfHeight.applyMatrix4(f),N++}else if(x.isPointLight){const g=i.point[v];g.position.setFromMatrixPosition(x.matrixWorld),g.position.applyMatrix4(s),v++}else if(x.isHemisphereLight){const g=i.hemi[y];g.direction.setFromMatrixPosition(x.matrixWorld),g.direction.transformDirection(s),y++}}}return{setup:c,setupView:E,state:i}}function jr(e){const n=new Jf(e),t=[],i=[];function o(b){S.camera=b,t.length=0,i.length=0}function r(b){t.push(b)}function f(b){i.push(b)}function c(){n.setup(t)}function E(b){n.setupView(t,b)}const S={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:o,state:S,setupLights:c,setupLightsView:E,pushLight:r,pushShadow:f}}function eu(e){let n=new WeakMap;function t(o,r=0){const f=n.get(o);let c;return f===void 0?(c=new jr(e),n.set(o,[c])):r>=f.length?(c=new jr(e),f.push(c)):c=f[r],c}function i(){n=new WeakMap}return{get:t,dispose:i}}const tu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nu=`uniform sampler2D shadow_pass;
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
}`;function iu(e,n,t){let i=new Sa;const o=new ze,r=new ze,f=new dt,c=new Ho({depthPacking:Go}),E=new Vo,S={},b=t.maxTextureSize,m={[cn]:Mt,[Mt]:cn,[Tt]:Tt},v=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:tu,fragmentShader:nu}),M=v.clone();M.defines.HORIZONTAL_PASS=1;const N=new yi;N.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ut(N,v),s=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xa;let a=this.type;this.render=function(A,C,I){if(s.enabled===!1||s.autoUpdate===!1&&s.needsUpdate===!1||A.length===0)return;const u=e.getRenderTarget(),p=e.getActiveCubeFace(),L=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Bt),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const X=a!==bt&&this.type===bt,Y=a===bt&&this.type!==bt;for(let $=0,W=A.length;$<W;$++){const ne=A[$],V=ne.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;o.copy(V.mapSize);const ve=V.getFrameExtents();if(o.multiply(ve),r.copy(V.mapSize),(o.x>b||o.y>b)&&(o.x>b&&(r.x=Math.floor(b/ve.x),o.x=r.x*ve.x,V.mapSize.x=r.x),o.y>b&&(r.y=Math.floor(b/ve.y),o.y=r.y*ve.y,V.mapSize.y=r.y)),V.map===null||X===!0||Y===!0){const ye=this.type!==bt?{minFilter:sn,magFilter:sn}:{};V.map!==null&&V.map.dispose(),V.map=new jt(o.x,o.y,ye),V.map.texture.name=ne.name+".shadowMap",V.camera.updateProjectionMatrix()}e.setRenderTarget(V.map),e.clear();const xe=V.getViewportCount();for(let ye=0;ye<xe;ye++){const He=V.getViewport(ye);f.set(r.x*He.x,r.y*He.y,r.x*He.z,r.y*He.w),B.viewport(f),V.updateMatrices(ne,ye),i=V.getFrustum(),g(C,I,V.camera,ne,this.type)}V.isPointLightShadow!==!0&&this.type===bt&&T(V,I),V.needsUpdate=!1}a=this.type,s.needsUpdate=!1,e.setRenderTarget(u,p,L)};function T(A,C){const I=n.update(y);v.defines.VSM_SAMPLES!==A.blurSamples&&(v.defines.VSM_SAMPLES=A.blurSamples,M.defines.VSM_SAMPLES=A.blurSamples,v.needsUpdate=!0,M.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new jt(o.x,o.y)),v.uniforms.shadow_pass.value=A.map.texture,v.uniforms.resolution.value=A.mapSize,v.uniforms.radius.value=A.radius,e.setRenderTarget(A.mapPass),e.clear(),e.renderBufferDirect(C,null,I,v,y,null),M.uniforms.shadow_pass.value=A.mapPass.texture,M.uniforms.resolution.value=A.mapSize,M.uniforms.radius.value=A.radius,e.setRenderTarget(A.map),e.clear(),e.renderBufferDirect(C,null,I,M,y,null)}function x(A,C,I,u){let p=null;const L=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)p=L;else if(p=I.isPointLight===!0?E:c,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const B=p.uuid,X=C.uuid;let Y=S[B];Y===void 0&&(Y={},S[B]=Y);let $=Y[X];$===void 0&&($=p.clone(),Y[X]=$,C.addEventListener("dispose",P)),p=$}if(p.visible=C.visible,p.wireframe=C.wireframe,u===bt?p.side=C.shadowSide!==null?C.shadowSide:C.side:p.side=C.shadowSide!==null?C.shadowSide:m[C.side],p.alphaMap=C.alphaMap,p.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,p.map=C.map,p.clipShadows=C.clipShadows,p.clippingPlanes=C.clippingPlanes,p.clipIntersection=C.clipIntersection,p.displacementMap=C.displacementMap,p.displacementScale=C.displacementScale,p.displacementBias=C.displacementBias,p.wireframeLinewidth=C.wireframeLinewidth,p.linewidth=C.linewidth,I.isPointLight===!0&&p.isMeshDistanceMaterial===!0){const B=e.properties.get(p);B.light=I}return p}function g(A,C,I,u,p){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&p===bt)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const X=n.update(A),Y=A.material;if(Array.isArray(Y)){const $=X.groups;for(let W=0,ne=$.length;W<ne;W++){const V=$[W],ve=Y[V.materialIndex];if(ve&&ve.visible){const xe=x(A,ve,u,p);A.onBeforeShadow(e,A,C,I,X,xe,V),e.renderBufferDirect(I,null,X,xe,A,V),A.onAfterShadow(e,A,C,I,X,xe,V)}}}else if(Y.visible){const $=x(A,Y,u,p);A.onBeforeShadow(e,A,C,I,X,$,null),e.renderBufferDirect(I,null,X,$,A,null),A.onAfterShadow(e,A,C,I,X,$,null)}}const B=A.children;for(let X=0,Y=B.length;X<Y;X++)g(B[X],C,I,u,p)}function P(A){A.target.removeEventListener("dispose",P);for(const I in S){const u=S[I],p=A.target.uuid;p in u&&(u[p].dispose(),delete u[p])}}}const ru={[xi]:Ti,[Mi]:vi,[Si]:gi,[In]:Ei,[Ti]:xi,[vi]:Mi,[gi]:Si,[Ei]:In};function au(e,n){function t(){let R=!1;const J=new dt;let te=null;const ce=new dt(0,0,0,0);return{setMask:function(Z){te!==Z&&!R&&(e.colorMask(Z,Z,Z,Z),te=Z)},setLocked:function(Z){R=Z},setClear:function(Z,z,ue,Pe,Ke){Ke===!0&&(Z*=Pe,z*=Pe,ue*=Pe),J.set(Z,z,ue,Pe),ce.equals(J)===!1&&(e.clearColor(Z,z,ue,Pe),ce.copy(J))},reset:function(){R=!1,te=null,ce.set(-1,0,0,0)}}}function i(){let R=!1,J=!1,te=null,ce=null,Z=null;return{setReversed:function(z){if(J!==z){const ue=n.get("EXT_clip_control");z?ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.ZERO_TO_ONE_EXT):ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.NEGATIVE_ONE_TO_ONE_EXT),J=z;const Pe=Z;Z=null,this.setClear(Pe)}},getReversed:function(){return J},setTest:function(z){z?q(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(z){te!==z&&!R&&(e.depthMask(z),te=z)},setFunc:function(z){if(J&&(z=ru[z]),ce!==z){switch(z){case xi:e.depthFunc(e.NEVER);break;case Ti:e.depthFunc(e.ALWAYS);break;case Mi:e.depthFunc(e.LESS);break;case In:e.depthFunc(e.LEQUAL);break;case Si:e.depthFunc(e.EQUAL);break;case Ei:e.depthFunc(e.GEQUAL);break;case vi:e.depthFunc(e.GREATER);break;case gi:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ce=z}},setLocked:function(z){R=z},setClear:function(z){Z!==z&&(J&&(z=1-z),e.clearDepth(z),Z=z)},reset:function(){R=!1,te=null,ce=null,Z=null,J=!1}}}function o(){let R=!1,J=null,te=null,ce=null,Z=null,z=null,ue=null,Pe=null,Ke=null;return{setTest:function(Ge){R||(Ge?q(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(Ge){J!==Ge&&!R&&(e.stencilMask(Ge),J=Ge)},setFunc:function(Ge,Rt,xt){(te!==Ge||ce!==Rt||Z!==xt)&&(e.stencilFunc(Ge,Rt,xt),te=Ge,ce=Rt,Z=xt)},setOp:function(Ge,Rt,xt){(z!==Ge||ue!==Rt||Pe!==xt)&&(e.stencilOp(Ge,Rt,xt),z=Ge,ue=Rt,Pe=xt)},setLocked:function(Ge){R=Ge},setClear:function(Ge){Ke!==Ge&&(e.clearStencil(Ge),Ke=Ge)},reset:function(){R=!1,J=null,te=null,ce=null,Z=null,z=null,ue=null,Pe=null,Ke=null}}}const r=new t,f=new i,c=new o,E=new WeakMap,S=new WeakMap;let b={},m={},v=new WeakMap,M=[],N=null,y=!1,s=null,a=null,T=null,x=null,g=null,P=null,A=null,C=new Ve(0,0,0),I=0,u=!1,p=null,L=null,B=null,X=null,Y=null;const $=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ne=0;const V=e.getParameter(e.VERSION);V.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=ne>=1):V.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=ne>=2);let ve=null,xe={};const ye=e.getParameter(e.SCISSOR_BOX),He=e.getParameter(e.VIEWPORT),nt=new dt().fromArray(ye),et=new dt().fromArray(He);function Xe(R,J,te,ce){const Z=new Uint8Array(4),z=e.createTexture();e.bindTexture(R,z),e.texParameteri(R,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(R,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ue=0;ue<te;ue++)R===e.TEXTURE_3D||R===e.TEXTURE_2D_ARRAY?e.texImage3D(J,0,e.RGBA,1,1,ce,0,e.RGBA,e.UNSIGNED_BYTE,Z):e.texImage2D(J+ue,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Z);return z}const k={};k[e.TEXTURE_2D]=Xe(e.TEXTURE_2D,e.TEXTURE_2D,1),k[e.TEXTURE_CUBE_MAP]=Xe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[e.TEXTURE_2D_ARRAY]=Xe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),k[e.TEXTURE_3D]=Xe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),f.setClear(1),c.setClear(0),q(e.DEPTH_TEST),f.setFunc(In),be(!1),pe(Er),q(e.CULL_FACE),Ze(Bt);function q(R){b[R]!==!0&&(e.enable(R),b[R]=!0)}function de(R){b[R]!==!1&&(e.disable(R),b[R]=!1)}function we(R,J){return m[R]!==J?(e.bindFramebuffer(R,J),m[R]=J,R===e.DRAW_FRAMEBUFFER&&(m[e.FRAMEBUFFER]=J),R===e.FRAMEBUFFER&&(m[e.DRAW_FRAMEBUFFER]=J),!0):!1}function Se(R,J){let te=M,ce=!1;if(R){te=v.get(J),te===void 0&&(te=[],v.set(J,te));const Z=R.textures;if(te.length!==Z.length||te[0]!==e.COLOR_ATTACHMENT0){for(let z=0,ue=Z.length;z<ue;z++)te[z]=e.COLOR_ATTACHMENT0+z;te.length=Z.length,ce=!0}}else te[0]!==e.BACK&&(te[0]=e.BACK,ce=!0);ce&&e.drawBuffers(te)}function Oe(R){return N!==R?(e.useProgram(R),N=R,!0):!1}const ct={[nn]:e.FUNC_ADD,[uo]:e.FUNC_SUBTRACT,[fo]:e.FUNC_REVERSE_SUBTRACT};ct[Ts]=e.MIN,ct[xs]=e.MAX;const _={[Co]:e.ZERO,[bo]:e.ONE,[Ro]:e.SRC_COLOR,[Ao]:e.SRC_ALPHA,[xo]:e.SRC_ALPHA_SATURATE,[To]:e.DST_COLOR,[Mo]:e.DST_ALPHA,[So]:e.ONE_MINUS_SRC_COLOR,[Eo]:e.ONE_MINUS_SRC_ALPHA,[vo]:e.ONE_MINUS_DST_COLOR,[go]:e.ONE_MINUS_DST_ALPHA,[_o]:e.CONSTANT_COLOR,[mo]:e.ONE_MINUS_CONSTANT_COLOR,[ho]:e.CONSTANT_ALPHA,[po]:e.ONE_MINUS_CONSTANT_ALPHA};function Ze(R,J,te,ce,Z,z,ue,Pe,Ke,Ge){if(R===Bt){y===!0&&(de(e.BLEND),y=!1);return}if(y===!1&&(q(e.BLEND),y=!0),R!==Qo){if(R!==s||Ge!==u){if((a!==nn||g!==nn)&&(e.blendEquation(e.FUNC_ADD),a=nn,g=nn),Ge)switch(R){case Dn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Tr:e.blendFunc(e.ONE,e.ONE);break;case Mr:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Sr:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Dn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Tr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Mr:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sr:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}T=null,x=null,P=null,A=null,C.set(0,0,0),I=0,s=R,u=Ge}return}Z=Z||J,z=z||te,ue=ue||ce,(J!==a||Z!==g)&&(e.blendEquationSeparate(ct[J],ct[Z]),a=J,g=Z),(te!==T||ce!==x||z!==P||ue!==A)&&(e.blendFuncSeparate(_[te],_[ce],_[z],_[ue]),T=te,x=ce,P=z,A=ue),(Pe.equals(C)===!1||Ke!==I)&&(e.blendColor(Pe.r,Pe.g,Pe.b,Ke),C.copy(Pe),I=Ke),s=R,u=!1}function De(R,J){R.side===Tt?de(e.CULL_FACE):q(e.CULL_FACE);let te=R.side===Mt;J&&(te=!te),be(te),R.blending===Dn&&R.transparent===!1?Ze(Bt):Ze(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),f.setFunc(R.depthFunc),f.setTest(R.depthTest),f.setMask(R.depthWrite),r.setMask(R.colorWrite);const ce=R.stencilWrite;c.setTest(ce),ce&&(c.setMask(R.stencilWriteMask),c.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),c.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),he(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?q(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(R){p!==R&&(R?e.frontFace(e.CW):e.frontFace(e.CCW),p=R)}function pe(R){R!==Zo?(q(e.CULL_FACE),R!==L&&(R===Er?e.cullFace(e.BACK):R===jo?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):de(e.CULL_FACE),L=R}function je(R){R!==B&&(W&&e.lineWidth(R),B=R)}function he(R,J,te){R?(q(e.POLYGON_OFFSET_FILL),(X!==J||Y!==te)&&(e.polygonOffset(J,te),X=J,Y=te)):de(e.POLYGON_OFFSET_FILL)}function Ue(R){R?q(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function lt(R){R===void 0&&(R=e.TEXTURE0+$-1),ve!==R&&(e.activeTexture(R),ve=R)}function it(R,J,te){te===void 0&&(ve===null?te=e.TEXTURE0+$-1:te=ve);let ce=xe[te];ce===void 0&&(ce={type:void 0,texture:void 0},xe[te]=ce),(ce.type!==R||ce.texture!==J)&&(ve!==te&&(e.activeTexture(te),ve=te),e.bindTexture(R,J||k[R]),ce.type=R,ce.texture=J)}function h(){const R=xe[ve];R!==void 0&&R.type!==void 0&&(e.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function l(){try{e.compressedTexImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function U(){try{e.compressedTexImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function G(){try{e.texSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function K(){try{e.texSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function H(){try{e.compressedTexSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ee(){try{e.texStorage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function me(){try{e.texStorage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function _e(){try{e.texImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Q(){try{e.texImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function oe(R){nt.equals(R)===!1&&(e.scissor(R.x,R.y,R.z,R.w),nt.copy(R))}function Re(R){et.equals(R)===!1&&(e.viewport(R.x,R.y,R.z,R.w),et.copy(R))}function ge(R,J){let te=S.get(J);te===void 0&&(te=new WeakMap,S.set(J,te));let ce=te.get(R);ce===void 0&&(ce=e.getUniformBlockIndex(J,R.name),te.set(R,ce))}function re(R,J){const ce=S.get(J).get(R);E.get(J)!==ce&&(e.uniformBlockBinding(J,ce,R.__bindingPointIndex),E.set(J,ce))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),f.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),b={},ve=null,xe={},m={},v=new WeakMap,M=[],N=null,y=!1,s=null,a=null,T=null,x=null,g=null,P=null,A=null,C=new Ve(0,0,0),I=0,u=!1,p=null,L=null,B=null,X=null,Y=null,nt.set(0,0,e.canvas.width,e.canvas.height),et.set(0,0,e.canvas.width,e.canvas.height),r.reset(),f.reset(),c.reset()}return{buffers:{color:r,depth:f,stencil:c},enable:q,disable:de,bindFramebuffer:we,drawBuffers:Se,useProgram:Oe,setBlending:Ze,setMaterial:De,setFlipSided:be,setCullFace:pe,setLineWidth:je,setPolygonOffset:he,setScissorTest:Ue,activeTexture:lt,bindTexture:it,unbindTexture:h,compressedTexImage2D:l,compressedTexImage3D:U,texImage2D:_e,texImage3D:Q,updateUBOMapping:ge,uniformBlockBinding:re,texStorage2D:ee,texStorage3D:me,texSubImage2D:G,texSubImage3D:K,compressedTexSubImage2D:H,compressedTexSubImage3D:Ee,scissor:oe,viewport:Re,reset:Le}}function ou(e,n,t,i,o,r,f){const c=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,E=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),S=new ze,b=new WeakMap;let m;const v=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(h,l){return M?new OffscreenCanvas(h,l):vs("canvas")}function y(h,l,U){let G=1;const K=it(h);if((K.width>U||K.height>U)&&(G=U/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&h instanceof ImageBitmap||typeof VideoFrame<"u"&&h instanceof VideoFrame){const H=Math.floor(G*K.width),Ee=Math.floor(G*K.height);m===void 0&&(m=N(H,Ee));const ee=l?N(H,Ee):m;return ee.width=H,ee.height=Ee,ee.getContext("2d").drawImage(h,0,0,H,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+H+"x"+Ee+")."),ee}else return"data"in h&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),h;return h}function s(h){return h.generateMipmaps}function a(h){e.generateMipmap(h)}function T(h){return h.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:h.isWebGL3DRenderTarget?e.TEXTURE_3D:h.isWebGLArrayRenderTarget||h.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function x(h,l,U,G,K=!1){if(h!==null){if(e[h]!==void 0)return e[h];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+h+"'")}let H=l;if(l===e.RED&&(U===e.FLOAT&&(H=e.R32F),U===e.HALF_FLOAT&&(H=e.R16F),U===e.UNSIGNED_BYTE&&(H=e.R8)),l===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.R8UI),U===e.UNSIGNED_SHORT&&(H=e.R16UI),U===e.UNSIGNED_INT&&(H=e.R32UI),U===e.BYTE&&(H=e.R8I),U===e.SHORT&&(H=e.R16I),U===e.INT&&(H=e.R32I)),l===e.RG&&(U===e.FLOAT&&(H=e.RG32F),U===e.HALF_FLOAT&&(H=e.RG16F),U===e.UNSIGNED_BYTE&&(H=e.RG8)),l===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.RG8UI),U===e.UNSIGNED_SHORT&&(H=e.RG16UI),U===e.UNSIGNED_INT&&(H=e.RG32UI),U===e.BYTE&&(H=e.RG8I),U===e.SHORT&&(H=e.RG16I),U===e.INT&&(H=e.RG32I)),l===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.RGB8UI),U===e.UNSIGNED_SHORT&&(H=e.RGB16UI),U===e.UNSIGNED_INT&&(H=e.RGB32UI),U===e.BYTE&&(H=e.RGB8I),U===e.SHORT&&(H=e.RGB16I),U===e.INT&&(H=e.RGB32I)),l===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&(H=e.RGBA8UI),U===e.UNSIGNED_SHORT&&(H=e.RGBA16UI),U===e.UNSIGNED_INT&&(H=e.RGBA32UI),U===e.BYTE&&(H=e.RGBA8I),U===e.SHORT&&(H=e.RGBA16I),U===e.INT&&(H=e.RGBA32I)),l===e.RGB&&(U===e.UNSIGNED_INT_5_9_9_9_REV&&(H=e.RGB9_E5),U===e.UNSIGNED_INT_10F_11F_11F_REV&&(H=e.R11F_G11F_B10F)),l===e.RGBA){const Ee=K?Ua:rt.getTransfer(G);U===e.FLOAT&&(H=e.RGBA32F),U===e.HALF_FLOAT&&(H=e.RGBA16F),U===e.UNSIGNED_BYTE&&(H=Ee===$e?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT_4_4_4_4&&(H=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&(H=e.RGB5_A1)}return(H===e.R16F||H===e.R32F||H===e.RG16F||H===e.RG32F||H===e.RGBA16F||H===e.RGBA32F)&&n.get("EXT_color_buffer_float"),H}function g(h,l){let U;return h?l===null||l===fn||l===dn?U=e.DEPTH24_STENCIL8:l===Ft?U=e.DEPTH32F_STENCIL8:l===Nn&&(U=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):l===null||l===fn||l===dn?U=e.DEPTH_COMPONENT24:l===Ft?U=e.DEPTH_COMPONENT32F:l===Nn&&(U=e.DEPTH_COMPONENT16),U}function P(h,l){return s(h)===!0||h.isFramebufferTexture&&h.minFilter!==sn&&h.minFilter!==Xt?Math.log2(Math.max(l.width,l.height))+1:h.mipmaps!==void 0&&h.mipmaps.length>0?h.mipmaps.length:h.isCompressedTexture&&Array.isArray(h.image)?l.mipmaps.length:1}function A(h){const l=h.target;l.removeEventListener("dispose",A),I(l),l.isVideoTexture&&b.delete(l)}function C(h){const l=h.target;l.removeEventListener("dispose",C),p(l)}function I(h){const l=i.get(h);if(l.__webglInit===void 0)return;const U=h.source,G=v.get(U);if(G){const K=G[l.__cacheKey];K.usedTimes--,K.usedTimes===0&&u(h),Object.keys(G).length===0&&v.delete(U)}i.remove(h)}function u(h){const l=i.get(h);e.deleteTexture(l.__webglTexture);const U=h.source,G=v.get(U);delete G[l.__cacheKey],f.memory.textures--}function p(h){const l=i.get(h);if(h.depthTexture&&(h.depthTexture.dispose(),i.remove(h.depthTexture)),h.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(l.__webglFramebuffer[G]))for(let K=0;K<l.__webglFramebuffer[G].length;K++)e.deleteFramebuffer(l.__webglFramebuffer[G][K]);else e.deleteFramebuffer(l.__webglFramebuffer[G]);l.__webglDepthbuffer&&e.deleteRenderbuffer(l.__webglDepthbuffer[G])}else{if(Array.isArray(l.__webglFramebuffer))for(let G=0;G<l.__webglFramebuffer.length;G++)e.deleteFramebuffer(l.__webglFramebuffer[G]);else e.deleteFramebuffer(l.__webglFramebuffer);if(l.__webglDepthbuffer&&e.deleteRenderbuffer(l.__webglDepthbuffer),l.__webglMultisampledFramebuffer&&e.deleteFramebuffer(l.__webglMultisampledFramebuffer),l.__webglColorRenderbuffer)for(let G=0;G<l.__webglColorRenderbuffer.length;G++)l.__webglColorRenderbuffer[G]&&e.deleteRenderbuffer(l.__webglColorRenderbuffer[G]);l.__webglDepthRenderbuffer&&e.deleteRenderbuffer(l.__webglDepthRenderbuffer)}const U=h.textures;for(let G=0,K=U.length;G<K;G++){const H=i.get(U[G]);H.__webglTexture&&(e.deleteTexture(H.__webglTexture),f.memory.textures--),i.remove(U[G])}i.remove(h)}let L=0;function B(){L=0}function X(){const h=L;return h>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+h+" texture units while this GPU supports only "+o.maxTextures),L+=1,h}function Y(h){const l=[];return l.push(h.wrapS),l.push(h.wrapT),l.push(h.wrapR||0),l.push(h.magFilter),l.push(h.minFilter),l.push(h.anisotropy),l.push(h.internalFormat),l.push(h.format),l.push(h.type),l.push(h.generateMipmaps),l.push(h.premultiplyAlpha),l.push(h.flipY),l.push(h.unpackAlignment),l.push(h.colorSpace),l.join()}function $(h,l){const U=i.get(h);if(h.isVideoTexture&&Ue(h),h.isRenderTargetTexture===!1&&h.isExternalTexture!==!0&&h.version>0&&U.__version!==h.version){const G=h.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(U,h,l);return}}else h.isExternalTexture&&(U.__webglTexture=h.sourceTexture?h.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+l)}function W(h,l){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){k(U,h,l);return}t.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+l)}function ne(h,l){const U=i.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&U.__version!==h.version){k(U,h,l);return}t.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+l)}function V(h,l){const U=i.get(h);if(h.version>0&&U.__version!==h.version){q(U,h,l);return}t.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+l)}const ve={[Do]:e.REPEAT,[Po]:e.CLAMP_TO_EDGE,[wo]:e.MIRRORED_REPEAT},xe={[sn]:e.NEAREST,[Lo]:e.NEAREST_MIPMAP_NEAREST,[gn]:e.NEAREST_MIPMAP_LINEAR,[Xt]:e.LINEAR,[Kn]:e.LINEAR_MIPMAP_NEAREST,[rn]:e.LINEAR_MIPMAP_LINEAR},ye={[Bo]:e.NEVER,[Fo]:e.ALWAYS,[Oo]:e.LESS,[Ta]:e.LEQUAL,[No]:e.EQUAL,[Io]:e.GEQUAL,[Uo]:e.GREATER,[yo]:e.NOTEQUAL};function He(h,l){if(l.type===Ft&&n.has("OES_texture_float_linear")===!1&&(l.magFilter===Xt||l.magFilter===Kn||l.magFilter===gn||l.magFilter===rn||l.minFilter===Xt||l.minFilter===Kn||l.minFilter===gn||l.minFilter===rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(h,e.TEXTURE_WRAP_S,ve[l.wrapS]),e.texParameteri(h,e.TEXTURE_WRAP_T,ve[l.wrapT]),(h===e.TEXTURE_3D||h===e.TEXTURE_2D_ARRAY)&&e.texParameteri(h,e.TEXTURE_WRAP_R,ve[l.wrapR]),e.texParameteri(h,e.TEXTURE_MAG_FILTER,xe[l.magFilter]),e.texParameteri(h,e.TEXTURE_MIN_FILTER,xe[l.minFilter]),l.compareFunction&&(e.texParameteri(h,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(h,e.TEXTURE_COMPARE_FUNC,ye[l.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(l.magFilter===sn||l.minFilter!==gn&&l.minFilter!==rn||l.type===Ft&&n.has("OES_texture_float_linear")===!1)return;if(l.anisotropy>1||i.get(l).__currentAnisotropy){const U=n.get("EXT_texture_filter_anisotropic");e.texParameterf(h,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(l.anisotropy,o.getMaxAnisotropy())),i.get(l).__currentAnisotropy=l.anisotropy}}}function nt(h,l){let U=!1;h.__webglInit===void 0&&(h.__webglInit=!0,l.addEventListener("dispose",A));const G=l.source;let K=v.get(G);K===void 0&&(K={},v.set(G,K));const H=Y(l);if(H!==h.__cacheKey){K[H]===void 0&&(K[H]={texture:e.createTexture(),usedTimes:0},f.memory.textures++,U=!0),K[H].usedTimes++;const Ee=K[h.__cacheKey];Ee!==void 0&&(K[h.__cacheKey].usedTimes--,Ee.usedTimes===0&&u(l)),h.__cacheKey=H,h.__webglTexture=K[H].texture}return U}function et(h,l,U){return Math.floor(Math.floor(h/U)/l)}function Xe(h,l,U,G){const H=h.updateRanges;if(H.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,l.width,l.height,U,G,l.data);else{H.sort((Q,oe)=>Q.start-oe.start);let Ee=0;for(let Q=1;Q<H.length;Q++){const oe=H[Ee],Re=H[Q],ge=oe.start+oe.count,re=et(Re.start,l.width,4),Le=et(oe.start,l.width,4);Re.start<=ge+1&&re===Le&&et(Re.start+Re.count-1,l.width,4)===re?oe.count=Math.max(oe.count,Re.start+Re.count-oe.start):(++Ee,H[Ee]=Re)}H.length=Ee+1;const ee=e.getParameter(e.UNPACK_ROW_LENGTH),me=e.getParameter(e.UNPACK_SKIP_PIXELS),_e=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,l.width);for(let Q=0,oe=H.length;Q<oe;Q++){const Re=H[Q],ge=Math.floor(Re.start/4),re=Math.ceil(Re.count/4),Le=ge%l.width,R=Math.floor(ge/l.width),J=re,te=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Le),e.pixelStorei(e.UNPACK_SKIP_ROWS,R),t.texSubImage2D(e.TEXTURE_2D,0,Le,R,J,te,U,G,l.data)}h.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,ee),e.pixelStorei(e.UNPACK_SKIP_PIXELS,me),e.pixelStorei(e.UNPACK_SKIP_ROWS,_e)}}function k(h,l,U){let G=e.TEXTURE_2D;(l.isDataArrayTexture||l.isCompressedArrayTexture)&&(G=e.TEXTURE_2D_ARRAY),l.isData3DTexture&&(G=e.TEXTURE_3D);const K=nt(h,l),H=l.source;t.bindTexture(G,h.__webglTexture,e.TEXTURE0+U);const Ee=i.get(H);if(H.version!==Ee.__version||K===!0){t.activeTexture(e.TEXTURE0+U);const ee=rt.getPrimaries(rt.workingColorSpace),me=l.colorSpace===Wt?null:rt.getPrimaries(l.colorSpace),_e=l.colorSpace===Wt||ee===me?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,l.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,l.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,l.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let Q=y(l.image,!1,o.maxTextureSize);Q=lt(l,Q);const oe=r.convert(l.format,l.colorSpace),Re=r.convert(l.type);let ge=x(l.internalFormat,oe,Re,l.colorSpace,l.isVideoTexture);He(G,l);let re;const Le=l.mipmaps,R=l.isVideoTexture!==!0,J=Ee.__version===void 0||K===!0,te=H.dataReady,ce=P(l,Q);if(l.isDepthTexture)ge=g(l.format===Un,l.type),J&&(R?t.texStorage2D(e.TEXTURE_2D,1,ge,Q.width,Q.height):t.texImage2D(e.TEXTURE_2D,0,ge,Q.width,Q.height,0,oe,Re,null));else if(l.isDataTexture)if(Le.length>0){R&&J&&t.texStorage2D(e.TEXTURE_2D,ce,ge,Le[0].width,Le[0].height);for(let Z=0,z=Le.length;Z<z;Z++)re=Le[Z],R?te&&t.texSubImage2D(e.TEXTURE_2D,Z,0,0,re.width,re.height,oe,Re,re.data):t.texImage2D(e.TEXTURE_2D,Z,ge,re.width,re.height,0,oe,Re,re.data);l.generateMipmaps=!1}else R?(J&&t.texStorage2D(e.TEXTURE_2D,ce,ge,Q.width,Q.height),te&&Xe(l,Q,oe,Re)):t.texImage2D(e.TEXTURE_2D,0,ge,Q.width,Q.height,0,oe,Re,Q.data);else if(l.isCompressedTexture)if(l.isCompressedArrayTexture){R&&J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,ge,Le[0].width,Le[0].height,Q.depth);for(let Z=0,z=Le.length;Z<z;Z++)if(re=Le[Z],l.format!==Ct)if(oe!==null)if(R){if(te)if(l.layerUpdates.size>0){const ue=Ar(re.width,re.height,l.format,l.type);for(const Pe of l.layerUpdates){const Ke=re.data.subarray(Pe*ue/re.data.BYTES_PER_ELEMENT,(Pe+1)*ue/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,Pe,re.width,re.height,1,oe,Ke)}l.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,0,re.width,re.height,Q.depth,oe,re.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,Z,ge,re.width,re.height,Q.depth,0,re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?te&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,0,re.width,re.height,Q.depth,oe,Re,re.data):t.texImage3D(e.TEXTURE_2D_ARRAY,Z,ge,re.width,re.height,Q.depth,0,oe,Re,re.data)}else{R&&J&&t.texStorage2D(e.TEXTURE_2D,ce,ge,Le[0].width,Le[0].height);for(let Z=0,z=Le.length;Z<z;Z++)re=Le[Z],l.format!==Ct?oe!==null?R?te&&t.compressedTexSubImage2D(e.TEXTURE_2D,Z,0,0,re.width,re.height,oe,re.data):t.compressedTexImage2D(e.TEXTURE_2D,Z,ge,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?te&&t.texSubImage2D(e.TEXTURE_2D,Z,0,0,re.width,re.height,oe,Re,re.data):t.texImage2D(e.TEXTURE_2D,Z,ge,re.width,re.height,0,oe,Re,re.data)}else if(l.isDataArrayTexture)if(R){if(J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,ge,Q.width,Q.height,Q.depth),te)if(l.layerUpdates.size>0){const Z=Ar(Q.width,Q.height,l.format,l.type);for(const z of l.layerUpdates){const ue=Q.data.subarray(z*Z/Q.data.BYTES_PER_ELEMENT,(z+1)*Z/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,z,Q.width,Q.height,1,oe,Re,ue)}l.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,oe,Re,Q.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,ge,Q.width,Q.height,Q.depth,0,oe,Re,Q.data);else if(l.isData3DTexture)R?(J&&t.texStorage3D(e.TEXTURE_3D,ce,ge,Q.width,Q.height,Q.depth),te&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,oe,Re,Q.data)):t.texImage3D(e.TEXTURE_3D,0,ge,Q.width,Q.height,Q.depth,0,oe,Re,Q.data);else if(l.isFramebufferTexture){if(J)if(R)t.texStorage2D(e.TEXTURE_2D,ce,ge,Q.width,Q.height);else{let Z=Q.width,z=Q.height;for(let ue=0;ue<ce;ue++)t.texImage2D(e.TEXTURE_2D,ue,ge,Z,z,0,oe,Re,null),Z>>=1,z>>=1}}else if(Le.length>0){if(R&&J){const Z=it(Le[0]);t.texStorage2D(e.TEXTURE_2D,ce,ge,Z.width,Z.height)}for(let Z=0,z=Le.length;Z<z;Z++)re=Le[Z],R?te&&t.texSubImage2D(e.TEXTURE_2D,Z,0,0,oe,Re,re):t.texImage2D(e.TEXTURE_2D,Z,ge,oe,Re,re);l.generateMipmaps=!1}else if(R){if(J){const Z=it(Q);t.texStorage2D(e.TEXTURE_2D,ce,ge,Z.width,Z.height)}te&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,oe,Re,Q)}else t.texImage2D(e.TEXTURE_2D,0,ge,oe,Re,Q);s(l)&&a(G),Ee.__version=H.version,l.onUpdate&&l.onUpdate(l)}h.__version=l.version}function q(h,l,U){if(l.image.length!==6)return;const G=nt(h,l),K=l.source;t.bindTexture(e.TEXTURE_CUBE_MAP,h.__webglTexture,e.TEXTURE0+U);const H=i.get(K);if(K.version!==H.__version||G===!0){t.activeTexture(e.TEXTURE0+U);const Ee=rt.getPrimaries(rt.workingColorSpace),ee=l.colorSpace===Wt?null:rt.getPrimaries(l.colorSpace),me=l.colorSpace===Wt||Ee===ee?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,l.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,l.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,l.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const _e=l.isCompressedTexture||l.image[0].isCompressedTexture,Q=l.image[0]&&l.image[0].isDataTexture,oe=[];for(let z=0;z<6;z++)!_e&&!Q?oe[z]=y(l.image[z],!0,o.maxCubemapSize):oe[z]=Q?l.image[z].image:l.image[z],oe[z]=lt(l,oe[z]);const Re=oe[0],ge=r.convert(l.format,l.colorSpace),re=r.convert(l.type),Le=x(l.internalFormat,ge,re,l.colorSpace),R=l.isVideoTexture!==!0,J=H.__version===void 0||G===!0,te=K.dataReady;let ce=P(l,Re);He(e.TEXTURE_CUBE_MAP,l);let Z;if(_e){R&&J&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Le,Re.width,Re.height);for(let z=0;z<6;z++){Z=oe[z].mipmaps;for(let ue=0;ue<Z.length;ue++){const Pe=Z[ue];l.format!==Ct?ge!==null?R?te&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue,0,0,Pe.width,Pe.height,ge,Pe.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue,Le,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue,0,0,Pe.width,Pe.height,ge,re,Pe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue,Le,Pe.width,Pe.height,0,ge,re,Pe.data)}}}else{if(Z=l.mipmaps,R&&J){Z.length>0&&ce++;const z=it(oe[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Le,z.width,z.height)}for(let z=0;z<6;z++)if(Q){R?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,oe[z].width,oe[z].height,ge,re,oe[z].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Le,oe[z].width,oe[z].height,0,ge,re,oe[z].data);for(let ue=0;ue<Z.length;ue++){const Ke=Z[ue].image[z].image;R?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue+1,0,0,Ke.width,Ke.height,ge,re,Ke.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue+1,Le,Ke.width,Ke.height,0,ge,re,Ke.data)}}else{R?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,ge,re,oe[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Le,ge,re,oe[z]);for(let ue=0;ue<Z.length;ue++){const Pe=Z[ue];R?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue+1,0,0,ge,re,Pe.image[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue+1,Le,ge,re,Pe.image[z])}}}s(l)&&a(e.TEXTURE_CUBE_MAP),H.__version=K.version,l.onUpdate&&l.onUpdate(l)}h.__version=l.version}function de(h,l,U,G,K,H){const Ee=r.convert(U.format,U.colorSpace),ee=r.convert(U.type),me=x(U.internalFormat,Ee,ee,U.colorSpace),_e=i.get(l),Q=i.get(U);if(Q.__renderTarget=l,!_e.__hasExternalTextures){const oe=Math.max(1,l.width>>H),Re=Math.max(1,l.height>>H);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?t.texImage3D(K,H,me,oe,Re,l.depth,0,Ee,ee,null):t.texImage2D(K,H,me,oe,Re,0,Ee,ee,null)}t.bindFramebuffer(e.FRAMEBUFFER,h),he(l)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,G,K,Q.__webglTexture,0,je(l)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,G,K,Q.__webglTexture,H),t.bindFramebuffer(e.FRAMEBUFFER,null)}function we(h,l,U){if(e.bindRenderbuffer(e.RENDERBUFFER,h),l.depthBuffer){const G=l.depthTexture,K=G&&G.isDepthTexture?G.type:null,H=g(l.stencilBuffer,K),Ee=l.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ee=je(l);he(l)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ee,H,l.width,l.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,ee,H,l.width,l.height):e.renderbufferStorage(e.RENDERBUFFER,H,l.width,l.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Ee,e.RENDERBUFFER,h)}else{const G=l.textures;for(let K=0;K<G.length;K++){const H=G[K],Ee=r.convert(H.format,H.colorSpace),ee=r.convert(H.type),me=x(H.internalFormat,Ee,ee,H.colorSpace),_e=je(l);U&&he(l)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,_e,me,l.width,l.height):he(l)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_e,me,l.width,l.height):e.renderbufferStorage(e.RENDERBUFFER,me,l.width,l.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Se(h,l){if(l&&l.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,h),!(l.depthTexture&&l.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=i.get(l.depthTexture);G.__renderTarget=l,(!G.__webglTexture||l.depthTexture.image.width!==l.width||l.depthTexture.image.height!==l.height)&&(l.depthTexture.image.width=l.width,l.depthTexture.image.height=l.height,l.depthTexture.needsUpdate=!0),$(l.depthTexture,0);const K=G.__webglTexture,H=je(l);if(l.depthTexture.format===Di)he(l)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,H):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(l.depthTexture.format===Un)he(l)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,H):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Oe(h){const l=i.get(h),U=h.isWebGLCubeRenderTarget===!0;if(l.__boundDepthTexture!==h.depthTexture){const G=h.depthTexture;if(l.__depthDisposeCallback&&l.__depthDisposeCallback(),G){const K=()=>{delete l.__boundDepthTexture,delete l.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),l.__depthDisposeCallback=K}l.__boundDepthTexture=G}if(h.depthTexture&&!l.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const G=h.texture.mipmaps;G&&G.length>0?Se(l.__webglFramebuffer[0],h):Se(l.__webglFramebuffer,h)}else if(U){l.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer[G]),l.__webglDepthbuffer[G]===void 0)l.__webglDepthbuffer[G]=e.createRenderbuffer(),we(l.__webglDepthbuffer[G],h,!1);else{const K=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,H=l.__webglDepthbuffer[G];e.bindRenderbuffer(e.RENDERBUFFER,H),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,H)}}else{const G=h.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),l.__webglDepthbuffer===void 0)l.__webglDepthbuffer=e.createRenderbuffer(),we(l.__webglDepthbuffer,h,!1);else{const K=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,H=l.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,H),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,H)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function ct(h,l,U){const G=i.get(h);l!==void 0&&de(G.__webglFramebuffer,h,h.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&Oe(h)}function _(h){const l=h.texture,U=i.get(h),G=i.get(l);h.addEventListener("dispose",C);const K=h.textures,H=h.isWebGLCubeRenderTarget===!0,Ee=K.length>1;if(Ee||(G.__webglTexture===void 0&&(G.__webglTexture=e.createTexture()),G.__version=l.version,f.memory.textures++),H){U.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(l.mipmaps&&l.mipmaps.length>0){U.__webglFramebuffer[ee]=[];for(let me=0;me<l.mipmaps.length;me++)U.__webglFramebuffer[ee][me]=e.createFramebuffer()}else U.__webglFramebuffer[ee]=e.createFramebuffer()}else{if(l.mipmaps&&l.mipmaps.length>0){U.__webglFramebuffer=[];for(let ee=0;ee<l.mipmaps.length;ee++)U.__webglFramebuffer[ee]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(Ee)for(let ee=0,me=K.length;ee<me;ee++){const _e=i.get(K[ee]);_e.__webglTexture===void 0&&(_e.__webglTexture=e.createTexture(),f.memory.textures++)}if(h.samples>0&&he(h)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let ee=0;ee<K.length;ee++){const me=K[ee];U.__webglColorRenderbuffer[ee]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[ee]);const _e=r.convert(me.format,me.colorSpace),Q=r.convert(me.type),oe=x(me.internalFormat,_e,Q,me.colorSpace,h.isXRRenderTarget===!0),Re=je(h);e.renderbufferStorageMultisample(e.RENDERBUFFER,Re,oe,h.width,h.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ee,e.RENDERBUFFER,U.__webglColorRenderbuffer[ee])}e.bindRenderbuffer(e.RENDERBUFFER,null),h.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),we(U.__webglDepthRenderbuffer,h,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(H){t.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture),He(e.TEXTURE_CUBE_MAP,l);for(let ee=0;ee<6;ee++)if(l.mipmaps&&l.mipmaps.length>0)for(let me=0;me<l.mipmaps.length;me++)de(U.__webglFramebuffer[ee][me],h,l,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me);else de(U.__webglFramebuffer[ee],h,l,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);s(l)&&a(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ee=0,me=K.length;ee<me;ee++){const _e=K[ee],Q=i.get(_e);let oe=e.TEXTURE_2D;(h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(oe=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(oe,Q.__webglTexture),He(oe,_e),de(U.__webglFramebuffer,h,_e,e.COLOR_ATTACHMENT0+ee,oe,0),s(_e)&&a(oe)}t.unbindTexture()}else{let ee=e.TEXTURE_2D;if((h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(ee=h.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ee,G.__webglTexture),He(ee,l),l.mipmaps&&l.mipmaps.length>0)for(let me=0;me<l.mipmaps.length;me++)de(U.__webglFramebuffer[me],h,l,e.COLOR_ATTACHMENT0,ee,me);else de(U.__webglFramebuffer,h,l,e.COLOR_ATTACHMENT0,ee,0);s(l)&&a(ee),t.unbindTexture()}h.depthBuffer&&Oe(h)}function Ze(h){const l=h.textures;for(let U=0,G=l.length;U<G;U++){const K=l[U];if(s(K)){const H=T(h),Ee=i.get(K).__webglTexture;t.bindTexture(H,Ee),a(H),t.unbindTexture()}}}const De=[],be=[];function pe(h){if(h.samples>0){if(he(h)===!1){const l=h.textures,U=h.width,G=h.height;let K=e.COLOR_BUFFER_BIT;const H=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Ee=i.get(h),ee=l.length>1;if(ee)for(let _e=0;_e<l.length;_e++)t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const me=h.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let _e=0;_e<l.length;_e++){if(h.resolveDepthBuffer&&(h.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),h.stencilBuffer&&h.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),ee){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Ee.__webglColorRenderbuffer[_e]);const Q=i.get(l[_e]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Q,0)}e.blitFramebuffer(0,0,U,G,0,0,U,G,K,e.NEAREST),E===!0&&(De.length=0,be.length=0,De.push(e.COLOR_ATTACHMENT0+_e),h.depthBuffer&&h.resolveDepthBuffer===!1&&(De.push(H),be.push(H),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,be)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ee)for(let _e=0;_e<l.length;_e++){t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,Ee.__webglColorRenderbuffer[_e]);const Q=i.get(l[_e]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,Ee.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,Q,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(h.depthBuffer&&h.resolveDepthBuffer===!1&&E){const l=h.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[l])}}}function je(h){return Math.min(o.maxSamples,h.samples)}function he(h){const l=i.get(h);return h.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&l.__useRenderToTexture!==!1}function Ue(h){const l=f.render.frame;b.get(h)!==l&&(b.set(h,l),h.update())}function lt(h,l){const U=h.colorSpace,G=h.format,K=h.type;return h.isCompressedTexture===!0||h.isVideoTexture===!0||U!==Gn&&U!==Wt&&(rt.getTransfer(U)===$e?(G!==Ct||K!==Gt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),l}function it(h){return typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement?(S.width=h.naturalWidth||h.width,S.height=h.naturalHeight||h.height):typeof VideoFrame<"u"&&h instanceof VideoFrame?(S.width=h.displayWidth,S.height=h.displayHeight):(S.width=h.width,S.height=h.height),S}this.allocateTextureUnit=X,this.resetTextureUnits=B,this.setTexture2D=$,this.setTexture2DArray=W,this.setTexture3D=ne,this.setTextureCube=V,this.rebindTextures=ct,this.setupRenderTarget=_,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=de,this.useMultisampledRTT=he}function su(e,n){function t(i,o=Wt){let r;const f=rt.getTransfer(o);if(i===Gt)return e.UNSIGNED_BYTE;if(i===Aa)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Ra)return e.UNSIGNED_SHORT_5_5_5_1;if(i===ko)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===zo)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Wo)return e.BYTE;if(i===Xo)return e.SHORT;if(i===Nn)return e.UNSIGNED_SHORT;if(i===Ca)return e.INT;if(i===fn)return e.UNSIGNED_INT;if(i===Ft)return e.FLOAT;if(i===Hn)return e.HALF_FLOAT;if(i===Yo)return e.ALPHA;if(i===Ko)return e.RGB;if(i===Ct)return e.RGBA;if(i===Di)return e.DEPTH_COMPONENT;if(i===Un)return e.DEPTH_STENCIL;if(i===qo)return e.RED;if(i===wa)return e.RED_INTEGER;if(i===$o)return e.RG;if(i===Pa)return e.RG_INTEGER;if(i===Da)return e.RGBA_INTEGER;if(i===qn||i===$n||i===Zn||i===jn)if(f===$e)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===qn)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===$n)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Zn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===jn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===qn)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===$n)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Zn)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===jn)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xi||i===Yi||i===Ki||i===qi)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Xi)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yi)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ki)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===qi)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===$i||i===Zi||i===ji)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===$i||i===Zi)return f===$e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ji)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qi||i===Ji||i===er||i===tr||i===nr||i===ir||i===rr||i===ar||i===or||i===sr||i===lr||i===cr||i===dr||i===fr)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Qi)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ji)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===er)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===tr)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===nr)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ir)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===rr)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ar)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===or)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sr)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===lr)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===cr)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===dr)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===fr)return f===$e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ur||i===pr||i===hr)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===ur)return f===$e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===hr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===mr||i===_r||i===gr||i===vr)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===mr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===_r)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===gr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===vr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===dn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const lu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cu=`
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

}`;class du{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new ba(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Dt({vertexShader:lu,fragmentShader:cu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new hn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fu extends so{constructor(n,t){super();const i=this;let o=null,r=1,f=null,c="local-floor",E=1,S=null,b=null,m=null,v=null,M=null,N=null;const y=typeof XRWebGLBinding<"u",s=new du,a={},T=t.getContextAttributes();let x=null,g=null;const P=[],A=[],C=new ze;let I=null;const u=new qt;u.viewport=new dt;const p=new qt;p.viewport=new dt;const L=[u,p],B=new lo;let X=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let q=P[k];return q===void 0&&(q=new Yn,P[k]=q),q.getTargetRaySpace()},this.getControllerGrip=function(k){let q=P[k];return q===void 0&&(q=new Yn,P[k]=q),q.getGripSpace()},this.getHand=function(k){let q=P[k];return q===void 0&&(q=new Yn,P[k]=q),q.getHandSpace()};function $(k){const q=A.indexOf(k.inputSource);if(q===-1)return;const de=P[q];de!==void 0&&(de.update(k.inputSource,k.frame,S||f),de.dispatchEvent({type:k.type,data:k.inputSource}))}function W(){o.removeEventListener("select",$),o.removeEventListener("selectstart",$),o.removeEventListener("selectend",$),o.removeEventListener("squeeze",$),o.removeEventListener("squeezestart",$),o.removeEventListener("squeezeend",$),o.removeEventListener("end",W),o.removeEventListener("inputsourceschange",ne);for(let k=0;k<P.length;k++){const q=A[k];q!==null&&(A[k]=null,P[k].disconnect(q))}X=null,Y=null,s.reset();for(const k in a)delete a[k];n.setRenderTarget(x),M=null,v=null,m=null,o=null,g=null,Xe.stop(),i.isPresenting=!1,n.setPixelRatio(I),n.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){c=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return S||f},this.setReferenceSpace=function(k){S=k},this.getBaseLayer=function(){return v!==null?v:M},this.getBinding=function(){return m===null&&y&&(m=new XRWebGLBinding(o,t)),m},this.getFrame=function(){return N},this.getSession=function(){return o},this.setSession=async function(k){if(o=k,o!==null){if(x=n.getRenderTarget(),o.addEventListener("select",$),o.addEventListener("selectstart",$),o.addEventListener("selectend",$),o.addEventListener("squeeze",$),o.addEventListener("squeezestart",$),o.addEventListener("squeezeend",$),o.addEventListener("end",W),o.addEventListener("inputsourceschange",ne),T.xrCompatible!==!0&&await t.makeXRCompatible(),I=n.getPixelRatio(),n.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,we=null,Se=null;T.depth&&(Se=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=T.stencil?Un:Di,we=T.stencil?dn:fn);const Oe={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};m=this.getBinding(),v=m.createProjectionLayer(Oe),o.updateRenderState({layers:[v]}),n.setPixelRatio(1),n.setSize(v.textureWidth,v.textureHeight,!1),g=new jt(v.textureWidth,v.textureHeight,{format:Ct,type:Gt,depthTexture:new Ma(v.textureWidth,v.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:T.stencil,colorSpace:n.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}else{const de={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};M=new XRWebGLLayer(o,t,de),o.updateRenderState({baseLayer:M}),n.setPixelRatio(1),n.setSize(M.framebufferWidth,M.framebufferHeight,!1),g=new jt(M.framebufferWidth,M.framebufferHeight,{format:Ct,type:Gt,colorSpace:n.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(E),S=null,f=await o.requestReferenceSpace(c),Xe.setContext(o),Xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return s.getDepthTexture()};function ne(k){for(let q=0;q<k.removed.length;q++){const de=k.removed[q],we=A.indexOf(de);we>=0&&(A[we]=null,P[we].disconnect(de))}for(let q=0;q<k.added.length;q++){const de=k.added[q];let we=A.indexOf(de);if(we===-1){for(let Oe=0;Oe<P.length;Oe++)if(Oe>=A.length){A.push(de),we=Oe;break}else if(A[Oe]===null){A[Oe]=de,we=Oe;break}if(we===-1)break}const Se=P[we];Se&&Se.connect(de)}}const V=new se,ve=new se;function xe(k,q,de){V.setFromMatrixPosition(q.matrixWorld),ve.setFromMatrixPosition(de.matrixWorld);const we=V.distanceTo(ve),Se=q.projectionMatrix.elements,Oe=de.projectionMatrix.elements,ct=Se[14]/(Se[10]-1),_=Se[14]/(Se[10]+1),Ze=(Se[9]+1)/Se[5],De=(Se[9]-1)/Se[5],be=(Se[8]-1)/Se[0],pe=(Oe[8]+1)/Oe[0],je=ct*be,he=ct*pe,Ue=we/(-be+pe),lt=Ue*-be;if(q.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(lt),k.translateZ(Ue),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Se[10]===-1)k.projectionMatrix.copy(q.projectionMatrix),k.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const it=ct+Ue,h=_+Ue,l=je-lt,U=he+(we-lt),G=Ze*_/h*it,K=De*_/h*it;k.projectionMatrix.makePerspective(l,U,G,K,it,h),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function ye(k,q){q===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(q.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(o===null)return;let q=k.near,de=k.far;s.texture!==null&&(s.depthNear>0&&(q=s.depthNear),s.depthFar>0&&(de=s.depthFar)),B.near=p.near=u.near=q,B.far=p.far=u.far=de,(X!==B.near||Y!==B.far)&&(o.updateRenderState({depthNear:B.near,depthFar:B.far}),X=B.near,Y=B.far),B.layers.mask=k.layers.mask|6,u.layers.mask=B.layers.mask&3,p.layers.mask=B.layers.mask&5;const we=k.parent,Se=B.cameras;ye(B,we);for(let Oe=0;Oe<Se.length;Oe++)ye(Se[Oe],we);Se.length===2?xe(B,u,p):B.projectionMatrix.copy(u.projectionMatrix),He(k,B,we)};function He(k,q,de){de===null?k.matrix.copy(q.matrixWorld):(k.matrix.copy(de.matrixWorld),k.matrix.invert(),k.matrix.multiply(q.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(q.projectionMatrix),k.projectionMatrixInverse.copy(q.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=co*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(v===null&&M===null))return E},this.setFoveation=function(k){E=k,v!==null&&(v.fixedFoveation=k),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=k)},this.hasDepthSensing=function(){return s.texture!==null},this.getDepthSensingMesh=function(){return s.getMesh(B)},this.getCameraTexture=function(k){return a[k]};let nt=null;function et(k,q){if(b=q.getViewerPose(S||f),N=q,b!==null){const de=b.views;M!==null&&(n.setRenderTargetFramebuffer(g,M.framebuffer),n.setRenderTarget(g));let we=!1;de.length!==B.cameras.length&&(B.cameras.length=0,we=!0);for(let _=0;_<de.length;_++){const Ze=de[_];let De=null;if(M!==null)De=M.getViewport(Ze);else{const pe=m.getViewSubImage(v,Ze);De=pe.viewport,_===0&&(n.setRenderTargetTextures(g,pe.colorTexture,pe.depthStencilTexture),n.setRenderTarget(g))}let be=L[_];be===void 0&&(be=new qt,be.layers.enable(_),be.viewport=new dt,L[_]=be),be.matrix.fromArray(Ze.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Ze.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(De.x,De.y,De.width,De.height),_===0&&(B.matrix.copy(be.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),we===!0&&B.cameras.push(be)}const Se=o.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&y){m=i.getBinding();const _=m.getDepthInformation(de[0]);_&&_.isValid&&_.texture&&s.init(_,o.renderState)}if(Se&&Se.includes("camera-access")&&y){n.state.unbindTexture(),m=i.getBinding();for(let _=0;_<de.length;_++){const Ze=de[_].camera;if(Ze){let De=a[Ze];De||(De=new ba,a[Ze]=De);const be=m.getCameraImage(Ze);De.sourceTexture=be}}}}for(let de=0;de<P.length;de++){const we=A[de],Se=P[de];we!==null&&Se!==void 0&&Se.update(we,q,S||f)}nt&&nt(k,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),N=null}const Xe=new Ha;Xe.setAnimationLoop(et),this.setAnimationLoop=function(k){nt=k},this.dispose=function(){}}}const It=new On,uu=new St;function pu(e,n){function t(s,a){s.matrixAutoUpdate===!0&&s.updateMatrix(),a.value.copy(s.matrix)}function i(s,a){a.color.getRGB(s.fogColor.value,ya(e)),a.isFog?(s.fogNear.value=a.near,s.fogFar.value=a.far):a.isFogExp2&&(s.fogDensity.value=a.density)}function o(s,a,T,x,g){a.isMeshBasicMaterial||a.isMeshLambertMaterial?r(s,a):a.isMeshToonMaterial?(r(s,a),m(s,a)):a.isMeshPhongMaterial?(r(s,a),b(s,a)):a.isMeshStandardMaterial?(r(s,a),v(s,a),a.isMeshPhysicalMaterial&&M(s,a,g)):a.isMeshMatcapMaterial?(r(s,a),N(s,a)):a.isMeshDepthMaterial?r(s,a):a.isMeshDistanceMaterial?(r(s,a),y(s,a)):a.isMeshNormalMaterial?r(s,a):a.isLineBasicMaterial?(f(s,a),a.isLineDashedMaterial&&c(s,a)):a.isPointsMaterial?E(s,a,T,x):a.isSpriteMaterial?S(s,a):a.isShadowMaterial?(s.color.value.copy(a.color),s.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}function r(s,a){s.opacity.value=a.opacity,a.color&&s.diffuse.value.copy(a.color),a.emissive&&s.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(s.map.value=a.map,t(a.map,s.mapTransform)),a.alphaMap&&(s.alphaMap.value=a.alphaMap,t(a.alphaMap,s.alphaMapTransform)),a.bumpMap&&(s.bumpMap.value=a.bumpMap,t(a.bumpMap,s.bumpMapTransform),s.bumpScale.value=a.bumpScale,a.side===Mt&&(s.bumpScale.value*=-1)),a.normalMap&&(s.normalMap.value=a.normalMap,t(a.normalMap,s.normalMapTransform),s.normalScale.value.copy(a.normalScale),a.side===Mt&&s.normalScale.value.negate()),a.displacementMap&&(s.displacementMap.value=a.displacementMap,t(a.displacementMap,s.displacementMapTransform),s.displacementScale.value=a.displacementScale,s.displacementBias.value=a.displacementBias),a.emissiveMap&&(s.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,s.emissiveMapTransform)),a.specularMap&&(s.specularMap.value=a.specularMap,t(a.specularMap,s.specularMapTransform)),a.alphaTest>0&&(s.alphaTest.value=a.alphaTest);const T=n.get(a),x=T.envMap,g=T.envMapRotation;x&&(s.envMap.value=x,It.copy(g),It.x*=-1,It.y*=-1,It.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(It.y*=-1,It.z*=-1),s.envMapRotation.value.setFromMatrix4(uu.makeRotationFromEuler(It)),s.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,s.reflectivity.value=a.reflectivity,s.ior.value=a.ior,s.refractionRatio.value=a.refractionRatio),a.lightMap&&(s.lightMap.value=a.lightMap,s.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,s.lightMapTransform)),a.aoMap&&(s.aoMap.value=a.aoMap,s.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,s.aoMapTransform))}function f(s,a){s.diffuse.value.copy(a.color),s.opacity.value=a.opacity,a.map&&(s.map.value=a.map,t(a.map,s.mapTransform))}function c(s,a){s.dashSize.value=a.dashSize,s.totalSize.value=a.dashSize+a.gapSize,s.scale.value=a.scale}function E(s,a,T,x){s.diffuse.value.copy(a.color),s.opacity.value=a.opacity,s.size.value=a.size*T,s.scale.value=x*.5,a.map&&(s.map.value=a.map,t(a.map,s.uvTransform)),a.alphaMap&&(s.alphaMap.value=a.alphaMap,t(a.alphaMap,s.alphaMapTransform)),a.alphaTest>0&&(s.alphaTest.value=a.alphaTest)}function S(s,a){s.diffuse.value.copy(a.color),s.opacity.value=a.opacity,s.rotation.value=a.rotation,a.map&&(s.map.value=a.map,t(a.map,s.mapTransform)),a.alphaMap&&(s.alphaMap.value=a.alphaMap,t(a.alphaMap,s.alphaMapTransform)),a.alphaTest>0&&(s.alphaTest.value=a.alphaTest)}function b(s,a){s.specular.value.copy(a.specular),s.shininess.value=Math.max(a.shininess,1e-4)}function m(s,a){a.gradientMap&&(s.gradientMap.value=a.gradientMap)}function v(s,a){s.metalness.value=a.metalness,a.metalnessMap&&(s.metalnessMap.value=a.metalnessMap,t(a.metalnessMap,s.metalnessMapTransform)),s.roughness.value=a.roughness,a.roughnessMap&&(s.roughnessMap.value=a.roughnessMap,t(a.roughnessMap,s.roughnessMapTransform)),a.envMap&&(s.envMapIntensity.value=a.envMapIntensity)}function M(s,a,T){s.ior.value=a.ior,a.sheen>0&&(s.sheenColor.value.copy(a.sheenColor).multiplyScalar(a.sheen),s.sheenRoughness.value=a.sheenRoughness,a.sheenColorMap&&(s.sheenColorMap.value=a.sheenColorMap,t(a.sheenColorMap,s.sheenColorMapTransform)),a.sheenRoughnessMap&&(s.sheenRoughnessMap.value=a.sheenRoughnessMap,t(a.sheenRoughnessMap,s.sheenRoughnessMapTransform))),a.clearcoat>0&&(s.clearcoat.value=a.clearcoat,s.clearcoatRoughness.value=a.clearcoatRoughness,a.clearcoatMap&&(s.clearcoatMap.value=a.clearcoatMap,t(a.clearcoatMap,s.clearcoatMapTransform)),a.clearcoatRoughnessMap&&(s.clearcoatRoughnessMap.value=a.clearcoatRoughnessMap,t(a.clearcoatRoughnessMap,s.clearcoatRoughnessMapTransform)),a.clearcoatNormalMap&&(s.clearcoatNormalMap.value=a.clearcoatNormalMap,t(a.clearcoatNormalMap,s.clearcoatNormalMapTransform),s.clearcoatNormalScale.value.copy(a.clearcoatNormalScale),a.side===Mt&&s.clearcoatNormalScale.value.negate())),a.dispersion>0&&(s.dispersion.value=a.dispersion),a.iridescence>0&&(s.iridescence.value=a.iridescence,s.iridescenceIOR.value=a.iridescenceIOR,s.iridescenceThicknessMinimum.value=a.iridescenceThicknessRange[0],s.iridescenceThicknessMaximum.value=a.iridescenceThicknessRange[1],a.iridescenceMap&&(s.iridescenceMap.value=a.iridescenceMap,t(a.iridescenceMap,s.iridescenceMapTransform)),a.iridescenceThicknessMap&&(s.iridescenceThicknessMap.value=a.iridescenceThicknessMap,t(a.iridescenceThicknessMap,s.iridescenceThicknessMapTransform))),a.transmission>0&&(s.transmission.value=a.transmission,s.transmissionSamplerMap.value=T.texture,s.transmissionSamplerSize.value.set(T.width,T.height),a.transmissionMap&&(s.transmissionMap.value=a.transmissionMap,t(a.transmissionMap,s.transmissionMapTransform)),s.thickness.value=a.thickness,a.thicknessMap&&(s.thicknessMap.value=a.thicknessMap,t(a.thicknessMap,s.thicknessMapTransform)),s.attenuationDistance.value=a.attenuationDistance,s.attenuationColor.value.copy(a.attenuationColor)),a.anisotropy>0&&(s.anisotropyVector.value.set(a.anisotropy*Math.cos(a.anisotropyRotation),a.anisotropy*Math.sin(a.anisotropyRotation)),a.anisotropyMap&&(s.anisotropyMap.value=a.anisotropyMap,t(a.anisotropyMap,s.anisotropyMapTransform))),s.specularIntensity.value=a.specularIntensity,s.specularColor.value.copy(a.specularColor),a.specularColorMap&&(s.specularColorMap.value=a.specularColorMap,t(a.specularColorMap,s.specularColorMapTransform)),a.specularIntensityMap&&(s.specularIntensityMap.value=a.specularIntensityMap,t(a.specularIntensityMap,s.specularIntensityMapTransform))}function N(s,a){a.matcap&&(s.matcap.value=a.matcap)}function y(s,a){const T=n.get(a).light;s.referencePosition.value.setFromMatrixPosition(T.matrixWorld),s.nearDistance.value=T.shadow.camera.near,s.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:o}}function hu(e,n,t,i){let o={},r={},f=[];const c=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function E(T,x){const g=x.program;i.uniformBlockBinding(T,g)}function S(T,x){let g=o[T.id];g===void 0&&(N(T),g=b(T),o[T.id]=g,T.addEventListener("dispose",s));const P=x.program;i.updateUBOMapping(T,P);const A=n.render.frame;r[T.id]!==A&&(v(T),r[T.id]=A)}function b(T){const x=m();T.__bindingPointIndex=x;const g=e.createBuffer(),P=T.__size,A=T.usage;return e.bindBuffer(e.UNIFORM_BUFFER,g),e.bufferData(e.UNIFORM_BUFFER,P,A),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,x,g),g}function m(){for(let T=0;T<c;T++)if(f.indexOf(T)===-1)return f.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(T){const x=o[T.id],g=T.uniforms,P=T.__cache;e.bindBuffer(e.UNIFORM_BUFFER,x);for(let A=0,C=g.length;A<C;A++){const I=Array.isArray(g[A])?g[A]:[g[A]];for(let u=0,p=I.length;u<p;u++){const L=I[u];if(M(L,A,u,P)===!0){const B=L.__offset,X=Array.isArray(L.value)?L.value:[L.value];let Y=0;for(let $=0;$<X.length;$++){const W=X[$],ne=y(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,B+Y,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,Y),Y+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,B,L.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function M(T,x,g,P){const A=T.value,C=x+"_"+g;if(P[C]===void 0)return typeof A=="number"||typeof A=="boolean"?P[C]=A:P[C]=A.clone(),!0;{const I=P[C];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return P[C]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function N(T){const x=T.uniforms;let g=0;const P=16;for(let C=0,I=x.length;C<I;C++){const u=Array.isArray(x[C])?x[C]:[x[C]];for(let p=0,L=u.length;p<L;p++){const B=u[p],X=Array.isArray(B.value)?B.value:[B.value];for(let Y=0,$=X.length;Y<$;Y++){const W=X[Y],ne=y(W),V=g%P,ve=V%ne.boundary,xe=V+ve;g+=ve,xe!==0&&P-xe<ne.storage&&(g+=P-xe),B.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=g,g+=ne.storage}}}const A=g%P;return A>0&&(g+=P-A),T.__size=g,T.__cache={},this}function y(T){const x={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(x.boundary=4,x.storage=4):T.isVector2?(x.boundary=8,x.storage=8):T.isVector3||T.isColor?(x.boundary=16,x.storage=12):T.isVector4?(x.boundary=16,x.storage=16):T.isMatrix3?(x.boundary=48,x.storage=48):T.isMatrix4?(x.boundary=64,x.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),x}function s(T){const x=T.target;x.removeEventListener("dispose",s);const g=f.indexOf(x.__bindingPointIndex);f.splice(g,1),e.deleteBuffer(o[x.id]),delete o[x.id],delete r[x.id]}function a(){for(const T in o)e.deleteBuffer(o[T]);f=[],o={},r={}}return{bind:E,update:S,dispose:a}}class mu{constructor(n={}){const{canvas:t=ro(),context:i=null,depth:o=!0,stencil:r=!1,alpha:f=!1,antialias:c=!1,premultipliedAlpha:E=!0,preserveDrawingBuffer:S=!1,powerPreference:b="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:v=!1}=n;this.isWebGLRenderer=!0;let M;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=i.getContextAttributes().alpha}else M=f;const N=new Uint32Array(4),y=new Int32Array(4);let s=null,a=null;const T=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const g=this;let P=!1;this._outputColorSpace=Ea;let A=0,C=0,I=null,u=-1,p=null;const L=new dt,B=new dt;let X=null;const Y=new Ve(0);let $=0,W=t.width,ne=t.height,V=1,ve=null,xe=null;const ye=new dt(0,0,W,ne),He=new dt(0,0,W,ne);let nt=!1;const et=new Sa;let Xe=!1,k=!1;const q=new St,de=new se,we=new dt,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function ct(){return I===null?V:1}let _=i;function Ze(d,w){return t.getContext(d,w)}try{const d={alpha:!0,depth:o,stencil:r,antialias:c,premultipliedAlpha:E,preserveDrawingBuffer:S,powerPreference:b,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ao}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",Z,!1),_===null){const w="webgl2";if(_=Ze(w,d),_===null)throw Ze(w)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(d){throw console.error("THREE.WebGLRenderer: "+d.message),d}let De,be,pe,je,he,Ue,lt,it,h,l,U,G,K,H,Ee,ee,me,_e,Q,oe,Re,ge,re,Le;function R(){De=new Ad(_),De.init(),ge=new su(_,De),be=new gd(_,De,n,ge),pe=new au(_,De),be.reversedDepthBuffer&&v&&pe.buffers.depth.setReversed(!0),je=new Cd(_),he=new Yf,Ue=new ou(_,De,pe,he,be,ge,je),lt=new Ed(g),it=new xd(g),h=new Us(_),re=new md(_,h),l=new Rd(_,h,je,re),U=new Pd(_,l,h,je),Q=new wd(_,be,Ue),ee=new vd(he),G=new Xf(g,lt,it,De,be,re,ee),K=new pu(g,he),H=new qf,Ee=new eu(De),_e=new hd(g,lt,it,pe,U,M,E),me=new iu(g,U,be),Le=new hu(_,je,be,pe),oe=new _d(_,De,je),Re=new bd(_,De,je),je.programs=G.programs,g.capabilities=be,g.extensions=De,g.properties=he,g.renderLists=H,g.shadowMap=me,g.state=pe,g.info=je}R();const J=new fu(g,_);this.xr=J,this.getContext=function(){return _},this.getContextAttributes=function(){return _.getContextAttributes()},this.forceContextLoss=function(){const d=De.get("WEBGL_lose_context");d&&d.loseContext()},this.forceContextRestore=function(){const d=De.get("WEBGL_lose_context");d&&d.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(d){d!==void 0&&(V=d,this.setSize(W,ne,!1))},this.getSize=function(d){return d.set(W,ne)},this.setSize=function(d,w,O=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=d,ne=w,t.width=Math.floor(d*V),t.height=Math.floor(w*V),O===!0&&(t.style.width=d+"px",t.style.height=w+"px"),this.setViewport(0,0,d,w)},this.getDrawingBufferSize=function(d){return d.set(W*V,ne*V).floor()},this.setDrawingBufferSize=function(d,w,O){W=d,ne=w,V=O,t.width=Math.floor(d*O),t.height=Math.floor(w*O),this.setViewport(0,0,d,w)},this.getCurrentViewport=function(d){return d.copy(L)},this.getViewport=function(d){return d.copy(ye)},this.setViewport=function(d,w,O,F){d.isVector4?ye.set(d.x,d.y,d.z,d.w):ye.set(d,w,O,F),pe.viewport(L.copy(ye).multiplyScalar(V).round())},this.getScissor=function(d){return d.copy(He)},this.setScissor=function(d,w,O,F){d.isVector4?He.set(d.x,d.y,d.z,d.w):He.set(d,w,O,F),pe.scissor(B.copy(He).multiplyScalar(V).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(d){pe.setScissorTest(nt=d)},this.setOpaqueSort=function(d){ve=d},this.setTransparentSort=function(d){xe=d},this.getClearColor=function(d){return d.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor(...arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha(...arguments)},this.clear=function(d=!0,w=!0,O=!0){let F=0;if(d){let D=!1;if(I!==null){const j=I.texture.format;D=j===Da||j===Pa||j===wa}if(D){const j=I.texture.type,ae=j===Gt||j===fn||j===Nn||j===dn||j===Aa||j===Ra,fe=_e.getClearColor(),le=_e.getClearAlpha(),Ae=fe.r,Ce=fe.g,Me=fe.b;ae?(N[0]=Ae,N[1]=Ce,N[2]=Me,N[3]=le,_.clearBufferuiv(_.COLOR,0,N)):(y[0]=Ae,y[1]=Ce,y[2]=Me,y[3]=le,_.clearBufferiv(_.COLOR,0,y))}else F|=_.COLOR_BUFFER_BIT}w&&(F|=_.DEPTH_BUFFER_BIT),O&&(F|=_.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),_.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",Z,!1),_e.dispose(),H.dispose(),Ee.dispose(),he.dispose(),lt.dispose(),it.dispose(),U.dispose(),re.dispose(),Le.dispose(),G.dispose(),J.dispose(),J.removeEventListener("sessionstart",xt),J.removeEventListener("sessionend",Bi),Lt.stop()};function te(d){d.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const d=je.autoReset,w=me.enabled,O=me.autoUpdate,F=me.needsUpdate,D=me.type;R(),je.autoReset=d,me.enabled=w,me.autoUpdate=O,me.needsUpdate=F,me.type=D}function Z(d){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",d.statusMessage)}function z(d){const w=d.target;w.removeEventListener("dispose",z),ue(w)}function ue(d){Pe(d),he.remove(d)}function Pe(d){const w=he.get(d).programs;w!==void 0&&(w.forEach(function(O){G.releaseProgram(O)}),d.isShaderMaterial&&G.releaseShaderCache(d))}this.renderBufferDirect=function(d,w,O,F,D,j){w===null&&(w=Se);const ae=D.isMesh&&D.matrixWorld.determinant()<0,fe=Qa(d,w,O,F,D);pe.setMaterial(F,ae);let le=O.index,Ae=1;if(F.wireframe===!0){if(le=l.getWireframeAttribute(O),le===void 0)return;Ae=2}const Ce=O.drawRange,Me=O.attributes.position;let Ne=Ce.start*Ae,ke=(Ce.start+Ce.count)*Ae;j!==null&&(Ne=Math.max(Ne,j.start*Ae),ke=Math.min(ke,(j.start+j.count)*Ae)),le!==null?(Ne=Math.max(Ne,0),ke=Math.min(ke,le.count)):Me!=null&&(Ne=Math.max(Ne,0),ke=Math.min(ke,Me.count));const tt=ke-Ne;if(tt<0||tt===1/0)return;re.setup(D,F,fe,O,le);let qe,Ye=oe;if(le!==null&&(qe=h.get(le),Ye=Re,Ye.setIndex(qe)),D.isMesh)F.wireframe===!0?(pe.setLineWidth(F.wireframeLinewidth*ct()),Ye.setMode(_.LINES)):Ye.setMode(_.TRIANGLES);else if(D.isLine){let Te=F.linewidth;Te===void 0&&(Te=1),pe.setLineWidth(Te*ct()),D.isLineSegments?Ye.setMode(_.LINES):D.isLineLoop?Ye.setMode(_.LINE_LOOP):Ye.setMode(_.LINE_STRIP)}else D.isPoints?Ye.setMode(_.POINTS):D.isSprite&&Ye.setMode(_.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)_i("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ye.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))Ye.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const Te=D._multiDrawStarts,Qe=D._multiDrawCounts,Be=D._multiDrawCount,_t=le?h.get(le).bytesPerElement:1,Vt=he.get(F).currentProgram.getUniforms();for(let gt=0;gt<Be;gt++)Vt.setValue(_,"_gl_DrawID",gt),Ye.render(Te[gt]/_t,Qe[gt])}else if(D.isInstancedMesh)Ye.renderInstances(Ne,tt,D.count);else if(O.isInstancedBufferGeometry){const Te=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,Qe=Math.min(O.instanceCount,Te);Ye.renderInstances(Ne,tt,Qe)}else Ye.render(Ne,tt)};function Ke(d,w,O){d.transparent===!0&&d.side===Tt&&d.forceSinglePass===!1?(d.side=Mt,d.needsUpdate=!0,_n(d,w,O),d.side=cn,d.needsUpdate=!0,_n(d,w,O),d.side=Tt):_n(d,w,O)}this.compile=function(d,w,O=null){O===null&&(O=d),a=Ee.get(O),a.init(w),x.push(a),O.traverseVisible(function(D){D.isLight&&D.layers.test(w.layers)&&(a.pushLight(D),D.castShadow&&a.pushShadow(D))}),d!==O&&d.traverseVisible(function(D){D.isLight&&D.layers.test(w.layers)&&(a.pushLight(D),D.castShadow&&a.pushShadow(D))}),a.setupLights();const F=new Set;return d.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const j=D.material;if(j)if(Array.isArray(j))for(let ae=0;ae<j.length;ae++){const fe=j[ae];Ke(fe,O,D),F.add(fe)}else Ke(j,O,D),F.add(j)}),a=x.pop(),F},this.compileAsync=function(d,w,O=null){const F=this.compile(d,w,O);return new Promise(D=>{function j(){if(F.forEach(function(ae){he.get(ae).currentProgram.isReady()&&F.delete(ae)}),F.size===0){D(d);return}setTimeout(j,10)}De.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Ge=null;function Rt(d){Ge&&Ge(d)}function xt(){Lt.stop()}function Bi(){Lt.start()}const Lt=new Ha;Lt.setAnimationLoop(Rt),typeof self<"u"&&Lt.setContext(self),this.setAnimationLoop=function(d){Ge=d,J.setAnimationLoop(d),d===null?Lt.stop():Lt.start()},J.addEventListener("sessionstart",xt),J.addEventListener("sessionend",Bi),this.render=function(d,w){if(w!==void 0&&w.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),w.parent===null&&w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(w),w=J.getCamera()),d.isScene===!0&&d.onBeforeRender(g,d,w,I),a=Ee.get(d,x.length),a.init(w),x.push(a),q.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse),et.setFromProjectionMatrix(q,Wi,w.reversedDepth),k=this.localClippingEnabled,Xe=ee.init(this.clippingPlanes,k),s=H.get(d,T.length),s.init(),T.push(s),J.enabled===!0&&J.isPresenting===!0){const j=g.xr.getDepthSensingMesh();j!==null&&Wn(j,w,-1/0,g.sortObjects)}Wn(d,w,0,g.sortObjects),s.finish(),g.sortObjects===!0&&s.sort(ve,xe),Oe=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Oe&&_e.addToRenderList(s,d),this.info.render.frame++,Xe===!0&&ee.beginShadows();const O=a.state.shadowsArray;me.render(O,d,w),Xe===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const F=s.opaque,D=s.transmissive;if(a.setupLights(),w.isArrayCamera){const j=w.cameras;if(D.length>0)for(let ae=0,fe=j.length;ae<fe;ae++){const le=j[ae];Gi(F,D,d,le)}Oe&&_e.render(d);for(let ae=0,fe=j.length;ae<fe;ae++){const le=j[ae];Hi(s,d,le,le.viewport)}}else D.length>0&&Gi(F,D,d,w),Oe&&_e.render(d),Hi(s,d,w);I!==null&&C===0&&(Ue.updateMultisampleRenderTarget(I),Ue.updateRenderTargetMipmap(I)),d.isScene===!0&&d.onAfterRender(g,d,w),re.resetDefaultState(),u=-1,p=null,x.pop(),x.length>0?(a=x[x.length-1],Xe===!0&&ee.setGlobalState(g.clippingPlanes,a.state.camera)):a=null,T.pop(),T.length>0?s=T[T.length-1]:s=null};function Wn(d,w,O,F){if(d.visible===!1)return;if(d.layers.test(w.layers)){if(d.isGroup)O=d.renderOrder;else if(d.isLOD)d.autoUpdate===!0&&d.update(w);else if(d.isLight)a.pushLight(d),d.castShadow&&a.pushShadow(d);else if(d.isSprite){if(!d.frustumCulled||et.intersectsSprite(d)){F&&we.setFromMatrixPosition(d.matrixWorld).applyMatrix4(q);const ae=U.update(d),fe=d.material;fe.visible&&s.push(d,ae,fe,O,we.z,null)}}else if((d.isMesh||d.isLine||d.isPoints)&&(!d.frustumCulled||et.intersectsObject(d))){const ae=U.update(d),fe=d.material;if(F&&(d.boundingSphere!==void 0?(d.boundingSphere===null&&d.computeBoundingSphere(),we.copy(d.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),we.copy(ae.boundingSphere.center)),we.applyMatrix4(d.matrixWorld).applyMatrix4(q)),Array.isArray(fe)){const le=ae.groups;for(let Ae=0,Ce=le.length;Ae<Ce;Ae++){const Me=le[Ae],Ne=fe[Me.materialIndex];Ne&&Ne.visible&&s.push(d,ae,Ne,O,we.z,Me)}}else fe.visible&&s.push(d,ae,fe,O,we.z,null)}}const j=d.children;for(let ae=0,fe=j.length;ae<fe;ae++)Wn(j[ae],w,O,F)}function Hi(d,w,O,F){const D=d.opaque,j=d.transmissive,ae=d.transparent;a.setupLightsView(O),Xe===!0&&ee.setGlobalState(g.clippingPlanes,O),F&&pe.viewport(L.copy(F)),D.length>0&&mn(D,w,O),j.length>0&&mn(j,w,O),ae.length>0&&mn(ae,w,O),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Gi(d,w,O,F){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;a.state.transmissionRenderTarget[F.id]===void 0&&(a.state.transmissionRenderTarget[F.id]=new jt(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?Hn:Gt,minFilter:rn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const j=a.state.transmissionRenderTarget[F.id],ae=F.viewport||L;j.setSize(ae.z*g.transmissionResolutionScale,ae.w*g.transmissionResolutionScale);const fe=g.getRenderTarget(),le=g.getActiveCubeFace(),Ae=g.getActiveMipmapLevel();g.setRenderTarget(j),g.getClearColor(Y),$=g.getClearAlpha(),$<1&&g.setClearColor(16777215,.5),g.clear(),Oe&&_e.render(O);const Ce=g.toneMapping;g.toneMapping=wt;const Me=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),a.setupLightsView(F),Xe===!0&&ee.setGlobalState(g.clippingPlanes,F),mn(d,O,F),Ue.updateMultisampleRenderTarget(j),Ue.updateRenderTargetMipmap(j),De.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let ke=0,tt=w.length;ke<tt;ke++){const qe=w[ke],Ye=qe.object,Te=qe.geometry,Qe=qe.material,Be=qe.group;if(Qe.side===Tt&&Ye.layers.test(F.layers)){const _t=Qe.side;Qe.side=Mt,Qe.needsUpdate=!0,Vi(Ye,O,F,Te,Qe,Be),Qe.side=_t,Qe.needsUpdate=!0,Ne=!0}}Ne===!0&&(Ue.updateMultisampleRenderTarget(j),Ue.updateRenderTargetMipmap(j))}g.setRenderTarget(fe,le,Ae),g.setClearColor(Y,$),Me!==void 0&&(F.viewport=Me),g.toneMapping=Ce}function mn(d,w,O){const F=w.isScene===!0?w.overrideMaterial:null;for(let D=0,j=d.length;D<j;D++){const ae=d[D],fe=ae.object,le=ae.geometry,Ae=ae.group;let Ce=ae.material;Ce.allowOverride===!0&&F!==null&&(Ce=F),fe.layers.test(O.layers)&&Vi(fe,w,O,le,Ce,Ae)}}function Vi(d,w,O,F,D,j){d.onBeforeRender(g,w,O,F,D,j),d.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,d.matrixWorld),d.normalMatrix.getNormalMatrix(d.modelViewMatrix),D.onBeforeRender(g,w,O,F,d,j),D.transparent===!0&&D.side===Tt&&D.forceSinglePass===!1?(D.side=Mt,D.needsUpdate=!0,g.renderBufferDirect(O,w,F,D,d,j),D.side=cn,D.needsUpdate=!0,g.renderBufferDirect(O,w,F,D,d,j),D.side=Tt):g.renderBufferDirect(O,w,F,D,d,j),d.onAfterRender(g,w,O,F,D,j)}function _n(d,w,O){w.isScene!==!0&&(w=Se);const F=he.get(d),D=a.state.lights,j=a.state.shadowsArray,ae=D.state.version,fe=G.getParameters(d,D.state,j,w,O),le=G.getProgramCacheKey(fe);let Ae=F.programs;F.environment=d.isMeshStandardMaterial?w.environment:null,F.fog=w.fog,F.envMap=(d.isMeshStandardMaterial?it:lt).get(d.envMap||F.environment),F.envMapRotation=F.environment!==null&&d.envMap===null?w.environmentRotation:d.envMapRotation,Ae===void 0&&(d.addEventListener("dispose",z),Ae=new Map,F.programs=Ae);let Ce=Ae.get(le);if(Ce!==void 0){if(F.currentProgram===Ce&&F.lightsStateVersion===ae)return zi(d,fe),Ce}else fe.uniforms=G.getUniforms(d),d.onBeforeCompile(fe,g),Ce=G.acquireProgram(fe,le),Ae.set(le,Ce),F.uniforms=fe.uniforms;const Me=F.uniforms;return(!d.isShaderMaterial&&!d.isRawShaderMaterial||d.clipping===!0)&&(Me.clippingPlanes=ee.uniform),zi(d,fe),F.needsLights=eo(d),F.lightsStateVersion=ae,F.needsLights&&(Me.ambientLightColor.value=D.state.ambient,Me.lightProbe.value=D.state.probe,Me.directionalLights.value=D.state.directional,Me.directionalLightShadows.value=D.state.directionalShadow,Me.spotLights.value=D.state.spot,Me.spotLightShadows.value=D.state.spotShadow,Me.rectAreaLights.value=D.state.rectArea,Me.ltc_1.value=D.state.rectAreaLTC1,Me.ltc_2.value=D.state.rectAreaLTC2,Me.pointLights.value=D.state.point,Me.pointLightShadows.value=D.state.pointShadow,Me.hemisphereLights.value=D.state.hemi,Me.directionalShadowMap.value=D.state.directionalShadowMap,Me.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Me.spotShadowMap.value=D.state.spotShadowMap,Me.spotLightMatrix.value=D.state.spotLightMatrix,Me.spotLightMap.value=D.state.spotLightMap,Me.pointShadowMap.value=D.state.pointShadowMap,Me.pointShadowMatrix.value=D.state.pointShadowMatrix),F.currentProgram=Ce,F.uniformsList=null,Ce}function ki(d){if(d.uniformsList===null){const w=d.currentProgram.getUniforms();d.uniformsList=Ln.seqWithValue(w.seq,d.uniforms)}return d.uniformsList}function zi(d,w){const O=he.get(d);O.outputColorSpace=w.outputColorSpace,O.batching=w.batching,O.batchingColor=w.batchingColor,O.instancing=w.instancing,O.instancingColor=w.instancingColor,O.instancingMorph=w.instancingMorph,O.skinning=w.skinning,O.morphTargets=w.morphTargets,O.morphNormals=w.morphNormals,O.morphColors=w.morphColors,O.morphTargetsCount=w.morphTargetsCount,O.numClippingPlanes=w.numClippingPlanes,O.numIntersection=w.numClipIntersection,O.vertexAlphas=w.vertexAlphas,O.vertexTangents=w.vertexTangents,O.toneMapping=w.toneMapping}function Qa(d,w,O,F,D){w.isScene!==!0&&(w=Se),Ue.resetTextureUnits();const j=w.fog,ae=F.isMeshStandardMaterial?w.environment:null,fe=I===null?g.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Gn,le=(F.isMeshStandardMaterial?it:lt).get(F.envMap||ae),Ae=F.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ce=!!O.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Me=!!O.morphAttributes.position,Ne=!!O.morphAttributes.normal,ke=!!O.morphAttributes.color;let tt=wt;F.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(tt=g.toneMapping);const qe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ye=qe!==void 0?qe.length:0,Te=he.get(F),Qe=a.state.lights;if(Xe===!0&&(k===!0||d!==p)){const ft=d===p&&F.id===u;ee.setState(F,d,ft)}let Be=!1;F.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Qe.state.version||Te.outputColorSpace!==fe||D.isBatchedMesh&&Te.batching===!1||!D.isBatchedMesh&&Te.batching===!0||D.isBatchedMesh&&Te.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Te.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Te.instancing===!1||!D.isInstancedMesh&&Te.instancing===!0||D.isSkinnedMesh&&Te.skinning===!1||!D.isSkinnedMesh&&Te.skinning===!0||D.isInstancedMesh&&Te.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Te.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Te.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Te.instancingMorph===!1&&D.morphTexture!==null||Te.envMap!==le||F.fog===!0&&Te.fog!==j||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ee.numPlanes||Te.numIntersection!==ee.numIntersection)||Te.vertexAlphas!==Ae||Te.vertexTangents!==Ce||Te.morphTargets!==Me||Te.morphNormals!==Ne||Te.morphColors!==ke||Te.toneMapping!==tt||Te.morphTargetsCount!==Ye)&&(Be=!0):(Be=!0,Te.__version=F.version);let _t=Te.currentProgram;Be===!0&&(_t=_n(F,w,D));let Vt=!1,gt=!1,tn=!1;const Je=_t.getUniforms(),vt=Te.uniforms;if(pe.useProgram(_t.program)&&(Vt=!0,gt=!0,tn=!0),F.id!==u&&(u=F.id,gt=!0),Vt||p!==d){pe.buffers.depth.getReversed()&&d.reversedDepth!==!0&&(d._reversedDepth=!0,d.updateProjectionMatrix()),Je.setValue(_,"projectionMatrix",d.projectionMatrix),Je.setValue(_,"viewMatrix",d.matrixWorldInverse);const pt=Je.map.cameraPosition;pt!==void 0&&pt.setValue(_,de.setFromMatrixPosition(d.matrixWorld)),be.logarithmicDepthBuffer&&Je.setValue(_,"logDepthBufFC",2/(Math.log(d.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Je.setValue(_,"isOrthographic",d.isOrthographicCamera===!0),p!==d&&(p=d,gt=!0,tn=!0)}if(D.isSkinnedMesh){Je.setOptional(_,D,"bindMatrix"),Je.setOptional(_,D,"bindMatrixInverse");const ft=D.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),Je.setValue(_,"boneTexture",ft.boneTexture,Ue))}D.isBatchedMesh&&(Je.setOptional(_,D,"batchingTexture"),Je.setValue(_,"batchingTexture",D._matricesTexture,Ue),Je.setOptional(_,D,"batchingIdTexture"),Je.setValue(_,"batchingIdTexture",D._indirectTexture,Ue),Je.setOptional(_,D,"batchingColorTexture"),D._colorsTexture!==null&&Je.setValue(_,"batchingColorTexture",D._colorsTexture,Ue));const Et=O.morphAttributes;if((Et.position!==void 0||Et.normal!==void 0||Et.color!==void 0)&&Q.update(D,O,_t),(gt||Te.receiveShadow!==D.receiveShadow)&&(Te.receiveShadow=D.receiveShadow,Je.setValue(_,"receiveShadow",D.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(vt.envMap.value=le,vt.flipEnvMap.value=le.isCubeTexture&&le.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&w.environment!==null&&(vt.envMapIntensity.value=w.environmentIntensity),gt&&(Je.setValue(_,"toneMappingExposure",g.toneMappingExposure),Te.needsLights&&Ja(vt,tn),j&&F.fog===!0&&K.refreshFogUniforms(vt,j),K.refreshMaterialUniforms(vt,F,V,ne,a.state.transmissionRenderTarget[d.id]),Ln.upload(_,ki(Te),vt,Ue)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Ln.upload(_,ki(Te),vt,Ue),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Je.setValue(_,"center",D.center),Je.setValue(_,"modelViewMatrix",D.modelViewMatrix),Je.setValue(_,"normalMatrix",D.normalMatrix),Je.setValue(_,"modelMatrix",D.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const ft=F.uniformsGroups;for(let pt=0,Xn=ft.length;pt<Xn;pt++){const yt=ft[pt];Le.update(yt,_t),Le.bind(yt,_t)}}return _t}function Ja(d,w){d.ambientLightColor.needsUpdate=w,d.lightProbe.needsUpdate=w,d.directionalLights.needsUpdate=w,d.directionalLightShadows.needsUpdate=w,d.pointLights.needsUpdate=w,d.pointLightShadows.needsUpdate=w,d.spotLights.needsUpdate=w,d.spotLightShadows.needsUpdate=w,d.rectAreaLights.needsUpdate=w,d.hemisphereLights.needsUpdate=w}function eo(d){return d.isMeshLambertMaterial||d.isMeshToonMaterial||d.isMeshPhongMaterial||d.isMeshStandardMaterial||d.isShadowMaterial||d.isShaderMaterial&&d.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(d,w,O){const F=he.get(d);F.__autoAllocateDepthBuffer=d.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),he.get(d.texture).__webglTexture=w,he.get(d.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:O,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(d,w){const O=he.get(d);O.__webglFramebuffer=w,O.__useDefaultFramebuffer=w===void 0};const to=_.createFramebuffer();this.setRenderTarget=function(d,w=0,O=0){I=d,A=w,C=O;let F=!0,D=null,j=!1,ae=!1;if(d){const le=he.get(d);if(le.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(_.FRAMEBUFFER,null),F=!1;else if(le.__webglFramebuffer===void 0)Ue.setupRenderTarget(d);else if(le.__hasExternalTextures)Ue.rebindTextures(d,he.get(d.texture).__webglTexture,he.get(d.depthTexture).__webglTexture);else if(d.depthBuffer){const Me=d.depthTexture;if(le.__boundDepthTexture!==Me){if(Me!==null&&he.has(Me)&&(d.width!==Me.image.width||d.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ue.setupDepthRenderbuffer(d)}}const Ae=d.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ae=!0);const Ce=he.get(d).__webglFramebuffer;d.isWebGLCubeRenderTarget?(Array.isArray(Ce[w])?D=Ce[w][O]:D=Ce[w],j=!0):d.samples>0&&Ue.useMultisampledRTT(d)===!1?D=he.get(d).__webglMultisampledFramebuffer:Array.isArray(Ce)?D=Ce[O]:D=Ce,L.copy(d.viewport),B.copy(d.scissor),X=d.scissorTest}else L.copy(ye).multiplyScalar(V).floor(),B.copy(He).multiplyScalar(V).floor(),X=nt;if(O!==0&&(D=to),pe.bindFramebuffer(_.FRAMEBUFFER,D)&&F&&pe.drawBuffers(d,D),pe.viewport(L),pe.scissor(B),pe.setScissorTest(X),j){const le=he.get(d.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_CUBE_MAP_POSITIVE_X+w,le.__webglTexture,O)}else if(ae){const le=w;for(let Ae=0;Ae<d.textures.length;Ae++){const Ce=he.get(d.textures[Ae]);_.framebufferTextureLayer(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0+Ae,Ce.__webglTexture,O,le)}}else if(d!==null&&O!==0){const le=he.get(d.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,le.__webglTexture,O)}u=-1},this.readRenderTargetPixels=function(d,w,O,F,D,j,ae,fe=0){if(!(d&&d.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let le=he.get(d).__webglFramebuffer;if(d.isWebGLCubeRenderTarget&&ae!==void 0&&(le=le[ae]),le){pe.bindFramebuffer(_.FRAMEBUFFER,le);try{const Ae=d.textures[fe],Ce=Ae.format,Me=Ae.type;if(!be.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!be.textureTypeReadable(Me)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}w>=0&&w<=d.width-F&&O>=0&&O<=d.height-D&&(d.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+fe),_.readPixels(w,O,F,D,ge.convert(Ce),ge.convert(Me),j))}finally{const Ae=I!==null?he.get(I).__webglFramebuffer:null;pe.bindFramebuffer(_.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(d,w,O,F,D,j,ae,fe=0){if(!(d&&d.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let le=he.get(d).__webglFramebuffer;if(d.isWebGLCubeRenderTarget&&ae!==void 0&&(le=le[ae]),le)if(w>=0&&w<=d.width-F&&O>=0&&O<=d.height-D){pe.bindFramebuffer(_.FRAMEBUFFER,le);const Ae=d.textures[fe],Ce=Ae.format,Me=Ae.type;if(!be.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!be.textureTypeReadable(Me))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ne=_.createBuffer();_.bindBuffer(_.PIXEL_PACK_BUFFER,Ne),_.bufferData(_.PIXEL_PACK_BUFFER,j.byteLength,_.STREAM_READ),d.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+fe),_.readPixels(w,O,F,D,ge.convert(Ce),ge.convert(Me),0);const ke=I!==null?he.get(I).__webglFramebuffer:null;pe.bindFramebuffer(_.FRAMEBUFFER,ke);const tt=_.fenceSync(_.SYNC_GPU_COMMANDS_COMPLETE,0);return _.flush(),await oo(_,tt,4),_.bindBuffer(_.PIXEL_PACK_BUFFER,Ne),_.getBufferSubData(_.PIXEL_PACK_BUFFER,0,j),_.deleteBuffer(Ne),_.deleteSync(tt),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(d,w=null,O=0){const F=Math.pow(2,-O),D=Math.floor(d.image.width*F),j=Math.floor(d.image.height*F),ae=w!==null?w.x:0,fe=w!==null?w.y:0;Ue.setTexture2D(d,0),_.copyTexSubImage2D(_.TEXTURE_2D,O,0,0,ae,fe,D,j),pe.unbindTexture()};const no=_.createFramebuffer(),io=_.createFramebuffer();this.copyTextureToTexture=function(d,w,O=null,F=null,D=0,j=null){j===null&&(D!==0?(_i("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=D,D=0):j=0);let ae,fe,le,Ae,Ce,Me,Ne,ke,tt;const qe=d.isCompressedTexture?d.mipmaps[j]:d.image;if(O!==null)ae=O.max.x-O.min.x,fe=O.max.y-O.min.y,le=O.isBox3?O.max.z-O.min.z:1,Ae=O.min.x,Ce=O.min.y,Me=O.isBox3?O.min.z:0;else{const Et=Math.pow(2,-D);ae=Math.floor(qe.width*Et),fe=Math.floor(qe.height*Et),d.isDataArrayTexture?le=qe.depth:d.isData3DTexture?le=Math.floor(qe.depth*Et):le=1,Ae=0,Ce=0,Me=0}F!==null?(Ne=F.x,ke=F.y,tt=F.z):(Ne=0,ke=0,tt=0);const Ye=ge.convert(w.format),Te=ge.convert(w.type);let Qe;w.isData3DTexture?(Ue.setTexture3D(w,0),Qe=_.TEXTURE_3D):w.isDataArrayTexture||w.isCompressedArrayTexture?(Ue.setTexture2DArray(w,0),Qe=_.TEXTURE_2D_ARRAY):(Ue.setTexture2D(w,0),Qe=_.TEXTURE_2D),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,w.flipY),_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),_.pixelStorei(_.UNPACK_ALIGNMENT,w.unpackAlignment);const Be=_.getParameter(_.UNPACK_ROW_LENGTH),_t=_.getParameter(_.UNPACK_IMAGE_HEIGHT),Vt=_.getParameter(_.UNPACK_SKIP_PIXELS),gt=_.getParameter(_.UNPACK_SKIP_ROWS),tn=_.getParameter(_.UNPACK_SKIP_IMAGES);_.pixelStorei(_.UNPACK_ROW_LENGTH,qe.width),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,qe.height),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Ae),_.pixelStorei(_.UNPACK_SKIP_ROWS,Ce),_.pixelStorei(_.UNPACK_SKIP_IMAGES,Me);const Je=d.isDataArrayTexture||d.isData3DTexture,vt=w.isDataArrayTexture||w.isData3DTexture;if(d.isDepthTexture){const Et=he.get(d),ft=he.get(w),pt=he.get(Et.__renderTarget),Xn=he.get(ft.__renderTarget);pe.bindFramebuffer(_.READ_FRAMEBUFFER,pt.__webglFramebuffer),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let yt=0;yt<le;yt++)Je&&(_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,he.get(d).__webglTexture,D,Me+yt),_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,he.get(w).__webglTexture,j,tt+yt)),_.blitFramebuffer(Ae,Ce,ae,fe,Ne,ke,ae,fe,_.DEPTH_BUFFER_BIT,_.NEAREST);pe.bindFramebuffer(_.READ_FRAMEBUFFER,null),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else if(D!==0||d.isRenderTargetTexture||he.has(d)){const Et=he.get(d),ft=he.get(w);pe.bindFramebuffer(_.READ_FRAMEBUFFER,no),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,io);for(let pt=0;pt<le;pt++)Je?_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,Et.__webglTexture,D,Me+pt):_.framebufferTexture2D(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,Et.__webglTexture,D),vt?_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,ft.__webglTexture,j,tt+pt):_.framebufferTexture2D(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,ft.__webglTexture,j),D!==0?_.blitFramebuffer(Ae,Ce,ae,fe,Ne,ke,ae,fe,_.COLOR_BUFFER_BIT,_.NEAREST):vt?_.copyTexSubImage3D(Qe,j,Ne,ke,tt+pt,Ae,Ce,ae,fe):_.copyTexSubImage2D(Qe,j,Ne,ke,Ae,Ce,ae,fe);pe.bindFramebuffer(_.READ_FRAMEBUFFER,null),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else vt?d.isDataTexture||d.isData3DTexture?_.texSubImage3D(Qe,j,Ne,ke,tt,ae,fe,le,Ye,Te,qe.data):w.isCompressedArrayTexture?_.compressedTexSubImage3D(Qe,j,Ne,ke,tt,ae,fe,le,Ye,qe.data):_.texSubImage3D(Qe,j,Ne,ke,tt,ae,fe,le,Ye,Te,qe):d.isDataTexture?_.texSubImage2D(_.TEXTURE_2D,j,Ne,ke,ae,fe,Ye,Te,qe.data):d.isCompressedTexture?_.compressedTexSubImage2D(_.TEXTURE_2D,j,Ne,ke,qe.width,qe.height,Ye,qe.data):_.texSubImage2D(_.TEXTURE_2D,j,Ne,ke,ae,fe,Ye,Te,qe);_.pixelStorei(_.UNPACK_ROW_LENGTH,Be),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,_t),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Vt),_.pixelStorei(_.UNPACK_SKIP_ROWS,gt),_.pixelStorei(_.UNPACK_SKIP_IMAGES,tn),j===0&&w.generateMipmaps&&_.generateMipmap(Qe),pe.unbindTexture()},this.initRenderTarget=function(d){he.get(d).__webglFramebuffer===void 0&&Ue.setupRenderTarget(d)},this.initTexture=function(d){d.isCubeTexture?Ue.setTextureCube(d,0):d.isData3DTexture?Ue.setTexture3D(d,0):d.isDataArrayTexture||d.isCompressedArrayTexture?Ue.setTexture2DArray(d,0):Ue.setTexture2D(d,0),pe.unbindTexture()},this.resetState=function(){A=0,C=0,I=null,pe.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(n),t.unpackColorSpace=rt._getUnpackColorSpace()}}const _u=[{key:"three",label:"Local three",description:"Two scenes in one process. Per-pixel halfspace stencil; no transport."},{key:"iframe",label:"Iframe (frame-RPC)",description:"Destination via postMessage; ships color + packed-RGBA depth bitmaps; host composites."},{key:"worker",label:"Web Worker",description:"Destination in a worker via OffscreenCanvas; no DOM."},{key:"netgl",label:"NetGL (command-stream)",description:"Destination's GL calls cross the wire and execute in the host's WebGL2 context."},{key:"netgl-celestiary",label:"NetGL + celestiary",description:"NetGL carrying celestiary (textured planets, custom shaders, RT post-processing)."},{key:"netgl-cesium",label:"NetGL + Cesium",description:"A Cesium globe composited into a three.js host: through a door, or in place of an Earth sphere."}],gu=`
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
`,vu='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Qr='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Eu=(e,n)=>{const t=e==="three";return n==="three"?t?".":"..":t?`${n}/`:`../${n}/`},Jr=e=>e.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),Su=e=>{if(document.getElementById("portal-nav-toggle"))return;const n=document.createElement("style");n.id="portal-nav-styles",n.textContent=gu,document.head.appendChild(n);const t=document.createElement("aside");t.id="portal-nav-drawer",t.setAttribute("aria-hidden","false"),t.setAttribute("aria-label","Portal demos"),t.innerHTML=`
    <h2>Portal demos</h2>
    <p class="portal-nav-subtitle">Same scenes, different wire.</p>
    <ul>
      ${_u.map(r=>`
        <li${r.key===e?' class="portal-nav-current"':""}>
          <a href="${Eu(e,r.key)}"${r.key===e?' aria-current="page"':""}>
            <span class="portal-nav-label">${Jr(r.label)}</span>
            <span class="portal-nav-desc">${Jr(r.description)}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <p class="portal-nav-repo"><a href="https://github.com/pablo-mayrgundter/portal" target="_blank" rel="noopener">github.com/pablo-mayrgundter/portal</a></p>
  `;const i=document.createElement("button");i.id="portal-nav-toggle",i.type="button",i.setAttribute("aria-label","Close demos menu"),i.setAttribute("aria-expanded","true"),i.setAttribute("aria-controls","portal-nav-drawer"),i.innerHTML=Qr,document.body.appendChild(t),document.body.appendChild(i);const o=r=>{t.setAttribute("aria-hidden",r?"false":"true"),i.setAttribute("aria-expanded",r?"true":"false"),i.setAttribute("aria-label",r?"Close demos menu":"Toggle demos menu"),i.innerHTML=r?Qr:vu};i.addEventListener("click",r=>{r.stopPropagation(),o(t.getAttribute("aria-hidden")!=="false")}),document.addEventListener("click",r=>{t.getAttribute("aria-hidden")==="true"||r.target?.closest("#portal-nav-drawer, #portal-nav-toggle")||o(!1)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&t.getAttribute("aria-hidden")==="false"&&o(!1)})},Mu=(e,n,t={})=>{const i=t.moveSpeed??4,o=t.lookSensitivity??.0025,r=t.lookKeySpeed??1.5;let f=0,c=0;const E=new Set;Tu(n,(C,I)=>{f-=C*o,c-=I*o}),window.addEventListener("keydown",C=>E.add(C.code)),window.addEventListener("keyup",C=>E.delete(C.code)),Au(E);const S=new se,b=new se,m=new se,v=C=>{E.has("KeyQ")&&(f+=r*C),E.has("KeyE")&&(f-=r*C),E.has("KeyR")&&(c-=r*C),E.has("KeyF")&&(c+=r*C),c=xu(c),e.quaternion.setFromEuler(new On(c,f,0,"YXZ")),b.set(0,0,-1).applyQuaternion(e.quaternion),m.set(1,0,0).applyQuaternion(e.quaternion),S.set(0,0,0),E.has("KeyW")&&S.add(b),E.has("KeyS")&&S.sub(b),E.has("KeyD")&&S.add(m),E.has("KeyA")&&S.sub(m),S.y=0,S.lengthSq()>0&&(S.normalize().multiplyScalar(i*C),e.position.add(S))},M=new St,N=new pn,y=new On(0,0,0,"YXZ"),s=new se(0,0,0),a=new se,T=new se(0,1,0);return{update:v,setOrientationFromForward:C=>{a.copy(C).normalize(),M.lookAt(s,a,T),N.setFromRotationMatrix(M),y.setFromQuaternion(N,"YXZ"),c=y.x,f=y.y},clearKeys:()=>{E.clear()},getKeys:()=>Array.from(E),setKeys:C=>{E.clear();for(const I of C)E.add(I)}}},Tu=(e,n)=>{let t=null,i=0,o=0;e.addEventListener("pointerdown",f=>{if(t===null&&(t=f.pointerId,i=f.clientX,o=f.clientY,f.pointerType!=="mouse"))try{e.setPointerCapture(f.pointerId)}catch{}});const r=f=>{f.pointerId===t&&(t=null)};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),window.addEventListener("pointermove",f=>{if(f.pointerId!==t)return;const c=f.clientX-i,E=f.clientY-o;i=f.clientX,o=f.clientY,n(c,E)})},xu=e=>Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e)),Au=e=>{if(typeof window>"u")return;const n="ontouchstart"in window||(navigator.maxTouchPoints??0)>0,t=()=>n||window.innerWidth<500;if(t()){ea(e);return}const i=()=>{t()&&(window.removeEventListener("resize",i),ea(e))};window.addEventListener("resize",i)},ea=e=>{const n=document.createElement("div");n.className="wasd-pad",n.setAttribute("aria-label","Movement and look controls"),n.innerHTML=`
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
  `,document.head.appendChild(t),document.body.appendChild(n);for(const i of n.querySelectorAll(".wasd-btn")){const o=i.dataset.key,r=c=>{c.preventDefault(),c.stopPropagation(),e.add(o),i.classList.add("is-active");try{i.setPointerCapture(c.pointerId)}catch{}},f=c=>{c.stopPropagation(),e.delete(o),i.classList.remove("is-active")};i.addEventListener("pointerdown",r),i.addEventListener("pointerup",f),i.addEventListener("pointercancel",f),i.addEventListener("pointerleave",f),i.addEventListener("contextmenu",c=>c.preventDefault())}},Ci=(e,n)=>[e[0]+n[0],e[1]+n[1],e[2]+n[2]],Ru=(e,n)=>[e[0]-n[0],e[1]-n[1],e[2]-n[2]],yn=(e,n)=>[e[0]*n,e[1]*n,e[2]*n],ai=(e,n)=>e[0]*n[0]+e[1]*n[1]+e[2]*n[2],ta=(e,n)=>[e[1]*n[2]-e[2]*n[1],e[2]*n[0]-e[0]*n[2],e[0]*n[1]-e[1]*n[0]],on=e=>{const n=Math.hypot(e[0],e[1],e[2]);return n>0?[e[0]/n,e[1]/n,e[2]/n]:[0,0,1]},na=e=>{const n=on(e.normal),t=on(e.up),i=on(ta(t,n)),o=on(ta(n,i));return{right:i,up:o,normal:n}},Wa=(e,n)=>[ai(e,n.right),ai(e,n.up),ai(e,n.normal)],Xa=(e,n)=>Ci(Ci(yn(n.right,e[0]),yn(n.up,e[1])),yn(n.normal,e[2])),Ya=e=>[-e[0],e[1],-e[2]],ia=(e,n,t)=>on(Xa(Ya(Wa(e,n)),t)),bu=(e,n)=>{const t=na(n.source),i=na(n.target),o=Ru(e.position,n.source.position),r=Wa(o,t),f=yn(Ya(r),n.scale),c={position:Ci(n.target.position,Xa(f,i))};return e.forward&&(c.forward=ia(e.forward,t,i)),e.up&&(c.up=ia(e.up,t,i)),c};new Li;new se;new dt;new dt;const Cu=(e=new ze(2,3))=>{const n=new hn(e.x,e.y),t=new Ii({visible:!1}),i=new ut(n,t);return i.name="portal-plane",i.userData.portalSize=e.clone(),i},wu=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Pu=`
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
`,Jt=1,Du=(e=Jt)=>{const n={portalPos:{value:new se},portalNormal:{value:new se},portalRight:{value:new se},portalUp:{value:new se},portalHalfW:{value:1},portalHalfH:{value:1.5},hostCameraPos:{value:new se},hostInverseViewProjection:{value:new St},hostViewMatrix:{value:new St},hostProjectionMatrix:{value:new St},destinationBackground:{value:new se(0,0,0)}},t=new Dt({uniforms:n,vertexShader:wu,fragmentShader:Pu,depthTest:!0,depthWrite:!1,side:Tt,stencilWrite:!0,stencilFunc:Oa,stencilRef:e,stencilFail:Ht,stencilZFail:Ht,stencilZPass:Na,stencilWriteMask:255}),i=new ut(new hn(2,2),t);i.frustumCulled=!1;const o=new Fn;o.add(i);const r=new Ia(-1,1,1,-1,0,1),f=new St,c=new se(0,0,1),E=new se(1,0,0),S=new se(0,1,0),b=new pn;return{scene:o,camera:r,update:(v,M,N)=>{const y=v.userData.portalSize;n.portalHalfW.value=y?y.x/2:1,n.portalHalfH.value=y?y.y/2:1.5,v.getWorldPosition(n.portalPos.value),v.getWorldQuaternion(b),n.portalNormal.value.copy(c).applyQuaternion(b),n.portalRight.value.copy(E).applyQuaternion(b),n.portalUp.value.copy(S).applyQuaternion(b),M.getWorldPosition(n.hostCameraPos.value),f.multiplyMatrices(M.projectionMatrix,M.matrixWorldInverse),n.hostInverseViewProjection.value.copy(f).invert(),n.hostViewMatrix.value.copy(M.matrixWorldInverse),n.hostProjectionMatrix.value.copy(M.projectionMatrix),n.destinationBackground.value.set(N.r,N.g,N.b)}}},Ka=(e,n)=>{e.traverse(t=>{const i=t;if(!i.isMesh||!i.material)return;const o=Array.isArray(i.material)?i.material:[i.material];for(const r of o)n(r)})},Lu=(e,n=Jt)=>{Ka(e,t=>{t.stencilWrite=!0,t.stencilFunc=As,t.stencilRef=n,t.stencilFail=Ht,t.stencilZFail=Ht,t.stencilZPass=Ht,t.stencilWriteMask=0})},yu=e=>{Ka(e,n=>{n.stencilWrite=!1})};new se;const oi=new pn,Mn=new se,Tn=new se,xn=new se,Uu=(e,n)=>n||(e.background instanceof Ve?e.background:new Ve(0,0,0)),Iu=e=>{const{scene:n,anchor:t}=e,i=e.portalNormal??new se(0,0,1),o=e.stencilRef??Jt;return{scene:n,anchor:t,getAnchor:()=>{t.getWorldPosition(Mn),t.getWorldQuaternion(oi),Tn.copy(i).applyQuaternion(oi).normalize(),xn.set(0,1,0).applyQuaternion(oi).normalize();const c=t.userData.portalSize;return{position:[Mn.x,Mn.y,Mn.z],normal:[Tn.x,Tn.y,Tn.z],up:[xn.x,xn.y,xn.z],halfWidth:c?c.x/2:void 0,halfHeight:c?c.y/2:void 0}},getBackground:()=>{const c=Uu(n,e.background);return{r:c.r,g:c.g,b:c.b}},tick:e.tick,renderAsSource(c,E){c.render(n,E)},renderAsDestination(c,E){const S=n.background;n.background=null,Lu(n,o),c.render(n,E),yu(n),n.background=S}}},An=2960,Rn=3042,bn=1028,Cn=1029,Nu=1032,Ou=519,Fu=514,Zt=7680,wn=1,ra=0,aa=771,si=32774,oa=()=>({func:Ou,ref:0,valueMask:4294967295,fail:Zt,zfail:Zt,zpass:Zt,writeMask:4294967295}),Bu=(e,n)=>{const t=n.stencil!==void 0,i=n.blend==="premultiplied-over";let o=!1;const r=oa(),f=oa();let c=0,E="unknown",S=-1,b=!1,m=[wn,ra,wn,ra],v=[si,si],M=0,N="unknown",y=-1;const s=C=>C===bn?[r]:C===Cn?[f]:C===Nu?[r,f]:[],a=(C,I)=>{const u=I;switch(C){case"enable":case"disable":if(u[0]!==An)return!1;o=C==="enable";break;case"stencilFunc":for(const p of[r,f])p.func=u[0],p.ref=u[1],p.valueMask=u[2];break;case"stencilFuncSeparate":for(const p of s(u[0]))p.func=u[1],p.ref=u[2],p.valueMask=u[3];break;case"stencilOp":for(const p of[r,f])p.fail=u[0],p.zfail=u[1],p.zpass=u[2];break;case"stencilOpSeparate":for(const p of s(u[0]))p.fail=u[1],p.zfail=u[2],p.zpass=u[3];break;case"stencilMask":r.writeMask=u[0],f.writeMask=u[0];break;case"stencilMaskSeparate":for(const p of s(u[0]))p.writeMask=u[1];break;default:return!1}return c+=1,!0},T=(C,I)=>{const u=I;switch(C){case"enable":case"disable":if(u[0]!==Rn)return!1;b=C==="enable";break;case"blendFunc":m=[u[0],u[1],u[0],u[1]];break;case"blendFuncSeparate":m=[u[0],u[1],u[2],u[3]];break;case"blendEquation":v=[u[0],u[0]];break;case"blendEquationSeparate":v=[u[0],u[1]];break;default:return!1}return M+=1,!0},x=()=>{o?e.enable(An):e.disable(An),e.stencilFuncSeparate(bn,r.func,r.ref,r.valueMask),e.stencilFuncSeparate(Cn,f.func,f.ref,f.valueMask),e.stencilOpSeparate(bn,r.fail,r.zfail,r.zpass),e.stencilOpSeparate(Cn,f.fail,f.zfail,f.zpass),e.stencilMaskSeparate(bn,r.writeMask),e.stencilMaskSeparate(Cn,f.writeMask)},g=()=>{const C=n.stencil;e.enable(An),e.stencilFunc(Fu,C.ref,C.valueMask??255),e.stencilOp(Zt,Zt,Zt),e.stencilMask(0)},P=()=>{b?e.enable(Rn):e.disable(Rn),e.blendFuncSeparate(m[0],m[1],m[2],m[3]),e.blendEquationSeparate(v[0],v[1])},A=()=>{e.enable(Rn),e.blendFuncSeparate(wn,aa,wn,aa),e.blendEquation(si)};return{intercept(C,I){return!!(t&&a(C,I)||i&&T(C,I))},beforeDraw(C){const I=C?"override":"intended";t&&(E!==I||I==="intended"&&S!==c)&&(I==="override"?g():x(),E=I,S=c),i&&(N!==I||I==="intended"&&y!==M)&&(I==="override"?A():P(),N=I,y=M)},invalidate(){E="unknown",N="unknown"}}},Hu={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array},Gu=36160,Vu=36009,li=3089,ku=256,ci=6145,zu=34041,sa=1029,la=36064,Wu=new Set(["drawArrays","drawElements","drawArraysInstanced","drawElementsInstanced","drawRangeElements","clear","clearBufferfv","clearBufferiv","clearBufferuiv","clearBufferfi"]),Xu=(e,n={})=>{const t=new Map;let i=null,o=null,r=null,f=null,c=!1;const E=n.screen?Bu(e,n.screen):null,S=n.screen?.clear==="depth-only",b=s=>{const a=o,T=r;if(i!==null||!a||!T||a[2]===0||a[3]===0||a[0]===T[0]&&a[1]===T[1]&&a[2]===T[2]&&a[3]===T[3])return s;const x=T[2]/a[2],g=T[3]/a[3],P=T[0]+(s[0]-a[0])*x,A=T[1]+(s[1]-a[1])*g,C=T[0]+(s[0]+s[2]-a[0])*x,I=T[1]+(s[1]+s[3]-a[1])*g,u=Math.floor(P),p=Math.floor(A);return[u,p,Math.ceil(C)-u,Math.ceil(I)-p]},m=()=>{if(!f)return;const[s,a,T,x]=b(f);e.scissor(s,a,T,x)},v=s=>{if(s==null)return null;const a=typeof s;if(a==="number"||a==="string"||a==="boolean")return s;if(Array.isArray(s))return s.map(v);if(typeof s!="object")return s;const T=s;if("__netgl_handle"in T){const x=T.__netgl_handle,g=t.get(x);if(g===void 0)throw new Error(`NetGL replay: unknown handle id ${x}`);return g}if("__netgl_typedarray"in T){const x=T.__netgl_typedarray,g=Hu[x];if(!g)throw new Error(`NetGL replay: unknown typed-array ${x}`);return new g(T.buffer,T.offset,T.length)}if("__netgl_arraybuffer"in T)return T.__netgl_arraybuffer;if("__netgl_imagebitmap"in T)return T.__netgl_imagebitmap;if("__netgl_imagedata"in T){const x=T.width,g=T.height,P=T.buffer,A=new Uint8ClampedArray(P);return new ImageData(A,x,g)}throw new Error("NetGL replay: unknown encoded value shape")},M=(s,a)=>{if(s==="clear"){const T=a[0]&ku;return T===0||(E?.beforeDraw(!0),N(()=>e.clear(T))),!0}if(s==="clearBufferfv"&&a[0]===ci)return E?.beforeDraw(!0),N(()=>e.clearBufferfv(ci,a[1],a[2])),!0;if(s==="clearBufferfi"&&a[0]===zu){const T=a[2];return E?.beforeDraw(!0),N(()=>e.clearBufferfv(ci,0,[T])),!0}return!!s.startsWith("clearBuffer")},N=s=>{if(c||!r){s();return}const[a,T,x,g]=r;e.enable(li),e.scissor(a,T,x,g),s(),e.disable(li),m()};return Object.assign(s=>{let a;try{a=s.args.map(v)}catch(P){const A=P instanceof Error?P.message:String(P);throw new Error(`NetGL replay (decoding ${s.name}): ${A}`)}let T=!1;if(s.name==="bindFramebuffer"){const P=a[0];if(P===Gu||P===Vu){const A=a[1];A!==i&&(T=!0),i=A}a[1]===null&&n.screenFramebuffer&&(a=[P,n.screenFramebuffer()])}else n.screenFramebuffer&&(s.name==="drawBuffers"?a=[a[0].map(P=>P===sa?la:P)]:s.name==="readBuffer"&&a[0]===sa&&(a=[la]));if(s.name==="viewport"){const[P,A,C,I]=a;if(o=[P,A,C,I],i===null&&n.remapScreenViewport){const u=n.remapScreenViewport(P,A,C,I);u!==null&&(a=[u[0],u[1],u[2],u[3]])}r=a}else if(s.name==="scissor"){const P=a;f=[P[0],P[1],P[2],P[3]],a=[...b(f)]}else(s.name==="enable"||s.name==="disable")&&a[0]===li&&(c=s.name==="enable");if(E&&E.intercept(s.name,a))return;if(Wu.has(s.name)){const P=i===null;if(P&&S&&M(s.name,a))return;E?.beforeDraw(P)}if(n.__debugTraceViewport&&(s.name==="viewport"||s.name==="scissor"||s.name==="enable"||s.name==="disable"))if(s.name==="enable"||s.name==="disable")a[0]===3089&&n.__debugTraceViewport(`${s.name}(SCISSOR_TEST) drawFb=${i?"RT":"null"}`);else{const[P,A,C,I]=a;n.__debugTraceViewport(`${s.name}(${P},${A},${C}x${I}) drawFb=${i?"RT":"null"}`)}const x=e[s.name];if(typeof x!="function")throw new Error(`NetGL replay: receiver has no method '${s.name}'`);const g=x.apply(e,a);if(s.name==="viewport"&&i===null&&n.remapScreenViewport&&m(),T&&o){const[P,A,C,I]=o,u=i===null&&n.remapScreenViewport?n.remapScreenViewport(P,A,C,I):null,p=u?u[0]:P,L=u?u[1]:A,B=u?u[2]:C,X=u?u[3]:I;e.viewport(p,L,B,X),r=[p,L,B,X],m(),n.__debugTraceViewport&&n.__debugTraceViewport(`post-bind re-issue viewport(${p},${L},${B}x${X}) drawFb=${i?"RT":"null"}`)}s.returnId!==void 0&&g!=null&&typeof g=="object"&&t.set(s.returnId,g)},{invalidate(){E?.invalidate()}})},Yu=e=>typeof e=="object"&&e!==null&&typeof e.name=="string",Ku=e=>typeof e=="object"&&e!==null&&e.type==="netgl:frame-end",qu=new Set(["bufferData","bufferSubData","texImage2D","texSubImage2D","texImage3D","texSubImage3D","compressedTexImage2D","compressedTexSubImage2D","compressedTexImage3D","compressedTexSubImage3D","texStorage2D","texStorage3D","renderbufferStorage","renderbufferStorageMultisample","generateMipmap","shaderSource","compileShader","attachShader","linkProgram"]),$u=e=>{const n=Xu(e.gl,e.replay),t=e.onError??(m=>console.error("[netgl-host] replay error:",m)),i=new Set;let o=null,r=[],f=null,c=null,E=!1,S=e.transport.onMessage(m=>{if(Yu(m)){r.push(m);return}if(Ku(m)){f?f.push(...r):f=r,r=[];return}if(m.type==="netgl:ready"){const M={type:"netgl:ready-ack"};e.transport.post(M),o||(o=m,e.onReady?.(o));return}e.onControl?.(m)});const b=(m,v)=>{n.invalidate();for(let M=0;M<m.length;M+=1){const N=m[M];if(!(v&&(N.returnId!==void 0||qu.has(N.name))))try{n(N)}catch(y){const s=y instanceof Error?y.message:String(y);i.has(s)||(i.add(s),t(y))}}};return{get ready(){return o},get hasFrame(){return c!==null||f!==null},replay:n,drain(){if(f){const m=f;return f=null,c=m,E=!m.some(v=>v.name.startsWith("delete")),b(m,!1),!0}return c&&E?(b(c,!0),!0):!1},stop(){S?.(),S=null}}},Zu=1e3,qa=e=>(n,t,i,o)=>{const r=e(),f=r.guestSize;if(!f)return null;const c=r.canvasSize(),E=c.width/f.width,S=c.height/f.height;return[Math.round(n*E),Math.round(t*S),Math.round(i*E),Math.round(o*S)]},$a=e=>{const n=new mu({antialias:!1,stencil:!0,depth:!0});n.outputColorSpace=Ea,n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),n.autoClear=!1,e.mount.appendChild(n.domElement);const t=Rs({output:e.iframe.contentWindow,inputFilter:e.iframe.contentWindow});let i=0,o=0,r=0;const f=new Set;let c=null;const E=()=>c,S=$u({gl:n.getContext(),transport:t,replay:e.replay(E),onControl:b=>{const m=b;if(m.type==="cesium:rendered"){const v=b;o=v.seq,c.guestSize={width:v.width,height:v.height}}else if(m.type==="cesium:error"){const v=b.message;f.has(v)||(f.add(v),console.error("[cesium guest]",v),e.onStatus(`Cesium error: ${v.split(`
`)[0]}`))}},onError:b=>{console.error("[netgl host] replay error:",b),e.onStatus(`Replay error: ${b instanceof Error?b.message:String(b)}`)}});return c={renderer:n,receiver:S,guestSize:null,canvasSize:()=>{const b=n.getDrawingBufferSize(new ze);return{width:b.x,height:b.y}},tick(b,m){const v=performance.now();if(o<i&&v-r<Zu)return null;i+=1,r=v;const M={type:"cesium:tick",seq:i,time:b,view:m};return t.post(M),i},lag:()=>i-o},c},ju=4e6,Qu=-60,Ju=20,di=16e6,ep=e=>{const n=$a({...e,replay:A=>({remapScreenViewport:qa(A),screen:{stencil:{ref:Jt},clear:"depth-only"}})}),{renderer:t,receiver:i}=n,o=new qt(70,window.innerWidth/window.innerHeight,.02,200);o.position.set(0,1.6,5.5);const r=new Fn;r.background=new Ve("#101826"),r.add(new bs(12176639,2241348,1));const f=new Fa(16777215,.65);f.position.set(3,6,2),r.add(f);const c=new ut(new hn(18,18),new Bn({color:"#1b2a3f",roughness:.95,metalness:.03}));c.rotation.x=-Math.PI/2,r.add(c);const E=new Ui(.9,.9,.9),S=new Bn({color:"#5da9ff",roughness:.35});for(let A=0;A<14;A+=1){const C=new ut(E,S);C.position.set(Math.sin(A*.5)*4,.45,-3-A*.65),r.add(C)}const b=Cu(new ze(2.6,3.2));b.position.set(0,1.6,-3.5),r.add(b);const m=Iu({scene:r,anchor:b}),v=Du(),M=new Ve("#000000"),N=tp(),y=Mu(o,t.domElement);window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix()});const s=new se,a=new se,T=new se,x=()=>{o.updateMatrixWorld(),o.getWorldPosition(s),o.getWorldDirection(a),T.set(0,1,0).applyQuaternion(o.quaternion);const A=bu({position:[s.x,s.y,s.z],forward:[a.x,a.y,a.z],up:[T.x,T.y,T.z]},{source:m.getAnchor(),target:N,scale:ju});return{position:A.position,direction:A.forward,up:A.up,fovy:Pt.degToRad(o.fov)}},g=new Ba;n.tick(0,x());const P=()=>{t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,o),i.ready&&(v.update(b,o,M),t.render(v.scene,v.camera),t.clearDepth(),i.drain(),t.resetState()),y.update(g.getDelta()),n.tick(g.elapsedTime,x()),requestAnimationFrame(P)};P()},tp=()=>{const e=Pt.degToRad(Qu),n=Pt.degToRad(Ju),t=new se(Math.cos(n)*Math.cos(e),Math.cos(n)*Math.sin(e),Math.sin(n)),i=new se(0,0,1).addScaledVector(t,-t.z).normalize();return{position:[t.x*di,t.y*di,t.z*di],normal:[-t.x,-t.y,-t.z],up:[i.x,i.y,i.z]}},ca={type:"change"},Oi={type:"start"},Za={type:"end"},Pn=new ws,da=new Li,np=Math.cos(70*Pt.DEG2RAD),at=new se,ht=2*Math.PI,We={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},fi=1e-6;class ip extends Cs{constructor(n,t=null){super(n,t),this.state=We.NONE,this.target=new se,this.cursor=new se,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$t.ROTATE,MIDDLE:$t.DOLLY,RIGHT:$t.PAN},this.touches={ONE:Yt.ROTATE,TWO:Yt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new se,this._lastQuaternion=new pn,this._lastTargetPosition=new se,this._quat=new pn().setFromUnitVectors(n.up,new se(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new br,this._sphericalDelta=new br,this._scale=1,this._panOffset=new se,this._rotateStart=new ze,this._rotateEnd=new ze,this._rotateDelta=new ze,this._panStart=new ze,this._panEnd=new ze,this._panDelta=new ze,this._dollyStart=new ze,this._dollyEnd=new ze,this._dollyDelta=new ze,this._dollyDirection=new se,this._mouse=new ze,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ap.bind(this),this._onPointerDown=rp.bind(this),this._onPointerUp=op.bind(this),this._onContextMenu=pp.bind(this),this._onMouseWheel=cp.bind(this),this._onKeyDown=dp.bind(this),this._onTouchStart=fp.bind(this),this._onTouchMove=up.bind(this),this._onMouseDown=sp.bind(this),this._onMouseMove=lp.bind(this),this._interceptControlDown=hp.bind(this),this._interceptControlUp=mp.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ca),this.update(),this.state=We.NONE}update(n=null){const t=this.object.position;at.copy(t).sub(this.target),at.applyQuaternion(this._quat),this._spherical.setFromVector3(at),this.autoRotate&&this.state===We.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(i)&&isFinite(o)&&(i<-Math.PI?i+=ht:i>Math.PI&&(i-=ht),o<-Math.PI?o+=ht:o>Math.PI&&(o-=ht),i<=o?this._spherical.theta=Math.max(i,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+o)/2?Math.max(i,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=f!=this._spherical.radius}if(at.setFromSpherical(this._spherical),at.applyQuaternion(this._quatInverse),t.copy(this.target).add(at),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const c=at.length();f=this._clampDistance(c*this._scale);const E=c-f;this.object.position.addScaledVector(this._dollyDirection,E),this.object.updateMatrixWorld(),r=!!E}else if(this.object.isOrthographicCamera){const c=new se(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const E=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=E!==this.object.zoom;const S=new se(this._mouse.x,this._mouse.y,0);S.unproject(this.object),this.object.position.sub(S).add(c),this.object.updateMatrixWorld(),f=at.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Pn.origin.copy(this.object.position),Pn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Pn.direction))<np?this.object.lookAt(this.target):(da.setFromNormalAndCoplanarPoint(this.object.up,this.target),Pn.intersectPlane(da,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>fi||8*(1-this._lastQuaternion.dot(this.object.quaternion))>fi||this._lastTargetPosition.distanceToSquared(this.target)>fi?(this.dispatchEvent(ca),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?ht/60*this.autoRotateSpeed*n:ht/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){at.setFromMatrixColumn(t,0),at.multiplyScalar(-n),this._panOffset.add(at)}_panUp(n,t){this.screenSpacePanning===!0?at.setFromMatrixColumn(t,1):(at.setFromMatrixColumn(t,0),at.crossVectors(this.object.up,at)),at.multiplyScalar(n),this._panOffset.add(at)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;at.copy(o).sub(this.target);let r=at.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),o=n-i.left,r=t-i.top,f=i.width,c=i.height;this._mouse.x=o/f*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),o=.5*(n.pageY+t.y);this._rotateStart.set(i,o)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),o=.5*(n.pageY+t.y);this._panStart.set(i,o)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,o=n.pageY-t.y,r=Math.sqrt(i*i+o*o);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),o=.5*(n.pageX+i.x),r=.5*(n.pageY+i.y);this._rotateEnd.set(o,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),o=.5*(n.pageY+t.y);this._panEnd.set(i,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,o=n.pageY-t.y,r=Math.sqrt(i*i+o*o);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(n.pageX+t.x)*.5,c=(n.pageY+t.y)*.5;this._updateZoomParameters(f,c)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new ze,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function rp(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function ap(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function op(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Za),this.state=We.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function sp(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case $t.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=We.DOLLY;break;case $t.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=We.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=We.ROTATE}break;case $t.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=We.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=We.PAN}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(Oi)}function lp(e){switch(this.state){case We.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case We.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case We.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function cp(e){this.enabled===!1||this.enableZoom===!1||this.state!==We.NONE||(e.preventDefault(),this.dispatchEvent(Oi),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Za))}function dp(e){this.enabled!==!1&&this._handleKeyDown(e)}function fp(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Yt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=We.TOUCH_ROTATE;break;case Yt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=We.TOUCH_PAN;break;default:this.state=We.NONE}break;case 2:switch(this.touches.TWO){case Yt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=We.TOUCH_DOLLY_PAN;break;case Yt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=We.TOUCH_DOLLY_ROTATE;break;default:this.state=We.NONE}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(Oi)}function up(e){switch(this._trackPointer(e),this.state){case We.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case We.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case We.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case We.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=We.NONE}}function pp(e){this.enabled!==!1&&e.preventDefault()}function hp(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function mp(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Fi=1e6,zt=6378137/Fi,fa=6356752314245e-6/Fi,ui=1.025,_p=.05,gp=e=>{const n=$a({...e,replay:I=>({remapScreenViewport:qa(I),screen:{stencil:{ref:Jt},blend:"premultiplied-over",clear:"depth-only"}})}),{renderer:t,receiver:i}=n,o=new qt(40,window.innerWidth/window.innerHeight,.01,2e4);o.position.set(6,2.5,26);const r=new Fn;r.background=new Ve("#000000");const f=new se(1,.25,.6).normalize(),c=new Fa(16777215,2.2);c.position.copy(f).multiplyScalar(100),r.add(c),r.add(new Ps(2241348,.25)),r.add(Ep());const E=new Qn;E.rotation.z=Pt.degToRad(23.4),r.add(E);const S=new Qn;E.add(S);const b=new Cr(1,128,96),m=new ut(b,new Bn({color:"#1d4f91",roughness:.8}));m.scale.set(zt,fa,zt),S.add(m);const v=new Fn,M=new ut(b,new Ii({side:Tt,colorWrite:!1,depthWrite:!1,depthTest:!0,stencilWrite:!0,stencilRef:Jt,stencilFunc:Oa,stencilZPass:Na,stencilFail:Ht,stencilZFail:Ht}));v.add(M);const N=new Qn;N.rotation.x=Pt.degToRad(-8),r.add(N);const y=new ut(new Cr(1.737,64,48),new Bn({color:"#b8b4ac",roughness:.95}));N.add(y);const s=new ip(o,t.domElement);s.enableDamping=!0,s.minDistance=zt*1.02,s.maxDistance=400,s.zoomSpeed=.6,s.rotateSpeed=.5;const a=()=>{const I=o.position.length()-zt;s.rotateSpeed=Pt.clamp(I/20,.02,.5)};window.addEventListener("resize",()=>{t.setSize(window.innerWidth,window.innerHeight),o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix()});const T=new Ba;let x=e.startTime??0;const g=()=>{S.rotation.y=x*_p;const I=x*.12;y.position.set(Math.cos(I)*16,0,Math.sin(I)*16),r.updateMatrixWorld(),M.matrixAutoUpdate=!1,M.matrix.copy(S.matrixWorld).multiply(new St().makeScale(zt*ui,fa*ui,zt*ui)),M.matrixWorldNeedsUpdate=!0};let P=0;const A=()=>(o.updateMatrixWorld(),n.tick(x,vp(o,S)));g(),A();const C=()=>{const I=i.hasFrame;m.visible=!I,t.resetState(),t.setRenderTarget(null),t.clear(!0,!0,!0),t.render(r,o),I&&(t.render(v,o),t.clearDepth(),i.drain(),t.resetState());const u=Math.min(T.getDelta(),.1);e.paused||(x+=u),a(),s.update(u),g(),A()===null?P+=1:P=0,e.onLag(P),requestAnimationFrame(C)};C()},pi=new St,ua=new se,pa=new se,ha=new se,hi=new Fe,mi=(e,n)=>[e.x*n,-e.z*n,e.y*n],vp=(e,n)=>(pi.copy(n.matrixWorld).invert(),hi.setFromMatrix4(pi),ua.setFromMatrixPosition(e.matrixWorld).applyMatrix4(pi),e.getWorldDirection(pa).applyMatrix3(hi).normalize(),ha.set(0,1,0).applyQuaternion(e.quaternion).applyMatrix3(hi).normalize(),{position:mi(ua,Fi),direction:mi(pa,1),up:mi(ha,1),fovy:Pt.degToRad(e.fov)}),Ep=()=>{const n=new Float32Array(12e3),t=new se;let i=7;const o=()=>(i=i*16807%2147483647,i/2147483647);for(let f=0;f<4e3;f+=1)t.set(o()*2-1,o()*2-1,o()*2-1).normalize().multiplyScalar(5e3),n.set([t.x,t.y,t.z],f*3);const r=new yi;return r.setAttribute("position",new ln(n,3)),new Ds(r,new Ls({color:16777215,size:1.6,sizeAttenuation:!1}))};Su("netgl-cesium");const zn=ys(location.search),wi=new URLSearchParams(location.search),ma=document.querySelector("#app"),Pi=document.querySelector("#guest"),_a=document.querySelector("#status"),Sp=document.querySelector("#lag"),ja=new URLSearchParams({mode:zn}),ga=wi.get("imagery");ga&&ja.set("imagery",ga);Pi.src=`cesium.html?${ja}`;document.querySelectorAll("a[data-mode]").forEach(e=>{const n=new URLSearchParams(location.search);n.set("mode",e.dataset.mode),e.href=`?${n}`,e.dataset.mode===zn&&e.classList.add("current")});document.querySelector(`[data-help="${zn}"]`).hidden=!1;const va=e=>{_a.textContent=e,_a.hidden=!1};zn==="earth"?gp({iframe:Pi,mount:ma,onStatus:va,startTime:Number(wi.get("time")??0),paused:wi.has("pause"),onLag:e=>{Sp.textContent=String(Math.max(0,e))}}):ep({iframe:Pi,mount:ma,onStatus:va});
