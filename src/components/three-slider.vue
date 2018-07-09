<template>
  <div id="container">
    <canvas id="canvas" class="tempcanvas"></canvas>
  </div>
</template>

<script>
import html from '../assets/html2.svg';
import js from '../assets/js2.svg';
import css from '../assets/css2.svg';
import particle from '../assets/particle.png';
import * as THREE from 'three';
import {TimelineMax} from 'gsap';
var OrbitControls = require('three-orbit-controls')(THREE);


export default {
  data() {
    return {
      images: [ html, css, js ]
    }
  },
  methods: {

  },
  mounted () {

    let vm = this

    let size = 100

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;


    function fillUp ( array, max ) {
      var length = array.length;
      for (let i = 0; i < max - length; i++) {
        array.push( array[ Math.floor( Math.random() * length )])
      }
      return array;
    }

    function shuffle( a ) {
      for (let i = a.length; i; i--) {
        let j = Math.floor( Math.random() * i );
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
    }

    function getArrayFromImage( img ) {
      let imageCoords = [];
      ctx.clearRect( 0, 0, size, size )
      ctx.drawImage( img, 0, 0, size, size )
      let data = ctx.getImageData( 0,0, size, size );

      data =  data.data;


      for( let y = 0;  y < size; y++ ) {
        for( let x = 0; x < size; x++ ) {
          let red = data[ (( size * y ) + x ) * 4 ];
          let green = data[ (( size * y ) + x ) * 4 + 1 ];
          let blue = data[ (( size * y ) + x ) * 4 + 2 ];
          let alpha = data[ (( size * y ) + x ) * 4 + 3 ];

          if(alpha > 0) {
            imageCoords.push( [ 10 * ( x - size / 2 ), 10 * ( size / 2 - y )] );
          }

        }
      }
      return shuffle(fillUp(imageCoords, 10000));
    }

    function loadImages(paths, whenLoaded) {
      var imgs = [];
      paths.forEach(function(path) {
        var img = new Image();
        img.onload = function() {
          // console.log(img);
          imgs.push(img);
          if (imgs.length === paths.length) { 
            whenLoaded(imgs);
          }
        }
        img.src = path;
      });
    }

    loadImages(vm.images, function(loadedImages) {

      var gallery = [];
      loadedImages.forEach((el,index) => {
        gallery.push(getArrayFromImage(loadedImages[index]));
      });


      let camera, controls, scene, renderer, geometry;

      function init( ) {
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xcccccc );
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );


        var container = vm.$el;
        container.appendChild( renderer.domElement );
        camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 2000)
        camera.position.z = 600;
        camera.position.y = 10;
        controls = new OrbitControls( camera, renderer.domElement);


        var texture = new THREE.TextureLoader().load(particle);
        var material = new THREE.PointCloudMaterial({
          size: 13,
          vertexColors: THREE.VertexColors,
          map: texture,
          alphaTest: 0.5
        });

        geometry = new THREE.Geometry()


        gallery[0].forEach((el, index) => {
          geometry.vertices.push(new THREE.Vector3(el[0], el[1], Math.random() * 70));
          geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()))
          // geometry.colors.push(new THREE.Color(0x0277bd))
        })

        var pointCloud = new THREE.PointCloud(geometry, material);
        scene.add(pointCloud);


        window.addEventListener("resize", onWindowResize, false);

      }

      function onWindowResize () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight )
      }

      var i = 0;

      function animate() {
        i++;
        requestAnimationFrame( animate );

        geometry.vertices.forEach((particle, index) => {
          var dx, dy, dz;
          dx = Math.sin(i/10 + index/2)/10;
          dy = 0;
          dz = 0;
          particle.add(new THREE.Vector3(dx, dy, dz));
        });

        geometry.verticesNeedUpdate = true;

        render();

      }

      function render () {
        renderer.render( scene, camera );
      }

      init();
      animate();

      var current = 0
      setInterval(() => {
        current++;
        current = current % gallery.length;
        geometry.vertices.forEach(function(particle, index) {
          let tl = new TimelineMax();
          tl.to(particle, 1, { x: gallery[current][index][0], y: gallery[current][index][1]})
        })
      }, 3000)

      // var current = 0
      // document.body.addEventListener("click", () => {

      //   current++;
      //   current = current % gallery.length;
      //   geometry.vertices.forEach(function(particle, index) {
      //     let tl = new TimelineMax();
      //     tl.to(particle, 1, { x: gallery[current][index][0], y: gallery[current][index][1]})
      //   })
      // })
    });

  }
}

</script>

<style scoped lang='sass'>
.tempcanvas
  position: absolute
  top: 0
  left: 0
  display: none
</style>





