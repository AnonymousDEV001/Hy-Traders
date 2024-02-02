import React, { useState, useEffect } from "react";

function Catagories() {
  const [catagories, setCatagories] = useState([]);
  useEffect(() => {
    const getCatagories = async () => {
      const url = "http://127.0.0.1:8000/api/catagory/";
      let response = await fetch(url, {
        method: "GET",
      });
      setCatagories(await response.json());
    };
    getCatagories();
  }, []);

  return (
    <div className="min-h">
      <div className="flex items-center justify-center">
      <h3 className="text-4xl w-11/12 text-cyan-400">Catagories</h3>

      </div>
      <div className="flex justify-center items-center">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-4 md:grid-cols-5  xl:grid-cols-7 mx-auto my-4 w-11/12">
          {catagories &&
            catagories.map((catagory) => {
              return (
                <div
                  style={{ border: "1px solid lightgray" }}
                  className="border-collapse cursor-pointer flex justify-center hover:shadow  hover:scale-105 transition-all mix-blend-color-burn items-center flex-col p-2  border-gray-300"
                >
                  <img
                    className="h-24"
                    src={`http://127.0.0.1:8000${catagory.image}`}
                    alt={catagory.catagory}
                  />
                  <p>{catagory.catagory}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Catagories;
