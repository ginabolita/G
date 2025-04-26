#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec3 vvertex;

void main()
{
    vec3 normal = normalize(cross(dFdx(vvertex), dFdy(vvertex)));
    fragColor = frontColor * normal.z;
}
