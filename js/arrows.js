const arrows = Array.from(document.querySelectorAll('.jump_To_Arrow'));

const arrowOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};


const arrowCallback = (entries) => {
  entries.forEach((entry) => {

   if(entry.isIntersecting){

    entry.target.classList.add("jump_To_Arrow_Displayed")
   }
   else {

    entry.target.classList.remove("jump_To_Arrow_Displayed")
   }

  });
};

const arrowObserver = new IntersectionObserver(arrowCallback, arrowOptions);



arrows.forEach((arrow) => arrowObserver.observe(arrow));