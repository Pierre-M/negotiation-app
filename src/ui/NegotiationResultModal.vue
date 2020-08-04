<template>
    <div v-scroll-lock="opened">
        <fade-transition>
            <div v-show="opened" class="negotiation-result-modal__backdrop"></div>
        </fade-transition>

        <slide-y-up-transition>
            <div v-show="opened" class="negotiation-result-modal">
                <div class="negotiation-result-modal__content">
                    <h2 class="negotiation-result-modal__title">{{ title }}</h2>
                    <p>{{ $t('app.negotiation.result.modal.recap', [min, max]) }}</p>

                    <fade-transition>
                        <div v-if="currentTemperature">
                            <hr class="negotiation-result-modal__separator" />
                            <p>
                                {{ $t('app.negotiation.result.modal.temperature.label') }}
                                <strong class="negotiation-result-modal__temperature-result">{{ currentTemperature }}°</strong>
                            </p>
                        </div>
                    </fade-transition>

                    <btn @click="$emit('closed')">{{ $t('app.negotiation.result.modal.close.label') }}</btn>
                </div>
            </div>
        </slide-y-up-transition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { FadeTransition, SlideYUpTransition } from 'vue2-transitions';
import Btn from '@/ui/Btn.vue';
import { NegotiationStatus } from '@/services/NegotiationService';
import { useCurrentWeather } from '@/ui/useCurrentWeather';

export default defineComponent({
    name: 'NegotiationResultModal',
    components: { FadeTransition, SlideYUpTransition, Btn },
    props: {
        opened: {
            type: Boolean,
            default: false,
        },
        status: {},
        min: {},
        max: {},
    },
    setup(props: { status: NegotiationStatus; min: number; max: number }, { root }) {
        const { currentTemperature } = useCurrentWeather('London');
        const title = computed(() => {
            if (props.status === NegotiationStatus.FAILURE) {
                return root.$t('app.negotiation.result.modal.title.failure');
            }

            if (props.status === NegotiationStatus.SUCCESS) {
                return root.$t('app.negotiation.result.modal.title.success');
            }
        });

        return {
            title,
            currentTemperature,
        };
    },
});
</script>

<style lang="scss" scoped>
.negotiation-result-modal {
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &__content {
        padding: 40px;
        background-color: $white;
        @include radius;
        text-align: center;
    }

    &__backdrop {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparentize($black, 0.8);
        backdrop-filter: blur(10px);
    }

    &__title {
        margin-bottom: 20px;
        font-size: $fs_l;
        font-weight: 600;
    }

    &__separator {
        border-top: 1px solid $c_bd;
        margin: 30px 10px;
    }

    &__temperature-result {
        display: block;
        margin: 20px auto;
        @include mainTitle;
    }
}
</style>
