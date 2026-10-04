const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');

const htmlLang = document.documentElement.getAttribute('lang');
const currentLang = (htmlLang === 'en') ? 'english' : 'georgian';

fetch('../data/data.json')
    .then(response => response.json())
    .then(items => {
        const item = items.find(i => i.id == itemId);

        if (!item) {
            document.body.innerHTML = `
                <div style="text-align: center; margin-top: 50px;">
                    <h2>Item not found</h2>
                    <a href="index.html">Back to Home</a>
                </div>
            `;
            return;
        }

        // TEXT POPULATION!!!
        document.getElementById('the_Item_Title').textContent = item.title[currentLang];
        let price_Display = {"english": "Contact Us For Details", "georgian": "დეტალებზე დაგვიკავშირდით"}
        document.getElementById('the_Item_Price').textContent = item.price ? item.price : price_Display[currentLang];
        document.title = item.title[currentLang];

        // IMAGE POPULATION!!!
        const mainImage = document.querySelector('.product_Image');
        const selectionPanel = document.querySelector(".image_Selection_Panel");

        if (item.photos && item.photos.length > 0) {
            // Set initial main image view
            mainImage.src = item.photos[0];

            // Create thumbnails
            item.photos.forEach((element, idx) => {
                const newSelection = document.createElement("div");
                newSelection.classList.add("image_Select");
                if (idx === 0) newSelection.classList.add("active_Thumb"); // First one active by default

                const listingImage = document.createElement("img");
                listingImage.className = "item_Image";
                listingImage.src = element;

                newSelection.appendChild(listingImage);
                selectionPanel.appendChild(newSelection);
            });
        }

        //TAG AND SPEC PART!!!

        

        if (item.tags && item.tags.length > 0) {
            console.log(item.tags)
            const tagScroller = document.querySelector(".tag_Scroller");
            item.tags.forEach(tag => {

                if(tag !== "Unavailable") {
                    const newTagElement = document.createElement("div");
                    newTagElement.className = "item_Tag";
                    newTagElement.textContent = tag;
                    tagScroller.appendChild(newTagElement);
                }
            })
        }

        if (item.material) {
            const materialSpecSlot = document.getElementById("#material_Spec");
            
            materialSpecSlot.textContent = item.material[currentLang];
        }

        if (item.dimensions) {
            const dimensionsSpecSlot = document.getElementById("#dimension_Spec");
            
            dimensionsSpecSlot.textContent = item.dimensions;
        }

        // gallery initiation
        initGallery(item.photos);
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });


// Gallery function
const initGallery = (images) => {
    if (!images || images.length === 0) return;

    const thumbnails = document.querySelectorAll('.image_Select');
    const mainImage = document.querySelector('.product_Image');
    const leftArrow = document.querySelector('.image_Sizer .thumbnail_Navigation_Button_Left');
    const rightArrow = document.querySelector('.image_Sizer .thumbnail_Navigation_Button_Right');

    let currentIndex = 0;

    const updateGallery = (index) => {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        currentIndex = index;
        const currentSrc = images[currentIndex];

        mainImage.src = currentSrc;

        const modalImg = document.querySelector('.modal_Expanded_Img');
        if (modalImg) modalImg.src = currentSrc;

        thumbnails.forEach((thumb, idx) => {
            thumb.classList.toggle('active_Thumb', idx === currentIndex);
        });

        const modalThumbBar = document.querySelector('.modal_Thumbnails_Bar');
        if (modalThumbBar) {
            modalThumbBar.querySelectorAll('.modal_Image_Select').forEach((t, i) => {
                t.classList.toggle('active_Thumb', i === currentIndex);
            });
        }
    }

    // Main page thumbnail click events
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateGallery(index));
    });

    // Main page arrow click events
    if (leftArrow) {
        leftArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            updateGallery(currentIndex - 1);
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            updateGallery(currentIndex + 1);
        });
    }

    // Create Modal Lightbox Dynamically
    const modal = document.createElement('div');
    modal.className = 'gallery_Modal';
    modal.innerHTML = `
        <div class="modal_Content_Wrapper">
            <button class="close_Preview_Button" aria-label="Close Preview">
                <img src="../images/close-circle-svgrepo-com.svg" alt="Close" class="close_Button_Image" onerror="this.src='';this.innerText='×';">
            </button>
            <button class="thumbnail_Navigation_Button_Left tnb modal_Left">&#10094;</button>
            <img class="modal_Expanded_Img" src="${images[0]}" alt="Expanded View">
            <button class="thumbnail_Navigation_Button_Right tnb modal_Right">&#10095;</button>
        </div>
        <div class="modal_Thumbnails_Bar"></div>
    `;
    document.body.appendChild(modal);

    const modalThumbBar = modal.querySelector('.modal_Thumbnails_Bar');
    const modalImg = modal.querySelector('.modal_Expanded_Img');
    const closeBtn = modal.querySelector('.close_Preview_Button');
    const modalLeft = modal.querySelector('.modal_Left');
    const modalRight = modal.querySelector('.modal_Right');

    // Populate modal thumbnails
    images.forEach((src, idx) => {
        const mThumb = document.createElement('div');
        mThumb.className = 'modal_Image_Select ' + (idx === 0 ? 'active_Thumb' : '');
        mThumb.innerHTML = `<img src="${src}" alt="" class="modal_Item_Image">`;
        mThumb.addEventListener('click', () => updateGallery(idx));
        modalThumbBar.appendChild(mThumb);
    });

    // Open modal on main image click
    mainImage.style.cursor = 'zoom-in';
    mainImage.addEventListener('click', () => {
        modalImg.src = images[currentIndex];
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal handlers
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Modal arrow navigation handlers
    modalLeft.addEventListener('click', () => updateGallery(currentIndex - 1));
    modalRight.addEventListener('click', () => updateGallery(currentIndex + 1));
}