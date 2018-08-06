class Factory {
  
  constructor(figments) {
    this.figments = figments;
  }

  init = () => {
    console.log("[🔌] Initilizing...");

    const figments = this.figments;
    const keys = Object.keys(figments);

    if (keys.length === 1 && keys[0] === "default") {
      console.log("[🔌] No figments found.");
    } else {
      keys.map((key, index) => {
        this.setupPlugin(figments[key]);

        if (index === keys.length - 1) {
          this.didInitilize();
        }
      });
    }
  }
  
  didInitilize = () => {
    console.log("[🔌] All set!");
  }

  setupPlugin = (plugin) => {
    plugin.setup();
    console.log(`[🔌] Added ${plugin.name} plugin`);
  }
}

export default Factory;