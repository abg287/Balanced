// Imports
import LogoImg from "../pictures/logo.png";

// Will return a "container" for the header of the website
export default function Header() {
    return (

            <header>
              <img id="Logo" src={LogoImg} alt="Balanced"/>
            </header>

    )
}
