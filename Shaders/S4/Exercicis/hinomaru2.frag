#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
vec4 blanc = vec4(1., 1., 1., 1.);
vec4 vermell = vec4(1., 0., 0., 1.);
uniform bool classic = true;
float pi = 3.14158292;
void main() {
  float d = length(vtexCoord - vec2(0.5, 0.5));
  float c = step(0.2, d);
  if (c == 1.)
    fragColor = blanc;
  else
    fragColor = vermell;

  if (!classic) {
    float b = pi / 16.;
    vec2 u = vtexCoord - vec2(0.5, 0.5);
    float a = atan(u.t, u.s);
    float c2 = step(1., mod(a / b + 0.5, 2));
    if (c2 == 0. || c == 0.)
      fragColor = vermell;
    else
      fragColor = blanc;
  }
}
