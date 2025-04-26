#version 330 core
in vec2 vtexCoord;

in vec4 frontColor;
out vec4 fragColor;
vec4 white = vec4(1.);
vec4 black = vec4(0.);
vec4 grey = vec4(0.8);
vec4 skin = vec4(1., 0.8, 0.6, 1.);

uniform int mode = 2;

void main() {
  fragColor = grey;
  // mode 0
  float dist = length(vtexCoord - vec2(0.5, 0.4));
  float head = 1 - step(0.35, dist);
  if (head == 1.) fragColor = black;

  float distear1 = length(vtexCoord - vec2(0.5 - 0.28, 0.4 + 0.37));
  float ear1 = 1 - step(0.18, distear1);
  if (ear1 == 1.) fragColor = black;

  float distear2 = length(vtexCoord - vec2(0.5 + 0.28, 0.4 + 0.37));
  float ear2 = 1 - step(0.18, distear2);
  if (ear2 == 1.) fragColor = black;

  // mode 1
  if (mode == 1 || mode == 2) {
    vec2 uvEye1 = vtexCoord - vec2(0.5 - 0.06, 0.5);
    float a = 0.13;
    float b = 0.2;
    float elipse1 =
        (uvEye1.x * uvEye1.x) / (a * a) + (uvEye1.y * uvEye1.y) / (b * b);
    float eye = 1.0 - step(1.0, elipse1);
    if (eye == 1.) fragColor = skin;

    vec2 uvEye2 = vtexCoord - vec2(0.5 + 0.06, 0.5);
    float elipse2 =
        (uvEye2.x * uvEye2.x) / (a * a) + (uvEye2.y * uvEye2.y) / (b * b);
    float eye2 = 1.0 - step(1.0, elipse2);
    if (eye2 == 1.) fragColor = skin;

    vec2 uvMouth = vtexCoord - vec2(0.5, 0.5 - 0.2);
    a = 0.27;
    b = 0.17;
    float elipse3 =
        (uvMouth.x * uvMouth.x) / (a * a) + (uvMouth.y * uvMouth.y) / (b * b);
    float mouth = 1.0 - step(1.0, elipse3);
    if (mouth == 1.) fragColor = skin;
    // mode 2
    if (mode == 2) {
      float a = 0.09;
      float b = 0.14;
      float elipse4 =
          (uvEye1.x * uvEye1.x) / (a * a) + (uvEye1.y * uvEye1.y) / (b * b);
      float eye = 1.0 - step(1.0, elipse4);
      if (eye == 1.) fragColor = white;

      float elipse5 =
          (uvEye2.x * uvEye2.x) / (a * a) + (uvEye2.y * uvEye2.y) / (b * b);
      float eye2 = 1.0 - step(1.0, elipse5);
      if (eye2 == 1.) fragColor = white;

      vec2 uvPupila1 = vtexCoord - vec2(0.5 - 0.06, 0.5-0.04);
      a = 0.04;
      b = 0.09;
      float elipse6 = (uvPupila1.x * uvPupila1.x) / (a * a) +
                      (uvPupila1.y * uvPupila1.y) / (b * b);
      float pupila1 = 1.0 - step(1.0, elipse6);
      if (pupila1 == 1.) fragColor = black;

      vec2 uvPupila2 = vtexCoord - vec2(0.5 + 0.06, 0.5 - 0.04);
      a = 0.04;
      b = 0.09;
      float elipse7 = (uvPupila2.x * uvPupila2.x) / (a * a) +
                      (uvPupila2.y * uvPupila2.y) / (b * b);
      float pupila2 = 1.0 - step(1.0, elipse7);
      if (pupila2 == 1.) fragColor = black;
    }
  }
}
