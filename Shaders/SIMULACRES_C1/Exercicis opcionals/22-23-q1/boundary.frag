#version 330 core
in vec2 vtexCoord;
in vec3 P;
in vec3 N;
in vec4 frontColor;
out vec4 fragColor;
uniform float edge0 = 0.35;
uniform float edge1 = 0.4;

void main() {
  vec3 Nnorm = normalize(N);
  vec3 V = -normalize(P);
  float c = dot(N, V);
  vec4 color;
  if (c < edge0)
    color = vec4(0.);
  else if (c > edge1)
    color = vec4(1.);
  else
    color = vec4(smoothstep(edge0, edge1, c));

  fragColor = color;
}
