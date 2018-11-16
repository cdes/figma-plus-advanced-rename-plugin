import vex from "vex-js";
import rename from "./rename";
import { getSelectedLayers, toast, renameLayer } from "./utilities";

vex.registerPlugin(require("vex-dialog"));
vex.defaultOptions.className = "vex-theme-plain";

class BatchRename {
  constructor() {
    this.name = 'Batch Rename';
    this.id = 'batchRenameButton',
    this.state = {
      isOpen: false,
    }
  }

  renameLayers() {     
    const selectedLayers = getSelectedLayers();    
    
    if (selectedLayers.length > 1) {
      
      this.state.isOpen = true;
      vex.dialog.open({
        message: "Rename Selected Layers (" + selectedLayers.length + ")",
        input: `
          <div class="vex-custom-field-wrapper">
            <label for="layername">Name</label>
            <div class="vex-custom-input-wrapper">
              <input placeholder="You can use text & keywords" name="layername" id="layername" type="text" />
            </div>
          </div>
          <div class="vex-custom-field-description">
          <table width="100%">
          <tbody><tr><th width="25%">Keyword</th><th>Result</th></tr>
          <tr><td>%n</td><td>Ascending numbered sequence</td></tr>
          <tr><td>%N</td><td>Descending numbered sequence</td></tr>
          <tr><td>%A</td><td>Alphabet sequence</td></tr>
          <tr><td>%nn</td><td>01, 02, 03 and so on</td></tr>
          <tr><td>%a</td><td>Lowercase alphabet sequence</td></tr>
          </tbody></table>
          </div>

          <table width="100%">
          <tbody><tr><th width="25%">Keyword</th><th>Result</th></tr>
          <tr><td>%*</td><td>Current layer name</td></tr>
          <tr><td>%*u%</td><td>Convert to UPPER CASE</td></tr>
          <tr><td>%*l%</td><td>Convert to lower case</td></tr>
          <tr><td>%*t%</td><td>Convert to Title Case</td></tr>
          <tr><td>%*uf%</td><td>Convert to Upper first word</td></tr>
          <tr><td>%*c%</td><td>Convert to camelCase (Removes spaces)</td></tr>
          </tbody></table>
          </div>

          <table width="100%">
          <tbody><tr><th width="25%">Keyword</th><th>Result</th></tr>
          <tr><td>%o</td><td>Parent's name</td></tr>
          <tr><td>%p</td><td>Page's name</td></tr>
          <tr><td>%w</td><td>Layer's width</td></tr>
          <tr><td>%h</td><td>Layer's height</td></tr>
          </tbody></table>
          </div>
        `,
        buttons: [
          {...vex.dialog.buttons.YES, text: 'Rename' },
          {...vex.dialog.buttons.NO, text: 'Cancel' }
        ],
        callback: (data) => {
          this.state.isOpen = false;

          if (!data) {
            return;
          }

          selectedLayers.map((layer, index) => {
                
            const newName = rename({
              layerName: layer.name,
              currIdx: index,
              width: layer.width,
              height: layer.height,
              startsFrom: 0,
              pageName: layer.pageName,
              inputName: data.layername,
              selectionCount: selectedLayers.length,
              parentName: layer.parentName,
            });
            
            renameLayer(layer.id, newName);
            
            if(index === selectedLayers.length - 1) {
              toast(`Renamed ${selectedLayers.length} layers.`);
            }
          });
        }
      })
      
    } else {
      toast("You must select at least 2 layers.");
    }
  }
}

const batchRenamePlugin = new BatchRename();

const usePluginAPI = (figmaPlugin) => {
	const shortcut = { command: true, shift: true, key: 'R' };
	figmaPlugin.createContextMenuButton.Canvas(
		batchRenamePlugin.id,
		batchRenamePlugin.name,
		batchRenamePlugin.renameLayers.bind(batchRenamePlugin),
		shortcut
  );
  figmaPlugin.createContextMenuButton.Selection(
		batchRenamePlugin.id,
		batchRenamePlugin.name,
		batchRenamePlugin.renameLayers.bind(batchRenamePlugin),
		shortcut
  );
  figmaPlugin.createContextMenuButton.ObjectsPanel(
		batchRenamePlugin.id,
		batchRenamePlugin.name,
		batchRenamePlugin.renameLayers.bind(batchRenamePlugin),
		shortcut
	);
	figmaPlugin.onFileLoaded(() => {
		figmaPlugin.createKeyboardShortcut(shortcut, () => {
			if (!batchRenamePlugin.state.isOpen) {
				batchRenamePlugin.renameLayers()
			}
		});
	});
}

if (window.figmaPlugin) {
	usePluginAPI(window.figmaPlugin);
} else {
	Object.defineProperty(window, 'figmaPlugin', {
		configurable: true,
		enumerable: true,
		writeable: true,
		get: function() {
			return this._figmaPlugin;
		},
		set: function(val) {
			this._figmaPlugin = val;
			usePluginAPI(val);
		}
	});
}