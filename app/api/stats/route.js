import { NextResponse } from 'next/server';

// This would typically connect to the same database as tasks
// For demo purposes, we'll calculate stats from the tasks array
// In a real app, this would be optimized with database queries

export async function GET() {
  try {
    // In a real app, you'd fetch tasks from database
    // For demo, we'll return mock statistics
    const stats = {
      totalTasks: 0,
      completedTasks: 0,
      activeTasks: 0,
      completionRate: 0,
      priorityBreakdown: {
        high: 0,
        medium: 0,
        low: 0
      },
      recentActivity: {
        tasksCreatedToday: 0,
        tasksCompletedToday: 0
      },
      productivity: {
        averageCompletionTime: '2.5 hours',
        mostProductiveHour: '10 AM',
        streak: 3
      }
    };

    return NextResponse.json({ stats });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}