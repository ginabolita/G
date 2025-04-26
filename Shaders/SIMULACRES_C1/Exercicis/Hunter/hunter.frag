#version 330 core
in vec2 vtexCoord;
in vec4 vvertex;
in vec4 frontColor;
out vec4 fragColor;
uniform vec2 mousePosition;
uniform vec2 viewport;
uniform sampler2D jungla;
uniform float magnific = 3;

// **requereix** que hi hagi declarat un sampler2D jungla!
// retorna el color corresponent a les coordenades de textura coords.
vec4 blurImage(in vec2 coords) {
  float Pi = 6.28318530718;  // Pi*2
  float Directions =
      16.0;  // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
  float Quality =
      8.0;            // BLUR QUALITY (Default 4.0 - More is better but slower)
  float Size = 10.0;  // BLUR SIZE (Radius)

  vec2 Radius = Size / viewport;

  vec4 Color = texture(jungla, coords);
  for (float d = 0.0; d < Pi; d += Pi / Directions) {
    float cd = cos(d);
    float sd = sin(d);
    for (float i = 1.0 / Quality; i <= 1.0; i += 1.0 / Quality) {
      Color += texture(jungla, coords + vec2(cd, sd) * Radius * i);
    }
  }

  // Output to screen
  Color /= Quality * Directions - 15.0;
  return Color;
}

void main() {
  vec4 fons = blurImage(vtexCoord);
  vec2 tcws = vtexCoord * viewport;
  vec2 F = (vtexCoord - mousePosition) / sqrt(magnific) + mousePosition;

  vec4 image = texture(jungla, F);

  vec2 posBinocle1 = mousePosition - vec2(80., 0.);
  vec2 posBinocle2 = mousePosition + vec2(80., 0.);

  float d1 = length(posBinocle1 - tcws);
  float d2 = length(posBinocle2 - tcws);

  float t1 = step(d1, 100 + 5);
  float t2 = step(d2, 100 + 5);
  float t3 = step(d1, 100);
  float t4 = step(d2, 100);

  vec4 b1 = mix(fons, vec4(0.), t1);
  vec4 b2 = mix(b1, vec4(0.), t2);
  vec4 b3 = mix(b2, image, t3);
  vec4 b4 = mix(b3, image, t4);

  fragColor = b4;
}
