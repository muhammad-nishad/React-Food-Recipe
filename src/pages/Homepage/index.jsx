import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Favorites from "../../components/favourite";
import Recepie from "../../components/recepie";
import Search from "../../components/search";

const reducer = (state, action) => {
    console.log(action,'action');
    switch (action.type) {
        case 'filterValues':
            return {
                ...state,
                filterdValue: action.payload
            }
        default:
            return state
    }

}
const inititalState = {
    initialValue: ''

}


const Homepage = () => {
    //loading state
    const [load, setLoad] = useState(false)
    //result state
    const [recipes, setRecipes] = useState([])

    const [favorites, setFavorites] = useState([])

    //state for input reset
    const [apiCall, setApiCall] = useState(false)

    //use reducer reducer is a callback function and inital state is a object
    const [filterdValue, dispatch] = useReducer(reducer, inititalState)

    const searchData = (data) => {
        setLoad(true)
        //calling api here
        async function getReceipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0d6b25affd8f4c20b522c452908dadb2&query=${data}`)
            const result = await apiResponse.json()
            const { results } = result
            if (results && results.length > 0) {
                setLoad(false)
                setRecipes(results)
                setApiCall(true)
            }
        }
        getReceipes()

    }



    const addToFavorites = (currentItem) => {
        let copyFavourites = [...favorites];
        console.log(copyFavourites, 'copy');
        const index = copyFavourites.findIndex(item => item?.id == currentItem.id)
        if (index === -1) {
            copyFavourites.push(currentItem)
            setFavorites(copyFavourites)

            //have to store this favourite data to local storage
            localStorage.setItem('favourites', JSON.stringify(copyFavourites))
        } else {
            alert('item is already in the favourite list')
        }
    };

    const removeFavorite = (currentItemId) => {

        let array = [...favorites]
        let result = array.filter((value) => value.id !== currentItemId)
        setFavorites(result)
        localStorage.setItem('favourites', JSON.stringify(result))
    }
    useEffect(() => {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('favourites'))
        setFavorites(dataFromLocalStorage)
    }, [])
    // console.log(state,'reducer state');
    // console.log(filterdValue, 'favourites state');
    // console.log(favorites,'favouritedddddddddddddddddddddddddddddddd');

    const filterdFavouriteItem = favorites.filter((item) => {
        // console.log(item.,'itemmmmmmmmmmmmmmmmmmmmmm');
        item.title.toLowerCase().includes(filterdValue.initialValue)
    });
    // console.log(filterdFavouriteItem,'filterrrrrrrrrrrrrrrrrrrrrrrrr');

    return (
        <div className="homepage">
            <Search searchData={searchData} apiCall={apiCall} setApiCall={setApiCall} />
            {load && load ? <div className="loading">plese wait</div> : null}
            <div style={{ display: "flex", width: "100%", height: "100vh", flexWrap: "wrap", justifyContent: "center" }} >
                {recipes && recipes.length > 0 ?
                    recipes.map((item) => <Recepie id={item.id} image={item.image} title={item.title} addToFavorites={() => addToFavorites(item)} />) : null}
            </div>
            <div className="search" >
                {/* <b>favorites</b> */}
                <input onChange={(e) => {
                    dispatch({ type: 'filterValues', payload: e.target.value })

                }} name="search" placeholder="search favourites"
                    value={filterdValue.initialValue} />


            </div>
            <div style={{ display: "flex", width: "100%", height: "100vh", flexWrap: "wrap", justifyContent: "center" }}>
                {favorites && favorites.length > 0 ?

                    favorites.map((item) => <Favorites id={item.id} image={item.image} title={item.title} removeFavorite={() => removeFavorite(item.id)} />)
                    : null}
            </div>
        </div>
    )
}

export default Homepage;