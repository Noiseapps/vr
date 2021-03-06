﻿using UnityEngine;
using System.Collections;

public class PickupObject : MonoBehaviour {
	GameObject mainCamera;
	bool carrying;
	GameObject carriedObject;
	public float distance;
	public float smooth;
	private bool grab;
	private bool isThrow;
	private bool isSpellThrown;
	private bool hasKinect = false;
	private double amount, speed, spellAmount, spellSpeed;
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

	public void setThrowSpellParams(double mAmount, double mSpeed){
		spellAmount = mAmount;
		spellSpeed = mSpeed;
	}

	public void setThrowSpell(double speed){
		isSpellThrown = true;
		spellSpeed = speed;
	}

	public void setSpellStopThrow(){
		isSpellThrown = false;
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
		setGrab();
		carrying = true;
		carriedObject = p.gameObject;
		Debug.Log (carriedObject);
		
		carriedObject.gameObject.rigidbody.isKinematic = false;
		carriedObject.gameObject.rigidbody.transform.position = new Vector3(-1.7f, 4f, 17f);
		carriedObject.gameObject.rigidbody.velocity = Vector3.zero;
		carriedObject.gameObject.rigidbody.isKinematic = true;
	}

	void checkDrop() {
		if (!grab) {
			dropObject();
		}
	}

	void checkThrow(){
		if (isThrow || Input.GetKeyDown(KeyCode.E)) throwObject ();
		else if (isSpellThrown || Input.GetKeyDown(KeyCode.F)) throwSpell();
	}

	void throwObject(){
		throwFrame = Time.frameCount;
		carriedObject.gameObject.rigidbody.isKinematic = false;
		Pickupable p = carriedObject.GetComponent<Pickupable>();
		p.playSound();
		Vector3 throwDirection = Vector3.Scale (new Vector3(transform.forward.x, 1f, transform.forward.z), new Vector3((float)(750f/speed), (float)(500f*amount), (float)(750f/speed)));
		Debug.Log ("Throw : " + throwDirection + " from speed: " + speed + ", amount: " + amount);
		carriedObject.gameObject.rigidbody.AddForce(throwDirection);
		carrying = false;
		carriedObject = null;
	}

	void throwSpell() {
		throwFrame = Time.frameCount;
		if(carriedObject.tag.Equals("Flame")){
			carriedObject.gameObject.rigidbody.isKinematic = false;
			Pickupable p = carriedObject.GetComponent<Pickupable>();
			p.playSound();
			Vector3 throwDirection = Vector3.Scale (new Vector3(1f, 1f, 1f), 
			                                        new Vector3((float)spellSpeed, 0, 0));
			//Debug.Log ("Throw : " + throwDirection + " from speed: " + speed + ", amount: " + amount);
			carriedObject.gameObject.rigidbody.AddForce(throwDirection);
			carrying = false;
			carriedObject = null;
		}
	}

	void dropObject() {
		carrying = false;
		carriedObject.gameObject.rigidbody.isKinematic = false;
		carriedObject = null;
	}

	public void dropAndLeave() {
		carrying = false;
		carriedObject = null;
	}
}
