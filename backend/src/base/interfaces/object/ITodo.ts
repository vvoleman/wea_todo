export default interface ITodo {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    finishedAt?: Date;
}