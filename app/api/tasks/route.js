import { NextResponse } from 'next/server';

// In-memory storage for demo purposes
// In a real app, this would be a database
let tasks = [
  {
    id: '1',
    text: 'Welcome to TaskFlow! Edit or delete this task to get started.',
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
  }
];

export async function GET() {
  return NextResponse.json({ tasks });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, priority = 'medium' } = body;

    if (!text || text.trim() === '') {
      return NextResponse.json(
        { error: 'Task text is required' },
        { status: 400 }
      );
    }

    const newTask = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, text, completed, priority } = body;

    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...(text !== undefined && { text: text.trim() }),
      ...(completed !== undefined && { completed }),
      ...(priority !== undefined && { priority }),
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );
    }

    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    tasks.splice(taskIndex, 1);
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}