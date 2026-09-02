const museumWallSection = document.querySelector(".content_Window_One");
const pictureDirectory = ["../images/gallery/!Unsorted/20260814_112238970_iOS.jpg", "../images/gallery/!Unsorted/20260817_174704595_iOS.png", "./images/gallery/!Unsorted/20260814_113115418_iOS.jpg"]
const parentContainer = museumWallSection;
const exponat1 = document.createElement("img");
exponat1.src = pictureDirectory[0];
exponat1.classList.add("exponat")
exponat1.id = "exponat_1"

parentContainer.append(exponat1);

const exponat2 = document.createElement("img");
exponat2.src = pictureDirectory[1];
exponat2.classList.add("exponat")
exponat2.id = "exponat_2"

parentContainer.append(exponat2);

const exponat3 = document.createElement("img");
exponat3.src = pictureDirectory[2];
exponat3.classList.add("exponat")
exponat3.id = "exponat_3"

parentContainer.append(exponat3);

const populateWall = async (condition) => {

    
    let renderCount = 0;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));




    if (condition) {

        exponat1.classList.add("exponat_Animation");
        await delay(100);
        exponat2.classList.add("exponat_Animation");
        await delay(100);
        exponat3.classList.add("exponat_Animation");
        
    

        
    }

        


}



const galleryOptions = {
  root: null,
  rootMargin: "0px",
  scrollMargin: "0px",
  threshold: 0.70,
};

const cbFunctionObserver = (entries, observer) => {
  entries.forEach((entry) => {

    populateWall(entry.isIntersecting);

  });
};

const galleryObserver = new IntersectionObserver(cbFunctionObserver, galleryOptions);



galleryObserver.observe(museumWallSection);
    