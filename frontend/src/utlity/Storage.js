const Storage = {
    get : (key) => {
        try {
            const token = localStorage.getItem(key)
            if(token !== null){
                return token
            }
            return token
        } catch (error) {
            return error.message
        }
    },

    set : (key, values) => {
        try {
            return localStorage.setItem(key, values)
        } catch (error) {
            return error.message
        }
    },

    delete : (key) => {
        try {
            return localStorage.removeItem(key)
        } catch (error) {
            return error.message
        }
    },

    decodeToken : (key) => {
        try {
            return JSON.parse(atob(Storage.get(key).split('.')[1]))
        } catch (error) {
            return error.message
        }
    }
}

export default Storage