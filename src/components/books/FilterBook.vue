<template>
    <section>
        <h1>Search books:</h1>
        <p class="search">
        <label>title:</label> <br>
        <el-input type="text" @input="setFilter" v-model="filterBy.title" /> 
        <label>price:</label> <br>        
        <el-input placeholder="Search by minimun price" type="number" @keyup="setFilter" v-model="filterBy.minPrice" />
        </p>
    </section>
</template>

<script>

export default {
    name: 'filter-book',
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filter', this.filterBy);
        }
    }
}
</script>
<style lang="scss">
    .search {
        display: flex;
        align-items: center;
        label {
            margin-right: 10px;
            margin-left: 10px;
        }
    }
    
</style>
