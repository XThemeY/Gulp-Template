import avif from "gulp-avif";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const img = () => {
	return app.gulp.src(app.path.src.images.img)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			})))
		.pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
		.pipe(app.plugins.if(app.isBuild, avif({ quality: 50 })))
		.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
		.pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images.img)))
		.pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
		.pipe(app.plugins.if(app.isBuild, webp()))
		.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
		.pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images.img)))
		.pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
		.pipe(
			app.plugins.if(
				app.isBuild,
				imagemin({
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 3 // 0 to 7
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.images.svg))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browsersync.stream());
}