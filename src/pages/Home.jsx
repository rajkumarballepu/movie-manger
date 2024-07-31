import axios from 'redaxios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteMovie, getMovies } from '../utils/APIRoutes';
import {  useCookies, CookiesProvider } from 'react-cookie';
import Loader from "./Loader";


export default function Home() {

  const [moviesList, setMoviesList] = useState(undefined);
  const [cookie, setCookie] = useCookies(['moviesList'])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
    axios.get(getMovies).then((res)=> {
      localStorage.setItem('moviesList', JSON.stringify(res.data.list));
      setCookie('moviesList', res.data.list);
      const cookieData = cookie.moviesList;
      console.log(cookieData)
      setMoviesList(res.data.list);
      setMovies(res.data.list)
      setIsLoading(true);
    }).catch((err)=> {
      console.log(err);
    })
  },[])

  const [movies, setMovies] = useState(moviesList);

  const handleFilter = (event) => {
    let newData = moviesList.filter((movie)=> {
      console.log(movie);
      return movie.name.toLowerCase().includes(event.target.value.toLowerCase()) ;
    })
    console.log(newData)
    setMovies(newData);
  }

  return (
    <CookiesProvider defaultSetOptions={{path: "/"}}>
      {
        !isLoading ? <Loader /> :
        <div id='home'>
        <div className="container">
          <div className  ="row pt-4 pb-3">
            <div className="col-6">
              <h1>Movies List</h1>
            </div>
            <div className="col-6 text-end">
              <a href='/create' className="btn btn-primary">
                <i className="bi bi-node-plus" ></i> New Movie
              </a>
            </div>
          </div>
          <div className="row pt-4 p-3">
            <input type="text" onChange={handleFilter} className='formControl w-50' placeholder='Search with by movie name'/>
          </div>
          <div>
          <table id="movie-table" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Categories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                movies && movies.map((movie, index)=> {
                  return <tr key={index + 1}>
                    <td> {movie.name} </td>
                    <td>
                      {movie.date}
                    </td>
                    <td>
                      {movie.categories.toString()}
                    </td>
                    <td className='container d-flex justify-content-center'>
                      <div className="btn btn-seondary">
                        <Link to={`create/${movie._id}`}><i className="bi bi-pencil-square"></i> Edit</Link>
                      </div>
                      <div 
                        className="btn btn-danger mx-4"
                        onClick={()=> {
                          console.log(movie._id);
                          let isDelete = confirm("Do you want to delete this movie?")
                          console.log(isDelete)
                          if(isDelete) {
                            setIsLoading(true);
                            axios.delete(`${deleteMovie}/${movie._id}`).then((res)=> {
                              console.log(res);
                              window.location.reload();
                            }).catch((err)=> {
                              alert("Internal Server error");
                              console.log(err)
                            })
                          }
                        }}>
                        <i className="bi bi-pencil-square"></i> Delete
                      </div>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
          </div>
        </div>
      </div>
      }
      
    </CookiesProvider>
  )
}
