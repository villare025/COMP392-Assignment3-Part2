/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = Physijs.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var LineBasicMaterial = THREE.LineBasicMaterial;
var PhongMaterial = THREE.MeshPhongMaterial;
var Material = THREE.Material;
var Texture = THREE.Texture;
var Line = THREE.Line;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
var Clock = THREE.Clock;
//Custom Game Objects
var gameObject = objects.gameObject;
// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var havePointerLock;
    var element;
    var scene = new Scene(); // Instantiate Scene Object
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var blocker;
    var instructions;
    var spotLight;
    var ambientLight;
    var groundGeometry;
    var groundPhysicsMaterial;
    var groundMaterial;
    var ground;
    var groundTexture;
    var groundTextureNormal;
    var roadMainTexture;
    var roadMainMaterial;
    var road1Geometry;
    var road1PhysicsMaterial;
    var road1;
    var road2Geometry;
    var road2PhysicsMaterial;
    var road2;
    var road3Geometry;
    var road3PhysicsMaterial;
    var road3;
    var road4Geometry;
    var road4PhysicsMaterial;
    var road4;
    var road5Geometry;
    var road5PhysicsMaterial;
    var road5;
    var road6Geometry;
    var road6PhysicsMaterial;
    var road6;
    var road7Geometry;
    var road7PhysicsMaterial;
    var road7;
    var road8Geometry;
    var road8PhysicsMaterial;
    var road8;
    var road9Geometry;
    var road9PhysicsMaterial;
    var road9;
    var road10Geometry;
    var road10PhysicsMaterial;
    var road10;
    var platform1PhysicsMaterial;
    var platform1Geometry;
    var platform1Material;
    var platform1;
    var platform1Texture;
    var platform2PhysicsMaterial;
    var platform2Geometry;
    var platform2Material;
    var platform2;
    var platform2Texture;
    var platform3PhysicsMaterial;
    var platform3Geometry;
    var platform3Material;
    var platform3;
    var platform3Texture;
    var playerGeometry;
    var playerMaterial;
    var player;
    var sphereGeometry;
    var sphereMaterial;
    var sphere;
    var clock;
    var keyboardControls;
    var mouseControls;
    var isGrounded;
    var velocity = new Vector3(0, 0, 0);
    var prevTime = 0;
    var directionLineMaterial;
    var directionLineGeometry;
    var directionLine;
    function init() {
        // Create to HTMLElements
        blocker = document.getElementById("blocker");
        instructions = document.getElementById("instructions");
        //Check to see if pointerlock is supported
        havePointerLock =
            'pointerLockElement' in document
                || 'mozPointerLockElement' in document
                || 'webkitPointerLockElement' in document;
        // Instantiate Game Controls
        keyboardControls = new objects.KeyboardControls();
        mouseControls = new objects.MouseControls();
        // Check to see if we have pointerLock
        if (havePointerLock) {
            element = document.body;
            instructions.addEventListener('click', function () {
                //Request for pointerlock
                console.log("Requesting PointerLock");
                element.requestPointerLock = element.requestPointerLock
                    || element.mozRequestPointerLock
                    || element.webkitRequestPointerLock;
                element.requestPointerLock();
            });
            document.addEventListener('pointerlockchange', pointerLockChange);
            document.addEventListener('mozpointerlockchange', pointerLockChange);
            document.addEventListener('webkitpointerlockchange', pointerLockChange);
            document.addEventListener('pointerlockerror', pointerLockError);
            document.addEventListener('mozpointerlockerror', pointerLockError);
            document.addEventListener('webkitpointerlockerror', pointerLockError);
        }
        // Scene changes for Physijs
        scene.name = "Main";
        scene.fog = new THREE.Fog(0xffffff, 0, 750);
        scene.setGravity(new THREE.Vector3(0, -10, 0));
        scene.addEventListener('update', function () {
            scene.simulate(undefined, 2);
        });
        // setup a THREE.JS Clock object
        clock = new Clock();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        // Spot Light
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(20, 40, -15);
        spotLight.castShadow = true;
        spotLight.intensity = 2;
        spotLight.lookAt(new Vector3(0, 0, 0));
        spotLight.shadowCameraNear = 2;
        spotLight.shadowCameraFar = 200;
        spotLight.shadowCameraLeft = -5;
        spotLight.shadowCameraRight = 5;
        spotLight.shadowCameraTop = 5;
        spotLight.shadowCameraBottom = -5;
        spotLight.shadowMapWidth = 2048;
        spotLight.shadowMapHeight = 2048;
        spotLight.shadowDarkness = 0.5;
        spotLight.name = "Spot Light";
        scene.add(spotLight);
        console.log("Added spotLight to scene");
        // Add an AmbientLight to Scene
        ambientLight = new AmbientLight(0xffffff);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        // Ground Object
        groundTexture = new THREE.TextureLoader().load('../../Assets/images/lava.gif');
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(50, 50);
        groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/RockErodeNormal.png');
        groundTextureNormal.wrapS = THREE.RepeatWrapping;
        groundTextureNormal.wrapT = THREE.RepeatWrapping;
        groundTextureNormal.repeat.set(50, 50);
        groundMaterial = new PhongMaterial();
        groundMaterial.map = groundTexture;
        //groundMaterial.bumpMap = groundTextureNormal;
        groundMaterial.bumpScale = 0.2;
        groundGeometry = new BoxGeometry(150, 1, 150);
        groundPhysicsMaterial = Physijs.createMaterial(groundMaterial, 0, 0);
        ground = new Physijs.ConvexMesh(groundGeometry, groundPhysicsMaterial, 0);
        ground.receiveShadow = true;
        ground.name = "Ground";
        scene.add(ground);
        console.log("Added Burnt Ground to scene");
        // Road Components
        roadMainTexture = new THREE.TextureLoader().load('../../Assets/images/RockSediment.jpg');
        roadMainTexture.wrapS = THREE.RepeatWrapping;
        roadMainTexture.wrapT = THREE.RepeatWrapping;
        roadMainTexture.repeat.set(15, 15);
        roadMainMaterial = new PhongMaterial();
        roadMainMaterial.map = roadMainTexture;
        roadMainMaterial.bumpScale = 0.2;
        // Road One
        road1Geometry = new BoxGeometry(2.5, 4, 100);
        road1PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road1 = new Physijs.BoxMesh(road1Geometry, road1PhysicsMaterial, 0);
        road1.receiveShadow = true;
        road1.castShadow = true;
        road1.position.set(5, 0, 15);
        road1.name = "Road1";
        scene.add(road1);
        console.log("Added a Road 1 to the scene");
        // Road Two
        road2Geometry = new BoxGeometry(1.5, 4, 75);
        road2PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road2 = new Physijs.BoxMesh(road2Geometry, road2PhysicsMaterial, 0);
        road2.receiveShadow = true;
        road2.castShadow = true;
        road2.position.set(-5, 0, -15);
        road2.name = "Road2";
        scene.add(road2);
        console.log("Added a Road 2 to the scene");
        // Road Three
        road3Geometry = new BoxGeometry(65, 4, 1.7);
        road3PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road3 = new Physijs.BoxMesh(road3Geometry, road3PhysicsMaterial, 0);
        road3.receiveShadow = true;
        road3.castShadow = true;
        road3.position.set(-15, 0, -25);
        road3.name = "Road3";
        scene.add(road3);
        console.log("Added a Road 3 to the scene");
        // Road Four
        road4Geometry = new BoxGeometry(100, 4, 1.4);
        road4PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road4 = new Physijs.BoxMesh(road4Geometry, road4PhysicsMaterial, 0);
        road4.receiveShadow = true;
        road4.castShadow = true;
        road4.position.set(-20, 0, 35);
        road4.name = "Road4";
        scene.add(road4);
        console.log("Added a Road 4 to the scene");
        // Road Five
        road5Geometry = new BoxGeometry(110, 4, 3.5);
        road5PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road5 = new Physijs.BoxMesh(road5Geometry, road5PhysicsMaterial, 0);
        road5.receiveShadow = true;
        road5.castShadow = true;
        road5.position.set(20, 0, 69);
        road5.name = "Road5";
        scene.add(road5);
        console.log("Added a Road 5 to the scene");
        // Road Six
        road6Geometry = new BoxGeometry(110, 4, 3.5);
        road6PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road6 = new Physijs.BoxMesh(road6Geometry, road6PhysicsMaterial, 0);
        road6.receiveShadow = true;
        road6.castShadow = true;
        road6.position.set(-20, 0, -74);
        road6.name = "Road6";
        scene.add(road6);
        console.log("Added a Road 6 to the scene");
        // Road Seven
        road7Geometry = new BoxGeometry(110, 4, 1);
        road7PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road7 = new Physijs.BoxMesh(road7Geometry, road7PhysicsMaterial, 0);
        road7.receiveShadow = true;
        road7.castShadow = true;
        road7.position.set(20, 0, -40);
        road7.name = "Road7";
        scene.add(road7);
        console.log("Added a Road 7 to the scene");
        // Road Eight
        road8Geometry = new BoxGeometry(50, 4, 3);
        road8PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road8 = new Physijs.BoxMesh(road8Geometry, road8PhysicsMaterial, 0);
        road8.receiveShadow = true;
        road8.castShadow = true;
        road8.position.set(30, 0, -15);
        road8.name = "Road8";
        scene.add(road8);
        console.log("Added a Road 8 to the scene");
        // Road Nine
        road9Geometry = new BoxGeometry(50, 4, 3);
        road9PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road9 = new Physijs.BoxMesh(road9Geometry, road9PhysicsMaterial, 0);
        road9.receiveShadow = true;
        road9.castShadow = true;
        road9.position.set(-30, 0, 15);
        road9.name = "Road8";
        scene.add(road9);
        console.log("Added a Road 9 to the scene");
        // Platform Components
        //Platform One
        platform1Texture = new THREE.TextureLoader().load('../../Assets/images/MarbleGreen.jpg');
        platform1Material = new PhongMaterial();
        platform1Material.map = platform1Texture;
        platform1Material.bumpScale = 0.2;
        platform1Geometry = new BoxGeometry(5, 6, 5);
        platform1PhysicsMaterial = Physijs.createMaterial(platform1Material, 0, 0);
        platform1 = new Physijs.BoxMesh(platform1Geometry, platform1PhysicsMaterial, 0);
        platform1.receiveShadow = true;
        platform1.castShadow = true;
        platform1.position.set(0, 0, 10);
        platform1.name = "Platform1";
        scene.add(platform1);
        console.log("Added a Platform 1 to the scene");
        //Platform Two
        platform2Texture = new THREE.TextureLoader().load('../../Assets/images/MetalBase.jpg');
        platform2Material = new PhongMaterial();
        platform2Material.map = platform2Texture;
        platform2Material.bumpScale = 0.2;
        platform2Geometry = new BoxGeometry(5, 6, 5);
        platform2PhysicsMaterial = Physijs.createMaterial(platform2Material, 0, 0);
        platform2 = new Physijs.BoxMesh(platform2Geometry, platform2PhysicsMaterial, 0);
        platform2.receiveShadow = true;
        platform2.castShadow = true;
        platform2.position.set(60, 0, -50);
        platform2.name = "Platform2";
        scene.add(platform2);
        console.log("Added a Platform 2 to the scene");
        //Platform Three
        platform3Texture = new THREE.TextureLoader().load('../../Assets/images/AbstractVarious.jpg');
        platform3Material = new PhongMaterial();
        platform3Material.map = platform3Texture;
        platform3Material.bumpScale = 0.2;
        platform3Geometry = new BoxGeometry(7, 1, 7);
        platform3PhysicsMaterial = Physijs.createMaterial(platform3Material, 0, 0);
        platform3 = new Physijs.BoxMesh(platform3Geometry, platform3PhysicsMaterial, 0);
        platform3.receiveShadow = true;
        platform3.castShadow = true;
        platform3.position.set(-65, 10, 60);
        platform3.name = "Platform3";
        scene.add(platform3);
        console.log("Added a Platform 3 to the scene");
        //Player Cube (PC!)
        playerGeometry = new BoxGeometry(2, 4, 2);
        playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
        player = new Physijs.BoxMesh(playerGeometry, playerMaterial, 1);
        player.position.set(0, 10, 10);
        player.receiveShadow = true;
        player.castShadow = true;
        player.name = "Player";
        scene.add(player);
        console.log("Added Player to scene");
        // Collision Check
        player.addEventListener('collision', function (event) {
            console.log(event);
            if (event.name === "Ground") {
                console.log("Booped ground");
                isGrounded = true;
            }
            if (event.name === "Road1") {
                console.log("Booped Road1");
                isGrounded = true;
            }
            if (event.name === "Road2") {
                console.log("Booped Road2");
                isGrounded = true;
            }
            if (event.name === "Road3") {
                console.log("Booped Road3");
                isGrounded = true;
            }
            if (event.name === "Road4") {
                console.log("Booped Road4");
                isGrounded = true;
            }
            if (event.name === "Road5") {
                console.log("Booped Road5");
                isGrounded = true;
            }
            if (event.name === "Road6") {
                console.log("Booped Road6");
                isGrounded = true;
            }
            if (event.name === "Road7") {
                console.log("Booped Road7");
                isGrounded = true;
            }
            if (event.name === "Road8") {
                console.log("Booped Road8");
                isGrounded = true;
            }
            if (event.name === "Road9") {
                console.log("Booped Road9");
                isGrounded = true;
            }
            if (event.name === "Road10") {
                console.log("Booped Road10");
                isGrounded = true;
            }
            if (event.name === "Platform1") {
                console.log("Booped Platform 1");
                isGrounded = true;
            }
            if (event.name === "Platform2") {
                console.log("Booped Platform 2");
                isGrounded = true;
            }
            if (event.name === "Platform3") {
                console.log("Booped Platform 3");
                isGrounded = true;
            }
            if (event.name === "Sphere") {
                console.log("Booped sphere");
            }
        });
        // Add DirectionLine
        directionLineMaterial = new LineBasicMaterial({ color: 0xffff00 });
        directionLineGeometry = new Geometry();
        directionLineGeometry.vertices.push(new Vector3(0, 0, 0)); // line origin
        directionLineGeometry.vertices.push(new Vector3(0, 0, -50)); // end of the line
        directionLine = new Line(directionLineGeometry, directionLineMaterial);
        player.add(directionLine);
        console.log("Added DirectionLine to the Player");
        // create parent-child relationship with camera and player
        //player.add(camera);
        //camera.position.set(0, 1, 0);
        //Sphere Object
        sphereGeometry = new SphereGeometry(2, 32, 32);
        sphereMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
        sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial, 1);
        sphere.receiveShadow = true;
        sphere.castShadow = true;
        sphere.position.set(0, 60, 10);
        sphere.name = "Sphere";
        scene.add(sphere);
        console.log("Added a sphere to the scene");
        // add controls
        gui = new GUI();
        control = new Control();
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
        scene.simulate();
        window.addEventListener('resize', onWindowResize, false);
    }
    function pointerLockChange(event) {
        if (document.pointerLockElement === element) {
            //enable mouse and keyboard controls
            keyboardControls.enabled = true;
            mouseControls.enabled = true;
            blocker.style.display = 'none';
        }
        else {
            //disable mouse and keyboard controls
            keyboardControls.enabled = false;
            mouseControls.enabled = false;
            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';
            instructions.style.display = '';
            console.log("PointerLock disabled");
        }
    }
    function pointerLockError(event) {
        instructions.style.display = '';
        console.log("PointerLock Error Detected!!! :(");
    }
    // Window Resize Event Handler
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
    }
    // Add Frame Rate Stats to the Scene
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        checkControls();
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Check Controls Function
    function checkControls() {
        if (keyboardControls.enabled) {
            velocity = new Vector3();
            var time = performance.now();
            var delta = (time - prevTime) / 1000;
            if (isGrounded) {
                var direction = new Vector3(0, 0, 0);
                if (keyboardControls.moveForward) {
                    velocity.z -= 400.0 * delta;
                }
                if (keyboardControls.moveLeft) {
                    velocity.x -= 400.0 * delta;
                }
                if (keyboardControls.moveBackward) {
                    velocity.z += 400.0 * delta;
                }
                if (keyboardControls.moveRight) {
                    velocity.x += 400.0 * delta;
                }
                if (keyboardControls.jump) {
                    velocity.y += 4000.0 * delta;
                    if (player.position.y > 4) {
                        isGrounded = false;
                    }
                }
                player.setDamping(0.7, 0.1);
                // Changing player's rotation
                player.setAngularVelocity(new Vector3(0, mouseControls.yaw, 0));
                direction.addVectors(direction, velocity);
                direction.applyQuaternion(player.quaternion);
                if (Math.abs(player.getLinearVelocity().x) < 20 && Math.abs(player.getLinearVelocity().y) < 10) {
                    player.applyCentralForce(direction);
                }
                cameraLook();
            } // isGrounded ends
            //reset Pitch and Yaw
            mouseControls.pitch = 0;
            mouseControls.yaw = 0;
            prevTime = time;
        } // Controls Enabled ends
        else {
            player.setAngularVelocity(new Vector3(0, 0, 0));
        }
    }
    // Camera Look function
    function cameraLook() {
        var zenith = THREE.Math.degToRad(90);
        var nadir = THREE.Math.degToRad(-90);
        var cameraPitch = camera.rotation.x + mouseControls.pitch;
        // Constrain the Camera Pitch
        camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer({ antialias: true });
        renderer.setClearColor(0x404040, 1.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 300);
        camera.position.set(0, 100, 100);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();

//# sourceMappingURL=game.js.map
