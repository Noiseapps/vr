#pragma strict
private var player : FPSInputController;

function OnTriggerEnter (other : Collider){
	if(other.tag.Equals("Player")){
		this.gameObject.SetActive(false);
		var object : GameObject = GameObject.FindGameObjectWithTag("Player");
		Debug.Log(object);
		object.transform.position = Vector3(0,0.7,15);
		object.transform.eulerAngles = Vector3(0,0,0);
		player = object.GetComponent(FPSInputController);
		player.setCanMove(0);
	}
}
