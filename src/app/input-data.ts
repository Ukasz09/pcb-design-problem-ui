import solutionDataJson from '../../../../impl-1/PCB-problem/solution.json';
import endpointsDataJson from '../../../../impl-1/PCB-problem/parsed-data.json';
export class InputData {
  // Change arrays into tuples and then change format [direction,stepSize] into points
  //
  // Return:
  // data -> [startPoint, path[]][]
  // path -> segment[]
  // segment / startpoint -> [x,y]

  static data = InputData.parseDirectionStepSizeDataToPointsData(
    InputData.parseSolutionDataJson()
  );

  static endpoints: [
    [number, number],
    [number, number]
  ][] = InputData.parseEndpointsDataJson();

  /* ------------------------------------------- Methods ------------------------------------------- */
  private static parseEndpointsDataJson() {
    let data: string[] = endpointsDataJson;
    const parsedData = [];
    for (let endpointsArr of data) {
      const startPoint = [endpointsArr[0], endpointsArr[1]];
      const endPoint = [endpointsArr[2], endpointsArr[3]];
      const pair = [startPoint, endPoint];
      parsedData.push(pair);
    }
    return parsedData;
  }

  /**
   * Parse data in order to change arrays into tuples
   */
  private static parseSolutionDataJson() {
    const data = solutionDataJson;
    const parsedData = [];
    for (let endpointSolution of data) {
      const startPointJsonArr = endpointSolution[0];
      const startPointTuple = this.changeArrIntoTuple<number>(
        startPointJsonArr
      );
      const listofJsonArrPoints: number[][] = endpointSolution[1];
      const listOfPoints: [
        number,
        number
      ][] = listofJsonArrPoints.map((pointArr) =>
        this.changeArrIntoTuple<number>(pointArr)
      );
      parsedData.push([startPointTuple, listOfPoints]);
    }
    return parsedData;
  }

  private static changeArrIntoTuple<T>(arr: T[]): [T, T] {
    return [arr[0], arr[1]];
  }

  /**
   *
   * @param data List of tuples [startedPoint,path]
   */
  private static parseDirectionStepSizeDataToPointsData(
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

  private static changeDirectionStepSizeDataToPoint(
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
  private static getPositionIncValue(directionId: number): [number, number] {
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
