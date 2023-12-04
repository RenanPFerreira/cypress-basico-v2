/// <reference types="cypress" />
describe('Central de Atendimento ao Cliente TAT', function () {
    const longText = 'Teste Long Teste Teste Long Teste Teste Long Teste Teste Long Teste Teste Long Teste Teste Long Teste Teste Long Teste Teste Long Teste '
    beforeEach(function () {
        cy.visit('./src/index.html')

    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {

        cy.get('#firstName')
            .type('Renan')
            .should('have.value', "Renan")
        cy.get('#lastName')
            .type('Ferreira')
            .should('have.value', "Ferreira")
        cy.get('#email')
            .type('renanferreira@teste.com.br')
            .should('have.value', "renanferreira@teste.com.br")
        cy.get('#open-text-area')
            .type(longText, { delay: 0 })
            .should('have.value', longText)
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.success > strong')
            .should('be.visible')
    })
    it('exibe mensagem erro em e-mail inválido', function () {
        cy.get('#firstName')
            .type('Renan')

        cy.get('#lastName')
            .type('Ferreira')
        cy.get('#email')
            .type('1231231@teste,br')

        cy.get('#open-text-area')
            .type(longText, { delay: 0 })

        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })
    it('validar se campo telefone aceita apenas números', function () {
        cy.get('#phone')
            .type('A#B¨$')
            .should('have.value', '')
            .type('123456798')
            .should('have.value', '123456798')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName')
            .type('Renan')
            .should('have.value', "Renan")
        cy.get('#lastName')
            .type('Ferreira')
            .should('have.value', "Ferreira")
        cy.get('#email')
            .type('renanferreira@teste.com.br')
            .should('have.value', "renanferreira@teste.com.br")
        cy.get('#open-text-area')
            .type(longText, { delay: 0 })
            .should('have.value', longText)
        cy.get('#phone-checkbox')
            .click()
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        //inserção e validação de dados
        cy.get('#firstName').type('Renan')
            .should('have.value', "Renan")
        cy.get('#lastName').type('Ferreira')
            .should('have.value', "Ferreira")
        cy.get('#email').type('renanferreira@teste.com.br')
            .should('have.value', "renanferreira@teste.com.br")
        cy.get('#phone').type('123456798')
            .should('have.value', '123456798')
        cy.get('#open-text-area').type(longText, { delay: 0 })
            .should('have.value', longText)
        //limpeza e validação de campos
        cy.get('#firstName').clear()
            .should('have.value', '')
        cy.get('#lastName').clear()
            .should('have.value', '')
        cy.get('#email').clear()
            .should('have.value', '')
        cy.get('#phone-checkbox')
            .check()
        cy.get('#open-text-area').clear()
            .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong')
            .should('be.visible')

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
    it('seleciona um produto (Cursos) por seu índice', function () {
        cy.get('#product').select(2).should('have.value', 'cursos')
    })
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('[type="radio"]').check('feedback')
            .should('be.checked')
    })
    it('marca cada tipo de atendimento', function () {
        cy.get('[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                    .should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]').should('not.have.value') // verificando que não tem nenhum item selecionado
            .selectFile('cypress/fixtures/example.json') //selecionando arquivo do caminho relativo Fixtures
            .should(function ($input) { //adicionando função de callback recebendo o Input acima
                // adicionar log para verificar comportamento do callback acima console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')//garantir que o primeiro item é o example.json
            })
  



    })
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]').should('not.have.value') // verificando que não tem nenhum item selecionado
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) //selecionando arquivo do caminho relativo Fixtures
            .should(function ($input) { //adicionando função de callback recebendo o Input acima
                // adicionar log para verificar comportamento do callback acima console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')//garantir que o primeiro item é o example.json
            })
    })
    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
       cy.fixture('example.json').as('sampleFile')
       cy.get('input[type="file"]')
       .selectFile('@sampleFile')
       .should(function ($input) { //adicionando função de callback recebendo o Input acima
        // adicionar log para verificar comportamento do callback acima console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')//garantir que o primeiro item é o example.json
    })
    })
})


