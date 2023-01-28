
class Animate {    
      static swapPriority(priority: string): string {
        switch (priority) {
          case 'Normal': 
             return 'var(--priority-normal)';
          case 'Important':
            return 'var(--priority-important)';
          case 'Urgent':
            return 'var(--priority-urgent)';
          default:
            return 'var(--priority-default)';
        }
      }
}

export {Animate}
