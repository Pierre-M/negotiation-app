export enum NegotiationStatus {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export interface NegotiationServiceResponse {
    status: NegotiationStatus;
}

export const NEGOTIATION_SERVICE_KEY = Symbol();

export class NegotiationService {
    execute({ max, min }: { max: number; min: number }): NegotiationServiceResponse {
        const status = min <= max ? NegotiationStatus.SUCCESS : NegotiationStatus.FAILURE;

        return {
            status,
        };
    }
}
