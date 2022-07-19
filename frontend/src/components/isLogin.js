import axios from "axios";

const isLogin = () => axios.post('http://127.0.0.1:8000/api/books/',
    {
        headers: {
            Authorization: `${localStorage.getItem('refresh_token')}`
        }
    })
    .then(res => {
        return true
    }
    ).catch(error => {
        localStorage.clear()
        return false
    })
;

export default isLogin;