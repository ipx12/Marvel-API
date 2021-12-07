import { useState, useEffect } from 'react';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
        console.log('Comics request effec')
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComics])
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended)
    }

    function renderComics(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item"
                key={i}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }


    const items = renderComics(comicsList)

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (

        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;