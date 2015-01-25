#pragma strict
private var player : FPSInputController;
public var objectToGrabTag : String;

function OnTriggerEnter (other : Collider){
	if(other.tag.Equals("Player")){
		this.gameObject.SetActive(false);
		var object : GameObject = GameObject.FindGameObjectWithTag("Player");
		Debug.Log(object);
		object.transform.position = Vector3(0,0.7,15);
		object.transform.eulerAngles = Vector3(0,90,0);
		player = object.GetComponent(FPSInputController);
		player.setCanMove(0);
		player.moveToSecondRoom();
		
//		var objectToGrab : GameObject = GameObject.FindGameObjectWithTag(objectToGrabTag);
//		var p : Pickupable = objectToGrab.GetComponent(Pickupable);
//		Debug.Log(p);
//		
//		var pickupObject : PickupObject = object.GetComponent(PickupObject);
//		pickupObject.setThrowSpellParams(0, 100);
//		pickupObject.forcePickup(p);
	}
}
