#version 330 core
in vec2 vtexCoord;

in vec4 frontColor;
out vec4 fragColor;
uniform sampler2D fbm;
uniform float time;
const float pi = 3.14159;
vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
vec4 yellow = vec4(1.0, 1.0, 0.0, 1.0);
vec4 cyan = vec4(0.0, 1.0, 1.0, 1.0);
vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
vec4 magenta = vec4(1.0, 0.0, 1.0, 1.0);

void main() {
  float r = (texture(fbm, vtexCoord)).r;
  float A = 1, f = 0.1, phi = 2 * pi * r;
  float v = A * sin(2 * pi * f * time + phi);

  vec4 color;
  if (v == -1.0 || v == 1.0)
    color = red;
  else if (v < -0.75)
    color = mix(red, yellow, v);
  else if (v < -0.5)
    color = mix(yellow, cyan, v);
  else if (v < 0.0)
    color = mix(cyan, blue, v);
  else if (v < 0.5)
    color = mix(blue, magenta, v);
  else
    color = mix(magenta, red, v);

  fragColor = color;
}
