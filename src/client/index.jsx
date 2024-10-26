// Imports
import React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from "./components/Home.jsx";
import AddMeal from "./components/AddMeal.jsx";
import PhysicalData from "./components/PhysicalData.jsx";
import Recommendations from "./components/Recommendations.jsx";
import "./public/index.css";



const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {path: '/', element: <Home />},
            {path: '/add-meals', element: <AddMeal />},
            {path: '/physical-data', element: <PhysicalData />},
            {path: '/recommendations', element: <Recommendations />}
            // {path: '/calories', element: <Calories />}
        ]
    }
]);



const root = createRoot(document.querySelector('#root'));
root.render(<RouterProvider router={router} />);
