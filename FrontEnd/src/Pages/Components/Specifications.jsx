import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Specifications() {
  const [colums, setColums] = useState([]);
  const [features,setFeatures] = useState([])
  const params = useParams();



  useEffect(()=>{
    const fetchFeatures = async()=>{
      const url = `http://127.0.0.1:8000/api/feature/${params.id}/`
      let response = await fetch(url)
      response = await response.json()
      setFeatures(response)
    }
    fetchFeatures()
  },[])




  useEffect(() => {
    let length = 0;
    if (features.length >= 3) {
      length = 3;
    }
    if (features.length == 2) {
      length = 2;
    }
    if (features.length == 1) {
      length = 1;
    }
    const array = [];
    Array.from(Array(length)).forEach((_, index) => {
      array.push(index);
    });
    setColums(array);
  }, [features]);
  return (
    <div 
    className="m-8"
    >
      <h3 
      className="text-2xl"
      >Specifications</h3>
      <div 
      className="flex my-4 gap-4 flex-wrap"
      >
        {colums && colums.map((product, index) => {
          const startingIndex =
            (features.length / colums.length) * index;
          const endingIndex =
            (features.length / colums.length) * (index + 1);

          let columnProducts = features.slice(
            startingIndex,
            endingIndex
            );
          
          return (
            <div key={index} 
            className="flex flex-col"
            >
              <div className="flex flex-col gap-4"
              >
                {columnProducts.map((nextProduct) => {
                  
                  return (
                    <div 
                    className="shadow rounded-md   p-6  border-[1px] border-gray-100"
                    >
                       <h3>{nextProduct.featureHeading.toUpperCase()}</h3>
                       {nextProduct.product_features.map((feature) => {
                        return (
                          <div 
                          className="flex my-4 border-b-[1px] border-gray-300 py-2"
                          >
                            <div 
                            className="w-60 text-gray-500"
                            >{feature.key}</div>
                            <div
                            >
                              {feature.value}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Specifications;
