#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor;
uniform float smoothness = 25.0;
uniform mat3 normalMatrix;

uniform sampler2D heightMap;
float epsilon = 1.0 / 128;
void main() {
  float h = texture(heightMap, vtexCoord).r;

  float dhds = texture(heightMap, vtexCoord + vec2(epsilon, 0.0)).r - h;
  float dhdt = texture(heightMap, vtexCoord + vec2(0.0, epsilon)).r - h;

  vec2 G = vec2(dhds / epsilon, dhdt / epsilon);

  vec3 normal = normalize(vec3(-G.x, -G.y, smoothness));
  vec3 N = normalMatrix * normal;
  fragColor = vec4(N.z);
}
