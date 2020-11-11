import Breadcrumb from '../../components/Breadcrumb';
import { ItemStateContext } from '../../context/items/itemState';
import { shallow, mount } from "enzyme";
import { categoriesMock } from '../../__mocks__/categories'


describe('<Breadcrumb />', () => {


    it('Muestra las categorias devueltas por el state', () => {


        const TestComponent = () => {

            return (
                <Breadcrumb />                                 
            )
        }


        const wrapper = mount(

            <ItemStateContext.Provider
                value={{ category: categoriesMock }}
            >
                <TestComponent />
            </ItemStateContext.Provider>


      
         );
        // console.log(wrapper.debug());
        
        expect(wrapper).toBeTruthy();
        // Verificamos las categorias
        categoriesMock.path_from_root.map((category, i) => {
            expect(wrapper.find("[data-testid='breadcrumb-category'] div").at(i).find('p').text().trim()).toEqual(category.name);
        })

    });


})