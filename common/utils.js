// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function toggleElements(elementToHide, elementToShow) {
    elementToHide.style.display = "none";
    elementToShow.style.display = "inline";
}