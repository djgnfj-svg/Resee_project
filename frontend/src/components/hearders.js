const headers = () => {
    <>
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    </>
}

export default headers