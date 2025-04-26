#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 vnormal;
in vec3 vposition;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;

uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

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
  vec3 L = normalize(lightPosition.xyz - vposition);
  vec3 V = -normalize(vposition);
  vec4 iluminacio = Phong(vnormal, L, V);
  fragColor = frontColor*iluminacio;
}
