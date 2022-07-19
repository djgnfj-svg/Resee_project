import axios from "axios";

const isLogin = () => {

    if(localStorage.getItem('refresh_token')===null){
        return false
    }else{
        
        axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
        {
            refresh: localStorage.getItem('refresh_token')
        })
        .then(res => {
            return true
        }
        ).catch(error => {
            console.log("sjsi?")
            return false
        })
    };
}
    
export default isLogin;