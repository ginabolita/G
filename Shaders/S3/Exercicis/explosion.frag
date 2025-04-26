#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
uniform sampler2D explosion;
uniform float time;

void main() {
  //   int frame = int(floor(time));
  int frame = int(time * 30);
  float s = vtexCoord.s * 1 / 8. + frame % 8 * 1 / 8.;
  float t = vtexCoord.t * 1 / 6. - frame / 8 * 1 / 6.;
  vec4 color2 = frontColor * texture(explosion, vec2(s, t));
  fragColor = color2.a * color2;
}
