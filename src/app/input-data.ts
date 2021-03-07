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

  // static data = [
  //   InputData.changeDirectionStepSizeDataToPoint(
  //     [2, 7],
  //     [
  //       [2, 5],
  //       [2, 2],
  //     ]
  //   ),
  //   InputData.changeDirectionStepSizeDataToPoint(
  //     [3, 8],
  //     [
  //       [2, 2],
  //       [3, 1],
  //       [1, 1],
  //       [3, 1],
  //       [2, 1],
  //     ]
  //   ),
  // ];
  static data = InputData.parseDirectionStepSizeDataToPointsData([
    [
      [2, 7],
      [
        [2, 4],
        [2, 3],
      ],
    ],
    [
      [3, 8],
      [
        [3, 2],
        [2, 2],
        [1, 1],
        [2, 3],
        [3, 1],
        [0, 1],
      ],
    ],
    [
      [4, 4],
      [
        [2, 2],
        [0, 1],
        [1, 4],
        [1, 5],
      ],
    ],
    [
      [5, 2],
      [
        [1, 2],
        [3, 1],
        [1, 5],
        [1, 2],
        [1, 2],
        [2, 2],
        [2, 1],
        [2, 2],
      ],
    ],
    [[6, 6], [[1, 2]]],
    [
      [7, 10],
      [
        [3, 2],
        [1, 1],
        [2, 1],
        [3, 2],
        [3, 1],
        [3, 1],
        [1, 4],
        [1, 4],
        [2, 5],
        [3, 3],
      ],
    ],
    [
      [8, 2],
      [
        [1, 4],
        [1, 1],
        [1, 3],
        [1, 3],
        [1, 2],
      ],
    ],
    [
      [10, 10],
      [
        [0, 2],
        [3, 1],
        [3, 3],
        [2, 5],
      ],
    ],
  ]);

  static enpoints: [[number, number], [number, number]][] = [
    [
      [2, 7],
      [9, 7],
    ],
    [
      [3, 8],
      [7, 6],
    ],
    [
      [4, 4],
      [5, 13],
    ],
    [
      [5, 2],
      [10, 12],
    ],
    [
      [6, 6],
      [6, 8],
    ],
    [
      [7, 10],
      [13, 10],
    ],
    [
      [8, 2],
      [8, 15],
    ],
    [
      [10, 10],
      [13, 6],
    ],
  ];

  /* ------------------------------------------- Methods ------------------------------------------- */
  /**
   *
   * @param data List of tuples [startedPoint,path]
   */
  static parseDirectionStepSizeDataToPointsData(
    data: [[number, number], [number, number][]][]
  ): [number, number][][] {
    const listOfPathPoints: [number, number][][] = [];
    for (let endpointSolution of data) {
      const startedPoint = endpointSolution[0];
      const path = endpointSolution[1];
      const pointsForSolution = InputData.changeDirectionStepSizeDataToPoint(
        startedPoint,
        path
      );
      listOfPathPoints.push(pointsForSolution);
    }
    return listOfPathPoints;
  }

  static changeDirectionStepSizeDataToPoint(
    startedPoint: [number, number],
    path: [number, number][]
  ): [number, number][] {
    const points: [number, number][] = [];
    points.push(startedPoint);
    let lastPoint = startedPoint;
    for (let d of path) {
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
