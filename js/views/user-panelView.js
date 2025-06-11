//------------- RENDER PAGES -------------
//------------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
    const studentsSettingsSection = document.getElementById("settingsStudent-view")
    const teachersSettingsSection = document.getElementById("settingsTeacher-view")
    const adminSettingsSection = document.getElementById("settingsAdmin-view")

    //------------- PARAMETERS INFO -------------
    //------------------------------------------------------
    const params = new URLSearchParams(window.location.search)
    if (params.get("page") === "store") {

    }
    if (params.get("page") === "storeCart") {
        storeCartSection.classList.add("active")
        storeCartSection.classList.remove("inactive")
        storeSection.classList.remove("active")
        storeSection.classList.add("inactive")
        storeProductSection.classList.remove("active")
        storeProductSection.classList.add("inactive")
    }

    //------------- PARAMETERS MERCHANDISING -------------
    //------------------------------------------------------
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

    //------------- REDIRECTION INFO -------------
    //------------------------------------------------------
    const aboutUsBtn = document.getElementById("btn-aboutUs-view");
    if (aboutUsBtn) {
        aboutUsBtn.style.display = "block"
        aboutUsBtn.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "info.html?page=AboutUs"
        })
    }

    const faqBtn = document.getElementById("btn-faq-view");
    if (faqBtn) {
        faqBtn.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "info.html?page=FAQ"
        })
    }

    const footerContactsBtn = document.getElementById("footer-link-contacts");
    if (footerContactsBtn) {
        footerContactsBtn.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "info.html?page=Contacts"
        })
    }

    const footerFAQBtn = document.getElementById("footer-link-faq");
    if (footerFAQBtn) {
        footerFAQBtn.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "info.html?page=FAQ"
        })
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

    //------------- REDIRECTION DELETE ACCOUNT -------------
    //------------------------------------------------------
    const deleteAccountButton = document.getElementById("deleteAccountButton-view")
    if (deleteAccountButton) {
        deleteAccountButton.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "info.html?page=deleteAccount"
        })
    }

    const deleteAccountHereButton = document.getElementById("deleteAccountHereButton-view")
    if (deleteAccountHereButton) {
        deleteAccountHereButton.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "info.html?page=deleteAccount"
        })
    }

    

})

