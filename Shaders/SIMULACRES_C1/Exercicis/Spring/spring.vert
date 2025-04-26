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
vec3 vvertex;
void main() {
  float t = mod(time, 3.5);
  if (t < 0.5) {  // fase1
    float t2 = pow(t / 0.5, 3);
    vvertex = mix(vec3(0., 0., 0.), vertex, t2);
  } else {  // fase2
    float t2 = (t - 0.5) / (3.5 - 0.5);
    vvertex = mix(vertex, vec3(0., 0., 0.), t2);
  }
  vec3 N = normalize(normalMatrix * normal);
  frontColor = vec4(abs(N.z));
  gl_Position = modelViewProjectionMatrix * vec4(vvertex, 1.0);
}
