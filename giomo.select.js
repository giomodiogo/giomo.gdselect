/**
	@author Diogo Giomo
	@since 02/09/2012
	
	reference : http://wiki.jqueryui.com/w/page/12138135/Widget%20factory
*/
(function( $ ) {
  $.widget( "giomo.gdselect", {
 
    // These options will be used as defaults
    options: { 
	  optionsSelect : [],
	  cssConfigureOpts : []
	  
	},
 
    // Set up the widget
    _create: function() {
		this.attrDefault = [
				{"name" : "background-image", "value" : "url('{IMG}')"},
				{"name" : "background-repeat", "value" : "no-repeat"  }
		];
		for(var i = 0; i < this.attrDefault.length; i++){
			this.options.cssConfigureOpts.push(this.attrDefault[i]);
		}
	},
	
	_init : function(){
			
		this.$optionsSelect = {};
		for(var i = 0; i < this.options.optionsSelect.length; i++){
		  var $option = 
			$("<option img="+this.options.optionsSelect[i].urlImg + " value=" + this.options.optionsSelect[i].value + ">" +
				this.options.optionsSelect[i].description + "</option>");
		  
		  
		 
			var cssConf = ""; 
			for(var k = 0; k < this.options.cssConfigureOpts.length; k++){
				if(this.options.cssConfigureOpts[k].name == "background-image"){
					this.options.cssConfigureOpts[k].value =
						this.options.cssConfigureOpts[k].value.replace("{IMG}",this.options.optionsSelect[i].urlImg );
					cssConf = cssConf + this.options.cssConfigureOpts[k].name+":"+ this.options.cssConfigureOpts[k].value+";";
					this.options.cssConfigureOpts[k].value = "url('{IMG}')";
				}else{
					cssConf = cssConf + this.options.cssConfigureOpts[k].name+":"+ this.options.cssConfigureOpts[k].value+";";
				}
			}
			 
			$($option).attr("style", cssConf);
		
			this.element.append($option);
		
		}
		this.$img = $("<span ></span>");
		this.element.parent().append(this.$img);
		this.element.change($.proxy(this, "_changeElement"));
	},
	
	_changeElement : function(){
		var img = "";
		$("select option:selected").each(function () {
			img = $(this).attr("img");
		});
		var $span = this.element.parent().children().filter('span');
		$span.children().remove();
		if(img != "undefined")
			$($span).append("<img src="+img+"></img>");
	}
  });
}( jQuery ) );