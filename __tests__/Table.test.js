import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';
import TableComponent from '../src/components/Tables/TableComponent';

describe('Table component should render correctly and do some action', () => {
    it('renders correctly', () => {
        const table = renderer.create(<TableComponent 
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
        />).toJSON();
        
        expect(table).toMatchSnapshot();
    });

    it('performs action on click', () => {
        const mockAction = jest.fn();
        const { getByTestId } = render(<TableComponent 
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
        fireEvent.press(getByTestId('table-action'));
        expect(mockAction).toHaveBeenCalled();
    });
});
