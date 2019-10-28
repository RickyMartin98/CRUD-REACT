import React from 'react';

const PiedePagina = function () {
    return (
        <footer className="footer-style font-medium text-center text-white footer-copyright bg-primary" style={style} >
            <div className="row">
               <div className="col-12 text-center">
                    <p>Made by <a href="/" className="text-white">@Martin Fernandez</a></p>
               </div>
            </div>
            <div className="text-center text-info">
                <a href="/" className="text-white">enchilada.io</a>
            </div>
        </footer> 
    );
}

const style = {
    height: 100,
    marginTop: 400 
}


export default PiedePagina;