/// *** consts
const MAIN = document.querySelector('.main');
const IMAGE = document.querySelector('img');
const CANVAS = document.querySelector('canvas');
const FILTERS = document.querySelector('.filters');
const LABELS = FILTERS.querySelectorAll('label');
const RESET = document.querySelector('.btn-reset');
const NEXT = document.querySelector('.btn-next');
const SAVE = document.querySelector('.btn-save');
const UPLOAD = document.getElementById("btnInput");
const FULLSCREEN_BUTTON = document.querySelector('.openfullscreen');
const DEFAULT_IMAGE_PROPS = [
  {name: "blur", size: "px", value: "0"},
  {name: "invert", size: "%", value: "0"},
  {name: "sepia", size: "%", value: "0"},
  {name: "saturate", size: "%", value: "100"},
  {name: "hue-rotate", size: "deg", value: "0"}
];
const DATE = new Date();
const HOURS = DATE.getHours();
let fullscreenIsOpen;
let time = '';
let imageCounter = 1;
let newFilter = 'none';
let fileType = 'jpg';

// *** functions
// ** getters/setters
function getTime() {
  if((0 <= HOURS) && (HOURS < 6)){time = 'night'}
  else if((6 <= HOURS) && (HOURS < 12)){time = 'morning'}
  else if((12 <= HOURS) && (HOURS < 18)){time = 'day'}
  else{time = 'evening'}
};
function setImage() {
  getTime();
  let number;
  if(imageCounter < 10){number = '0' + imageCounter}
  else {number = imageCounter};
  IMAGE.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${number}.jpg`;
  fileType = 'jpg';
};
function drawImage() {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = IMAGE.src;
  img.onload = function() {
    CANVAS.width = img.width;
    CANVAS.height = img.height;
    let ctx = CANVAS.getContext("2d");
    ctx.filter = newFilter;
    ctx.drawImage(img, 0, 0);
  };
};
function uploadFile() {
  const fileList = this.files;
  const file = fileList[0];
  fileType = file.type.split('/')[1];
  IMAGE.src = window.URL.createObjectURL(file);
  drawImage();
}

// ** switchers
// * Fullscreen mode
function switchImage() {
  if(imageCounter !== 20){imageCounter ++}
  else {imageCounter = 1}
  setImage();
  resetFilters();
  drawImage();
};
function fullscreenSwitch() {
  if(!fullscreenIsOpen){
    launchFullScreen();
    fullscreenIsOpen = true;
  } else {
    cancelFullscreen();
    fullscreenIsOpen = false;
}};
function launchFullScreen() {
  if(MAIN.requestFullScreen) {
    MAIN.requestFullScreen();
  } else if(MAIN.mozRequestFullScreen) {
    MAIN.mozRequestFullScreen();
  } else if(MAIN.webkitRequestFullScreen) {
    MAIN.webkitRequestFullScreen();
}};
function cancelFullscreen() {
  if(document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
}};

// ** main functions
// * Filters
function useFilter(event) {
  if(newFilter === 'none'){
    newFilter = `${event.target.name}(${event.target.value}${event.target.dataset.sizing})`;
  } else {
    let correctedEffects = newFilter.split(' ').filter((i) => {
      return !i.includes(event.target.name)
    }).join(' ');
    newFilter = correctedEffects + ` ${event.target.name}(${event.target.value}${event.target.dataset.sizing})`;
  }
  IMAGE.style.filter = newFilter;
  event.target.nextElementSibling.textContent = event.target.value;
  drawImage();
};
function resetFilters(){
  for(i=0; i<LABELS.length; i++){
    const item = LABELS[i].firstElementChild;
    let defaultPropsObject = DEFAULT_IMAGE_PROPS.find((i) => {
      return i.name === item.name
    });
    item.name = defaultPropsObject.name;
    item.value = defaultPropsObject.value;
    item.dataset.sizing = defaultPropsObject.size;
    IMAGE.style.filter = `${item.name}(${item.value}${item.dataset.sizing})`;
    LABELS[i].lastElementChild.textContent = item.value;
  };
  newFilter = "none";
  drawImage();
};
function downloadImage() {
  let link = document.createElement('a');
  link.download = `download.${fileType}`;
  link.href = CANVAS.toDataURL(`image/${fileType}`);
  link.click();
  link.delete;
};

/// *** start preload functions
setImage()
drawImage();

// *** listeners
FILTERS.addEventListener("change", useFilter);
RESET.addEventListener("click", resetFilters);
NEXT.addEventListener("click", switchImage);
UPLOAD.addEventListener("change", uploadFile);
SAVE.addEventListener("click", downloadImage);
FULLSCREEN_BUTTON.addEventListener('click', fullscreenSwitch);
