import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import { ItemStateContext } from '../../context/items/itemState';
import SearchBar from '../../components/SearchBar';
import { productsMock } from '../../__mocks__/products'
import { mount } from "enzyme";

const setItems = jest.fn();

describe('<SearchBar />',  () => {


    it('El componente se muestra ok', async () => {


        const TestComponent = () => {

            return (
                <SearchBar />                                 
            )
        }

        const wrapper = mount(

            <ItemStateContext.Provider
                value={{ items: productsMock, setItems }}
            >
                <TestComponent />

            </ItemStateContext.Provider>
            
        )


        expect(wrapper).toBeTruthy();

        const searchBar = wrapper.find('[data-testid="search"]').at(0);


        expect(searchBar.getDOMNode()).toBeVisible();
         

    });



});

