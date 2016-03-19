/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = Physijs.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import LineBasicMaterial = THREE.LineBasicMaterial;
import PhongMaterial = THREE.MeshPhongMaterial;
import Material = THREE.Material;
import Texture = THREE.Texture;
import Line = THREE.Line;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;
import Clock = THREE.Clock;

//Custom Game Objects
import gameObject = objects.gameObject;

// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";


// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var havePointerLock: boolean;
    var element: any;
    var scene: Scene = new Scene(); // Instantiate Scene Object
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var blocker: HTMLElement;
    var instructions: HTMLElement;
    var spotLight: SpotLight;
    var ambientLight: AmbientLight;

    var groundGeometry: CubeGeometry;
    var groundPhysicsMaterial: Physijs.Material;
    var groundMaterial: PhongMaterial;
    var ground: Physijs.Mesh;
    var groundTexture: Texture;
    var groundTextureNormal: Texture;

    var roadMainTexture: Texture;
    var roadMainMaterial: PhongMaterial;

    var road1Geometry: CubeGeometry;
    var road1PhysicsMaterial: Physijs.Material;
    var road1: Physijs.Mesh;

    var road2Geometry: CubeGeometry;
    var road2PhysicsMaterial: Physijs.Material;
    var road2: Physijs.Mesh;

    var road3Geometry: CubeGeometry;
    var road3PhysicsMaterial: Physijs.Material;
    var road3: Physijs.Mesh;

    var road4Geometry: CubeGeometry;
    var road4PhysicsMaterial: Physijs.Material;
    var road4: Physijs.Mesh;
    
    var road5Geometry: CubeGeometry;
    var road5PhysicsMaterial: Physijs.Material;
    var road5: Physijs.Mesh;

    var road6Geometry: CubeGeometry;
    var road6PhysicsMaterial: Physijs.Material;
    var road6: Physijs.Mesh;

    var road7Geometry: CubeGeometry;
    var road7PhysicsMaterial: Physijs.Material;
    var road7: Physijs.Mesh;

    var road8Geometry: CubeGeometry;
    var road8PhysicsMaterial: Physijs.Material;
    var road8: Physijs.Mesh;
    
    var road9Geometry: CubeGeometry;
    var road9PhysicsMaterial: Physijs.Material;
    var road9: Physijs.Mesh;

    var road10Geometry: CubeGeometry;
    var road10PhysicsMaterial: Physijs.Material;
    var road10: Physijs.Mesh;
    
    var road11Geometry: CubeGeometry;
    var road11PhysicsMaterial: Physijs.Material;
    var road11: Physijs.Mesh;
    
    var road12Geometry: CubeGeometry;
    var road12PhysicsMaterial: Physijs.Material;
    var road12: Physijs.Mesh;
    
    var road13Geometry: CubeGeometry;
    var road13PhysicsMaterial: Physijs.Material;
    var road13: Physijs.Mesh;
    
    var road14Geometry: CubeGeometry;
    var road14PhysicsMaterial: Physijs.Material;
    var road14: Physijs.Mesh;
    
    var road15Geometry: CubeGeometry;
    var road15PhysicsMaterial: Physijs.Material;
    var road15: Physijs.Mesh;
    
    var road16Geometry: CubeGeometry;
    var road16PhysicsMaterial: Physijs.Material;
    var road16: Physijs.Mesh;
    
    var road17Geometry: CubeGeometry;
    var road17PhysicsMaterial: Physijs.Material;
    var road17: Physijs.Mesh;
    
    var road18Geometry: CubeGeometry;
    var road18PhysicsMaterial: Physijs.Material;
    var road18: Physijs.Mesh;
    
    var road19Geometry: CubeGeometry;
    var road19PhysicsMaterial: Physijs.Material;
    var road19: Physijs.Mesh;
    
    var road20Geometry: CubeGeometry;
    var road20PhysicsMaterial: Physijs.Material;
    var road20: Physijs.Mesh;
    
    var road21Geometry: CubeGeometry;
    var road21PhysicsMaterial: Physijs.Material;
    var road21: Physijs.Mesh;
    
    var road22Geometry: CubeGeometry;
    var road22PhysicsMaterial: Physijs.Material;
    var road22: Physijs.Mesh;
    
    var road23Geometry: CubeGeometry;
    var road23PhysicsMaterial: Physijs.Material;
    var road23: Physijs.Mesh;
    
    var road24Geometry: CubeGeometry;
    var road24PhysicsMaterial: Physijs.Material;
    var road24: Physijs.Mesh;
    
    var road25Geometry: CubeGeometry;
    var road25PhysicsMaterial: Physijs.Material;
    var road25: Physijs.Mesh;
    
    var road26Geometry: CubeGeometry;
    var road26PhysicsMaterial: Physijs.Material;
    var road26: Physijs.Mesh;
    
    var road27Geometry: CubeGeometry;
    var road27PhysicsMaterial: Physijs.Material;
    var road27: Physijs.Mesh;
    
    var road28Geometry: CubeGeometry;
    var road28PhysicsMaterial: Physijs.Material;
    var road28: Physijs.Mesh;
    
    var road29Geometry: CubeGeometry;
    var road29PhysicsMaterial: Physijs.Material;
    var road29: Physijs.Mesh;
    
    var road30Geometry: CubeGeometry;
    var road30PhysicsMaterial: Physijs.Material;
    var road30: Physijs.Mesh;
    
    var road31Geometry: CubeGeometry;
    var road31PhysicsMaterial: Physijs.Material;
    var road31: Physijs.Mesh;
    
    var road32Geometry: CubeGeometry;
    var road32PhysicsMaterial: Physijs.Material;
    var road32: Physijs.Mesh;
    
    var platform1PhysicsMaterial: Physijs.Material;
    var platform1Geometry: CubeGeometry;
    var platform1Material: PhongMaterial;
    var platform1: Physijs.Mesh;
    var platform1Texture: Texture;

    var platform2PhysicsMaterial: Physijs.Material;
    var platform2Geometry: CubeGeometry;
    var platform2Material: PhongMaterial;
    var platform2: Physijs.Mesh;
    var platform2Texture: Texture;

    var platform3PhysicsMaterial: Physijs.Material;
    var platform3Geometry: CubeGeometry;
    var platform3Material: PhongMaterial;
    var platform3: Physijs.Mesh;
    var platform3Texture: Texture;

    var playerGeometry: CubeGeometry;
    var playerMaterial: Physijs.Material;
    var player: Physijs.Mesh;
        
    var door1PhysicsMaterial: Physijs.Material;
    var door1Geometry: CubeGeometry;
    var door1Material: PhongMaterial;
    var door1: Physijs.Mesh;
    var door1Texture: Texture;
    
    var sphereGeometry: SphereGeometry;
    var sphereMaterial: Physijs.Material;
    var sphere: Physijs.Mesh;

    var clock: Clock;
    var keyboardControls: objects.KeyboardControls;
    var mouseControls: objects.MouseControls;
    var isGrounded: boolean;
    var velocity: Vector3 = new Vector3(0, 0, 0);
    var prevTime: number = 0;
    var directionLineMaterial: LineBasicMaterial;
    var directionLineGeometry: Geometry;
    var directionLine: Line;

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

            instructions.addEventListener('click', () => {

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
        scene.addEventListener('update', () => {
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
        road9.name = "Road9";
        scene.add(road9);
        console.log("Added a Road 9 to the scene");
        
        // Road Ten
        road10Geometry = new BoxGeometry(35, 4, 2.5);
        road10PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road10 = new Physijs.BoxMesh(road10Geometry, road10PhysicsMaterial, 0);
        road10.receiveShadow = true;
        road10.castShadow = true;
        road10.position.set(18, 0, 22);
        road10.name = "Road10";
        scene.add(road10);
        console.log("Added a Road 10 to the scene");
        
        // Road Eleven
        road11Geometry = new BoxGeometry(2, 4, 50);
        road11PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road11 = new Physijs.BoxMesh(road11Geometry, road11PhysicsMaterial, 0);
        road11.receiveShadow = true;
        road11.castShadow = true;
        road11.position.set(35, 0, 35);
        road11.name = "Road11";
        scene.add(road11);
        console.log("Added a Road 11 to the scene");
        
        // Road Twelve
        road12Geometry = new BoxGeometry(1.5, 4, 50);
        road12PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road12 = new Physijs.BoxMesh(road12Geometry, road12PhysicsMaterial, 0);
        road12.receiveShadow = true;
        road12.castShadow = true;
        road12.position.set(25, 0, -20);
        road12.name = "Road12";
        scene.add(road12);
        console.log("Added a Road 12 to the scene");
               
        // Road Thirteen
        road13Geometry = new BoxGeometry(1, 4, 50);
        road13PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road13 = new Physijs.BoxMesh(road13Geometry, road13PhysicsMaterial, 0);
        road13.receiveShadow = true;
        road13.castShadow = true;
        road13.position.set(-35, 0, 20);
        road13.name = "Road13";
        scene.add(road13);
        console.log("Added a Road 13 to the scene");
        
         
        // Road Fourteen
        road14Geometry = new BoxGeometry(1.5, 4, 50);
        road14PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road14 = new Physijs.BoxMesh(road14Geometry, road14PhysicsMaterial, 0);
        road14.receiveShadow = true;
        road14.castShadow = true;
        road14.position.set(-55, 0, 40);
        road14.name = "Road14";
        scene.add(road14);
        console.log("Added a Road 14 to the scene");
        
        // Road Fifteen
        road15Geometry = new BoxGeometry(40, 4, 1.25);
        road15PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road15 = new Physijs.BoxMesh(road15Geometry, road15PhysicsMaterial, 0);
        road15.receiveShadow = true;
        road15.castShadow = true;
        road15.position.set(-55, 0, 60);
        road15.name = "Road15";
        scene.add(road15);
        console.log("Added a Road 15 to the scene");
        
        // Road Sixteen
        road16Geometry = new BoxGeometry(40, 4, 2.15);
        road16PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road16 = new Physijs.BoxMesh(road16Geometry, road16PhysicsMaterial, 0);
        road16.receiveShadow = true;
        road16.castShadow = true;
        road16.position.set(35, 0, 55);
        road16.name = "Road16";
        scene.add(road16);
        console.log("Added a Road 16 to the scene");
        
        // Road Seventeen
        road17Geometry = new BoxGeometry(40, 4, 2.5);
        road17PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road17 = new Physijs.BoxMesh(road17Geometry, road17PhysicsMaterial, 0);
        road17.receiveShadow = true;
        road17.castShadow = true;
        road17.position.set(-17, 0, 52);
        road17.name = "Road17";
        scene.add(road17);
        console.log("Added a Road 17 to the scene");
        
        // Road Eighteen
        road18Geometry = new BoxGeometry(40, 4, 2);
        road18PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road18 = new Physijs.BoxMesh(road18Geometry, road18PhysicsMaterial, 0);
        road18.receiveShadow = true;
        road18.castShadow = true;
        road18.position.set(55, 0, 10);
        road18.name = "Road18";
        scene.add(road18);
        console.log("Added a Road 18 to the scene");
        
        
        // Road Nineteen
        road19Geometry = new BoxGeometry(1.1, 4, 60);
        road19PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road19 = new Physijs.BoxMesh(road19Geometry, road19PhysicsMaterial, 0);
        road19.receiveShadow = true;
        road19.castShadow = true;
        road19.position.set(55, 0, 10);
        road19.name = "Road19";
        scene.add(road19);
        console.log("Added a Road 19 to the scene");
        
        // Road Twenty
        road20Geometry = new BoxGeometry(3.5, 4, 70);
        road20PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road20 = new Physijs.BoxMesh(road20Geometry, road20PhysicsMaterial, 0);
        road20.receiveShadow = true;
        road20.castShadow = true;
        road20.position.set(-73, 0, 10);
        road20.name = "Road20";
        scene.add(road20);
        console.log("Added a Road 20 to the scene");
        
        // Road Twenty-One
        road21Geometry = new BoxGeometry(2.15, 4, 70);
        road21PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road21 = new Physijs.BoxMesh(road21Geometry, road21PhysicsMaterial, 0);
        road21.receiveShadow = true;
        road21.castShadow = true;
        road21.position.set(-50, 0, -30);
        road21.name = "Road21";
        scene.add(road21);
        console.log("Added a Road 21 to the scene");
        
        // Road Twenty-Two
        road22Geometry = new BoxGeometry(0.5, 4, 55);
        road22PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road22 = new Physijs.BoxMesh(road22Geometry, road22PhysicsMaterial, 0);
        road22.receiveShadow = true;
        road22.castShadow = true;
        road22.position.set(50, 0, -48);
        road22.name = "Road22";
        scene.add(road22);
        console.log("Added a Road 22 to the scene");
                       
        // Road Twenty-Three
        road23Geometry = new BoxGeometry(55, 4, 0.5);
        road23PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road23 = new Physijs.BoxMesh(road23Geometry, road23PhysicsMaterial, 0);
        road23.receiveShadow = true;
        road23.castShadow = true;
        road23.position.set(0, 0, 0);
        road23.name = "Road23";
        scene.add(road23);
        console.log("Added a Road 23 to the scene");
        
        // Road Twenty-Four
        road24Geometry = new BoxGeometry(70, 4, 0.75);
        road24PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road24 = new Physijs.BoxMesh(road24Geometry, road24PhysicsMaterial, 0);
        road24.receiveShadow = true;
        road24.castShadow = true;
        road24.position.set(-25, 0, -60);
        road24.name = "Road24";
        scene.add(road24);
        console.log("Added a Road 24 to the scene");
        
        // Road Twenty-Five
        road25Geometry = new BoxGeometry(30, 4, 1.75);
        road25PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road25 = new Physijs.BoxMesh(road25Geometry, road25PhysicsMaterial, 0);
        road25.receiveShadow = true;
        road25.castShadow = true;
        road25.position.set(-60, 0, -40);
        road25.name = "Road25";
        scene.add(road25);
        console.log("Added a Road 25 to the scene");
        
        // Road Twenty-Six
        road26Geometry = new BoxGeometry(30, 4, 0.5);
        road26PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road26 = new Physijs.BoxMesh(road26Geometry, road26PhysicsMaterial, 0);
        road26.receiveShadow = true;
        road26.castShadow = true;
        road26.position.set(-60, 0, -10);
        road26.name = "Road26";
        scene.add(road26);
        console.log("Added a Road 26 to the scene");
        
        // Road Twenty-Seven
        road27Geometry = new BoxGeometry(0.5, 4, 35);
        road27PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road27 = new Physijs.BoxMesh(road27Geometry, road27PhysicsMaterial, 0);
        road27.receiveShadow = true;
        road27.castShadow = true;
        road27.position.set(-60, 0, -25);
        road27.name = "Road27";
        scene.add(road27);
        console.log("Added a Road 27 to the scene");
                
        // Road Twenty-Eight
        road28Geometry = new BoxGeometry(1.5, 4, 35);
        road28PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road28 = new Physijs.BoxMesh(road28Geometry, road28PhysicsMaterial, 0);
        road28.receiveShadow = true;
        road28.castShadow = true;
        road28.position.set(70, 0, -25);
        road28.name = "Road28";
        scene.add(road28);
        console.log("Added a Road 28 to the scene");
        
        // Road Twenty-Nine
        road29Geometry = new BoxGeometry(1.5, 4, 35);
        road29PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road29 = new Physijs.BoxMesh(road29Geometry, road29PhysicsMaterial, 0);
        road29.receiveShadow = true;
        road29.castShadow = true;
        road29.position.set(70, 0, 50);
        road29.name = "Road29";
        scene.add(road29);
        console.log("Added a Road 29 to the scene");
                
        // Road Thirty
        road30Geometry = new BoxGeometry(45, 4, 1.5);
        road30PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road30 = new Physijs.BoxMesh(road30Geometry, road30PhysicsMaterial, 0);
        road30.receiveShadow = true;
        road30.castShadow = true;
        road30.position.set(50, 0, 40);
        road30.name = "Road30";
        scene.add(road30);
        console.log("Added a Road 30 to the scene");
                
        // Road Thirty-One
        road31Geometry = new BoxGeometry(45, 4, 1.5);
        road31PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road31 = new Physijs.BoxMesh(road31Geometry, road31PhysicsMaterial, 0);
        road31.receiveShadow = true;
        road31.castShadow = true;
        road31.position.set(40, 0, -65);
        road31.name = "Road31";
        scene.add(road31);
        console.log("Added a Road 31 to the scene");
        
        // Road Thirty-Two
        road32Geometry = new BoxGeometry(0.5, 4, 60);
        road32PhysicsMaterial = Physijs.createMaterial(roadMainMaterial, 0, 0);
        road32 = new Physijs.BoxMesh(road32Geometry, road32PhysicsMaterial, 0);
        road32.receiveShadow = true;
        road32.castShadow = true;
        road32.position.set(-40, 0, -45);
        road32.name = "Road32";
        scene.add(road32);
        console.log("Added a Road 32 to the scene");
        
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
        
        // Door Components
        
        // Door One
        door1Texture = new THREE.TextureLoader().load('../../Assets/images/doorsTextureNo6901.jpg');

        door1Material = new PhongMaterial();
        door1Material.map = door1Texture;
        door1Material.bumpScale = 0.2;

        door1Geometry = new BoxGeometry(3, 7, 0.5);
        door1PhysicsMaterial = Physijs.createMaterial(door1Material, 0, 0);
        door1 = new Physijs.BoxMesh(door1Geometry, door1PhysicsMaterial, 0);
        door1.receiveShadow = true;
        door1.castShadow = true;
        door1.position.set(60, 5, -51);
        door1.name = "Door1";
        scene.add(door1);
        console.log("Added a Door1 to the scene");
        
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
        player.addEventListener('collision', (event) => {
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
            if (event.name === "Road11") {
                console.log("Booped Road11");
                isGrounded = true;
            }
            if (event.name === "Road12") {
                console.log("Booped Road12");
                isGrounded = true;
            }
            if (event.name === "Road13") {
                console.log("Booped Road13");
                isGrounded = true;
            }
            if (event.name === "Road14") {
                console.log("Booped Road14");
                isGrounded = true;
            }
            if (event.name === "Road15") {
                console.log("Booped Road15");
                isGrounded = true;
            }
            if (event.name === "Road16") {
                console.log("Booped Road16");
                isGrounded = true;
            }
            if (event.name === "Road17") {
                console.log("Booped Road17");
                isGrounded = true;
            }
            if (event.name === "Road18") {
                console.log("Booped Road18");
                isGrounded = true;
            }
            if (event.name === "Road19") {
                console.log("Booped Road19");
                isGrounded = true;
            }
            if (event.name === "Road20") {
                console.log("Booped Road20");
                isGrounded = true;
            }
            if (event.name === "Road21") {
                console.log("Booped Road21");
                isGrounded = true;
            }
            if (event.name === "Road22") {
                console.log("Booped Road22");
                isGrounded = true;
            }
            if (event.name === "Road23") {
                console.log("Booped Road23");
                isGrounded = true;
            }
            if (event.name === "Road24") {
                console.log("Booped Road24");
                isGrounded = true;
            }
            if (event.name === "Road25") {
                console.log("Booped Road25");
                isGrounded = true;
            }
            if (event.name === "Road26") {
                console.log("Booped Road26");
                isGrounded = true;
            }
            if (event.name === "Road27") {
                console.log("Booped Road27");
                isGrounded = true;
            }
            if (event.name === "Road28") {
                console.log("Booped Road28");
                isGrounded = true;
            }
            if (event.name === "Road29") {
                console.log("Booped Road29");
                isGrounded = true;
            }
            if (event.name === "Road30") {
                console.log("Booped Road30");
                isGrounded = true;
            }
            if (event.name === "Road31") {
                console.log("Booped Road31");
                isGrounded = true;
            }
            if (event.name === "Road32") {
                console.log("Booped Road32");
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
            if (event.name === "Door1") {
                console.log("Booped Door 1");
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
        player.add(camera);
        camera.position.set(0, 1, 0);
        
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

    function pointerLockChange(event): void {
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

    function pointerLockError(event): void {
        instructions.style.display = '';
        console.log("PointerLock Error Detected!!! :(");
    }
    
    // Window Resize Event Handler
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function addControl(controlObject: Control): void {
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
    function gameLoop(): void {
        stats.update();

        checkControls();
               
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);

        // render the scene
        renderer.render(scene, camera);
    }
    
    // Check Controls Function
    function checkControls(): void {
        if (keyboardControls.enabled) {
            velocity = new Vector3();

            var time: number = performance.now();
            var delta: number = (time - prevTime) / 1000;

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
    function cameraLook(): void {
        var zenith: number = THREE.Math.degToRad(90);
        var nadir: number = THREE.Math.degToRad(-90);

        var cameraPitch: number = camera.rotation.x + mouseControls.pitch;

        // Constrain the Camera Pitch
        camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
    }
    
    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer({ antialias: true });
        renderer.setClearColor(0x404040, 1.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 300);
        //camera.position.set(0, 100, 100);
        //camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

