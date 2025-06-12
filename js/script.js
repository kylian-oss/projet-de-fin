
const panierList = document.getElementById('panier-list');
    const panierTotal = document.getElementById('panier-total');
    const panierVideMessage = document.createElement('li');
    panierVideMessage.className = 'list-group-item text-center text-muted';
    panierVideMessage.innerText = 'Votre panier est vide.';

    let total = 0;
    let panier = JSON.parse(localStorage.getItem('panierMaisonDeco')) || {};

    function savePanier() {
        localStorage.setItem('panierMaisonDeco', JSON.stringify(panier));
    }

    function updatePanier() {
        panierList.innerHTML = '';
        total = 0;

        const noms = Object.keys(panier);
        if (noms.length === 0) {
            panierList.appendChild(panierVideMessage);
            panierTotal.textContent = '0f';
            return;
        }

        noms.forEach(nom => {
            const { prix, quantite } = panier[nom];
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center flex-wrap animate-item';

            li.innerHTML = `
                <div class="mb-2">
                    <strong>${nom}</strong><br>
                    Quantité: <span class="quantite">${quantite}</span> x ${prix}f
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-secondary me-1 moins-btn">-</button>
                    <button class="btn btn-sm btn-outline-secondary me-2 plus-btn">+</button>
                    <span class="fw-bold me-2">${quantite * prix}f</span>
                    <button class="btn btn-sm btn-danger supprimer-btn">Supprimer</button>
                </div>
            `;

            panierList.appendChild(li);
            total += prix * quantite;

            li.querySelector('.supprimer-btn').addEventListener('click', () => {
                delete panier[nom];
                savePanier();
                updatePanier();
            });

            li.querySelector('.plus-btn').addEventListener('click', () => {
                panier[nom].quantite += 1;
                savePanier();
                updatePanier();
            });

            li.querySelector('.moins-btn').addEventListener('click', () => {
                panier[nom].quantite -= 1;
                if (panier[nom].quantite <= 0) {
                    delete panier[nom];
                }
                savePanier();
                updatePanier();
            });
        });

        panierTotal.textContent = `${total}f`;
    }

    document.querySelectorAll('.acheter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const titre = card.querySelector('.card-title').innerText;
            const prixTexte = card.querySelector('.card-price').innerText;
            const prix = parseInt(prixTexte.replace(/[^\d]/g, ''));

            if (panier[titre]) {
                panier[titre].quantite += 1;
            } else {
                panier[titre] = { prix: prix, quantite: 1 };
            }

            // Animation
            card.classList.add('border-success');
            setTimeout(() => {
                card.classList.remove('border-success');
            }, 300);

            savePanier();
            updatePanier();
        });
    });

    // Initialiser le panier à l'ouverture
    updatePanier();
