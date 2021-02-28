import { firebase } from 'modules/core/database'

// import { persistAuthorization } from '@/utils/http/presets'

export const logoutService = () => firebase.auth().signOut()
