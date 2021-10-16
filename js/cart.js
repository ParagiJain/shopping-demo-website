setTimeout(function() {
    ready()
 }, 500);

function ready() {
    var addToCartButtons = document.getElementsByClassName('addTocart')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
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
    var title = product.getElementsByTagName('h3')[0].innerHTML
    var price = product.getElementsByClassName('product-price')[0].innerText
    var imageSrc = product.getElementsByClassName('product-header-image')[0].getAttribute("src")
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
        }else{
        arr.push(newItem)
        localStorage.setItem("cart",JSON.stringify(arr))
    }
}
function setupCart(){
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
    cart.innerHTML=cartHTML
}
setTimeout(function() {
    setupCart()
  }, 10);

function removeCartItem(event) {
    var buttonClicked = event.target
    var product = buttonClicked.parentElement.parentElement.parentElement
    var title = product.getElementsByTagName('h3')[0].innerHTML
    var localData = JSON.parse(localStorage.getItem('cart'))
    localData = localData.filter(function( obj ) {
        return obj.title !== title;
    });
    localStorage.setItem('cart',JSON.stringify(localData))
    
    setupCart()
}