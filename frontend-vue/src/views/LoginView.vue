<script setup lang="ts">
import { reactive } from "vue";
import { useAuth } from "../composables/useAuth";

const { login, isLoading, error } = useAuth();

const formData = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  await login(
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
                  class="bi bi-box-arrow-in-right text-primary fs-1"
                ></i>

                <h1 class="h3 mt-2">
                  Connexion
                </h1>

                <p class="text-secondary">
                  Connectez-vous pour gérer vos tâches.
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
                    placeholder="Votre mot de passe"
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
                      ? "Connexion..."
                      : "Se connecter"
                  }}

                </button>

              </form>

              <div class="text-center mt-4">

                <span class="text-secondary">
                  Pas encore de compte ?
                </span>

                <router-link
                  to="/register"
                  class="text-decoration-none ms-1"
                >
                  S'inscrire
                </router-link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>