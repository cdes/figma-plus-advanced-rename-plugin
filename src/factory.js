class Factory {
  
  constructor(plugins) {
    this.plugins = plugins;
  }

  init = () => {
    console.log("%c[Figgins] Initilizing...", "color: green");

    const plugins = this.plugins;
    const keys = Object.keys(plugins);

    if (keys.length === 1 && keys[0] === "default") {
      console.log("%c[Figgins] No plugins found.", "color: green");
    } else {
      keys.map((key, index) => {
        this.setupPlugin(plugins[key]);

        if (index === keys.length - 1) {
          this.didInitilize();
        }
      });
    }
  }
  
  didInitilize = () => {
    console.log("%c[Figgins] All set!", "color: green");
  }

  setupPlugin = (plugin) => {
    plugin.setup();
    console.log(`%c[Figgins] Added ${plugin.name} plugin`, "color: green");
  }
}

export default Factory;