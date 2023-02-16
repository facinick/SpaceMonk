function rgbToHex(rgb: string): string {
  // Remove the "rgb(" and ")" characters from the input string
  const rgbValues = rgb.slice(4, -1).split(",");

  // Convert the RGB values to decimal integers
  const r = parseInt(rgbValues[0].trim());
  const g = parseInt(rgbValues[1].trim());
  const b = parseInt(rgbValues[2].trim());

  // Convert the decimal RGB values to a hex string
  const hex = ((r << 16) | (g << 8) | b).toString(16);

  // Pad the hex string with leading zeros, if necessary
  return "#" + ("000000" + hex).slice(-6);
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { rgbToHex, capitalizeFirstLetter }
