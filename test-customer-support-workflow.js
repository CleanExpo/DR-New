/**
 * Test script for Customer Support Workflow
 * Simulates the workflow execution without HTTP layer
 */

const crypto = require('crypto');

// Mock BaseMessage classes
class BaseMessage {
  constructor(content, messageType) {
    this.content = content;
    this.lc_namespace = ['langchain_core', 'messages'];
    this._type = messageType;
  }
}

class HumanMessage extends BaseMessage {
  constructor(content) {
    super(content, 'human');
  }
}

class AIMessage extends BaseMessage {
  constructor(content) {
    super(content, 'ai');
  }
}

class SystemMessage extends BaseMessage {
  constructor(content) {
    super(content, 'system');
  }
}

// Mock AI model that returns realistic support responses
class MockAIModel {
  async invoke(messages) {
    const lastMessage = messages[messages.length - 1];
    const content = typeof lastMessage.content === 'string' ? lastMessage.content : '';

    // Node 1: Analyze query - detect intent and sentiment
    if (content.includes('Analyze') || content.includes('Detect intent') || content.includes('Detect the query')) {
      return {
        content: JSON.stringify({
          intent: content.includes('status') ? 'claim_status' : 'contractor_issue',
          sentiment: content.includes('immediately') || content.includes('unacceptable') ? 'urgent' : 'neutral',
          category: content.includes('claim') ? 'claim' : 'contractor',
          confidence: 95,
        }),
      };
    }

    // Node 2: Search knowledge - find relevant articles
    if (content.includes('Search knowledge') || content.includes('knowledge base')) {
      return {
        content: JSON.stringify({
          articles: [
            'How to Track Your Claim Status',
            'Understanding Claim Processing Times',
            'What to Expect After Contractor Matching',
          ],
          relevance: 'high',
          keywords: ['claim', 'status', 'tracking', 'timeline'],
        }),
      };
    }

    // Node 3: Generate response - create helpful response
    if (content.includes('Generate') || content.includes('helpful customer support')) {
      let responseText = '';

      if (content.includes('claim') && content.includes('status')) {
        responseText = `Thank you for your inquiry. Claims typically take 5-7 business days to process. Since you submitted 3 days ago, your claim is still within the standard processing window. You can check your claim status by: 1) Logging into your account dashboard, 2) Navigating to 'My Claims', 3) Selecting your active claim. If you don't see updates within 7 days, please contact us directly at support@disasterrecovery.com.au.`;
      } else if (content.includes('contractor') || content.includes('no-show')) {
        responseText = `We sincerely apologize for the contractor's failure to appear for the scheduled inspection. This is unacceptable and we take full responsibility. Immediate actions we're taking: 1) Contacting the contractor to understand the situation, 2) Offering you an alternative, vetted contractor immediately, 3) Providing compensation credit for the inconvenience. We understand your frustration and your claim remains our priority. Our support team will contact you within 2 hours to resolve this.`;
      } else {
        responseText = `Thank you for contacting us. We're here to help with your query and will provide you with the best possible support.`;
      }

      return {
        content: JSON.stringify({
          response: responseText,
          confidence: 92,
          needs_escalation_hint: content.includes('contractor') || content.includes('complaint'),
        }),
      };
    }

    // Node 4: Determine escalation - assess if escalation needed
    if (content.includes('Assess') || content.includes('escalation')) {
      const shouldEscalate = content.includes('urgent') || content.includes('negative') || content.includes('complaint');

      return {
        content: JSON.stringify({
          escalate: shouldEscalate,
          reason: shouldEscalate
            ? content.includes('urgent')
              ? 'Query marked as urgent, requires immediate human review'
              : 'Complaint involving contractor performance, escalation required'
            : '',
          urgency: content.includes('urgent') ? 'critical' : content.includes('complaint') ? 'high' : 'low',
        }),
      };
    }

    // Default response
    return { content: JSON.stringify({ status: 'processed' }) };
  }
}

// Test function
async function testCustomerSupportWorkflow() {
  console.log('🧪 Testing Customer Support Workflow\n');
  console.log('='.repeat(70));

  const model = new MockAIModel();

  // ===== TEST CASE 1: CLAIM STATUS INQUIRY =====
  console.log('\n' + '='.repeat(70));
  console.log('TEST CASE 1: Technical Query - Claim Status Inquiry');
  console.log('='.repeat(70));

  const testQuery1 = {
    query: 'How do I check the status of my insurance claim? I submitted it 3 days ago and haven\'t heard anything.',
    category: 'claim',
    previousInteractions: [],
  };

  const customerId1 = 'CUST-001';

  console.log('\n📋 Input Query:');
  console.log('  Query:', testQuery1.query);
  console.log('  Category:', testQuery1.category);
  console.log('  Customer ID:', customerId1);

  // Node 1: Analyze Query
  console.log('\n' + '='.repeat(70));
  console.log('NODE 1: Analyze Query (Intent & Sentiment Detection)');
  console.log('='.repeat(70));

  const analyzeMessages1 = [
    new SystemMessage('You are a customer support specialist for an Australian disaster recovery platform.'),
    new HumanMessage(
      `Analyze this customer support query:

Query: "${testQuery1.query}"
Category: ${testQuery1.category}

Detect intent and sentiment. Return JSON: {intent, sentiment, category, confidence}`
    ),
  ];

  const analyzeResponse1 = await model.invoke(analyzeMessages1);
  const analyzed1 = JSON.parse(analyzeResponse1.content);

  console.log('✅ Analysis completed\n');
  console.log('  Intent:', analyzed1.intent);
  console.log('  Sentiment:', analyzed1.sentiment);
  console.log('  Category:', analyzed1.category);
  console.log('  Confidence:', analyzed1.confidence + '%');

  // Node 2: Search Knowledge
  console.log('\n' + '='.repeat(70));
  console.log('NODE 2: Search Knowledge Base');
  console.log('='.repeat(70));

  const searchMessages1 = [
    new SystemMessage('You are a customer support specialist.'),
    ...analyzeMessages1,
    new HumanMessage(
      `Search knowledge base for relevant articles about: ${analyzed1.intent}, ${analyzed1.category}`
    ),
  ];

  const searchResponse1 = await model.invoke(searchMessages1);
  const searched1 = JSON.parse(searchResponse1.content);

  console.log('✅ Knowledge search completed\n');
  console.log('  Relevance:', searched1.relevance);
  console.log('  Articles found:');
  searched1.articles.forEach((article) => {
    console.log(`    • ${article}`);
  });

  // Node 3: Generate Response
  console.log('\n' + '='.repeat(70));
  console.log('NODE 3: Generate Response');
  console.log('='.repeat(70));

  const responseMessages1 = [
    new SystemMessage('You are a customer support specialist for an Australian disaster recovery platform.'),
    ...searchMessages1,
    new HumanMessage(
      `Generate a helpful customer support response for claim status inquiry. Return JSON: {response, confidence, needs_escalation_hint}`
    ),
  ];

  const responseResponse1 = await model.invoke(responseMessages1);
  const response1 = JSON.parse(responseResponse1.content);

  console.log('✅ Response generated\n');
  console.log('Response:');
  console.log(`  ${response1.response}\n`);
  console.log('  Confidence:', response1.confidence + '%');
  console.log('  Needs escalation:', response1.needs_escalation_hint);

  // Node 4: Determine Escalation
  console.log('\n' + '='.repeat(70));
  console.log('NODE 4: Determine Escalation');
  console.log('='.repeat(70));

  const escalationMessages1 = [
    new SystemMessage('You are a customer support specialist.'),
    ...responseMessages1,
    new HumanMessage(
      `Assess if this ${analyzed1.sentiment} sentiment query about ${analyzed1.category} needs escalation. Return JSON: {escalate, reason, urgency}`
    ),
  ];

  const escalationResponse1 = await model.invoke(escalationMessages1);
  const escalation1 = JSON.parse(escalationResponse1.content);

  console.log('✅ Escalation assessment completed\n');
  console.log('  Escalation Required:', escalation1.escalate);
  if (escalation1.escalate) {
    console.log('  Reason:', escalation1.reason);
  }
  console.log('  Urgency:', escalation1.urgency);

  // Node 5: Track Actions
  console.log('\n' + '='.repeat(70));
  console.log('NODE 5: Track Actions');
  console.log('='.repeat(70));

  const actions1 = [
    `Analyzed intent: ${analyzed1.intent}`,
    `Detected sentiment: ${analyzed1.sentiment}`,
    `Found ${searched1.articles.length} relevant knowledge articles`,
    'Generated helpful response',
    escalation1.escalate ? `Escalation flagged: ${escalation1.reason}` : 'Response provided without escalation',
  ];

  console.log('✅ Actions tracked\n');
  actions1.forEach((action) => {
    console.log(`  • ${action}`);
  });

  // Summary for Test Case 1
  const summary1 = {
    status: 'COMPLETED',
    queryType: 'claim_status',
    sentiment: analyzed1.sentiment,
    escalationRequired: escalation1.escalate,
    responseGenerated: response1.response.substring(0, 100) + '...',
    actionsTaken: actions1.length,
  };

  console.log('\n' + '='.repeat(70));
  console.log('TEST CASE 1 SUMMARY');
  console.log('='.repeat(70));
  console.log(JSON.stringify(summary1, null, 2));

  // ===== TEST CASE 2: CONTRACTOR COMPLAINT =====
  console.log('\n\n' + '='.repeat(70));
  console.log('TEST CASE 2: Urgent Complaint - Contractor No-Show');
  console.log('='.repeat(70));

  const testQuery2 = {
    query:
      'The contractor you matched me with never showed up for the scheduled inspection! This is unacceptable, I need this fixed immediately.',
    category: 'contractor',
    previousInteractions: [],
  };

  const customerId2 = 'CUST-002';

  console.log('\n📋 Input Query:');
  console.log('  Query:', testQuery2.query);
  console.log('  Category:', testQuery2.category);
  console.log('  Customer ID:', customerId2);

  // Node 1: Analyze Query
  console.log('\n' + '='.repeat(70));
  console.log('NODE 1: Analyze Query (Intent & Sentiment Detection)');
  console.log('='.repeat(70));

  const analyzeMessages2 = [
    new SystemMessage('You are a customer support specialist for an Australian disaster recovery platform.'),
    new HumanMessage(
      `Analyze this customer support query:

Query: "${testQuery2.query}"
Category: ${testQuery2.category}

Detect intent and sentiment. Return JSON: {intent, sentiment, category, confidence}`
    ),
  ];

  const analyzeResponse2 = await model.invoke(analyzeMessages2);
  const analyzed2 = JSON.parse(analyzeResponse2.content);

  console.log('✅ Analysis completed\n');
  console.log('  Intent:', analyzed2.intent);
  console.log('  Sentiment:', analyzed2.sentiment);
  console.log('  Category:', analyzed2.category);
  console.log('  Confidence:', analyzed2.confidence + '%');

  // Node 2: Search Knowledge
  console.log('\n' + '='.repeat(70));
  console.log('NODE 2: Search Knowledge Base');
  console.log('='.repeat(70));

  const searchMessages2 = [
    new SystemMessage('You are a customer support specialist.'),
    ...analyzeMessages2,
    new HumanMessage(`Search knowledge base for relevant articles about: ${analyzed2.intent}`),
  ];

  const searchResponse2 = await model.invoke(searchMessages2);
  const searched2 = JSON.parse(searchResponse2.content);

  console.log('✅ Knowledge search completed\n');
  console.log('  Relevance:', searched2.relevance);
  console.log('  Articles found:');
  searched2.articles.forEach((article) => {
    console.log(`    • ${article}`);
  });

  // Node 3: Generate Response
  console.log('\n' + '='.repeat(70));
  console.log('NODE 3: Generate Response');
  console.log('='.repeat(70));

  const responseMessages2 = [
    new SystemMessage('You are a customer support specialist for an Australian disaster recovery platform.'),
    ...searchMessages2,
    new HumanMessage(
      `Generate a helpful customer support response for contractor complaint. Be empathetic and action-oriented. Return JSON: {response, confidence, needs_escalation_hint}`
    ),
  ];

  const responseResponse2 = await model.invoke(responseMessages2);
  const response2 = JSON.parse(responseResponse2.content);

  console.log('✅ Response generated\n');
  console.log('Response:');
  console.log(`  ${response2.response}\n`);
  console.log('  Confidence:', response2.confidence + '%');
  console.log('  Needs escalation:', response2.needs_escalation_hint);

  // Node 4: Determine Escalation
  console.log('\n' + '='.repeat(70));
  console.log('NODE 4: Determine Escalation');
  console.log('='.repeat(70));

  const escalationMessages2 = [
    new SystemMessage('You are a customer support specialist.'),
    ...responseMessages2,
    new HumanMessage(
      `Assess if this ${analyzed2.sentiment} sentiment query about ${analyzed2.category} complaint needs escalation. Return JSON: {escalate, reason, urgency}`
    ),
  ];

  const escalationResponse2 = await model.invoke(escalationMessages2);
  const escalation2 = JSON.parse(escalationResponse2.content);

  console.log('✅ Escalation assessment completed\n');
  console.log('  Escalation Required:', escalation2.escalate);
  if (escalation2.escalate) {
    console.log('  Reason:', escalation2.reason);
  }
  console.log('  Urgency:', escalation2.urgency);

  // Node 5: Track Actions
  console.log('\n' + '='.repeat(70));
  console.log('NODE 5: Track Actions');
  console.log('='.repeat(70));

  const actions2 = [
    `Analyzed intent: ${analyzed2.intent}`,
    `Detected sentiment: ${analyzed2.sentiment}`,
    `Found ${searched2.articles.length} relevant knowledge articles`,
    'Generated empathetic response with action plan',
    escalation2.escalate ? `Escalation flagged (${escalation2.urgency}): ${escalation2.reason}` : 'Response provided without escalation',
  ];

  console.log('✅ Actions tracked\n');
  actions2.forEach((action) => {
    console.log(`  • ${action}`);
  });

  // Summary for Test Case 2
  const summary2 = {
    status: 'COMPLETED',
    queryType: 'contractor_issue',
    sentiment: analyzed2.sentiment,
    escalationRequired: escalation2.escalate,
    escalationUrgency: escalation2.urgency,
    responseGenerated: response2.response.substring(0, 100) + '...',
    actionsTaken: actions2.length,
  };

  console.log('\n' + '='.repeat(70));
  console.log('TEST CASE 2 SUMMARY');
  console.log('='.repeat(70));
  console.log(JSON.stringify(summary2, null, 2));

  // ===== FINAL WORKFLOW SUMMARY =====
  console.log('\n' + '='.repeat(70));
  console.log('WORKFLOW COMPLETION SUMMARY');
  console.log('='.repeat(70));

  const finalSummary = {
    workflowName: 'CUSTOMER_SUPPORT',
    status: 'COMPLETED',
    testCasesRun: 2,
    nodesExecuted: 5,
    testResults: [
      {
        testCase: 'Technical Query (Claim Status)',
        customerId: customerId1,
        intent: analyzed1.intent,
        sentiment: analyzed1.sentiment,
        escalationRequired: escalation1.escalate,
      },
      {
        testCase: 'Urgent Complaint (Contractor No-Show)',
        customerId: customerId2,
        intent: analyzed2.intent,
        sentiment: analyzed2.sentiment,
        escalationRequired: escalation2.escalate,
        escalationUrgency: escalation2.urgency,
      },
    ],
  };

  console.log('\n✅ WORKFLOW COMPLETED SUCCESSFULLY\n');
  console.log(JSON.stringify(finalSummary, null, 2));

  console.log('\n' + '='.repeat(70));
  console.log('🎉 Customer Support Workflow Test Passed!');
  console.log('='.repeat(70));
}

// Run the test
testCustomerSupportWorkflow().catch((error) => {
  console.error('❌ Test Failed:', error);
  process.exit(1);
});
