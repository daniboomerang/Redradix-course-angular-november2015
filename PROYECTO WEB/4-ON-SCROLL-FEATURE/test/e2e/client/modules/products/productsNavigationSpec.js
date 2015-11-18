describe('Loading diferent sections from navbar', function() {

	beforeEach(function() {
		browser.get('/');
	});
	
	it('should load correctly the sections when clicking at the navbar links ', function() {

		// the navbar is present 
		var navbarId = element(by.id('navbar'));
		expect(navbarId.isDisplayed()).toBe(true);
		
		// At start, home is the one active'
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/');

		///////////// Go to Products  ///////////
		var productsSectionLink = element.all(by.css('li')).get(1);
		productsSectionLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/products');

		////////////// Products Navbar //////////////
		var producstNavbar = element(by.id('products-navbar'));
		expect(producstNavbar.isDisplayed()).toBe(true);

		var firstProductLink = producstNavbar.all(by.css('li')).get(0);
		firstProductLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/products/product0');

		var secondProductLink = producstNavbar.all(by.css('li')).get(1);
		secondProductLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/products/product1');

		var thirdProductLink = producstNavbar.all(by.css('li')).get(2);
		thirdProductLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/products/product2');

		var fourthProductLink = producstNavbar.all(by.css('li')).get(3);
		fourthProductLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/products/product3');

		var fifthProductLink = producstNavbar.all(by.css('li')).get(4);
		fifthProductLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/products/product4');

		var sixthProductLink = producstNavbar.all(by.css('li')).get(5);
		sixthProductLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/products/product5');

		var seventhProductLink = producstNavbar.all(by.css('li')).get(6);
		seventhProductLink.click();
		browser.sleep(1000);
		// Checking URL
		expect(browser.getCurrentUrl()).toContain('/products/product6');

	});

});