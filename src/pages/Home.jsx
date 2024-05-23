import React, { useState } from 'react'
import Carousel from '../components/carousel';



function Home(){

    return(

     <div style={{ height: '100vh'}} >
     <Carousel />
     <div className="text-center">
        <p>Välkommen till vår hamburgarekedja! Vi startade för några dagar sedan. </p>
        vi har olika färdigheter inom olika saker
     </div>
     </div>
     
    );
}

export default Home