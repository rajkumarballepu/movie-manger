import axios from 'redaxios';
import React, { useEffect, useState } from 'react'
import { getMovies, postMovie } from '../utils/APIRoutes';
import { CookiesProvider, useCookies } from "react-cookie";

function Update() {
    const [values, setValues] = useState({
        _id: "",
        name: "",
        date: "",
        frameLink: "",
        downloadLink: "",
        avatar: "",
        summary: ""
      });

      
      const [movieList, setMovieList] = useState();
      const [cookie, setCookie] = useCookies(["moviesList"]);
      
      useEffect(()=> {
            axios.get(getMovies).then((res)=> {
              console.log(res.data.list)
              setMovieList(res.data.list);
            }).catch((er)=> {
                console.log(er);
            })
      },[])
    
      const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
       };
    
      return (
        <CookiesProvider>
          <div id='create-home'>
            <h1 className='text-center mb-4'>Update Movie details</h1>
            <form onSubmit={(event)=> {
            event.preventDefault();
            axios.post(postMovie, values).then((data)=> {
              console.log("Update success..")
              console.log(data)
            })
           }}>
              <div className="form-floating mb-3">
                  <select className="form-select" aria-label="" value={values._id} name='id' onChange={(event)=> {
                      console.log(event.target.value)
                      const value = event.target.value;
                      if(value == "") {
                          setValues({
                              _id: "",
                              name: "",
                              date: "",
                              frameLink: "",
                              downloadLink: "",
                              avatar: "",
                              summary: ""
                          })
                      } else {
                          const movie = movieList.find((movie) => {
                              return movie._id === event.target.value;
                          })
                          setValues(movie);
                      }
                      console.log(values);
                  }}>
                    <option value={""}>--select movie</option>
                    {
                      movieList && movieList.map((movie, index)=> {
                          return <option key={index + 1} className='form-select' value={movie._id}>{movie.name}</option>
                      })
                    }
                  </select>
                <label htmlFor="floatingInput">Movie</label>
              </div>
                  
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" value={values.name} disabled={values._id === "" || values._id == -1 ? true : false} name='name' onChange={handleChange} placeholder="" />
                <label htmlFor="floatingInput">Movie</label>
              </div>
                  
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" value={values.date} disabled={values._id === "" || values._id == -1 ? true : false} name='date' onChange={handleChange} placeholder="" />
                <label htmlFor="floatingInput">Date</label>
              </div>
                  
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" value={values.frameLink} disabled={values._id === "" || values._id == -1 ? true : false} name='frameLink' onChange={handleChange} placeholder="" />
                <label htmlFor="floatingInput">Frame Link</label>
              </div>
                  
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" value={values.downloadLink} disabled={values._id === "" || values._id == -1 ? true : false} name='downloadLink' onChange={handleChange} placeholder="" />
                <label htmlFor="floatingInput">Download Link</label>
              </div>
                  
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" value={values.avatar} disabled={values._id === "" || values._id == -1 ? true : false} name='avatar' onChange={handleChange} placeholder="" />
                <label htmlFor="floatingInput">Avatar</label>
              </div>
                  
              <div className="form-floating mb-3">
                <textarea type="text" className="form-control" id="floatingTextarea" name='summary' onChange={handleChange} placeholder="" value={values.summary} disabled={values._id === "" || values._id == -1 ? true : false} ></textarea>
                <label htmlFor="floatingTextarea">Summary</label>
              </div>
                  
              <div className="container d-flex align-items-center justify-content-between ">
                <button type="submit" className="btn btn-primary">Update</button>
                <a href="/create">Create Movie</a>
              </div>
                  
            </form>
                  
          </div>
        </CookiesProvider>
      )
}

export default Update