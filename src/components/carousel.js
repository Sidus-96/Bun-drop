import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import burger1 from '../media_components/burger-3.png'
import burger2 from '../media_components/burger-4.png'
import burger3 from '../media_components/burger-5.png'
import { Image } from 'react-bootstrap';
import './carousel.css';

function burgerCarousel() {
    return (
        <section>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ padding: '20px' }}>
              
                <h3>Våra bästsäljare</h3>
                <style> {`.carousel-control-prev, .carousel-control-next {   display: none;`}</style>
                <Carousel interval={4500}>
                    <Carousel.Item>
                    <div className="d-flex justify-content-center align-items-center">
                    <Image src={burger1} roundedCircle width="500" />
    </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className="d-flex justify-content-center align-items-center">
                    <Image src={burger2} roundedCircle width="500" />
    </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className="d-flex justify-content-center align-items-center">
     
      <Image src={burger3}  roundedCircle width="500" />
    </div>
                    </Carousel.Item>
                </Carousel>
             </div>
        </section>
    );
}

export default burgerCarousel;