#pragma strict

private var source : AudioSource;
var clip : AudioClip;
var fireBall : AudioClip;
var ending : AudioClip;

function Awake () {
	source = GetComponent(AudioSource);
	source.loop = true;
}

function Start() {
	source.volume = .3f;
	source.PlayOneShot(clip, .2f);
}

function playFireBall(){
source.Stop();
source.clip = fireBall;
source.Play(0);
}

function playEndingSong(){
	source.Stop();
	source.clip = ending;
	source.Play(0);
}