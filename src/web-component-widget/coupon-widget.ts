import styles from "./widget.scss";

const uuid = () => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

const template = document.createElement("template");
template.innerHTML = `
 <style>${styles.toString()}</style>
<div class="coupon-widget">
    <section class="image">
      <img src="./src/assets/coupon-icon.png" alt="coupon-icon" />
    </section>
    <main>
      <h2>35% OFF🔥!</h2>
      <p>Limited summer sale coupon code!</p>
      <slot name="coupon-btn">
        <button class="get-coupon-btn btn">Get Coupon</button>
      </slot>
      <button class="no-thanks-btn btn">
        No, I don't want to save money
      </button>
    </main>
</div>
`;

export class CouponWidget extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  static get observedAttributes() {
    return ["color"];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  updateStyle = (elem: HTMLElement) => {
    const shadow = elem.shadowRoot;
    const color = this.getAttribute("color");
  };

  getCoupon = () => {
    const id = uuid();
    navigator.clipboard.writeText(id);
    const event = new CustomEvent("issued", {
      detail: id,
    });
    this.dispatchEvent(event);
  };

  connectedCallback() {
    const getCouponBtn = this._shadowRoot.querySelector(".get-coupon-btn");
    const slot = this._shadowRoot.querySelector("slot");
    getCouponBtn.addEventListener("click", this.getCoupon);
    slot.addEventListener("click", this.getCoupon);
    this.updateStyle(this);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    console.log("attributeChangedCallback called");
    this.updateStyle(this);
  }
}
