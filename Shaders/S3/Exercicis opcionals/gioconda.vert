#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

void main() {
  vec3 N = normalize(normalMatrix * normal);
  frontColor = vec4(color, 1.0) * N.z;
  vec2 st_ull = vec2(0.393, 0.652);
  vec2 st_boca = vec2(0.45, 0.48);
  vtexCoord = texCoord;
  gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
