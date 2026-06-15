import { sendClaimContractorAssignedEmail } from '@/lib/email/client-notifications';
import { sendEmail } from '@/lib/email/resend';

jest.mock('@/lib/email/resend', () => ({
  sendEmail: jest.fn(),
}));

describe('client claim contractor-assigned email', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends the client a contractor-assigned notification with claim and contractor details', async () => {
    (sendEmail as jest.Mock).mockResolvedValue({ success: true, messageId: 'msg_123' });

    const result = await sendClaimContractorAssignedEmail({
      clientName: 'Alex Client',
      email: 'alex@example.com',
      claimId: 'claim_123',
      contractorName: 'Restore Co',
      contractorEmail: 'dispatch@restore.example',
      contractorPhone: '',
      estimatedArrival: '24 hours',
    });

    expect(result).toEqual({ success: true, messageId: 'msg_123' });
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'alex@example.com',
        subject: expect.stringContaining('Contractor Assigned'),
      })
    );

    const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];
    expect(emailCall.html).toContain('Alex Client');
    expect(emailCall.html).toContain('claim_123');
    expect(emailCall.html).toContain('Restore Co');
    expect(emailCall.html).toContain('dispatch@restore.example');
    expect(emailCall.html).toContain('24 hours');
    expect(emailCall.text).toContain('Restore Co');
    expect(emailCall.text).toContain('claim_123');
  });

  it('returns the email service error when delivery fails', async () => {
    (sendEmail as jest.Mock).mockResolvedValue({ success: false, error: 'Resend unavailable' });

    const result = await sendClaimContractorAssignedEmail({
      clientName: 'Alex Client',
      email: 'alex@example.com',
      claimId: 'claim_123',
      contractorName: 'Restore Co',
      contractorEmail: 'dispatch@restore.example',
      contractorPhone: '',
      estimatedArrival: '24 hours',
    });

    expect(result).toEqual({ success: false, error: 'Resend unavailable' });
  });
});
