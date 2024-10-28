#version 330 core

out vec4 outColor;
in vec3 no;
in vec3 po;
in vec3 vc;
in vec2 tc;

uniform sampler2D colorTex;
uniform sampler2D specularTex;
uniform sampler2D emiTex;

//fuente de luz
//uniform vec3 Ia; //prop. escena
vec3 Ia = vec3(0.2);
//uniform vec3 Il; //prop. fuente de luz
vec3 Il = vec3(1.0);
//uniform vec3 pl;
vec3 pl = vec3(-1 ,-1, -5);

// Segunda fuente de luz
vec3 Il2 = vec3(1.0);  // Intensidad de la segunda luz
vec3 pl2 = vec3(1, 2, -5); // Posición de la segunda luz

//Objecto
vec3 Ka;
vec3 Kd;
vec3 Ks;
vec3 Ke;
float n;

vec3 shade()
{
    vec3 color = vec3(0);

    //amb
    color += Ia * Ka;

    //diff
    vec3 N = normalize(no);
    vec3 L1 = normalize(pl-po);
    color += Il * Kd * (max(dot (N,L1),0));


    //spec
    vec3 V = normalize(-po);
    vec3 R1 = reflect(-L1,N);

    color += Il * Ks * pow (max(dot(V,R1),0),n);

     // Segunda luz: difusa y especular
    vec3 L2 = normalize(pl2 - po);
    color += Il2 * Kd * max(dot(N, L2), 0); // Difusa

    vec3 R2 = reflect(-L2, N); // Reflejo de la segunda luz
    color += Il2 * Ks * pow(max(dot(V, R2), 0), n); // Especular

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