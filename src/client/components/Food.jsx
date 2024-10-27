// Imports

// Will return a "container" for the header of the website
export default function Food( props ) {
    return (

            <div className = "food">
              <h1>{ props.name }</h1>
              <p>{ props.calories }</p>
            </div>

    )
}
