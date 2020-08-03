<template>
    <app-layout>
        <negotiation-widget />
    </app-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import AppLayout from '@/ui/AppLayout.vue';
import NegotiationWidget from '@/ui/NegotiationWidget.vue';

export default Vue.extend({
    name: 'App',
    components: {
        AppLayout,
        NegotiationWidget,
    },
});
</script>

<style lang="scss">
@import '~reset-css';

html,
body {
    @include size(100%);
}

body {
    font-family: $ft__main;
}
</style>
