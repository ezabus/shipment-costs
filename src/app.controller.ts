import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import {
  CostResponse,
  PricingRequest,
  PricingResponse,
  RequestPriceBody,
} from "./types";
import axios, { AxiosResponse } from "axios";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("price")
  async calcPrice(@Body() body: RequestPriceBody): Promise<CostResponse> {
    const numberOfPallets = this.appService.calcPallets(body.parts);
    const request = {
      countryCode: "GB",
      postalCode: "PE20 3PW",
      pallets: numberOfPallets,
    };
    const pricingResponse = await axios.post<
      PricingRequest,
      AxiosResponse<PricingResponse>
    >("http://localhost:3001/getprice/pallet", request);
    const pricingData = pricingResponse.data;
    const response = {
      cost: pricingData.totalCost.value,
      provider: pricingData.provider,
      pallets: numberOfPallets,
    };
    return response;
  }
}
