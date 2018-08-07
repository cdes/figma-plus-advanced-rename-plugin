import 'vex-js/dist/css/vex.css';
import 'vex-js/dist/css/vex-theme-plain.css';
import './assets/figments.css';

import Factory from './factory';
import * as figments from "./figments";

const factory = new Factory(figments);

factory.run();

