class Formulaire {
    constructor() {
        this.form = document.querySelector('.container');
        this.resultDiv = document.getElementById('resultAfficher');
        this.results = [];
        this.editIndex = undefined;
        this.valeurPropriete();
        this.initModal();
        this.afficheResult();
        this.buttonClick = this.buttonClick.bind(this);
        document.getElementById('valide').addEventListener('click', this.buttonClick);
        this.affichermodal = this.affichermodal.bind(this);
    }
   
    valeurPropriete() {
        const inputOption = document.getElementById('propriete');
        const proprieteOptions = ['Haut', 'Moyen', 'Faible'];
        proprieteOptions.sort();
        proprieteOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.textContent = option;
            inputOption.appendChild(optionElement);
        });
    }
    buttonClick() {
        const titre = document.getElementById('titre').value;
        const description = document.getElementById('description').value;
        const propriete = document.getElementById('propriete').value;
        const estimation = document.getElementById('estimation').value;
        if (titre && description && propriete && estimation) {
            const result = {
                titre,
                description,
                propriete,
                estimation
            };
            if (this.editIndex !== undefined) {
                this.results[this.editIndex] = result;
                this.editIndex = undefined;
            } else {
                this.results.push(result);
            }
            this.afficheResult();
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    }
    initModal() {
        const inputOption = document.getElementById('modalPropriete');
        const proprieteOptions = ['Haut', 'Moyen', 'Faible'];
        proprieteOptions.sort();
        proprieteOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.textContent = option;
            inputOption.appendChild(optionElement);
        });
    }
    affichermodal(index) {
        const donneesModale = this.results[index];
        document.getElementById('modalTitre').value = donneesModale.titre;
        document.getElementById('modalDescription').value = donneesModale.description;
        const modalPropriete = document.getElementById('modalPropriete');
        modalPropriete.selectedIndex = Array.from(modalPropriete.options).findIndex(option => option.value === donneesModale.propriete);
        document.getElementById('modalEstimation').value = donneesModale.estimation;
    }
    afficheResult() {
        this.results.sort((a, b) => {
            const order = ['Haut', 'Moyen', 'Faible'];
            return order.indexOf(a.propriete) - order.indexOf(b.propriete);
        });
        this.resultDiv.innerHTML = '';
        this.results.forEach((result, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${result.titre}</td>
            <td>${result.description}</td>
            <td>${result.propriete}</td>
            <td>${result.estimation}</td>
            <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="formulair.affichermodal(${index})"> Edit </button>
            </td>
            `;
            this.resultDiv.appendChild(row);
        });
        const numberOfElements = this.results.length;
        const numberOfElementsDisplay = document.getElementById('nbDonne');
        numberOfElementsDisplay.textContent = `Afaire( ${numberOfElements} )`;
    }
}

const formulair = new Formulaire();
