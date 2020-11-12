const { wait } = require("@testing-library/react");


describe('Home UI test', function() {


    const baseUrl = Cypress.env('baseUrl');
    const search1 = Cypress.env('search1');
    const search2 = Cypress.env('search2');
    const searchError = Cypress.env('searchError');


    context('Muestra la pagina de inicio', function () {

        beforeEach(function () {
            cy.visit(Cypress.env('baseUrl'));
          });

        

        it('muestra solo un buscador sin productos', function() {

            // obtenemos el buscador
            cy.get('[data-cy="search"]').as('search');
            cy.get('[data-cy="products"]').as('products');
    
            // interact with the elements
            cy.get('@search').should('be.visible');
            cy.get('@products').should('be.empty');

        });

        it('nos dirige a la pagina de busqueda al escribir en el search y darle click a la lupa', function() {

            // obtenemos el buscador y escribimos una nueva busqueda de producto
            cy.get('[data-cy="search"]').as('search');
            cy.get('[data-cy="search-submit"]').as('search-button');
            cy.get('[data-cy="products"]').as('products');
            
            //obtenemos la ruta a la que ira al obtener los resultados
            cy.server();
            cy.route(`/items/*`).as('getItems');

            cy.get('@search').type(search1);
            cy.get('@search-button').click();

            cy.wait(500);
            
            // evaluamos que se esten mostrando los productos
            cy.get('@products').should('not.be.empty')
            cy.location().should((loc) => {
    
                expect(loc.toString()).to.eq(`${baseUrl}/items/search?q=${search1}`);
              })


        });


    })



});