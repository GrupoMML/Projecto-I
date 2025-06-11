//------------- RENDER PAGES -------------
//------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const aboutUsSection = document.getElementById("aboutUs-view")
    const contactsSection = document.getElementById("contacts-view")
    const FAQSection = document.getElementById("faq-view")
    const deleteAccountSection = document.getElementById("deleteAccount-view")
    const deleteAccountOverlaySection = document.getElementById("delA_overlay-view")

    const footerContactLink = document.getElementById("footer-link-contacts")
    const footerFAQLink = document.getElementById("footer-link-faq")

    const clickHereButton = document.getElementById("contacts-view-ref-btn")
    const buttonAboutUs = document.getElementById("btn-aboutUs-view")
    const buttonFAQ = document.getElementById("btn-faq-view")
    const deleteAccountOverlayButton = document.getElementById("delA_overlayButton-view")

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
        deleteAccountSection.classList.add("inactive")
        deleteAccountSection.classList.remove("active")
        deleteAccountOverlaySection.classList.add("inactive")
        deleteAccountOverlaySection.classList.remove("active")
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
        deleteAccountSection.classList.add("inactive")
        deleteAccountSection.classList.remove("active")
        deleteAccountOverlaySection.classList.add("inactive")
        deleteAccountOverlaySection.classList.remove("active")
    })

    deleteAccountOverlayButton.addEventListener("click", event => {
        event.preventDefault()
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        FAQSection.classList.add("inactive")
        FAQSection.classList.remove("active")
        contactsSection.classList.add("inactive")
        deleteAccountSection.classList.add("inactive")
        deleteAccountSection.classList.remove("active")
        deleteAccountOverlaySection.classList.add("active")
        deleteAccountOverlaySection.classList.remove("inactive")
        buttonAboutUs.classList.add("inactive")
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
    if (params.get("page") === "deleteAccount") {
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        FAQSection.classList.add("inactive")
        FAQSection.classList.remove("active")
        contactsSection.classList.add("inactive")
        contactsSection.classList.remove("active")
        deleteAccountSection.classList.add("active")
        deleteAccountSection.classList.remove("inactive")
        buttonAboutUs.classList.add("active")
    }

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

    //------------- REDIRECTION  -------------
    //------------------------------------------------------
    
    

})

    



