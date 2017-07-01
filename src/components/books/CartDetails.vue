<template>
    <section class="cart">
        <h3>Shopping Cart</h3>
        <h4 v-if="cartItems.length === 0">Your shopping cart is empty</h4>
        <div class="cart-items">
            <cart-item v-for="cartItem in cartItems" :key="cartItem.item.id" @add="addToCart(cartItem)" @subtract="subtractFromCart(cartItem)" @clear="clearFromCart(cartItem)" :cartItem="cartItem">
            </cart-item>
        </div>
    
        <p class="title is-3">Total of: {{totalPrice}} $</p>
        <el-button :plain="true" type="info" @click="doCheckout">Checkout</el-button>    

        <check-out v-if="isCheckout" :totalPrice="totalPrice" @close="closeCheckout">
        </check-out>
        <hr>
        
    </section>
</template>

<script>
import CartService from '../../services/book/cart.service';
import CartItem from './CartItem';
import CheckOut from './CheckOut';

export default {
    name: 'cart-details',
    components: {
        CartItem,
        CheckOut
    },
    data() {
        return {
            cartItems: CartService.getCartItems(),
            isCheckout: false
        }
    },
    computed: {
        totalPrice: function () {
            //I send "this.cartItems" in order for this prop to be reactive
            return CartService.getCartTotal(this.cartItems);
        }
    },
    methods: {
        doCheckout() {
            this.isCheckout = true;
        },
        closeCheckout() {
            this.isCheckout = false;
        },
        addToCart(cartItem) {
            CartService.addToCart(cartItem.item);
        },
        subtractFromCart(cartItem) {
            CartService.subtractFromCart(cartItem.item.id);
        },
        clearFromCart(cartItem) {
            CartService.clearItem(cartItem.item.id);
        }
    }
}
</script>

<style lang="scss">
.cart {

    .cart-items {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .card {
        width: 200px;
        border: 1px solid grey;
        margin: 5px;
        padding: 5px;
    }
    h3 {
        color: darkcyan;        
        background: lightgrey;
        padding: 5px;
        margin: 10px;
    }
}
</style>
