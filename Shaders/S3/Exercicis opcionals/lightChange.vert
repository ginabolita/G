#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec3 vposition;
out vec3 vnormal;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
uniform float time;
uniform vec3 boundingBoxMin; 
uniform vec3 boundingBoxMax;

void main() {
  vnormal = normalize(normalMatrix * normal);
  vec4 viewPosition = modelViewMatrix * vec4(vertex, 1.0);
  vposition = viewPosition.xyz;
  frontColor = vec4(color, 1.0);
  int frame = (int(time) / 2);  // dividir entre 2

  vec3 normalizedPos =
      (vertex - boundingBoxMin) / (boundingBoxMax - boundingBoxMin);

  // Map normalized position to texture coordinates
  float t = normalizedPos.y * (1.0 / 3.0) - (frame % 3) * (1.0 / 3.0);
  float s = normalizedPos.x * (1.0 / 4.0) + (frame - 1) / 3 * (1.0 / 4.0);
  vtexCoord = vec2(s, t);
  gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
