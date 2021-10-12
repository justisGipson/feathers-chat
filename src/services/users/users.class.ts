import crypto from 'crypto'
import { Params } from '@feathersjs/feathers'
import { Service, NedbServiceOptions } from 'feathers-nedb'
import { Application } from '../../declarations';

const gravatarUrl = 'https://s.gravatar.com/avatar'
// query size - this needs 60px images
const query = 's=60'
const getGravatar = (email: string) => {
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')
  return `${gravatarUrl}/${hash}?${query}`
}

interface UserData {
  _id?: string
  email: string
  password: string
  name?: string
  avatar?: string
  githubID?: string
}

export class Users extends Service<UserData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  create (data: UserData, params?: Params)  {
    // things we want from user
    const { email, password, githubID, name } = data
    // get existing user avatar or get gravatar with email
    const avatar = data.avatar || getGravatar(email)
    const userData = {
      email,
      name,
      password,
      githubID,
      avatar
    }

    return super.create(userData, params)
  }
}
