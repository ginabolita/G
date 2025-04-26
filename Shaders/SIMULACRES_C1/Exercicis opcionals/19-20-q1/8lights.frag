#version 330 core

in vec4 frontColor;
out vec4 fragColor;
uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
in vec2 vtexCoord;
in vec3 vN;
in vec3 vP;
in vec3 vV;
uniform mat4 modelMatrix;
uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition;
uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

vec4 Phong(vec3 N, vec3 L, vec3 V) {
  L = normalize(L);

  float NdotL = max(0., dot(N, L));
  vec4 Diff = matDiffuse * lightDiffuse * NdotL / 2.0;

  vec3 R = normalize(2 * dot(N, L) * N - L);
  float RdotV = max(0., dot(R, V));
  float lspec = (NdotL > 0.0) ? pow(RdotV, matShininess) : 0.0;
  vec4 Spec = matSpecular * lightSpecular * lspec;

  return Diff + Spec;
}

void main() {
  vec3 N = normalize(vN);
  vec3 V = normalize(vP);

  vec3 l1 = vec3(boundingBoxMin);
  vec3 l8 = vec3(boundingBoxMax);
  vec3 l2 = vec3(l1.x, l1.y, l8.z);
  vec3 l3 = vec3(l1.x, l8.y, l1.z);
  vec3 l4 = vec3(l1.x, l8.y, l8.z);
  vec3 l5 = vec3(l8.x, l1.y, l1.z);
  vec3 l6 = vec3(l8.x, l1.y, l8.z);
  vec3 l7 = vec3(l8.x, l8.y, l1.z);

  vec3 L1 = l1.xyz - vP;
  vec3 L2 = l2.xyz - vP;
  vec3 L3 = l3.xyz - vP;
  vec3 L4 = l4.xyz - vP;
  vec3 L5 = l5.xyz - vP;
  vec3 L6 = l6.xyz - vP;
  vec3 L7 = l7.xyz - vP;
  vec3 L8 = l8.xyz - vP;

  vec4 light = Phong(N, L1, V);
  light += Phong(N, L2, V);
  light += Phong(N, L3, V);
  light += Phong(N, L4, V);
  light += Phong(N, L5, V);
  light += Phong(N, L6, V);
  light += Phong(N, L7, V);
  light += Phong(N, L8, V);

  fragColor = light;
}
