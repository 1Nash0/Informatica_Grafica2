#version 330 core

in vec3 inPos;	
in vec3 inColor;
in vec3 inNormal;

uniform mat4 modelViewProj;
uniform mat4 normal;
uniform mat4 modelView;

out vec3 no;
out vec3 po;
out vec3 vc;

void main()
{
	no = normalize((normal * vec4(inNormal, 0)).xyz);
	po = (modelView * vec4(inPos,1)).xyz;

	vc=inColor;
	
	gl_Position =  modelViewProj * vec4 (inPos,1.0);
}
