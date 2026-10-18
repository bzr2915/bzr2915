/* clay promo site — bilingual support (English default, 中文 toggle)
   Final copy v11. */
const I18N = {
  en: {
    "hero.kicker": "A PREVIEW",
    "hero.lede": "A netlist describes structure. A layout embodies physics. clay reads the why, keeps the why, and builds new circuits from the why. Alone.",
    "claim1.h": "clay learns.",
    "claim1.p": "Every good layout has its reasons. clay reads the reasons off the silicon and writes them down as declarations.",
    "claim2.h": "clay builds.",
    "claim2.p": "Declarations in. Verified circuits out. Sized, placed, routed. Unattended.",
    "claim3.h": "clay creates.",
    "claim3.p": "Learned once, a decision works forever. New sizes. New fabs. New circuits.",
    "a1.cap": "A real amplifier assembling itself on real silicon.",
    "a2.h": "Extract once. Rebuild anything.",
    "a2.lede": "The declarations hold. The circuits change.",
    "a2.cap": "One frozen declaration card. Every layout renders from its real GDS.",
    "a3.cap": "Declarations in. Verified circuits out. Unattended.",
    "footer.line": "read the why, build the how."
  },
  zh: {
    "hero.kicker": "预告",
    "hero.lede": "网表载其形，版图载其道。clay 识其道、存其道，依其道造新电路。无人值守。",
    "claim1.h": "clay 会学。",
    "claim1.p": "版图有道。clay 识之于硅，录为声明。",
    "claim2.h": "clay 会建。",
    "claim2.p": "声明既入，电路自成。尺寸、布局、布线，无人值守。",
    "claim3.h": "clay 会创造。",
    "claim3.p": "一学永用。尺寸可易，工艺可迁，电路可新。",
    "a1.cap": "硅片之上，放大器自成。",
    "a2.h": "提取一次，重建万物。",
    "a2.lede": "声明不移，电路常新。",
    "a2.cap": "一张冻结的声明卡。每张版图都由真实 GDS 渲染。",
    "a3.cap": "投之以声明，报之以电路。无人值守。",
    "footer.line": "识其道，成其形。"
  }
};

let LANG = (function() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "zh" || q === "en") {
    localStorage.setItem("clayset-lang", q);
    return q;
  }
  return localStorage.getItem("clayset-lang") || "en";
})();

function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (I18N[LANG][key]) el.textContent = I18N[LANG][key];
  });
  document.getElementById("lang-toggle").textContent = LANG === "en" ? "中文" : "English";
  document.documentElement.lang = LANG === "en" ? "en" : "zh-CN";
  if (window.onLangChange) window.onLangChange(LANG);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("lang-toggle").addEventListener("click", () => {
    LANG = LANG === "en" ? "zh" : "en";
    localStorage.setItem("clayset-lang", LANG);
    applyLang();
  });
  applyLang();
});
