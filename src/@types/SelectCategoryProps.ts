import { CategoryProps } from "./CategoryProps";

export interface SelectCategoryProps{
    category: string;
    categories: CategoryProps[];
    setCategory: (e: string) => void;
    placeholder: string;
}