import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
        const {comicId, id} = useParams();
        const [data, setData] = useState(null);
        const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

        useEffect(() => {
            updateData()
            // eslint-disable-next-line
        }, [comicId])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComic(comicId).then(onDataLoaded).then(() => setProcess('confirmed'))
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'))
                    break;
                default:
                    throw new Error('error');
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        

        return (
            <>
                <AppBanner/>
                {setContent(process, Component, data)}
            </>
        )
}

export default SinglePage;