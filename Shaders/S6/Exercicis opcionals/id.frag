#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;

out vec4 fragColor;
uniform sampler2D colorMap;
void main() {
  vec2 texC = vec2(vtexCoord.s * 6, vtexCoord.t);
  int dfdx = int(texC.s) % 6;
  int frag = 0;
  if (dfdx == 0) frag = 4;
  if (dfdx == 1) frag = 8;
  if (dfdx == 2) frag = 0;
  if (dfdx == 3) frag = 2;
  if (dfdx == 4) frag = 9;
  if (dfdx == 5) frag = 5;

  
  vec2 st = vec2(texC.s * 1 / 10. +  frag * 1/ 10. - dfdx * 1/10., texC.t);
  vec4 C = texture(colorMap, st);
  if (C.a < 0.5)
    discard;
  else
    fragColor = vec4(0., 0., 1., 1.);
}
