//------------- RENDER PAGES -------------
//------------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
    const storeSection = document.getElementById("store-view")
    const storeCartSection = document.getElementById("cart-view")
    const storeProductSection = document.getElementById("product-view")

    const storeCartButton = document.getElementById("store-cart-button-view")
    const seeMoreButton = document.getElementById("seeMoreButton-view") 
    const productsImageButton = document.getElementById("store-products-image-button")

    storeCartButton.addEventListener("click", event => {
        event.preventDefault()
        storeCartSection.classList.add("active")
        storeCartSection.classList.remove("inactive")
        storeSection.classList.remove("active")
        storeSection.classList.add("inactive")
        storeProductSection.classList.remove("active")
        storeProductSection.classList.add("inactive")
    })

    seeMoreButton.addEventListener("click", event => {
        event.preventDefault()
        storeSection.classList.add("active")
        storeSection.classList.remove("inactive")
        storeCartSection.classList.remove("active")
        storeCartSection.classList.add("inactive")
        storeProductSection.classList.remove("active")
        storeProductSection.classList.add("inactive")
    })

    productsImageButton.addEventListener("click", event => {
        event.preventDefault()
        storeProductSection.classList.add("active")
        storeProductSection.classList.remove("inactive")
        storeSection.classList.remove("active")
        storeSection.classList.add("inactive")
        storeCartSection.classList.remove("active")
        storeCartSection.classList.add("inactive")
    })
})


