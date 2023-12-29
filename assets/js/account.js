// DOM INPUTS
let uplodImg = document.querySelector(".imgFile"),
  cpTitle = document.querySelector(".cp_title"),
  cpDesc = document.querySelector(".cp_desc"),
  cpPrice = document.querySelector(".cp_price"),
  selectCategory = document.querySelector("#category");
// DOM DIV
let imgDiv = document.querySelector(".item img"),
  InfoTitle = document.querySelector(".item-info-title"),
  InfoDesc = document.querySelector(".item-info-desc"),
  InfoPrice = document.querySelector(".item-options"),
  cpForm = document.querySelector(".add_product form");
// DOM DIV
let createBtn = document.querySelector("._btns .create"),
  resetBtn = document.querySelector("._btns .reset");
// DB
let productsFromDB = JSON.parse(localStorage.getItem("ProductsDB"));

// Form Submit
cpForm.addEventListener("submit", (e) => e.preventDefault());
createBtn.addEventListener("click", createProduct);
resetBtn.addEventListener("click", resetForm);

// set Product img =========================================
let productImgURL;
uplodImg.addEventListener("change", imgUplod);
function imgUplod() {
  let acceptTYPE = ["image/jpeg", "image/jpg", "image/png"];
  let file = this.files[0];
  if (acceptTYPE.indexOf(file.type) == -1) {
    alert("type img not accepted!");
    return;
  }
  imgBase64(file);
  // // let productImgURL = URL.createObjectURL(file);
}
function imgBase64(file) {
  let fReader = new FileReader();
  fReader.readAsDataURL(file);
  fReader.onload = () => {
    productImgURL = fReader.result;
    imgDiv.src = productImgURL;
  };
  fReader.onerror = () => alert("error");
}
// set Product img =========================================

// set title
let productTitle;
cpTitle.addEventListener("keyup", () => {
  productTitle = cpTitle.value;
  InfoTitle.innerHTML = productTitle.toUpperCase();
});

// set description
let productDesc;
cpDesc.addEventListener("keyup", () => {
  productDesc = cpDesc.value;
  InfoDesc.innerHTML = productDesc;
});

// set Price
let productPrice;
cpPrice.addEventListener("keyup", setPrice);
function setPrice() {
  productPrice = cpPrice.value;
  InfoPrice.innerHTML = `
    <span>${productPrice} Dh</span>
    <div class="btns">
      <button class="btn item-options-toCard">Add to card</button>
      <button class="btn item-options-toFavorit">
        <i class="fas fa-heart"></i>
      </button>
    </div>
  `;
}

// select Category
let productCategory;
category.addEventListener("change", () => (productCategory = category.value));

// create product function
function createProduct(e) {
  e.preventDefault();
  if (productImgURL) {
    if (productTitle && productDesc) {
      if (productPrice) {
        if (productCategory) {
          newItem = {
            id: productsFromDB.length + 1 || 1,
            imgUrl: productImgURL,
            title: productTitle,
            price: productPrice,
            desc: productDesc,
            category: productCategory,
            count: 1,
            favorite: "",
          };
          //   productsFromDB.push(newItem);
          productsFromDB = productsFromDB
            ? [...productsFromDB, newItem]
            : [newItem];
          localStorage.setItem("ProductsDB", JSON.stringify(productsFromDB));

          alert("product created!");

          // empty inputs
          cpTitle.value = "";
          cpDesc.value = "";
          cpPrice.value = "";
          selectCategory.value = "";

          // empty card
          imgDiv.src = "";
          InfoTitle.innerHTML = "";
          InfoDesc.innerHTML = "";
          InfoPrice.innerHTML = "";
        } else alert("category error!");
      } else alert("price error!");
    } else alert("info error!");
  } else alert("img error!");
}

// reset Form
function resetForm(e) {
  e.preventDefault();
  // reset inputs
  cpTitle.value = "";
  cpDesc.value = "";
  cpPrice.value = "";
  selectCategory.value = "";

  // reset card
  imgDiv.src = "";
  InfoTitle.innerHTML = "";
  InfoDesc.innerHTML = "";
  InfoPrice.innerHTML = "";
}
