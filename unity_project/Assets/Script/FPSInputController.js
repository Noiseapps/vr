private var motor : CharacterMotor;
var kinectPoint : KinectPointController;
var pickupObject : PickupObject;
var deltaV : double;
var deltaSR : double;  // delta for side movement right
var deltaSL : double;  // delta for side movement left
var initHandRight : double;
var handYPosPrevFrame : double = 0;
private var isThrow : int = 0;
private var hasKinect : int = 0;
private var initThrowYPos : double;
private var initThrowTime : float;
private var maxDelta : double = 0;
private var canMove : int = 1;
private var endOfGame : int = 0;
private var onlySideMovement : int = 0;  
function Awake () {
	motor = GetComponent(CharacterMotor);
	kinectPoint = this.GetComponent(KinectPointController);
	pickupObject = this.GetComponent(PickupObject);
}

function Start () {
	deltaV = kinectPoint.sw.bonePos[0,19].z;
	deltaSR = kinectPoint.sw.bonePos[0,19].x;
	deltaSL = kinectPoint.sw.bonePos[0,15].x;
	initHandRight = kinectPoint.sw.bonePos[0,11].z;
}

private var THROW_THR = 0.1;
private var DIFF = 0.12;
private var GRAB2 = 0.4;
private var rotationCoefficient : int = 1500.0;
private var rotationConstant : int = 155;
private var rotateSpeed : double;
private var movementSlowDownCoef : double = 0.25;  // 0.5 for movementMinima 1.0
private var movementSensitivityCoef : double = 0.5;
private var sideMovementSensitivityCoef : double = 0.3;
private var movementMinima : double = 2.0;

function Update () {
	if(endOfGame == 1) {
		Debug.Log("endOfGame");
		transform.Translate(Vector3(1,0,0) * Time.deltaTime, Space.World);
		return;
	}
	if(canMove == 0) return;
	var directionVector;
	if(hasKinect == 1){
		// Set initial points
		if(deltaV == 0) {
			deltaV = kinectPoint.sw.bonePos[0,19].z;
		}
		if(deltaSR == 0) {
			deltaSR = kinectPoint.sw.bonePos[0,19].x;
		}
		if(deltaSL == 0) {
			deltaSL = kinectPoint.sw.bonePos[0,15].x;
		}
		if(initHandRight == 0) {
			initHandRight = kinectPoint.sw.bonePos[0,11].z;
		}
		
		// Assign movement vector
		
		
		//	Debug.Log("" + kinectPoint.sw.bonePos[0,11].y + ", " + kinectPoint.sw.bonePos[0,16].y);
		var tempDeltaX = (kinectPoint.sw.bonePos[0,15].x - deltaSL) + (kinectPoint.sw.bonePos[0,19].x - deltaSR);
		tempDeltaX = tempDeltaX / sideMovementSensitivityCoef;
		
		var tempDeltaV = kinectPoint.sw.bonePos[0,19].z - deltaV;
		tempDeltaV = tempDeltaV / movementSensitivityCoef;
		if(onlySideMovement == 1)
		{
			tempDeltaV = 0;
		}
		directionVector = new Vector3(tempDeltaX, 0, tempDeltaV);
		
		//Bend down
		var deltaHandRight = kinectPoint.sw.bonePos[0,11].z - initHandRight;
	//	Debug.Log("" + kinectPoint.sw.bonePos[0,11].y + ", " + kinectPoint.sw.bonePos[0,16].y);
		if(deltaHandRight > GRAB2){
			pickupObject.setGrab();
		} else if( deltaHandRight < GRAB2 && (kinectPoint.sw.bonePos[0,11].y < kinectPoint.sw.bonePos[0,16].y)){
			pickupObject.setNotGrab();
		}
		// Throwing
		var deltaThrow = 0.0;
		var throwTime = 0.0;
		var throwAmount = 0.0;
		if(handYPosPrevFrame != 0){
			deltaThrow = kinectPoint.sw.bonePos[0,11].y - handYPosPrevFrame;
			if(deltaThrow > maxDelta) maxDelta = deltaThrow;
			handYPosPrevFrame = kinectPoint.sw.bonePos[0,11].y;
//			Debug.Log(deltaThrow);
		} else {
			handYPosPrevFrame = kinectPoint.sw.bonePos[0,11].y;
		}
		if(isThrow == 0 && deltaThrow > THROW_THR){
//			Debug.Log("Start check for throw");
			isThrow = 1;
			initThrowYPos = kinectPoint.sw.bonePos[0,11].y;
			initThrowTime = Time.frameCount;
			throwTime = 0.0;
			throwAmount = 0.0;
		} else if (isThrow == 1 && deltaThrow <= THROW_THR){
//			Debug.Log("Stop check for Throw");
			isThrow = 0;
			throwAmount = kinectPoint.sw.bonePos[0,11].y - initThrowYPos;
			throwTime = Time.frameCount - initThrowTime;
		}
		if(throwAmount > 0.0 && throwTime > 0.0){
			pickupObject.setThrow(throwAmount, throwTime);
			throwTime = 0.0;
			throwAmount = 0.0;
		} else {
			pickupObject.setNotThrow();
		}
		
		// Rotate
		var leftShoulderZ = kinectPoint.sw.bonePos[0,4].z;
		var rightShoulderZ = kinectPoint.sw.bonePos[0,8].z;
	//	Debug.Log("" + leftShoulderZ + ", " + rightShoulderZ);
		var rotateSpeed = 0;
		var shoulderDiff = leftShoulderZ - rightShoulderZ;
		if(shoulderDiff < -DIFF){
			rotateSpeed = rotationConstant + shoulderDiff*rotationCoefficient; // should be value < 0
		} else if(shoulderDiff > DIFF) {
			rotateSpeed = -rotationConstant + shoulderDiff*rotationCoefficient; // should be value > 0
		}
		if(onlySideMovement == 1)
		{
		rotateSpeed = 0;
		}
		var rotVect = Vector3.up * Time.deltaTime * rotateSpeed;
		transform.Rotate(rotVect);
	} else {
		directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	}
	if (directionVector != Vector3.zero) {
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		directionLength = Mathf.Min(movementMinima, directionLength);
		directionLength = directionLength * directionLength;
		directionVector = directionVector * (directionLength * movementSlowDownCoef);
	}

	motor.inputMoveDirection = transform.rotation * directionVector;
}

function setCanMove(moves : int){
	canMove = moves;
	if(moves == 0){
		motor.inputMoveDirection = Vector3(0,0,0);
	}
}

function setEndOfGame() {
	endOfGame = 1;
}

function setOnlySideMove(sideMove : int){
	onlySideMovement = sideMove;
}


@script RequireComponent (CharacterMotor)
@script RequireComponent (KinectPointController)
@script AddComponentMenu ("Character/FPS Input Controller")
