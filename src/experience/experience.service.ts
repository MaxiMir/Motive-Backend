import { Injectable } from '@nestjs/common';

@Injectable()
export class ExperienceService {
  static STEP = 14;
  static EASY_COEFFICIENT = 1.4;
  static MIDDLE_COEFFICIENT = 2;
  static HARD_COEFFICIENT = 3;
  static EXTRA_POINTS = 5;

  static toPoints(level: number): number {
    const coefficient = ExperienceService.getCoefficientByLevel(level);

    return (level * ExperienceService.STEP) ** coefficient;
  }

  static toLevel(points: number): number {
    const coefficient = ExperienceService.getCoefficientByPoints(points);

    return Math.trunc(points ** (1 / coefficient) / ExperienceService.STEP) || 1;
  }

  static getProgress(points: number): number {
    const level = ExperienceService.toLevel(points);
    const startPoints = ExperienceService.toPoints(level);
    const nextPoints = ExperienceService.toPoints(level + 1);
    const levelPointsAll = nextPoints - startPoints;
    const levelPointsCurrent = points - startPoints;

    return level + levelPointsCurrent / levelPointsAll;
  }

  static getCoefficientByLevel(level: number) {
    switch (true) {
      case level > 70:
        return ExperienceService.HARD_COEFFICIENT;
      case level > 40:
        return ExperienceService.MIDDLE_COEFFICIENT;
      default:
        return ExperienceService.EASY_COEFFICIENT;
    }
  }

  static getCoefficientByPoints(points: number) {
    switch (true) {
      case points >= 982107784:
        return ExperienceService.HARD_COEFFICIENT;
      case points >= 329476:
        return ExperienceService.MIDDLE_COEFFICIENT;
      default:
        return ExperienceService.EASY_COEFFICIENT;
    }
  }
}
