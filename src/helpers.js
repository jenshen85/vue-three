
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
  return imageCoords;
}

function loadImages(paths, whenLoaded) {
  var imgs = [];
  paths.forEach(function(path) {
    var img = new Image();
    img.onload = function() {
      imgs.push(img);
      if (imgs.length === paths.length) whenLoaded(imgs);
    }
    img.src = path;
  });
}



module.exports = {
  fillUp, shuffle,
  getArrayFromImage, loadImages
};