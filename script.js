const API_URL = "https://dummyjson.com/products";
const productsContainer = document.getElementById("products");
const categoriesContainer = document.getElementById("categories");
const searchInput = document.getElementById("search");

let allProducts = [];

async function fetchProducts() {
    const res = await fetch(API_URL);
    const data = await res.json();
    allProducts = data.products;
    console.log(allProducts);
    displayProducts(allProducts);
    displayCategories(allProducts);
}

function displayProducts(products){
    productsContainer.innerHTML='';
    products.forEach(product => {
        productsContainer.innerHTML += 
        `<div class="bg-white rounded-xl shadow-md hover:shagow-xl flex flex-col relative transition transform hover:-translate-y-1 duration-300">
            ${product.discountPercentage ? `<div class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">${product.discountPercentage}% OFF</div>` :"" }
            <img src="${product.thumbnail}" alt="${product.title}" class="h-48 w-full p-4 object-contain p-4">
            <div class="flex flex-col flex-grow">
                <h2 class="font-semibold text-lg mb-1 hover:text-orange-500 transition truncate">${product.title}</h2>
                <p class="text-gray-800 font-bold text-lg mb-1">${product.price}</p>
                <p class="text-yellow-800 mb-2">⭐${product.rating}</p>
                <button class="bg-orange-500 text-white py-2 rounded mt-auto hover:bg-orange-600 transition">Add to cart</button>
            </div>
        </div>
        `;
    })
}

function displayCategories(products){
    const categories = [...new Set(products.map(p=>p.category))];
    categoriesContainer.innerHTML = `<button class="bg-orange-200 px-3 py-1 rounded hover:bg-orange-300 transition">All</button>`;
    categories.forEach(cat=> {
        categoriesContainer.innerHTML += `<button class="bg-orange-200 px-3 py-1 rounded hover:bg-orange-300 transition">${cat}</button>`;
    });

    categoriesContainer.querySelectorAll('button').forEach(btn=>{
        btn.addEventListener('click',()=>{
            if(btn.textContent ==='All') displayProducts(allProducts);
            else displayProducts(allProducts.filter(p=>p.category===btn.textContent));
        })
    })
}

searchInput.addEventListener('input',()=>{
    const query = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(p=> p.title.toLowerCase().includes(query));
    displayProducts(filtered);
})

fetchProducts();
