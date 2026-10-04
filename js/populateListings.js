let dataList;
let oldList;
let toggledTags = Array.from(document.querySelectorAll(".tag_Pressed"));
const allTag = document.querySelector(".gallery_Tag.all");
let listController = null;
let signal = null;

const htmlLang = document.documentElement.getAttribute('lang');
const currentLang = (htmlLang === 'en') ? 'english' : 'georgian';

let listOFActiveAsyncFunctions = [];

const tagToggle = () => {

    const tagButtons = document.querySelectorAll(".gallery_Tag");
    tagButtons.forEach(tag => {
        tag.addEventListener("click", () => {

            if (tag === allTag) {
                if (allTag.classList.contains("tag_Pressed")){
                    return;
                }
                else {

                    toggledTags.forEach(item => {
                        item.classList.remove("tag_Pressed");
                    })
                    allTag.classList.add("tag_Pressed");
                }

                // toggledTags = document.querySelectorAll(".tag_Pressed");
            }
            else {

                if(allTag.classList.contains("tag_Pressed")) allTag.classList.remove("tag_Pressed");
                tag.classList.toggle("tag_Pressed");
                if (Array.from(document.querySelectorAll(".tag_Pressed")).length === 0) {allTag.classList.add("tag_Pressed")}
            }
            

            toggledTags = Array.from(document.querySelectorAll(".tag_Pressed"))
            renderArray(tagQueueUp())
            // console.log(toggledTags)
        })
    })
}

tagToggle();

const tagQueueUp = () => {

    let whiteList = [];
    if(toggledTags.includes(allTag)) return blackList = null;

    toggledTags.forEach((tag) => {

        // console.log(tag);
        if(tag.classList.contains("available")) whiteList.push("Unavailable");
        if(tag.classList.contains("special_Offer")) whiteList.push("Sale");
        if(tag.classList.contains("wip")) whiteList.push("WIP");
        if(tag.classList.contains("new")) whiteList.push("New");
    })

    return whiteList;
}


// GALLERY MAKER
const renderArray = async (whiteList) => {

    const parentContainer = document.querySelector('.listings_Grid');
    let renderCount = 0;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    if(listController !== null) {
      listController.abort()
      // signal = listController.signal;
    }

    listController = new AbortController();
    const currentSignal = listController.signal;
    signal = currentSignal;
    
    if(whiteList === null) {
        parentContainer.innerHTML = '';
        for (const item of dataList) {
          if (!currentSignal?.aborted) {

                const cardElement = createListingCard(item);
                cardElement.classList.add("listed_Item_Animation");
                parentContainer.append(cardElement);
                renderCount++;
                await delay(40);
              }
              else {

                return;
              }
        
        }
        oldList = dataList;
        
    }
    else {

        let filteredDataList = dataList.filter(dataItem => {
            const tags = dataItem.tags || [];

            if (whiteList.includes("Unavailable") && tags.includes("Unavailable")) {
                return false;
            }

            const requiredTags = whiteList.filter(wlItem => wlItem !== "Unavailable");

            if (requiredTags.length === 0) return true;

            return requiredTags.every(wlItem => tags.includes(wlItem));
        });

        
        const isSameList = (listA, listB) => {
            if (!listA || !listB) return false;
            if (listA.length !== listB.length) return false;
            return listA.every((item, index) => item.id === listB[index].id);
        };

        if(!isSameList(filteredDataList, oldList)) {
            parentContainer.innerHTML = '';
            console.log("adawd "+oldList)
            for (const item of filteredDataList) {
              if (!currentSignal?.aborted) {

                const cardElement = createListingCard(item);
                cardElement.classList.add("listed_Item_Animation");
                parentContainer.append(cardElement);
                renderCount++;
                await delay(40);
              }
              else {

                return;
              }
            }
            
            oldList = filteredDataList;
        }
        


    }
    if (listController?.signal === currentSignal) {

      signal = null;
      listController = null;
    }
            

}

// PREVIEW BUTTON FUNCTION SCRIPT
const addButtonFunctionality = (item) => {

    const htmlBody = document.querySelector("body");
    const navDisableTarget = document.querySelector(".top_Panel");

    htmlBody.classList.add("body_Break");
    navDisableTarget.classList.add("nav_Disable");
    
    
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop_Blurry");

    htmlBody.appendChild(backdrop);

    const body = document.createElement("div");
    body.classList.add("image_Preview_Container");
    backdrop.appendChild(body)

    const imageCenterer = document.createElement("div");
    imageCenterer.classList.add("preview_Image_Centerer");
    body.appendChild(imageCenterer);

    const imagePreview = document.createElement('img')
    imagePreview.classList.add("image_Preview");
    imagePreview.src = `${item}`;
    imageCenterer.appendChild(imagePreview);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add("close_Preview_Button");
    body.appendChild(closeBtn);

    const closeBtnImg = document.createElement('img')
    closeBtnImg.classList.add("close_Button_Image");
    closeBtnImg.src = "../images/close-circle-svgrepo-com.svg"
    closeBtn.appendChild(closeBtnImg);

    closeBtn.addEventListener('click', () => {

        backdrop.remove();
        htmlBody.classList.remove("body_Break");
        navDisableTarget.classList.remove("nav_Disable");
    })
    
}


// ELEMENTS BUIT HERE
const createListingCard = (item) => {
  const {
    title = {},
    photos = [],
    material = {},
    dimensions = '',
    price = '',
    onSale = false,
    originalPrice = '',
    discount = '',
    tags = []
  } = item;

  let unavailable = tags.includes("Unavailable")
  let currentPhotoIndex = 0;

  //Article Link

  const articleLink = document.createElement('a');
  console.log(articleLink)
  articleLink.className = 'link_To_Item_Page';
  articleLink.href = `item.html?id=${item.id}`;
  articleLink.target = "_blank";

  // Root Article
  const article = document.createElement('article');
  article.className = 'listed_Item';
  article.appendChild(articleLink);
  

  // Thumbnail
  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'Item_Thumbnail_Container';

  const btnLeft = document.createElement('button');
  btnLeft.className = 'thumbnail_Navigation_Button_Left tnb';
  const imgLeft = document.createElement('img');
  imgLeft.src = 'images/EpArrowLeftBold.svg';
  imgLeft.alt = 'Previous';
  btnLeft.append(imgLeft);

  const previewImg = document.createElement('img');
  previewImg.className = 'listing_Preview';
  previewImg.src = photos[0] ?? '';
  previewImg.alt = title[currentLang];
  // console.log("here is "+title[currentLang])

  const btnRight = document.createElement('button');
  btnRight.className = 'thumbnail_Navigation_Button_Right tnb';
  const imgRight = document.createElement('img');
  imgRight.src = 'images/EpArrowRightBold.svg';
  imgRight.alt = 'Next';
  btnRight.append(imgRight);

  // Carousel Controls
  btnLeft.addEventListener('click', () => {
    if (photos.length <= 1) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    previewImg.src = photos[currentPhotoIndex];
  });

  btnRight.addEventListener('click', () => {
    if (photos.length <= 1) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    previewImg.src = photos[currentPhotoIndex];
  });

  thumbContainer.append(btnLeft, previewImg, btnRight);

  //Description
  const description = document.createElement('div');
  description.className = 'listing_Description';

  const itemTitle = document.createElement('h2');
  itemTitle.className = 'item_Title';
  itemTitle.textContent = title[currentLang];

  const subDescription = document.createElement('div');
  subDescription.className = 'item_Sub_Description';

  const details = document.createElement('div');
  details.className = 'item_Details';

  const matType = document.createElement('p');
  matType.className = 'material_Type';
  matType.textContent = material[currentLang];

  const itemDim = document.createElement('p');
  itemDim.className = 'item_Dimension';
  itemDim.textContent = dimensions;

  // Pricing Block

  if (unavailable) {

    const sold = document.createElement('div');
    sold.className = 'sold';

    sold.textContent = "Sold Out";
    // sold.append(currentPrice);

    details.append(matType, itemDim, sold);

    onsale = false;



  }
  else {
    const pricing = document.createElement('div');
    pricing.className = 'pricing';

    pricing.hidden = true;

    const currentPrice = document.createElement('span');
    currentPrice.className = 'current_Price';
    price ? currentPrice.textContent = price : currentPrice.textContent = ""
    pricing.append(currentPrice);

    if (onSale){
    if (originalPrice) {
      const origPrice = document.createElement('span');
      origPrice.className = 'original_Price';
      origPrice.textContent = originalPrice;
      pricing.append(origPrice);
      const discQuant = document.createElement('span');
      discQuant.className = 'discount_Quantifier';
    //   console.log(originalPrice, price)
      discQuant.textContent = `-${((parseFloat(originalPrice.slice(1)) - parseFloat(price.slice(1)))*100/parseFloat(originalPrice.slice(1))).toFixed(0)}%`;
      pricing.append(discQuant);
    }
    }
    details.append(matType, itemDim, pricing);
  }
  

  

  

  // Preview Button Container
  const zoomContainer = document.createElement('div');
  zoomContainer.className = 'zoom_Button_Container';

  const zoomBtn = document.createElement('button');
  zoomBtn.className = 'zoom_Button generic_Button';
  let preview_Text = {"english": "Preview", "georgian": "პრევიუ"}
  zoomBtn.textContent = preview_Text[currentLang];
  zoomBtn.addEventListener('click', () => addButtonFunctionality(photos[currentPhotoIndex]));

  zoomContainer.append(zoomBtn);

  // Assembly
  subDescription.append(details, zoomContainer);
  description.append(itemTitle, subDescription);
  article.append(thumbContainer, description);

  // Tag Distribution

  if (tags) {



    // console.log(tags.length + "hor")
    let tagString = "";
    if (onSale) {

        if(!unavailable) {tagString += "special_offer "};
    }

    tags.forEach(tag => {
        tagString += tag + " ";
    });

    // console.log(tagString)
    console.log(tagString)
    article.dataset.categories = tagString;
  }

  return article;
};

const renderListings = () => {

    let renderCount = 0;

    let renderQueue;
    for (const item of dataList) {
      const cardElement = createListingCard(item);
      parentContainer.append(cardElement);
      renderCount++;
    }
}

const loadAndRenderListings = async () => {
  
  try {
    const response = await fetch('../data/data.json');

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    dataList = await response.json();
    oldList = dataList;

    if (!Array.isArray(dataList) || dataList.length === 0) {
      return;
    }

    renderArray(tagQueueUp())
    
    
  } catch (error) {
    console.error('Fetch or Parse error: ', error);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAndRenderListings);
} else {
  loadAndRenderListings();
}