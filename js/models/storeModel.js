//------------------ STORE CLASS ----------------------
//----------------------------------------------------------
class Store{
    productName = ''
    productID= ''
    productQuantity = ''
    productQuality = ''
    productSize = ''
    productColor = ''
    productPrice = ''
    productCoupon = ''
    constructor(productName, productID, productQuantity, productQuality, productSize, productColor, productPrice, productCoupon){
        this.productName = productName
        this.productID = productID
        this.productQuantity = productQuantity
        this.productQuality = productQuality
        this.productSize = productSize
        this.productColor = productColor
        this.productPrice = productPrice
        this.productCoupon = productCoupon
    }
}