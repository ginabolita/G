#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 ProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;

uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

vec4 Phong(vec4 N, vec4 L, vec4 R, vec4 V) {
  vec4 Ambient = matAmbient * lightAmbient;
  float NdotL = max(0., dot(N, L));
  vec4 Diff = matDiffuse * lightDiffuse * NdotL;
  float RdotV = max(0., dot(R, V));
  vec4 Spec = vec4(0.);
  if (NdotL >= 0) Spec = matSpecular * lightSpecular * pow(RdotV, matShininess);
  return Ambient + Diff + Spec;
}

void main() {
  // pos vertex respecte la camara
  vec4 V = normalize(vec4(0, 0, 0, 1) - modelViewMatrix * vec4(vertex, 1.0));
  vec4 L = normalize(lightPosition - modelViewMatrix * vec4(vertex, 1.0));
  vec4 N = normalize(vec4(normalMatrix * normal, 0.));
  vec4 R = 2 * dot(N, L) * N - L;
  vec4 noucolor = Phong(N, L, R, V);
  frontColor = noucolor;
  vtexCoord = texCoord;
  gl_Position = modelViewProjectionMatrix * vec4(vertex, 1);
}
