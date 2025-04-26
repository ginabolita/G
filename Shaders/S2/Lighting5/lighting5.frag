#version 330 core

in vec4 frontColor;
out vec4 fragColor;

out vec3 Ne;
out vec3 Ve;
out vec3 Le;

out vec3 Nw;
out vec3 Vw;
out vec3 Lw;

uniform bool world;
uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;

uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

vec4 light(vec3 N, vec3 V, vec3 L) {
  N = normalize(N);
  V = normalize(V);
  L = normalize(L);
  vec3 R = normalize(2 * dot(N, L) * N - L);
  float NdotL = max(0., dot(N, L));
  float RdotV = max(0., dot(R, V));
  float ldiff = NdotL;
  float lspec = 0;
  if (NdotL > 0) lspec = pow(RdotV, matShininess);
  return matAmbient * lightAmbient + matDiffuse * lightDiffuse * ldiff +
         matSpecular * lightSpecular * lspec;
}

void main() {
  if (world) {
    fragColor = light(Nw, Vw, Lw);
  } else {
    fragColor = light(Ne, Ve, Le);
  }
}
