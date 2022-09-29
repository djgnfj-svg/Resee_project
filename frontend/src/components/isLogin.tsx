export const isLogin = () => 
    localStorage.getItem('refresh_token') === null || localStorage.getItem('access_token') === null ?
        false
        :
        // (
        // axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/", //리프레시 토큰 유효 검사
        // {
        //     refresh: localStorage.getItem('refresh_token')
        // }).then(res => {
        //     localStorage.setItem('access_token' , res.data.access)
        // }).catch(error => {
        //     //리프레시가 없거나 만료상태 시 로그인 잔행
        //     localStorage.clear();
        //     window.location.href="/login"
        //     alert(" 복습을 하지않으셔서 자동 로그아웃 됐어요 ! ")
        // })
        // ?
        // true
        // :
        true

export default isLogin;