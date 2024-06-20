// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
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


//3d earth code
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
        document.getElementById("globe1").style.display='none';
        document.getElementById("globe2").style.display='none';
        document.getElementById("moon").style.display='none';
        document.getElementById("jupiter").style.display='none';

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

