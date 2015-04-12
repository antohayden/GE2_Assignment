

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

    var ml, tl, loadTotal, loaded = 0;

    var jsonLoader = new THREE.JSONLoader();
    var textureLoader = new THREE.TextureLoader();

    var shipGeoms = [], shipMaterials = [];

    init();

    function init(){
        ml = models.length;
        tl = textures.length;
        loadTotal = ml + tl;

        loadShipGeometries();
        loadShipTextures();
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
    //create ship using random loaded material and mesh

    this.createShipMesh = function(){


        var mesh = new THREE.Mesh(
            shipGeoms[Math.floor(Math.random() * shipGeoms.length)],
            shipMaterials[Math.floor(Math.random() * shipMaterials.length)]
        );
        return mesh;
    };




};