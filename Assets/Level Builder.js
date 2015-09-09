#pragma strict

import SocketIO;

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

function Start () {
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
    var socket:SocketIOComponent = go.GetComponent.<SocketIOComponent>();
    socket.On('connect', OnConnect);
    socket.On('disconnect', OnDisconnect);
    //socket.On('ping', OnPing); // FIXME: Doesn't work??
    //socket.Emit('pong');

    Destroy(gameObject);
}

function OnConnect() {
    Debug.Log('Connected');
}

function OnDisconnect() {
    Debug.Log('Disconnected');
}

function OnPing(uuid) {
    Debug.Log('Received ping!');
}