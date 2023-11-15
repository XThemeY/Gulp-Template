import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

//Tasks import
import { copy } from "./gulp/tasks/copy.js";
import { cleanBuild } from "./gulp/tasks/clean.js";
import { html } from "./gulp/tasks/html.js";
import { img } from "./gulp/tasks/images.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { fontsToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgIcons } from "./gulp/tasks/svgIcons.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

//Watchers
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html); //gulp.series(html,ftp)
  gulp.watch(path.watch.images, img); //gulp.series(img,ftp)
  gulp.watch(path.watch.scss, scss); //gulp.series(scss,ftp)
  gulp.watch(path.watch.js, js); //gulp.series(js,ftp)
}

const fonts = gulp.series(fontsToWoff, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, img, scss, js));

//Сценарии задач
const dev = gulp.series(cleanBuild, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(cleanBuild, mainTasks);
const deployZIP = gulp.series(cleanBuild, mainTasks, zip);
const deployFTP = gulp.series(build, ftp);

//Default task
gulp.task("default", dev);

// Экспорт сценариев
export { svgIcons };
export { dev };
export { build };
export { deployZIP };
export { deployFTP };
