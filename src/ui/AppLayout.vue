<template>
    <div class="app-layout">
        <main class="app-layout__content">
            <h1 class="app-layout__title">💸 Negociation app</h1>
            <slot />
        </main>
        <footer class="app-layout__footer">Made with 💚 and Vue.js</footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'AppLayout',
});
</script>

<style lang="scss">
$app-layout-footer-height: 30px;
.app-layout {
    display: grid;
    grid-template-rows: auto $app-layout-footer-height;
    @include size(100%);

    &__content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    &__title {
        @include mainTitle;
        margin-bottom: 1em;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $fs_xs;
        border-top: 1px solid transparentize(#000, 0.9);
    }
}
</style>
