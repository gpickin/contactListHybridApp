function DatabaseConfigService() {
	
	var dbSize = 5 * 1024 * 1024; // 5MB
	var db; 
	
	return {	
		
		getDB: function() {
			return db;
		},
		
		init: function() {
			
			this.openDatabaseConnection();
			this.createContactTable();
		},
		
		openDatabaseConnection: function() {	
			db = openDatabase("ContactList", "", "ContactListApp", dbSize, function() {
    				app.utilityService.log('db successfully opened or created');
			});
		},
		
		createContactTable: function() {
			//this.dropContactTable();
			db.transaction(function (tx) {
			    tx.executeSql("CREATE TABLE contacts " +
			    	"(ID INTEGER PRIMARY KEY ASC AUTOINCREMENT, " +
			    	"firstName TEXT, " +
			    	"lastName TEXT, " +
			    	"company TEXT, " +
			    	"email TEXT, " +
			    	"phone INTEGER, " +
			    	"street TEXT, " +
			    	"city TEXT, " +
			    	"state TEXT, " +
			    	"zip INTEGER, " +
			    	"photoURL TEXT " +
			    	")",
			        [], 
				    function() {
	    					app.utilityService.log('db success - created contact table');	
	    					app.databaseConfigService.preloadData();
					},
					function(tx, error) {
	    					app.utilityService.log('db error - failed to create table contact - already exists');
	    					app.utilityService.log(error);
					}
				);
			});
		},
		
		preloadData: function() {
		
			for (var i = 0; i < 20; i++){
				if ( typeof dummyDataArray[i].photoURL === 'undefined') {
					dummyDataArray[i].photoURL = app.contactFormUI.getPhotoURL(); 
				}
				app.contactService.save( dummyDataArray[i] );
			}
		},
		
		dropContactTable: function(){
			db.transaction(function (tx) {
				tx.executeSql("drop table contacts",
			        [], 
			        function() {
	    					app.utilityService.log('db success - drop table contact');
					},
					function(tx, error) {
	    					app.utilityService.log('db error - failed to drop table contact');
	    					app.utilityService.log(error);
					}
				);
			});
		}
		
	};
}
