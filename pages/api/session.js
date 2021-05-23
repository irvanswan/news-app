import {withIronSession} from 'next-iron-session'
import axios from 'axios'



export default withIronSession(
  async (req, res) => {
    console.log(req.body)
      req.session.set("user", req.body)
      await req.session.save()
      return res.status(200).send("");
  },
  {
    cookieName: "NEWSCOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: '9bnNkD5TVbY7Tkw2asdasadasudatywteyureyrqasud8ay8dyqy1r2re6r16rwa6r'
  }
);
/* export default withIronSession((req, res)=>{
      axios.post(`${process.env.API_URL}/auth/login`,{
        data : req.body
      }).then(res=>{
        req.session.set('user', res.data)
        req.session.save()
        return res.status(201).send('')
      }).catch(err=>{
        console.log(err.message)
        return res.status(403).send(err)
      })
  },{
    cookieName : 'MYCOOKIE',
    password:'9bnNkD5TVbY7Tkw2',
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    }
  }
); */

/* async function handler(req, res) {
get user from database then:
 req.session.set('user', req.body)
  req.session.save()
  const fetchData = {}
  axios.post(`${process.env.API_URL}/auth/login`,{
    data : req.body,
    headers : req.headers
  }).then((result)=>{
    console.log(result.data)
    console.log(result.data)
    req.session.set('user', result.data)
    req.session.save()
    return res.status(200).send('')
  }).catch((err)=>{
    console.log(err)
    return res.status(403).send(err)
  })
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  // if your localhost is served on http:// then disable the secure flag
  cookieName: 'next-iron-session/examples/express',
  cookieOptions: {
    secure: true,
  },
}); */