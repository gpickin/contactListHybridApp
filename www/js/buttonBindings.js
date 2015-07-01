function ButtonBindings() {
	
	return {
		
		init: function() {
			
			
			$(document).on('click', '.btnAddContact', function () {
				app.contactFormUI.setupForm(null);
	  		});
	  		
	  		$(document).on('click', '.btnEditContact,#btnViewContactEdit', function () {
				app.contactFormUI.setupForm(this.dataset.id);
	  		});
	  		
	  		$(document).on('click', '#btnViewContactDelete', function () {
				app.ui.confirmDelete(this.dataset.id);
	  		});
	  		
			$(document).on('click', '#btnEditContactFormCancel', function () {
				app.ui.goHome();    
	  		});
	  		
	  		$(document).on('click', '.btnHome', function () {
				app.ui.goHome();    
	  		});
	  		
	  		$(document).on('click', '#btnEditContactFormSave', function () {
				app.contactFormUI.save( this );    
	  		});
	
			$(document).on('click', '.contactListContactItem', function(){
				app.ui.viewContact(this.dataset.id);
			});
			
			$(document).on('click', '.btnReloadContacts', function(){
				app.ui.reloadContacts();
			});
			
	
		}
	};

}		