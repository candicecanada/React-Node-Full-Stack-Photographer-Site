import { create } from "zustand";
import { devtools } from "zustand/middleware";
import AuthStore from "./AuthStore";
import PostStore from "./PostStore";

const useBoundStore = create()(
  devtools((...a) => ({
    ...PostStore(...a),
    ...AuthStore(...a),
  }))
);
export default useBoundStore;
