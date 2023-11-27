import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthenticationImage } from './AuthenticationImage';
import '@testing-library/jest-dom/extend-expect';
import { signIn } from 'next-auth/react';

// Tipado para mock de signIn
jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
  }));
  

describe('AuthenticationImage', () => {
    it('should display required error when value is invalid', async () => {
        const { getByText } : any = render(<AuthenticationImage />);
        
        fireEvent.click(getByText('Ingresar'));
        
        expect(getByText('Por favor completa todos los campos')).toBeInTheDocument();
    });

    it('should call signIn when form is submitted', async () => {
        // Tipado para mockImplementation
        (signIn as jest.Mock).mockImplementation(() => Promise.resolve({ error: null }));
        
        const { getByText, getByPlaceholderText }:any = render(<AuthenticationImage />);
        fireEvent.change(getByPlaceholderText('hello@gmail.com'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Tu contraseña'), { target: { value: 'password' } });
        
        fireEvent.click(getByText('Ingresar'));
        
        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith("credentials", {
                username: 'test@example.com',
                password: 'password',
                redirect: false,
            });
        });
    });
});
