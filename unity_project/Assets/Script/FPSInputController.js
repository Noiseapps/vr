private var motor : CharacterMotor;
var kinectPoint : KinectPointController;
var deltaV : double;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	kinectPoint = this.GetComponent(KinectPointController);
}

function Start () {
	deltaV = kinectPoint.sw.bonePos[0,19].z;
}

var diffConst2 = 0.2;

// Update is called once per frame
function Update () {
	// Get the input vector from kayboard or analog stick
	var tempDeltaV = kinectPoint.sw.bonePos[0,19].z - deltaV;
	
	var directionVector = new Vector3(0, 0, tempDeltaV);
	
	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		
		// Make sure the length is no bigger than 1
		directionLength = Mathf.Min(1, directionLength);
		
		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
		// This makes it easier to control slow speeds when using analog sticks
		directionLength = directionLength * directionLength;
		
		// Multiply the normalized direction vector by the modified length
		directionVector = directionVector * directionLength;
	}
	
	var leftShoulderZ = kinectPoint.sw.bonePos[0,4].z;
	var rightShoulderZ = kinectPoint.sw.bonePos[0,8].z;
	var rotateSpeed = 0;
	var shoulderDiff = leftShoulderZ - rightShoulderZ;
	if(shoulderDiff < -diffConst2){
		rotateSpeed = -50;
	} else if(shoulderDiff > diffConst2) {
		rotateSpeed = 50;
	}
	Debug.Log(shoulderDiff + ", " + rotateSpeed + ", " + leftShoulderZ + ", " + rightShoulderZ);
	var rotVect = Vector3.up * Time.deltaTime * rotateSpeed;
	transform.Rotate(rotVect);
	motor.inputMoveDirection = transform.rotation * directionVector;
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
