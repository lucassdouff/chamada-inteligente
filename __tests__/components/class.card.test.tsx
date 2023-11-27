import React from 'react';
import ClassCardComponent from '../../src/components/Cards/ClassCardComponent';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: mockNavigate,
        dispatch: jest.fn(),
      }),
    };
});

jest.mock('../../src/core/controllers/NavigationController', ()=>{
  const actualNav = jest.requireActual('../../src/core/controllers/NavigationController');
  return {
      ...actualNav,
      navigationController: () => ({
          setSession: jest.fn(),
      }),
  };
});

describe('ClassCard component should render correctly', () => {
    
    it('should render correctly', () => {

        render(<ClassCardComponent userClass={{
          id_class: 1,
          name: 'Class 1',
          code: '123456',
          semester: '2021-1',
          id_teacher: 1,
          id_course: 1,
          class_weekdays: [{
              weekday: 1,
              start_hour: '08:00:00',
              end_hour: '10:00:00'
          }]
        }} />);
        
        expect(screen.getByText("123456 - Class 1")).toBeTruthy();
        expect(screen.getByText("2021-1")).toBeTruthy();
        
    });

    it('should render correctly with schedule', () => {
            
            render(<ClassCardComponent staticMode userClass={{
            id_class: 1,
            name: 'Class 1',
            code: '123456',
            semester: '2021-1',
            id_teacher: 1,
            id_course: 1,
            class_weekdays: [{
                weekday: 1,
                start_hour: '08:00:00',
                end_hour: '10:00:00'
            }]
            }} schedule={[{
            weekday: 1,
            start_hour: '08:00:00',
            end_hour: '10:00:00'
            }]}/>);
            
            expect(screen.getByText("123456 - Class 1")).toBeTruthy();
            expect(screen.getByText("2021-1")).toBeTruthy();
            expect(screen.getByText("Segunda - 08:00 às 10:00")).toBeTruthy();
    });

    it('should redirect to class screen when clicking on card', async () => {
        
        render(<ClassCardComponent userClass={{
          id_class: 1,
          name: 'Class 1',
          code: '123456',
          semester: '2021-1',
          id_teacher: 1,
          id_course: 1,
          class_weekdays: [{
              weekday: 1,
              start_hour: '08:00:00',
              end_hour: '10:00:00'
          }]
        }} />);
        
        fireEvent.press(screen.getByText(/123456 - Class 1/i));
        
        await waitFor(()=>{
            expect(mockNavigate).toHaveBeenNthCalledWith(1  , "Turma", {
                userClass: {
                    class_weekdays: [
                        {
                            end_hour: "10:00:00",
                            start_hour: "08:00:00",
                            weekday: 1
                        }
                    ],
                    code: "123456",
                    id_class: 1,
                    id_course: 1,
                    id_teacher: 1,
                    name: "Class 1",
                    semester: "2021-1"
                }
            });
        })

    });
});
