#version 330 core
in vec2 vtexCoord;

in vec4 frontColor;
out vec4 fragColor;
vec4 orange = vec4(0.9, 0.6, 0., 1.);
vec4 black = vec4(0.);
vec4 marro = vec4(0.2, 0.2, 0.2, 1.);
void main() {
  float dist = length(vtexCoord - vec2(0.5, 0.5));
  float gradBack = smoothstep(0.2, 0.45, dist);
  if (gradBack == 1.) {
    fragColor = mix(orange, marro, gradBack);
  }

  float face = 1 - step(0.3, dist);
  if (face == 1.) {
    fragColor = vec4(marro);
  }

  float smile = 1 - step(0.2, dist);
  if (smile == 1.) {
    fragColor = vec4(orange);
  }

  float distSmile = length(vtexCoord - vec2(0.5, 0.55));
  smile = 1 - step(0.2, distSmile);
  if (smile == 1.) {
    fragColor = vec4(marro);
  }

  float distEye1 = length(vtexCoord - vec2(0.5-0.1, 0.6));
  float eye1 = 1 - step(0.08, distEye1);
  if (eye1 == 1.) {
    fragColor = vec4(orange);
  }

  float distEye2 = length(vtexCoord - vec2(0.5 + 0.1, 0.6));
  float eye2 = 1 - step(0.08, distEye2);
  if (eye2 == 1.) {
    fragColor = vec4(orange);
  }

  vec2 distPeduncle = vtexCoord - vec2(0.5, 0.5 + 0.3);
  float peduncleS = 1 - step(0.02, length(distPeduncle.s));
  float peduncleT = 1 - step(0.06, length(distPeduncle.t));
  if (peduncleS == 1. && peduncleT == 1.) fragColor = vec4(marro);
}
