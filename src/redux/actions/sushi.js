import axios from "axios";

export const setLoaded = payload => ({
    type: 'SET_LOADED',
    payload
})

export const fetchSushi = (category, sortBy) => dispatch => {
    dispatch(setLoaded(false))
    axios.get(`/sushi?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
        .then(({data}) => {
            dispatch(setSushi(data))
        })
}

export const setSushi = (items) => ({
    type: 'SET_SUSHI',
    payload: items
})