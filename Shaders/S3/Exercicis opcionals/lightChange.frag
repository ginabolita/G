#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
in vec3 vposition;
in vec3 vnormal;
uniform sampler2D colorMap;
uniform float time;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;

uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

// uniform vec4 lightSpecular;
// uniform vec4 lightPosition;
// uniform vec4 matSpecular;
// uniform float matShininess;
vec4 light1 = vec4(0., 0., 0., 1.);
vec4 light2 = vec4(0.8, 0.8, 0.8, 1.0);

vec4 Phong(vec3 N, vec3 V, vec3 L) {
  N = normalize(N);
  V = normalize(V);
  L = normalize(L);

  // diffuse
  float NdotL = max(0, dot(N, L));
  vec3 R = normalize(2 * NdotL * N - L);
  float t = fract(time/2);
  vec4 lightDiffuse = mix(light1, light2, t);
  vec4 Diff = lightDiffuse * NdotL;
  // specular
  float RdotV = max(0., dot(R, V));
  float lspec = (NdotL > 0.0) ? pow(RdotV, matShininess) : 0.0;
  return Diff + matSpecular * lightSpecular * lspec;
}


void main() {
  vec3 V = -normalize(vposition);
  vec3 L = normalize(lightPosition.xyz - vposition);
  vec4 lighting = Phong(vnormal,V, L);
  fragColor = lighting * texture(colorMap, vtexCoord);
  // fragColor = T;
}
