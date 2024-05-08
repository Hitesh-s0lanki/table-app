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
    status: Status;

    members: User[]

    project: Project;
}

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    UserName: string;
    email: string;
    contact: string;
    dob?: Date;
    city: string;
    landMark: string;
    State: string;
    Country: string;
    Pincode: string;

    tasks: Task[]
}