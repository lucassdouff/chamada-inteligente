
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

describe('Login integration tests', () => {

    it('tests the connection between all the login components',async () => {

        render(<LoginScreen />);
        
        const button = screen.getByRole("button", { name: /acessar/i });
        
        fireEvent.changeText(screen.getByPlaceholderText('CPF, email, passaporte'), 'paulo@email.com');
        fireEvent.changeText(screen.getByPlaceholderText('Digite sua senha'), '1232412');

        fireEvent.press(button);

        await waitFor(()=>{
            expect(mockNavigate).toHaveBeenNthCalledWith(1  , "TeacherDrawer");
        })
    }); 

});
