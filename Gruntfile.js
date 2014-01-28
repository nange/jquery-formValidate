module.exports = function(grunt) {
// Project configuration.
grunt.initConfig({
	connect: {
		server: {
			  options: {
					port: 9000,
					keepalive: true
		  }
		}
	}
	
});

  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['connect']);
 
};
