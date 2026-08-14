const navBtn = document.getElementById("navBtn");
const menuLinks = document.querySelector(".menuLinks");

navBtn.addEventListener("click", function() {
    setTimeout(() => {
        navBtn.classList.toggle("active");
        menuLinks.classList.toggle("active");
    }, 30);
});


const promoBtn = document.getElementById("promoBtn");
const PCsOnSale = document.getElementById("PCsOnSale");

promoBtn.addEventListener("click", () => {
    PCsOnSale.classList.toggle("disp");

    setTimeout(() => {
        PCsOnSale.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, 50);
});


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