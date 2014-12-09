using UnityEngine;
using System.Collections;

public class PickupObject : MonoBehaviour {
	GameObject mainCamera;
	bool carrying;
	GameObject carriedObject;
	public float distance;
	public float smooth;
	private bool grab;
	private bool isThrow;
	private bool hasKinect = true;
	private double amount, speed;
	private int throwFrame;
//	AudioClip pick;

	public void setGrab(){
		grab = true;
	}

	public void setNotGrab(){
		grab = false;
	}

	public void setThrow(double mAmount, double mSpeed){
		isThrow = true;
		amount = mAmount;
		speed = mSpeed;
	}
	
	public void setNotThrow(){
		isThrow = false;
		amount = 0;
		speed = 0;
	}
	
	// Use this for initialization
	void Start () {
		mainCamera = GameObject.FindWithTag ("MainCamera");
		grab = false;
	}
	
	// Update is called once per frame
	void Update () {
		if (carrying) {
			carry(carriedObject);
			checkDrop();
			checkThrow();
		} else {
			pickup();
		}
	}


	void carry(GameObject o){

		//o.transform.position = mainCamera.transform.position + mainCamera.transform.forward * distance;
		o.transform.position = Vector3.Lerp (o.transform.position, mainCamera.transform.position +
		                                     mainCamera.transform.forward * distance, Time.deltaTime * smooth);
	}
	
	void pickup() {
		if (grab && (Time.frameCount - throwFrame) > 25) {
			int x = Screen.width / 2;
			int y = Screen.height / 4;
			Ray ray = mainCamera.camera.ScreenPointToRay(new Vector3(x,y));
			RaycastHit hit;
			if(Physics.Raycast(ray, out hit)) {
				Pickupable p = hit.collider.GetComponent<Pickupable>();
				if(p != null){
//					audio.PlayOneShot(pick);
					carrying = true;
					carriedObject = p.gameObject;
					p.gameObject.rigidbody.isKinematic = true;
				}
			}
		}
	}

	public void forcePickup(Pickupable p) {
		carrying = true;
		carriedObject = p.gameObject;
		p.gameObject.rigidbody.isKinematic = true;
	}

	void checkDrop() {
		if (!grab) {
			dropObject();
		}
	}

	void checkThrow(){
		if (isThrow) {
			throwObject ();
		}
	}

	void throwObject(){
		throwFrame = Time.frameCount;
		carriedObject.gameObject.rigidbody.isKinematic = false;
		Vector3 throwDirection = Vector3.Scale (new Vector3(transform.forward.x, 1f, transform.forward.z), new Vector3((float)(750f/speed), (float)(500f*amount), (float)(750f/speed)));
		Debug.Log ("Throw : " + throwDirection + " from speed: " + speed + ", amount: " + amount);
		carriedObject.gameObject.rigidbody.AddForce(throwDirection);
		carrying = false;
		carriedObject = null;
	}

	void dropObject() {
		carrying = false;
		carriedObject.gameObject.rigidbody.isKinematic = false;
		carriedObject = null;
	}
}
