private var motor : CharacterMotor;
var kinectPoint : KinectPointController;
var pickupObject : PickupObject;
var deltaV : double;
var initHandRight : double;

function Awake () {
	motor = GetComponent(CharacterMotor);
	kinectPoint = this.GetComponent(KinectPointController);
	pickupObject = this.GetComponent(PickupObject);
}

function Start () {
	deltaV = kinectPoint.sw.bonePos[0,19].z;
	initHandRight = kinectPoint.sw.bonePos[0,11].z;
}

var DIFF = 0.2;
var GRAB2 = 0.4;

function Update () {
	// Set initial points
	if(deltaV == 0) {
		deltaV = kinectPoint.sw.bonePos[0,19].z;
	}
	if(initHandRight == 0) {
		initHandRight = kinectPoint.sw.bonePos[0,11].z;
	}
	
	// Assign movement vector
	var tempDeltaV = kinectPoint.sw.bonePos[0,19].z - deltaV;
	var directionVector = new Vector3(0, 0, tempDeltaV);
//	var directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	if (directionVector != Vector3.zero) {
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		directionLength = Mathf.Min(1, directionLength);
		directionLength = directionLength * directionLength;
		directionVector = directionVector * directionLength;
	}
	
	//Bend down
	var deltaHandRight = kinectPoint.sw.bonePos[0,11].z - initHandRight;
	Debug.Log("" + kinectPoint.sw.bonePos[0,11].y + ", " + kinectPoint.sw.bonePos[0,16].y);
	if(deltaHandRight > GRAB2){
		pickupObject.setGrab();
	} else if( deltaHandRight < GRAB2 && (kinectPoint.sw.bonePos[0,11].y < kinectPoint.sw.bonePos[0,16].y)){
		pickupObject.setNotGrab();
	}
	
	// Rotate
	var leftShoulderZ = kinectPoint.sw.bonePos[0,4].z;
	var rightShoulderZ = kinectPoint.sw.bonePos[0,8].z;
	var rotateSpeed = 0;
	var shoulderDiff = leftShoulderZ - rightShoulderZ;
	if(shoulderDiff < -DIFF){
		rotateSpeed = -50;
	} else if(shoulderDiff > DIFF) {
		rotateSpeed = 50;
	}
	var rotVect = Vector3.up * Time.deltaTime * rotateSpeed;
	transform.Rotate(rotVect);
	motor.inputMoveDirection = transform.rotation * directionVector;
}

@script RequireComponent (CharacterMotor)
@script RequireComponent (KinectPointController)
@script AddComponentMenu ("Character/FPS Input Controller")
