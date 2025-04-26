#version 330 core

in vec4 frontColor;
out vec4 fragColor;
uniform sampler2D noise0;
uniform sampler2D rock1;
uniform sampler2D grass2;
in vec2 vtexCoord;

void main() {
  float f = texture(noise0, vtexCoord).x;
  vec4 frontColor = texture(grass2, vtexCoord);
  if (f < 1)
    frontColor =
        mix(texture(rock1, vtexCoord), texture(grass2, vtexCoord), fract(f));
  fragColor = frontColor;
}
