class formulaire {
    constructor() {
        this.form = document.querySelector('.container');
        this.resultDiv = document.getElementById('resultAfficher');
        this.results = [];
        this.valeurPropriete();
        this.buttonClick = this.buttonClick.bind(this);
        document.getElementById('valide').addEventListener('click', this.buttonClick);
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
        const result = {
            titre,
            description,
            propriete,
            estimation
        };
        if (this.editIndex !== undefined) {
            this.results[this.editIndex] = result;
            this.editIndex = undefined;  // Réinitialise l'index d'édition
        } else {
            this.results.push(result);
        }
        this.afficheResult();
        this.clearForm();
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
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Edit </button>
            </td>
            `;
            this.resultDiv.appendChild(row);
        });
    }
}
const formulair = new formulaire();