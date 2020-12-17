## Express + Typescript + Project

A simple server with ts and typescript:

### Installation

```shell script
    yarn install
    npm install
```

### Using it
For now use and modify the code in the example directory.

### Configuring the project

Add your middleware in the function configure of `App.ts`
```typescript
    protected configure(): void {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(methodOverride());
        this.app.use(expressStatusMonitor());
    }
```

### Creating a route
Just copy this code in a new file in the  `./example/routes` directory.

For example `NewRoute.ts`:
```typescript
    class NewRoute implements RouteDeclaration {
        path: string = "/new_route";
    
        gets: HttpAction[] = [
            {
                route: "",
                action: (req, res) => {
                    res.status(200).json({message: "This is working fine"});
                }
            },
        ]
    
    }
    
    export default new NewRoute();
```
`HttpAction` and `RouteDeclaration` can be found at: `./src/routes/RouteDeclaration`.
 
 Then in the `App.ts` function _routes_:
```typescript
    protected routes(): void {
        this.defaultRouter``
            .addRoute(UserRoute)
            .addRoute(NewRoute);
                    
}    
```

### Using a configuration file:

To add a configuration just add it in the `./config` and import the config file. Example: 
```typescript
import config from "config";

const dbName = config.get("db.dbName"); 
```

For more additional help about the config module visit this [node-config module](https://github.com/lorenwest/node-config/wiki/Configuration-Files)

### Feel free to continue or finish this project

#### Author:
[finaritrandrianiaina](https://finaritrandrianiaina.vercel.app)