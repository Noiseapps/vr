#pragma strict

private var e2 : GameObject = null;
private var player : FPSInputController = null;
private var rotatingBlock : RotateAndBounceLikeCrazy = null;

function Update() {
	/*if(fallDown == 1) {
		var step = 0.2 * Time.deltaTime;
		//var peg : GameObject = GameObject.Find("Cylinder1");
		var peg = this.gameObject;
		peg.transform.position = Vector3.MoveTowards(peg.transform.position, 
			Vector3(peg.transform.position.x, 2, peg.transform.position.z), step);
	}*/
	
	//if(box == null) {
	//	box = GameObject.Find("RotateBox");
		//box.renderer.enabled = false;
	//}

}

/*function grabFireball() {
		var objectToGrab : GameObject = GameObject.FindGameObjectWithTag(objectToGrabTag);
		var p : Pickupable = objectToGrab.GetComponent(Pickupable);
		Debug.Log("Spell locker on trigger enter: " + p);
		
		var pickupObject : PickupObject = object.GetComponent(PickupObject);
		pickupObject.setThrowSpellParams(0, 200);
		pickupObject.forcePickup(p);
}*/

function OnTriggerEnter (other : Collider){
	if(other.tag.Equals("Flame")){
//		other.gameObject.SetActive(false);
		//var flagContains : int = 0;
		
		Debug.Log("Flame collided with cube");
		
		this.gameObject.SetActive(false);
		other.gameObject.SetActive(false);
		
		if(this.gameObject.name == "Enemy1") {
			e2 = GameObject.Find("Enemy2");
			
			Debug.Log("2nd enemy: " + e2);
			
			rotatingBlock = e2.GetComponent("RotateAndBounceLikeCrazy");
			rotatingBlock.setStartCoordinates(5,1,14);
			rotatingBlock.setSpeeds(150, 90, 200);
			Debug.Log("moving the 2nd enemy");
				
		} else if(this.gameObject.name == "Enemy2") {
			// END GAME
			player = GameObject.Find("First Person Controller").GetComponent(FPSInputController);
			player.transform.localPosition.x = 11;
			player.transform.localPosition.y = 1;
			player.transform.localPosition.z = 28.5;
			player.setEndOfGame();
		}
		
		/*for(var i=0; i < cylindersHit.length; i++) {
			if(cylindersHit[i] == this.gameObject) {
				flagContains = 1;
				break;
			}
		}
		*/
		
		/*if(!flagContains) {
			cylindersHit[cylindersHit.length + 1] = (this.gameObject);
			
			cylinderCounter += 1;
			Debug.Log("counter: " + cylinderCounter + " | this: " + this.gameObject);
			
			//Debug.Log("counter > 5 ? : " + (cylinderCounter >= 5));
			if(cylinderCounter >= 5) {
				//box.renderer.enabled = true;
				box.transform.position = Vector3(-6, 1, -5.5);
				Debug.Log("moving the box");
			}			
			
			this.gameObject.SetActive(false);
		}*/
		//var object : GameObject = GameObject.FindGameObjectWithTag(door);
		//object.gameObject.SetActive(false);
		

//		object.rigidbody.constraints = RigidbodyConstraints.None;

		//fallDown = 1;
	}
}