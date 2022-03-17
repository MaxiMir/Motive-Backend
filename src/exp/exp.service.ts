import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpService {
  static STEP = 14;
  static EASY_COEFFICIENT = 1.4;
  static MIDDLE_COEFFICIENT = 2;
  static HARD_COEFFICIENT = 3;
  static EXTRA_POINTS = 5;

  toPoints(level: number): number {
    if (level === 1) {
      return 0;
    }

    const coefficient = this.getCoefficientByLevel(level);

    return (level * ExpService.STEP) ** coefficient;
  }

  toLevel(points: number): number {
    const coefficient = this.getCoefficientByPoints(points);

    return Math.trunc(points ** (1 / coefficient) / ExpService.STEP) || 1;
  }

  getProgress(points: number): number {
    const level = this.toLevel(points);
    const startPoints = this.toPoints(level);
    const nextPoints = this.toPoints(level + 1);
    const levelPointsAll = nextPoints - startPoints;
    const levelPointsCurrent = points - startPoints;

    return level + levelPointsCurrent / levelPointsAll;
  }

  getCoefficientByLevel(level: number) {
    switch (true) {
      case level > 70:
        return ExpService.HARD_COEFFICIENT;
      case level > 40:
        return ExpService.MIDDLE_COEFFICIENT;
      default:
        return ExpService.EASY_COEFFICIENT;
    }
  }

  getCoefficientByPoints(points: number) {
    switch (true) {
      case points >= 982107784:
        return ExpService.HARD_COEFFICIENT;
      case points >= 329476:
        return ExpService.MIDDLE_COEFFICIENT;
      default:
        return ExpService.EASY_COEFFICIENT;
    }
  }
}
