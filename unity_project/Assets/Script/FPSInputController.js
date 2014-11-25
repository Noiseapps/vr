private var motor : CharacterMotor;
var kinectPoint : KinectPointController;
var deltaV : double;
var deltaShCent : double;
var initShCent : double;

function Awake () {
	motor = GetComponent(CharacterMotor);
	kinectPoint = this.GetComponent(KinectPointController);
}

function Start () {
	deltaV = kinectPoint.sw.bonePos[0,19].z;
	initShCent = kinectPoint.sw.bonePos[0,3].y;
}

var diffConst2 = 0.2;
var bendConst = -0.5;

function Update () {
	// Set initial points
	if(deltaV == 0) {
		deltaV = kinectPoint.sw.bonePos[0,19].z;
	}
	if(initShCent == 0) {
		initShCent = kinectPoint.sw.bonePos[0,3].y;
	}
	
	// Assign movement vector
	var tempDeltaV = kinectPoint.sw.bonePos[0,19].z - deltaV;
	var directionVector = new Vector3(0, 0, tempDeltaV);
	
	if (directionVector != Vector3.zero) {
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		directionLength = Mathf.Min(1, directionLength);
		directionLength = directionLength * directionLength;
		directionVector = directionVector * directionLength;
	}
	
	//Bend down
	deltaShCent = kinectPoint.sw.bonePos[0,3].y - initShCent;
	if(deltaShCent < bendConst){
		Debug.Log("Bend down");
	} 
	
	// Rotate
	var leftShoulderZ = kinectPoint.sw.bonePos[0,4].z;
	var rightShoulderZ = kinectPoint.sw.bonePos[0,8].z;
	var rotateSpeed = 0;
	var shoulderDiff = leftShoulderZ - rightShoulderZ;
	if(shoulderDiff < -diffConst2){
		rotateSpeed = -50;
	} else if(shoulderDiff > diffConst2) {
		rotateSpeed = 50;
	}
	var rotVect = Vector3.up * Time.deltaTime * rotateSpeed;
	transform.Rotate(rotVect);
	motor.inputMoveDirection = transform.rotation * directionVector;
}

@script RequireComponent (CharacterMotor)
@script RequireComponent (KinectPointController)
@script AddComponentMenu ("Character/FPS Input Controller")
