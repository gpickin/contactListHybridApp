function ui() {
	
	return {
		
		goHome: function(){
			this.reloadContacts();
			$.mobile.changePage("#pageContactList");
		},
		
		confirmDelete: function( contactID ){
			
			$('#modalViewContactDelete')
				.modal({
		          closable  : false,
		          onApprove : function() {
		            app.utilityService.log( 'deleting ' + contactID);
		            $.when( app.contactService.delete( contactID ) ).done( function( contactList ){
		            		app.ui.goHome();
		            	});	
		          }
		        })
		        .modal('show');
			
		},
		
		reloadContacts: function(){
			app.utilityService.log('start render function');
	
			$.when( app.contactService.getContacts() ).done( function( contactList ){
				app.utilityService.log('got the contacts data');
				app.ui.renderContactsToContactList( contactList );
			    app.ui.setupContactSearch();
			});	
		},
		
		renderContactsToContactList: function( contactList ){
			var template = $('#contactListContactTemplate').html();
			var $container = $('#contactListContainer').html('');
				
			Mustache.parse(template);   // optional, speeds up future uses
		    for (var i = 0; i < contactList.rows.length; i++){
		        var rendered = Mustache.render(template, contactList.rows.item(i) );
		        $container.append( rendered ); //.trigger('create')                      
		    } 	
		},
		
		setupContactSearch: function() {
			var $rows = $('#contactListContainer>div');
			$('#contact_filter_field').keyup(function() {
			    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
			        reg = RegExp(val, 'i'),
			        text;
			
			    $rows.show().filter(function() {
			        text = $(this).text().replace(/\s+/g, ' ');
			        return !reg.test(text);
			    }).hide();
			});
			
			$('#contact_filter_field').on('change', function(){
				$('#contact_filter_field').trigger('keyup');
			});
		},
		viewContact: function( contactID ){
			this.loadViewContact( contactID);
			$.mobile.changePage("#pageContactView");
		},
		
		loadViewContact: function( contactID ){
			app.utilityService.log('start render view contact');
	
			$.when( app.contactService.getContact( contactID) ).done( function( contact ){
				app.utilityService.log('got the contact data');
				app.ui.renderViewContact( contact );
			});
		},
		
		renderViewContact: function( contact ){
			var template = $('#contactViewContactTemplate').html();
			var $container = $('#contactViewContainer').html('');
			
			Mustache.parse(template);   // optional, speeds up future uses
			var rendered = Mustache.render(template, contact.rows.item(0) );
		    $container.append( rendered ); //.trigger('create')
		}
		
		
	};
	
}