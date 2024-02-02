import React, { useEffect, useRef, useState } from "react";
import iphone from "../../assets/phone.png";
import samsung from "../../assets/samsung.png";
import google from "../../assets/google.png";

function Hero() {
  const [count, setCount] = useState(0);
  const [heading, setHeading] = useState([
    "Discover the Future in Your Hands",
    "Next-Gen Phones, Today",
    "Experience Innovation Like Never Before",
  ]);
  const [paragraph, setParagraph] = useState([
    "Explore a World of Cutting-Edge Phones from Top Brands",
    "Explore a curated selection of cutting-edge smartphones.",
    "Uncover a Universe of Cutting-Edge Phones from the Best Brands",
  ]);
  const [image, setImage] = useState([iphone, samsung, google]);
  const headingRef = useRef("");
  const paragraphRef = useRef("");
  const imageRef = useRef("");

  const changingIndex = () => {
    if (count >= 2) {
      return setCount(0);
    }
    setCount(count + 1);
  };

  useEffect(() => {
    let headingTimeout;
    let paragraphTimeout;
    const changeHeading = async () => {
      headingRef.current.style.transition = "all 0.3s linear";
      imageRef.current.style.transition = "all 0.5s linear";
      headingTimeout = setTimeout(() => {
        headingRef.current.style.transform = "translatex(-40rem)";
        imageRef.current.style.opacity = "0";
        setTimeout(changingIndex, 500);
        setTimeout(() => {
          headingRef.current.style.transform = "translatex(0rem)";
          imageRef.current.style.opacity = "1";
        }, 500);
      }, 8000);
    };
    const changeParagraph = () => {
      paragraphRef.current.style.transition = "all 0.3s linear";
      paragraphTimeout = setTimeout(() => {
        paragraphRef.current.style.transform = "translatex(-40rem)";
        setTimeout(changingIndex, 500);
        setTimeout(() => {
          paragraphRef.current.style.transform = "translatex(0rem)";
        }, 500);
      }, 8200);
    };
    changeHeading();
    changeParagraph();
    return () => {
      clearTimeout(headingTimeout);
      clearTimeout(paragraphTimeout);
    };
  }, [count]);
  return (
    <div
      style={{ height: "40rem" }}
      className="flex justify-between items-center"
    >
      <div className="w-1/2 ml-8">
        <h3 className="text-3xl md:text-4xl" ref={headingRef}>
          {heading[count]}
        </h3>
        <p ref={paragraphRef}>{paragraph[count]}</p>
        <button className="py-4 px-8 mt-4 border-none bg-blue-400 text-white rounded-lg cursor-pointer hover:bg-gray-400">
          Shop Now
        </button>
      </div>

      <div className="absolute hidden md:block right-0 z-[1]">
        <img
          style={{ width: "35rem", height: "35rem" }}
          className="object-cover"
          ref={imageRef}
          src={image[count]}
          alt=""
        />
      </div>
      <div className="w-1/2 overflow-hidden hidden md:block">
        <svg
          style={{ width: "100rem" }}
          className="relative z-0 right-0 -top-96"
          viewBox="-40 00 805 701"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.4" className="ring">
            <path
              d="M381.87 434.92C381.87 481.507 388.691 498.89 367.495 539.235C346.298 579.581 329.19 581.781 292.477 605.075C255.764 628.368 245.476 643.551 203.084 643.551C160.691 643.551 150.404 628.368 113.691 605.075C76.9778 581.781 59.8696 579.581 38.6733 539.235C17.477 498.89 24.2978 481.507 24.2978 434.92C24.2978 388.332 17.477 370.95 38.6733 330.605C59.8696 290.259 76.9778 288.059 113.691 264.765C150.404 241.472 160.691 226.289 203.084 226.289C245.476 226.289 255.764 241.472 292.477 264.765C329.19 288.059 346.298 290.259 367.495 330.605C388.691 370.95 381.87 388.332 381.87 434.92Z"
              fill="#0A0A0A"
            />
          </g>
          <g opacity="0.4" className="ring1">
            <path
              d="M446.755 410.091C446.755 465.996 454.94 486.854 429.504 535.269C404.069 583.684 383.539 586.324 339.483 614.276C295.427 642.229 283.083 660.448 232.211 660.448C181.34 660.448 168.995 642.229 124.94 614.276C80.8841 586.324 60.3543 583.684 34.9187 535.269C9.48318 486.854 17.6681 465.996 17.6681 410.091C17.6681 354.186 9.48318 333.327 34.9187 284.912C60.3543 236.497 80.8841 233.857 124.94 205.905C168.995 177.952 181.34 159.733 232.211 159.733C283.083 159.733 295.427 177.952 339.483 205.905C383.539 233.857 404.069 236.497 429.504 284.912C454.94 333.327 446.755 354.186 446.755 410.091Z"
              fill="#1B1B1B"
            />
          </g>
          <g opacity="0.4" className="ring2">
            <path
              d="M602.478 350.5C602.478 428.767 613.937 457.969 578.327 525.75C542.718 593.531 513.976 597.226 452.298 636.36C390.62 675.493 373.337 701 302.118 701C230.898 701 213.615 675.493 151.937 636.36C90.2594 597.226 61.5176 593.531 25.9078 525.75C-9.70195 457.969 1.757 428.767 1.757 350.5C1.757 272.233 -9.70195 243.031 25.9078 175.25C61.5176 107.469 90.2594 103.774 151.937 64.6402C213.615 25.5067 230.898 0 302.118 0C373.337 0 390.62 25.5067 452.298 64.6402C513.976 103.774 542.718 107.469 578.327 175.25C613.937 243.031 602.478 272.233 602.478 350.5Z"
              fill="#292929"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Hero;
