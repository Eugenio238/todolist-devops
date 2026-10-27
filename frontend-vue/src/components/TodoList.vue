<script setup lang="ts">
import type { Todo } from "../types/todo";

defineProps<{
  todos: Todo[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  toggle: [todo: Todo];
  edit: [todo: Todo];
  delete: [id: number];
}>();
</script>

<template>

  <div class="card border-0 shadow-sm">

    <div class="card-body">

      <h2 class="h5 mb-3">
        <i class="bi bi-list-check me-2"></i>
        Mes tâches
      </h2>

      <div
        v-if="isLoading"
        class="text-center py-4"
      >
        <div
          class="spinner-border text-primary"
        ></div>
      </div>

      <div
        v-else-if="todos.length === 0"
        class="text-center py-5 text-secondary"
      >
        <i class="bi bi-inbox fs-1 d-block mb-3"></i>

        <p class="mb-0">
          Aucune tâche pour le moment.
        </p>
      </div>

      <div
        v-else
        class="list-group list-group-flush"
      >

        <div
          v-for="todo in todos"
          :key="todo.id"
          class="list-group-item px-0"
        >

          <div
            class="d-flex align-items-start justify-content-between gap-3"
          >

            <div class="d-flex gap-3">

              <input
                class="form-check-input mt-1"
                type="checkbox"
                :checked="todo.completed"
                @change="emit('toggle', todo)"
              />

              <div>

                <h3
                  class="h6 mb-1"
                  :class="{
                    'text-decoration-line-through text-secondary':
                      todo.completed
                  }"
                >
                  {{ todo.title }}
                </h3>

                <p
                  v-if="todo.description"
                  class="small text-secondary mb-0"
                >
                  {{ todo.description }}
                </p>

              </div>

            </div>

            <div class="d-flex gap-2">

              <button
                class="btn btn-sm btn-outline-primary"
                @click="emit('edit', todo)"
              >
                <i class="bi bi-pencil"></i>
              </button>

              <button
                class="btn btn-sm btn-outline-danger"
                @click="emit('delete', todo.id)"
              >
                <i class="bi bi-trash"></i>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>