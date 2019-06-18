import Config from './config'
import SendBird from 'sendbird'

export default function Sendy {
    
        new SendBird({ appId: Config.appId})
    
}