// Imports
import React from "react";
import SideBar from "./page_components/SideBar"

// Application Imports
import AppHome from "./page_components/ApplicationHome"

// Will return a "container" for the header of the website
function MainPage() {
    return (

            <div id="MainPage">
              <SideBar/>
              {/* AppHome is here temporarily; swap out applications in the future? */}
              <AppHome/>
            </div>

    )
}



// Export function
export default MainPage;