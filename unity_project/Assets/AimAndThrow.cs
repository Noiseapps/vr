using UnityEngine;
using System.Collections;

public class AimAndThrow : MonoBehaviour {

	public Vector3 ShoulderRight; 
	public Vector3 ElbowRight; 
	public Vector3 WristRight;
	public Vector3 HandRight; 
	public Vector3 ShoulderLeft; 
	public Vector3 ElbowLeft; 
	public Vector3 WristLeft;
	public Vector3 HandLeft; 
	public Vector3 Head; 
	public Vector3 ShoulderCenter;
	public Vector3 Spine;
	public Vector3 HipCenter;

	
	public Vector3[] SRhistory;
	public Vector3[] ERhistory;
	public Vector3[] WRhistory;
	public Vector3[] HRhistory;
	public Vector3[] SLhistory;
	public Vector3[] ELhistory;
	public Vector3[] WLhistory;
	public Vector3[] HLhistory;
	public Vector3[] SpineHistory;
	public Vector3[] SCHistory;
	public Vector3[] HeadHistory;
	public Vector3[] HCHistory;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
