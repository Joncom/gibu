#pragma strict

import SocketIO;

var PlayerPrefab:GameObject;
var Players:Hashtable = new Hashtable();

var json:Hashtable = /*JSON[*/{
    "layer": [
        {
            "name": "main",
            "width": 32,
            "height": 24,
            "linkWithCollision": true,
            "visible": 1,
            "tilesetName": "media/tilesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 16,
            "foreground": false,
            "data": [
                [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
            ]
        }
    ]
}/*]JSON*/;

//var speed:float = 2.0;

var tileMaterials:Hashtable = {
    2: null,
    3: null
};

var tileColors:Hashtable = {
    2: null,
    3: null
};

var socket:SocketIOComponent;

function Start () {
    Application.runInBackground = true;

    var shaderText =
        "Shader \"Alpha Additive\" {" +
        "Properties { _Color (\"Main Color\", Color) = (1,1,1,0) }" +
        "SubShader {" +
        "    Tags { \"Queue\" = \"Transparent\" }" +
        "    Pass {" +
        "        Blend One One ZWrite Off ColorMask RGB" +
        "        Material { Diffuse [_Color] Ambient [_Color] }" +
        "        Lighting On" +
        "        SetTexture [_Dummy] { combine primary double, primary }" +
        "    }" +
        "}" +
        "}";
    tileMaterials[2] = new Material(shaderText);
    tileMaterials[3] = new Material(shaderText);
    tileColors[2] = new Color(0xA0 / 255.0, 0xD0 / 255.0, 0xC0 / 255.0, 1);
    tileColors[3] = new Color(0x18 / 255.0, 0xA0 / 255.0, 0x68 / 255.0, 1);

    var layers:Array;
    for(var key:String in json.Keys) {
        if(key === 'layer') {
            print('Found layers array');
            layers = json[key];
            break;
        }
    }
    var mainLayer:Hashtable;
    var layerData:Array;
    for(var i=0; i<layers.length; i++) {
        var layer:Hashtable = layers[i];
        if(layer['name'] === 'main') {
            print('Found main layer');
            mainLayer = layer;
            break;
        }
    }
    var width:int = mainLayer['width'];
    var height:int = mainLayer['height'];
    var data:Array = mainLayer['data'];
    for(var y=0; y<height; y++) {
        var innerArray:Array = data[y];
        for(var x=0; x<width; x++) {
            var tile:int = innerArray[x];
            var floorTile:boolean = (tile == 2);
            var cube:GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
            cube.transform.position = Vector3(x, (floorTile ? -1.0 : 1.0) * 0.5, -y);
            cube.GetComponent.<Renderer>().material = tileMaterials[tile];
            cube.GetComponent.<Renderer>().material.color = tileColors[tile];
        }
    }

    var go:GameObject = gameObject.Find('SocketIO');
    socket = go.GetComponent.<SocketIOComponent>();
    socket.On('connect', OnConnect);
    socket.On('disconnect', OnDisconnect);
    socket.On('info', OnInfo);
    socket.On('snapshot', OnSnapshot);
    socket.On('ping', OnPing);

    Destroy(gameObject);
}

function OnConnect() {
    Debug.Log('Connected');

    // Send name to server.
    var random:int = Mathf.Floor(Random.value * 1000);
    var name:String = 'Player' + random;
    socket.Emit('init', name);
}

function OnDisconnect() {
    Debug.Log('Disconnected');
    socket.Close();
}

function OnInfo(e:SocketIOEvent) {
    Debug.Log('Received Info: ' + e.data);
}

function OnSnapshot(e:SocketIOEvent) {
    //Debug.Log('Received Snapshot: ' + e.data);

    /*
    // Create list of entities to MAYBE remove.
    var entities_to_remove = {};
    ig.game.entities.forEach(function(entity) {

        // Only consider entites with names.
        if(entity.name) {
            entities_to_remove[entity.name] = entity;
        }
    });
    */

    // Remove any player prefabs which are present in snapshot
    // ...

    var tilesize = 16;
    var snapshot = e.data;
    var foo = snapshot['entities'];
    //print(foo);
    for(var type in foo.keys) {
        //print(type);
        var entities = foo[type];
        for(var name in entities.keys) {
            //print(name);
            var entity = entities[name];
            //print(entity);
            if(type == 'EntityPlayer') {
                //print(name);
                if(Players[name] == null) {
                    //print('player needs spawning');
                    var pos = entity['pos'];
                    var x:float = pos['x'].n / tilesize;
                    var y:float = pos['y'].n / tilesize;
                    //print(x);
                    var vector = Vector3(x, 0.5, -y);
                    print('spawning player');
                    var player = Instantiate(PlayerPrefab, vector, Quaternion.identity);
                    Players[name] = player;
                }
            }
        }
    }
}

function OnPing(e:SocketIOEvent) {
    Debug.Log('Received ping: ' + e.data);
    var uuid = e.data;
    socket.Emit('pong', uuid);
}