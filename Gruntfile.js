module.exports = function(grunt) {



  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> v<%= pkg.version %> \n (c) Copyright 2014 Backand All rights reserved. https://backand.com \n License: MIT\n */\n'
      },
      js: {  
        src: 'app/backand/dist/<%= pkg.name %>.debug.js',
        dest: 'app/backand/dist/<%= pkg.name %>.min.js'
      }

    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      css: {
        expand: true,
        src: 'app/backand/dist/<%= pkg.name %>.debug.css',
       // dest: target,
        ext: '.min.css'
      }
    },

    concat: {
      options: {
        banner: '/*\n <%= pkg.name %> v<%= pkg.version %> \n (c) Copyright 2014 Backand All rights reserved. https://backand.com \n License: MIT\n */\n'       
      },
      css: {
        src: [ 'app/backand/src/css/app.css', 'app/backand/src/js/directives/*/css/*.css'],
        dest:  'app/backand/dist/<%= pkg.name %>.debug.css'
      },
      js: {  
        options: {
          separator: ';'
        },   
        src: [ 
		 'app/backand/src/js/backand.js',
		 'app/backand/src/js/jquery.backand.js',
		 'app/backand/src/js/global.js',
		 'app/backand/src/js/services/data.js' ,
		 'app/backand/src/js/services/config.js' ,
		 'app/backand/src/js/services/constants.js' ,
		 'app/backand/src/js/services/global.js' ,
		 'app/backand/src/js/controllers/menu.js' ,
		 'app/backand/src/js/controllers/profile.js' ,
		 'app/backand/src/js/controllers/signIn.js' ,
		 'app/backand/src/js/filters/filters.js' ,
		 'app/backand/src/js/directives/grids/js/grids.js' ,
		 'app/backand/src/js/directives/dashboard/js/dashboard.js' ,
		 'app/backand/src/js/directives/icons/js/icons.js' ,
		 'app/backand/src/js/directives/charts/js/charts.js' ,
		 'app/backand/src/js/directives/forms/js/forms.js' ,
		 'app/backand/src/js/directives/content/js/content.js' ,
		 'app/backand/src/js/directives/content/js/htmlcontent.js' ,
		 'app/backand/src/js/directives/content/js/iframecontent.js' ,
		 'app/backand/src/js/directives/content/js/linkcontent.js' ,
		 'app/backand/src/js/directives/textarea/js/textarea.js' ,
		 'app/backand/src/js/directives/input/js/input.js' ,
		 'app/backand/src/js/directives/singleSelect/js/singleSelect.js' ,
		 'app/backand/src/js/directives/autocomplete/js/autocomplete.js' ,
		 'app/backand/src/js/directives/editor/js/editor.js' ,
		 'app/backand/src/js/directives/checkbox/js/checkbox.js' ,
		 'app/backand/src/js/directives/link/js/link.js' ,
		 'app/backand/src/js/directives/date/js/date.js' ,
		 'app/backand/src/js/directives/numeric/js/numeric.js' ,
		 'app/backand/src/js/directives/grids/js/disabledGrids.js' ,
		 'app/backand/src/js/directives/image/js/image.js' ,
		 'app/backand/src/js/directives/email/js/email.js' ,
		],
        dest:  'app/backand/dist/<%= pkg.name %>.debug.js'
      }
    },

    ngtemplates:  {
      options: {
         concat: 'js'
      },
      "backAnd.directives": {
        src:   'app/backand/src/js/directives/*/partials/**.html',
        dest: 'app/backand/dist/app.templates.js',
        htmlmin: {
          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          removeAttributeQuotes:          true,
          removeComments:                 true, // Only if you don't use comment directives!
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true
        }
      }
    },

    clean: {
      options: {
        force: true
      },
      build: [  "app/backand/dist/app.templates.js"]
    }
  });


  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify', 'cssmin', 'clean']);

};