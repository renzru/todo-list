class Animation {
    static newAnimation(animation, element) {
        element.classList.add(animation);
        element.addEventListener("click", () => element.classList.remove(animation));
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
}

export {
    Animation
}