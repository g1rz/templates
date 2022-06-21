import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemap from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import svgSprite from 'gulp-svg-sprite';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import del from 'del';
import cache from 'gulp-cache';
import sync from 'browser-sync';
const sass = gulpSass(dartSass);

export const browsersync = (done) => {
  sync.init({
    server: {
      baseDir: './build/'
    },
    port: 3000
  });
};

export const fonts = () => {
  return gulp.src('source/fonts/*.{woff,woff2}')
  .pipe(gulp.dest('build/fonts'));
};

export const html = () => {
  return gulp.src('source/*.html')
  .pipe(plumber())
  .pipe(gulp.dest('build/'))
  .pipe(sync.stream());
};

export const style = () => {
  return gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(postcss([autoprefixer()]))
  .pipe(cssnano({
    discardComments: {
      removeAll: true
    }
  }))
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('build/css'))
  .pipe(sync.stream());
};

export const images = () => {
  return gulp.src('source/img/**/*')
    .pipe(imagemin([
      gifsicle({interlaced: true}),
      mozjpeg({quality: 75, progressive: true}),
      optipng({optimizationLevel: 5}),
      svgo()
    ]))
    .pipe(gulp.dest('build/img'))
    .pipe(sync.stream());
};

export const sprite = () => {
  return gulp.src('source/img/svg/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg'
				}
			},
		}))
		.pipe(gulp.dest('build/img/'));
};

export const jsLibs = () => {
  return gulp.src('source/js/libs/*.js')
  .pipe(plumber())
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js/'))
  .pipe(sync.stream());
};

export const js = () => {
  return gulp.src('source/js/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('build/js/'))
  .pipe(sync.stream());
};

export const clean = () => {
  return del('./build');
};

export const clear = () => {
  return cache.clearAll();
};

export const watch = () => {
  gulp.watch('source/*.html', gulp.series(html));
  gulp.watch('source/sass/**/*.scss', gulp.series(style));
  gulp.watch('source/js/*.js', gulp.series(js));
  gulp.watch('source/js/libs/*.js', gulp.series(jsLibs));
  gulp.watch('source/img/**/*.{jpg,svg,png}', gulp.series(images));
  gulp.watch('source/img/svg/*.svg', gulp.series(sprite));
  gulp.watch('source/fonts/*.{woff,woff2}', gulp.series(fonts));
};

export default gulp.series(
  clean,
  gulp.parallel(
      html,
      style,
      js,
      jsLibs,
      images,
      sprite,
      fonts
  ),
  gulp.parallel(
      watch,
      browsersync
  )
);
