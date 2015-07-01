function UtilityService() {
	
	var thisModule = {};
	
	thisModule.log = function( message, level ){
		level = typeof level !== 'undefined' ?  level : 'debug';
		
		if ( level === 'console'){
			console.log( message );
		}
		else if ( level === 'debug'){
			if ( app.env.debug ){
				console.log( message );
			}
		}	
		else {
			// Message Suppressed - Log to relevant logger
		} 
	};
	
	return thisModule;

}