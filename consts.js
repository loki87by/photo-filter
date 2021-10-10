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
const PRESETS = {
  '1977': 'contrast(110%) brightness(110%) saturate(130%)',
  'Aden': 'contrast(90%) brightness(120%) saturate(85%) hue-rotate(20deg)',
  'Amaro': 'contrast(90%) brightness(110%) saturate(150%) hue-rotate(-10deg)',
  'Brannan': 'contrast(140%) sepia(50%)',
  'Brooklyn': 'contrast(90%) brightness(110%)',
  'Clarendon': 'contrast(120%) saturate(125%)',
  'Earlybird': 'contrast(90%) sepia(20%)',
  'Gingham': 'brightness(105%) hue-rotate(350deg)',
  'Hudson': 'contrast(90%) brightness(120%) saturate(110%)',
  'Inkwell': 'contrast(110%) brightness(110%) sepia(30%) grayscale(100%)',
  'Lofi': 'contrast(150%) saturate(110%)',
  'Maven': 'contrast(95%) brightness(95%) saturate(150%) sepia(25%)',
  'Reyes': 'contrast(85%) brightness(110%) saturate(75%) sepia(22%)',
  'Stinson': 'contrast(75%) brightness(115%) saturate(85%)',
  'Valencia': 'contrast(108%) brightness(108%) sepia(8%)',
  'Xpro2': 'sepia(30%)',
}
const DOWNLOAD_INNER_CONTAINER = `<div class="btn download-container">
<p class="btn download-container_text">Выберите формат</p>
<button class="btn">JPG</button>
<button class="btn download-container_button">PNG</button>
</div>`
const ANIMATION_INNER_CONTAINER = `<div>
  <button class="btn-load_closed">Загрузить</button>
  <div class="btn-container-form"><p>изображение</p></div>
  <div class="btn-container-exit"><div>
  </div>`;
const ANIMATION_UPLOAD_BUTTON = `<p class="btn-container-select btn-container-select_second btn-container-select_top">Загрузить</p>
  <p class="btn-container-select btn-container-select_first">изображение</p>
  <p class="btn-container-select btn-container-select_second">по</p>
  <input class="btn-container-select btn-container-select_third" type="url" title="enter a link to the picture" placeholder="URL">
  <button class="btn-container-select btn-container-select_fourth">ЗАГРУЗИТЬ</button>`;
const ANIMATION_UPLOAD_INPUT = `<input class="btn-load--input" id="btnInput" name="upload" type="file" accept="image/*" placeholder="Загрузить изображение" />`;
const ANIMATION_EXIT_BUTTON = `<div class="btn-container-exit-horisontal-line"></div>
  <div class="btn-container-exit-horisontal-line btn-container-exit-horisontal-line_bottom"></div>
  <div class="btn-container-exit-vertical-line"></div>
  <div class="btn-container-exit-vertical-line btn-container-exit-vertical-line_right"></div>`;

export { DEFAULT_IMAGE_PROPS, DOWNLOAD_INNER_CONTAINER, IMAGE_FORMATS, PRESETS, ANIMATION_INNER_CONTAINER, ANIMATION_UPLOAD_BUTTON, ANIMATION_UPLOAD_INPUT, ANIMATION_EXIT_BUTTON };