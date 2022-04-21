const initialState = {
  ports: [],
};

const GET_PORTS = "GET_PORTS";

export const portsGetter = (state = initialState, action) => {
  switch (action.type) {
    case GET_PORTS:
      return { ...state, ports: [...action.payload.ports] };
    default:
      return state;
  }
};

export const portsGetterAction = (payload) => ({ type: GET_PORTS, payload });
