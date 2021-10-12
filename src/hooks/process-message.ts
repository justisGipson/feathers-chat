// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (): Hook => {
  return async (context: HookContext)=> {
    const { data } = context
    if(!data.text) {
      throw new Error('messages must have text')
    }

    const user = context.params.user
    const text = data.text
      // limit messages to 400 chars or less
      .substring(0, 400)

    context.data = {
      text,
      userID: user!._id,
      created_at: new Date().getTime()
    }
    return context
  };
};
