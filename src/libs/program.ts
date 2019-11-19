import program from 'commander'
import { version } from '../../package.json'

program.version(version, '-v, --version')


export default program
