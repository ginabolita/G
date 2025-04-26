#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec3 vvertex;
uniform sampler2D panorama;
const float PI = 3.141592;

void main() {
  vec3 fvertex = normalize(vvertex);
  float fi = atan(fvertex.x, fvertex.z);
  float psi = asin(fvertex.y);

  float s = fi / (2 * PI);
  float t = psi / PI + 0.5;
  fragColor = texture(panorama, vec2(s, t));
}
