"use strict";
export async function handle(state, action) {
  const _function = action.input.function;
  const caller = action.caller;
  switch (_function) {
    case "register": {
      state.users.push(caller); 
      break;
    }
    default: {
      throw new ContractError(`Invalid function: "${_function}"`);
    }
  }
  return { state };
}