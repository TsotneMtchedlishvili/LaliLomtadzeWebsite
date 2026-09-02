const section3Container = document.querySelector('.section3_Container');
const section4Container = document.querySelector('.section4_Container');

const section3 = document.querySelector('.about_Section_3');
const section4 = document.querySelector('.about_Section_4');

const panelOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};


const panelCallback = (entries) => {
  entries.forEach((entry) => {

   if(entry.isIntersecting){

    if(entry.target === section3) {section3Container.classList.add("section_Slide_Left");}
    else if(entry.target === section4) {section4Container.classList.add("section_Slide_Right");}
   }


  });
};

const panelObserver = new IntersectionObserver(panelCallback, panelOptions);



panelObserver.observe(section3);

panelObserver.observe(section4);