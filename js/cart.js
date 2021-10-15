// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
    // }
        setTimeout(function() {
            ready()
          }, 500);

function ready() {
    console.log("cartjs")
    var addToCartButtons = document.getElementsByClassName('addTocart')
    console.log("cartlist",addToCartButtons.length,addToCartButtons)
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        console.log("button")
        button.addEventListener('click', addToCartClicked)
    }
    var removeCartItemButtons = document.getElementsByClassName('del-button')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

}



function addToCartClicked(event) {
    var button = event.target
    var product = button.parentElement.parentElement.parentElement
    console.log("pro:", product)
    var title = product.getElementsByTagName('h3')[0].innerHTML
    var price = product.getElementsByClassName('product-price')[0].innerText
    var imageSrc = product.getElementsByClassName('product-header-image')[0].getAttribute("src")
    // console.log("hii",title,price,imageSrc)
    addItemToCart(title, price, imageSrc)
}

var arr =[]
function addItemToCart(title, price, imageSrc) {
    var newItem={
        "title":title,
        "price":price,
        "image":imageSrc
    }
    if(localStorage.getItem('cart')){
        var data=JSON.parse(localStorage.getItem("cart"))
        data.push(newItem)
        localStorage.setItem("cart", JSON.stringify(data));
        console.log("true")
    }else{
        arr.push(newItem)
        console.log("false")
        localStorage.setItem("cart",JSON.stringify(arr))
    }
}
// document.ready(function() {
//     if (window.location.pathname == '/cart.html') {

function setupCart(){
        console.log("cartPage")
        var data=JSON.parse(localStorage.getItem("cart"))
        var cart = document.getElementsByClassName("cart-center")[0]
        var cartHTML=[]
        data.map(item=>{
        cartHTML.push(
            `<div class="product cart-product">
            <div class="product-header">
              <img src=${item.image} alt="product"/>
            </div>
            <div class="product-footer">
              <h3>${item.title}</h3>
              <div class="product-price">
                <h4>${item.price}</h4>
              </div>
            </div>
            <ul>
              <li class="del-button">
                <a href="#">
                  <i onClick=removeCartItem() class="fas fa-trash-alt"></i>
                </a>
              </li>
            </ul>
          </div>`
        )
    })
    console.log("carthtml:",cartHTML)
    cart.innerHTML=cartHTML
}
setTimeout(function() {
    setupCart()
  }, 10);

function removeCartItem(event) {
    console.log("remove")
    var buttonClicked = event.target
    var product = buttonClicked.parentElement.parentElement.parentElement
    console.log("pro:", product)
    var title = product.getElementsByTagName('h3')[0].innerHTML
    var localData = JSON.parse(localStorage.getItem('cart'))
    console.log("localdata:",localData)
    localData = localData.filter(function( obj ) {
        return obj.title !== title;
    });
    // console.log("localdataRM:",localData)
    localStorage.setItem('cart',JSON.stringify(localData))
    
    setupCart()
}