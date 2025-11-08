// Billing toggle
    const monthlyBtn = document.getElementById('monthlyBtn');
    const yearlyBtn = document.getElementById('yearlyBtn');
    const planCards = document.querySelectorAll('.card');
    let billing = 'month';

    function setBilling(b){
      billing = b;
      monthlyBtn.classList.toggle('active', b==='month');
      yearlyBtn.classList.toggle('active', b==='year');
      monthlyBtn.setAttribute('aria-pressed', b==='month');
      yearlyBtn.setAttribute('aria-pressed', b==='year');

      planCards.forEach(card=>{
        const m = parseFloat(card.getAttribute('data-month'));
        const y = parseFloat(card.getAttribute('data-year'));
        const amountEl = card.querySelector('.amount');
        const priceLabel = card.querySelector('.price .muted') || card.querySelector('.muted');

        if(isNaN(m) || m===0){
          // free
          if(b==='month'){
            if(amountEl) amountEl.textContent = '0';
            if(priceLabel) priceLabel.textContent = '/ měsíc';
            card.querySelector('.price').innerHTML = 'Zdarma <span class="muted">/ měsíc</span>';
          } else {
            if(amountEl) amountEl.textContent = '0';
            card.querySelector('.price').innerHTML = 'Zdarma <span class="muted">/ rok</span>';
          }
        } else {
          if(b==='month'){
            if(amountEl) amountEl.textContent = m;
            if(priceLabel) priceLabel.textContent = '/ měsíc';
            // ensure numeric
            const priceNode = card.querySelector('.price');
            if(priceNode && priceNode.querySelector('.amount')){
              priceNode.innerHTML = '€<span class="amount">'+m+'</span><span class="muted">/ měsíc</span>';
            }
          } else {
            if(amountEl) amountEl.textContent = y;
            if(priceLabel) priceLabel.textContent = '/ rok';
            const priceNode = card.querySelector('.price');
            if(priceNode && priceNode.querySelector('.amount')){
              priceNode.innerHTML = '€<span class="amount">'+y+'</span><span class="muted">/ rok</span>';
            }
          }
        }
      })
    }

    monthlyBtn.addEventListener('click',()=>setBilling('month'));
    yearlyBtn.addEventListener('click',()=>setBilling('year'));

    // Předplatné modal behaviour
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalTitle = document.getElementById('modalTitle');
    const modalPlan = document.getElementById('modalPlan');
    const planButtons = document.querySelectorAll('[data-plan]');
    const planSelect = document.getElementById('planSelect');
    const billingSelect = document.getElementById('billing');

    function openModal(planName){
      modalBackdrop.style.display = 'flex';
      modalBackdrop.setAttribute('aria-hidden','false');
      modalTitle.textContent = 'Předplatit — ' + planName;
      modalPlan.textContent = planName + ' — ' + (billing === 'month' ? 'měsíční fakturace' : 'roční fakturace');
      if(planSelect) planSelect.value = planName;
      if(billingSelect) billingSelect.value = billing === 'month' ? 'month' : 'year';
      document.getElementById('name').focus();
    }

    function closeModal(){
      modalBackdrop.style.display = 'none';
      modalBackdrop.setAttribute('aria-hidden','true');
    }

    planButtons.forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        const plan = e.currentTarget.getAttribute('data-plan');
        if(plan) openModal(plan);
      })
    })

    document.getElementById('cancelModal').addEventListener('click',closeModal);
    modalBackdrop.addEventListener('click',(e)=>{ if(e.target===modalBackdrop) closeModal(); });

    // form submit (demo)
    document.getElementById('subscribeForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const plan = e.target.plan.value;
      const bill = e.target.billing.value;
      alert(`Děkujeme ${name}! Obdrželi jsme požadavek na plán ${plan} (${bill === 'month' ? 'měsíčně' : 'ročně'}).`);
      closeModal();
    });

    // --- Shop (koupě měny) ---
    const shopBackdrop = document.getElementById('shopBackdrop');
    const openShopBtn = document.getElementById('openShop');
    const cancelShop = document.getElementById('cancelShop');
    const coinOptions = document.getElementById('coinOptions');
    let selectedCoin = null;

    openShopBtn.addEventListener('click', ()=>{
      shopBackdrop.style.display = 'flex';
      shopBackdrop.setAttribute('aria-hidden','false');
      document.getElementById('payerEmail').focus();
    });
    cancelShop.addEventListener('click', ()=>{
      shopBackdrop.style.display = 'none';
      shopBackdrop.setAttribute('aria-hidden','true');
    });
    shopBackdrop.addEventListener('click',(e)=>{ if(e.target===shopBackdrop) { shopBackdrop.style.display='none'; shopBackdrop.setAttribute('aria-hidden','true'); } });

    // allow coins from card buttons
    document.querySelectorAll('[data-buycoins]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        openShopBtn.click();
      })
    });

    // coin selection
    coinOptions.querySelectorAll('.coin').forEach(el=>{
      el.addEventListener('click', ()=>{
        coinOptions.querySelectorAll('.coin').forEach(c=>c.classList.remove('selected'));
        el.classList.add('selected');
        selectedCoin = {coins: el.getAttribute('data-coins'), price: el.getAttribute('data-price')};
      })
    });

    document.getElementById('buyCoinsForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = e.target.payerEmail.value;
      if(!selectedCoin){
        alert('Vyberte prosím balíček měny.');
        return;
      }
      // Demo behaviour: show confirmation. Replace with real payment flow.
      alert(`Děkujeme! Na e-mail ${email} bude připsáno ${selectedCoin.coins} ✴ za cenu €${selectedCoin.price}.`);
      shopBackdrop.style.display = 'none';
      shopBackdrop.setAttribute('aria-hidden','true');
    });

    // initial
    setBilling('month');

    function prehrajmilion() {
    // 1. Najde audio element podle jeho ID
    var audio = document.getElementById('milion-audio');

    // 2. Restartuje audio (pro případ, že už bylo jednou přehráno)
    audio.currentTime = 0;

    // 3. Spustí přehrávání
    audio.play()
        .then(() => {
            // Přehrávání se úspěšně spustilo
            console.log("million se spustil.");
        })
        .catch(error => {
            // Přehrávání bylo zablokováno (časté na mobilních zařízeních bez interakce)
            console.error("Chyba při přehrávání audia:", error);
            // Můžete zde přidat alternativní zpětnou vazbu, např. vibraci nebo hlášku.
        });

    document.getElementById('subscription').style.display = 'none';
    document.getElementById('main_box').style.display = 'block';

    // Zde by mělo pokračovat zpracování výběru předplatného
    // např. presmerovani, odeslani formulare, AJAX dotaz na server...
    // document.getElementById('form-predplatne').submit();
}