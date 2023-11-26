import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContext } from '@react-navigation/native';
import NotificationScreen from '../../src/app/screens/student/Notifications/Notifications';

const navContext = {
    isFocused: () => true,
    addListener: jest.fn(() => jest.fn())
}

describe('Notifications screen should render correctly', () => {

    it('student notifications renders correctly', async () => {
        await expect(render(
            <NavigationContext.Provider value={navContext}>
                <NotificationScreen />
            </NavigationContext.Provider>
        )).toBeTruthy();
    });
});
