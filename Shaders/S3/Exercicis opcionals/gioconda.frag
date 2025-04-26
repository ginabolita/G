#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;

out vec4 fragColor;

uniform float time;
uniform sampler2D sampler;

void main() {
  if (fract(time) <= 0.5) {  // ulls oberts
    fragColor = texture(sampler, vtexCoord);
  } else {  // pica ull
    if (vtexCoord.s > 0.393 - 0.025 && vtexCoord.t > 0.652 - 0.025 &&
        vtexCoord.s < 0.393 + 0.025 && vtexCoord.t < 0.652 + 0.025) {
      fragColor = texture(sampler, vtexCoord + vec2(0.057, -0.172));
    } else {
      fragColor = texture(sampler, vtexCoord);
    }
  }
}