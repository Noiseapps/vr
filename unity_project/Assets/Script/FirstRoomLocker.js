#pragma strict
private var player : FPSInputController;
public var objectToGrabTag : String;

function OnTriggerEnter (other : Collider){
	if(other.tag.Equals("Player")){
		this.gameObject.SetActive(false); // co to ?
		var object : GameObject = GameObject.FindGameObjectWithTag("Player");
		Debug.Log(object);
		Debug.Log("below an object in FPSInputController");
		object.transform.position = Vector3(-2.5,0.7,0);
		object.transform.eulerAngles = Vector3(0,90,0);
		player = object.GetComponent(FPSInputController);
		player.setOnlySideMove(1);
		
		var objectToGrab : GameObject = GameObject.FindGameObjectWithTag(objectToGrabTag);
		var p : Pickupable = objectToGrab.GetComponent(Pickupable);
		var pickupObject : PickupObject = object.GetComponent(PickupObject);
		pickupObject.forcePickup(p);
	}
}


function Start () {

}

function Update () {

}