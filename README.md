Crypto crafter
=====

Foundation for a generic crypto crafting API, with these constraints: 
- Implement a diamond architecture
- Use Typescript/Express/Node as a stack (let's change from Scala)

Helps for educational purpose. But you can play with it

# Uses cases

Crafting is composed of these primitive use cases: 

- encode
- sign 
- combine 
- broadcast


## Core domain

The core expresses the primitive use cases, through: 

- Model (entities) 
- Boundary (input port)
- Gate (output port)

## Chain core domain

Expresses the craft use case for a specific blockchain.
Craft use case is based on core primitive: encode + sign + combine + broadcast

As an example solana core domain is implemented, through the same model: 

- Model, refined for the specific chain 
- Boundary, composed using core boudaries
- Gate, composed using core gates

# Chain gates implementation 

Depends on the chain core domain, and implements the needed gates.
As an example solana gate is implemented solana-web3 js lib.  

# Chain boundaries implementation

Depends on the chain core domain, and implements the needed boudaries
As an example solana boundary is implemented and provided as an API controler.

# Main http

Depends on gates and boudaries implementations to create the entry point of the application. 
Here happens the IoC.
