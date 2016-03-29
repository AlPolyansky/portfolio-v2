var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	concat			= require('gulp-concat'),
	uglify			= require('gulp-uglify'),
	cssnano 		= require('gulp-cssnano'),
	rename			= require('gulp-rename'),
	del				= require('del'),
	imagemin		= require('gulp-imagemin'),
	pngquant		= require('imagemin-pngquant'),
	cache			= require('gulp-cache'),
	autoprefixer	= require('gulp-autoprefixer'),
	add				= require('gulp-add'),
	shell 			= require('gulp-shell'),
	bower 			= require('gulp-bower'),
	iconfont 		= require('gulp-iconfont'),
	uncss 			= require('gulp-uncss'),
	htmlhint 		= require('gulp-htmlhint');
	plumber 		= require('gulp-plumber')




gulp.task('valid',function(){
	return gulp.src("src/*.html")
		.pipe(htmlhint())
		.pipe(htmlhint.reporter());
})

gulp.task('uncss',function(){
	return gulp.src('src/css/main.css')
		.pipe(uncss({
			html : ['src/index.html']
	}))
		.pipe(gulp.dest('dist/css'));
})

gulp.task('folder', shell.task([
  'mkdir src\\start\\img',
  'mkdir src\\start\\libs',
  'mkdir src\\start\\fonts'
]))


gulp.task('start',['folder'], function(){
	return gulp.src('src')
        .pipe(add({
        	'index.html' : '<!DOCTYPE html>\n<html lang="ru">\n<head>\n\t<meta charset="UTF-8">\n\t<title>Document</title>\n\t<link rel="stylesheet" href="css/libs.min.css">\n\t<link rel="stylesheet" href="css/main.css">\n</head>\n<body>\n\n\n<script src="js/libs.min.js"></script>\n<script src="js/common.js"></script>\n</body>\n</html>',
        	'css/main.css': '',
        	'sass/main.sass': '@import "var/variables"\n@import "grid/total"\n@import "grid/header"\n@import "grid/content"\n@import "grid/footer"\n@import "theme/default"',
        	'sass/var/_variables.sass': '',
        	'sass/grid/_total.sass': '',
        	'sass/grid/_header.sass': '',
        	'sass/grid/_content.sass': '',
        	'sass/grid/_footer.sass': '',
        	'sass/theme/_default.sass': '',
        	'js/common.js' : '$(document).ready(function() {\n\n})'
        }))
        .pipe(gulp.dest('src/start'))
        .pipe(bower({directory: './src/start/libs'}))
})

gulp.task('sass',function(){
	return gulp.src('src/sass/**/*.sass')
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'],{cascade : true}))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js', //тут пишем пути к js файлам библиотек
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
})

gulp.task('browser-sync',function(){
	browserSync({
		server: {
			baseDir : 'src'
		},
		notify: false

	});
});

gulp.task('css-libs', ['sass'], function(){
	return gulp.src([
		'src/libs/normalize-css/normalize.css' //тут пишем пути к css файлам библиотек
	])
	.pipe(concat('libs.min.css'))
	.pipe(cssnano())
	.pipe(gulp.dest('src/css'));
})

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('clear', function(){
	return cache.clearAll();
});

gulp.task('img',function(){
	return gulp.src('src/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
})


gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function(){
	gulp.watch('src/sass/**/*.sass',['sass']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});


gulp.task('build', ['uncss','clean','img','sass', 'scripts'], function(){
	var buildCss = gulp.src([
		'src/css/libs.min.css'
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('src/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));
});


