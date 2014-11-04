#pragma strict

var minTime : float = 1.0;
var maxTime : float = 2.0;

function Start () {
}

function Update () {
	Flicker();
}

function Flicker(){
	light.enabled = true;
	var rand : float = Random.Range(minTime, maxTime);
	Debug.Log(rand);
	yield WaitForSeconds(rand);
	light.enabled = false;
	rand = Random.Range(minTime, maxTime);
	Debug.Log(rand);
	yield WaitForSeconds(rand);
}