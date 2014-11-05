#pragma strict

function OnTriggerEnter (other : Collider){
	if(other.name.Equals("RotateBox")){
		other.gameObject.SetActive(false);
		var object : GameObject = GameObject.FindGameObjectWithTag("push");
//		object.active = false;
		object.rigidbody.constraints = RigidbodyConstraints.None;
	}
}