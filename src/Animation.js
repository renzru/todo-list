class Animation {
    static clearAnimation(animation, element) {
        element.onanimationend = () => {
            element.classList.remove(animation);
        }
    }

    static animateStatus(status, indicator, title, element) {
        status.addEventListener('change', () => {

            if (status.checked) {
                element.classList.add('update-status');

                title.classList.toggle('completed');
                indicator.classList.toggle('status-completed');
            } else {
                title.classList.toggle('completed');
                indicator.classList.toggle('status-completed');
            }

            Animation.clearAnimation('update-status', element);
        })
    }
}

export {
    Animation
}