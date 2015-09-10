#pragma strict

var foo:MainScript;

function Start () {
	foo = FindObjectOfType(MainScript);
}

function Update () {
	var player:GameObject = foo.Players[foo.LocalPlayerName];
	if(foo.LocalPlayerName != null && player != null) {
		// Ensure camera is a child to the player
		if(gameObject.transform.parent != player.transform) {
			gameObject.transform.parent = player.transform;
		}
	}
}