const previewButtons = Array.from(document.querySelectorAll(".zoom_Button generic_Button"));



const previewButtonsAssignment = () => {

    previewButtons.forEach((button) => {

        button.addEventListener("click", addButtonFunctionality)
    })
}