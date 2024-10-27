// Imports

// Will return a "container" for the header of the website
export default function SideBar() {
    return (

            <nav>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/add-food">Add Food</a></li>
                <li><a href="/physical-data">Physical Data</a></li>
                <li><a href="/recommendations">Recommedations</a></li>
              </ul>
            </nav>

    )
}