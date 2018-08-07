const batchRename = {
  name: "Batch Rename",
  state: {},
  setup(factory) {
    this.factory = factory;
  },
  main() {    
    const factory = this.factory;
    const { vex, toast } = factory; 
    
    const selectedLayers = factory.getSelectedLayers();    

    if (selectedLayers.length > 1) {

      vex.dialog.prompt({
        message: "Rename Selected Layers (" + selectedLayers.length + ")",
        placeholder: 'You can use text & keywords',
        callback: function (value) {
          if (value) {
            selectedLayers.map((layer, index) => {
              layer.name = value;
              
              if(index === selectedLayers.length - 1) {
                toast.show(`Renamed ${selectedLayers.length} layers.`);
              }
            });
          }
        }
      })

    } else {
      toast.show("You must select at least 2 layers.");
    }
  }
}

export default batchRename;