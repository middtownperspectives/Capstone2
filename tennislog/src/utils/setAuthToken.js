import axios from 'axios';
//this is why axios is used over fetch --prevents having to manually have token for each request

const setAuthToken = (token) => {
    if (token) {
        //Apply to every request
        axios.defaults.headers.common['Autorization'] = token;
    } else {
        //Delete auth headers
        delete axios.defaults.headers.common['Autorization'];
    }
}

export default setAuthToken;