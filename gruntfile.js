
/**
 * Gruntfile configure all the tasks for the build of
 * templates, if you are not familiar with this and wanna
 * make your own build manually take a look at http://gruntjs.com/getting-started.
 */

module.exports = function(grunt) {
    grunt.initConfig({

        /**
         * Package: grunt-contrib-compass.
         *
         * This is the default configuration for compile the SASS files into
         * a single CSS file in dist folder.
         */

        compass: {
            dist: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'dist/css',
                    cacheDir: 'src/sass/cached',
                    sourcemap: true,
                    outputStyle: 'compressed',
                    specify: 'src/sass/main.scss'
                }
            }
        },

        /**
         * Package: grunt-contrib-uglify
         *
         * This concats and minify all source js files into a single
         * main.js minified dist file.
         */

        uglify: {
            dist: {
                src: ['src/js/vendor/*.js', 'src/js/*.js'],
                sourceMap: true,
                dest: 'dist/js/main.min.js'
            }
        },

        /**
         * Package: grunt-contrib-jade
         *
         * The jade template engine give us some powerful dynamic code support for
         * making HTML files in a easy and beautiful way.
         */

        jade: {
            dist: {
                options: {
                    pretty: true,
                    data: function(dest, src) {
                        return require('./src/jade/data.json');
                    }
                },
                files: [{
                    cwd: 'src/jade',
                    src: ['**/index.jade', '**/404.jade'],
                    dest: 'dist',
                    expand: true,
                    ext: '.html'
                }]
            }
        },

        /**
         * Package: grunt-contrib-watch
         *
         * This will be running when the grunt command is called, and will
         * watch for modifications in js, sass and jade files and apply the
         * correct task for then. For example, if you modify an jade file,
         * this will know and will run the jade compiler task.
         */

        watch: {
            js: {
                files: 'src/js/**/*.js',
                tasks: 'uglify'
            },
            sass: {
                files: 'src/sass/**/*.scss',
                tasks: 'compass'
            },
            jade: {
                files: 'src/jade/**/*.jade',
                tasks: 'jade'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    
    grunt.registerTask('default', [
        'jade',
        'compass',
        'uglify',
        'watch'
    ]);

};
