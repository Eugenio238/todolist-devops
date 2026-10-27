<script setup lang="ts">
import { onMounted, ref } from "vue";

import TodoForm from "../components/TodoForm.vue";
import TodoList from "../components/TodoList.vue";

import { useAuth } from "../composables/useAuth";
import { useTodos } from "../composables/useTodos";

import type { Todo } from "../types/todo";

const {
  user,
  logout,
  loadUser,
} = useAuth();

const {
  todos,
  isLoading,
  error,
  loadTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
} = useTodos();

const editingTodo = ref<Todo | null>(null);

const handleCreate = async (data: {
  title: string;
  description: string;
}) => {
  await createTodo(data);
};

const handleEdit = (todo: Todo) => {
  editingTodo.value = {
    ...todo,
  };
};

const handleSaveEdit = async () => {
  if (!editingTodo.value) {
    return;
  }

  const success = await updateTodo(
    editingTodo.value.id,
    {
      title: editingTodo.value.title,
      description:
        editingTodo.value.description ?? "",
    }
  );

  if (success) {
    editingTodo.value = null;
  }
};

const handleCancelEdit = () => {
  editingTodo.value = null;
};

onMounted(() => {
  loadUser();
  loadTodos();
});
</script>

<template>

  <div class="min-vh-100 bg-light">

    <nav class="navbar navbar-expand-lg bg-white border-bottom">

      <div class="container">

        <router-link
          to="/dashboard"
          class="navbar-brand fw-bold text-primary"
        >
          <i class="bi bi-check2-square me-2"></i>
          TodoApp
        </router-link>

        <div class="d-flex align-items-center gap-3">

          <span
            v-if="user"
            class="text-secondary"
          >
            Bonjour, {{ user.name }}
          </span>

          <button
            class="btn btn-outline-danger btn-sm"
            @click="logout"
          >
            <i class="bi bi-box-arrow-right me-1"></i>
            Déconnexion
          </button>

        </div>

      </div>

    </nav>

    <main class="container py-5">

      <div class="mb-4">

        <h1 class="h2 fw-bold">
          Mon tableau de bord
        </h1>

        <p class="text-secondary">
          Gérez simplement vos tâches quotidiennes.
        </p>

      </div>

      <div
        v-if="error"
        class="alert alert-danger"
      >
        {{ error }}
      </div>

      <div class="row">

        <div class="col-lg-5 mb-4">

          <TodoForm
            @create="handleCreate"
          />

        </div>

        <div class="col-lg-7">

          <div
            v-if="editingTodo"
            class="card border-0 shadow-sm mb-4"
          >

            <div class="card-body">

              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >

                <h2 class="h5 mb-0">
                  Modifier la tâche
                </h2>

                <button
                  class="btn btn-sm btn-outline-secondary"
                  @click="handleCancelEdit"
                >
                  Annuler
                </button>

              </div>

              <div class="mb-3">

                <label class="form-label">
                  Titre
                </label>

                <input
                  v-model="editingTodo.title"
                  type="text"
                  class="form-control"
                />

              </div>

              <div class="mb-3">

                <label class="form-label">
                  Description
                </label>

                <textarea
                  v-model="editingTodo.description"
                  class="form-control"
                  rows="3"
                ></textarea>

              </div>

              <button
                class="btn btn-primary"
                @click="handleSaveEdit"
              >
                <i class="bi bi-check-lg me-2"></i>
                Enregistrer
              </button>

            </div>

          </div>

          <TodoList
            :todos="todos"
            :is-loading="isLoading"
            @toggle="toggleTodo"
            @edit="handleEdit"
            @delete="deleteTodo"
          />

        </div>

      </div>

    </main>

  </div>

</template>