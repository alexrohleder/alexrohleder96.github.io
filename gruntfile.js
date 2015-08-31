
module.exports = function(grunt) {
    grunt.initConfig({
        compass: {
            dist: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'dist/css',
                    cacheDir: 'src/sass/cached',
                    outputStyle: 'compressed',
                    specify: 'src/sass/main.scss'
                }
            }
        },
        uglify: {
            dist: {
                src: ['src/js/vendor/modernizr-*.js', 'src/js/vendor/*.js', 'src/js/*.js'],
                dest: 'dist/js/main.js'
            }
        },
        jade: {
            dist: {
                options: {
                    client: false,
                    pretty: true,
                    data: function(dest, src) {
                        return require('./src/jade/_data.json');
                    }
                },
                files: [{
                    cwd: 'src/jade',
                    src: ['**/*.jade', '!**/_*.jade'],
                    dest: 'dist',
                    expand: true,
                    ext: '.html'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        watch: {
            js: {
                files: 'src/js/**/*.js',
                tasks: 'uglify'
            },
            css: {
                files: 'src/sass/**/*.scss',
                tasks: 'compass'
            },
            html: {
                files: 'src/jade/**/*.jade',
                tasks: ['jade', 'htmlmin']
            },
            img: {
                files: 'dist/img/**/*.*',
                tasks: 'imagemin'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    
    grunt.registerTask('default', [
        'jade',
        'htmlmin',
        'uglify',
        'compass',
        'watch'
    ]);

};
