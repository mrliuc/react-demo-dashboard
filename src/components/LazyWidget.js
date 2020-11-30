import loadable from '@loadable/component'

const Red = loadable(() => import('./widgets/Red'))
const Blue = loadable(() => import('./widgets/Blue'))

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Red,
    Blue
}
