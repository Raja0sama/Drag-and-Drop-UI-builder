const namespace = "app";

export const setNodes = (nodes) => {
  return { type: `${namespace}/setState`, nodes };
};
export const setSelectedNode = (selectedNode) => {
  return { type: `${namespace}/setState`, selectedNode };
};

const startLoading = (loadingType) => ({ type: "startLoading", loadingType });
const stopLoading = (loadingType) => ({ type: "stopLoading", loadingType });

export default {
  namespace,
  state: {
    nodes: [],
    selectedNode: undefined,
    loading: {},
  },

  effects: {
    *fakeApi(_, { put, call, select }) {},
  },

  subscriptions: {},

  reducers: {
    setState(state, newState) {
      return { ...state, ...newState };
    },
    startLoading(state, { loadingType }) {
      return { ...state, loading: { ...state.loading, [loadingType]: true } };
    },
    stopLoading(state, { loadingType }) {
      return { ...state, loading: { ...state.loading, [loadingType]: false } };
    },
  },
};
