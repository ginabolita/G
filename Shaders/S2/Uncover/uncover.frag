#version 330 core

in vec4 frontColor;
out vec4 fragColor;
uniform float time;
in float vX;
in vec4 vvertex;

vec4 blue = vec4(0, 0, 1, 1);

void main() {
  float Xpd = vvertex.x / vvertex.w;
  float vndc = (Xpd + 1.) / 2.;  // X en ndc
  float vX = 2. * vndc;          //[0,2]

  if (vX <= time) {
    fragColor = blue;
  } else {
    discard;
  }
}
