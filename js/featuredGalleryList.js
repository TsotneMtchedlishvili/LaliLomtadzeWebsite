let dataList;
let oldList;
let listController = null;
// let parentContainer = document.querySelector(".gallery_grid")



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

const renderArray = async (whiteList) => {

    if (listController) {
    listController.abort(); 
  }
    const parentContainer = document.querySelector('.gallery-grid');
    let renderCount = 0;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    parentContainer.innerHTML = '';
    for (const item of dataList) {
    const cardElement = createListingCard(item);
    cardElement.classList.add("listed_Item_Animation");
    parentContainer.append(cardElement);
    }
    


}

const createListingCard = (item) => {
  const {
    title = '',
    photos = [],
    material = '',
    dimensions = '',
    price = '',
    onSale = false,
    originalPrice = '',
    discount = '',
    tags = []
  } = item;

  let unavailable = tags.includes("Unavailable")
  let currentPhotoIndex = 0;

  const articleLink = document.createElement('a');
  console.log(articleLink);
  articleLink.className = 'link_To_Item_Page';
  articleLink.href = `item.html?id=${item.id}`;
  articleLink.target = "_blank";
  
  const article = document.createElement('article');
  article.className = 'listed_Item';
  article.appendChild(articleLink);

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
  previewImg.alt = title;

  const btnRight = document.createElement('button');
  btnRight.className = 'thumbnail_Navigation_Button_Right tnb';
  const imgRight = document.createElement('img');
  imgRight.src = 'images/EpArrowRightBold.svg';
  imgRight.alt = 'Next';
  btnRight.append(imgRight);

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

  const description = document.createElement('div');
  description.className = 'listing_Description';

  const itemTitle = document.createElement('h2');
  itemTitle.className = 'item_Title';
  itemTitle.textContent = title;

  const subDescription = document.createElement('div');
  subDescription.className = 'item_Sub_Description';

  const details = document.createElement('div');
  details.className = 'item_Details';

  const matType = document.createElement('p');
  matType.className = 'material_Type';
  matType.textContent = material;

  const itemDim = document.createElement('p');
  itemDim.className = 'item_Dimension';
  itemDim.textContent = dimensions;

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

    const currentPrice = document.createElement('span');
    currentPrice.className = 'current_Price';
    price ? currentPrice.textContent = price : currentPrice.textContent = "Price Undisclosed"
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
  

  

  

  const zoomContainer = document.createElement('div');
  zoomContainer.className = 'zoom_Button_Container';

  const zoomBtn = document.createElement('button');
  zoomBtn.className = 'zoom_Button generic_Button';
  zoomBtn.textContent = 'Preview';
  zoomBtn.addEventListener('click', () => addButtonFunctionality(photos[currentPhotoIndex]));

  zoomContainer.append(zoomBtn);

  subDescription.append(details, zoomContainer);
  description.append(itemTitle, subDescription);
  article.append(thumbContainer, description);


  if (tags) {



    let tagString = "";
    if (onSale) {

        if(!unavailable) {tagString += "special_offer "};
    }

    tags.forEach(tag => {
        tagString += tag + " ";
    });

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

    const response = await fetch('../data/featured.json');

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    dataList = await response.json();
    oldList = dataList;

    if (!Array.isArray(dataList) || dataList.length === 0) {
      return;
    }

    renderArray(dataList)
    
    
  } catch (error) {
    console.error('Fetch or Parse error: ', error);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAndRenderListings);
} else {
  loadAndRenderListings();
}
