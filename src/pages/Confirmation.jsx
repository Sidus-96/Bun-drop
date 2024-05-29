import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';


function Confirmation(){
    const location = useLocation();
    const { data } = location.state || {};
    const [randomDeliveryTime, setrandomDeliveryTime] = useState();
    const [startTime, setProgressTracker] = useState();

    //Räkna fram slumpmässig tid när man kommer in i sidan
    useEffect(() => {
        const minminutes = 1;
        const maxminutes = 20;
        const deliverytime = Math.floor(Math.random() * (maxminutes - minminutes + 1)) + minminutes;
        setrandomDeliveryTime(deliverytime*60);
        setProgressTracker(deliverytime*60);
    }, []);
     

    //Timer på när leveransen kommer fram
     useEffect(() => {
    const timer =
    randomDeliveryTime > 0 && setInterval(() => setrandomDeliveryTime(randomDeliveryTime - 1), 1000);
    return () => clearInterval(timer);
  }, [randomDeliveryTime]);

  const calcProgressbar = ()=> {
//räkna ut i procent hur lång leveranstid det är kvar
    let progressTracker = ((startTime-randomDeliveryTime)/startTime)*100;
    if(progressTracker < 20)
        {
            // så att det ser snyggare ut i början
            progressTracker =20;
        }
    return progressTracker;
};

    return(

     <div  >
     <div  style={{ height: 'auto', display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
        <h1>Tack för din order {data.customerDetails.customerName}! </h1>
        
        <h3>Order {data.id}</h3>
        <div>
                    {
                        data.articles.map((product) => (
                            <div>
                            <div className="mt-3 d-flex center" key={product.id} >
                                
                                <p style={{marginRight: '10px'}}>{product.title}</p>
                                <p style={{marginRight: '10px'}}>Kvantitet: {product.quantity}</p>
                                <p style={{marginRight: '10px'}}>Totalt: {product.price * product.quantity} kr</p>
                            </div>
                            </div>
                        
                        ))
                   }
                </div>
                <div>
                    
      <div>
        <h5> Din leverans kommer fram om {(randomDeliveryTime/60).toFixed(0)} minuter</h5>
        <ProgressBar className='' animated now={calcProgressbar()} />
        </div>
     
    </div>
            </div>
        </div>
      
    );
}

export default Confirmation;