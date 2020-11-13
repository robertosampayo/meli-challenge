const { wait } = require("@testing-library/react");


describe('Item Detail UI test', function() {


    const baseUrl = Cypress.env('baseUrl');
    const search1 = Cypress.env('search1');
    const search2 = Cypress.env('search2');
    const searchError = Cypress.env('searchError');
    const idItem = Cypress.env('idItem');


    context('Muestra la pagina del detalle del producto solicitado', function () {

        beforeEach(function () {
            cy.visit(`${Cypress.env('baseUrl')}/items/${idItem}`);
          });

        


        it('muestra una imagen, titulo, precio, descripciones y un boton', function() {

            cy.wait(500);
            cy.location().should((loc) => {

            // Evaluamos si la ruta esta ok
            expect(loc.toString()).to.eq(`${baseUrl}/items/${idItem}`);
            })


            //Deberiamos encontrar en el detalle una imagen un p un h2 un h1 y un button

            cy.get('[data-cy="detail"]').as('detail');
            cy.get('[data-cy="datail-text"]').as('detail-text');
            cy.get('[data-cy="detail-description"]').as('detail-description');

            // 1 imagen
            cy.get('@detail').find('img').should('have.length',1);

            // 1 h1 1 h2 1 p 1 button
            cy.get('@detail-text').find('h1').should('have.length',1);
            cy.get('@detail-text').find('h2').should('have.length',1);
            cy.get('@detail-text').find('p').should('have.length',1);
            cy.get('@detail-text').find('button').should('have.length',1);

            // 1 h1 y 1p

            cy.get('@detail-description').find('h2').should('have.length',1);
            cy.get('@detail-description').find('p').should('have.length',1);



        });


    })



});