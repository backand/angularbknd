var Dgeni = require('dgeni');


module.exports = function(grunt) {



  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> v<%= pkg.version %> \n (c) Copyright 2014 Backand All rights reserved. https://backand.com \n License: MIT\n */\n'
      },
      js: {  
        src: 'dist/<%= pkg.name %>.debug.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }

    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      css: {
        expand: true,
        src: 'dist/<%= pkg.name %>.debug.css',
       // dest: target,
        ext: '.min.css'
      }
    },

    concat: {
      options: {
        banner: '/*\n <%= pkg.name %> v<%= pkg.version %> \n (c) Copyright 2014 Backand All rights reserved. https://backand.com \n License: MIT\n */\n'       
      },
      css: {
        src: [ 'app/backand/cssapp.css', 'app/backand/js/directives/*/css/*.css'],
        dest:  'dist/<%= pkg.name %>.debug.css'
      },
      js: {  
        options: {
          separator: ';'
        },   
        src: [ 
		 'app/backand/js/backand.js',
		 'app/backand/js/jquery.backand.js',
		 'app/backand/js/global.js',
		 'app/backand/js/services/data.js' ,
		 'app/backand/js/services/config.js' ,
		 'app/backand/js/services/constants.js' ,
		 'app/backand/js/services/global.js' ,
		 'app/backand/js/controllers/menu.js' ,
		 'app/backand/js/controllers/profile.js' ,
		 'app/backand/js/controllers/signIn.js' ,
		 'app/backand/js/filters/filters.js' ,
		 'app/backand/js/directives/grids/js/grids.js' ,
		 'app/backand/js/directives/dashboard/js/dashboard.js' ,
		 'app/backand/js/directives/icons/js/icons.js' ,
		 'app/backand/js/directives/charts/js/charts.js' ,
		 'app/backand/js/directives/forms/js/forms.js' ,
		 'app/backand/js/directives/content/js/content.js' ,
		 'app/backand/js/directives/content/js/htmlcontent.js' ,
		 'app/backand/js/directives/content/js/iframecontent.js' ,
		 'app/backand/js/directives/content/js/linkcontent.js' ,
		 'app/backand/js/directives/textarea/js/textarea.js' ,
		 'app/backand/js/directives/input/js/input.js' ,
		 'app/backand/js/directives/singleSelect/js/singleSelect.js' ,
		 'app/backand/js/directives/autocomplete/js/autocomplete.js' ,
		 'app/backand/js/directives/editor/js/editor.js' ,
		 'app/backand/js/directives/checkbox/js/checkbox.js' ,
		 'app/backand/js/directives/link/js/link.js' ,
		 'app/backand/js/directives/date/js/date.js' ,
		 'app/backand/js/directives/numeric/js/numeric.js' ,
		 'app/backand/js/directives/grids/js/disabledGrids.js' ,
		 'app/backand/js/directives/image/js/image.js' ,
		 'app/backand/js/directives/email/js/email.js' ,
		],
        dest:  'dist/<%= pkg.name %>.debug.js'
      }
    },

    ngtemplates:  {
      options: {
         concat: 'js'
      },
      "backAnd.directives": {
        src:   'app/backand/js/directives/*/partials/**.html',
        dest: 'dist/app.templates.js',
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
      build: [  "dist/app.templates.js"]
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


// var Dgeni = require('dgeni');

// module.exports = function(grunt) {

//   grunt.registerTask('dgeni', 'Generate docs via dgeni.', function() {
//     var done = this.async();
//     var dgeni = new Dgeni([require('./docs/dgeni-example')]);
//     dgeni.generate().then(done);
//   });

//   grunt.registerTask('default', ['dgeni']);

// };