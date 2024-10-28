import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AddFood from '../client/components/AddFood';
import '@testing-library/jest-dom';


global.fetch = jest.fn(() =>
 Promise.resolve({
   json: () => Promise.resolve({ message: 'Food added' }),
 })
);


describe('AddFood Component', () => {
 it("renders the component without crashing", () => {
   render(<AddFood />);
   expect(screen.getByText("Add Food")).toBeInTheDocument();
 });


 it("toggles additional input fields when the checkbox is checked", () => {
   render(<AddFood />);
   const expandCheckbox = screen.getByRole('checkbox', { name: /expand/i });


   // Assuming there's a way to check the checkbox and show additional fields
   fireEvent.click(expandCheckbox);
   expect(screen.getByLabelText(/Total Fat/i)).toBeInTheDocument();
 });


 it("submits the form successfully when all fields are valid", async () => {
   render(<AddFood />);
   fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Apple' } });
   fireEvent.change(screen.getByLabelText(/Calories/i), { target: { value: '95' } });


   // Assuming you check the checkbox if necessary
   // fireEvent.click(screen.getByRole('checkbox', { name: /expand/i }));


   fireEvent.click(screen.getByRole('button', { name: /submit/i }));


   expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/add-food', expect.objectContaining({
     method: "POST",
     headers: { "Content-type": "application/json" },
     body: JSON.stringify({
       name: "Apple",
       calories: "95",
       totalFat: 0,
       saturatedFat: 0,
       polyunsaturatedFat: 0,
       monounsaturatedFat: 0,
       transFat: 0,
       cholesterol: 0,
       sodium: 0,
       potassium: 0,
       totalCarbs: 0,
       dietaryFiber: 0,
       sugars: 0,
       protein: 0,
       vitaminA: 0,
       vitaminC: 0,
       calcium: 0,
       iron: 0
     }),
   }));
 });
});
