
using UnityEngine;
using System.Collections;

public class FloorCollider : MonoBehaviour {
	PickupObject pickupObject;

	void Awake() {
	//	player = this.GetComponent<PickupObject>();
		GameObject player = GameObject.FindWithTag("Player");
		pickupObject = player.GetComponent<PickupObject>();
	}

	void OnTriggerEnter (Collider other){
		if(other.tag.Equals("Ball1")){
	//		other.gameObject.SetActive(false);
			//this.gameObject.SetActive(false);
			//var object : GameObject = GameObject.FindGameObjectWithTag(door);
			//object.active = false;
	//		object.rigidbody.constraints = RigidbodyConstraints.None;

			other.transform.position = new Vector3(-2.76f, 0.4f, 1.1f);
			
			//player = GameObject.FindWithTag("Player");
			//player.forcePickup(other);
			GameObject go = other.transform.gameObject;
			Debug.Log(go);
			Pickupable p = go.GetComponent<Pickupable>();
			pickupObject.forcePickup(p);
			
			other.gameObject.rigidbody.isKinematic = false;
			other.gameObject.rigidbody.velocity = Vector3.zero;
			other.gameObject.rigidbody.isKinematic = true;
			
			/*var step = 0.01 * Time.deltaTime;
			var peg : GameObject = GameObject.Find("Cylinder1");
			peg.transform.position = Vector3.MoveTowards(peg.transform.position, 
				Vector3(peg.transform.position.x, 2, peg.transform.position.z), step); */
			

		}
	}
}