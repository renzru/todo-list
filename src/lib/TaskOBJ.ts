type TaskOBJ = {
    isDone: boolean;
    title: string;
    notes: string;
    priority: string;
} 

function newTaskOBJ():TaskOBJ {
    return {
        isDone: false,
        title: '',
        notes: '',
        priority: 'None',
    }
}

export {TaskOBJ, newTaskOBJ}
