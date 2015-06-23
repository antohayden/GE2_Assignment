

GAME.AssetManager = function(){

    var models = [
        {type: "Battle", path: "Assets/models/BattleShip.json"},
        {type: "Fighter", path: "Assets/models/FighterShip.json"},
        {type: "HeavyCruiser", path: "Assets/models/HeavyCruiserShip.json"},
        {type: "LightCruiser", path: "Assets/models/LightCruiserShip.json"},
        {type: "ShuttleShip", path: "Assets/models/ShuttleShip.json"}
    ];

    var textures = [
        {type: "Purple", path: "Assets/textures/Purple.png"},
        {type: "Green", path: "Assets/textures/Green.png"},
        {type: "Red", path: "Assets/textures/Red.png"},
        {type: "Blue", path: "Assets/textures/Blue.png"},
    ];

    var asteroidModels = [

        {type: "1", path: "Assets/models/asteroid.json"},
        {type: "1", path: "Assets/models/asteroid2.json"},
        {type: "1", path: "Assets/models/asteroid3.json"}
    ];

    var asteroidTextures = [

        {type: "1", path: "Assets/textures/Rock.jpg"},
        {type: "1", path: "Assets/textures/Rock2.jpg"},
        {type: "1", path: "Assets/textures/Rock3.jpg"}

    ];

    var loadTotal, loaded = 0;

    var jsonLoader = new THREE.JSONLoader();
    var textureLoader = new THREE.TextureLoader();

    var shipGeoms = [],
        shipMaterials = [],
        asteroidGeoms = [],
        asteroidMaterials = [];

    init();

    function init(){

        loadTotal =
        + models.length
        + textures.length
        + asteroidModels.length
        + asteroidTextures.length;

        loadShipGeometries();
        loadShipTextures();
        loadAsteroidGeometries();
        loadAsteroidTextures();
    };

    function createGlassMaterial(){

        var glass = new THREE.MeshPhongMaterial({
            opacity: 0.9,
            transparent: true,
            color: 0x111111,
            shading: THREE.SmoothShading
        });

        return glass;
    };

    function loadShipGeometries(){

        var modelTotal = models.length;

        for(var i = 0; i < modelTotal; i++){
            jsonLoader.load(models[i].path, function(geometry){
                shipGeoms.push(geometry);
                checkLoaded();
            });
        }
    }

    function loadShipTextures(){

        var materialTotal = textures.length;

        for(var i = 0; i < materialTotal; i++){

            textureLoader.load(textures[i].path, function(texture){
                shipMaterials.push(createShipMaterials(texture));
                checkLoaded();
            });
        }
    };

    function loadAsteroidTextures(){

        var materialTotal = asteroidTextures.length;

        for(var i = 0; i < materialTotal; i++){

            textureLoader.load(asteroidTextures[i].path, function(texture){
                asteroidMaterials.push(createAsteroidMaterials(texture));
                checkLoaded();
            });
        }
    };

    function createShipMaterials(texture){

        var materials = [];

        var shellMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            metal: true
        });

        materials.push(shellMaterial);
        materials.push(createGlassMaterial());

        return new THREE.MeshFaceMaterial(materials);

    };

    function loadAsteroidGeometries(){

        var asteroidLength = asteroidModels.length;

        for(var i = 0; i < asteroidLength; i++){
            jsonLoader.load(asteroidModels[i].path, function(geometry){
                asteroidGeoms.push(geometry);
                checkLoaded();
            });
        }
    }

    function createAsteroidMaterials(texture){

        return new THREE.MeshBasicMaterial({
            map : texture
        });

    };

    function checkLoaded(){

        loaded ++;

        if(loadTotal === loaded){
            $.event.trigger({
                type: "assetsLoaded"
            });
        }
    };

    /*
     * API
     * */
    //create ship using random loaded material and mesh if not provided

    this.createShipMesh = function(model, color){

        var geometry, material;

        if(!model)
            geometry = shipGeoms[Math.floor(Math.random() * shipGeoms.length)];
        else{
            for(var i in shipGeoms){
                if(models[i].type === model){
                    geometry = shipGeoms[i];
                    break;
                }
            }
            if(!geometry)
                geometry = shipGeoms[Math.floor(Math.random() * shipGeoms.length)];
        };


        if(!color)
            material = shipMaterials[Math.floor(Math.random() * shipMaterials.length)];
        else{
            for(var j in shipMaterials){
                if(textures[j].type === color){
                    material = shipMaterials[j];
                    break;
                }
            }
            if(!material)
                material = shipMaterials[Math.floor(Math.random() * shipGeoms.length)];
        };

        return new THREE.Mesh(geometry, material);
    };

    this.createAsteroid = function(scale){

        var geometry = asteroidGeoms[Math.floor(Math.random() * asteroidGeoms.length)];
        var material = asteroidMaterials[Math.floor(Math.random() * asteroidMaterials.length)];
        var m = new THREE.Mesh(geometry, material);
        m.scale.set(scale, scale, scale);
        return m;
    };





};