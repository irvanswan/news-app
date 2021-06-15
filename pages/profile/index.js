import useSWR from "swr";
import { Navbar, Header, Footer } from "../../component";
import { userLogout, verifyUser } from "../../lib/fetchUsers";
import styles from "../../styles/Home.module.css";
import { useUser } from "../api/users";
import { useRouter } from "next/router";
import savedPost from "./component/savedPost";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [state, setState] = useState("profile");
  const data = useSWR("api/verify", verifyUser);
  const id_user = data?.data?.id_user;
  const { user, mutateUser, errUser } = useUser(id_user);
  return (
    <>
      <Header title="Profile" />
      <Navbar state="profile" />
      <body>
        <main className="container-fluid pt-5">
          <div className="row">
            <section className="col-12 col-md-4 card  p-0">
              <div class="px-0 px-md-5 py-5">
                <h5>Profile</h5>
                <div className="card border-radius shadow-lg mt-5">
                  <div className="row">
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
                        <li className="list-group-item  border-0 text-primary text-capitalize">{`${user?.data?.role}`}</li>
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
                <li class="list-group-item border-0 cursor-pointer px-1 px-md-5">
                  Edit Profile
                </li>
                <li class="list-group-item border-0 cursor-pointer px-1 px-md-5 btn-blue-light">
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
            <section className="col-12 col-md-8 px-3 py-5">
              <h5 className="text-center text-primary">Saved Post</h5>
              <div className="row mt-5">
                <div className="col-12 col-lg-4 card border-radius mx-2 p-0">
                  {/* start content */}
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
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default Profile;
