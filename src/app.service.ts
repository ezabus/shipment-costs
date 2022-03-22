import { Injectable } from "@nestjs/common";
import { Part } from "./types";
import { BP2D as BinPacking2D } from "binpackingjs";
const { Bin, Box, Packer } = BinPacking2D;

const LONGER_SIDE = 1200;
const SHORTER_SIDE = 1000;

const QUARTER_HEIGHT = 600;
const HALF_HEIGHT = 1000;
const FULL_HEIGHT = 1800;

const LAYERS_PER_PALLET = 180;

@Injectable()
export class AppService {
  calcPallets(parts: Part[]): number {
    const numberOfLayers = this.calcLayers(parts);
    const extraPallet = numberOfLayers % LAYERS_PER_PALLET > 0 ? 1 : 0;
    return Math.floor(numberOfLayers / LAYERS_PER_PALLET) + extraPallet;
  }

  calcLayers(parts: Part[]): number {
    const bins = this.generateBins(parts.length);
    const boxes = this.convertPartsToBoxes(parts);
    const packer = new Packer(bins);
    packer.pack(boxes);
    const filledBins = bins.filter(
      (b: { boxes: Array<any> }) => b.boxes.length > 0
    );
    return filledBins.length;
  }

  private generateBins(numberOfBins: number): Array<typeof Bin> {
    const bins = [];
    for (let i = 0; i < numberOfBins; i++) {
      bins.push(new Bin(LONGER_SIDE, SHORTER_SIDE));
    }
    return bins;
  }

  private convertPartsToBoxes(parts: Part[]): Array<typeof Box> {
    return parts.map((p) => new Box(p[0], p[1]));
  }
}
