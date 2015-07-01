function ContactDAO() {
	
	return {	
		
		delete: function( ID ) {
	    		var sql = 'DELETE FROM contacts ' +
	    				'WHERE ID = ?';
			
			return $.Deferred(function (d) {
				app.db.transaction(function (tx) {
					tx.executeSql(sql,
						[
						ID
						],
						function(tx, data){ 
							d.resolve(data); 
						},
						function(tx, error){ 
							app.utilityService.log( error );	 
							d.reject(error);
						}
					);
				}); 
			});
	    },
	    
	    
		getContacts: function( ) {
			
			return $.Deferred(function (d) {
				app.db.readTransaction(function (tx) {
					tx.executeSql(
						'SELECT * ' +
						'FROM contacts ' + 
						'ORDER BY lastName',
						[],
						function(tx, data){ 
							app.utilityService.log('getAttendees ' + data.rows.length + ' attendees');
							d.resolve(data); 
						},
						function(tx, error){ 
							app.utilityService.log('getAttendees - failureWrapper'); 
							d.reject(error);
						}
					);
				}); 
			});
		},
	    
	    getContact: function( ID ) {
			
			var sql = 'SELECT * ' +
					  'FROM contacts ' +
					  'WHERE ID = ?';
			
			return $.Deferred(function (d) {
				app.db.readTransaction(function (tx) {
					tx.executeSql(sql,
						[ID],
						function(tx, data){ 
							app.utilityService.log('success Wrapper getAttendee ' + data.rows.length);
							d.resolve(data); 
						},
						function(tx, error){ 
							app.utilityService.log('failureWrapper getAttendee'); 
							d.reject(error);
						}
					);
				}); 
			});
		},
		
	createContact: function( contact ) {
	    		var sql = 'INSERT INTO contacts ' +
	    				' ( ' +
	    				'ID, ' +
	    				'firstName, ' +
	    				'lastName, ' +
	    				'company, ' +
	    				'email, ' +
	    				'phone, ' +
	    				'street, ' +
	    				'city, ' +
			    		'state, ' +
			    		'zip, ' +
			    		'photoURL ' +
			    		' ) VALUES ( ' +
	    				'?,' +	
	    				'?,' +	
	    				'?,' +	
	    				'?,' +
	    				'?,' +
	    				'?,' +
	    				'?,' +
	    				'?,' +	
	    				'?,' +	
	    				'?,' +	
	    				'? )';
			
			return $.Deferred(function (d) {
				app.db.transaction(function (tx) {
					tx.executeSql(sql,
						[
						null,
						contact.firstName,
						contact.lastName,
						contact.company,
						contact.email,
						contact.phone,
						contact.street,
						contact.city,
						contact.state,
						contact.zip,
						contact.photoURL
						],
						function(tx, data){ 
							d.resolve(data);
						},
						function(tx, error){ 
							app.utilityService.log( error ); 
							d.reject(error);
						}
					);
				}); 
			});
	    },
	    
		updateContact: function( contact ) {
	    		var sql = 'UPDATE contacts SET ' +
	    				'firstName = ?, ' +
	    				'lastName = ?, ' +
	    				'company = ?, ' +
	    				'email = ?, ' +
	    				'phone = ?, ' +
	    				'street = ?, ' +
	    				'city = ?, ' +
	    				'state = ?, ' +
	    				'zip = ? ' +
	    				'WHERE ID = ?';
			
			return $.Deferred(function (d) {
				app.db.transaction(function (tx) {
					tx.executeSql(sql,
						[
						contact.firstName,
						contact.lastName,
						contact.company,
						contact.email,
						contact.phone,
						contact.street,
						contact.city,
						contact.state,
						contact.zip,
						contact.ID
						],
						function(tx, data){ 
							d.resolve(data); 
						},
						function(tx, error){ 
							app.utilityService.log( error );	 
							d.reject(error);
						}
					);
				}); 
			});
	    }
	};
}	    
	    