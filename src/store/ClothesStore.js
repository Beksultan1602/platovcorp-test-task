import { defineStore } from 'pinia';
export const useClothesStore = defineStore({
    id: 'clothes',
    state: () => ({
        clothes: [],
        cart: [],
        currentPage: 1,
        clothesPerPage: 4,
    }),
    actions: {
        async fetchClothes() {
            try {
                const response = await fetch('https://api.platovcorp.site/product.json');
                const data = await response.json();
                this.clothes = data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        addToCart(product) {
            this.cart.push(product);
        },
        removeFromCart(product) {
            const index = this.cart.indexOf(product);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
    },
});