#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D fons;
uniform sampler2D noise1;
uniform float time;
void main()
{
    vec4 c = texture(noise1, vtexCoord + vec2(0.08*time, 0.07*time));
    vec2 st = vec2(c.r, c.g) * vec2(0.003, -0.005);

    fragColor = texture(fons, vtexCoord + st);
}
