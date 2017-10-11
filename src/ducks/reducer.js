import axios from 'axios'


let initialState = {
    video: [
        {
            id: 0,
            title: '',
            embedded_link: '',
            category: '',
        }
    ]
};


const GET_LINKS = 'GET_LINKS'


export function getLinks(category) {
    const Links = axios.get(`api/links/${category}`)
        .then(res => {
            console.log('reducer get links', res.data)
            return res.data
        })
    return {
        type: GET_LINKS,
        payload: Links
    }

}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LINKS + '_FULFILLED':
            return Object.assign({}, state, { video: action.payload })

        default:
            return state;
    }
}