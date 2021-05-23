import { Navbar, Footer, Header } from "../../component";
import styles from "../../styles/Home.module.css";
import axios from "axios";

function Article({ news, error }) {
  console.log(news);
  return (
    <>
      <Header title="articles" />
      <Navbar />
      <section className="container-fluid p-0">
        <div className={`${styles.banner2} m-0`}>
          <div className={`${styles.content2} m-0`}>
            <div className="col-md-12 col-lg-5 p-5">
              <h1 className="mt-5">Start Writing an Article</h1>
              <span>
                You can be an author by being active in reading artciles in a
                month or you can request to be an author if you have been a
                member for three months.
              </span>
              <br />
              <button className="btn btn-blue p-3 mt-4">Start Exploring</button>
            </div>
          </div>
        </div>
        <div className="filter-tags p-0 p-lg-5">
          <h5 className="fw-bold">Latest News</h5>
          <div className="row">
            {news.data &&
              news.data.map((item) => (
                <div className="col-12 col-lg-4">
                  <div className="card border-radius border-0 m-3 shadow-lg">
                    <div className="row">
                      <div className="col-5">
                        <img
                          src="./images/corona.png"
                          alt="..."
                          className="poster"
                        />
                      </div>
                      <div className="col-7">
                        <div className="content ms-3 my-3">
                          <span className="text-blue">{item.title}</span>
                          <div className="d-flex flex-column bd-highlight mt-3">
                            <div className="bd-highlight">
                              {`${item.text_news.substring(0, 50)}...`}
                            </div>
                          </div>
                          <div className="mt-3">
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
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
Article.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get(`${process.env.API_URL}/news/`);
    const news = res.data;
    return { news };
  } catch (error) {
    return { error };
  }
};

export default Article;
