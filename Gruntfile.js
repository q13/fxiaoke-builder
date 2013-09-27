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
            jslibs: {
                "options":{
                    "idleading":"jslibs/"
                },
                files: [{
                    expand:true,
                    cwd: 'fs-dist/assets/js/',
                    src: 'util.js',
                    dest: 'fs-dist/assets/js/'
                }]
            },
            uilibs:{
                "options":{
                    "idleading":"uilibs/"
                },
                files: [{
                    expand:true,
                    cwd: 'fs-dist/assets/uilibs/',
                    src: ['**/*.js','!**/all.js'],
                    dest: 'fs-dist/assets/uilibs/'
                }]
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
                options:{
                    banner: '/**\n' +
                        ' * 纷享资源脚本\n'+
                        ' * @Author: 纷享网页前端部\n'+
                        ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                        ' */\n'
                },
                files: [{
                    src: 'fs-dist/assets/js/underscore.js',
                    dest: 'fs-dist/assets/js/underscore.js'
                },{
                    src: 'fs-dist/assets/js/underscore.string.js',
                    dest: 'fs-dist/assets/js/underscore.string.js'
                },{
                    src: 'fs-dist/assets/js/backbone.js',
                    dest: 'fs-dist/assets/js/backbone.js'
                },{
                    src: 'fs-dist/assets/js/common.js',
                    dest: 'fs-dist/assets/js/common.js'
                },{
                    src: 'fs-dist/assets/js/util.js',
                    dest: 'fs-dist/assets/js/util.js'
                }/*,{
                    src: 'fs-dist/assets/js/app.js',
                    dest: 'fs-dist/assets/js/app.js'
                },{
                    src: 'fs-dist/assets/js/prepare.js',
                    dest: 'fs-dist/assets/js/prepare.js'
                }*/]
            },
            uilibs:{
                files: [{
                    expand: true,
                    cwd: 'fs-dist/assets/uilibs/',
                    src: ['**/*.js'],
                    dest: 'fs-dist/assets/uilibs/'
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
            assets: {
                options:{
                    banner: '/**\n' +
                        ' * 纷享资源样式\n'+
                        ' * @Author: 纷享网页前端部\n'+
                        ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                        ' */\n'
                },
                files: [{
                    src: 'fs-dist/assets/style/base.css',
                    dest: 'fs-dist/assets/style/base.css'
                },{
                    src: 'fs-dist/assets/style/ui.css',
                    dest: 'fs-dist/assets/style/ui.css'
                },{
                    src: 'fs-dist/assets/style/common.css',
                    dest: 'fs-dist/assets/style/common.css'
                },{
                    src: 'fs-dist/assets/style/app.css',
                    dest: 'fs-dist/assets/style/app.css'
                }]
            },
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
        "concat": {
            options: {
                stripBanners: true
            },
            seajs: {
                options: {
                    banner: '/**\n' +
                        ' * 纷享自定制版arale.js\n'+
                        ' * @Author: 纷享网页前端部\n'+
                        ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                        ' */\n'
                },
                files: [{
                    src: ['fs-dist/assets/seajs/sea-modules/arale/**/*.js', '!fs-dist/assets/seajs/sea-modules/arale/**/*-debug.js'],
                    dest: 'fs-dist/assets/seajs/dist/all.js'
                },{
                    src: ['fs-dist/assets/style/base.css','fs-dist/assets/style/ui.css','fs-dist/assets/style/common.css','fs-dist/assets/style/app.css'],
                    dest: 'fs-dist/assets/style/all.css'
                },{
                    src: ['fs-dist/assets/js/underscore.js','fs-dist/assets/js/underscore.string.js','fs-dist/assets/js/backbone.js'],
                    dest: 'fs-dist/assets/js/all.js'
                }]
            },
            assets:{
                options:{
                    banner: '/**\n' +
                        ' * 纷享资源文件\n'+
                        ' * @Author: 纷享网页前端部\n'+
                        ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                        ' */\n'
                },
                files:[{
                    src: ['fs-dist/assets/style/base.css','fs-dist/assets/style/ui.css','fs-dist/assets/style/common.css','fs-dist/assets/style/app.css'],
                    dest: 'fs-dist/assets/style/all.css'
                },{
                    src: ['fs-dist/assets/js/underscore.js','fs-dist/assets/js/underscore.string.js','fs-dist/assets/js/backbone.js'],
                    dest: 'fs-dist/assets/js/all.js'
                }]
            },
            uilibs:{
                options:{
                    banner: '/**\n' +
                        ' * aralejs组件包装\n'+
                        ' * @Author: 纷享网页前端部\n'+
                        ' * @Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                        ' */\n'
                },
                files:[{
                    src: ['fs-dist/assets/uilibs/**/*.js', '!fs-dist/assets/uilibs/all.js'],
                    dest: 'fs-dist/assets/uilibs/all.js'
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

    grunt.registerTask('default', ['copy','imagemin','transport','uglify','cssmin','htmlmin','concat']);
    grunt.registerTask('clean-all', ['clean:all']);
};
