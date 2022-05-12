function getRandomColor(name) {
  const firstAlphabet = name.charAt(0).toLowerCase();
  const asciiCode = firstAlphabet.charCodeAt(0);
  const colorNum =
    asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

  var num = Math.round(0xffffff * parseInt(colorNum));
  var r = (num >> 16) & 255;
  var g = (num >> 8) & 255;
  var b = num & 255;
  //character: firstAlphabet.toUpperCase(),
  return "rgba(" + r + "," + g + "," + b + ",0.5)";
}

export default getRandomColor;

export function getFirstLetter(name) {
  const firstAlphabet = name.charAt(0).toUpperCase();
  return firstAlphabet;
}
