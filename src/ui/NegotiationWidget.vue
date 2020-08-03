<template>
    <tabs-layout :tabs="tabs">
        <negotiation-panel
            slot="employer"
            title="Employer negotiation"
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
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from '@vue/composition-api';
import TabsLayout from '@/ui/TabsLayout.vue';
import NegotiationPanel from '@/ui/NegotiationPanel.vue';
import { NegotiationService, NegotiationServiceKey } from '@/services/NegotiationService';

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

export default defineComponent({
    name: 'NegotiationWidget',
    components: { TabsLayout, NegotiationPanel },
    props: {},
    setup(props, { emit }) {
        const negotiationService = inject<NegotiationService>(NegotiationServiceKey, new NegotiationService());
        const employeeTargetSalary = ref<number | null>(null);
        const employerMaxSalary = ref<number | null>(null);
        const handleEmployerSubmission = (val: number) => (employerMaxSalary.value = val);
        const handleEmployeeSubmission = (val: number) => (employeeTargetSalary.value = val);
        const handleNegotiation = (min: number, max: number) => {
            const { status } = negotiationService.execute({ min, max });
            emit('negotiated', {
                status,
                min,
                max,
            });
        };

        watch([employeeTargetSalary, employerMaxSalary], () => {
            if (employerMaxSalary.value === null || employeeTargetSalary.value === null) {
                return;
            }

            handleNegotiation(employeeTargetSalary.value, employerMaxSalary.value);
        });

        return {
            tabs,
            handleEmployerSubmission,
            handleEmployeeSubmission,
        };
    },
});
</script>

<style lang="stylus"></style>
