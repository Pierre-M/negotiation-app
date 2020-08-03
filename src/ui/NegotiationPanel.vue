<template>
    <section>
        <header>
            <h2>{{ title }}</h2>
        </header>

        <form @submit="submit">
            <label v-show="!submitted">
                {{ inputLabel }}
                <input type="number" v-model="inputValue" />
            </label>

            <button type="submit" :disabled="!allowedToSubmit">Confirm</button>
        </form>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
    name: 'NegociationPanel',
    props: {
        title: {
            type: String,
            required: true,
        },
        inputLabel: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const inputValue = ref<string | null>(null);
        const submit = (e: Event) => {
            e.preventDefault();

            if (inputValue.value === '' || inputValue.value === null) {
                return;
            }

            emit('submit', parseInt(inputValue.value, 10));
            submitted.value = true;
        };
        const submitted = ref<boolean>(false);
        const allowedToSubmit = computed<boolean>(() => inputValue.value !== null && !submitted.value);

        return {
            inputValue,
            allowedToSubmit,
            submit,
            submitted,
        };
    },
});
</script>

<style lang="stylus"></style>
