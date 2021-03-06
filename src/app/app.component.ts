import { Component, OnInit } from '@angular/core';
import { Constants } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  columnsQty = 16;
  rowsQty = 16;
  colors = Constants.randomColors;
  colorsMatrix: string[][];
  input = [
    [
      [3, 8],
      [3, 9],
      [4, 9],
      [5, 9],
      [6, 9],
      [7, 9],
    ],
    [
      [6, 6],
      [6, 7],
      [6, 8],
    ],
    [
      [9, 6],
      [9, 7],
      [9, 8],
    ],
  ];

  /* ------------------------------------------- Getters / setters ------------------------------------------- */
  get blockSize(): number {
    return 100 / this.columnsQty;
  }

  ngOnInit(): void {
    this.initColorMatrix();
    this.fillMatrixWithColors(this.input);
  }

  private initColorMatrix(): void {
    this.colorsMatrix = new Array(this.rowsQty)
      .fill('')
      .map(() => new Array(this.columnsQty).fill('rgba(0,0,0,0)'));
  }

  private fillMatrixWithColors(paths: number[][][]): void {
    let pathIndex = 0;
    for (let path of paths) {
      for (let segment of path) {
        const x = segment[0];
        const y = segment[1];
        this.colorsMatrix[x][y] = this.colors[pathIndex];
      }
      pathIndex++;
    }
  }

  getBlockColor(rowIndex: number, colIndex: number): string {
    return this.colorsMatrix[rowIndex][colIndex];
  }
}
