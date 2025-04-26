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
  float factor = 0.5 + abs(sin(time));
  mat4 scaleMatrix = mat4(factor, 0.0, 0.0, 0.0, 0.0, factor, 0.0, 0.0, 0.0, 0.0, 1,
                          0.0, 0.0, 0.0, 0.0, 1.0);

  vec4 Vclip = modelViewProjectionMatrix * vec4(vertex, 1.0);
  vec3 ndc = Vclip.xyz / Vclip.w;

  vec3 nouvertex = (scaleMatrix * vec4(ndc, 1.0)).xyz;

  gl_Position = vec4(nouvertex, 1.0);
}
