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

    buttonAboutUs.addEventListener("click", event =>{
    event.preventDefault()
        aboutUsSection.classList.add("active")
        aboutUsSection.classList.remove("inactive")
        contactsSection.classList.add("inactive")
        contactsSection.classList.remove("active")
        FAQSection.classList.add("inactive")
        FAQSection.classList.remove("active")
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

    footerFAQLink.addEventListener("click", event => {
        event.preventDefault()
        aboutUsSection.classList.add("inactive")
        aboutUsSection.classList.remove("active")
        FAQSection.classList.add("active")
        FAQSection.classList.remove("inactive")
        contactsSection.classList.add("inactive")
        buttonAboutUs.classList.add("active")
    })
})



