

const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");


const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});
/*

Crear un carrito que cumpla con los siguientes criterios
1. incrementar o disminuir la cantidad de productos en el carrito.
2. manejar un stock si el producto tiene un stock de 5 unidades no dejará agregar más de 6 unidades del mismo producto.
3. descontar del stock, si la compra de un producto con un stock de 5 unidades es de 3, el stock de ese producto deberá ser ahora de 2.
4. persistencia de datos usando local storage.

*/


const cart = document.querySelector(".cart");
const cartItems = document.querySelector(".cartItems");
const cartTotal = document.querySelector(".cartTotal");
const cartButton = document.querySelector(".cartButton");
const cartContent = document.querySelector(".cartContent");
const cartOverlay = document.querySelector(".cartOverlay");
const cartClose = document.querySelector(".cartClose");


let cartItemsArray = [];


cartButton.addEventListener("click", () => {
    cart.style.display = "flex";
    }
);

// Create a function that adds an item to the cart
function addItemToCart(id, title, price, color, size) {
    const item = {
        id,
        title,
        price,
        color,
        size,
    };
    cartItemsArray.push(item);
    cartItems.textContent = cartItemsArray.length;
    cartTotal.textContent = "$" + cartItemsArray.reduce((acc, item) => acc + item.price, 0);
    cartContent.innerHTML = "";
    cartItemsArray.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cartItem");
        itemElement.innerHTML = `
        <img src="${item.color.img}" alt="">
        <div>
            <h4>${item.title}</h4>
            <h4>${item.size}</h4>
            <h4>$${item.price}</h4>
        </div>
        `;
        cartContent.appendChild(itemElement);
    });
    }
    // Create a function that removes an item from the cart
    function removeItemFromCart(id) {
        cartItemsArray = cartItemsArray.filter((item) => item.id !== id);
        cartItems.textContent = cartItemsArray.length;
        cartTotal.textContent = "$" + cartItemsArray.reduce((acc, item) => acc + item.price, 0);
        cartContent.innerHTML = "";
        cartItemsArray.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cartItem");
            itemElement.innerHTML = `
            <img src="${item.color.img}" alt="">
            <div>
                <h4>${item.title}</h4>
                <h4>${item.size}</h4>
                <h4>$${item.price}</h4>
            </div>
            `;
            cartContent.appendChild(itemElement);
        });
    }

    // Create a function that clears the cart
    function clearCart() {
        cartItemsArray = [];
        cartItems.textContent = cartItemsArray.length;
        cartTotal.textContent = "$" + cartItemsArray.reduce((acc, item) => acc + item.price, 0);
        cartContent.innerHTML = "";
    }

    // Create a function that shows the cart
    