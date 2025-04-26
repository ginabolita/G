#version 330 core
layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform int test = 0;
uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
uniform vec2 mousePosition;
uniform float radius = 300;
uniform vec2 viewport;

vec2 getMousePositionWindowSpace() {
  if (test == 0) return mousePosition;
  if (test == 1) return vec2(400, 520);
  if (test == 2) return vec2(600, 225);
  if (test == 3) return vec2(200, 375);
  return vec2(400, 300);
}

float smoothInterpolation(float d, float radius) {
  float norm_d = d / radius;
  float upper_thr = 0.05;
  float lower_thr = 0.80;
  float t = 1.0 - smoothstep(0.80, 0.05, norm_d);
  return t;
}

void main() {
  vec3 N = normalize(normalMatrix * normal);
  vtexCoord = texCoord;

  vec4 P = modelViewMatrix * vec4(vertex, 1.0);
  float despl = 0.03 * length(boundingBoxMax - boundingBoxMin);
  vec4 Pprima = P + vec4(N * despl, 0.0);

  vec2 mousePos = getMousePositionWindowSpace();

  vec4 Pcs = projectionMatrix * P;

  vec3 Pndc = Pcs.xyz / Pcs.w;

  vec2 Pws = (Pndc.xy * 0.5 + 0.5) * viewport;
  float d = length(mousePos - Pws);
  float t = smoothInterpolation(d, radius);

  frontColor = N.z * mix(vec4(1, 0, 0, 1), vec4(1, 1, 1, 1), t);
  gl_Position = projectionMatrix * mix(Pprima, P, t);
}