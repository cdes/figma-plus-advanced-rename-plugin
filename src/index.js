import 'vex-js/dist/css/vex.css';
import 'vex-js/dist/css/vex-theme-plain.css';
import './assets/figments.css';

import Factory from './factory';
import * as figments from "./figments";

const factory = new Factory(figments);

window.FigmentsFactory = factory;
window.FigmentsFactory.run();

(function(history){
  var pushState = history.pushState;
  history.pushState = function(state) {
      if (typeof history.onpushstate == "function") {
          history.onpushstate({state: state});
      }

      if(typeof window.FigmentsFactory === "undefined") {
        window.FigmentsFactory = factory;
      }

      if(!window.FigmentsFactory.isInjecting) {
        console.log("🔌 Reinjecting");
        window.FigmentsFactory.run();
      }

      return pushState.apply(history, arguments);
  }
})(window.history);
