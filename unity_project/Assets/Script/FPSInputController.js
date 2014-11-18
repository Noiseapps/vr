private var motor : CharacterMotor;
var kinectPoint : KinectPointController;
var deltaH : double;
var deltaV : double;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	kinectPoint = this.GetComponent(KinectPointController);
}

function Start () {
	deltaH = kinectPoint.sw.bonePos[0,6].x;
	deltaV = kinectPoint.sw.bonePos[0,19].z;
	Debug.Log(deltaH + " , " + deltaV);
}

// Update is called once per frame
function Update () {
	// Get the input vector from kayboard or analog stick
	var tempDeltaH = kinectPoint.sw.bonePos[0,6].x - deltaH;
	var tempDeltaV = kinectPoint.sw.bonePos[0,19].z - deltaV;
	Debug.Log(tempDeltaH + " , " + tempDeltaV);
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
	
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = transform.rotation * directionVector;
	motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
