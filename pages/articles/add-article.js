import { Navbar, Footer, Header } from "../../component";
import axios from "axios";
import { useState } from "react";

function AddArticle({ categories, error }) {
  console.log(categories)
  const [modifiedData, setModifiedData] = useState({
    title: "",
    text_news: "",
    category: "",
    poster: [],
  });
  const newFormData = () =>{
    formData.append("title", modifiedData.title);
    formData.append("text_news", modifiedData.text_news);
    formData.append("category", modifiedData.category);
    formData.append("tags", modifiedData.category);
    formData.append("poster", modifiedData.poster[0]);
    /* for(let i=0; i < modifiedData.poster.length; i++){
      formData.append("poster", modifiedData.poster[i])
    } */
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    newFormData()
    try {
      const response = await axios.post(`${process.env.API_URL}/news/add-news/1`,formData);
      console.log(response);
    } catch (error) {
      console.log(modifiedData)
    }
  };
  return (
    <>
      <Header title="articles" />
      <Navbar />
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
          <form encType="multipart/form-data" className="row px-3 w-100" onSubmit={(e)=>handleSubmit(e)}>
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
                        poster: e.target.files
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
                        title: e.target.value
                      })
                    }
                  />
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e)=>setModifiedData({...modifiedData, category:e.target.value})}
                  >
                    <option selected>Choose Categories</option>
                    { categories.data &&
                      categories.data.map(item =>(
                      <option value={item.id}>{item.name_categories}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card my-5 p-3">
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    onChange={(e)=>setModifiedData({text_news:e.target.value})}
                  ></textarea>
                  <label for="floatingTextarea">Text</label>
                </div>
                <div className="d-grid gap-2 mt-5">
                  <button className="btn btn-dark" type="button" onClick={(e)=>handleSubmit(e)}>
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
AddArticle.getInitialProps = async ctx=>{
  try{
    const res = await axios.get(`${process.env.API_URL}/categories/`);
    const categories = res.data
    return { categories }
  } catch(error){
    return{ error }
  }
}
export default AddArticle;
