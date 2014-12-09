#pragma strict

//var peg1 : String = "";
var pickupObject : PickupObject;

function Awake() {
//	player = this.GetComponent<PickupObject>();
	var player = GameObject.FindWithTag("Player");
	pickupObject = player.GetComponent(PickupObject);
}

function OnTriggerEnter (other : Collider){
	if(other.tag.Equals("Ball1")){
//		other.gameObject.SetActive(false);
		//this.gameObject.SetActive(false);
		//var object : GameObject = GameObject.FindGameObjectWithTag(door);
		//object.active = false;
//		object.rigidbody.constraints = RigidbodyConstraints.None;

		//other.transform.position = Vector3(-2.76, 0.4, 1.1);
		
		//player = GameObject.FindWithTag("Player");
		//player.forcePickup(other);

		//pickupObject.forcePickup(other);
		
		other.gameObject.rigidbody.isKinematic = false;
		other.gameObject.rigidbody.velocity = Vector3.zero;
		other.gameObject.rigidbody.isKinematic = true;
		
		/*var step = 0.01 * Time.deltaTime;
		var peg : GameObject = GameObject.Find("Cylinder1");
		peg.transform.position = Vector3.MoveTowards(peg.transform.position, 
			Vector3(peg.transform.position.x, 2, peg.transform.position.z), step); */
		

	}
}