import React from 'react';
import ListComponent from '../../src/components/Lists/ListComponent';
import { render, screen } from '@testing-library/react-native';

describe('List component should render correctly', () => {

    it('teacher list renders correctly', () => {
        render(<ListComponent listType={"teacher"} listData={[
            {
                id: 1,
                name: 'Teacher 1',
                id_attendance: undefined,
                id_course: undefined,
                enrollment: undefined,
            }
        ]} />);

        expect(screen.getByText("Teacher 1")).toBeTruthy();
    });

    it('student list renders correctly', () => {
        render(<ListComponent listType={"student"} listData={[
            {
                id: 1,
                name: 'Student 1',
                id_attendance: 1,
                id_course: 1,
                enrollment: 123456,
            },
            {
                id: 2,
                name: 'Student 2',
                id_attendance: 2,
                id_course: 2,
                enrollment: 123456,
            }
        ]} />);
        
        expect(screen.getByText("Student 1")).toBeTruthy();
        expect(screen.getByText("Student 2")).toBeTruthy();
    });
});
