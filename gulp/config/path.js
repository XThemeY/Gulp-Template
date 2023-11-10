import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = `./build`; //Можно использовать rootFolder
const srcFolder = `./src`;

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		files: `${buildFolder}/files/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`
	},
	src: {
		js: `${srcFolder}/js/main.js`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`, // Replace on *.pug when Pug use
		files: `${srcFolder}/files/**/*.*`,
		images: {
			img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
			svg: `${srcFolder}/img/*.svg`,
			svgicons: `${srcFolder}/img/icons/**/*.svg`
		},

	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`, // Replace on *.pug when Pug use
		files: `${srcFolder}/files/**/*.*`,
		images: `${srcFolder}/img/**/*.*`
	},
	clean: buildFolder,
	srcFolder: srcFolder,
	buildFolder: buildFolder,
	rootFolder: rootFolder,
	ftp: `test`
}