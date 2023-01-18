class Animation {
    static setAnimation(animation, element) {
        element.classList.add(animation);
        element.onanimationend = () => element.classList.remove(animation);
    }

    static animateStatus(status, indicator, title, element) {
        status.addEventListener('change', () => {
            if (status.checked) {
                Animation.setAnimation('update-status', element);

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