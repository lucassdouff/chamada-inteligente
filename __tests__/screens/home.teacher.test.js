import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../src/app/screens/teacher/Home/Home';
import { NavigationContext } from '@react-navigation/native';

const navContext = {
    isFocused: () => true,
    addListener: jest.fn(() => jest.fn())
}

describe('Home screen should render correctly', () => {

    it('teacher home renders correctly', async () => {
        await expect(render(
            <NavigationContext.Provider value={navContext}>
                <HomeScreen />
            </NavigationContext.Provider>
        )).toMatchSnapshot();
    });

    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });
});
