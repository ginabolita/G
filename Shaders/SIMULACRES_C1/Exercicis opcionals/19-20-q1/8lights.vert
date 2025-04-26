#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec3 vN;
out vec3 vV;
out vec3 vP;
uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrixInverse;
uniform mat3 normalMatrix;

void main() {
  vN = normalize(normalMatrix * normal);
  vP = vertex;
  vV= (modelViewMatrixInverse * vec4(0., 0., 0., 1.)).xyz - vertex;
  frontColor = vec4(color, 1.0);
  vtexCoord = texCoord;
  gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
