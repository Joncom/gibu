using UnityEngine;
using System.Collections;

public class cube : MonoBehaviour {

	public float moveSpeed;

	// Use this for initialization
	void Start () {
		moveSpeed = 1f;
	}
	
	// Update is called once per frame
	void Update () {
		//print(Input.GetAxis("Horizontal"));	
		transform.Translate(
			Input.GetAxis("Horizontal") * moveSpeed * Time.deltaTime,
			0f,
			Input.GetAxis("Vertical") * moveSpeed * Time.deltaTime
		);
	}
}
