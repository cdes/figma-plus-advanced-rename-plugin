import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import run from 'rollup-plugin-run';
import serve from 'rollup-plugin-serve';
import sass from 'rollup-plugin-sass';

import pkg from './package.json'
import fs from 'fs';
import { fsizeSync, rmdirsSync } from 'nodejs-fs-utils';
import shajs from 'sha.js';
import boxen from 'boxen';
import chalk from 'chalk';

const production = !process.env.ROLLUP_WATCH;
const development = process.env.ROLLUP_WATCH;
const RUN = process.env.RUN;
const SERVE = process.env.SERVE;

// Default options
const devServerOptions = {
  verbose: false,
  host: 'localhost',
	port: 8080,
	contentBase: ['dist', 'public'],
  headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
  }
};


const boxOptions = {
	borderColor: "gray",
	padding: 1,
	borderStyle: "round",
	
}

const logger = () => {
	return {
		writeBundle(bundle) {
			const bundleSize = parseFloat(Math.round(fsizeSync(pkg.files[0])) / 1024).toFixed(2);			
			const filesPaths = [];
			const extensionRegex = /\.[0-9a-z]+$/i;
				
			const items = fs.readdirSync(pkg.files[0]);
			
			for (let i = 0; i < items.length; i++) {
				const extension = items[i].match(extensionRegex)[0];		

				if (extension === '.js') {
					filesPaths.push(chalk.white.bold('- js:               ')+chalk.white(`${pkg.files[0]}/${items[i]}`));
				}
				else if (extension === '.css') {
					filesPaths.push(chalk.white.bold('- css:              ')+chalk.white(`${pkg.files[0]}/${items[i]}`));
				}
			}

			if (development) {
				const devContent = [
					chalk.green.bold('FOR PLUGIN MANAGER:'),
					chalk.white.bold('- dev server port:  ')+chalk.white(devServerOptions.port),
					...filesPaths,
				];

				console.log(boxen(devContent.join("\n"), boxOptions));
			}

			if (production) {
				const file = require('child_process').execSync(`cat ./${pkg.files}/*`).toString('UTF-8');
				const hash = shajs('sha256').update(file).digest('hex');
				const date = new Date();
				const publishDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

				const bundleContent = [
					chalk.green.bold('BUNDLE INFO'),
					...filesPaths,
					chalk.white.bold('- size:              ') + chalk.white(`${bundleSize}KB`),
					chalk.gray.bold('- ⓘ') + chalk.gray('  Try to keep it under 100KB.'),
				];


				const productionContent = [
					chalk.green.bold('PUBLISHING INFO'),
					chalk.white.bold('- id:               ') + chalk.white(pkg.name),
					chalk.white.bold('- publishDate:      ') + chalk.white(publishDate),
					chalk.white.bold('- hash:             ') + chalk.white(hash),
					chalk.white.bold('- manifest:         ') + chalk.white(pkg.manifestUrl),
				]

				const productionContent2 = [	
					chalk.green.bold('PUBLISHING INSTRUCTIONS'),
					chalk.red('- Make sure that your plugin actually works before proceeding ;)'),
					chalk.white.bold('- 1. ') + chalk.white('Create a new branch in your repo named ') + chalk.white.underline('gh-pages'),
					chalk.white.bold('- 2. ') + chalk.white('Go to your repo settings and verify that GitHub Pages is working'),
					chalk.white.bold('- 3. ') + chalk.white('Double check that your manifest & plugin files are publicly accessible from your github-pages url.'),
					chalk.white.bold('- 4. ') + chalk.white('Visit ➜  https://github.com/jachui/figma-plugin-manager/edit/gh-pages/masterList.json'),
					chalk.white.bold('- 5. ') + chalk.white('Use the info above to include your plugin'),
					chalk.white.bold('- 6. ') + chalk.white('Submit a PR'),
				];

				console.log(boxen(bundleContent.join("\n"), boxOptions));
				console.log(boxen(productionContent.join("\n"), boxOptions));
				console.log(boxen(productionContent2.join("\n"), boxOptions));
			}

		}
	}
}

const distCleaner = () => {
	return {
		buildStart () {
			rmdirsSync(pkg.files[0], { skipErrors: true });
		}
	}
}

export default [
	// Simulated Panel & Figma API for local development purpose only (Away from Figma)
	{
		input: 'figma-plus/figma-plugin-panel.js',
		output: {
			name: 'figma-plugin-panel',
			file: 'public/figma-plugin-panel.js',
			format: 'umd'
		},
		plugins: [
			resolve(),
      babel({runtimeHelpers: true}),
      cjs(),
			uglify(),
			sass({
				output: `./public/figma-plugin-panel.css`,
			}),
		],
	},
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: pkg.name,
			file: `${pkg.files[0]}/${pkg.name}.js`,
			format: 'umd'
		},
		plugins: [
			distCleaner(),
			resolve(),
      babel({runtimeHelpers: true,}),
      cjs(),
			development && RUN && run(), // Dev mode: run the bundle to see output in console/terminal
			(development || serve) && serve(devServerOptions), // Dev Serve mode: serve  bundle
			production && uglify(), // Production: uglify bundle,
			sass({
				output: `./dist/${pkg.name}.css`,
			}),
			logger(),
    ],
	},
];