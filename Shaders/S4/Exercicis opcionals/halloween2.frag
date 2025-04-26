#version 330 core
in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
vec3 orangeColor = vec3(1.0, 0.6, 0.0);
vec3 blackColor = vec3(0.0, 0.0, 0.0);
vec3 darkGrayColor = vec3(0.1, 0.1, 0.1);

void main() {
  float dist = length(vtexCoord - vec2(0.5, 0.5));

  vec3 backgroundColor = mix(orangeColor, blackColor, dist);

  // Forma de la calabaza (elipse)
  float pumpkinShape = length(vec2(vtexCoord.x / 0.35, vtexCoord.y / 0.3));

  // Pedúnculo (rectángulo superior)
  float stem = 0.0;
  if (vtexCoord.y > 0.07 && vtexCoord.y < 0.25 && abs(vtexCoord.x) < 0.05) {
    stem = 1.0;
  }

  // Combinamos calabaza y pedúnculo
  float pumpkinAndStem = min(step(pumpkinShape, 1.0), 1.0) + stem;
  pumpkinAndStem = min(pumpkinAndStem, 1.0);

  // Ojos (elipses)
  float leftEye = length(vec2((vtexCoord.x + 0.12) / 0.08, vtexCoord.y / 0.08));
  float rightEye =
      length(vec2((vtexCoord.x - 0.12) / 0.08, vtexCoord.y / 0.08));
  float eyes = min(step(leftEye, 1.0), 1.0) + min(step(rightEye, 1.0), 1.0);

  // Boca (dos círculos)
  float outerMouth = length(vec2(coord.x / 0.25, (coord.y + 0.1) / 0.125));
  float innerMouth = length(vec2(coord.x / 0.15, (coord.y + 0.15) / 0.05));
  float mouth =
      min(step(outerMouth, 1.0), 1.0) - min(step(innerMouth, 1.0), 1.0);
  mouth = max(0.0, mouth);

  // Combinamos elementos para crear la cara
  float face = eyes + mouth;
  face = min(face, 1.0) * pumpkinAndStem;

  // Color final:
  // - Si es parte de la calabaza/pedúnculo pero no de la cara: negro
  // - Si es parte de la cara: color de fondo
  // - Si no es parte de la calabaza: color de fondo
  vec3 finalColor = backgroundColor;
  if (pumpkinAndStem > 0.0) {
    finalColor = darkGrayColor;
    if (face > 0.0) {
      finalColor = backgroundColor;
    }
  }

  gl_FragColor = vec4(finalColor, 1.0);
}
