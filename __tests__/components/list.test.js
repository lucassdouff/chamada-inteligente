import React from 'react';
import renderer from 'react-test-renderer';
import ListComponent from '../../src/components/Lists/ListComponent';

describe('List component should render correctly', () => {

    it('teacher list renders correctly', () => {
        const teacherList = renderer.create(<ListComponent listType={"teacher"} listData={[
            {
                id: 1,
                name: 'Teacher 1',
                id_attendance: undefined,
                id_course: undefined,
                enrollment: undefined,
            }
        ]} />).toJSON();
        expect(teacherList).toMatchSnapshot();
    });

    it('student list renders correctly', () => {
        const studentList = renderer.create(<ListComponent listType={"student"} listData={[
            {
                id: 1,
                name: 'Student 1',
                id_attendance: 1,
                id_course: 1,
                enrollment: 123456,
            }
        ]} />).toJSON();
        expect(studentList).toMatchSnapshot();
    });
});
