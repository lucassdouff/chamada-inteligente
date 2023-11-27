import React from 'react';
import NotificationCardComponent from '../../src/components/Cards/NotificationCardComponent';
import { render, screen } from '@testing-library/react-native';

describe('Notification card component should render correctly', () => {

    it('renders correctly', () => {
        render(<NotificationCardComponent 
            title='Card 1' 
            content='Notification content'
        />);
        
        expect(screen.getByText("Card 1")).toBeTruthy();
        expect(screen.getByText("Notification content")).toBeTruthy();
    });

});
