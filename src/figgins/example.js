const example = {
  name: "Example",
  state: {
    counter: 0
  },
  setup () {    
    document.getElementById("button").addEventListener('click', this.count.bind(this));
    console.log("Counter is", this.state.counter);
  },
  count() {    
    this.state.counter = this.state.counter + 1;
    console.log("Counter is", this.state.counter);
  }
}

export default example;