const panelQuote = document.getElementById("quote_Description");
const section4container = document.querySelector(".section4_Container")
const aboutSection4 = document.getElementById("aboutSection4")
const aboutSection5 = document.getElementById("aboutSection5")

let panelQuoteSize = panelQuote.clientHeight;




const section = document.getElementsByTagName("section");


const section3ContainerNew = document.querySelector(".section3_Container");

const aboutSection3 = document.getElementById("aboutSection3");

let section3ConteinerSize = getComputedStyle(section3ContainerNew).height;

// Attach a ResizeObserver to quote_Description directly
const resizeObserver = new ResizeObserver(() => {
    // Need to apply this natively in adjust panels but whatever, works for now.
    adjustPanelSize();
});

resizeObserver.observe(panelQuote);

const adjustPanelSize = () => {

    aboutSection3.style.height = "";
    section4container.style.height = "";
    aboutSection4.style.height = "";
    if (document.querySelector(".landing_Banner_About")) {
        document.querySelector(".landing_Banner_About").style.height = "";
    }

    section3ConteinerSize = getComputedStyle(section3ContainerNew).height;
    panelQuoteSize = panelQuote.clientHeight;

    if (window.innerWidth <= 1000) {


        console.log(panelQuoteSize)

        // let panelQuote = panelQuote.clientHeight;

        console.log(panelQuoteSize)


        aboutSection3.style.height = `${section3ConteinerSize}`;

        // section4container.style.height = `${parseFloat(panelQuoteSize) + 2*parseFloat(getComputedStyle(section4container).paddingBlock)}px`;

        section4container.style.height = `calc(${parseFloat(panelQuoteSize)}px + 2 * clamp(80px, 20vw, 120px))`;

        console.log(2*parseFloat(getComputedStyle(section4container).paddingBlock))

        aboutSection4.style.height = `calc(${parseFloat(panelQuoteSize)}px + 2 * clamp(80px, 20vw, 120px))`;


        aboutSection5.style.height = `max-content`;

    }

    else {


        // panelQuoteSize = panelQuote.clientHeight;

        // let panelQuote = panelQuote.clientHeight;

        console.log(panelQuoteSize)

        const section1 = document.querySelector(".landing_Banner_About")

        


        // let newPanelQuoteSize = getComputedStyle(panelQuote).height;

        section1.style.height = `100vh`;

        console.log(aboutSection3.querySelector(".section3_Container").clientHeight);

        aboutSection3.style.height = `max(100vh, calc(${aboutSection3.querySelector("#section3Undercontainer").clientHeight}px + 8vw))`;

        // section4container.style.height = `calc(${parseFloat(panelQuoteSize)}px + 8vw)`;

        aboutSection4.style.height = `calc(${parseFloat(panelQuoteSize)}px + 8vw)`;

        aboutSection5.style.height = `100vh`;


    }

}


adjustPanelSize()

const adjustGridItemHeight = () => {

    const items = Array.from( document.querySelectorAll(".literature_Item"));
    items.forEach(item => {
        const imageContainer = item.querySelector(".literature_Image_Container");

        item.style.height = "";
        if (window.innerWidth > 1000){

                return;
        }
        if (!(imageContainer.scrollHeight > 0)) {
            
            imageContainer.style.backgroundColor = "rgb(12, 13, 17)"
            item.style.height = `${items[0].clientHeight}px`
            

        }
   })
}

// adjustGridItemHeight()

window.addEventListener("load", adjustGridItemHeight);
window.addEventListener("resize", adjustGridItemHeight)