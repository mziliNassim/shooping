// Define Products
productsAll = [
  {
    id: 1,
    imgUrl: "./assets/img/jacket-5.jpg",
    title: "jacket-5",
    price: "250",
    desc: "1Lorem ipsum dolor sit amet consectetur adipisicing.",
    category: "men",
    count: 1,
    favorite: "",
  },
  {
    id: 2,
    imgUrl: "./assets/img/t-short.jpg",
    title: "t-short",
    price: "300",
    desc: "2Lorem ipsum dolor sit amet consectetur adipisicing.",
    category: "babys",
    count: 1,
    favorite: "",
  },
  {
    id: 3,
    imgUrl: "./assets/img/perfume.jpg",
    title: "perfume",
    price: "120",
    desc: "3Lorem ipsum dolor sit amet consectetur adipisicing.",
    category: "women",
    count: 1,
    favorite: "",
  },
  {
    id: 4,
    imgUrl: "./assets/img/shirt-1.jpg",
    title: "shirt-1",
    price: "150",
    desc: "4Lorem ipsum dolor sit amet consectetur adipisicing.",
    category: "men",
    count: 1,
    favorite: "",
  },
  {
    id: 5,
    imgUrl: "./assets/img/shampoo.jpg",
    title: "shampoo",
    price: "120",
    desc: "5Lorem ipsum dolor sit amet consectetur adipisicing.",
    category: "women",
    count: 1,
    favorite: "",
  },
  {
    id: 6,
    imgUrl: "./assets/img/sport shoes.jpg",
    title: "sport shoes",
    price: "50",
    desc: "6Lorem ipsum dolor sit amet consectetur adipisicing.",
    category: "men",
    count: 1,
    favorite: "",
  },
  {
    id: 7,
    imgUrl: "./assets/img/old watch.jpg",
    title: "old watch",
    price: "120",
    desc: "7Lorem ipsum dolor sit amet consectetur adipisicing.",
    category: "men",
    count: 1,
    favorite: "",
  },
  {
    id: 8,
    imgUrl: "./assets/img/watch.jpg",
    title: "watch",
    price: "50",
    desc: "8Lorem ipsum dolor sit amet consectetur adipisicing.",
    category: "women",
    count: 1,
    favorite: "",
  },
];

(function pushDATA() {
  let data = localStorage.getItem("ProductsDB")
    ? localStorage.getItem("ProductsDB")
    : JSON.stringify(productsAll);

  localStorage.setItem("ProductsDB", data);
})();
