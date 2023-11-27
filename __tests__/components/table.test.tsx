import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import TableComponent from '../../src/components/Tables/TableComponent';

describe('Table component should render correctly and do some action', () => {
    it('renders correctly', () => {
        render(<TableComponent 
            tableData={[
                [
                    {
                        removeLine: true,
                        text: 'Student 1',
                        action: () => {},
                    }
                ],
                [
                    {
                        removeLine: false,
                        text: 'Student 2',
                        action: () => {},
                    }
                ],
                [
                    {
                        removeLine: false,
                        text: 'Student 3',
                        action: () => {},
                    }
                ],
            ]}
        />);
        
        expect(screen.queryByText("Student 1")).toBeNull();
        expect(screen.getByText("Student 2")).toBeTruthy();
        expect(screen.getByText("Student 3")).toBeTruthy();
    });

    it('performs action on click', () => {

        const mockAction = jest.fn();

        render(<TableComponent 
            tableData={[
                [
                    {
                        removeLine: true,
                        text: 'Student 1',
                    }
                ],
                [
                    {
                        removeLine: false,
                        text: 'Student 2',
                    }
                ],
                [
                    {
                        removeLine: false,
                        text: 'Student 3',
                        action: mockAction,
                    }
                ],
            ]}
        />);
        
        fireEvent.press(screen.getByText("Student 3"));
        expect(mockAction).toHaveBeenCalled();
    });
});
