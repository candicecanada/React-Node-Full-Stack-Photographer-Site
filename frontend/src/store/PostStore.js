// This is just an example store with fake data
const PostStore = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});

export default PostStore;
