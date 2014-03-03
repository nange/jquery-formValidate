/**
 * This is a jquery plug for validate form, and it is compatible for AMD
 * 
 * @author LanceLi
 */

;(function(factory) {
	if (typeof define == 'function' && define.amd) {
		//AMD support
		define(['jquery'], factory);
	} else {
		//Browser global
		factory(jQuery);
	}
})(function($) {

	var FormValidate = function(form, options) {
		this.$form = $(form);
		this.options = options;
		this.handleFields();
		this.handleSubmit();
	};

	FormValidate.DEFAULTS = {
		error: $.noop,
		success: $.noop,
		requireErrorCallback: $.noop,
		regErrorCallback: $.noop,
		errorDom: ''
	};

	FormValidate.prototype.handleFields = function() {
		var opts = this.options,
				_this = this; 

		$.each(opts.fields, function(key, value) {
			_this
				.$form
				.find(key)
				.on('blur', function(e) {
					var result = _this.validateField($(this), value);
					if (!result) {
						opts.error.call(this, e);
						return;
					}
					if (value.remote) {
						$.ajax({
							url: value.remote.url,
							dataType: 'json',
							data: value.remote.data
						}).done(function(json) {
							if (json.error) {
								alert(json.error.message);
							}
						});
					}
				});

			if (value.forbidSpace) {
				_this.$form.find(key).on('keydown', function(e) {
					var $this = $(this);
					if (e.which === 32) {
						// $this.val($.trim($this.val()));
						e.preventDefault();
					}
				});
			}

		});
	};

	FormValidate.prototype.validateField = function($field, fieldConf) {
		var val = $.trim($field.val()),
				opts = this.options,
				required = !!$field[0].attributes.getNamedItem('required') || fieldConf.required;

		if (required && !val.length) {
			opts.requireErrorCallback.call($field);
			return false;
		}

		if (fieldConf.reg) {
			var testResult = fieldConf.reg.test(val);
			if (!testResult) {
				opts.regErrorCallback.call($field);
			}
			return testResult;
		}

		return true;
	};

	FormValidate.prototype.handleSubmit = function() {
		var opts = this.options,
				error = false,
				_this = this;

		this.$form.on('submit', function(e) {
			for (var i in opts.fields) {
				if (!_this.validateField(_this.$form.find(i), opts.fields[i])) {
					error = true;
				}
			}
			if (error) {
				opts.error.call(this, e);
			} else {
				opts.success.call(this, e);
			}
		});
	};

	$.fn.formValidate = function (option) {
        var options = $.extend({}, FormValidate.DEFAULTS, typeof option == 'object' && option);
        	
        return this.each(function () {
		    var $this = $(this);
		    var data  = $this.data('formValidate');
 
		    if (!data) $this.data('formValidate', new FormValidate(this, options));
        });
    };
});
