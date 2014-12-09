#pragma strict

private var mainCamera : GameObject;
private var carrying : boolean;
private var carriedObject : GameObject;
var distance : double;
var smooth : double;
private var ray : Ray;
private var hit : RaycastHit;
private var p : Pickupable;

function Start () {
	mainCamera = GameObject.FindWithTag ("MainCamera");
	Debug.Log ("Pick The Object in js !");
}

function Update () {
	if (carrying) {
		carry(carriedObject);
		checkDrop();
	} else {
		pickup();
	}
}

function carry (cO : GameObject) {
	cO.transform.position = Vector3.Lerp (cO.transform.position, mainCamera.transform.position +
		                                     mainCamera.transform.forward * distance, Time.deltaTime * smooth);
}

function pickup () {
	if (Input.GetKeyDown (KeyCode.E)) {
		var x = Screen.width / 2;;
		var y = Screen.height / 2;	
		ray = mainCamera.camera.ScreenPointToRay(new Vector3(x,y));
		if(Physics.Raycast(ray, hit)) {
			p = hit.collider.GetComponent(Pickupable);
			if(p != null){
				carrying = true;
				carriedObject = p.gameObject;
				p.gameObject.rigidbody.isKinematic = true;
			}
		}
	}
}

function checkDrop () {
	if (Input.GetKeyDown (KeyCode.E)) {
		dropObject();
	}
}

function dropObject () {
	carrying = false;
	carriedObject.gameObject.rigidbody.isKinematic = false;
	carriedObject = null;
}

