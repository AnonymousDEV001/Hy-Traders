import React from "react";

function ImageZoom(props) {
  function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*create lens:*/
    lens = document.getElementById("img-zoom-lens-id");
    /*insert lens:*/
    /*calculate the ratio between result DIV and lens:*/
    if (
      result.offsetWidth / lens.offsetWidth == 0 ||
      result.offsetHeight / lens.offsetHeight == 0
    ) {
      cx = 2;
      cy = 2;
    } else {
      cx = result.offsetWidth / lens.offsetWidth;
      cy = result.offsetHeight / lens.offsetHeight;
    }
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize =
      img.width * cx + "px " + img.height * cy + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - lens.offsetWidth / 2;
      y = pos.y - lens.offsetHeight / 2;
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) {
        x = img.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - lens.offsetHeight) {
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      /*set the position of the lens:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*display what the lens "sees":*/
      result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
    }
    function getCursorPos(e) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }
  function showMag() {
    document.querySelector("#img-zoom-lens-id").style.display = "block";
    document.querySelector("#myresult").style.display = "block";
    imageZoom("myimage", "myresult");
  }
  function hideMag() {
    document.querySelector("#myresult").style.display = "none";
    document.querySelector("#img-zoom-lens-id").style.display = "none";
  }

  return (
    <div 
    className="pointer-events-none relative w-11/12 md:w-auto m-0 flex md:my-12 md:mx-8 flex-col"
    >
      <div 
      className="hidden absolute border-[1px] border-gray-400 w-60 h-40 bg-[#ffffff70]"
      id="img-zoom-lens-id"></div>
      <img
        onMouseOver={() => {
          let width = window.innerWidth;
          if (width < 1200) return;
          showMag();
        }}
        className="pointer-events-auto h-auto w-full  lg:h-[35rem] lg:w-[35rem] object-cover"
        onMouseOut={hideMag}
        id="myimage"
        src={props.image}
      />

      <div id="myresult" 
      className="hidden absolute border-[1px] border-gray-200 h-[25rem] w-[35rem] left-[35rem]"
      ></div>
    </div>
  );
}

export default ImageZoom;
