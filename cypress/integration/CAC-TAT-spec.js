/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })


    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.';

        cy.get('[id="firstName"]').type("Weslley")
        cy.get('[id="lastName"]').type("Santos")
        cy.get('[id="email"]').type("weslleycarvalho344@gmail.com")
        cy.get('[id="open-text-area"]').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Weslley')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('weslley@gmail')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Validar se campo de telefone continua vazio apos a tentativa de insercao de caracteres nao-numerico', function () {
        cy.get('#phone').type('aaa').should('have.text', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Weslley')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('weslley@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('reenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Weslley')
            .should('have.value', 'Weslley')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Santos')
            .should('have.value', 'Santos')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('weslley@gmail.com')
            .should('have.value', 'weslley@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('11986998299')
            .should('have.value', '11986998299')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        //cy.get('#product').select('youtube').should('have.value', 'youtube')
        //cy.get('select').select('YouTube').should('have.value', 'youtube')
        cy.get('select').select(1).should('have.value', 'blog')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('seleciona valor aleatório', function () {
        cy.get('select option').its('length', { log: false }).then(n => {
            cy.get('#product').select(Cypress._.random(n - 1))
        })
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3).each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
        // No cypress podemos pegar todos os valores dentro de campo. 
        // should é usado para conferir se o tamanho da lista é o mesmo que a listada
        // each faz uma iteração ele é equivalente ao "for" do Java. 
        // O "each" deve receber como argumento a função de callback
        // A função de callback deve receber um argumento 
        // .wrap empata o valor para podermos manipula-los
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('ls@gmail.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type('Texto')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })


    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function (input) {
                console.log(input)
                expect(input[0].files[0].name).to.equal('example.json')
            })
        //Existem outras técnicas de seletor de css para deixar a seleção do elemento mais precisa
        //should pode receber uma função de callback
        //Podemos o console.log paa=ra conseguir saber o que o objeto devolve
        //Nesse caso nos conseguimos abrir um jquery para identificar o nome do arquivo
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[1].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('caminho_file')
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@caminho_file')
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })


    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
        //Usamos o "involke" para poder remover a propriedade "target" que contém o valor _black, quando clicado abre o link em outra aba, removendo-o abrimos na mesma aba, e apartir disso continuar testando a outra tela 
    })

    it('testa a página da política de privacidade de forma independente', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.title('CAC TAT - Política de privacidade').should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

})
