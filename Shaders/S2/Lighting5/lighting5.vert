#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

out vec3 Ne;
out vec3 Ve;
out vec3 Le;

out vec3 Nw;
out vec3 Vw;
out vec3 Lw;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrixInverse;
uniform mat4 modelViewMatrix;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform bool world; // si false -> eye space
                    // si true -> world space
uniform vec4 lightPosition;
uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;


uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;
void main() {
  Ne = normalMatrix*normal;

  vec3 P = (modelViewMatrix*vec4(vertex, 1.0)).xyz;
  Ve = -P;
  Le = lightPosition.xyz - P;

  Nw = normal;
  Vw = (modelViewMatrixInverse * vec4(0, 0, 0, 1)).xyz - vertex.xyz;
  Lw = (modelViewMatrixInverse * lightPosition).xyz - vertex.xyz;
  
  gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
