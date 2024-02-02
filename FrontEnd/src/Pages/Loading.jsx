import React from 'react'
import Lottie from 'react-lottie';
import LoadingAnimation from "../assets/LoadingAnimation.json";

function Loading() {

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <Lottie options={defaultOptions}
    height={"100vh"}
    width={"50%"}
    />
  )
}

export default Loading
