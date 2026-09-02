document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.image_Select');
    const mainImage = document.querySelector('.product_Image');
    const leftArrow = document.querySelector('.image_Sizer .thumbnail_Navigation_Button_Left');
    const rightArrow = document.querySelector('.image_Sizer .thumbnail_Navigation_Button_Right');

    if (!thumbnails.length || !mainImage) return;

    // Collect image sources
    const images = Array.from(thumbnails).map(thumb => {
        const img = thumb.querySelector('.item_Image');
        return img ? img.src : '';
    });

    let currentIndex = 0;

    const updateGallery = (index) => {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        currentIndex = index;
        const currentSrc = images[currentIndex];

        // Update main view
        mainImage.src = currentSrc;

        // An edge case scenario when the update happens during when modal is active. THis updates the modal pic.
        const modalImg = document.querySelector('.modal_Expanded_Img');
        if (modalImg) modalImg.src = currentSrc;

        // 3. Sync main thumbnails active state
        thumbnails.forEach((thumb, idx) => {
            thumb.classList.toggle('active_Thumb', idx === currentIndex);
        });

        // 4. Sync modal thumbnails active state
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

    // Create Modal Lightbox Dynamically with your close button markup
    const modal = document.createElement('div');
    modal.className = 'gallery_Modal';
    modal.innerHTML = `
        <div class="modal_Content_Wrapper">
            <button class="close_Preview_Button" aria-label="Close Preview">
                <img src="../images/close-circle-svgrepo-com.svg" alt="Close" class="close_Button_Image" onerror="this.src='';this.innerText='×';">
            </button>
            <button class="thumbnail_Navigation_Button_Left tnb modal_Left">&#10094;</button>
            <img class="modal_Expanded_Img" src="" alt="Expanded View">
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
});