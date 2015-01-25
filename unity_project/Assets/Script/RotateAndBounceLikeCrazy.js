#pragma strict

var maxUpAndDown            : float = 1;            // amount of meters going up and down
var speedHeight                    : float = 50;            // up and down speed
var speedDepth : float = 50;
var speedHorizontal : float = 50;
var maxDepth : float = 1;
var maxHorizontal :float = 1;

protected var angleDepth            : float = -90;             // angle to determin the height by using the sinus
protected var angleHeight            : float = -90;   
protected var angleHorizontal            : float = -90;   
protected var toDegrees        : float = Mathf.PI/180;    // radians to degrees
protected var startHeight     : float;                // height of the object when the script starts
protected var startDepth : float;
protected var startHorizontal : float;
 
function Start() {
	startHeight = transform.localPosition.y;
	startDepth = transform.localPosition.x;
	startHorizontal = transform.localPosition.z;
}

function setStartCoordinates(x : float, y : float, z:float) {
	startHeight = y;
	startDepth = x;
	startHorizontal = z;
}

function setSpeeds(speedHorizontal, speedHeight, speedDepth) {
	this.speedHorizontal = speedHorizontal;
	this.speedHeight = speedHeight;
	this.speedDepth = speedDepth;
}

function Update () {
	 angleDepth += speedDepth * Time.deltaTime;
     if (angleDepth > 270) angleDepth -= 360;
     
 	 angleHeight += speedHeight * Time.deltaTime;
     if (angleHeight > 270) angleHeight -= 360;
     
 	 angleHorizontal += speedHorizontal * Time.deltaTime;
     if (angleHorizontal > 270) angleHorizontal -= 360;
     
     
     //Debug.Log(maxUpAndDown * Mathf.Sin(angle * toDegrees));
     transform.localPosition.y = startHeight + maxUpAndDown * (/*1 + */Mathf.Sin(angleHeight * toDegrees)) /*/ 2*/;
     transform.localPosition.x = startDepth + maxDepth * (/*1 + */Mathf.Sin(angleDepth * toDegrees)) /*/ 2*/;
     transform.localPosition.z = startHorizontal + maxHorizontal * (/*1 + */Mathf.Sin(angleHorizontal * toDegrees)) /*/ 2*/;
     transform.Rotate(Vector3(15,30,45)*6*Time.deltaTime);
}