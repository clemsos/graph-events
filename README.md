# Graph Events

**Graph Events** is a storage system to create and manipulate states of networks and graphs based on the evolution of their properties over time.


## How it Works

* All modifications are stored using **commits**, so you can easily maintain a clean state of you graphs and do / undo / moderate changes.
* Everything is serializable in **JSON**, so all data can be stored in databases, plain files or just plain arrays.

See the [examples folder](./examples) to see it in use.


### Commands

| Command | Description | Options |
|------|------|------|
| `create` | create new node(s) | Object data |
| `update` | update elements with new properties | Object selector, Object data |
| `delete` | delete nodes | Object selector |

### Publish

    npm run prepublish
    npm publish


### Test

    gulp test

### Docs

    gulp doc

then navigate to the `/docs` folder to see the documentation.
