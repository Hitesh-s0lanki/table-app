import { currentUser } from "@/lib/auth"
import { axiosBase } from "@/lib/utils";
import { Task } from "@/types";
import { AxiosError } from "axios";

export const getCategory = async () => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: category } = await axiosBase(user.token, user.role).get("/category");

        return {
            message: null,
            category
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    category: null
                }
            }
        }
        return {
            message: error.message,
            category: null
        }
    }
}

export const getCategoryById = async (id?: string) => {
    try {

        if (!id) {
            throw new Error("Id not provided!")
        }

        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: category } = await axiosBase(user.token, user.role).get(`/category/${id}`);

        return {
            message: null,
            category
        }

    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    category: null
                }
            }
        }
        return {
            message: error.message,
            category: null
        }
    }
}

export const getSubCategory = async () => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: subcategory } = await axiosBase(user.token, user.role).get("/subcategory");

        return {
            message: null,
            subcategory
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    subcategory: null
                }
            }
        }
        return {
            message: error.message,
            subcategory: null
        }
    }
}

export const getSubCategoryById = async (id?: string) => {
    try {

        if (!id) {
            throw new Error("Id not provided!")
        }

        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: subcategory } = await axiosBase(user.token, user.role).get(`/subcategory/${id}`);

        return {
            message: null,
            subcategory
        }

    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    subcategory: null
                }
            }
        }
        return {
            message: error.message,
            subcategory: null
        }
    }
}

export const getProducts = async () => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: products } = await axiosBase(user.token, user.role).get("/products");

        return {
            message: null,
            products
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    products: null
                }
            }
        }
        return {
            message: error.message,
            products: null
        }
    }
}

export const getProductById = async (id?: string) => {
    try {

        if (!id) {
            throw new Error("Id not provided!")
        }

        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: product } = await axiosBase(user.token, user.role).get(`/products/${id}`);

        return {
            message: null,
            product
        }

    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    product: null
                }
            }
        }
        return {
            message: error.message,
            product: null
        }
    }
}

export const getProjects = async () => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: projects } = await axiosBase(user.token, user.role).get("/projects");

        return {
            message: null,
            projects
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    projects: null
                }
            }
        }
        return {
            message: error.message,
            projects: null
        }
    }
}

export const getProjectById = async (id?: string) => {
    try {

        if (!id) {
            throw new Error("Id not provided!")
        }

        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: project } = await axiosBase(user.token, user.role).get(`/projects/${id}`);

        return {
            message: null,
            project
        }

    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    project: null
                }
            }
        }
        return {
            message: error.message,
            project: null
        }
    }
}

export const getTasks = async () => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: tasks } = await axiosBase(user.token, user.role).get("/tasks");

        return {
            message: null,
            tasks
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    tasks: null
                }
            }
        }
        return {
            message: error.message,
            tasks: null
        }
    }
}

export const getTaskById = async (id?: string) => {
    try {

        if (!id) {
            throw new Error("Id not provided!")
        }

        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: task } = await axiosBase(user.token, user.role).get(`/tasks/${id}`);

        return {
            message: null,
            task
        }

    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    task: null
                }
            }
        }
        return {
            message: error.message,
            task: null
        }
    }
}

export const getUserTasks = async () => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: tasks } = await axiosBase(user.token, user.role).get(`/tasks/users/${user.id}`);

        return {
            message: null,
            tasks
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    tasks: null
                }
            }
        }
        return {
            message: error.message,
            tasks: null
        }
    }
}

export const getUsers = async () => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: users } = await axiosBase(user.token, user.role).get("/users");

        return {
            message: null,
            users
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    users: null
                }
            }
        }
        return {
            message: error.message,
            users: null
        }
    }
}

export const getUserById = async (id?: string) => {
    try {

        if (!id) {
            throw new Error("Id not provided!")
        }

        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: users } = await axiosBase(user.token, user.role).get(`/users/${id}`);

        return {
            message: null,
            users
        }

    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    users: null
                }
            }
        }
        return {
            message: error.message,
            users: null
        }
    }
}

export const getUserRole = async () => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: role } = await axiosBase(user.token, user.role).get(`/roles/${user.id}`);

        return {
            message: null,
            role
        }

    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    role: null
                }
            }
        }
        return {
            message: error.message,
            role: null
        }
    }
}
