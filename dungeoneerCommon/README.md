# The Schema

Obviously over-designed for this, but may well come in useful if we plan to dramatically expand what this app does. Look at the SchemaTypes file to see how the schema is defined (Schema -> NodeTypes -> NodeVars).

NodeVars can be of several types (as you can see in the definition). I won't explain the basic ones, but here you'll see explanations of the less obvious ones:

## node and child types

A NodeVar with one of these types indicates a link to another node. The difference between node and child is that a "node" connection is between two nodes that are independent of each other but may have a relationship (e.g. Character -> Spells). A "child" connection however is unique to that pairing.

In practical terms this means that when editing children, you delete the existing ones and replace them with the new ones. When editing nodes, you only delete the connections. This also has ramifications for fetching data.

