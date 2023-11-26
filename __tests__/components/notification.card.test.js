import React from 'react';
import renderer from 'react-test-renderer';
import NotificationCardComponent from '../../src/components/Cards/NotificationCardComponent';

describe('NotificationCard component should render correctly', () => {

    it('renders correctly', () => {
        const notificationCard = renderer.create(<NotificationCardComponent 
            title='Card 1' 
            content='Notification content'
        />).toJSON();
        expect(notificationCard).toMatchSnapshot();
    });
});
