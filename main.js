function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function countUp(counter) {
    const h1 = counter.querySelector("h1");
    let number = 0;

    for (let i = 0; i <= counter.dataset.number - 1; i++) {
        number++;
        h1.innerHTML = number;
        await sleep(1);
    }
}

function animate(counter) {
    const steps = 100;
    const duration = (500 * counter.dataset.number) / steps;
    console.log(duration);

    countUp(counter);
    anime({
        targets: counter.querySelector(".bar"),
        width: "100%",
        // easing:  'spring(1, 80, 10, 0)',
        easing: `steps(${steps})`,
        duration: duration,
    });
}

function onEntry(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target); // stop observing once triggered
        }
    });
}

function init() {
    const counters = document.querySelectorAll(".counter");
    const options = {
        root: null, // use the viewport as the root
        rootMargin: "0px",
        threshold: 0.5, // 50% of the target element must be visible
    };

    const observer = new IntersectionObserver(onEntry, options);
    counters.forEach((counter) => {
        observer.observe(counter);
    });
}

window.addEventListener("load", init);

