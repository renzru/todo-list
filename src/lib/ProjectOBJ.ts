

type ProjectOBJ = {
    title: string,
    list: Array,
    id: string
} 

function newProjectOBJ(): ProjectOBJ {
    return {
        title: '',
        list: [],
        id: (Math.random() * Date.now()).toString(32).substring(0, 8),
    }
}

export {ProjectOBJ, newProjectOBJ}

