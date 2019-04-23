/** @jsx h */
import "./figma-plugin-ui.scss";
import h from "vhtml";
import { getDomNode, insertAtCaret } from "./utils";
import rename from "./rename";

class AdvancedRenamePlugin {
  constructor() {
    this.pluginName = "Advanced Rename";

    HTMLInputElement.prototype.insertAtCaret = insertAtCaret;
    HTMLTextAreaElement.prototype.insertAtCaret = insertAtCaret;

    // SETUP PLUGIN
    const shortcut = {
      mac: {
        command: true,
        shift: true,
        key: "R"
      },
      windows: {
        control: true,
        shift: true,
        key: "R"
      }
    };

    const options = {
      label: this.pluginName,
      action: this.showUI,
      showInSelectionMenu: true,
      shortcut
    };

    window.figmaPlus.addCommand(options);

    this.UI = (
      <div class="figma-plugin-ui">
        <div class="scrollable">
          <div class="field">
            <label for="pattern">Rename to</label>
            <input
              id="pattern"
              type="text"
              placeholder="You can use text & keywords from below"
            />
            <input id="preview" type="text" disabled />
          </div>

          <div class="field-row">
            <h2>Numbering from</h2>
            <input id="starts-from" type="number" placeholder="0" />
          </div>
          <div class="field-row">
            <button data-keyword="%n" id="number-asc">
              Number <span class="svg g5b98e135" />
            </button>
            <button data-keyword="%N" id="number-des">
              Number <span class="svg g30b37ca8" />
            </button>
            <button data-keyword="%nn" id="number-padded-asc">
              Padded number (01, 02, 03...)
            </button>
          </div>

          <h2>Alphabet</h2>
          <div class="field-row">
            <button data-keyword="%A" id="alpha-cap">
              Alphabet (A, B, C...)
            </button>
            <button data-keyword="%a" id="alpha-small">
              Alphabet (a, b, c...)
            </button>
          </div>

          <h2>Current name</h2>
          <div class="field-row">
            <button data-keyword="%*" id="current-name">
              Current name
            </button>
            <button data-keyword="%*t%" id="title-case">
              Title Case
            </button>
            <button data-keyword="%*uf%" id="upper-first">
              Upper first word
            </button>
            <button data-keyword="%*u%" id="upper-case">
              UPPER CASE
            </button>
            <button data-keyword="%*l%" id="lower-case">
              lower case
            </button>
            <button data-keyword="%*c%" id="camel-case">
              camelCase
            </button>
          </div>

          <h2>Current Layer Properties</h2>
          <div class="field-row">
            <button data-keyword="%o" id="parent-name">
              Parent name
            </button>
            <button data-keyword="%p" id="page-name">
              Page name
            </button>
            <button data-keyword="%w" id="layer-width">
              Layer width
            </button>
            <button data-keyword="%h" id="layer-height">
              Layer height
            </button>
          </div>
        </div>
        <footer>
          <button id="button-secondary">Cancel</button>
          <button id="button-primary" class="primary" disabled>
            Rename
          </button>
        </footer>
      </div>
    );
  }

  attachEvents = () => {
    this.patternInput = getDomNode("#pattern");
    this.patternInput.addEventListener("input", this.onInput);
    this.patternInput.focus();

    this.preview = getDomNode("#preview");
    this.startsFrom = getDomNode("#starts-from");

    [
      "#number-asc",
      "#number-des",
      "#number-padded-asc",
      "#alpha-cap",
      "#alpha-small",
      "#current-name",
      "#title-case",
      "#upper-first",
      "#upper-case",
      "#lower-case",
      "#camel-case",
      "#parent-name",
      "#page-name",
      "#layer-width",
      "#layer-height"
    ].map(id => getDomNode(id).addEventListener("click", this.onKeywordClick));

    getDomNode("#button-secondary").addEventListener("click", this.onCancel);

    this.confirmButton = getDomNode("#button-primary");
    this.confirmButton.addEventListener("click", this.onConfirm);
  };

  showUI = () => {
    if (window.figmaPlus.currentPage.selection.length < 2) {
      window.figmaPlus.showToast(`⚠️&nbsp;&nbsp;Select at least 2 layers.`, 5);
      return;
    }

    window.figmaPlus.showUI({
      title: this.pluginName,
      html: this.UI,
      script: () => {
        this.attachEvents();
        this.currentPage = window.figmaPlus.currentPage.name;
        this.selection = window.figmaPlus.currentPage.selection.reverse();
      },
      width: 406,
      height: "auto",
      overlay: true
    });
  };

  onInput = event => {
    if (event.target.value) {
      this.preview.value = `Preview: ${this.generatePreview()}`;
      this.confirmButton.disabled = false;
    } else {
      this.preview.value = "";
      this.confirmButton.disabled = true;
    }
  };

  generatePreview = () => {
    const subSelection = this.selection.slice(0, 3);
    const preview = subSelection.map((layer, index) => {
      const options = {
        layerName: layer.name,
        currIdx: index,
        width: layer.absoluteBounds.width,
        height: layer.absoluteBounds.height,
        startsFrom: parseInt(this.startsFrom.value || 0),
        pageName: this.currentPage,
        inputName: this.patternInput.value,
        selectionCount: subSelection.length,
        parentName: layer.parent.name
      };

      return rename(options);
    });

    return preview.reverse().join(", ");
  };

  onKeywordClick = event => {
    const keyword = event.target.dataset.keyword;
    this.patternInput.insertAtCaret(keyword);
    this.preview.value = `Preview: ${this.generatePreview()}`;
    this.patternInput.focus();
    this.confirmButton.disabled = false;
  };

  onConfirm = () => {
    this.selection.map((layer, index) => {
      const options = {
        layerName: layer.name,
        currIdx: index,
        width: layer.absoluteBounds.width,
        height: layer.absoluteBounds.height,
        startsFrom: parseInt(this.startsFrom.value || 0),
        pageName: this.currentPage,
        inputName: this.patternInput.value,
        selectionCount: this.selection.length,
        parentName: layer.parent.name
      };

      const newName = rename(options);

      layer.name = newName;
    });

    window.figmaPlus.hideUI(this.pluginName);

    window.figmaPlus.showToast(
      `🎉&nbsp;&nbsp;Renamed ${this.selection.length} layers.`,
      5
    );
  };

  onCancel = () => {
    window.figmaPlus.hideUI(this.pluginName);
  };
}

window.advancedRenamePlugin = new AdvancedRenamePlugin();
