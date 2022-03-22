export type Part = [width: number, height: number];

export interface RequestPriceBody {
  parts: Part[];
}

export interface CostResponse {
  cost: number; // cost from pricing API
  provider: string; // provider from pricing API
  pallets: number; // how many pallets we estimated are needed to ship the parts in the request
}

export interface PricingRequest {
  countryCode: string;
  postalCode: string;
  pallets: "quarter" | "half" | number;
}

export interface PricingResponse {
  provider: string;
  description: string;
  totalCost: {
    value: number;
    currency: string;
  };
}
