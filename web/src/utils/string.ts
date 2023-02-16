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

function abbreviateNumberPlusMinus50Million(number: number): string {
  if (number > 50000000 || number < -50000000) {
    throw new Error("Number must be between -50M and 50M.");
  }

  const suffixes = ["", "K", "M"];
  const suffixNum = Math.floor(("" + number).length / 3);
  let shortNumber = parseFloat((suffixNum != 0 ? (number / Math.pow(1000, suffixNum)) : number).toFixed(2));
  if (shortNumber % 1 !== 0) {
    shortNumber = Number(shortNumber.toFixed(1));
  }
  return shortNumber + suffixes[suffixNum];
}

export { rgbToHex, capitalizeFirstLetter, abbreviateNumberPlusMinus50Million }

