import { getIronSession } from "pages/api/getSession";
import { useUser } from "pages/api/users";
import { Navbar, Footer, Header, Editor } from "../../component";
import axios from "axios";
import { useState, useEffect } from "react";
import Fetcher from "../../lib/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

function AddArticle({ categories, error }) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const {session} = getIronSession();
  const id_user = session?.id_user
  const token_user = session?.token
  /* const data = useSWR("../api/verify");
  const id_user = data?.data?.id_user;
  const token_user = data?.data?.token; */
  const [loading, setLoading] = useState(false);
  const [modifiedData, setModifiedData] = useState({
    title: "",
    text_news: "",
    category: "",
    poster: [],
  });
  
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const image = modifiedData.poster[0];
    formData.append("title", modifiedData.title);
    formData.append("text_news", modifiedData.text_news);
    formData.append("category", modifiedData.category);
    formData.append("tags", modifiedData.category);
    formData.append("poster", image);
    console.log(modifiedData.poster[0]);
    try {
      const response = await Fetcher({
        method: "POST",
        url: `${process.env.API_URL}/news/add-news/${id_user}`,
        headers: { "user-token": token_user },
        data: formData,
      });
      console.log(response);
    } catch (error) {}
  };
  return (
    <>
      <Header title="articles" url="../icon/Google.svg" />
      <Navbar state="articles" url="../api/verify" path=".." />
      <section className="container-fluid p-0">
        <div className="d-flex justify-content-between m-5">
          <div>
            <img src="../../icon/Back.svg" />
            <span>Back</span>
          </div>
          <div>
            <h3 className="fw-bold">Write Article</h3>
          </div>
          <div>
            <span className="fw-bold">Save as draft</span>
          </div>
        </div>
        <div className="d-row">
          <form
            encType="multipart/form-data"
            className="row px-3 w-100"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="col-12 col-lg-4">
              <div className="card mx-lg-3 mx-0">
                <div className="dashes m-3 p-5">
                  <img
                    src="../../icon/Plus.svg"
                    alt="..."
                    className="mx-auto align-content-center"
                  />
                </div>
              </div>
              <div className="d-grid gap-2 mt-5">
                <label className="btn btn-dark">
                  <input
                    type="file"
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        poster: e.target.files,
                      })
                    }
                  />
                  Choose Cover Photo
                </label>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    aria-label="First name"
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        category: e.target.value,
                      })
                    }
                  >
                    <option selected>Choose Categories</option>
                    {categories.data &&
                      categories.data.map((item) => (
                        <option value={item.id}>{item.name_categories}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="card my-5 p-3">
                <Editor
                  name="description"
                  onChange={(e) => {
                    setModifiedData({
                        ...modifiedData,
                        text_news: e,
                      })
                  }}
                  editorLoaded={editorLoaded}
                />
                <div className="d-grid gap-2 mt-5">
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Request Publish Article
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
AddArticle.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get(`${process.env.API_URL}/categories/`);
    const categories = res.data;
    return { categories };
  } catch (error) {
    return { error };
  }
};
export default AddArticle;
