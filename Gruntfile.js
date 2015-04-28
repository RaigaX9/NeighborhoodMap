module.exports = function(grunt) {

    //Configuration.
    grunt.initConfig({
        cssmin: {
            views: {
                files: {
                    'css/style.min.css': ['src/css/style.css']
                }
            }
        },
        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeCommentsFromCDATA: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {
                     //'Destination': 'Source'
                    'index.html': 'index.html'
                }
            }
        },
        useminPrepare: {
            html: [
                'src/index.html'
            ],
            options: {
                dest: '.'
            }
        },
        usemin: {
            html: [
                'index.html'
            ]
        },
        copy: {
            task0: {
                files: [
                    {src:'src/index.html', dest:'index.html'}
                ]
            }
        },
        uglify: {
            js:{
                files: {
                    'js/app.min.js': ['src/js/app.js'],
                    'js/model.min.js': ['src/js/model.js']
                }
            }
        },
        processhtml: {
            views: {
                files: {
                    'index.html': ['src/index.html']
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //Build tasks
    grunt.registerTask('build', [
        'copy:task0',
        'useminPrepare',
        'cssmin',
        'uglify',
        'usemin',
        'processhtml',
        'htmlmin'
    ]);

};
