import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import TutorialAdd from './TutorialAdd';

// Mock CSRF token function
jest.mock('./Utils', () => ({
    addCsrfTokenToForm: jest.fn()
}));

// Mock fetch for categories
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(['MATHEMATICS', 'INFORMATICS']),
    })
);

describe('TutorialAdd form validation', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('shows validation errors for empty form submission', async () => {
        render(<TutorialAdd />);

        // Wait for categories to load
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        const submitButton = screen.getByText(/Create Offer/i);

        fireEvent.click(submitButton);

        expect(await screen.findByText(/The name length must be between 2 and 40 characters!/i)).toBeInTheDocument();
        expect(await screen.findByText(/The description length must be between 2 and 200 characters!/i)).toBeInTheDocument();
        expect(await screen.findByText(/The price should be a positive number/i)).toBeInTheDocument();
        expect(await screen.findByText(/Please set a category for your offer/i)).toBeInTheDocument();
    });

    test('does not show errors when valid data is entered', async () => {
        render(<TutorialAdd />);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        fireEvent.change(screen.getByPlaceholderText(/Name your tutoring offer/i), {
            target: {name: 'name', value: 'Algebra 101'}
        });

        fireEvent.change(screen.getByPlaceholderText(/Describe what you can help with/i), {
            target: {name: 'description', value: 'I can help with basic algebra and equations.'}
        });

        fireEvent.change(screen.getByPlaceholderText(/Enter your hourly rate/i), {
            target: {name: 'price', value: '25'}
        });

        fireEvent.change(screen.getByRole('combobox'), {
            target: {name: 'category', value: 'MATHEMATICS'}
        });

        const submitButton = screen.getByText(/Create Offer/i);

        fireEvent.click(submitButton);

        // Check that no validation messages are present
        await waitFor(() => {
            expect(screen.queryByText(/The name length must be between/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/The description length must be between/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/The price should be a positive number/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/Please set a category/i)).not.toBeInTheDocument();
        });
    });
});