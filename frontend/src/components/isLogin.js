import axios from "axios";

const isLogin = () => 
    localStorage.getItem('refresh_token')===null ?
        false
        :
        axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
        {
            refresh: localStorage.getItem('refresh_token')
        })
        ?
        true
        :
        false



    
export default isLogin;