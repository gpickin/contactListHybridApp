function ContactFormUI(){
	
	var photos = [
					'http://semantic-ui.com/images/avatar2/large/kristy.png',
					'http://semantic-ui.com/images/avatar/large/elliot.jpg',
					'http://semantic-ui.com/images/avatar/large/jenny.jpg',
					'http://semantic-ui.com/images/avatar2/large/matthew.png',
					'http://semantic-ui.com/images/avatar2/large/molly.png',
					'http://semantic-ui.com/images/avatar2/large/elyse.png',
					'http://semantic-ui.com/images/avatar/large/steve.jpg',
					'http://semantic-ui.com/images/avatar/large/daniel.jpg',
					'http://semantic-ui.com/images/avatar/large/helen.jpg',
					'http://semantic-ui.com/images/avatar/large/matt.jpg',
					'http://semantic-ui.com/images/avatar/large/veronika.jpg',
					'http://semantic-ui.com/images/avatar/large/stevie.jpg'
					];
		
	return {
		
		setupForm: function(contactID) {
			this.clearForm();
			app.contactID = contactID;
			if ( !!contactID ){
				app.utilityService.log('Going to edit contact ' + contactID );
				this.loadFormData( contactID );
			}
			else {
				app.utilityService.log('Going to setup form for new contact');
			}
			$.mobile.changePage("#pageEditContact");
		},
		
		save: function( saveButton ) {
			var contact = this.getContactObjectFromForm();
			var isValid = app.contactService.isValid( contact );
			
			this.resetFormErrors();
			$(saveButton).prop('disabled', true);
			$(saveButton).addClass('disabled');
				
			if ( isValid.result === 200 ){
				app.utilityService.log( 'Going to save contact' );
				$.when( app.contactService.save( contact ) ).done( function( contactID ){
					app.utilityService.log(contactID );
					if ( !!contact.ID ){
						app.utilityService.log( 'Going to view contact ' + contact.ID) ;
						app.ui.viewContact( contact.ID );
					}
					else {
						app.utilityService.log( 'Going to view contact ' + contactID.insertId) ;
						app.ui.viewContact( contactID.insertId );
					}
				});
			}	
			else {
				$(saveButton).prop('disabled', false);
				$(saveButton).removeClass('disabled');
				
				this.setFormErrors( isValid );
				app.utilityService.log( 'Errors found in form' );
				app.utilityService.log( isValid.errorList );
			}
		},
		
		setFormErrors: function( isValid ){
			contactFormErrorMessages = $('#contactFormErrorMessages');
			contactFormErrorMessages.html('<ul></ul>');
			
			isValid.errorList.forEach(function( element ){
				$('#editFrm_' + element.fieldName).parent().addClass('error');
				contactFormErrorMessages.children().append('<li>' + element.fieldName + ': ' + element.isValid.message+ '</li>');
			});
		},
		
		resetFormErrors: function( ){
			$('#contactFormErrorMessages').html('');
			$('#editFrm_firstName').parent().removeClass('error');
			$('#editFrm_lastName').parent().removeClass('error');
			$('#editFrm_company').parent().removeClass('error');
			$('#editFrm_email').parent().removeClass('error');
			$('#editFrm_phone').parent().removeClass('error');
			$('#editFrm_street').parent().removeClass('error');
			$('#editFrm_city').parent().removeClass('error');
			$('#editFrm_state').parent().removeClass('error');
			$('#editFrm_zip').parent().removeClass('error');
		},
		
		
		
		loadFormData: function( contactID ) {
			app.utilityService.log( 'loading contact ' + contactID );
			$.when( app.contactService.getContact( contactID ) ).done( function( contact ){
				app.contactFormUI.renderFormData( contact.rows.item(0) );				
				//app.ui.viewContact( contactID );	
			});
		},
			
		renderFormData: function( contact ) {
			app.utilityService.log( 'rendering contact ' + contact.ID );
			app.contactID = contact.ID;
			$('#editFrm_firstName').val(contact.firstName);
			$('#editFrm_lastName').val(contact.lastName);
			$('#editFrm_company').val(contact.company);
			$('#editFrm_email').val(contact.email);
			$('#editFrm_phone').val(contact.phone);
			$('#editFrm_street').val(contact.street);
			$('#editFrm_city').val(contact.city);
			$('#editFrm_state').val(contact.state).selectmenu('refresh');
			$('#editFrm_zip').val(contact.zip);
			
		},
		
		getContactObjectFromForm: function() {
			
			var contact = {};
			contact.ID = app.contactID;
			contact.firstName = $('#editFrm_firstName').val();
			contact.lastName = $('#editFrm_lastName').val();
			contact.company = $('#editFrm_company').val();
			contact.email = $('#editFrm_email').val();
			contact.phone = $('#editFrm_phone').val();
			contact.street = $('#editFrm_street').val();
			contact.city = $('#editFrm_city').val();
			contact.state = $('#editFrm_state').val();
			contact.zip = $('#editFrm_zip').val();
			
			if ( contact.ID  === null ){
				contact.photoURL = this.getPhotoURL();
			}
			return contact;
			
		},
		
		getPhotoURL: function() {
			return photos[Math.floor(Math.random()*photos.length)];
		},
		
		clearForm: function() {
			this.resetFormErrors();
			$('#editContactForm').trigger("reset");
			$('#btnEditContactFormSave').prop('disabled', false).removeClass('disabled');
		}
		
	};
	
}