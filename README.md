# Figments (alpha)
An unofficial plugins system for Figma.com

![Figments](https://user-images.githubusercontent.com/1207863/46877653-0ca76980-ce4a-11e8-876c-a8acda14d230.gif)


## Why?
First of all, let's face it.. Figma is freaking awesome!

However, one of the things that always put me away, is the lack of plugins like Sketch.
Until, I saw [Figma Dark UI Plugin](https://www.papertiger.com/figma-dark-ui-plugin).  I was intrigued.  So I've tried to hack something together.
Next thing you know, I challenged myself to build a plugin system for Figma.  Is it feasable? No, but it's cool and useful.


## Using Figments Chrome Extension
1. Clone/download the repo.
1. Open the Extension Management page by navigating to chrome://extensions. (The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions).
1. Enable Developer Mode by clicking the toggle switch next to Developer mode.
1. Click the LOAD UNPACKED button and select chrome_extension directory from where you cloned/downloaded the repo.

### How does it work?
The system is built using 2 main components, factory and figments.

#### Factory:
The factory injects a dropdown menu Figma's UI, and iterate over the plugins (figments) inside `/src/figments` directory to add an option for each one.
It also injects 2 useful js libraries ([vex](https://github.com/HubSpot/vex), [toast](https://github.com/zeuslfhj/simple-toast)).

#### Figments:
Each figment is an object with 3 required properties: `name, setup(), main()`.<br /><br />
name: the name of the plugin that will be displayed in the injected menu.<br />
setup(): think of it as the constructor for your figment.<br />
main(): the method that will be called when a user clicks on the injected menu option.<br />


### Contributing a new plugin
1. Clone the repo, cd into the directory and run `yarn`.
1. Create a new file inside `/src/figments` for your plugin.
1. Export your plugin from  `/src/figments/index.js`.
1. Run `yarn start`.
1. Verify that your plugin actually works.
1. Create a pull request!

#### Example plugin
```
const counter = {
  name: "Counter",
  state: {
    counter: 0
  },
  setup() {
    console.log(`Counter ${this.state.counter}`);
  },
  main() {
    this.state.counter++;
    console.log(`Counter ${this.state.counter}`);
  }
}

export default counter;
```
