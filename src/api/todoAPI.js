const API_BASE_URL = 'https://mark-aragon-preezie-566cd548cf0e.herokuapp.com/api/todo';

export async function fetchTodos() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            console.log('No data found');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}

export async function addTodo(title) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        if (!response.ok) {
            throw new Error('Error adding todo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
}

export async function toggleTodo(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error updating todo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
}

export async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error deleting todo');
        }

        return true; 
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
}
