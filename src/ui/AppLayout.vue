<template>
    <div class="app-layout">
        <main class="app-layout__content">
            <h1 class="app-layout__title">{{ $t('app.main.title') }}</h1>
            <slot />
        </main>
        <footer class="app-layout__footer">{{ $t('app.footer.content') }}</footer>
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
        border-top: 1px solid $c_bd;
    }
}
</style>
