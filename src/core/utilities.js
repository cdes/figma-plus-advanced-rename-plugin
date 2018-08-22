export const doubleClickEvent = new MouseEvent("dblclick", {
  view: window,
  button: 0,
  bubbles: true,
  cancelable: true
});

export const sortLayerByListPosition = (a,b) => {
  if (a.position < b.position)
      return -1;
  if (a.position > b.position)
      return 1;
  return 0;
}

export const isObjectEmpty = (obj) => {
  Object.keys(obj).length === 0 && obj.constructor === Object
}