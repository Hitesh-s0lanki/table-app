import { ColumnDef } from "@tanstack/react-table";

export type Category = {
    id: string;
    name: string;
    description: string;
    subcategories?: SubCategory[]
}

export type SubCategory = {
    id: string;
    name: string;
    description: string;

    category: Category
    categoryId: string;

    products: Product[]
}

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    Tags: string[];
    bannerImage: string;
    images: string[];
    Subcategory: SubCategory

    isArchived?: boolean;
}

export type Project = {
    id: string;
    name: string;
    description: string;

    tasks: Task[];
}

export enum Status {
    PENDING,
    INPROGRESS,
    COMPLETE
}

export type Task = {
    id: string;
    title: string;
    status: string;

    members: User[]

    project: Project;
}

export type User = {
    id: string;

    UserName: string;
    email: string;
    image?: string;
    role: "USER" | "ADMIN"

    emailVerified: Date

    password?: string;
    profile?: Profile;

    token: string;

    tasks: Task[]


    isArchive: boolean
}

export enum UserRole {
    "ADMIN",
    "USER"
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


export type dataTableType = Product[] | Category[] | SubCategory[] | User[] | Project[] | Task[]
export type dataTableColumnType = Category | Project | SubCategory | User | Project | Task

export type columnsType = ColumnDef<Category>[]
    | ColumnDef<SubCategory>[]
    | ColumnDef<Product>[]
    | ColumnDef<Project>[]
    | ColumnDef<Task>[]
    | ColumnDef<User>[]

export enum TableType {
    CATEGORY,
    SUBCATEGORY,
    PRODUCT,
    PROJECT,
    TASK,
    USER
} 