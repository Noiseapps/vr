#pragma strict

private var source : AudioSource;
var clip : AudioClip;
var fireBall : AudioClip;

function Awake () {
	source = GetComponent(AudioSource);
	source.loop = true;
}

function Start() {
	source.PlayOneShot(clip, .2f);
}


function playFireBall(){
source.Stop();
source.clip = fireBall;
source.Play(0);
}
function Update () {
	
}