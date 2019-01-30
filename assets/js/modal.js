class Modal {
    constructor(id) {
        this.modal = document.getElementById(id);
        if(this.modal) {
            window.addEventListener('click', (e) => {
                if(e.target === this.modal) this.hide();
            });
        }
    }

    show() {
        this.modal.style.display = "block";
    }

    hide() {
        this.modal.style.display = "none";
    }
}
