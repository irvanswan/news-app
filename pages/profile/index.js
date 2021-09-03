import useSWR from "swr";
import { Navbar, Header, Footer } from "../../component";
import { userLogout, verifyUser } from "../../lib/fetchUsers";
import { useUser } from "../api/users";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { EditProfile, SavedPost, Faq , Help } from "./component";
import { getIronSession } from "pages/api/getSession";

const Profile = () => {
  const router = useRouter();
  const [menu, setMenu] = useState('profile')
  const {session} = getIronSession();
  const id_user = session?.id_user;
  const { user, mutateUser, errUser } = useUser(id_user);

  useEffect(async()=>{
    let promise = new Promise((resolve, reject)=>{
      setTimeout(() => resolve(session),1000)
    })
    let result = await promise
    if(!result){
      router.replace('/login')
    }
  },[session])

  const reset = () =>{
    let editProfile = document.getElementById('editProfile');
    let saved = document.getElementById('saved');
    let faq = document.getElementById('faq');
    let help = document.getElementById('help');
    editProfile.classList.remove("btn-blue-light");
    editProfile.children[0].classList.remove('text-primary');

    saved.classList.remove("btn-blue-light");
    saved.children[0].classList.remove('text-primary');

    faq.classList.remove("btn-blue-light");
    faq.children[0].classList.remove('text-primary');

    help.classList.remove("btn-blue-light");
    help.children[0].classList.remove('text-primary');
  }
  useEffect(()=>{
    reset();
    let component = null;
    let c = null;
    switch(menu){
      case 'profile':
        component = document.getElementById('editProfile');
        component.classList.add("btn-blue-light");
        c = component.children;
        c[0].classList.add("text-primary");
        break;
      case 'saved':
        component = document.getElementById('saved');
        component.classList.add("btn-blue-light");
        c = component.children;
        c[0].classList.add("text-primary")
        break;
      case 'faq':
        document.getElementById('faq').classList.add("btn-blue-light");
        break;
      case 'help':
        document.getElementById('help').classList.add("btn-blue-light");
        break;
      default:
        document.getElementsById('editProfile').classList.add("btn-blue-light")
        setMenu('profile')
        break
    }
  },[menu])
console.log(menu)
  return (
    <>
      <Header title="Profile" />
      <Navbar state="profile" path="."/>
      <body>
        <main className="container-fluid">
          <div className="row mt-5">
            <section className="col-12 col-md-4 card p-0">
              <div class="px-0 px-md-5 mx-4 py-5 mb-5">
                <h5>Profile</h5>
                <div className="card border-radius border-0 shadow-lg mt-5">
                  <div className="row mw-100">
                    <div className="col-12 col-md-5 text-center">
                      <img
                        src={`${
                          user?.data?.avatar
                            ? `${process.env.API_URL_IMG}${user?.data?.avatar}`
                            : "./images/no-photo.png"
                        }`}
                        className="photo-sm border-primary img-thumbnail border-radius m-4 p-3"
                      />
                    </div>
                    <div className="col-12 col-md-7">
                      <ul className="list-group p-1">
                        <li className="list-group-item  border-0 text-blue m-0">{`${
                          user?.data?.username != null
                            ? user?.data?.username
                            : "Your username ? "
                        }`}</li>
                        <li className="list-group-item  border-0 fw-bolder text-capitalize m-0">{`${
                          user?.data?.name != null
                            ? user?.data?.name
                            : "Your name ? "
                        }`}</li>
                        <li className="list-group-item fw-bolder  border-0 text-primary text-capitalize m-0">{`${user?.data?.role == 'basic' ? 'Member' : user?.data?.role}`}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="py-3 px-4 mb-5">
                    <p className="fw-bold">About me</p>
                    <span className="text-justify">
                      {`${
                        user?.data?.bio != null
                          ? user?.data?.bio
                          : "Your Bio ? "
                      }`}
                    </span>
                  </div>
                  <label className="text-center position-absolute top-100 start-50 translate-middle z2">
                    <div className="bg-primary border-radius position-relative">
                      <div class="d-flex align-items-center">
                        <div className='p-2 bd-highlight item-box fw-bolder text-white btn-blue border-radius'>
                          <small>52</small><br/>
                          <small>Post</small>
                        </div>
                        <div className="p-2 bd-highlight item-box fw-bolder text-white">
                          <small>250</small><br/>
                          <small>Visitor</small>
                        </div>
                        <div className='p-2 bd-highlight item-box fw-bolder text-white'>
                          <small>4.5K</small><br/>
                          <small>Comment</small>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <ul class="list-group border-0 bg-transparent mb-5">
                <li class="list-group-item border-0 cursor-pointer py-3 px-1 px-md-5" id='editProfile' onClick={()=>{setMenu('profile')}}>
                  <span className='float-start'>Edit Profile</span>
                  <img src='../../icon/AngleRight.svg' className='float-end'/>
                </li>
                <li class="list-group-item border-0 cursor-pointer py-3 px-1 px-md-5" id='saved' onClick={()=>{setMenu('saved')}}>
                  <span className='float-start'>Saved Post</span>
                  <img src='../../icon/AngleRight.svg' className='float-end'/>
                </li>
                <li class="list-group-item border-0 cursor-pointer py-3 px-1 px-md-5" id='faq' onClick={()=>{setMenu('faq')}}>
                  <span className='float-start'>FAQ</span>
                  <img src='../../icon/AngleRight.svg' className='float-end'/>
                </li>
                <li class="list-group-item border-0 cursor-pointer py-3 px-1 px-md-5" id='help' onClick={()=>{setMenu('help')}}>
                  <span className='float-start'>Help</span>
                  <img src='../../icon/AngleRight.svg' className='float-end'/>
                </li>
                <li
                  class="list-group-item border-0 cursor-pointer py-3 px-1 px-md-5"
                  onClick={() => userLogout(router)}
                >
                  <span className='float-start'>Logout</span>
                  <img src='../../icon/AngleRight.svg' className='float-end'/>
                </li>
              </ul>
            </section>
            <section className="col-12 col-md-8 pt-3 px-0">
             {menu == 'profile'?
              <EditProfile/>
             :(menu == 'saved')?
              <SavedPost />
             :(menu == 'help')?
              <Help/>
             :(menu == 'faq')?
              <Faq/>
             :<EditProfile/>}
            </section>
          </div>
        </main>
      </body>
      <Footer />
    </>
  );
};

export default Profile;
