describe('Loading diferent sections from navbar', function() {

	beforeEach(function() {
		browser.get('/');
	});
	
	it('should load correctly the sections when clicking at the navbar links ', function() {
		
		// At start, home is the one active'
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/');

		// the navbar is present 
		var navbarId = element(by.id('navbar'));
		expect(navbarId.isDisplayed()).toBe(true);

		///////////// Go to Home  ///////////
		var homeSectionLink = element.all(by.css('a')).get(0);
		homeSectionLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/');

		///////////// Go to Products  ///////////
		var productsSectionLink = element.all(by.css('a')).get(1);
		productsSectionLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/products');
		
	});

});