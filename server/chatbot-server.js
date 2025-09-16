// WebSocket server for real-time chat functionality
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Store active conversations
const conversations = new Map();
const agents = new Map();

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle joining a conversation
  socket.on('join-conversation', ({ conversationId }) => {
    socket.join(conversationId);

    if (!conversations.has(conversationId)) {
      conversations.set(conversationId, {
        id: conversationId,
        messages: [],
        participants: [],
        startTime: new Date(),
        status: 'active'
      });
    }

    const conversation = conversations.get(conversationId);
    conversation.participants.push(socket.id);

    console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
  });

  // Handle messages
  socket.on('message', (message) => {
    const { conversationId } = message;

    if (conversations.has(conversationId)) {
      const conversation = conversations.get(conversationId);
      conversation.messages.push(message);

      // Broadcast to all participants in the conversation
      io.to(conversationId).emit('message', message);

      // Check if emergency and notify agents
      if (message.metadata?.urgency?.level === 'critical') {
        io.to('agents').emit('emergency-alert', {
          conversationId,
          message
        });
      }
    }
  });

  // Handle agent request
  socket.on('request-agent', ({ conversationId }) => {
    // Find available agent
    const availableAgent = Array.from(agents.values()).find(
      agent => agent.status === 'available' && agent.currentChats < agent.maxChats
    );

    if (availableAgent) {
      // Assign agent to conversation
      availableAgent.currentChats++;

      io.to(conversationId).emit('agent-joined', {
        id: availableAgent.id,
        name: availableAgent.name,
        specialization: availableAgent.specialization
      });

      // Notify agent
      io.to(availableAgent.socketId).emit('new-conversation', {
        conversationId
      });
    } else {
      // Queue for agent
      io.to(conversationId).emit('queued-for-agent', {
        position: Math.floor(Math.random() * 5) + 1
      });
    }
  });

  // Handle typing indicator
  socket.on('typing', ({ conversationId, isTyping }) => {
    socket.to(conversationId).emit('typing', { isTyping });
  });

  // Handle quote request
  socket.on('request-quote', ({ conversationId, serviceType, context }) => {
    // Generate mock quote
    const quote = {
      id: `QTE-${Date.now()}`,
      items: [
        {
          service: serviceType,
          description: 'Initial assessment and setup',
          quantity: 1,
          unitPrice: 500,
          total: 500
        },
        {
          service: serviceType,
          description: 'Restoration work',
          quantity: 1,
          unitPrice: 3500,
          total: 3500
        },
        {
          service: serviceType,
          description: 'Final inspection and cleanup',
          quantity: 1,
          unitPrice: 500,
          total: 500
        }
      ],
      subtotal: 4500,
      tax: 450,
      total: 4950,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'draft'
    };

    io.to(conversationId).emit('quote-generated', quote);
  });

  // Handle booking request
  socket.on('schedule-booking', ({ conversationId, booking }) => {
    // Process booking
    const confirmedBooking = {
      ...booking,
      id: `BKG-${Date.now()}`,
      status: 'confirmed',
      confirmationCode: Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    io.to(conversationId).emit('booking-confirmed', confirmedBooking);
  });

  // Handle conversation rating
  socket.on('rate-conversation', ({ conversationId, rating, feedback }) => {
    if (conversations.has(conversationId)) {
      const conversation = conversations.get(conversationId);
      conversation.rating = rating;
      conversation.feedback = feedback;

      console.log(`Conversation ${conversationId} rated: ${rating}/5`);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

    // Remove from conversations
    conversations.forEach((conversation) => {
      const index = conversation.participants.indexOf(socket.id);
      if (index > -1) {
        conversation.participants.splice(index, 1);
      }
    });

    // Remove if agent
    agents.delete(socket.id);
  });
});

// REST endpoints for admin dashboard
app.get('/api/conversations', (req, res) => {
  const activeConversations = Array.from(conversations.values())
    .filter(conv => conv.status === 'active')
    .map(conv => ({
      id: conv.id,
      messageCount: conv.messages.length,
      participants: conv.participants.length,
      startTime: conv.startTime,
      lastMessage: conv.messages[conv.messages.length - 1],
      status: conv.status
    }));

  res.json(activeConversations);
});

app.get('/api/analytics', (req, res) => {
  const totalConversations = conversations.size;
  const activeConversations = Array.from(conversations.values())
    .filter(conv => conv.status === 'active').length;

  const avgRating = Array.from(conversations.values())
    .filter(conv => conv.rating)
    .reduce((acc, conv) => acc + conv.rating, 0) /
    Array.from(conversations.values()).filter(conv => conv.rating).length || 0;

  res.json({
    totalConversations,
    activeConversations,
    averageRating: avgRating.toFixed(1),
    totalMessages: Array.from(conversations.values())
      .reduce((acc, conv) => acc + conv.messages.length, 0)
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});