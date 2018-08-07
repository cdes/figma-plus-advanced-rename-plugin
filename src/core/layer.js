import { doubleClickEvent } from "./utilities";

class Layer {
  constructor(domNode) {
    this.domNode = domNode;
  }

  get name() {
    return this.domNode.innerText;
  }

  set name(newName) {
    const { domNode } = this;

    const span = domNode.querySelector('span[class*="object_row--rowText"');
    span.dispatchEvent(doubleClickEvent);

    const input = domNode.querySelector('input[class*="object_row--input"');
    input.value = newName;
    input.focus();
    input.blur();
  }
}

export default Layer;