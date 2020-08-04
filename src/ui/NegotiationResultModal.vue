<template>
    <div v-if="opened">
        Modal<br />

        {{ status }}
        {{ min }}
        {{ max }} <br />

        <button @click="$emit('closed')">reset</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'NegotiationResultModal',
    props: {
        opened: {
            type: Boolean,
            default: false,
        },
        status: {},
        min: {},
        max: {},
    },
});
</script>

<style lang="stylus"></style>
