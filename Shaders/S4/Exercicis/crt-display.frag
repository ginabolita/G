#version 330 core

in vec4 frontColor;
out vec4 fragColor;
uniform int n = 2;
void main() {
  float y = gl_FragCoord.y - 0.5;
  if (int(y) % n != 0) discard;
  else fragColor = frontColor;
}
