import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import ListItemComponent from '../../src/components/Lists/ListItemComponent';

describe('ListItem component should render correctly and do some action', () => {
    
    it('renders correctly with sufficient presence', () => {
        render(<ListItemComponent itemData={{
            id: 1,
            id_course: 1,
            id_attendance: 1,
            enrollment: 123456,
            name: 'Student 1',
            info: {
                description: '75',
                action: () => {}
            },
        }} />);
        
        expect(screen.getByText("Student 1")).toBeTruthy();
        expect(screen.getByText("75%")).toBeTruthy();
    });

    it('renders correctly with insufficient presence', () => {
        render(<ListItemComponent itemData={{
            id: 1,
            id_course: 1,
            id_attendance: 1,
            enrollment: 123456,
            name: 'Student 1',
            info: {
                description: '25',
                action: () => {}
            },
        }} />);
        
        expect(screen.getByText("Student 1")).toBeTruthy();
        expect(screen.getByText("25%")).toBeTruthy();
    });

    it('performs action on click with sufficient presence', () => {

        const mockAction = jest.fn();

        render(<ListItemComponent itemData={{
            id: 1,
            id_course: 1,
            id_attendance: 1,
            enrollment: 123456,
            name: 'Student 1',
            info: {
                description: 'PRESENTE',
                action: mockAction
            },
        }} />);
        
        fireEvent.press(screen.getByText("PRESENTE"));
        expect(mockAction).toHaveBeenCalled();
    });

    it('performs action on click with insufficient presence', () => {

        const mockAction = jest.fn();

        render(<ListItemComponent itemData={{
            id: 1,
            id_course: 1,
            id_attendance: 1,
            enrollment: 123456,
            name: 'Student 1',
            info: {
                description: 'AUSENTE',
                action: mockAction
            },
        }} />);
        
        fireEvent.press(screen.getByText("AUSENTE"));
        expect(mockAction).toHaveBeenCalled();
    });
});
