// const sphere = document.getElementById('ball')
// const screenWidth = window.innerWidth
// const screenHeight = window.innerHeight
// const maxDegrees = 360

// startSpinSphere('click')
// stopSpinSphere('mouseup')

// function startSpinSphere(mouseMovement) {sphere.addEventListener(mouseMovement, addSpinSphere)}
// function stopSpinSphere(mouseMovement) {
//     sphere.addEventListener(mouseMovement, removeSpinSphere)
//     window.addEventListener(mouseMovement, removeSpinSphere)
//     sphere.style.animation = 'spin 7.5s 0.1s infinite alternate linear'
//     sphere.style.ms_animation = 'spin 7.5s 0.1s infinite alternate linear'
// }

// function addSpinSphere() {window.addEventListener('mousemove', spinSphere)}
// function removeSpinSphere() {window.removeEventListener('mousemove', spinSphere)}

// function spinSphere() {
//     const yDegrees = (window.event.pageX / screenWidth * maxDegrees) - 0.5 * maxDegrees
//     const xDegrees = -0.5* ((window.event.pageY / screenHeight * maxDegrees) - 0.5 * maxDegrees)
//     sphere.style.animation = ''
//     sphere.style.transform = 'rotateY(' + yDegrees + 'deg) rotateX(' + xDegrees + 'deg)'
// }