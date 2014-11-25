using UnityEngine;
using System.Collections;

public class PickupObject : MonoBehaviour {
	GameObject mainCamera;
	bool carrying;
	GameObject carriedObject;
	public float distance;
	public float smooth;
	public bool grab;

	public void setGrab(){
		grab = true;
	}

	public void setNotGrab(){
		grab = false;
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
		if (grab) {
			int x = Screen.width / 2;
			int y = Screen.height / 4;
			
			Ray ray = mainCamera.camera.ScreenPointToRay(new Vector3(x,y));
			RaycastHit hit;
			if(Physics.Raycast(ray, out hit)) {
				Pickupable p = hit.collider.GetComponent<Pickupable>();
				if(p != null){
					carrying = true;
					carriedObject = p.gameObject;
					p.gameObject.rigidbody.isKinematic = true;
				}
			}
		}
	}

	void checkDrop() {
		if (!grab) {
			dropObject();
		}
	}

	void dropObject() {
		carrying = false;
		carriedObject.gameObject.rigidbody.isKinematic = false;
		carriedObject = null;
	}
}
