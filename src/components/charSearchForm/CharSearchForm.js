import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';


import useMarvelService from '../../services/MarvelService';

import './charSearchForm.scss';

const setContent = (process, Component) => {
    switch (process) {
        case 'waiting':
            return <Component/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected prrocess state');
    }   
}

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const [loading, setLoading] = useState(false);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        setLoading(true);

        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
            .then(() => setLoading(false))
    }

    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {setContent(process, () => results)}
        </div>
    )
}

export default CharSearchForm;