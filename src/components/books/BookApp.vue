<template>
  <div class="home">
    <h1> our bookstore </h1>    
    <div class="book-home">      
      <book-list class="book-list"></book-list>
      <cart-details class="cart-details"></cart-details>

    </div>
  </div>
</template>

<script>
import BookList from './BookList'
import CartDetails from './CartDetails'

export default {
  name: 'bookApp',
  components: {
        BookList,
        CartDetails
    },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Gentium+Book+Basic');

.home {
    font-family: Gentium Book Basic;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;

    h1{
      padding-bottom: 20px;
      width: 100%;
      align-items: center;
    }
}
  .book-home {
    display: flex;
    width: 100%;
    h2 {
      align-items: center;
    }
    .book-list {
      width: 80%;
    } 
    .cart-details {
      width: 20%;
    }
  }
</style>
