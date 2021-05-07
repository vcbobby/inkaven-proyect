class MyProducts extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    static get observedAttributes() {
        return ["img", "h2", "pack", "info"]
    }

    attributeChangedCallback(attr, oldval, newval) {
        if(attr === "img") {
            this.img = newval
        }
        if(attr === "h2") {
            this.h2 = newval
        }
        if(attr === "pack") {
            this.pack = newval
        }
        if(attr === "info") {
            this.info = newval
        }
    }

    getTemplate() {
        const template = document.createElement('template')
        template.innerHTML = `
        <article class="products__article">
            <picture class="products__img">
                <img src="${this.img}" alt="Product image" title="Product image">
            </picture>
            <h3 class="products__title">
                ${this.h2}
            </h3>
            <h4 class="products__pack">
                ${this.pack}
            </h4>
            <p>
                ${this.info}
            </p>
        </article>
        ${this.getStyles()}
        `
        return template
    }

    getStyles() {
        return `
        <style>
            :host {
                --dark-letters: #333333;
                --background-color: #ffffff;
                --main-font: 'Poppins', Helvética, Arial, Lucida, sans-serif;
            }
            .products__article {
                display: flex;
                margin: 10px auto;
                width: 290px;
                height: 421px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family: var(--main-font);
                font-size: 1.4rem;
            }
            .products__img img {
                width: 290px;
                height: 195px;
                margin-bottom: 8px;
            }
            .products__title {
                font-size: 2rem;
                font-weight: bold;
                margin: 10px auto;
            }
            .products__pack {
                font-weight: bold;
                margin: 0 auto;
            }
            .products__article p {
                padding: 10px 30px;
                font-size: 1.4rem;
                text-align: justify;
            }
        </style>
        `
    }
    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
    }
    connectedCallback() {
        this.render()
    }
}

customElements.define('my-products', MyProducts)