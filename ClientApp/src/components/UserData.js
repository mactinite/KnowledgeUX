import React, { useState, useEffect } from 'react';
import { find, remove } from "lodash";
export const UserDataContext = React.createContext({ favorites: [], toggleFavorite: (article) => { }, isFavorite: (id) => { } });


export const UserDataProvider = (props) => {
    const [favorites, setFavorites] = useState([]);

    /**
    * Handle the favoriting of an article, takes an article as parameter.
    * @param Article article nyt article object https://developer.nytimes.com/docs/articlesearch-product/1/types/Article
    */
    const toggleFavorite = (article) => {
        // save the whole article object to state and localstorage in the interest of time
        const articleInFavorites = find(favorites, { uri: article.uri });
        let newFavorites = favorites;
        if (!articleInFavorites) {
            newFavorites = [...favorites, article];
        } else {
            remove(newFavorites, articleInFavorites);
        }

        localStorage.setItem("nyt-sdr-favorites", JSON.stringify(newFavorites))
        setFavorites([...newFavorites])
    }

    /**
    * Handle the favoriting of an article, takes an article as parameter.
    * @param Article article nyt article object https://developer.nytimes.com/docs/articlesearch-product/1/types/Article
    */
    const isFavorite = (uri) => {
        // save the whole article object to state and localstorage in the interest of time
        const articleInFavorites = find(favorites, { uri });
        if (articleInFavorites) {
            return true;
        }
        return false;
    }
    const context = {
        favorites,
        toggleFavorite,
        isFavorite,
    }

    useEffect(() => {
        let savedFavorites = localStorage.getItem("nyt-sdr-favorites");
        if (savedFavorites != null) {
            savedFavorites = JSON.parse(savedFavorites);
            setFavorites(savedFavorites);
        }
    }, [])

    return (
        <UserDataContext.Provider value={context}>
            {props.children}
        </UserDataContext.Provider>
    )
}