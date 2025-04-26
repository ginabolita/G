#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
vec4 negre = vec4(0.);
vec4 gris = vec4(0.8);

void main() {
  vec2 vc = vtexCoord * 8.;

  float color = 1 - step(1.0, mod(floor(vc.x) + floor(vc.y), 2.0));
  if (color == 1.)
    fragColor = gris;
  else
    fragColor = negre;
}
