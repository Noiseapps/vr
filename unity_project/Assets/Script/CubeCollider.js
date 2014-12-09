#pragma strict

var door : String = "";

function OnTriggerEnter (other : Collider){
	if(other.tag.Equals("Player")){
//		other.gameObject.SetActive(false);
		this.gameObject.SetActive(false);
		var object : GameObject = GameObject.FindGameObjectWithTag(door);
		object.gameObject.SetActive(false);
		
		//		object.rigidbody.constraints = RigidbodyConstraints.None;
	}
}