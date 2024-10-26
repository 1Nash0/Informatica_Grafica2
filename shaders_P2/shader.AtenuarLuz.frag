#version 330 core

out vec4 outColor;
in vec3 no;
in vec3 po;
in vec3 vc;
in vec2 tc;

uniform sampler2D colorTex;
uniform sampler2D specularTex;
uniform sampler2D emiTex;

// Fuente de luz
vec3 Ia = vec3(0.1); // Iluminación ambiente
vec3 Il = vec3(1.8); // Intensidad de la luz
vec3 pl = vec3(0);   // Posición de la luz
float range = 10.0;  // Rango de la luz para la atenuación

// Propiedades del objeto
vec3 Ka; // Coeficiente de luz ambiente
vec3 Kd; // Coeficiente de luz difusa
vec3 Ks; // Coeficiente de luz especular
vec3 Ke; // Coeficiente de emisión
float n; // Brillo especular

vec3 shade()
{
    vec3 color = vec3(0);

    // Ambiente
    color += Ia * Ka;

    // Atenuación basada en distancia cuadrática inversa
    vec3 N = normalize(no);
    vec3 L = normalize(pl - po);
    float d = length(pl - po);
    float attenuation = max(0.0, 1.0 - pow(d / range, 2));

    // Difusa y especular
    color += Il * Kd * max(dot(N, L), 0) * attenuation;
    vec3 V = normalize(-po);
    vec3 R = reflect(-L, N);

    color += Il * Ks * pow(max(dot(V, R), 0), n) * attenuation;

    // Emisión
    color += Ke;

    return color;
}

void main()
{
    // Texturas para las propiedades del material
    Ka = texture(colorTex, tc).rgb;
    Kd = Ka;
    Ke = texture(emiTex, tc).rgb;
    Ks = texture(specularTex, tc).rrr;
    n = 100.0;

    outColor = vec4(shade(), 1.0);
}
