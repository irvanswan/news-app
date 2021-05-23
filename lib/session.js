// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session'
import axios from 'axios'
async function handler(req, res, session) {
  // get user from database then:
 /*  req.session.set('user', req.body)
  req.session.save()
  const fetchData = {} */
  axios.post(`${process.env.API_URL}/auth/login`,{
    data : req.body,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((result)=>{
    console.log(result.data)
    session.set('user', result.data)
    session.save()
    return res.status(201).send('')
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
});