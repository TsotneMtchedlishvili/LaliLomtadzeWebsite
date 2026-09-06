const heroLanding = document.querySelector(".hero_Landing");
const tagContainer = document.querySelector(".tags_Container")

const propmptShow = () => {

    const htmlBody = document.querySelector("body");
    const navDisableTarget = document.querySelector(".top_Panel");

    htmlBody.classList.add("body_Break");
    navDisableTarget.classList.add("nav_Disable");
    
    
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop_Blurry");

    htmlBody.appendChild(backdrop);

    // const body = document.createElement("div");
    // body.classList.add("image_Preview_Container");
    backdrop.appendChild(tagContainer);

    if(!tagContainer.classList.contains("prompt_Out")) {

        tagContainer.classList.add("prompt_Out");
    }
    


    const closeBtn = document.createElement('button');
    closeBtn.classList.add("close_Preview_Button");
    tagContainer.appendChild(closeBtn);

    const closeBtnImg = document.createElement('img')
    closeBtnImg.classList.add("close_Button_Image");
    closeBtnImg.src = "../images/close-circle-svgrepo-com.svg"
    closeBtn.appendChild(closeBtnImg);

    const closeBtnFunc = () => {

        backdrop.remove();
        htmlBody.classList.remove("body_Break");
        navDisableTarget.classList.remove("nav_Disable");
        tagContainer.classList.remove("prompt_Out");
        closeBtn.removeEventListener("click", closeBtnFunc);
        console.log("SWOOP")
        closeBtn.remove();
        heroLanding.appendChild(tagContainer);
    }
    closeBtn.addEventListener('click', closeBtnFunc)

}

if (window.innerWidth < 1000) {

    const categoryButton = document.createElement("button");
    categoryButton.classList.add("generic_Button", "category_Button");
    categoryButton.innerText = "See Categories";
    heroLanding.appendChild(categoryButton);
    categoryButton.addEventListener("click", propmptShow);
    console.log(categoryButton);
}

window.addEventListener("resize", () => {

    if(window.innerWidth < 1000) {

        if(!document.querySelector(".category_Button")) {

            const categoryButton = document.createElement("button");
            categoryButton.classList.add("generic_Button", "category_Button");
            categoryButton.innerText = "See Categories";
            heroLanding.appendChild(categoryButton);
            categoryButton.addEventListener("click", propmptShow);
        }
    }
    else {

        const backdrop = document.querySelector(".backdrop_Blurry");
        if(backdrop) {

            backdrop.remove();
            document.querySelector("body").classList.remove("body_Break");
            document.querySelector(".top_Panel").classList.remove("nav_Disable");
            tagContainer.classList.remove("prompt_Out");
            heroLanding.appendChild(tagContainer);
            document.querySelector(".close_Preview_Button").remove();
        }

        if(document.querySelector(".generic_Button.category_Button")) {

            const categoryButton = document.querySelector(".category_Button");
            categoryButton.removeEventListener("click", propmptShow);
            categoryButton.remove();
            
        }

    }
})