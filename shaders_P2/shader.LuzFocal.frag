#version 330 core

out vec4 outColor;
in vec3 no;
in vec3 po;
in vec3 vc;
in vec2 tc;

uniform sampler2D colorTex;
uniform sampler2D specularTex;
uniform sampler2D emiTex;

//Fuente de luz////
//uniform vec3 Ia; //prop. escena
vec3 Ia = vec3(0.1);
//uniform vec3 Il; //prop. fuente de luz
vec3 Il = vec3(1);
//uniform vec3 pl;
vec3 pl = vec3(0);

//Luz Focal
float cosTheta = 0.52532; //Coseno del angulo de apertura
float m = 2;
float fdir;


//Objecto
vec3 Ka;
vec3 Kd;
vec3 Ks;
vec3 Ke;
float n;

vec3 shade()
{
	vec3 color = vec3(0);
	vec3 D = normalize(vec3(0,0,-6));  //Direccion de la luz desde el COP

		//amb
		color += Ia * Ka;

		vec3 N = normalize(no);
		vec3 L = normalize(pl-po);
		float d = length(pl - po);
		float attenuation = pow(1/max(d,0.1), 2);
		

	if(cosTheta < dot(-L,D))		//Comprobamos si esta dentro del haz de luz
	{ 
		fdir = pow(max(((dot(-L,D)-cosTheta)/1-cosTheta),0),m);
	} 
	else {
		fdir = 0;
	}
		
	//diff
	color += fdir * attenuation * Il * Kd * (max(dot (N,L),0));

	//spec
	vec3 V = normalize(-po);
	vec3 R = reflect(-L,N);

	color += fdir * attenuation* Il * Ks * pow (max(dot(V,R),0),n);

	//emi
	color += Ke;

	return color;
}


void main()
{
	//Ka = vec3(1,0,0);
	//Kd = vec3(1,0,0);
	Ka = texture (colorTex, tc).rgb;
	Kd = Ka;
	
	Ke=texture (emiTex, tc).rgb;

	Ks = texture (specularTex, tc).rrr;
	n = 100.;

	//outColor = vec4(tc,1,1);
	outColor = vec4(shade(), 1.0);   
}
