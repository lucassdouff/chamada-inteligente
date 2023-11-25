import React from 'react';
import renderer from 'react-test-renderer';
import ClassCardComponent from '../src/components/Cards/ClassCardComponent';

const mockedDispatch = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: mockedDispatch,
    }),
  };
});

describe('ClassCard component should render correctly', () => {
    
    beforeEach(() => {
        mockedDispatch.mockClear();
    });

    it('renders correctly', () => {
        const classCard = renderer.create(<ClassCardComponent userClass={{
            id_class: 1,
            name: 'Class 1',
            code: 123456,
            semester: '2021-1',
            id_teacher: 1,
            id_course: 1,
            class_weekdays: {
                weekday: 1,
                start_hour: '08:00:00',
                end_hour: '10:00:00'
            }
        }} />).toJSON();
        expect(classCard).toMatchSnapshot();
    });
});
