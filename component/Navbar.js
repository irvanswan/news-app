import Link from 'next/link'
import {useState} from 'react'
import { useRouter } from 'next/router'
import {verifyUser, userLogout} from '../lib/fetchUsers'
import useSWR from 'swr'

const Navbar = (props) => {
  const user = props.user
  const [key, setKey] = useState(null)
  const router = useRouter()
  const data = useSWR('api/verify',verifyUser)
  const handleSubmit = (e)=>{
    e.preventDefault()
    router.push(`/articles/:key=${key}`)
  }
  console.log('ini datanya',data.data)
 /*  const user= props.user */
 /* console.log(data) */
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container-fluid">
        <Link href='/'>
        <h1 className="navbar-brand fw-bold" href="#">
          News Today
        </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse mx-5"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <Link href='/'>
                <span className="nav-link" aria-current="page">
                  Home
                </span>
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link href='/articles'>
                <span className="nav-link" href="#">
                  Articles
                </span>
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link href='/category'>
                <span className="nav-link" href="#">
                  Category
                </span>
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link href='/about'>
              <span className="nav-link" href="#">
                About
              </span>
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={(e)=>handleSubmit(e)}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setKey(e.target.value)} />
          </form>
          {
            (data.data === null || data.data === undefined) ?(
              <div className="d-flex flex-row">
            <Link href='/register'>
              <button className="btn mx-5 bg-transparent">Sign up</button>
            </Link>
            <Link href='/login'>
              <button className="btn btn-blue" type="submit">
                Login
              </button>
            </Link>
          </div>
            ):(
              <div className="d-flex flex-row">
              <button className="btn mx-5 bg-transparent" onClick={()=>userLogout(router)}>Sign up</button>
          </div>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export const getServerSideProps = async()=>{
  const user = await fetch('api/user');
  return{
    props : {user}
  }
 /*  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) {
      res.statusCode = 404;
      res.end();
      return { props: {} };
    }

    return {
      props: { user }
    };
  },
  {
    cookieName: "NEWSAPP-COOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: `${process.env.SECRET_COOKIE_PASSWORD}`
  } */
}


export default Navbar