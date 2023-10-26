describe('TC02', () => {

    //Upload and Delete An Image and Verify Application Display True Values					
					
    it("Upload and delete image", ()=>{

        cy.visit('/')

        cy.get('thead > tr > :nth-child(3)').should('have.text', "Color Count")

        cy.get('thead > tr > :nth-child(4)').should('have.text', "Fabric Count")

        cy.get('thead > tr > :nth-child(5)').should('have.text', "Image Count")

        cy.get('tbody > :nth-child(1) > :nth-child(2)').invoke('text').as('HomePage').then(($text1) =>{
            cy.log($text1)
            cy.get(':nth-child(1) > :nth-child(6) > .btn').click()
            cy.wait(2000)
            cy.get('.ps-5 >span').should('have.text', $text1)

         })


         cy.get('button[fabricid="1"][colorid="1"].btn.btn-primary.btn-sm').click()

         cy.get('#fileUpload').attachFile("white.jpeg")

         cy.get(':nth-child(2) > :nth-child(2) > .close-button').click()

         cy.visit('/')

         cy.get(`tbody > :nth-child(1) > :nth-child(5)`).invoke('text').should('eq',"1")
        









    })
  
  
  
   
  
  
  
  
  })