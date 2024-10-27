// Imports

// Will return a "container" for the header of the website
export default function Food( props ) {


    // The handleDelete function calls a function to delete an expense
    const handleClick = () => {
      props.deleteFood( props.index );
    }



    return (

            <div className = "food">
              <h1>{ props.name }</h1>
              <p>{ props.calories }</p>
              <button onClick = { handleClick }>Delete</button>
            </div>

    )
}
