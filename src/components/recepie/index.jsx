import './style.css'
const Recepie = (props) => {
    // console.log(props,'recipe item props');
    const {id,image,title}=props
    const {addToFavorites}=props
    
    return (
        <>
            <div key={id} className="card">
                <img src={image} alt='image of recepie item' />
                <h4><b>{title}</b></h4>
                <button type='button'   onClick={addToFavorites}  style={{ cursor: "pointer", backgroundColor: "#fa6400", color: 'white', border: "none", width: "100px", height: "50px", borderRadius: "10px" }} >Add to favourtes</button>
            </div>
        </>
    )
}
export default Recepie