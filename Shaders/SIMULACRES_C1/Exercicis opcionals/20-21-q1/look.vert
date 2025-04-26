#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform vec2 mousePosition;
uniform float mouseOverrideX = -1;
uniform vec2 viewport = vec2(800, 600);  // width & height

void main() {
  float x;
  if (mouseOverrideX < 0)
    x = mousePosition.x;
  else
    x = mouseOverrideX;

  float alfa = (x * 2. / viewport.x) - 1.0;  //[-1, 1]
  if (vertex.y < 1.45 ) alfa = 0.;
  float c = cos(alfa);
  float s = sin(alfa);
  mat3 rotateY = mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
  vec3 P = vertex;
  vec3 Pprima = rotateY * P;
  float t = smoothstep(1.40, 1.55, vertex.y);
  vec3 nouvertex = mix(P, Pprima, t);

  vec3 N = normal;
  vec3 Nprima = rotateY * N;
  vec3 novanormal = mix(N, Nprima, t);
  novanormal = normalize(normalMatrix * novanormal);
  frontColor = vec4(novanormal.z);
  vtexCoord = texCoord;
  gl_Position = modelViewProjectionMatrix * vec4(nouvertex, 1.0);
}
