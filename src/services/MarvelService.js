

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

    getAllCharacters = async () => {
        const res = await this.getResourse(`${this._apiBse}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBse}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;