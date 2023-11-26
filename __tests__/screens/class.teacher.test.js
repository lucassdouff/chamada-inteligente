import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContext } from '@react-navigation/native';
import ClassScreen from '../../src/app/screens/teacher/Class/Class';
import { Location } from 'expo';

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

describe('Class screen should render correctly', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('student class renders correctly', async () => {

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
                <ClassScreen {...mockedParams} />
            </NavigationContext.Provider>
        )).toBeTruthy();
    });
    
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
    });
});
