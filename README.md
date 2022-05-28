# dungeoneer

Welcome to this over-designed piece of software that isn't even fit for purpose (yet).

So to give you an opportunity to tell me all that's wrong with my design, first let's get you set up

## Running the app in dev mode

Maybe one day I could figure out how to make this all entirely containerised for development, but that's a project in and of itself.

So first and formost you need to run

```
npm i
```

in all the folders: dungeoneerClient, dungeoneerServer, dungeoneerCommon. Once that's done, in theory you should just need to run:

```
docker-compose up -d
```

Hopefully it will download all the images it needs (dgraph, node etc.) then just start running. To run the client, simply go to `localhost:4201`.

I made the port 4201 so as not to conflict with any other ng-serves you have going on. Of course you can edit the docker-compose.yml to change that.

If everything is working, the localhost page should be a very unimpressive white screen with an "Add" button and an empty table. Go ahead and add some elements for the table, and try editing things. Hopefully it should all be running smoothly.

Maybe a tiny bit more impressive, open up a new tab and go to `localhost:4201`, or connect over LAN from another computer / phone with your dev machine's local IP + `:4201`. Now, if you add or edit items on either tab (or machine), the changes will automatically show up in the other. All clients get informed of changes on the server through their websocket connection.

Obviously for the client you just look at the console in chrome to view logs. To see what the server is doing just run the following:

```
docker-compoy logs --tail=1000 -tf dungeoneer-server
```

(tail is how many lines before, and -t is show time and -f is keep track of changes)

And any logs you set up will appear there.

But let's look at some code! You'll see this is a multi-route workspace, which is defined in the file `dungeoneer.code-workspace`. To open the workspace specifically you have to run:

```
code dungeoneer.code-workspace
```

But I've provided the a little bash script that does that called `launchWorkspace.sh`.

If you're extra lazy like me, I've added a script to my `/usr/local/bin` (I assume it's similar in linux?) like this:

```
#!/bin/bash

cd /Library/WebServer/web/dungeoneer
./launchWorkspace.sh
docker-compose up -d
docker-compose logs -f dungeoneer-server
```

And I've called it `dm`. So whenever I want to start working on this project I just type `. dm` in the terminal (the '.' is so that the cd and logging happens in my active terminal) and there I am!

## What a mess. Where do I start?

This is a good point. There's three packages: dungeoneerCommon, dungeoneerClient and dungeoneerServer. Eventually I'll add more README files to each of those.

### dungeoneerCommon

A good starting point seeing as it contains interfaces used by both the client and the server. Each of these have lots of comments to explain the thinking behind them.

#### Connection:

These interfaces define how the client and server interact with each other. You'll see these interfaces all over the place

#### Schema:

This is the thing that Alberto haaaaaated about my tierra system. This data schema is used to define how data is stored in the database, and how it is displayed in the client. It means we can quickly add new tables without having to manually set up interfaces or indexes etc.

#### INDEX.TS

Very important! Here is where the dungeoneerSchema is defined! I should probably move it to its own file, but I've spent too long as it is and must finish this readme!

### dungeoneerClient

This should be the most familiar to you, seeing as it's an Angular app serving as the client. I've used Mat-Angular for looks and various components. When it comes to interacting with the server and handling the data the two most important folders are `connection` and `data`. That's where you'll the websocket client being created to link to the server and keep a live connection going.

The data store serves as a central repository of information which also respondes to edits coming in from the server. It knows when to refresh database queries and update components.

As for the components, you've got your display (tables, display cards etc.) and forms. The forms generate inputs based on the type of variable. you can make your own forms, but for most of the work the schema helps us do that automagically.

### dungeoneerServer

Here we create the websocket server and handle requests coming in. Each request specifies a method and parameters to use. The two methods available now are "fetch" and "set".

The query generator is the thing I'm most proud of. Based on the DmFetchParams (defined in dungeoneerCommon) a query is generated and the data is fetched. It's all based on the schema, and means we need only hand-write queries for specialised tasks.

The setter also relies on the schema to properly store the data (strings, for example, get stored twice for stupid reasons I'll tell you over beer).

# Just give me an example

Ok, for my final trick, here's how you would add a new data type, then be able to view and edit it in the client.

Let's say we want to define a town. We'll give it a name, a country, and a population. You'll notice this is two strings and an int. So let's go to the index.ts of dungeoneerCommon and define this new node type.

So you can see what's already there (the exciting "item type" with its "myString" and "myInt" values), which should give you an idea of how to do it. You can also look in dungeoneerCommon at the Schema interfaces to learn more. But this is what you want to add after the "item" nodeType:

```
town: {
    nodeVars: {
        name: {
            type: "string",
            validation: {
                required: true
            }
        },
        country: {
            type: "string",
        },
        population: {
            type: 'int'
        }
    },

    search: ['name'],
    columns: ['name', 'country', 'population'],
    edit: ['name', 'country', 'population']
}
```

I've added required validation only to the name, for the fun of it.

Now annoyingly, the dungeoneer-server doesn't always seem to pick up on changes from dungeoneerCommon. If it hasn't, just quickly make a small change and save to prompt the tsc --watch (one of the services in docker-compose) to rebuild and the new values should then get added to the dgraph schema.

To see where that particular magic happens, go to `dungeoneerServer/src/database/DmDgraphClient.ts -> loadSchema()`

Now the database has been informed of this new node type and its parameters. But how to show it in the client?

Well go to `dungeoneerClient/src/app/app.component.html` and you'll see it has one component:

```
<dm-table-and-single-node [nodeType]="'item'"></dm-table-and-single-node>
```

You might want to go to the definition of that component to see what it's doing, but I'm hoping it's pretty obvious what we need to do to switch the client over to display towns, right? Simply change the nodeType to `[nodeType]="'town'"`.

Now look at your client. Tadaaaa! We can view, edit and add towns to our heart's content!

## Conclusion

Obviously, this interface is not what we want for a D&D app. I think what's useful, though, is the query generator, and the data schema, to quickly get things set up. Then we can have bespoke interfaces for each user type and page. But all the data behind a character could be using the same DmFetchParams and DmSetParams for retrieving and setting data, and any changes that do happen get immediately communicated to the other players.

There's still a lot for me to do – I need to add the ability to add node connections and children to nodes, specifically to handle the character -> items relationship. I can do that soon enough, but at this point I have "closed the loop" insofar as data can be defined, displayed and modified. Now it's a question of adding new data types (no mean feat) and polishing the interface.

Let me know which aspects need more comments and clarification. I hope it works and you can see some of the method behind the madness!

