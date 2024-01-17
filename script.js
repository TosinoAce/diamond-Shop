let listProductHTML = document.querySelector(".itemsContainer");

const navItems = document.querySelectorAll(".navItem");

function onItemClick(index) {
  return function () {
    const currentNav = navItems[index];
    navItems.forEach((item) => {
      item.classList.remove("active");
    });
    currentNav.classList.add("active");
  };
}
navItems.forEach((item, index) => {
  item.addEventListener("click", onItemClick(index));
});

const categoryItems = document.querySelectorAll(".categoryItem");

function onItemClick2(index) {
  return function () {
    const currentCategory = categoryItems[index];
    categoryItems.forEach((cat) => {
      cat.classList.remove("open");
    });
    currentCategory.classList.add("open");
  };
}
categoryItems.forEach((cat, index) => {
  cat.addEventListener("click", onItemClick2(index));
});

const cart = document.getElementById("cart");
const cartMenu = document.getElementById("cartContainer");
const close = document.getElementById("Close");

cart.addEventListener("click", () => {
  cartMenu.classList.add("opened");
});
close.addEventListener("click", () => {
  cartMenu.classList.remove("opened");
});

let products = [];

const addDataToHTML = () => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;

      let productID = product.id.toString();
      newProduct.classList.add("filter-project-item");
      newProduct.setAttribute("data-project", product.attribute);
      newProduct.innerHTML = `<img src="${product.image}" alt="diamond" />
              <h3>${product.name} <br />${product.carat}</h3>
              <span class="cost">$${product.price}</span>
              <button class="cart checkbox" id="${"clickToCheck" + productID}">
                <span class="unchecked" id="${
                  "unchecked" + productID
                }"> Add To Cart </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-clockwise loading hidden"
                  id="${"loading" + productID}"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                  />
                  <path
                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"
                  />
                </svg>
                <span class="checked hidden" id="${
                  "checked" + productID
                }">Added to cart</span>
              </button>`;
      listProductHTML.appendChild(newProduct);
      const buttons = document.querySelectorAll(".checkbox"); //get all button

      // Add click event listener to each button

      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
          const btnIndex = index + 1;
          const activeBtn = btnIndex.toString();
          const indexAsString = productID; //covert each button index posit to string
          const activated = indexAsString; //saving what index is gotten upon click

          // use index position plus id name to get svgs inside each button //

          const checkBox = document.querySelector("#clickToCheck" + activeBtn);
          const uncheckedBox = checkBox.querySelector("#unchecked" + activated);
          const loading = checkBox.querySelector("#loading" + activated);
          const checkedBox = checkBox.querySelector("#checked" + activated);

          // create a class of clicked //

          const clicked = "clicked";

          // button animation Js    //

          let itisDone = checkBox.classList.contains(clicked);

          if (itisDone) {
            checkedBox.classList.add("hidden");
            loading.classList.remove("hidden");
            setTimeout(() => {
              loading.classList.add("hidden");
              uncheckedBox.classList.remove("hidden");
            }, 1000);
            checkBox.classList.remove("clicked");
          } else {
            uncheckedBox.classList.add("hidden");

            loading.classList.remove("hidden");

            setTimeout(() => {
              loading.classList.add("hidden");
              checkedBox.classList.remove("hidden");
            }, 1000);

            checkBox.classList.add("clicked");
          }

          // progress Bar Js //

          let number = document.querySelectorAll(".clicked");
          let addedProducts = document.getElementById("added-products");
          let numberProgress = number.length;
          setTimeout(() => {
            if (numberProgress > 0) {
              addedProducts.innerHTML = numberProgress;
            } else {
              addedProducts.innerHTML = 0;
            }
          }, 1300);
        });
      });
      let filter_btns = document.querySelectorAll(".filter-btn");
      let projects = document.querySelectorAll(".filter-project-item");

      filter_btns.forEach((filter_btn) => {
        filter_btn.addEventListener("click", () => {
          filter_btns.forEach((filter_btn) => {
            filter_btn.classList.remove("is-active");
          });
          filter_btn.classList.add("is-active");
          let selected = filter_btn.getAttribute("data-project");
          projects.forEach((project, index) => {
            let project_length = projects.length;
            if (
              project.getAttribute("data-project") === selected ||
              selected === "all"
            ) {
              if (project.style.transition) {
                project.style.transition = "";
              } else {
                project.style.transition = `all 0.5s ease ${
                  index / project_length + 0.6
                }s,height 0.5s ease ${index / project_length + 0.6}s`;
              }
              project.classList.add("show");
              project.classList.remove("hide");
            } else {
              project.style.transition = `all 0.5s ease ${
                index / project_length + 0.6
              }s,height 0.5s ease ${index / project_length + 0.6}s`;
              project.classList.remove("show");
              project.classList.add("hide");
            }
          });
        });
      });
    });
  }
};

const initApp = () => {
  // get data product
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;

      addDataToHTML();

      // get data cart from memory
      // if (localStorage.getItem("cart")) {
      //   cart = JSON.parse(localStorage.getItem("cart"));
      //   addCartToHTML();
      // }
    });
};
initApp();
