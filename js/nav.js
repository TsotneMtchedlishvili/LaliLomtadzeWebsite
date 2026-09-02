const hamburgerBtn = document.querySelector('.hamburger_Btn');
const topPanel = document.querySelector('.top_Panel');
const navElementContainer = document.querySelector('.nav_Element');
const navList = document.querySelector('.nav_List');
const navLogo = document.querySelector('.nav_Logo');
const sentinel = document.querySelector('#sentinel');
const navLinks = Array.from(document.querySelectorAll('.nav_Link'));
const navBg = document.querySelector('.top_Panel_Before');
const logoAndBtn = document.querySelector('.logo_And_Btn');
let temporaryList;

const navListMaker = () => {

    const temporaryUl = document.createElement('ul');
    temporaryUl.classList.add('temporary_Ul');
    navElementContainer.appendChild(temporaryUl);

    navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const text = link.textContent;

    const temporaryHomeNav = document.createElement('li');
    temporaryHomeNav.classList.add('nav_Item');

    const navLink = document.createElement('a');
    navLink.classList.add('nav_Link');

    navLink.href = href;
    navLink.textContent = text;
    temporaryHomeNav.appendChild(navLink)
    temporaryUl.appendChild(temporaryHomeNav);
    }) 

    return temporaryUl;
}


const deleteList = (list) => {

    list.remove();

};


const openNav = (list) => {

    navElementContainer.style.transition = "all 200ms ease-in-out"
    navElementContainer.classList.remove("nav_Element_Closed");
    navElementContainer.style.height = `${getComputedStyle(list).height}`;
    hamburgerBtn.classList.add("hamburger_Pressed");
    

}

const closeNav = () => {

    
    navElementContainer.classList.add("nav_Element_Closed");
    document.querySelector('.show_Dropdown').style.height = `var(--section-separator-unit)`;
    hamburgerBtn.classList.remove("hamburger_Pressed");
    // navElementContainer.style.transition = "unset"
    
}

const hamburgerClicked = () => {

    if(document.querySelector('.temporary_Ul')) {

        temporaryList = document.querySelector('.temporary_Ul')
        
    }
    else {

        temporaryList = navListMaker();
        console.log(temporaryList)
    }

    if (navElementContainer.classList.contains("nav_Dropdown")) {

        navElementContainer.classList.remove("nav_Dropdown")
        closeNav()

    }
    else {

        navElementContainer.classList.add("nav_Dropdown")
        openNav(temporaryList)

    }

    // hamburgerBtn.classList.toggle("hamburger_Pressed");

    // if (navElementContainer.classList.contains("nav_Element_Expanded")) {

    //     navElementContainer.classList.remove("nav_Element_Expanded");
    //     navElementContainer.style.height = `0`;
    //     navElementContainer.style.minHeight = `0`;
        

    // }
    // else {

    //     navElementContainer.classList.add("nav_Element_Expanded");
        
    //     navElementContainer.style.height = `calc(${getComputedStyle(navList).height} + ${getComputedStyle(navElementContainer).padding})`;
    //     navElementContainer.style.minHeight = `calc(${getComputedStyle(navList).height} + ${getComputedStyle(navElementContainer).padding})`;

    // }


    

}

hamburgerBtn.addEventListener("click", hamburgerClicked);

const options = {
  root: null,
  rootMargin: "0px",
  scrollMargin: "0px",
  threshold: 0,
};

const changeNav = (scrolledDown) => {

    if(scrolledDown) {

        
        navBg.style.transition = "all 400ms ease-in-out";
        const currentWidth = topPanel.getBoundingClientRect().width;
        topPanel.style.width = `${currentWidth}px`
        topPanel.classList.add("show_Dropdown")
        
    }
    else {

        if(document.querySelector('.temporary_Ul')) {
            navElementContainer.style.transition = "unset"
            const temporaryUl = document.querySelector('.temporary_Ul');
            closeNav()
            deleteList(temporaryUl)
        }

        navBg.style.transition = "all 800ms ease-in-out";
        topPanel.classList.remove("show_Dropdown")
        navElementContainer.classList.remove("nav_Dropdown")

    }
}

const callback = (entries, observer) => {
  entries.forEach((entry) => {

    changeNav(!entry.isIntersecting);

  });
};

const observer = new IntersectionObserver(callback, options);



observer.observe(sentinel);