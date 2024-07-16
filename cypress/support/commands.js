Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Weslley')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('weslleycarvalho344@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})


// Desse jeito conseguimos passar o valor no teste dentro do arquivo executavel
// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(nome, sobrenome, email, textArea) {
//     cy.get('#firstName').type(nome)
//     cy.get('#lastName').type(sobrenome)
//     cy.get('#email').type(email)
//     cy.get('#open-text-area').type(textArea)
//     cy.get('button[type="submit"]').click()
// })



// Passando um Objeto, mas devemos ter um objeto criado dentro do executável 
// const user = {} criamos um objeto

// beforeEach(function () {
//     cy.visit('./src/index.html')

//     user.nome = 'Sandro' passamos o valor do objeto
//     user.sobreNome ='Silva'
//     user.email = 'sandroS@gmail.com'
//     user.textArea = 'Texto generico'
// })

// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user) => {
//     cy.get('#firstName').type(user.nome)
//     cy.get('#lastName').type(user.sobreNome)
//     cy.get('#email').type(user.email)
//     cy.get('#open-text-area').type(user.textArea)
//     cy.get('button[type="submit"]').click()
// })
