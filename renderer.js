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

var player =  document.getElementById('player');
player.volume = 1;

var selectedVisualizer = 0;
var visualizers = [
    new CubeVisualizer(document.getElementById("cube")), 
    new ParticleVisualizer(document.getElementById("particle")), 
    new SpectrumVisualizer(document.getElementById("spectrum"))
];

var loader = new audio.SoundcloudLoader(player);
var audioSource;
const streamListDemo=[{
    "url":'./album/1.mp3',
    "artwork":'./album/1.jpg'
},{
    "url": './album/2.mp3',
    "artwork":'./album/2.png'
}
];
audioSource = new audio.SoundCloudAudioSource(player, streamListDemo, onStream);

audioSource.shuffle();
audioSource.play()

// Create visualizers
for (let i = 0; i<visualizers.length; i++) {
    visualizers[i].initialize();
}


//3D earth code



      // Création de la scène
      var scene_1 = new THREE.Scene();
      var scene_2 = new THREE.Scene();
      var scene_3 = new THREE.Scene();
      var scene_4 = new THREE.Scene();
      // Création de la caméra
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      
      // Création du rendu
      var renderer_1 = new THREE.WebGLRenderer({ canvas: document.querySelector('#globe1')});
      var renderer_2 = new THREE.WebGLRenderer({ canvas: document.querySelector('#globe2')});
      var renderer_3 = new THREE.WebGLRenderer({ canvas: document.querySelector('#moon')});
      var renderer_4 = new THREE.WebGLRenderer({ canvas: document.querySelector('#jupiter')});

      renderer_1.setSize(window.innerWidth, window.innerHeight);
      renderer_2.setSize(window.innerWidth, window.innerHeight);
      renderer_3.setSize(window.innerWidth, window.innerHeight);
      renderer_4.setSize(window.innerWidth, window.innerHeight);

      // document.body.appendChild(renderer.domElement);
      
      // Ajout d'une sphère pour représenter le globe
      var geometry = new THREE.SphereGeometry(2, 32, 32);
      var material_1 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./land_ocean_ice_cloud.jpg') });
      var material_2 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./earth-2.jpg') });
      var material_3 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./moon.jpg') });
      var material_4 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./jupiter.jpg') });

      var globe_1 = new THREE.Mesh(geometry, material_1);      
      var globe_2 = new THREE.Mesh(geometry, material_2);
      var globe_3 = new THREE.Mesh(geometry, material_3);
      var globe_4 = new THREE.Mesh(geometry, material_4);

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

              renderer_1.render(scene_1, camera);
              renderer_2.render(scene_2, camera);
              renderer_3.render(scene_3, camera);
              renderer_4.render(scene_4, camera);

          }
      
      animateEarth();

      //code for TRI
// Create scene
const scene_6 = new THREE.Scene();
scene_6.background = new THREE.Color( 0x050505 );
scene_6.fog = new THREE.Fog( 0x050505, 2000, 3500 );

// Create camera
const camera_6 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera_6.position.z = 2750;

// Create lights
scene_6.add( new THREE.AmbientLight( 0x333333, 3 ) );
const light1 = new THREE.DirectionalLight( 0xffffff, 1.5 );
light1.position.set( 5, 5, 5 );
scene_6.add(light1);
const light2 = new THREE.DirectionalLight( 0xaaaaaa, 4.5 );
light2.position.set( 0, -5, 0 );
scene_6.add(light2);

// Create render
const renderer_6 = new THREE.WebGLRenderer({ canvas: document.querySelector('#tri')});
renderer_6.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer_6.domElement);

// Create geometry
const triangles = 80;
const geometry_6 = new THREE.BufferGeometry();
const vertices = [];
const positions = new Float32Array( triangles * 3 * 3 );

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

const material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors, size: 5, specular: 0x000000, shininess: 250, transparent: true});

// Create mesh
const square = new THREE.Mesh(geometry_6, material);
scene_6.add(square);

const line = new THREE.Line(geometry_6, material );
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


        document.getElementById("globe1").style.display='none';
        document.getElementById("globe2").style.display='none';
        document.getElementById("moon").style.display='none';
        document.getElementById("jupiter").style.display='none';
        document.getElementById("tri").style.display='none';


// Start the visible one
animateVisualizer(selectedVisualizer);

// loader.loadStream('https://soundcloud.com/' + playlist, function() {
// 	// const albumArt = loader.albumArt()
  
// 	// const streamList = loader.streamUrl().map(function(url, idx) {return {"url": url, "artwork": albumArt[idx] ? albumArt[idx] : undefined}})
	


// }, function() {})

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
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
        if (op >= 1){
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
    setTimeout(function() {
        fade(art);
    }, 10000)
}

// Controls
electron.ipcRenderer.on('control', (event, message) => {
	switch(message) {
		case 'NEXT':
			audioSource.next();
			break;
		case 'PREVIOUS':
			audioSource.previous();
			break;
        case 'TOGGLE_VISUALIZER_SETTING':
            visualizers[selectedVisualizer].toggle();
            break;
        case 'CHANGE_VISUALIZER':
            document.getElementById("globe1").style.display='none';
            document.getElementById("globe2").style.display='none';
            selectedVisualizer = (selectedVisualizer+1) % visualizers.length
            animateVisualizer(selectedVisualizer);
            break;
        case 'CHANGE_EARTH1_3D_MODEL':     
            stopVisualizer();
            document.getElementById("globe1").style.display='block';
            break;
        case 'CHANGE_EARTH2_3D_MODEL': 
            stopVisualizer();
        document.getElementById("globe2").style.display='block';
        break
        case 'CHANGE_MOON_3D_MODEL': 
            stopVisualizer();
            document.getElementById("moon").style.display='block';
        break
        case "CHANGE_JUPITER_3D_MODEL":
            stopVisualizer();
            document.getElementById("jupiter").style.display='block';
        break
        case "CHANGE_TRI_3D_MODEL":
            stopVisualizer();
            document.getElementById("tri").style.display='block';
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
    for (let i = 0; i<visualizers.length; i++) {
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
function stopVisualizer(){
    for (let i = 0; i<visualizers.length; i++) {
    visualizers[i].element.style.display = 'none'
    visualizers[i].stop();
}
document.getElementById("globe2").style.display='none';
document.getElementById("globe1").style.display='none';
document.getElementById("moon").style.display='none';
document.getElementById("jupiter").style.display='none';
}

