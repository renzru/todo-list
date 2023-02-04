type TaskOBJ = {
    isDone: boolean;
    title: string;
    notes: string;
    priority: string;
    duedate: string;
    id: string;
} 

function newTaskOBJ():TaskOBJ {
    return {
        isDone: false,
        title: '',
        notes: '',
        priority: 'None',
        duedate: 'None',
        id: (Math.random()*Date.now()).toString(32).substring(0, 8)
    }
}

export {TaskOBJ, newTaskOBJ}
