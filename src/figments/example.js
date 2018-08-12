const example = {
  name: "Example",
  state: {
    counter: 0
  },
  setup() {
  },
  main() {
    const { FigmentsFactory } = window;
    const selectedLayers = FigmentsFactory.getSelectedLayers();
    console.log("🔌 Selected layers", selectedLayers.length);
  }
}

export default example;