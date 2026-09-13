// ArgyleKnitUp Master Client Script
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Synchronization
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // 2. Interactive FAQs Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Interactive Argyle Yarn Gauge & Compression Estimator
  const hosieryStyle = document.getElementById('calc-hosiery-style');
  const fiberBlend = document.getElementById('calc-fiber-blend');
  const needleGauge = document.getElementById('calc-needle-gauge');
  const resultKnitDensity = document.getElementById('calc-density-val');
  const resultCompression = document.getElementById('calc-compression-val');
  const resultLongevity = document.getElementById('calc-longevity-val');

  function updateKnitEstimates() {
    if (!hosieryStyle || !fiberBlend || !needleGauge) return;
    const styleVal = hosieryStyle.value;
    const blendVal = fiberBlend.value;
    const gaugeVal = needleGauge.value;

    let coursesPerInch = 36;
    let compressionMmHg = 14;
    let longevityYears = 8;

    if (gaugeVal === '200-needle') {
      coursesPerInch = 42;
    } else if (gaugeVal === '240-needle') {
      coursesPerInch = 48;
    }

    if (styleVal === 'full-calf') {
      compressionMmHg = 18;
      longevityYears = 10;
    } else if (styleVal === 'ankle-loafer') {
      compressionMmHg = 10;
      longevityYears = 6;
    }

    if (blendVal === 'merino-polyamide') {
      longevityYears += 3;
    } else if (blendVal === 'merino-cashmere') {
      longevityYears -= 1;
      coursesPerInch += 2;
    }

    if (resultKnitDensity) resultKnitDensity.textContent = `${coursesPerInch} CPI (Gauge ${gaugeVal.replace('-needle','')})`;
    if (resultCompression) resultCompression.textContent = `${compressionMmHg} mmHg (Graduated)`;
    if (resultLongevity) resultLongevity.textContent = `${longevityYears}+ Yrs (100k Rubs)`;
  }

  if (hosieryStyle && fiberBlend && needleGauge) {
    [hosieryStyle, fiberBlend, needleGauge].forEach(el => {
      el.addEventListener('change', updateKnitEstimates);
      el.addEventListener('input', updateKnitEstimates);
    });
    updateKnitEstimates();
  }
});
