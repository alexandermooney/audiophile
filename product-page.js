const inventory = {
  xx59: {
    cartName: 'XX59',
    price: 899,
  },
  xx99mi: {
    cartName: 'XX99 MK I',
    price: 1750,
  },
  xx99mii: {
    cartName: 'XX99 MK II',
    price: 2999,
  },
  zx9: {
    cartName: 'ZX9',
    price: 4500,
  },
  zx7: {
    cartName: 'ZX7',
    price: 3500,
  },
  yx1: {
    cartName: 'YX1',
    price: 599,
  },
}


const cart = {
  cartDisplay: document.querySelector('.cart-items'),
  removeAllBtn: document.querySelector('.remove-button'),
  cartCount: document.querySelector('.cart-count'),
  totalPrice: document.querySelector('.total-price'),
  createCartItem(name) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item', name, 'flex-flow', 'm-flex-row', 'm-justify-between', 'm-align-center');

    const itemInfo = document.createElement('div');
    itemInfo.classList.add('item-info', 'flex-flow', 'm-align-center', 'm-gap-16');

    const card = document.createElement('div');
    card.classList.add('card');
    itemInfo.append(card);

    const itemNamePrice = document.createElement('div');
    itemNamePrice.classList.add('item-name-price', 'flex-flow', 'm-flex-col');

    const itemName = document.createElement('span');
    itemName.classList.add('cart-item-name');
    itemName.textContent = inventory[name].cartName;
    itemNamePrice.append(itemName);

    const itemPrice = document.createElement('span');
    itemPrice.classList.add('cart-item-price');
    itemPrice.textContent = `$ ${inventory[name].price}`;
    itemNamePrice.append(itemPrice);

    itemInfo.append(itemNamePrice);
    cartItem.append(itemInfo);

    const qty = document.createElement('div');
    qty.classList.add('qty', 'qty-cart');

    const qtyMinus = document.createElement('div');
    qtyMinus.classList.add('qty-minus');
    qtyMinus.textContent = '-';
    qtyMinus.addEventListener('click', () => {
      const cartQtysCopy = JSON.parse(sessionStorage.getItem('cartQtys'));
      if (cartQtysCopy[name] > 0) {
        cartQtysCopy[name]--;
        sessionStorage.setItem('cartQtys', JSON.stringify(cartQtysCopy));
        cart.updateCart();
      }
    });
    qty.append(qtyMinus);

    const qtyNum = document.createElement('div');
    qtyNum.classList.add('qty-num');
    qtyNum.textContent = JSON.parse(sessionStorage.getItem('cartQtys'))[name];
    qty.append(qtyNum);

    const qtyPlus = document.createElement('div');
    qtyPlus.classList.add('qty-plus');
    qtyPlus.textContent = '+';
    qtyPlus.addEventListener('click', () => {
      const cartQtysCopy = JSON.parse(sessionStorage.getItem('cartQtys'));
      cartQtysCopy[name]++;
      sessionStorage.setItem('cartQtys', JSON.stringify(cartQtysCopy));
      cart.updateCart();
    });
    qty.append(qtyPlus);

    cartItem.append(qty);

    return cartItem;
  },
  updateCart() {
    while (cart.cartDisplay.firstChild) {
      cart.cartDisplay.removeChild(cart.cartDisplay.firstChild);
    }
    for (item in JSON.parse(sessionStorage.getItem('cartQtys'))) {
      if (JSON.parse(sessionStorage.getItem('cartQtys'))[item] > 0) {
        cart.cartDisplay.append(cart.createCartItem(item));
      }
    }
    cart.cartCount.textContent = cart.countItems();
    cart.totalPrice.textContent = cart.calculateTotal();
  },
  resetCart() {
    while (cart.cartDisplay.firstChild) {
      cart.cartDisplay.removeChild(cart.cartDisplay.firstChild);
    }
    sessionStorage.setItem('cartQtys', JSON.stringify({
      xx59: 0,
      xx99mi: 0,
      xx99mii: 0,
      zx9: 0,
      zx7: 0,
      yx1: 0,
    }));
    cart.cartCount.textContent = cart.countItems();
    cart.totalPrice.textContent = cart.calculateTotal();
  },
  countItems() {
    let num = 0;
    let current = JSON.parse(sessionStorage.getItem('cartQtys'))
    for (item in current) {
      num += current[item];
    }
    return num;
  },
  calculateTotal() {
    let total = 0;
    let current = JSON.parse(sessionStorage.getItem('cartQtys'))
    for (item in current) {
      total += (current[item] * inventory[item].price);
    }
    return total;
  },
  initialize() {
    if (!sessionStorage.getItem('cartQtys')) {
      cart.resetCart();
    }
    cart.updateCart();
    cart.removeAllBtn.addEventListener('click', cart.resetCart);
  }
}

const product = {
  name: document.querySelector('body').id,
  qtyBtns: document.querySelector('.add-to-cart .qty'),
  addCartBtn: document.querySelector('.add-to-cart button'),
  incrementQty(e) {
    let qtyDisplay = product.qtyBtns.children[1];
    if (e.target.textContent === '-' && product.qty > 1) {
      qtyDisplay.textContent = --product.qty;
    } else if (e.target.textContent === '+') {
      qtyDisplay.textContent = ++product.qty;
    }
  },
  addToCart() {
    const cartQtysCopy = JSON.parse(sessionStorage.getItem('cartQtys'));
    cartQtysCopy[product.name] += product.qty;
    sessionStorage.setItem('cartQtys', JSON.stringify(cartQtysCopy));
    cart.updateCart();
  },
  initialize() {
    product.qty = parseInt(document.querySelector('.add-to-cart .qty-num').textContent)
    product.qtyBtns.addEventListener('click', product.incrementQty);
    product.addCartBtn.addEventListener('click', product.addToCart);
  }
}

if (product.name) {
  product.initialize();
}

cart.initialize();