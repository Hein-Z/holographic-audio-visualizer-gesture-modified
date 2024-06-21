// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// import "https://cdnjs.cloudflare.com/ajax/libs/three.js/r112/three.min.js";
// import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";

const audio = require('./audio-source')
const coverArtAnimation = require('./animation.js');
const electron = require('electron');
// visualizers
const SpectrumVisualizer = require('./spectrum-visualizer.js');
const ParticleVisualizer = require('./particle-visualizer.js');
const CubeVisualizer = require('./cube-visualizer.js');

const playlist = 'stefandasbach/sets/lounge';
let isDancer = false;
const danceMoves = ["Idle", "Ymca Dance", "Locking Hip Hop Dance", "Hip Hop Dancing", "Pointing Gesture", "Chicken Dance"];
let countUp = 0;
let player = document.getElementById('player');
player.volume = 1;

let selectedVisualizer = 0;
let visualizers = [
    new CubeVisualizer(document.getElementById("cube")),
    new ParticleVisualizer(document.getElementById("particle")),
    new SpectrumVisualizer(document.getElementById("spectrum"))
];

let loader = new audio.SoundcloudLoader(player);
let audioSource;
const streamListDemo = [{
    "url": './album/1.mp3',
    "artwork": './album/1.jpg'
}, {
    "url": './album/2.mp3',
    "artwork": './album/2.png'
}
];
audioSource = new audio.SoundCloudAudioSource(player, streamListDemo, onStream);

audioSource.shuffle();
audioSource.play()

// Create visualizers
for (let i = 0; i < visualizers.length; i++) {
    visualizers[i].initialize();
}


//3D earth code


// Création de la scène
let scene_1 = new THREE.Scene();
let scene_2 = new THREE.Scene();
let scene_3 = new THREE.Scene();
let scene_4 = new THREE.Scene();

const loader_bg = new THREE.TextureLoader();
const bgTexture = loader_bg.load('./bg.jpg');
bgTexture.colorSpace = THREE.SRGBColorSpace;


// Création de la caméra
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Création du rendu
let renderer_1 = new THREE.WebGLRenderer({canvas: document.querySelector('#globe1')});
let renderer_2 = new THREE.WebGLRenderer({canvas: document.querySelector('#globe2')});
let renderer_3 = new THREE.WebGLRenderer({canvas: document.querySelector('#moon')});
let renderer_4 = new THREE.WebGLRenderer({canvas: document.querySelector('#jupiter')});

renderer_1.setSize(window.innerWidth, window.innerHeight);
renderer_2.setSize(window.innerWidth, window.innerHeight);
renderer_3.setSize(window.innerWidth, window.innerHeight);
renderer_4.setSize(window.innerWidth, window.innerHeight);

// document.body.appendChild(renderer.domElement);

// Ajout d'une sphère pour représenter le globe
let geometry = new THREE.SphereGeometry(2, 32, 32);
let material_1 = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./land_ocean_ice_cloud.jpg')});

let material_2 = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./earth-2.jpg')});
let material_3 = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./moon.jpg')});
let material_4 = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./jupiter.jpg')});

let globe_1 = new THREE.Mesh(geometry, material_1);
let globe_2 = new THREE.Mesh(geometry, material_2);
let globe_3 = new THREE.Mesh(geometry, material_3);
let globe_4 = new THREE.Mesh(geometry, material_4);


// Fonction pour rendre la scène interactive
function animateEarth() {
    requestAnimationFrame(animateEarth);
    // Vérifier si le globe est défini avant de l'utiliser

    globe_1.rotation.y += 0.01;
    globe_2.rotation.y += 0.01;
    globe_3.rotation.y += 0.01;
    globe_4.rotation.y -= 0.01;

    globe_1.rotation.x += 0.005;
    globe_2.rotation.x += 0.005;
    globe_3.rotation.x += 0.01;
    globe_4.rotation.x -= 0.01

    scene_1.add(globe_1);
    scene_2.add(globe_2);
    scene_3.add(globe_3);
    scene_4.add(globe_4);

    scene_1.background = bgTexture;
    scene_2.background = bgTexture;
    scene_3.background = bgTexture;
    scene_4.background = bgTexture;

    renderer_1.render(scene_1, camera);
    renderer_2.render(scene_2, camera);
    renderer_3.render(scene_3, camera);
    renderer_4.render(scene_4, camera);

}

animateEarth();

//code for TRI
// Create scene
const scene_6 = new THREE.Scene();
scene_6.background = new THREE.Color(0x050505);
scene_6.fog = new THREE.Fog(0x050505, 2000, 3500);

// Create camera
const camera_6 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera_6.position.z = 2750;

// Create lights
scene_6.add(new THREE.AmbientLight(0x333333, 3));
const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
light1.position.set(5, 5, 5);
scene_6.add(light1);
const light2 = new THREE.DirectionalLight(0xaaaaaa, 4.5);
light2.position.set(0, -5, 0);
scene_6.add(light2);

// Create render
const renderer_6 = new THREE.WebGLRenderer({canvas: document.querySelector('#tri')});
renderer_6.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer_6.domElement);

// Create geometry
const triangles = 80;
const geometry_6 = new THREE.BufferGeometry();
const vertices = [];
const positions = new Float32Array(triangles * 3 * 3);

for (let i = 0; i < triangles; i++) {
    const x = Math.random() * 4 - 2;
    const y = Math.random() * 4 - 2;
    const z = Math.random() * 4 - 2;
    vertices.push(x, y, z);
}

const colors = new Float32Array(vertices.length);
for (let i = 0; i < colors.length; i += 3) {
    colors[i] = Math.random();
    colors[i + 1] = Math.random();
    colors[i + 2] = Math.random();
}

geometry_6.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

geometry_6.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material_6 = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    size: 5,
    specular: 0x000000,
    shininess: 250,
    transparent: true
});

// Create mesh
const square = new THREE.Mesh(geometry_6, material_6);
scene_6.add(square);

const line = new THREE.Line(geometry_6, material_6);
scene_6.add(line);

// Set up camera position
camera_6.position.z = 5;


// Set up animation
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate square
    square.rotation.x += 0.01;
    square.rotation.y += 0.01;
    line.rotation.x -= 0.01;
    line.rotation.y -= 0.01;

    // Update controls


    renderer_6.render(scene_6, camera_6);
};

// Handle window resize

animate();

// Initialize the scene, camera, and renderer with anti-aliasing
const scene_7 = new THREE.Scene();
const camera_7 = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer_7 = new THREE.WebGLRenderer({canvas: document.querySelector('#line')});

renderer_7.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer_7.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene_7.add(ambientLight);
const pointLight = new THREE.PointLight(0xFFFFFF, 1);
pointLight.position.set(5, 5, 5);
scene_7.add(pointLight);

// Create geometry and material for the d20 dice
const geometry_7 = new THREE.IcosahedronGeometry(1);
const material_7 = new THREE.MeshStandardMaterial({color: 0x000000, transparent: true, opacity: 0.8});

// Create the mesh and add it to the scene
const d20 = new THREE.Mesh(geometry_7, material_7);
scene_7.add(d20);

// Create geometry for the edges
const edges = new THREE.EdgesGeometry(geometry_7);

// Create multiple lines to simulate thick edges
const lines = [];
for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
        if (i === 0 && j === 0) continue;
        const edgeMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
        const edgeMesh = new THREE.LineSegments(edges, edgeMaterial);
        edgeMesh.position.x = i * 0.005;
        edgeMesh.position.y = j * 0.005;
        scene_7.add(edgeMesh);
        lines.push(edgeMesh);
    }
}

camera_7.position.z = 5;

// Animation loop for rotation
function animateLine() {
    requestAnimationFrame(animateLine);

    d20.rotation.x += 0.01;
    d20.rotation.y += 0.01;
    lines.forEach(line => {
        line.rotation.x += 0.01;
        line.rotation.y += 0.01;
    });

    renderer_7.render(scene_7, camera_7);
}

animateLine();


document.getElementById("globe1").style.display = 'none';
document.getElementById("globe2").style.display = 'none';
document.getElementById("moon").style.display = 'none';
document.getElementById("jupiter").style.display = 'none';
document.getElementById("tri").style.display = 'none';
document.getElementById("line").style.display = 'none';
document.getElementById('dance').style.display = 'none';

// Start the visible one
animateVisualizer(selectedVisualizer);

// loader.loadStream('https://soundcloud.com/' + playlist, function() {
// 	// const albumArt = loader.albumArt()

// 	// const streamList = loader.streamUrl().map(function(url, idx) {return {"url": url, "artwork": albumArt[idx] ? albumArt[idx] : undefined}})


// }, function() {})

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 40);
}


function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 20);
}


/**
 Render the album artwork when a new stream is played
 */
function onStream(stream) {
    const art = document.getElementById('cover-art')
    art.src = stream.artwork;

    unfade(art);
    setTimeout(function () {
        fade(art);
    }, 10000)
}

// Controls
electron.ipcRenderer.on('control', (event, message) => {
    switch (message) {
        case 'NEXT':
            audioSource.next();
            break;
        case 'PREVIOUS':
            audioSource.previous();
            break;
        case 'TOGGLE_VISUALIZER_SETTING':
            visualizers[selectedVisualizer].toggle();
            if (isDancer) {
                console.log('im dance');
                if (danceMoves.length-1 <= countUp) {
                    countUp = 0;
                } else {
                    countUp += 1;

                }
                console.log(danceMoves.length);
                console.log(countUp);
                game.toggleAnimation(danceMoves[countUp]);
            }
            break;
        case 'CHANGE_VISUALIZER':
            isDancer = false;
            document.getElementById("globe1").style.display = 'none';
            document.getElementById("globe2").style.display = 'none';
            document.getElementById("moon").style.display = 'none';
            document.getElementById("jupiter").style.display = 'none';
            document.getElementById("tri").style.display = 'none';
            document.getElementById("line").style.display = 'none';
            document.getElementById("dance").style.display = 'none';
            selectedVisualizer = (selectedVisualizer + 1) % visualizers.length
            animateVisualizer(selectedVisualizer);
            break;
        case 'CHANGE_EARTH1_3D_MODEL':
            isDancer = false;
            stopVisualizer();
            document.getElementById("globe1").style.display = 'block';
            break;
        case 'CHANGE_EARTH2_3D_MODEL':
            isDancer = false;
            stopVisualizer();
            document.getElementById("globe2").style.display = 'block';
            break
        case 'CHANGE_MOON_3D_MODEL':
            isDancer = false;
            stopVisualizer();
            document.getElementById("moon").style.display = 'block';
            break
        case "CHANGE_JUPITER_3D_MODEL":
            isDancer = false;
            stopVisualizer();
            document.getElementById("jupiter").style.display = 'block';
            break
        case "CHANGE_TRI_3D_MODEL":
            isDancer = false;
            stopVisualizer();
            document.getElementById("tri").style.display = 'block';
            break
        case "CHANGE_LINE_3D_MODEL":
            isDancer = false;
            stopVisualizer();
            document.getElementById("line").style.display = 'block';
            break
        case "CHANGE_DANCE_3D_MODEL":
            isDancer = true;
            stopVisualizer();
            document.getElementById('dance').style.display = 'block';
            break
        case 'TOGGLE_PLAY':
            audioSource.toggle();
        default:
            console.log('Unrecognized command: ' + message);
            break;
    }
})

electron.ipcRenderer.on('volume', (event, message) => {
    const volume = Number(message);
    if (volume) {
        audioSource.setVolume(volume)
    }
})

function animateVisualizer(index) {
    for (let i = 0; i < visualizers.length; i++) {
        if (i == index) {
            visualizers[i].element.style.display = 'inline-block'
            visualizers[i].animate(audioSource)
            // hack to fix a redraw bug
            window.dispatchEvent(new Event('resize'));
        } else {
            visualizers[i].element.style.display = 'none'
            visualizers[i].stop();
        }
    }
}

function stopVisualizer() {
    for (let i = 0; i < visualizers.length; i++) {
        visualizers[i].element.style.display = 'none'
        visualizers[i].stop();
    }
    document.getElementById("globe2").style.display = 'none';
    document.getElementById("globe1").style.display = 'none';
    document.getElementById("moon").style.display = 'none';
    document.getElementById("jupiter").style.display = 'none';
    document.getElementById("tri").style.display = 'none';
    document.getElementById("line").style.display = 'none';
    document.getElementById('dance').style.display = 'none';
}

// dance
document.addEventListener("DOMContentLoaded", function () {
    const game = new Game();
    window.game = game; //For debugging only
});

class Game {
    constructor() {
        if (WEBGL.isWebGLAvailable() === false) {
            document.body.appendChild(WEBGL.getWebGLErrorMessage());
        }

        this.container;
        this.player = {};
        this.animations = {};
        this.stats;
        this.controls;
        this.camera;
        this.scene;
        this.renderer;

        this.container = document.createElement("div");
        this.container.style.height = "100%";
        document.body.appendChild(this.container);

        const game = this;
        this.anims = [
            "Pointing Gesture",
            "Hip Hop Dancing",
            "Chicken Dance",
            "Locking Hip Hop Dance",
            "Ymca Dance"
        ];

        this.assetsPath = "https://assets.codepen.io/91506/";

        this.clock = new THREE.Clock();

        this.init();

        window.onError = function (error) {
            console.error(JSON.stringify(error));
        };
    }

    init() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            2000
        );
        this.camera.position.set(0, 200, 500);

        this.scene = new THREE.Scene();
//                    this.scene.background = new THREE.Color(0x000000);
        const loader_bg2 = new THREE.TextureLoader();
        const bgTexture2 = loader_bg2.load('./bg.jpg');
        bgTexture2.colorSpace = THREE.SRGBColorSpace;
        this.scene.background = bgTexture2;
        this.scene.fog = new THREE.Fog(0x000000, 700, 1800);

        let light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 200, 0);
        this.scene.add(light);

        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 200, 100);
        light.castShadow = true;
        light.shadow.camera.top = 180;
        light.shadow.camera.bottom = -100;
        light.shadow.camera.left = -120;
        light.shadow.camera.right = 120;
        this.scene.add(light);

        // ground
        const mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(4000, 4000),
            new THREE.MeshPhongMaterial({color: 0x000000, depthWrite: false})
        );

        mesh.rotation.x = -Math.PI / 2;
         mesh.position.y = -100;
        mesh.receiveShadow = true;
        this.scene.add(mesh);

        const grid = new THREE.GridHelper(4000, 40, 0xffffff, 0xdddddd);
        //grid.position.y = -100;
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this.scene.add(grid);

        // model
        const loader = new THREE.FBXLoader();
        const game = this;

        loader.load(`${this.assetsPath}Knight.fbx`, function (object) {
            object.mixer = new THREE.AnimationMixer(object);
            game.player.mixer = object.mixer;
            game.player.root = object.mixer.getRoot();

            object.name = "Knight";

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = false;
                }
            });

            game.scene.add(object);
            game.player.object = object;
            game.animations.Idle = object.animations[0];

            game.loadNextAnim(loader);
        });

        this.renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#dance')});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(
            this.camera,
            this.renderer.domElement
          );
          this.controls.target.set(0, 100, 0);
          this.controls.update();

    }

    loadNextAnim(loader) {
        let anim = this.anims.pop();
        const game = this;
        loader.load(`${this.assetsPath}${anim}.fbx`, function (object) {
            game.animations[anim] = object.animations[0];
            if (game.anims.length > 0) {
                game.loadNextAnim(loader);
            } else {
                delete game.anims;
                game.action = "Idle";
                game.animate();
            }
        });
    }


    set action(name) {
        const action = this.player.mixer.clipAction(this.animations[name]);
        action.time = 0;
        this.player.mixer.stopAllAction();
        this.player.action = name;
        this.player.actionTime = Date.now();
        this.player.actionName = name;
        action.fadeIn(0.5);
        action.play();
    }

    get action() {
        if (this.player === undefined || this.player.actionName === undefined)
            return "";
        return this.player.actionName;
    }

    toggleAnimation(animName) {
        console.log(animName);
        switch (animName) {
            case "Idle":
                game.action = animName;
                break;
            case "Chicken Dance":
                game.action = animName;
                break;
            case "Pointing Gesture":
                game.action = animName;
                break;
            case "Hip Hop Dancing":
                game.action = animName;
                break;
            case "Locking Hip Hop Dance":
                game.action = animName;
                break;
            case "Ymca Dance":
                game.action = animName;
                break;
        }
    }

    animate() {
        const game = this;
        const dt = this.clock.getDelta();

        requestAnimationFrame(function () {
            game.animate();
        });

        if (this.player.mixer !== undefined) this.player.mixer.update(dt);

        this.renderer.render(this.scene, this.camera);
    }
}