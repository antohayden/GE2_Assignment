module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            dist: {
                src: [
                    'js/libs/jquery-2.1.3.js',
                    'js/libs/three.js',
                    'js/libs/PointerLockControls.js',
                    'js/libs/dat.gui.min.js',
                    'js/game.js',

                    'js/scenes/*',
                    'js/behaviours/*',
                    'js/behaviours_Group/*',
                    'js/gameObjects/*',
                    'js/gameObjects/Ships/*',
                    'js/states/*',
                    'js/utils/*'
                ],
                dest: 'build/GE2_Assignment.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['concat']);

};