#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
vec4 blanc = vec4(1., 1., 1., 1.);
vec4 vermell = vec4(1., 0., 0., 1.);
uniform bool anitaliasing = false;
void main() {
  //   if (vtexCoord.s <= 0.5 + 0.2 && vtexCoord.t <= 0.5 + 0.2 &&
  //       vtexCoord.s > 0.5 - 0.2 && vtexCoord.t > 0.5 - 0.2) {
  //     fragColor = vermell;
  //   } else {
  //     fragColor = blanc;
  //   }
  if (!anitaliasing) {
    float d = length(vtexCoord - vec2(0.5, 0.5));
    float c = step(0.2, d);
    if (c == 1.)
      fragColor = blanc;
    else
      fragColor = vermell;
  } else {
    float d = length(vtexCoord - vec2(0.5, 0.5));
    float c = smoothstep(0.2 - 0.1, 0.2 + 0.1, d);
    if (c == 1.)
      fragColor = blanc;
    else
      fragColor = vermell;
  }
}
