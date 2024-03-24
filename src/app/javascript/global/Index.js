window.pageAlerts = function pageAlerts(
    value_type,
    value_title,
    value_text,
    goSomewhereElse
) {
    let type = value_type;
    let titleAlert = value_title;
    let textAlert = value_text;

    document.querySelector("#alert").classList.add("active");
    document.querySelectorAll("#alert .content").forEach(content => {
        content.classList.remove("active");
    });
    document.querySelector(`#alert .type-${type}`).classList.add("active");
    document.querySelector(`#alert .type-${type} .top h3`).innerText =
        titleAlert;
    document.querySelector(`#alert .type-${type} .top p`).innerText = textAlert;

    document
        .querySelector(`#alert .type-${type} .yes`)
        .addEventListener("click", () => {
            if (goSomewhereElse) {
                showTab(goSomewhereElse);
                document.querySelector("#alert").classList.remove("active");
            } else {
                document.querySelector("#alert").classList.remove("active");
            }
        });
    document
        .querySelector(`#alert .type-${type} .cancel`)
        .addEventListener("click", () => {
            document.querySelector("#alert").classList.remove("active");
        });
};
