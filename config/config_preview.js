// let big_screen = false;
let big_screen = true;
let small = {
  width: 2400,
  height: 2400
}
let large = {
  width: 4800,
  height: 4800
}
let width;
let height;
if(big_screen){
  width = large.width
  height = large.height
}
else{
  width = small.width
  height = small.height
}

var config_preview = {
    canvas: {
      width: width,
      height: height
    },
    main_graphic:{
      width: width,
      height: height
    },
    colors: {
      background: 'white',
      palettes:['Spectral'],
    },
    shape: {
      // type: 'rectangle'
      type: 'circle'
      // type: 'triangle'
    },
}
