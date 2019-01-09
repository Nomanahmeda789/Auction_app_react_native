const INITIAL_STATE = {
    users: [],
    currentUserEmail: '',
    name: "",
    contact: '',
    email: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "users":
            return ({
                ...state,
                user: action.payload
            })
        case 'currentUserEmail':
            return ({
                ...state,
                currentUserEmail: action.payload

            })
        case 'name':
            return ({
                ...state,
                name: action.payload

            })
        case 'contact':
            return ({
                ...state,
                contact: action.payload
            })
        case 'email':
            return ({
                ...state,
                email: action.payload

            })

    }
    return state
}