import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../../src/app/screens/login/Login';
import { render, fireEvent } from '@testing-library/react-native';

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

describe('Login screen should render correctly and be interactable', () => {

    beforeEach(() => {
        mockedDispatch.mockClear();
    });

    it('renders correctly', () => {
        const loginScreen = renderer.create(<LoginScreen />).toJSON();
        expect(loginScreen).toMatchSnapshot();
    });

    it('should apply the value when changing text', () => {
        const { getByTestId } = render(<LoginScreen />);
        
        const enrollmentInput = getByTestId('enrollment-input');
        fireEvent.changeText(enrollmentInput, '220031133');
        
        const passwordInput = getByTestId('password-input');
        fireEvent.changeText(passwordInput, '12346');
        
        const foundButton = getByTestId('login-button');
        
        expect(enrollmentInput.props.value).toBe('220031133');
        expect(passwordInput.props.value).toBe('12346');
        expect(foundButton).toBeTruthy();
    });
    
});
