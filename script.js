// Classe Product pour représenter un produit
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

// Classe ShoppingCartItem pour représenter un élément du panier
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
        this.liked = false; // Ajout d'un état "liké"
    }

    // Méthode pour calculer le prix total de l'élément
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Classe ShoppingCart pour représenter le panier d'achat
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Méthode pour ajouter un élément au panier
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.updateUI();
    }

    // Méthode pour supprimer un élément du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateUI();
    }

    // Méthode pour basculer l'état "liké" d'un élément
    toggleLike(productId) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.liked = !item.liked; // Bascule l'état "liké"
            this.updateUI();
        }
    }

    // Méthode pour obtenir le nombre total d'éléments dans le panier
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Méthode pour obtenir le prix total du panier
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Méthode pour mettre à jour l'interface utilisateur
    updateUI() {
        const totalPriceElement = document.querySelector('.total-price .total');
        totalPriceElement.textContent = `$${this.getTotalPrice().toFixed(2)}`;

        const listProductsElement = document.querySelector('.list-products');
        listProductsElement.innerHTML = '';

        this.items.forEach(item => {
            const productElement = document.createElement('div');
            productElement.classList.add('card-body');
            productElement.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${item.product.image}" class="card-img-top" alt="${item.product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.product.name}</h5>
                        <p class="card-text">This is a ${item.product.name}</p>
                        <h4 class="unit-price">${item.product.price} $</h4>
                        <div>
                            <i class="fas fa-plus-circle"></i>
                            <span class="quantity">${item.quantity}</span>
                            <i class="fas fa-minus-circle"></i>
                        </div>
                        <div>
                            <i class="fas fa-trash-alt" data-id="${item.product.id}"></i>
                            <i class="fas fa-heart ${item.liked ? 'liked' : ''}" data-id="${item.product.id}"></i>
                        </div>
                    </div>
                </div>
            `;
            listProductsElement.appendChild(productElement);
        });

        // Ajouter les événements après la mise à jour de l'UI
        this.addEventListeners();
    }

    // Méthode pour ajouter les événements aux boutons
    addEventListeners() {
        // Gestion du bouton "+"
        document.querySelectorAll('.fa-plus-circle').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.closest('.card-body').querySelector('.fa-trash-alt').getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    this.addItem(product, 1);
                }
            });
        });

        // Gestion du bouton "-"
        document.querySelectorAll('.fa-minus-circle').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.closest('.card-body').querySelector('.fa-trash-alt').getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    const existingItem = this.items.find(item => item.product.id === productId);
                    if (existingItem && existingItem.quantity > 0) {
                        this.addItem(product, -1);
                    }
                }
            });
        });

        // Gestion du bouton de suppression (poubelle)
        document.querySelectorAll('.fa-trash-alt').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                this.removeItem(productId);
            });
        });

        // Gestion du bouton "like" (cœur)
        document.querySelectorAll('.fa-heart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                this.toggleLike(productId);
            });
        });
    }
}

// Initialisation des produits
const products = [
    new Product(1, 'Baskets', 100, '/assets-20250127T172044Z-001/assets/baskets.png'),
    new Product(2, 'Socks', 20, '/assets-20250127T172044Z-001/assets/socks.png'),
    new Product(3, 'Bag', 50, '/assets-20250127T172044Z-001/assets/bag.png')
];

// Initialisation du panier
const shoppingCart = new ShoppingCart();

// Ajouter les événements au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter les produits au panier avec une quantité de 0
    products.forEach(product => {
        shoppingCart.addItem(product, 0); // Quantité initiale de 0
    });

    // Ajouter les événements
    shoppingCart.addEventListeners();
});