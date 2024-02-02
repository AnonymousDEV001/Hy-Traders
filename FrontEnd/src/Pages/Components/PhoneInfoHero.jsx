import React, { useEffect, useState } from "react";

function PhoneInfoHero() {
  const [detailIndex, setDetailIndex] = useState(0);
  const [detail, setDetails] = useState([
    "Non-PTA phones, in the context of Pakistan, are mobile devices that have not been officially registered with the Pakistan Telecommunication Authority (PTA). The PTA enforces regulations to ensure that all mobile devices in the country are properly documented and compliant with local standards. Non-PTA phones may be unregistered, smuggled, or lacking valid IMEI numbers. These devices are not legally recognized and may face restrictions in terms of network access or services. It's crucial for users in Pakistan to ensure their phones are PTA-compliant to enjoy seamless connectivity and avoid potential legal complications.",
    "Non-PTA phones often lack official warranty and after-sales support from authorized service centers in Pakistan. As these devices are not officially registered, obtaining repairs, replacements, or technical support can be challenging, potentially leading to additional costs or reliance on third-party services.","Due to their unregistered status, non-PTA phones face a risk of disruption in services or even being blacklisted by local authorities. This could result in network blocks, rendering the device unusable or restricted in its functionalities, further highlighting the importance of adhering to PTA regulations for a hassle-free mobile experience in Pakistan.","Non-PTA phones pose significant legal implications for users in Pakistan. The use or sale of unregistered devices goes against the regulations set by the Pakistan Telecommunication Authority (PTA), potentially resulting in penalties or legal consequences. Operating a non-PTA compliant phone may lead to service disruptions, network blocks, or even the device being rendered unusable. To avoid legal complications and ensure uninterrupted mobile usage, it's crucial to prioritize PTA-compliant devices, ensuring adherence to local standards and regulations for a lawful and seamless mobile experience in Pakistan."
  ]);

  useEffect(() => {
    let detailsTimeout = setTimeout(() => {
      if (detailIndex >= detail.length - 1) {
        return setDetailIndex(0);
      }
      setDetailIndex(detailIndex + 1);
    }, 5000);

    return () => {
      clearTimeout(detailsTimeout);
    };
  }, [detailIndex]);
  return (
    <div className="flex justify-center items-center my-4 md:my-16">
      <div className="w-11/12">
        <div>
          <div>
            <div className="relative py-6 px-12 bg-blue-50 md:py-12 md:px-16 rounded-lg shadow-md">
              <div className="flex justify-center items-center flex-col">
                <div className="flex w-full flex-col m-4 gap-4">
                  <h3 className="text-2xl m-0">
                    Information about different phone catagories
                  </h3>
                  <h3>Non-PTA Phones</h3>
                  <p>{detail[detailIndex]}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center w-full">
                  <div
                      className={`mx-1 h-2 w-2  rounded-md ${
                        detailIndex === 0 ? "bg-blue-600":"bg-gray-400"
                      }`}
                    ></div>
                    <div
                      className={`mx-1 h-2 w-2  rounded-md ${
                        detailIndex === 1 ? "bg-blue-600":"bg-gray-400"
                      }`}
                    ></div>
                    <div
                      className={`mx-1 h-2 w-2  rounded-md ${
                        detailIndex === 2 ? "bg-blue-600":"bg-gray-400"
                      }`}
                    ></div>

                    <div
                      className={`mx-1 h-2 w-2  rounded-md ${
                        detailIndex === 3 ? "bg-blue-600":"bg-gray-400"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="w-11/12 m-4"></div>
                <div className="flex justify-center items-center w-full absolute">
                  <button
                    onClick={(e) => {
                      if (detailIndex >= detail.length - 1) {
                        return setDetailIndex(0);
                      }
                      setDetailIndex(detailIndex + 1);
                    }}
                    className="absolute -right-2 justify-center items-center py-8 px-0 md:py-8 md:px-2 rounded-md hover:bg-blue-400 hover:text-white hover:shadow-lg"
                  >
                    <span className={`material-symbols-outlined`}>
                      chevron_right
                    </span>
                  </button>

                  <button
                    onClick={(e) => {
                      if (detailIndex <= 0) {
                        return setDetailIndex(3);
                      }
                      setDetailIndex(detailIndex - 1);
                    }}
                    className="absolute -left-2 flex justify-center items-center py-8 px-0 md:py-8 md:px-2 rounded-md hover:bg-blue-400 hover:text-white hover:shadow-lg"
                  >
                    <span className={`material-symbols-outlined`}>
                      chevron_left
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneInfoHero;
