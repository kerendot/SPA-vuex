<template>
    <section v-if="bookToShow" class="popup book-details">
        <i class="el-icon-close" @click="closeMe"></i>
        <br>
        <br>
        <h1>Details of: {{bookToShow.title}}</h1>
        <img :src="bookToShow.img">
        <h3>${{bookToShow.price}}</h3>
        <p>{{bookToShow.description}}</p>
        <el-button :plain="true" type="info" class="view" @click="requestNextBook">Next</el-button>
    </section>
</template>

<script>
import BookService from '../../services/book/book.service';
export default {
    name: 'book-details',
    props: ['book'],
    data() {
        return {
            bookToShow: null,
            isModalMode: this.book !== undefined
        }
    },
    created() {
        const bookId = +this.$route.params.bookId;
        if (bookId) {
            this.getBook(bookId);
        } else {
            this.bookToShow = this.book;
        }
    },
    methods: {
        getBook(bookId) {
            BookService.getBookById(bookId)
                .then(book => {
                    this.bookToShow = book;
                    console.log(book)
                })
        },
        closeMe() {
            if (this.isModalMode) this.$emit('close');
            else this.$router.push('/book');
        },
        requestNextBook() {
            if (this.isModalMode) {
                this.$emit('next');
                console.log('Requesting Next by emit');
            }
            else {
                this.bookToShow = BookService.getNext(this.bookToShow)
                this.$router.push(`/book/${this.bookToShow.id}`);
            }
        },
    }

}
</script>

<style lang="scss" scoped>
.popup {
    background: rgba(232, 232, 232, 1);
    padding: 40px;
    box-shadow: 0 0 9px 4px rgba(47, 64, 68, 0.5);
    text-align: center;
    position: fixed;
    top: 1%;
    h1 {
        color: darkcyan;
        margin-top: 0px;
    }
    i {
        float: left;
    }
    .view {
        font-family: Gentium Book Basic;
        text-transform: uppercase;
        width: 40%;
        margin: {
            top: 10px;
            left: 0px;
        }
    }
}
</style>
