function ContactService() {
	
	return {	
		
		delete: function( contactID ){
			
			app.utilityService.log('delete Contact - returning the deferred');
			return app.contactDAO.delete( contactID );
			
		},
		
		getContact: function( contactID ){
			
			app.utilityService.log('getContact - returning the deferred');
			return app.contactDAO.getContact( contactID );
			
		},
		
		getContacts: function( ){
			
			app.utilityService.log('getContactss - returning the deferred');
			return app.contactDAO.getContacts( );
			
		},
		
		isValid: function( contact ){
			var result = {};
			result.result = 200;
			result.errorList = [];
			
			var fieldsToValidate = [
					{ 
						'fieldName':'firstName',
						'isValid':this.isValidRequired( contact.firstName )
					},
					{ 
						'fieldName':'lastName',
						'isValid':this.isValidRequired( contact.lastName)
					},
					{ 
						'fieldName':'email',
						'isValid':this.isValidEmail( contact.email)
					},
					{ 
						'fieldName':'phone',
						'isValid':this.isValidInteger( contact.phone)
					}
				];
				
				fieldsToValidate.forEach( function (element, index ){
					console.log( element.isValid.result );
					if ( element.isValid.result === false){
						result.result = 500;
						result.errorList.push(element);
					}
				});
			
			return result;
		},
		
		save: function( contact ){
			
			if ( !!contact.ID ){
				return app.contactDAO.updateContact( contact );
			}
			else {
				return app.contactDAO.createContact( contact );
			}
		},
		
		
		isValidRequired: function( field ){
			if ( typeof field != 'undefined' && field !== null && field.length !== 0 ) {
				return { 'result':true };
			}
			else {
    				return { 'result':false, 'message':'Field Required' };
    			}
		},
		
		isValidInteger: function( field ){
			if ( typeof field != 'undefined' && field !== null && String(field) === String(parseInt(field, 10)) ) {
				return { 'result':true };
			}
			else {
    				return { 'result':false, 'message':'Invalid Integer' };
    			}
		},
		
		isValidEmail: function( field ){
			if ( typeof field === 'undefined' || field === null ){
				return { 'result':false, 'message':'Invalid Email'};
			}
			else if ( typeof field !== 'string'){
				return { 'result':false, 'message':'Invalid Email'};
			}
			else if ( field.length < 5 ){
		        return { 'result':false, 'message':'Invalid Email'};
		    }
		    else if ( field.indexOf('@') === -1 ){
		        return { 'result':false, 'message':'Invalid Email'};
		    }
		    else if ( field.indexOf('.', field.indexOf('@')) === -1 ){
		        return { 'result':false, 'message':'Invalid Email'};
		    }
		    else if ( field.charAt( field.length - 1) === '.' ){
		        return { 'result':false, 'message':'Invalid Email'};
		    }
		    else if ( field.charAt( 0 ) === '.' ){
		        return { 'result':false, 'message':'Invalid Email'};
		    }
		    else {
		      return { 'result':true };
		    }
		}
	
	};
}	