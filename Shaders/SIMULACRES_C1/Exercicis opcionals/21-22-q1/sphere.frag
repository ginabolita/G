#version 330 core
in vec2 vtexCoord;

in vec4 frontColor;
out vec4 fragColor;

uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
vec3 P, N;
uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;

uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;
uniform int mode = 2;

vec4 Phong(vec3 N, vec3 L, vec3 V) {
  N = normalize(N);
  V = normalize(V);
  L = normalize(L);
  vec4 Ambient = matAmbient * lightAmbient;

  float NdotL = max(0., dot(N, L));
  vec4 Diff = matDiffuse * lightDiffuse * NdotL;

  vec3 R = normalize(2 * dot(N, L) * N - L);
  float RdotV = max(0., dot(R, V));
  float lspec = (NdotL > 0.0) ? pow(RdotV, matShininess) : 0.0;
  vec4 Spec = matSpecular * lightSpecular * lspec;
  return Ambient + Diff + Spec;
}

void main() {
  // mode == 0
  float dist = length(vtexCoord - vec2(0., 0.));
  float esfera0 = 1 - step(1, dist);
  if (esfera0 == 1.) {
    fragColor = vec4(0.);
    if (mode == 1) {
      P = vec3(vtexCoord.s, vtexCoord.t,
               sqrt(1 - pow(vtexCoord.s, 2) - pow(vtexCoord.t, 2)));
      N = P;
      fragColor = vec4(P.z);
    }
    if (mode == 2) {
        P = (modelViewMatrix * vec4(P, 1.0)).xyz;
        N = normalMatrix*N;
        vec3 V = -P;
        vec3 L = lightPosition.xyz - P;
        fragColor = Phong(N, V, L);
    }
  } else
    discard;
}
