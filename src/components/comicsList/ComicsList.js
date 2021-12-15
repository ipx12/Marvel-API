import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected prrocess state');
    }   
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsLoaded = (newComics) => {



        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComics])
        setNewItemLoading(false);
        setOffset(offset => offset + 16);
        setComicsEnded(ended)
    }

    function renderComics(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item"
                key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }



    return (

        <div className="comics__list">
            {setContent(process, () => renderComics(comicsList), newItemLoading)}
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