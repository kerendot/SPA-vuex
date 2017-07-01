<template>
    <section class="popup">
        <h1>Purchase total price: {{totalPrice}} $</h1>
        <el-button :plain="true" type="info" @click="closeMe">cool !</el-button>
        
    </section>
</template>

<script>
export default {
    name: 'check-out',
    props: ['totalPrice'],
    methods: {
        closeMe() {
            this.$emit('close');
        }
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
    left: 40%;
    top: 20%;
    h1 {
        color: darkcyan;
        margin-top: 0px;
    }
    i {
        float: left;
    }
    button { 
        font-family: Gentium Book Basic;
        text-transform: uppercase;
    }
    
}
</style>