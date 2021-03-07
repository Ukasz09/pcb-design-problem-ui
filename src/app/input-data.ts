export class InputData {
  // data -> path[]
  // path -> segment[]
  // segment -> [x,y]
  // static data = [
  //   [
  //     [3, 8],
  //     [3, 9],
  //     [4, 9],
  //     [5, 9],
  //     [6, 9],
  //     [7, 9],
  //   ],
  //   [
  //     [6, 6],
  //     [6, 7],
  //     [6, 8],
  //     [6, 9],
  //     [6, 10],
  //   ],
  //   [
  //     [9, 6],
  //     [9, 7],
  //     [9, 8],
  //   ],
  // ];

  static data = [
    InputData.changeDirectionStepSizeDataToPoint(
      [2, 7],
      [
        [2, 3],
        [2, 4],
      ]
    ),
    InputData.changeDirectionStepSizeDataToPoint(
      [3, 8],
      [
        [2, 4],
        [3, 2],
      ]
    ),
  ];

  static changeDirectionStepSizeDataToPoint(
    startedPoint: [number, number],
    data: [Direction, number][]
  ): [number, number][] {
    const points: [number, number][] = [];
    points.push(startedPoint);
    let lastPoint = startedPoint;
    for (let d of data) {
      const direction = d[0];
      const stepSize = d[1];
      const incValue: [number, number] = this.getPositionIncValue(direction);
      for (let i = 0; i < stepSize; i++) {
        const newPoint: [number, number] = [
          lastPoint[0] + incValue[0],
          lastPoint[1] + incValue[1],
        ];
        points.push(newPoint);
        lastPoint = newPoint;
      }
    }
    console.log(points);

    return points;
  }

  /**
   * @return: [inc value for X, inc value for Y]
   */
  static getPositionIncValue(directionId: number): [number, number] {
    switch (directionId) {
      case 0: {
        return [-1, 0];
      }
      case 1: {
        return [0, 1];
      }
      case 2: {
        return [1, 0];
      }
      case 3: {
        return [0, -1];
      }
    }
  }
}

enum Direction {
  Left = 0,
  Up = 1,
  Right = 2,
  Down = 3,
}
