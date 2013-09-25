/**
 * The config for build Fxiaoke project base on grunt.
 * User: qisx
 * Date: 13-9-24
 * Time: 下午12:03
 */
module.exports = function(grunt) {
    var script = require('./libs/script').init(grunt);
    //所有文件类型
    //var allFileSrc=['**/*.css','**/*.html','**/*.js','**/*.swf','**/*.png','**/*.gif','**/*.jpg'];
    var allFileSrc=['**/*.*'];
    grunt.initConfig({
        "copy": {
            modules: {
                files: [{
                    expand: true,
                    cwd: 'fs/modules/',
                    src: allFileSrc,
                    dest: 'fs-dist/modules/'
                }]
            },
            tpls: {
                files: [{
                    expand: true,
                    cwd: 'fs/tpls/',
                    src: allFileSrc,
                    dest: 'fs-dist/tpls/'
                }]
            },
            assets:{
                files: [{
                    expand: true,
                    cwd: 'fs/assets/',
                    src: allFileSrc,
                    dest: 'fs-dist/assets/'
                }]
            }
        },
        "concat": {
            options: {
                stripBanners: true,
                banner: '/**\n' +
                    ' * 纷享自定制版arale.js\n'+
                ' * @Author: 纷享网页前端部\n'+
                ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                ' */\n'
            },
            seajs: {
                files: [{
                    src: ['fs-dist/assets/seajs/sea-modules/arale/**/*.js', '!fs-dist/assets/seajs/sea-modules/arale/**/*-debug.js'],
                    dest: 'fs-dist/assets/seajs/dist/all.js'
                }]
            }
        },
        "imagemin": {                          // Task
            assets: {                         // Another target
                options: {                       // Target options
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'fs-dist/assets/images/',               // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}','!**/employee_default_120_120.png'],   // employee_default_120_120.png.png无法压缩
                    dest: 'fs-dist/assets/images/'                  // Destination path prefix
                }]
            }
        },
        "transport": {
            options: {
                // Task-specific options go here.
                debug:false,
                parsers: {
                    '.js': [script.jsParser]
                }
            },
            modules: {
                "options":{
                    "idleading":"modules/"
                },
                files: [{
                    expand:true,
                    cwd: 'fs-dist/modules/',
                    src: '**/*.js',
                    dest: 'fs-dist/modules/'
                }]
            },
            tpls: {
                "options":{
                    "idleading":"tpls/"
                },
                files: [{
                    expand:true,
                    cwd: 'fs-dist/tpls/',
                    src: '**/*.js',
                    dest: 'fs-dist/tpls/'
                    //ext: '.min.js'     //组件内部实现导致此配置不起作用
                }]
            }
        },
        "uglify": {
            options: {
                /*beautify: true,
                 comments: true*/
            },
            assets: {
                files: [{
                    src: 'fs-dist/assets/js/underscore.js',
                    dest: 'fs-dist/assets/js/underscore.js'
                },{
                    src: 'fs-dist/assets/js/backbone.js',
                    dest: 'fs-dist/assets/js/backbone.js'
                }]
            },
            modules: {
                options:{
                    banner: '/**\n' +
                    ' * 纷享模块逻辑\n'+
                    ' * @Author: 纷享网页前端部\n'+
                    ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                    ' */\n'
                },
                files: [{
                    expand: true,
                    cwd: 'fs-dist/modules/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'fs-dist/modules/'
                    //ext: '.min.js'
                }]
            },
            tpls: {
                options:{
                    banner: '/**\n' +
                        ' * 纷享页面逻辑\n'+
                        ' * @Author: 纷享网页前端部\n'+
                        ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                        ' */\n'
                },
                files: [{
                    expand: true,
                    cwd: 'fs-dist/tpls/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'fs-dist/tpls/'
                    //ext: '.min.js'
                }]
            }
        },
        "cssmin": {
            modules: {
                options:{
                    banner: '/**\n' +
                        ' * 纷享模块样式\n'+
                        ' * @Author: 纷享网页前端部\n'+
                        ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                        ' */\n'
                },
                files: [{
                    expand: true,
                    cwd: 'fs-dist/modules/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'fs-dist/modules/'
                    //ext: '.min.css'
                }]
            },
            tpls: {
                options:{
                    banner: '/**\n' +
                        ' * 纷享页面样式\n'+
                        ' * @Author: 纷享网页前端部\n'+
                        ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                        ' */\n'
                },
                files: [{
                    expand: true,
                    cwd: 'fs-dist/tpls/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'fs-dist/tpls/'
                    //ext: '.min.css'
                }]
            }
        },
        "htmlmin": {
            modules: {
                options:{},
                files: [{
                    expand: true,
                    cwd: 'fs-dist/modules/',
                    src: ['**/*.html', '!**/*.min.html'],
                    dest: 'fs-dist/modules/'
                    //ext: '.min.html'
                }]
            },
            tpls: {
                options:{},
                files: [{
                    expand: true,
                    cwd: 'fs-dist/tpls/',
                    src: ['**/*.html', '!**/*.min.html'],
                    dest: 'fs-dist/tpls/'
                    //ext: '.min.html'
                }]
            }
        },
        "clean": {
            modules: {
                files: [{
                    expand: true,
                    cwd: 'fs-dist/modules/',
                    src: ['**/*.css', '!**/*.min.css']
                },{
                    expand: true,
                    cwd: 'fs-dist/modules/',
                    src: ['**/*.html', '!**/*.min.html']
                },{
                    expand: true,
                    cwd: 'fs-dist/modules/',
                    src: ['**/*.js', '!**/*.min.js']
                }]
            },
            tpls: {
                files: [{
                    expand: true,
                    cwd: 'fs-dist/tpls/',
                    src: ['**/*.css', '!**/*.min.css']
                },{
                    expand: true,
                    cwd: 'fs-dist/tpls/',
                    src: ['**/*.html', '!**/*.min.html']
                },{
                    expand: true,
                    cwd: 'fs-dist/tpls/',
                    src: ['**/*.js', '!**/*.min.js']
                }]
            },
            all:{      //清理所有dist文件
                files: [{
                    src: ['fs-dist/**']
                }]
            }
        }
    });
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-cmd-concat');

    grunt.registerTask('default', ['copy','concat','imagemin','transport','uglify','cssmin','htmlmin']);
    grunt.registerTask('clean-all', ['clean:all']);
};
