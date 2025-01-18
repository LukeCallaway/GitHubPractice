import React, { useState } from 'react';
import axios from 'axios'
import {v1 as uuid} from "uuid";

const useAxios = (baseUrl) => {
    const [state, setState] = useState([]);
    const addCard = async (nameParam = '') => {
        const response = await axios.get(`${baseUrl}${nameParam}`);

        setState(cards => [...cards, { ...response.data, id: uuid() }]);
    };

    return [state, setState, addCard]
}

export default useAxios;