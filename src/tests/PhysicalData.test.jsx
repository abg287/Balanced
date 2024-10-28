// PhysicalData.test.js
import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import PhysicalData from '../client/components/PhysicalData'; // Adjust the import based on your file structure
import useFetch from '../client/hooks/useFetch.js'; // Mock this hook for testing
import '@testing-library/jest-dom';


// Mock the useFetch hook
jest.mock('../client/hooks/useFetch');

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
      json: () => Promise.resolve({}), // Mock response if needed
  })
);

beforeEach(() => {
  jest.clearAllMocks(); // Clear any previous calls to fetch before each test
});

describe('PhysicalData Component', () => {
  const mockUser = {
    userName: "user",
    age: 25,
    gender: "M",
    weight: 180,
    height: 70,
    activityLevel: "2",
  };

  beforeEach(() => {
    useFetch.mockReturnValue([mockUser]); // Mock fetch to return a user
  });

  test('renders without crashing and shows user metrics', () => {
    render(<PhysicalData />);

    expect(screen.getByText(/here are your physical metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/weight \(lb\): 180/i)).toBeInTheDocument();
    expect(screen.getByText(/height \(in\): 70/i)).toBeInTheDocument();
  });

  test('toggles input fields when the checkbox is clicked', () => {
    render(<PhysicalData />);

    const toggleCheckbox = screen.getByLabelText(/press to update info/i);
    fireEvent.click(toggleCheckbox);

    expect(screen.getByText(/update your physical metrics/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age \(years\)/i)).toBeInTheDocument();
  });

  test('fills out the form and submits successfully', async () => {
    render(<PhysicalData />);

    // Toggle to show the form
    const toggleCheckbox = screen.getByLabelText(/press to update info/i);
    fireEvent.click(toggleCheckbox);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/age \(years\)/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/weight \(lb\)/i), { target: { value: '190' } });
    fireEvent.change(screen.getByLabelText(/height \(in\)/i), { target: { value: '72' } });

    // Select gender
    fireEvent.click(screen.getByLabelText(/male/i));
    fireEvent.click(screen.getByLabelText(/2 \(moderate activity/i)); // Select activity level 2

    // Submit the form
    fireEvent.click(screen.getBy('button', { name: /submit/i }));

    // Verify that the fetch call was made with the correct body
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/physical-data', expect.objectContaining({
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userName: "user",
        age: '30',
        gender: 'M',
        weight: '190',
        height: '72',
        activityLevel: '2',
      }),
    }));
  });

  test('alerts user if required fields are missing on submit', () => {
    render(<PhysicalData />);

    // Toggle to show the form
    const toggleCheckbox = screen.getByLabelText(/press to update info/i);
    fireEvent.click(toggleCheckbox);

    // Submit the form without filling it
    window.alert = jest.fn(); // Mock alert
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(window.alert).toHaveBeenCalledWith('Please correctly enter required fields');
  });

  test('initializes with empty form fields', () => {
    render(<PhysicalData />);
  
    const weightInput = screen.getByLabelText(/weight \(lb\):/i);
    const heightInput = screen.getByLabelText(/height \(in\):/i);
    
    expect(weightInput.value).toBe('');
    expect(heightInput.value).toBe('');
  });
  
  test('fills out the form', () => {
    render(<PhysicalData />);
  
    const weightInput = screen.getByLabelText(/weight \(lb\):/i);
    const heightInput = screen.getByLabelText(/height \(in\):/i);
  
    fireEvent.change(weightInput, { target: { value: '180' } });
    fireEvent.change(heightInput, { target: { value: '70' } });
  
    expect(weightInput.value).toBe('180');
    expect(heightInput.value).toBe('70');
  });

  test('alerts user if required fields are missing on submit', () => {
    window.alert = jest.fn(); // Mock window.alert
    
    render(<PhysicalData />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
  
    expect(window.alert).toHaveBeenCalledWith('Please correctly enter required fields');
  });
});
