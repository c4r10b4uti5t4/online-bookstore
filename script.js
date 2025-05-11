let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart() {
  const select = document.getElementById("bookSelect");
  const value = select.value;
  if (!value) return;

  const [title, price] = value.split("|");
  cart.push({ title, price: parseFloat(price) });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${title} added to cart.`);
}

function loadCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - ₱${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  totalPriceEl.textContent = `Total Price: ₱${total}`;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let summary = "You have ordered:\n";
  cart.forEach(item => {
    summary += `- ${item.title} (₱${item.price})\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  summary += `Total Price: ₱${total}`;

  alert(summary);
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

window.onload = loadCart;
