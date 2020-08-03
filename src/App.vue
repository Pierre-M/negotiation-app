<template>
    <tabs-layout :tabs="tabs">
        <div slot="employer">
            employer content
        </div>

        <div slot="employee">
            employee content
        </div>
    </tabs-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import TabsLayout from '@/ui/TabsLayout.vue';

export default Vue.extend({
    name: 'App',
    components: {
        TabsLayout,
    },
    data() {
        return {
            tabs: [
                {
                    id: 'employer',
                    label: 'Employeur',
                },
                {
                    id: 'employee',
                    label: 'Employé',
                },
            ],
        };
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
