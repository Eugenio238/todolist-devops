<script setup lang="ts">
import { reactive } from "vue";
import { useAuth } from "../composables/useAuth";

const { register, isLoading, error } = useAuth();

const formData = reactive({
  name: "",
  email: "",
  password: "",
});

const handleSubmit = async () => {
  await register(
    formData.name,
    formData.email,
    formData.password
  );
};
</script>

<template>
  <div class="min-vh-100 bg-light d-flex align-items-center">

    <div class="container">

      <div class="row justify-content-center">

        <div class="col-md-6 col-lg-5">

          <div class="card border-0 shadow-sm">

            <div class="card-body p-4">

              <div class="text-center mb-4">

                <i
                  class="bi bi-person-plus text-primary fs-1"
                ></i>

                <h1 class="h3 mt-2">
                  Créer un compte
                </h1>

                <p class="text-secondary">
                  Commencez à organiser vos tâches.
                </p>

              </div>

              <div
                v-if="error"
                class="alert alert-danger"
              >
                {{ error }}
              </div>

              <form @submit.prevent="handleSubmit">

                <div class="mb-3">

                  <label
                    for="name"
                    class="form-label"
                  >
                    Nom
                  </label>

                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    class="form-control"
                    placeholder="Votre nom"
                    required
                  />

                </div>

                <div class="mb-3">

                  <label
                    for="email"
                    class="form-label"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    class="form-control"
                    placeholder="vous@example.com"
                    required
                  />

                </div>

                <div class="mb-3">

                  <label
                    for="password"
                    class="form-label"
                  >
                    Mot de passe
                  </label>

                  <input
                    id="password"
                    v-model="formData.password"
                    type="password"
                    class="form-control"
                    placeholder="Minimum 8 caractères"
                    minlength="8"
                    required
                  />

                </div>

                <button
                  type="submit"
                  class="btn btn-primary w-100"
                  :disabled="isLoading"
                >
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>

                  {{
                    isLoading
                      ? "Création..."
                      : "Créer mon compte"
                  }}
                </button>

              </form>

              <div class="text-center mt-4">

                <span class="text-secondary">
                  Vous avez déjà un compte ?
                </span>

                <router-link
                  to="/login"
                  class="text-decoration-none ms-1"
                >
                  Se connecter
                </router-link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>