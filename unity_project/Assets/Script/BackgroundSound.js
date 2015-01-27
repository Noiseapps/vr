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
	source.volume = .7f;
	source.PlayOneShot(clip, .2f);
}

function playFireBall(){
source.volume = .5f;
source.Stop();
source.clip = fireBall;
source.Play(0);
}

function playEndingSong(){
	source.volume = .7f;
	source.Stop();
	source.clip = ending;
	source.Play(0);
}