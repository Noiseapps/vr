using UnityEngine;
using System.Collections;

public class Pickupable : MonoBehaviour {
	// Use this for initialization

	private AudioSource source;
	public AudioClip clip;

	void Awake () {
		source = GetComponent<AudioSource>();
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void playSound(){
		float val = Random.Range(.5f, 1f);
		source.PlayOneShot(clip, val);
		Debug.Log("THROOOOOW");
	}
}
