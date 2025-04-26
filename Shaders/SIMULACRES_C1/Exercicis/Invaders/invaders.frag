#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
int scale = 16;
uniform sampler2D colorMap;

void main() {
  vec2 texC = vtexCoord * scale;

  int dfdx = int(texC.s) % scale;
  int dfdy = int(texC.t) % scale;

  float s;
  float t;

  if (dfdy == scale - 2 && dfdx != 0 && dfdx != scale - 1) {
    s = texC.s * 1 / 4. + 0 * 1 / 4. - dfdx * 1 / 4.;
    t = texC.t * 1 / 4. + 0 * 1 / 4. - dfdy * 1 / 4.;
    fragColor = texture(colorMap, vec2(s, t));
  } else if (dfdy == scale - 3 && dfdx != 0 && dfdx != scale - 1) {
    s = texC.s * 1 / 4. + 1 * 1 / 4. - dfdx * 1 / 4.;
    t = texC.t * 1 / 4. + 0 * 1 / 4. - dfdy * 1 / 4.;
    fragColor = texture(colorMap, vec2(s, t));
  } else if (dfdy == scale - 4 && dfdx != 0 && dfdx != scale - 1) {
    s = texC.s * 1 / 4. + 2 * 1 / 4. - dfdx * 1 / 4.;
    t = texC.t * 1 / 4. + 1 * 1 / 4. - dfdy * 1 / 4.;
    fragColor = texture(colorMap, vec2(s, t));
  } else if (dfdy == scale - 5 && dfdx != 0 && dfdx != scale - 1) {
    s = texC.s * 1 / 4. + 0 * 1 / 4. - dfdx * 1 / 4.;
    t = texC.t * 1 / 4. + 1 * 1 / 4. - dfdy * 1 / 4.;
    fragColor = texture(colorMap, vec2(s, t));
  } else if (dfdy == scale - 6 && dfdx != 0 && dfdx != scale - 1) {
    s = texC.s * 1 / 4. + 0 * 1 / 4. - dfdx * 1 / 4.;
    t = texC.t * 1 / 4. + 2 * 1 / 4. - dfdy * 1 / 4.;
    fragColor = texture(colorMap, vec2(s, t));
  } else if (dfdy == scale - 7 && dfdx != 0 && dfdx != scale - 1) {
    s = texC.s * 1 / 4. + 0 * 1 / 4. - dfdx * 1 / 4.;
    t = texC.t * 1 / 4. + 3 * 1 / 4. - dfdy * 1 / 4.;
    fragColor = texture(colorMap, vec2(s, t));
  } else if (dfdy == 1 && dfdx == 5) {
    s = texC.s * 1 / 4. + 3 * 1 / 4. - dfdx * 1 / 4.;
    t = texC.t * 1 / 4. + 1 * 1 / 4. - dfdy * 1 / 4.;
    fragColor = texture(colorMap, vec2(s, t));
  } else if (dfdy == 3 && dfdx % 2 == 0 && dfdx != 0 && dfdx != scale - 1) {
    s = texC.s * 1 / 4. + 3 * 1 / 4. - dfdx * 1 / 4.;
    t = texC.t * 1 / 4. + 0 * 1 / 4. - dfdy * 1 / 4.;
    fragColor = texture(colorMap, vec2(s, t));
  }
}
