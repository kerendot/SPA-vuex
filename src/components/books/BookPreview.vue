<template>
    <li class="card product book-preview">
        <h2>{{book.title}}</h2>
        <img :src="book.img">
        <h3>${{book.price}}</h3>
        <hr>        
        <el-button-group class="buttons">
            <p>
            <el-button class="el-icon-plus" @click.stop="addToCart" type="success"></el-button>
            <el-button class="el-icon-minus" @click.stop="subtractFromCart" type="warning"></el-button>
            <el-button class="el-icon-edit" @click.stop="editBook" type="info"></el-button>
            <el-button class="el-icon-delete" @click.stop="deleteBook" type="danger"></el-button>
            </p>
            <el-button :plain="true" type="info" class="view" >
                <router-link class="el-icon-information view-more" :to="`/book/${book.id}`"> VIEW BOOK</router-link>
            </el-button>

        </el-button-group>
        
    </li>
</template>

<script>
export default {
    // name: 'book-preview',
    props: ['book'],

    methods: {

        editBook() {
            this.$emit('edit');
        },
        deleteBook() {
            this.$emit('delete');
        },
        addToCart() {
            this.$emit('add');
            // this.$router.push('cart');
        },
        subtractFromCart() {
            this.$emit('subtract');
            // this.$router.push('cart');
        }
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 200px;
    height: 300px;
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.view {
    margin-top: 10px;
    width: 100%;
    

    .view-more {
        font: normal 16px/normal "Advent Pro", Helvetica, sans-serif;
        text-decoration: none;    
        color: darkcyan;
        
    }
    .view-more:visited {
        color: darkcyan;
        background-color: rgba(95,132,140,0.1);        
    }
}

.book-preview {

    width: 300px;
    padding: 10px;
    background-color: rgba(95,132,140,0.1);
    h2:hover {
        background-color: rgba(95,132,140,0.18);        
    }
    margin-bottom: 20px;
    border: 1px solid lightgray;
    border-radius: 5px;
    box-shadow: 0 0 8px 3px rgba(0,0,0,0.5) inset;
    
}
</style>
