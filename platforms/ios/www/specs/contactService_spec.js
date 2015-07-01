app.contactService = ContactService();

describe("Contact Service's isValidRequired() function", function() {
	
	var goodInputs = [
			0,
			1,
			5555555555,
			'0',
			'1',
			'5555555555'
			];
	
	var badInputs = [
			null,
			'',
			];
			
	it("returns true if you pass it valid input", function() {
		goodInputs.forEach(function(element){
			expect( app.contactService.isValidRequired(element).result ).toBeDefined();
			expect( app.contactService.isValidRequired(element).result ).toBe( true );
			expect( app.contactService.isValidRequired(element).message ).not.toBeDefined();
		});	
	});
	
	it("returns false if you pass it invalid input", function() {
		
		expect( app.contactService.isValidRequired().result ).toBeDefined();
		expect( app.contactService.isValidRequired().result ).toBe( false );
		badInputs.forEach(function(element){
			expect( app.contactService.isValidRequired(element).result ).toBeDefined();
			expect( app.contactService.isValidRequired(element).result ).toBe( false );
		});	
	});
	
	it("returns an error message if you pass it invalid input", function() {
		badInputs.forEach(function(element){
			expect( app.contactService.isValidRequired(element).message ).toBeDefined();
			expect( app.contactService.isValidRequired(element).message ).toBe( 'Field Required' );
		});	
	});
});

describe("Contact Service's isValidInteger() function", function() {
	var goodInputs = [
			0,
			1,
			5555555555,
			'0',
			'1',
			'5555555555'
			];
	
	var badInputs = [
			null,
			'',
			'sample text',
			'555.555.5555',
			'555-555-5555',
			'555 555 5555',
			'(555).555.5555',
			'(555) 555 5555',
			'(555)5555555',
			'555.5',
			'.555',
			'555.0',
			'555.',
			//'123'
			];
			
	it("returns true if you pass it valid input", function() {
		
		goodInputs.forEach(function(element){
			expect( app.contactService.isValidInteger(element).result ).toBeDefined();
			expect( app.contactService.isValidInteger(element).result ).toBe( true );
		});
	});
	
	it("returns false if you pass it invalid input", function() {
		
		expect( app.contactService.isValidInteger().result ).toBeDefined();
		expect( app.contactService.isValidInteger().result ).toBe( false );
			
		badInputs.forEach(function(element){
			expect( app.contactService.isValidInteger(element).result ).toBeDefined();
			expect( app.contactService.isValidInteger(element).result ).toBe( false );	
		});
		
	});
	
	it("returns an error message if you pass it invalid input", function() {
		
		expect( app.contactService.isValidInteger().message ).toBeDefined();
		expect( app.contactService.isValidInteger().message ).toBe( 'Invalid Integer' );	
				
		badInputs.forEach(function( element ){
			expect( app.contactService.isValidInteger(element).message ).toBeDefined();
			expect( app.contactService.isValidInteger(element).message ).toBe( 'Invalid Integer' );	
		});
		
	});
});


describe("Contact Service's isValidEmail() function", function() {
	var goodInputs = [
			'myemail@mydomain.com',
			'myemail@mydomain.co.uk',
			'my.email@mydomain.com',
			'myemail+@mydomain.com',
			'my+email@mydomain.com'
			];
	
	var badInputs = [
			null,
			'',
			5,
			55555555,
			'5',
			'55555555',
			'abcdef@',
			'abcdev@hijkl',
			'abcdev@hijkl.',
			'abcdev@hijkl.com.',
			'.abcdev@hijkl.com'
			];
			
	it("returns true if you pass it valid input", function() {
		
		goodInputs.forEach(function(element){
			expect( app.contactService.isValidEmail(element).result ).toBeDefined();
			expect( app.contactService.isValidEmail(element).result ).toBe( true );
		});
	});
	
	it("returns false if you pass it invalid input", function() {
		
		expect( app.contactService.isValidEmail().result ).toBeDefined();
		expect( app.contactService.isValidEmail().result ).toBe( false );
			
		badInputs.forEach(function(element){
			expect( app.contactService.isValidEmail(element).result ).toBeDefined();
			expect( app.contactService.isValidEmail(element).result ).toBe( false );	
		});
		
	});
	
	it("returns an error message if you pass it invalid input", function() {
		
		expect( app.contactService.isValidEmail().message ).toBeDefined();
		expect( app.contactService.isValidEmail().message ).toBe( 'Invalid Email' );	
				
		badInputs.forEach(function( element ){
			expect( app.contactService.isValidEmail(element).message ).toBeDefined();
			expect( app.contactService.isValidEmail(element).message ).toBe( 'Invalid Email' );	
		});
		
	});
});
