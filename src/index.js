// Imports
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";



// Constants
const root = createRoot( document.querySelector( ".root" ) );



// Render page
root.render( <App /> );