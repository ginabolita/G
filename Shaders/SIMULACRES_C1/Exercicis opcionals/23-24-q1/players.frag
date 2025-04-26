#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
in vec2 P;
uniform sampler2D courtMap;
uniform sampler2D player1;
uniform vec2 p1 = vec2(-3, -8);
uniform vec2 p2 = vec2(3, -8);
uniform vec2 p3 = vec2(-2, 2);
uniform vec2 p4 = vec2(2, 2);

vec4 white = vec4(1.);
vec4 black = vec4(0., 0., 0., 1.);

uniform int mode = 3;

void main() {
  if (mode == 0) {
    fragColor = texture(courtMap, vtexCoord);
  } else {
    // mode 1
    float vert = 1 - step(0.05, fract(P.x));
    float hor = 1 - step(0.05, fract(P.y));
    if (vert == 1. || hor == 1.)
      fragColor = white;
    else {
      vec4 aux = texture(courtMap, vtexCoord);
      fragColor = vec4(aux.r * 1.2, aux.g * 1.2, aux.b * 1.2, aux.a);
    }
    // mode 2
    if (mode == 2) {
      float d, c;
      d = length(p1 - P);
      c = 1 - step(0.25, d);
      if (c == 1.) fragColor = black;

      d = length(p2 - P);
      c = 1 - step(0.25, d);
      if (c == 1.) fragColor = black;

      d = length(p3 - P);
      c = 1 - step(0.25, d);
      if (c == 1.) fragColor = black;

      d = length(p4 - P);
      c = 1 - step(0.25, d);
      if (c == 1.) fragColor = black;

      d = length(p1 - P);
      c = 1 - step(0.2, d);
      if (c == 1.) fragColor = white;

      d = length(p2 - P);
      c = 1 - step(0.2, d);
      if (c == 1.) fragColor = white;

      d = length(p3 - P);
      c = 1 - step(0.2, d);
      if (c == 1.) fragColor = white;

      d = length(p4 - P);
      c = 1 - step(0.2, d);
      if (c == 1.) fragColor = white;
    } else if (mode == 3) {
      float v, h;
      vec2 dist;
      dist = (p1 - P);
      v = 1 - step(1, length(dist.x));
      h = 1 - step(1, length(dist.y));
      if (v == 1. && h == 1.) {
        vec2 st = -(p1 - P + 1.) / 2;
        vec4 C = texture(player1, st);
        if (C.r > 0.5 || C.b < 0.5) fragColor = C;
      }
      dist = (p2 - P);
      v = 1 - step(1, length(dist.x));
      h = 1 - step(1, length(dist.y));
      if (v == 1. && h == 1.) {
        vec2 st = -(p2 - P + 1.) / 2;
        vec4 C = texture(player1, st);
        if (C.r > 0.5 || C.b < 0.5) fragColor = C;
      }

      dist = (p3 - P);
      v = 1 - step(1, length(dist.x));
      h = 1 - step(1, length(dist.y));
      if (v == 1. && h == 1.) {
        vec2 st = (p3 - P + 1.) / 2;
        vec4 C = texture(player1, st);
        if (C.r > 0.5 || C.b < 0.5) fragColor = C;
      }

      dist = (p4 - P);
      v = 1 - step(1, length(dist.x));
      h = 1 - step(1, length(dist.y));
      if (v == 1. && h == 1.) {
        vec2 st = (p4 - P + 1.) / 2;
        vec4 C = texture(player1, st);
        if (C.r > 0.5 || C.b < 0.5) fragColor = C;
      }
    }
  }
}
