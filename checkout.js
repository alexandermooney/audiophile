const emoneyInfo = document.querySelector('.form-emoney-info');
const codInfo = document.querySelector('.cod-info');

const emoneyBtn = document.querySelector('#eMoney');
const codBtn = document.querySelector('#cashOnDelivery');

emoneyBtn.addEventListener('click', () => {
  emoneyInfo.style.display = 'grid';
  codInfo.style.display = 'none';
});

codBtn.addEventListener('click', () => {
  emoneyInfo.style.display = 'none';
  codInfo.style.display = 'grid';
});

const summary = {
  summaryDisplay: document.querySelector('.summary-cart'),
  totalDisplay: document.querySelector('#summaryTotal'),
  vatDisplay: document.querySelector('#summaryVAT'),
  grandDisplay: document.querySelector('#summaryGrand'),
  totalPrice: 0,
  vatPrice: 0,
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

    const qtyNum = document.createElement('div');
    qtyNum.classList.add('qty-num');
    qtyNum.textContent = `x${JSON.parse(sessionStorage.getItem('cartQtys'))[name]}`;
    qty.append(qtyNum);

    cartItem.append(qty);

    return cartItem;
  },
  updateSummary() {
    for (item in JSON.parse(sessionStorage.getItem('cartQtys'))) {
      if (JSON.parse(sessionStorage.getItem('cartQtys'))[item] > 0) {
        summary.summaryDisplay.append(summary.createCartItem(item));
      }
    }
    cart.totalPrice.textContent = summary.calculateTotal();
  },
  calculateTotal() {
    let total = 0;
    let current = JSON.parse(sessionStorage.getItem('cartQtys'))
    for (item in current) {
      total += (current[item] * inventory[item].price);
    }
    return total;
  },
  calculateVAT() {
    let vatTotal = Math.floor(summary.calculateTotal() * .2);
    return vatTotal;
  },
  initialize() {
    summary.updateSummary();
    summary.totalPrice = summary.calculateTotal();
    summary.vatPrice = summary.calculateVAT();
    summary.totalDisplay.textContent = `$${summary.totalPrice + summary.vatPrice}`;
    summary.vatDisplay.textContent = `$${summary.vatPrice}`;
    summary.grandDisplay.textContent = `$${summary.totalPrice + summary.vatPrice + 50}`
  }
}

summary.initialize();