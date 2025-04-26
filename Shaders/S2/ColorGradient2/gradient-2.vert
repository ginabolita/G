#version 330 core

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 color;
layout(location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
vec4 red = vec4(1, 0, 0, 1);
vec4 yellow = vec4(1, 1, 0, 1);
vec4 green = vec4(0, 1, 0, 1);
vec4 cyan = vec4(0, 1, 1, 1);
vec4 blue = vec4(0, 0, 1, 1);

void main() {
  gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);

  float ndc_y = gl_Position.y / gl_Position.w;  // Now in [-1, 1] range
  float normalized_y = (ndc_y + 1.0) / 2.0;     // Convert to [0, 1] range

  // Scale to [0,4] for 4 color segments
  float y = 4.0 * normalized_y;
  if (y <= 0)
    frontColor = red;
  else if (y >= 4)
    frontColor = blue;
  else if (y < 1)
    frontColor = mix(red, yellow, fract(y));
  else if (y < 2)
    frontColor = mix(yellow, green, fract(y));
  else if (y < 3)
    frontColor = mix(green, cyan, fract(y));
  else
    frontColor = mix(cyan, blue, fract(y));
}
