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
    featured: [
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
    },
};


const GET_LINKS = 'GET_LINKS';
const GET_FEATURED = 'GET-FEATURED';
const UPDATE_VIDEO = 'UPDATE_VIDEO';
const ADMIN = 'ADMIN';
const GET_CUSTOMERS = 'GET_CUSTOMERS';
const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
// const ADD_VIDEO = 'ADD_VIDEO';

export function getCustomers() {
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
        type: GET_LINKS,
        payload: links
    }

}

export function getFeatured(category) {
    const links = axios.get(`/api/featured/${category}`)
        .then(res => {
            return res.data
        })
    return {
        type: GET_FEATURED,
        payload: links
    }

}

export function isAdmin() {
    const admin = axios.get('/auth/me')
        .then(res => {
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

export function updateCustomer(archive, id) {
    const newCustomer = axios.put(`/api/update/customer`, { archive, id })
        .then(res => {
            return res
        })
    return {
        type: UPDATE_CUSTOMER,
        payload: newCustomer
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LINKS + '_FULFILLED':
            return Object.assign({}, state, { video: action.payload })
        case GET_FEATURED + '_FULFILLED':
            return Object.assign({}, state, { featured: action.payload })
        case UPDATE_VIDEO + '_FULFILLED':
            return Object.assign({}, state, { video: action.payload })
        case ADMIN + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        case GET_CUSTOMERS + '_FULFILLED':
            return Object.assign({}, state, { customers: action.payload })
        case UPDATE_CUSTOMER + '_FULFILLED':
            return Object.assign({}, state, { customers: action.payload })

        default:
            return state;
    }
}