import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=dbf582e25e5af88acf1fe7430d0cd432';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformComics)
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        let description = char.description ? char.description : 'No data'; 
        if (description.length > 150) {
            description = description.slice(0, 150) + '..!';
        }
        return {
            id: char.id,
            name: char.name,
            description: description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            description: comics.description || 'There is ni description',
            language: comics.textObjects.language || 'en-us',
            name: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price ? comics.prices[0].price : 'not-available'

        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getComics, getAllComics}
}

export default useMarvelService;