import type {Meta, StoryObj} from '@storybook/react';

import {Task} from 'features/todolistList/ui/todolist/tasks/task/Task';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/task',
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {
            id: '1',
            title: 'CSS',
            addedDate: new Date(),
            order: 0,
            deadline: null,
            todoListId: 'todolistId1',
            description: null,
            priority: 1,
            status: 1,
            startDate: null

        },
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {
            id: '1',
            title: 'CSS',
            addedDate: new Date(),
            order: 0,
            deadline: null,
            todoListId: 'todolistId1',
            description: null,
            priority: 1,
            status: 1,
            startDate: null

        },
    },
};
