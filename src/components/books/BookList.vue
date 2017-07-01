<template>
    <section class="books" v-if="books">
        <div>
            <div class="actions">
                <filter-book class="filter" @filter="setFilter">
                </filter-book>
                <el-button :plain="true" type="success" @click="isCreateMode=true">Add new book</el-button>
            </div>
            
            
            <book-details class="details" v-if="selectedBook" @close="resetSelected" @next="selectNext" :book="selectedBook">
            </book-details>
            <book-edit class="edit" v-if="editedBook || isCreateMode" :book="editedBook" @save="saveBook" @cancel="closeEdit">
            </book-edit>
            <ul>
                <book-preview class="preview" v-for="currBook in booksToDisplay" :key="currBook.id" @click.native="selectBook(currBook)" @edit="editBook(currBook)" @delete="deleteBook(currBook)" @add="addToCart(currBook)" @subtract="subtractFromCart(currBook)" :book="currBook">
                </book-preview>
            </ul>
    
        </div>
    </section>
</template>

<script>
import BookService from '../../services/book/book.service';
import CartService from '../../services/book/cart.service';
import FilterBook from './FilterBook';
import bookPreview from './BookPreview';
import bookEdit from './BookEdit';
import bookDetails from './BookDetails';

export default {
    name: 'book-list',
    components: {
        FilterBook,
        bookPreview,
        bookEdit,
        bookDetails
    },
    created() {
        BookService.getBooks().then(books => {
            this.books = books;
        })
    },
    data() {
        return {
            books: null,
            selectedBook: null,
            editedBook: null,
            isCreateMode: false,
            filterBy: null
        }
    },
    computed: {
        booksToDisplay: function () {
            if (this.filterBy) {
                return this.books.filter(book =>
                    book.title.toLowerCase().includes(this.filterBy.title.toLowerCase()) &&
                    book.price >= this.filterBy.minPrice
                );
            }
            else return this.books;
        }
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;
        },
        resetSelected() {
            this.selectedBook = null;
        },
        selectNext() {
            console.log('selectNext is hit')
            console.log('selectedBook:', this.selectedBook.title)
            this.selectedBook = BookService.getNext(this.selectedBook);
        },
        editBook(book) {
            console.log('Editing the book', book)
            this.editedBook = book;
        },
        deleteBook(book) {
            BookService.deleteBook(book);
        },
        addToCart(book) {
            CartService.addToCart(book);
        },
        subtractFromCart(book) {
            CartService.subtractFromCart(book.id);
        },
        saveBook(book) {
            BookService.saveBook(book);
            this.closeEdit();
        },
        closeEdit() {
            this.editedBook = null;
            this.isCreateMode = false;
        },
        setFilter(ev) {
            this.filterBy = ev;
        }
    }
}

</script>

<style lang="scss" scoped>
ul {
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
    justify-content: space-between;    
}


.books {
    display: flex;
    .actions {
        display: flex;    
        flex-direction: row;
        justify-content: space-between;
        padding: {
            bottom: 1em;
            left: 1em;
            right: 1em;
        }
    }
    button {
        height: 40px;
        font-family: Gentium Book Basic;
        text-transform: uppercase;
        margin-left: 20px;
        align-self: flex-end;

    }    
    .filter {
        text-align: left;
        
    }
}
</style>
