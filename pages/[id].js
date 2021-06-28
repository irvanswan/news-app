import { getNews } from "./api/news";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header, Navbar, Footer } from "../component";
import moment from "moment";

const DetailNews = () => {
  const router = useRouter();
  const { id } = router.query;
  const { news, mutateNews, errNews } = getNews({ id_news: id });
  console.log(news);
  return (
    <>
      <Header title={id} />
      <body>
        <Navbar state="home" />
        <main className="mt-5">
          <section className="px-5">
            <div className="d-flex flex-row pt-5">
              <div className="p-2">
                <div className="d-flex justify-content-between">
                  <img src="./icon/Back.svg" className="icon" />
                  <span className="ms-5 pt-0 d-none d-md-block">Back</span>
                </div>
              </div>
              <div className="p-2 w-100">
                <h3 className="text-center mx-auto">Article Viewer</h3>
              </div>
            </div>
            <div className="row my-3">
              {news?.data &&
                news?.data?.map((item) => (
                  <>
                    <div className="col-12 col-md-6 px-3">
                      <div className="background vh-35">
                        <img
                          src={`${process.env.API_URL_IMG}${item.poster}`}
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>{item.title}</h3>
                      <small className="text-dark fw-bold text-capitalize">
                        {item.name} - {item.role}
                      </small>
                      <br />
                      <small className="text-muted">
                        {moment(`${item?.created_at}`).format(
                          "dddd, MMMM Do YYYY"
                        )}
                      </small>
                      <div className="d-flex">
                        <div className="p-2 bd-highlight">
                          <img src="./icon/Like.svg" alt="..." />
                          <small> 2.1k</small>
                        </div>
                        <div className="p-2 bd-highlight">
                          <img src="./icon/Borkmark.svg" alt="..." />
                          <small> 2.1k</small>
                        </div>
                      </div>
                      <br />
                      <button className="btn btn-dark btn-lg border-radius p-3 mb-3 shadow-sm w-100">
                        Share Article Link
                      </button>
                    </div>
                    <div className="col-12 mt-5">
                      <span>{item.text_news}</span>
                    </div>
                  </>
                ))}
              <div className="my-5">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h5>Comments</h5>
                    <div class="d-flex flex-row bd-highlight mb-3">
                      <div class="p-2 bd-highlight">
                        <img src="./images/no-photo.png" className="avatar" />
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
                        <button className="btn text-primary bg-transparent my-3">
                          Submit
                        </button>
                      </div>
                    </div>

                    <div class="d-flex flex-row bd-highlight mb-3">
                      <div class="p-2 bd-highlight">
                        <img src="./images/no-photo.png" className="avatar" />
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
