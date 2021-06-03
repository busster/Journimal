const Charcoal = '#264653'
const PersianGreen = '#2A9D8F'
const OrangeYellowCrayola = '#E9C46F'
const SandyBrown = '#F4A261'
const BurntSienna = '#E76F51'
const White = '#FFFF'

const TextDisabled = '#597986'

export const Colors = {
  Primary: BurntSienna,
  Secondary: PersianGreen,
  Tertiary: OrangeYellowCrayola,
  Background: Charcoal,
  Accent: White
}

export const TextColors = {
  Disabled: TextDisabled
}

export const shade = (col, amt) => {
  var usePound = false;

  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }

  var num = parseInt(col,16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

export default shade;
