import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';
import ListItemComponent from '../src/components/Lists/ListItemComponent';

describe('ListItem component should render correctly and do some action', () => {
    it('renders correctly', () => {
        const listItem = renderer.create(<ListItemComponent itemData={{
            id: 1,
            id_course: 1,
            id_attendance: 1,
            enrollment: 123456,
            name: 'Student 1',
            info: {
                description: 'Student 1 description',
                action: () => {}
            },
        }} />).toJSON();
        
        expect(listItem).toMatchSnapshot();
    });

    it('performs action on click', () => {
        const mockAction = jest.fn();
        const { getByTestId } = render(<ListItemComponent itemData={{
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
        
        fireEvent.press(getByTestId('list-item').children[1]);
        expect(mockAction).toHaveBeenCalled();
    });
});
