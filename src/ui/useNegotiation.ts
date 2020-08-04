import { inject, ref, Ref, watch } from '@vue/composition-api';
import { NEGOTIATION_SERVICE_KEY, NegotiationService, NegotiationStatus } from '@/services/NegotiationService';

export const useNegotiation = ({
    min,
    max,
    onNegotiationDone,
}: {
    min: Ref<number | null>;
    max: Ref<number | null>;
    onNegotiationDone: () => void;
}) => {
    const negotiationService = inject<NegotiationService>(NEGOTIATION_SERVICE_KEY, new NegotiationService());
    const status = ref<NegotiationStatus | null>(null);

    watch([min, max], () => {
        if (min.value === null || max.value === null) {
            return;
        }

        const result = negotiationService.execute({ min: min.value, max: max.value });
        status.value = result.status;
        onNegotiationDone();
    });

    return {
        status,
    };
};
