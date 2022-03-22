---
print_background: true
---
# Technical interview spec

## Shipping pallets packing pair programming

Fractory ships over a hundred thousand parts every month. Parts are usually sent out on pallets that go on delivery trucks.

To estimate the shipping cost for our clients, we need to be able to determine the number of pallets needed for shipping their parts before they even place the order. 

In order to minimize shipping cost, we need to ship the parts using as few pallets as possible.
For that reason, parts are placed next to and on top of eachother on the pallets.

Our task is to create an API that takes in an array of parts and returns the lowest shipping cost for these parts.

This is the definition of the resulting API we will be creating:

`POST` `http://localhost:3000/price`

```typescript
// The parts are assumed to be 10mm thick and flat.
// They are represented in the request as a pair of dimensions in millimeters. 
interface Request {
  parts: [width: number, height: number][];
}

interface Response {
  cost: number; // cost from pricing API
  provider: string; // provider from pricing API
  pallets: number; // how many pallets we estimated are needed to ship the parts in the request
}

const example: Request = {
  parts: [
    [100, 20],
    [900, 450],
  ],
};
```

We have an API that provides a price given the number of pallets required. 
To avoid networking difficulties, it's easiest for you to simply start a mock service locally in remote-shipping-api:

```bash
npm ci
npm start
```

`POST` `http://localhost:3001/getprice/pallet`
 
```typescript
interface PricingRequest {
  countryCode: 'GB';
  postalCode: 'PE20 3PW';
  pallets: 'quarter' | 'half' | number;
}

interface PricingResponse {
  provider: string;
  description: string;
  totalCost: {
    value: number;
    currency: string;
  };
}
```

In order to use that we need to figure out how many pallets are needed to ship the parts.

A pallet has certain rules about dimensions (in __cm__):

```typescript
const LONGER_SIDE = 120;
const SHORTER_SIDE = 100;

const QUARTER_HEIGHT = 60;
const HALF_HEIGHT = 100;
const FULL_HEIGHT = 180;
```
