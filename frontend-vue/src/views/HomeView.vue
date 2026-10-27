<template>
  <div class="min-vh-100 d-flex align-items-center bg-light">

    <div class="container">

      <div class="row justify-content-center">

        <div class="col-lg-8 text-center">

          <div class="mb-4">
            <i class="bi bi-check2-square display-1 text-primary"></i>
          </div>

          <h1 class="display-4 fw-bold mb-3">
            Ma Todo List
          </h1>

          <p class="lead text-secondary mb-4">
            Une plateforme simple pour enregistrer,
            organiser et suivre vos tâches quotidiennes.
          </p>

          <div class="d-flex justify-content-center gap-3">

            <router-link
              to="/register"
              class="btn btn-primary btn-lg px-4"
            >
              <i class="bi bi-person-plus me-2"></i>
              Créer un compte
            </router-link>

            <router-link
              to="/login"
              class="btn btn-outline-primary btn-lg px-4"
            >
              <i class="bi bi-box-arrow-in-right me-2"></i>
              Se connecter
            </router-link>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>