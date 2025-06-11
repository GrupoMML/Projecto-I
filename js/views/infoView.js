//------------- RENDER PAGES -------------
//------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const aboutUsSection = document.getElementById("aboutUs-view")
    const contactsSection = document.getElementById("contacts-view")
    const FAQSection = document.getElementById("faq-view")

    const footerContactLink = document.getElementById("footer-link-contacts")
    const footerFAQLink = document.getElementById("footer-link-faq")

    const clickHereButton = document.getElementById("contacts-view-ref-btn")
    const buttonAboutUs = document.getElementById("btn-aboutUs-view")
    const buttonFAQ = document.getElementById("btn-faq-view")

    buttonAboutUs.addEventListener("click", event =>{
    event.preventDefault()
        aboutUsSection.classList.add("active")
        aboutUsSection.classList.remove("inactive")
        contactsSection.classList.add("inactive")
        contactsSection.classList.remove("active")
        FAQSection.classList.add("inactive")
        FAQSection.classList.remove("active")
        buttonAboutUs.classList.remove("active")
    })

    footerContactLink.addEventListener("click", event => {
        event.preventDefault()
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        contactsSection.classList.add("active")
        contactsSection.classList.remove("inactive")
        FAQSection.classList.add("inactive")
        buttonAboutUs.classList.add("active")
    })
    
    clickHereButton.addEventListener("click", event => {
        event.preventDefault()
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        contactsSection.classList.add("active")
        contactsSection.classList.remove("inactive")
        FAQSection.classList.add("inactive")
        buttonAboutUs.classList.add("active")
    })

    buttonFAQ.addEventListener("click", event =>{
        event.preventDefault()
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        FAQSection.classList.add("active")
        FAQSection.classList.remove("inactive")
        contactsSection.classList.add("inactive")
        buttonAboutUs.classList.add("active")
    })

    footerFAQLink.addEventListener("click", event => {
        event.preventDefault()
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        FAQSection.classList.add("active")
        FAQSection.classList.remove("inactive")
        contactsSection.classList.add("inactive")
        buttonAboutUs.classList.add("active")
    })

    //------------- PARAMETERS MERCHANDISING -------------
    //------------------------------------------------------
    const params = new URLSearchParams(window.location.search)
    if (params.get("page") === "AboutUs") {
        
    }
    if (params.get("page") === "FAQ") {
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        FAQSection.classList.add("active")
        FAQSection.classList.remove("inactive")
        contactsSection.classList.add("inactive")
        buttonAboutUs.classList.add("active")
    }
    if (params.get("page") === "Contacts") {
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        contactsSection.classList.add("active")
        contactsSection.classList.remove("inactive")
        FAQSection.classList.add("inactive")
        buttonAboutUs.classList.add("active")
    }
    if (params.get("page") === "FAQ") {
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        FAQSection.classList.add("active")
        FAQSection.classList.remove("inactive")
        contactsSection.classList.add("inactive")
        buttonAboutUs.classList.add("active")
    }

    //------------- PARAMETERS ACCOUNT -------------
    //------------------------------------------------------
    /* if (params.get("page") === "store") {

    }
    if (params.get("page") === "storeCart") {
        storeCartSection.classList.add("active")
        storeCartSection.classList.remove("inactive")
        storeSection.classList.remove("active")
        storeSection.classList.add("inactive")
        storeProductSection.classList.remove("active")
        storeProductSection.classList.add("inactive")
    } */

    //------------- REDIRECTION MERCHANDISING -------------
    //------------------------------------------------------
    const storeBtn = document.getElementById("btn-store-view");
    if (storeBtn) {
        storeBtn.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "merchandising.html?page=store"
        })
    }

    const cartBtn = document.getElementById("btn-cart-view")
    if (cartBtn) {
        cartBtn.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "merchandising.html?page=storeCart"
        })
    }

    const footerStoreBtn = document.getElementById("footer-link-store")
    if (footerStoreBtn) {
        footerStoreBtn.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "merchandising.html?page=store"
        })
    }

    //------------- REDIRECTION ACCOUNT -------------
    //------------------------------------------------------
/*     const aboutUsBtn = document.getElementById("btn-aboutUs-view");
    if (aboutUsBtn) {
        aboutUsBtn.style.display = "block"
        aboutUsBtn.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "info.html?page=AboutUs"
        })
    } */
})

    



