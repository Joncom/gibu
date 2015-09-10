#pragma strict

var foo:MainScript;

function Start () {
	foo = FindObjectOfType(MainScript);
}

function Update () {
	var player:GameObject = foo.Players[foo.LocalPlayerName];
	if(foo.LocalPlayerName != null && player != null) {
		gameObject.transform.position.x = player.transform.position.x;
		gameObject.transform.position.z = player.transform.position.z;
	}
}