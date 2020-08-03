import { NegotiationService, NegotiationStatus } from '@/services/NegotiationService';

let service: NegotiationService;

describe('NegotiationService', () => {
    beforeEach(() => {
        service = new NegotiationService();
    });

    const cases: [number, number, NegotiationStatus][] = [
        [2000, 3000, NegotiationStatus.SUCCESS],
        [3000, 3000, NegotiationStatus.SUCCESS],
        [3000, 2000, NegotiationStatus.FAILURE],
    ];

    cases.forEach(([min, max, expectedStatus]) => {
        it(`should have ${expectedStatus} status when minimal amount wanted is ${min} and maximal amount supported is ${max}`, () => {
            const { status } = service.execute({ max, min });

            expect(status).toBe(expectedStatus);
        });
    });
});
