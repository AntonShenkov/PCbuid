const navBtn = document.getElementById("navBtn");
const menuLinks = document.querySelector(".menuLinks");

const menuWasOpen = localStorage.getItem("menuOpen") === "true";

if(menuWasOpen) {
        navBtn.classList.add("noAnimation");
        menuLinks.classList.add("noAnimation");

        navBtn.classList.add("active");
        menuLinks.classList.add("active");

        setTimeout(() => {
            navBtn.classList.remove("noAnimation");
            menuLinks.classList.remove("noAnimation"); 
        }, 50);
    }
navBtn.addEventListener("click", function() {
    setTimeout(() => {
        navBtn.classList.toggle("active");
        menuLinks.classList.toggle("active");

        localStorage.setItem("menuOpen", menuLinks.classList.contains("active"));
    }, 30);
});

const cartBtn = document.getElementById("cartBtn");
const cartPreview = document.querySelector(".cartPreview");
let cartCloseTimer;

cartBtn.addEventListener("mouseenter", () => {
    clearTimeout(cartCloseTimer);
    cartPreview.classList.add("open");
});
cartBtn.addEventListener("mouseleave", () => {
    cartCloseTimer = setTimeout(() => {
        if (!cartPreview.matches(":hover")) {
            cartPreview.classList.remove("open");
        }
    }, 50);
});
cartPreview.addEventListener("mouseenter", () => {
    clearTimeout(cartCloseTimer);
});
cartPreview.addEventListener("mouseleave", () => {
    cartPreview.classList.remove("open");
});

const promoBtn = document.getElementById("promoBtn");
const PCsOnSale = document.getElementById("PCsOnSale");

if(promoBtn && PCsOnSale){
    promoBtn.addEventListener("click", () => {
        PCsOnSale.classList.toggle("disp");

        setTimeout(() => {
            PCsOnSale.scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }, 50);
    });
}


const favBtns = document.querySelectorAll(".fav");

favBtns.forEach((favBtn) => {
    const favImg = favBtn.querySelector("img");

    favBtn.addEventListener("click", () => {

        favBtn.classList.toggle("active");

        setTimeout(() => {
            if (favBtn.classList.contains("active")) {
                favImg.src = "PCshop_icons/heart_filled.svg";
            } else {
                favImg.src = "PCshop_icons/heart_outline.svg";
            }
        }, 50);

    });
});


const addToCartBtns = document.querySelectorAll(".addToCart");

    addToCartBtns.forEach((addToCartBtn) => {

        addToCartBtn.addEventListener("click", () => {
        if (addToCartBtn.classList.contains("shuffling")) return;
        if (addToCartBtn.classList.contains("added")) {

            const finalText = "ADD TO CART";
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const textContainer = addToCartBtn.querySelector(".cartText");

            textContainer.innerHTML = "";
            [...finalText].forEach((letter) => {

                const span = document.createElement("span");

                span.classList.add("letter");
                span.textContent = letter === " " ? "\u00A0" : chars[Math.floor(Math.random() * chars.length)];
                textContainer.appendChild(span);
            });

            const letters = [...textContainer.querySelectorAll(".letter")];
            addToCartBtn.classList.add("shuffling");
            letters.forEach((letter, index) => {
                let counter = 0;
                const interval = setInterval(() => {
                    letter.textContent = chars[Math.floor(Math.random() * chars.length)];
                    letter.style.transform = "none";
                    counter++;

                if (counter >= 2 + index * 2) {
                    clearInterval(interval);
                    letter.textContent = finalText[index] === " " ? "\u00A0" : finalText[index];
                    letter.style.transform = "none";

                if (index === letters.length - 1) {
                    addToCartBtn.classList.remove("shuffling");
                    addToCartBtn.classList.remove("added");
                }
            }
        }, 20);
    });
        return;
    }

        const finalText = "ADDED TO CART";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const textNodes = [...addToCartBtn.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);
        
        textNodes.forEach(node => node.remove());

        const textContainer = addToCartBtn.querySelector(".cartText") || document.createElement("span");
        textContainer.classList.add("cartText");
        textContainer.innerHTML = "";

        [...finalText].forEach((letter) => {
            const span = document.createElement("span");
        
            span.classList.add("letter");
            span.textContent = letter === " " ? "\u00A0" : chars[Math.floor(Math.random() * chars.length)];
            textContainer.appendChild(span);
        });

        if (!textContainer.parentElement) {
            addToCartBtn.prepend(textContainer);
        }
        const letters = [...textContainer.querySelectorAll(".letter")];
        addToCartBtn.classList.add("shuffling");
        letters.forEach((letter, index) => {
            let counter = 0;
            const interval = setInterval(() => {
                letter.textContent = chars[Math.floor(Math.random() * chars.length)];
                letter.style.transform = "none";
                counter++;

                if (counter >= 2 + index * 2) {
                    clearInterval(interval);
                    letter.textContent = finalText[index] === " " ? "\u00A0" : finalText[index];
                    letter.style.transform = "none";

                    if (index === letters.length - 1) {
                        addToCartBtn.classList.remove("shuffling");
                        addToCartBtn.classList.add("added");
                    }
                }
            }, 20);
        });
    });
});


const buyNowBtns = document.querySelectorAll(".buyNow");

buyNowBtns.forEach((buyNowBtn) => {
    const buyNowImg = buyNowBtn.querySelector("img");

    buyNowBtn.addEventListener("click", () => {

        buyNowBtn.classList.toggle("active");

        setTimeout(() => {
            if (buyNowBtn.classList.contains("active")) {
                buyNowImg.src = "PCshop_icons/money_stack_filled_white.svg";
            } else {
                buyNowImg.src = "PCshop_icons/money_stack_outline_white.svg";
            }
        }, 50);
    });
});


const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchBox = document.querySelector(".searchBox");

if(searchBtn && searchInput && searchBox){
    searchBtn.addEventListener("click",()=>{
        if(!searchBox.classList.contains("active")){
            searchBox.classList.add("active");
            searchInput.focus();
            return;
        }
        if(searchInput.value.trim() === ""){
            searchBox.classList.remove("active");
            return;
        }
        filterProducts(searchInput.value);
    });

    searchInput.addEventListener("input",()=>{
        if(searchInput.value.trim() === ""){
            filterProducts("");
            return;
        }
    });
}

function filterProducts(searchValue) {
    const products = document.querySelectorAll(".discountProductCard, .productCard");
    const searchText = searchValue.toLowerCase().trim();
    
    products.forEach(product => {
        const title = product.querySelector(".productTitle")?.textContent.toLowerCase()||"";
        const characteristics = product.querySelector(".productCharacteristics")?.textContent.toLowerCase()||"";
        const type = product.querySelector(".productType") ?.textContent.toLowerCase()||"";
        const matches = title.includes(searchText)||characteristics.includes(searchText)||type.includes(searchText);

        product.style.display = matches ? "" : "none";
    });
}


const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const filters = {
    components: ["CPU", "GPU", "Motherboard", "RAM", "Storage", "Power Supply", "Cooling"],
    pcs: ["Gaming PC", "Mini PC", "RAM", "GPU", "CPU"],
    other: ["Monitor", "Keyboard", "Mouse", "Headset", "Microphone"]
};

    if(category && filters[category]){
        const allFilters = document.querySelectorAll('[class^="filter"]');
        allFilters.forEach((element) => {
            element.style.display = "none";
            if(filters[category].includes(element.className.slice(6))){
                element.style.display = "";
            }
        });
    }

const filterOptions = {
    CPU: ["AMD", "intel"],
    GPU: ["nVidia RTX", "AMD RX"],
    RAM: ["16GB", "32GB", "64GB"],
    Storage: ["512GB", "1TB", "2TB"],
    Monitor: ["144Hz", "200Hz", "240Hz"]
};

const selectedFilters = {};

document.querySelectorAll('[class^="filter"]').forEach((element) => {
    const elem = element.className.slice(6);

    if (filterOptions[elem] !== undefined) {
        selectedFilters[elem] = [];
        filterOptions[elem].forEach((optionName) => {
            const option = document.createElement("label");
            const optionCheck = document.createElement("input");

            optionCheck.type = "checkbox";
            optionCheck.value = optionName;
            optionCheck.addEventListener("change", () => {
                if (optionCheck.checked) {
                    selectedFilters[elem].push(optionCheck.value);
                } else {
                    const index = selectedFilters[elem].indexOf(optionCheck.value);

                    if (index !== -1) {
                        selectedFilters[elem].splice(index, 1);
                    }
                }
                console.log(selectedFilters);
            });
            option.append(optionCheck);
            option.append(optionName);
            element.append(option);
        });
    }
});

const product = {
    name: "PCBuild™ NebulaBlack",
    type: "PREBUILT PC",
    price: 1919,
    old_price: 2399,
    discount: 20,
    image: "css/2ndPC.png",
    characteristics: "Intel i7-14700KF / RTX 4070 Ti / 32GB RAM / 2TB SSD"
};

fetch('/api/products')
    .then(responce => responce.json())
    .then(products => {
        console.log("Product from database", products);
    })
    .catch(error => {
        console.error("Database error:", error);
    });

/*

fetch('/api/products', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(product),
})
.then(responce => responce.json())
    .then(result => {
        console.log("Product from database", result);
});

*/
fetch('/api/products')
    .then(responce => responce.json())
    .then(products => {
        products.forEach((product) => {
            console.log(product.name);
            const card = document.createElement("div");
            card.classList.add("productCard");
            const productContent = document.createElement("div");
            card.append(productContent);
            if (product.discount > 0) {
                const discount = document.createElement("div");
                discount.classList.add("discount");
                const discountText = document.createElement("span");
                discountText.textContent = `-${product.discount}%`;
                discount.append(discountText);
                productContent.append(discount);
            }
            const productImage = document.createElement("img");
            productImage.src = product.image;
            productContent.append(productImage);

            const productType = document.createElement("div");
            productType.classList.add("productType");
            productType.textContent = product.type;
            productContent.append(productType);

            const productName = document.createElement("div");
            productName.classList.add("productTitle");
            productName.textContent = product.name;
            productContent.append(productName);

            const productCharacteristics = document.createElement("div");
            productCharacteristics.classList.add("productCharacteristics");
            productCharacteristics.textContent = product.characteristics;
            productContent.append(productCharacteristics);

            const prices = document.createElement("div");
            prices.classList.add("prices");
            const price = document.createElement("div");
            price.classList.add("Price");
            price.textContent = product.price;
            prices.append(price);
            if(product.discount > 0){
                const old_price = document.createElement("div");
                old_price.classList.add("oldPrice");
                old_price.textContent = product.old_price;
                prices.append(old_price);
            }
            productContent.append(prices);

            const cardBtns = document.createElement("div");
            cardBtns.classList.add("cardBtns");
            const favBtn = document.createElement("button");
            favBtn.classList.add("fav");
            
            const favImg = document.createElement("img");
            favImg.src = "PCshop_icons/heart_outline.svg";
            favImg.width = 30;
            favImg.height = 30;

            favBtn.append(favImg);
            cardBtns.append(favBtn);

            favBtn.addEventListener("click", () => {
            favBtn.classList.toggle("active");

                setTimeout(() => {
                    if (favBtn.classList.contains("active")) {
                        favImg.src = "PCshop_icons/heart_filled.svg";
                    } else {
                        favImg.src = "PCshop_icons/heart_outline.svg";
                    }
                }, 50);

            });

            
            const addToCartBtn = document.createElement("button");
            addToCartBtn.classList.add("addToCart");
            
            const addToCartImg = document.createElement("img");
            addToCartImg.src = "PCshop_icons/cart_outline.svg";
            addToCartImg.width = 30;
            addToCartImg.height = 30;

            addToCartBtn.append(addToCartImg);
            cardBtns.append(addToCartBtn);

            addToCartBtn.addEventListener("click", () => {
                if (addToCartBtn.classList.contains("shuffling")) return;
                if (addToCartBtn.classList.contains("added")) {

                    const finalText = "ADD TO CART";
                    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    const textContainer = addToCartBtn.querySelector(".cartText");

                    textContainer.innerHTML = "";
                    [...finalText].forEach((letter) => {

                        const span = document.createElement("span");

                        span.classList.add("letter");
                        span.textContent = letter === " " ? "\u00A0" : chars[Math.floor(Math.random() * chars.length)];
                        textContainer.appendChild(span);
                    });

                    const letters = [...textContainer.querySelectorAll(".letter")];
                    addToCartBtn.classList.add("shuffling");
                    letters.forEach((letter, index) => {
                        let counter = 0;
                        const interval = setInterval(() => {
                            letter.textContent = chars[Math.floor(Math.random() * chars.length)];
                            letter.style.transform = "none";
                            counter++;

                        if (counter >= 2 + index * 2) {
                            clearInterval(interval);
                            letter.textContent = finalText[index] === " " ? "\u00A0" : finalText[index];
                            letter.style.transform = "none";

                        if (index === letters.length - 1) {
                            addToCartBtn.classList.remove("shuffling");
                            addToCartBtn.classList.remove("added");
                        }
                    }
                }, 20);
            });
                return;
            }

                const finalText = "ADDED TO CART";
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                const textNodes = [...addToCartBtn.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);
                
                textNodes.forEach(node => node.remove());

                const textContainer = addToCartBtn.querySelector(".cartText") || document.createElement("span");
                textContainer.classList.add("cartText");
                textContainer.innerHTML = "";

                [...finalText].forEach((letter) => {
                    const span = document.createElement("span");
                
                    span.classList.add("letter");
                    span.textContent = letter === " " ? "\u00A0" : chars[Math.floor(Math.random() * chars.length)];
                    textContainer.appendChild(span);
                });

                if (!textContainer.parentElement) {
                    addToCartBtn.prepend(textContainer);
                }
                const letters = [...textContainer.querySelectorAll(".letter")];
                addToCartBtn.classList.add("shuffling");
                letters.forEach((letter, index) => {
                    let counter = 0;
                    const interval = setInterval(() => {
                        letter.textContent = chars[Math.floor(Math.random() * chars.length)];
                        letter.style.transform = "none";
                        counter++;

                        if (counter >= 2 + index * 2) {
                            clearInterval(interval);
                            letter.textContent = finalText[index] === " " ? "\u00A0" : finalText[index];
                            letter.style.transform = "none";

                            if (index === letters.length - 1) {
                                addToCartBtn.classList.remove("shuffling");
                                addToCartBtn.classList.add("added");
                            }
                        }
                    }, 20);
                });
            });

            productContent.append(cardBtns)

            PCsOnSale.append(card);
        });
    });