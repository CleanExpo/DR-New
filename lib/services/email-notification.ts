/**
 * Email Notification Service
 *
 * Handles automated email delivery for job notifications, quotes, and confirmations
 */

import * as nodemailer from 'nodemailer';

export interface EmailConfig {
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPassword?: string;
  fromEmail?: string;
  fromName?: string;
}

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: Array<{
    filename: string;
    content?: string;
    path?: string;
  }>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Create email transporter
 */
function createTransporter(config?: EmailConfig) {
  const smtpConfig = {
    host: config?.smtpHost || process.env.SMTP_HOST || 'smtp.gmail.com',
    port: config?.smtpPort || parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // Use TLS
    auth: {
      user: config?.smtpUser || process.env.SMTP_USER,
      pass: config?.smtpPassword || process.env.SMTP_PASSWORD,
    },
  };

  return nodemailer.createTransport(smtpConfig);
}

/**
 * Send email
 */
export async function sendEmail(
  message: EmailMessage,
  config?: EmailConfig
): Promise<EmailResult> {
  const fromEmail = config?.fromEmail || process.env.FROM_EMAIL || 'admin@disasterrecovery.com.au';
  const fromName = config?.fromName || 'Disaster Recovery Brisbane';

  // Mock mode if SMTP not configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('[EMAIL] Mock sending to:', message.to);
    console.log('[EMAIL] Subject:', message.subject);
    console.log('[EMAIL] Content:', message.html.substring(0, 100));

    return {
      success: true,
      messageId: `mock_${Date.now()}`,
    };
  }

  try {
    const transporter = createTransporter(config);

    const result = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: message.to,
      cc: message.cc,
      bcc: message.bcc,
      subject: message.subject,
      text: message.text || extractTextFromHtml(message.html),
      html: message.html,
      attachments: message.attachments,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error('[EMAIL] Send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'EMAIL_SEND_FAILED',
    };
  }
}

/**
 * Extract plain text from HTML
 */
function extractTextFromHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

/**
 * Send emergency job notification email
 */
export async function sendEmergencyJobNotification(
  to: string,
  jobDetails: {
    jobId: string;
    serviceType: string;
    location: string;
    urgency: string;
    customerName: string;
    customerPhone: string;
    damageDescription: string;
    estimatedValue: number;
  }
): Promise<EmailResult> {
  const subject = `🚨 New Emergency Job - ${jobDetails.serviceType.toUpperCase()} - ${jobDetails.location}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #DC2626; color: white; padding: 20px; text-align: center; }
    .content { background: #f9fafb; padding: 20px; margin: 20px 0; }
    .detail { margin: 10px 0; }
    .detail strong { display: inline-block; width: 150px; }
    .cta { background: #2563EB; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; margin: 20px 0; border-radius: 5px; }
    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚨 New Emergency Job</h1>
      <p>Urgent Response Required</p>
    </div>

    <div class="content">
      <h2>Job Details</h2>

      <div class="detail">
        <strong>Job ID:</strong> ${jobDetails.jobId}
      </div>
      <div class="detail">
        <strong>Service Type:</strong> ${jobDetails.serviceType.toUpperCase()}
      </div>
      <div class="detail">
        <strong>Urgency:</strong> <span style="color: #DC2626; font-weight: bold;">${jobDetails.urgency.toUpperCase()}</span>
      </div>
      <div class="detail">
        <strong>Location:</strong> ${jobDetails.location}
      </div>
      <div class="detail">
        <strong>Est. Value:</strong> $${jobDetails.estimatedValue.toLocaleString()}
      </div>

      <h3>Customer Information</h3>
      <div class="detail">
        <strong>Name:</strong> ${jobDetails.customerName}
      </div>
      <div class="detail">
        <strong>Phone:</strong> <a href="tel:${jobDetails.customerPhone}">${jobDetails.customerPhone}</a>
      </div>

      <h3>Damage Description</h3>
      <p>${jobDetails.damageDescription}</p>

      <a href="https://disasterrecovery.com.au/jobs/${jobDetails.jobId}" class="cta">
        Accept Job Now
      </a>
    </div>

    <div class="footer">
      <p>Disaster Recovery Brisbane</p>
      <p>24/7 Emergency Response | 1300 309 361</p>
      <p>admin@disasterrecovery.com.au</p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({ to, subject, html });
}

/**
 * Send quote ready email
 */
export async function sendQuoteReadyEmail(
  to: string,
  quoteDetails: {
    quoteId: string;
    customerName: string;
    serviceType: string;
    totalAmount: number;
    validUntil: string;
  }
): Promise<EmailResult> {
  const subject = `Your Quote is Ready - ${quoteDetails.serviceType}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563EB; color: white; padding: 20px; text-align: center; }
    .content { background: #f9fafb; padding: 20px; margin: 20px 0; }
    .price { font-size: 36px; font-weight: bold; color: #2563EB; text-align: center; margin: 20px 0; }
    .cta { background: #10B981; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; margin: 20px 0; border-radius: 5px; }
    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💰 Your Quote is Ready</h1>
    </div>

    <div class="content">
      <p>Hi ${quoteDetails.customerName},</p>

      <p>Thank you for choosing Disaster Recovery Brisbane. Your quote for ${quoteDetails.serviceType} service is ready for review.</p>

      <div class="price">
        $${quoteDetails.totalAmount.toLocaleString()}
      </div>

      <p><strong>Valid Until:</strong> ${quoteDetails.validUntil}</p>

      <p>This quote includes:</p>
      <ul>
        <li>Initial assessment and inspection</li>
        <li>All labor and materials</li>
        <li>Project management</li>
        <li>Insurance documentation support</li>
        <li>24/7 emergency support</li>
      </ul>

      <center>
        <a href="https://disasterrecovery.com.au/quotes/${quoteDetails.quoteId}" class="cta">
          View & Accept Quote
        </a>
      </center>

      <p>Questions? Our IICRC Master Restorer team is here to help.</p>
    </div>

    <div class="footer">
      <p>Disaster Recovery Brisbane</p>
      <p>24/7 Emergency Response | 1300 309 361</p>
      <p>admin@disasterrecovery.com.au</p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({ to, subject, html });
}

/**
 * Send job completion email
 */
export async function sendJobCompletionEmail(
  to: string,
  details: {
    customerName: string;
    serviceType: string;
    completionDate: string;
    invoiceUrl?: string;
  }
): Promise<EmailResult> {
  const subject = `Job Complete - ${details.serviceType}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10B981; color: white; padding: 20px; text-align: center; }
    .content { background: #f9fafb; padding: 20px; margin: 20px 0; }
    .cta { background: #2563EB; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; margin: 10px; border-radius: 5px; }
    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Job Complete</h1>
    </div>

    <div class="content">
      <p>Hi ${details.customerName},</p>

      <p>Your ${details.serviceType} restoration project has been completed successfully!</p>

      <p><strong>Completion Date:</strong> ${details.completionDate}</p>

      <p>We hope you're satisfied with our service. Your feedback helps us improve.</p>

      <center>
        ${details.invoiceUrl ? `<a href="${details.invoiceUrl}" class="cta">View Invoice</a>` : ''}
        <a href="https://disasterrecovery.com.au/feedback" class="cta">Leave Feedback</a>
      </center>

      <p>Thank you for choosing Disaster Recovery Brisbane - Brisbane's trusted IICRC Master Restorer.</p>
    </div>

    <div class="footer">
      <p>Disaster Recovery Brisbane</p>
      <p>24/7 Emergency Response | 1300 309 361</p>
      <p>admin@disasterrecovery.com.au</p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({ to, subject, html });
}

/**
 * Bulk email sending
 */
export async function sendBulkEmails(
  messages: EmailMessage[],
  config?: EmailConfig & { delayMs?: number }
): Promise<EmailResult[]> {
  const results: EmailResult[] = [];
  const delayMs = config?.delayMs || 100;

  for (const message of messages) {
    const result = await sendEmail(message, config);
    results.push(result);

    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}
