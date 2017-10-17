import axios from 'axios'


let initialState = {
    video: [
        {
            id: 0,
            title: '',
            embedded_link: '',
            category: '',
        }
    ],
    user: false,
    customers: {
        data: []
    }
};


const GET_LINKS = 'GET_LINKS';
const UPDATE_VIDEO = 'UPDATE_VIDEO';
const ADMIN = 'ADMIN';
const GET_CUSTOMERS = 'GET_CUSTOMERS';

export function getCustomers(){
    const customers = axios.get('/api/get/customers')
    .then(res => {
       return res
    })
    
    return {
        type: GET_CUSTOMERS,
        payload: customers
    }
}


export function getLinks(category) {
    const links = axios.get(`/api/links/${category}`)
        .then(res => {
            return res.data
        })
    return {
        type: UPDATE_VIDEO,
        payload: links
    }

}

export function isAdmin() {
    const admin = axios.get('/auth/me')
        .then(res => {
            console.log('ADMIN',res.data)
            return res.data
        })
    return {
        type: ADMIN,
        payload: admin
    }
}

export function updateVideo(title, embedded_link, category, id) {
    const newVideo = axios.put(`/api/admin/video/${id}`, { title, embedded_link, category })
        .then(res => {
            return res.data
        })
    return {
        type: UPDATE_VIDEO,
        payload: newVideo
    }
}





export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LINKS + '_FULFILLED':
            return Object.assign({}, state, { video: action.payload })
        case UPDATE_VIDEO + '_FULFILLED':
            return Object.assign({}, state, { video: action.payload })
        case ADMIN + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        case GET_CUSTOMERS + '_FULFILLED':
            return Object.assign({}, state, {customers: action.payload})

        default:
            return state;
    }
}