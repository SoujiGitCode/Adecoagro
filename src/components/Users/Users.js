import React, { useEffect, useState } from 'react';
import FormUsers from './FormUsers';
import ListUsers from './ListUsers';
import Pagination from '../App/Pagination'


export default function Users() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [preloader, setPreloader] = useState(false);
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState('Ingresá la información de tu usuario aquí:');
  const [button, setButton] = useState('Guardar Registro');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
      const getData = async () => {
          fetch(process.env.REACT_APP_URL_API+'/users/lists', {
                  headers: {
                      'Access-Control-Allow-Origin': '*'
                  },
              })
              .then(data => data.json()).then(data => {
                  setResults(data);
                  setPreloader(true);
              })
      }
      getData().catch(null);
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);


  // Change page
  const paginate = pageNumber =>{
   setCurrentPage(pageNumber);
  } 

  return (
   <div className="row">
      <div className="col-md-12 col-sm-12 col-xs-12">
         <h3>Usuarios</h3>
      </div>
        <div className="col-md-12 col-sm-12 col-xs-12" hidden={preloader ? true : false} >
           <div className="maskloader">
              <div className="spinner">
                 <div className="double-bounce1"></div>
                 <div className="double-bounce2"></div>
              </div>
           </div>
        </div>
      <div className="col-md-5 col-sm-5 col-xs-12" hidden={preloader ? false : true}>
         <FormUsers  
            name={name} 
            setName={setName} 
            id={id} 
            setId={setId} 
            email={email} 
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            title={title}
            setTitle={setTitle}
            button={button} 
            setButton={setButton}  
            results={results}  
            setResults={setResults}
            preloader={preloader}
            setPreloader={setPreloader}
            ></FormUsers>
      </div>
      <div className="col-md-7 col-sm-7 col-xs-12" hidden={preloader ? false : true}>
         <ListUsers
            name={name} 
            setName={setName} 
            id={id} 
            setId={setId} 
            email={email} 
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            title={title}
            setTitle={setTitle}
            button={button} 
            setButton={setButton}  
            results={currentPosts}  
            setResults={setResults}
            preloader={preloader}
            setPreloader={setPreloader}
            ></ListUsers>

            <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={results.length}
                  paginate={paginate}
                  />
      </div>
   </div>
  );
}