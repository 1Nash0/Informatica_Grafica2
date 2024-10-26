#include "BOX.h"
#include <IGL/IGlib.h>

#define GLM_FORCE_RADIANS
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <iostream>


//Idenficadores de los objetos de la escena
int objId =-1;


// Variables para la cámara
glm::mat4 view = glm::mat4(1.0f); // Matriz de vista inicial
float alpha = 0.10f; // Ángulo de rotación
float inc = 0.1f;    // Incremento para zoom


//Declaración de CB
void resizeFunc(int width, int height);
void idleFunc();
void keyboardFunc(unsigned char key, int x, int y);
void mouseFunc(int button, int state, int x, int y);
void mouseMotionFunc(int x, int y);


int main(int argc, char** argv)
{
	std::locale::global(std::locale("spanish"));// acentos ;)
	if (!IGlib::init("../shaders_P2/shader.LuzFocal.vert", "../shaders_P2/shader.LuzFocal.frag"))
		return -1;
  //Se ajusta la cámara
	//Si no se da valor se cojen valores por defecto
	view[3].z = -6;

	glm::mat4 proj = glm::mat4(1.0);
	float f = 1.0f / tan(3.141592f / 6.0f);
	float far = 20.0f;
	float near = 0.1f;

	proj[0].x = f;
	proj[1].y = f;
	proj[2].z = (far + near) / (near - far);
	proj[2].w = -1.0f;
	proj[3].z = (2.0f * far * near) / (near - far);
	proj[3].w = 0.0f;
	IGlib::setProjMat(proj);
	IGlib::setViewMat(view);

	//Creamos el objeto que vamos a visualizar
	objId = IGlib::createObj(cubeNTriangleIndex, cubeNVertex, cubeTriangleIndex, 
			cubeVertexPos, cubeVertexColor, cubeVertexNormal,cubeVertexTexCoord, cubeVertexTangent);
	IGlib::addColorTex(objId, "../img/color2.png");
	IGlib::addSpecularTex(objId, "../img/specMap.png");
	IGlib::addEmissiveTex(objId, "../img/emissive.png");
		
	glm::mat4 modelMat = glm::mat4(1.0f);
	IGlib::setModelMat(objId, modelMat);
	
	//CBs
	IGlib::setIdleCB(idleFunc);
	IGlib::setResizeCB(resizeFunc);
	IGlib::setKeyboardCB(keyboardFunc);
	IGlib::setMouseCB(mouseFunc);
  IGlib::setMouseMoveCB(mouseMotionFunc);
	
	//Mainloop
	IGlib::mainLoop();
	IGlib::destroy();
	
	return 0;
}

void resizeFunc(int width, int height)
{
	//Ajusta el aspect ratio al tamaño de la venta
}

void idleFunc()
{
	glm::mat4 modelMat(1.0f);
	static float angle = 0.0f;
	angle = (angle > 3.141592f * 2.0f) ? 0 : angle + 0.01f;
	
	modelMat = glm::rotate(modelMat, angle, glm::vec3(1.0f, 1.0f, 0.0f));

	IGlib::setModelMat(objId, modelMat);
}

void keyboardFunc(unsigned char key, int x, int y)
{
	switch (key) {
	case 'a':
		view = view * glm::rotate(glm::mat4(1.0f), alpha, glm::vec3(0.0f, 1.0f, 0.0f));
		break;
	case 'd':
		view = view * glm::rotate(glm::mat4(1.0f), -alpha, glm::vec3(0.0f, 1.0f, 0.0f));
		break;
	case 'w':
		view = view * glm::rotate(glm::mat4(1.0f), alpha, glm::vec3(1.0f, 0.0f, 0.0f));
		break;
	case 's':
		view = view * glm::rotate(glm::mat4(1.0f), -alpha, glm::vec3(1.0f, 0.0f, 0.0f));
		break;
	case 'r':
		view = glm::translate(glm::mat4(1.0f), glm::vec3(0.0f, 0.0f, -inc)) * view;
		break;
	case 'f':
		view = glm::translate(glm::mat4(1.0f), glm::vec3(0.0f, 0.0f, inc)) * view;
		break;
	}

	IGlib::setViewMat(view);
}

void mouseFunc(int button, int state, int x, int y)
{
	if (state==0)
		std::cout << "Se ha pulsado el botón ";
	else
		std::cout << "Se ha soltado el botón ";
	
	if (button == 0) std::cout << "de la izquierda del ratón " << std::endl;
	if (button == 1) std::cout << "central del ratón " << std::endl;
	if (button == 2) std::cout << "de la derecha del ratón " << std::endl;

	std::cout << "en la posición " << x << " " << y << std::endl << std::endl;
}

void mouseMotionFunc(int x, int y)
{

}
