import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { postMovie } from '../utils/APIRoutes';
import Multiselect from "multiselect-react-dropdown";
import Loader from './Loader';

function Create() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(()=> {
    if(id) {
      const data = JSON.parse(localStorage.getItem("moviesList"));
      console.log(data)
      let movie = data.find((movie)=> {
        return movie._id == id;
      })
      console.log(movie)
      setValues(movie);
    }
  }, []);

  const [values, setValues] = useState({
    categories: [],
    name: "",
    date: "",
    frameLink: "",
    downloadLink: "",
    avatar: "",
    summary: ""
  });

  const handleChange = (event) => {
    console.log(event.target.name+ "  "+event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const categories = [
    "Action",
    "Thriller",
    "Romantic",
    "Family",
    "Drama",
    "Comedy"
  ]
  const handleSelect = (selectedList) => {
    console.log(selectedList);
    console.log(values.categories);
    setValues({...values, categories: selectedList});
  }

  const handleSubmit = (event)=> {
    event.preventDefault();
    setIsLoad(true);
    console.log(values);
    axios.post(postMovie, values).then((res)=> {
      console.log(res.status);
        if(res.status == 200) {
          alert(id ? "Movie update success.." : "Movie upload success..");
          navigate("/");
        } else {
          alert("Internal error...")
        }
      });
    }

  return (
    <div id='create-home' className='w-100 d-flex flex-column justify-content-center align-items-center'>
      <h1 className='text-center mb-4'>Upload Movie</h1>
     <form className='w-50' onSubmit={handleSubmit}>
      {
        isLoad ? <Loader /> :
       <>
          {
            id && 
            <div className="form-floating mb-3">
              <input type="text" disabled className="form-control" id="floatingInput" name='name' value={id}  placeholder="" />
              <label htmlFor="floatingInput">Id</label>
            </div>
          }
  
          <div className="form-floating mb-3">
            <input type="text" value={values.name} className="form-control" id="floatingInput" name='name' onChange={handleChange} placeholder="" />
            <label htmlFor="floatingInput">Movie</label>
          </div>
        
          <div className="form-floating mb-3">
            <input type="text" value={values.date} className="form-control" id="floatingInput" name='date' onChange={handleChange} placeholder="" />
            <label htmlFor="floatingInput">Date</label>
          </div>
        
          <div className="form-floating mb-3">
            <input type="text" value={values.frameLink} className="form-control" id="floatingInput" name='frameLink' onChange={handleChange} placeholder="" />
            <label htmlFor="floatingInput">Frame Link</label>
          </div>
        
          <div className="form-floating mb-3">
            <input type="text" value={values.downloadLink} className="form-control" id="floatingInput" name='downloadLink' onChange={handleChange} placeholder="" />
            <label htmlFor="floatingInput">Download Link</label>
          </div>
        
          <div className="form-floating mb-3">
            <input type="text" value={values.avatar} className="form-control" id="floatingInput" name='avatar' onChange={handleChange} placeholder="" />
            <label htmlFor="floatingInput">Avatar</label>
          </div>
        
          <div className="form-floating mb-3">
            <label htmlFor="floatingTextarea">Summary</label>
            <textarea type="text" className="form-control" rows={10} id="floatingTextarea" name='summary' onChange={handleChange} placeholder="" ></textarea>
          </div>
          <Multiselect
            selectedValues={values.categories}
            isObject={false}
            onKeyPressFn={function noRefCheck(){}}
            onRemove={handleSelect}
            onSelect={handleSelect}
            className='form-select mb-4'
            style={{backgroundColor: "white"}}
            options={categories}
          />
          <div className="container d-flex align-items-center justify-content-between ">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
       </> 
      }
        
        
      </form>
      {
        console.log(id)
      }
    </div>
  )
}

export default Create