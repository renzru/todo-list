type TaskOBJ = {
    isDone: boolean;
    title: string;
    notes: string;
    priority: string;
    id: string;
} 

function newTaskOBJ():TaskOBJ {
    return {
        isDone: false,
        title: '',
        notes: '',
        priority: 'None',
        id: (Math.random()*Date.now()).toString(32).substring(0, 8)
    }
}

export {TaskOBJ, newTaskOBJ}
