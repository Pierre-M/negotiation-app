import { ref } from '@vue/composition-api';

export const useNegotiationValues = () => {
    const employeeTargetSalary = ref<number | null>(null);
    const employerMaxSalary = ref<number | null>(null);
    const handleEmployerSubmission = (val: number) => (employerMaxSalary.value = val);
    const handleEmployeeSubmission = (val: number) => (employeeTargetSalary.value = val);

    return {
        employerMaxSalary,
        employeeTargetSalary,
        handleEmployeeSubmission,
        handleEmployerSubmission,
    };
};
