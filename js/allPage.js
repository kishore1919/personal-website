highlightActiveNavLink()
restorePage()

function restorePage() {
    window.addEventListener("pageshow",function (event) {
        let historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.type === 2)
        if (historyTraversal) {
            // Handle page restore.
            window.location.reload()
        }
    })
}

function highlightActiveNavLink() {
    const currentLink = location.href
    const allNavLink = document.querySelectorAll('a')
    for (let i = 0; i < allNavLink.length; i++) {
        const navLink = allNavLink[i]
        navLink.parentElement.className = navLink.href === currentLink ? "nav-link-wrapper active-nav-link" : "nav-link-wrapper"
    }
}