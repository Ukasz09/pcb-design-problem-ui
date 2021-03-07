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
  overlapedPathContent = 'x';
  axisColor = '#edeff4';
  columnsQty = 25 * 2;
  rowsQty = 25 * 2;
  colors = Constants.randomColors;
  colorsMatrix: string[][];
  paths: [number, number][][] = InputData.data;
  endpoints = InputData.endpoints;
  actualDisplayedPathId = undefined;

  constructor() {}

  /* ------------------------------------------- Methods ------------------------------------------- */
  ngOnInit(): void {
    this.resetPaths(undefined);
  }

  /**
   *
   * @param displayedPathId Id of displayed path or undefined for all
   */
  private resetPaths(displayedPathId: number): void {
    this.actualDisplayedPathId = displayedPathId;
    this.initColorMatrix();
    this.fillMatrixWithColors(this.paths);
  }

  private initColorMatrix(): void {
    this.colorsMatrix = new Array(this.rowsQty)
      .fill('')
      .map(() => new Array(this.columnsQty).fill(this.startedColor));
  }

  getBoardColor(x: number, y: number): string {
    return x - this.columnsQty / 2 === 0 || y - this.rowsQty / 2 === 0
      ? this.axisColor
      : '';
  }

  private fillMatrixWithColors(paths: [number, number][][]): void {
    let pathIndex = 0;
    for (let path of paths) {
      const pathIsVisible =
        this.actualDisplayedPathId === undefined ||
        pathIndex == this.actualDisplayedPathId;
      if (pathIsVisible) {
        for (let segment of path) {
          let x = segment[0];
          let y = segment[1];
          // if (x < 0 || y < 0 || x >= this.rowsQty || y >= this.columnsQty) {
          //   console.warn(`Block: ${x},${y} outsied map`);
          // }
          // else {
          x += this.columnsQty / 2;
          y += this.rowsQty / 2;
          const actualColor = this.colorsMatrix[x][y];
          if (actualColor === this.startedColor) {
            this.colorsMatrix[x][y] = this.colors[pathIndex];
          } else {
            this.colorsMatrix[x][y] = this.overlappedPathColor;
          }
          // }
        }
      }
      pathIndex++;
    }
  }

  getBlockColor(x: number, y: number): string {
    return this.colorsMatrix[x][y];
  }

  getBlockTextStyles(x: number, y: number): string {
    const isOverlap = this.getBlockColor(x, y) === this.overlappedPathColor;
    return isOverlap ? `text-light` : ``;
  }

  getBlockTextContent(x: number, y: number): string {
    const indexOfPath = this.getIndexOfPath([
      x - this.columnsQty / 2,
      y - this.rowsQty / 2,
    ]);
    if (indexOfPath !== -1) {
      return indexOfPath.toString();
    }

    return this.getBlockColor(x, y) === this.overlappedPathColor
      ? this.overlapedPathContent
      : '';
  }

  private getIndexOfPath(searchedPoint: [number, number]): number {
    for (let i = 0; i < this.endpoints.length; i++) {
      const pairOfEndpoints = this.endpoints[i];
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

  onLegendBlockMouseEnter(pathIndex: number): void {
    this.resetPaths(pathIndex);
  }

  onLegendBlockMouseLeave(): void {
    this.resetPaths(undefined);
  }

  /* ------------------------------------------- Getters / setters ------------------------------------------- */
  get blockSize(): number {
    return 100 / (this.columnsQty + 1); //+1 becouse of index no
  }
}
