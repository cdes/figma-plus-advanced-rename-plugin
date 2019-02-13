/**
 * THIS FILE IS USED TO SIMULATE FIGMA PLUGIN API IN DEVELOPMENT ENVIROMENT.
 * IT WON'T BE PACKAGED WITH YOUR PLUGIN WHEN YOU BUILD IT.
 */

/** @jsx h */
import h from "vhtml";
import './figma-plugin-panel.scss'

const createHtmlNodes = str =>
  document.createRange().createContextualFragment(str);

const panel = (title) => (
  <div class="figma-plugin-panel">
    <header>
      <span>{title}</span>
      <button class="close">
        <span class="g0126e402" />
      </button>
    </header>
    <div class="figma-plugin-ui" />
  </div>
);

class FigmaPluginPanel {
  showUI = (title, callback, width, height) => {    
    const ui = panel(title);
    const htmlNodes = createHtmlNodes(ui);
    document.body.appendChild(htmlNodes);

    this.panel = document.querySelector(".figma-plugin-panel");

    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    this.panel.style.left = clientWidth / 2 - width / 2 + "px";
    this.panel.style.top = clientHeight / 2 - height / 2 + "px";
    this.panel.style.width = width + "px";
    this.panel.style.height = height + "px";

    this.header = this.panel.querySelector("header");
    
    this.draggable(this.panel, this.header);

    this.panel.querySelector('button.close').addEventListener('click', this.hideUI);

    callback(document.querySelector(".figma-plugin-panel > .figma-plugin-ui"));
  }

  hideUI = () => {
    this.panel.remove();
  }

  draggable = (panel, header) => {
    let isMouseDown = false;
    let mouseX;
    let mouseY;
    let elementX = parseInt(panel.style.left) || 0;
    let elementY = parseInt(panel.style.top) || 0;

    const onMouseDown = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      isMouseDown = true;
    }

    const onMouseUp = (event) => {
      isMouseDown = false;
      elementX = parseInt(panel.style.left) || 0;
      elementY = parseInt(panel.style.top) || 0;
    }

    const onMouseMove = (event) => {
      if (!isMouseDown) return;
      var deltaX = event.clientX - mouseX;
      var deltaY = event.clientY - mouseY;
      panel.style.left = elementX + deltaX + "px";
      panel.style.top = elementY + deltaY + "px";
    }

    header.addEventListener("mousedown", onMouseDown);
    header.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
  }

  createPluginsMenuItem = () => {}
  createKeyboardShortcut = () => {}
  createContextMenuItem = {
    Canvas: () => {},
    ObjectsPanel: () => {},
    Selection: () => {}
  }
  currentPage = () => 1
  scene = {
    selection: () => []
  }
}

window.figmaPlus = new FigmaPluginPanel();