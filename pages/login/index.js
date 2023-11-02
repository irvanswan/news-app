import styles from "../../styles/auth.module.css";
import { Footer, Header } from "../../component";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import TwitterLogin from "react-twitter-login";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userLogin, googleLogin, verifyUser } from "../../lib/fetchUsers";
import useSWR from "swr";
import Fetcher from "lib/fetcher";


export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const verify = useSWR("api/verify", verifyUser);

  useEffect(async()=>{
    let promise = new Promise((resolve, reject)=>{
      setTimeout(() => resolve(verify),100)
    })
    let result = await promise
    if(result?.data){
      router.replace('/')
    }
  },[verify])
  const responseGoogle = async(response) => {
   if(response.error == undefined && !response.error){
      
      const result = await Fetcher({
        method : 'GET',
        url : `${process.env.API_URL}/auth/google`,
        params : {token : response.tokenId}
      })
      googleLogin(result.data, setLoading, router)
    }
  }
  const responseFacebook = (response) => {
    console.log(response);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(
        `${process.env.API_URL}/auth/login`,
        data,
        setLoading,
        router
      );
      console.log(response);
    } catch (error) {}
  };
  return (
    <>
      <Header />
      <body>
        <section className="container-fluid">
          <div id="kudasai-embeded"></div>
          <main>
            <div className="row">
              <div
                className={`col-12 col-sm-12 col-md-12 col-lg-6 d-none d-sm-none d-md-block ${styles.sideform}`}
              ></div>
              <div className="col-12 col-sm-12 col-md-12 d-block col-lg-6">
                <div className="mx-sm-5 mx-md-5 px-1 mt-3">
                  <h1 className="fw-bold">Sign In</h1>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                      <label htmlFor="inputEmail" className="form-label">
                        Email address :{" "}
                      </label>
                      <input
                        type="email"
                        className="form-control border-radius p-3"
                        id="inputEmail"
                        aria-describedby="emailHelp"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputPassword" className="form-label">
                        Password :{" "}
                      </label>
                      <input
                        type="password"
                        className="form-control border-radius p-3"
                        id="inputPassword"
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="d-grid gap-2 mt-5 mb-2">
                      <button
                        className="btn btn-blue btn-lg border-radius p-3 mb-3 shadow-sm"
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Login
                      </button>
                      <span className="px-auto text-center text-uppercase mt-3 text-blue">
                        Or Login with
                      </span>
                    </div>
                  </form>
                  <div className="d-flex justify-content-center mx-1 mt-5">
                        <div className="px-5">
                        <GoogleLogin
                        clientId={`${process.env.GOOGLE_CLIENT_ID}`}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        icon={false}
                        tag='span'
                        className='border-0 shadow-none'
                        type='submit'
                        >
                          <img src="./icon/Google.svg" className="icon" />
                        </GoogleLogin>
                        </div>

                        <div className="px-5">
                          <FacebookLogin
                          clientId={`${process.env.FACEBOOK_CLIENT_ID}`}
                          fields="name,email,picture"
                          callback={responseFacebook} 
                          icon={<img src="./icon/Facebook.svg" className="icon" />}
                          cssClass='border-0 shadow-none bg-transparent'
                          textButton=''
                          />
                        </div>

                        <div className="px-5">
                          <img src="./icon/Twitter.svg" className="icon" />
                        </div>
                      </div>
                      <div className={`${styles.line} my-5`}>
                        <span className="text-info bg-white">
                          Don’t have an account?
                        </span>
                      </div>
                  <div className="d-grid gap-2 mt-5 mb-2">
                    <Link href="/register">
                      <button
                        className="btn btn-dark btn-lg border-radius p-3 mb-3 shadow-sm"
                        type="button"
                      >
                        Sign Up Now
                      </button>
                    </Link>
                    <Link href="/">
                      <span className="text-center fw-bold mb-5">
                        Back to Home Page
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        <Footer />
        <script src="https://example.irvanswan.my.id/static/js/main.min.js"></script>
      </body>
    </>
  );
}
