// adapted from Daniel Shiffman's Drag and Drop tutorial
// https://www.youtube.com/watch?v=o4UmGrPst_c

// canvas dimensions
var w = 400;
var h = w;

// text positioning
var x = 10;
var y = h - 100;
// var leading = w;
var s = w / 10;
var rightTextMargin = w - 25;

var canvas;
var memeText, clearButton, saveButton;
var stringHolder = [];

function setup() {
  canvas = createCanvas(w, h);
  background(200);

  memeText = createElement('textarea', '(right over here) (^_-)');
  memeText.parent('textarea');
  memeText.style('width', '300px');
  memeText.input(textToCanvas);

  clearButton = createButton('Clear Canvas');
  clearButton.parent('clear');
  clearButton.mousePressed(resetCanvas);

  saveButton = createButton('Save');
  saveButton.parent('actions');
  saveButton.mousePressed(saveCanvas);

  canvas.parent('canvas');
  canvas.dragOver(highlight);
  canvas.dragLeave(unhighlight);
  canvas.drop(gotFile, unhighlight);
}

function textToCanvas() {

 // convert toString() instead of going letter by letter
 // like this: 

  //  selectedString = window.getSelection().toString();

  // if (selectedString.length > 0) {
  //   textFont("Impact");
  //   textSize(stringHeight);
  //   stroke(0);
  //   strokeWeight(stringHeight / 10);
  //   fill(255);
  //   textLeading(350);
  //   text(selectedString, 5, 5, width - 10, height - 10);
  //   console.log(selectedString);
  // }
// stringHolder.push(selectedString); 

  fill(255);
  stroke(0);
  strokeWeight(4);
  // textLeading(300);
    console.log('hits leading!')
  textFont("Impact");
  textSize(s);
  var l = memeText.value().toUpperCase();
  text(l, x, y, rightTextMargin, h);
  // t.style('text-shadow', '2px 2px 4px #000');
}

function highlight() {
  canvas.style('background-color', '#ccc');
  canvas.style('border-style', 'dashed');
}

function unhighlight() {
  canvas.style('background-color', '#fff');
  canvas.style('border-style', 'none');
}

function gotFile(file) {
  var img = createImg(file.data);
  img.hide();
  image(img, 0, 0, w, w);
}

function resetCanvas() {
  clear();
  background(200);
}
