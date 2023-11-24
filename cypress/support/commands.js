Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Renan')
        .should('have.value', "Renan")
    cy.get('#lastName').type('Ferreira')
        .should('have.value', "Ferreira")
    cy.get('#email').type('renanferreira@teste.com.br')
        .should('have.value', "renanferreira@teste.com.br")
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()
   
})

