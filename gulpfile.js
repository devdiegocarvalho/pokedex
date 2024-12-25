const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

//*** Compilando Sass, adicionando auto-prefixer e dando refresh na pagina ***
function compilaSass() {
  return gulp
    .src("sass/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}

// *** Tarefa do Sass ***
gulp.task("sass", compilaSass);

function pluginsCss() {
  return gulp
    .src("css/lib/*.css")
    .pipe(concat("lib.css"))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}

gulp.task("plugincss", pluginsCss);

function gulpJs() {
  return gulp
    .src("js/scripts/*.js")
    .pipe(concat("script.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}

gulp.task("alljs", gulpJs);

function pluginJs() {
  return gulp
    .src([
      "./js/lib/aos.min.js",
      "./js/lib/swiper.min.js",
      "./js/lib/axios.min.js",
    ])
    .pipe(concat("plugins.js"))
    .pipe(uglify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}

gulp.task("pluginjs", pluginJs);

// *** Função do BrowserSync ***
function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

// *** Tarefa do BrowserSync ***
gulp.task("browser-sync", browser);

// *** Função do Watch para alterações em scss e html ***
function watch() {
  gulp.watch("sass/*.scss", compilaSass);
  gulp.watch("css/lib/*.css", pluginsCss);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("js/scripts/*.js", gulpJs);
  gulp.watch("js/lib/*.js", pluginJs);
}

// *** Tarefa do Watch ***
gulp.task("watch", watch);

// *** Tarefa default que executa o Watch e BrowserSync ***
gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "browser-sync",
    "sass",
    "pluginjs",
    "alljs",
    "pluginjs"
  )
);
