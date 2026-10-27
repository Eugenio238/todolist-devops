import { ref } from "vue";
import api from "../services/api";
import type {
  CreateTodoData,
  Todo,
  UpdateTodoData,
} from "../types/todo";

const todos = ref<Todo[]>([]);
const isLoading = ref(false);
const isCreating = ref(false);
const isUpdating = ref(false);
const error = ref("");

export function useTodos() {
  const loadTodos = async () => {
    isLoading.value = true;
    error.value = "";

    try {
      const response = await api.get("/todos");

      todos.value = response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        "Impossible de charger les tâches.";
    } finally {
      isLoading.value = false;
    }
  };

  const createTodo = async (
    data: CreateTodoData
  ) => {
    isCreating.value = true;
    error.value = "";

    try {
      const response = await api.post("/todos", data);

      todos.value.unshift(response.data.todo);

      return true;
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        "Impossible de créer la tâche.";

      return false;
    } finally {
      isCreating.value = false;
    }
  };

  const updateTodo = async (
    id: number,
    data: UpdateTodoData
  ) => {
    isUpdating.value = true;
    error.value = "";

    try {
      const response = await api.put(
        `/todos/${id}`,
        data
      );

      const index = todos.value.findIndex(
        (todo) => todo.id === id
      );

      if (index !== -1) {
        todos.value[index] = response.data.todo;
      }

      return true;
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        "Impossible de modifier la tâche.";

      return false;
    } finally {
      isUpdating.value = false;
    }
  };

  const deleteTodo = async (id: number) => {
    error.value = "";

    try {
      await api.delete(`/todos/${id}`);

      todos.value = todos.value.filter(
        (todo) => todo.id !== id
      );

      return true;
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        "Impossible de supprimer la tâche.";

      return false;
    }
  };

  const toggleTodo = async (todo: Todo) => {
    return updateTodo(todo.id, {
      completed: !todo.completed,
    });
  };

  return {
    todos,
    isLoading,
    isCreating,
    isUpdating,
    error,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
}