/**
 * Created by UK948142 on 12/01/2015.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:  {
            options: {
                seperator: ';'
            },
            dist: {
                src: ['public/app/**/*.js'],
                dest: 'public/dist/blockcv.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/app/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/dist/blockcv.min.js': ['public/dist/blockcv.js']
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["public/stylesheets"],
                    yuicompress: true
                },
                files: {
                    "public/stylesheets/app.css": "public/stylesheets/app.less"
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['public/app/**/*.js','tests/server/**/*.js', 'public/lib/**/*.js']
            }
        },
        watch: {
            files: ['<%= jshint.files %>','tests/**/*Spec.js','lib/**/*.js','public/stylesheets/*.less'],
            tasks: ['jshint','concat' ,'less', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-go');

    grunt.registerTask('default', ['jshint','concat' ,'less', 'uglify','copy']);
//    grunt.registerTask('test', ['jshint', 'concat','mochaTest']);
};