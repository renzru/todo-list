
class Update {
    static updateisDoneColor(isDone: boolean): string {
        if (isDone) {
          return '#73eca6';
        } else {
          return '#e0e0e0';
        }
      }
    
      static updatePriorityColor(priority: string): string {
        switch (priority) {
          case 'Important':
            return '#fbc54f';
          case 'Urgent':
            return '#ff5582';
         default: 
            return '';
        }
      }
    
      static updateIsDone(element: HTMLElement): void {
        element.classList.toggle('done');
      }
}

export {Update}
