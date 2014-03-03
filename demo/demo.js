$(function() {
	$('#demo-form').formValidate({
		fields: {
			'input[name="username"]': {
				remote: {
					url: '/backend.json'
				}
			},
			'input[name="email"]': {
				required: true,
				reg: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
			},
			'input[name="password"]': {
				forbidSpace: true
			}
		},
		requireErrorCallback: function() {
			alert('this field is required !');
		},
		regErrorCallback: function() {
			alert('reg test error !');
		}

	});
});
