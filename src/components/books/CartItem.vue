<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{cartItem.item.title}}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                Quantity: {{cartItem.quantity}}
            </div>
        </div>
        <footer class="card-footer">
            <button @click="addToCart">+</button>
            <button @click="subtractFromCart">-</button>
            <button @click="clearFromCart">Clear</button>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'cart-item',
    props: ['cartItem'],
       methods: {
        addToCart() {
            this.$emit('add');
        },
        subtractFromCart() {
            this.$emit('subtract');
        },
        clearFromCart() {
            this.$emit('clear');            
        },
    }
}
</script>

<style>

</style>