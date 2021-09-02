import { getNews } from "./api/news";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header, Navbar, Footer } from "../component";
import parse from 'html-react-parser'
import moment from "moment";

const DetailNews = () => {
  const router = useRouter();
  const { id } = router.query;
  const { news, mutateNews, errNews } = getNews({ id_news: id });
  console.log(news);
  return (
    <>
      <Header title='News App' />
      <body>
        <Navbar state="home" path='.'/>
        <main className="mt-5">
          <section className="px-md-5 px-1 mx-md-4 mx-1">
            <div className="d-flex flex-row pt-5">
              <div className="p-2">
                <div className="d-flex justify-content-between cursor-pointer" onClick={()=>router.back()}>
                  <img src="./icon/Back.svg" className="icon" />
                  <span className="ms-5 pt-0 d-none d-md-block">Back</span>
                </div>
              </div>
              <div className="p-2 w-100">
                <h3 className="text-center mx-auto">Article Viewer</h3>
              </div>
            </div>
            <div className="row my-5 w-100">
              {news?.data &&
                news?.data?.map((item) => (
                  <>
                    <div className="col-12 col-md-6 px-3">
                      <div className="background vh-40">
                        <img
                          src={`${process.env.API_URL_IMG}${item.poster}`}
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <h1 className='mb-4'>{item.title}</h1>
                      <small className="text-dark fw-bold text-capitalize">
                        {item.name} - {item.role}
                      </small>
                      <br />
                      <small className="text-muted">
                        {moment(`${item?.created_at}`).format(
                          "dddd, MMMM Do YYYY"
                        )}
                      </small>
                      <div className="d-flex mt-3">
                        <div className="p-2 bd-highlight">
                          <img src="./icon/Like.svg" alt="..."  className='icon-1'/>
                          <small> 2.1k</small>
                        </div>
                        <div className="p-2 bd-highlight">
                          <img src="./icon/Borkmark.svg" alt="..." className='icon-1'/>
                          <small> 2.1k</small>
                        </div>
                      </div>
                      <br />
                      <button className="btn btn-dark btn-lg border-radius p-3 mb-3 shadow-sm w-100">
                        Share Article Link
                      </button>
                    </div>
                    <div className="col-12 mt-5 ms-3">
                          {parse(`${item.text_news}`)}
                    </div>
                  </>
                ))}
              <div className="my-5">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h5>Comments</h5>
                    <div class="d-flex flex-row bd-highlight mb-3">
                      <div class="p-2 bd-highlight">
                        <img src="./images/no-photo.png" className="photo" />
                      </div>
                      <div class="p-2 bd-highlight w-100">
                        <label
                          htmlFor="inputComment"
                          className="form-label text-blue fw-bold"
                        >
                          You
                        </label>
                        <input
                          type="text"
                          className="form-control border-top-0 border-start-0 border-end-0 w-100 m-0"
                          id="inputComment"
                        />
                      </div>
                      <div class="p-2 bd-highlight">
                        <button className="btn text-primary bg-transparent my-4">
                          <small>Submit</small>
                        </button>
                      </div>
                    </div>

                    <div class="d-flex flex-row bd-highlight mb-3">
                      <div class="p-2 bd-highlight">
                        <img src="./images/no-photo.png" className="photo" />
                      </div>
                      <div class="p-2 bd-highlight w-100">
                        <label
                          htmlFor="inputComment"
                          className="form-label text-blue fw-bold w-100"
                        >
                          Kirito
                        </label>
                        <span className='my-5'>
                          iya benar benar keren
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default DetailNews;
