Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Joao')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('jsilvaemailfake@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})


Cypress.Commands.add('filltextarea', function() {
    cy.get('#open-text-area').type('Teste')
})