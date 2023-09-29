export function getUsers(){
    const users = localStorage.getItem('users')
    return(users !== null) ? JSON.parse(users) : []
}


export function getLoggedInUser() {
    const user = localStorage.getItem('loggedin')
    return (user !== null) ? JSON.parse(user) : null
}