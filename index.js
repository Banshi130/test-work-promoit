import { v4 as uuidv4 } from 'uuid';

class TodoList {
    static todoList = TodoList.getDataLocalStorage();

    static getList() {
        return TodoList.todoList;
    }

    static getItem(id) {
        return TodoList.todoList.find((item) => item.id === id);
    }
    
    static deleteItem(id) {
        TodoList.todoList = TodoList.todoList.filter((item) => item.id !== id);
        TodoList.updateLocalStorage(TodoList.todoList);
    }

    static addItem(payload) {
        const newItem = {
            id: uuidv4(),
            title: payload?.title || null,
            description: payload?.description || null,
            dataStart: new Date(),
            dataEnd: payload?.dataEnd || null,
            isDone: !!payload?.isDone
        };
        
        TodoList.todoList.push(newItem);
        TodoList.updateLocalStorage(TodoList.todoList);
    }

    static putItem(id, payload) {
        const index  = TodoList.todoList.findIndex((item) => item.id === id);
       const dateEdit = new Date().toISOString();
       
        if (index === undefined) return;

        TodoList.todoList[index] = {
            ...TodoList.todoList[index],
            dataEnd : dateEdit,
            ...payload,
            
            
        };
        
        TodoList.updateLocalStorage(TodoList.todoList);
    }

    static updateLocalStorage(payload) {
        localStorage.setItem('todoList', JSON.stringify(payload));
    }

    static getDataLocalStorage() {
        const data = JSON.parse(localStorage.getItem('todoList'));
        return Array.isArray(data) ? data : [];
    }
}

TodoList.addItem({
    title: '1',
})
TodoList.addItem({
    title: '2',
})
TodoList.addItem({
    title: '3',
})

console.log(TodoList.getList(), 'В классе')
console.log(TodoList.getDataLocalStorage(), 'В LocalStorage')

console.log('Этап записи завершен')

TodoList.putItem(TodoList.todoList[0].id, {
    title: '111111111111',
    isDone: 'Выполнена'
})

console.log(TodoList.getList(), 'В классе')
console.log(TodoList.getDataLocalStorage(), 'В LocalStorage')

console.log('Этап изменения завершен')

 TodoList.deleteItem(TodoList.todoList[2].id)

console.log(TodoList.getList(), 'В классе')
console.log(TodoList.getDataLocalStorage(), 'В LocalStorage')

console.log('Этап удаления завершен')

console.log('получение одной записи')
console.log(TodoList.getItem(TodoList.todoList[0].id))