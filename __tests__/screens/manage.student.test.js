import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContext } from '@react-navigation/native';
import { Location } from 'expo';
import ManageClassScreen from '../../src/app/screens/student/ManageClass/ManageClass';

const navContext = {
    isFocused: () => true,
    addListener: jest.fn(() => jest.fn())
}

jest.mock('expo', () => ({
    Location: {
      requestForegroundPermissionsAsync: jest.fn(),
      getCurrentPositionAsync: jest.fn(),
    },
}));

describe('Manage class screen should render correctly', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('student manage class renders correctly', async () => {

        Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
        
        const mockedParams = {
            route: { params: { 
                attendance_id: 1,
                start_date: new Date(),
                presence: false
                }
            },
            navigation: ''
        };

        await expect(render(
            <NavigationContext.Provider value={navContext}>
                <ManageClassScreen {...mockedParams} />
            </NavigationContext.Provider>
        )).toBeTruthy();
    });
    
});
