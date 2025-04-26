#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

vec4 cyan = vec4(0., 0.7, 1., 1.0);
vec4 red = vec4(1., 0., 0., 1.0);
vec4 yellow = vec4(1., 1., 0., 1.0);
uniform vec2 viewport;
float ra = 4 / 3;

void main() {
  // FLAG 1
  /*
  vec4 cyan = vec4(0., 0.7, 1., 1.0);
  vec4 red = vec4(1., 0., 0., 1.0);
  vec4 yellow = vec4(1., 1., 0., 1.0);
  vec2 dist = vtexCoord - vec2(0.5, 0.5); // dist del frag al centro

  if (dist.x < 0.)
    fragColor = cyan;
  else {
    if (dist.y < 0.) {
      fragColor = yellow;
    } else {
      fragColor = red;
    }
  }
  */

  // FLAG 2
  /*
   vec4 blue = vec4(0.2, 0.3, 1., 1.0);
   vec4 green = vec4(0.3, 1., 0.2, 1.0);
   vec4 yellow = vec4(1., 1., 0., 1.0);
   vec4 red = vec4(1., 0., 0., 1.0);
   vec2 d = vtexCoord - vec2(0.5, 0.5);
   vec4 color;
   if (abs(d.y) < 0.17) {
     color = yellow;
   } else {
     if (d.y > 0.) {
       color = green;
     } else {
       color = blue;
     }
   }

   float d2 = length(d);
   float c = step(0.25, d2);
   if (c == 1.)
     fragColor = color;
   else
     fragColor = red;
  */
  vec4 green = vec4(0.4, 0.55, 0.3, 1.0);
  vec4 white = vec4(1.0);

  vec2 vdist_w = vtexCoord - vec2(0.25, 0.5);
  vec2 vdist_g = vtexCoord - vec2(0.35, 0.5);
  vec2 vdist_s = vtexCoord - vec2(0.75, 0.5);

  float ds_w = length(vdist_w);
  float ds_g = length(vdist_g);
  float ds_s = length(vdist_s.s);
  float ds_t = length(vdist_s.t);

  float c = 1 - step(0.2, ds_w);
  float c2 = 1 - step(0.2, ds_g);
  vec4 color;
  if (c == 1.)
    color = white;
  else
    color = green;
  fragColor = color;
  if (c2 == 1.) color = green;
  fragColor = color;

  if (abs(ds_s) < 0.15 && abs(ds_t) < 0.15) color = white;
  fragColor = color;
}
