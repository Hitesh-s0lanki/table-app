import { ColumnDef } from "@tanstack/react-table";

type Decimal = number; // Assuming Decimal is represented as a number in JavaScript
type DateTime = Date; // Date type in JavaScript

export type Category = {
    id: string;
    name: string;
    description: string;
    products: Product[];
    parent?: Category;
    parentId?: string;
    subCategories: Category[];
    history: string[];
    isArchived: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type Product = {
    id: string;
    name: string;
    description: string;
    sellingPrice: Decimal;
    actualPrice: Decimal;
    Tags: string[];
    bannerImage: string;
    images: string[];
    category: Category;
    categoryId: string;
    history: string[];
    isArchived: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type Project = {
    id: string;
    name: string;
    description: string;
    client: string[];
    technology: string[];
    tasks: Task[];
    manager: User;
    managerId: string;
    participants: User[];
    history: string[];
    isArchived: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export enum Status {
    PENDING = "PENDING",
    TODO = "TODO",
    INPROGRESS = "INPROGRESS",
    COMPLETED = "COMPLETED"
}


export type Task = {
    id: string;
    name: string;
    description: string;
    status: Status;
    project: Project;
    projectId: string;
    owner: User;
    ownerId: string;
    members: User[];
    documents: string[];
    history: string[];
    isArchived: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type Role = {
    id: string;
    name: string;
    description: string;
    products: string[];
    category: string[];
    subcategory: string[];
    projects: string[];
    tasks: string[];
    users: string[];
    roles: string[];
    user: User[];
    history: string[];
    isArchived: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type User = {
    id: string;
    UserName: string;
    email?: string;
    emailVerified?: DateTime;
    image?: string;
    password?: string;
    role?: Role;
    roleId?: string;
    profile?: Profile;
    projects: Project[];
    projectsManager: Project[];
    tasks: Task[];
    taskCreated: Task[];
    history: string[];
    isArchived: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;

    token?: string;
}

export type Profile = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;

    contact: string;
    dob?: Date;
    city: string;
    landMark: string;
    State: string;
    Country: string;
    Pincode: string;
}

export type dataTableType = Product[] | Category[] | User[] | Project[] | Task[]
export type dataTableColumnType = Category | Project | User | Project | Task

export type columnsType = ColumnDef<Category>[]
    | ColumnDef<Product>[]
    | ColumnDef<Project>[]
    | ColumnDef<Task>[]
    | ColumnDef<User>[]
    | ColumnDef<Role>[]

export enum TableType {
    CATEGORY,
    SUBCATEGORY,
    PRODUCT,
    PROJECT,
    TASK,
    USER,
    ROLE
}

export type TaskSummary = {
    date: Date;
    complete: number;
    inprogress: number;
    pending: number;
};
