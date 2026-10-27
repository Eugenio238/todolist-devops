import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
}

const user = ref<User | null>(null);
const isLoading = ref(false);
const error = ref("");

export function useAuth() {
  const router = useRouter();

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    error.value = "";
    isLoading.value = true;

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      user.value = response.data.user;

      await router.push("/dashboard");

      return true;
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        "Une erreur est survenue.";

      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (
    email: string,
    password: string
  ) => {
    error.value = "";
    isLoading.value = true;

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      user.value = response.data.user;

      await router.push("/dashboard");

      return true;
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        "Email ou mot de passe incorrect.";

      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {
      // Même si l'API échoue,
      // on supprime quand même la session locale.
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      user.value = null;

      await router.push("/login");
    }
  };

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  return {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    loadUser,
  };
}