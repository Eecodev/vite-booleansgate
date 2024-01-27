<template>
    <div>
        <ArenaComponent />
    </div>
</template>

<script>
import ArenaComponent from '@/components/ArenaComponent.vue'
export default {
    name: "ArenaView",
    components: {
        ArenaComponent
    },
    reloadHandler() {
        this.$router.push('/')
    }
}
</script>

<style lang="scss" scoped></style>