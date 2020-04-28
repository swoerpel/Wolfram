var graphic;
var grid;
var params;
var pause = false;
var color_palette;
var color_palette_name;
var color_machines;
var shape_machine;
var palettes;``
var palette_names;
var params;
var wolfram_generator;
var draw_index = 0;
var color_offset = Math.random()

function setup() {
  params = new Object(config_preview);
  Refresh();
  build_color_library();
  setup_colors();
  graphic.strokeWeight(0);
}

function build_color_library() {
  palettes = {};
  for (let i = 0; i < chromotome_palettes.length; i++) {
    let key = chromotome_palettes[i].name;
    this.palettes[key] = new Object(chromotome_palettes[i].colors);
  }
  palettes = { ...palettes, ...chroma.brewer };
  palette_names = Object.keys(palettes);
  // console.log(palettes)
}

function setup_colors(){
  color_machines = [];
  
  for(let i = 0; i < params.colors.palettes.length; i++){
    let pal = params.colors.palettes[i];
    if(pal == 'random'){
      let keys = Object.keys(palettes)
      let rand_index = Math.floor(Math.random() * keys.length)
      pal = keys[rand_index]
    }else{
      pal = params.colors.palettes[i]
    }
    console.log(palettes)
    color_palette = palettes[pal]
    console.log(color_palette)
    color_machines.push(chroma.scale(color_palette));
  }
  console.log('color machines -> ',color_machines)

}


function Refresh(loaded_base_params = []){
  let controller = new WolframController(params);
  controller.Initialize();
  wolfram_generator = controller.getGenerator();
  createCanvas(params.canvas.width,params.canvas.height);
  graphic = createGraphics(params.canvas.width,params.canvas.height);
  graphic.background(params.colors.background)
  draw_index = 0;
}


function draw() {
  if(!pause){
    drawWolfram();
    image(graphic,0,0)
    draw_index++;
  }
}  


function drawWolfram(){
  let sub_step_x = params.canvas.width / wolfram_params.grid.width
  let sub_step_y = params.canvas.height / wolfram_params.grid.height
  let row;
  let row_index = draw_index;
  (row_index < wolfram_generator.kernel.dims.y) ?
    row = wolfram_generator.getInitRow(row_index):
    row = wolfram_generator.generateRow()
  graphic.translate(sub_step_x / 2, sub_step_y / 2)
  for(let k = 0; k < row.length; k++){
    let shape_params = {
      origin: {
        x: k * sub_step_x,
        y: row_index * sub_step_y,
        cx: k * sub_step_x,
        cy: row_index * sub_step_y,
      },
      width: sub_step_x,
      height: sub_step_y,
      subshape_size: 1,
      rotation: wolfram_params.rotation[Math.floor(Math.random() * wolfram_params.rotation.length)],
      color_value: int(row[k]) / (wolfram_params.base - 1)
    }
    graphic.fill(this.color_machines[0](shape_params.color_value).hex())
    graphic.circle(shape_params.origin.cx, shape_params.origin.cy, shape_params.width / 2)
  }
  graphic.translate(-sub_step_x / 2, -sub_step_y / 2)
}


function keyPressed() {
  if(keyCode === 32) //'space' pause/play
    pause = !pause
  if(keyCode == 82) // 'r'
    Refresh();
  console.log('key pressed:', keyCode)
}
