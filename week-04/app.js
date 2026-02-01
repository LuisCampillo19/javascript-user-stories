/**
 * Global Configuration and State
 */
const API_URL = "http://localhost:3000/products"; // Replace with your JSON Server URL
let products = JSON.parse(localStorage.getItem("products")) || [];

// DOM Elements
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

/**
 * TASK 5: Fetch API Operations (CRUD)
 */

// GET: Load products from API
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("No se pudieron recuperar los datos");
        const data = await response.json();
        products = data;
        saveToLocalStorage();
        renderProducts();
    } catch (error) {
        console.error("Error al cargar los productos", error);
    }
}

// POST: Add new product to API
async function addProductToServer(product) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        return await response.json();
    } catch (error) {
        console.error("Error al guardar el producto", error);
    }
}

// DELETE: Remove product from API
async function deleteProductFromServer(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        console.log(`Product ${id} deleted from server`);
    } catch (error) {
        console.error("Error al eliminar prudcto:", error);
    }
}

/**
 * TASK 3 & 4: DOM and Local Storage Logic
 */

function renderProducts() {
    productList.innerHTML = "";
    products.forEach(prod => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${prod.name} - $${prod.price}</span>
            <button class="delete-btn" onclick="handleDelete(${prod.id})">Eliminar</button>
        `;
        productList.appendChild(li);
    });
}

async function handleForm(e) {
    e.preventDefault();
    
    // TASK 2: Validation
    const name = document.getElementById('name').value.trim();
    const price = document.getElementById('price').value;

    if (!name || !price) return alert("Rellene todos los campos");

    const newProduct = { name, price: Number(price) };

    // Save to Server then update UI
    const savedProduct = await addProductToServer(newProduct);
    if (savedProduct) {
        products.push(savedProduct);
        saveToLocalStorage();
        renderProducts();
        productForm.reset();
    }
}

async function handleDelete(id) {
    await deleteProductFromServer(id);
    products = products.filter(p => p.id !== id);
    saveToLocalStorage();
    renderProducts();
}

function saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Event Listeners
productForm.addEventListener('submit', handleForm);

// 1. Select the Sync button from the DOM
const syncBtn = document.getElementById('syncBtn');

// 2. Add the click event to manually refresh data from the API
if (syncBtn) {
    syncBtn.addEventListener('click', async () => {
        console.log("Sincronizando...");
        
        // We call the existing GET function
        await fetchProducts(); 
        
        // Feedback for the user
        alert("Datos sincronizados con la API");
    });
}

// Initial Load
window.onload = fetchProducts;