import { NegotiationService, NegotiationServiceResponse, NegotiationStatus } from '@/services/NegotiationService';

class MockedNegotiationService extends NegotiationService {
    execute = jest.fn<NegotiationServiceResponse, []>().mockReturnValue({
        status: NegotiationStatus.SUCCESS,
    });
}

export const mockedNegotiationService = new MockedNegotiationService();
