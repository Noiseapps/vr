#pragma strict

var minTime : float = 0.1;
var maxTime : float = 1;
var busy : int = 0;

function Start () {
}

function Update () {
	if(busy == 0){
		Flicker();
	}
}

function Flicker(){
	busy = 1;
	light.enabled = true;
	var rand : float = Random.Range(minTime, maxTime);
	yield WaitForSeconds(rand);
	light.enabled = false;
	rand = Random.Range(minTime, maxTime);
	yield WaitForSeconds(rand);
	busy = 0;
}