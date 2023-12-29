// All product from DB
let productsFromDB = JSON.parse(localStorage.getItem("ProductsDB")) || data;

// DOM
let user = document.querySelector(".user_eara"),
  itemsBox = document.querySelector("#products .items"),
  notification = document.querySelector(".notification");

// check if user login
function isUserLogin() {
  if (localStorage.getItem("username")) {
    return true;
  }
  return false;
}

// function loop Product && inset in index.html
let setProductsUI;
(setProductsUI = function (products = []) {
  itemsBox.innerHTML = "";
  productsUI = products.map((item) => {
    return `
      <div class="item showtransition">
        <a onclick='saveItemClicked(${item.id})'>
          <img src="${item.imgUrl}" alt="${item.title}" class="item-img" />

          <div class="item-info">
              <h3 class="item-info-title">${item.title.toUpperCase()}</h3>
              <p class="item-info-desc">${item.desc}</p>
          </div>
        </a>
        <div class="item-options">
            <span>${item.price} Dh</span>
            <div class="btns">
              <button class="btn item-options-toCard" onclick="addItemToCard(${
                item.id
              })">Add to card</button>
              <button 
                class="btn item-options-toFavorit ${item.favorite}" 
                onclick="addItemToFavorite(${item.id})">
                <i class='fas fa-heart'></i>
              </button>
            </div>
        </div>
      </div>
    `;
  });
  itemsBox.innerHTML += productsUI.join("");
})(productsFromDB);

// add items from localstorage to card if exist
let itemsInCard = localStorage.getItem("productInCard")
  ? JSON.parse(localStorage.getItem("productInCard"))
  : [];
let setExistProduct;
(setExistProduct = function () {
  // cardItems.innerHTML += ''
  if (itemsInCard) {
    itemsInCard.map((item) => {
      cardItems.innerHTML += `
        <li class="card-items__item">
            <div class="card-items__img">
                <img src="${item.imgUrl}" alt="${item.title}">
            </div>

            <div class="card-items__info">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
            </div>
            
            <div class="card-items__actions">
                <h6><span>(X${item.count}) </span>  ${item.price} Dh</h6>
                <button class="btn deletBtn">Delete</button>
            </div>
        </li>
      `;
      notification.innerHTML = itemsInCard.length;
      notification.style.display = "block";
    });
  }
})();

// add item to card
function addItemToCard(id) {
  if (isUserLogin()) {
    let clickedItem = productsFromDB.find((item) => item.id === id);

    // is clicked item alredy exist in card 'DB'
    let isItemInCard = itemsInCard.some((item) => item.id == clickedItem.id);
    if (isItemInCard) {
      // clicked item exist in card 'DB'
      itemsInCard = itemsInCard.map((item) => {
        if (item.id === clickedItem.id) item.count += 1;
        return item;
      });
    } else {
      // clicked item don't exist in card 'DB'
      itemsInCard.push(clickedItem);
    }

    // set Exist Product in card 'DB' to card 'UI'
    cardItems.innerHTML = "";
    itemsInCard.forEach((item) => {
      cardItems.innerHTML += `
        <li class="card-items__item">
          <div class="card-items__img">
            <img src="${item.imgUrl}" alt="${item.title}">
          </div>
          <div class="card-items__info">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
          </div>
          <div class="card-items__actions">
            <h6><span>(X${item.count}) </span>  ${item.price} Dh</h6>
            <button class="btn deletBtn">Delete</button>
          </div>
        </li>
      `;
    });
    cardItems.innerHTML += `
      <li class="card-items__item">
        <a href="./card.html">Show all my Products</a>
      </li>
    `;

    // save card in 'DB'
    localStorage.setItem("productInCard", JSON.stringify(itemsInCard));

    // notification
    notification.style.display = "block";
    notification.innerHTML = itemsInCard.length;
  } else {
    window.location = "./login.html";
  }
}

// save '_id_' of item ckicked in localstorage for __productInfo page
function saveItemClicked(id) {
  localStorage.setItem("idClickdItem", id);
  window.location = "./cardInfo.html";
}

// search
let searchInput = document.querySelector("#shearch");
searchInput.addEventListener("keyup", search);
function search(e) {
  itemsBox.innerHTML = "";
  if (searchInput.value.trim() == "") {
    setProductsUI(productsFromDB);
  } else {
    let searchItems = productsFromDB.filter(
      (item) =>
        item.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) !==
          -1 || //search by name
        item.desc.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1 //search by desc
    );
    setProductsUI(searchItems);
  }
}

// Add to favorite
let itemListeFavorite = localStorage.getItem("FavoritDB")
  ? localStorage.getItem("FavoritDB")
  : "[]";
let hartIcon = document.querySelectorAll(".item-options-toFavorit");
itemListeFavorite = JSON.parse(itemListeFavorite);
function addItemToFavorite(id) {
  if (isUserLogin()) {
    // get clicked item from productsDB
    let clickedItem = productsFromDB.find((item) => item.id === id); // {clicked item}

    // index of clicked Item in 'ProductsDB'
    let indexPR = productsFromDB.findIndex((ele) => ele.id === id);

    // chek if cklicked item exist in favorit array
    let chekedFavorite = itemListeFavorite.find(
      (item) => item.id === clickedItem.id
    );

    // chek if cklicked item exist in favorit array
    let chekedCard = itemsInCard.find((item) => item.id === clickedItem.id);
    if (chekedFavorite) {
      // favorite array
      let indexFav = itemListeFavorite.findIndex(
        (item) => item.id === chekedFavorite.id
      );
      itemListeFavorite[indexFav].favorite = "";
      itemListeFavorite.splice(indexFav, 1);

      // card array
      if (chekedCard) {
        // index of clicked Item in 'itemsInCard_DB'
        let indexIC = itemsInCard.findIndex((ele) => ele.id === id);
        itemsInCard[indexIC].favorite = "";
      }

      // change favorite value in 'ProductsDB'
      productsFromDB[indexPR].favorite = "";
    } else {
      clickedItem.favorite = "active";
      itemListeFavorite = [...itemListeFavorite, clickedItem];
      
      // card array
      if (chekedCard) {
        // index of clicked Item in 'itemsInCard_DB'
        let indexIC = itemsInCard.findIndex((ele) => ele.id === id);
        itemsInCard[indexIC].favorite = "active";
      }

      // change favorite value in 'ProductsDB'
      productsFromDB[indexPR].favorite = "active";
    }

    localStorage.setItem("FavoritDB", JSON.stringify(itemListeFavorite));
    localStorage.setItem("productInCard", JSON.stringify(itemsInCard));
    localStorage.setItem("ProductsDB", JSON.stringify(productsFromDB));
    setProductsUI(productsFromDB);
  } else {
    window.location = "./login.html";
  }
}

// category
let categoryDOM = document.querySelectorAll(".category li");
function matchCategory(key) {
  let itemMatchCategory;
  if (key !== "all") {
    categoryDOM.forEach((ele) => ele.classList.remove("active"));
    categoryDOM.forEach((cat) => {
      if (cat.innerHTML === key) {
        cat.classList.add("active");
      }
    });
    itemMatchCategory = productsFromDB.filter(
      (items) => items.category === key
    );
    itemsBox.innerHTML = "";
    setProductsUI(itemMatchCategory);
  } else setProductsUI(productsFromDB);
}
