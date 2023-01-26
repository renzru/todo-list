type TaskOBJ = {
    isDone: boolean;
    title: string;
    notes: string;
    priority: string;
} 

function newTaskOBJ() {
    return {
        isDone: false,
        title: '',
        notes: '',
        priority: 'None',
    }
}

export {TaskOBJ, newTaskOBJ}
