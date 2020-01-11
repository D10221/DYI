DYI naive, half-baked, minimal, full-stackish JS/TS NO framework

WHY:  
How much infrastructure can you do from scratch,  
come back next day and know WTF you were tryting to do ?  

Try:

    (serve -> One State -> VTree -> DOM (...repeat) -> push (repeat))

Methology (me-too):  

Partially replicate/implement known libraries/patterns without neccessarily  use it's original implementation while getting as close as possible to it's usage.  
It shoudl need little or NO explanation/documentaion.  
Not production ready.  

Using  
- browser native modules 
- esm on node (requires v13+)
- no bundles
- no packages (except express)
- and Typescript

Typescript provides: JSX to a hyperscript like "create-element"

Implements:
- createElement (JSX to VElement)    
- Render (VElement to VNode to DOM element)
    - cheap map props to DOM element's attributes 
    - add/remove event listeners (per cycle)

- Stateless components
- Redux 
    - thunk and promise middleware
    - connect 
    - bind actions
- Routing (client side)
    - not a router
- SSR (jsx -> string)
- CSS in JS

Not implemented:  
- Schedulers  
- diffs  
- Statefull components
- optimizations
- persistance
- ssr page routing
- authentication
- everything else

Develop:  
Poors peolple live/hot/reload:

Dev Server:  

    # yarn start # nodemon .

Hot reload (AKA F5):  
<small><i>Editor -> alt+tab+F5</i></small>

    # yarn watch # tsc -p . --watch
