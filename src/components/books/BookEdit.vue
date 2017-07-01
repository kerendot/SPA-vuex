<template>
    <section class="popup book-edit">
    
        <h1 v-if="book">Edit: {{book.title}}</h1>
        <h1 v-else>New Book</h1>
        <label>Title:</label>
        <input type="text" v-model="bookToEdit.title" />
        <br/>
        <label>Price:</label>
        <input type="text" v-model="bookToEdit.price" />
        <br/>
        <label>Description:</label>
        <input type="text" v-model="bookToEdit.description" />
        <br/>
        <el-button :plain="true" type="info" class="view" @click="save">Save</el-button>
        <el-button :plain="true" type="info" class="view" @click="cancel">Cancel</el-button>
    </section>
</template>

<script>
export default {
    name: 'book-edit',
    props: ['book'],
    data() {
        return {
            bookToEdit: null
        }
    },
    created() {
        this.bookToEdit = Object.assign({}, this.book)
    },
    methods: {
        save() {
            console.log('Saving', this.bookToEdit)
            this.$emit('save', this.bookToEdit);
        },
        cancel() {
            console.log('Cancel');
            this.$emit('cancel');
        }
    }
}
</script>

<style lang="scss" scoped>
.popup {
    display: flex;
    flex-direction: column;
    background: rgba(232, 232, 232, 1);
    padding: 40px;
    box-shadow: 0 0 9px 4px rgba(47, 64, 68, 0.5);
    text-align: center;
    position: fixed;
    left: 40%;
    top: 20%;
    h1 {
        color: darkcyan;
        margin-top: 0px;
    }
    .view {
        font-family: Gentium Book Basic;
        text-transform: uppercase;
        width: 100%;
        margin: {
            top: 10px;
            left: 0px;
        }
    }
}
</style>