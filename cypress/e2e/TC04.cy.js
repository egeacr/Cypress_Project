describe('TC04', () => {

  //Comparing API's response with values that are displayed at the screen



  it('GET-GetProductList', () => {
    cy.intercept('GET', 'https://testertest.77diamondstest.com/api/api/Product/GetProductList').as('getProductList')
    cy.visit("/")

    cy.wait('@getProductList').then((interception) => {
        
        const response = interception.response

        expect(response.statusCode).to.eq(200)
        expect(response.body.success).to.eq(true)
        
   
       for (let i = 0; i < response.body.response.length; i++) {
        const product = response.body.response[i];
      
        // Product Id
        cy.get(`tbody > :nth-child(${i + 1}) > th`).invoke('text').then(($ID) => {
          expect($ID).to.include(product.productId);
        });
      
        // Product Name
        cy.get(`tbody > :nth-child(${i + 1}) > :nth-child(2)`).invoke('text').then(($PN) => {
          expect($PN).to.eq(product.productName);
        });
      
        // Color Count
        cy.get(`tbody > :nth-child(${i + 1}) > :nth-child(3)`).invoke('text').then(($CC) => {
          expect($CC).to.include(product.colorCount);
        });
      
        // Fabric Count
        cy.get(`tbody > :nth-child(${i + 1}) > :nth-child(4)`).invoke('text').then(($FC) => {
          expect($FC).to.include(product.fabricCount);
        });
      
        // Image Count
        cy.get(`tbody > :nth-child(${i + 1}) > :nth-child(5)`).invoke('text').then(($IC) => {
          expect($IC).to.include(product.imageCount);
        });
      }
    })
  })

  it('GET-GetProductDetail/<productId>', () => {
    
    cy.intercept('GET', 'https://testertest.77diamondstest.com/api/api/Product/GetProductDetail/2').as('productDetail')
    
    cy.visit("/")
    cy.get(':nth-child(2) > :nth-child(6) > .btn').click()
    
    cy.wait('@productDetail').then((interception)=>{

      const response = interception.response

        expect(response.statusCode).to.eq(200)
        expect(response.body.success).to.eq(true)
        
   
       for (let i = 0; i < response.body.response.length; i++) {
        const product = response.body.response[i];

        cy.get('.ms-2 > span').invoke('text').then(($productId)=>{
          expect($productId).to.include(product.productId)
        })

        cy.get('.ps-5 > span').invoke('text').then(($productName)=>{
          expect($productName).to.include(product.productName)
        })
       }

    })
  })


  it('POST-UploadProductImage-1', ()=>{

    cy.visit('/product-detail/2')

   cy.intercept('POST', 'https://testertest.77diamondstest.com/api/api/Product/UploadProductImage').as('uploadImage')
   cy.get('button[fabricid="2"][colorid="1"].btn.btn-primary.btn-sm').click()

   cy.get('#fileUpload').attachFile("white_linen_tshirt.jpeg")
  
  
   

    cy.intercept('GET', 'https://testertest.77diamondstest.com/api/api/Product/GetProductDetail/2').as('productDetail')


    cy.wait('@uploadImage').then((intercept)=>{
      expect(intercept.response.body.statusCode).to.eq(200)
    })

    cy.wait('@productDetail').then((interception)=>{

      const response = interception.response
      
      for (let i = 0; i < response.body.response.length; i++) {
        const product = response.body.response[i];

        if (product.imageName === "white_linen_tshirt.jpeg") {
         
          expect(product.colorName).to.equal('White');
          expect(product.fabricName).to.equal('Linen'); 
        }

        
       }

    })





  })


  it('POST-UploadProductImage-2', () => {

    cy.fixture('white_linen_tshirt.jpeg').then((fileContent) => {
      // Define the URL for the POST request
      const url = 'https://testertest.77diamondstest.com/api/api/Product/UploadProductImage';
      // Create a FormData object to simulate a file upload

      const formData = new FormData();

      // Load the image from the fixture and append it to the FormData
      cy.fixture('white_linen_tshirt.jpeg').then((fileContent) => {
        const blob = new Blob([fileContent], { type: 'image/jpeg' });
        formData.append('formFile', blob, 'white_linen_tshirt.jpeg');
  
        // Append other form data fields
        formData.append('colorId', '1');
        formData.append('fabricId', '2');
        formData.append('productId', '3');
        
        cy.request({
          method: 'POST',
          url: 'https://testertest.77diamondstest.com/api/api/Product/UploadProductImage',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: formData,
        }).then((response) => {
          
          expect(response.status).to.be.within(200, 299);
  
          
        });
      });


    });

  })

  it('DELETE-DeleteProductDetail/', () => {
    
    cy.intercept('GET', 'https://testertest.77diamondstest.com/api/api/Product/GetProductDetail/3').as('productDetail')

    cy.visit("/")
    cy.get(':nth-child(3) > :nth-child(6) > .btn').click()
    
   
    

    

    cy.wait('@productDetail').then((interception)=>{

      const response = interception.response
      let idForDelete

      for (let i = 0; i < response.body.response.length; i++) {
        const product = response.body.response[i];

        if (product.imageName === "white_linen_tshirt.jpeg") {
          idForDelete=product.id
        }
       }

       if(idForDelete){
       cy.request({
        method: 'DELETE',
        url: `https://testertest.77diamondstest.com/api/api/Product/DeleteProductDetail/${idForDelete}`,
      }).then((response) => {
      
        expect(response.status).to.eq(200);

      });
    }
    })
  })



})