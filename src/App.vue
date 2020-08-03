<template>
    <tabs-layout :tabs="tabs">
        <div slot="employer">
            <negotiation-panel title="Employer" inputLabel="enter max" />
        </div>

        <div slot="employee">
            <negotiation-panel title="Employee" inputLabel="enter min" />
        </div>
    </tabs-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import TabsLayout from '@/ui/TabsLayout.vue';
import NegotiationPanel from '@/ui/NegotiationPanel.vue';

export default Vue.extend({
    name: 'App',
    components: {
        TabsLayout,
        NegotiationPanel,
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
