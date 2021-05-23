import axios from 'axios'
/* import withIronSession from './session' */

const userLogin = async(url, data, cb, cb2) => {
    cb(true)
    axios.post(url, data).then(async(result)=>{
        cb(false)
        const response = await fetch("api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.data.data)
          });
        
        if (response.ok) {
            return cb2.replace('/');
        }
    }).catch(error => {
        cb(false)
        alert('Ini Failed')
    })
}


const userRegister = async(url, data, cb, cb2)=>{
    cb(true)
    axios.post(url, data).then(result=>{
        cb(false)
        alert(result.data.message)
    }).catch(error =>{
        cb(false)
        alert('Failed')
    })
}
export {userRegister, userLogin}