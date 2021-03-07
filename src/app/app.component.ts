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
  columnsQty = 25;
  rowsQty = 25;
  colors = Constants.randomColors;
  colorsMatrix: string[][];
  paths: [number, number][][] = InputData.data;
  // displayedPaths = this.paths;
  endpoints = InputData.enpoints;
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
    // this.resetDisplayedPaths(displayedPathId);
    this.fillMatrixWithColors(this.paths);
  }

  // private resetDisplayedPaths(displayedPathId: number): void {
  //   if (displayedPathId !== undefined) {
  //     this.displayedPaths = [this.paths[displayedPathId]];
  //   } else {
  //     this.displayedPaths = this.paths;
  //   }
  // }

  private initColorMatrix(): void {
    this.colorsMatrix = new Array(this.rowsQty)
      .fill('')
      .map(() => new Array(this.columnsQty).fill(this.startedColor));
  }

  private fillMatrixWithColors(paths: [number, number][][]): void {
    let pathIndex = 0;
    for (let path of paths) {
      const pathIsVisible =
        this.actualDisplayedPathId === undefined ||
        pathIndex == this.actualDisplayedPathId;
      if (pathIsVisible) {
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
    const indexOfPath = this.getIndexOfPath([x, y]);
    if (indexOfPath !== -1) {
      return indexOfPath.toString();
    }

    return this.getBlockColor(x, y) === this.overlappedPathColor
      ? this.overlapedPathContent
      : '';
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
