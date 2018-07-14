<template>
  <div>
    <canvas ref="canvas" class="tempcanvas"
            :width="size" :height="size"></canvas>
  </div>
</template>

<script>
import html from '../assets/html.svg';
import js from '../assets/js.svg';
import css from '../assets/css.svg';
// import particle from '../assets/particle.png';
// import * as THREE from 'three';
// import {TimelineMax} from 'gsap';
// import ThreeOrbitControls from 'three-orbit-controls'
import { loadImages, cbFn /*fillUp, shuffle ,*/ /*getArrayFromImage,*/ } from '../helpers.js';

// console.log(fillUp);

// const OrbitControls = ThreeOrbitControls(THREE);

export default {
  data() {
    return {
      images: [ html, css, js ],
      size: 100,
    }
  },
  methods: {

  },
  mounted () {

    let vm = this
    let canvas = this.$refs.canvas;
    let ctx = canvas.getContext('2d');

    // function fillUp ( array, max ) {
    //   var length = array.length;
    //   for (let i = 0; i < max - length; i++) {
    //     array.push( array[ Math.floor( Math.random() * length )])
    //   }
    //   return array;
    // }

    // function shuffle( a ) {
    //   for (let i = a.length; i; i--) {
    //     let j = Math.floor( Math.random() * i );
    //     [a[i - 1], a[j]] = [a[j], a[i - 1]];
    //   }
    //   return a;
    // }

    // function getArrayFromImage( img ) {
    //   let imageCoords = [];
    //   ctx.clearRect( 0, 0, size, size )
    //   ctx.drawImage( img, 0, 0, size, size )
    //   let data = ctx.getImageData( 0,0, size, size );

    //   data = data.data;

    //   for( let y = 0;  y < size; y++ ) {
    //     for( let x = 0; x < size; x++ ) {
    //       const yPos = size * y
    //       const xPos = yPos + x
    //       const curPixelPos = xPos * 4
    //       let red = data[curPixelPos];
    //       let green = data[curPixelPos + 1 ];
    //       let blue = data[curPixelPos + 2 ];
    //       let alpha = data[curPixelPos + 3 ];

    //       if(alpha > 0) {
    //         imageCoords.push( [ 10 * ( x - size / 2 ), 10 * ( size / 2 - y )] );
    //       }
    //     }
    //   }
    //   return shuffle(fillUp(imageCoords, 10000));
    // }

    // function loadImages(paths, context, whenLoaded) {
    //   let imgs = [];
    //   paths.forEach(function(path) {
    //     let img = new Image();
    //     img.onload = function() {
    //       // console.log(img);
    //       imgs.push(img);
    //       if (imgs.length === paths.length) { 
    //         whenLoaded(imgs);
    //       }
    //     }
    //     img.src = path;
    //   });
    // }
    
    const container = vm.$el;

    loadImages(vm.images, container, ctx, vm.size, cbFn);

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





