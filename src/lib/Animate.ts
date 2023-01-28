
class Animate {
    static swapIsDone(isDone: boolean): string {
        if (isDone) {
          return 'var(--status-completed)';
        } else {
          return 'var(--status-default)';
        }
      }
    
      static swapPriority(priority: string): string {
        switch (priority) {
          case 'Important':
            return 'var(--priority-important)';
          case 'Urgent':
            return 'var(--priority-urgent)';
         default: 
            return '';
        }
      }
    
      static strikeThrough(element: HTMLElement): void {
        element.classList.toggle('done');
      }
}

export {Animate}
