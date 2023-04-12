import { isEmpty } from "lodash";

export const generateRandomNum = (min = 2, max = 9) => {
  return Math.floor((Math.random() * (max - min) + min) * 1000000000);
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const statusEnum = {
  open: "Open",
  working: "Working",
  done: "Done",
  overdue: "Overdue",
};

export const fields = [
  {
    name: "timeStamp",
  },
  {
    name: "title",
  },
  {
    name: "description",
  },
  {
    name: "dueDate",
  },
  {
    name: "tags",
  },
  {
    name: "status",
  },
];

export const constructTodo = (newTodo = {}, isExistingRecord) => {
  let timeStamp = new Date(Date.now());

  return {
    id: isExistingRecord ? newTodo.id : generateRandomNum(),
    timeStamp: isExistingRecord
      ? newTodo.timeStamp
      : `${timeStamp.getFullYear()}-${timeStamp.getMonth()}-${timeStamp.getDate()}`,
    title: newTodo.title || "-",
    description: newTodo.description || "-",
    dueDate: !isEmpty(newTodo.dueDate) ? `${newTodo.dueDate}` : "-",
    tags: newTodo.tags || [],
    status: newTodo.status || statusEnum.open,
    isEditing: false,
  };
};

export const constructEmptyTodo = () => {
  let timeStamp = new Date(Date.now());
  return {
    id: generateRandomNum(),
    timeStamp: `${timeStamp.getDate()}-${timeStamp.getMonth()}-${timeStamp.getFullYear()}`,
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    status: statusEnum.open,
    isEditing: true,
  };
};

export const PAGE_SIZE = 2;
