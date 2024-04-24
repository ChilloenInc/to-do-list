import { atom } from "recoil";

const todoAtom = atom({
  key: "todoAtom",
  default: [
    {
      id: 1,
      title: "React",
      body: "React is",
    },
    {
      id: 2,
      title: "JS",
      body: "JS is",
    },
    {
      id: 3,
      title: "Todo",
      body: "Todo something...",
    },
  ],
});

const searchAtom = atom({
  key: "searchAtom",
  default: [],
});

export { todoAtom, searchAtom };
