<template>
    <div class="clothes" v-if="productsInCart.length">
        <div v-for="(clothe, index) in productsInCart" :key="clothe.id" class="clothes__item">
            <h2>{{ clothe.title }}</h2>
            <p>{{ clothe.description }}</p>
            <p>{{ clothe.price }}руб.</p>
            <p>В наличии: {{ clothe.count }}</p>
            <button @click="deleteFromCart(clothe)">Удалить из корзины</button>
        </div>
    </div>
    <h2 v-else>Корзина пуста!</h2>
</template>
<script>
import {useClothesStore} from "@/store/ClothesStore";

export default {
    name: 'CartView',
    methods: {
        deleteFromCart(clothe) {
            useClothesStore().removeFromCart(clothe)
        },
    },
    created() {
        console.log(this.productsInCart)
    },
    computed: {
        productsInCart() {
            return useClothesStore().cart;
        },
    },
}
</script>