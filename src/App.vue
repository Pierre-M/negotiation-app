<template>
    <negotiation-widget />
</template>

<script lang="ts">
import Vue from 'vue';
import NegotiationWidget from '@/ui/NegotiationWidget.vue';

export default Vue.extend({
    name: 'App',
    components: {
        NegotiationWidget,
    },
});
</script>

<style></style>
