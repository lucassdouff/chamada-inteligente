import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContext } from '@react-navigation/native';
import { Location } from 'expo';
import ManageCallsScreen from '../../src/app/screens/teacher/ManageCalls/ManageCalls';

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

describe('Manage calls screen should render correctly', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('teacher manage calls renders correctly', async () => {

        Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
        
        const mockedParams = {
            route: { params: { userClass: {
                id_class: 1,
                name: 'Class 1',
                code: 123456,
                semester: '2021-1',
                id_teacher: 1,
                id_course: 1,
                class_weekdays: [{
                    weekday: 1,
                    start_hour: '08:00:00',
                    end_hour: '10:00:00'
                }]
            }}
            },
            navigation: ''
        };

        await expect(render(
            <NavigationContext.Provider value={navContext}>
                <ManageCallsScreen {...mockedParams} />
            </NavigationContext.Provider>
        )).toBeTruthy();
    });
    
});
