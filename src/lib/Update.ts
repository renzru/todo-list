import {projectStore} from './store'

function getPriorityColor(priority: string): string {
    const priorities = {
        Normal: 'var(--priority-normal)',
        Important: 'var(--priority-important)',
        Urgent: 'var(--priority-urgent)'
      }
    
      return priorities[priority] || 'var(--priority-default)';
}

function refreshStore() {
  projectStore.update((store) => (store = store));
}

export {getPriorityColor, refreshStore}