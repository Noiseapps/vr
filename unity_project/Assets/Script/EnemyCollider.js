#pragma strict

private var e2 : GameObject = null;
private var player : FPSInputController = null;
private var rotatingBlock : RotateAndBounceLikeCrazy = null;

function Update() {

}

function OnTriggerEnter (other : Collider){
	if(other.tag.Equals("Flame")){
		
		Debug.Log("Flame collided with cube");
		
		this.gameObject.SetActive(false);

		other.gameObject.transform.position = Vector3(-1,1,20);
		other.gameObject.rigidbody.velocity = Vector3.zero;
		
		var soundSource : SoundSource = other.GetComponent(SoundSource);
		soundSource.playSound();
		
		if(this.gameObject.name == "Enemy1") {
			e2 = GameObject.Find("Enemy2");
			
			Debug.Log("2nd enemy: " + e2);
			
			rotatingBlock = e2.GetComponent("RotateAndBounceLikeCrazy");
			rotatingBlock.setStartCoordinates(5.5,1,14);
			rotatingBlock.setSpeeds(150, 90, 200);
			Debug.Log("moving the 2nd enemy");
				
		} else if(this.gameObject.name == "Enemy2") {
			// END GAME
			player = GameObject.Find("First Person Controller").GetComponent(FPSInputController);
			player.transform.localPosition.x = 11;
			player.transform.localPosition.y = 1;
			player.transform.localPosition.z = 28.5;
			player.setEndOfGame();
			
			var cam : GameObject = GameObject.Find("Camera");
			cam.gameObject.SetActive(false);
			
			var sound : BackgroundSound = GameObject.Find("First Person Controller").GetComponent(BackgroundSound);
			sound.playEndingSong();
		}
	}
}