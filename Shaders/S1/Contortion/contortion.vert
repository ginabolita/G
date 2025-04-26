#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform float time;

void main() {
  vec3 N = normalize(normalMatrix * normal);
  frontColor = vec4(color, 1.0) * N.z;
  vtexCoord = texCoord;
  float angle = 0.;
  if (vertex.y > 0.5) {
    angle = (vertex.y - 0.5) * sin(time);
  }
  mat4 matTransY2 = mat4(vec4(1, 0, 0, 0), vec4(0, 1, 0, 0), vec4(0, 0, 1, 0),
                         vec4(0, 1, 0, 1));
  mat4 matTransY1 = mat4(vec4(1, 0, 0, 0), vec4(0, 1, 0, 0), vec4(0, 0, 1, 0),
                         vec4(0, -1, 0, 1));
  mat4 matRotX = mat4(vec4(1, 0, 0, 0), vec4(0, cos(angle), sin(angle), 0),
                      vec4(0, -sin(angle), cos(angle), 0), vec4(0, 0, 0, 1));

  vec4 nouvertex = matTransY2 * matRotX * matTransY1 * vec4(vertex, 1.0);
  gl_Position = modelViewProjectionMatrix * nouvertex;
}
