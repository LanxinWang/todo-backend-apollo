export interface ITodo {
  _id: number;
  status: string;
  name: string;
}

export const TODO_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  DELETED: "deleted",
};
