const example = {
  name: "Example",
  state: {
    counter: 0
  },
  setup(factory) {
    this.factory = factory;
  },
  main() {
    const selectedLayers = this.factory.getSelectedLayers();
    console.log("Selected layers", selectedLayers.length);
  }
}

export default example;