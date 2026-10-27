<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  create: [
    data: {
      title: string;
      description: string;
    }
  ];
}>();

const title = ref("");
const description = ref("");

const handleSubmit = () => {
  if (!title.value.trim()) {
    return;
  }

  emit("create", {
    title: title.value,
    description: description.value,
  });

  title.value = "";
  description.value = "";
};
</script>

<template>
  <div class="card border-0 shadow-sm mb-4">

    <div class="card-body">

      <h2 class="h5 mb-3">
        <i class="bi bi-plus-circle me-2"></i>
        Ajouter une tâche
      </h2>

      <form @submit.prevent="handleSubmit">

        <div class="mb-3">

          <label class="form-label">
            Titre
          </label>

          <input
            v-model="title"
            type="text"
            class="form-control"
            placeholder="Ex : Apprendre Vue.js"
            required
          />

        </div>

        <div class="mb-3">

          <label class="form-label">
            Description
          </label>

          <textarea
            v-model="description"
            class="form-control"
            rows="3"
            placeholder="Description de la tâche"
          ></textarea>

        </div>

        <button
          type="submit"
          class="btn btn-primary"
        >
          <i class="bi bi-plus-lg me-2"></i>
          Ajouter
        </button>

      </form>

    </div>

  </div>
</template>