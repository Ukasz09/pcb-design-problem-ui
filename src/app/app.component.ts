import { Component, OnInit } from '@angular/core';
import { Constants } from './constants';
import { InputData } from './input-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  startedColor = 'rgba(0,0,0,0)';
  overlappedPathColor = '#343A41'; // make sure that no exist path with this color
  overlapedPathContent = '😥';
  columnsQty = 25;
  rowsQty = 25;
  colors = Constants.randomColors;
  colorsMatrix: string[][];
  // input: [number, number][][] = InputData.data;
  input: [number, number][][];
  // showOnly: number = undefined;
  showOnly: number = 7;

  constructor() {}

  /* ------------------------------------------- Methods ------------------------------------------- */
  ngOnInit(): void {
    this.initInput();
    this.initColorMatrix();
    this.fillMatrixWithColors(this.input);
  }

  private initInput(): void {
    if (this.showOnly !== undefined) {
      this.input = [InputData.data[this.showOnly]];
    } else {
      this.input = InputData.data;
    }
  }

  private initColorMatrix(): void {
    this.colorsMatrix = new Array(this.rowsQty)
      .fill('')
      .map(() => new Array(this.columnsQty).fill(this.startedColor));
  }

  private fillMatrixWithColors(paths: [number, number][][]): void {
    let pathIndex = 0;
    for (let path of paths) {
      for (let segment of path) {
        const x = segment[0];
        const y = segment[1];
        const actualColor = this.colorsMatrix[x][y];
        if (actualColor === this.startedColor) {
          this.colorsMatrix[x][y] = this.colors[pathIndex];
        } else {
          // this.colorsMatrix[x][y] = this.colors[pathIndex];
          this.colorsMatrix[x][y] = this.overlappedPathColor;
        }
      }
      pathIndex++;
    }
  }

  getBlockColor(x: number, y: number): string {
    return this.colorsMatrix[x][y];
  }

  getBlockTextStyles(x: number, y: number): string {
    const centerFix = 'd-flex justify-content-center align-items-center';
    return this.getBlockColor(x, y) === this.overlappedPathColor
      ? `text-warning font-weight-bold ${centerFix}`
      : '';
  }

  // getBlockTextContent(x: number, y: number): string {
  //   return this.getBlockColor(x, y) === this.overlappedPathColor
  //     ? this.overlapedPathContent
  //     : 'o';
  // }

  getBlockTextContent(x: number, y: number): string {
    // const isOneOfEndpoints = InputData.enpoints.find(
    //   (point: [number, number]) => point[0] === x && point[1] === y
    // );
    const indexOfPath = this.getIndexOfPath([x, y]);
    if (indexOfPath !== -1) {
      return indexOfPath.toString();
    }

    return this.getBlockColor(x, y) === this.overlappedPathColor ? 'x' : '';
  }

  private getIndexOfPath(searchedPoint: [number, number]): number {
    for (let i = 0; i < InputData.enpoints.length; i++) {
      const pairOfEndpoints = InputData.enpoints[i];
      const startPointIsTheSame =
        pairOfEndpoints[0][0] === searchedPoint[0] &&
        pairOfEndpoints[0][1] === searchedPoint[1];
      const endPointIsTheSame =
        pairOfEndpoints[1][0] === searchedPoint[0] &&
        pairOfEndpoints[1][1] === searchedPoint[1];
      if (startPointIsTheSame || endPointIsTheSame) {
        return i;
      }
    }
    return -1;
  }

  /* ------------------------------------------- Getters / setters ------------------------------------------- */
  get blockSize(): number {
    return 100 / (this.columnsQty + 1); //+1 becouse of index no
  }
}
