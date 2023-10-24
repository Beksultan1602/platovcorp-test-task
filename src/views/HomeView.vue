<template>
    <div class="clothes">
        <div v-for="(clothe, index) in visibleProducts" :key="clothe.id" class="clothes__item">
            <h2>{{ clothe.title }}</h2>
            <p>{{ clothe.description }}</p>
            <p>{{ clothe.price }}руб.</p>
            <p>В наличии: {{ clothe.count }}</p>
            <button class="add-to-cart-btn" @click="addToCart(clothe)">Добавить в корзину</button>
            <p style="color: red" v-if="clothe.isError">Товара нет в наличии!</p>
        </div>
    </div>
    <button class="show-more-btn" @click="showMore">Показать еще</button>
</template>

<script>
import { useClothesStore } from "@/store/ClothesStore";
export default {
    name: 'HomeView',
    methods: {
        addToCart(clothe) {
            const itemsInCart = useClothesStore().cart.filter(item => item.id === clothe.id);
            const addedCount = itemsInCart.length;

            if (addedCount < clothe.count) {
                useClothesStore().addToCart(clothe);
            } else {
                clothe.isError = true;
            }
        },
        fetchClothes() {
            useClothesStore().fetchClothes();
        },
        showMore() {
            useClothesStore().currentPage++;
        },
    },
    created() {
        this.fetchClothes()
    },
    computed: {
        visibleProducts() {
            const store = useClothesStore();
            return store.clothes.slice(0, 4 * store.currentPage);
        },
    },
}
</script>
<style lang="scss">
.clothes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
    margin: 0 auto;
    justify-content: center;
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
    &__item {
        border: 1px solid skyblue;
        padding: 10px;
        margin: 0 auto;
        max-width: 700px;
    }
}
.show-more-btn {
    margin: 10px 0;
}
.add-to-cart-btn {
    background: none;
    &:hover {
        background-color: skyblue;
        cursor: pointer;
    }
}
</style>
