import React from 'react';
import LoginScreen from '../../src/app/screens/login/Login';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import axios from 'axios';
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

jest.mock("axios", () => {
  return {
    get: jest.fn(),
  };
});

describe('Login screen should render correctly and be interactable', () => {

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    it('should apply the value when changing text', () => {
        render(<LoginScreen />);
        
        expect(screen.getByText("Identificação (idUFF)")).toBeTruthy();
        expect(screen.getByPlaceholderText("CPF, email, passaporte")).toBeTruthy();
        
        expect(screen.getByText("Senha")).toBeTruthy();
        expect(screen.getByPlaceholderText("Digite sua senha")).toBeTruthy();
        
        expect(screen.getByRole('button', { name: /acessar/i })).toBeTruthy();
    });

    it('should call login endpoint when clicking on login button', async () => {
        render(<LoginScreen />);
        
        const button = screen.getByRole('button', { name: /acessar/i });
        
        fireEvent.changeText(screen.getByPlaceholderText("CPF, email, passaporte"), 'paulo@email.com');
        fireEvent.changeText(screen.getByPlaceholderText("Digite sua senha"), '1232412');

        fireEvent.press(button);

        await waitFor(()=>{
          expect(axios.get).toHaveBeenNthCalledWith(1, `http://${process.env.EXPO_PUBLIC_API_URL}:3000/user/login`, {
            params: {
                email: 'paulo@email.com',
                password: '1232412'
            }
          });
        });
    });

    it('should navigate to TeacherDrawer when user is a teacher', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {
                role: 'teacher',
            }
        });

        render(<LoginScreen />);
        
        const button = screen.getByRole('button', { name: /acessar/i });
        
        fireEvent.press(button);

        await waitFor(()=>{
            expect(mockNavigate).toHaveBeenNthCalledWith(1  , "TeacherDrawer");
        })
    });

    it('should navigate to StudentDrawer when user is a student', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
            role: 'student',
        }
      });

      render(<LoginScreen />);
      
      const button = screen.getByRole('button', { name: /acessar/i });
      
      fireEvent.press(button);

      await waitFor(()=>{
          expect(mockNavigate).toHaveBeenNthCalledWith(1  , "StudentDrawer");
      })
    });
});
