class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    calculateTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const item = new ShoppingCartItem(product, quantity);
        this.items.push(item);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    getTotalItems() {
        return this.items.length;
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
    }

    displayCart() {
        if (this.items.length === 0) {
            console.log("Le panier est vide.");
        } else {
            this.items.forEach(item => {
                console.log(`Produit: ${item.product.name}, Quantité: ${item.quantity}, Prix total: ${item.calculateTotalPrice()}`);
            });
        }
    }
}

// Test des classes et méthodes

// Création de produits
const product1 = new Product(1, "Laptop",155877);
const product2 = new Product(2, "Smartphone", 58791);
const product3 = new Product(3, "Tablet", 6987);

// Création d'un panier d'achat
const cart = new ShoppingCart();

// Ajout d'éléments au panier
cart.addItem(product1, 1);
cart.addItem(product2, 2);
cart.addItem(product3, 1);

// Affichage du panier
console.log("Contenu du panier après ajout:");
cart.displayCart();

// Affichage du nombre total d'éléments et du prix total
console.log(`Nombre total d'éléments dans le panier: ${cart.getTotalItems()}`);
console.log(`Prix total du panier: ${cart.getTotalPrice()}`);

// Suppression d'un élément du panier
cart.removeItem(2);

// Affichage du panier après suppression
console.log("\nContenu du panier après suppression:");
cart.displayCart();

// Affichage du nombre total d'éléments et du prix total après suppression
console.log(`Nombre total d'éléments dans le panier: ${cart.getTotalItems()}`);
console.log(`Prix total du panier: ${cart.getTotalPrice()}`);