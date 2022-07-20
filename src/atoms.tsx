import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
// enum can save "TO_DO" , "DOING" , "DONE" and i can use it like
// Categories.TO_DO. so it help no to make mistake

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const categoryState = atom<IToDo["category"]>({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // get : (options) options is object. and in side of the object,
    // there is "get" and get can bring atom inside of my selector "get(toDoState)"
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

/*Selector는 파생된 state(derived state)의 일부를 나타낸다.
즉, 기존 state를 가져와서, 기존 state를 이용해 새로운 state를 만들어서 반환할 수 있다. 기존 state를 이용만할 뿐 변형시키지 않는다 */
