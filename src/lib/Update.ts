
class Update {
    static updateisDoneColor(isDone: boolean): string {
        if (isDone) {
          return 'var(--status-default)';
        } else {
          return 'var(--status-completed)';
        }
      }
    
      static updatePriorityColor(priority: string): string {
        switch (priority) {
          case 'Important':
            return 'var(--priority-important)';
          case 'Urgent':
            return 'var(--priority-urgent)';
         default: 
            return '';
        }
      }
    
      static updateIsDone(element: HTMLElement): void {
        element.classList.toggle('done');
      }
}

export {Update}
