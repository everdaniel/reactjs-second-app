import { db }  from './base';

export function getAllTodos() {
    return db.collection('todos')
        .get()
        .then(snapshot => {
            const data = snapshot.docs.map(item => {
                return {
                    ...item.data(),
                    id: item.id
                }
            })
            return data;
        })
        .catch(err => {
            console.error(err)
        })
}

export const createTodo = ({ task, isDone = false }) => {
    return db
        .collection('todos')
        .add({
            task,
            isDone
        })
        .then(item => {
            return item.get().then(data => {
                let newTodo = {
                    ...data.data(),
                    id: data.id
            };
            return newTodo;
        });
    });
};

export const deleteTodo = id => {
  return db
    .collection('todos')
    .doc(id)
    .delete();
};

export const toggleIsDone = todo => {
    return db
        .collection("todos")
        .doc(todo.id)
        .update({ isDone: !todo.isDone });
};
