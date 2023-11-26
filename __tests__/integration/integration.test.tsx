
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../src/app/screens/login/Login';

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

describe('Integration Tests', () => {
    it('tests the connection between all the components',async () => {

        render(<LoginScreen />);

        const emailInput = screen.getByTestId('enrollment-input');
        fireEvent.changeText(emailInput, 'paulo@email.com');
        
        const passwordInput = screen.getByTestId('password-input');
        fireEvent.changeText(passwordInput, '1232412');

        const button = screen.getByRole("button", { name: /acessar/i });

        fireEvent.press(button);

        await waitFor(()=>{
            expect(mockNavigate).toHaveBeenNthCalledWith(1  , "TeacherDrawer");
        })
    }); 
});
