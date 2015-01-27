#pragma strict

var clip : AudioClip;
private var source : AudioSource;

function Awake () {
	source = GetComponent(AudioSource);
}

function playSound(){
	source.PlayOneShot(clip, .8f);
}