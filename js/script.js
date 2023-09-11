const recommendedProductsSection = document.getElementById("recommended_products");
const title = document.getElementById("geo_name");
const container = document.createElement("container");

let geoContent = "";
let starsCreated = "";
let productCardInfo = "";
let geo_id = "";
let geo_image = "";
let geo_link = "";
let product_code = "";
let product_name = "";
let product_rating = 0;
let product_photo_url = "";
let product_link = "";
let product_review_count = "";

function ratingApproximation(rating) {
    const decimal = rating - Math.floor(rating);

    if (decimal <= 0) {
        return {'integer': Math.floor(rating)};
    } else if (decimal > 0 && decimal <= 0.25) {
        return {'integer': Math.floor(rating), "approximate": "star-quarter"};
    } else if (decimal > 0.25 && decimal <= 0.5) {
        approximate = "star-half";
        return {'integer': Math.floor(rating), "approximate": "star-half"};
    } else {
        return {'integer': Math.floor(rating), "approximate": "star-three-quarters"};
    }
}

function createStars(ratingInfo) {
    starsCreated = "";
    for(let i = 0; i < ratingInfo.integer; i++) {
        starsCreated += `<span class="star-full"></span>`;
    }

    if(ratingInfo.approximate) {
        starsCreated += `<span class="${ratingInfo.approximate}"></span>`
    }
}

fetch('/data/data.json')
  .then(response => response.json())
  .then(data => {
    title.innerHTML = data.geo_name

    // Inserting the product cards into the html document
    data.recommended_products.forEach(element => {
        let ratingInfo = ratingApproximation(element.product_rating);
        createStars(ratingInfo);

        productCardInfo += `
        <div id=${element.product_code} class="product-card">
            <div class="product-info">
                <p class="product_name">${element.product_name}</p>
                <div class="rating">
                    ${starsCreated}
                </div>
                <b><span class="product_review_count">${element.product_review_count} reviews</span></b>
                <form>
                    <button class="detail-btn" formaction="${element.product_link}">See details</button>
                </form>
            </div>
            <img class="product-image" src="${element.product_photo_url}" alt="${element.product_code}_image">
        </div>
        `
        recommendedProductsSection.innerHTML = productCardInfo;
    });

  })
  .catch(error => {
    console.error('Error al cargar el JSON:', error);
  });