
const Favorites=(props)=>{
    const {id,image,title,removeFavorite}=props
    return (
        <>
            <div key={id} className="card">
                <img src={image} alt='image of recepie item' />
                <h4><b>{title}</b></h4>
                <button onClick={removeFavorite} type='button'style={{ cursor: "pointer", backgroundColor: "#fa6400", color: 'white', border: "none", width: "100px", height: "50px", borderRadius: "10px" }} >Remoove from  favourtes</button>
            </div>
        </>
    )

    

}

export default Favorites;
