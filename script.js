const header = {
  hamburger: document.querySelector('.hamburger'),
  cart: document.querySelector('.cart'),
  navMenu: document.querySelector('.nav-2'),
  cartDisplay: document.querySelector('.cart-container'),
  overlay: document.querySelector('.overlay'),
  controls: {
    navOpen: false,
    cartOpen: false,
  },
  hideNavIfDesktop() {
    if (window.innerWidth >= 769) {
      header.hideNavMenu();
      header.hideOverlay();
    }
  },
  toggleNavMenu() {
    if (header.controls.navOpen) {
      header.hideNavMenu();
    } else {
      header.showNavMenu();
    }
    if (header.controls.cartOpen) {
      header.hideCartDisplay();
    }
    header.toggleOverlay();
  },
  showNavMenu() {
    header.controls.navOpen = true;
    header.navMenu.style.transform = 'translateY(0)';
  },
  hideNavMenu() {
    header.controls.navOpen = false;
    header.navMenu.style.transform = 'translateY(-100rem)';
  },
  toggleCartDisplay() {
    if (header.controls.cartOpen) {
      header.hideCartDisplay();
    } else {
      header.showCartDisplay();
    }
    if (header.controls.navOpen) {
      header.hideNavMenu();
    }
    header.toggleOverlay();
  },
  showCartDisplay() {
    header.controls.cartOpen = true;
    header.cartDisplay.style.display = 'flex';
    header.cartDisplay.style.transform = 'translateX(0)';
    setTimeout(() => {
      header.cartDisplay.style.opacity = '1';
    }, 0);
  },
  hideCartDisplay() {
    header.controls.cartOpen = false;
    header.cartDisplay.style.opacity = '0';
    header.cartDisplay.style.transform = 'translateX(30rem)';
    setTimeout(() => {
      header.cartDisplay.style.display = 'none';
    }, 200)
  },
  toggleOverlay() {
    if (header.controls.navOpen || header.controls.cartOpen) {
      header.showOverlay();
    } else {
      header.hideOverlay();
    }
  },
  showOverlay() {
    header.overlay.style.transform = 'translateY(0)';
    header.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  },
  hideOverlay() {
    header.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    setTimeout(() => {
      header.overlay.style.transform = 'translateY(-100rem)';
    }, 200);
  },
  hideAll() {
    header.hideCartDisplay();
    header.hideNavMenu();
    header.hideOverlay();
  },
  initialize() {
    header.hamburger.addEventListener('click', header.toggleNavMenu);
    header.cart.addEventListener('click', header.toggleCartDisplay);
    header.overlay.addEventListener('click', header.hideAll);
    window.addEventListener('resize', header.hideNavIfDesktop);
  },
}

header.initialize();