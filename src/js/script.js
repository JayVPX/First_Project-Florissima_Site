//Dark mode

let trilho = document.getElementById("trilho");
let body = document.querySelector("body");
let sliderDark = document.getElementById("slider");

trilho.addEventListener("click", () => {
  trilho.classList.toggle("dark");
  body.classList.toggle("dark");
  sliderDark.classList.toggle("dark");
});

//Font Size
let zoom = document.querySelector("html");

function fontZoom() {
  zoom.classList.toggle("zoom");
}

//Switch Language
let usa = document.getElementById("usa");
let brazil = document.getElementById("brazil");

usa.addEventListener("click", selectedUsa);
brazil.addEventListener("click", selectedBrazil);

function selectedUsa() {
  usa.classList.toggle("selected-usa");
  brazil.classList.toggle("selected-usa");
}

function selectedBrazil() {
  brazil.classList.toggle("selected-brazil");
  usa.classList.toggle("selected-brazil");
}

//CARRINHO
//Carrinho

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = parseFloat(localStorage.getItem("cartTotal")) || 0;

document.querySelectorAll(".cart-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const productName = e.target.getAttribute("data-name");
    const productPrice = parseFloat(e.target.getAttribute("data-price"));

    if (isNaN(productPrice))
      return console.error(
        "Preço inválido:",
        e.target.getAttribute("data-price")
      );
    cart.push({ product: productName, price: productPrice });
    total += productPrice;
    updateCart();
    saveCartToLocalStorage();
    Toastify({
      text: `${productName} foi adicionado no carrinho com sucesso!`,
      duration: 2000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#877458",
      },
    }).showToast();
  });
});

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.product} - R$ ${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

function toggleCart(value) {
  const cartElement = document.getElementById("modal-background-cart");
  if (value) return (cartElement.style.display = "flex");
  cartElement.style.display = "none";
}

function clearCart() {
  cart = [];
  total = 0;
  updateCart();
  saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cartTotal", total.toFixed(2));
}

function checkout() {
  window.location.href = "/Branchs/checkout.html";
}

//Product Preview

let previewContainer = document.querySelector(".products-preview");
let previewBox = previewContainer.querySelectorAll(".preview");

document.querySelectorAll(".product-container .products").forEach((product) => {
  product.onclick = () => {
    previewContainer.style.display = "flex";
    let name = product.getAttribute("data-name");

    previewBox.forEach((preview) => {
      let target = preview.getAttribute("data-target");
      if (name === target) {
        preview.classList.add("previewActive");
      }
    });
  };
});

previewBox.forEach((close) => {
  close.querySelector(".fa-times").onclick = () => {
    close.classList.remove("previewActive");
    previewContainer.style.display = "none";
  };
});

//Filter Script
function filterElements(category) {
  const elements = document.querySelectorAll(".products");

  elements.forEach((element) => {
    element.classList.remove("filter-show");
    if (category === "Todos" || element.classList.contains(category)) {
      element.classList.add("filter-show");
    }
  });
}

//Slider

const slider = document.querySelectorAll(".banners-img");
const btnPrev = document.getElementById("prev-button");
const btnNext = document.getElementById("next-button");

let currentSlide = 0;

function hideSlider() {
  slider.forEach((item) => item.classList.remove("on"));
}

function showSlider() {
  slider[currentSlide].classList.add("on");
}

function nextSlider() {
  hideSlider();
  if (currentSlide === slider.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  showSlider();
}

function prevSlider() {
  hideSlider();
  if (currentSlide === 0) {
    currentSlide = slider.length - 1;
  } else {
    currentSlide--;
  }
  showSlider();
}

//CHATBOT

let chatbotBody = document.getElementById("chatbot");
let chatbotIcon = document.getElementById("chatbot-icon");

function showChatBot() {
  chatbotBody.classList.toggle("showChatbot");
  chatbotIcon.classList.toggle("showChatbot");
}
