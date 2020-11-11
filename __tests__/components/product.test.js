import { render } from '@testing-library/react';
import Product from '../../components/Products/product';
import { useItem, ItemState, ItemStateContext, ItemDispatchContext } from '../../context/items/itemState';
import { shallow, mount } from "enzyme";
import { productMock } from '../../__mocks__/product'




describe('<Product />', () => {

    it('Muestra la imagen del item con su precio y titulo', () => {
        const wrapper = shallow(<Product item={productMock} />);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find("[data-testid='product-image']").prop('src')).toEqual(productMock.picture);
        expect(wrapper.find('h1').text()).toBe(`$ ${productMock.price[0].amount}.00`);
        expect(wrapper.find("h2").text()).toBe(productMock.title);
    });

    it('Muestra lo que devuelve nuestro global state', () => {


        const TestComponent = () => {

            const context = useItem();
            const { item } = context;

       

            return (
                <Product item={item} />                                 
            )
        }




        const wrapper = mount(



            <ItemStateContext.Provider
                value={{ item: productMock }}
            >
                <TestComponent />
            </ItemStateContext.Provider>


      
         );
        wrapper.debug();
        expect(wrapper).toBeTruthy();
        expect(wrapper.find("[data-testid='product-image']").prop('src')).toEqual(productMock.picture);
    });


})