import * as f from '../src';

export default f.route(f.get('/', () => new Response(`Hello, World!`)));
