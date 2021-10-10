/// ***imports
import {
  DEFAULT_IMAGE_PROPS,
  IMAGE_FORMATS,
  PRESETS,
  DOWNLOAD_INNER_CONTAINER,
  ANIMATION_INNER_CONTAINER,
  ANIMATION_UPLOAD_BUTTON,
  ANIMATION_UPLOAD_INPUT,
  ANIMATION_EXIT_BUTTON,
} from "./consts.js";

/// *** consts
const BODY = document.querySelector("body");
const IMAGE = document.querySelector("img");
const CANVAS = document.querySelector("canvas");
const FILTERS = document.querySelector(".filters");
const LABELS = FILTERS.querySelectorAll("label");
const PRESET = document.querySelector(".presets");
const SLIDER_UP = document.querySelector(".slider__button_up");
const PRESETS__ITEMS = document.querySelectorAll(".presets__item");
const SLIDER_DOWN = document.querySelector(".slider__button_down");
const RESET = document.querySelector(".btn-reset");
const NEXT = document.querySelector(".btn-next");
const SAVE = document.querySelector(".btn-save");
const MORE = document.getElementById("more");
const BACKGROUND = document.getElementById("backcolor");
const FOOTER_TEXT = document.querySelector(".footer-text");
const FULLSCREEN_BUTTON = document.querySelector(".fullscreen");
const DATE = new Date();
const HOURS = DATE.getHours();
let uploadButton = document.querySelector(".btn-load");
let fullscreenIsOpen;
let time = "";
let imageCounter = 1;
let newFilter = "none";
let fileType = "jpg";
let step = 0;
let slideCounter = 0;

// *** functions
// ** getters/setters
function getTime() {
  if (0 <= HOURS && HOURS < 6) {
    time = "night";
  } else if (6 <= HOURS && HOURS < 12) {
    time = "morning";
  } else if (12 <= HOURS && HOURS < 18) {
    time = "day";
  } else {
    time = "evening";
  }
}
function setImage() {
  getTime();
  let number;
  if (imageCounter < 10) {
    number = "0" + imageCounter;
  } else {
    number = imageCounter;
  }
  IMAGE.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${number}.jpg`;
  fileType = "jpg";
}
function drawImage() {
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = IMAGE.src;
  img.onload = function () {
    CANVAS.width = img.width;
    CANVAS.height = img.height;
    let ctx = CANVAS.getContext("2d");
    ctx.filter = newFilter;
    ctx.drawImage(img, 0, 0);
  };
  const text = `CSS: ${newFilter}`;
  if (text !== "CSS: none") {
    FOOTER_TEXT.textContent = text;
  } else {
    FOOTER_TEXT.textContent = "";
  }
}
function uploadFile() {
  const fileList = this.files;
  const file = fileList[0];
  fileType = file.type.split("/")[1];
  IMAGE.src = window.URL.createObjectURL(file);
  drawImage();
  closeBtnContainer();
}
function chooseFormat() {
  SAVE.innerHTML = DOWNLOAD_INNER_CONTAINER
  const SAVE_CONTAINER = document.querySelector(".btn-save");
  const jpgFormatButton = SAVE_CONTAINER.children[0].children[1]
  jpgFormatButton.addEventListener('click', () => {
    fileType = "jpg"
    downloadImage()
  })
  const pngFormatButton = document.querySelector('.download-container_button')
  pngFormatButton.addEventListener('click', () => {
    fileType = "png"
    downloadImage()
  })
}
function downloadImage() {
  drawImage();
  setTimeout(() => {
    let link = document.createElement("a");
    link.download = `download.${fileType}`;
    link.href = CANVAS.toDataURL(`image/${fileType}`);
    link.click();
    link.delete;
    SAVE.innerHTML = 'Сохранить'
  }, 1000);
}
function rangesFromPreset() {
  const filterData = newFilter;
  resetFilters();
  const LABELS = FILTERS.querySelectorAll("label");
  const filtersArray = filterData.split(" ");
  for (let i = 0; i < filtersArray.length; i++) {
    const filter = filtersArray[i].split("(")[0];
    const value = +filtersArray[i].split("(")[1].replace(/\D/gi, "");
    for (let j = 0; j < LABELS.length; j++) {
      if (LABELS[j].children[0].name === filter) {
        LABELS[j].children[0].value = value;
        LABELS[j].children[1].value = value;
      }
    }
  }
}
function createPresets() {
  for (let i = 0; i < PRESETS__ITEMS.length; i++) {
    const title = document.createElement("p");
    const id = PRESETS__ITEMS[i].id;
    title.textContent = id;
    PRESETS__ITEMS[i].appendChild(title);
    const image = document.createElement("img");
    image.src = IMAGE.src;
    image.className = "presets__image";
    image.alt = `${IMAGE.src}-${id}`;
    image.style.filter = PRESETS[id];
    PRESETS__ITEMS[i].appendChild(image);
    image.addEventListener("click", () => {
      newFilter = PRESETS[id];
      rangesFromPreset();
      newFilter = PRESETS[id];
      drawImage();
      IMAGE.style.filter = newFilter;
    });
  }
}
function addMoreFilters() {
  MORE.removeEventListener("click", addMoreFilters);
  MORE.remove();
  const brightness = LABELS[3].cloneNode(true);
  brightness.children[0].name = "brightness";
  brightness.firstChild.data = "Яркость";
  FILTERS.appendChild(brightness);
  const contrast = LABELS[3].cloneNode(true);
  contrast.children[0].name = "contrast";
  contrast.firstChild.data = "Контраст";
  FILTERS.appendChild(contrast);
  const grayscale = LABELS[1].cloneNode(true);
  grayscale.children[0].name = "grayscale";
  grayscale.firstChild.data = "Оттенки серого";
  FILTERS.appendChild(grayscale);
  const opacity = LABELS[1].cloneNode(true);
  opacity.children[0].name = "opacity";
  opacity.children[0].value = "100";
  opacity.firstChild.data = "Непрозрачность";
  FILTERS.appendChild(opacity);
  FILTERS.classList.add("filters_more");
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.add("input_more");
  });
  const outputs = document.querySelectorAll("output");
  outputs.forEach((output) => {
    output.classList.add("output_more");
  });
  const labels = document.querySelectorAll("label");
  labels.forEach((label) => {
    label.classList.add("label_more");
  });
}
// * upload errors
function addErrorClasses(secondWord, otherWords) {
  secondWord.classList.add("btn-container-select_error");
  otherWords[0].classList.add("btn-container-select_error");
  otherWords[1].classList.add("btn-container-select_error");
}
function setInvalidUrlError(secondWord, otherWords) {
  secondWord.textContent = "корректный";
  otherWords[1].textContent = "url";
  otherWords[0].textContent = "введите";
  addErrorClasses(secondWord, otherWords);
}
function setInvalidLinkError(secondWord, otherWords) {
  secondWord.textContent = "url";
  otherWords[1].textContent = "изображения";
  otherWords[0].textContent = "введите";
  addErrorClasses(secondWord, otherWords);
}

// ** switchers
// * change image
function switchImage() {
  if (imageCounter !== 20) {
    imageCounter++;
  } else {
    imageCounter = 1;
  }
  setImage();
  for(let i=0; i<PRESETS__ITEMS.length; i++){
    PRESETS__ITEMS[i].innerHTML = ''
  }
  createPresets()
  drawImage();
}
// * change background
function changeBackground(e) {
  const newBackground = e.target.value;
  BODY.style.setProperty("--back", newBackground);
}
// * change slides
function changeSlides(e) {
  const back = e.target.classList.contains("slider__button_up");
  if (back) {
    slideCounter -= 1;
    if (slideCounter < 0) {
      slideCounter = 3;
    }
  } else {
    slideCounter += 1;
    if (slideCounter > 3) {
      slideCounter = 0;
    }
  }
  let shift = -410 * slideCounter;
  for (let i = 0; i < PRESETS__ITEMS.length; i++) {
    PRESETS__ITEMS[i].style = `transform: translateY(${shift}%)`;
  }
}
// * scroll presets
function scrollPresets(e) {
  const data = {};
  if (e.wheelDelta > 0) {
    data.target = SLIDER_UP;
  } else {
    data.target = SLIDER_DOWN;
  }
  changeSlides(data);
}
// * Fullscreen mode
function fullscreenSwitch() {
  if (!fullscreenIsOpen) {
    launchFullScreen();
    fullscreenIsOpen = true;
  } else {
    cancelFullscreen();
    fullscreenIsOpen = false;
  }
}
function launchFullScreen() {
  if (BODY.requestFullScreen) {
    BODY.requestFullScreen();
  } else if (BODY.mozRequestFullScreen) {
    BODY.mozRequestFullScreen();
  } else if (BODY.webkitRequestFullScreen) {
    BODY.webkitRequestFullScreen();
  }
}
function cancelFullscreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

// ** main functions
// * Filters
function setFilter(selector) {
  if (newFilter === "none") {
    newFilter = `${selector.name}(${selector.value}${selector.dataset.sizing})`;
  } else {
    let correctedEffects = newFilter
      .split(" ")
      .filter((i) => {
        return !i.includes(selector.name);
      })
      .join(" ");
    newFilter =
      correctedEffects +
      ` ${selector.name}(${selector.value}${selector.dataset.sizing})`;
  }
}
function useFilter(selector) {
  IMAGE.style.filter = newFilter;
  selector.nextElementSibling.textContent = selector.value;
  drawImage();
}
function fromInputFilter(event) {
  const selector = event.target;
  setFilter(selector);
  step = selector.valueAsNumber;
  useFilter(selector);
}
function fromScrollFilter(event) {
  if (
    event.target.localName !== "label" &&
    event.target.localName !== "input"
  ) {
    return;
  }
  event.preventDefault();
  let selector;
  if (event.target.offsetParent.localName === "body") {
    selector = event.target.firstElementChild;
  } else {
    selector = event.target.offsetParent.firstElementChild;
  }
  step = selector.valueAsNumber;
  if (event.wheelDelta > 0) {
    step += 1;
  } else {
    step -= 1;
  }
  if (step < selector.min) {
    step = +selector.min;
  }
  if (step > selector.max) {
    step = +selector.max;
  }
  setFilter(selector);
  selector.valueAsNumber = step;
  useFilter(selector);
}
function resetFilters() {
  const LABELS = FILTERS.querySelectorAll("label");
  for (let i = 0; i < LABELS.length; i++) {
    const item = LABELS[i].firstElementChild;
    let defaultPropsObject = DEFAULT_IMAGE_PROPS.find((i) => {
      return i.name === item.name;
    });
    item.name = defaultPropsObject.name;
    item.value = defaultPropsObject.value;
    item.dataset.sizing = defaultPropsObject.size;
    IMAGE.style.filter = `${item.name}(${item.value}${item.dataset.sizing})`;
    LABELS[i].lastElementChild.textContent = item.value;
  }
  newFilter = "none";
  drawImage();
}

// **Animation
function uploadBtnAnimation() {
  uploadButton.removeEventListener("click", uploadBtnAnimation);
  uploadButton.classList.add("btn-load_opened");
  uploadButton.innerHTML = ANIMATION_INNER_CONTAINER;
  const container = uploadButton.firstElementChild;
  container.classList.add("btn-open");
  deferredShifting(container);
}
function closeBtnContainer() {
  uploadButton.classList.remove("btn-load_opened");
  uploadButton.outerHTML = `<button class="btn btn-load">Загрузить изображение</button>`;
  const newLoad = document.querySelector(".btn-load");
  uploadButton = newLoad;
  uploadButton.addEventListener("click", uploadBtnAnimation);
}
function deferredShifting(element) {
  const button = element.children[0];
  const select = element.children[1];
  const exit = element.children[2];
  setTimeout(() => {
    button.classList.add("btn-container-choose");
    setTimeout(() => {
      button.textContent = "Загрузить изображение с устройства";
    }, 500);
    select.innerHTML = ANIMATION_UPLOAD_BUTTON;
    button.addEventListener("click", () => {
      button.outerHTML = ANIMATION_UPLOAD_INPUT;
      const UPLOAD = document.getElementById("btnInput");
      UPLOAD.addEventListener("change", uploadFile);
    });
    const input = select.querySelector(".btn-container-select_third");
    const submit = select.querySelector(".btn-container-select_fourth");
    submit.addEventListener("click", () => {
      const reg = /^(ftp|http|https):\/\/[^ "]+$/;
      const secondWord = document.querySelector(".btn-container-select_first");
      const otherWords = document.querySelectorAll(
        ".btn-container-select_second"
      );
      if (reg.test(input.value)) {
        const arr = input.value.split(".");
        const type = arr[arr.length - 1];
        if (
          IMAGE_FORMATS.some((item) => {
            return item === type;
          })
        ) {
          IMAGE.src = input.value;
          closeBtnContainer();
        } else {
          return fetch(`${input.value}`)
            .then((res) => {
              IMAGE.src = res.url;
              closeBtnContainer();
            })
            .catch(() => {
              setInvalidLinkError(secondWord, otherWords);
            });
        }
      } else {
        setInvalidUrlError(secondWord, otherWords);
      }
    });
    setTimeout(() => {
      exit.classList.add("btn-container-exit_active");
      exit.addEventListener("click", closeBtnContainer);
      setTimeout(() => {
        exit.innerHTML = ANIMATION_EXIT_BUTTON;
        exit.setAttribute("title", "CLOSE");
      }, 700);
    }, 5200);
  }, 2000);
}

/// *** start preload functions
drawImage();
createPresets();

// *** listeners
uploadButton.addEventListener("click", uploadBtnAnimation);
FILTERS.addEventListener("change", fromInputFilter);
FILTERS.addEventListener("wheel", fromScrollFilter);
PRESET.addEventListener("wheel", scrollPresets);
RESET.addEventListener("click", resetFilters);
NEXT.addEventListener("click", switchImage);
SAVE.addEventListener("click", chooseFormat);
MORE.addEventListener("click", addMoreFilters);
SLIDER_UP.addEventListener("click", changeSlides);
SLIDER_DOWN.addEventListener("click", changeSlides);
BACKGROUND.addEventListener("change", changeBackground);
FULLSCREEN_BUTTON.addEventListener("click", fullscreenSwitch);
