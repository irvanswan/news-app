import { getIronSession } from "pages/api/getSession";
import { Navbar, Footer, Header, Editor, ModalSuccess } from "../../component";
import axios from "axios";
import { useState, useEffect } from "react";
import Fetcher from "../../lib/fetcher";

function AddArticle({ categories, error }) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const {session} = getIronSession();
  const id_user = session?.id_user
  const token_user = session?.token
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modifiedData, setModifiedData] = useState({
    title: "",
    text_news: "",
    category: "",
    poster: [],
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleChange = (e)=>{
    let poster = document.getElementById('poster');
    poster.src = URL.createObjectURL(e.target.files[0]);
    setModifiedData({
      ...modifiedData,
      poster: e.target.files,
    });
    poster.onload = function(){
      URL.revokeObjectURL(poster.src);
    }
  }
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
      setShow(true);
    } catch (error) {}
  };
  return (
    <>
      <Header title="articles" url="../icon/Google.svg" />
      <Navbar state="articles" url="../api/verify" path=".." />
      <section className="container-fluid p-0 py-5">
        <div className="d-flex justify-content-between m-5">
          <div>
            <img src="../../icon/Back.svg" />
            <span> Back</span>
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
                    className="mx-auto align-content-center background vh-35 w-100"
                    id='poster'
                  />
                </div>
              </div>
              <div className="d-grid gap-2 mt-5">
                <label className="btn btn-dark">
                  <input
                    type="file"
                    onChange={(e)=>handleChange(e)}
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
                    className="form-control border-info border-radius py-3"
                    placeholder="Title"
                    aria-label="Title"
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
                    className="form-select border-info border-radius py-3"
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
              <div className="my-5">
                <Editor
                  className='h-100'
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
        <ModalSuccess isShow = {show}/>
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
