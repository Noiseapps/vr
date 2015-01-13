#pragma strict
private var player : FPSInputController;

function OnTriggerEnter (other : Collider){
	if(other.tag.Equals("Player")){
		this.gameObject.SetActive(false); // co to ?
		var object : GameObject = GameObject.FindGameObjectWithTag("Player");
		Debug.Log(object);
		Debug.Log("below an object in FPSInputController");
		object.transform.position = Vector3(-2.5,0.7,0);
		object.transform.eulerAngles = Vector3(0,0,0);
		player = object.GetComponent(FPSInputController);
		player.setOnlySideMove(1);
	}
}


function Start () {

}

function Update () {

}