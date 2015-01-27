private var motor : CharacterMotor;
var kinectPoint : KinectPointController;
var pickupObject : PickupObject;
var deltaV : double;
var deltaSR : double;  // delta for side movement right
var deltaSL : double;  // delta for side movement left
var handYPosPrevFrame : double = 0;
private var isThrow : int = 0;
private var hasKinect : int = 0;
private var initThrowYPos : double;
private var initThrowTime : float;
private var canMove : int = 1;
private var endOfGame : int = 0;
private var isAfterFirstRoom : int = 0;
private var onlySideMovement : int = 0;

private var spellCast : int = 0;
private var isSpellCharging : int = 0;
private var spellThrowFrameStart : int = 0;

private var handRightPrevFrame : float;
private var handLeftPrevFrame : float;
private var handRightInitFrame : float;
private var handLeftInitFrame : float;
function Awake () {
	motor = GetComponent(CharacterMotor);
	kinectPoint = this.GetComponent(KinectPointController);
	pickupObject = this.GetComponent(PickupObject);
}

function Start () {
	deltaV = kinectPoint.sw.bonePos[0,19].z;
	deltaSR = kinectPoint.sw.bonePos[0,19].x;
	deltaSL = kinectPoint.sw.bonePos[0,15].x;
	handRightPrevFrame = kinectPoint.sw.bonePos[0,11].z;
	handLeftPrevFrame = kinectPoint.sw.bonePos[0,7].z;
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
		// Gesture to leave first room
		if(onlySideMovement == 1)
		{
			if(kinectPoint.sw.bonePos[0,11].y > kinectPoint.sw.bonePos[0,3].y && kinectPoint.sw.bonePos[0,7].y > kinectPoint.sw.bonePos[0,3].y)
			{
				// remember to drop the ball before leaving !
				var object : GameObject = GameObject.FindGameObjectWithTag("Player");
				var objectToGrab : GameObject = GameObject.FindGameObjectWithTag("Ball1");
				var p : Pickupable = objectToGrab.GetComponent(Pickupable);
				pickupObject = object.GetComponent(PickupObject);
				pickupObject.dropAndLeave();
				object.transform.position = Vector3(-6,0.7,0);
				object.transform.eulerAngles = Vector3(0,180,0);
				setOnlySideMove(0);
			}
		}
		var tempDeltaX = (kinectPoint.sw.bonePos[0,15].x - deltaSL) + (kinectPoint.sw.bonePos[0,19].x - deltaSR);
		tempDeltaX = tempDeltaX / sideMovementSensitivityCoef;
		
		var tempDeltaV = kinectPoint.sw.bonePos[0,19].z - deltaV;
		tempDeltaV = tempDeltaV / movementSensitivityCoef;
		if(onlySideMovement == 1)
		{
			tempDeltaV = 0; 
		}
		directionVector = new Vector3(tempDeltaX, 0, tempDeltaV);
		
//		Debug.Log(spellCast + " | " + isSpellCharging + " | " + isAfterFirstRoom);
		
		if(isAfterFirstRoom == 1){
			var wristLeft : Vector3 = kinectPoint.sw.bonePos[0,7];
			var wristRight : Vector3 = kinectPoint.sw.bonePos[0,11];
			var hip : Vector3 = kinectPoint.sw.bonePos[0,17];
			Debug.Log(wristRight + " : " + wristLeft + " : " + hip);
//			Debug.Log(spellCast + " ; " + isSpellCharging);
//			Debug.Log((wristRight.x > hip.x) + " | " + (wristLeft.x > hip.x) + " | " + (wristRight.z > hip.z) + " | " + (wristLeft.z > hip.z));
			if(spellCast == 0 && 
			wristRight.x > hip.x &&
			wristLeft.x > hip.x && 
			wristRight.z <= hip.z && 
			wristLeft.z <= hip.z){
//				Debug.Log(kinectPoint.sw.bonePos[0,11].x + ", " + kinectPoint.sw.bonePos[0,17].x + " | " + kinectPoint.sw.bonePos[0,7].x + ", " + kinectPoint.sw.bonePos[0,17].x);
//				Debug.Log("I'm a Fireball");
				spellCast = 1;
				
				handRightPrevFrame = wristRight.z;
				handLeftPrevFrame = wristLeft.z;
				handRightInitFrame = wristRight.z;
				handLeftInitFrame = wristLeft.z;
				
//				Debug.Log(handRightPrevFrame + ", " + handLeftPrevFrame + " | " + handRightInitFrame + ", " + handLeftInitFrame);
				var fireball : GameObject = GameObject.FindGameObjectWithTag("Flame");
				var pick : Pickupable = fireball.GetComponent(Pickupable);
				Debug.Log(pick);
				
//				pickupObject.setThrowSpellParams(0, 100);
				pickupObject.forcePickup(pick);
				pickupObject.setSpellStopThrow();
			} 
			if(spellCast == 1){
				var rightHandChange : float = wristRight.z - handRightPrevFrame;
				var leftHandChange : float = wristLeft.z - handLeftPrevFrame;
				handRightPrevFrame = wristRight.z;
				handLeftPrevFrame = wristLeft.z;
				if(isSpellCharging == 0 && rightHandChange > THROW_THR && leftHandChange > THROW_THR){
					isSpellCharging = 1;
					handRightPrevFrame = wristRight.z;
					handLeftPrevFrame = wristLeft.z;
					spellThrowFrameStart = Time.frameCount;
//					Debug.Log("Spell is charging");
				} 
//				Debug.Log(rightHandChange + " {} " + leftHandChange);
				if(isSpellCharging == 1 && (Mathf.Abs(rightHandChange) < THROW_THR && Mathf.Abs(leftHandChange) < THROW_THR)){
					var spellThrowFrameStop : int = Time.frameCount;
					var depthChangeDistance : float = ((wristRight.z - handRightInitFrame) + (wristLeft.z - handLeftInitFrame))/2;
					var frames : int = spellThrowFrameStop - spellThrowFrameStart;
					var speed = depthChangeDistance / frames;
					Debug.Log(depthChangeDistance + " | " + frames); 
					Debug.Log("KAMEHAMEHAMEHAAA with speed : " + (speed * 1000));
					pickupObject.setThrowSpell(speed * 1000);
					isSpellCharging = 0;
					spellCast = 0;
				}
			}		
		} else {
			// Throwing ball
			var deltaThrow = 0.0;
			var throwTime = 0.0;
			var throwAmount = 0.0;
			if(handYPosPrevFrame != 0){
				deltaThrow = kinectPoint.sw.bonePos[0,11].y - handYPosPrevFrame;
				handYPosPrevFrame = kinectPoint.sw.bonePos[0,11].y;
	//			Debug.Log(deltaThrow);
			} else {
				handYPosPrevFrame = kinectPoint.sw.bonePos[0,11].y;
			}
			if(isThrow == 0 && deltaThrow > THROW_THR){
				isThrow = 1;
				initThrowYPos = kinectPoint.sw.bonePos[0,11].y;
				initThrowTime = Time.frameCount;
				throwTime = 0.0;
				throwAmount = 0.0;
			} else if (isThrow == 1 && deltaThrow <= THROW_THR){
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
		if(onlySideMovement == 1 || canMove == 0)
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
	
	if(canMove == 0) return;
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

function moveToSecondRoom(){
	isAfterFirstRoom = 1;
}


@script RequireComponent (CharacterMotor)
@script RequireComponent (KinectPointController)
@script AddComponentMenu ("Character/FPS Input Controller")
