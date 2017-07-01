<template>
    <section>
        <el-form ref="form">
            <el-form-item label-width="150x" label="Search text in message:">
                <el-input @input="setFilter" v-model="localFilter.text"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-radio-group @input="setFilter" v-model="localFilter.emailStatus">
                    <el-radio label="All"></el-radio>
                    <el-radio label="Read"></el-radio>
                    <el-radio label="UnRead"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>

export default {
    name: 'email-filter',
    data() {
        return {
            localFilter: Object.assign({}, this.$store.state.email.filterBy)
        }
    },
    methods: {
        setFilter() {
            this.$store.commit({ type: 'setFilterEmail', filter: this.localFilter});
        }
    }
}
</script>
