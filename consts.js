const DEFAULT_IMAGE_PROPS = [
  {name: "blur", size: "0px", value: "0"},
  {name: "invert", size: "%", value: "0"},
  {name: "sepia", size: "%", value: "0"},
  {name: "saturate", size: "%", value: "100"},
  {name: "hue-rotate", size: "deg", value: "0"},
  {name: "brightness", size: "%", value: "100"},
  {name: "contrast", size: "%", value: "100"},
  {name: "grayscale", size: "%", value: "100"},
  {name: "opacity", size: "%", value: "100"}
];
const IMAGE_FORMATS = [
  'bmp', 'dib', 'rle', 'ecw', 'gif', 'ico', 'iff', 'lbm', 'bbm', 'ilbm', 'pic',
  'jpg', 'jpeg', 'jp2', 'j2k', 'jpf', 'jpm', 'jpg2', 'j2c', 'jpc', 'jpx', 'mj2',
  'sid', 'pcx', 'pcc', 'png', 'psd', 'tga', 'tpic', 'vda', 'vst', 'icb', 'tif',
  'tiff', 'jxr', 'hdp', 'wdp', 'webp', 'xbm', 'xps', 'oxps', 'rla', 'rpf', 'pnm',
];
const ANIMATION_INNER_CONTAINER = `<div>
  <button class="btn-load_closed">Load</button>
  <div class="btn-container-form"><p>picture</p></div>
  <div class="btn-container-exit"><div>
  </div>`;
const ANIMATION_UPLOAD_BUTTON = `<p class="btn-container-select btn-container-select_second btn-container-select_top">load</p>
  <p class="btn-container-select btn-container-select_first">picture</p>
  <p class="btn-container-select btn-container-select_second">from</p>
  <input class="btn-container-select btn-container-select_third" type="url" title="enter a link to the picture" placeholder="URL">
  <button class="btn-container-select btn-container-select_fourth">UPLOAD</button>`;
const ANIMATION_UPLOAD_INPUT = `<input class="btn-load--input" id="btnInput" name="upload" type="file" accept="image/*" placeholder="Load picture" />`;
const ANIMATION_EXIT_BUTTON = `<div class="btn-container-exit-horisontal-line"></div>
  <div class="btn-container-exit-horisontal-line btn-container-exit-horisontal-line_bottom"></div>
  <div class="btn-container-exit-vertical-line"></div>
  <div class="btn-container-exit-vertical-line btn-container-exit-vertical-line_right"></div>`;

export { DEFAULT_IMAGE_PROPS, IMAGE_FORMATS, ANIMATION_INNER_CONTAINER, ANIMATION_UPLOAD_BUTTON, ANIMATION_UPLOAD_INPUT, ANIMATION_EXIT_BUTTON };