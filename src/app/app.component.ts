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
  overlapedPathContent = ':(';
  columnsQty = 16;
  rowsQty = 16;
  colors = Constants.randomColors;
  colorsMatrix: string[][];
  input = InputData.data;

  constructor() {}

  /* ------------------------------------------- Methods ------------------------------------------- */
  ngOnInit(): void {
    this.initColorMatrix();
    this.fillMatrixWithColors(this.input);
  }

  private initColorMatrix(): void {
    this.colorsMatrix = new Array(this.rowsQty)
      .fill('')
      .map(() => new Array(this.columnsQty).fill(this.startedColor));
  }

  private fillMatrixWithColors(paths: number[][][]): void {
    let pathIndex = 0;
    for (let path of paths) {
      for (let segment of path) {
        const x = segment[0];
        const y = segment[1];
        const actualColor = this.colorsMatrix[x][y];
        if (actualColor === this.startedColor) {
          this.colorsMatrix[x][y] = this.colors[pathIndex];
        } else {
          this.colorsMatrix[x][y] = this.overlappedPathColor;
        }
      }
      pathIndex++;
    }
  }

  getBlockColor(rowIndex: number, colIndex: number): string {
    return this.colorsMatrix[rowIndex][colIndex];
  }

  getBlockTextStyles(rowIndex: number, colIndex: number): string {
    const centerFix = 'd-flex justify-content-center align-items-center';
    return this.getBlockColor(rowIndex, colIndex) === this.overlappedPathColor
      ? `text-warning font-weight-bold ${centerFix}`
      : '';
  }

  getBlockTextContent(rowIndex: number, colIndex: number): string {
    return this.getBlockColor(rowIndex, colIndex) === this.overlappedPathColor
      ? ':('
      : '.';
  }

  /* ------------------------------------------- Getters / setters ------------------------------------------- */
  get blockSize(): number {
    return 100 / (this.columnsQty + 1); //+1 becouse of index no
  }
}
