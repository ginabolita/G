#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 vvertex;
in vec3 vnormal;

const float pi = 3.141592;
uniform int n = 4;
uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;

uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

vec4 light(vec3 N, vec3 V, vec3 P) {
  N = normalize(N);
  V = normalize(V);

  vec4 DiffuseSum = vec4(0.0);
  vec4 SpecSum = vec4(0.0);

  vec3 posFocusIni = vec3(10, 0, 0);
  float angleStep = 2 * pi / float(n);

  for (int i = 0; i < n; ++i) {
    float angle = angleStep * float(i);
    float c = cos(angle);
    float s = sin(angle);
    mat3 rotateY = mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
    vec3 posFocus = rotateY * posFocusIni;
    vec3 L = normalize(posFocus - P);
    float NdotL = max(0, dot(N, L));
    DiffuseSum += (matDiffuse * lightDiffuse * NdotL) / sqrt(float(n));

    if (NdotL > 0) {
      vec3 R = normalize(2 * dot(N, L) * N - L);
      float RdotV = max(0, dot(R, V));
      float lspec = pow(RdotV, matShininess);
      SpecSum += matSpecular * lightSpecular * lspec;
    }
  }
  return DiffuseSum + SpecSum;
}

void main() {
  vec3 N = vnormal;
  vec3 P = vvertex;
  vec3 V = normalize(vec3(0, 0, 0) - P);
  fragColor = light(N, V, P);
}
