import Todo from '../models/Todo.js';

// @desc    Get all todos
// @route   GET /api/todos
export const getTodos = async (req, res) => {
  try {
    const { filter, priority, sort } = req.query;

    let query = {};

    // Filter by completion status
    if (filter === 'active') query.completed = false;
    else if (filter === 'completed') query.completed = true;

    // Filter by priority
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      query.priority = priority;
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // newest first by default
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    else if (sort === 'priority') sortOption = { priority: -1 };
    else if (sort === 'dueDate') sortOption = { dueDate: 1 };

    const todos = await Todo.find(query).sort(sortOption);
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a todo
// @route   POST /api/todos
export const createTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const todo = await Todo.create({ title, description, priority, dueDate });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle todo completion
// @route   PATCH /api/todos/:id/toggle
export const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete all completed todos
// @route   DELETE /api/todos/completed
export const clearCompleted = async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true });
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} completed todos cleared`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
