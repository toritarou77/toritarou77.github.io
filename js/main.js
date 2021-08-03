// ----------------------------------------------------------------------------------
'use strict';

{

  window.addEventListener('load', function () {
    viewSlide('.main_slide img');
  });
  function viewSlide(className, slideNo = -1)
  {
    let imgArray = document.querySelectorAll(className);
    if (slideNo >= 0) {
      imgArray[slideNo].style.opacity = 0;
    }
    
    slideNo++;
    if (slideNo >= imgArray.length) {
      slideNo = 0; 
    }

    imgArray[slideNo].style.opacity = 1;
    let msec = document.getElementById('slide_speed').value;
    setTimeout(function(){viewSlide(className, slideNo);}, msec);
  }

}