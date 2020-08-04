<template>
    <div>
        <tabs-layout v-if="ready" :tabs="tabs">
            <negotiation-panel
                slot="employer"
                title="Enter the maximum amount you're willing to pay"
                inputLabel="Enter the maximum amount you're willing to pay"
                @submit="handleEmployerSubmission"
            />
            <negotiation-panel
                slot="employee"
                title="Employee negotiation"
                inputLabel="Enter the minimum salary you want"
                @submit="handleEmployeeSubmission"
            />
        </tabs-layout>

        <negotiation-result-modal
            :opened="showResultModal"
            :status="status"
            :max="employerMaxSalary"
            :min="employeeTargetSalary"
            @closed="handleNegotiationModalClosing"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import TabsLayout from '@/ui/TabsLayout.vue';
import NegotiationPanel from '@/ui/NegotiationPanel.vue';
import NegotiationResultModal from '@/ui/NegotiationResultModal.vue';
import { useComponentRendering } from '@/ui/useComponentRendering';
import { useNegotiation } from '@/ui/useNegotiation';
import { useNegotiationValues } from '@/ui/useNegotiationValues';

export default defineComponent({
    name: 'NegotiationWidget',
    components: { TabsLayout, NegotiationPanel, NegotiationResultModal },
    setup(props, { root }) {
        const { ready, rerender } = useComponentRendering(root.$nextTick);
        const { employeeTargetSalary, employerMaxSalary, handleEmployerSubmission, handleEmployeeSubmission } = useNegotiationValues();
        const { status } = useNegotiation({
            min: employeeTargetSalary,
            max: employerMaxSalary,
            onNegotiationDone: () => (showResultModal.value = true),
        });

        const showResultModal = ref<boolean>(false);

        const handleNegotiationModalClosing = async () => {
            resetState();
            await rerender();
        };

        const resetState = () => {
            status.value = null;
            employerMaxSalary.value = null;
            employeeTargetSalary.value = null;
            showResultModal.value = false;
        };

        const tabs: Tab[] = [
            {
                id: 'employer',
                label: 'Employeur',
            },
            {
                id: 'employee',
                label: 'Employee',
            },
        ];

        return {
            tabs,
            ready,

            employeeTargetSalary,
            employerMaxSalary,
            handleEmployerSubmission,
            handleEmployeeSubmission,

            status,

            showResultModal,
            handleNegotiationModalClosing,
        };
    },
});
</script>
