#version 330 core

in vec3 inPos;	
in vec3 inColor;
in vec3 inNormal;

uniform mat4 modelViewProj;
uniform mat4 normal;
uniform mat4 modelView;

out vec3 color;

//Fuente de luz
//uniform vec3 Ia; //prop. escena
vec3 Ia = vec3(0.1);
//uniform vec3 Il; //prop. fuente de luz
vec3 Il = vec3(1);
//uniform vec3 pl;
vec3 pl = vec3(0);


//Objecto
vec3 Ka;
vec3 Kd;
vec3 Ks;
float n;

vec3 po;
vec3 no;



vec3 shade()
{
	color = vec3(0);

	//amb
	color += Ia * Ka;

	//diff
	vec3 N = no;
	vec3 L = normalize(pl-po);
	color += Il * Kd * (max(dot (N,L),0));


	//spec
	vec3 V = normalize(-po);
	vec3 R = reflect(-L,N);

	color += Il * Ks * pow (max(dot(V,R),0),n);

	return color;
}

void main()
{
	//Ka = inColor;
	//Kd = inColor;
	Ka = vec3(1,0,0);
	Kd = vec3(1,0,0);
	Ks = vec3(1);
	n = 100.;
	no = normalize((normal * vec4(inNormal, 0)).xyz);
	po = (modelView * vec4(inPos,1)).xyz;

	color = shade();
	gl_Position =  modelViewProj * vec4 (inPos,1.0);
}
