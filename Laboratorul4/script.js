// Exercitiul 1 

let fructe = ["Măr", "Pară", "Banana", "Portocală", "Kiwi"];

console.log("Lista:", fructe);
console.log("Primul element:", fructe[0]);
console.log("Ultimul element:", fructe[fructe.length - 1]);
console.log("Numar de elemente:", fructe.length);


// Exercitiul 2

let orase = ["Chișinău", "Bălți", "Cahul"];

orase.push("Orhei");      
orase.unshift("Soroca");  
orase.pop();              
orase.shift();            

console.log("Lista finala:", orase);


// Exercitiile 3 si 4 

let produse = ["Pâine", "Lapte", "Ouă"];

function afiseazaProduse() {
    let zona = document.getElementById("listaCumparaturi");

    if (produse.length === 0) {
        zona.textContent = "Lista este goală!";
        return;
    }

    zona.textContent = produse.join(", ");
}

function adaugaLaInceput() {
    let camp = document.getElementById("produsNou");

    if (camp.value.trim() !== "") {
        produse.unshift(camp.value.trim());
        camp.value = "";
    }
    afiseazaProduse();
}

function adaugaLaSfarsit() {
    let camp = document.getElementById("produsNou");

    if (camp.value.trim() !== "") {
        produse.push(camp.value.trim());
        camp.value = "";
    }
    afiseazaProduse();
}

function eliminaPrimul() {
    produse.shift();
    afiseazaProduse();
}

function eliminaUltimul() {
    produse.pop();
    afiseazaProduse();
}

afiseazaProduse();


// Exercitiul 5 

let elevi = [
    { nume: "Popescu Ana", varsta: 17, nota: 9 },
    { nume: "Rusu Mihai", varsta: 18, nota: 8 },
    { nume: "Ciobanu Maria", varsta: 17, nota: 10 }
];

function afiseazaElevi() {
    let catalog = document.getElementById("catalog");
    catalog.textContent = "";

    elevi.forEach(function (elev, index) {
        catalog.textContent +=
            (index + 1) + ". " + elev.nume + "\n" +
            "Vârsta: " + elev.varsta + "\n" +
            "Nota: " + elev.nota + "\n\n";
    });

    document.getElementById("totalElevi").textContent =
        "Număr de elevi: " + elevi.length;
}

function adaugaElev() {
    let nume = document.getElementById("inputNume").value.trim();
    let varsta = document.getElementById("inputVarsta").value;
    let nota = document.getElementById("inputNota").value;
    let mesaj = document.getElementById("mesajAdaugare");

    if (nume === "" || varsta === "" || nota === "") {
        mesaj.textContent = "Completează toate câmpurile!";
        return;
    }

    let elevNou = {
        nume: nume,
        varsta: Number(varsta),
        nota: Number(nota)
    };

    elevi.push(elevNou);
    mesaj.textContent = "Elevul a fost adăugat.";

    document.getElementById("inputNume").value = "";
    document.getElementById("inputVarsta").value = "";
    document.getElementById("inputNota").value = "";

    afiseazaElevi();
}

function stergeElev() {
    let nume = document.getElementById("numeStergere").value.trim().toLowerCase();
    let mesaj = document.getElementById("mesajStergere");

    let elevGasit = elevi.find(function (elev) {
        return elev.nume.toLowerCase() === nume;
    });

    if (elevGasit) {
        elevi.splice(elevi.indexOf(elevGasit), 1);
        mesaj.textContent = "Elevul a fost șters.";
    } else {
        mesaj.textContent = "Elevul nu a fost găsit!";
    }

    afiseazaElevi();
}

function cautaElev() {
    let nume = document.getElementById("numeCautare").value.trim().toLowerCase();
    let rezultat = document.getElementById("rezultatCautare");

    let elev = elevi.find(function (e) {
        return e.nume.toLowerCase() === nume;
    });

    if (elev) {
        rezultat.textContent =
            "Elev găsit!\n" +
            "Nume: " + elev.nume + "\n" +
            "Vârsta: " + elev.varsta + "\n" +
            "Nota: " + elev.nota;
    } else {
        rezultat.textContent = "Elevul nu a fost găsit!";
    }
}

afiseazaElevi();