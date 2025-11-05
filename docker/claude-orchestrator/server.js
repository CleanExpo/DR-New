const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Redis connection with retry logic
let redis;
const connectRedis = () => {
  redis = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    maxRetriesPerRequest: 20
  });

  redis.on('connect', () => {
    console.log('✅ Connected to Redis');
  });

  redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err.message);
  });

  redis.on('ready', () => {
    console.log('✅ Redis is ready');
  });
};

connectRedis();

// In-memory task storage (for simple demo)
const tasks = new Map();

// Health check endpoint
app.get('/health', async (req, res) => {
  let redisStatus = 'disconnected';
  try {
    await redis.ping();
    redisStatus = 'connected';
  } catch (error) {
    redisStatus = 'error';
  }

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    redis: redisStatus,
    agents: [],
    activeTasks: tasks.size
  });
});

// Submit a task
app.post('/task', async (req, res) => {
  try {
    const { type, input, context = {}, priority = 5 } = req.body;

    if (!type || !input) {
      return res.status(400).json({
        error: 'Missing required fields: type and input'
      });
    }

    const taskId = uuidv4();
    const task = {
      id: taskId,
      type,
      input,
      context,
      priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store task
    tasks.set(taskId, task);

    // Store in Redis if available
    try {
      await redis.set(`task:${taskId}`, JSON.stringify(task));
      await redis.lpush('task_queue', taskId);
    } catch (redisError) {
      console.warn('Redis storage failed, using in-memory only:', redisError.message);
    }

    console.log(`📨 New task submitted: ${taskId} (${type})`);

    // Simulate task processing
    setTimeout(() => {
      processTask(taskId);
    }, 1000);

    res.json({
      taskId,
      status: 'pending',
      message: 'Task submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting task:', error);
    res.status(500).json({
      error: 'Failed to submit task',
      message: error.message
    });
  }
});

// Get task status
app.get('/task/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    
    let task = tasks.get(taskId);

    // Try Redis if not in memory
    if (!task) {
      try {
        const taskData = await redis.get(`task:${taskId}`);
        if (taskData) {
          task = JSON.parse(taskData);
        }
      } catch (redisError) {
        console.warn('Redis fetch failed:', redisError.message);
      }
    }

    if (!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      error: 'Failed to fetch task',
      message: error.message
    });
  }
});

// List all tasks
app.get('/tasks', (req, res) => {
  const taskList = Array.from(tasks.values());
  res.json({
    total: taskList.length,
    tasks: taskList
  });
});

// Process a task (simulated)
async function processTask(taskId) {
  const task = tasks.get(taskId);
  if (!task) return;

  console.log(`⚙️ Processing task ${taskId}: ${task.type}`);

  // Update status to in-progress
  task.status = 'in-progress';
  task.updatedAt = new Date().toISOString();
  tasks.set(taskId, task);

  try {
    await redis.set(`task:${taskId}`, JSON.stringify(task));
  } catch (err) {
    console.warn('Redis update failed:', err.message);
  }

  // Simulate processing time
  setTimeout(async () => {
    // Generate result based on task type
    const result = generateTaskResult(task);

    task.status = 'completed';
    task.result = result;
    task.completedAt = new Date().toISOString();
    task.updatedAt = new Date().toISOString();
    tasks.set(taskId, task);

    try {
      await redis.set(`task:${taskId}`, JSON.stringify(task));
    } catch (err) {
      console.warn('Redis update failed:', err.message);
    }

    console.log(`✅ Task completed: ${taskId}`);
  }, 3000 + Math.random() * 2000);
}

// Generate simulated task results
function generateTaskResult(task) {
  const results = {
    generate: {
      message: `Generated ${task.type} content`,
      files: [`generated_${Date.now()}.tsx`],
      summary: `Successfully generated code for: ${task.input}`
    },
    test: {
      message: `Tests executed for ${task.input}`,
      passed: Math.floor(Math.random() * 50) + 40,
      failed: Math.floor(Math.random() * 5),
      coverage: `${Math.floor(Math.random() * 20) + 75}%`
    },
    optimize: {
      message: `Optimization completed for ${task.input}`,
      improvements: [
        'Reduced bundle size by 15%',
        'Improved load time by 200ms',
        'Enhanced SEO score to 95/100'
      ]
    },
    deploy: {
      message: `Deployment to ${task.context.environment || 'production'}`,
      url: 'https://disaster-recovery-brisbane.vercel.app',
      status: 'live'
    },
    default: {
      message: `Task processed: ${task.input}`,
      status: 'completed'
    }
  };

  return results[task.type] || results.default;
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🤖 Claude Orchestrator`);
  console.log(`================================`);
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 Redis: ${REDIS_HOST}:${REDIS_PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
  console.log(`❤️  Health: http://localhost:${PORT}/health\n`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await redis.quit();
  process.exit(0);
});
