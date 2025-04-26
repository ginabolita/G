#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec4 P;
out vec4 N;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

void main() {
  vtexCoord = texCoord;

  float angle = radians(90.);  // 30 degrees → radians
  float c = cos(angle);
  float s = sin(angle);
  mat4 rotateX = mat4(1.0, 0.0, 0.0, 0.0, 0.0, c, s, 0.0, 0.0, -s, c, 0.0, 0.0,
                      0.0, 0.0, 1.0);
  mat3 rotateX2 = mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);

  P = modelViewMatrix * rotateX * vec4(vertex, 1.0);
  N = vec4(normalMatrix * rotateX2 * normal, 0.);

  gl_Position = modelViewProjectionMatrix * rotateX * vec4(vertex, 1.0);
}
