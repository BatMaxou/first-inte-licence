const createBullet = (current = false) => {
    const bullet = document.createElement('div');
    bullet.classList.add('bullets-container__bullet');

    if (current) {
        bullet.classList.add('bullets-container__bullet--current');
    }

    document.querySelector('.bullets-container').appendChild(bullet);
}

const handleSliderChange = (index, max) => {

    if (index === max) {
        index = 0
    } else {
        index += 1
    }

    const elements = Array.from(document.querySelectorAll('.slider__element'))
    const bullets = Array.from(document.querySelectorAll('.bullets-container__bullet'))

    const currElement = elements.find(element => element.classList.contains('slider__element--current'))

    currElement.animate(
        [{
            opacity: 0
        }],
        { duration: 500 }
    )

    elements[index].animate(
        [{
            opacity: 1
        }],
        {
            duration: 500,
            delay: 80
        }
    )

    setTimeout(() => {
        const currBullet = bullets.find(bullet => bullet.classList.contains('bullets-container__bullet--current'))
        bullets[index].classList.add('bullets-container__bullet--current')
        currBullet.classList.remove('bullets-container__bullet--current')
    }, 80)

    setTimeout(() => {
        elements[index].classList.add('slider__element--current')
        currElement.classList.remove('slider__element--current')
    }, 500)


    return index
}

const init = () => {
    const sliderChildren = Array.from(slider.children)

    sliderChildren.forEach(child => {
        const isCurrent = child.classList.contains('slider__element--current')
        if (isCurrent) {
            createBullet(true)
        } else {
            createBullet()
        }
    })

    if (sliderChildren.length !== 0 && sliderChildren.length !== 1) {
        let index = 0

        setInterval(() => {
            index = handleSliderChange(index, sliderChildren.length - 1)
        }, 5000)
    }
}

const slider = document.querySelector('.slider');

if (slider) {
    init()
}
