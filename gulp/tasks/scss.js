import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoPrefixer from "gulp-autoprefixer";
import gcmq from "gulp-group-css-media-queries";
import sourcemaps from "gulp-sourcemaps";

const sass = gulpSass(dartSass);

export const scss = () =>
  app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.if(app.isDev, sourcemaps.init()))
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(app.plugins.if(app.isBuild, gcmq()))
    .pipe(
      app.plugins.if(app.isBuild, autoPrefixer({ grid: true, cascade: true }))
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpcss({ webpClass: ".webp", noWebpClass: ".no-webp" })
      )
    )
    .pipe(app.plugins.if(app.isDev, sourcemaps.write())) // Раскомментировать, если нужны sourcemaps для несжатого файла стилей
    .pipe(app.gulp.dest(app.path.build.css)) // Раскомментировать, если нужен не сжатый файл стилей
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(app.plugins.if(app.isDev, sourcemaps.write()))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
