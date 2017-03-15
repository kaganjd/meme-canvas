// adapted from Daniel Shiffman's
// Drag and Drop tutorial: https://www.youtube.com/watch?v=o4UmGrPst_c
// Mad Libs Generator: https://www.youtube.com/watch?v=ziBO-U2_t3k

// tabletop.js variables
var rawData;

// canvas dimensions
var w = 500;
var h = w;

// text positioning
var x = 10;
var y = h - 350;

var textSizeStart = 40;

var textSizeSlider,
  canvas,
  memeText,
  clearButton,
  saveButton,
  img;

// Offset mouse X and Y
var offX, offY;

function mousePressed() {
  offX = mouseX - x;
  offY = mouseY - y;
}

function mouseDragged() {
  x = mouseX - offX;
  y = mouseY - offY;
  textToCanvas();
}

function setup() {
  // tabletop.js init() function returns data as an array of objects, like this:
  // [{"animal": "horse", 
  //  "color": "brown"},
  //  {"animal": "chick", 
  //  "color": "yellow"}]
  Tabletop.init( { key: '1B4WC1tsm_OnrGZGfltHCoH1ceCYkgkkm5ilhmcyj0Pk',
                   callback: gotData,
                   simpleSheet: true } )

  canvas = createCanvas(w, h);
  background(200);

  memeText = createElement('textarea');
  memeText.parent('text-area');
  memeText.style('width', '300px');
  memeText.input(textToCanvas);

  clearButton = createButton('Clear Canvas');
  clearButton.parent('actions');
  clearButton.mousePressed(clearCanvas);

  saveButton = createButton('Save');
  saveButton.parent('actions');
  saveButton.mousePressed(saveIt);

  textSizeSlider = createSlider(textSizeStart, 100, 70);
  textSizeSlider.parent('size-slider');
  textSizeSlider.input(textToCanvas);

  canvas.parent('canvas');
  canvas.dragOver(highlight);
  canvas.dragLeave(unhighlight);
  canvas.drop(gotFile, unhighlight);
}

function textToCanvas() {
  background(200);

  // if there's an image, render it
  if (img) {
    image(img, 0, 0, w, w);
  }

  // text styling and positioning
  fill(255);
  stroke(0);
  strokeWeight(3);
  textFont("Impact");
  textSize(resizeText());
  var l = memeText.value().toUpperCase();
  var rightTextMargin = w - x;
  text(l, x, y, rightTextMargin, h);

// overwite the textSizeStart with textSizeSlider value
  function resizeText(start, end) {
    start = textSizeStart;
    end = textSizeSlider.value();
    textSize(end);
  }
}

// 'save' button
function saveIt() {
  saveCanvas("meme.png");
}

// 'clear' button
function clearCanvas() {
  clear();
  background(200);
}

// dropzone styling
function highlight() {
  canvas.style('background-color', '#ccc');
  canvas.style('border-style', 'dashed');
}

function unhighlight() {
  canvas.style('background-color', '#fff');
  canvas.style('border-style', 'none');
}

function gotFile(file) {
  img = createImg(file.data);
  img.hide();
  image(img, 0, 0, w, w);
}

function gotData(data, tabletop) { 
  rawData = data;
  console.log(data)
}
