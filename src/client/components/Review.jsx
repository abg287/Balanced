export default function Review(props) {
    return (
        <>
            <p className="Review">Rating (0-10): {props.rating}</p>
            <p className="Review">Comment: {props.comment}</p>
        </>
    )
}