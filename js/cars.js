'use strict';

{
  const targets = document.querySelectorAll('img');

  function callback(entries,obs) { 
    
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('appear');
      obs.unobserve(entry.target); 
    });
  }

  const options = {
    threshold: 0.3,    //30%交差
  }

  const observer = new IntersectionObserver(callback,options);

  targets.forEach(target => {
    observer.observe(target);
  });

}