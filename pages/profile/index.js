import useSWR from "swr";
import { Navbar, Header, Footer } from "../../component";
import { userLogout, verifyUser } from "../../lib/fetchUsers";
import styles from "../../styles/Profile.module.css";
import { useUser } from "../api/users";
import { useRouter } from "next/router";
import savedPost from "./component/savedPost";
import { useState, useEffect } from "react";
import Fetcher from "../../lib/fetcher";

const Profile = () => {
  const router = useRouter();
  const [background, setBackground] = useState([])
  const data = useSWR("api/verify", verifyUser);
  const id_user = data?.data?.id_user;
  const { user, mutateUser, errUser } = useUser(id_user);

  useEffect(() => {
    const formData = new FormData()
    if(background.length > 0){
      formData.append(`image`, background[0])
      try{
        const response = Fetcher({
          url:`${process.env.API_URL}/users/`,
          params:{id : id_user},
          data:formData
        })
        if(response.status == 200){
          console.log(response)
        }else{
          console.log(response)
        }
      }catch(err){
        
      }
    }
  }, [background])

  return (
    <>
      <Header title="Profile" />
      <Navbar state="profile" />
      <body>
        <main className="container-fluid">
          <div className="row mt-5">
            <section className="col-12 col-md-4 card  p-0">
              <div class="px-0 px-md-5 py-5">
                <h5>Profile</h5>
                <div className="card border-radius shadow-lg mt-5">
                  <div className="row mw-100">
                    <div className="col-12 col-md-5 text-center">
                      <img
                        src={`${
                          user?.data?.avatar
                            ? `${process.env.API_URL_IMG}${user?.data?.avatar}`
                            : "./images/no-photo.png"
                        }`}
                        className="img-fluid img-thumbnail rounded mx-3 mt-1"
                      />
                    </div>
                    <div className="col-12 col-md-7">
                      <ul className="list-group p-1">
                        <li className="list-group-item  border-0 text-blue">{`${
                          user?.data?.username != null
                            ? user?.data?.username
                            : "Your username ? "
                        }`}</li>
                        <li className="list-group-item  border-0 fw-bolder text-capitalize">{`${
                          user?.data?.name != null
                            ? user?.data?.name
                            : "Your name ? "
                        }`}</li>
                        <li className="list-group-item  border-0 text-primary text-capitalize">{`${user?.data?.job}`}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="py-3 px-4">
                    <p className="fw-bold">About me</p>
                    <span className="text-justify">
                      {`${
                        user?.data?.bio != null
                          ? user?.data?.bio
                          : "Your Bio ? "
                      }`}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-primary text-center my-3">See profile</span>
              <ul class="list-group border-0 bg-transparent mb-5">
                <li class="list-group-item border-0 cursor-pointer px-1 px-md-5 btn-blue-light">
                  Edit Profile
                </li>
                <li class="list-group-item border-0 cursor-pointer px-1 px-md-5">
                  Saved Post
                </li>
                <li class="list-group-item border-0 cursor-pointer px-1 px-md-5">
                  FAQ
                </li>
                <li class="list-group-item border-0 cursor-pointer px-1 px-md-5">
                  Help
                </li>
                <li
                  class="list-group-item border-0 cursor-pointer px-1 px-md-5"
                  onClick={() => userLogout(router)}
                >
                  Logout
                </li>
              </ul>
            </section>
            <section className="col-12 col-md-8 pt-3 px-0">
              <div className="position-relative z1">
                <div className="overflow-hidden w-100 h-25">
                  <img
                    src={
                      user?.data?.bg_profile != null
                        ? `${process.env.API_URL_IMG}${user?.data?.bg_profile}`
                        : "./images/article.png"
                    }
                    className="w-100"
                  />
                </div>
                <label className="text-center position-absolute top-50 start-50 translate-middle z2">
                  <input type="file" accept="image/png, image/jpeg" onChange={(e)=>setBackground(e.target.files[0])}/>
                  <span className="mt-5 text-white">Change Background</span>
                </label>
                <label className="text-center position-absolute top-100 start-50 translate-middle z2">
                  <div className="btn-blue-light rounded-circle">
                    <img
                      src={`${
                        user?.data?.avatar
                          ? `${process.env.API_URL_IMG}${user?.data?.avatar}`
                          : "./images/no-photo.png"
                      }`}
                      className="photo m-4"
                    />
                    <div className='text-center position-absolute top-50 start-100 translate-middle z3 bg-primary rounded-circle'>
                      <img src='./icon/Pen.svg' className='m-2'/>
                      <input type='file' accept="image/*"/>
                    </div>
                  </div>
                </label>
              </div>
              <div className="container-fluid w-100 mx-0 mt-5">
                <form>
                  <div className="row mt-3 mb-2 px-3">
                    <div className="col-12 col-md-6">
                      <label className="ms-1">Username :</label>
                      <input
                        type="text"
                        className="form-control border-radius p-3"
                        placeholder="your username"
                        aria-label="username"
                        defaultValue={`${
                          user?.data?.username != null
                            ? user?.data?.username
                            : "Empty"
                        }`}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="ms-1">Name :</label>
                      <input
                        type="text"
                        className="form-control border-radius p-3"
                        placeholder="your name"
                        aria-label="name"
                        defaultValue={`${
                          user?.data?.name != null ? user?.data?.name : "Empty "
                        }`}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="ms-1">Email :</label>
                      <input
                        type="email"
                        className="form-control border-radius p-3"
                        placeholder="your email"
                        aria-label="email"
                        defaultValue={`${
                          user?.data?.email != null
                            ? user?.data?.email
                            : "Empty ? "
                        }`}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="ms-1">Password :</label>
                      <input
                        type="password"
                        className="form-control border-radius p-3"
                        placeholder="your password"
                        aria-label="password"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="ms-1">Job :</label>
                      <input
                        type="text"
                        className="form-control border-radius p-3"
                        placeholder="your job"
                        aria-label="job"
                        defaultValue={`${
                          user?.data?.job != null ? user?.data?.job : "Empty"
                        }`}
                      />
                      <div className="mt-md-5 mt-0">
                        <label for="floatingTextarea2 ms-1">About :</label>
                        <textarea
                          className="form-control border-radius p-3"
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          defaultValue={`${
                            user?.data?.bio != null
                              ? user?.data?.bio
                              : "Your username ? "
                          }`}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="d-grid gap-2 pt-4">
                        <button
                          className="btn btn-blue btn-lg border-radius p-3 mb-3 shadow-sm"
                          type="button"
                        >
                          Request to be an author
                        </button>
                        <button
                          className="btn btn-dark btn-lg border-radius p-3 mb-3 shadow-sm"
                          type="button"
                        >
                          Save Change
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* <form className='mw-100 m-0'>
                <div className="row mt-3 mb-2 px-3">
                  <div className="col-12 col-md-6">
                    <label className="ms-1">Username :</label>
                    <input
                      type="text"
                      className="form-control border-radius p-3"
                      placeholder="your username"
                      aria-label="username"
                      defaultValue={`${
                        user?.data?.username != null
                          ? user?.data?.username
                          : "Empty"
                      }`}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="ms-1">Name :</label>
                    <input
                      type="text"
                      className="form-control border-radius p-3"
                      placeholder="your name"
                      aria-label="name"
                      defaultValue={`${
                        user?.data?.name != null ? user?.data?.name : "Empty "
                      }`}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="ms-1">Email :</label>
                    <input
                      type="email"
                      className="form-control border-radius p-3"
                      placeholder="your email"
                      aria-label="email"
                      defaultValue={`${
                        user?.data?.email != null
                          ? user?.data?.email
                          : "Empty ? "
                      }`}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="ms-1">Password :</label>
                    <input
                      type="password"
                      className="form-control border-radius p-3"
                      placeholder="your password"
                      aria-label="password"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="ms-1">Job :</label>
                    <input
                      type="text"
                      className="form-control border-radius p-3"
                      placeholder="your job"
                      aria-label="job"
                      defaultValue={`${
                        user?.data?.job != null ? user?.data?.job : "Empty"
                      }`}
                    />
                    <div className="mt-md-5 mt-0">
                      <label for="floatingTextarea2 ms-1">About :</label>
                      <textarea
                        className="form-control border-radius p-3"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        defaultValue={`${
                          user?.data?.bio != null
                            ? user?.data?.bio
                            : "Your username ? "
                        }`}
                      />
                    </div>
                  </div>
                  <div className="col mx-3">
                    <div className="d-grid gap-2 pt-4">
                      <button
                        className="btn btn-blue btn-lg border-radius p-3 mb-3 shadow-sm"
                        type="button"
                      >
                        Request to be an author
                      </button>
                      <button
                        className="btn btn-dark btn-lg border-radius p-3 mb-3 shadow-sm"
                        type="button"
                      >
                        Save Change
                      </button>
                    </div>
                  </div>
                </div>
              </form> */}
              {/* <h5 className="text-center text-primary">Saved Post</h5>
              <div className="row mt-5">
                <div className="col-12 col-lg-4 card border-radius mx-2 p-0">
                  <div className="d-flex flex-column bd-highlight mb-3">
                    <div className="bd-highlight poster-overfow">
                      <img src="./images/corona.png" alt="..." className="" />
                    </div>
                    <div className="p-2 bd-highlight text-center">
                      <span className="text-primary fw-bolder">COVID-19</span>
                      <div className="d-flex flex-column bd-highlight mt-3">
                        <div className="bd-highlight">
                          Why corona never ends? Let’s see how its facts
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bd-highlight text-center">
                      <div className="d-flex justify-content-between">
                        <div className="p-2 bd-highlight">
                          <img src="./icon/Like.svg" alt="..." />
                          <small> 2.1k</small>
                        </div>
                        <div className="p-2 bd-highlight">
                          <img src="./icon/Clock.svg" alt="..." />
                          <small> 2.1k</small>
                        </div>
                        <div className="p-2 bd-highlight">
                          <img src="./icon/Borkmark.svg" alt="..." />
                          <small> 2.1k</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </section>
          </div>
        </main>
      </body>
      <Footer />
    </>
  );
};

export default Profile;
