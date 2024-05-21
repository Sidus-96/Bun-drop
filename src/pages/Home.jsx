import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Carousel from '../components/carousel';



function Home(){

    return(

     <div style={{ height: '100vh'}} >
     <Carousel />
     </div>
    );
}

export default Home