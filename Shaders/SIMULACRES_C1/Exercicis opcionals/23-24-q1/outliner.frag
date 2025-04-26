#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
in vec4 P;
in vec4 N;
uniform int mode = 3;
void main() {
  vec4 color;
  vec4 N2 = normalize(N);
  if (mode == 0)
    fragColor = vec4(N2.z);
  else if (mode == 1) {
    float c = step(0.4, N2.z);
    if (c == 1.)
      color = vec4(1., 1., 0.9, 1.);
    else
      color = vec4(0., 0., 0., 1.);
    fragColor = color;
  } else if (mode == 2) {
    vec4 V = normalize(vec4(0., 0., 0., 1.) - P);
    float c = step(0.4, dot(V, N2));
    if (c == 1.)
      color = vec4(0.8, 1., 1., 1.);
    else
      color = vec4(0., 0., 0., 1.);
    fragColor = color;
  } else if (mode == 3) {
    vec4 V = normalize(vec4(0., 0., 0., 1.) - P);
    float c = step(0.4, dot(V, N2));
    float c2 = step(0.95, dot(V, N2));
    if (c == 1.) {
      color = vec4(0.8, 1., 1., 1.);
      if (c2 == 1.) color = vec4(1., 1., 1., 1.);
    }
    else
      color = vec4(0., 0., 0., 1.);
    fragColor = color;
  }
  /*

else if (mode == 3) {
  vec4 V = normalize(vec4(0., 0., 0., 1.) - P);
  float c = 1 - step(0.4, dot(V, N));
  float c2 = step(0.95, dot(V, N));
  if (c2 == 1.)
  color = vec4(1., 1., 1., 1.);
  else if (c == 1.)
  color = vec4(0.8, 1., 1., 1.);
  else
  color = vec4(0., 0., 0., 1.);

  fragColor = color;
}
*/
}