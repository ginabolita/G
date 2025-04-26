#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
vec4 purple = vec4(1., 0., 1., 1.);
vec4 grey = vec4(0.5);

void main() {
  vec2 st = vtexCoord;
  float stepS = 1 / 5.;
  float stepT = 1 / 7.;

  float d, c;
  d = length(st - vec2(1 * stepS, 1. * stepT));
  c = 1 - step(0.01, d);
  vec4 color;
  if (c == 1.)
    color = purple;
  else
    color = grey;

  fragColor = color;
  for (int i = 2; i <= 3; ++i) {
    d = length(st - vec2(i * stepS, 1. * stepT));
    c = 1 - step(0.01, d);
    if (c == 1.) color = purple;
    fragColor = color;
    d = length(st - vec2(i * stepS, 7. * stepT - 1/7.));
    c = 1 - step(0.01, d);
    if (c == 1.) color = purple;
    fragColor = color;
  }
  for (int i = 2; i <= 6; ++i) {
    d = length(st - vec2(0. * stepS + 1/7., i * stepT));
    c = 1 - step(0.01, d);
    if (c == 1.) color = purple;
    fragColor = color;
  }
  for (int i = 3; i <= 4; ++i) {
    d = length(st - vec2(i * stepS, 3 * stepT));
    c = 1 - step(0.01, d);
    if (c == 1.) color = purple;
    fragColor = color;
  }
  d = length(st - vec2(4 * stepS, 2 * stepT));
  c = 1 - step(0.01, d);
  if (c == 1.) color = purple;
  fragColor = color;
}
