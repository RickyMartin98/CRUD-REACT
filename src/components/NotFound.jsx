import React from 'react';
import Rex from '../rex.png';
const NotFound = function () {
    const styleImg= {
       height : '200px',
       marginLeft: '500px',
       marginBottom: '50px'
      
    };
    return (
        <div className="">
            <h1 className="display-3 bg-color-dark">Error - 404 Page Not Found</h1>
            <img src={Rex} style={styleImg} className="row justify-content-center"></img>
            <p  className="alert alert-danger text-center" >This page could not be found, please verify the URI</p>
        </div>
    );
}

export default NotFound;
