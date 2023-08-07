import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpService {
  static step = 15;
  static easyCoefficient = 1;
  static middleCoefficient = 3;
  static hardCoefficient = 5;
  static middleLevel = 30;
  static hardLevel = 70;

  toPoints(level: number): number {
    if (level === 1) {
      return 0;
    }

    const coefficient = this.toCoefficient(level);

    return (level * ExpService.step) ** coefficient;
  }

  toLevel(points: number): number {
    const coefficient = this.toCoefficientByPoints(points);

    return Math.trunc(points ** (1 / coefficient) / ExpService.step) || 1;
  }

  toProgress(points: number): number {
    const level = this.toLevel(points);
    const startPoints = this.toPoints(level);
    const nextPoints = this.toPoints(level + 1);
    const levelPointsAll = nextPoints - startPoints;
    const levelPointsCurrent = points - startPoints;

    return level + levelPointsCurrent / levelPointsAll;
  }

  toCoefficient(level: number): number {
    switch (true) {
      case level >= ExpService.hardLevel:
        return ExpService.hardCoefficient;
      case level >= ExpService.middleLevel:
        return ExpService.middleCoefficient;
      default:
        return ExpService.easyCoefficient;
    }
  }

  toCoefficientByPoints(points: number): number {
    switch (true) {
      case points >= this.toPoints(ExpService.hardLevel):
        return ExpService.hardCoefficient;
      case points >= this.toPoints(ExpService.middleLevel):
        return ExpService.middleCoefficient;
      default:
        return ExpService.easyCoefficient;
    }
  }
}
