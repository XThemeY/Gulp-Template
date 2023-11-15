import webpack from "webpack-stream";
import sourcemaps from "gulp-sourcemaps";

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.if(app.isDev, sourcemaps.init()))
    .pipe(
      webpack({
        mode: app.isDev ? "development" : "production",
        output: {
          filename: "main.min.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        targets: "defaults",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(app.plugins.if(app.isDev, sourcemaps.write()))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};
