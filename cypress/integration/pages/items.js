const { wait } = require("@testing-library/react");


describe('Items UI test', function() {


    const baseUrl = Cypress.env('baseUrl');
    const search1 = Cypress.env('search1');
    const search2 = Cypress.env('search2');
    const searchError = Cypress.env('searchError');


    context('Muestra 4 productos de la busqueda', function () {

        beforeEach(function () {
            cy.visit(`${Cypress.env('baseUrl')}/items?search=${search1}`);
          });

        

        it('muestra 4 productos', function() {
            cy.wait(500);
            cy.location().should((loc) => {

            expect(loc.toString()).to.eq(`${baseUrl}/items?search=${search1}`);
            })
            cy.get('[data-cy="products"]').as('products');
            // If we set 6 for example, the test fails
            cy.get('@products').find('a').should('have.length',4);


        

        });

        it('nos dirige a la pagina del detalle si se clickea en un produto', function() {

            cy.wait(500);
            cy.location().should((loc) => {

            expect(loc.toString()).to.eq(`${baseUrl}/items?search=${search1}`);
            })
            cy.get('[data-cy="products"]').as('products');
            // If we set 6 for example, the test fails
            cy.get('@products').find('a').should('have.length',4);

            // obtenemos un producto
            cy.get('[data-cy="products"] > :nth-child(2) > a').as('product');
            cy.get('@product').click();

            cy.wait(1000);

            //Deberiamos encontrar en el detalle una imagen un p un h2 un h1 un button

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