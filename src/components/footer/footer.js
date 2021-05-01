import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';


import './footer.css';

class footer extends Component{

    render() {
        return (
            <footer id="sticky-footer" >
            <div className="footer">
           
              {/* <div className="textfooter">ปันใจ</div> */}
              <div className="logofooter" ><i className="fab fa-gratipay"></i></div>
              <Link to="/#001" className="textfooter">ปันใจ </Link>
               {/* <div className="logofooter" ><i className="fab fa-gratipay"></i></div>  */}
            </div>
         
          </footer>
        )
    }
}
export default footer