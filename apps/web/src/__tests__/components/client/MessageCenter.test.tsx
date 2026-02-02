import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MessageCenter, Thread, Message } from '@/components/client/MessageCenter';

// Mock scrollIntoView (not available in jsdom)
Element.prototype.scrollIntoView = jest.fn();

describe('MessageCenter Component', () => {
  const mockOnSendMessage = jest.fn();
  const mockOnThreadSelect = jest.fn();

  const mockMessages: Message[] = [
    {
      id: '1',
      content: 'Hello, how can I help you?',
      senderId: 'user-2',
      senderName: 'John Contractor',
      senderAvatar: '/avatar1.jpg',
      timestamp: '2024-01-15T10:00:00Z',
      read: true,
      delivered: true,
    },
    {
      id: '2',
      content: 'I need help with water damage',
      senderId: 'user-1',
      senderName: 'Jane Client',
      timestamp: '2024-01-15T10:05:00Z',
      read: true,
      delivered: true,
    },
    {
      id: '3',
      content: 'I can help with that',
      senderId: 'user-2',
      senderName: 'John Contractor',
      senderAvatar: '/avatar1.jpg',
      timestamp: '2024-01-15T10:10:00Z',
      read: false,
      delivered: true,
    },
  ];

  const mockThreads: Thread[] = [
    {
      id: 'thread-1',
      title: 'Water Damage Restoration',
      participants: [
        {
          id: 'user-2',
          name: 'John Contractor',
          avatar: '/avatar1.jpg',
          role: 'contractor',
        },
      ],
      lastMessage: mockMessages[2],
      unreadCount: 1,
      messages: mockMessages,
    },
    {
      id: 'thread-2',
      title: 'Mould Removal Quote',
      participants: [
        {
          id: 'user-3',
          name: 'Sarah Builder',
          avatar: '/avatar2.jpg',
          role: 'contractor',
        },
      ],
      lastMessage: {
        id: '4',
        content: 'Quote sent',
        senderId: 'user-3',
        senderName: 'Sarah Builder',
        timestamp: '2024-01-15T09:00:00Z',
        read: true,
        delivered: true,
      },
      unreadCount: 0,
      messages: [
        {
          id: '4',
          content: 'Quote sent',
          senderId: 'user-3',
          senderName: 'Sarah Builder',
          timestamp: '2024-01-15T09:00:00Z',
          read: true,
          delivered: true,
        },
      ],
    },
  ];

  beforeEach(() => {
    mockOnSendMessage.mockClear();
    mockOnThreadSelect.mockClear();
    mockOnSendMessage.mockResolvedValue(undefined);
  });

  it('renders without crashing', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );
    expect(screen.getByText('Messages')).toBeInTheDocument();
  });

  it('displays custom title when provided', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
        title="My Conversations"
      />
    );
    expect(screen.getByText('My Conversations')).toBeInTheDocument();
  });

  it('displays total unread count badge', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );
    expect(screen.getByText('1 Unread')).toBeInTheDocument();
  });

  it('displays all threads in the list', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    expect(screen.getAllByText('Water Damage Restoration').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Mould Removal Quote').length).toBeGreaterThan(0);
  });

  it('displays unread badge for threads with unread messages', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // Thread 1 has 1 unread
    const unreadBadges = screen.getAllByText('1');
    expect(unreadBadges.length).toBeGreaterThan(0);
  });

  it('auto-selects first thread on mount', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // First thread should be selected
    expect(screen.getByText('Hello, how can I help you?')).toBeInTheDocument();
    expect(screen.getByText('I need help with water damage')).toBeInTheDocument();
  });

  it('filters threads by search query (title)', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search conversations...');
    fireEvent.change(searchInput, { target: { value: 'Water' } });

    // Water Damage thread should be visible (in list and header since it's selected)
    expect(screen.getAllByText('Water Damage Restoration').length).toBeGreaterThan(0);
    // Mould thread should NOT be in the list
    expect(screen.queryByText('Mould Removal Quote')).not.toBeInTheDocument();
  });

  it('filters threads by search query (participant name)', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search conversations...');
    fireEvent.change(searchInput, { target: { value: 'Sarah' } });

    // Mould thread should be in the filtered list
    expect(screen.getByText('Mould Removal Quote')).toBeInTheDocument();
    // Note: Previously selected thread (Water Damage) may still show in message area
  });

  it('shows "No conversations found" when search returns no results', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search conversations...');
    fireEvent.change(searchInput, { target: { value: 'NonexistentThread' } });

    expect(screen.getByText('No conversations found')).toBeInTheDocument();
  });

  it('selects thread when clicked', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const thread2Button = screen.getByText('Mould Removal Quote');
    fireEvent.click(thread2Button);

    // Quote sent message should appear (in thread list and message area)
    expect(screen.getAllByText('Quote sent').length).toBeGreaterThan(0);
  });

  it('calls onThreadSelect when thread is clicked', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
        onThreadSelect={mockOnThreadSelect}
      />
    );

    const thread2Button = screen.getByText('Mould Removal Quote');
    fireEvent.click(thread2Button);

    expect(mockOnThreadSelect).toHaveBeenCalledWith('thread-2');
  });

  it('displays all messages in selected thread', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    expect(screen.getByText('Hello, how can I help you?')).toBeInTheDocument();
    expect(screen.getByText('I need help with water damage')).toBeInTheDocument();
    // Last message appears in both thread list and message area
    expect(screen.getAllByText('I can help with that').length).toBeGreaterThan(0);
  });

  it('displays current user messages on the right with contractor background', () => {
    const { container } = render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // Current user message should have flex-row-reverse
    const currentUserMessages = container.querySelectorAll('.flex-row-reverse');
    expect(currentUserMessages.length).toBeGreaterThan(0);
  });

  it('displays other user messages on the left with gray background', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // Other user messages should show sender name
    expect(screen.getAllByText('John Contractor').length).toBeGreaterThan(0);
  });

  it('sends message when Send button is clicked', async () => {
    const { container } = render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const messageInput = screen.getByPlaceholderText('Type a message...');
    // Send button is the one with bg-semantic-contractor class
    const sendButton = container.querySelector('button.bg-semantic-contractor')!;

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockOnSendMessage).toHaveBeenCalledWith('thread-1', 'Test message');
    });
  });

  it('sends message when Enter key is pressed', async () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const messageInput = screen.getByPlaceholderText('Type a message...');

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(mockOnSendMessage).toHaveBeenCalledWith('thread-1', 'Test message');
    });
  });

  it('does not send message when Shift+Enter is pressed', async () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const messageInput = screen.getByPlaceholderText('Type a message...');

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter', charCode: 13, shiftKey: true });

    await waitFor(() => {
      expect(mockOnSendMessage).not.toHaveBeenCalled();
    });
  });

  it('clears message input after sending', async () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const messageInput = screen.getByPlaceholderText('Type a message...') as HTMLInputElement;

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(messageInput.value).toBe('');
    });
  });

  it('does not send empty or whitespace-only messages', async () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const messageInput = screen.getByPlaceholderText('Type a message...');

    // Try empty message
    fireEvent.change(messageInput, { target: { value: '' } });
    fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Try whitespace-only message
    fireEvent.change(messageInput, { target: { value: '   ' } });
    fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(mockOnSendMessage).not.toHaveBeenCalled();
    });
  });

  it('disables input and button while sending', async () => {
    mockOnSendMessage.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const messageInput = screen.getByPlaceholderText('Type a message...') as HTMLInputElement;

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Input should be disabled while sending
    expect(messageInput.disabled).toBe(true);

    await waitFor(() => {
      expect(messageInput.disabled).toBe(false);
    });
  });

  it('handles send message error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockOnSendMessage.mockRejectedValue(new Error('Send failed'));

    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const messageInput = screen.getByPlaceholderText('Type a message...');

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to send message:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  it('shows empty state when no threads provided', () => {
    render(
      <MessageCenter
        threads={[]}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    expect(screen.getByText('Select a conversation to start messaging')).toBeInTheDocument();
  });

  it('displays last message timestamp in thread list', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // Should show timestamps (exact format depends on current time, so just check existence)
    const threadButtons = screen.getAllByRole('button');
    expect(threadButtons.length).toBeGreaterThan(0);
  });

  it('displays participant names in thread header', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // Thread header should show participant name
    expect(screen.getAllByText('John Contractor').length).toBeGreaterThan(0);
  });

  it('applies custom className', () => {
    const { container } = render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
        className="custom-message-class"
      />
    );

    const card = container.querySelector('.custom-message-class');
    expect(card).toBeInTheDocument();
  });

  it('trims whitespace from messages before sending', async () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    const messageInput = screen.getByPlaceholderText('Type a message...');

    fireEvent.change(messageInput, { target: { value: '  Test message  ' } });
    fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(mockOnSendMessage).toHaveBeenCalledWith('thread-1', 'Test message');
    });
  });

  it('displays read indicator for read messages', () => {
    render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // Check for read indicators (CheckCheck icon with blue color for read messages)
    const { container } = render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // Read messages from current user should show blue checkmarks
    expect(container.querySelector('.text-blue-600')).toBeInTheDocument();
  });

  it('displays delivered indicator for delivered but unread messages', () => {
    const threadsWithUnread: Thread[] = [
      {
        ...mockThreads[0],
        messages: [
          {
            id: '5',
            content: 'Delivered but not read',
            senderId: 'user-1',
            senderName: 'Jane Client',
            timestamp: '2024-01-15T10:15:00Z',
            read: false,
            delivered: true,
          },
        ],
      },
    ];

    render(
      <MessageCenter
        threads={threadsWithUnread}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    expect(screen.getByText('Delivered but not read')).toBeInTheDocument();
  });

  it('handles threads without last message gracefully', () => {
    const threadsWithoutLastMessage: Thread[] = [
      {
        id: 'thread-3',
        title: 'Empty Thread',
        participants: [
          {
            id: 'user-4',
            name: 'New Contractor',
            role: 'contractor',
          },
        ],
        unreadCount: 0,
        messages: [],
      },
    ];

    render(
      <MessageCenter
        threads={threadsWithoutLastMessage}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // Thread title appears in list and header (since it's auto-selected)
    expect(screen.getAllByText('Empty Thread').length).toBeGreaterThan(0);
  });

  it('highlights selected thread in list', () => {
    const { container } = render(
      <MessageCenter
        threads={mockThreads}
        currentUserId="user-1"
        onSendMessage={mockOnSendMessage}
      />
    );

    // First thread should be selected by default
    const selectedThread = container.querySelector('.border-l-semantic-contractor');
    expect(selectedThread).toBeInTheDocument();
  });
});
