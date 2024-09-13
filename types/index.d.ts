declare type TodoItem = {
    title: string;
    description: string;
    isCompleted: boolean;
};

declare type TodoProps = {
    items: TodoItem[];
    setItems: React.Dispatch<React.SetStateAction<TodoItem[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
