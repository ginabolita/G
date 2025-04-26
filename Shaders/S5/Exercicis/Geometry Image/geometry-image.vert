#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
uniform sampler2D positionMap;
uniform sampler2D normalMap1;
uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;

uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;
uniform int mode = 3;
float Min = 0.004;
float Max = 0.996;

vec4 Phong(vec3 N, vec3 V, vec3 L, bool mode, vec3 P) {
  // N = normalize(N);
  V = normalize(V);
  L = normalize(L);
  float NdotL = max(0, dot(N, L));
  vec3 R = normalize(2 * NdotL * N - L);
  float RdotV = max(0, dot(R, V));
  float ldiff = NdotL;
  float lspec = (NdotL > 0.0) ? pow(RdotV, matShininess) : 0.0;
  vec4 mD = vec4(0.);
  if (!mode)
    mD = matDiffuse;
  else
    mD = vec4(P, 0.0);

  return matAmbient * lightAmbient + mD * lightDiffuse * ldiff +
         matSpecular * lightSpecular * lspec;
}


void main() {
  vec2 st = (vertex.xy + 1.0) * 0.496 + 0.004;  //[0.04, 0.996]
  vec4 mostra1 = texture(positionMap, st);
  vec4 mostra2 = texture(normalMap1, st);
  vec3 P = mostra1.rgb;
  vec3 N = mostra2.rgb;
  vec3 scaleN = N * 2.0 - 1.0;  //[-1, 1]
  if (mode == 0)
    frontColor = vec4(P, 1.0);
  else {
    vec3 N2 = normalize(normalMatrix * scaleN);
    vec3 P2 = (modelViewMatrix * vec4(P, 1)).xyz;
    vec3 V = -P2;
    vec3 L = (lightPosition.xyz - P2);
    if (mode == 1)
      frontColor = vec4(P, 1.0) * N2.z;
    else if (mode == 2)
      frontColor = Phong(N2, V, L, false, P);
    else
      frontColor = Phong(N2, V, L, true, P);
  }
  gl_Position = modelViewProjectionMatrix * vec4(P, 1.0);
}
