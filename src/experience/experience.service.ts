import { Injectable } from '@nestjs/common';

@Injectable()
export class ExperienceService {
  static EASY_COEFFICIENT = 53;
  static MIDDLE_COEFFICIENT = 116;
  static HARD_COEFFICIENT = 171;
  static HARD_INCREASE = 5_235;

  static toPoints(level: number): number {
    switch (true) {
      case level > 50:
        return level * ExperienceService.HARD_COEFFICIENT + ExperienceService.HARD_INCREASE;
      case level > 25:
        return level * ExperienceService.MIDDLE_COEFFICIENT;
      default:
        return level * ExperienceService.EASY_COEFFICIENT;
    }
  }

  static toLevel(points: number): number {
    switch (true) {
      case points > 13956:
        return Math.trunc(points / ExperienceService.HARD_COEFFICIENT - ExperienceService.HARD_INCREASE);
      case points > 3016:
        return Math.trunc(points / ExperienceService.MIDDLE_COEFFICIENT);
      default:
        return Math.trunc(points / ExperienceService.EASY_COEFFICIENT) || 1;
    }
  }

  static getProgress(points: number): number {
    const level = ExperienceService.toLevel(points);
    const nextPoints = ExperienceService.toPoints(level + 1);

    return +(level + points / nextPoints).toFixed(4);
  }
}
