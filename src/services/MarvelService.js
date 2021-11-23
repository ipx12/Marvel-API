

class MarvelService {
    _apiBse = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=dbf582e25e5af88acf1fe7430d0cd432'

    getResourse = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResourse(`${this._apiBse}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResourse(`${this._apiBse}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;