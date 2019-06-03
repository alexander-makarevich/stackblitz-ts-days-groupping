// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;


const rangeDelimeter = '-';
const twoDaysDelimeter = ',';
const groupDelimeter = ', ';

class Group {
  private days: number[] = [];

  add(day: number): void {
    this.days.push(day);
  }

  get count(): number {
    return this.days.length;
  }

  isNext(next: number): boolean {
    return this.count === 0 ? true : this.days[this.count - 1] + 1 === next;
  }

  toString(): string {
    switch (this.count) {
      case 0: return '';
      case 1: return `${this.days[0]}`;
      case 2: return `${this.days[0]}${twoDaysDelimeter}${this.days[1]}`;
      default: return `${this.days[0]}${rangeDelimeter}${this.days[this.count - 1]}`;
    }
  }
}

export class GrouppedWeek {
  private groups: Group[] = [];

  constructor(days: number[]) {
    let lastGroup: Group;
    days.forEach((day, index) => {
      const switchToNextGroup = lastGroup === undefined || !lastGroup.isNext(day);
      if (switchToNextGroup) {
        lastGroup = new Group();
        this.groups.push(lastGroup);
      }
      lastGroup.add(day);
    });
  }

  toString(): string {
    return this.groups.map(group => group.toString()).join(groupDelimeter);
  }

  static toString(days: number[]): string {
    return new GrouppedWeek(days).toString();
  }
}

console.log('empty: ', GrouppedWeek.toString([]));
console.log('2: ', GrouppedWeek.toString([2]));
console.log('2,3, 7: ', GrouppedWeek.toString([2,3, 7]));
console.log('2-4, 7: ', GrouppedWeek.toString([2,3,4, 7]));

console.log('2-4, 7: ', new GrouppedWeek([2,3,4, 7]).toString());
