class Animation {
    static newAnimation(animation, element) {
        element.classList.add(animation);
        element.addEventListener("animationend", () => element.classList.remove(animation));
    }

    static animateStatus(status, indicator, title, element) {
        status.addEventListener('change', () => {
            if (status.checked) {
                Animation.newAnimation('update-status', element);

                title.classList.toggle('completed');
                indicator.classList.toggle('status-completed');
            } else {
                title.classList.toggle('completed');
                indicator.classList.toggle('status-completed');
            }

        })
    }

    static animateDetails(button, element) {
        button.addEventListener('click', () => {
            if (element.ariaHidden === 'true') {
                Animation.newAnimation('show-details', element);
                button.ariaHidden = 'false';
                element.ariaHidden = 'false';
            } else {
                Animation.newAnimation('hide-details', element);
                button.ariaHidden = 'true';
                element.ariaHidden = 'true';
            }
        })
    }

    static animateNewTask(element) {
        Animation.newAnimation('new-task', element);
    }
}

export {
    Animation
}