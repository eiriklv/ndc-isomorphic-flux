NDC Isomorphic React and Flux Example
=====================================

#### Introduction:
Isomorphic Flux and React starter kit with Passport authentication

#### Features

- Server and client side rendering
- Isomorphic routing
- Isomorphic flux architecture
- Dehydration/rehydration of state from server to client
- Webpack React Hot Loader

WIP

#### Development script
```bash
export NODE_ENV=development \
export PORT=3000 \
export DEBUG=app:* \
export API_URL=http://localhost:3000/api \
export MONGO_URL=mongodb://localhost/ndc-isomorphic-flux \

./node_modules/nodemon/bin/nodemon.js ./start.js
```

#### Production script
```bash
export NODE_ENV=production \
export PORT=3000 \
export DEBUG=* \
export API_URL=http://localhost:3000/api \
export MONGO_URL=mongodb://localhost/ndc-isomorphic-flux \

gulp build && node build/start.js
```

#### Credits
Inspired by [isomorphic-react-template](https://github.com/gpbl/isomorphic-react-template)
