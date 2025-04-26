#version 330 core
in vec2 vtexCoord;

in vec4 frontColor;
out vec4 fragColor;
vec4 green = vec4(0., 0.7, 0.3, 1.);
vec4 yellow = vec4(0.9, 0.9, 0., 1.);
vec4 blue = vec4(0.1, 0.1, 0.7, 1.);

void main() {
  fragColor = green;
  vec2 distC = vtexCoord - vec2(0.5, 0.5);
  float ds = length(distC.x);
  float dt = length(distC.y);
  float d = length(distC);

  float Cyellows = 1 - step(0.38, ds);
  float Cyellowt = 1 - step(0.32, dt);
  if (Cyellows == 1. && Cyellowt == 1.) fragColor = yellow;

  vec2 distC2 = vtexCoord - vec2(0.5, 0.5);
  float d2 = length(distC2);
  float Cblue = 1 - step(0.18, d2);
  if (Cblue == 1.) {
    fragColor = blue;
  }
  float bandWidth = 0.009;
  float bandRadius = 0.17;
  float bandCenterY = 0.030;  // Shift the band center slightly down

  // Distance from a point to the curved band
  float distToBand =
      abs(length(vec2(distC.x, distC.y - bandCenterY)) - bandRadius);

  // If within the band width and inside the blue circle, color it white
  if (distToBand < bandWidth && d < 0.18) {
    fragColor = yellow;
  }
  }
