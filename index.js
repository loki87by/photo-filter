/// ***imports
import { DEFAULT_IMAGE_PROPS, IMAGE_FORMATS, ANIMATION_INNER_CONTAINER, ANIMATION_UPLOAD_BUTTON, ANIMATION_UPLOAD_INPUT, ANIMATION_EXIT_BUTTON } from './consts.js';

/// *** consts
const MAIN = document.querySelector('.main');
const IMAGE = document.querySelector('img');
const CANVAS = document.querySelector('canvas');
const FILTERS = document.querySelector('.filters');
const LABELS = FILTERS.querySelectorAll('label');
const RESET = document.querySelector('.btn-reset');
const NEXT = document.querySelector('.btn-next');
const SAVE = document.querySelector('.btn-save');
const MORE = document.getElementById('more');
const FULLSCREEN_BUTTON = document.querySelector('.fullscreen');
const DATE = new Date();
const HOURS = DATE.getHours();
let uploadButton = document.querySelector('.btn-load');
let fullscreenIsOpen;
let time = '';
let imageCounter = 1;
let newFilter = 'none';
let fileType = 'jpg';
let step = 0;

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
  closeBtnContainer();
};
function downloadImage() {
  drawImage();
  setTimeout(() => {
  let link = document.createElement('a');
  link.download = `download.png`;
  link.href = CANVAS.toDataURL(`image/png`);
  link.click();
  link.delete;
  }, 1000);
};
function addMoreFilters() {
  MORE.removeEventListener("click", addMoreFilters);
  MORE.remove();
  const brightness = LABELS[3].cloneNode(true);
  brightness.children[0].name = 'brightness';
  brightness.firstChild.data = 'Brightness';
  FILTERS.appendChild(brightness);
  const contrast = LABELS[3].cloneNode(true);
  contrast.children[0].name = 'contrast';
  contrast.firstChild.data = 'Contrast';
  FILTERS.appendChild(contrast);
  const grayscale = LABELS[1].cloneNode(true);
  grayscale.children[0].name = 'grayscale';
  grayscale.firstChild.data = 'Grayscale';
  FILTERS.appendChild(grayscale);
  const opacity = LABELS[1].cloneNode(true);
  opacity.children[0].name = 'opacity';
  opacity.children[0].value = '100';
  opacity.firstChild.data = 'Opacity';
  FILTERS.appendChild(opacity);
  FILTERS.classList.add('filters_more');
};
// * upload errors
function addErrorClasses(secondWord, otherWords) {
  secondWord.classList.add('btn-container-select_error');
  otherWords[0].classList.add('btn-container-select_error');
  otherWords[1].classList.add('btn-container-select_error');
};
function setInvalidUrlError(secondWord, otherWords) {
  secondWord.textContent = 'valid';
  otherWords[1].textContent = 'url';
  otherWords[0].textContent = 'enter';
  addErrorClasses(secondWord, otherWords);
};
function setInvalidLinkError(secondWord, otherWords) {
  secondWord.textContent = 'url to';
  otherWords[1].textContent = 'image';
  otherWords[0].textContent = 'enter';
  addErrorClasses(secondWord, otherWords);
};

// ** switchers
function switchImage() {
  if(imageCounter !== 20){imageCounter ++}
  else {imageCounter = 1}
  setImage();
  drawImage();
};
// * Fullscreen mode
function fullscreenSwitch() {
  if(!fullscreenIsOpen){
    launchFullScreen();
    fullscreenIsOpen = true;
  } else {
    cancelFullscreen();
    fullscreenIsOpen = false;
  }
};
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
function setFilter(selector) {
  if(newFilter === 'none'){
    newFilter = `${selector.name}(${selector.value}${selector.dataset.sizing})`;
    } else {
    let correctedEffects = newFilter.split(' ').filter((i) => {
      return !i.includes(selector.name);
    }).join(' ');
    newFilter = correctedEffects + ` ${selector.name}(${selector.value}${selector.dataset.sizing})`;
  }
};
function useFilter(selector) {
  IMAGE.style.filter = newFilter;
  selector.nextElementSibling.textContent = selector.value;
  drawImage();
};
function fromInputFilter(event) {
  const selector = event.target;
  setFilter(selector);
  step = selector.valueAsNumber;
  useFilter(selector);
};
function fromScrollFilter(event) {
  if((event.target.localName !== 'label') && (event.target.localName !== 'input')) {
    return;
  }
  event.preventDefault();
  let selector;
  if(event.target.offsetParent.localName === 'body') {
    selector = event.target.firstElementChild;
  } else {
    selector = event.target.offsetParent.firstElementChild;
  }
  step = selector.valueAsNumber;
  if(event.wheelDelta > 0) {step += 1}
  else {step -= 1}
  if(step < selector.min) {step = +selector.min}
  if(step > selector.max) {step = +selector.max}
  setFilter(selector);
  selector.valueAsNumber = step;
  useFilter(selector);
};
function resetFilters(){
  for(let i=0; i<LABELS.length; i++){
    const item = LABELS[i].firstElementChild;
    let defaultPropsObject = DEFAULT_IMAGE_PROPS.find((i) => {
      return i.name === item.name;
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

// **Animation
function uploadBtnAnimation() {
  uploadButton.removeEventListener("click", uploadBtnAnimation);
  uploadButton.classList.add('btn-load_opened');
  uploadButton.innerHTML = ANIMATION_INNER_CONTAINER;
  const container = uploadButton.firstElementChild;
  container.classList.add('btn-open');
  deferredShifting(container);
};
function closeBtnContainer() {
  uploadButton.classList.remove('btn-load_opened');
  uploadButton.outerHTML = `<button class="btn btn-load">Load picture</button>`;
  const newLoad = document.querySelector('.btn-load');
  uploadButton = newLoad;
  uploadButton.addEventListener("click", uploadBtnAnimation);
};
function deferredShifting(element) {
  const button = element.children[0];
  const select = element.children[1];
  const exit = element.children[2];
  setTimeout(() => {
    button.classList.add('btn-container-choose');
    setTimeout(() => {
      button.textContent = 'Load picture from your device';
    }, 500);
    select.innerHTML = ANIMATION_UPLOAD_BUTTON;
    button.addEventListener("click", () => {
      button.outerHTML = ANIMATION_UPLOAD_INPUT;
      const UPLOAD = document.getElementById("btnInput");
      UPLOAD.addEventListener("change", uploadFile);
    });
    const input = select.querySelector('.btn-container-select_third');
    const submit = select.querySelector('.btn-container-select_fourth');
    submit.addEventListener("click", () => {
      const reg = /^(ftp|http|https):\/\/[^ "]+$/;
      const secondWord = document.querySelector('.btn-container-select_first');
      const otherWords = document.querySelectorAll('.btn-container-select_second');
      if (reg.test(input.value)) {
        const arr = input.value.split('.');
        const type = arr[arr.length - 1];
        if(IMAGE_FORMATS.some((item) => {return item === type})) {
          IMAGE.src = input.value ;
          closeBtnContainer();
        } else {
          return fetch(`${input.value}`)
          .then((res) => {
            IMAGE.src = res.url;
            closeBtnContainer();
          })
          .catch(() => {
            setInvalidLinkError(secondWord, otherWords);
          })
        }
      } else {
        setInvalidUrlError(secondWord, otherWords);
      }
    });
    setTimeout(() => {
      exit.classList.add('btn-container-exit_active');
      exit.addEventListener("click", closeBtnContainer);
      setTimeout(() => {
        exit.innerHTML = ANIMATION_EXIT_BUTTON;
        exit.setAttribute('title', 'CLOSE');
      }, 700)
    }, 5200);
  }, 2000)
}

/// *** start preload functions
drawImage();

// *** listeners
uploadButton.addEventListener("click", uploadBtnAnimation);
FILTERS.addEventListener("change", fromInputFilter);
FILTERS.addEventListener("wheel", fromScrollFilter);
RESET.addEventListener("click", resetFilters);
NEXT.addEventListener("click", switchImage);
SAVE.addEventListener("click", downloadImage);
MORE.addEventListener("click", addMoreFilters);
FULLSCREEN_BUTTON.addEventListener('click', fullscreenSwitch);
